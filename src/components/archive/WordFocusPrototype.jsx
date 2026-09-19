// Preserved prototype of the previous Word view (2026-09-19). Never imported by production.
import { useEffect, useState } from 'react'
import './WordFocusPrototype.css'
const phraseText = (ayah, block) => ayah.tokens.slice(block.range[0] - 1, block.range[1]).map(token => token.ar).join(' ')

function CalloutPager({ page, count, onChange, language }) {
  if (count <= 1) return null
  return <div className="analysis-callout-pager">
    <button onClick={() => onChange((page - 1 + count) % count)} aria-label={language === 'ru' ? 'Предыдущая страница' : 'Previous page'}>‹</button>
    <span>{page + 1} / {count}</span>
    <button onClick={() => onChange((page + 1) % count)} aria-label={language === 'ru' ? 'Следующая страница' : 'Next page'}>›</button>
  </div>
}

function splitCalloutText(text, maxLength = 175) {
  if (!text) return []

  const sentences = text
    .match(/[^.!?…]+(?:[.!?…]+|$)/g)
    ?.map(sentence => sentence.trim())
    .filter(Boolean) || [text.trim()]

  const pages = []
  let current = ''

  for (const sentence of sentences) {
    if (!current) {
      current = sentence
      continue
    }

    const combined = current + ' ' + sentence
    if (combined.length <= maxLength) {
      current = combined
    } else {
      pages.push(current)
      current = sentence
    }
  }

  if (current) pages.push(current)

  // A very short final sentence reads better with the previous page.
  if (
    pages.length > 1 &&
    pages[pages.length - 1].split(/\s+/).length <= 4 &&
    (pages[pages.length - 2] + ' ' + pages[pages.length - 1]).length <= maxLength * 1.35
  ) {
    pages[pages.length - 2] += ' ' + pages.pop()
  }

  return pages
}

