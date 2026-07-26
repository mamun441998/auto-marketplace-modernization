<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Received</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
                    <!-- Header -->
                    <tr>
                        <td style="background:#0A0F1E;padding:24px 32px;">
                            <span style="color:#ffffff;font-size:22px;font-weight:bold;">Moto<span style="color:#FC5E01;">Have</span></span>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:32px;">
                            <h2 style="margin:0 0 12px;color:#111827;font-size:20px;">Thanks, {{ $customerName }}!</h2>

                            @if ($vehicleTitle)
                                <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.6;">
                                    We've received your inquiry about the <strong>{{ $vehicleTitle }}</strong>.
                                    <strong>{{ $dealerName }}</strong> will get back to you as soon as possible.
                                </p>
                            @else
                                <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.6;">
                                    We've received your inquiry.
                                    <strong>{{ $dealerName }}</strong> will get back to you as soon as possible.
                                </p>
                            @endif

                            @if ($customerMessage)
                                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
                                    <p style="margin:0;color:#6b7280;font-size:13px;font-weight:bold;">Your message:</p>
                                    <p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.5;">{{ $customerMessage }}</p>
                                </div>
                            @endif

                            <p style="margin:16px 0 0;color:#9ca3af;font-size:13px;line-height:1.6;">
                                If you didn't make this inquiry, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;color:#9ca3af;font-size:12px;">
                                &copy; {{ date('Y') }} MotoHave. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>