# Sea Tax Services — Website

A multi-page professional tax preparation website for **Sea Tax Services**, based in Seattle, WA. Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no backend. Deployed via GitHub Pages.

**Live site:** <https://letrongnghia15.github.io/personal-tax-website/>

## Contact info

- **Phone:** (206) 656-8685
- **Email:** seataxservice@gmail.com
- **Facebook:** <https://www.facebook.com/seataxservices>

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
├── images/
│   └── logo-company.png  Company logo
└── README.md           This file
```

## Deployment

This repo deploys automatically to GitHub Pages via the workflow at `.github/workflows/deploy.yml`. Every push to `main` triggers a new deployment.

To enable GitHub Pages on a fresh fork:
1. Go to **Settings → Pages**.
2. Under *Build and deployment → Source*, select **GitHub Actions**.
3. Push any commit to `main` — the workflow handles the rest.

## Wire up the contact form (Formspree)

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
4. Remove the `e.preventDefault()` line inside the form submit handler in `js/main.js`, or replace the simulated-success block with a `fetch()` call to the Formspree endpoint.

## Design notes

- **Colors:** Navy `#1A2B4A`, Gold `#C8960C`, Light gray `#F5F6FA`, White `#FFFFFF`
- **Fonts:** Playfair Display (headings) + Source Sans 3 (body), loaded from Google Fonts
- **Responsive breakpoints:** 1024px, 768px, 480px
- **Accessibility:** WCAG AA contrast, keyboard navigation, `prefers-reduced-motion` support, visible focus outlines
- **No localStorage / no cookies** — fully static and privacy-friendly

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Graceful degradation for older browsers — fade-in animations fall back to always-visible if IntersectionObserver is unavailable.
