import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { getSyntaxPresentation } from '../syntaxPresentation.js'
import { SYNTAX_TERMS, STEP_ROLES } from '../syntaxTerms.js'

export function SyntaxView({ ayah, selectedWord, language }) {
  const ru = language === 'ru'
  const model = useMemo(() => getSyntaxPresentation(ayah), [ayah])
  const covered = model && selectedWord >= model.range[0] && selectedWord <= model.range[1]
  const [explore, setExplore] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [geometry, setGeometry] = useState(null)
  const clauseRef = useRef(null)
  const wordRefs = useRef({})
  const marker = useId().replace(/:/g, '')
  const enabled = model && (covered || explore)
  const step = enabled ? model.steps[stepIndex] : null

  const roles = enabled && step ? STEP_ROLES[step.id] : []
  const relationTerms = step
    ? (step.id === 'inna' ? ['inna', 'ismInna'] : step.id === 'idafa' ? ['idafa', 'mudaf', 'mudafIlayhi'] : ['khabarInna'])
    : []
  const term = SYNTAX_TERMS[selectedTerm]
  const detailId = marker + '-term'
  function changeStep(index) { setStepIndex(index); setSelectedTerm(null) }
  function termButton(id, label) {
    const item = SYNTAX_TERMS[id]
    return <button type="button" key={id} className={'syntax-term tone-' + item.tone}
      aria-expanded={selectedTerm === id} aria-controls={detailId}
      onClick={() => setSelectedTerm(current => current === id ? null : id)}>{label || item.ar}</button>
  }
  function explainTerms(text) {
    const aliases = Object.entries(SYNTAX_TERMS).flatMap(([id, item]) => item.aliases.map(alias => ({id, alias}))).sort((a,b) => b.alias.length - a.alias.length)
    const pieces = []
    let pos = 0
    while (pos < text.length) {
      const found = aliases.map(a => ({...a, at:text.indexOf(a.alias,pos)})).filter(a => a.at >= 0).sort((a,b) => a.at-b.at || b.alias.length-a.alias.length)[0]
      if (!found) { pieces.push(text.slice(pos)); break }
      pieces.push(text.slice(pos,found.at))
      pieces.push(<span key={found.at}>{termButton(found.id,found.alias)}</span>)
      pos = found.at + found.alias.length
    }
    return pieces
  }

  useLayoutEffect(() => {
    const element = clauseRef.current
    if (!element) return
    let alive = true
    const measure = () => {
      if (!alive) return
      const rect = element.getBoundingClientRect()
      const points = {}
      Object.entries(wordRefs.current).forEach(([index, word]) => {
        if (!word) return
        const r = word.getBoundingClientRect()
        points[index] = { x: r.left - rect.left + r.width / 2, left: r.left - rect.left, right: r.right - rect.left }
      })
      setGeometry({ width: rect.width, points })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    document.fonts?.ready.then(measure)
    return () => { alive = false; observer.disconnect() }
  }, [enabled, ayah])

  function chooseWord(index) {
    const next = model.steps.findIndex(s => s.to === index)
    changeStep(next < 0 ? 0 : next)
  }
  const plainWords = (from, to) => ayah.tokens.slice(from - 1, to).map((token, i) =>
    <span key={from + i} className={selectedWord === from + i ? 'syntax-entry' : ''}>{token.ar}{' '}</span>)

  return <section className="syntax-notebook" onClick={event => event.stopPropagation()}>
    <header className="syntax-heading">
      <span>{ru ? 'Синтаксис' : 'Syntax'}</span><small>{ayah.reference}</small>
    </header>
    <p className="syntax-reading-hint">{ru ? 'Как слова соединяются в предложение' : 'How words form a sentence'}</p>
    <div className="syntax-verse" lang="ar" dir="rtl" aria-label={ru ? 'Разбираемая фраза' : 'Phrase under analysis'}>
      {enabled ? <>
        <div className="syntax-clause" ref={clauseRef}>
          <div className="syntax-clause-words">
            {ayah.tokens.slice(model.range[0] - 1, model.range[1]).map((token, i) => {
              const index = model.range[0] + i
              const active = step?.active.includes(index)
              const wordRoles = roles.filter(r => r.word === index)
              const highlighted = term ? term.words.includes(index) : active
              return <div key={index} className={'syntax-word-zone' + (highlighted ? ' is-highlighted' : '') + (term && !highlighted ? ' is-muted' : '') + ' tone-' + (wordRoles[0] ? SYNTAX_TERMS[wordRoles[0].term].tone : 'a')}>
              <button ref={el => { wordRefs.current[index] = el }}
                className={'syntax-word' + (active ? ' is-active' : '') + (index === selectedWord ? ' is-entry' : '')}
                onClick={() => chooseWord(index)} aria-pressed={!!active}>{token.ar}</button>
              <div className="syntax-word-roles">{wordRoles.map(r => termButton(r.term))}</div>
              </div>
            })}
          </div>
          {geometry && step && <svg className="syntax-connectors"
            viewBox={`0 0 ${geometry.width} 124`} style={{ height: 124 }} role="group"
            aria-label={ru ? 'Грамматические связи' : 'Grammatical relationships'} dir="ltr">
            <defs><marker id={marker} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M1 1L6 3.5L1 6" fill="none" stroke="currentColor" strokeWidth="1" /></marker></defs>
            {[step].map(s => {
              const i = model.steps.indexOf(s)
              const from = geometry.points[s.from], to = geometry.points[s.to]
              if (!from || !to) return null
              const x = s.group ? (geometry.points[s.group[0]].right + geometry.points[s.group[1]].left) / 2 : from.x
              const depth = 48
              const path = `M ${x} 3 C ${x} ${depth}, ${to.x} ${depth}, ${to.x} 3`
              return <g key={s.id}>
                {s.group && <path className="syntax-group-line" d={`M ${geometry.points[24].right - 4} 0 H ${geometry.points[25].left + 4}`} />}
                <path className="syntax-link" d={path} markerEnd={`url(#${marker})`} />
                <path className="syntax-link-hit" d={path} role="button" tabIndex="0"
                  aria-label={`${i + 1}. ${s.tr}`} onClick={() => changeStep(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); changeStep(i) } }} />
              </g>
            })}
          </svg>}
          {step && <div className="syntax-relation-labels" aria-label={ru ? 'Текущая грамматическая связь' : 'Current grammatical relationship'}>
            {relationTerms.map(id => <div key={id}>{termButton(id)}<small>{SYNTAX_TERMS[id].tr}</small></div>)}
          </div>}
        </div>
      </> : <div className="syntax-verse-context">{plainWords(selectedWord, selectedWord)}</div>}
    </div>

    {enabled ? <>
      <nav className="syntax-step-nav" aria-label={ru ? 'Шаги синтаксического разбора' : 'Syntax steps'} dir="ltr">
        <button disabled={stepIndex === 0} onClick={() => changeStep(stepIndex - 1)} aria-label={ru ? 'Предыдущий шаг' : 'Previous step'}>‹</button>
        <span>{stepIndex + 1} / {model.steps.length}</span>
        <button disabled={stepIndex === model.steps.length - 1} onClick={() => changeStep(stepIndex + 1)} aria-label={ru ? 'Следующий шаг' : 'Next step'}>›</button>
      </nav>
      {step && <>
        <div className="syntax-explanation" aria-live="polite" aria-atomic="true">
          <p>{explainTerms(step[language])}</p>
        </div>
        <p className="syntax-term-hint">{ru ? 'Нажмите на термин — его участок выделится, а ниже откроется пояснение.' : 'Tap a term to highlight its words and read the explanation below.'}</p>
        <div id={detailId} className="syntax-term-detail" aria-live="polite">
          {term && <>
            <header><h3><span lang="ar" dir="rtl">{term.ar}</span><small>{term.tr}</small></h3>
              <button aria-label={ru ? 'Закрыть пояснение термина' : 'Close term explanation'} onClick={() => setSelectedTerm(null)}>×</button></header>
            <div className="syntax-term-example" lang="ar" dir="rtl">{term.words.map(i => ayah.tokens[i-1].ar).join(' ')}</div>
            <div className="syntax-term-example-tr">{term.words.map(i => ayah.tokens[i-1].tr).join(' · ')}</div>
            {term[language].map((text,i) => <p key={i}>{explainTerms(text)}</p>)}
          </>}
        </div>
        <p className="syntax-coverage">{ru ? 'Пока разобрана конструкция 2:197:23–26. Связи остальных слов ещё не добавлены.' : 'This analysis covers 2:197:23–26. Relationships for the remaining words have not been added yet.'}</p>
      </>}
    </> : <div className="syntax-empty">
      <p>{ru ? 'Для выбранного слова связи пока не подтверждены.' : 'Relationships for this word are not yet confirmed.'}</p>
      {model && <button onClick={() => setExplore(true)}>{ru ? 'Посмотреть разбор конструкции с إِنَّ' : 'Explore the clause with إِنَّ'}</button>}
    </div>}
  </section>
}
