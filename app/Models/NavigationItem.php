<?php

namespace App\Models;

use App\Models\Page;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NavigationItem extends Model
{
    protected $fillable = [
        'label', 'url', 'page_id', 'parent_id', 'order', 'is_active'
    ];

    public function children(): HasMany
    {
        return $this->hasMany(NavigationItem::class, 'parent_id')->orderBy('order');
    }

    public function parent()
    {
        return $this->belongsTo(NavigationItem::class, 'parent_id');
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function scopeWithRecursiveChildren($query, $depth = 10)
    {
        $with = [];
        $relation = 'children';
        for ($i = 0; $i < $depth; $i++) {
            $with[] = $relation . ($i ? str_repeat('.children', $i) . '.page' : '.page');
        }

        return $query->with($with);
    }

}
