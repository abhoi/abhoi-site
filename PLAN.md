# Candidate Academic Website — EB1A/EB1B Evidence Plan

**Petitioner:** Amlaan Bhoi — Senior ML Researcher, Apple (Human‑Centered AI)
**Purpose:** A refined, credible, single‑page academic site that serves as durable supporting
evidence for an EB1A (Extraordinary Ability) and/or EB1B (Outstanding Researcher) petition.
**Design decision:** Refined evolution of the current Jon Barron template — same minimalist,
single‑column spirit and palette, rebuilt on modern semantic HTML/CSS (no `<table>` layout),
with new immigration‑relevant sections.
**Stack decision:** Static `index.html` + `style.css`, GitHub Pages, zero build step.

> Disclosure: This is strategic guidance, not legal advice. An EB1A/EB1B petition should be filed
> with a licensed U.S. immigration attorney who reviews your full record. The website is *supporting*
> evidence — it organizes and frames evidence that already exists; it cannot manufacture acclaim.

---

## 1. What this website is (and is not) for

The site is read by three audiences, in order of importance:

1. **Recommendation‑letter writers** — they cite it to ground specific claims ("his work on X was
   deployed at scale at Y," "served as reviewer for Z"). A clean hub makes their letters concrete.
2. **The petitioner's own narrative / attorney** — a single canonical source of links, metrics, and
   framing that exhibits can point to.
3. **The USCIS adjudicator** — corroborates the "recognized researcher" story on the documentary
   record. An officer with 15 minutes and no domain expertise should come away convinced the subject
   is a serious, independently‑recognized researcher.

**Hard rule — authenticity:** Nothing on the site mentions immigration, EB1A, or visas. The
immigration optimization lives entirely in *which* evidence is surfaced and *how* it is framed
(selectivity, independent recognition, real‑world impact) — never in the copy. A site that reads as
"built for a petition" is worse than no site.

---

## 2. Section → regulatory criterion mapping

8 CFR §204.5(h)(3) criteria (EB1A; EB1B shares most). The site is structured so each section quietly
carries one or more criteria.

| Site section | EB1A criterion supported | What it must show to be persuasive |
|---|---|---|
| Hero + Research Statement | Final‑merits "field of endeavor" + sustained acclaim | Precise field definition; leadership claim backed by evidence, not adjectives |
| Selected Contributions | #5 Original contributions of major significance | Independent corroboration of impact: deployment scale, adoption, citations, downstream use |
| Publications | #6 Authorship of scholarly articles | Venue, year, citation counts, code links; separate peer‑reviewed from preprints |
| Honors & Awards | #1 Nationally/internationally recognized awards | **Selectivity + scope** ("1 of 5 in cohort," "national program") stated explicitly |
| Professional Service | #4 Judging the work of others | Named venues, reviewer/PC roles, judging panels, with dates |
| Invited Talks & Media | #3 Published material *about* the petitioner | Press features, podcasts, invited talks at distinguished venues |
| Experience | #8 Leading/critical role at distinguished orgs | Org reputation (Apple, Amazon) + *specific* role and impact, not job duties |

Criteria the site deliberately does **not** carry: #9 high salary (private), #2 membership (no
qualifying selective association), **#5 patents (none) and #7/#10 arts/performance (N/A)** — so there
is no Patents section in this build.

**EB1B note:** Outstanding Researcher is employer‑sponsored (Apple would petition), needs ≥3 years
research experience and international recognition. It requires only 2 of 6 criteria — and they overlap
exactly with the sections above (awards, published‑about, judging, original contributions, authorship,
critical role). The same site supports both paths.

---

## 3. Information architecture

Single page, anchored nav. Order is deliberate: lead with positioning and impact (strongest acclaim
signals), end with detail.

1. **Header / Hero** — Name, current title, one‑line positioning statement, location, headshot, and a
   link row: LinkedIn · Email · Google Scholar · GitHub · ORCID · **CV (PDF)**.
2. **Research Statement / About** — 2 short paragraphs. Defines the *precise* field of endeavor (e.g.
   "evaluation of agentic AI systems — generation quality, tool‑use, and responsible AI") and stakes a
   coherent leadership arc spanning Apple → Amazon → CV/few‑shot research. Impact‑oriented language.
3. **Selected Contributions** — 3–4 themed pillars (not a paper dump). Each: 1‑line thesis + concrete
   significance (scale, adoption, metric moved, citation). This is the highest‑value section for #5.
