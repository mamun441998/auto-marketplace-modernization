<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lead\StoreLeadRequest;
use App\Http\Resources\LeadResource;
use App\Models\Dealer;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Vehicle;
use App\Mail\LeadInquiryMail;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    private const STATUSES = ['new', 'contacted', 'qualified', 'closed', 'lost'];

    /* =====================================================================
     |  PUBLIC — visitor submits a lead
     |=====================================================================*/

        /**
     * POST /api/leads
     */
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $lead = new Lead();
            $lead->fill($data);
            $lead->uuid   = (string) Str::uuid();
            $lead->status = 'new';
            $lead->save();

            // Send a confirmation email to the visitor (if they gave an email).
            if (! empty($lead->email)) {
                try {
                    $dealerName = Dealer::where('id', $lead->dealer_id)->value('name') ?? 'the dealer';

                    $vehicleTitle = $lead->vehicle_id
                        ? Vehicle::where('id', $lead->vehicle_id)->value('title')
                        : null;

                    Mail::to($lead->email)->send(
                        new LeadInquiryMail($lead->name, $dealerName, $vehicleTitle, $lead->message)
                    );
                } catch (\Throwable $mailError) {
                    // Don't fail the inquiry if the email can't be sent.
                    Log::error('Lead inquiry mail failed', ['error' => $mailError->getMessage()]);
                }
            }
        } catch (\Throwable $e) {
            Log::error('Lead creation failed', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to submit your inquiry. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your inquiry has been sent. The dealer will contact you soon.',
            'lead'    => new LeadResource($lead),
        ], Response::HTTP_CREATED);
    }
    
    /* =====================================================================
     |  DEALER (AUTHENTICATED)
     |=====================================================================*/

    /**
     * GET /api/dealer/leads
     */
    public function dealerLeads(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $query = Lead::query()
            ->with('vehicle')
            ->byDealer($dealer->id);

        if ($request->filled('search')) {
            $query->search($request->string('search'));
        }

        if ($request->filled('status') && in_array($request->input('status'), self::STATUSES, true)) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('source')) {
            $query->where('source', $request->input('source'));
        }

        $query->latestFirst();

        $perPage = (int) $request->integer('per_page', 20);
        $perPage = max(1, min($perPage, 100));

        $leads = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'success' => true,
            'leads'   => LeadResource::collection($leads),
            'meta'    => [
                'current_page' => $leads->currentPage(),
                'last_page'    => $leads->lastPage(),
                'per_page'     => $leads->perPage(),
                'total'        => $leads->total(),
            ],
        ]);
    }

    /**
     * GET /api/dealer/leads/stats
     * Counts for dashboard (by status + by source).
     */
    public function stats(Request $request): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        $base = Lead::byDealer($dealer->id);

        $byStatus = (clone $base)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $bySource = (clone $base)
            ->selectRaw('source, count(*) as total')
            ->groupBy('source')
            ->pluck('total', 'source');

        return response()->json([
            'success' => true,
            'stats'   => [
                'total'     => (clone $base)->count(),
                'by_status' => $byStatus,
                'by_source' => $bySource,
            ],
        ]);
    }

    /**
     * GET /api/dealer/leads/{lead}
     */
    public function show(Request $request, Lead $lead): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeLead($dealer, $lead)) {
            return $denied;
        }

        $lead->load('vehicle');

        return response()->json([
            'success' => true,
            'lead'    => new LeadResource($lead),
        ]);
    }

    /**
     * PATCH /api/dealer/leads/{lead}/status
     */
    public function updateStatus(Request $request, Lead $lead): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeLead($dealer, $lead)) {
            return $denied;
        }

        $validated = $request->validate([
            'status' => ['required', Rule::in(self::STATUSES)],
        ]);

        try {
            $lead->update(['status' => $validated['status']]);
        } catch (\Throwable $e) {
            Log::error('Lead status update failed', [
                'lead_id' => $lead->id,
                'error'   => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update lead status.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lead status updated.',
            'lead'    => new LeadResource($lead->fresh('vehicle')),
        ]);
    }

    /**
     * DELETE /api/dealer/leads/{lead}
     */
    public function destroy(Request $request, Lead $lead): JsonResponse
    {
        $dealer = $this->getDealer($request);

        if (! $dealer) {
            return $this->noDealerResponse();
        }

        if ($denied = $this->authorizeLead($dealer, $lead)) {
            return $denied;
        }

        try {
            $lead->delete();
        } catch (\Throwable $e) {
            Log::error('Lead deletion failed', [
                'lead_id' => $lead->id,
                'error'   => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete lead.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lead deleted successfully.',
        ]);
    }

    /* =====================================================================
     |  PRIVATE HELPERS
     |=====================================================================*/

    private function getDealer(Request $request): ?Dealer
    {
        return Dealer::where('user_id', $request->user()->id)->first();
    }

    private function authorizeLead(Dealer $dealer, Lead $lead): ?JsonResponse
    {
        if ((int) $lead->dealer_id !== (int) $dealer->id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not allowed to access this lead.',
            ], Response::HTTP_FORBIDDEN);
        }

        return null;
    }

    private function noDealerResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'No dealership profile found. Please create your dealership first.',
        ], Response::HTTP_FORBIDDEN);
    }
}