import { useEffect, useMemo, useRef, useState } from 'react'
import './ImmersiveUniverse.css'

const ROOT_FORMS = [
  { arabic: 'وَقَىٰ', meta: 'I', note: 'protect / ward', x: -0.74, y: -0.16, weight: 1.0 },
  { arabic: 'ٱتَّقَىٰ', meta: 'VIII', note: 'active protective orientation', x: -0.38, y: -0.43, weight: 1.18 },
  { arabic: 'تَقْوَى', meta: 'noun', note: 'Qur’anic concept', x: 0.08, y: 0.03, weight: 1.45, word: true },
  { arabic: 'مُتَّقِين', meta: 'participle', note: 'those characterized by taqwā', x: 0.55, y: -0.34, weight: 1.0 },
  { arabic: 'أَتْقَى', meta: 'elative', note: 'more / most taqwā', x: 0.69, y: 0.22, weight: 0.82 },
  { arabic: 'تُقَاة', meta: 'noun', note: 'protective precaution', x: -0.34, y: 0.37, weight: 0.88 },
  { arabic: 'وَاق', meta: 'participle', note: 'protector / warder', x: -0.7, y: 0.28, weight: 0.78 },
  { arabic: 'تَقِيّ', meta: 'adjective', note: 'characterized by taqwā', x: 0.32, y: -0.58, weight: 0.83 },
]

const OCCURRENCES = [
  { ref: '2:197', angle: -0.15, ring: 1 },
  { ref: '5:8', angle: 0.78, ring: 1 },
  { ref: '22:32', angle: 2.0, ring: 1 },
  { ref: '49:3', angle: 3.25, ring: 1 },
  { ref: '7:201', angle: 0.33, ring: 2 },
  { ref: '9:109', angle: 2.75, ring: 2 },
  { ref: '3:102', angle: 4.65, ring: 2 },
  { ref: '59:18', angle: 5.42, ring: 2 },
]

const NOTES = {
  '7:201': 'Здесь taqwā связана с вспоминанием и восстановлением ясного видения. Это контекстная заметка, не перевод аята.',
  '22:32': 'Здесь taqwā прямо соотнесена с сердцами: تَقْوَى الْقُلُوبِ.',
  '5:8': 'Справедливость названа ближе к taqwā. «Праведность» может передавать результат, но не весь механизм.',
  '2:197': 'Taqwā названа лучшим запасом. Образ показывает функцию концепции, а не сводит её к одному целевому слову.',
}

function seeded(seed = 1) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

function easeExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function ImmersiveUniverse() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const journeyRef = useRef({ active: false, started: 0, duration: 1900, direction: 1 })
  const modeRef = useRef('search')
  const selectedOccurrenceRef = useRef(null)
  const reducedMotion = useMemo(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    [],
  )

  const [mode, setMode] = useState('search')
  const [query, setQuery] = useState('')
  const [selectedOccurrence, setSelectedOccurrence] = useState(null)
  const [hint, setHint] = useState('Введите слово или корень')

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    selectedOccurrenceRef.current = selectedOccurrence
  }, [selectedOccurrence])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: false })
    const random = seeded(1447)
    const stars = Array.from({ length: 760 }, () => ({
      x: (random() - 0.5) * 6.5,
      y: (random() - 0.5) * 4.2,
      z: 0.25 + random() * 7.4,
      size: 0.35 + random() * 1.5,
      warm: random() > 0.78,
      blue: random() > 0.84,
      phase: random() * Math.PI * 2,
    }))
    const dust = Array.from({ length: 420 }, () => {
      const t = random() * 2 - 1
      return {
        x: t * 4.2 + (random() - 0.5) * 0.7,
        y: -t * 0.72 + (random() - 0.5) * (0.22 + random() * 0.72),
        z: 1.9 + random() * 4.6,
        size: 0.35 + random() * 1.9,
        opacity: 0.05 + random() * 0.28,
      }
    })

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let last = performance.now()
    let travel = 0
    let rootReveal = 0
    let orbitReveal = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const project = (x, y, z, fov = 0.88) => {
      const scale = Math.min(width, height) * fov / Math.max(0.16, z)
      return {
        x: width * 0.5 + x * scale + pointerRef.current.x * (22 / Math.max(0.8, z)),
        y: height * 0.5 + y * scale + pointerRef.current.y * (14 / Math.max(0.8, z)),
      }
    }

    const drawGlow = (x, y, radius, rgb, alpha) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(${rgb},${alpha})`)
      gradient.addColorStop(0.28, `rgba(${rgb},${alpha * 0.32})`)
      gradient.addColorStop(1, `rgba(${rgb},0)`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const draw = (now) => {
      const dt = Math.min(32, now - last)
      last = now
      const currentMode = modeRef.current
      const journey = journeyRef.current
      let journeyProgress = 0
      if (journey.active) {
        journeyProgress = Math.min(1, (now - journey.started) / journey.duration)
        travel = easeExpo(journeyProgress)
      } else {
        travel *= 0.94
      }
      rootReveal += ((currentMode === 'root' ? 1 : 0) - rootReveal) * 0.055
      orbitReveal += ((currentMode === 'word' ? 1 : 0) - orbitReveal) * 0.055

      ctx.fillStyle = '#050611'
      ctx.fillRect(0, 0, width, height)

      const bg1 = ctx.createRadialGradient(width * 0.76, height * 0.16, 20, width * 0.76, height * 0.16, Math.max(width, height) * 0.76)
      bg1.addColorStop(0, 'rgba(88,93,148,0.12)')
      bg1.addColorStop(0.48, 'rgba(40,46,86,0.045)')
      bg1.addColorStop(1, 'rgba(5,6,17,0)')
      ctx.fillStyle = bg1
      ctx.fillRect(0, 0, width, height)

      const baseSpeed = currentMode === 'search' ? 0.00004 : 0.000018
      const flightSpeed = journey.active ? (0.0018 + Math.sin(Math.PI * journeyProgress) * 0.022) : 0
      const speed = reducedMotion ? baseSpeed : baseSpeed + flightSpeed

      for (const star of stars) {
        star.z -= speed * dt * 60
        if (star.z < 0.2) star.z += 7.4
        const p = project(star.x, star.y, star.z)
        if (p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) continue
        const depth = Math.max(0.16, 1 - star.z / 8)
        const twinkle = 0.7 + Math.sin(now * 0.0012 + star.phase) * 0.16
        const alpha = (0.18 + depth * 0.72) * twinkle
        const radius = Math.min(3.2, star.size * (0.55 + depth * 1.55))
        ctx.fillStyle = star.warm
          ? `rgba(219,205,163,${alpha})`
          : star.blue
            ? `rgba(153,175,215,${alpha})`
            : `rgba(232,231,239,${alpha})`
        if (journey.active && journeyProgress > 0.1 && journeyProgress < 0.82 && !reducedMotion) {
          const centerX = width * 0.5
          const centerY = height * 0.5
          const dx = p.x - centerX
          const dy = p.y - centerY
          const length = Math.min(58, 5 + travel * 70 * depth)
          const mag = Math.hypot(dx, dy) || 1
          ctx.strokeStyle = ctx.fillStyle
          ctx.lineWidth = Math.max(0.4, radius * 0.48)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + (dx / mag) * length, p.y + (dy / mag) * length)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (rootReveal > 0.02) {
        ctx.save()
        ctx.globalAlpha = rootReveal
        const nebula = ctx.createLinearGradient(width * 0.13, height * 0.72, width * 0.88, height * 0.22)
        nebula.addColorStop(0, 'rgba(92,104,151,0)')
        nebula.addColorStop(0.25, 'rgba(111,117,164,0.075)')
        nebula.addColorStop(0.55, 'rgba(191,173,133,0.095)')
        nebula.addColorStop(0.82, 'rgba(93,105,155,0.055)')
        nebula.addColorStop(1, 'rgba(92,104,151,0)')
        ctx.strokeStyle = nebula
        ctx.lineWidth = Math.min(width, height) * 0.16
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(width * 0.08, height * 0.76)
        ctx.lineTo(width * 0.92, height * 0.18)
        ctx.stroke()
        for (const mote of dust) {
          const p = project(mote.x, mote.y, mote.z, 0.72)
          ctx.fillStyle = `rgba(211,203,183,${mote.opacity * rootReveal})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, mote.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (orbitReveal > 0.02) {
        ctx.save()
        ctx.globalAlpha = orbitReveal
        const cx = width * 0.56 + pointerRef.current.x * 7
        const cy = height * 0.51 + pointerRef.current.y * 5
        drawGlow(cx, cy, Math.min(width, height) * 0.23, '183,170,131', 0.075 * orbitReveal)
        ctx.strokeStyle = 'rgba(181,183,198,0.13)'
        ctx.lineWidth = 1
        ;[
          [0.18, 0.08],
          [0.28, 0.13],
          [0.41, 0.2],
        ].forEach(([rx, ry]) => {
          ctx.beginPath()
          ctx.ellipse(cx, cy, width * rx, height * ry, -0.1, 0, Math.PI * 2)
          ctx.stroke()
        })
        OCCURRENCES.forEach((item) => {
          const ring = item.ring === 1 ? [width * 0.28, height * 0.13] : [width * 0.41, height * 0.2]
          const x = cx + Math.cos(item.angle) * ring[0]
          const y = cy + Math.sin(item.angle) * ring[1]
          ctx.fillStyle = 'rgba(133,157,196,0.88)'
          ctx.beginPath()
          ctx.arc(x, y, item.ref === selectedOccurrenceRef.current ? 5.3 : 3.2, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [reducedMotion])

  useEffect(() => {
    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      pointerRef.current.x += (x - pointerRef.current.x) * 0.12
      pointerRef.current.y += (y - pointerRef.current.y) * 0.12
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const runJourney = (destination, direction = 1) => {
    setSelectedOccurrence(null)
    setMode('flight')
    const duration = reducedMotion ? 180 : destination === 'root' ? 1450 : 1900
    journeyRef.current = {
      active: true,
      started: performance.now(),
      duration,
      direction,
    }
    window.setTimeout(() => {
      journeyRef.current.active = false
      setMode(destination)
    }, duration)
  }

  const submit = (event) => {
    event?.preventDefault()
    const normalized = query.trim().toLowerCase().replace(/\s+/g, '')
    if (!normalized) {
      setHint('Введите تقوى, taqwa или وقي')
      return
    }
    if (normalized.includes('وقي') || normalized.includes('wqy')) {
      setHint('Корень найден')
      runJourney('root')
      return
    }
    if (normalized.includes('تقوى') || normalized.includes('taqwa') || normalized.includes('таква')) {
      setHint('Слово найдено')
      runJourney('word')
      return
    }
    setHint('В прототипе доступны تقوى и корень و ق ي')
  }

  const openWord = () => runJourney('word')
  const openRoot = () => runJourney('root', -1)
  const home = () => {
    journeyRef.current.active = false
    setSelectedOccurrence(null)
    setMode('search')
    setHint('Введите слово или корень')
    setQuery('')
  }

  return (
    <div className={`immersive-universe mode-${mode}`}>
      <canvas ref={canvasRef} className="cosmos-canvas" aria-hidden="true" />

      <header className="cosmos-header">
        <button className="cosmos-brand" onClick={home}>
          <span>Quran Universe</span>
          <small>semantic cosmos</small>
        </button>
        {mode !== 'search' && mode !== 'flight' && (
          <button className="quiet-action" onClick={home}>Поиск</button>
        )}
      </header>

      {mode === 'search' && (
        <section className="search-stage" aria-label="Поиск по Quran Universe">
          <div className="search-copy">
            <h1>Исследуйте Коран<br />как пространство смыслов.</h1>
            <p>Введите арабское слово или корень. Камера приведёт вас к его месту во вселенной.</p>
          </div>
          <form className="universe-search" onSubmit={submit}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="تقوى  ·  taqwa  ·  و ق ي"
              aria-label="Слово или корень"
              autoFocus
            />
            <button type="submit" aria-label="Перейти к слову">↗</button>
          </form>
          <div className="search-hint">{hint}</div>
          <div className="prototype-shortcuts" aria-label="Доступные примеры">
            <button onClick={() => { setQuery('تقوى'); window.setTimeout(() => runJourney('word'), 80) }}>تقوى</button>
            <button onClick={() => { setQuery('و ق ي'); window.setTimeout(() => runJourney('root'), 80) }}>و ق ي</button>
          </div>
        </section>
      )}

      {mode === 'flight' && (
        <div className="flight-stage" aria-live="polite">
          <span className="flight-word">{query.includes('و') && !query.includes('تقوى') ? 'و ق ي' : 'تقوى'}</span>
          <small>перемещаемся по смысловому пространству</small>
        </div>
      )}

      {mode === 'root' && (
        <section className="root-stage">
          <div className="root-heading">
            <span className="root-arabic" lang="ar" dir="rtl">و ق ي</span>
            <div>
              <h1>Корень و ق ي</h1>
              <p>Защитное ядро: ограждать, сохранять, не позволять вреду достигнуть защищаемого.</p>
            </div>
          </div>
          <div className="root-form-field" aria-label="Производные корня و ق ي">
            {ROOT_FORMS.map((form) => (
              <button
                key={form.arabic}
                className={`root-form ${form.word ? 'is-word' : ''}`}
                style={{ '--x': form.x, '--y': form.y, '--weight': form.weight }}
                onClick={form.word ? openWord : undefined}
                disabled={!form.word}
              >
                <span lang="ar" dir="rtl">{form.arabic}</span>
                <small>{form.meta}</small>
                <em>{form.note}</em>
              </button>
            ))}
          </div>
          <div className="spatial-legend">
            <span>Млечный путь корня</span>
            <p>Каждая точка принадлежит одной деривационной семье. Здесь геометрия показывает структуру, а не декоративную близость.</p>
          </div>
        </section>
      )}

      {mode === 'word' && (
        <section className="word-stage">
          <button className="root-return" onClick={openRoot}>
            <small>корень</small>
            <span lang="ar">و ق ي</span>
            <em>отдалиться к млечному пути</em>
          </button>
          <div className="word-core">
            <span lang="ar" dir="rtl">تَقْوَى</span>
            <small>noun · 17 Qur’anic occurrences</small>
            <p>Защитное ядро корня раскрывается здесь как активная, внимательная и отвечающая руководству ориентация.</p>
          </div>
          <div className="occurrence-layer" aria-label="Коранические вхождения تقوى">
            {OCCURRENCES.map((item) => (
              <button
                key={item.ref}
                className={`occurrence occurrence-${item.ring} ${selectedOccurrence === item.ref ? 'selected' : ''}`}
                style={{ '--angle': `${item.angle}rad` }}
                onClick={() => setSelectedOccurrence(item.ref)}
              >
                {item.ref}
              </button>
            ))}
          </div>
          <div className="word-meta">
            <span>Форма</span>
            <strong>تَقْوَى · noun</strong>
            <p>Нажмите номер аята, чтобы открыть контекстную заметку. Сам аят в этом MVP не переводится.</p>
          </div>
          {selectedOccurrence && (
            <aside className="context-note">
              <button onClick={() => setSelectedOccurrence(null)} aria-label="Закрыть заметку">×</button>
              <span>{selectedOccurrence}</span>
              <p>{NOTES[selectedOccurrence] || 'Контекстная заметка для этого вхождения будет добавлена после проверки исследовательского слоя.'}</p>
              <small>Arabic context only · no ayah translation</small>
            </aside>
          )}
        </section>
      )}

      <div className="depth-caption" aria-hidden="true">
        <span>{mode === 'search' ? 'Вселенная' : mode === 'root' ? 'Корень' : mode === 'word' ? 'Слово' : 'Переход'}</span>
        <i />
        <small>{mode === 'root' ? 'و ق ي' : mode === 'word' ? 'تقوى' : 'Quran Universe'}</small>
      </div>
    </div>
  )
}