4. **Publications** — reverse‑chronological, **single "Preprints & Technical Reports" list** (no
   peer‑reviewed split — that bucket is currently empty). Each entry: thumbnail (optional), title,
   authors (you bolded), venue+year, **verified citation count**, links (arXiv / code).
5. **Honors & Awards** — each with an explicit selectivity clause.
6. **Professional Service** — peer review, program committees, judging, mentorship.
7. **Invited Talks & Media** — talks and third‑party coverage about you.
8. **Experience** — Apple, Amazon, CCC: org one‑liner + your critical‑role impact.
9. **Footer** — last‑updated date, CV link, design attribution, optional quote.

Sticky/anchor nav is optional; if added, keep it minimal and unobtrusive.

---

## 4. Design specification (refined evolution)

**Layout**
- Single column, `max-width: 820px`, centered, generous vertical rhythm.
- Semantic HTML5: `<header> <main> <section> <article> <footer>`; no layout tables.
- Publication/contribution rows: CSS grid (`grid-template-columns: 160px 1fr`), thumbnail left, text
  right; collapses to single column under ~640px.

**Typography**
- Body: system sans stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`),
  ~16px, line-height 1.6.
- Headings/name: consider a restrained serif (Charter/Georgia/`ui-serif`) for academic gravitas, or
  keep bold sans for continuity. Modular scale (name 2rem, section 1.25rem).

**Color**
- Ink: keep `#232F3E` (current).
- **Recommendation:** retire the Amazon‑orange hover (`#FF9900`) — it visually brands you to a former
  employer. Use a neutral scholarly accent, e.g. link `#0B5FA5` (or teal `#0F766E`), hover a slightly
  darker shade, visited muted. Background `#fafafa` / surface `#fff`.
- Optional `prefers-color-scheme: dark` variant.

**Interaction & assets**
- Drop or soften the before/after image hover (it reads as a portfolio gimmick); use clean static
  thumbnails for papers instead. Subtle link underline‑on‑hover only.
- Optimized images (WebP + fallback), explicit `width/height`, descriptive `alt`.

**Accessibility & quality**
- WCAG AA contrast, visible focus states, landmark roles, skip‑to‑content link.
- Lighthouse target ≥95 across the board; no render‑blocking webfonts (prefer system fonts).

**Credibility metadata (low effort, real upside)**
- `<title>`, meta description, canonical URL.
- Open Graph + Twitter card with an OG image (so shared links look professional).
- JSON‑LD `Person` + `ScholarlyArticle` schema — helps the site read as authoritative to crawlers and
  surfaces structured identity (ORCID, affiliation, sameAs links).

---

## 5. Repository structure

```
abhoi-academic/                 # candidate repo (rename as desired)
├── index.html
├── assets/
│   ├── css/style.css
│   ├── img/                    # headshot, og-image, paper/project thumbs (WebP+fallback)
│   └── cv/Amlaan_Bhoi_CV.pdf   # downloadable CV
├── favicon.ico
├── .nojekyll                   # pure static — skip GH Pages Jekyll processing
├── CNAME                       # only if using a custom domain
└── README.md
```

**Deployment options (pick one at build time):**
- **A — Replace primary site:** push into `abhoi.github.io` (serves at the root domain; strongest for
  a canonical identity). Keep the current version on a branch/tag for rollback.
- **B — Project repo + custom domain:** new repo `abhoi-academic`, GH Pages, point a custom domain
  (e.g. `amlaanbhoi.com`) via `CNAME`. A custom domain reads as more established than `*.github.io`.
- Recommend **B with a custom domain** for petition polish; falls back to A if no domain.

---

## 6. Build phases (for the follow‑up "build" session)

- **Phase 0 — Content gathering (you):** supply the items in §8 (metrics, reviewer roles, talks,
  patents, CV, headshot). The site is only as strong as this input.
- **Phase 1 — Shell:** scaffold repo, base HTML5 structure, `style.css` design tokens, responsive grid,
  header + nav.
- **Phase 2 — Content migration & reframing:** port each section from the old site, reframe copy for
  significance/selectivity, add citation counts, split publications.
- **Phase 3 — Metadata & assets:** CV PDF, OG image, meta/OG/JSON‑LD, favicon.
- **Phase 4 — QA:** responsive + a11y pass, Lighthouse, link check, proofread for any accidental
  immigration framing.
- **Phase 5 — Deploy:** GH Pages, optional custom domain, redirect/retain old site.

