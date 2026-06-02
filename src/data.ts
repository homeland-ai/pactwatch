export type ImplementationStatus = 'adopted' | 'draft' | 'unclear'
export type RiskLevel = 'low' | 'medium' | 'high'
export type SafeguardState = 'present' | 'partial' | 'gap' | 'review'

export type SourceRecord = {
  label: string
  url: string
  type: 'official' | 'regional' | 'secondary'
}

export type CountryRecord = {
  code: string
  flag: string
  country: string
  status: ImplementationStatus
  stage: string
  risk: RiskLevel
  latestDate?: string
  sourceTitle: string
  sourceUrl?: string
  sourceType: 'official national' | 'regional reference' | 'not recovered'
  verification: string
  implementationSafeguards: SafeguardState
  sourceQuality: 'verified source' | 'needs review' | 'gap'
  progress: number
  summary: string
  watchpoints: string[]
  sources: SourceRecord[]
}


export const commissionReport =
  'https://home-affairs.ec.europa.eu/document/download/8a0aa873-859c-48b4-9f14-29674238393a_en?filename=Communication_State%20of%20play%20on%20the%20implementation%20of%20the%20Pact%20on%20Migration%20and%20Asylum.pdf'

export const countries: CountryRecord[] = [
  {
    code: 'AT',
    flag: '🇦🇹',
    country: 'Austria',
    status: 'adopted',
    stage: 'Adaptation law adopted',
    risk: 'low',
    latestDate: '20 May 2026',
    sourceTitle: 'National Council adopts adaptation law',
    sourceUrl: 'https://www.parlament.gv.at/aktuelles/pk/jahr_2026/pk0440',
    sourceType: 'official national',
    verification: 'Parliament source identified in the implementation source review.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 84,
    summary:
      'Austria is in the adopted group, with implementation legislation identified through a national parliamentary source. Document-level extraction for implementation safeguards remains a monitoring priority.',
    watchpoints: ['screening procedure safeguards', 'border procedure exemptions', 'legal assistance'],
    sources: [
      {
        label: 'Austrian Parliament press note',
        url: 'https://www.parlament.gv.at/aktuelles/pk/jahr_2026/pk0440',
        type: 'official',
      },
    ],
  },
  {
    code: 'BE',
    flag: '🇧🇪',
    country: 'Belgium',
    status: 'draft',
    stage: 'Second reading',
    risk: 'medium',
    latestDate: '6 Mar 2026',
    sourceTitle: 'Implementation: second reading',
    sourceUrl:
      'https://news.belgium.be/fr/mise-en-oeuvre-du-pacte-europeen-sur-la-migration-et-lasile-deuxieme-lecture-0',
    sourceType: 'official national',
    verification: 'Government news source; final legal text has not yet been confirmed as adopted.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 58,
    summary:
      'Belgium is still in the drafting or adoption track. The next useful analysis is whether the second-reading package carries enforceable implementation safeguards.',
    watchpoints: ['draft-to-final changes', 'institutional responsibility references', 'reception guarantees'],
    sources: [
      {
        label: 'Belgian government update',
        url: 'https://news.belgium.be/fr/mise-en-oeuvre-du-pacte-europeen-sur-la-migration-et-lasile-deuxieme-lecture-0',
        type: 'official',
      },
    ],
  },
  {
    code: 'BG',
    flag: '🇧🇬',
    country: 'Bulgaria',
    status: 'draft',
    stage: 'Public consultation',
    risk: 'high',
    latestDate: '23 Jan 2026',
    sourceTitle: 'Draft Law on International Protection',
    sourceUrl: 'https://www.strategy.bg/bg/public-consultations/12112',
    sourceType: 'official national',
    verification: 'Official consultation portal; draft status retained.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 42,
    summary:
      'Bulgaria has a draft law in consultation. This should remain draft until a final adopted text is confirmed from an official legal source.',
    watchpoints: ['consultation outcome', 'age assessment', 'detention alternatives'],
    sources: [
      {
        label: 'Public consultation record',
        url: 'https://www.strategy.bg/bg/public-consultations/12112',
        type: 'official',
      },
    ],
  },
  {
    code: 'HR',
    flag: '🇭🇷',
    country: 'Croatia',
    status: 'draft',
    stage: 'Government proposal',
    risk: 'medium',
    latestDate: '11 Feb 2026',
    sourceTitle: 'Law on International and Temporary Protection',
    sourceUrl:
      'https://vlada.gov.hr/zakon-o-medjunarodnoj-i-privremenoj-zastiti-pridonijet-ce-ucinkovitijem-sprjecavanju-sekundarnih-migracija/46131',
    sourceType: 'official national',
    verification: 'Government source places Croatia in the drafting/adoption group.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 55,
    summary:
      'Croatia has an official government signal on amendments to international and temporary protection law. Full analysis depends on extracting the underlying legal text.',
    watchpoints: ['secondary movement framing', 'vulnerability screening', 'family unity'],
    sources: [
      {
        label: 'Croatian government notice',
        url: 'https://vlada.gov.hr/zakon-o-medjunarodnoj-i-privremenoj-zastiti-pridonijet-ce-ucinkovitijem-sprjecavanju-sekundarnih-migracija/46131',
        type: 'official',
      },
    ],
  },
  {
    code: 'CY',
    flag: '🇨🇾',
    country: 'Cyprus',
    status: 'adopted',
    stage: 'Refugee Law adopted',
    risk: 'medium',
    latestDate: '23 Apr 2026',
    sourceTitle: 'Adoption of the Refugee Law',
    sourceUrl:
      'https://www.gov.cy/metanastefsi/anakoinosi-tou-yfypourgeiou-metanastefsis-kai-diethnous-prostasias-gia-tin-psifisi-tou-peri-prosfygon-nomou/',
    sourceType: 'official national',
    verification: 'Deputy Ministry source; document-level safeguard extraction pending.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 76,
    summary:
      'Cyprus is listed as having adopted most relevant legislation. Given the protection context, the priority is to verify safeguards for vulnerable applicants.',
    watchpoints: ['reception capacity', 'vulnerable applicants', 'border procedure safeguards'],
    sources: [
      {
        label: 'Deputy Ministry announcement',
        url: 'https://www.gov.cy/metanastefsi/anakoinosi-tou-yfypourgeiou-metanastefsis-kai-diethnous-prostasias-gia-tin-psifisi-tou-peri-prosfygon-nomou/',
        type: 'official',
      },
    ],
  },
  {
    code: 'CZ',
    flag: '🇨🇿',
    country: 'Czechia',
    status: 'adopted',
    stage: 'Amending act adopted',
    risk: 'low',
    latestDate: '2026',
    sourceTitle: 'Act amending asylum and residence legislation',
    sourceUrl:
      'https://eur-lex.europa.eu/legal-content/CS/TXT/PDF/?uri=CELEX:72000L0043CZE_202505539',
    sourceType: 'official national',
    verification: 'EU legal repository link identified; canonical national source should be checked.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 80,
    summary:
      'Czechia is in the adopted group. The linked act amends asylum and foreigner residence legislation, but implementation safeguards still need to be classified from the text.',
    watchpoints: ['age assessment', 'appeal rights', 'legal counselling'],
    sources: [
      {
        label: 'Legal text reference',
        url: 'https://eur-lex.europa.eu/legal-content/CS/TXT/PDF/?uri=CELEX:72000L0043CZE_202505539',
        type: 'regional',
      },
    ],
  },
  {
    code: 'DK',
    flag: '🇩🇰',
    country: 'Denmark',
    status: 'draft',
    stage: 'Bill before parliament',
    risk: 'medium',
    latestDate: '15 Jan 2026',
    sourceTitle: 'Proposal amending Aliens Act and Repatriation Act',
    sourceUrl: 'https://www.ft.dk/samling/20251/lovforslag/L95/index.htm',
    sourceType: 'official national',
    verification: 'Parliamentary bill page; not yet classified as adopted.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 50,
    summary:
      'Denmark has a parliamentary proposal linked to the Aliens Act and Repatriation Act. The status should remain draft until final passage is confirmed.',
    watchpoints: ['Danish opt-out context', 'procedure guarantees', 'family unity'],
    sources: [
      {
        label: 'Folketing bill page',
        url: 'https://www.ft.dk/samling/20251/lovforslag/L95/index.htm',
        type: 'official',
      },
    ],
  },
  {
    code: 'EE',
    flag: '🇪🇪',
    country: 'Estonia',
    status: 'adopted',
    stage: 'Act passed',
    risk: 'low',
    latestDate: '18 May 2026',
    sourceTitle: 'Act on Granting International Protection to Aliens',
    sourceUrl:
      'https://www.riigikogu.ee/en/sitting-reviews/the-riigikogu-passed-the-act-on-granting-international-protection-to-aliens/',
    sourceType: 'official national',
    verification: 'Parliament source; detailed text extraction pending.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 82,
    summary:
      'Estonia is in the adopted group after the Riigikogu passed implementation legislation. The next review step is article-level safeguard classification.',
    watchpoints: ['vulnerability assessment', 'rights information', 'appeals'],
    sources: [
      {
        label: 'Riigikogu sitting review',
        url: 'https://www.riigikogu.ee/en/sitting-reviews/the-riigikogu-passed-the-act-on-granting-international-protection-to-aliens/',
        type: 'official',
      },
    ],
  },
  {
    code: 'FI',
    flag: '🇫🇮',
    country: 'Finland',
    status: 'draft',
    stage: 'Submitted to Parliament',
    risk: 'medium',
    latestDate: '16 Apr 2026',
    sourceTitle: 'Government proposal implementing EU Pact',
    sourceUrl:
      'https://valtioneuvosto.fi/en/-/1410869/government-proposal-implementing-eu-pact-on-migration-and-asylum-submitted-to-parliament',
    sourceType: 'official national',
    verification: 'Government source; parliamentary outcome still needs monitoring.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 60,
    summary:
      'Finland has submitted a government proposal to Parliament. It is a strong candidate for near-term update monitoring.',
    watchpoints: ['parliamentary amendments', 'legal aid', 'border procedure safeguards'],
    sources: [
      {
        label: 'Finnish government proposal notice',
        url: 'https://valtioneuvosto.fi/en/-/1410869/government-proposal-implementing-eu-pact-on-migration-and-asylum-submitted-to-parliament',
        type: 'official',
      },
    ],
  },
  {
    code: 'FR',
    flag: '🇫🇷',
    country: 'France',
    status: 'draft',
    stage: 'Implementation announced',
    risk: 'medium',
    latestDate: '10 Apr 2026',
    sourceTitle: 'Implementation of the European Pact',
    sourceUrl:
      'https://www.immigration.interieur.gouv.fr/actualites/communiques/mise-en-oeuvre-du-pacte-europeen-sur-migration-et-lasile',
    sourceType: 'official national',
    verification: 'Interior ministry source; legal instrument set needs consolidation.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 52,
    summary:
      'France has an official implementation communication, but the observatory has not yet recovered a final consolidated legal text.',
    watchpoints: ['instrument list', 'vulnerability exemptions', 'rights information'],
    sources: [
      {
        label: 'French Interior Ministry communication',
        url: 'https://www.immigration.interieur.gouv.fr/actualites/communiques/mise-en-oeuvre-du-pacte-europeen-sur-migration-et-lasile',
        type: 'official',
      },
    ],
  },
  {
    code: 'DE',
    flag: '🇩🇪',
    country: 'Germany',
    status: 'adopted',
    stage: 'Bundestag reform package',
    risk: 'medium',
    latestDate: '27 Feb 2026',
    sourceTitle: 'Bundestag paves way for reform',
    sourceUrl: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw09-de-geas-1149762',
    sourceType: 'official national',
    verification: 'Bundestag source; final adopted package should be checked against gazette text.',
    implementationSafeguards: 'partial',
    sourceQuality: 'needs review',
    progress: 78,
    summary:
      'Germany is in the adopted group. Because implementation can span several acts, the record is flagged for package-level legal reconciliation.',
    watchpoints: ['federal implementation split', 'detention safeguards', 'institutional responsibilities'],
    sources: [
      {
        label: 'Bundestag text archive',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw09-de-geas-1149762',
        type: 'official',
      },
    ],
  },
  {
    code: 'GR',
    flag: '🇬🇷',
    country: 'Greece',
    status: 'draft',
    stage: 'Consultation / ministry draft',
    risk: 'high',
    latestDate: '11 May 2026',
    sourceTitle: 'Implementation of the Pact on Immigration and Asylum',
    sourceUrl: 'https://www.opengov.gr/immigration/?p=2176',
    sourceType: 'official national',
    verification: 'Official consultation page; high-priority review signal due to border procedure relevance.',
    implementationSafeguards: 'partial',
    sourceQuality: 'needs review',
    progress: 46,
    summary:
      'Greece has an official implementation proposal in the draft/adoption group. Implementation review should prioritize border procedures, reception and vulnerability safeguards.',
    watchpoints: ['island/border procedures', 'reception conditions', 'vulnerable applicants'],
    sources: [
      {
        label: 'OpenGov consultation',
        url: 'https://www.opengov.gr/immigration/?p=2176',
        type: 'official',
      },
    ],
  },
  {
    code: 'HU',
    flag: '🇭🇺',
    country: 'Hungary',
    status: 'unclear',
    stage: 'No definitive public status',
    risk: 'high',
    sourceTitle: 'No definitive public source recovered',
    sourceType: 'not recovered',
    verification: 'No definitive official implementation status has been recovered.',
    implementationSafeguards: 'gap',
    sourceQuality: 'gap',
    progress: 16,
    summary:
      'Hungary is a visible information gap. It should remain unclassified until an official national implementation source is recovered.',
    watchpoints: ['official implementation source', 'access to asylum procedure', 'implementation safeguards'],
    sources: [],
  },
  {
    code: 'IE',
    flag: '🇮🇪',
    country: 'Ireland',
    status: 'adopted',
    stage: 'Bill passed Oireachtas',
    risk: 'low',
    latestDate: '15 Apr 2026',
    sourceTitle: 'International Protection Bill 2026 passed',
    sourceUrl: 'https://www.gov.ie/en/department-of-justice-home-affairs-and-migration/press-releases/p/',
    sourceType: 'official national',
    verification: 'Government press source; final act URL should be added when recovered.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 79,
    summary:
      'Ireland is in the adopted group after passage through the Houses of the Oireachtas. Final text recovery remains a review task.',
    watchpoints: ['final act link', 'procedure safeguards', 'legal counselling'],
    sources: [
      {
        label: 'Irish government press release',
        url: 'https://www.gov.ie/en/department-of-justice-home-affairs-and-migration/press-releases/p/',
        type: 'official',
      },
    ],
  },
  {
    code: 'IT',
    flag: '🇮🇹',
    country: 'Italy',
    status: 'draft',
    stage: 'Chamber dossier',
    risk: 'high',
    latestDate: '18 May 2026',
    sourceTitle: 'Provisions implementing the Pact',
    sourceUrl: 'https://documenti.camera.it/leg19/dossier/testi/AC0497.htm?_1779353105689',
    sourceType: 'official national',
    verification: 'Chamber dossier; final instrument status should be checked.',
    implementationSafeguards: 'partial',
    sourceQuality: 'needs review',
    progress: 49,
    summary:
      'Italy has a parliamentary dossier in the draft/adoption group. The public product should prioritize implementation analysis once the final legal text is available.',
    watchpoints: ['accelerated procedures', 'detention and alternatives', 'institutional responsibilities'],
    sources: [
      {
        label: 'Camera dossier',
        url: 'https://documenti.camera.it/leg19/dossier/testi/AC0497.htm?_1779353105689',
        type: 'official',
      },
    ],
  },
  {
    code: 'LV',
    flag: '🇱🇻',
    country: 'Latvia',
    status: 'draft',
    stage: 'Draft recast law',
    risk: 'medium',
    latestDate: '16 Feb 2026',
    sourceTitle: 'Draft Recast Immigration Law',
    sourceUrl:
      'https://titania.saeima.lv/LIVS14/saeimalivs14.nsf/0/88686B78DF79ADB1C2258936002EF13C?OpenDocument',
    sourceType: 'official national',
    verification: 'Parliamentary document page; not yet marked adopted.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 48,
    summary:
      'Latvia has a draft recast immigration law. The record should remain draft until the Saeima process reaches final adoption.',
    watchpoints: ['draft amendments', 'procedural guarantees', 'vulnerability screening'],
    sources: [
      {
        label: 'Saeima draft record',
        url: 'https://titania.saeima.lv/LIVS14/saeimalivs14.nsf/0/88686B78DF79ADB1C2258936002EF13C?OpenDocument',
        type: 'official',
      },
    ],
  },
  {
    code: 'LT',
    flag: '🇱🇹',
    country: 'Lithuania',
    status: 'adopted',
    stage: 'Legal status law changes',
    risk: 'medium',
    latestDate: '25 May 2026',
    sourceTitle: 'Changes to Law on Legal Status of Aliens',
    sourceUrl:
      'https://migracija.lrv.lt/lt/naujienos/aktualiausi-uzsienieciu-teisines-padeties-istatymo-pasikeitimai-mGl/',
    sourceType: 'official national',
    verification: 'Migration department source; legal text extraction pending.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 75,
    summary:
      'Lithuania is in the adopted group with recent changes to the Law on the Legal Status of Aliens. Implementation safeguard analysis remains pending.',
    watchpoints: ['legal status changes', 'border procedure safeguards', 'appeal access'],
    sources: [
      {
        label: 'Migration department update',
        url: 'https://migracija.lrv.lt/lt/naujienos/aktualiausi-uzsienieciu-teisines-padeties-istatymo-pasikeitimai-mGl/',
        type: 'official',
      },
    ],
  },
  {
    code: 'LU',
    flag: '🇱🇺',
    country: 'Luxembourg',
    status: 'draft',
    stage: 'Draft Law 8684',
    risk: 'medium',
    latestDate: '14 Jan 2026',
    sourceTitle: 'Draft Law 8684',
    sourceUrl: 'https://www.chd.lu/en/dossier/8684',
    sourceType: 'official national',
    verification: 'Chamber of Deputies dossier; draft status retained.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 44,
    summary:
      'Luxembourg has a parliamentary draft dossier. Document extraction can identify whether implementation safeguards are explicit or delegated.',
    watchpoints: ['committee progress', 'explicit vulnerability safeguards', 'legal assistance'],
    sources: [{ label: 'Chamber dossier', url: 'https://www.chd.lu/en/dossier/8684', type: 'official' }],
  },
  {
    code: 'MT',
    flag: '🇲🇹',
    country: 'Malta',
    status: 'unclear',
    stage: 'No definitive public status',
    risk: 'high',
    sourceTitle: 'No definitive public source recovered',
    sourceType: 'not recovered',
    verification: 'No definitive official implementation status has been recovered.',
    implementationSafeguards: 'gap',
    sourceQuality: 'gap',
    progress: 18,
    summary:
      'Malta is a priority gap because implementation relevance is high and no definitive source has been recovered.',
    watchpoints: ['official source recovery', 'reception safeguards', 'border procedure guarantees'],
    sources: [],
  },
  {
    code: 'NL',
    flag: '🇳🇱',
    country: 'Netherlands',
    status: 'adopted',
    stage: 'Senate supported Pact package',
    risk: 'low',
    latestDate: '26 May 2026',
    sourceTitle: 'Senate supports European asylum and migration pact',
    sourceUrl: 'https://www.eerstekamer.nl/nieuws/20260526/senaat_steunt_europees_asiel_en',
    sourceType: 'official national',
    verification: 'Senate source; adopted group.',
    implementationSafeguards: 'partial',
    sourceQuality: 'needs review',
    progress: 83,
    summary:
      'The Netherlands is in the adopted group after Senate support. Safeguard analysis should check whether vulnerability-sensitive guarantees are in primary or secondary rules.',
    watchpoints: ['secondary legislation', 'legal counselling', 'vulnerability checks'],
    sources: [
      {
        label: 'Dutch Senate update',
        url: 'https://www.eerstekamer.nl/nieuws/20260526/senaat_steunt_europees_asiel_en',
        type: 'official',
      },
    ],
  },
  {
    code: 'PL',
    flag: '🇵🇱',
    country: 'Poland',
    status: 'unclear',
    stage: 'No definitive public status',
    risk: 'high',
    sourceTitle: 'No definitive public source recovered',
    sourceType: 'not recovered',
    verification: 'No definitive official implementation status has been recovered.',
    implementationSafeguards: 'gap',
    sourceQuality: 'gap',
    progress: 20,
    summary:
      'Poland is currently a gap record. It should not be promoted beyond unclear without an official national source.',
    watchpoints: ['official source recovery', 'border context', 'implementation safeguards'],
    sources: [],
  },
  {
    code: 'PT',
    flag: '🇵🇹',
    country: 'Portugal',
    status: 'draft',
    stage: 'Council of Ministers statement',
    risk: 'medium',
    latestDate: '7 May 2026',
    sourceTitle: 'Council of Ministers statement',
    sourceUrl:
      'https://portugal.gov.pt/gc25/governo/comunicados-do-conselho-de-ministros/comunicado-do-conselho-de-ministros-de-7-de-maio-de-2026',
    sourceType: 'official national',
    verification: 'Government statement; final legal text has not yet been recovered.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 52,
    summary:
      'Portugal has an official Council of Ministers statement. The next step is linking the underlying legislative instrument.',
    watchpoints: ['instrument recovery', 'vulnerability safeguards', 'reception standards'],
    sources: [
      {
        label: 'Council of Ministers statement',
        url: 'https://portugal.gov.pt/gc25/governo/comunicados-do-conselho-de-ministros/comunicado-do-conselho-de-ministros-de-7-de-maio-de-2026',
        type: 'official',
      },
    ],
  },
  {
    code: 'RO',
    flag: '🇷🇴',
    country: 'Romania',
    status: 'draft',
    stage: 'Commission report reference',
    risk: 'medium',
    sourceTitle: 'See European Commission report',
    sourceUrl: commissionReport,
    sourceType: 'regional reference',
    verification: 'Only a regional reference has been recovered so far; national official source recovery remains required.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 38,
    summary:
      'Romania is in the drafting/adoption group, but only a regional reference has been recovered so far. National official source recovery is required before publication-grade analysis.',
    watchpoints: ['national source recovery', 'draft text', 'vulnerability safeguards'],
    sources: [{ label: 'European Commission report', url: commissionReport, type: 'regional' }],
  },
  {
    code: 'SK',
    flag: '🇸🇰',
    country: 'Slovakia',
    status: 'adopted',
    stage: 'New act effective 12 June',
    risk: 'low',
    latestDate: '30 Apr 2026',
    sourceTitle: 'New Act on International Protection',
    sourceUrl:
      'https://www.minv.sk/?tlacove-spravy-6&sprava=novy-zakon-o-medzinarodnej-ochrane-ucinny-od-12-juna-zrychli-konania',
    sourceType: 'official national',
    verification: 'Interior ministry source; adopted group.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 81,
    summary:
      'Slovakia has an official source for a new international protection act effective from 12 June. Detailed implementation review is pending.',
    watchpoints: ['accelerated procedures', 'vulnerability-sensitive process', 'appeal timelines'],
    sources: [
      {
        label: 'Interior ministry update',
        url: 'https://www.minv.sk/?tlacove-spravy-6&sprava=novy-zakon-o-medzinarodnej-ochrane-ucinny-od-12-juna-zrychli-konania',
        type: 'official',
      },
    ],
  },
  {
    code: 'SI',
    flag: '🇸🇮',
    country: 'Slovenia',
    status: 'unclear',
    stage: 'No definitive public status',
    risk: 'high',
    sourceTitle: 'No definitive public source recovered',
    sourceType: 'not recovered',
    verification: 'No definitive official implementation status has been recovered.',
    implementationSafeguards: 'gap',
    sourceQuality: 'gap',
    progress: 18,
    summary:
      'Slovenia is an unresolved record. The observatory keeps the gap visible rather than inferring a status.',
    watchpoints: ['official source recovery', 'implementation plan', 'implementation safeguards'],
    sources: [],
  },
  {
    code: 'ES',
    flag: '🇪🇸',
    country: 'Spain',
    status: 'draft',
    stage: 'Commission report reference',
    risk: 'medium',
    sourceTitle: 'See European Commission report',
    sourceUrl: commissionReport,
    sourceType: 'regional reference',
    verification: 'Only a regional reference has been recovered so far; national official source recovery remains required.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 39,
    summary:
      'Spain requires national source recovery. The Commission report is treated as a placeholder reference, not a substitute for official national text.',
    watchpoints: ['national source recovery', 'border procedure safeguards', 'reception safeguards'],
    sources: [{ label: 'European Commission report', url: commissionReport, type: 'regional' }],
  },
  {
    code: 'SE',
    flag: '🇸🇪',
    country: 'Sweden',
    status: 'draft',
    stage: 'Government proposition',
    risk: 'medium',
    latestDate: '6 May 2026',
    sourceTitle: 'Adaptation of Swedish law to the Pact',
    sourceUrl: 'https://www.regeringen.se/rattsliga-dokument/proposition/2026/05/prop.-202526262',
    sourceType: 'official national',
    verification: 'Government proposition; final parliamentary status needs monitoring.',
    implementationSafeguards: 'review',
    sourceQuality: 'needs review',
    progress: 57,
    summary:
      'Sweden has a government proposition on adaptation to the Pact. The record treats it as draft/adoption-stage pending final confirmation.',
    watchpoints: ['parliamentary vote', 'permanent residence changes', 'vulnerability safeguards'],
    sources: [
      {
        label: 'Swedish government proposition',
        url: 'https://www.regeringen.se/rattsliga-dokument/proposition/2026/05/prop.-202526262',
        type: 'official',
      },
    ],
  },
]

export const safeguardLabels: Record<SafeguardState, string> = {
  present: 'Safeguards identified',
  partial: 'Partial signals',
  gap: 'Visible implementation gap',
  review: 'Needs policy review',
}

export const statusLabels: Record<ImplementationStatus, string> = {
  adopted: 'Adopted',
  draft: 'Draft / adopting',
  unclear: 'Unclear',
}
