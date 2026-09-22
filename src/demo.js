// Public interface demo only; no private research content.
// Rings group a verb with its lexical family, not a grammatical form number
// assigned to every noun. Public sources are exposed in the structure panel.
export const ROOT_ORBITS = [
  { id: 'I', radius: 24, label: 'familyI' },
  { id: 'V', radius: 34.5, label: 'familyV' },
  { id: 'VIII', radius: 45.5, label: 'familyVIII' },
]
export const LBB_ROOT_ORBITS = [
  { id: 'LBBI', mark: 'I', radius: 29, innerRadius: 20, label: 'familyLbbI' },
  { id: 'LBBII', mark: 'II', radius: 38, label: 'familyLbbII' },
  { id: 'LBBIV', mark: 'IV', radius: 47, label: 'familyLbbIV' },
  { id: 'LBBV', mark: 'V', radius: 56, label: 'familyLbbV' },
  { id: 'LBBX', mark: 'X', radius: 65, label: 'familyLbbX' },
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
  { id: 'labba', arabic: 'لَبَّ', reading: 'labba', orbit: 'LBBI', type: 'verbI', angle: 0, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'mixed', definitionRu: 'Быть или стать разумным; расколоть миндаль и вынуть ядро; ударить в область между ключицами; стоять напротив.', definitionEn: 'Form I: to be or become intelligent; to crack an almond and take out its kernel; to strike the upper-chest hollow; in other uses, to stand opposite.' },
  { id: 'labbaba', arabic: 'لَبَّبَ', reading: 'labbaba', orbit: 'LBBII', type: 'verbII', angle: 140, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'mixed', definitionRu: 'Сформировать или развить сердцевину зерна; собрать одежду у груди; схватить за одежду у груди или за ворот и потянуть.', definitionEn: 'Form II: of grain, to form or develop an inner kernel; of a person/clothing, to gather the garment at the chest or seize that part of the garment and pull.' },
  { id: 'alabba', arabic: 'أَلَبَّ', reading: 'alabba', orbit: 'LBBIV', type: 'verbIV', angle: 135, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'mixed', definitionRu: 'Образовать съедобную сердцевину (о посеве); оставаться при месте или деле, держаться его и не отходить.', definitionEn: 'Form IV: of crops, when the edible inner part develops; of a place or matter, to remain with it, keep to it, and not leave.' },
  { id: 'talabbaba', arabic: 'تَلَبَّبَ', reading: 'talabbaba', orbit: 'LBBV', type: 'verbV', angle: 225, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'Подтянуть и собрать одежду на себе, подпоясаться, приготовиться к действию или бою.', definitionEn: 'To gather and tuck up one’s clothing, gird oneself, and make ready for action or fighting.' },
  { id: 'istalabba', arabic: 'اِسْتَلَبَّ', reading: 'istalabba', orbit: 'LBBX', type: 'verbX', angle: 315, source: 'arabicLexiconLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Испытать чей-либо لُبّ — проверить его разум, понимание или проницательность.', definitionEn: 'To test a person’s لُبّ — their understanding, intelligence, or discernment.' },
  { id: 'lablabaVerb', arabic: 'لَبْلَبَ', reading: 'lablaba', orbit: 'LBBRQ', type: 'verbRQ', angle: 0, source: 'arabicLexiconLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'Редуплицированная четырёхбуквенная форма; в словарях для этой ветви фиксируются отдельные употребления.', definitionEn: 'A reduplicated quadriliteral form; lexicons record separate usages for this branch.' },

  // Main nominal entries
  { id: 'lubb', arabic: 'لُبّ', reading: 'lubb', orbit: 'LBBI', type: 'noun', angle: 22.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Сердцевина, ядро, внутренняя мякоть; чистая или лучшая часть; у человека — разум, понимание.', definitionEn: 'Core, kernel, inner pulp; pure or choicest part; in a person, understanding or intellect.' },
  { id: 'albab', arabic: 'أَلْبَاب', reading: 'albāb', orbit: 'LBBI', type: 'noun', angle: 45, radius: 23, source: 'lbbCorpus', rootKey: 'lbb', semanticBranch: 'core', definitionRu: 'Разумение; глубокое понимание.', definitionEn: 'Plural of لُبّ; in the Quran, “possessors of understanding / deep discernment.”' },
  { id: 'lubab', arabic: 'لُبَاب', reading: 'lubāb', orbit: 'LBBI', type: 'noun', angle: 67.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Чистая, лучшая, отборная часть вещи; её суть.', definitionEn: 'The pure, best, or choicest part of a thing; its essence.' },
  { id: 'labib', arabic: 'لَبِيب', reading: 'labīb', orbit: 'LBBI', type: 'adjective', angle: 90, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Разумный, проницательный человек — тот, кто обладает لُبّ.', definitionEn: 'An intelligent, discerning person — one who possesses لُبّ.' },
  { id: 'lababa', arabic: 'لَبَابَة', reading: 'labāba', orbit: 'LBBI', type: 'verbalNoun', angle: 112.5, radius: 32, source: 'lisanLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Разумность, проницательность; также небольшое пастбище или немного травы.', definitionEn: 'A verbal noun in the لَبَّ / لَبِيب line: becoming possessed of لُبّ — understanding or discernment. Lexicons also record the same spelling in a separate sense “a little pasture/herbage”; the two senses are kept distinct here.' },
  { id: 'labbNoun', arabic: 'لَبّ', reading: 'labb', orbit: 'LBBI', type: 'noun', angle: 135, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'stay', definitionRu: 'Пребывание; удерживание при ком-либо или при чём-либо.', definitionEn: 'A verbal noun of لَبَّ “to remain”: remaining or staying in attendance; from this comes one traditional explanation of لَبَّيْكَ.' },
  { id: 'ulbub', arabic: 'أُلْبُوب', reading: 'ulbūb', orbit: 'LBBI', type: 'noun', angle: 157.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'core', definitionRu: 'Съедобная внутренняя часть косточки или плода — буквальный образ внутреннего ядра.', definitionEn: 'The edible inner part of a stone or fruit — a literal image of the inner kernel.' },
  { id: 'lababPasture', arabic: 'لَبَاب', reading: 'labāb', orbit: 'LBBI', type: 'noun', angle: 202.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'separate', definitionRu: 'Небольшое количество пастбища или травы; в выражении لَبَابِ لَبَابِ — «не бойся / всё в порядке».', definitionEn: 'A separate attested lexical sense: a small amount of pasture or herbage. The expression لَبَابِ لَبَابِ is also recorded in a reassuring/favourable sense, roughly “no harm / all is well.”' },

  // Additional nominal forms
  { id: 'labab', arabic: 'لَبَب', reading: 'labab', orbit: 'LBBI', type: 'noun', angle: 180, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'لَبَب: верхняя часть груди; нагрудный ремень животного, удерживающий седло; также передняя / тонкая часть песчаного холма.', definitionEn: 'لَبَب: the upper chest; a breast-girth that keeps a saddle from slipping; also the fore/thin part of a sand-hill.' },
  { id: 'labbaChest', arabic: 'لَبَّة', reading: 'labba', orbit: 'LBBI', type: 'noun', angle: 247.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'لَبَّة: впадина в верхней части груди между ключицами, прямо под горлом; место, где лежит ожерелье.', definitionEn: 'لَبَّة: the hollow at the upper chest between the collarbones, just below the throat; the place where a necklace rests.' },
  { id: 'libaba', arabic: 'لِبَابَة', reading: 'libāba', orbit: 'LBBI', type: 'noun', angle: 225, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'Одежда или накидка, которую надевают поверх и собирают на верхней части груди и плечах.', definitionEn: 'A garment or drapery worn over other clothing and gathered over the upper chest and shoulders.' },
  { id: 'labiba', arabic: 'لَبِيبَة', reading: 'labība', orbit: 'LBBI', type: 'noun', angle: 292.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'garment', definitionRu: 'Определённый вид одежды.', definitionEn: 'The name of a particular kind of garment; Lane defines it by comparison with بَقِيرَة. It is retained as a distinct attested lexical sense.' },
  { id: 'malbub', arabic: 'مَلْبُوب', reading: 'malbūb', orbit: 'LBBI', type: 'adjective', angle: 270, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'mixed', definitionRu: 'Обладающий разумением, характеризуемый لُبّ; животное, на котором закреплён нагрудный ремень لَبَب.', definitionEn: 'مَـ marks the locus / bearer where the root meaning manifests; مَفْعُول specifies that the action or state is realised on that bearer. Lexicons record two senses: “characterised by understanding, possessing لُبّ” and “a beast fitted with a لَبَب breast-girth.”' },
  { id: 'mulabb', arabic: 'مُلَبّ', reading: 'mulabb', orbit: 'LBBI', type: 'adjective', angle: 337.5, radius: 32, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'Животное, снабжённое нагрудным ремнём لَبَب.', definitionEn: 'The bearer of the state expressed by this derived form: here, a beast furnished with a لَبَب breast-girth.' },
  { id: 'mulbab', arabic: 'مُلْبَب', reading: 'mulbab', orbit: 'LBBI', type: 'adjective', angle: 315, radius: 23, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'Животное, снабжённое нагрудным ремнём لَبَب.', definitionEn: 'The bearer of the state expressed by this form: an attested variant for a beast fitted with a لَبَب breast-girth.' },

  // Other entries indexed in the classical lexical family
  { id: 'talbib', arabic: 'تَلْبِيب', reading: 'talbīb', orbit: 'LBBII', type: 'noun', angle: 0, source: 'laneLbb', rootKey: 'lbb', lexicalOnly: true, semanticBranch: 'chest', definitionRu: 'Часть одежды у верхней груди; схватить за эту часть одежды или за ворот и потянуть.', definitionEn: 'تَلْبِيب: the portion of clothing at the upper chest; أَخَذَ بِتَلْبِيبِهِ means to seize a person by that part of the garment / collar and pull.' },
  { id: 'lablab', arabic: 'لَبْلَب', reading: 'lablab', orbit: 'LBBRQ', type: 'adjective', angle: 60, source: 'laneLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'لَبْلَب / لُبْلُب: добрый и благожелательный к своей семье и соседям.', definitionEn: 'لَبْلَب / لُبْلُب: kind and beneficent to one’s family and neighbours.' },
  { id: 'bilabalib', arabic: 'بِلَبَالِبِ', reading: 'bilabālibi', orbit: 'LBBRQ', type: 'lexicalForm', angle: 120, source: 'laneLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'Бِلَبَالِبِ — в выражении о самой глубокой сердечной привязанности; لَبَالِب также обозначает смешанный шум овец или коз.', definitionEn: 'بِلَبَالِبِ occurs in an expression of the tenderest heartfelt affection; لَبَالِب also denotes the confused cries of sheep or goats.' },
  { id: 'lablabaNoun', arabic: 'لَبْلَبَة', reading: 'lablaba', orbit: 'LBBRQ', type: 'noun', angle: 180, source: 'laneLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'Звукоподражательное слово для крика козла во время гона.', definitionEn: 'An imitative word for the cry of a he-goat at rutting-time.' },
  { id: 'lablabPlant', arabic: 'لَبْلَاب', reading: 'lablāb', orbit: 'LBBRQ', type: 'noun', angle: 240, source: 'laneLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'لَبْلَاب: название вьющегося растения.', definitionEn: 'لَبْلَاب: a name for a climbing plant.' },
  { id: 'lawlab', arabic: 'لَوْلَب', reading: 'lawlab', orbit: 'LBBRQ', type: 'lexicalForm', angle: 300, source: 'laneLbb', rootKey: 'lbb', relatedOnly: true, lexicalOnly: true, semanticBranch: 'rq', definitionRu: 'لَوْلَب: отдельная словарная форма, на которую статья этого гнезда даёт перекрёстную ссылку.', definitionEn: 'لَوْلَب: a separate lexical form cross-referenced from this lexical family.' },
]

export function rootPosition(form, orbits = ROOT_ORBITS) {
  // A form's family orbit is the source of truth for its radial position.
  // Individual nodes may choose an angle, but must never drift between rings.
  const orbit = orbits.find((orbit) => orbit.id === form.orbit) || orbits[0]
  // Both tracks belong to family I; legacy radius selects a track, never another family.
  const orbitRadius = orbit.innerRadius && form.radius === 23 ? orbit.innerRadius : orbit.radius
  const radians = form.angle * Math.PI / 180
  return { x: 50 + Math.cos(radians) * orbitRadius, y: 50 + Math.sin(radians) * orbitRadius }
}
export function rootForWord(word) {
  return ROOT_DEMOS[word?.rootKey || 'wqy'] || ROOT_DEMOS.wqy
}
export function formsForRoot(rootKey = 'wqy') {
  return FORMS.filter(form => (form.rootKey || 'wqy') === rootKey && !form.relatedOnly)
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
    pattern: 'Модель', formation: 'Как образовано', sources: 'Источники', relatedWords: 'Связанные слова', aboutRoot: 'О корне', semanticStatus: 'Смысловой разбор по Корану и источникам',
    rootScope: 'Показаны восемь групп Коранического корпуса и три дополнительные словарные формы. Это рабочая подборка, а не полный словарь всех производных корня.',
    meaningNote: 'Краткая словарная памятка. Она не заменяет рассмотрение слова в контексте конкретного аята.',
    lexicalQuran: 'Этой словарной формы нет среди восьми групп данного корня в Кораническом арабском корпусе. Вхождения для неё не приписаны другим словам.',
    linkedPassage: 'Связанное употребление', tuqatCrossReference: 'Сравните تُقَاتِهِ в 3:102:7. Корпус относит это употребление к группе تَقِيّ; здесь оно показано отдельно и не добавлено к счётчику.',
    allForms: 'Формы в демо', formsNote: 'Каждая орбита объединяет глагол и связанную именную семью. Номер породы относится к глаголу; существительное может иметь собственную модель. Это подборка, не полное древо корня.',
    familyI: 'I порода · семья وَقَىٰ', familyV: 'V порода · семья تَوَقَّىٰ', familyVIII: 'VIII порода · семья ٱتَّقَىٰ',
    familyLbbI: 'I форма · базовая семья', familyLbbII: 'II форма · فَعَّلَ', familyLbbIV: 'IV форма · أَفْعَلَ', familyLbbV: 'V форма · تَفَعَّلَ', familyLbbX: 'X форма · اِسْتَفْعَلَ', familyLbbRQ: 'R.Q. I · редуплицированная четырёхбуквенная форма',
    families: 'Словообразовательные семьи', familyLabel: 'Семья', allOrbits: 'Все орбиты',
    rootLegend: 'Обозначения пространства корня',
    orbitRingLegend: 'кольцо — семья',
    quranColorLegend: 'есть в Коране',
    formNumberLegend: 'форма семьи',
    innerOrbitLegend: 'пунктир — доп. зона I семьи',
    lexical: 'Словарная форма', lexicalNote: 'Словарная форма. Кораническое вхождение этой формы в демо не заявлено.',
    source: 'Источник', sourceCorpus: 'Коранический арабский корпус', sourceLexicon: 'Арабский словарь', sourceAlmaany: 'Словарь «Аль-Маани»',
    shield: 'Средство защиты, покров; щит',
    verbs: 'Глаголы', nouns: 'Существительные', descriptions: 'Производные признаки',
    verbI: 'Глагол · I порода', verbII: 'Глагол · II порода', verbIV: 'Глагол · IV порода', verbV: 'Глагол · V порода', verbVIII: 'Глагол · VIII порода', verbX: 'Глагол · X порода', verbRQ: 'R.Q. I · редуплицированная четырёхбуквенная форма',
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
    pattern: 'Pattern', formation: 'How it is formed', sources: 'Sources', relatedWords: 'Related words', aboutRoot: 'About the root', semanticStatus: 'Quran-first semantic analysis with sources',
    rootScope: 'Eight Corpus groups and three additional dictionary forms are shown. This is a working selection, not a complete dictionary of every derivative.',
    meaningNote: 'A short lexical guide. Each occurrence still needs to be considered in the context of its verse.',
    lexicalQuran: 'This dictionary form is not among the eight groups listed for this root in the Quranic Arabic Corpus. Occurrences have not been borrowed from other words.',
    linkedPassage: 'Related usage', tuqatCrossReference: 'Compare تُقَاتِهِ at 3:102:7. The Corpus places it in the تَقِيّ group; it is shown separately here and is not added to the count.',
    allForms: 'Demo forms', formsNote: 'Each orbit groups a verb with its related nominal family. The form number describes the verb; a noun may have its own pattern. This is a selection, not a complete root tree.',
    familyI: 'Form I · وَقَىٰ family', familyV: 'Form V · تَوَقَّىٰ family', familyVIII: 'Form VIII · ٱتَّقَىٰ family',
    familyLbbI: 'Form I · base family', familyLbbII: 'Form II · فَعَّلَ', familyLbbIV: 'Form IV · أَفْعَلَ', familyLbbV: 'Form V · تَفَعَّلَ', familyLbbX: 'Form X · اِسْتَفْعَلَ', familyLbbRQ: 'R.Q. I · reduplicated quadriliteral form',
    families: 'Derivational families', familyLabel: 'Family', allOrbits: 'All orbits',
    rootLegend: 'Root-space legend',
    orbitRingLegend: 'ring — family',
    quranColorLegend: 'in the Quran',
    formNumberLegend: 'family form',
    innerOrbitLegend: 'dashed — extra Form I zone',
    lexical: 'Dictionary form', lexicalNote: 'A dictionary form. No Quranic occurrence of this form is claimed in this demo.',
    source: 'Source', sourceCorpus: 'Quranic Arabic Corpus', sourceLexicon: 'Arabic Lexicon', sourceAlmaany: 'Almaany dictionary',
    shield: 'A means of protection, covering; shield',
    verbs: 'Verbs', nouns: 'Nominal forms', descriptions: 'Derived attributes',
    verbI: 'Verb · Form I', verbII: 'Verb · Form II', verbIV: 'Verb · Form IV', verbV: 'Verb · Form V', verbVIII: 'Verb · Form VIII', verbX: 'Verb · Form X', verbRQ: 'R.Q. I · reduplicated quadriliteral form',
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

