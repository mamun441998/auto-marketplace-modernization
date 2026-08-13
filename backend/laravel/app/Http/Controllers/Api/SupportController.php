<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    /**
     * List the current dealer's tickets.
     */
    public function index(Request $request)
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json(['success' => true, 'tickets' => []]);
        }

        $tickets = SupportTicket::query()
            ->where('dealer_id', $dealer->id)
            ->withCount('messages')
            ->orderByRaw('COALESCE(last_reply_at, created_at) DESC')
            ->get()
            ->map(fn ($t) => [
                'id'            => (int) $t->id,
                'subject'       => $t->subject,
                'status'        => $t->status,
                'priority'      => $t->priority,
                'messages_count'=> (int) $t->messages_count,
                'last_reply_at' => optional($t->last_reply_at)->toIso8601String(),
                'created_at'    => optional($t->created_at)->toIso8601String(),
            ]);

        return response()->json(['success' => true, 'tickets' => $tickets]);
    }

    /**
     * Create a new ticket with the first message.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'subject'  => 'required|string|max:200',
            'message'  => 'required|string|max:5000',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $user   = $request->user();
        $dealer = $user->currentDealer();

        if (! $dealer) {
            return response()->json([
                'success' => false,
                'message' => 'You need a dealer profile before opening a ticket.',
            ], 422);
        }

        $ticket = SupportTicket::create([
            'dealer_id'     => $dealer->id,
            'user_id'       => $user->id,
            'subject'       => $data['subject'],
            'status'        => 'open',
            'priority'      => $data['priority'] ?? 'medium',
            'last_reply_at' => now(),
        ]);

        $ticket->messages()->create([
            'author_type' => 'dealer',
            'author_id'   => $user->id,
            'author_name' => $user->name,
            'body'        => $data['message'],
        ]);

        return response()->json([
            'success' => true,
            'ticket'  => ['id' => (int) $ticket->id],
        ], 201);
    }

    /**
     * Show one ticket with its full message thread.
     */
    public function show(Request $request, SupportTicket $ticket)
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer || (int) $ticket->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found.'], 404);
        }

        return response()->json([
            'success' => true,
            'ticket'  => $this->serialize($ticket),
        ]);
    }

    /**
     * Dealer replies to a ticket.
     */
    public function reply(Request $request, SupportTicket $ticket)
    {
        $data = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $user   = $request->user();
        $dealer = $user->currentDealer();

        if (! $dealer || (int) $ticket->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found.'], 404);
        }

        $ticket->messages()->create([
            'author_type' => 'dealer',
            'author_id'   => $user->id,
            'author_name' => $user->name,
            'body'        => $data['message'],
        ]);

        // Re-open if it was closed, and bump the reply time.
        $ticket->update([
            'status'        => $ticket->status === 'closed' ? 'open' : $ticket->status,
            'last_reply_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'ticket'  => $this->serialize($ticket->fresh()),
        ]);
    }

    private function serialize(SupportTicket $ticket): array
    {
        return [
            'id'            => (int) $ticket->id,
            'subject'       => $ticket->subject,
            'status'        => $ticket->status,
            'priority'      => $ticket->priority,
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