import { useEffect, useRef, useState } from 'react'
import { Cosmos } from './Cosmos.jsx'
import { COPY, FORMS, ROOT_DEMOS, findWord, findRoot, formsForRoot, resolveQuery, rootForWord, rootPosition } from '../demo.js'
import { RootDetails, WordDetails } from './WordDetails.jsx'
import { OCCURRENCES } from '../occurrences.js'
import { AyahView } from './AyahView.jsx'
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
    {name === 'plus' && <path d="M5 12h14M12 5v14" />}
    {name === 'minus' && <path d="M5 12h14" />}
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
  const [rootKey, setRootKey] = useState('wqy')
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)
  const [panel, setPanel] = useState(null)
  const [paused, setPaused] = useState(false)
  const [ayahFocus, setAyahFocus] = useState(null)
  const [rootZoom, setRootZoom] = useState(1)
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const timer = useRef(null)
  const dialog = useRef(null)
  const input = useRef(null)
  const destinationHeading = useRef(null)
  const panelTrigger = useRef(null)
  const rootViewport = useRef(null)
  const rootZoomRef = useRef(1)
  const rootGesture = useRef({ mode: null, startDistance: 0, startZoom: 1, lastX: 0, lastY: 0 })
  const t = COPY[language]
  const currentRoot = ROOT_DEMOS[rootKey] || ROOT_DEMOS.wqy
  const currentRootForms = formsForRoot(currentRoot.id)
  const currentRootOrbits = currentRoot.orbits

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
    if (panel && dialog.current) {
      if (!dialog.current.open) dialog.current.showModal()
      dialog.current.scrollTop = 0
    }
    if (!panel && dialog.current?.open) dialog.current.close()
  }, [panel])

  useEffect(() => {
    const viewport = rootViewport.current
    if (scene !== 'root' || journey || rootKey !== 'lbb' || !viewport) return
    const center = () => {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2
      viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2
    }
    center()
    const observer = new ResizeObserver(center)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [scene, journey, rootKey])


  function clampRootZoom(value) {
    return Math.max(.45, Math.min(1.8, Number(value.toFixed(3))))
  }

  function zoomRoot(delta) {
    setRootZoom(value => {
      const next = clampRootZoom(value + delta)
      rootZoomRef.current = next
      return next
    })
  }

  function resetRootZoom() {
    rootZoomRef.current = 1
    setRootZoom(1)
  }

  function touchDistance(touches) {
    if (touches.length < 2) return 0
    const a = touches[0]
    const b = touches[1]
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
  }

  function handleRootTouchStart(event) {
    if (currentRoot.id !== 'lbb') return

    if (event.touches.length >= 2) {
      event.preventDefault()
      rootGesture.current = {
        mode: 'pinch',
        startDistance: touchDistance(event.touches),
        startZoom: rootZoomRef.current,
        lastX: 0,
        lastY: 0,
      }
      return
    }

    if (event.touches.length === 1) {
      const touch = event.touches[0]
      rootGesture.current = {
        mode: 'pan',
        startDistance: 0,
        startZoom: rootZoomRef.current,
        lastX: touch.clientX,
        lastY: touch.clientY,
      }
    }
  }

  function handleRootTouchMove(event) {
    if (currentRoot.id !== 'lbb') return
    const viewport = rootViewport.current
    if (!viewport) return

    if (event.touches.length >= 2) {
      event.preventDefault()

      if (rootGesture.current.mode !== 'pinch' || !rootGesture.current.startDistance) {
        rootGesture.current = {
          mode: 'pinch',
          startDistance: touchDistance(event.touches),
          startZoom: rootZoomRef.current,
          lastX: 0,
          lastY: 0,
        }
        return
      }

      const ratio = touchDistance(event.touches) / rootGesture.current.startDistance
      const next = clampRootZoom(rootGesture.current.startZoom * ratio)
      rootZoomRef.current = next
      setRootZoom(next)
      return
    }

    if (event.touches.length === 1) {
      event.preventDefault()
      const touch = event.touches[0]

      if (rootGesture.current.mode !== 'pan') {
        rootGesture.current = {
          mode: 'pan',
          startDistance: 0,
          startZoom: rootZoomRef.current,
          lastX: touch.clientX,
          lastY: touch.clientY,
        }
        return
      }

      viewport.scrollLeft -= touch.clientX - rootGesture.current.lastX
      viewport.scrollTop -= touch.clientY - rootGesture.current.lastY
      rootGesture.current.lastX = touch.clientX
      rootGesture.current.lastY = touch.clientY
    }
  }

  function handleRootTouchEnd(event) {
    if (currentRoot.id !== 'lbb') return

    if (event.touches.length >= 2) {
      rootGesture.current = {
        mode: 'pinch',
        startDistance: touchDistance(event.touches),
        startZoom: rootZoomRef.current,
        lastX: 0,
        lastY: 0,
      }
    } else if (event.touches.length === 1) {
      const touch = event.touches[0]
      rootGesture.current = {
        mode: 'pan',
        startDistance: 0,
        startZoom: rootZoomRef.current,
        lastX: touch.clientX,
        lastY: touch.clientY,
      }
    } else {
      rootGesture.current.mode = null
    }
  }

  function handleRootWheel(event) {
    if (currentRoot.id !== 'lbb' || (!event.ctrlKey && !event.metaKey)) return
    event.preventDefault()
    const next = clampRootZoom(rootZoomRef.current + (event.deltaY < 0 ? .08 : -.08))
    rootZoomRef.current = next
    setRootZoom(next)
  }

  function handleRootViewportKeyDown(event) {
    if (currentRoot.id !== 'lbb') return
    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      zoomRoot(.1)
    } else if (event.key === '-') {
      event.preventDefault()
      zoomRoot(-.1)
    } else if (event.key === '0') {
      event.preventDefault()
      resetRootZoom()
    }
  }

  function openPanel(nextPanel) {
    panelTrigger.current = document.activeElement
    setPanel(nextPanel)
  }

  function closePanel() {
    setPanel(null)
    requestAnimationFrame(() => panelTrigger.current?.focus?.({ preventScroll: true }))
  }

  function openAyah(item) {
    setPanel(null)
    setAyahFocus({ reference: item.sura + ':' + item.ayah, wordIndex: item.word })
    setScene('ayah')
  }

  function closeAyah() {
    setAyahFocus(null)
    setScene('word')
    requestAnimationFrame(() => destinationHeading.current?.focus?.({ preventScroll: true }))
  }

  function openWordFromAyah(token) {
    let nextWord = token?.orbitId ? FORMS.find(form => form.id === token.orbitId) : findWord(token?.arabic || token?.ar || token?.tr || '')
    if (!nextWord && token?.root === 'و ق ي') {
      if ((token.tr || '').includes('taqw')) nextWord = FORMS.find(form => form.id === 'taqwa')
      else if ((token.tr || '').includes('ittaq')) nextWord = FORMS.find(form => form.id === 'ittaqa')
    }
    if (!nextWord) return
    setAyahFocus(null)
    setRootKey(rootForWord(nextWord).id)
    travel('word', nextWord)
  }

  function travel(destination, nextWord = word) {
    if (journey) return
    setPanel(null)
    setFocused(false)
    setError(false)
    input.current?.blur()
    setWord(nextWord)
    if (destination === 'word') setRootKey(rootForWord(nextWord).id)
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
    setAyahFocus(null)
    setQuery('')
    setError(false)
    setFocused(false)
  }

  function submit(event) {
    event.preventDefault()
    const destination = resolveQuery(query)
    const rootMatch = findRoot(query)
    const wordMatch = findWord(query)
    if (destination === 'root' && rootMatch) {
      setRootKey(rootMatch.id)
      travel('root')
    } else if (destination === 'word' && wordMatch) {
      setRootKey(rootForWord(wordMatch).id)
      travel('word', wordMatch)
    } else setError(true)
  }

  const panelTitle = panel === 'forms' ? t.allForms : panel === 'root' ? t.aboutRoot : panel ? t[panel] : ''
  const searchWord = findWord(query) || FORMS[2]
  const searchRoot = findRoot(query) || rootForWord(searchWord)
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
          <button className="search-result" onClick={() => travel('word', searchWord)}>
            <span className="word-label"><span className="arabic" lang="ar" dir="rtl">{searchWord.arabic}</span><small className="transliteration" lang="ar-Latn" dir="ltr">{searchWord.reading}</small></span><span>{t.word}</span><Icon name="arrow" />
          </button>
          <button className="search-result" onClick={() => { setRootKey(searchRoot.id); travel('root') }}>
            <span lang="ar" dir="rtl">{searchRoot.arabic}</span><span>{t.root}</span><Icon name="arrow" />
          </button>
        </div>}
      </div>
    </section>}

    {journey && <div className="journey" role="status">
      <span className="sr-only">{t.travel}</span>
      <span lang="ar" dir="rtl">{scene === 'root' ? currentRoot.arabic : word.arabic}</span>
    </div>}

    {scene === 'word' && !journey && <section className="word-stage stage-reveal" aria-label={t.orbit}>
      <button className="root-return" onClick={() => travel('root')} aria-label={t.returnRoot}>
        <Icon name="back" /><span>{t.root}</span><span lang="ar" dir="rtl">{currentRoot.arabic}</span>
      </button>
      <div className="orbit-field">
        <div className="word-core">
          <h1 ref={destinationHeading} tabIndex={-1} lang="ar" dir="rtl">{word.arabic}</h1>
          <p className="word-reading transliteration" lang="ar-Latn" dir="ltr">{word.reading}</p>
        </div>
        {wordOrbitNodes.map(({ key, left, top }) => <button key={key} className={'orbit-node node-' + key}
          style={{ left, top }} onClick={() => openPanel(key)} aria-haspopup="dialog">
          <span className="node-light" aria-hidden="true" /><span className="node-label">{t[key]}</span>
        </button>)}
      </div>
      <p className="scene-label">{t.orbit}</p>
    </section>}

    {scene === 'ayah' && !journey && ayahFocus && <AyahView reference={ayahFocus.reference} focusWordIndex={ayahFocus.wordIndex} language={language} onBack={closeAyah} onOpenWordOrbit={openWordFromAyah} />}

    {scene === 'root' && !journey && <section className={'root-stage stage-reveal root-stage-' + currentRoot.id} aria-label={t.rootSpace}>
      <div className="root-intro"><p className="eyebrow">{t.families}</p></div>
      <div className="root-legend" aria-label={t.rootLegend}>
        <span><i className="root-legend-orbit" aria-hidden="true" />{t.orbitRingLegend}</span>
        <span><b>{currentRootOrbits.map(orbit => orbit.mark || orbit.id).join(' · ')}</b><small>{t.formNumberLegend}</small></span>
        <span><i className="root-legend-quran" aria-hidden="true" />{t.quranColorLegend}</span>
        {currentRootOrbits.some(orbit => orbit.innerRadius) && <span><i className="root-legend-inner" aria-hidden="true" />{t.innerOrbitLegend}</span>}
      </div>
      <div
        className="root-viewport"
        ref={rootViewport}
        tabIndex={currentRoot.id === 'lbb' ? 0 : undefined}
        aria-label={t.rootSpace}
        onKeyDown={handleRootViewportKeyDown}
        onWheel={handleRootWheel}
        onTouchStartCapture={handleRootTouchStart}
        onTouchMoveCapture={handleRootTouchMove}
        onTouchEndCapture={handleRootTouchEnd}
        onTouchCancelCapture={handleRootTouchEnd}
      >
      <div className="root-canvas">
      <div className="root-field" style={currentRoot.id === 'lbb' ? { '--root-zoom': rootZoom } : undefined}>
        {currentRootOrbits.filter(orbit => orbit.innerRadius).map(orbit => <div key={orbit.id + '-inner'} className="root-orbit root-orbit-inner" style={{ '--diameter': orbit.innerRadius * 2 + '%' }} aria-hidden="true"><span>{orbit.mark || orbit.id}</span></div>)}
        {currentRootOrbits.map((orbit) => <div key={orbit.id} className={'root-orbit root-orbit-' + orbit.id}
          style={{ '--diameter': orbit.radius * 2 + '%' }} aria-hidden="true"><span>{orbit.mark || orbit.id}</span></div>)}
        <div className="root-core"><button className="root-core-trigger" onClick={() => openPanel('root')} aria-label={t.aboutRoot} aria-haspopup="dialog"><h1 ref={destinationHeading} tabIndex={-1} lang="ar" dir="rtl">{currentRoot.arabic}</h1><span>{t.root}</span></button></div>
        {currentRootForms.map((form) => {
          const point = rootPosition(form, currentRootOrbits)
          const quranic = (OCCURRENCES[form.id]?.length || 0) > 0
          return <button key={form.id} className={'root-star' + (form.id === 'taqwa' ? ' root-star-featured' : '') + (quranic ? ' root-star-quranic' : '')}
          data-orbit={form.orbit} aria-label={form.arabic + ' · ' + t[form.type] + ' · ' + t.familyLabel + ' ' + form.orbit}
          style={{ '--x': point.x + '%', '--y': point.y + '%' }} onClick={() => travel('word', form)}>
          <span className="star-point" aria-hidden="true" /><span className="arabic" lang="ar" dir="rtl">{form.arabic}</span>
          <small className="transliteration" lang="ar-Latn" dir="ltr">{form.reading}</small>
          <span className="form-type">{t[form.type + 'Short'] || t[form.type]}</span>
        </button>})}
      </div>
      </div></div>
      <button className="forms-button" onClick={() => openPanel('forms')} aria-haspopup="dialog"><Icon name="list" />{t.allForms}<span>{currentRootForms.length}</span></button>
    </section>}


    <dialog ref={dialog} className={'detail-sheet' + (panel === 'structure' ? ' structure-sheet' : '')}
      aria-labelledby={panel === 'structure' ? undefined : 'sheet-title'}
      aria-label={panel === 'structure' ? t.structure : undefined}
      onCancel={(event) => { event.preventDefault(); closePanel() }}
      onClick={(event) => { if (event.target === event.currentTarget) closePanel() }}>
      <div className="sheet-inner">
        <div className="sheet-handle" aria-hidden="true" />
        <header className={'sheet-header' + (panel === 'structure' ? ' sheet-header-compact' : '')}>
          {panel !== 'structure' && <div><p className="eyebrow">{panel === 'forms' || panel === 'root' ? t.rootSpace : t.orbit}</p><h2 id="sheet-title">{panelTitle}</h2></div>}
          <button className="icon-button" autoFocus onClick={closePanel} aria-label={t.close}><Icon name="close" /></button>
        </header>
        {panel !== 'forms' && panel !== 'structure' && <div className="sheet-word-label"><p className="sheet-word" lang="ar" dir="rtl">{panel === 'root' ? currentRoot.arabic : word.arabic}</p><small className="transliteration" lang="ar-Latn" dir="ltr">{panel === 'root' ? currentRoot.reading : word.reading}</small></div>}
        {panel === 'root' && <RootDetails language={language} rootKey={currentRoot.id} />}
        {['quran', 'structure', 'meaning'].includes(panel) && <WordDetails key={word.id + panel} word={word} panel={panel} language={language} onPick={form => travel('word', form)} onOpenAyah={openAyah} />}
        {panel === 'forms' && <>{currentRootOrbits.map((family) => <section className="form-family" key={family.id}>
          <h3>{t[family.label]}</h3>{currentRootForms.filter((form) => form.orbit === family.id).map((form) => <button key={form.id} onClick={() => travel('word', form)}>
            <span className="word-label"><span className="arabic" lang="ar" dir="rtl">{form.arabic}</span><small className="transliteration" lang="ar-Latn" dir="ltr">{form.reading}</small></span><span>{t[form.type]}{form.lexicalOnly && <small className="lexical-tag">{t.lexical}</small>}</span><Icon name="arrow" /></button>)}
        </section>)}<p className="sheet-note">{t.formsNote}</p></>}
      </div>
    </dialog>
  </main>
}

