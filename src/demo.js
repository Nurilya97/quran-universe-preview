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
export const LBB_ROOT_ORBITS = [
  { id: 'N', radius: 35, label: 'familyLbbN' },
]
export const ROOT_DEMOS = {
  wqy: { id: 'wqy', arabic: 'و ق ي', reading: 'w-q-y', orbits: ROOT_ORBITS },
  lbb: { id: 'lbb', arabic: 'ل ب ب', reading: 'l-b-b', orbits: LBB_ROOT_ORBITS },
}
export const FORMS = [
  { id: 'waqa', arabic: 'وَقَىٰ', reading: 'waqā', orbit: 'I', type: 'verbI', angle: 225, source: 'corpus', rootKey: 'wqy' },
  { id: 'ittaqa', arabic: 'ٱتَّقَىٰ', reading: 'ittaqā', orbit: 'VIII', type: 'verbVIII', angle: 210, source: 'corpus', rootKey: 'wqy' },
  { id: 'taqwa', arabic: 'تَقْوَى', reading: 'taqwā', orbit: 'VIII', type: 'noun', angle: 270, source: 'taqwa', rootKey: 'wqy' },
  { id: 'tuqat', arabic: 'تُقَاة', reading: 'tuqāt', orbit: 'VIII', type: 'verbalNoun', angle: 330, source: 'lexicon', rootKey: 'wqy' },
  { id: 'muttaqin', arabic: 'مُتَّقِين', reading: 'muttaqīn', orbit: 'VIII', type: 'participle', angle: 30, source: 'corpus', rootKey: 'wqy' },
  { id: 'waq', arabic: 'وَاق', reading: 'wāq', orbit: 'I', type: 'participle', angle: 45, source: 'corpus', rootKey: 'wqy' },
  { id: 'taqiyy', arabic: 'تَقِيّ', reading: 'taqiyy', orbit: 'VIII', type: 'adjective', angle: 90, source: 'lexicon', rootKey: 'wqy' },
  { id: 'atqa', arabic: 'أَتْقَى', reading: 'atqā', orbit: 'VIII', type: 'elative', angle: 150, source: 'corpus', rootKey: 'wqy' },
  { id: 'wiqaa', arabic: 'وِقَاء', reading: 'wiqāʾ', orbit: 'I', type: 'noun', angle: 315, source: 'lexicon', rootKey: 'wqy', lexicalOnly: true, gloss: 'shield' },
  { id: 'wiqaya', arabic: 'وِقَايَة', reading: 'wiqāya', orbit: 'I', type: 'verbalNoun', angle: 135, source: 'lexicon', rootKey: 'wqy', lexicalOnly: true },
  { id: 'tawaqqa', arabic: 'تَوَقَّىٰ', reading: 'tawaqqā', orbit: 'V', type: 'verbV', angle: 0, source: 'lexicon', rootKey: 'wqy', lexicalOnly: true },
  { id: 'lubb', arabic: 'لُبّ', reading: 'lubb', orbit: 'N', type: 'noun', angle: 205, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true },
  { id: 'albab', arabic: 'أَلْبَاب', reading: 'albāb', orbit: 'N', type: 'noun', angle: 325, source: 'lbbCorpus', rootKey: 'lbb' },
  { id: 'labib', arabic: 'لَبِيب', reading: 'labīb', orbit: 'N', type: 'adjective', angle: 85, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true },
]

