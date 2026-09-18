import { useEffect, useMemo, useState } from 'react'
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

const POSITIONS = [
  { x: 10, y: 63 },
  { x: 29, y: 33 },
  { x: 49, y: 58 },
  { x: 69, y: 29 },
  { x: 89, y: 56 },
]

function blockPhrase(ayah, block) {
  const [start, end] = block.range
  return ayah.tokens.slice(start - 1, end)
}

function findInitialBlock(ayah, focusWordIndex) {
  const index = ayah.blocks.findIndex(block => focusWordIndex >= block.range[0] && focusWordIndex <= block.range[1])
  return index >= 0 ? index : 0
}

function ConstellationMap({ ayah, language, focusWordIndex, activeIndex, onSelect, contextOpen, onToggleContext, rhetoricOpen, onToggleRhetoric }) {
  const ru = language === 'ru'
  const rhetoric = ayah.rhetoric[language]
  const path = POSITIONS.map(point => point.x + ',' + point.y).join(' ')

  return <section className="ayah-constellation" aria-label={ru ? 'Карта аята' : 'Ayah map'}>
    <div className="ayah-context-orbit" aria-hidden="true" />
    <button className={'ayah-context-star ayah-context-prev' + (contextOpen ? ' is-active' : '')} onClick={onToggleContext}>
      <i /><span>2:196</span>
    </button>
    <button className={'ayah-context-star ayah-context-next' + (contextOpen ? ' is-active' : '')} onClick={onToggleContext}>
      <i /><span>2:198</span>
    </button>
    <button className={'ayah-context-passage' + (contextOpen ? ' is-active' : '')} onClick={onToggleContext}>
      <small>{ru ? 'Контекст' : 'Context'}</small>
      <span>{ru ? 'Хадж · 2:196–203' : 'Hajj · 2:196–203'}</span>
    </button>

    <svg className="ayah-constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline className="ayah-composition-path" points={path} />
      <path className={'ayah-rhetoric-arc' + (rhetoricOpen ? ' is-visible' : '')} d="M69 29 Q80 5 89 56" />
      <circle className={'ayah-rhetoric-halo' + (rhetoricOpen ? ' is-visible' : '')} cx="29" cy="33" r="7" />
      <circle className={'ayah-rhetoric-halo' + (rhetoricOpen ? ' is-visible' : '')} cx="69" cy="29" r="7" />
    </svg>

    {ayah.blocks.map((block, index) => {
      const point = POSITIONS[index] || POSITIONS[POSITIONS.length - 1]
      const tokens = blockPhrase(ayah, block)
      const hasFocus = focusWordIndex >= block.range[0] && focusWordIndex <= block.range[1]
      return <button
        key={block.id}
        className={'ayah-constellation-node' + (activeIndex === index ? ' is-active' : '') + (hasFocus ? ' has-entry' : '')}
        style={{ '--cx': point.x + '%', '--cy': point.y + '%' }}
        onClick={() => onSelect(index)}
        aria-pressed={activeIndex === index}
      >
        <i className="ayah-star-core" aria-hidden="true" />
        <span className="ayah-node-index">{String(index + 1).padStart(2, '0')}</span>
        <strong>{block[language].title}</strong>
        <small lang="ar" dir="rtl">{tokens.slice(0, 4).map(token => token.ar).join(' ')}</small>
      </button>
    })}

    <button className={'ayah-rhetoric-toggle' + (rhetoricOpen ? ' is-active' : '')} onClick={onToggleRhetoric}>
      <i aria-hidden="true" />
      {ru ? 'Риторические связи' : 'Rhetorical links'}
    </button>

    {rhetoricOpen && <div className="ayah-rhetoric-labels">
      <button style={{ '--rx': '29%', '--ry': '17%' }} onClick={() => onSelect(1)}>
        <span>{rhetoric[0].title}</span>
      </button>
      <button style={{ '--rx': '69%', '--ry': '14%' }} onClick={() => onSelect(3)}>
        <span>{rhetoric[1].title}</span>
      </button>
      <button style={{ '--rx': '81%', '--ry': '30%' }} onClick={() => onSelect(4)}>
        <span>{rhetoric[2].title}</span>
      </button>
    </div>}

    <div className="ayah-map-legend">
      <span><i className="composition" />{ru ? 'ход аята' : 'ayah flow'}</span>
      <span><i className="rhetoric" />{ru ? 'риторическая связь' : 'rhetorical link'}</span>
    </div>
  </section>
}

