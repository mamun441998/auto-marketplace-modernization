#!/usr/bin/env bash
set -e

# Render provides $PORT at runtime; default to 8080 locally.
PORT="${PORT:-8080}"

# Bind Apache to the runtime port.
sed -i "s/^Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/\${PORT}/${PORT}/g" /etc/apache2/sites-available/000-default.conf

echo "==> Running database migrations..."
php artisan migrate --force

echo "==> Linking storage (safe if already linked)..."
php artisan storage:link || true

echo "==> Caching config, routes and views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Starting Apache on port ${PORT}"
exec apache2-foreground
