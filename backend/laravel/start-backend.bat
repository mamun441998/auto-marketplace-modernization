@echo off
REM ============================================================================
REM  MotoHave backend launcher (Windows)
REM ----------------------------------------------------------------------------
REM  Use this INSTEAD of `php artisan serve`.
REM
REM  It starts PHP's built-in web server with a larger upload limit so logo /
REM  vehicle-image uploads up to 5MB work — without editing your global php.ini.
REM  (`php artisan serve` reads the CLI php.ini, whose default upload_max_filesize
REM  is only 2MB, which is why >2MB uploads fail with "The logo failed to upload".)
REM
REM  Just double-click this file, or run:  start-backend.bat
REM  Then the API is available at http://127.0.0.1:8000
REM ============================================================================

cd /d "%~dp0"

echo Starting MotoHave backend on http://127.0.0.1:8000  (upload limit: 6MB)
echo Press Ctrl+C to stop.
echo.

php -d upload_max_filesize=6M -d post_max_size=8M -d memory_limit=256M -d max_execution_time=120 -S 127.0.0.1:8000 server.php
