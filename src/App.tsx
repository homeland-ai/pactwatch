import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  applicationDate,
  asOf,
  changeKindLabels,
  changelog,
  commissionReport,
  confidenceLabels,
  confidenceOf,
  countries,
  safeguardLabels,
  sourceBaseline,
  statusLabels,
  type CountryRecord,
  type ImplementationStatus,
  type RiskLevel,
  type SafeguardState,
} from './data'
import './App.css'

type FilterKey =
  | 'all'
  | ImplementationStatus
  | 'highRisk'
  | 'safeguardGaps'
  | 'sourceGaps'

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All countries' },
  { key: 'adopted', label: 'Adopted' },
  { key: 'draft', label: 'Draft / adopting' },
  { key: 'unclear', label: 'Unclear' },
  { key: 'highRisk', label: 'High priority' },
  { key: 'safeguardGaps', label: 'Safeguard gaps' },
  { key: 'sourceGaps', label: 'Official source missing' },
]

const riskLabel: Record<RiskLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const adoptionColumns: { key: ImplementationStatus; label: string }[] = [
  { key: 'adopted', label: 'Adopted' },
  { key: 'draft', label: 'Draft / adopting' },
  { key: 'unclear', label: 'Unclear' },
]

const safeguardRows: { key: SafeguardState; label: string }[] = [
  { key: 'present', label: 'Safeguards identified' },
  { key: 'partial', label: 'Partial signals' },
  { key: 'gap', label: 'Visible gap' },
  { key: 'review', label: 'Not yet assessed' },
]

const countryByCode = new Map(countries.map((country) => [country.code, country]))
const DAY_MS = 24 * 60 * 60 * 1000
const asOfTime = new Date(asOf).getTime()

const daysToApplication = Math.max(
  0,
  Math.ceil((new Date(applicationDate).getTime() - asOfTime) / DAY_MS),
)

const recentChanges = changelog.filter(
  (event) => asOfTime - new Date(event.date).getTime() <= 30 * DAY_MS,
)
const recentlyUpdatedCodes = new Set(recentChanges.map((event) => event.code))

function formatIsoDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target: number, duration = 1100) {
  const [value, setValue] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (prefersReducedMotion) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function App() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const [selectedCode, setSelectedCode] = useState('GR')

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return countries.filter((country) => {
      const matchesQuery =
        !q ||
        country.country.toLowerCase().includes(q) ||
        country.stage.toLowerCase().includes(q) ||
        country.watchpoints.some((item) => item.toLowerCase().includes(q))

      const matchesFilter =
        activeFilter === 'all' ||
        country.status === activeFilter ||
        (activeFilter === 'highRisk' && country.risk === 'high') ||
        (activeFilter === 'safeguardGaps' &&
          ['gap', 'partial', 'review'].includes(country.implementationSafeguards)) ||
        (activeFilter === 'sourceGaps' &&
          ['regional reference', 'not recovered'].includes(country.sourceType))

      return matchesQuery && matchesFilter
    })
  }, [activeFilter, query])

  const selected =
    countries.find((country) => country.code === selectedCode) ??
    filteredCountries[0] ??
    countries[0]

  const counts = useMemo(
    () => ({
      adopted: countries.filter((country) => country.status === 'adopted').length,
      draft: countries.filter((country) => country.status === 'draft').length,
      unclear: countries.filter((country) => country.status === 'unclear').length,
      highRisk: countries.filter((country) => country.risk === 'high').length,
      sourceGaps: countries.filter((country) => country.sourceType !== 'official national').length,
      assessed: countries.filter((country) => country.implementationSafeguards !== 'review').length,
    }),
    [],
  )

  function exportCsv() {
    const headers = [
      'Country',
      'Status',
      'Stage',
      'Review priority',
      'Implementation safeguards',
      'Confidence',
      'Last verified',
      'Source type',
      'Source title',
      'Source URL',
      'Verification',
    ]
    const rows = countries.map((country) => [
      country.country,
      statusLabels[country.status],
      country.stage,
      riskLabel[country.risk],
      safeguardLabels[country.implementationSafeguards],
      confidenceLabels[confidenceOf(country)],
      country.lastVerified ?? sourceBaseline,
      country.sourceType,
      country.sourceTitle,
      country.sourceUrl ?? '',
      country.verification,
    ])
    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'pactwatch.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-group">
          <a className="brand" href="#top" aria-label="PactWatch">
            <span className="brand-mark">PW</span>
            <span>
              <strong>PactWatch</strong>
            </span>
          </a>
          <a
            className="brand-sub"
            href="https://homelandsadvisory.com/"
            target="_blank"
            rel="noreferrer"
          >
            by Homelands Advisory
          </a>
        </div>
        <nav className="topbar-actions" aria-label="Utility navigation">
          <span>
            <i className="live-dot" aria-hidden="true" />
            Updated 28 May 2026
          </span>
          <a href={commissionReport} target="_blank" rel="noreferrer">
            Commission report
          </a>
          <button type="button" onClick={exportCsv}>
            Export CSV
          </button>
        </nav>
      </header>

      <section className="overview" id="top">
        <div className="overview-copy">
          <p className="eyebrow">EU Pact implementation monitor</p>
          <h1>
            <span>Tracking national</span>
            <span>Pact implementation.</span>
          </h1>
          <p>
            PactWatch tracks the national laws, bills and government decisions
            that determine how the EU Pact on Migration and Asylum is being put
            into effect. It is designed for policymakers, institutions,
            researchers and practitioners who need a clear view of legal
            readiness across Member States.
          </p>
        </div>
        <div className="overview-panel" aria-label="Implementation summary">
          <Metric label="Adopted" value={counts.adopted} total={27} tone="dark" />
          <Metric label="Draft / adopting" value={counts.draft} total={27} tone="coral" />
          <Metric label="Unclear" value={counts.unclear} total={27} tone="muted" />
          <div className="progress-story countdown">
            <span>Countdown to application</span>
            <div className="countdown-figure">
              <strong>{daysToApplication}</strong>
              <em>days</em>
            </div>
            <div className="progress-track" aria-hidden="true">
              <i style={{ width: `${(counts.adopted / 27) * 100}%` }} />
              <b style={{ width: `${(counts.draft / 27) * 100}%` }} />
            </div>
            <small>
              EU Pact general application on 12 June 2026 — {counts.adopted} adopted,{' '}
              {counts.draft} in progress, {counts.unclear} unclear.
            </small>
          </div>
        </div>
      </section>

      <ActivityStrip onSelect={setSelectedCode} />

      <ImplementationAnalysis counts={counts} onSelect={setSelectedCode} />

      <section className="workbench" aria-label="PactWatch country workbench">
        <div className="filter-strip">
          <div className="filter-buttons" aria-label="Country filters">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={activeFilter === filter.key ? 'active' : ''}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span>Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="country, stage or issue"
            />
          </label>
        </div>

        <div className="content-grid">
          <section className="country-list" aria-label="Country records">
            <div className="list-heading">
              <div>
                <h2>Country records</h2>
                <p>
                  Showing {filteredCountries.length} of {countries.length}
                </p>
              </div>
              <FlagIcon country={selected} size="small" />
            </div>
            <div className="rows">
              {filteredCountries.map((country) => (
                <CountryRow
                  key={country.code}
                  country={country}
                  selected={country.code === selected.code}
                  recentlyUpdated={recentlyUpdatedCodes.has(country.code)}
                  onSelect={() => setSelectedCode(country.code)}
                />
              ))}
            </div>
          </section>

          <CountryBrief country={selected} />
        </div>
      </section>
    </main>
  )
}

