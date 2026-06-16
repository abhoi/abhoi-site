# abhoi-academic

Candidate academic website for Amlaan Bhoi — a refined evolution of the
[Jon Barron](https://jonbarron.info/) template, rebuilt on semantic HTML/CSS.
Serves as a credible research hub and supporting evidence for an EB1A/EB1B petition.

See [`PLAN.md`](PLAN.md) for the full information architecture, section → criterion
mapping, design spec, and build phases.

## Status
- **Phase 1 (done):** repo scaffold + base HTML/CSS shell, design system, populated hero.
- **Phase 2 (next):** content migration & reframing (About, Contributions, Publications,
  Awards, Service, Media, Experience).
- **Phases 3–5:** metadata/OG/CV assets → QA → deploy.

## Develop
Pure static site, no build step:
```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
GitHub Pages, project repo + custom domain (add `CNAME` in Phase 5).
`.nojekyll` skips Jekyll processing.
