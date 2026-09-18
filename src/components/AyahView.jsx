import { useEffect, useState } from 'react'
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

function Phrase({ tokens, start, focusWordIndex }) {
  return <div className="ayah-diagram-phrase" lang="ar" dir="rtl">
    {tokens.map((token, i) => {
      const wordIndex = start + i
      return <span key={wordIndex} className={focusWordIndex === wordIndex ? 'is-entry-focus' : ''}>{token.ar}</span>
    })}
  </div>
}

function MeaningLayer({ block, language }) {
  return <div className="ayah-diagram-meaning">
    <span className="ayah-diagram-stem" aria-hidden="true" />
    <p>{block[language].text}</p>
  </div>
}

function GrammarLayer({ tokens, start, language }) {
  return <div className="ayah-diagram-branches ayah-diagram-grammar">
    {tokens.map((token, i) => <div className="ayah-diagram-branch" key={start + i}>
      <span className="ayah-diagram-branch-line" aria-hidden="true" />
      <strong lang="ar" dir="rtl">{token.ar}</strong>
      <small>{language === 'ru' ? token.roleRu : token.roleEn}</small>
    </div>)}
  </div>
}

function MorphologyLayer({ tokens, start, language }) {
  return <div className="ayah-diagram-branches ayah-diagram-morphology">
    {tokens.map((token, i) => <div className="ayah-diagram-branch" key={start + i}>
      <span className="ayah-diagram-branch-line" aria-hidden="true" />
      <strong lang="ar" dir="rtl">{token.ar}</strong>
      <small className="transliteration" lang="ar-Latn" dir="ltr">{token.tr}</small>
      {token.root
        ? <p><span>{language === 'ru' ? 'корень' : 'root'}</span> <b lang="ar" dir="rtl">{token.root}</b>{token.rootReading && <em>{token.rootReading}</em>}</p>
        : <p>{language === 'ru' ? token.ru : token.en}</p>}
    </div>)}
  </div>
}

function AyahDiagram({ ayah, language, focusWordIndex, lens }) {
  const ru = language === 'ru'
  return <section className="ayah-diagram">
    <header className="ayah-diagram-intro">
      <p className="ayah-kicker">{ru ? 'Структура аята' : 'Ayah structure'}</p>
      <h2>{ru ? 'Сначала целая мысль — потом то, из чего она складывается' : 'Start with the whole thought, then see how it is built'}</h2>
    </header>

    <div className="ayah-diagram-flow">
      {ayah.blocks.map((block, blockIndex) => {
        const start = block.range[0]
        const end = block.range[1]
        const tokens = ayah.tokens.slice(start - 1, end)

        return <div className="ayah-diagram-unit" key={block.id}>
          <article className="ayah-diagram-block">
            <div className="ayah-diagram-block-label">
              <span>{String(blockIndex + 1).padStart(2, '0')}</span>
              <small>{block[language].title}</small>
            </div>

            <Phrase tokens={tokens} start={start} focusWordIndex={focusWordIndex} />

            {lens === 'meaning' && <MeaningLayer block={block} language={language} />}
            {lens === 'grammar' && <GrammarLayer tokens={tokens} start={start} language={language} />}
            {lens === 'morphology' && <MorphologyLayer tokens={tokens} start={start} language={language} />}
          </article>

          {blockIndex < ayah.blocks.length - 1 && <div className="ayah-diagram-next" aria-hidden="true">
            <span />
            <b>↓</b>
          </div>}
        </div>
      })}
    </div>

    <footer className="ayah-diagram-whole">
      <span className="ayah-diagram-stem" aria-hidden="true" />
      <p className="ayah-kicker">{ru ? 'Аят как единое движение' : 'The ayah as one movement'}</p>
      <p>{ayah.flow[language]}</p>
    </footer>
  </section>
}

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [lens, setLens] = useState('meaning')
  const [contextOpen, setContextOpen] = useState(false)

  useEffect(() => {
    setLens('meaning')
    setContextOpen(false)
  }, [reference, focusWordIndex])

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
  const lenses = [
    ['meaning', ru ? 'Смысл' : 'Meaning'],
    ['grammar', ru ? 'Связи' : 'Connections'],
    ['morphology', ru ? 'Морфология' : 'Morphology'],
  ]

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

    {contextOpen && <aside className="ayah-context-card">
      <div>
        <p className="ayah-kicker">{ru ? 'Контекст' : 'Context'}</p>
        <p>{ayah.context[language]}</p>
      </div>
      <button onClick={() => setContextOpen(false)} aria-label={ru ? 'Закрыть контекст' : 'Close context'}>×</button>
    </aside>}

    <div className="ayah-hero ayah-hero-diagram">
      <p className="ayah-kicker">{ru ? 'Аят целиком' : 'Full ayah'}</p>
      <div className="ayah-arabic" lang="ar" dir="rtl">
        {ayah.tokens.map((token, index) => {
          const wordIndex = index + 1
          return <span key={wordIndex} className={'ayah-token-static' + (focusWordIndex === wordIndex ? ' is-entry-focus' : '')}>{token.ar}</span>
        })}
      </div>
    </div>

    <nav className="ayah-lenses" aria-label={ru ? 'Слой разбора' : 'Analysis layer'}>
      {lenses.map(([id, label]) => <button key={id} aria-pressed={lens === id} onClick={() => setLens(id)}>{label}</button>)}
    </nav>

    <div className="ayah-workbench">
      <AyahDiagram ayah={ayah} language={language} focusWordIndex={focusWordIndex} lens={lens} />
    </div>

    <a className="ayah-greentech-link" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      {ru ? 'Открыть в Al Quran · Greentech' : 'Open in Al Quran · Greentech'} <ExternalIcon />
    </a>
  </section>
}
