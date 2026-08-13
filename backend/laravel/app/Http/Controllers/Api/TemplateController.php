<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /** GET /api/dealer/templates */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $templates = Template::where('dealer_id', $dealer->id)
            ->latest()
            ->get(['id', 'name', 'channel', 'subject', 'body', 'created_at']);

        return response()->json(['success' => true, 'templates' => $templates]);
    }

    /** POST /api/dealer/templates */
    public function store(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealership found.'], 404);
        }

        $data = $request->validate([
            'name'    => ['required', 'string', 'max:150'],
            'channel' => ['required', 'string', 'in:email,whatsapp'],
            'subject' => ['nullable', 'string', 'max:200'],
            'body'    => ['required', 'string'],
        ]);

        $template = Template::create([
            'dealer_id' => $dealer->id,
            'name'      => $data['name'],
            'channel'   => $data['channel'],
            'subject'   => $data['subject'] ?? null,
            'body'      => $data['body'],
        ]);

        return response()->json([
            'success'  => true,
            'message'  => 'Template saved.',
            'template' => $template,
        ], 201);
    }

    /** DELETE /api/dealer/templates/{template} */
    public function destroy(Request $request, Template $template): JsonResponse
    {
        $dealer = $request->user()->currentDealer();
        if (! $dealer || (int) $template->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not allowed.'], 403);
        }

        $template->delete();

        return response()->json(['success' => true, 'message' => 'Template deleted.']);
    }
}