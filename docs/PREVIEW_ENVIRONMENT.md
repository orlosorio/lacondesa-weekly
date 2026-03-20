# Preview environment (pre-production)

Vercel gives you a **Preview** environment by default. You don’t create it; it’s already there. Use it to test changes before they go to production.

Ref: [Vercel – Environments (Preview)](https://vercel.com/docs/deployments/environments#preview-environment-pre-production)

---

## How it works

| Trigger | Result |
|--------|--------|
| Push to **production branch** (e.g. `main`) | **Production** deployment → updates **lacondesa.mx** / **www.lacondesa.mx** |
| Push to **any other branch** | **Preview** deployment → unique URL, does **not** affect production |
| Open a **pull request** | **Preview** deployment → URL in the PR (and in Vercel dashboard) |
| Run `vercel` (no `--prod`) from CLI | **Preview** deployment → unique URL |

Preview deployments get URLs like:

- `https://lacondesamx-git-<branch>-<team>.vercel.app`
- Or the commit-specific URL shown in the Vercel dashboard / PR.

---

## Why "No Branches" appears when connecting Preview

Vercel only lists **branches that exist in your connected Git repo**. If you only have `main`, the Preview → branch dropdown will show "No Branches".

**Fix:** Create and push at least one non-production branch (e.g. `develop`):

```bash
git checkout -b develop
git push -u origin develop
```

After a minute, refresh the Vercel domain settings; **develop** (and any other branches) should appear. You can then assign a domain to Preview and choose which branch it uses.

---

## 1. Set your production branch (one-time)

So that only the right branch updates **lacondesa.mx**:

1. Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/settings/git**
2. Under **Production Branch**, choose the branch that should deploy to production (usually **main**).
3. Save.

After this, only that branch will update production; all other branches and PRs stay as Preview.

---

## 2. Use the Preview environment

**From Git:**

- Create a branch, push, and open a PR → Vercel will comment with the Preview URL.
- Or push to a non-production branch and open the project in Vercel → **Deployments** → click the latest deployment to get its URL.

**From CLI (without touching production):**

```bash
# Deploy current folder as a Preview (no production domains change)
vercel

# Optional: deploy a specific branch as Preview
vercel --prebuilt
```

---

## 3. Optional: custom environment (e.g. “Staging”)

If you’re on **Pro or Enterprise** and want a dedicated environment (e.g. `staging` with its own domain like `staging.lacondesa.mx`):

1. Open: **https://vercel.com/orlando-m8lcoms-projects/lacondesamx/settings/environments**
2. Click **Create Environment**.
3. Name it (e.g. `staging`), set **Branch Tracking** if you want (e.g. `staging` branch), and optionally attach a domain.
4. Deploy to it via CLI: `vercel deploy --target=staging`.

On the **Hobby** plan you only have **Preview** and **Production**; custom environments are not available.

---

## Summary

- **Preview** = already exists; use other branches and PRs (or `vercel` without `--prod`).
- **Production** = branch set in **Settings → Git** (e.g. `main`); that branch updates **lacondesa.mx**.
- **Custom env (e.g. Staging)** = only on Pro/Enterprise, from **Settings → Environments**.
