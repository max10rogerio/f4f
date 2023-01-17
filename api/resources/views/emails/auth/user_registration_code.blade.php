<h1>Hi {{$name}}</h1>
<br>
<p>Thank you for registering with us. Your registration code is: <strong>{{$code}}</strong></p>
<p>OR</p>
<p>Click on the link below to verify your email address</p>
<p><a href="{{env('app.frontend.url')}}/register?email={{$email}}&code={{$code}}">Verify Email</a></p>