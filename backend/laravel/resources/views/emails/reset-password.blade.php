<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Reset your password</title></head>
<body style="margin:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="background:#0A1224;padding:24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:22px;">{{ $appName ?? 'MotoHave' }}</h1>
    </div>
    <div style="padding:32px;">
      <p style="font-size:15px;color:#333;">Hi {{ $user->name }},</p>
      <p style="font-size:15px;color:#333;">Use this code to reset your password:</p>
      <div style="text-align:center;margin:28px 0;">
        <span style="display:inline-block;font-size:32px;letter-spacing:8px;font-weight:bold;color:#FC5E01;background:#FFF3EC;padding:14px 28px;border-radius:10px;">{{ $code }}</span>
      </div>
      <p style="font-size:14px;color:#666;">This code will expire in 60 minutes.</p>
      <p style="font-size:13px;color:#999;">If you didn’t request this, you can ignore this email.</p>
    </div>
  </div>
</body>
</html>