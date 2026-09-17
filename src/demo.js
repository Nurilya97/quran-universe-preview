// Public interface demo only; no private research content.
export const FORMS = [
  { id: 'waqa', arabic: 'وَقَىٰ', family: 'verbs', type: 'verbI', x: 24, y: 24 },
  { id: 'ittaqa', arabic: 'ٱتَّقَىٰ', family: 'verbs', type: 'verbVIII', x: 23, y: 47 },
  { id: 'taqwa', arabic: 'تَقْوَى', family: 'nouns', type: 'noun', x: 73, y: 27 },
  { id: 'tuqat', arabic: 'تُقَاة', family: 'nouns', type: 'noun', x: 78, y: 49 },
  { id: 'muttaqin', arabic: 'مُتَّقِين', family: 'descriptions', type: 'participle', x: 26, y: 72 },
  { id: 'waq', arabic: 'وَاق', family: 'descriptions', type: 'participle', x: 43, y: 87 },
  { id: 'taqiyy', arabic: 'تَقِيّ', family: 'descriptions', type: 'adjective', x: 66, y: 79 },
  { id: 'atqa', arabic: 'أَتْقَى', family: 'descriptions', type: 'elative', x: 80, y: 67 },
]
export const TAQWA_REFERENCES = ['2:197', '5:8', '9:109', '22:32', '49:3']
export const COPY = {
  ru: {
    search: 'Поиск', searchLabel: 'Найти слово или корень', placeholder: 'Слово или корень',
    language: 'Язык интерфейса', home: 'К поиску', enter: 'Перейти',
    available: 'Доступно в демо', word: 'Слово', root: 'Корень', rootSpace: 'Пространство корня',
    orbit: 'Орбита слова', travel: 'Приближение к', returnRoot: 'Отдалиться к корню',
    noResult: 'В этом демо доступны تقوى и корень و ق ي. Другие слова и суры ещё не подключены.',
    quran: 'Коран', structure: 'Строение слова', meaning: 'Значение',
    quranCaption: 'Вхождения', structureCaption: 'Форма и корень', meaningCaption: 'Смысловая памятка',
    close: 'Закрыть', references: 'Избранные вхождения', referenceNote: 'Неполная подборка для демо. Ссылки открывают Quran.com в новой вкладке.',
    openVerse: 'Открыть аят', noReferences: 'Вхождения этого слова ещё не подключены к демо.',
    wordType: 'Грамматическая форма',
    researchPending: 'Подробный разбор и модель будут добавлены после проверки источников.',
    meaningPending: 'Здесь будет проверенная смысловая памятка: ядро значения, связь с корнем и источники. Исследовательские материалы пока не опубликованы.',
    noMeaning: 'Памятка для этого слова ещё не подготовлена.',
    allForms: 'Все формы', formsNote: 'Восемь форм в демо. Это не полное древо корня. Расстояния пока композиционные, а не смысловой рейтинг.',
    verbs: 'Глаголы', nouns: 'Имена', descriptions: 'Производные признаки',
    verbI: 'Глагол · I порода', verbVIII: 'Глагол · VIII порода', noun: 'Имя',
    participle: 'Причастие', adjective: 'Прилагательное', elative: 'Имя предпочтения',
    pause: 'Остановить движение', resume: 'Включить движение',
  },
  en: {
    search: 'Search', searchLabel: 'Find a word or root', placeholder: 'Word or root',
    language: 'Interface language', home: 'Back to search', enter: 'Explore',
    available: 'Available in this demo', word: 'Word', root: 'Root', rootSpace: 'Root space',
    orbit: 'Word orbit', travel: 'Approaching', returnRoot: 'Zoom out to root',
    noResult: 'This demo includes تقوى and the root و ق ي. Other words and surahs are not connected yet.',
    quran: 'Quran', structure: 'Word structure', meaning: 'Meaning',
    quranCaption: 'Occurrences', structureCaption: 'Form and root', meaningCaption: 'Semantic note',
    close: 'Close', references: 'Selected occurrences', referenceNote: 'A short demo selection, not a full concordance. Links open Quran.com in a new tab.',
    openVerse: 'Open verse', noReferences: 'Occurrences of this word are not connected to the demo yet.',
    wordType: 'Grammatical form',
    researchPending: 'The detailed analysis and pattern will be added after source verification.',
    meaningPending: 'A verified note will appear here: core meaning, connection to the root, and sources. Research materials have not been published.',
    noMeaning: 'The note for this word is not available yet.',
    allForms: 'All forms', formsNote: 'Eight demo forms, not a complete root tree. Distances are compositional for now, not a semantic ranking.',
    verbs: 'Verbs', nouns: 'Nominal forms', descriptions: 'Derived attributes',
    verbI: 'Verb · Form I', verbVIII: 'Verb · Form VIII', noun: 'Noun',
    participle: 'Participle', adjective: 'Adjective', elative: 'Elative',
    pause: 'Pause motion', resume: 'Resume motion',
  },
}
export function normalizeQuery(value) {
  return value.normalize('NFKC').toLowerCase().replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED\s]/g, '')
}
export function resolveQuery(value) {
  const q = normalizeQuery(value)
  if (['وقي', 'wqy'].includes(q)) return 'root'
  if (['تقوى', 'taqwa', 'taqwā', 'таква', 'такуа'].includes(q)) return 'word'
  return null
}
