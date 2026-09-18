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

export function AyahView({ reference, focusWordIndex, language, onBack }) {
  const ayah = getAyahPrototype(reference)
  const [selectedWord, setSelectedWord] = useState(focusWordIndex || 1)
  const [tab, setTab] = useState('construction')
  const [contextOpen, setContextOpen] = useState(false)

  useEffect(() => {
    setSelectedWord(focusWordIndex || 1)
    setTab('construction')
    setContextOpen(false)
  }, [reference, focusWordIndex])

  if (!ayah) {
    return <section className="ayah-stage ayah-stage-empty">
      <button className="ayah-back" onClick={onBack}><ArrowIcon />{language === 'ru' ? 'К слову' : 'Back to word'}</button>
      <div className="ayah-empty-card">
        <p className="ayah-kicker">{reference}</p>
        <h1>{language === 'ru' ? 'Пространство аята' : 'Ayah workspace'}</h1>
        <p>{language === 'ru' ? 'Архитектура уже готова. Для прототипа полный разбор подключён к 2:197; остальные аяты будут наполняться той же схемой после проверки данных.' : 'The workspace architecture is ready. For this prototype, the full analysis is connected to 2:197; other verses will use the same structure after their data is verified.'}</p>
      </div>
    </section>
  }

  const selected = ayah.tokens[selectedWord - 1]
  const relatedRootIndexes = ayah.tokens.map((token, i) => token.root === ayah.focusRoot ? i + 1 : null).filter(Boolean)
  const currentBlock = ayah.blocks.find(block => selectedWord >= block.range[0] && selectedWord <= block.range[1])

  const tabs = [
    ['construction', language === 'ru' ? 'Конструкция' : 'Construction'],
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
        <p className="ayah-kicker">{language === 'ru' ? 'Контекст текста' : 'Textual context'}</p>
        <p>{ayah.context[language]}</p>
      </div>
      <button onClick={() => setContextOpen(false)} aria-label={language === 'ru' ? 'Закрыть контекст' : 'Close context'}>×</button>
    </aside>}

    <div className="ayah-hero">
      <p className="ayah-kicker">{language === 'ru' ? 'Пространство аята' : 'Ayah workspace'}</p>
      <div className="ayah-arabic" lang="ar" dir="rtl" aria-label={language === 'ru' ? 'Арабский текст аята' : 'Arabic verse text'}>
        {ayah.tokens.map((token, index) => {
          const wordIndex = index + 1
          const selectedClass = selectedWord === wordIndex ? ' is-selected' : ''
          const relatedClass = relatedRootIndexes.includes(wordIndex) ? ' is-related-root' : ''
          const entryClass = focusWordIndex === wordIndex ? ' is-entry-focus' : ''
          return <button key={wordIndex} className={'ayah-token' + selectedClass + relatedClass + entryClass}
            onClick={() => { setSelectedWord(wordIndex); setTab('construction') }}
            aria-pressed={selectedWord === wordIndex}>
            {token.ar}
          </button>
        })}
      </div>
      <div className="ayah-focus-line">
        <span>{language === 'ru' ? 'Фокус входа' : 'Entry focus'}</span>
        <strong lang="ar" dir="rtl">{ayah.tokens[(focusWordIndex || 1) - 1]?.ar}</strong>
        <small>{ayah.tokens[(focusWordIndex || 1) - 1]?.tr}</small>
      </div>
    </div>

    <nav className="ayah-tabs" aria-label={language === 'ru' ? 'Разбор аята' : 'Ayah analysis'}>
      {tabs.map(([id, label]) => <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>)}
    </nav>

    <div className="ayah-workbench">
      {tab === 'construction' && <>
        <section className="ayah-word-focus">
          <div className="ayah-word-heading">
            <div>
              <span lang="ar" dir="rtl">{selected.ar}</span>
              <small>{selected.tr}</small>
            </div>
            <p>{language === 'ru' ? selected.roleRu : selected.roleEn}</p>
          </div>
          <h2>{language === 'ru' ? selected.ru : selected.en}</h2>
          {selected.root && <div className="ayah-root-chip"><span>{language === 'ru' ? 'Корень' : 'Root'}</span><strong lang="ar" dir="rtl">{selected.root}</strong><small>{selected.rootReading}</small></div>}
          {(language === 'ru' ? selected.noteRu : selected.noteEn) && <p className="ayah-word-note">{language === 'ru' ? selected.noteRu : selected.noteEn}</p>}
          {currentBlock && <p className="ayah-block-link">{language === 'ru' ? 'Часть конструкции' : 'Construction block'} · <strong>{currentBlock[language].title}</strong></p>}
        </section>

        <section className="ayah-building">
          <header>
            <p className="ayah-kicker">{language === 'ru' ? 'Как складывается аят' : 'How the verse is built'}</p>
            <h2>{language === 'ru' ? 'Кирпичик за кирпичиком' : 'Block by block'}</h2>
          </header>
          <div className="ayah-blocks">
            {ayah.blocks.map((block, index) => <article key={block.id} className={currentBlock?.id === block.id ? 'is-active' : ''}>
              <span className="ayah-block-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{block[language].title}</h3>
                <p>{block[language].text}</p>
                <div className="ayah-block-words" lang="ar" dir="rtl">
                  {ayah.tokens.slice(block.range[0] - 1, block.range[1]).map((token, i) => <button key={i}
                    onClick={() => setSelectedWord(block.range[0] + i)}>{token.ar}</button>)}
                </div>
              </div>
            </article>)}
          </div>
        </section>
      </>}

      {tab === 'rhetoric' && <section className="ayah-layer">
        <p className="ayah-kicker">{language === 'ru' ? 'Риторические приёмы' : 'Rhetorical devices'}</p>
        <h2>{language === 'ru' ? 'Как форма речи усиливает смысл' : 'How the form of speech shapes meaning'}</h2>
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
        <h2>{language === 'ru' ? 'Дополнительный слой' : 'Optional layer'}</h2>
        <p>{ayah.translations[language]}</p>
      </section>}
    </div>

    <a className="ayah-greentech-link" href={ayah.greentechUrl} target="_blank" rel="noopener noreferrer">
      {language === 'ru' ? 'Открыть в Al Quran · Greentech' : 'Open in Al Quran · Greentech'} <ExternalIcon />
    </a>
  </section>
}
