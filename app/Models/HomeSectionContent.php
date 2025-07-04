<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeSectionContent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'home_section_id',
        'headline',
        'description',
        'image',
        'title',
        'button_text',
        'cta_link',
    ];

    /**
     * Get the home section that owns the content.
     */
    public function homeSection()
    {
        return $this->belongsTo(HomeSection::class);
    }
}