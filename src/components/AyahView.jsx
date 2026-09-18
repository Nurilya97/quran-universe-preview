import { useEffect, useMemo, useRef, useState } from 'react'
import { getAyahPrototype } from '../ayahPrototype.js'
import './AyahView.css'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
}
function InfoIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 10v6M12 7.2h.01" /></svg>
}
function ExternalIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6m0-6L10 14M10 5H5v14h14v-5" /></svg>
}
function ResetIcon() {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 7v5h5M6.6 17.2A8 8 0 1 0 5 9" /></svg>
}

const WORLD = { width: 2500, height: 1900 }
const BLOCK_Y = [300, 620, 940, 1260, 1580]
const WORD_GAP = 152
const ANALYSIS_ROW_Y = [650, 790, 930, 1070]
const ANALYSIS_ROW_COUNTS = [8, 7, 7, 7]
const ANALYSIS_WORD_GAP = 145
const VIEW_BOUNDS = {
  analysis: { left: 650, right: 1850, top: 430, bottom: 1360 },
  composition: { left: 430, right: 2070, top: 40, bottom: 1840 },
  rhetoric: { left: 300, right: 2200, top: 40, bottom: 1780 },
  sound: { left: 300, right: 2200, top: 40, bottom: 1780 },
  translations: { left: 300, right: 2200, top: 40, bottom: 1760 },
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

function phraseText(ayah, block) {
  return phraseTokens(ayah, block).map(token => token.ar).join(' ')
}

function analysisWordPosition(index) {
  let remaining = index
  for (let row = 0; row < ANALYSIS_ROW_COUNTS.length; row += 1) {
    const count = ANALYSIS_ROW_COUNTS[row]
    if (remaining <= count) {
      const i = remaining - 1
      return {
        x: WORLD.width / 2 + ((count - 1) / 2 - i) * ANALYSIS_WORD_GAP,
        y: ANALYSIS_ROW_Y[row],
      }
    }
    remaining -= count
  }
  return { x: WORLD.width / 2, y: ANALYSIS_ROW_Y[ANALYSIS_ROW_Y.length - 1] }
}

function analysisPositions(ayah) {
  const map = new Map()
  ayah.tokens.forEach((_, i) => map.set(i + 1, analysisWordPosition(i + 1)))
  return map
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

function allWordPositions(ayah) {
  const map = new Map()
  ayah.blocks.forEach((block, blockIndex) => {
    layoutBlock(block, blockIndex).forEach(position => map.set(position.index, position))
  })
  return map
}

function FullAyahRibbon({ ayah, focusWordIndex, language }) {
  return <div className="diagram-ayah-ribbon">
    <small>{language === 'ru' ? 'Аят целиком' : 'Full ayah'}</small>
    <div lang="ar" dir="rtl">
      {ayah.tokens.map((token, i) => <span key={i} className={focusWordIndex === i + 1 ? 'is-entry' : ''}>{token.ar}</span>)}
    </div>
  </div>
}

function AnalysisDiagram({ ayah, focusWordIndex, language, selectedWord, onSelectWord }) {
  const selectedBlock = selectedWord
    ? ayah.blocks.find(block => selectedWord >= block.range[0] && selectedWord <= block.range[1])
    : null

  return <div className="diagram-view analysis-diagram">
    <div className="analysis-verse-reference">
      <span>{ayah.reference}</span>
      <small>{ayah.surah[language]}</small>
    </div>

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

    {!selectedWord && <div className="analysis-tap-hint">
      {language === 'ru' ? 'Нажмите на любое слово, чтобы раскрыть его' : 'Tap any word to unfold it'}
    </div>}
  </div>
}

function CalloutPager({ page, count, onChange, language }) {
  if (count <= 1) return null
  return <div className="analysis-callout-pager">
    <button onClick={() => onChange((page - 1 + count) % count)} aria-label={language === 'ru' ? 'Предыдущая страница' : 'Previous page'}>‹</button>
    <span>{page + 1} / {count}</span>
    <button onClick={() => onChange((page + 1) % count)} aria-label={language === 'ru' ? 'Следующая страница' : 'Next page'}>›</button>
  </div>
}

function WordFocusOverlay({ ayah, selectedWord, language, onClose, onOpenWordOrbit }) {
  const [pages, setPages] = useState({ morph: 0, syntax: 0, semantic: 0 })

  useEffect(() => {
    setPages({ morph: 0, syntax: 0, semantic: 0 })
  }, [selectedWord])

  if (!selectedWord) return null

  const ru = language === 'ru'
  const selected = ayah.tokens[selectedWord - 1]
  if (!selected) return null

  const selectedBlock = ayah.blocks.find(block => selectedWord >= block.range[0] && selectedWord <= block.range[1])
  const detail = selected.analysis?.[language]
  const morphology = detail?.morphology
  const syntax = detail?.syntax
  const meaning = detail?.meaning

  const morphPages = [
    <div key="parts">
      <strong>{ru ? 'Из чего состоит слово' : 'How the word is built'}</strong>
      {morphology?.parts?.length
        ? <div className="analysis-morph-parts">
            {morphology.parts.map((part, index) => <div key={index}>
              <b lang="ar" dir="rtl">{part.ar}</b>
              <em>{part.tr}</em>
              <p>{part.label}</p>
            </div>)}
          </div>
        : <p>{ru ? selected.roleRu : selected.roleEn}</p>}
    </div>,
    ...(morphology?.text ? [<div key="formation">
      <strong>{ru ? 'Как устроена форма' : 'How the form works'}</strong>
      <p className="analysis-detail-text">{morphology.text}</p>
    </div>] : []),
  ]

  const syntaxPages = [
    <div key="plain">
      <strong>{ru ? 'Что делает слово в предложении' : 'What the word does in the sentence'}</strong>
      {syntax?.plain && <p className="analysis-syntax-plain">{syntax.plain}</p>}
      <div className="analysis-syntax-phrase" lang="ar" dir="rtl">{selectedBlock ? phraseText(ayah, selectedBlock) : selected.ar}</div>
    </div>,
    <div key="role">
      <strong>{ru ? 'Роль и положение' : 'Role and position'}</strong>
      {syntax?.title && <p><b>{ru ? 'Роль:' : 'Role:'}</b> {syntax.title}</p>}
      {syntax?.case && <p><b>{ru ? 'Падеж / форма:' : 'Case / form:'}</b> {syntax.case}</p>}
    </div>,
    ...((syntax?.ending || syntax?.text) ? [<div key="ending">
      <strong>{ru ? 'Почему именно такая форма' : 'Why this form appears'}</strong>
      {syntax?.ending && <p><b>{ru ? 'Окончание / огласовка:' : 'Ending / vowel:'}</b> {syntax.ending}</p>}
      {syntax?.text && <p className="analysis-detail-text">{syntax.text}</p>}
    </div>] : []),
  ]

  const semanticPages = [
    <div key="meaning">
      <strong>{meaning?.gloss || (ru ? selected.ru : selected.en)}</strong>
      {meaning?.description
        ? <p className="analysis-detail-text">{meaning.description}</p>
        : <p className="analysis-detail-text">{ru ? selected.noteRu : selected.noteEn}</p>}
    </div>,
    ...(meaning?.translation ? [<div key="translation">
      <strong>{ru ? 'Почему такой перевод' : 'Why this translation'}</strong>
      <p className="analysis-translation-choice">{meaning.translation}</p>
    </div>] : []),
  ]

  function setPage(kind, value) {
    setPages(current => ({ ...current, [kind]: value }))
  }

  return <div className="analysis-focus-overlay" onClick={onClose}>
    <div className="analysis-focus-space" onClick={onClose}>
      <button className="analysis-focus-close" onClick={onClose} aria-label={ru ? 'Закрыть разбор' : 'Close analysis'}>×</button>

      <div className="analysis-focus-word">
        <span lang="ar" dir="rtl">{selected.ar}</span>
        <small>{selected.tr}</small>
      </div>

      <svg className="analysis-focus-rays" viewBox="0 0 1000 720" aria-hidden="true">
        <path className="morph" d="M 500 350 C 405 290, 320 225, 235 175" />
        <path className="syntax" d="M 500 350 C 595 290, 680 225, 765 175" />
        <path className="semantic" d="M 500 380 C 500 445, 500 500, 500 555" />
      </svg>

      <section className="analysis-focus-callout morph" onClick={(event) => event.stopPropagation()}>
        <small>{ru ? 'МОРФОЛОГИЯ' : 'MORPHOLOGY'}</small>
        <div className="analysis-callout-page">{morphPages[pages.morph]}</div>
        <CalloutPager page={pages.morph} count={morphPages.length} onChange={(value) => setPage('morph', value)} language={language} />
      </section>

      <section className="analysis-focus-callout syntax" onClick={(event) => event.stopPropagation()}>
        <small>{ru ? 'СИНТАКСИС' : 'SYNTAX'}</small>
        <div className="analysis-callout-page">{syntaxPages[pages.syntax]}</div>
        <CalloutPager page={pages.syntax} count={syntaxPages.length} onChange={(value) => setPage('syntax', value)} language={language} />
      </section>

      <section className="analysis-focus-callout semantic" onClick={(event) => event.stopPropagation()}>
        <small>{ru ? 'ЗНАЧЕНИЕ' : 'MEANING'}</small>
        <div className="analysis-callout-page">{semanticPages[pages.semantic]}</div>
        <CalloutPager page={pages.semantic} count={semanticPages.length} onChange={(value) => setPage('semantic', value)} language={language} />
        <button
          className="analysis-orbit-button"
          disabled={!selected.orbitId}
          onClick={() => selected.orbitId && onOpenWordOrbit?.(selected)}
        >
          {selected.orbitId
            ? (ru ? 'Перейти в орбиту слова →' : 'Open word orbit →')
            : (ru ? 'Орбита слова · будет подключена' : 'Word orbit · coming next')}
        </button>
      </section>
    </div>
  </div>
}

function SkeletonWords({ ayah, focusWordIndex }) {
  const positions = analysisPositions(ayah)
  return <>{ayah.tokens.map((token, i) => {
    const wordIndex = i + 1
    const pos = positions.get(wordIndex)
    if (!pos) return null
    return <div key={wordIndex} className={'skeleton-word' + (wordIndex === focusWordIndex ? ' is-entry' : '')} style={{ left: pos.x, top: pos.y }}>
      <i />
      <span lang="ar" dir="rtl">{token.ar}</span>
    </div>
  })}</>
}

function CompositionDiagram({ ayah, focusWordIndex, language }) {
  const ru = language === 'ru'
  return <div className="diagram-view composition-diagram">
    <FullAyahRibbon ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
    <svg className="diagram-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {ayah.blocks.map((block, blockIndex) => {
        const points = layoutBlock(block, blockIndex)
        const center = { x: WORLD.width / 2, y: points[0].y }
        return <g key={block.id}>
          <path className="composition-spine" d={`M ${center.x} ${center.y - 60} L ${center.x} ${center.y + 60}`} />
          {blockIndex < ayah.blocks.length - 1 && <path className="composition-spine" d={`M ${center.x} ${center.y + 60} L ${center.x} ${BLOCK_Y[blockIndex + 1] - 60}`} />}
        </g>
      })}
    </svg>
    {ayah.blocks.map((block, index) => <div key={block.id} className={'composition-constellation' + (focusWordIndex >= block.range[0] && focusWordIndex <= block.range[1] ? ' has-entry' : '')} style={{ left: WORLD.width / 2, top: BLOCK_Y[index] }}>
      <i />
      <small>{String(index + 1).padStart(2, '0')}</small>
      <h3>{block[language].title}</h3>
      <div lang="ar" dir="rtl">{phraseText(ayah, block)}</div>
      <p>{block[language].text}</p>
    </div>)}
    <div className="composition-summary" style={{ left: WORLD.width / 2, top: 1760 }}>
      <span>{ru ? 'Ход аята' : 'Flow of the ayah'}</span>
      <p>{ayah.flow[language]}</p>
    </div>
  </div>
}

