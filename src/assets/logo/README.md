# Materna – Logo Asset Guide

## Where to place your SVG logo

Put your SVG file here:

  src/assets/logo/materna-logo.svg      ← full logo (wordmark + icon)
  src/assets/logo/materna-icon.svg      ← icon-only version (optional)

The app automatically imports from these paths.

---

## Recommended SVG dimensions

### Sidebar (desktop)
- Full logo (icon + wordmark): 160 × 40 px  (viewBox="0 0 160 40")
- The sidebar allocates 220px width × 64px height for the logo area
- Keep horizontal padding of ~20px on each side inside the sidebar

### Auth Pages (Login / Signup)
- Left panel hero logo: 200 × 52 px  (viewBox="0 0 200 52")
- Centered logo above form on mobile: 140 × 36 px

### Landing Page header / navbar
- Navbar logo: 140 × 36 px

### Favicon (public/logo.svg)
- Should be square: 48 × 48 px or use just the icon mark

---

## Color guidance
Your SVG should use these brand colors:
  Primary blue:  #1B365D
  Accent pink:   #E67E96
  White:         #FFFFFF  (for reversed/sidebar use)

For the sidebar (dark background), the logo should use white text
with the accent pink for highlights, OR the SVG should have a
"light" variant saved as materna-logo-light.svg.

---

## How the logo is consumed in code

```jsx
// Full logo – auth pages and sidebar (expanded)
import logo from '../assets/logo/materna-logo.svg'
<img src={logo} alt="Materna" height={40} />

// Light version for sidebar dark background
import logoLight from '../assets/logo/materna-logo-light.svg'
<img src={logoLight} alt="Materna" height={40} />
```

If you only have one SVG, the component will fall back to the
text-based logo rendered in JSX (Poppins font, #1B365D / #E67E96).
