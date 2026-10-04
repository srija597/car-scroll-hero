# Car Scroll Hero

An animated ITZFIZZ landing hero built with Next.js App Router, JavaScript, Tailwind CSS, GSAP, ScrollTrigger, and `@gsap/react`.

**Live link:** https://<github-username>.github.io/car-scroll-hero/

## How it works

The hero is pinned while a scrubbed ScrollTrigger timeline grows a green reveal across the road, drives the car from left to right, and shifts the stat groups for depth. The headline starts dark against the road and becomes readable as the green trail passes underneath it. The animation reverses naturally when scrolling upward, and reduced-motion preferences show the completed scene without animation.

## Run locally

```bash
npm install
npm run dev
```

With the configured GitHub Pages base path, open http://localhost:3000/car-scroll-hero.

## Build

```bash
npm run build
```

The static site is exported to `out/` and deployed to GitHub Pages by `.github/workflows/deploy.yml`.