function RhetoricDiagram({ ayah, focusWordIndex, language }) {
  const positions = allWordPositions(ayah)
  const ru = language === 'ru'
  const anchors = [
    [9, 11, { x: 650, y: 505 }],
    [22, 25, { x: 1750, y: 1110 }],
    [25, 27, { x: 1930, y: 1410 }],
  ]

  return <div className="diagram-view rhetoric-diagram">
    <FullAyahRibbon ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
    <SkeletonWords ayah={ayah} focusWordIndex={focusWordIndex} />
    <svg className="diagram-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {anchors.map(([from, to, label], index) => {
        const a = positions.get(from)
        const b = positions.get(to)
        if (!a || !b) return null
        const midX = (a.x + b.x) / 2
        const midY = Math.min(a.y, b.y) - 120
        return <path key={index} className="rhetoric-arc" d={`M ${a.x} ${a.y - 12} Q ${midX} ${midY} ${b.x} ${b.y - 12}`} />
      })}
    </svg>
    {ayah.rhetoric[language].map((item, index) => {
      const p = anchors[index]?.[2] || { x: 1250, y: 600 + index * 300 }
      return <div key={item.title} className="rhetoric-annotation" style={{ left: p.x, top: p.y }}>
        <i />
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    })}
    <div className="diagram-view-caption" style={{ left: WORLD.width / 2, top: 1700 }}>
      {ru ? 'Риторические связи накладываются на тот же текстовый каркас.' : 'Rhetorical links are layered over the same textual structure.'}
    </div>
  </div>
}

