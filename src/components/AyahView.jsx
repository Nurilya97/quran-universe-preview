import { useEffect, useMemo, useRef, useState } from 'react'
import { getAyahPrototype } from '../ayahPrototype.js'
import './AyahView.css'
import { SyntaxView } from './SyntaxView.jsx'
import './WordFocusViews.css'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
}
function InfoIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 10v6M12 7.2h.01" /></svg>
}
function ExternalIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6m0-6L10 14M10 5H5v14h14v-5" /></svg>
}

const WORLD = { width: 2500, height: 1900 }
const BLOCK_Y = [300, 620, 940, 1260, 1580]
const WORD_GAP = 152
const VIEW_BOUNDS = {
  analysis: { left: 650, right: 1850, top: 430, bottom: 1360 },
  composition: { left: 430, right: 2070, top: 40, bottom: 1840 },
}

function finiteNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function defaultScale() {
  if (typeof window !== 'undefined' && window.innerWidth <= 760) return .60
  return .74
}

function phraseTokens(ayah, block) {
  return ayah.tokens.slice(block.range[0] - 1, block.range[1])
}

function layoutBlock(block, blockIndex) {
  const count = block.range[1] - block.range[0] + 1
  const centerX = WORLD.width / 2
  const y = BLOCK_Y[blockIndex]
  return Array.from({ length: count }, (_, i) => ({
    index: block.range[0] + i,
    x: centerX + ((count - 1) / 2 - i) * WORD_GAP,
    y,
  }))
}

function AnalysisDiagram({ ayah, focusWordIndex, language, selectedWord, onSelectWord }) {
  const selectedBlock = selectedWord
    ? ayah.blocks.find(block => selectedWord >= block.range[0] && selectedWord <= block.range[1])
    : null

  return <div className="diagram-view analysis-diagram">
    <div className="analysis-ayah-group">
      <div className="analysis-ayah-continuous" lang="ar" dir="rtl">
        {ayah.tokens.map((token, index) => {
          const wordIndex = index + 1
          const isEntry = wordIndex === focusWordIndex
          const isSelected = wordIndex === selectedWord
          const isRelated = selectedBlock && wordIndex >= selectedBlock.range[0] && wordIndex <= selectedBlock.range[1]
          return <span key={wordIndex}>
            <button
              className={'analysis-inline-word' + (isEntry ? ' is-entry' : '') + (isSelected ? ' is-selected' : '') + (isRelated ? ' is-related' : '')}
              onClick={(event) => {
                event.stopPropagation()
                onSelectWord(isSelected ? null : wordIndex)
              }}
              aria-pressed={isSelected}
            >{token.ar}</button>
            {index < ayah.tokens.length - 1 ? ' ' : ''}
          </span>
        })}
      </div>

      <div className="analysis-verse-reference">
        <span>{ayah.reference}</span>
        <small>{ayah.surah[language]}</small>
      </div>
      {!selectedWord && <div className="analysis-tap-hint">
        {language === 'ru' ? 'Нажмите на любое слово' : 'Tap any word'}
      </div>}
    </div>
  </div>
}

