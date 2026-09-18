import { useEffect, useRef, useState } from 'react'
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

const WORLD = { width: 2400, height: 1700 }
const ANALYSIS_COLS = 10
const ANALYSIS_START = { x: 2110, y: 470 }
const ANALYSIS_GAP = { x: 205, y: 360 }

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function wordPosition(index) {
  const zero = index - 1
  const row = Math.floor(zero / ANALYSIS_COLS)
  const col = zero % ANALYSIS_COLS
  return {
    x: ANALYSIS_START.x - col * ANALYSIS_GAP.x,
    y: ANALYSIS_START.y + row * ANALYSIS_GAP.y,
  }
}

function phraseText(ayah, block) {
  const [start, end] = block.range
  return ayah.tokens.slice(start - 1, end).map(token => token.ar).join(' ')
}

function WorldAyah({ ayah, focusWordIndex, className = '' }) {
  return <div className={'space-ayah-line ' + className} lang="ar" dir="rtl">
    {ayah.tokens.map((token, index) => {
      const wordIndex = index + 1
      return <span key={wordIndex} className={focusWordIndex === wordIndex ? 'is-entry-focus' : ''}>{token.ar}</span>
    })}
  </div>
}

function AnalysisView({ ayah, focusWordIndex, language, selectedWord, onSelectWord }) {
  const ru = language === 'ru'
  const selected = selectedWord ? ayah.tokens[selectedWord - 1] : null
  const selectedPos = selectedWord ? wordPosition(selectedWord) : null

  const sequentialPaths = ayah.tokens.slice(0, -1).map((_, i) => {
    const a = wordPosition(i + 1)
    const b = wordPosition(i + 2)
    const sameRow = Math.abs(a.y - b.y) < 5
    const d = sameRow
      ? `M ${a.x - 72} ${a.y + 62} L ${b.x + 72} ${b.y + 62}`
      : `M ${a.x - 78} ${a.y + 62} C ${a.x - 150} ${a.y + 160}, ${b.x + 160} ${b.y - 120}, ${b.x + 76} ${b.y + 58}`
    return <path key={i} d={d} />
  })

  return <div className="space-view space-analysis-view">
    <div className="space-view-title" style={{ left: 1200, top: 82 }}>
      <small>{ru ? 'РАЗБОР АЯТА' : 'AYAH ANALYSIS'}</small>
      <strong>{ru ? 'Слова → связи → конструкции' : 'Words → relations → constructions'}</strong>
    </div>

    <WorldAyah ayah={ayah} focusWordIndex={focusWordIndex} className="analysis-ayah" />

    <svg className="analysis-sequence-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {sequentialPaths}
    </svg>

    {ayah.tokens.map((token, index) => {
      const wordIndex = index + 1
      const pos = wordPosition(wordIndex)
      const isEntry = wordIndex === focusWordIndex
      const isSelected = wordIndex === selectedWord
      return <button
        key={wordIndex}
        className={'space-word-node' + (isEntry ? ' is-entry' : '') + (isSelected ? ' is-selected' : '')}
        style={{ left: pos.x, top: pos.y }}
        onClick={(event) => { event.stopPropagation(); onSelectWord(isSelected ? null : wordIndex) }}
        aria-pressed={isSelected}
      >
        <span className="space-word-number">{String(wordIndex).padStart(2, '0')}</span>
        <span className="space-word-ar" lang="ar" dir="rtl">{token.ar}</span>
        <span className="space-word-tr">{token.tr}</span>
        <strong>{ru ? token.ru : token.en}</strong>
        <small>{ru ? token.roleRu : token.roleEn}</small>
      </button>
    })}

    {ayah.blocks.map((block, index) => {
      const start = wordPosition(block.range[0])
      const end = wordPosition(block.range[1])
      const sameRow = Math.abs(start.y - end.y) < 5
      if (!sameRow) return null
      const left = Math.min(start.x, end.x) - 78
      const width = Math.abs(start.x - end.x) + 156
      const top = start.y + 164
      return <div key={block.id} className="space-construction-span" style={{ left, top, width }}>
        <i aria-hidden="true" />
        <span>{block[language].title}</span>
        <p>{block[language].text}</p>
      </div>
    })}

    {selected && selectedPos && <div
      className="space-word-inspector"
      style={{
        left: clamp(selectedPos.x < 1200 ? selectedPos.x + 120 : selectedPos.x - 520, 160, WORLD.width - 600),
        top: clamp(selectedPos.y + 110, 180, WORLD.height - 390),
      }}
      onPointerDown={event => event.stopPropagation()}
    >
      <div className="space-inspector-thread" aria-hidden="true" />
      <header>
        <div>
          <span lang="ar" dir="rtl">{selected.ar}</span>
          <small>{selected.tr}</small>
        </div>
        <button onClick={() => onSelectWord(null)} aria-label={ru ? 'Закрыть' : 'Close'}>×</button>
      </header>
      <strong>{ru ? selected.ru : selected.en}</strong>
      <p className="space-inspector-role">{ru ? selected.roleRu : selected.roleEn}</p>
      {selected.root && <p className="space-inspector-root"><small>{ru ? 'Корень' : 'Root'}</small><b lang="ar" dir="rtl">{selected.root}</b><i>{selected.rootReading}</i></p>}
      {(ru ? selected.noteRu : selected.noteEn) && <p>{ru ? selected.noteRu : selected.noteEn}</p>}
    </div>}
  </div>
}

