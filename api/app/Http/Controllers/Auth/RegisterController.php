<?php

namespace App\Http\Controllers\Auth;

use App\Constants\Roles;
use App\Http\Controllers\Controller;
use App\Mail\UserRegistrationCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
  public function __invoke(Request $request)
  {
    $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);

    // create a code with 6 digits
    $code = rand(100000, 999999);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'verification_code' => $code,
      'role' => Roles::COACH,
      'remember_token' => Str::random(10),
    ]);

    $token = $user->createToken('JWT')->plainTextToken;

    $response = [
      'user' => $user,
      'token' => $token
    ];

    // send the code to the user
    Mail::to($user->email)->send(new UserRegistrationCode(
      $user->firstName,
      $user->email,
      $code
    ));

    return response($response, 201);
  }
}
