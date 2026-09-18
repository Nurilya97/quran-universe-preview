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
const PAN_LIMIT = { x: 360, y: 310 }

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function defaultScale() {
  if (typeof window !== 'undefined' && window.innerWidth <= 760) return .52
  return .72
}

function phraseTokens(ayah, block) {
  return ayah.tokens.slice(block.range[0] - 1, block.range[1])
}

function phraseText(ayah, block) {
  return phraseTokens(ayah, block).map(token => token.ar).join(' ')
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
  const ru = language === 'ru'
  const positions = useMemo(() => allWordPositions(ayah), [ayah])
  const selected = selectedWord ? ayah.tokens[selectedWord - 1] : null
  const selectedPos = selectedWord ? positions.get(selectedWord) : null

  return <div className="diagram-view analysis-diagram">
    <FullAyahRibbon ayah={ayah} focusWordIndex={focusWordIndex} language={language} />

    <svg className="diagram-lines" width={WORLD.width} height={WORLD.height} viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} aria-hidden="true">
      {ayah.blocks.map((block, blockIndex) => {
        const points = layoutBlock(block, blockIndex)
        const left = Math.min(...points.map(p => p.x))
        const right = Math.max(...points.map(p => p.x))
        const lineY = points[0].y + 182
        return <g key={block.id}>
          <path className="diagram-construction-line" d={`M ${left} ${lineY} L ${right} ${lineY}`} />
          {points.map(point => <path key={point.index} className="diagram-word-thread" d={`M ${point.x} ${point.y + 28} L ${point.x} ${point.y + 102}`} />)}
          {blockIndex < ayah.blocks.length - 1 && <path
            className="diagram-flow-thread"
            d={`M ${WORLD.width / 2} ${lineY + 54} L ${WORLD.width / 2} ${BLOCK_Y[blockIndex + 1] - 54}`}
          />}
        </g>
      })}
    </svg>

    {ayah.blocks.map((block, blockIndex) => {
      const points = layoutBlock(block, blockIndex)
      return <div key={block.id} className="diagram-block-label" style={{ left: WORLD.width / 2, top: BLOCK_Y[blockIndex] + 205 }}>
        <span>{String(blockIndex + 1).padStart(2, '0')} · {block[language].title}</span>
        <p>{block[language].text}</p>
      </div>
    })}

    {ayah.tokens.map((token, i) => {
      const wordIndex = i + 1
      const pos = positions.get(wordIndex)
      if (!pos) return null
      const isEntry = wordIndex === focusWordIndex
      const isSelected = wordIndex === selectedWord
      return <div key={wordIndex} className="diagram-word-cluster" style={{ left: pos.x, top: pos.y }}>
        <button
          className={'diagram-word-star' + (isEntry ? ' is-entry' : '') + (isSelected ? ' is-selected' : '')}
          onClick={(event) => { event.stopPropagation(); onSelectWord(isSelected ? null : wordIndex) }}
          aria-pressed={isSelected}
        >
          <i aria-hidden="true" />
          <span lang="ar" dir="rtl">{token.ar}</span>
        </button>
        <div className="diagram-word-note">
          <b>{token.tr}</b>
          <strong>{ru ? token.ru : token.en}</strong>
          <small>{ru ? token.roleRu : token.roleEn}</small>
        </div>
      </div>
    })}

    {selected && selectedPos && <aside
      className="diagram-inspector"
      style={{
        left: clamp(selectedPos.x + (selectedPos.x < WORLD.width / 2 ? 120 : -500), 90, WORLD.width - 520),
        top: clamp(selectedPos.y - 25, 170, WORLD.height - 310),
      }}
      onPointerDown={event => event.stopPropagation()}
      onClick={event => event.stopPropagation()}
    >
      <header>
        <div><span lang="ar" dir="rtl">{selected.ar}</span><small>{selected.tr}</small></div>
        <button onClick={() => onSelectWord(null)}>×</button>
      </header>
      <strong>{ru ? selected.ru : selected.en}</strong>
      <p>{ru ? selected.roleRu : selected.roleEn}</p>
      {selected.root && <div className="diagram-root-row"><small>{ru ? 'Корень' : 'Root'}</small><b lang="ar" dir="rtl">{selected.root}</b><i>{selected.rootReading}</i></div>}
      {(ru ? selected.noteRu : selected.noteEn) && <p>{ru ? selected.noteRu : selected.noteEn}</p>}
    </aside>}
  </div>
}