const COMPOSITION_POSITIONS = [
  { x: 360, y: 820 },
  { x: 760, y: 470 },
  { x: 1190, y: 820 },
  { x: 1630, y: 470 },
  { x: 2050, y: 820 },
]

function CompositionView({ ayah, language, focusWordIndex }) {
  const ru = language === 'ru'
  return <div className="space-view space-composition-view">
    <div className="space-view-title" style={{ left: 1200, top: 100 }}>
      <small>{ru ? 'КОМПОЗИЦИЯ' : 'COMPOSITION'}</small>
      <strong>{ru ? 'Как крупные части выстраивают движение аята' : 'How the larger units shape the movement of the ayah'}</strong>
    </div>
    <svg className="composition-map-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      <polyline points={COMPOSITION_POSITIONS.map(p => `${p.x},${p.y}`).join(' ')} />
    </svg>
    {ayah.blocks.map((block, index) => {
      const pos = COMPOSITION_POSITIONS[index]
      const hasEntry = focusWordIndex >= block.range[0] && focusWordIndex <= block.range[1]
      return <div key={block.id} className={'composition-node' + (hasEntry ? ' has-entry' : '')} style={{ left: pos.x, top: pos.y }}>
        <i aria-hidden="true" />
        <small>{String(index + 1).padStart(2, '0')}</small>
        <h3>{block[language].title}</h3>
        <div lang="ar" dir="rtl">{phraseText(ayah, block)}</div>
        <p>{block[language].text}</p>
      </div>
    })}
    <div className="composition-flow-note" style={{ left: 1200, top: 1280 }}>
      <span>{ru ? 'Ход аята' : 'Flow'}</span>
      <p>{ayah.flow[language]}</p>
    </div>
  </div>
}

function RhetoricView({ ayah, language, focusWordIndex }) {
  const ru = language === 'ru'
  return <div className="space-view space-rhetoric-view">
    <div className="space-view-title" style={{ left: 1200, top: 90 }}>
      <small>{ru ? 'РИТОРИКА' : 'RHETORIC'}</small>
      <strong>{ru ? 'Приёмы накладываются прямо на текст' : 'Rhetorical devices are mapped directly onto the text'}</strong>
    </div>

    <WorldAyah ayah={ayah} focusWordIndex={focusWordIndex} className="rhetoric-ayah" />

    <svg className="rhetoric-links" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      <path d="M 640 700 C 760 430, 1010 430, 1130 700" />
      <path d="M 1320 700 C 1435 410, 1700 410, 1840 700" />
      <path d="M 1550 715 C 1750 1030, 2000 1010, 2100 760" />
    </svg>

    {ayah.rhetoric[language].map((item, index) => {
      const positions = [
        { x: 880, y: 420 },
        { x: 1580, y: 395 },
        { x: 1980, y: 1030 },
      ]
      const pos = positions[index]
      return <div key={item.title} className="rhetoric-note" style={{ left: pos.x, top: pos.y }}>
        <i aria-hidden="true" />
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    })}
  </div>
}

