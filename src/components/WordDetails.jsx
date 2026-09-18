import { useState } from 'react'
import { COPY, FORMS } from '../demo.js'
import { CONTENT_SOURCES, ROOT_CONTENT, WORD_CONTENT } from '../rootContent.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT, groupOccurrences } from '../occurrences.js'
import { WQY_PUBLIC_MODEL } from '../canonicalWqy.js'
import { MORPH_COPY, MORPHOLOGY } from '../morphologyWqy.js'
import './WordDetails.css'


function MorphLegend({ language }) {
  const c = MORPH_COPY[language]
  return <div className="morph-legend" aria-label={language === 'ru' ? 'Легенда цветовой формулы' : 'Colour formula legend'}>
    {['root', 'pattern', 'inflection', 'change'].map(kind =>
      <span key={kind} className={'morph-legend-' + kind}><i aria-hidden="true" />{c[kind]}</span>
    )}
  </div>
}

function MorphFormula({ profile, language }) {
  const c = MORPH_COPY[language]
  const [activeIndex, setActiveIndex] = useState(0)
  const active = profile.segments[activeIndex] || profile.segments[0]
  const activeCopy = active?.[language] || []

  return <section className="morph-visual">
    <h3 className="morph-section-title">{c.formula}</h3>
    <div className="morph-word" lang="ar" dir="rtl" aria-label={profile.displayArabic}>
      {profile.segments.map((segment, index) =>
        <button key={index} type="button"
          className={'morph-segment morph-' + segment.kind + (index === activeIndex ? ' is-active' : '')}
          aria-pressed={index === activeIndex}
          onClick={() => setActiveIndex(index)}>
          {segment.text}
        </button>
      )}
    </div>
    <MorphLegend language={language} />
    <p className="morph-tap-hint">{c.tapHint}</p>
    {active && <div className={'morph-explain morph-explain-' + active.kind}>
      <p className="morph-explain-token" lang="ar" dir="rtl">{active.text}</p>
      <div><strong>{activeCopy[0]}</strong><p>{activeCopy[1]}</p></div>
    </div>}
  </section>
}

function DerivationPath({ profile, language }) {
  const c = MORPH_COPY[language]
  return <section className="morph-lineage">
    <h3>{c.lineage}</h3>
    <ol>{profile.lineage.map((step, index) =>
      <li key={index}>
        <span className="morph-lineage-node" aria-hidden="true" />
        <div>
          <span className="morph-lineage-arabic" lang="ar" dir="rtl">{step.ar}</span>
          <small>{step[language]}</small>
        </div>
      </li>
    )}</ol>
  </section>
}

function PatternEffect({ profile, language }) {
  const c = MORPH_COPY[language]
  const [title, body] = profile.effect[language]
  return <section className="morph-effect">
    <p className="morph-effect-label">{c.patternEffect}</p>
    <p className="morph-effect-pattern" lang="ar" dir="rtl">{title}</p>
    <p>{body}</p>
  </section>
}

function MorphologyStructure({ word, content, language, onPick }) {
  const profile = MORPHOLOGY[word.id]
  const c = MORPH_COPY[language]
  if (!profile) return null

  return <div className="entry-copy morphology-entry">
    <MorphFormula profile={profile} language={language} />
    <DerivationPath profile={profile} language={language} />
    <PatternEffect profile={profile} language={language} />

    {profile.variantAnalysis && <p className="entry-note annotation-note morph-variant-note">{c.noteVariants}</p>}

    <details className="morph-transform" open={word.id === 'ittaqa' || word.id === 'muttaqin'}>
      <summary>{c.transformations}</summary>
      <ol>{profile.transformations[language].map((item, index) => <li key={index}>{item}</li>)}</ol>
    </details>

    <details className="morph-more">
      <summary>{c.more}</summary>
      <dl className="structure-list">
        <div><dt>{COPY[language].root}</dt><dd lang="ar" dir="rtl">و ق ي</dd></div>
        <div><dt>{COPY[language].wordType}</dt><dd>{COPY[language][word.type]}</dd></div>
        <div><dt>{COPY[language].familyLabel}</dt><dd>{word.orbit}</dd></div>
        <div><dt>{COPY[language].pattern}</dt><dd><span className="pattern-arabic" lang="ar" dir="rtl">{content.pattern}</span>
          <small className="transliteration" lang="ar-Latn" dir="ltr">{content.patternReading}</small></dd></div>
      </dl>
      {content.structure[language].map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {word.lexicalOnly && <p className="entry-note">{COPY[language].lexicalNote}</p>}
    </details>

    <RelatedWords ids={content.related} language={language} onPick={onPick} />
    <SourceLinks ids={content.structureSources} language={language} />
  </div>
}

function SourceLinks({ ids, language }) {
  return <footer className="entry-sources"><h3>{COPY[language].sources}</h3>{ids.map(id => {
    const source = CONTENT_SOURCES[id]
    return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source[language]}<span aria-hidden="true">↗</span></a>
  })}</footer>
}

function ModelStatus({ language }) {
  const ru = language === 'ru'
  const review = ru
    ? 'Рабочая модель · проверено человеком · экспертная проверка впереди'
    : 'Working model · human reviewed · scholar review pending'
  return <p className="model-status" title={WQY_PUBLIC_MODEL.modelVersion}>{review}</p>
}

