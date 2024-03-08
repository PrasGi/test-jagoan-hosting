<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validate = Validator::make($request->only('email', 'password'), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Bad Request',
                'errors' => $validate->errors()
            ], 400);
        }

        if (!auth()->attempt($validate->validated())) {
            return response()->json([
                'status_code' => 401,
                'message' => 'Email atau password salah'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        return response()->json([
            'status_code' => 200,
            'message' => 'Success login',
            'data' => [
                'token' => $user->createToken('auth_token')->plainTextToken,
                'user' => $user
            ]
        ]);
    }
}