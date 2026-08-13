<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Testimonial;

class ContentController extends Controller
{
    /**
     * Public — published FAQs for the marketing site.
     */
    public function faqs()
    {
        $faqs = Faq::query()
            ->where('published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($f) => [
                'id'       => (int) $f->id,
                'question' => $f->question,
                'answer'   => $f->answer,
                'category' => $f->category,
            ]);

        return response()->json([
            'success' => true,
            'faqs'    => $faqs,
        ]);
    }

    /**
     * Public — published testimonials for the marketing site.
     */
    public function testimonials()
    {
        $testimonials = Testimonial::query()
            ->where('published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($t) => [
                'id'      => (int) $t->id,
                'name'    => $t->name,
                'company' => $t->company,
                'role'    => $t->role,
                'rating'  => (int) $t->rating,
                'quote'   => $t->quote,
            ]);

        return response()->json([
            'success'      => true,
            'testimonials' => $testimonials,
        ]);
    }
}