function ImplementationAnalysis({
  counts,
  onSelect,
}: {
  counts: {
    adopted: number
    draft: number
    unclear: number
    highRisk: number
    sourceGaps: number
    assessed: number
  }
  onSelect: (code: string) => void
}) {
  return (
    <section className="analysis-panel" aria-label="Implementation analysis">
      <div className="analysis-heading">
        <p className="eyebrow">Implementation analysis</p>
        <h2>Adoption is moving — safeguard quality is mostly unverified.</h2>
        <p>
          PactWatch records {counts.adopted} Member States as having adopted most
          relevant national legislation, {counts.draft} still drafting or adopting,
          and {counts.unclear} with no definitive public status recovered. The two
          questions are tracked separately: how far adoption has progressed, and
          whether implementation safeguards hold up.
        </p>
      </div>

      <div className="readiness" role="table" aria-label="Adoption by safeguard signal">
        <div className="readiness-corner" role="columnheader">
          <span>Adoption →</span>
          <span>Safeguard signal ↓</span>
        </div>
        {adoptionColumns.map((column) => (
          <div className="readiness-colhead" role="columnheader" key={column.key}>
            {column.label}
            <i>{countries.filter((country) => country.status === column.key).length}</i>
          </div>
        ))}

        {safeguardRows.map((row) => (
          <Fragment key={row.key}>
            <div className={`readiness-rowhead sig-${row.key}`} role="rowheader">
              {row.label}
            </div>
            {adoptionColumns.map((column) => {
              const cell = countries.filter(
                (country) =>
                  country.status === column.key &&
                  country.implementationSafeguards === row.key,
              )
              return (
                <div className="readiness-cell" role="cell" key={column.key}>
                  {cell.map((country) => (
                    <button
                      type="button"
                      key={country.code}
                      className="readiness-flag"
                      title={`${country.country} — ${row.label}`}
                      onClick={() => onSelect(country.code)}
                    >
                      <FlagIcon country={country} size="small" />
                    </button>
                  ))}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>

      <p className="analysis-note">
        Safeguard quality is assessed for only {counts.assessed} of 27 records so
        far — most adopted and drafting files sit in “not yet assessed”.{' '}
        {counts.sourceGaps} records rest on a regional reference or have no
        recovered national source. Confidence below is derived from provenance,
        independent of adoption stage.
      </p>
    </section>
  )
}

function ActivityStrip({ onSelect }: { onSelect: (code: string) => void }) {
  return (
    <section className="activity-panel" aria-label="Recent activity">
      <div className="activity-head">
        <p className="eyebrow">Recent activity</p>
        <h2>
          {recentChanges.length} updates in the last 30 days.
        </h2>
      </div>
      <div className="activity-track">
        {changelog.map((event) => {
          const country = countryByCode.get(event.code)
          if (!country) return null
          return (
            <button
              type="button"
              key={`${event.code}-${event.date}`}
              className="activity-card"
              onClick={() => onSelect(event.code)}
            >
              <span className="activity-meta">
                <FlagIcon country={country} size="small" />
                <span>{country.country}</span>
                <time>{formatIsoDate(event.date)}</time>
              </span>
              <p>{event.summary}</p>
              <span className={`activity-kind kind-${event.kind}`}>
                {changeKindLabels[event.kind]}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Metric({
  label,
  value,
  total,
  tone,
}: {
  label: string
  value: number
  total: number
  tone: 'dark' | 'coral' | 'muted'
}) {
  const animated = useCountUp(value)
  return (
    <div className={`metric metric-${tone}`}>
      <strong>{animated}</strong>
      <span>{label}</span>
      <small>{Math.round((value / total) * 100)}% of EU Member States</small>
    </div>
  )
}

function CountryRow({
  country,
  selected,
  recentlyUpdated,
  onSelect,
}: {
  country: CountryRecord
  selected: boolean
  recentlyUpdated: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`country-row ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <FlagIcon country={country} />
      <span className="country-main">
        <strong>
          {country.country}
          {recentlyUpdated && <em className="row-new">Updated</em>}
        </strong>
        <small>{country.stage}</small>
      </span>
      <span className={`status-dot status-${country.status}`} />
      <span className={`risk risk-${country.risk}`}>{riskLabel[country.risk]}</span>
    </button>
  )
}

function CountryBrief({ country }: { country: CountryRecord }) {
  return (
    <aside className="country-brief" aria-label={`${country.country} evidence brief`}>
      <div className="brief-hero">
        <span className="brief-flag" aria-hidden="true">
          <FlagIcon country={country} size="large" />
        </span>
        <div>
          <p className="eyebrow">Evidence brief</p>
          <h2>{country.country}</h2>
          <div className="brief-tags">
            <span className={`status-pill status-${country.status}`}>
              {statusLabels[country.status]}
            </span>
            <span className={`risk risk-${country.risk}`}>{riskLabel[country.risk]} priority</span>
            <span className={`conf conf-${confidenceOf(country)}`}>
              {confidenceLabels[confidenceOf(country)]}
            </span>
          </div>
        </div>
      </div>

      <div className="brief-readout">
        <div className="readout-grid">
          <div>
            <span>Adoption</span>
            <strong>{statusLabels[country.status]}</strong>
          </div>
          <div>
            <span>Safeguard signal</span>
            <strong>{safeguardLabels[country.implementationSafeguards]}</strong>
          </div>
          <div>
            <span>Confidence</span>
            <strong>{confidenceLabels[confidenceOf(country)]}</strong>
          </div>
        </div>
        <small>
          Last verified {country.lastVerified ?? sourceBaseline} · {riskLabel[country.risk]}{' '}
          review priority
        </small>
      </div>

      <section className="brief-section">
        <h3>Country note</h3>
        <p>{country.summary}</p>
      </section>

      <section className="brief-section source-card">
        <h3>Primary source</h3>
        <p>{country.sourceTitle}</p>
        <dl>
          <div>
            <dt>Source type</dt>
            <dd>{country.sourceType}</dd>
          </div>
          <div>
            <dt>Quality</dt>
            <dd>{country.sourceQuality}</dd>
          </div>
          {country.latestDate && (
            <div>
              <dt>Latest date</dt>
              <dd>{country.latestDate}</dd>
            </div>
          )}
        </dl>
        {country.sourceUrl ? (
          <a href={country.sourceUrl} target="_blank" rel="noreferrer">
            Open source
          </a>
        ) : (
          <span className="missing-source">Official source still needed</span>
        )}
      </section>

      <section className="brief-section">
        <h3>Safeguards and implementation watchpoints</h3>
        <div className={`safeguard safeguard-${country.implementationSafeguards}`}>
          {safeguardLabels[country.implementationSafeguards]}
        </div>
        <ul className="watchpoints">
          {country.watchpoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="brief-section">
        <h3>Verification note</h3>
        <p>{country.verification}</p>
        <div className="source-list">
          {country.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </aside>
  )
}

function FlagIcon({
  country,
  size = 'default',
}: {
  country: CountryRecord
  size?: 'small' | 'default' | 'large'
}) {
  return (
    <img
      className={`flag-img flag-${size}`}
      src={`/flags/${country.code.toLowerCase()}.svg`}
      alt={`${country.country} flag`}
    />
  )
}

export default App
