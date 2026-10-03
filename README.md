# keegan.sucks

Keegan Burke's landing page, served by GitHub Pages from `main` (custom domain in `CNAME`).

- `index.html` + `assets/site.css` + `assets/site.js`: the page. No build step.
- Light theme = the cream Omarchy overlay from `omarchy-setup`; dark theme = Omarchy Matte Black. Follows the system; toggle in the bar (or press `T`).
- Type: [Libron](https://github.com/nicoverbruggen/libron) v0.25 (OFL, `assets/fonts/`), small caps throughout via `font-variant-caps`.
- Mark: `assets/mark.svg` (full) and `favicon.svg` (single cut, for small sizes). `og.png` is rendered from `assets/og-source.html` at 1200×630.
- `404.html`: the old "ERR_DEVELOPER_TOO_LAZY" placeholder, kept as the not-found / under-construction page.
- `rubbishes/`: separate page, untouched.

Preview locally: `python3 -m http.server`, then open http://localhost:8000.
