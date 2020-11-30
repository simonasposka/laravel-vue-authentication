<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request): Response
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response(Auth::user(), 200);
        }

        abort(401);
    }

    public function logout()
    {
        Auth::logout();
        return response(null, 200);
    }
}
