import { COPY, FORMS } from '../demo.js'
import { CONTENT_SOURCES, ROOT_CONTENT, WORD_CONTENT } from '../rootContent.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT, groupOccurrences } from '../occurrences.js'
import { WQY_PUBLIC_MODEL } from '../canonicalWqy.js'
import { MORPH_COPY, MORPH_ROLES, MORPHOLOGY } from '../morphologyWqy.js'
import './WordDetails.css'



function MorphLegend({ profile, language }) {
  const roles = [...new Set(profile.visualParts.flatMap(part => part.markRole ? [part.role, part.markRole] : [part.role]))]
  return <div className="morph-legend" aria-label={language === 'ru' ? 'Цвета разбора слова' : 'Word-analysis colours'}>
    {roles.map(role => <span key={role} className={'morph-legend-' + role}>
      <i aria-hidden="true" />{MORPH_ROLES[role][language]}
    </span>)}
  </div>
}

function MorphFormula({ word, profile, language }) {
  const c = MORPH_COPY[language]
  return <section className="morph-analysis">
    <h3>{c.analysis}</h3>
    <div className="morph-word-wrap">
      <div className="morph-word-line">
        <div className="morph-word" lang="ar" dir="rtl" aria-label={profile.displayArabic}>
          {profile.visualParts.map((part, index) =>
            <span key={index} className={'morph-part morph-' + part.role + (part.mark ? ' morph-part-with-mark' : '')}>
              {part.text}
              {part.mark === 'kasratan' && <i className="morph-kasratan-mark" aria-hidden="true"><b /><b /></i>}
            </span>
          )}
        </div>
        <small className="transliteration morph-reading" lang="ar-Latn" dir="ltr">{word.reading}</small>
      </div>
    </div>
    <MorphLegend profile={profile} language={language} />
    {profile.transformation && <div className="morph-transformation">
      <span className="morph-root" lang="ar" dir="rtl">{profile.transformation.root}</span>
      <span aria-hidden="true">+</span>
      <span className="morph-form" lang="ar" dir="rtl">{profile.transformation.form}</span>
      <span aria-hidden="true">→</span>
      <span className="morph-fusion" lang="ar" dir="rtl">{profile.transformation.result}</span>
      <small>{profile.transformation[language]}</small>
    </div>}
  </section>
}

function RootBreakdown({ language }) {
  const c = MORPH_COPY[language]
  return <section className="morph-fact morph-root-fact">
    <p className="morph-fact-label">{c.root}</p>
    <div className="morph-fact-main">
      <div className="morph-arabic-pair">
        <span className="morph-fact-arabic morph-root" lang="ar" dir="rtl">و ق ي</span>
        <small className="transliteration" lang="ar-Latn" dir="ltr">w-q-y</small>
      </div>
      <p>{WQY_PUBLIC_MODEL.rootNucleus[language]}</p>
    </div>
  </section>
}

function ComponentBreakdown({ components, language }) {
  if (!components?.length) return null
  return <section className="morph-components">
    {components.map((component, index) => <div className="morph-fact" key={index}>
      <p className="morph-fact-label">
        <span className={'morph-dot morph-' + component.role} aria-hidden="true" />
        {MORPH_ROLES[component.role][language]}
      </p>
      <div className="morph-fact-main">
        <div className="morph-arabic-pair">
          <span className={'morph-fact-arabic morph-' + component.role} lang="ar" dir="rtl">{component.ar}</span>
          {component.reading && <small className="transliteration" lang="ar-Latn" dir="ltr">{component.reading}</small>}
        </div>
        {component[language] && <p>{component[language]}</p>}
      </div>
    </div>)}
  </section>
}

function DerivedFrom({ source, language }) {
  if (!source) return null
  const c = MORPH_COPY[language]
  return <section className="morph-derived">
    <p className="morph-block-label">{c.derivedFrom}</p>
    <div className="morph-derived-source">
      <div className="morph-arabic-pair">
        <span lang="ar" dir="rtl">{source.ar}</span>
        {source.reading && <small className="transliteration" lang="ar-Latn" dir="ltr">{source.reading}</small>}
      </div>
      <small>{language === 'ru' ? source.metaRu : source.metaEn}</small>
    </div>
  </section>
}

function PatternEffect({ pattern, language }) {
  const c = MORPH_COPY[language]
  const copy = pattern[language]
  return <section className="morph-pattern-effect">
    <p className="morph-block-label">{c.patternEffect}</p>
    <div className="morph-pattern-heading">
      <div className="morph-arabic-pair">
        <span lang="ar" dir="rtl">{pattern.ar}</span>
        {pattern.reading && <small className="transliteration" lang="ar-Latn" dir="ltr">{pattern.reading}</small>}
      </div>
      <strong>{copy.title}</strong>
    </div>
    {copy.text && <p>{copy.text}</p>}
  </section>
}

function TaqwaForm({ profile, language }) {
  const c = MORPH_COPY[language]
  const copy = profile.pattern[language]
  return <section className="morph-taqwa-form">
    <p className="morph-block-label">{c.form}</p>
    <div className="morph-pattern-heading">
      <div className="morph-arabic-pair">
        <span lang="ar" dir="rtl">{profile.pattern.ar}</span>
        <small className="transliteration" lang="ar-Latn" dir="ltr">{profile.pattern.reading}</small>
      </div>
      <strong>{copy.title}</strong>
    </div>
  </section>
}

