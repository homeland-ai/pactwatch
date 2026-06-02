import { useMemo, useState } from 'react'
import {
  commissionReport,
  countries,
  ecreSource,
  safeguardLabels,
  statusLabels,
  type CountryRecord,
  type ImplementationStatus,
  type RiskLevel,
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
    }),
    [],
  )

  function exportCsv() {
    const headers = [
      'Country',
      'Status',
      'Stage',
      'Review priority',
      'Source type',
      'Source title',
      'Source URL',
      'Implementation safeguards',
      'Verification',
    ]
    const rows = countries.map((country) => [
      country.country,
      statusLabels[country.status],
      country.stage,
      riskLabel[country.risk],
      country.sourceType,
      country.sourceTitle,
      country.sourceUrl ?? '',
      safeguardLabels[country.implementationSafeguards],
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
    link.download = 'pactwatch-v1.csv'
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
          <span>Updated 28 May 2026</span>
          <a href={ecreSource} target="_blank" rel="noreferrer">
            ECRE seed
          </a>
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
          <h1>National implementation, made legible.</h1>
          <p>
            A public v1 observatory turning official laws, bills and government
            signals into comparable country intelligence for policymakers,
            institutions, journalists and migration specialists following Pact
            implementation.
          </p>
        </div>
        <div className="overview-panel" aria-label="Implementation summary">
          <Metric label="Adopted" value={counts.adopted} total={27} tone="dark" />
          <Metric label="Draft / adopting" value={counts.draft} total={27} tone="coral" />
          <Metric label="Unclear" value={counts.unclear} total={27} tone="muted" />
          <div className="progress-story">
            <span>Implementation pulse</span>
            <div className="progress-track" aria-hidden="true">
              <i style={{ width: `${(counts.adopted / 27) * 100}%` }} />
              <b style={{ width: `${(counts.draft / 27) * 100}%` }} />
            </div>
            <small>
              {counts.highRisk} high-priority records and {counts.sourceGaps} source
              gaps need review.
            </small>
          </div>
        </div>
      </section>

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
  return (
    <div className={`metric metric-${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{Math.round((value / total) * 100)}% of EU Member States</small>
    </div>
  )
}

function CountryRow({
  country,
  selected,
  onSelect,
}: {
  country: CountryRecord
  selected: boolean
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
        <strong>{country.country}</strong>
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
          </div>
        </div>
      </div>

      <div className="brief-progress">
        <div>
          <span>PactWatch signal</span>
          <strong>{country.progress}%</strong>
        </div>
        <div className="progress-track large" aria-hidden="true">
          <i style={{ width: `${country.progress}%` }} />
        </div>
        <small>Indicative score derived from status, source quality and review priority.</small>
      </div>

      <section className="brief-section">
        <h3>AI-ready summary</h3>
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
