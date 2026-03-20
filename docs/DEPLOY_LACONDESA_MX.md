# Deploy production at lacondesa.mx

Your app is deployed as **lacondesamx** and is live at `https://lacondesamx.vercel.app`.  
The domain **lacondesa.mx** is currently assigned to a different project (**lacondesa-weekly-stu4**). To serve this codebase at lacondesa.mx:

## 1. Remove lacondesa.mx from the old project

1. Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesa-weekly-stu4/settings/domains**
2. Find **lacondesa.mx** in the list.
3. Click the **⋮** (three dots) next to it → **Remove**.

## 2. Add lacondesa.mx to this project (lacondesamx)

1. Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/settings/domains**
2. Click **Add** and enter: `lacondesa.mx`
3. Confirm (Vercel will use the existing DNS/nameservers).

After that, **lacondesa.mx** will point to the **lacondesamx** project and your latest deploy will be live there. No redeploy is required unless you change code or env.

---

## If lacondesa.mx is on TWO projects (404 even after deploy)

**Cause:** The domain can be assigned to both **lacondesa-weekly-stu4** and **lacondesamx**. Vercel may then serve the wrong project and show 404.

**Fix:** Remove it from the project you are *not* using:

1. Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesa-weekly-stu4/settings/domains**
2. Find **lacondesa.mx** → **⋮** → **Remove** (removes from this project only; it stays on lacondesamx).
3. Wait ~1 minute and try **https://lacondesa.mx** again.

---

## If deployment URL or lacondesa.mx returns 401 or 404

**401 Unauthorized:** The project has **Deployment Protection** enabled (password or Vercel login). Requests are blocked before they reach the app.

**Fix (do this in the dashboard):** Open **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/settings/deployment-protection** → find the **Production** section → set protection to **None** (or Disabled) → Save. Wait 1–2 min, then try https://lacondesa.mx in an incognito window. If you use **Standard** protection, add `lacondesa.mx` and `www.lacondesa.mx` to the domain exceptions so production is public.

**Why you see 404 on lacondesa.mx but 401 on the deployment URL:** With protection on, the deployment URL shows the login page (401). The production domain can be configured to bypass login; if the deployment still can’t be served (e.g. not in the bypass list), the edge returns 404 instead. Setting Production to **None** fixes both.

---

## If WhatsApp (or LinkedIn/Twitter) doesn’t show your Open Graph image

The site emits `og:image` and `twitter:image` from **Site Settings → SEO & branding** in Sanity. If the image still doesn’t appear when you paste a link:

1. **Refresh the platform’s cache**  
   - **WhatsApp** uses the same cache as Facebook. Open **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)** → enter `https://lacondesa.mx` → click **Debug**, then **Scrape Again** once or twice.  
   - After that, try pasting the link again in WhatsApp. If it still shows the old preview, paste a **new** URL so the app fetches it again: e.g. `https://lacondesa.mx/?v=2` (the `?v=2` makes WhatsApp treat it as a different URL and re-fetch).

2. **Check the image in Sanity**  
   In **Site Settings → SEO & branding**, ensure **Open Graph Image** is set and published. The image should be at least **1200×630** and under 5MB (JPG/PNG/GIF).

3. **Confirm what’s in the HTML**  
   View source on `https://lacondesa.mx` and search for `og:image`. You should see a `content` URL pointing to `cdn.sanity.io`. If it’s there, the problem is almost always cache; use step 1.

---

## If the project was built as "Other" (wrong framework)

If in Vercel the project shows **Framework Preset: Other**, Vercel may serve the `public` folder as static files instead of running the Next.js app, which causes 404 (no `index.html` in `public`). The repo now forces Next.js via `vercel.json` (`"framework": "nextjs"`). **Redeploy** after this change so the next build uses the Next.js builder.

---

## If you see "404: NOT_FOUND" (Vercel’s default page)

That means the request is **not** reaching this app. Fix it in Vercel:

1. **Confirm Production deployment**
   - Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/deployments**
   - Find the latest **successful** deployment and ensure it is the **Production** deployment (not only Preview). If the latest prod deployment is old or missing, run a new production deploy (e.g. from main).

2. **Confirm every domain → Production**
   - Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/settings/domains**
   - For **lacondesa.mx**, **www.lacondesa.mx**, and **lacondesamx.vercel.app**, ensure each is connected to **Production** (not Preview). If **lacondesamx.vercel.app** was set to Preview, change it to Production so the main Vercel URL serves the live site.

3. **Redeploy once**
   - In the same project: **Deployments** → **⋯** on the latest deployment → **Promote to Production** (if it isn’t already), or push a new commit to the production branch to trigger a new deploy.

4. **Test both URLs**
   - Try **https://lacondesa.mx** and **https://www.lacondesa.mx** after a minute; both should serve the app (www redirects to apex).
