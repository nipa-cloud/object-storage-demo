<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'mime_type', 'status'];

    protected $maps = [
        'mime_type' => 'mimeType'
    ];

    protected $append = ['mimeType'];

    public function getMimeTypeAttribute()
    {
        return $this->attributes['mime_type'];
    }

    public string $key;
    public string $status;
    public string $mimeType;


    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_attachments');
    }
}
