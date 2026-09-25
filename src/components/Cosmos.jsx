import { useEffect, useRef } from 'react'

const clamp = (x) => Math.max(0, Math.min(1, x))
const smooth = (x) => x * x * (3 - 2 * x)
function randomGenerator(seed) {
  let n = seed
  return () => ((n = (Math.imul(n, 1664525) + 1013904223) >>> 0) / 4294967296)
}

// Dust is cached; foreground stars are drawn at device resolution.
// This is a lightweight interface backdrop, not the final cinematic media layer.
function createDust() {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 640
  const ctx = canvas.getContext('2d')
  const pixels = ctx.createImageData(canvas.width, canvas.height)
  const random = randomGenerator(1447)
  const grid = Float32Array.from({ length: 128 * 128 }, random)
  const noise = (x, y) => {
    const ix = Math.floor(x), iy = Math.floor(y)
    const sx = smooth(x - ix), sy = smooth(y - iy)
    const get = (a, b) => grid[(a & 127) + (b & 127) * 128]
    return (get(ix, iy) * (1 - sx) + get(ix + 1, iy) * sx) * (1 - sy)
      + (get(ix, iy + 1) * (1 - sx) + get(ix + 1, iy + 1) * sx) * sy
  }
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width * 2 - 1, v = y / canvas.height * 2 - 1
      const along = u * .84 - v * .54, across = u * .54 + v * .84
      let f = 0, amplitude = .52, scale = 3
      for (let octave = 0; octave < 5; octave++) {
        f += noise((u + 2) * scale, (v + 2) * scale) * amplitude
        scale *= 2.15
        amplitude *= .49
      }
      const bend = noise((along + 2) * 2, 4) * .16 - .08
      const band = Math.exp(-Math.pow((across + bend) * 4.3, 2))
      const edge = clamp(1 - Math.pow(Math.hypot(u * .75, v * .75), 3))
      const lane = Math.exp(-Math.pow((across + .018 + Math.sin(along * 6) * .025) * 30, 2))
      const intensity = clamp((f - .24) * 1.6) * band * edge * (1 - lane * .8)
      const cool = clamp(along + .4)
      const index = (y * canvas.width + x) * 4
      pixels.data[index] = 160 - cool * 75
      pixels.data[index + 1] = 137 - cool * 39
      pixels.data[index + 2] = 107 + cool * 26
      pixels.data[index + 3] = Math.round(intensity * 145)
    }
  }
  ctx.putImageData(pixels, 0, 0)
  return canvas
}

export function Cosmos({ scene, journey, paused, reducedMotion }) {
  const canvasRef = useRef(null)
  const state = useRef({ scene, journey, paused, reducedMotion })
  state.current = { scene, journey, paused, reducedMotion }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return undefined
    const random = randomGenerator(6241)
    const stars = Array.from({ length: 1450 }, () => ({
      x: (random() - .5) * 6, y: (random() - .5) * 6,
      z: .65 + random() * 6, radius: .15 + random() * .6,
      warmth: random(), phase: random() * 6.28,
    }))
    const dust = createDust()
    let width = 1, height = 1, raf, last = performance.now(), time = 0
    let zoom = 1, parallaxX = 0, parallaxY = 0, pointerX = 0, pointerY = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    const move = (event) => {
      if (event.pointerType === 'touch') return
      pointerX = event.clientX / width - .5
      pointerY = event.clientY / height - .5
    }
    window.addEventListener('pointermove', move, { passive: true })
    const glow = (x, y, r, color, alpha) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(' + color + ',' + alpha + ')')
      g.addColorStop(.2, 'rgba(' + color + ',' + alpha * .25 + ')')
      g.addColorStop(1, 'rgba(' + color + ',0)')
      ctx.fillStyle = g
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }
    const draw = (now) => {
      const dt = Math.min(40, now - last) / 1000
      last = now
      const current = state.current
      const still = current.paused || current.reducedMotion || document.hidden
      if (!still) time += dt
      const flight = current.journey
      const progress = flight ? clamp((now - flight.started) / flight.duration) : 0
      const speed = flight && !still ? Math.pow(Math.sin(progress * Math.PI), 2) : 0
      const targetZoom = current.scene === 'ayah' ? 1.38 : current.scene === 'word' ? 1.3 : current.scene === 'root' ? 1.1 : 1
      const blend = 1 - Math.exp(-dt * 2.4)
      zoom += (targetZoom - zoom) * blend
      parallaxX += ((still ? 0 : pointerX) - parallaxX) * blend
      parallaxY += ((still ? 0 : pointerY) - parallaxY) * blend
      ctx.fillStyle = '#050709'
      ctx.fillRect(0, 0, width, height)

      const size = Math.max(width, height) * 1.3 * zoom
      const compactSpatialScene = width <= 760 && (current.scene === 'root' || current.scene === 'word')
      if (!compactSpatialScene) {
        ctx.save()
        ctx.translate(width * .53 + parallaxX * 14, height * .49 + parallaxY * 10)
        ctx.rotate(Math.sin(time * .022) * .018)
        ctx.globalAlpha = .84
        ctx.drawImage(dust, -size * .5, -size * .4, size, size * .8)
        ctx.restore()
      }
      glow(width * .53, height * .5, Math.min(width, height) * .6, '184,156,102', compactSpatialScene ? .045 : .07)

      const scale = Math.max(width, height) * .82
      for (const star of stars) {
        if (!still) star.z -= dt * (.006 + speed * (flight?.direction === -1 ? -2 : 2.3))
        if (star.z < .5) star.z += 6.1
        if (star.z > 6.7) star.z -= 6.1
        const depth = 1 / star.z
        const x = width * .5 + star.x * scale * depth + parallaxX * 10 * depth
        const y = height * .5 + star.y * scale * depth + parallaxY * 8 * depth
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue
        const radius = Math.min(1.7, star.radius * (.55 + depth))
        const alpha = Math.min(.88, .16 + depth * .45) * (.9 + Math.sin(time * .4 + star.phase) * .1)
        const color = star.warmth > .83 ? '231,208,169' : star.warmth < .15 ? '166,195,211' : '222,228,229'
        ctx.fillStyle = 'rgba(' + color + ',' + alpha + ')'
        if (speed > .2) {
          const dx = x - width * .5, dy = y - height * .5
          const length = Math.min(36, speed * 27 * depth)
          const distance = Math.hypot(dx, dy) || 1
          ctx.strokeStyle = ctx.fillStyle
          ctx.lineWidth = Math.max(.4, radius * .6)
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x - dx / distance * length, y - dy / distance * length)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(x, y, Math.max(.3, radius), 0, Math.PI * 2)
          ctx.fill()
          if (radius > 1.15 && star.warmth > .65) glow(x, y, radius * 8, color, alpha * .15)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmos-canvas" aria-hidden="true" />
}