function SoundDiagram({ ayah, focusWordIndex, language }) {
  const ru = language === 'ru'
  return <div className="diagram-view sound-diagram">
    <FullAyahRibbon ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
    <SkeletonWords ayah={ayah} focusWordIndex={focusWordIndex} />
    <svg className="diagram-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {BLOCK_Y.map((y, i) => <path key={i} className="sound-wave-line" d={`M 300 ${y + 100} C 650 ${y + 30}, 950 ${y + 170}, 1250 ${y + 100} S 1850 ${y + 30}, 2200 ${y + 100}`} />)}
    </svg>
    <div className="sound-annotation" style={{ left: WORLD.width / 2, top: 1690 }}>
      <span>{ru ? 'Звучание' : 'Sound'}</span>
      <p>{ayah.sound[language]}</p>
    </div>
  </div>
}

function TranslationDiagram({ ayah, focusWordIndex, language }) {
  const ru = language === 'ru'
  return <div className="diagram-view translation-diagram">
    <FullAyahRibbon ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
    <SkeletonWords ayah={ayah} focusWordIndex={focusWordIndex} />
    <div className="translation-annotation" style={{ left: WORLD.width / 2, top: 1660 }}>
      <span>{ru ? 'Переводы' : 'Translations'}</span>
      <p>{ayah.translations[language]}</p>
    </div>
  </div>
}

