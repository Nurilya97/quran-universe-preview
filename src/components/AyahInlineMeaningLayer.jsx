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

const COMPOSITION_COPY = {
  '2:197': {
    ru: {
      threadTitle: 'Как развивается смысл аята',
      thread: 'Сначала аят задаёт время хаджа. Затем говорит о поведении человека в хадже, напоминает, что Аллах знает любое добро, переводит образ дорожного запаса к taqwā и завершает прямым обращением к обладателям разумения.',
      steps: {
        time: {
          title: 'Когда совершается хадж',
          text: 'Хадж связан с известными месяцами. Это временная рамка для всего, что дальше говорится о поведении паломника.',
        },
        'commitment-limits': {
          title: 'Что меняется, когда человек вступает в хадж',
          transition: 'Время → поведение человека',
          text: 'После решения совершать хадж аят называет три вещи, которых нужно избегать: rafath, fusūq и jidāl — интимной или непристойной речи, неповиновения и споров.',
        },
        knowledge: {
          title: 'Аллах знает любое добро',
          transition: 'Границы поведения → поступки',
          text: 'Дальше взгляд расширяется: речь уже не только о запретах. Какое бы добро человек ни сделал, Аллах знает его.',
        },
        taqwa: {
          title: 'От дорожного запаса к taqwā',
          transition: 'Поступки → внутренний ориентир',
          text: 'Сначала звучит «запасайтесь», а затем сразу — «лучший запас — taqwā». Образ подготовки к дороге становится переходом к внутреннему состоянию человека.',
        },
        address: {
          title: 'Финальное обращение',
          transition: 'Taqwā → прямое обращение',
          text: 'В وَٱتَّقُونِ тот же корень و ق ي возвращается уже как повеление с объектом «Меня». Точный русский эквивалент пока оставляем открытым; затем аят обращается к обладателям разумения.',
        },
      },
    },
    en: {
      threadTitle: 'How the meaning of the ayah develops',
      thread: 'The ayah first sets the time of Hajj, then moves to conduct during Hajj, reminds the listener that Allah knows every good deed, turns the image of travel provision toward taqwā, and closes with a direct address to people of understanding.',
      steps: {
        time: {
          title: 'When Hajj takes place',
          text: 'Hajj is tied to known months. This gives the time-frame for everything that follows about the pilgrim’s conduct.',
        },
        'commitment-limits': {
          title: 'What changes when a person enters Hajj',
          transition: 'Time → human conduct',
          text: 'After the decision to perform Hajj, the ayah names three things to avoid: rafath, fusūq, and jidāl — intimate or indecent conduct, disobedience, and disputing.',
        },
        knowledge: {
          title: 'Allah knows every good deed',
          transition: 'Boundaries → actions',
          text: 'The view then widens beyond the prohibitions: whatever good a person does is known to Allah.',
        },
        taqwa: {
          title: 'From travel provision to taqwā',
          transition: 'Actions → inward orientation',
          text: 'First comes “take provision,” then immediately “the best provision is taqwā.” Preparation for the journey becomes an image for inward preparation.',
        },
        address: {
          title: 'The closing address',
          transition: 'Taqwā → direct address',
          text: 'In وَٱتَّقُونِ the same root و ق ي returns as an imperative directed to “Me.” The English comparison currently supports “be mindful of Me”; the Russian equivalent remains under review. The ayah then addresses people of understanding.',
        },
      },
    },
  },
}

function currentLanguage() {
  return document.documentElement.lang === 'en' ? 'en' : 'ru'
}

function currentAyah() {
  const shell = document.querySelector('.ayah-space-shell')
  const reference = shell?.querySelector('.ayah-space-reference strong')?.textContent?.trim()
  if (!shell || !reference) return null
  const ayah = getAyahPrototype(reference)
  if (!ayah) return null
  return { shell, reference, ayah, language: currentLanguage() }
}

function decorateInlineWords(context) {
  const { shell, reference, ayah, language } = context
  const line = shell.querySelector('.analysis-ayah-continuous')
  if (!line) return

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

function decorateComposition(context) {
  const { shell, reference, language } = context
  const copy = COMPOSITION_COPY[reference]?.[language]
  if (!copy) return

  const thread = shell.querySelector('.composition-thread')
  if (thread) {
    const title = thread.querySelector('h2')
    const paragraph = thread.querySelector('p')
    if (title) title.textContent = copy.threadTitle
    if (paragraph) paragraph.textContent = copy.thread
  }

  shell.querySelectorAll('.composition-constellation[data-reading-id]').forEach((section) => {
    const step = copy.steps[section.dataset.readingId]
    if (!step) return

    const title = section.querySelector('h3')
    const text = section.querySelector('.composition-copy')
    const transition = section.querySelector('.composition-transition')
    if (title) title.textContent = step.title
    if (text) text.textContent = step.text
    if (transition && step.transition) transition.textContent = step.transition
  })
}

function decorateAyah() {
  const context = currentAyah()
  if (!context) return
  decorateInlineWords(context)
  decorateComposition(context)
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