function WordFocusOverlay({ ayah, selectedWord, language, onClose, onOpenWordOrbit }) {
  const [focusView, setFocusView] = useState('word')
  useEffect(() => { setFocusView('word') }, [selectedWord])
  if (!selectedWord) return null
  const selected = ayah.tokens[selectedWord - 1]
  if (!selected) return null
  const ru = language === 'ru'
  const meaning = selected.analysis?.[language]?.meaning
  const morphology = selected.analysis?.[language]?.morphology
  const morphologyParts = morphology?.parts || []
  const isTaqwa = selected.orbitId === 'taqwa'
  const focusViews = [
    ['word', ru ? 'Значение' : 'Meaning'],
    ['morphology', ru ? 'Морфология' : 'Morphology'],
    ['relation', ru ? 'Синтаксис' : 'Syntax'],
  ]
  return <div className={'analysis-focus-overlay focus-view-' + focusView} onClick={onClose}>
    <div className="analysis-focus-space" onClick={onClose}>
      <button className="word-focus-return" aria-label={ru ? 'Вернуться к аяту' : 'Return to ayah'} onClick={event => { event.stopPropagation(); onClose() }}><ArrowIcon /></button>
      {focusView === 'word' && <section className="word-meaning-view" onClick={event => event.stopPropagation()}>
        <div className="word-meaning-hero">
          <span lang="ar" dir="rtl">{selected.ar}</span>
          <small>{selected.tr}</small>
          {meaning?.gloss && <strong className="word-meaning-gloss">{meaning.gloss}</strong>}
        </div>
        <div className="word-meaning-explanation">
          {(meaning?.description || (ru ? selected.noteRu : selected.noteEn)) && <section>
            <h3>{ru ? 'Смысл в этом аяте' : 'Meaning in this ayah'}</h3>
            <p>{meaning?.description || (ru ? selected.noteRu : selected.noteEn)}</p>
          </section>}
          {meaning?.translation && <section>
            <h3>{ru ? 'Почему такой перевод' : 'Why this translation'}</h3>
            <p>{meaning.translation}</p>
          </section>}
        </div>
        {selected.orbitId && <button className="word-meaning-orbit" onClick={() => onOpenWordOrbit?.(selected)}>
          {ru ? 'Перейти в орбиту слова →' : 'Open word orbit →'}
        </button>}
      </section>}
      {focusView === 'relation' && <SyntaxView key={ayah.reference + ':' + selectedWord} ayah={ayah} selectedWord={selectedWord} language={language} />}

      {focusView === 'morphology' && <section className="analysis-morphology-screen" onClick={(event) => event.stopPropagation()}>
        <div className="analysis-morphology-canvas">
          <header className="analysis-morphology-hero">
            <span lang="ar" dir="rtl">{selected.ar}</span>
            <em>{selected.tr}</em>
          </header>

          {isTaqwa ? <>
            <svg className="analysis-morphology-tree first" viewBox="0 0 100 58" preserveAspectRatio="none" aria-hidden="true">
              <path d="M50 2 C50 22 25 20 25 55" />
              <path d="M50 2 C50 22 75 20 75 55" />
            </svg>

            <div className="analysis-morphology-level first-level">
              <article className="analysis-morphology-node base">
                <span lang="ar" dir="rtl">{morphologyParts[1]?.ar || 'تَقْوَىٰ'}</span>
                <small>{morphologyParts[1]?.tr || 'taqwā'}</small>
                <b>{ru ? 'Слово без артикля' : 'Word without the article'}</b>
                <p>{ru
                  ? 'تَقْوَىٰ (taqwā) — существительное. Контекстный перевод в этом аяте: «благочестие / праведность».'
                  : 'تَقْوَىٰ (taqwā) is a noun. Contextual renderings here include “piety” and “righteousness”.'}</p>
              </article>

              <article className="analysis-morphology-node article">
                <span lang="ar" dir="rtl">{morphologyParts[0]?.ar || 'ٱلـ'}</span>
                <small>{morphologyParts[0]?.tr || 'al-'}</small>
                <b>{ru ? 'Определённый артикль' : 'Definite article'}</b>
                <p>{ru
                  ? 'ٱلـ (al-) делает существительное определённым: указывает на конкретно обозначенное или уже определённое в контексте понятие.'
                  : 'ٱلـ (al-) makes the noun definite: it points to something specifically identified or already determined in context.'}</p>
              </article>
            </div>

            <svg className="analysis-morphology-tree second" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
              <path d="M25 2 C25 22 16.7 28 16.7 59" />
              <path d="M25 2 C25 22 50 24 50 59" />
              <path d="M25 2 C25 22 83.3 24 83.3 59" />
            </svg>

            <div className="analysis-morphology-level second-level has-three">
              <article className="analysis-morphology-node root">
                <span lang="ar" dir="rtl">{morphologyParts[2]?.ar || selected.root}</span>
                <small>{morphologyParts[2]?.tr || selected.rootReading}</small>
                <b>{ru ? 'Корень' : 'Root'}</b>
                <p>{ru
                  ? 'و ق ي (w-q-y) несёт идею защиты и оберегания.'
                  : 'و ق ي (w-q-y) carries the idea of protection and guarding.'}</p>
              </article>

              <article className="analysis-morphology-node verb">
                <span lang="ar" dir="rtl">ٱتَّقَىٰ</span>
                <small>ittaqā</small>
                <b>{ru ? 'Связанная глагольная форма · VIII' : 'Related verbal form · Form VIII'}</b>
                <p>{ru
                  ? 'Глагол VIII формы от того же корня: остерегаться, оберегать себя. Он делает активный оттенок корневой идеи особенно заметным.'
                  : 'A Form VIII verb from the same root: to be wary and guard oneself. It makes the active shade of the root especially visible.'}</p>
              </article>

              <article className="analysis-morphology-node pattern">
                <span lang="ar" dir="rtl">{morphologyParts[3]?.ar || 'فَعْلَى'}</span>
                <small>{morphologyParts[3]?.tr || 'faʿlā'}</small>
                <b>{ru ? 'Именная модель' : 'Nominal pattern'}</b>
                <p>{ru
                  ? 'فَعْلَى (faʿlā) показывает словообразовательную модель, по которой построено تَقْوَىٰ (taqwā).'
                  : 'فَعْلَى (faʿlā) shows the nominal pattern on which تَقْوَىٰ (taqwā) is formed.'}</p>
              </article>
            </div>

            <div className="analysis-morphology-note">
              <div className="analysis-morphology-summary-formula" lang="ar" dir="rtl">
                ٱلتَّقْوَىٰ = ٱلـ + تَقْوَىٰ
              </div>
              <div className="analysis-morphology-summary-list">
                <p>{ru
                  ? <><b>Основа:</b> تَقْوَىٰ (taqwā) — существительное из словообразовательного гнезда корня و ق ي (w-q-y) «защищать / оберегать».</>
                  : <><b>Base:</b> تَقْوَىٰ (taqwā) belongs to the derivational family of the root و ق ي (w-q-y), “to protect / guard.”</>}</p>
                <p>{ru
                  ? <><b>Связанная форма:</b> ٱتَّقَىٰ (ittaqā), VIII форма, показывает активное действие — остерегаться и оберегать себя.</>
                  : <><b>Related form:</b> ٱتَّقَىٰ (ittaqā), Form VIII, shows the active sense of guarding oneself.</>}</p>
                <p>{ru
                  ? <><b>Модель:</b> فَعْلَى (faʿlā) показывает именную словообразовательную форму تَقْوَىٰ (taqwā).</>
                  : <><b>Pattern:</b> فَعْلَى (faʿlā) shows the nominal pattern of تَقْوَىٰ (taqwā).</>}</p>
                <p>{ru
                  ? <><b>Что добавилось:</b> ٱلـ (al-) присоединяется к слову и делает его определённым.</>
                  : <><b>What is added:</b> ٱلـ (al-) attaches to the word and makes it definite.</>}</p>
                <p>{ru
                  ? <><b>В аяте 2:197:</b> краткий контекстный перевод — «благочестие / праведность».</>
                  : <><b>In 2:197:</b> concise contextual renderings include “piety / righteousness.”</>}</p>
              </div>
            </div>
          </> : <div className="analysis-morphology-generic">
            {morphologyParts.map((part, index) => <article className="analysis-morphology-node" key={index}>
              <span lang="ar" dir="rtl">{part.ar}</span>
              <small>{part.tr}</small>
              <b>{part.label}</b>
            </article>)}
            {morphology?.text && <div className="analysis-morphology-note"><p>{morphology.text}</p></div>}
          </div>}
        </div>
      </section>}

      <nav className="analysis-focus-view-switch" onClick={(event) => event.stopPropagation()} aria-label={ru ? 'Вид разбора слова' : 'Word analysis view'}>
        {focusViews.map(([id, label]) => <button
          key={id}
          className={focusView === id ? 'is-active' : ''}
          onClick={() => setFocusView(id)}
          aria-pressed={focusView === id}
        >{label}</button>)}
      </nav>
    </div>
  </div>
}

