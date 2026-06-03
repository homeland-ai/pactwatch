# PactWatch

PactWatch tracks national implementation of the EU Pact on Migration and Asylum through laws, bills, government decisions and regional implementation reporting.

## Source Baseline

- Current source date: 28 May 2026.
- European Commission third implementation report: 8 May 2026.
- Current implementation split: 9 adopted, 14 draft/adopting, 4 unclear across 27 EU Member States.

PactWatch tracks two questions separately: how far national **adoption** has
progressed, and whether implementation **safeguards** hold up. Adoption status,
safeguard signal and review priority are PactWatch analytical signals, not
official EU classifications.

**Confidence** is derived from provenance (official national vs. regional
reference vs. not recovered) and is independent of adoption stage. Dates are
computed against `asOf` in `src/data.ts` so the application countdown and
"recent activity" reads stay consistent with the curated dataset; update `asOf`,
the `changelog` and the country records together when refreshing.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

Netlify builds from `npm run build` and publishes `dist`.