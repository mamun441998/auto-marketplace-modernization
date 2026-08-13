<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Testimonial extends Model
{
    protected $fillable = ['name', 'company', 'role', 'rating', 'quote', 'published', 'sort_order'];
    protected $casts = ['published' => 'boolean', 'rating' => 'integer', 'sort_order' => 'integer'];
}