function SoundView({ ayah, language, focusWordIndex }) {
  const ru = language === 'ru'
  return <div className="space-view space-sound-view">
    <div className="space-view-title" style={{ left: 1200, top: 100 }}>
      <small>{ru ? 'ЗВУЧАНИЕ' : 'SOUND'}</small>
      <strong>{ru ? 'Факты чтения и возможный эффект — раздельно' : 'Recitation facts and possible effects stay separate'}</strong>
    </div>
    <WorldAyah ayah={ayah} focusWordIndex={focusWordIndex} className="sound-ayah" />
    <svg className="sound-wave" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      <path d="M 320 920 C 430 790, 520 1050, 640 920 S 850 790, 980 920 S 1190 1050, 1320 920 S 1530 790, 1660 920 S 1880 1050, 2080 920" />
      <path d="M 390 990 C 520 910, 610 1070, 740 990 S 980 910, 1110 990 S 1360 1070, 1490 990 S 1760 910, 1990 990" />
    </svg>
    <div className="sound-note" style={{ left: 1200, top: 1160 }}>
      <p>{ayah.sound[language]}</p>
    </div>
  </div>
}

function TranslationView({ ayah, language, focusWordIndex }) {
  const ru = language === 'ru'
  return <div className="space-view space-translation-view">
    <div className="space-view-title" style={{ left: 1200, top: 105 }}>
      <small>{ru ? 'ПЕРЕВОДЫ' : 'TRANSLATIONS'}</small>
      <strong>{ru ? 'После исследования арабского текста' : 'After exploring the Arabic text'}</strong>
    </div>
    <WorldAyah ayah={ayah} focusWordIndex={focusWordIndex} className="translation-ayah" />
    <div className="translation-lens-line" aria-hidden="true" />
    <div className="translation-space-note" style={{ left: 1200, top: 1040 }}>
      <span>{ru ? 'Дополнительный слой' : 'Optional layer'}</span>
      <p>{ayah.translations[language]}</p>
    </div>
  </div>
}

