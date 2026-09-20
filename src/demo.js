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
  { id: 'LBBV', mark: 'Vb', radius: 21, label: 'familyLbbVerbs' },
  { id: 'LBBN1', mark: 'N', radius: 31, label: 'familyLbbNouns' },
  { id: 'LBBN2', mark: 'N₂', radius: 40, label: 'familyLbbNounsMore' },
  { id: 'LBBX', mark: 'Lex', radius: 48, label: 'familyLbbLexical' },
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
  // ل ب ب / لب — broad lexical family. The orbit is intentionally fuller than the Quran-only subset.
  // Verbal forms
  { id: 'labba', arabic: 'لَبَّ', reading: 'labba', orbit: 'LBBV', type: 'verbI', angle: 0, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Быть или стать разумным; также оставаться / пребывать — по употреблению.', definitionEn: 'To be or become intelligent; also to remain or stay, depending on usage.' },
  { id: 'labbaba', arabic: 'لَبَّبَ', reading: 'labbaba', orbit: 'LBBV', type: 'verbII', angle: 60, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Схватить за ворот или собрать одежду у груди; в отдельных употреблениях — о зерне, сформировать внутреннее ядро.', definitionEn: 'To seize by the collar or gather clothing at the chest; in some usages, of grain, to form an inner kernel.' },
  { id: 'alabba', arabic: 'أَلَبَّ', reading: 'alabba', orbit: 'LBBV', type: 'verbIV', angle: 120, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Оставаться, пребывать, держаться дела; в отдельных употреблениях — о зерне, наполниться мякотью.', definitionEn: 'To remain, stay, or keep to a matter; in some usages, of grain, to become pulpy.' },
  { id: 'talabbaba', arabic: 'تَلَبَّبَ', reading: 'talabbaba', orbit: 'LBBV', type: 'verbV', angle: 180, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Подпоясаться, собрать одежду у груди, приготовиться; также пройти долину.', definitionEn: 'To gird oneself, gather clothing at the chest, make ready; also to traverse a valley.' },
  { id: 'istalabba', arabic: 'اِسْتَلَبَّ', reading: 'istalabba', orbit: 'LBBV', type: 'verbX', angle: 240, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Испытать чей-либо لُبّ — разум / понимание.', definitionEn: 'To test a person’s لُبّ — understanding or intelligence.' },
  { id: 'lablabaVerb', arabic: 'لَبْلَبَ', reading: 'lablaba', orbit: 'LBBV', type: 'verbRQ', angle: 300, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Проявлять заботу или сострадание; словари фиксируют редуплицированную глагольную ветвь.', definitionEn: 'To show care or compassion; lexicons record this reduplicated verbal branch.' },

  // Main nominal entries
  { id: 'lubb', arabic: 'لُبّ', reading: 'lubb', orbit: 'LBBN1', type: 'noun', angle: 10, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Сердцевина, ядро, внутренняя мякоть; чистая или лучшая часть; разум / понимание.', definitionEn: 'Core, kernel, inner pulp; pure or choicest part; understanding or intellect.' },
  { id: 'albab', arabic: 'أَلْبَاب', reading: 'albāb', orbit: 'LBBN1', type: 'noun', angle: 55, source: 'lbbCorpus', rootKey: 'lbb', definitionRu: 'Множественное от لُبّ; в Коране — разумение / способности разумения.', definitionEn: 'Plural of لُبّ; in the Quran, understandings / discerning intellects.' },
  { id: 'lubab', arabic: 'لُبَاب', reading: 'lubāb', orbit: 'LBBN1', type: 'noun', angle: 100, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Чистая, лучшая, отборная часть; суть.', definitionEn: 'Pure, best, or choicest part; essence.' },
  { id: 'labib', arabic: 'لَبِيب', reading: 'labīb', orbit: 'LBBN1', type: 'adjective', angle: 145, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Разумный, проницательный, обладающий пониманием.', definitionEn: 'Intelligent, discerning, possessing understanding.' },
  { id: 'lababa', arabic: 'لَبَابَة', reading: 'labāba', orbit: 'LBBN1', type: 'noun', angle: 190, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Разумность / проницательность; также отдельная словарная форма со значением небольшого пастбища.', definitionEn: 'Intelligence / discernment; also a separate lexical usage referring to a small amount of pasture.' },
  { id: 'labbNoun', arabic: 'لَبّ', reading: 'labb', orbit: 'LBBN1', type: 'noun', angle: 235, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Пребывание / удерживание; в устойчивой линии — служение, послушание.', definitionEn: 'Remaining / keeping to something; in an established line, service or obedience.' },
  { id: 'ulbub', arabic: 'أُلْبُوب', reading: 'ulbūb', orbit: 'LBBN1', type: 'noun', angle: 280, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Съедобная внутренняя часть косточки или плода в одном из словарных употреблений.', definitionEn: 'The edible inner part of a stone or fruit in one lexical usage.' },
  { id: 'lababPasture', arabic: 'لَبَاب', reading: 'labāb', orbit: 'LBBN1', type: 'noun', angle: 325, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Небольшой участок пастбища / растительности; также форма в устойчивом выражении.', definitionEn: 'A small amount of pasture or herbage; also a form used in an established expression.' },

  // Additional nominal forms
  { id: 'labab', arabic: 'لَبَب', reading: 'labab', orbit: 'LBBN2', type: 'noun', angle: 0, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Верхняя часть груди; нагрудный ремень; также передняя или тонкая часть песчаного холма.', definitionEn: 'Upper chest; breast-girth; also the fore or thin part of a sand-hill.' },
  { id: 'labbaChest', arabic: 'لَبَّة', reading: 'labba', orbit: 'LBBN2', type: 'noun', angle: 51, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Область верхней груди между ключицами; место, где лежит ожерелье.', definitionEn: 'The upper chest between the collar-bones; the place where a necklace rests.' },
  { id: 'libaba', arabic: 'لِبَابَة', reading: 'libāba', orbit: 'LBBN2', type: 'noun', angle: 103, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Одежда или накидка, которую носят собранной на верхней части груди и плечах.', definitionEn: 'A garment or drapery worn over the upper chest and shoulders.' },
  { id: 'labiba', arabic: 'لَبِيبَة', reading: 'labība', orbit: 'LBBN2', type: 'noun', angle: 154, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Название определённого вида одежды.', definitionEn: 'The name of a particular kind of garment.' },
  { id: 'malbub', arabic: 'مَلْبُوب', reading: 'malbūb', orbit: 'LBBN2', type: 'adjective', angle: 206, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'В одной линии — характеризуемый разумением; в другой — животное с нагрудным ремнём.', definitionEn: 'In one line, described as possessing understanding; in another, a beast fitted with a breast-girth.' },
  { id: 'mulabb', arabic: 'مُلَبّ', reading: 'mulabb', orbit: 'LBBN2', type: 'adjective', angle: 257, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Животное, снабжённое нагрудным ремнём لَبَب.', definitionEn: 'A beast furnished with a لَبَب breast-girth.' },
  { id: 'mulbab', arabic: 'مُلْبَب', reading: 'mulbab', orbit: 'LBBN2', type: 'adjective', angle: 309, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Животное, снабжённое нагрудным ремнём لَبَب.', definitionEn: 'A beast furnished with a لَبَب breast-girth.' },

  // Other entries indexed in the classical lexical family
  { id: 'talbib', arabic: 'تَلْبِيب', reading: 'talbīb', orbit: 'LBBX', type: 'noun', angle: 0, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Часть одежды у области لَبَب; также действие схватывания за одежду у груди.', definitionEn: 'The portion of clothing at the لَبَب area; also the act of seizing clothing at the bosom.' },
  { id: 'lablab', arabic: 'لَبْلَب', reading: 'lablab', orbit: 'LBBX', type: 'adjective', angle: 60, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Добрый и благожелательный к семье и соседям.', definitionEn: 'Kind and beneficent to one’s family and neighbours.' },
  { id: 'bilabalib', arabic: 'بِلَبَالِبِ', reading: 'bilabālibi', orbit: 'LBBX', type: 'lexicalForm', angle: 120, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Форма в выражениях о глубокой сердечной привязанности; لَبَالِب также обозначает смешанный шум овец или коз.', definitionEn: 'A form used in expressions of deep heartfelt affection; لَبَالِب also denotes the confused cries of sheep or goats.' },
  { id: 'lablabaNoun', arabic: 'لَبْلَبَة', reading: 'lablaba', orbit: 'LBBX', type: 'noun', angle: 180, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Звукоподражательное слово для крика козла во время гона.', definitionEn: 'An imitative word for the cry of a he-goat at rutting-time.' },
  { id: 'lablabPlant', arabic: 'لَبْلَاب', reading: 'lablāb', orbit: 'LBBX', type: 'noun', angle: 240, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Название вьющегося растения в одной из словарных статей.', definitionEn: 'A name for a climbing plant in one lexical entry.' },
  { id: 'lawlab', arabic: 'لَوْلَب', reading: 'lawlab', orbit: 'LBBX', type: 'lexicalForm', angle: 300, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, definitionRu: 'Отдельная словарная форма, перекрёстно индексируемая рядом с этой семьёй.', definitionEn: 'A separate lexical form cross-indexed with this family.' },
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
    familyI: 'I порода · семья وَقَىٰ', familyV: 'V порода · семья تَوَقَّىٰ', familyVIII: 'VIII порода · семья ٱتَّقَىٰ',
    familyLbbVerbs: 'Глагольные формы', familyLbbNouns: 'Именные формы', familyLbbNounsMore: 'Дополнительные именные формы', familyLbbLexical: 'Другие словарные формы',
    families: 'Словообразовательные семьи', familyLabel: 'Семья', allOrbits: 'Все орбиты',
    lexical: 'Словарная форма', lexicalNote: 'Словарная форма. Кораническое вхождение этой формы в демо не заявлено.',
    source: 'Источник', sourceCorpus: 'Коранический арабский корпус', sourceLexicon: 'Арабский словарь', sourceAlmaany: 'Словарь «Аль-Маани»',
    shield: 'Средство защиты, покров; щит',
    verbs: 'Глаголы', nouns: 'Существительные', descriptions: 'Производные признаки',
    verbI: 'Глагол · I порода', verbII: 'Глагол · II порода', verbIV: 'Глагол · IV порода', verbV: 'Глагол · V порода', verbVIII: 'Глагол · VIII порода', verbX: 'Глагол · X порода', verbRQ: 'Редуплицированный глагол',
    noun: 'Существительное', nounShort: 'Сущ.', verbalNoun: 'Существительное действия (масдар)', verbalNounShort: 'Сущ. · масдар',
    participle: 'Причастие', adjective: 'Прилагательное', elative: 'Сравнительная форма', lexicalForm: 'Словарная форма',
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
    familyI: 'Form I · وَقَىٰ family', familyV: 'Form V · تَوَقَّىٰ family', familyVIII: 'Form VIII · ٱتَّقَىٰ family',
    familyLbbVerbs: 'Verbal forms', familyLbbNouns: 'Nominal forms', familyLbbNounsMore: 'Additional nominal forms', familyLbbLexical: 'Other lexical forms',
    families: 'Derivational families', familyLabel: 'Family', allOrbits: 'All orbits',
    lexical: 'Dictionary form', lexicalNote: 'A dictionary form. No Quranic occurrence of this form is claimed in this demo.',
    source: 'Source', sourceCorpus: 'Quranic Arabic Corpus', sourceLexicon: 'Arabic Lexicon', sourceAlmaany: 'Almaany dictionary',
    shield: 'A means of protection, covering; shield',
    verbs: 'Verbs', nouns: 'Nominal forms', descriptions: 'Derived attributes',
    verbI: 'Verb · Form I', verbII: 'Verb · Form II', verbIV: 'Verb · Form IV', verbV: 'Verb · Form V', verbVIII: 'Verb · Form VIII', verbX: 'Verb · Form X', verbRQ: 'Reduplicated verb',
    noun: 'Noun', nounShort: 'Noun', verbalNoun: 'Verbal noun (masdar)', verbalNounShort: 'Verbal noun',
    participle: 'Participle', adjective: 'Adjective', elative: 'Elative', lexicalForm: 'Lexical form',
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