export function rootPosition(form, orbits = ROOT_ORBITS) {
  const radius = (orbits.find((orbit) => orbit.id === form.orbit) || orbits[0]).radius
  const radians = form.angle * Math.PI / 180
  return { x: 50 + Math.cos(radians) * radius, y: 50 + Math.sin(radians) * radius }
}
export function rootForWord(word) {
  return ROOT_DEMOS[word?.rootKey || 'wqy'] || ROOT_DEMOS.wqy
}
export function formsForRoot(rootKey = 'wqy') {
  return FORMS.filter(form => (form.rootKey || 'wqy') === rootKey)
}
export const COPY = {
  ru: {
    search: 'Поиск', searchLabel: 'Найти слово или корень', placeholder: 'Слово или корень',
    language: 'Язык интерфейса', home: 'К поиску', enter: 'Перейти',
    available: 'Доступно в демо', word: 'Слово', root: 'Корень', rootSpace: 'Пространство корня',
    orbit: 'Орбита слова', travel: 'Приближение к', returnRoot: 'Отдалиться к корню',
    noResult: 'Сейчас доступны корни و ق ي и ل ب ب. Введите арабское слово, корень или латинскую транскрипцию.',
    quran: 'Коран', structure: 'Строение слова', meaning: 'Значение',
    quranCaption: 'Вхождения', structureCaption: 'Форма и корень', meaningCaption: 'Смысловая памятка',
    close: 'Закрыть', references: 'Вхождения в Коране', referenceNote: 'Выберите аят, чтобы открыть его отдельное пространство и увидеть исследуемое слово внутри всей конструкции.',
    openVerse: 'Открыть аят', openWord: 'Открыть разбор слова', wordNumber: 'Слово', sura: 'Сура', occurrenceCount: 'Вхождения', verseCount: 'Аяты',
    wordType: 'Грамматическая форма',
    pattern: 'Модель', formation: 'Как образовано', sources: 'Источники', relatedWords: 'Связанные слова', aboutRoot: 'О корне', semanticStatus: 'Рабочее объяснение по источникам',
    rootScope: 'Показаны восемь групп Коранического корпуса и три дополнительные словарные формы. Это рабочая подборка, а не полный словарь всех производных корня.',
    meaningNote: 'Краткая словарная памятка. Она не заменяет рассмотрение слова в контексте конкретного аята.',
    lexicalQuran: 'Этой словарной формы нет среди восьми групп данного корня в Кораническом арабском корпусе. Вхождения для неё не приписаны другим словам.',
    linkedPassage: 'Связанное употребление', tuqatCrossReference: 'Сравните تُقَاتِهِ в 3:102:7. Корпус относит это употребление к группе تَقِيّ; здесь оно показано отдельно и не добавлено к счётчику.',
    allForms: 'Формы в демо', formsNote: 'Каждая орбита объединяет глагол и связанную именную семью. Номер породы относится к глаголу; существительное может иметь собственную модель. Это подборка, не полное древо корня.',
    familyI: 'I порода · семья وَقَىٰ', familyV: 'V порода · семья تَوَقَّىٰ', familyVIII: 'VIII порода · семья ٱتَّقَىٰ', familyLbbN: 'Именная семья · لُبّ / أَلْبَاب',
    families: 'Словообразовательные семьи', familyLabel: 'Семья', allOrbits: 'Все орбиты',
    lexical: 'Словарная форма', lexicalNote: 'Словарная форма. Кораническое вхождение этой формы в демо не заявлено.',
    source: 'Источник', sourceCorpus: 'Коранический арабский корпус', sourceLexicon: 'Арабский словарь', sourceAlmaany: 'Словарь «Аль-Маани»',
    shield: 'Средство защиты, покров; щит',
    verbs: 'Глаголы', nouns: 'Существительные', descriptions: 'Производные признаки',
    verbI: 'Глагол · I порода', verbV: 'Глагол · V порода', verbVIII: 'Глагол · VIII порода', noun: 'Существительное', nounShort: 'Сущ.', verbalNoun: 'Существительное действия (масдар)', verbalNounShort: 'Сущ. · масдар',
    participle: 'Причастие', adjective: 'Прилагательное', elative: 'Сравнительная форма',
    pause: 'Остановить движение', resume: 'Включить движение',
  },
  en: {
    search: 'Search', searchLabel: 'Find a word or root', placeholder: 'Word or root',
    language: 'Interface language', home: 'Back to search', enter: 'Explore',
    available: 'Available in this demo', word: 'Word', root: 'Root', rootSpace: 'Root space',
    orbit: 'Word orbit', travel: 'Approaching', returnRoot: 'Zoom out to root',
    noResult: 'The roots و ق ي and ل ب ب are available. Enter an Arabic word, root, or Latin transliteration.',
    quran: 'Quran', structure: 'Word structure', meaning: 'Meaning',
    quranCaption: 'Occurrences', structureCaption: 'Form and root', meaningCaption: 'Semantic note',
    close: 'Close', references: 'Quranic occurrences', referenceNote: 'Choose an ayah to open its own workspace and see the focus word inside the full construction.',
    openVerse: 'Open verse', openWord: 'Open word analysis', wordNumber: 'Word', sura: 'Surah', occurrenceCount: 'Occurrences', verseCount: 'Verses',
    wordType: 'Grammatical form',
    pattern: 'Pattern', formation: 'How it is formed', sources: 'Sources', relatedWords: 'Related words', aboutRoot: 'About the root', semanticStatus: 'Working explanation based on sources',
    rootScope: 'Eight Corpus groups and three additional dictionary forms are shown. This is a working selection, not a complete dictionary of every derivative.',
    meaningNote: 'A short lexical guide. Each occurrence still needs to be considered in the context of its verse.',
    lexicalQuran: 'This dictionary form is not among the eight groups listed for this root in the Quranic Arabic Corpus. Occurrences have not been borrowed from other words.',
    linkedPassage: 'Related usage', tuqatCrossReference: 'Compare تُقَاتِهِ at 3:102:7. The Corpus places it in the تَقِيّ group; it is shown separately here and is not added to the count.',
    allForms: 'Demo forms', formsNote: 'Each orbit groups a verb with its related nominal family. The form number describes the verb; a noun may have its own pattern. This is a selection, not a complete root tree.',
    familyI: 'Form I · وَقَىٰ family', familyV: 'Form V · تَوَقَّىٰ family', familyVIII: 'Form VIII · ٱتَّقَىٰ family', familyLbbN: 'Nominal family · لُبّ / أَلْبَاب',
    families: 'Derivational families', familyLabel: 'Family', allOrbits: 'All orbits',
    lexical: 'Dictionary form', lexicalNote: 'A dictionary form. No Quranic occurrence of this form is claimed in this demo.',
    source: 'Source', sourceCorpus: 'Quranic Arabic Corpus', sourceLexicon: 'Arabic Lexicon', sourceAlmaany: 'Almaany dictionary',
    shield: 'A means of protection, covering; shield',
    verbs: 'Verbs', nouns: 'Nominal forms', descriptions: 'Derived attributes',
    verbI: 'Verb · Form I', verbV: 'Verb · Form V', verbVIII: 'Verb · Form VIII', noun: 'Noun', nounShort: 'Noun', verbalNoun: 'Verbal noun (masdar)', verbalNounShort: 'Verbal noun',
    participle: 'Participle', adjective: 'Adjective', elative: 'Elative',
    pause: 'Pause motion', resume: 'Resume motion',
  },
}
export function normalizeQuery(value) {
  return value.normalize('NFKC').toLowerCase().replace(/ٱ/g, 'ا').replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED\s]/g, '')
}
const latinKey = (value) => value.normalize('NFD').replace(/[\u0300-\u036fʾ’']/g, '')
export function findWord(value) {
  const q = normalizeQuery(value)
  if (['таква', 'такуа'].includes(q)) return FORMS.find(form => form.id === 'taqwa')
  if (['альбаб', 'албаб'].includes(q)) return FORMS.find(form => form.id === 'albab')
  return FORMS.find(form => normalizeQuery(form.arabic) === q || latinKey(form.reading) === latinKey(q))
}
export function findRoot(value) {
  const q = normalizeQuery(value)
  if (['وقي', 'wqy'].includes(q)) return ROOT_DEMOS.wqy
  if (['لبب', 'lbb'].includes(q)) return ROOT_DEMOS.lbb
  return null
}
export function resolveQuery(value) {
  if (findRoot(value)) return 'root'
  if (findWord(value)) return 'word'
  return null
}
