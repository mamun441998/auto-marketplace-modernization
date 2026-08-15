# Deploying the MotoHave API to Render

The backend is containerised (`Dockerfile`). Render builds and runs it directly.

## 1. Create the database first (Supabase)

You cannot boot the API without a database. In Supabase:

1. Create a new project.
2. Go to **Project Settings → Database → Connection info** (use the
   **Session pooler / direct connection** values, port `5432`).
3. Copy: host, database name, user, password.

## 2. Create the Render service

1. Render → **New → Web Service** → connect the GitHub repo.
2. **Root Directory:** `backend/laravel`
3. **Runtime / Language:** **Docker** (Render auto-detects the `Dockerfile`).
4. Region: pick the one closest to Supabase.
5. Add the environment variables below, then **Create Web Service**.

Render sets `$PORT` automatically — the container already binds to it.

## 3. Environment variables (Render → Environment)

```
APP_NAME=MotoHave
APP_ENV=production
APP_KEY=            # paste the APP_KEY from your local .env (base64:...). REQUIRED.
APP_DEBUG=false
APP_URL=https://YOUR-SERVICE.onrender.com

# Frontends (used for CORS + auth redirects) — your real Vercel URLs
FRONTEND_URL=https://auto-marketplace-modernization-mocha.vercel.app
DEALER_ADMIN_URL=https://YOUR-DEALER-ADMIN.vercel.app
ADMIN_URL=https://YOUR-ADMIN.vercel.app
SANCTUM_STATEFUL_DOMAINS=auto-marketplace-modernization-mocha.vercel.app

# Database — from Supabase (step 1)
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=YOUR-SUPABASE-DB-PASSWORD

# Framework
LOG_CHANNEL=stack
LOG_LEVEL=error
SESSION_DRIVER=file          # auth is token-based; no sessions table needed
CACHE_STORE=database         # cache table migration is included
QUEUE_CONNECTION=sync        # no separate worker → emails send inline
FILESYSTEM_DISK=public
BCRYPT_ROUNDS=12

# Mail — use Resend (HTTP API). Render BLOCKS outbound SMTP (25/465/587), so
# Gmail/SMTP will hang and time out. Resend sends over HTTPS and works on Render.
#   1. Sign up at https://resend.com (free), create an API key.
#   2. For quick testing use MAIL_FROM_ADDRESS=onboarding@resend.dev and register
#      with the same email you signed up to Resend with.
#   3. For production, verify your domain in Resend and use noreply@yourdomain.
MAIL_MAILER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
MAIL_FROM_ADDRESS=onboarding@resend.dev
MAIL_FROM_NAME=MotoHave

# Payments (Stripe) — test keys for now
STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=
```

Notes:
- **APP_KEY is mandatory.** Copy it from your local `.env`. Without it Laravel
  throws "No application encryption key has been specified."
- `SESSION_DRIVER=file` + `CACHE_STORE=database` + `QUEUE_CONNECTION=sync` mean
  you do **not** need Redis or a separate worker. (Leave all `REDIS_*` unset.)
- The container runs `php artisan migrate --force` on every deploy, so your
  tables are created automatically on first boot.

## 4. After the first successful deploy

1. Copy the live URL (e.g. `https://motohave-api.onrender.com`).
2. In **Vercel**, set each frontend's `NEXT_PUBLIC_API_URL` to
   `https://motohave-api.onrender.com/api` and redeploy.
3. Seed the super-admin / plans if you have a seeder:
   Render → your service → **Shell**:
   `php artisan db:seed --force`

## Heads-up: uploaded files are temporary on Render

Render's disk is **ephemeral** — uploaded logos/vehicle images are wiped on
every redeploy. The `/media` route serves them fine while the container lives,
but for permanent storage move uploads to Supabase Storage or S3 later. Ask and
this can be wired in.
