# Customization Guide

## Brand and contact details

Start with `assets/js/config.js`:

- `brand`
- `email`
- `emailHref`
- `phone`
- `phoneHref`
- `social`
- `socialHref`
- `copyrightYear`

Elements marked with `data-config` are updated automatically by `main.js`.

## Colors and spacing

The first section of `assets/css/main.css` contains the design tokens. The most useful variables are:

- `--bg` — page background
- `--surface` — primary card surface
- `--surface-soft` — inputs and secondary surfaces
- `--text` — primary text
- `--muted` — secondary text
- `--primary` / `--primary-strong` — brand accent
- `--border` / `--border-strong` — borders
- `--container` — maximum content width
- `--radius` / `--radius-lg` — corner system

Dark and light values are separated under `:root` and `html[data-theme='light']`.

## Navigation

Each page has a `data-page` value on `<body>`. Navigation links use the same value through `data-page`. `main.js` uses the pair to set the active page and `aria-current` automatically.

## Courses

On `courses.html`, each course card has a `data-category` value. Filter buttons use `data-filter`. Keep the values consistent to extend the filter without changing JavaScript.

## Forms

The contact form uses `data-demo-form`. The current submit handler validates the fields and displays a confirmation toast. Replace that handler in `assets/js/main.js` when connecting a real endpoint.

## Images

The visual system works without image files. When adding customer images, prefer WebP or AVIF, provide meaningful `alt` text, and include explicit dimensions where possible.

## Typography

The default Persian typeface is Vazirmatn. JetBrains Mono is reserved for technical labels and small numeric/English UI elements.

## Before delivery

- Replace all demo copy and metrics.
- Replace contact and social details.
- Connect the form.
- Add real Open Graph images if required.
- Test 360px, 390px, 430px, tablet and desktop widths.
- Run Lighthouse and an accessibility audit.
- If offline delivery is required, self-host the fonts.
