<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerifyRegistrationCodeController extends Controller
{
  public function __invoke(Request $request)
  {
    $request->validate([
      'code' => ['required', 'string', 'size:6'],
      'email' => ['required', 'string', 'email', 'exists:users,email']
    ]);

    $user = User::where('email', $request->email)->firstOrFail();

    if ($user->verification_code !== $request->code) {
      return response(['message' => 'Invalid code'], 400);
    }

    $user->email_verified_at = now();
    $user->save();

    return response(['message' => 'Email verified successfully'], 200);
  }
}
