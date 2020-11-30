<?php

namespace App\Http\Controllers;

class PostsController extends Controller
{
    public function index(): array
    {
        return [
            [
                'title' => 'Hello, world',
                'text'  => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'
            ],
            [
                'title' => 'Duis aute irure dolor in reprehenderit',
                'text'  => 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            ]
        ];
    }
}
