import { useState } from 'react'
import { COPY, FORMS } from '../demo.js'
import { CONTENT_SOURCES, ROOT_CONTENT, WORD_CONTENT, LBB_ROOT_CONTENT, LBB_WORD_CONTENT, LBB_DERIVATION_NOTES } from '../rootContent.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT, rootOccurrenceCount, groupOccurrences } from '../occurrences.js'
import { WQY_PUBLIC_MODEL } from '../canonicalWqy.js'
import { MORPH_COPY, MORPH_ROLES, MORPHOLOGY } from '../morphologyWqy.js'
import './WordDetails.css'

function MixedScriptText({ text, language }) {
  if (text == null) return null
  const value = String(text)
  if (language !== 'ru') return value
  const parts = value.split(/([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+|[A-Za-zĀ-žʿʾ'’-]+)/g)
  return parts.map((part, index) => {
    if (!part) return null
    if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(part)) {
      return <bdi className="inline-arabic" lang="ar" dir="rtl" key={index}>{part}</bdi>
    }
    if (/[A-Za-zĀ-žʿʾ]/.test(part)) {
      return <bdi className="inline-latin" dir="ltr" key={index}>{part}</bdi>
    }
    return part
  })
}

function MeaningText({ text, language }) {
  if (text == null) return null
  let value = String(text)
  if (language === 'ru') {
    value = value
      .replace(/\s*\(([A-Za-zĀ-žʿʾ'’-]+)\)/g, '')
      .replace(/\bmīm\b/gi, 'م')
  }
  return <MixedScriptText text={value} language={language} />
}


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

function RootBreakdown({ language, word }) {
  const c = MORPH_COPY[language]
  const isLbb = word?.rootKey === 'lbb'
  const rootArabic = isLbb ? 'ل ب ب' : 'و ق ي'
  const rootReading = isLbb ? 'l-b-b' : 'w-q-y'
  const nucleus = isLbb ? LBB_ROOT_CONTENT.rootNucleus[language] : WQY_PUBLIC_MODEL.rootNucleus[language]
  return <section className="morph-fact morph-root-fact">
    <p className="morph-fact-label">{c.root}</p>
    <div className="morph-fact-main">
      <div className="morph-arabic-pair">
        <span className="morph-fact-arabic morph-root" lang="ar" dir="rtl">{rootArabic}</span>
        <small className="transliteration" lang="ar-Latn" dir="ltr">{rootReading}</small>
      </div>
      <p><MixedScriptText text={nucleus} language={language} /></p>
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
        {component[language] && <p><MixedScriptText text={component[language]} language={language} /></p>}
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
    {copy.text && <p><MixedScriptText text={copy.text} language={language} /></p>}
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
    {profile.formation?.[language] && <p className="morph-formation-explanation"><MixedScriptText text={profile.formation[language]} language={language} /></p>}
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

function firstSentence(text = '') {
  const match = text.trim().match(/^.*?[.!?](?:\s|$)/)
  return match ? match[0].trim() : text
}

function MorphBoardArabic({ profile }) {
  return <span className="morph-board-target-word" lang="ar" dir="rtl" aria-label={profile.displayArabic}>
    {profile.visualParts.map((part, index) =>
      <span key={index} className={'morph-board-part morph-board-' + part.role + (part.mark ? ' morph-board-part-with-mark' : '')}>
        {part.text}
        {part.mark === 'kasratan' && <i className="morph-board-kasratan-mark" aria-hidden="true"><b /><b /></i>}
      </span>
    )}
  </span>
}

function MorphBoardCallout({ label, ar, reading, text, tone = 'quiet', expandable = false }) {
  if (!label && !ar && !text) return null
  const body = <div className="morph-board-callout-body">
    {(ar || reading) && <div className="morph-board-callout-term">
      {ar && <span lang="ar" dir="rtl">{ar}</span>}
      {reading && <small className="transliteration" lang="ar-Latn" dir="ltr">{reading}</small>}
    </div>}
    {text && <p>{text}</p>}
  </div>

  if (expandable && text) {
    return <details className={'morph-board-callout morph-board-callout-' + tone}>
      <summary>
        <span>{label}</span>
        {ar && <b lang="ar" dir="rtl">{ar}</b>}
        <i aria-hidden="true">+</i>
      </summary>
      {body}
    </details>
  }

  return <aside className={'morph-board-callout morph-board-callout-' + tone}>
    {label && <p className="morph-board-callout-label">{label}</p>}
    {body}
  </aside>
}

function MorphBoard({ word, profile, language }) {
  const c = MORPH_COPY[language]
  const ru = language === 'ru'
  const isLbb = word?.rootKey === 'lbb'
  const rootStep = isLbb
    ? { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' }
    : { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' }
  const rawSteps = profile.evolution?.length
    ? profile.evolution
    : [rootStep, {
        ar: profile.displayArabic,
        reading: word.reading,
        metaRu: profile.pattern?.ru?.title || 'слово',
        metaEn: profile.pattern?.en?.title || 'word',
      }]
  const expectedRoot = rootStep.ar.replace(/\s/g, '')
  const steps = rawSteps[0]?.ar?.replace(/\s/g, '') === expectedRoot ? rawSteps : [rootStep, ...rawSteps]
  const lastIndex = steps.length - 1
  const patternCopy = profile.pattern?.[language]
  const patternText = patternCopy?.text || ''
  const derivedText = profile.derivedFrom?.[language] || ''
  const formationText = profile.formation?.[language] || ''
  const componentCopy = profile.components || []

  return <section className="morph-board" aria-label={c.analysis}>
    <header className="morph-board-header">
      <p>{ru ? 'Визуальная морфология' : 'Visual morphology'}</p>
      <h3>{ru ? 'Структура слова' : 'Word structure'}</h3>
    </header>

    <div className="morph-board-canvas">
      <div className="morph-board-flow">
        {steps.map((step, index) => {
          const isRoot = index === 0
          const isTarget = index === lastIndex
          const isSource = !isRoot && !isTarget && profile.derivedFrom && step.ar === profile.derivedFrom.ar
          return <div className={'morph-board-flow-unit' + (isTarget ? ' is-target-unit' : '')} key={step.ar + index}>
            <article className={'morph-board-node' + (isRoot ? ' is-root' : '') + (isTarget ? ' is-target' : '')}>
              <div className="morph-board-node-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{isRoot ? c.root : (ru ? step.metaRu : step.metaEn)}</small>
              </div>
              <div className="morph-board-node-word">
                {isTarget
                  ? <MorphBoardArabic profile={profile} />
                  : <span lang="ar" dir="rtl">{step.ar}</span>}
                {step.reading && <small className="transliteration" lang="ar-Latn" dir="ltr">{step.reading}</small>}
              </div>

              {isRoot && <MorphBoardCallout
                label={ru ? 'Смысл корня' : 'Root meaning'}
                text={isLbb ? LBB_ROOT_CONTENT.rootNucleus[language] : WQY_PUBLIC_MODEL.rootNucleus[language]}
              />}

              {isSource && derivedText && <MorphBoardCallout
                label={ru ? 'Изменение' : 'Change'}
                text={firstSentence(derivedText)}
              />}

              {isTarget && <div className="morph-board-target-notes">
                {profile.pattern && <MorphBoardCallout
                  label={patternCopy?.title || (ru ? 'Форма' : 'Form')}
                  ar={profile.pattern.ar}
                  reading={profile.pattern.reading}
                  text={patternText}
                  tone="accent"
                  expandable={patternText.length > 120}
                />}

                {profile.transformation && <MorphBoardCallout
                  label={ru ? 'Изменение формы' : 'Form change'}
                  ar={profile.transformation.result}
                  text={profile.transformation[language]}
                  tone="accent"
                />}

                {componentCopy.map((component, componentIndex) => <MorphBoardCallout
                  key={component.ar + componentIndex}
                  label={MORPH_ROLES[component.role][language]}
                  ar={component.ar}
                  reading={component.reading}
                  text={component[language]}
                  tone={component.role === 'ending' ? 'soft' : 'accent'}
                />)}

                {formationText && <MorphBoardCallout
                  label={ru ? 'Результат' : 'Result'}
                  text={formationText}
                  tone="soft"
                  expandable={formationText.length > 130}
                />}
              </div>}
            </article>

            {index < lastIndex && <div className="morph-board-connector" aria-hidden="true">
              <i className="morph-board-connector-dot" />
              <span className="morph-board-connector-line" />
              <b className="morph-board-connector-arrow">↓</b>
            </div>}
          </div>
        })}
      </div>

      <div className="morph-board-key" aria-label={ru ? 'Условные обозначения' : 'Legend'}>
        <span><i className="key-root" />{ru ? 'корневые буквы' : 'root letters'}</span>
        <span><i className="key-added" />{ru ? 'добавленная структура' : 'added structure'}</span>
        {componentCopy.some(item => item.role === 'ending') && <span><i className="key-ending" />{ru ? 'окончание' : 'ending'}</span>}
      </div>
    </div>
  </section>
}

function MorphologyStructure({ word, content, language, onPick }) {
  const profile = MORPHOLOGY[word.id]
  const [structureView, setStructureView] = useState('neon')
  if (!profile) return null
  const ru = language === 'ru'
  const isBoard = structureView === 'board'

  return <div className={'entry-copy morphology-entry ' + (isBoard ? 'morphology-entry-board' : 'morphology-entry-neon')}>
    <nav className="morph-view-tabs" aria-label={ru ? 'Вид строения слова' : 'Word structure view'}>
      <button
        type="button"
        className={!isBoard ? 'is-active' : ''}
        aria-pressed={!isBoard}
        onClick={() => setStructureView('neon')}
      >{ru ? 'Разбор' : 'Analysis'}</button>
      <button
        type="button"
        className={isBoard ? 'is-active' : ''}
        aria-pressed={isBoard}
        onClick={() => setStructureView('board')}
      >{ru ? 'Схема' : 'Diagram'}</button>
    </nav>

    {!isBoard ? <div className="morph-view-neon">
      <MorphFormula word={word} profile={profile} language={language} />
      <RootBreakdown language={language} word={word} />
      <ComponentBreakdown components={profile.components} language={language} />
      {word.id === 'taqwa' && <TaqwaForm profile={profile} language={language} />}
      {word.id === 'taqwa'
        ? <WordFormation profile={profile} language={language} />
        : <>
            <DerivedFrom source={profile.derivedFrom} language={language} />
            <PatternEffect pattern={profile.pattern} language={language} />
          </>}
    </div> : <div className="morph-view-board">
      <MorphBoard word={word} profile={profile} language={language} />
    </div>}

    {word.lexicalOnly && <p className="entry-note">{COPY[language].lexicalNote}</p>}
    <RelatedWords ids={content.related} language={language} onPick={onPick} />
    <SourceLinks ids={content.structureSources} language={language} />
  </div>
}


function LbbRootRelation({ word, language }) {
  if (word?.rootKey !== 'lbb') return null
  const note = LBB_DERIVATION_NOTES[word.id]
  if (!note) return null
  const ru = language === 'ru'
  return <section className="meaning-plain-section meaning-root-link">
    <h3>{ru ? 'Связь с корнем' : 'Connection to the root'}</h3>
    <p><MeaningText text={ru ? note.connectionRu : note.connectionEn} language={language} /></p>
  </section>
}

function LbbStructureNote({ word, language }) {
  const note = LBB_DERIVATION_NOTES[word.id]
  if (!note?.formRu && !note?.formEn) return null
  return <section className="meaning-distinction">
    <p className="meaning-distinction-label">{language === 'ru' ? 'Функция формы' : 'Form function'}</p>
    <p><MixedScriptText text={language === 'ru' ? note.formRu : note.formEn} language={language} /></p>
  </section>
}

function MimMeaningNote({ word, language }) {
  if (!word?.arabic) return null
  const ru = language === 'ru'
  const arabic = word.arabic.replace(/^ٱ/, 'ا')

  if (arabic.startsWith('مُ')) {
    const text = ru
      ? 'مُـ показывает носителя смысла корня: того, кто этим качеством обладает или в ком это действие проявляется.'
      : 'مُـ points to the bearer of the root meaning: the one who possesses the quality or in whom the action appears.'
    return <section className="meaning-plain-section meaning-prefix-note">
      <h3>{ru ? 'Что добавляет مُـ' : 'What مُـ adds'}</h3>
      <p><MeaningText text={text} language={language} /></p>
    </section>
  }

  if (arabic.startsWith('مَ')) {
    const text = ru
      ? 'مَـ показывает место проявления смысла корня: место, предмет или носитель, на котором действие проявилось и закрепилось.'
      : 'مَـ points to the locus where the root meaning appears: a place, object, or bearer on which the action appears and becomes established.'
    return <section className="meaning-plain-section meaning-prefix-note">
      <h3>{ru ? 'Что добавляет مَـ' : 'What مَـ adds'}</h3>
      <p><MeaningText text={text} language={language} /></p>
    </section>
  }

  return null
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
          <p className="meaning-class-description"><MixedScriptText text={copy.description} language={language} /></p>
        </header>
        <div className="meaning-term-list">
          {copy.items.map((item, index) => <div className="meaning-term-step" key={item.term + index}>
            <article className="meaning-term">
              <h4><MixedScriptText text={item.term} language={language} /></h4>
              <p><MixedScriptText text={item.definition} language={language} /></p>
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

function ModelStatus({ language, rootKey = 'wqy' }) {
  const ru = language === 'ru'
  const review = ru
    ? 'Рабочая модель · проверено человеком · экспертная проверка впереди'
    : 'Working model · human reviewed · scholar review pending'
  return <p className="model-status" title={rootKey === 'wqy' ? WQY_PUBLIC_MODEL.modelVersion : undefined}>{review}</p>
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

export function RootDetails({ language, rootKey = 'wqy' }) {
  const t = COPY[language]
  const isLbb = rootKey === 'lbb'
  const content = isLbb ? LBB_ROOT_CONTENT : ROOT_CONTENT
  const count = isLbb ? rootOccurrenceCount('lbb') : ROOT_OCCURRENCE_COUNT
  if (isLbb) return <div className="entry-copy">
    <p className="entry-lead">{content[language].lead}</p><p>{content[language].body}</p>
    <p className="occurrence-summary">{t.occurrenceCount}: <strong>{count}</strong></p>
    <SourceLinks ids={content.sources} language={language} />
  </div>
  return <div className="entry-copy"><p className="entry-status">{t.semanticStatus}</p><ModelStatus language={language} rootKey={rootKey} />
    <p className="entry-lead">{content[language].lead}</p><p>{content[language].body}</p>
    <p className="occurrence-summary">{t.occurrenceCount}: <strong>{count}</strong></p>
    <p className="entry-note">{t.rootScope}</p><p className="entry-note">{t.formsNote}</p>
    <SourceLinks ids={[...content.sources, 'corpus']} language={language} />
  </div>
}

export function WordDetails({ word, panel, language, onPick, onOpenAyah }) {
  const t = COPY[language]
  const storedContent = word.rootKey === 'lbb' ? LBB_WORD_CONTENT[word.id] : WORD_CONTENT[word.id]
  const content = storedContent || (word.rootKey === 'lbb' ? {
    meaning: {
      ru: { lead: word.definitionRu || 'Словарная форма корня ل ب ب.', body: '' },
      en: { lead: word.definitionEn || 'A lexical form of the root ل ب ب.', body: '' },
    },
    meaningMap: [],
    structureSources: ['laneLbb', 'arabicLexiconLbb'],
    meaningSources: ['laneLbb', 'arabicLexiconLbb'],
    related: [],
  } : null)
  if (!content) return null
  if (panel === 'quran') {
    const occurrences = OCCURRENCES[word.id] || []
    const groups = groupOccurrences(word.id)
    const verses = new Set(occurrences.map(item => item.sura + ':' + item.ayah)).size
    return <div className="entry-copy quran-occurrences">
      {!occurrences.length ? <p>{language === 'ru'
        ? 'Эта форма в Коране не встречается.'
        : 'This form does not occur in the Quran.'}</p> : <>
        <h3>{t.references}</h3>
        <p className="occurrence-summary">{t.occurrenceCount}: <strong>{occurrences.length}</strong><span> · </span>{t.verseCount}: <strong>{verses}</strong></p>
        {content.occurrenceNote && <p className="entry-note annotation-note">{content.occurrenceNote[language]}</p>}
        <p className="entry-note quran-navigation-note">{t.referenceNote}</p>
        <div className="reference-groups quran-reference-groups">{groups.map(({ sura, items }) => {
          const verseItems = [...new Map(items.map(item => [item.ayah, item])).values()]
          return <details key={sura} open={occurrences.length <= 20}>
            <summary>{t.sura} {sura}<span>{verseItems.length}</span></summary>
            <div className="quran-reference-grid">{verseItems.map(item => {
              const reference = item.sura + ':' + item.ayah
              const isPrototype = reference === '2:197'
              return <button key={reference} onClick={() => onOpenAyah?.(item)} disabled={!isPrototype}
                className={isPrototype ? 'has-prototype' : ''} aria-label={t.openVerse + ' ' + reference}>
                <span>{reference}</span>
                {isPrototype && <small>{language === 'ru' ? 'разбор' : 'study'}</small>}
              </button>
            })}</div>
          </details>
        })}</div>
      </>}
      {word.id === 'tuqat' && <section><h3>{t.linkedPassage}</h3><p className="entry-note">{t.tuqatCrossReference}</p></section>}
      <a className="quran-source-link" href="https://quran.gtaf.org/" target="_blank" rel="noopener noreferrer">
        Al Quran · Greentech <span aria-hidden="true">↗</span>
      </a>
    </div>
  }
  if (panel === 'structure') {
    if (!MORPHOLOGY[word.id] && word.rootKey === 'lbb') return <div className="entry-copy">
      <p className="entry-lead">{word.arabic} <span className="transliteration" lang="ar-Latn" dir="ltr">{word.reading}</span></p>
      <p><MixedScriptText text={language === 'ru' ? word.definitionRu : word.definitionEn} language={language} /></p>
      <LbbStructureNote word={word} language={language} />
      <SourceLinks ids={content.structureSources} language={language} />
    </div>
    return <MorphologyStructure word={word} content={content} language={language} onPick={onPick} />
  }
  if (panel === 'meaning') {
    const isLbb = word.rootKey === 'lbb'
    return <div className={'entry-copy meaning-entry' + (isLbb ? ' meaning-entry-lbb' : '')}>
      {!isLbb && <p className="entry-status">{t.semanticStatus}</p>}

      <section className="meaning-primary">
        <p className="meaning-primary-label">{language === 'ru' ? 'Значение' : 'Meaning'}</p>
        <p className="entry-lead"><MeaningText text={isLbb ? (language === 'ru' ? word.definitionRu : word.definitionEn) : content.meaning[language].lead} language={language} /></p>
      </section>

      {isLbb ? <>
        <LbbRootRelation word={word} language={language} />
        <MimMeaningNote word={word} language={language} />
      </> : content.meaning[language].body
        ? <p className="meaning-primary-body"><MeaningText text={content.meaning[language].body} language={language} /></p>
        : null}

      {content.distinction?.[language] && <section className="meaning-plain-section">
        <h3>{language === 'ru' ? 'Чем отличается' : 'How it differs'}</h3>
        <p><MeaningText text={content.distinction[language]} language={language} /></p>
      </section>}

      <MeaningMap levels={content.meaningMap} language={language} />

      {content.translationNotes?.[language]?.length && <section className="translation-notes">
        {content.translationNotes[language].map((note, index) => <article className={'translation-note translation-note-' + note.tone} key={note.title + index}>
          <h4>{note.title}</h4>
          <p><MeaningText text={note.text} language={language} /></p>
        </article>)}
      </section>}

      {!isLbb && <p className="entry-note">{t.meaningNote}</p>}
      <RelatedWords ids={content.related} language={language} onPick={onPick} />
      <SourceLinks ids={content.meaningSources} language={language} />
    </div>
  }
  return null
}