function Phrase({ tokens, start, focusWordIndex }) {
  return <div className="ayah-focus-phrase" lang="ar" dir="rtl">
    {tokens.map((token, i) => {
      const wordIndex = start + i
      return <span key={wordIndex} className={focusWordIndex === wordIndex ? 'is-entry-focus' : ''}>{token.ar}</span>
    })}
  </div>
}

function MeaningPanel({ block, language }) {
  const ru = language === 'ru'
  return <div className="ayah-block-meaning">
    <span className="ayah-vertical-thread" aria-hidden="true" />
    <small>{ru ? 'Смысл конструкции' : 'Meaning of the construction'}</small>
    <p>{block[language].text}</p>
  </div>
}

function WordsPanel({ tokens, start, language }) {
  const ru = language === 'ru'
  return <div className="ayah-word-rays">
    {tokens.map((token, i) => <article key={start + i} className="ayah-word-ray">
      <span className="ayah-word-ray-line" aria-hidden="true" />
      <strong lang="ar" dir="rtl">{token.ar}</strong>
      <b>{ru ? token.ru : token.en}</b>
      <small>{ru ? token.roleRu : token.roleEn}</small>
      {token.root && <p><span>{ru ? 'корень' : 'root'}</span><em lang="ar" dir="rtl">{token.root}</em><i>{token.rootReading}</i></p>}
    </article>)}
  </div>
}

function ConnectionsPanel({ tokens, start, language, block }) {
  const ru = language === 'ru'
  return <div className="ayah-connections">
    <div className="ayah-connection-phrase" lang="ar" dir="rtl">
      {tokens.map((token, i) => <span key={start + i}>
        <b>{token.ar}</b>
        <i aria-hidden="true" />
        <small>{ru ? token.roleRu : token.roleEn}</small>
      </span>)}
    </div>
    <div className="ayah-connection-note">
      <span className="ayah-vertical-thread" aria-hidden="true" />
      <small>{ru ? 'Как конструкция работает вместе' : 'How the construction works together'}</small>
      <p>{block[language].text}</p>
    </div>
  </div>
}

function ActiveBlock({ ayah, blockIndex, focusWordIndex, language, lens, onLens }) {
  const ru = language === 'ru'
  const block = ayah.blocks[blockIndex]
  const start = block.range[0]
  const tokens = blockPhrase(ayah, block)
  const lenses = [
    ['meaning', ru ? 'Смысл' : 'Meaning'],
    ['words', ru ? 'Слова' : 'Words'],
    ['connections', ru ? 'Связи' : 'Connections'],
  ]

  return <section className="ayah-focus-block">
    <header className="ayah-focus-block-head">
      <div>
        <span>{String(blockIndex + 1).padStart(2, '0')}</span>
        <small>{ru ? 'Фрагмент аята' : 'Ayah fragment'}</small>
      </div>
      <h2>{block[language].title}</h2>
    </header>

    <Phrase tokens={tokens} start={start} focusWordIndex={focusWordIndex} />

    <nav className="ayah-local-lenses" aria-label={ru ? 'Разбор этого фрагмента' : 'Analysis of this fragment'}>
      {lenses.map(([id, label]) => <button key={id} aria-pressed={lens === id} onClick={() => onLens(id)}>{label}</button>)}
    </nav>

    <div className="ayah-local-layer">
      {lens === 'meaning' && <MeaningPanel block={block} language={language} />}
      {lens === 'words' && <WordsPanel tokens={tokens} start={start} language={language} />}
      {lens === 'connections' && <ConnectionsPanel tokens={tokens} start={start} language={language} block={block} />}
    </div>
  </section>
}

