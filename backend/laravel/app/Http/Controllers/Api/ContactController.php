<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * Store Contact Form (public website contact form)
     * --------------------------------------------------------------------------
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
            ],

            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],

            'message' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | TODO
        |--------------------------------------------------------------------------
        | Later we will:
        | - Save to database
        | - Send email notification
        | - Create CRM Lead
        | - Notify Admin
        */

        Log::info('Contact Form Submitted', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your message has been received.',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Marketing — Contact list / CSV import / delete
    | (dealer-scoped, used by the dealer-admin Marketing module)
    |--------------------------------------------------------------------------
    */

    /**
     * List contacts for the current dealer (with optional search).
     */
    public function index(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealer found'], 403);
        }

        $query = Contact::where('dealer_id', $dealer->id);

        if ($search = trim((string) $request->query('search', ''))) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                    ->orWhere('email', 'ilike', "%{$search}%")
                    ->orWhere('phone', 'ilike', "%{$search}%");
            });
        }

        $contacts = $query->orderByDesc('id')->limit(1000)->get();

        return response()->json([
            'success'    => true,
            'contacts'   => $contacts->map(fn ($c) => $this->present($c)),
            'total'      => Contact::where('dealer_id', $dealer->id)->count(),
            'with_email' => Contact::where('dealer_id', $dealer->id)->whereNotNull('email')->where('email', '!=', '')->count(),
            'with_phone' => Contact::where('dealer_id', $dealer->id)->whereNotNull('phone')->where('phone', '!=', '')->count(),
        ]);
    }

    /**
     * Import contacts from an uploaded CSV file.
     * Expected columns (header row, case-insensitive): name, email, phone, tag
     */
    public function import(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealer found'], 403);
        }

        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:5120', // 5 MB
        ]);

        $path = $request->file('file')->getRealPath();
        $rows = array_map('str_getcsv', file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));

        if (empty($rows)) {
            return response()->json(['success' => false, 'message' => 'CSV file is empty'], 422);
        }

        // Detect header row and map columns
        $header = array_map(fn ($h) => strtolower(trim((string) $h)), $rows[0]);
        $map = [
            'name'  => $this->findColumn($header, ['name', 'full name', 'fullname', 'contact']),
            'email' => $this->findColumn($header, ['email', 'e-mail', 'email address']),
            'phone' => $this->findColumn($header, ['phone', 'mobile', 'number', 'phone number', 'contact number', 'whatsapp']),
            'tag'   => $this->findColumn($header, ['tag', 'group', 'label']),
        ];

        // If no recognizable header, assume col0=name, col1=email, col2=phone
        $hasHeader = $map['name'] !== null || $map['email'] !== null || $map['phone'] !== null;
        if (! $hasHeader) {
            $map = ['name' => 0, 'email' => 1, 'phone' => 2, 'tag' => null];
            $dataRows = $rows;
        } else {
            $dataRows = array_slice($rows, 1);
        }

        // Load existing keys to avoid duplicates
        $existingEmails = Contact::where('dealer_id', $dealer->id)
            ->whereNotNull('email')->pluck('email')->map(fn ($e) => strtolower($e))->flip();
        $existingPhones = Contact::where('dealer_id', $dealer->id)
            ->whereNotNull('phone')->pluck('phone')->map(fn ($p) => $this->normalizePhone($p))->flip();

        $imported = 0;
        $skipped = 0;
        $seenInFile = [];
        $batch = [];
        $now = now();

        foreach ($dataRows as $row) {
            $name  = $this->cell($row, $map['name']);
            $email = strtolower($this->cell($row, $map['email']));
            $phone = $this->normalizePhone($this->cell($row, $map['phone']));
            $tag   = $this->cell($row, $map['tag']);

            // Must have at least an email or phone
            if ($email === '' && $phone === '') {
                $skipped++;
                continue;
            }

            $key = $email !== '' ? "e:{$email}" : "p:{$phone}";

            // Duplicate within file
            if (isset($seenInFile[$key])) {
                $skipped++;
                continue;
            }
            $seenInFile[$key] = true;

            // Duplicate against DB
            if (($email !== '' && $existingEmails->has($email)) ||
                ($phone !== '' && $existingPhones->has($phone))) {
                $skipped++;
                continue;
            }

            $batch[] = [
                'dealer_id'  => $dealer->id,
                'name'       => $name !== '' ? $name : null,
                'email'      => $email !== '' ? $email : null,
                'phone'      => $phone !== '' ? $phone : null,
                'source'     => 'import',
                'tag'        => $tag !== '' ? $tag : null,
                'created_at' => $now,
                'updated_at' => $now,
            ];
            $imported++;

            if (count($batch) >= 500) {
                Contact::insert($batch);
                $batch = [];
            }
        }

        if (! empty($batch)) {
            Contact::insert($batch);
        }

        return response()->json([
            'success'  => true,
            'message'  => "Imported {$imported} contact(s), skipped {$skipped} duplicate/empty row(s).",
            'imported' => $imported,
            'skipped'  => $skipped,
        ]);
    }

    /**
     * Delete a single contact.
     */
    public function destroy(Request $request, Contact $contact): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer || (int) $contact->dealer_id !== (int) $dealer->id) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }

        $contact->delete();

        return response()->json(['success' => true, 'message' => 'Contact deleted']);
    }

    /**
     * Delete ALL contacts for the current dealer.
     */
    public function clear(Request $request): JsonResponse
    {
        $dealer = $request->user()->currentDealer();

        if (! $dealer) {
            return response()->json(['success' => false, 'message' => 'No dealer found'], 403);
        }

        $count = Contact::where('dealer_id', $dealer->id)->delete();

        return response()->json([
            'success' => true,
            'message' => "Deleted {$count} contact(s).",
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    private function present(Contact $c): array
    {
        return [
            'id'         => $c->id,
            'name'       => $c->name,
            'email'      => $c->email,
            'phone'      => $c->phone,
            'source'     => $c->source,
            'tag'        => $c->tag,
            'created_at' => optional($c->created_at)->toDateString(),
        ];
    }

    private function findColumn(array $header, array $candidates): ?int
    {
        foreach ($candidates as $cand) {
            $idx = array_search($cand, $header, true);
            if ($idx !== false) {
                return $idx;
            }
        }
        return null;
    }

    private function cell(array $row, ?int $idx): string
    {
        if ($idx === null || ! isset($row[$idx])) {
            return '';
        }
        return trim((string) $row[$idx]);
    }

    private function normalizePhone(string $phone): string
    {
        $phone = trim($phone);
        if ($phone === '') {
            return '';
        }
        // Keep leading + and digits only
        $plus = str_starts_with($phone, '+') ? '+' : '';
        return $plus . preg_replace('/\D+/', '', $phone);
    }
}