---

## 7. Candid profile read (so the site is built on truth)

Built strictly from the *current public* site plus verified data, an adjudicator would see: 4 arXiv
preprints (3 surveys + 1 ABSA) with **266 total citations, h‑index 4, i10‑index 3** — and that impact
is **highly concentrated in one 2019 survey (211 of 266 citations)**; no peer‑reviewed venue, no
patents, no invited talks, no press beyond the 2018 Intel feature, and awards that are largely
student/hackathon‑level (Outstanding Thesis, Best Microsoft Hack, Amity convocation). On its face this
is a **still‑developing** EB1A profile — a capable industry researcher narrative, not yet an "extraordinary
ability / top small percentage of the field" story. Citation depth in a hot ML subfield would need to
be materially higher, and a single highly‑cited survey is weaker for criterion #5 ("original
contributions of major significance") than novel primary research, since a survey synthesizes rather
than originates.

The website cannot fix that, but it can do two honest things:
1. **Surface the real, currently‑hidden signals** — Apple/Amazon *production impact* (scale, metrics
   moved, adoption) and the confirmed **2025 reviewer service** (ICML AIWILD/AI4MATH/DL4C, KDD
   SET‑LLM). None of this appears on the current page, yet the reviewer roles are the cleanest
   criterion‑#4 evidence available and industry impact is the strongest #5/#8 angle.
2. **Frame existing work at its true level of significance** — deployment scale and business impact,
   rather than coursework/hackathon entries.

Honest bottom line: this is a **🟠 premature → 🟡 file‑with‑preparation** trajectory for EB1A. The
fastest credibility gains are peer‑reviewed publications (target an ICML/NeurIPS workshop *paper*, not
just reviews), continued/expanded reviewing, and documented production impact — plus running EB‑2 NIW
in parallel (§9). The site should be structured to grow into that, not to overstate today.

Where the record is thin, the right move is profile‑building (target peer‑reviewed venues, secure
reviewer invitations, pursue press), not embellishment. The site should be ready to grow with that.

---

## 8. Content inputs — confirmed (verified 2026‑06‑15)

1. **Google Scholar metrics** — *verified from the live profile:*
   **266 total citations** (215 since 2021), **h‑index 4**, **i10‑index 3**.
   Per‑paper: Monocular Depth Estimation survey **211**, ABSA **29**, Spatio‑temporal Action
   Recognition survey **22**, Neural/Universal Style Transfer **4**. Impact is **highly concentrated
   in a single 2019 survey**; the publication record is otherwise light.
2. **Peer‑reviewed publications beyond arXiv** — *None.* All listed work is arXiv preprints + the UIC
   thesis. → Publications stays a single "Preprints & Technical Reports" list (no peer‑reviewed split,
   since that split would currently read as empty and hurt more than help).
3. **Patents** — *None.*
4. **Peer‑review / PC service** — *Confirmed reviewer roles (use for criterion #4):*
   - ICML 2025 **AIWILD** workshop — 3 reviews
   - ICML 2025 **AI4MATH** workshop — 3 reviews
   - ICML 2025 **DL4C** workshop — 2 reviews
   - KDD 2025 **SET‑LLM** workshop — 2 reviews

   These are workshop‑level reviews at flagship venues (ICML, KDD). Frame honestly as
   "Reviewer, [Workshop], [Conference] 2025" with review counts; do **not** imply main‑track PC
   membership. This is the site's clearest #4 signal — make it a real section.
5. **Invited talks** — *None.*
6. **Press / media about you** — *None beyond the existing Intel feature and UCSC newsletter.*
7. **New awards/honors since 2019** — *None.*
8. **CV / headshot** — Use a **placeholder CV** link (`assets/cv/Amlaan_Bhoi_CV.pdf`, swap in later);
   **reuse the existing `profile_pic.jpeg`** headshot for now.
9. **Deployment** — **New custom domain** (to be shared). Build as project repo `abhoi-academic` with a
   `CNAME`; domain provided at deploy time.
10. **Heading font** — **Serif gravitas.** Use a serif display face for name + section headings
    (e.g. `Charter, "Iowan Old Style", Georgia, ui-serif, serif`) over a sans body.

---

## 9. Parallel pathway note

Given the current public record, run **EB‑2 NIW** (and/or **O‑1A**) analysis in parallel as an interim
path while the EB1A/EB1B profile strengthens. The same website supports all three. This is flagged for
strategy only — no website change is implied.
