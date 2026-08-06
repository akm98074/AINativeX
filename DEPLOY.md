# Deploying AINativeX

The site is static — `index.html` at the root, everything else beside it. There
is no build step, so any host that serves files will do. Three paths, in the
order most people should pick them.

- **Option A — GitHub Pages (already live).** Pages serves the repo root
  straight from `main` on every push. No workflow, no build step.
  **Recommended if the repo lives on GitHub.**
- **Option B — Cloudflare Pages / Netlify.** Same idea, different host: connect
  the repo, no build command, output directory `/`.
- **Option C — cPanel / GoDaddy-style hosting.** Upload the files into
  `public_html`. `.htaccess` is already written for this case.

---

## Option A — GitHub Pages

The site is configured for the project-page URL
**<https://akm98074.github.io/AINativeX/>**.

### How it publishes

**Settings → Pages → Build and deployment** is set to **Source: Deploy from a
branch**, branch `main`, folder `/ (root)`. That is the whole configuration.
GitHub's own *pages build and deployment* job runs on every push to `main` and
serves the repo root as-is — this repo has no workflow file and needs none.

Updates: edit, commit, push to `main`. The job usually publishes within a minute
or two, but it can sit `queued` noticeably longer when GitHub's shared runners
are busy — that is a wait, not a failure. Watch it under **Actions → pages build
and deployment**, and hard-refresh the page afterwards, since Pages caches
aggressively.

> **On the deleted workflows.** Earlier revisions shipped
> `.github/workflows/deploy-pages.yml` and `static.yml`, which deployed via
> **Source: GitHub Actions**. Both have been removed: they were disabled, they
> failed on every attempt, and the branch source above is what actually
> publishes the site. The two approaches are alternatives, not complements —
> if you ever switch the source back to GitHub Actions, you must restore a
> workflow at the same time, or nothing will deploy.
>
> Note for that path: the `GITHUB_TOKEN` isn't allowed to create a Pages site,
> so `actions/configure-pages` with `enablement: true` fails the run with
> *"Resource not accessible by integration"* — the source has to be switched in
> the browser first.

### Switching to the custom domain

The site currently hardcodes the github.io base URL in a few places. To move it
to `ainativex.ai`:

1. Add a `CNAME` file at the repo root containing `ainativex.ai`, and set the
   same value in **Settings → Pages → Custom domain**.
2. Point DNS at GitHub:
   - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `akm98074.github.io`
3. Swap the base URL in:
   - `index.html` — `canonical`, `og:url`, `og:image`, `twitter:image`, and the
     three JSON-LD URLs
   - `sitemap.xml` — `<loc>`, and `robots.txt` — `Sitemap:`
   - `404.html` — the four absolute `/AINativeX/...` paths become `/...`
4. Tick **Enforce HTTPS** once the certificate is issued (minutes, occasionally
   up to an hour).

---

## Option B — Cloudflare Pages (or Netlify)

1. **pages.cloudflare.com → Create a project →** connect the repo.
2. Build settings: **Framework preset = None**, **Build command = (blank)**,
   **Output directory = `/`**.
3. Deploy. You get a free `*.pages.dev` URL to preview.
4. **Custom domains →** add `ainativex.ai` and `www.ainativex.ai`, then set the
   records Cloudflare shows you at your registrar. Moving nameservers to
   Cloudflare (free plan) also gets you their CDN and cache.
5. HTTPS is automatic. DNS propagation is usually minutes, up to 24–48h.

> **Netlify** is equivalent: drag-and-drop the folder at app.netlify.com, or
> connect the repo with a blank build command and publish directory `.`, then
> **Domain settings → Add custom domain**.

---

## Option C — cPanel / shared Apache hosting

1. Zip the **contents** of this folder (so `index.html` sits at the top level of
   the zip, not inside an `AINativeX/` subfolder):

   ```bash
   cd AINativeX
   zip -r ../ainativex-site.zip . -x ".git/*" ".github/*"
   ```

2. cPanel → **Files → File Manager** → open `public_html`.
3. **Back up whatever is there first**: select everything → **Compress** →
   download the zip. Keep it until the new site is confirmed live.
4. Delete the old files, **Upload** the zip, right-click → **Extract**, then
   delete the zip.
5. **Check `.htaccess` uploaded.** It starts with a dot, so enable
   **Settings → Show Hidden Files (dotfiles)**. It handles the HTTPS and non-www
   redirects, caching, security headers, and the custom 404. Blocks your plan
   doesn't support are wrapped in `<IfModule>` and are ignored safely.
6. No SSL yet? **Security → SSL/TLS Status → Run AutoSSL**.

*(FTP alternative: connect with FileZilla using the cPanel FTP credentials and
drop the files into `public_html`.)*

---

## Which should you pick?

| | A — GitHub Pages | B — Cloudflare/Netlify | C — cPanel |
|---|---|---|---|
| Cost | Free | Free | Existing hosting fee |
| Setup | Already live | ~10 min | ~20 min |
| HTTPS | Automatic | Automatic | AutoSSL |
| Updates | `git push` | `git push` | Re-upload files |
| Uses `.htaccess` | No | No | **Yes** |

---

## Post-launch checklist

- [x] Replace the placeholder testimonials with real, attributed quotes.
- [ ] Replace the `[Company A/B/C]` advisory placeholders, and only name a
      company once it has cleared public mention.
- [ ] Confirm `akmishra@ainativex.ai` is the address you want on a public page.
- [ ] Check the HTTPS padlock (and, on a custom domain, the `www` → apex redirect).
- [ ] Paste the live URL into LinkedIn or Slack and confirm the `og-image.png`
      preview renders.
- [ ] Submit the sitemap in Google Search Console — note that a github.io
      subpath can only be verified as part of the whole `akm98074.github.io`
      property, so this is best left until the custom domain is live.
- [ ] Load the page on a phone: the nav collapses, the CTA label shortens, and
      the engagement cards stack.
