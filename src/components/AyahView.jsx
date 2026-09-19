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

function WordFocusOverlay({ ayah, selectedWord, language, onClose, onOpenWordOrbit }) {
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
              <i className="branch-line left" />
              <i className="branch-line right" />
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
              <p>{ru
                ? 'ٱلتَّقْوَىٰ (al-taqwā) состоит из ٱلـ (al-) + تَقْوَىٰ (taqwā). تَقْوَىٰ (taqwā) — существительное, связанное с корнем و ق ي (w-q-y) «защищать / оберегать» и построенное по модели فَعْلَى (faʿlā). В контексте 2:197 его краткий перевод — «благочестие». Артикль ٱلـ (al-) присоединяется к تَقْوَىٰ (taqwā), потому что здесь существительное употреблено в определённой форме: речь идёт о конкретно обозначенном качестве в утверждении аята.'
                : 'ٱلتَّقْوَىٰ (al-taqwā) is built from ٱلـ (al-) + تَقْوَىٰ (taqwā). تَقْوَىٰ (taqwā) is a noun related to the root و ق ي (w-q-y), “to protect / guard,” and follows the pattern فَعْلَى (faʿlā). In 2:197, a concise contextual rendering is “piety.” The article ٱلـ (al-) attaches because the noun is used here in a definite form: the statement points to a specifically identified quality.'}</p>
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

  return <section className={'ayah-space-shell' + (mode === 'analysis' ? ' is-analysis' : '') + (selectedWord && mode === 'analysis' ? ' has-word-focus' : '')}>
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
