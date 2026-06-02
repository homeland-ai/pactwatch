import { useMemo, useState } from 'react'
import {
  commissionReport,
  countries,
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
          <span>Updated 28 May 2026</span>
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
            A standalone observatory turning national laws, bills and government
            signals into comparable country intelligence for policymakers,
            institutions, journalists and migration specialists following Pact
            implementation across the EU.
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

      <ImplementationAnalysis counts={counts} />

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

function ImplementationAnalysis({
  counts,
}: {
  counts: {
    adopted: number
    draft: number
    unclear: number
    highRisk: number
    sourceGaps: number
  }
}) {
  const advancedCountries = countries
    .filter((country) => country.status === 'adopted')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 6)

  const watchCountries = countries.filter(
    (country) =>
      country.status === 'unclear' ||
      country.sourceType !== 'official national' ||
      country.risk === 'high',
  )

  return (
    <section className="analysis-panel" aria-label="Implementation analysis">
      <div className="analysis-heading">
        <p className="eyebrow">Implementation analysis</p>
        <h2>Uneven legal readiness, with a narrow group already ahead.</h2>
        <p>
          PactWatch currently identifies {counts.adopted} Member States with most
          relevant national legislation adopted, {counts.draft} still in a
          drafting or adoption track, and {counts.unclear} where no definitive
          public implementation status has been recovered.
        </p>
      </div>

      <div className="analysis-grid">
        <article>
          <span>Advanced countries</span>
          <h3>Adoption is concentrated in a small first wave.</h3>
          <p>
            Austria, the Netherlands, Estonia, Slovakia, Czechia and Ireland show
            the clearest legislative progress. Germany, Cyprus and Lithuania are
            also in the adopted group, but still need package-level or
            article-level review before implementation quality can be compared.
          </p>
          <div className="country-chip-line">
            {advancedCountries.map((country) => (
              <CountryChip key={country.code} country={country} />
            ))}
          </div>
        </article>

        <article>
          <span>Less advanced records</span>
          <h3>The most exposed records are unclear or source-light.</h3>
          <p>
            Hungary, Malta, Poland and Slovenia remain unclear. Romania and Spain
            still depend on regional references rather than recovered national
            official sources, while Bulgaria, Greece and Italy require close
            monitoring because they combine draft status with high review
            priority.
          </p>
          <div className="country-chip-line">
            {watchCountries.slice(0, 9).map((country) => (
              <CountryChip key={country.code} country={country} />
            ))}
          </div>
        </article>

        <article>
          <span>Implementation challenges</span>
          <h3>The legal texts are only the first test.</h3>
          <p>
            The recurring challenges are final-text recovery, distinguishing
            primary legislation from implementing rules, mapping institutional
            responsibilities, and checking whether accelerated, border and
            screening procedures include usable safeguards in practice.
          </p>
          <ul>
            <li>Source gaps in {counts.sourceGaps} records need immediate follow-up.</li>
            <li>Draft packages need monitoring through final parliamentary adoption.</li>
            <li>Adopted packages still need article-level safeguard extraction.</li>
          </ul>
        </article>

        <article>
          <span>Emerging best practice</span>
          <h3>The strongest signals are transparent and dated.</h3>
          <p>
            The most useful national sources publish dated parliamentary or
            government records, identify the affected legal instruments, and make
            the adoption stage clear. Those features make implementation easier
            to scrutinise, compare and update as the Pact enters application.
          </p>
          <ul>
            <li>Clear adoption or effective dates.</li>
            <li>Direct links to bills, acts or parliamentary dossiers.</li>
            <li>Traceable responsibilities across ministries and agencies.</li>
          </ul>
        </article>
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

function CountryChip({ country }: { country: CountryRecord }) {
  return (
    <span className="country-chip">
      <FlagIcon country={country} size="small" />
      {country.country}
    </span>
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
