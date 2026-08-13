<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Dealer;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InboxController extends Controller
{
    /* =========================================================
     |  DEALER SIDE (auth)
     |========================================================= */

    /** GET /api/dealer/inbox — list conversations + total unread. */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $convos = Conversation::where('dealer_id', $dealer->id)
            ->orderByDesc('last_message_at')
            ->limit(100)
            ->get();

        $list = $convos->map(function ($c) {
            $last = Message::where('conversation_id', $c->id)->latest('id')->first();
            return [
                'id'            => $c->id,
                'name'          => $c->visitor_name ?: 'Guest',
                'email'         => $c->visitor_email,
                'phone'         => $c->visitor_phone,
                'status'        => $c->status,
                'unread'        => $c->unread_dealer,
                'preview'       => $last ? Str::limit($last->body, 60) : '',
                'preview_from'  => $last?->sender,
                'last_at'       => optional($c->last_message_at)->toDateTimeString(),
            ];
        });

        return response()->json([
            'success'       => true,
            'conversations' => $list,
            'unread_total'  => (int) Conversation::where('dealer_id', $dealer->id)->sum('unread_dealer'),
        ]);
    }

    /** GET /api/dealer/inbox/{conversation} — messages + mark read. */
    public function show(Request $request, Conversation $conversation): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
                if (! $dealer || (int) $conversation->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        // Mark customer messages as read + clear dealer unread badge.
        Message::where('conversation_id', $conversation->id)
            ->where('sender', 'customer')
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
        $conversation->update(['unread_dealer' => 0]);

        return response()->json([
            'success'      => true,
            'conversation' => [
                'id'     => $conversation->id,
                'name'   => $conversation->visitor_name ?: 'Guest',
                'email'  => $conversation->visitor_email,
                'phone'  => $conversation->visitor_phone,
                'status' => $conversation->status,
            ],
            'messages' => $this->messages($conversation->id),
        ]);
    }

    /** POST /api/dealer/inbox/{conversation}/reply — dealer sends a message. */
    public function reply(Request $request, Conversation $conversation): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
                if (! $dealer || (int) $conversation->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $data = $request->validate(['body' => ['required', 'string', 'max:4000']]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender'          => 'dealer',
            'body'            => $data['body'],
            'read_at'         => now(),
        ]);

        $conversation->update([
            'last_message_at' => now(),
            'status'          => 'open',
        ]);

        return response()->json([
            'success'  => true,
            'messages' => $this->messages($conversation->id),
        ]);
    }

    /** PATCH /api/dealer/inbox/{conversation}/toggle — open/close. */
    public function toggle(Request $request, Conversation $conversation): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
                if (! $dealer || (int) $conversation->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $conversation->update(['status' => $conversation->status === 'open' ? 'closed' : 'open']);

        return response()->json(['success' => true, 'status' => $conversation->status]);
    }

    /* =========================================================
     |  PUBLIC SIDE (website chat widget — no auth)
     |========================================================= */

    /** POST /api/inbox/start — visitor starts a conversation. */
    public function start(Request $request): JsonResponse
    {
        $data = $request->validate([
            'dealer_id' => ['required', 'integer'],
            'name'      => ['nullable', 'string', 'max:120'],
            'email'     => ['nullable', 'email', 'max:150'],
            'phone'     => ['nullable', 'string', 'max:40'],
            'body'      => ['required', 'string', 'max:4000'],
        ]);

        $dealer = Dealer::find($data['dealer_id']);
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'Dealer not found.'], 404);
        }

        $conversation = Conversation::create([
            'dealer_id'       => $dealer->id,
            'token'           => Str::random(40),
            'visitor_name'    => $data['name'] ?? null,
            'visitor_email'   => $data['email'] ?? null,
            'visitor_phone'   => $data['phone'] ?? null,
            'status'          => 'open',
            'unread_dealer'   => 1,
            'last_message_at' => now(),
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender'          => 'customer',
            'body'            => $data['body'],
        ]);

        return response()->json([
            'success'  => true,
            'token'    => $conversation->token,
            'messages' => $this->messages($conversation->id),
        ], 201);
    }

    /** POST /api/inbox/{token}/send — visitor sends another message. */
    public function send(Request $request, string $token): JsonResponse
    {
        $conversation = Conversation::where('token', $token)->first();
        if (! $conversation) {
            return response()->json(['success' => false, 'message' => 'Conversation not found.'], 404);
        }

        $data = $request->validate(['body' => ['required', 'string', 'max:4000']]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender'          => 'customer',
            'body'            => $data['body'],
        ]);

        $conversation->increment('unread_dealer');
        $conversation->update(['last_message_at' => now(), 'status' => 'open']);

        return response()->json([
            'success'  => true,
            'messages' => $this->messages($conversation->id),
        ]);
    }

    /** GET /api/inbox/{token}/messages — visitor polls for replies. */
    public function poll(string $token): JsonResponse
    {
        $conversation = Conversation::where('token', $token)->first();
        if (! $conversation) {
            return response()->json(['success' => false, 'message' => 'Conversation not found.'], 404);
        }

        return response()->json([
            'success'  => true,
            'messages' => $this->messages($conversation->id),
        ]);
    }

    /* ---------- helper ---------- */
    private function messages(int $conversationId): array
    {
        return Message::where('conversation_id', $conversationId)
            ->orderBy('id')
            ->get()
            ->map(fn ($m) => [
                'id'      => $m->id,
                'sender'  => $m->sender,
                'body'    => $m->body,
                'at'      => optional($m->created_at)->toDateTimeString(),
            ])
            ->all();
    }
}