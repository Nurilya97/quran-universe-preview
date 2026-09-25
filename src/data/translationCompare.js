export const TRANSLATION_PROVIDERS = {
  ru: [
    {
      id: 'kuliev',
      label: 'Эльмир Кулиев',
      match: [/kuliev/i, /kuliyev/i, /кулиев/i, /elmir/i],
      externalUrl: 'https://quran.com/2:197',
    },
    {
      id: 'abu-adel',
      label: 'Абу Адель',
      match: [/abu adel/i, /abu adil/i, /абу адел/i, /адел/i],
      externalUrl: 'https://quran.com/2:197',
    },
  ],
  en: [
    {
      id: 'abdel-haleem',
      label: 'M. A. S. Abdel Haleem',
      match: [/abdel haleem/i, /abdul haleem/i, /haleem/i],
      externalUrl: 'https://quran.com/2:197',
    },
    {
      id: 'mustafa-khattab',
      label: 'Mustafa Khattab · The Clear Quran',
      match: [/mustafa khattab/i, /clear quran/i],
      externalUrl: 'https://quran.com/2:197',
    },
  ],
}

const API_BASE = 'https://api.quran.com/api/v4'

function resourceText(resource) {
  return [
    resource?.name,
    typeof resource?.translated_name === 'string' ? resource.translated_name : resource?.translated_name?.name,
    resource?.author_name,
    resource?.slug,
    resource?.language_name,
  ].filter(Boolean).join(' ')
}

function plainText(value) {
  if (!value) return ''
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function findResource(resources, provider) {
  return resources.find((resource) => {
    const haystack = resourceText(resource)
    return provider.match.some((pattern) => pattern.test(haystack))
  })
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error('Translation service unavailable')
  return response.json()
}

export async function loadTranslationComparison(reference, language, signal) {
  const providers = TRANSLATION_PROVIDERS[language] || []
  const resourcePayload = await fetchJson(
    `${API_BASE}/resources/translations?language=${encodeURIComponent(language)}`,
    signal,
  )
  const resources = resourcePayload.translations || resourcePayload.resources || []

  return Promise.all(providers.map(async (provider) => {
    const resource = findResource(resources, provider)
    const resourceId = resource?.id ?? resource?.resource_id
    if (!resourceId) return { ...provider, status: 'unavailable', text: '' }

    try {
      const payload = await fetchJson(
        `${API_BASE}/quran/translations/${resourceId}?verse_key=${encodeURIComponent(reference)}`,
        signal,
      )
      const row = payload.translations?.find((item) => item.verse_key === reference) || payload.translations?.[0]
      return {
        ...provider,
        status: row?.text ? 'ready' : 'unavailable',
        text: plainText(row?.text),
        resourceId,
        resourceName: resource?.name || (typeof resource?.translated_name === 'string' ? resource.translated_name : resource?.translated_name?.name) || provider.label,
      }
    } catch (error) {
      if (error?.name === 'AbortError') throw error
      return { ...provider, status: 'unavailable', text: '' }
    }
  }))
}