function WordFormation({ profile, language }) {
  const c = MORPH_COPY[language]
  const evolution = profile.evolution || []
  if (!evolution.length) return null

  return <section className="morph-formation">
    <p className="morph-block-label">{c.wordFormation}</p>
    {profile.formation?.[language] && <p className="morph-formation-explanation">{profile.formation[language]}</p>}
    <div className="morph-evolution" aria-label={c.evolution}>
      {evolution.map((step, index) => <div className="morph-evolution-row" key={step.ar + index}>
        <div className="morph-evolution-word">
          <span lang="ar" dir="rtl">{step.ar}</span>
          <small className="transliteration" lang="ar-Latn" dir="ltr">{step.reading}</small>
        </div>
        <small className="morph-evolution-meta">{language === 'ru' ? step.metaRu : step.metaEn}</small>
        {index < evolution.length - 1 && <span className="morph-evolution-arrow" aria-hidden="true">↓</span>}
      </div>)}
    </div>
  </section>
}

function MorphologyStructure({ word, content, language, onPick }) {
  const profile = MORPHOLOGY[word.id]
  if (!profile) return null

  return <div className="entry-copy morphology-entry">
    <MorphFormula word={word} profile={profile} language={language} />
    <RootBreakdown language={language} />
    <ComponentBreakdown components={profile.components} language={language} />
    {word.id === 'taqwa' && <TaqwaForm profile={profile} language={language} />}
    {word.id === 'taqwa'
      ? <WordFormation profile={profile} language={language} />
      : <>
          <DerivedFrom source={profile.derivedFrom} language={language} />
          <PatternEffect pattern={profile.pattern} language={language} />
          <WordFormation profile={profile} language={language} />
        </>}


    {word.lexicalOnly && <p className="entry-note">{COPY[language].lexicalNote}</p>}
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

function MeaningMap({ levels, language }) {
  if (!levels?.length) return null
  return <section className="meaning-map">
    {levels.map(level => {
      const copy = level[language]
      return <section className={'meaning-class meaning-class-' + level.id} key={level.id}>
        <header>
          <p className="meaning-class-label">{copy.title}</p>
          <p className="meaning-class-description">{copy.description}</p>
        </header>
        <div className="meaning-term-list">
          {copy.items.map((item, index) => <div className="meaning-term-step" key={item.term + index}>
            <article className="meaning-term">
              <h4>{item.term}</h4>
              <p>{item.definition}</p>
            </article>
            {item.connector && <div className="meaning-connector" aria-label={item.connector}>
              <span aria-hidden="true">↓</span>
              <small>{item.connector}</small>
            </div>}
          </div>)}
        </div>
      </section>
    })}
  </section>
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

export function WordDetails({ word, panel, language, onPick, onOpenAyah }) {
  const t = COPY[language]
  const content = WORD_CONTENT[word.id]
  if (panel === 'quran') {
    const occurrences = OCCURRENCES[word.id] || []
    const groups = groupOccurrences(word.id)
    const verses = new Set(occurrences.map(item => item.sura + ':' + item.ayah)).size
    return <div className="entry-copy quran-occurrences">
      {word.lexicalOnly ? <p>{t.lexicalQuran}</p> : <>
        <h3>{t.references}</h3>
        <p className="occurrence-summary">{t.occurrenceCount}: <strong>{occurrences.length}</strong><span> · </span>{t.verseCount}: <strong>{verses}</strong></p>
        {content.occurrenceNote && <p className="entry-note annotation-note">{content.occurrenceNote[language]}</p>}
        <p className="entry-note quran-navigation-note">{t.referenceNote}</p>
        <div className="reference-groups quran-reference-groups">{groups.map(({ sura, items }) => <details key={sura} open={occurrences.length <= 20}>
          <summary>{t.sura} {sura}<span>{items.length}</span></summary>
          <div className="quran-reference-grid">{items.map(item => {
            const reference = item.sura + ':' + item.ayah
            const isPrototype = reference === '2:197'
            return <button key={item.ayah + ':' + item.word} onClick={() => onOpenAyah?.(item)}
              className={isPrototype ? 'has-prototype' : ''} aria-label={t.openVerse + ' ' + reference}>
              <span>{reference}</span>
              {isPrototype && <small>{language === 'ru' ? 'разбор' : 'study'}</small>}
            </button>
          })}</div>
        </details>)}</div>
      </>}
      {word.id === 'tuqat' && <section><h3>{t.linkedPassage}</h3><p className="entry-note">{t.tuqatCrossReference}</p></section>}
      <a className="quran-source-link" href="https://quran.gtaf.org/" target="_blank" rel="noopener noreferrer">
        Al Quran · Greentech <span aria-hidden="true">↗</span>
      </a>
    </div>
  }
  if (panel === 'structure') return <MorphologyStructure word={word} content={content} language={language} onPick={onPick} />
  if (panel === 'meaning') return <div className="entry-copy">
    <p className="entry-status">{t.semanticStatus}</p>
    <p className="entry-lead">{content.meaning[language].lead}</p><p>{content.meaning[language].body}</p>
    {content.distinction?.[language] && <section className="meaning-distinction">
      <p className="meaning-distinction-label">{language === 'ru' ? 'Чем отличается' : 'How it differs'}</p>
      <p>{content.distinction[language]}</p>
    </section>}
    <MeaningMap levels={content.meaningMap} language={language} />
    {content.translationNotes?.[language]?.length && <section className="translation-notes">
      {content.translationNotes[language].map((note, index) => <article className={'translation-note translation-note-' + note.tone} key={note.title + index}>
        <h4>{note.title}</h4>
        <p>{note.text}</p>
      </article>)}
    </section>}
    <p className="entry-note">{t.meaningNote}</p>
    <RelatedWords ids={content.related} language={language} onPick={onPick} />
    <SourceLinks ids={content.meaningSources} language={language} />
  </div>
  return null
}
