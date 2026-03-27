# La Condesa Weekly

A Next.js site for the La Condesa Weekly newsletter (lacondesa.mx), with content managed in Sanity CMS.

---

## 1. Run the site locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. The site uses your existing `.env.local` (project ID `akhh5wfz`). If Sanity isn’t set up yet, the site still works with built-in placeholder content.

---

## 2. Sanity setup (one-time)

### Create a Sanity project (if you haven’t)

1. Go to **[sanity.io/manage](https://www.sanity.io/manage)** and sign in.
2. Create a project (or use the one with ID `akhh5wfz`).
3. Note the **Project ID** and **Dataset** (usually `production`).

### Configure CORS so the Studio can load

1. In [sanity.io/manage](https://www.sanity.io/manage), open your project.
2. Go to **API** → **CORS origins**.
3. Click **Add CORS origin** and add:
   - **Origin**: `http://localhost:3000`
   - Leave **Allow credentials** checked.
4. For production, add your real domain (e.g. `https://lacondesa.mx`) the same way.

### Open the content studio

With the dev server running:

- Open **http://localhost:3000/studio**

You’ll see the Sanity Studio where you manage:

- **Articles** – blog posts (title, slug, excerpt, category, date, featured image, body with rich text).
- **Stories (La Condesa)** – “Humans of”-style portrait stories for the **`/stories`** section (name, slug, category, hero photo, summary, interview Q&A, optional secondary photos). Publish at least one document for the collection page to list entries.
- **Archive Issues** – newsletter issues (number, title, date, slug).
- **Testimonials** – reader quotes for the homepage.
- **Site Settings** – single doc for subscriber count, open rate, social links, hero image.

---

## 3. Add content

### First time: create Site Settings

1. In the Studio sidebar, click **Site Settings**.
2. Create the document (it’s a singleton). Add subscriber count, open rate, Instagram/TikTok URLs, and optional hero image.
3. Publish.

### Add an article

1. Go to **Articles** → **Create new**.
2. Fill in **Title**, then click **Generate** on the **Slug** field.
3. Add **Excerpt**, **Category**, **Publish Date**, **Read time**, and **Featured image** (upload or select).
4. In **Body**, use the editor for paragraphs, headings (H2, H3), blockquotes, and links.
5. Click **Publish**.

### Add testimonials and archive issues

- **Testimonials**: Name, initials (e.g. MG), quote, detail (e.g. “Condesa resident, 3 years”). Use **Display order** to order them.
- **Archive issues**: Issue number, title, date, and slug (e.g. `issue-47`). Publish.

Once you have content in Sanity, the homepage, blog, and archive will use it automatically (with fallback to placeholder data if the API fails).

---

## 4. Environment variables

Your `.env.local` should have:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="akhh5wfz"
NEXT_PUBLIC_SANITY_DATASET="production"
```

For draft content or private APIs you can add:

```env
SANITY_API_READ_TOKEN="your-token"
```

Create the token under **API** → **Tokens** in the Sanity dashboard.

To refresh **`/stories`** after publishing in Sanity (on-demand revalidation), set a random secret and call the webhook:

```env
REVALIDATE_SECRET="your-long-random-string"
```

Then configure a Sanity webhook (Manage → API → Webhooks) to `POST` to `https://your-domain.com/api/revalidate?secret=YOUR_SECRET` on create/update/delete of **historia** documents. See `.env.local.example` for variable names.

---

## 5. Build and deploy

```bash
npm run build
```

For Vercel:

1. Import the repo and deploy.
2. In the project settings, add the same env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).
3. In Sanity **API** → **CORS origins**, add your production URL (e.g. `https://lacondesa.mx` or your Vercel URL).

---

## 6. Quick reference

| What              | Where / How                                      |
|-------------------|--------------------------------------------------|
| Run site          | `npm run dev` → http://localhost:3000            |
| Edit content      | http://localhost:3000/studio                     |
| Sanity dashboard  | [sanity.io/manage](https://www.sanity.io/manage) |
| CORS settings     | Sanity project → API → CORS origins              |
| Env vars          | `.env.local` (don’t commit secrets)              |

If something doesn’t load (e.g. Studio or images), check CORS and that `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your Sanity project.