function CanvasWorld({ ayah, mode, focusWordIndex, language, selectedWord, onSelectWord }) {
  if (mode === 'analysis') return <AnalysisDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={onSelectWord} />
  if (mode === 'composition') return <CompositionDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
  if (mode === 'rhetoric') return <RhetoricDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
  if (mode === 'sound') return <SoundDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
  return <TranslationDiagram ayah={ayah} focusWordIndex={focusWordIndex} language={language} />
}

export function AyahView({ reference, focusWordIndex, language, onBack, onOpenWordOrbit }) {
  const ayah = getAyahPrototype(reference)
  const [mode, setMode] = useState('analysis')
  const [contextOpen, setContextOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState(null)
  const [camera, setCamera] = useState(() => ({ x: 0, y: 0, scale: defaultScale() }))
  const pointers = useRef(new Map())
  const gesture = useRef(null)
  const viewportRef = useRef(null)
  const cameraRef = useRef(camera)

  useEffect(() => {
    cameraRef.current = camera
  }, [camera])

  useEffect(() => {
    setMode('analysis')
    setContextOpen(false)
    setSelectedWord(null)
    setCamera({ x: 0, y: 0, scale: defaultScale() })
    pointers.current.clear()
    gesture.current = null
  }, [reference, focusWordIndex])

  if (!ayah) {
    return <section className={'ayah-space-shell' + (selectedWord && mode === 'analysis' ? ' has-word-focus' : '')}><button className="ayah-back" onClick={onBack}><ArrowIcon /></button></section>
  }

  const ru = language === 'ru'
  const modes = [
    ['analysis', ru ? 'Разбор' : 'Analysis'],
    ['composition', ru ? 'Композиция' : 'Composition'],
    ['rhetoric', ru ? 'Риторика' : 'Rhetoric'],
    ['sound', ru ? 'Звучание' : 'Sound'],
    ['translations', ru ? 'Переводы' : 'Translations'],
  ]

  function clampCamera(next, targetMode = mode) {
    const current = cameraRef.current || { x: 0, y: 0, scale: defaultScale() }
    const scale = clamp(finiteNumber(next.scale, current.scale), .48, 1.08)
    const viewport = viewportRef.current?.getBoundingClientRect()
    const rawX = finiteNumber(next.x, current.x)
    const rawY = finiteNumber(next.y, current.y)

    if (!viewport || viewport.width < 1 || viewport.height < 1) {
      return { x: clamp(rawX, -120, 120), y: clamp(rawY, -150, 150), scale }
    }

    const bounds = VIEW_BOUNDS[targetMode] || VIEW_BOUNDS.analysis
    const cx = viewport.width / 2
    const cy = viewport.height / 2
    const worldCx = WORLD.width / 2
    const worldCy = WORLD.height / 2

    /* At overview zoom the diagram stays close to centre.
       Zooming in gradually unlocks more panning, like a map. */
    const zoomProgress = clamp((scale - .48) / .60, 0, 1)
    const softLimitX = Math.min(viewport.width * .46, 120 + zoomProgress * 380)
    const softLimitY = Math.min(viewport.height * .38, 120 + zoomProgress * 300)

    const contentMinX = -cx - (bounds.right - worldCx) * scale
    const contentMaxX = viewport.width - cx - (bounds.left - worldCx) * scale
    const contentMinY = -cy - (bounds.bottom - worldCy) * scale
    const contentMaxY = viewport.height - cy - (bounds.top - worldCy) * scale

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
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setSelectedWord(null)
    const scale = defaultScale()
    requestAnimationFrame(() => {
      const next = clampCamera({ x: 0, y: 0, scale }, nextMode)
      cameraRef.current = next
      setCamera(next)
    })
  }

  return <section className="ayah-space-shell">
    <div className="ayah-space-topbar">
      <button className="ayah-back" onClick={onBack}><ArrowIcon /><span>{ru ? 'К слову' : 'Back'}</span></button>
      <div className="ayah-space-reference"><strong>{ayah.reference}</strong><small>{ayah.surah[language]}</small></div>
      <button className={'ayah-context-trigger' + (contextOpen ? ' is-open' : '')} onClick={() => setContextOpen(v => !v)}><InfoIcon /><span>{ru ? 'Контекст' : 'Context'}</span></button>
    </div>

    <nav className="ayah-space-modes">
      {modes.map(([id, label]) => <button key={id} aria-pressed={mode === id} onClick={() => changeMode(id)}>{label}</button>)}
    </nav>

    {contextOpen && <aside className="ayah-space-context">
      <header><span>{ru ? 'Контекст' : 'Context'}</span><button onClick={() => setContextOpen(false)}>×</button></header>
      <p>{ayah.context[language]}</p>
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
        <CanvasWorld ayah={ayah} mode={mode} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={selectWord} />
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
      <button onClick={() => zoomBy(.08)}>+</button>
      <span>{Math.round(camera.scale * 100)}%</span>
      <button onClick={() => zoomBy(-.08)}>−</button>
      <button onClick={resetCamera}><ResetIcon /></button>
    </div>

    <div className="ayah-space-hint">{ru ? 'Перемещайте схему · края удерживают вас внутри разбора · двойное нажатие возвращает центр' : 'Move the diagram · bounded edges keep the analysis in view · double tap resets'}</div>

    <a className="ayah-space-source" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      Al Quran · Greentech <ExternalIcon />
    </a>
  </section>
}
