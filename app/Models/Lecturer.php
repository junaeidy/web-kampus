<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lecturer extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id', 'name', 'position', 'photo_path', 'bio', 'is_active',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
