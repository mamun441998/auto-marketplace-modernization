<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $campaign->subject }}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:24px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
                    <tr>
                        <td style="background:#0C1A32;padding:20px 28px;">
                            <span style="color:#ffffff;font-size:18px;font-weight:bold;">{{ $dealer->name }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px;color:#333333;font-size:15px;line-height:1.6;">
                            @if($recipientName)
                                <p style="margin:0 0 16px;">Hi {{ $recipientName }},</p>
                            @endif
                            <div style="white-space:pre-line;">@php
    $appUrl = rtrim(config('app.url'), '/');
    $trackedBody = nl2br(preg_replace_callback('#https?://[^\s<]+#i', function ($m) use ($appUrl, $campaign) {
        $u = rtrim($m[0], '.,);');
        return '<a href="' . $appUrl . '/track/click/' . $campaign->id . '?url=' . urlencode($u) . '" style="color:#FC5E01;text-decoration:underline;">' . $u . '</a>';
    }, e($campaign->body)));
@endphp
{!! $trackedBody !!}</div>
                        </td>
                    </tr>
                    <tr>
                                                <td style="padding:18px 28px;background:#f4f4f7;color:#888888;font-size:12px;">
                            <p style="margin:0;">Sent by {{ $dealer->name }} · Powered by MotoHave.</p>
                            <img src="{{ rtrim(config('app.url'), '/') }}/track/open/{{ $campaign->id }}" width="1" height="1" alt="" style="display:none;max-height:0;overflow:hidden;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>