function CanonicalNote({ wordId, language }) {
  if (wordId === 'ittaqa') {
    return <section className="canonical-note">
      <h3>{language === 'ru' ? 'Смысловая роль' : 'Semantic role'}</h3>
      <p>{WQY_PUBLIC_MODEL.roleSafeguards.directObject[language]}</p>
      <p>{WQY_PUBLIC_MODEL.roleSafeguards.noGlobalOppositeRule[language]}</p>
      <div className="context-links">{WQY_PUBLIC_MODEL.roleSafeguards.noGlobalOppositeRule.refs.map(ref => <VerseLink key={ref} reference={ref} language={language} />)}</div>
    </section>
  }
  if (wordId === 'taqwa') {
    const tf = WQY_PUBLIC_MODEL.translationFidelity[language]
    return <section className="canonical-note">
      <h3>{language === 'ru' ? 'Точность перевода' : 'Translation fidelity'}</h3>
      <p>{tf.summary}</p>
      <p>{tf.righteousness}</p>
      <p>{tf.godFearing}</p>
      <p>{tf.q2_194}</p>
      <div className="context-links"><VerseLink reference="2:194" language={language} /><VerseLink reference="5:8" language={language} /></div>
    </section>
  }
  if (wordId === 'waq') {
    const note = WQY_PUBLIC_MODEL.reviewedContexts['13:34']
    return <section className="canonical-note">
      <h3>{language === 'ru' ? 'Проверочный контекст' : 'Falsification context'}</h3>
      <p>{note[language]}</p>
      <div className="context-links"><VerseLink reference="13:34" language={language} /><VerseLink reference="13:37" language={language} /></div>
    </section>
  }
  return null
}

function VerseLink({ reference, language }) {
  return <a href={'https://quran.com/' + reference.replace(':', '/')} target="_blank" rel="noopener noreferrer"
    aria-label={COPY[language].openVerse + ' ' + reference}>{reference}<span aria-hidden="true">↗</span></a>
}

function RelatedWords({ ids, language, onPick }) {
  return <section className="related-words"><h3>{COPY[language].relatedWords}</h3><div>{ids.map(id => {
    const form = FORMS.find(item => item.id === id)
    return <button key={id} onClick={() => onPick(form)}><span lang="ar" dir="rtl">{form.arabic}</span>
      <small className="transliteration" lang="ar-Latn" dir="ltr">{form.reading}</small></button>
  })}</div></section>
}

export function RootDetails({ language }) {
  const t = COPY[language]
  return <div className="entry-copy"><p className="entry-status">{t.semanticStatus}</p><ModelStatus language={language} />
    <p className="entry-lead">{ROOT_CONTENT[language].lead}</p><p>{ROOT_CONTENT[language].body}</p>
    <p className="occurrence-summary">{t.occurrenceCount}: <strong>{ROOT_OCCURRENCE_COUNT}</strong></p>
    <p className="entry-note">{t.rootScope}</p><p className="entry-note">{t.formsNote}</p>
    <SourceLinks ids={[...ROOT_CONTENT.sources, 'corpus']} language={language} />
  </div>
}

export function WordDetails({ word, panel, language, onPick }) {
  const t = COPY[language]
  const content = WORD_CONTENT[word.id]
  if (panel === 'quran') {
    const occurrences = OCCURRENCES[word.id] || []
    const groups = groupOccurrences(word.id)
    const verses = new Set(occurrences.map(item => item.sura + ':' + item.ayah)).size
    return <div className="entry-copy">
      {word.lexicalOnly ? <p>{t.lexicalQuran}</p> : <>
        <h3>{t.references}</h3>
        <p className="occurrence-summary">{t.occurrenceCount}: <strong>{occurrences.length}</strong><span> · </span>{t.verseCount}: <strong>{verses}</strong></p>
        {content.occurrenceNote && <p className="entry-note annotation-note">{content.occurrenceNote[language]}</p>}
        <div className="reference-groups">{groups.map(({ sura, items }) => <details key={sura} open={occurrences.length <= 20}>
          <summary>{t.sura} {sura}<span>{items.length}</span></summary>
          <ul>{items.map(item => <li key={item.ayah + ':' + item.word}>
            <VerseLink reference={item.sura + ':' + item.ayah} language={language} />
            <a className="word-reference" href={'https://corpus.quran.com/wordmorphology.jsp?location=(' + [item.sura, item.ayah, item.word].join(':') + ')'}
              target="_blank" rel="noopener noreferrer" aria-label={t.openWord + ' ' + [item.sura, item.ayah, item.word].join(':')}>
              {t.wordNumber} {item.word}<span aria-hidden="true">↗</span></a>
          </li>)}</ul>
        </details>)}</div>
        <p className="entry-note">{t.referenceNote}</p>
      </>}
      {word.id === 'tuqat' && <section><h3>{t.linkedPassage}</h3><p className="entry-note">{t.tuqatCrossReference}</p><div className="context-links"><VerseLink reference="3:102" language={language} /></div></section>}
      <SourceLinks ids={['corpus', ...(['taqiyy', 'tuqat'].includes(word.id) ? ['tuqatCorpus'] : [])]} language={language} />
    </div>
  }
  if (panel === 'structure') return <MorphologyStructure word={word} content={content} language={language} onPick={onPick} />
  if (panel === 'meaning') return <div className="entry-copy">
    <p className="entry-status">{t.semanticStatus}</p>
    <p className="entry-lead">{content.meaning[language].lead}</p><p>{content.meaning[language].body}</p>
    {content.layers?.map((layer, index) => <section className="meaning-layer" key={index}><h3>{layer[language].title}</h3>
      <p>{layer[language].text}</p><div className="context-links">{layer.refs.map(reference => <VerseLink key={reference} reference={reference} language={language} />)}</div></section>)}
    <CanonicalNote wordId={word.id} language={language} />
    <p className="entry-note">{t.meaningNote}</p>
    <RelatedWords ids={content.related} language={language} onPick={onPick} />
    <SourceLinks ids={content.meaningSources} language={language} />
  </div>
  return null
}
