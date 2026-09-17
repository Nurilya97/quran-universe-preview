import { useEffect, useRef, useState } from 'react'
import { Cosmos } from './Cosmos.jsx'
import { COPY, FORMS, ROOT_ORBITS, SOURCES, TAQWA_REFERENCES, resolveQuery, rootPosition } from '../demo.js'
import './ImmersiveUniverse.css'

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'search' && <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>}
    {name === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
    {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
    {name === 'back' && <path d="M19 12H5m6-6-6 6 6 6" />}
    {name === 'pause' && <path d="M9 5v14M15 5v14" />}
    {name === 'play' && <path d="m9 5 10 7-10 7Z" />}
    {name === 'external' && <path d="M14 4h6v6m0-6L10 14M10 5H5v14h14v-5" />}
    {name === 'list' && <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />}
  </svg>
}

function initialLanguage() {
  try { return localStorage.getItem('qu-language') === 'en' ? 'en' : 'ru' } catch { return 'ru' }
}

export function ImmersiveUniverse() {
  const [language, setLanguage] = useState(initialLanguage)
  const [scene, setScene] = useState('search')
  const [journey, setJourney] = useState(null)
  const [word, setWord] = useState(FORMS[2])
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)
  const [panel, setPanel] = useState(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const timer = useRef(null)
  const dialog = useRef(null)
  const input = useRef(null)
  const destinationHeading = useRef(null)
  const t = COPY[language]

  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem('qu-language', language) } catch { /* optional storage */ }
  }, [language])

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => { media.removeEventListener('change', update); clearTimeout(timer.current) }
  }, [])

  useEffect(() => {
    if (panel && dialog.current && !dialog.current.open) dialog.current.showModal()
    if (!panel && dialog.current?.open) dialog.current.close()
  }, [panel])

  function travel(destination, nextWord = word) {
    if (journey) return
    setPanel(null)
    setFocused(false)
    setError(false)
    input.current?.blur()
    setWord(nextWord)
    const duration = paused || reducedMotion ? 180 : destination === 'root' ? 1350 : 1700
    setJourney({ started: performance.now(), duration, direction: destination === 'root' ? -1 : 1, destination })
    setScene(destination)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setJourney(null)
      requestAnimationFrame(() => destinationHeading.current?.focus({ preventScroll: true }))
    }, duration)
  }

  function home() {
    clearTimeout(timer.current)
    setJourney(null)
    setPanel(null)
    setScene('search')
    setQuery('')
    setError(false)
    setFocused(false)
  }

  function submit(event) {
    event.preventDefault()
    const destination = resolveQuery(query)
    if (destination) travel(destination, FORMS[2])
    else setError(true)
  }

  const panelTitle = panel === 'forms' ? t.allForms : panel ? t[panel] : ''
  const className = 'universe scene-' + scene + (journey ? ' is-travelling' : '') + (paused || reducedMotion ? ' is-still' : '')

  const wordOrbitNodes = [
    { key: 'quran', left: '30%', top: '25%' },
    { key: 'structure', left: '84%', top: '48%' },
    { key: 'meaning', left: '35%', top: '77%' },
  ]

  return <main className={className}>
    <Cosmos scene={scene} journey={journey} paused={paused} reducedMotion={reducedMotion} />
    <div className="cosmos-vignette" aria-hidden="true" />
    <header className="universe-header">
      {scene !== 'search' ? <button className="brand-button" onClick={home} aria-label={t.home}>Quran Universe</button> : <span />}
      <div className="header-actions">
        {scene !== 'search' && <button className="icon-button" onClick={home} aria-label={t.search}><Icon name="search" /></button>}
        <div className="language-control" role="group" aria-label={t.language}>
          <button lang="ru" aria-pressed={language === 'ru'} onClick={() => setLanguage('ru')}>RU</button>
          <span aria-hidden="true">/</span>
          <button lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </div>
    </header>

    {scene === 'search' && !journey && <section className="search-stage" aria-label={t.search}>
      <h1>Quran Universe</h1>
      <div className="search-wrap">
        <form className={'search-form' + (focused ? ' has-focus' : '')} onSubmit={submit} role="search">
          <Icon name="search" />
          <input ref={input} value={query} dir="auto" placeholder={t.placeholder} aria-label={t.searchLabel}
            autoComplete="off" spellCheck="false" enterKeyHint="search" aria-describedby={error ? 'search-error' : undefined}
            onFocus={() => setFocused(true)} onChange={(event) => { setQuery(event.target.value); setError(false) }}
            onKeyDown={(event) => { if (event.key === 'Escape') { setFocused(false); input.current?.blur() } }} />
          <button type="submit" className="search-submit" aria-label={t.enter}><Icon name="arrow" /></button>
        </form>
        {(focused || query || error) && <div className="search-discovery">
          {error && <p id="search-error" className="search-error" role="status">{t.noResult}</p>}
          <p className="eyebrow">{t.available}</p>
          <button className="search-result" onClick={() => travel('word', FORMS[2])}>
            <span className="word-label"><span className="arabic" lang="ar" dir="rtl">تَقْوَى</span><small className="transliteration" lang="ar-Latn" dir="ltr">taqwā</small></span><span>{t.word}</span><Icon name="arrow" />
          </button>
          <button className="search-result" onClick={() => travel('root')}>
            <span lang="ar" dir="rtl">و ق ي</span><span>{t.root}</span><Icon name="arrow" />
          </button>
        </div>}
      </div>
    </section>}

    {journey && <div className="journey" role="status">
      <span className="sr-only">{t.travel}</span>
      <span lang="ar" dir="rtl">{scene === 'root' ? 'و ق ي' : word.arabic}</span>
    </div>}

    {scene === 'word' && !journey && <section className="word-stage stage-reveal" aria-label={t.orbit}>
      <button className="root-return" onClick={() => travel('root')} aria-label={t.returnRoot}>
        <Icon name="back" /><span>{t.root}</span><span lang="ar" dir="rtl">و ق ي</span>
      </button>
      <div className="orbit-field">
        <div className="word-core">
          <h1 ref={destinationHeading} tabIndex={-1} lang="ar" dir="rtl">{word.arabic}</h1>
          <p className="word-reading transliteration" lang="ar-Latn" dir="ltr">{word.reading}</p>
        </div>
        {wordOrbitNodes.map(({ key, left, top }) => <button key={key} className={'orbit-node node-' + key}
          style={{ left, top }} onClick={() => setPanel(key)} aria-haspopup="dialog">
          <span className="node-light" aria-hidden="true" /><span className="node-label">{t[key]}</span>
        </button>)}
      </div>
      <p className="scene-label">{t.orbit}</p>
    </section>}

    {scene === 'root' && !journey && <section className="root-stage stage-reveal" aria-label={t.rootSpace}>
      <div className="root-intro"><p className="eyebrow">{t.families}</p></div>
      <div className="root-field">
        {ROOT_ORBITS.map((orbit) => <div key={orbit.id} className={'root-orbit root-orbit-' + orbit.id}
          style={{ '--diameter': orbit.radius * 2 + '%' }} aria-hidden="true"><span>{orbit.id}</span></div>)}
        <div className="root-core"><h1 ref={destinationHeading} tabIndex={-1} lang="ar" dir="rtl">و ق ي</h1><span>{t.root}</span></div>
        {FORMS.map((form) => {
          const point = rootPosition(form)
          return <button key={form.id} className={'root-star' + (form.id === 'taqwa' ? ' root-star-featured' : '')}
          data-orbit={form.orbit} aria-label={form.arabic + ' · ' + t[form.type] + ' · ' + t.familyLabel + ' ' + form.orbit}
          style={{ '--x': point.x + '%', '--y': point.y + '%' }} onClick={() => travel('word', form)}>
          <span className="star-point" aria-hidden="true" /><span className="arabic" lang="ar" dir="rtl">{form.arabic}</span>
          <small className="transliteration" lang="ar-Latn" dir="ltr">{form.reading}</small>
          <span className="form-type">{t[form.type]}</span>
        </button>})}
      </div>
      <button className="forms-button" onClick={() => setPanel('forms')} aria-haspopup="dialog"><Icon name="list" />{t.allForms}<span>{FORMS.length}</span></button>
    </section>}

    {scene !== 'search' && !journey && <button className="motion-button icon-button" onClick={() => setPaused(!paused)}
      aria-label={paused ? t.resume : t.pause} aria-pressed={paused || reducedMotion} disabled={reducedMotion} title={paused ? t.resume : t.pause}>
      <Icon name={paused || reducedMotion ? 'play' : 'pause'} />
    </button>}

    <dialog ref={dialog} className="detail-sheet" aria-labelledby="sheet-title" onCancel={(event) => { event.preventDefault(); setPanel(null) }}
      onClick={(event) => { if (event.target === event.currentTarget) setPanel(null) }}>
      <div className="sheet-inner">
        <div className="sheet-handle" aria-hidden="true" />
        <header className="sheet-header"><div><p className="eyebrow">{panel === 'forms' ? t.rootSpace : t.orbit}</p><h2 id="sheet-title">{panelTitle}</h2></div>
          <button className="icon-button" autoFocus onClick={() => setPanel(null)} aria-label={t.close}><Icon name="close" /></button>
        </header>
        {panel !== 'forms' && <div className="sheet-word-label"><p className="sheet-word" lang="ar" dir="rtl">{word.arabic}</p><small className="transliteration" lang="ar-Latn" dir="ltr">{word.reading}</small></div>}
        {panel === 'quran' && (word.id === 'taqwa' ? <>
          <h3>{t.references}</h3><div className="verse-list">{TAQWA_REFERENCES.map((ref) => <a key={ref}
            href={'https://quran.com/' + ref.replace(':', '/')} target="_blank" rel="noopener noreferrer" aria-label={t.openVerse + ' ' + ref}>
            <span>{ref}</span><Icon name="external" /></a>)}</div><p className="sheet-note">{t.referenceNote}</p>
        </> : <p className="sheet-note">{word.lexicalOnly ? t.lexicalNote : t.noReferences}</p>)}
        {panel === 'structure' && <><dl className="structure-list"><div><dt>{t.root}</dt><dd lang="ar" dir="rtl">و ق ي</dd></div>
          <div><dt>{t.wordType}</dt><dd>{t[word.type]}</dd></div><div><dt>{t.familyLabel}</dt><dd>{word.orbit}</dd></div></dl>
          {word.lexicalOnly && <p className="sheet-note">{t.lexicalNote}</p>}
          <p className="sheet-note">{t.researchPending}</p>
          <a className="source-link" href={SOURCES[word.source]} target="_blank" rel="noopener noreferrer">{t.source}: {t[word.source === 'corpus' ? 'sourceCorpus' : word.source === 'taqwa' ? 'sourceAlmaany' : 'sourceLexicon']}<Icon name="external" /></a></>}
        {panel === 'meaning' && <><p className="sheet-note">{word.gloss ? t[word.gloss] : word.id === 'taqwa' ? t.meaningPending : t.noMeaning}</p>
          {word.gloss && <a className="source-link" href={SOURCES[word.source]} target="_blank" rel="noopener noreferrer">{t.sourceLexicon}<Icon name="external" /></a>}</>}
        {panel === 'forms' && <>{ROOT_ORBITS.map((family) => <section className="form-family" key={family.id}>
          <h3>{t[family.label]}</h3>{FORMS.filter((form) => form.orbit === family.id).map((form) => <button key={form.id} onClick={() => travel('word', form)}>
            <span className="word-label"><span className="arabic" lang="ar" dir="rtl">{form.arabic}</span><small className="transliteration" lang="ar-Latn" dir="ltr">{form.reading}</small></span><span>{t[form.type]}{form.lexicalOnly && <small className="lexical-tag">{t.lexical}</small>}</span><Icon name="arrow" /></button>)}
        </section>)}<p className="sheet-note">{t.formsNote}</p></>}
      </div>
    </dialog>
  </main>
}
