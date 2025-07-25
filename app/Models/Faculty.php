<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name',
        'description',
        'logo_path',
    ];

    public function lecturers()
    {
        return $this->hasMany(Lecturer::class);
    }
}
