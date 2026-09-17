// Public interface demo only; no private research content.
// Rings group a verb with its lexical family, not a grammatical form number
// assigned to every noun. Public sources are exposed in the structure panel.
export const SOURCES = {
  corpus: 'https://corpus.quran.com/qurandictionary.jsp?q=wqy',
  lexicon: 'https://arabiclexicon.hawramani.com/%D9%88%D9%82%D9%89/',
  taqwa: 'https://www.almaany.com/ar/dict/ar-ar/%D8%AA%D9%82%D9%88%D9%89/',
}
export const ROOT_ORBITS = [
  { id: 'I', radius: 24, label: 'familyI' },
  { id: 'V', radius: 34.5, label: 'familyV' },
  { id: 'VIII', radius: 45.5, label: 'familyVIII' },
]
export const FORMS = [
  { id: 'waqa', arabic: 'وَقَىٰ', reading: 'waqā', orbit: 'I', type: 'verbI', angle: 225, source: 'corpus' },
  { id: 'ittaqa', arabic: 'ٱتَّقَىٰ', reading: 'ittaqā', orbit: 'VIII', type: 'verbVIII', angle: 210, source: 'corpus' },
  { id: 'taqwa', arabic: 'تَقْوَى', reading: 'taqwā', orbit: 'VIII', type: 'noun', angle: 270, source: 'taqwa' },
  { id: 'tuqat', arabic: 'تُقَاة', reading: 'tuqāt', orbit: 'VIII', type: 'verbalNoun', angle: 330, source: 'lexicon' },
  { id: 'muttaqin', arabic: 'مُتَّقِين', reading: 'muttaqīn', orbit: 'VIII', type: 'participle', angle: 30, source: 'corpus' },
  { id: 'waq', arabic: 'وَاق', reading: 'wāq', orbit: 'I', type: 'participle', angle: 45, source: 'corpus' },
  { id: 'taqiyy', arabic: 'تَقِيّ', reading: 'taqiyy', orbit: 'VIII', type: 'adjective', angle: 90, source: 'lexicon' },
  { id: 'atqa', arabic: 'أَتْقَى', reading: 'atqā', orbit: 'VIII', type: 'elative', angle: 150, source: 'corpus' },
  { id: 'wiqaa', arabic: 'وِقَاء', reading: 'wiqāʾ', orbit: 'I', type: 'noun', angle: 315, source: 'lexicon', lexicalOnly: true, gloss: 'shield' },
  { id: 'wiqaya', arabic: 'وِقَايَة', reading: 'wiqāya', orbit: 'I', type: 'verbalNoun', angle: 135, source: 'lexicon', lexicalOnly: true },
  { id: 'tawaqqa', arabic: 'تَوَقَّىٰ', reading: 'tawaqqā', orbit: 'V', type: 'verbV', angle: 0, source: 'lexicon', lexicalOnly: true },
]

export function rootPosition(form) {
  const radius = ROOT_ORBITS.find((orbit) => orbit.id === form.orbit).radius
  const radians = form.angle * Math.PI / 180
  return { x: 50 + Math.cos(radians) * radius, y: 50 + Math.sin(radians) * radius }
}
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
    allForms: 'Формы в демо', formsNote: 'Каждая орбита объединяет глагол и связанную именную семью. Номер породы относится к глаголу; существительное может иметь собственную модель. Это подборка, не полное древо корня.',
    familyI: 'I порода · семья وَقَىٰ', familyV: 'V порода · семья تَوَقَّىٰ', familyVIII: 'VIII порода · семья ٱتَّقَىٰ',
    families: 'Словообразовательные семьи', familyLabel: 'Семья', allOrbits: 'Все орбиты',
    lexical: 'Словарная форма', lexicalNote: 'Словарная форма. Кораническое вхождение этой формы в демо не заявлено.',
    source: 'Источник', sourceCorpus: 'Коранический арабский корпус', sourceLexicon: 'Арабский словарь', sourceAlmaany: 'Словарь «Аль-Маани»',
    shield: 'Средство защиты, покров; щит',
    verbs: 'Глаголы', nouns: 'Имена', descriptions: 'Производные признаки',
    verbI: 'Глагол · I порода', verbV: 'Глагол · V порода', verbVIII: 'Глагол · VIII порода', noun: 'Имя', verbalNoun: 'Масдар',
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
    allForms: 'Demo forms', formsNote: 'Each orbit groups a verb with its related nominal family. The form number describes the verb; a noun may have its own pattern. This is a selection, not a complete root tree.',
    familyI: 'Form I · وَقَىٰ family', familyV: 'Form V · تَوَقَّىٰ family', familyVIII: 'Form VIII · ٱتَّقَىٰ family',
    families: 'Derivational families', familyLabel: 'Family', allOrbits: 'All orbits',
    lexical: 'Dictionary form', lexicalNote: 'A dictionary form. No Quranic occurrence of this form is claimed in this demo.',
    source: 'Source', sourceCorpus: 'Quranic Arabic Corpus', sourceLexicon: 'Arabic Lexicon', sourceAlmaany: 'Almaany dictionary',
    shield: 'A means of protection, covering; shield',
    verbs: 'Verbs', nouns: 'Nominal forms', descriptions: 'Derived attributes',
    verbI: 'Verb · Form I', verbV: 'Verb · Form V', verbVIII: 'Verb · Form VIII', noun: 'Noun', verbalNoun: 'Verbal noun',
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
