<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
  public function __invoke(Request $request)
  {
    return auth()->user();
  }
}