export function WordFocusPrototype({ ayah, selectedWord, language, onClose, onOpenWordOrbit }) {
  const [pages, setPages] = useState({ morph: 0, syntax: 0, semantic: 0 })
  const [focusView, setFocusView] = useState('word')

  useEffect(() => {
    setPages({ morph: 0, syntax: 0, semantic: 0 })
    setFocusView('word')
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

  const morphologyParts = morphology?.parts || []
  const morphPartPages = morphologyParts.length
    ? Array.from({ length: Math.ceil(morphologyParts.length / 2) }, (_, pageIndex) => {
        const pageParts = morphologyParts.slice(pageIndex * 2, pageIndex * 2 + 2)
        return <div key={'parts-' + pageIndex}>
          <strong>{pageIndex === 0
            ? (ru ? 'Из чего состоит слово' : 'How the word is built')
            : (ru ? 'Корень и модель' : 'Root and pattern')}</strong>
          <div className="analysis-morph-parts">
            {pageParts.map((part, index) => <div key={index}>
              <b lang="ar" dir="rtl">{part.ar}</b>
              <em>{part.tr}</em>
              <p>{part.label}</p>
            </div>)}
          </div>
        </div>
      })
    : [<div key="parts">
        <strong>{ru ? 'Из чего состоит слово' : 'How the word is built'}</strong>
        <p>{ru ? selected.roleRu : selected.roleEn}</p>
      </div>]

  const morphPages = [
    ...morphPartPages,
    ...(morphology?.text ? [<div key="formation">
      <strong>{ru ? 'Как устроена форма' : 'How the form works'}</strong>
      <p className="analysis-detail-text">{morphology.text}</p>
    </div>] : []),
  ]

  const syntaxPlainPages = splitCalloutText(syntax?.plain, 250).map((text, index) => <div key={'plain-' + index}>
    <strong>{index === 0
      ? (ru ? 'Что делает слово в предложении' : 'What the word does in the sentence')
      : (ru ? 'Продолжение' : 'Continued')}</strong>
    <p className="analysis-syntax-plain">{text}</p>
  </div>)

  const syntaxPhrasePage = selectedBlock
    ? [<div key="phrase">
        <strong>{ru ? 'Фраза в аяте' : 'Phrase in the ayah'}</strong>
        <div className="analysis-syntax-phrase" lang="ar" dir="rtl">{phraseText(ayah, selectedBlock)}</div>
      </div>]
    : []

  const syntaxEndingPages = splitCalloutText(syntax?.ending, 235).map((text, index) => <div key={'ending-' + index}>
    <strong>{index === 0
      ? (ru ? 'Почему такая огласовка' : 'Why this ending appears')
      : (ru ? 'Продолжение' : 'Continued')}</strong>
    <p><b>{ru ? 'Окончание / огласовка:' : 'Ending / vowel:'}</b> {text}</p>
  </div>)

  const syntaxDetailPages = splitCalloutText(syntax?.text, 270).map((text, index) => <div key={'syntax-detail-' + index}>
    <strong>{index === 0
      ? (ru ? 'Как устроена конструкция' : 'How the construction works')
      : (ru ? 'Продолжение' : 'Continued')}</strong>
    <p className="analysis-detail-text">{text}</p>
  </div>)

  const syntaxPages = [
    ...(syntaxPlainPages.length ? syntaxPlainPages : [<div key="plain-fallback"><strong>{ru ? 'Что делает слово в предложении' : 'What the word does in the sentence'}</strong></div>]),
    ...syntaxPhrasePage,
    <div key="role">
      <strong>{ru ? 'Роль и положение' : 'Role and position'}</strong>
      {syntax?.title && <p><b>{ru ? 'Роль:' : 'Role:'}</b> {syntax.title}</p>}
      {syntax?.case && <p><b>{ru ? 'Падеж / форма:' : 'Case / form:'}</b> {syntax.case}</p>}
    </div>,
    ...syntaxEndingPages,
    ...syntaxDetailPages,
  ]

  const semanticDescriptionPages = splitCalloutText(
    meaning?.description || (ru ? selected.noteRu : selected.noteEn),
    330
  ).map((text, index) => <div key={'meaning-' + index}>
    <strong>{index === 0 ? (meaning?.gloss || (ru ? selected.ru : selected.en)) : (ru ? 'Продолжение значения' : 'Meaning continued')}</strong>
    <p className="analysis-detail-text">{text}</p>
  </div>)

  const semanticTranslationPages = splitCalloutText(meaning?.translation, 320).map((text, index) => <div key={'translation-' + index}>
    <strong>{index === 0 ? (ru ? 'Почему такой перевод' : 'Why this translation') : (ru ? 'Продолжение' : 'Continued')}</strong>
    <p className="analysis-translation-choice">{text}</p>
  </div>)

  const semanticPages = [
    ...(semanticDescriptionPages.length ? semanticDescriptionPages : [<div key="meaning-fallback"><strong>{ru ? selected.ru : selected.en}</strong></div>]),
    ...semanticTranslationPages,
  ]

  function setPage(kind, value) {
    setPages(current => ({ ...current, [kind]: value }))
  }

  const isTaqwa = selected.orbitId === 'taqwa'

  return <div className={'analysis-focus-overlay focus-view-' + focusView} onClick={onClose}>
    <div className="analysis-focus-space" onClick={onClose}>
      {focusView === 'word' && <>
      <div className="analysis-focus-word">
        <span lang="ar" dir="rtl">{selected.ar}</span>
        <small>{selected.tr}</small>
        {selected.orbitId && <button
          className="analysis-center-orbit"
          onClick={(event) => {
            event.stopPropagation()
            onOpenWordOrbit?.(selected)
          }}
        >
          {ru ? 'Перейти в орбиту слова →' : 'Open word orbit →'}
        </button>}
      </div>

      <svg className="analysis-focus-rays" viewBox="0 0 1000 720" aria-hidden="true">
        <path className="morph" d="M 480 345 C 405 305, 330 245, 245 190" />
        <path className="syntax" d="M 520 345 C 595 305, 670 245, 755 190" />
        <path className="semantic" d="M 500 375 C 500 435, 500 500, 500 565" />
        <circle className="morph-dot" cx="245" cy="190" r="4" />
        <circle className="syntax-dot" cx="755" cy="190" r="4" />
        <circle className="semantic-dot" cx="500" cy="565" r="4" />
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
      </section>
      </>}

      {focusView === 'relation' && <section className="analysis-relation-screen" onClick={(event) => event.stopPropagation()}>
        <small className="analysis-relation-kicker">{ru ? 'СВЯЗЬ В АЯТЕ' : 'RELATION IN THE AYAH'}</small>
        <div className="analysis-relation-phrase" lang="ar" dir="rtl">
          {selectedBlock ? phraseText(ayah, selectedBlock) : selected.ar}
        </div>
        <p className="analysis-relation-intro">{syntax?.plain}</p>

        {isTaqwa ? <div className="analysis-relation-chain">
          <div className="analysis-relation-node source">
            <span lang="ar" dir="rtl">خَيْرَ ٱلزَّادِ</span>
            <b>اسم إِنَّ <em>(ism inna)</em></b>
            <p>{ru ? 'То, о чём говорится в утверждении.' : 'What the statement is about.'}</p>
          </div>
          <div className="analysis-relation-arrow" aria-hidden="true">→</div>
          <div className="analysis-relation-node target">
            <span lang="ar" dir="rtl">{selected.ar}</span>
            <b>خبر إِنَّ <em>(khabar inna)</em></b>
            <p>{ru ? 'То, что сообщает и завершает мысль.' : 'What completes the statement.'}</p>
          </div>
        </div> : <div className="analysis-relation-chain single">
          <div className="analysis-relation-node target">
            <span lang="ar" dir="rtl">{selected.ar}</span>
            <b>{ru ? selected.roleRu : selected.roleEn}</b>
            <p>{syntax?.title}</p>
          </div>
        </div>}

        {syntax?.text && <div className="analysis-relation-detail">
          <strong>{ru ? 'Как устроена конструкция' : 'How the construction works'}</strong>
          <p>{syntax.text}</p>
        </div>}
      </section>}

      {focusView === 'morphology' && <section className="analysis-morphology-screen" onClick={(event) => event.stopPropagation()}>
        <div className="analysis-morphology-canvas">
          <header className="analysis-morphology-hero">
            <span lang="ar" dir="rtl">{selected.ar}</span>
            <em>{selected.tr}</em>
          </header>

          {isTaqwa ? <>
            <div className="analysis-morphology-branch first" aria-hidden="true">
              <i className="branch-line left" />
              <i className="branch-line right" />
            </div>

            <div className="analysis-morphology-level first-level">
              <article className="analysis-morphology-node base">
                <span lang="ar" dir="rtl">{morphologyParts[1]?.ar || 'تَقْوَىٰ'}</span>
                <small>{morphologyParts[1]?.tr || 'taqwā'}</small>
                <b>{ru ? 'Слово без артикля' : 'Word without the article'}</b>
                <p>{ru
                  ? 'تَقْوَىٰ (taqwā) — существительное. Контекстный перевод в этом аяте: «благочестие».'
                  : 'تَقْوَىٰ (taqwā) is a noun. A contextual rendering in this ayah is “piety”.'}</p>
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

            <div className="analysis-morphology-branch second" aria-hidden="true">
              <i className="branch-line down" />
              <i className="branch-line to-pattern" />
            </div>

            <div className="analysis-morphology-level second-level">
              <article className="analysis-morphology-node root">
                <span lang="ar" dir="rtl">{morphologyParts[2]?.ar || selected.root}</span>
                <small>{morphologyParts[2]?.tr || selected.rootReading}</small>
                <b>{ru ? 'Корень' : 'Root'}</b>
                <p>{ru
                  ? 'و ق ي (w-q-y) несёт идею защиты и оберегания.'
                  : 'و ق ي (w-q-y) carries the idea of protection and guarding.'}</p>
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
              <strong>{ru ? 'Итог' : 'Summary'}</strong>
              <div className="analysis-morphology-summary-formula" lang="ar" dir="rtl">
                ٱلتَّقْوَىٰ = ٱلـ + تَقْوَىٰ
              </div>
              <div className="analysis-morphology-summary-list">
                <p>{ru
                  ? <><b>Основа:</b> تَقْوَىٰ (taqwā) — существительное, связанное с корнем و ق ي (w-q-y) «защищать / оберегать» и моделью فَعْلَى (faʿlā).</>
                  : <><b>Base:</b> تَقْوَىٰ (taqwā) is a noun related to the root و ق ي (w-q-y), “to protect / guard,” and the pattern فَعْلَى (faʿlā).</>}</p>
                <p>{ru
                  ? <><b>Что добавилось:</b> ٱلـ (al-) присоединяется к слову и делает его определённым.</>
                  : <><b>What is added:</b> ٱلـ (al-) attaches to the word and makes it definite.</>}</p>
                <p>{ru
                  ? <><b>В аяте 2:197:</b> краткий контекстный перевод — «благочестие».</>
                  : <><b>In 2:197:</b> a concise contextual rendering is “piety.”</>}</p>
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
        <button
          className={focusView === 'word' ? 'is-active' : ''}
          onClick={() => setFocusView('word')}
          aria-pressed={focusView === 'word'}
        >{ru ? 'Слово' : 'Word'}</button>
        <button
          className={focusView === 'relation' ? 'is-active' : ''}
          onClick={() => setFocusView('relation')}
          aria-pressed={focusView === 'relation'}
        >{ru ? 'Связь в аяте' : 'In the ayah'}</button>
        <button
          className={focusView === 'morphology' ? 'is-active' : ''}
          onClick={() => setFocusView('morphology')}
          aria-pressed={focusView === 'morphology'}
        >{ru ? 'Морфология' : 'Morphology'}</button>
      </nav>
    </div>
  </div>
}

