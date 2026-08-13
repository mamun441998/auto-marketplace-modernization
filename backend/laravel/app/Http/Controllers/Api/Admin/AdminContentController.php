<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminContentController extends Controller
{
    /* ---------- FAQs ---------- */
    public function faqs(): JsonResponse
    {
        return response()->json(['success' => true, 'faqs' => Faq::orderBy('sort_order')->orderByDesc('id')->get()]);
    }

    public function storeFaq(Request $request): JsonResponse
    {
        $data = $this->validateFaq($request);
        $faq = Faq::create($data);
        return response()->json(['success' => true, 'message' => 'FAQ added.', 'faq' => $faq], 201);
    }

    public function updateFaq(Request $request, Faq $faq): JsonResponse
    {
        $faq->update($this->validateFaq($request));
        return response()->json(['success' => true, 'message' => 'FAQ updated.', 'faq' => $faq]);
    }

    public function deleteFaq(Faq $faq): JsonResponse
    {
        $faq->delete();
        return response()->json(['success' => true, 'message' => 'FAQ deleted.']);
    }

    private function validateFaq(Request $request): array
    {
        return $request->validate([
            'question'  => ['required', 'string', 'max:255'],
            'answer'    => ['required', 'string'],
            'category'  => ['nullable', 'string', 'max:50'],
            'published' => ['boolean'],
        ]);
    }

    /* ---------- Testimonials ---------- */
    public function testimonials(): JsonResponse
    {
        return response()->json(['success' => true, 'testimonials' => Testimonial::orderBy('sort_order')->orderByDesc('id')->get()]);
    }

    public function storeTestimonial(Request $request): JsonResponse
    {
        $t = Testimonial::create($this->validateTestimonial($request));
        return response()->json(['success' => true, 'message' => 'Testimonial added.', 'testimonial' => $t], 201);
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial): JsonResponse
    {
        $testimonial->update($this->validateTestimonial($request));
        return response()->json(['success' => true, 'message' => 'Testimonial updated.', 'testimonial' => $testimonial]);
    }

    public function deleteTestimonial(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();
        return response()->json(['success' => true, 'message' => 'Testimonial deleted.']);
    }

    private function validateTestimonial(Request $request): array
    {
        return $request->validate([
            'name'      => ['required', 'string', 'max:120'],
            'company'   => ['nullable', 'string', 'max:150'],
            'role'      => ['nullable', 'string', 'max:100'],
            'rating'    => ['required', 'integer', 'min:1', 'max:5'],
            'quote'     => ['required', 'string'],
            'published' => ['boolean'],
        ]);
    }
}