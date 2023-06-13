<?php

namespace App\Models;

use App\Models\Attachment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content'];

    public string $title;
    public string $content;

    public function attachments(): BelongsToMany
    {
        return $this->belongsToMany(Attachment::class, 'post_attachments');
    }
}
