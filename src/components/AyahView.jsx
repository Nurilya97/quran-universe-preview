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

function WordCell({ token, index, language, isEntry, isSelected, onClick }) {
  return <button className={'ayah-board-word' + (isEntry ? ' is-entry' : '') + (isSelected ? ' is-selected' : '')}
    onClick={onClick} aria-pressed={isSelected}>
    <span className="ayah-board-index">{String(index).padStart(2, '0')}</span>
    <span className="ayah-board-ar" lang="ar" dir="rtl">{token.ar}</span>
    <span className="ayah-board-tr">{token.tr}</span>
    <strong>{language === 'ru' ? token.ru : token.en}</strong>
    <small>{language === 'ru' ? token.roleRu : token.roleEn}</small>
    {isEntry && <em>{language === 'ru' ? 'слово входа' : 'entry word'}</em>}
  </button>
}

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [selectedWord, setSelectedWord] = useState(null)
  const [tab, setTab] = useState('analysis')
  const [contextOpen, setContextOpen] = useState(false)

  useEffect(() => {
    setSelectedWord(null)
    setTab('analysis')
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

  const selected = selectedWord ? ayah.tokens[selectedWord - 1] : null

  const tabs = [
    ['analysis', language === 'ru' ? 'Разбор' : 'Analysis'],
    ['composition', language === 'ru' ? 'Композиция' : 'Composition'],
    ['rhetoric', language === 'ru' ? 'Риторика' : 'Rhetoric'],
    ['sound', language === 'ru' ? 'Звучание' : 'Sound'],
    ['translations', language === 'ru' ? 'Переводы' : 'Translations'],
  ]

  return <section className="ayah-stage">
    <div className="ayah-topbar">
      <button className="ayah-back" onClick={onBack}><ArrowIcon />{language === 'ru' ? 'К слову' : 'Back to word'}</button>
      <div className="ayah-reference">
        <span>{ayah.reference}</span>
        <small>{ayah.surah[language]}</small>
      </div>
      <button className={'ayah-context-trigger' + (contextOpen ? ' is-open' : '')}
        aria-expanded={contextOpen} onClick={() => setContextOpen(v => !v)}>
        <InfoIcon /><span>{language === 'ru' ? 'Контекст' : 'Context'}</span>
      </button>
    </div>

    {contextOpen && <aside className="ayah-context-card">
      <div>
        <p className="ayah-kicker">{language === 'ru' ? 'Контекст' : 'Context'}</p>
        <p>{ayah.context[language]}</p>
      </div>
      <button onClick={() => setContextOpen(false)} aria-label={language === 'ru' ? 'Закрыть контекст' : 'Close context'}>×</button>
    </aside>}

    <div className="ayah-hero">
      <p className="ayah-kicker">{language === 'ru' ? 'Аят целиком' : 'Full ayah'}</p>
      <div className="ayah-arabic" lang="ar" dir="rtl">
        {ayah.tokens.map((token, index) => {
          const wordIndex = index + 1
          const isEntry = focusWordIndex === wordIndex
          return <span key={wordIndex} className={'ayah-token-static' + (isEntry ? ' is-entry-focus' : '')}>{token.ar}</span>
        })}
      </div>
      <div className="ayah-focus-line">
        <span>{language === 'ru' ? 'Вход из исследования' : 'Entered from'}</span>
        <strong lang="ar" dir="rtl">{ayah.tokens[(focusWordIndex || 1) - 1]?.ar}</strong>
        <small>{ayah.tokens[(focusWordIndex || 1) - 1]?.tr}</small>
      </div>
    </div>

    <nav className="ayah-tabs" aria-label={language === 'ru' ? 'Разбор аята' : 'Ayah analysis'}>
      {tabs.map(([id, label]) => <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>)}
    </nav>

    <div className="ayah-workbench">
      {tab === 'analysis' && <section className="ayah-board">
        <header className="ayah-board-intro">
          <p className="ayah-kicker">{language === 'ru' ? 'От начала до конца' : 'From beginning to end'}</p>
          <h2>{language === 'ru' ? 'Разбираем аят по шагам' : 'Build the verse step by step'}</h2>
          <p>{language === 'ru'
            ? 'Каждое слово уже имеет короткую подпись. Нажатие нужно только для углубления — основной ход аята можно понять без дополнительных экранов.'
            : 'Every word already has a short label. Clicking is only for deeper detail—the main flow can be followed without opening anything else.'}</p>
        </header>

        <div className="ayah-board-steps">
          {ayah.blocks.map((block, blockIndex) => {
            const start = block.range[0]
            const end = block.range[1]
            const blockTokens = ayah.tokens.slice(start - 1, end)
            const selectedInside = selectedWord && selectedWord >= start && selectedWord <= end
            return <article className="ayah-board-step" key={block.id}>
              <header className="ayah-board-step-head">
                <span>{String(blockIndex + 1).padStart(2, '0')}</span>
                <div>
                  <p>{language === 'ru' ? 'Шаг' : 'Step'}</p>
                  <h3>{block[language].title}</h3>
                </div>
              </header>

              <div className="ayah-board-grid">
                {blockTokens.map((token, i) => {
                  const wordIndex = start + i
                  return <WordCell key={wordIndex} token={token} index={wordIndex} language={language}
                    isEntry={focusWordIndex === wordIndex} isSelected={selectedWord === wordIndex}
                    onClick={() => setSelectedWord(selectedWord === wordIndex ? null : wordIndex)} />
                })}
              </div>

              <div className="ayah-construction-bracket" aria-hidden="true"><span /></div>
              <div className="ayah-construction-result">
                <small>{language === 'ru' ? 'Что создаёт конструкция' : 'What the construction creates'}</small>
                <p>{block[language].text}</p>
              </div>

              {selectedInside && selected && <div className="ayah-word-deep">
                <div className="ayah-word-deep-heading">
                  <div>
                    <span lang="ar" dir="rtl">{selected.ar}</span>
                    <small>{selected.tr}</small>
                  </div>
                  <button onClick={() => setSelectedWord(null)} aria-label={language === 'ru' ? 'Закрыть углубление' : 'Close detail'}>×</button>
                </div>
                <p className="ayah-word-deep-role">{language === 'ru' ? selected.roleRu : selected.roleEn}</p>
                <h4>{language === 'ru' ? selected.ru : selected.en}</h4>
                {selected.root && <div className="ayah-root-chip"><span>{language === 'ru' ? 'Корень' : 'Root'}</span><strong lang="ar" dir="rtl">{selected.root}</strong><small>{selected.rootReading}</small></div>}
                {(language === 'ru' ? selected.noteRu : selected.noteEn) && <p>{language === 'ru' ? selected.noteRu : selected.noteEn}</p>}
              </div>}
            </article>
          })}
        </div>

        <section className="ayah-flow-summary">
          <p className="ayah-kicker">{language === 'ru' ? 'Собираем целое' : 'Putting it together'}</p>
          <h2>{language === 'ru' ? 'Ход аята' : 'Flow of the ayah'}</h2>
          <p>{ayah.flow[language]}</p>
        </section>
      </section>}

      {tab === 'composition' && <section className="ayah-layer ayah-composition">
        <p className="ayah-kicker">{language === 'ru' ? 'Композиция' : 'Composition'}</p>
        <h2>{language === 'ru' ? 'Как крупные части выстроены в целое' : 'How the larger units form a whole'}</h2>
        <div className="ayah-composition-flow">
          {ayah.blocks.map((block, index) => <article key={block.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{block[language].title}</h3><p>{block[language].text}</p></div>
          </article>)}
        </div>
      </section>}

      {tab === 'rhetoric' && <section className="ayah-layer">
        <p className="ayah-kicker">{language === 'ru' ? 'Риторические приёмы' : 'Rhetorical devices'}</p>
        <h2>{language === 'ru' ? 'Что делает речь выразительной' : 'What makes the discourse expressive'}</h2>
        <div className="ayah-layer-list">
          {ayah.rhetoric[language].map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>}

      {tab === 'sound' && <section className="ayah-layer">
        <p className="ayah-kicker">{language === 'ru' ? 'Звучание' : 'Sound'}</p>
        <h2>{language === 'ru' ? 'Чтение как отдельный слой' : 'Recitation as a separate layer'}</h2>
        <p>{ayah.sound[language]}</p>
      </section>}

      {tab === 'translations' && <section className="ayah-layer">
        <p className="ayah-kicker">{language === 'ru' ? 'Переводы' : 'Translations'}</p>
        <h2>{language === 'ru' ? 'Дополнительный слой после арабского разбора' : 'An optional layer after the Arabic analysis'}</h2>
        <p>{ayah.translations[language]}</p>
      </section>}
    </div>

    <a className="ayah-greentech-link" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      {language === 'ru' ? 'Открыть в Al Quran · Greentech' : 'Open in Al Quran · Greentech'} <ExternalIcon />
    </a>
  </section>
}
