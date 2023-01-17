<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\UserRegistrationCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ResendVerificationCodeController extends Controller
{
  public function __invoke(Request $request)
  {
    $request->validate([
      'email' => 'required|email|exists:users,email',
    ]);

    $user = User::where('email', $request->email)->firstOrFail();

    Mail::to($user->email)->send(new UserRegistrationCode(
      $user->firstName,
      $user->email,
      $user->verification_code
    ));

    return response()->json([
      'message' => 'Verification link sent on your email id',
    ]);
  }
}
