<?php

/*
|--------------------------------------------------------------------------
| Router for PHP's built-in web server
|--------------------------------------------------------------------------
|
| This lets you run the app with the built-in server WITHOUT `php artisan
| serve`, so PHP ini overrides (like a larger upload_max_filesize) can be
| passed on the command line and actually take effect. See start-backend.bat.
|
| It serves real files out of /public and routes everything else through the
| Laravel front controller — exactly like `php artisan serve` does.
|
*/

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Serve existing static files from /public as-is.
if ($uri !== '/' && file_exists(__DIR__ . '/public' . $uri)) {
    return false;
}

$_SERVER['SCRIPT_NAME'] = '/index.php';

require_once __DIR__ . '/public/index.php';
