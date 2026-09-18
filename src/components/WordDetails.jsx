import { COPY, FORMS } from '../demo.js'
import { CONTENT_SOURCES, ROOT_CONTENT, WORD_CONTENT } from '../rootContent.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT, groupOccurrences } from '../occurrences.js'\nimport { WQY_PUBLIC_MODEL } from '../canonicalWqy.js'
import './WordDetails.css'

function SourceLinks({ ids, language }) {
  return <footer className="entry-sources"><h3>{COPY[language].sources}</h3>{ids.map(id => {
    const source = CONTENT_SOURCES[id]
    return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source[language]}<span aria-hidden="true">↗</span></a>
  })}</footer>
}

function ModelStatus({ language }) {
  const ru = language === 'ru'
  const review = ru
    ? `Модель ${WQY_PUBLIC_MODEL.modelVersion} · проверено человеком · экспертная проверка не завершена`
    : `Model ${WQY_PUBLIC_MODEL.modelVersion} · human reviewed · scholar review pending`
  return <p className="model-status">{review}</p>
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
      <h3>Translation Fidelity</h3>
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
  if (panel === 'structure') return <div className="entry-copy">
    <dl className="structure-list"><div><dt>{t.root}</dt><dd lang="ar" dir="rtl">و ق ي</dd></div>
      <div><dt>{t.wordType}</dt><dd>{t[word.type]}</dd></div>
      <div><dt>{t.familyLabel}</dt><dd>{word.orbit}</dd></div>
      <div><dt>{t.pattern}</dt><dd><span className="pattern-arabic" lang="ar" dir="rtl">{content.pattern}</span>
        <small className="transliteration" lang="ar-Latn" dir="ltr">{content.patternReading}</small></dd></div></dl>
    <h3>{t.formation}</h3>{content.structure[language].map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {word.lexicalOnly && <p className="entry-note">{t.lexicalNote}</p>}
    <RelatedWords ids={content.related} language={language} onPick={onPick} />
    <SourceLinks ids={content.structureSources} language={language} />
  </div>
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