function RhetoricDetail({ ayah, language }) {
  const ru = language === 'ru'
  return <section className="ayah-rhetoric-detail">
    <p className="ayah-kicker">{ru ? 'Поперечные связи созвездия' : 'Cross-links in the constellation'}</p>
    <div>
      {ayah.rhetoric[language].map(item => <article key={item.title}>
        <i aria-hidden="true" />
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>)}
    </div>
  </section>
}

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lensByBlock, setLensByBlock] = useState({})
  const [contextOpen, setContextOpen] = useState(false)
  const [rhetoricOpen, setRhetoricOpen] = useState(false)

  useEffect(() => {
    if (!ayah) return
    setActiveIndex(findInitialBlock(ayah, focusWordIndex || 1))
    setLensByBlock({})
    setContextOpen(false)
    setRhetoricOpen(false)
  }, [ayah, reference, focusWordIndex])

  const activeLens = useMemo(() => {
    if (!ayah) return 'meaning'
    return lensByBlock[ayah.blocks[activeIndex]?.id] || 'meaning'
  }, [ayah, activeIndex, lensByBlock])

  if (!ayah) {
    return <section className="ayah-stage ayah-stage-empty">
      <button className="ayah-back" onClick={onBack}><ArrowIcon />{language === 'ru' ? 'К слову' : 'Back to word'}</button>
      <div className="ayah-empty-card">
        <p className="ayah-kicker">{reference}</p>
        <h1>{language === 'ru' ? 'Пространство аята' : 'Ayah workspace'}</h1>
        <p>{language === 'ru' ? 'Для прототипа подробный разбор подключён к 2:197. Остальные аяты будут наполняться после проверки их данных.' : 'For this prototype, detailed analysis is connected to 2:197. Other verses will be populated after their data is verified.'}</p>
      </div>
    </section>
  }

  const ru = language === 'ru'
  const activeBlock = ayah.blocks[activeIndex]

  function setLocalLens(nextLens) {
    setLensByBlock(current => ({ ...current, [activeBlock.id]: nextLens }))
  }

  return <section className="ayah-stage">
    <div className="ayah-topbar">
      <button className="ayah-back" onClick={onBack}><ArrowIcon />{ru ? 'К слову' : 'Back to word'}</button>
      <div className="ayah-reference">
        <span>{ayah.reference}</span>
        <small>{ayah.surah[language]}</small>
      </div>
      <button className={'ayah-context-trigger' + (contextOpen ? ' is-open' : '')}
        aria-expanded={contextOpen} onClick={() => setContextOpen(v => !v)}>
        <InfoIcon /><span>{ru ? 'Контекст' : 'Context'}</span>
      </button>
    </div>

    <div className="ayah-hero ayah-hero-constellation">
      <p className="ayah-kicker">{ru ? 'Аят целиком' : 'Full ayah'}</p>
      <div className="ayah-arabic" lang="ar" dir="rtl">
        {ayah.tokens.map((token, index) => {
          const wordIndex = index + 1
          return <span key={wordIndex} className={'ayah-token-static' + (focusWordIndex === wordIndex ? ' is-entry-focus' : '')}>{token.ar}</span>
        })}
      </div>
    </div>

    <div className="ayah-workbench">
      <ConstellationMap
        ayah={ayah}
        language={language}
        focusWordIndex={focusWordIndex}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        contextOpen={contextOpen}
        onToggleContext={() => setContextOpen(v => !v)}
        rhetoricOpen={rhetoricOpen}
        onToggleRhetoric={() => setRhetoricOpen(v => !v)}
      />

      {contextOpen && <aside className="ayah-context-space">
        <span className="ayah-vertical-thread" aria-hidden="true" />
        <p className="ayah-kicker">{ru ? 'Внешний контекст' : 'Outer context'}</p>
        <p>{ayah.context[language]}</p>
      </aside>}

      <ActiveBlock
        ayah={ayah}
        blockIndex={activeIndex}
        focusWordIndex={focusWordIndex}
        language={language}
        lens={activeLens}
        onLens={setLocalLens}
      />

      {rhetoricOpen && <RhetoricDetail ayah={ayah} language={language} />}
    </div>

    <a className="ayah-greentech-link" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      {ru ? 'Открыть в Al Quran · Greentech' : 'Open in Al Quran · Greentech'} <ExternalIcon />
    </a>
  </section>
}