function CompositionDiagram({ ayah, focusWordIndex, language }) {
  const ru = language === 'ru'
  const sourceY = 790

  return <div className="diagram-view composition-diagram">
    <svg className="diagram-lines composition-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {ayah.blocks.map((block, blockIndex) => {
        const points = layoutBlock(block, blockIndex)
        const center = { x: WORLD.width / 2, y: points[0].y }
        return <g key={block.id} style={{ '--composition-line-delay': `${160 + blockIndex * 70}ms` }}>
          <path className="composition-spine" d={`M ${center.x} ${center.y - 58} L ${center.x} ${center.y + 58}`} />
          {blockIndex < ayah.blocks.length - 1 && <path className="composition-spine" d={`M ${center.x} ${center.y + 58} L ${center.x} ${BLOCK_Y[blockIndex + 1] - 58}`} />}
        </g>
      })}
    </svg>

    {ayah.blocks.map((block, index) => {
      const isActiveBlock = focusWordIndex >= block.range[0] && focusWordIndex <= block.range[1]
      return <section
        key={block.id}
        className={'composition-constellation' + (isActiveBlock ? ' has-entry' : '')}
        style={{
          left: WORLD.width / 2,
          top: BLOCK_Y[index],
          '--composition-from-y': `${sourceY - BLOCK_Y[index]}px`,
          '--composition-delay': `${index * 62}ms`,
        }}
      >
        <i aria-hidden="true" />
        <small>{String(index + 1).padStart(2, '0')}</small>
        <h3>{block[language].title}</h3>
        <div className="composition-phrase" lang="ar" dir="rtl">
          {phraseTokens(ayah, block).map((token, tokenIndex) => {
            const wordIndex = block.range[0] + tokenIndex
            return <span key={wordIndex} className={wordIndex === focusWordIndex ? 'is-entry' : ''}>{token.ar}</span>
          })}
        </div>
        <p>{block[language].text}</p>
      </section>
    })}

    <div className="composition-summary" style={{ left: WORLD.width / 2, top: 1760 }}>
      <span>{ru ? 'Ход аята' : 'Flow of the ayah'}</span>
      <p>{ayah.flow[language]}</p>
    </div>
  </div>
}

