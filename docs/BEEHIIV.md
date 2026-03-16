# Beehiiv newsletter setup

If the signup form shows "Subscription is temporarily unavailable" or Beehiiv returns an API key error, the **API key** in Vercel is wrong or missing.

## Get the correct API key

1. Go to **[app.beehiiv.com](https://app.beehiiv.com)** and log in.
2. Open **Settings** (gear) → **API** (under Workspace Settings).
3. Click **Create New API Key**.
4. **Copy the key immediately** — Beehiiv only shows it once. If you leave the page, you must create a new key.
5. In **Vercel** → your project → **Settings** → **Environment Variables**:
   - Set **BEEHIIV_API_KEY** to the key you just copied.
   - Keep **BEEHIIV_PUBLICATION_ID** as `pub_5ac6b434-5060-4dc2-870f-7e3aff734481` (or your publication ID).
6. **Redeploy** the project (Deployments → … → Redeploy) so the new variable is used.

The value you use for **BEEHIIV_API_KEY** must be the long token from “Create New API Key”, not the publication ID or any other ID from the dashboard.

## Test the key directly

Run in a terminal (replace `YOUR_API_KEY` with your actual key):

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST "https://api.beehiiv.com/v2/publications/pub_5ac6b434-5060-4dc2-870f-7e3aff734481/subscriptions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"email":"test@example.com","reactivate_existing":false,"send_welcome_email":false}'
```

- **HTTP 200** = key works. In Vercel set BEEHIIV_API_KEY to that key for Production and Redeploy.
- **HTTP 401** = key invalid or account needs Beehiiv/Stripe verification.
