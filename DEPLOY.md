# Deploying AINativeX

The site is static — `index.html` at the root, everything else beside it. There
is no build step, so any host that serves files will do. Three paths, in the
order most people should pick them.

- **Option A — GitHub Pages (already wired).** `.github/workflows/deploy-pages.yml`
  publishes the repo root on every push to `main` — the same workflow AIUdaan
  uses. **Recommended if the repo lives on GitHub.**
- **Option B — Cloudflare Pages / Netlify.** Same idea, different host: connect
  the repo, no build command, output directory `/`.
- **Option C — cPanel / GoDaddy-style hosting.** Upload the files into
  `public_html`. `.htaccess` is already written for this case.

---

## Option A — GitHub Pages

The site is configured for the project-page URL
**<https://akm98074.github.io/AINativeX/>**.

### How it publishes

`.github/workflows/deploy-pages.yml` runs on every push to `main`, uploads the
repo root as a Pages artifact, and deploys it. There is no build step.

`actions/configure-pages@v5` runs with **`enablement: true`**, which sets the
Pages source to **GitHub Actions** by itself — so there is no manual
Settings step, and no browser click needed on a fresh clone or a new repo. This
is the same workflow AIUdaan publishes from, unchanged.

Updates: edit, commit, push to `main`. Live in about a minute. Watch it under
**Actions → Deploy site to GitHub Pages**, and hard-refresh afterwards, since
Pages caches aggressively.

> **Do not add a second deploy workflow.** This repo previously carried both
> `deploy-pages.yml` and a `static.yml` that did the same job. Both declared
> `concurrency: group: pages` and both fired on the same push, so they fought
> over the one Pages deployment and failed. `static.yml` has been deleted; keep
> it that way.
>
> **Do not drop `enablement: true`.** An earlier revision removed it on the
> theory that the `GITHUB_TOKEN` cannot create a Pages site. That is wrong for
> this repo — AIUdaan deploys with that exact line. Without it, the workflow
> depends on the Pages source having been switched to GitHub Actions by hand,
> and if it hasn't been, the `deploy` job fails within a second of starting,
> before any step runs.
>
> **Don't mix in the branch source.** With Pages set to *Deploy from a branch*
> instead, GitHub's built-in *pages build and deployment* job handles the
> publish and this workflow is redundant. The two are alternatives, not
> complements — pick the workflow, which is what this repo is set up for.

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
| Setup | Already wired | ~10 min | ~20 min |
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
