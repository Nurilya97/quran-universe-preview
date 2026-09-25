import { useEffect, useMemo, useState } from 'react'
import { loadTranslationComparison, TRANSLATION_PROVIDERS } from '../data/translationCompare.js'
import './AyahJourney.css'

function phraseTokens(ayah, range) {
  return ayah.tokens.slice(range[0] - 1, range[1])
}

function TranslationCompare({ reference, language, open, onToggle }) {
  const [compareLanguage, setCompareLanguage] = useState(language === 'en' ? 'en' : 'ru')
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    setCompareLanguage(language === 'en' ? 'en' : 'ru')
  }, [language])

  useEffect(() => {
    if (!open) return undefined
    const controller = new AbortController()
    setStatus('loading')
    setRows([])

    loadTranslationComparison(reference, compareLanguage, controller.signal)
      .then((result) => {
        setRows(result)
        setStatus('ready')
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return
        setRows([])
        setStatus('error')
      })

    return () => controller.abort()
  }, [open, reference, compareLanguage])

  const providers = TRANSLATION_PROVIDERS[compareLanguage] || []
  const displayRows = status === 'ready'
    ? rows
    : providers.map((provider) => ({ ...provider, status: 'loading', text: '' }))

  return <section className={'ayah-translation-layer' + (open ? ' is-open' : '')}>
    <button
      className="ayah-translation-toggle"
      type="button"
      aria-expanded={open}
      onClick={onToggle}
    >
      <span>{language === 'ru' ? 'Сравнить переводы' : 'Compare translations'}</span>
      <small>{language === 'ru' ? '2 русских · 2 английских' : '2 Russian · 2 English'}</small>
      <b aria-hidden="true">{open ? '−' : '+'}</b>
    </button>

    {open && <div className="ayah-translation-body">
      <div className="ayah-translation-language" role="group" aria-label={language === 'ru' ? 'Язык переводов' : 'Translation language'}>
        <button type="button" aria-pressed={compareLanguage === 'ru'} onClick={() => setCompareLanguage('ru')}>RU</button>
        <button type="button" aria-pressed={compareLanguage === 'en'} onClick={() => setCompareLanguage('en')}>EN</button>
      </div>

      <p className="ayah-translation-note">
        {language === 'ru'
          ? 'Переводы показаны рядом как разные прочтения арабского текста. Смысловой ориентир Quran Universe остаётся отдельным слоем.'
          : 'Translations are shown side by side as different readings of the Arabic. The Quran Universe meaning guide remains a separate layer.'}
      </p>

      <div className="ayah-translation-grid">
        {displayRows.map((row) => <article key={row.id} className={'ayah-translation-source is-' + row.status}>
          <header>
            <strong>{row.label}</strong>
            <a href={row.externalUrl.replace('2:197', reference)} target="_blank" rel="noopener noreferrer">
              {language === 'ru' ? 'Источник ↗' : 'Source ↗'}
            </a>
          </header>
          {status === 'loading' && <p className="ayah-translation-loading">{language === 'ru' ? 'Загружаем перевод…' : 'Loading translation…'}</p>}
          {status === 'error' && <p className="ayah-translation-unavailable">{language === 'ru' ? 'Не удалось загрузить текст. Откройте источник.' : 'Could not load the text. Open the source.'}</p>}
          {status === 'ready' && row.status === 'ready' && <p>{row.text}</p>}
          {status === 'ready' && row.status !== 'ready' && <p className="ayah-translation-unavailable">{language === 'ru' ? 'Этот перевод не найден в текущем API. Откройте источник.' : 'This translation was not found in the current API. Open the source.'}</p>}
        </article>)}
      </div>
    </div>}
  </section>
}

export function AyahJourney({ ayah, language, onSelectWord, onExplore }) {
  const [translationsOpen, setTranslationsOpen] = useState(false)
  const journey = ayah.journey?.[language]
  const segments = ayah.journey?.segments || []
  const ru = language === 'ru'

  const fullArabic = useMemo(
    () => ayah.tokens.map((token) => token.ar).join(' '),
    [ayah.tokens],
  )

  if (!journey) return null

  return <div className="ayah-journey-viewport">
    <main className="ayah-journey">
      <section className="ayah-journey-hero">
        <p className="ayah-journey-kicker">{ru ? 'Смысл аята' : 'Meaning of the ayah'}</p>
        <div className="ayah-journey-arabic" lang="ar" dir="rtl">{fullArabic}</div>
        <div className="ayah-journey-reference">{ayah.reference} · {ayah.surah[language]}</div>
        <p className="ayah-journey-guide">{journey.guide}</p>
        <p className="ayah-journey-guide-note">{journey.guideNote}</p>
      </section>

      <TranslationCompare
        reference={ayah.reference}
        language={language}
        open={translationsOpen}
        onToggle={() => setTranslationsOpen((value) => !value)}
      />

      <section className="ayah-journey-parts" aria-labelledby="ayah-journey-parts-title">
        <header>
          <small>{ru ? 'Постепенно' : 'Step by step'}</small>
          <h2 id="ayah-journey-parts-title">{ru ? 'Понять по частям' : 'Understand it in parts'}</h2>
          <p>{ru
            ? 'Сначала удерживаем общий смысл, затем приближаемся к каждой смысловой части. Нажмите слово только тогда, когда хотите углубиться.'
            : 'Keep the whole meaning in view first, then move closer to each part. Tap a word only when you want more depth.'}</p>
        </header>

        <div className="ayah-journey-thread">
          {segments.map((segment, segmentIndex) => {
            const copy = segment[language]
            const tokens = phraseTokens(ayah, segment.range)
            return <section key={segment.id} className="ayah-journey-step">
              <div className="ayah-journey-step-marker" aria-hidden="true">
                <i />
                <span>{String(segmentIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="ayah-journey-phrase" lang="ar" dir="rtl">
                {tokens.map((token, index) => {
                  const wordIndex = segment.range[0] + index
                  return <span key={wordIndex}>
                    <button type="button" onClick={() => onSelectWord(wordIndex)}>{token.ar}</button>
                    {index < tokens.length - 1 ? ' ' : ''}
                  </span>
                })}
              </div>
              <h3>{copy.meaning}</h3>
              {copy.note && <p>{copy.note}</p>}
            </section>
          })}
        </div>
      </section>

      <section className="ayah-journey-deeper">
        <small>{ru ? 'Когда общий смысл уже держится в голове' : 'Once the whole meaning is clear'}</small>
        <h2>{ru ? 'Исследовать глубже' : 'Explore deeper'}</h2>
        <p>{ru
          ? 'Морфология, синтаксис, композиция, риторика и контекст остаются доступны как следующий уровень — не как обязательный путь к пониманию.'
          : 'Morphology, syntax, composition, rhetoric and context remain available as the next level, not as a prerequisite for understanding.'}</p>
        <button type="button" onClick={onExplore}>{ru ? 'Открыть исследование →' : 'Open research →'}</button>
      </section>
    </main>
  </div>
}
