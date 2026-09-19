import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { getSyntaxPresentation } from '../syntaxPresentation.js'

export function SyntaxView({ ayah, selectedWord, language }) {
  const ru = language === 'ru'
  const model = useMemo(() => getSyntaxPresentation(ayah), [ayah])
  const covered = model && selectedWord >= model.range[0] && selectedWord <= model.range[1]
  const [explore, setExplore] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [geometry, setGeometry] = useState(null)
  const clauseRef = useRef(null)
  const wordRefs = useRef({})
  const marker = useId().replace(/:/g, '')
  const enabled = model && (covered || explore)
  const overview = enabled && stepIndex === model.steps.length
  const step = enabled && !overview ? model.steps[stepIndex] : null

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
    setStepIndex(next < 0 ? 0 : next)
  }
  const plainWords = (from, to) => ayah.tokens.slice(from - 1, to).map((token, i) =>
    <span key={from + i} className={selectedWord === from + i ? 'syntax-entry' : ''}>{token.ar}{' '}</span>)

  return <section className="syntax-notebook" onClick={event => event.stopPropagation()}>
    <header className="syntax-heading">
      <span>{ru ? 'Синтаксис' : 'Syntax'}</span><small>{ayah.reference}</small>
    </header>
    <p className="syntax-reading-hint">{ru ? 'Как слова соединяются в предложение' : 'How words form a sentence'}</p>
    <div className="syntax-verse" lang="ar" dir="rtl" aria-label={ru ? 'Аят целиком' : 'Full ayah'}>
      {enabled ? <>
        <div className="syntax-verse-context">{plainWords(1, model.range[0] - 1)}</div>
        <div className="syntax-clause" ref={clauseRef}>
          <div className="syntax-clause-words">
            {ayah.tokens.slice(model.range[0] - 1, model.range[1]).map((token, i) => {
              const index = model.range[0] + i
              const active = overview || step?.active.includes(index)
              return <button key={index} ref={el => { wordRefs.current[index] = el }}
                className={'syntax-word' + (active ? ' is-active' : '') + (index === selectedWord ? ' is-entry' : '')}
                onClick={() => chooseWord(index)} aria-pressed={!!active}>{token.ar}</button>
            })}
          </div>
          {geometry && <svg className={'syntax-connectors' + (overview ? ' is-overview' : '')}
            viewBox={`0 0 ${geometry.width} 124`} style={{ height: 124 }} role="group"
            aria-label={ru ? 'Грамматические связи' : 'Grammatical relationships'} dir="ltr">
            <defs><marker id={marker} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M1 1L6 3.5L1 6" fill="none" stroke="currentColor" strokeWidth="1" /></marker></defs>
            {(overview ? model.steps : [step]).map(s => {
              const i = model.steps.indexOf(s)
              const from = geometry.points[s.from], to = geometry.points[s.to]
              if (!from || !to) return null
              const x = s.group ? (geometry.points[s.group[0]].right + geometry.points[s.group[1]].left) / 2 : from.x
              const depth = overview ? 30 + i * 33 : 48
              const path = `M ${x} 3 C ${x} ${depth}, ${to.x} ${depth}, ${to.x} 3`
              return <g key={s.id}>
                {s.group && <path className="syntax-group-line" d={`M ${geometry.points[24].right - 4} 0 H ${geometry.points[25].left + 4}`} />}
                <path className="syntax-link" d={path} markerEnd={`url(#${marker})`} />
                <path className="syntax-link-hit" d={path} role="button" tabIndex="0"
                  aria-label={`${i + 1}. ${s.tr}`} onClick={() => setStepIndex(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStepIndex(i) } }} />
                {overview && <text x={(x + to.x) / 2} y={depth * .75 + 16} textAnchor="middle">{i + 1}</text>}
              </g>
            })}
          </svg>}
        </div>
        <div className="syntax-verse-context syntax-verse-tail">{plainWords(model.range[1] + 1, ayah.tokens.length)}</div>
      </> : <div className="syntax-verse-context">{plainWords(1, ayah.tokens.length)}</div>}
    </div>

    {enabled ? <>
      <nav className="syntax-step-nav" aria-label={ru ? 'Шаги синтаксического разбора' : 'Syntax steps'} dir="ltr">
        <button disabled={stepIndex === 0} onClick={() => setStepIndex(i => i - 1)} aria-label={ru ? 'Предыдущий шаг' : 'Previous step'}>‹</button>
        <span>{stepIndex + 1} / {model.steps.length + 1}</span>
        <button disabled={overview} onClick={() => setStepIndex(i => i + 1)} aria-label={ru ? 'Следующий шаг' : 'Next step'}>›</button>
      </nav>
      <div className="syntax-explanation" aria-live="polite" aria-atomic="true">
        {step ? <>
          <h3 lang="ar" dir="rtl">{step.term}</h3>
          <small>{step.tr}</small>
          <p>{step[language]}</p>
        </> : <>
          <h3>{ru ? 'Конструкция целиком' : 'The complete clause'}</h3>
          <p>{ru ? 'Три связи собирают одно утверждение. Нажмите на линию или слово, чтобы вернуться к шагу.' : 'Three relationships form one statement. Tap a line or word to revisit a step.'}</p>
          <div className="syntax-overview-key">{model.steps.map((s, i) => <button key={s.id} onClick={() => setStepIndex(i)}>{i + 1} · {s.tr}</button>)}</div>
        </>}
      </div>
      <p className="syntax-coverage">{ru ? 'Пока разобрана конструкция 2:197:23–26. Связи остальных слов ещё не добавлены.' : 'This analysis covers 2:197:23–26. Relationships for the remaining words have not been added yet.'}</p>
    </> : <div className="syntax-empty">
      <p>{ru ? 'Для выбранного слова связи пока не подтверждены. Полный текст аята сохранён выше.' : 'Relationships for this word are not yet confirmed. The full ayah is shown above.'}</p>
      {model && <button onClick={() => setExplore(true)}>{ru ? 'Посмотреть разбор конструкции с إِنَّ' : 'Explore the clause with إِنَّ'}</button>}
    </div>}
  </section>
}