function CanvasWorld({ ayah, mode, focusWordIndex, language, selectedWord, onSelectWord }) {
  if (mode === 'analysis') return <AnalysisView ayah={ayah} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={onSelectWord} />
  if (mode === 'composition') return <CompositionView ayah={ayah} language={language} focusWordIndex={focusWordIndex} />
  if (mode === 'rhetoric') return <RhetoricView ayah={ayah} language={language} focusWordIndex={focusWordIndex} />
  if (mode === 'sound') return <SoundView ayah={ayah} language={language} focusWordIndex={focusWordIndex} />
  return <TranslationView ayah={ayah} language={language} focusWordIndex={focusWordIndex} />
}

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [mode, setMode] = useState('analysis')
  const [contextOpen, setContextOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState(null)
  const [camera, setCamera] = useState({ x: 0, y: 0, scale: .72 })
  const pointers = useRef(new Map())
  const gesture = useRef(null)

  useEffect(() => {
    setMode('analysis')
    setContextOpen(false)
    setSelectedWord(null)
    setCamera({ x: 0, y: 0, scale: .72 })
    pointers.current.clear()
    gesture.current = null
  }, [reference, focusWordIndex])

  if (!ayah) {
    return <section className="ayah-space-shell">
      <button className="ayah-back" onClick={onBack}><ArrowIcon />{language === 'ru' ? 'К слову' : 'Back to word'}</button>
      <div className="ayah-space-empty">
        <span>{reference}</span>
        <h1>{language === 'ru' ? 'Пространство аята' : 'Ayah space'}</h1>
      </div>
    </section>
  }

  const ru = language === 'ru'
  const modes = [
    ['analysis', ru ? 'Разбор' : 'Analysis'],
    ['composition', ru ? 'Композиция' : 'Composition'],
    ['rhetoric', ru ? 'Риторика' : 'Rhetoric'],
    ['sound', ru ? 'Звучание' : 'Sound'],
    ['translations', ru ? 'Переводы' : 'Translations'],
  ]

  function resetCamera() {
    setCamera({ x: 0, y: 0, scale: .72 })
  }

  function zoomBy(delta) {
    setCamera(current => ({ ...current, scale: clamp(current.scale + delta, .38, 1.5) }))
  }

  function onWheel(event) {
    event.preventDefault()
    const direction = event.deltaY > 0 ? -.08 : .08
    zoomBy(direction)
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 1) {
      gesture.current = { type: 'pan', x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y }
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      gesture.current = {
        type: 'pinch',
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        scale: camera.scale,
      }
    }
  }

  function onPointerMove(event) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      if (gesture.current?.type !== 'pinch') {
        gesture.current = { type: 'pinch', distance, scale: camera.scale }
      }
      const base = gesture.current.distance || distance
      const nextScale = clamp(gesture.current.scale * (distance / base), .38, 1.5)
      setCamera(current => ({ ...current, scale: nextScale }))
      return
    }

    if (gesture.current?.type === 'pan') {
      const dx = event.clientX - gesture.current.x
      const dy = event.clientY - gesture.current.y
      setCamera(current => ({ ...current, x: gesture.current.cameraX + dx, y: gesture.current.cameraY + dy }))
    }
  }

  function onPointerUp(event) {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size === 1) {
      const remaining = [...pointers.current.values()][0]
      gesture.current = { type: 'pan', x: remaining.x, y: remaining.y, cameraX: camera.x, cameraY: camera.y }
    } else {
      gesture.current = null
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setSelectedWord(null)
    setCamera({ x: 0, y: 0, scale: nextMode === 'analysis' ? .72 : .76 })
  }

  return <section className="ayah-space-shell">
    <div className="ayah-space-topbar">
      <button className="ayah-back" onClick={onBack}><ArrowIcon /><span>{ru ? 'К слову' : 'Back to word'}</span></button>
      <div className="ayah-space-reference"><strong>{ayah.reference}</strong><small>{ayah.surah[language]}</small></div>
      <button className={'ayah-context-trigger' + (contextOpen ? ' is-open' : '')} onClick={() => setContextOpen(value => !value)} aria-expanded={contextOpen}>
        <InfoIcon /><span>{ru ? 'Контекст' : 'Context'}</span>
      </button>
    </div>

    <nav className="ayah-space-modes" aria-label={ru ? 'Виды пространства аята' : 'Ayah space views'}>
      {modes.map(([id, label]) => <button key={id} aria-pressed={mode === id} onClick={() => changeMode(id)}>{label}</button>)}
    </nav>

    {contextOpen && <aside className="ayah-space-context">
      <header><span>{ru ? 'Контекст' : 'Context'}</span><button onClick={() => setContextOpen(false)}>×</button></header>
      <p>{ayah.context[language]}</p>
    </aside>}

    <div
      className="ayah-space-viewport"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={() => selectedWord && setSelectedWord(null)}
    >
      <div className="ayah-space-grid" aria-hidden="true" />
      <div
        className="ayah-space-world"
        style={{ transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}
      >
        <CanvasWorld ayah={ayah} mode={mode} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={setSelectedWord} />
      </div>
    </div>

    <div className="ayah-space-zoom">
      <button onClick={() => zoomBy(.1)} aria-label={ru ? 'Приблизить' : 'Zoom in'}>+</button>
      <span>{Math.round(camera.scale * 100)}%</span>
      <button onClick={() => zoomBy(-.1)} aria-label={ru ? 'Отдалить' : 'Zoom out'}>−</button>
      <button onClick={resetCamera} aria-label={ru ? 'Вернуть центр' : 'Reset view'}><ResetIcon /></button>
    </div>

    <div className="ayah-space-hint">{ru ? 'Перетаскивайте пространство · масштабируйте' : 'Drag the space · zoom in and out'}</div>

    <a className="ayah-space-source" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      Al Quran · Greentech <ExternalIcon />
    </a>
  </section>
}