function CanvasWorld({ ayah, mode, focusWordIndex, language, selectedWord, onSelectWord }) {
  if (mode === 'composition') return <CompositionDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
  return <AnalysisDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={onSelectWord} />
}

export function AyahView({ reference, focusWordIndex, language, onBack, onOpenWordOrbit }) {
  const ayah = getAyahPrototype(reference)
  const [mode, setMode] = useState('analysis')
  const [contextOpen, setContextOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState(null)
  const [activeWordIndex, setActiveWordIndex] = useState(focusWordIndex || null)
  const [camera, setCamera] = useState(() => ({ x: 0, y: 0, scale: defaultScale() }))
  const pointers = useRef(new Map())
  const gesture = useRef(null)
  const viewportRef = useRef(null)
  const cameraRef = useRef(camera)

  useEffect(() => {
    cameraRef.current = camera
  }, [camera])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (selectedWord) {
        setSelectedWord(null)
        return
      }
      if (contextOpen) setContextOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedWord, contextOpen])

  useEffect(() => {
    setMode('analysis')
    setContextOpen(false)
    setSelectedWord(null)
    setActiveWordIndex(focusWordIndex || null)
    setCamera({ x: 0, y: 0, scale: defaultScale() })
    pointers.current.clear()
    gesture.current = null
  }, [reference, focusWordIndex])

  if (!ayah) {
    return <section className={'ayah-space-shell' + (selectedWord && mode === 'analysis' ? ' has-word-focus' : '')}><button className="ayah-back" onClick={onBack}><ArrowIcon /></button></section>
  }

  const ru = language === 'ru'
  const modes = [
    { id: 'analysis', label: ru ? 'Разбор' : 'Analysis', status: 'ready' },
    { id: 'composition', label: ru ? 'Композиция' : 'Composition', status: 'draft' },
  ]

  function clampCamera(next, targetMode = mode) {
    const current = cameraRef.current || { x: 0, y: 0, scale: defaultScale() }
    const isComposition = targetMode === 'composition'
    const minScale = isComposition ? .42 : .48
    const maxScale = isComposition ? 1.45 : 1.08
    const scale = clamp(finiteNumber(next.scale, current.scale), minScale, maxScale)
    const viewport = viewportRef.current?.getBoundingClientRect()
    const rawX = finiteNumber(next.x, current.x)
    const rawY = finiteNumber(next.y, current.y)

    if (!viewport || viewport.width < 1 || viewport.height < 1) {
      const fallbackLimit = isComposition ? 900 : 150
      return { x: clamp(rawX, -fallbackLimit, fallbackLimit), y: clamp(rawY, -fallbackLimit, fallbackLimit), scale }
    }

    const bounds = VIEW_BOUNDS[targetMode] || VIEW_BOUNDS.analysis
    const cx = viewport.width / 2
    const cy = viewport.height / 2
    const worldCx = WORLD.width / 2
    const worldCy = WORLD.height / 2

    const contentMinX = -cx - (bounds.right - worldCx) * scale
    const contentMaxX = viewport.width - cx - (bounds.left - worldCx) * scale
    const contentMinY = -cy - (bounds.bottom - worldCy) * scale
    const contentMaxY = viewport.height - cy - (bounds.top - worldCy) * scale

    if (isComposition) {
      /* Composition behaves like a map: every edge of the thematic structure
         can be brought into view without the analysis layer's centre lock. */
      return {
        x: clamp(rawX, contentMinX, contentMaxX),
        y: clamp(rawY, contentMinY, contentMaxY),
        scale,
      }
    }

    /* Analysis stays gently anchored around the verse. */
    const zoomProgress = clamp((scale - .48) / .60, 0, 1)
    const softLimitX = Math.min(viewport.width * .46, 120 + zoomProgress * 380)
    const softLimitY = Math.min(viewport.height * .38, 120 + zoomProgress * 300)

    const minX = Math.max(contentMinX, -softLimitX)
    const maxX = Math.min(contentMaxX, softLimitX)
    const minY = Math.max(contentMinY, -softLimitY)
    const maxY = Math.min(contentMaxY, softLimitY)

    const x = minX > maxX ? 0 : clamp(rawX, minX, maxX)
    const y = minY > maxY ? 0 : clamp(rawY, minY, maxY)

    return { x, y, scale }
  }

  function resetCamera(targetMode = mode) {
    const scale = defaultScale()
    const next = clampCamera({ x: 0, y: 0, scale }, targetMode)
    cameraRef.current = next
    setCamera(next)
  }

  function zoomBy(delta) {
    const current = cameraRef.current
    const next = clampCamera({ ...current, scale: current.scale + delta })
    cameraRef.current = next
    setCamera(next)
  }

  function onWheel(event) {
    event.preventDefault()
    zoomBy(event.deltaY > 0 ? -.07 : .07)
  }

  function onPointerDown(event) {
    // Word buttons must receive their click instead of the canvas capturing it.
    if (event.target.closest('button')) return
    if (event.button !== undefined && event.button !== 0) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const currentCamera = cameraRef.current
    if (pointers.current.size === 1) {
      gesture.current = { type: 'pan', x: event.clientX, y: event.clientY, cameraX: currentCamera.x, cameraY: currentCamera.y }
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      gesture.current = { type: 'pinch', distance, scale: currentCamera.scale }
    }
  }

  function onPointerMove(event) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      const currentCamera = cameraRef.current

      if (!Number.isFinite(distance) || distance < 8) return
      if (gesture.current?.type !== 'pinch') {
        gesture.current = { type: 'pinch', distance, scale: currentCamera.scale }
      }

      const baseDistance = gesture.current.distance
      if (!Number.isFinite(baseDistance) || baseDistance < 8) return

      const ratio = distance / baseDistance
      if (!Number.isFinite(ratio) || ratio <= 0) return

      const nextScale = gesture.current.scale * ratio
      const next = clampCamera({ ...currentCamera, scale: nextScale })
      cameraRef.current = next
      setCamera(next)
      return
    }

    if (gesture.current?.type === 'pan') {
      const dx = event.clientX - gesture.current.x
      const dy = event.clientY - gesture.current.y
      if (!Number.isFinite(dx) || !Number.isFinite(dy)) return

      const currentCamera = cameraRef.current
      const next = clampCamera({
        ...currentCamera,
        x: gesture.current.cameraX + dx,
        y: gesture.current.cameraY + dy,
      })
      cameraRef.current = next
      setCamera(next)
    }
  }

  function onPointerUp(event) {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size === 1) {
      const remaining = [...pointers.current.values()][0]
      const currentCamera = cameraRef.current
      gesture.current = { type: 'pan', x: remaining.x, y: remaining.y, cameraX: currentCamera.x, cameraY: currentCamera.y }
    } else {
      gesture.current = null
    }
  }

  function selectWord(wordIndex) {
    setSelectedWord(wordIndex)
    if (wordIndex) {
      setActiveWordIndex(wordIndex)
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setSelectedWord(null)
    setContextOpen(false)
    const scale = defaultScale()
    requestAnimationFrame(() => {
      const next = clampCamera({ x: 0, y: 0, scale }, nextMode)
      cameraRef.current = next
      setCamera(next)
    })
  }

  return <section className={'ayah-space-shell' + (mode === 'analysis' ? ' is-analysis' : '') + (selectedWord && mode === 'analysis' ? ' has-word-focus' : '')}>
    <div className="ayah-space-topbar">
      <button className="ayah-back" onClick={onBack}><ArrowIcon /><span>{ru ? 'К слову' : 'Back'}</span></button>
      <div className="ayah-space-reference"><strong>{ayah.reference}</strong><small>{ayah.surah[language]}</small></div>
      <button className={'ayah-context-trigger' + (contextOpen ? ' is-open' : '')} onClick={() => setContextOpen(v => !v)}><InfoIcon /><span>{ru ? 'Контекст' : 'Context'}</span></button>
    </div>

    <nav className="ayah-space-modes" role="tablist" aria-label={ru ? 'Слои Ayah Space' : 'Ayah Space layers'}>
      {modes.map(item => <button
        key={item.id}
        className={'mode-' + item.status}
        role="tab"
        aria-selected={mode === item.id}
        onClick={() => changeMode(item.id)}
      >{item.label}</button>)}
    </nav>

    {contextOpen && <aside className="ayah-space-context">
      <header><span>{ru ? 'Контекст' : 'Context'}</span><button aria-label={ru ? 'Закрыть контекст' : 'Close context'} onClick={() => setContextOpen(false)}>×</button></header>

      <section className="ayah-context-section">
        <small>{ru ? `О суре ${ayah.surah.ru}` : `About Surah ${ayah.surah.en}`}</small>
        <p>{ayah.context.surah[language]}</p>
      </section>

      <section className="ayah-context-section">
        <small>{ru ? 'Связь аята с окружающим отрывком' : 'How the ayah fits the surrounding passage'}</small>
        <p>{ayah.context.passage[language]}</p>
      </section>

      <section className="ayah-context-section is-revelation">
        <small>{ru ? 'Известная история ниспослания' : 'Known revelation context'}</small>
        <p>{ayah.context.revelation[language]}</p>
      </section>

      <div className="ayah-context-sources">
        <small>{ru ? 'Источники контекста' : 'Context sources'}</small>
        {ayah.contextSources?.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
          {source[language]} <ExternalIcon />
        </a>)}
      </div>

      <div className="ayah-context-tools">
        <small>{ru ? 'Исследовать аят' : 'Explore the ayah'}</small>
        <a href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
          Al Quran · Greentech <ExternalIcon />
        </a>
      </div>
    </aside>}

    <div
      ref={viewportRef}
      className="ayah-space-viewport"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={() => resetCamera()}
      onClick={() => selectedWord && selectWord(null)}
    >
      <div className="ayah-space-grid" aria-hidden="true" />
      <div className="ayah-space-boundary" aria-hidden="true" />
      <div className="ayah-space-world" style={{ transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) scale(${selectedWord && mode === 'analysis' ? Math.min(camera.scale * 1.16, 1.18) : camera.scale})` }}>
        <CanvasWorld ayah={ayah} mode={mode} focusWordIndex={activeWordIndex || focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={selectWord} />
      </div>
    </div>

    {mode === 'analysis' && <WordFocusOverlay
      ayah={ayah}
      selectedWord={selectedWord}
      language={language}
      onClose={() => selectWord(null)}
      onOpenWordOrbit={onOpenWordOrbit}
    />}

    <div className="ayah-space-zoom">
      <button aria-label={ru ? 'Увеличить масштаб' : 'Zoom in'} onClick={() => zoomBy(.08)}>+</button>
      <span>{Math.round(camera.scale * 100)}%</span>
      <button aria-label={ru ? 'Уменьшить масштаб' : 'Zoom out'} onClick={() => zoomBy(-.08)}>−</button>
    </div>

  </section>
}
