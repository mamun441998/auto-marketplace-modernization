<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Faq extends Model
{
    protected $fillable = ['question', 'answer', 'category', 'published', 'sort_order'];
    protected $casts = ['published' => 'boolean', 'sort_order' => 'integer'];
}