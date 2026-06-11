# PactWatch

PactWatch tracks national implementation of the EU Pact on Migration and Asylum through laws, bills, government decisions and regional implementation reporting.

## Source Baseline

- Current source date: 28 May 2026.
- European Commission third implementation report: 8 May 2026.
- Current implementation split: 9 adopted, 14 draft/adopting, 4 unclear across 27 EU Member States.

PactWatch tracks how far national **adoption** has progressed and how well each
record is **sourced**. It does not score the quality of safeguards inside each
law — many safeguards sit in implementing rules, guidance or practice that public
sources do not specify, so their absence here does not mean they are missing.
Per-country watchpoints flag questions to monitor, not findings. Adoption status
and review priority are PactWatch analytical signals, not official EU
classifications.

**Confidence** is derived from provenance (official national vs. regional
reference vs. not recovered) and is independent of adoption stage. Research
recency is computed against `asOf` in `src/data.ts`; update `asOf`, the
`changelog` and the country records together when refreshing. The application
countdown uses the visitor's current date in Brussels and transitions to an
in-application state after 12 June 2026.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

Vercel builds from `npm run build` and publishes `dist`.