function SkeletonWords({ ayah, focusWordIndex }) {
  const positions = allWordPositions(ayah)
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

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [mode, setMode] = useState('analysis')
  const [contextOpen, setContextOpen] = useState(false)
  const [selectedWord, setSelectedWord] = useState(null)
  const [camera, setCamera] = useState(() => ({ x: 0, y: 0, scale: defaultScale() }))
  const pointers = useRef(new Map())
  const gesture = useRef(null)

  useEffect(() => {
    setMode('analysis')
    setContextOpen(false)
    setSelectedWord(null)
    setCamera({ x: 0, y: 0, scale: defaultScale() })
    pointers.current.clear()
    gesture.current = null
  }, [reference, focusWordIndex])

  if (!ayah) {
    return <section className="ayah-space-shell"><button className="ayah-back" onClick={onBack}><ArrowIcon /></button></section>
  }

  const ru = language === 'ru'
  const modes = [
    ['analysis', ru ? 'Разбор' : 'Analysis'],
    ['composition', ru ? 'Композиция' : 'Composition'],
    ['rhetoric', ru ? 'Риторика' : 'Rhetoric'],
    ['sound', ru ? 'Звучание' : 'Sound'],
    ['translations', ru ? 'Переводы' : 'Translations'],
  ]

  function clampCamera(next) {
    return {
      x: clamp(next.x, -PAN_LIMIT.x, PAN_LIMIT.x),
      y: clamp(next.y, -PAN_LIMIT.y, PAN_LIMIT.y),
      scale: clamp(next.scale, .48, 1.08),
    }
  }

  function resetCamera() {
    setCamera({ x: 0, y: 0, scale: defaultScale() })
  }

  function zoomBy(delta) {
    setCamera(current => clampCamera({ ...current, scale: current.scale + delta }))
  }

  function onWheel(event) {
    event.preventDefault()
    zoomBy(event.deltaY > 0 ? -.07 : .07)
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 1) {
      gesture.current = { type: 'pan', x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y }
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      gesture.current = { type: 'pinch', distance: Math.hypot(a.x - b.x, a.y - b.y), scale: camera.scale }
    }
  }

  function onPointerMove(event) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      if (gesture.current?.type !== 'pinch') gesture.current = { type: 'pinch', distance, scale: camera.scale }
      const nextScale = gesture.current.scale * (distance / (gesture.current.distance || distance))
      setCamera(current => clampCamera({ ...current, scale: nextScale }))
      return
    }

    if (gesture.current?.type === 'pan') {
      setCamera(current => clampCamera({
        ...current,
        x: gesture.current.cameraX + event.clientX - gesture.current.x,
        y: gesture.current.cameraY + event.clientY - gesture.current.y,
      }))
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
    setCamera({ x: 0, y: 0, scale: defaultScale() })
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
      className="ayah-space-viewport"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={() => selectedWord && setSelectedWord(null)}
    >
      <div className="ayah-space-grid" aria-hidden="true" />
      <div className="ayah-space-boundary" aria-hidden="true" />
      <div className="ayah-space-world" style={{ transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
        <CanvasWorld ayah={ayah} mode={mode} focusWordIndex={focusWordIndex} language={language} selectedWord={selectedWord} onSelectWord={setSelectedWord} />
      </div>
    </div>

    <div className="ayah-space-zoom">
      <button onClick={() => zoomBy(.08)}>+</button>
      <span>{Math.round(camera.scale * 100)}%</span>
      <button onClick={() => zoomBy(-.08)}>−</button>
      <button onClick={resetCamera}><ResetIcon /></button>
    </div>

    <div className="ayah-space-hint">{ru ? 'Перемещайте схему · масштаб ограничен рабочей областью' : 'Move the diagram · zoom stays inside the workspace'}</div>

    <a className="ayah-space-source" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      Al Quran · Greentech <ExternalIcon />
    </a>
  </section>
}
