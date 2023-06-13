<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function store(Request $request)
    {
        $body = $request->input();
        $post = new Post($body);
        $post->title = $body['title'];
        $post->content = $body['content'];
        $post->save();
        return $post;
    }

    public function show(string $id)
    {
        return Post::where('id', $id);
    }

    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        $body = $request->input(); 
        $post->title = $body['title'];
        $post->content = $body['content'];
        $post->save();
        return $post;
    }

    public function destroy(string $id)
    {
        return Post::destroy($id);
    }
}
