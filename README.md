# PactWatch

PactWatch is a public-facing v1 monitor for national implementation of the EU Pact on Migration and Asylum. It turns the ECRE state-of-play source list and the European Commission implementation report into a cleaner country-by-country policy dashboard.

## Source Baseline

- ECRE state of play, published 28 May 2026.
- European Commission third implementation report, published 8 May 2026.
- Current source split: 9 adopted, 14 draft/adopting, 4 unclear across 27 EU Member States.

The review priority score is a PactWatch analytical signal, not an official EU or ECRE classification.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

Netlify builds from `npm run build` and publishes `dist`.
