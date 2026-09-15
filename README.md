# VOX — Premium RTL HTML Template

VOX is a polished, framework-free RTL template built for Persian technology brands, SaaS products, AI products, digital studios and modern service businesses.

The package is intentionally simple to deploy: no build step, no package manager and no JavaScript framework are required.

## Package structure

```text
/
├── index.html
├── services.html
├── courses.html
├── about.html
│
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── config.js
│   │   └── main.js
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       └── README.txt
│
└── documentation/
    ├── customization.md
    └── changelog.md
```

## Quick start

1. Extract the ZIP.
2. Open `index.html` directly, or upload the folder to any static host.
3. Open `assets/js/config.js` and replace the demo brand/contact values.
4. Edit page copy and course/service content directly in the HTML files.
5. Adjust the design tokens at the top of `assets/css/main.css` when you want a different visual identity.

## Main features

- Full RTL Persian layout
- Dark and light themes with saved preference
- Responsive navigation and mobile menu
- Accessible focus states and skip link
- Reduced-motion support
- Course category filtering
- Scroll reveal animation
- Demo contact form with client-side validation
- Centralized brand/contact configuration
- CSS-generated visual artwork with no stock-image dependency
- Framework-free implementation

## Production notes

The contact form is a front-end demonstration. It does not send messages until connected to a backend, API or form service.

The template loads Vazirmatn and JetBrains Mono through Google Fonts. If the product must work completely offline, self-host the font files and replace the font import with local `@font-face` declarations.

Before a production launch, replace demo statistics, contact details, social links, course prices and sample copy with the customer's real content.

## Browser support

The layout targets current versions of Chrome, Edge, Firefox and Safari. It uses modern CSS features including `color-mix()` and `backdrop-filter` for the premium visual treatment.
