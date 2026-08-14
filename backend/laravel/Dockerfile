# ============================================================================
#  MotoHave Laravel API — production image for Render (or any Docker host)
# ----------------------------------------------------------------------------
#  Apache + mod_php 8.3. Serves from /public, runs Laravel routing via the
#  existing public/.htaccess, connects to PostgreSQL (Supabase), and binds to
#  the $PORT that Render provides at runtime.
# ============================================================================
FROM php:8.3-apache

# ---- System libraries + PHP extensions ------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip zip \
        libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" pdo_pgsql pgsql gd zip bcmath intl \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/*

# ---- Composer --------------------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Apache: serve from Laravel's /public ---------------------------------
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
COPY docker/apache-vhost.conf /etc/apache2/sites-available/000-default.conf

# ---- Larger upload limit (logos / vehicle images up to 5MB) ---------------
COPY docker/php.ini /usr/local/etc/php/conf.d/zzz-motohave.ini

WORKDIR /var/www/html

# ---- Install PHP dependencies (cached layer) ------------------------------
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# ---- App source ------------------------------------------------------------
COPY . .
RUN composer dump-autoload --optimize --no-dev \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# ---- Entrypoint: migrate + cache + bind to $PORT --------------------------
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["entrypoint.sh"]
