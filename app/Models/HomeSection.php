<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'section_type',
        'order',
        'multiple_content',
    ];

    /**
     * Get the contents for the home section.
     */
    public function contents()
    {
        return $this->hasMany(HomeSectionContent::class);
    }
}