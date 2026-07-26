<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Verify Email</title>
</head>

<body style="margin:0;padding:0;background:#F5F7FB;font-family:Arial,Helvetica,sans-serif;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
Verify your MotoHave account and start your free dealership trial.</div>

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">

    <!-- Header -->

    <tr>
        <td style="background:#FC5E01;padding:28px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:30px;">
                MotoHave
            </h1>

            <p style="margin:10px 0 0;color:#FFE8D8;font-size:14px;">
                Automotive Dealership SaaS Platform
            </p>
        </td>
    </tr>

    <!-- Body -->

    <tr>
        <td style="padding:40px;">

            <h2 style="margin-top:0;color:#111827;">
                Hello {{ $user->name }},
            </h2>

            <p style="font-size:15px;color:#4B5563;line-height:28px;">
                Thank you for creating your MotoHave account.
            </p>

            <p style="font-size:15px;color:#4B5563;line-height:28px;">
                Please verify your email address using the verification code below.
            </p>

            <div style="margin:40px 0;text-align:center;">

                <div style="
                    display:inline-block;
                    background:#FC5E01;
                    color:#ffffff;
                    font-size:34px;
                    font-weight:bold;
                    letter-spacing:12px;
                    padding:18px 34px;
                    border-radius:10px;
                ">
                    {{ $code }}
                </div>

            </div>

            <p style="font-size:14px;color:#6B7280;">
                This verification code will expire in
                <strong>10 minutes</strong>.
            </p>

            <p style="font-size:14px;color:#6B7280;">
                If you didn't create this account, you can safely ignore this email.
            </p>

        </td>
    </tr>

    <!-- Footer -->

    <tr>
        <td style="padding:28px;background:#F9FAFB;text-align:center;">
            <p style="margin:0;font-size:13px;color:#6B7280;">
                © {{ date('Y') }} {{ $appName }}
            </p>
            <p style="margin-top:8px;font-size:12px;color:#9CA3AF;">
                Need help? 
                <a href="mailto:{{ $supportEmail }}" style="color:#FC5E01;text-decoration:none;">
                    {{ $supportEmail }}
                </a>
            </p>
        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>