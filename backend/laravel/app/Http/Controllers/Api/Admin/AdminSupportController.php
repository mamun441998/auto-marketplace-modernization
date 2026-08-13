<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;

class AdminSupportController extends Controller
{
    /**
     * List every ticket across all dealers, with light filtering.
     */
    public function index(Request $request)
    {
        $query = SupportTicket::query()
            ->with('dealer:id,name')
            ->withCount('messages');

        if ($status = $request->query('status')) {
            if (in_array($status, ['open', 'pending', 'closed'], true)) {
                $query->where('status', $status);
            }
        }

        if ($search = $request->query('search')) {
            $query->where('subject', 'like', '%' . $search . '%');
        }

        $tickets = $query
            ->orderByRaw('COALESCE(last_reply_at, created_at) DESC')
            ->get()
            ->map(fn ($t) => [
                'id'             => (int) $t->id,
                'subject'        => $t->subject,
                'status'         => $t->status,
                'priority'       => $t->priority,
                'dealer_id'      => (int) $t->dealer_id,
                'dealer_name'    => $t->dealer?->name ?? 'Unknown dealer',
                'messages_count' => (int) $t->messages_count,
                'last_reply_at'  => optional($t->last_reply_at)->toIso8601String(),
                'created_at'     => optional($t->created_at)->toIso8601String(),
            ]);

        $counts = [
            'total'   => SupportTicket::count(),
            'open'    => SupportTicket::where('status', 'open')->count(),
            'pending' => SupportTicket::where('status', 'pending')->count(),
            'closed'  => SupportTicket::where('status', 'closed')->count(),
        ];

        return response()->json([
            'success' => true,
            'tickets' => $tickets,
            'counts'  => $counts,
        ]);
    }

    /**
     * Show one ticket with its full thread.
     */
    public function show(SupportTicket $ticket)
    {
        return response()->json([
            'success' => true,
            'ticket'  => $this->serialize($ticket),
        ]);
    }

    /**
     * Admin/staff replies to a ticket.
     */
    public function reply(Request $request, SupportTicket $ticket)
    {
        $data = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $user = $request->user();

        $ticket->messages()->create([
            'author_type' => 'admin',
            'author_id'   => $user->id,
            'author_name' => $user->name,
            'body'        => $data['message'],
        ]);

        // Replying moves an open ticket to "pending" (waiting on dealer).
        $ticket->update([
            'status'        => $ticket->status === 'closed' ? 'closed' : 'pending',
            'last_reply_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'ticket'  => $this->serialize($ticket->fresh()),
        ]);
    }

    /**
     * Change ticket status (open / pending / closed).
     */
    public function updateStatus(Request $request, SupportTicket $ticket)
    {
        $data = $request->validate([
            'status' => 'required|in:open,pending,closed',
        ]);

        $ticket->update(['status' => $data['status']]);

        return response()->json([
            'success' => true,
            'ticket'  => $this->serialize($ticket->fresh()),
        ]);
    }

    private function serialize(SupportTicket $ticket): array
    {
        $ticket->loadMissing('dealer:id,name', 'messages');

        return [
            'id'            => (int) $ticket->id,
            'subject'       => $ticket->subject,
            'status'        => $ticket->status,
            'priority'      => $ticket->priority,
            'dealer_id'     => (int) $ticket->dealer_id,
            'dealer_name'   => $ticket->dealer?->name ?? 'Unknown dealer',
            'created_at'    => optional($ticket->created_at)->toIso8601String(),
            'last_reply_at' => optional($ticket->last_reply_at)->toIso8601String(),
            'messages'      => $ticket->messages->map(fn ($m) => [
                'id'          => (int) $m->id,
                'author_type' => $m->author_type,
                'author_name' => $m->author_name,
                'body'        => $m->body,
                'created_at'  => optional($m->created_at)->toIso8601String(),
            ])->values(),
        ];
    }
}