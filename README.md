# Meridian Tax Services — Website

A complete multi-page professional tax preparation business website. Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no backend. Fully compatible with GitHub Pages.

## File structure

```
/
├── index.html          Homepage
├── services.html       Services & pricing
├── about.html          About page
├── faq.html            FAQ accordion
├── contact.html        Contact form
├── css/
│   └── style.css       All styles
├── js/
│   └── main.js         All JavaScript
├── images/             Place your headshot + OG image here
└── README.md           This file
```

## Deploy to GitHub Pages

### Option A — Upload via GitHub web UI (easiest, no Git required)

1. Go to your repo: <https://github.com/letrongnghia15/personal-tax-website>
2. Click **Add file → Upload files**.
3. Drag the entire contents of this folder (`index.html`, `services.html`, `about.html`, `faq.html`, `contact.html`, `README.md`, and the `css/`, `js/`, `images/` folders) into the upload area.
4. Scroll down, add a commit message like `Initial website upload`, and click **Commit changes**.
5. In the repo, go to **Settings → Pages**.
6. Under *Build and deployment → Source*, select **Deploy from a branch**.
7. Under *Branch*, pick **main** and **/ (root)**, then click **Save**.
8. Wait 1–2 minutes. Your site will be live at **<https://letrongnghia15.github.io/personal-tax-website/>**.

### Option B — Push via Git (if you have Git installed locally)

From inside this folder, run:

```bash
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/letrongnghia15/personal-tax-website.git
git push -u origin main
```

If the remote already has content, you may need:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

Then enable GitHub Pages as described in steps 5–8 above.

## Customizing the site

### 1. Change the business name
The placeholder business name is **Meridian Tax Services**. To replace it everywhere:

**On macOS / Linux:**
```bash
grep -rl "Meridian Tax Services" . | xargs sed -i '' 's/Meridian Tax Services/Your Business Name/g'
grep -rl "Meridian<span" . | xargs sed -i '' 's/Meridian<span/YourName<span/g'
```

**On Windows (PowerShell):**
```powershell
Get-ChildItem -Recurse -Include *.html,*.md | ForEach-Object {
  (Get-Content $_.FullName) -replace 'Meridian Tax Services','Your Business Name' | Set-Content $_.FullName
}
```

Or just use find-and-replace in any code editor (VS Code: `Ctrl+Shift+H`).

### 2. Update contact info
Replace the placeholder values in every HTML file:
- Phone: `(555) 123-4567`
- Email: `hello@meridiantax.com`
- Location: *Bothell, WA*

### 3. Add your headshot
Save a professional photo as `images/professional-photo.jpg` and update `about.html`:
Replace the `<div class="photo-placeholder">Professional Photo</div>` with:
```html
<img src="images/professional-photo.jpg" alt="Your Name, Enrolled Agent" />
```

### 4. Wire up the contact form (Formspree)
The form currently shows a success message but doesn't send email. To enable real delivery:

1. Sign up free at <https://formspree.io> (50 submissions/month free).
2. Create a new form; copy your endpoint URL (e.g. `https://formspree.io/f/xyzabcde`).
3. In `contact.html`, change:
   ```html
   <form ... action="#" method="post" ...>
   ```
   to:
   ```html
   <form ... action="https://formspree.io/f/YOUR_ID" method="post" ...>
   ```
4. In `js/main.js`, the submit handler currently blocks submission and shows the success message locally. For Formspree to receive the form data, either:
   - Remove the `e.preventDefault()` line inside the form submit handler (simpler — Formspree will handle the redirect), or
   - Replace the simulated-success block with a `fetch()` call to the Formspree endpoint.

### 5. Update social links
In `contact.html` and/or the footer, replace `href="#"` on `.social-link` elements with your actual LinkedIn, Facebook, and Google Business URLs.

## Design notes

- **Colors**: Navy `#1A2B4A`, Gold `#C8960C`, Light gray `#F5F6FA`, White `#FFFFFF`
- **Fonts**: Playfair Display (headings) + Source Sans 3 (body), loaded from Google Fonts
- **Responsive breakpoints**: 1024px, 768px, 480px
- **Accessibility**: WCAG AA contrast, keyboard navigation, `prefers-reduced-motion` support, visible focus outlines
- **No localStorage / no cookies** — fully static and privacy-friendly

## Browser support
Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Graceful degradation for older browsers — fade-in animations fall back to always-visible if IntersectionObserver is unavailable.

## License
All code in this repository is yours to modify and deploy.
