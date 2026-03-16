# Deploy La Condesa Weekly to lacondesa.mx

Follow these steps to put the site live and connect your GoDaddy domain.

---

## Step 1: Push your code to GitHub

If the project isn’t in a repo yet:

```bash
cd /Users/orlandoosorio/Desktop/lacondesamx
git init
git add .
git commit -m "Initial commit"
```

Create a new repository on [github.com](https://github.com/new) (e.g. `lacondesa-weekly`), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

---

## Step 2: Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (use “Continue with GitHub”).
2. Click **Add New…** → **Project**.
3. Import your GitHub repo (e.g. `lacondesa-weekly`). Click **Import**.
4. **Before deploying**, open **Environment Variables** and add:

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `akhh5wfz` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |

5. Click **Deploy**. Wait for the build to finish. You’ll get a URL like `something.vercel.app`.

---

## Step 3: Add your domain in Vercel

1. In the Vercel project, go to **Settings** → **Domains**.
2. In “Add domain”, type: **lacondesa.mx** → **Add**.
3. Add a second domain: **www.lacondesa.mx** → **Add**.
4. Vercel will show “Invalid configuration” until DNS is set. Leave this tab open; you’ll come back to refresh.

---

## Step 4: Point GoDaddy DNS to Vercel

1. Go to **[godaddy.com](https://godaddy.com)** → **My Products**.
2. Find **lacondesa.mx** and click **DNS** (or **Manage DNS**).
3. You’ll see a list of records. **Add or edit these:**

### Record 1 – Root domain (lacondesa.mx)

- **Type:** A  
- **Name:** `@` (or leave blank if GoDaddy uses “@” for root)  
- **Value:** `76.76.21.21`  
- **TTL:** 600 (or 1 hour)  
- Save.

### Record 2 – www (www.lacondesa.mx)

- **Type:** CNAME  
- **Name:** `www`  
- **Value:** `cname.vercel-dns.com`  
- **TTL:** 600 (or 1 hour)  
- Save.

4. **Remove** any other A or CNAME records that point the domain somewhere else (e.g. GoDaddy parking page), or they will conflict.
5. Wait 5–60 minutes (sometimes up to 24–48 hours). Then in Vercel **Settings** → **Domains**, click **Refresh** next to lacondesa.mx. When it turns green, the domain is connected.

---

## Step 5: Sanity CORS (so the live site can load content)

1. Go to **[sanity.io/manage](https://www.sanity.io/manage)** → open project **akhh5wfz**.
2. **API** → **CORS origins**.
3. **Add CORS origin:**
   - **Origin:** `https://lacondesa.mx`  
   - **Allow credentials:** checked  
4. Add another:
   - **Origin:** `https://www.lacondesa.mx`  
   - **Allow credentials:** checked  

Save. Your production site can now load content from Sanity.

---

## Step 6: Test

- Open **https://lacondesa.mx** — you should see the La Condesa Weekly site.
- Open **https://www.lacondesa.mx** — it should redirect to **https://lacondesa.mx** (handled by `vercel.json`).

---

## Quick reference

| Step | Where | What to do |
|------|--------|------------|
| 1 | GitHub | Push this repo to a new repository |
| 2 | Vercel | New Project → import repo, add env vars, Deploy |
| 3 | Vercel → Domains | Add lacondesa.mx and www.lacondesa.mx |
| 4 | GoDaddy → DNS | A @ → 76.76.21.21; CNAME www → cname.vercel-dns.com |
| 5 | Sanity → API → CORS | Add https://lacondesa.mx and https://www.lacondesa.mx |
| 6 | Browser | Visit https://lacondesa.mx |

If the domain stays “Invalid” in Vercel, wait longer for DNS and try **Refresh** again. For SSL issues, Vercel will issue the certificate automatically once DNS is correct.
