# abhoi-academic

Candidate academic website for Amlaan Bhoi — a refined evolution of the
[Jon Barron](https://jonbarron.info/) template, rebuilt on semantic HTML/CSS.
Serves as a credible research hub and supporting evidence for an EB1A/EB1B petition.

See [`PLAN.md`](PLAN.md) for the full information architecture, section → criterion
mapping, design spec, and build phases.

## Status
- **Phases 1–4 (done):** scaffold, design system, all 8 sections populated with verified
  data, OG/JSON-LD metadata, placeholder CV, QA pass. Local git history initialized.
- **Phase 5 (staged, pending domain):** push to GitHub + enable Pages + add `CNAME`.

## Develop
Pure static site, no build step:
```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Before going live (swap placeholders)
- Replace `assets/cv/Amlaan_Bhoi_CV.pdf` with the real CV.
- Replace `example.com` in `index.html` (canonical, OG tags, JSON-LD `url`) with the real domain.
- Optionally add an ORCID link in the hero link row and a 1200×630 `assets/img/og-image.png`.
- Fill the `TODO(Amlaan)` impact lines in **Selected Contributions** with public-safe metrics.

## Deploy (Phase 5)
```sh
# 1. create the GitHub repo, then:
git remote add origin git@github.com:abhoi/abhoi-academic.git
git push -u origin main
# 2. Settings → Pages → deploy from main (root)
# 3. add the custom domain:
echo "yourdomain.com" > CNAME && git add CNAME && git commit -m "Add CNAME" && git push
```
`.nojekyll` skips Jekyll processing on Pages.
