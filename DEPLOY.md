# Deploying AINativeX

The site is static — `index.html` at the root, everything else beside it. There
is no build step, so any host that serves files will do. Three paths, in the
order most people should pick them.

- **Option A — GitHub Pages (already wired).** `.github/workflows/deploy-pages.yml`
  publishes the repo root on every push to `main`. **Recommended if the repo
  lives on GitHub.**
- **Option B — Cloudflare Pages / Netlify.** Same idea, different host: connect
  the repo, no build command, output directory `/`.
- **Option C — cPanel / GoDaddy-style hosting.** Upload the files into
  `public_html`. `.htaccess` is already written for this case.

---

## Option A — GitHub Pages

1. Push to `main`. The workflow (`Deploy site to GitHub Pages`) runs
   automatically and enables Pages on first run (`enablement: true`).
2. Repo **Settings → Pages** should show *Source: GitHub Actions* and the live
   URL once the first run finishes.
3. **Custom domain.** `CNAME` already contains `ainativex.ai`. At your registrar,
   point DNS at GitHub:
   - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`
4. In **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued
   (usually minutes, occasionally up to an hour).

Updates from then on: edit, commit, push — live in about a minute.

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

Delete `CNAME` if you host somewhere other than GitHub Pages — it's a GitHub
Pages convention and other hosts ignore it, but it's noise.

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

- [ ] Replace the placeholder testimonials with real, attributed quotes.
- [ ] Replace the `[Company A/B/C]` advisory placeholders, and only name a
      company once it has cleared public mention.
- [ ] Confirm `akmishra@ainativex.ai` is the address you want on a public page.
- [ ] Check the HTTPS padlock and the `www` → apex redirect.
- [ ] Paste `https://ainativex.ai` into LinkedIn or Slack and confirm the
      `og-image.png` preview renders.
- [ ] Submit `https://ainativex.ai/sitemap.xml` in Google Search Console.
- [ ] Load the page on a phone: the nav collapses, the CTA label shortens, and
      the engagement cards stack.
