import { useEffect } from 'react'
import { getAyahPrototype } from '../ayahPrototype.js'
import './AyahInlineMeaningLayer.css'

const PILOT_OVERRIDES = {
  '2:197': {
    ru: {
      27: 'wa-ittaqūnī · перевод уточняется',
    },
    en: {
      27: 'wa-ittaqūnī · translation under review',
    },
  },
}

function currentLanguage() {
  return document.documentElement.lang === 'en' ? 'en' : 'ru'
}

function decorateAyah() {
  const shell = document.querySelector('.ayah-space-shell')
  const line = shell?.querySelector('.analysis-ayah-continuous')
  const reference = shell?.querySelector('.ayah-space-reference strong')?.textContent?.trim()
  if (!line || !reference) return

  const ayah = getAyahPrototype(reference)
  if (!ayah) return

  const language = currentLanguage()
  const overrides = PILOT_OVERRIDES[reference]?.[language] || {}
  const wordSpans = [...line.children]

  wordSpans.forEach((span, index) => {
    const token = ayah.tokens[index]
    if (!token) return

    const wordIndex = index + 1
    const gloss = overrides[wordIndex] || token[language] || token.tr

    span.classList.add('analysis-word-stack')
    span.dataset.wordIndex = String(wordIndex)
    span.dataset.gloss = gloss
    span.dataset.transliteration = token.tr || ''
    if (overrides[wordIndex]) span.dataset.translationStatus = 'researching'
    else delete span.dataset.translationStatus
  })
}

export function AyahInlineMeaningLayer() {
  useEffect(() => {
    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(decorateAyah)
    }

    const root = document.getElementById('root')
    const rootObserver = new MutationObserver(schedule)
    if (root) rootObserver.observe(root, { childList: true, subtree: true })

    const languageObserver = new MutationObserver(schedule)
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })

    schedule()
    return () => {
      cancelAnimationFrame(frame)
      rootObserver.disconnect()
      languageObserver.disconnect()
    }
  }, [])

  return null
}
