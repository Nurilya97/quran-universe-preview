// Short editorial explanations based only on the public sources linked below.
// This is a lexical guide, not a translation of Quranic verses or a private archive.
export const CONTENT_SOURCES = {
  corpus: { url: 'https://corpus.quran.com/qurandictionary.jsp?q=wqy', ru: 'Коранический арабский корпус · University of Leeds', en: 'Quranic Arabic Corpus · University of Leeds' },
  raghib: { url: 'https://arabiclexicon.hawramani.com/?p=9899#3cb2a3', ru: 'Ар-Рагиб · «Аль-Муфрадат», وقى', en: 'Al-Raghib · Al-Mufradat, وقى' },
  jawhari: { url: 'https://arabiclexicon.hawramani.com/?p=9899#feef21', ru: 'Аль-Джаухари · «Ас-Сихах», وقى', en: 'Al-Jawhari · Al-Sihah, وقى' },
  laneWqy: { url: 'https://arabiclexicon.hawramani.com/?p=9899#0d72b9', ru: 'Lane · Arabic-English Lexicon, وقى', en: 'Lane · Arabic-English Lexicon, وقى' },
  laneTqy: { url: 'https://arabiclexicon.hawramani.com/?p=17705#09c7e5', ru: 'Lane · Arabic-English Lexicon, تقى', en: 'Lane · Arabic-English Lexicon, تقى' },
  ibnFaris: { url: 'https://arabiclexicon.hawramani.com/?p=15912#565c1b', ru: 'Ибн Фарис · «Мака̄йӣс аль-луга», وقى', en: 'Ibn Faris · Maqayis al-Lugha, وقى' },
  tuqatPattern: { url: 'https://www.greattafsirs.com/Tafsir_Library.aspx?AyahNo=28&MadhabNo=1&SoraNo=3&TafsirNo=5', ru: 'Аль-Куртуби · языковой разбор تُقَاة, 3:28', en: 'Al-Qurtubi · linguistic analysis of تُقَاة, 3:28' },
  tuqatCorpus: { url: 'https://corpus.quran.com/wordmorphology.jsp?location=(3:102:7)', ru: 'Разметка слова تُقَاتِهِ · 3:102:7', en: 'Annotation of تُقَاتِهِ · 3:102:7' },
}

export const ROOT_CONTENT = {
  ru: {
    lead: 'Ограждать защищаемое от достигающего его вреда.',
    body: 'Ибн Фарис связывает корень с отведением одного от другого посредством чего-то третьего. Ар-Рагиб объясняет وِقَايَة как сохранение чего-либо от того, что причиняет ему вред. Отсюда связаны действие защиты, средство защиты и оберегание себя.',
  },
  en: {
    lead: 'To keep harm from reaching what is being protected.',
    body: 'Ibn Faris connects the root with keeping one thing away from another by means of something else. Al-Raghib explains وِقَايَة as preserving something from what harms it. This connects the act of protecting, a means of protection, and guarding oneself.',
  },
  sources: ['ibnFaris', 'raghib'],
}

export const WORD_CONTENT = {
  waqa: {
    pattern: 'فَعَلَ', patternReading: 'faʿala',
    structure: {
      ru: ['Глагол I породы. Корневые буквы — و، ق، ي. Начальная و и конечная ي относятся к слабым согласным, поэтому в разных формах глагола они могут изменяться или выпадать.', 'В словарной форме وَقَىٰ конечная ي передана через ى. Настоящее время — يَقِي (yaqī), повелительная форма — قِ (qi).'],
      en: ['A Form I verb with the root letters و، ق، ي. The first and last root letters are weak consonants, so they may change or disappear in inflected forms.', 'The final ي appears as ى in وَقَىٰ. The present form is يَقِي (yaqī), and the singular imperative is قِ (qi).'],
    },
    meaning: {
      ru: { lead: 'Защищать, оберегать кого-либо или что-либо.', body: 'Действие направлено на сохранение того, кого защищают, от вреда. Что именно оберегают и от чего — определяется дополнениями и контекстом.' },
      en: { lead: 'To protect or preserve someone or something.', body: 'The action keeps its object safe from harm. The surrounding words identify who or what is protected and what they are protected from.' },
    },
    structureSources: ['jawhari', 'corpus'], meaningSources: ['raghib', 'laneWqy'], related: ['wiqaya', 'wiqaa', 'waq'],
  },
  ittaqa: {
    pattern: 'اِفْتَعَلَ', patternReading: 'iftaʿala',
    structure: {
      ru: ['Глагол VIII породы от و ق ي. При образовании этой формы начальная корневая و изменяется и сливается с ت модели: поэтому в ٱتَّقَىٰ видна удвоенная ت.', 'Настоящее время — يَتَّقِي (yattaqī). Регулярный масдар, то есть существительное действия, — اِتِّقَاء (ittiqāʾ). تَقْوَى — связанное существительное со своей моделью.'],
      en: ['A Form VIII verb from و ق ي. The first root letter و changes and assimilates with the pattern’s ت, producing the doubled ت in ٱتَّقَىٰ.', 'The present form is يَتَّقِي (yattaqī). The regular verbal noun is اِتِّقَاء (ittiqāʾ). تَقْوَى is a related noun with its own pattern.'],
    },
    meaning: {
      ru: { lead: 'Занимать активную защитную позицию.', body: 'Субъект действует так, чтобы сохранить себя. От какого вреда, последствия или нарушения границы — показывает конкретная конструкция и контекст. То, что названо после глагола, нельзя автоматически считать источником опасности: грамматическое дополнение и смысловая роль не тождественны.' },
      en: { lead: 'To take an active, protection-oriented stance.', body: 'The subject acts to safeguard themselves. The particular harm, consequence, or boundary is established by the construction and context. What follows the verb must not automatically be treated as a source of danger: grammatical object and semantic role are not identical.' },
    },
    structureSources: ['jawhari', 'laneTqy'], meaningSources: ['raghib', 'laneWqy'], related: ['taqwa', 'muttaqin', 'tuqat'],
  },
  taqwa: {
    pattern: 'فَعْلَى', patternReading: 'faʿlā',
    structure: {
      ru: ['Существительное, называющее качество или состояние. Оно связано с ٱتَّقَىٰ, но само не является глаголом VIII породы.', 'Здесь показан распространённый разбор по модели فَعْلَى. Корневая و соответствует начальной ت; изменение конечной ي участвует в образовании сочетания ـوَى. Поэтому корень остаётся و ق ي, хотя в слове видна ت.', 'Словари приводят и другие объяснения исторического образования. Орбита VIII обозначает словообразовательную семью, а не номер породы существительного.'],
      en: ['A noun naming a quality or state. It is related to ٱتَّقَىٰ, but is not itself a Form VIII verb.', 'The common analysis shown here uses فَعْلَى. The initial ت corresponds to the root’s و; a change involving the final ي contributes to ـوَى. The root therefore remains و ق ي despite the visible ت.', 'Dictionaries also record other accounts of its historical formation. Orbit VIII represents the derivational family, not a verb-form number assigned to the noun.'],
    },
    meaning: {
      ru: { lead: 'Защитная направленность, проявляющаяся во внутреннем состоянии, выборе и поступках.', body: 'Ар-Рагиб связывает تَقْوَى с помещением себя под защиту. В Коране слово раскрывается в нескольких смысловых слоях. Осознанность может поддерживать эту позицию; праведность может выражать её проявление или результат. Ни одно из этих слов не служит универсальной заменой تَقْوَى во всех контекстах.' },
      en: { lead: 'A protective orientation expressed in inner disposition, choices, and actions.', body: 'Al-Raghib connects تَقْوَى with placing oneself under protection. Quranic usage brings different layers into focus. Mindfulness can sustain this stance; righteousness can express a manifestation or outcome. Neither is a universal substitute for تَقْوَى in every context.' },
    },
    layers: [
      { ru: { title: 'Внутреннее состояние', text: 'Связь с сердцем: направленность человека не исчерпывается внешним действием.' }, en: { title: 'Inner disposition', text: 'Its connection with the heart extends beyond an outward act.' }, refs: ['22:32', '49:3'] },
      { ru: { title: 'Этическое проявление', text: 'Связь со справедливостью и совместным действием. Проявление качества помогает понять его, но не заменяет всё понятие.' }, en: { title: 'Ethical expression', text: 'Connections with justice and collective action. An expression of the quality helps explain it without replacing the whole concept.' }, refs: ['5:8', '5:2'] },
      { ru: { title: 'Направленность и руководство', text: 'Связь с принятием руководства и дальнейшим выбором человека.' }, en: { title: 'Orientation and guidance', text: 'A connection with receiving guidance and the choices that follow.' }, refs: ['47:17'] },
      { ru: { title: 'Образы защиты и опоры', text: 'Одежда, запас и основание раскрывают разные стороны концепции.' }, en: { title: 'Images of protection and support', text: 'Clothing, provision, and a foundation bring out different aspects of the concept.' }, refs: ['7:26', '2:197', '9:109'] },
    ],
    structureSources: ['laneTqy', 'jawhari'], meaningSources: ['raghib', 'laneTqy'], related: ['ittaqa', 'taqiyy', 'muttaqin'],
  },
  tuqat: {
    pattern: 'فُعَلَة', patternReading: 'fuʿala',
    structure: {
      ru: ['Существительное действия — масдар, связанный с ٱتَّقَىٰ. В разборе 3:28 корпус отмечает единственное число, женский род и винительный падеж: تُقَاةً.', 'Модель فُعَلَة приведена по языковому разбору аль-Куртуби: начальная و заменяется на ت, а конечная корневая ي — на долгий ā. В словарях обсуждаются и другие разборы формы.'],
      en: ['A verbal noun related to ٱتَّقَىٰ. At 3:28, the Corpus annotates تُقَاةً as feminine singular and accusative.', 'The pattern فُعَلَة follows Al-Qurtubi’s linguistic analysis: initial و becomes ت, and the final root ي becomes long ā. Dictionaries also discuss other analyses of this form.'],
    },
    meaning: {
      ru: { lead: 'Остережение, принятие мер защиты.', body: 'Слово называет само действие или состояние предосторожности. Аль-Джаухари связывает его с تَقِيَّة и глаголом ٱتَّقَىٰ. Значение конкретного употребления следует рассматривать в его контексте.' },
      en: { lead: 'Taking precautions or guarding oneself.', body: 'The word names the act or state of precaution. Al-Jawhari links it with تَقِيَّة and ٱتَّقَىٰ. Each occurrence should be understood in its own context.' },
    },
    structureSources: ['tuqatPattern', 'corpus'], meaningSources: ['jawhari', 'laneTqy'], related: ['ittaqa', 'taqwa'],
  },
  muttaqin: {
    pattern: 'مُفْتَعِل', patternReading: 'muftaʿil',
    structure: {
      ru: ['Действительное причастие VIII породы: называет того, кто совершает действие ٱتَّقَىٰ. Модель дана для единственного числа; в центре показана форма множественного числа.', 'Единственное число — مُتَّقٍ (muttaqin). Множественное — مُتَّقُونَ (muttaqūna) в именительном и مُتَّقِينَ (muttaqīna) в винительном или родительном падеже. Долгое ī отличает показанную форму множественного числа.'],
      en: ['An active participle of Form VIII, naming someone who performs ٱتَّقَىٰ. The pattern is singular; the displayed word is plural.', 'The singular is مُتَّقٍ (muttaqin). The plural is مُتَّقُونَ (muttaqūna) in the nominative and مُتَّقِينَ (muttaqīna) in the accusative or genitive. Long ī distinguishes the displayed plural form.'],
    },
    meaning: {
      ru: { lead: 'Те, кто придерживается защитной направленности تَقْوَى.', body: 'Причастие переносит внимание с действия ٱتَّقَىٰ на людей. В Коране они описываются через веру, расходование, исполнение обязательств, терпение и другие поступки. Это проявления качества; каждое из них не становится отдельным полным синонимом تَقْوَى.' },
      en: { lead: 'Those who maintain the protective orientation of تَقْوَى.', body: 'The participle shifts attention from ٱتَّقَىٰ to people. Quranic descriptions include belief, giving, fulfilling commitments, patience, and other actions. These express the quality; no single action becomes a complete synonym for تَقْوَى.' },
    },
    structureSources: ['corpus', 'laneTqy'], meaningSources: ['raghib', 'laneTqy'], related: ['ittaqa', 'taqwa'],
  },
  waq: {
    pattern: 'فَاعِل', patternReading: 'fāʿil',
    structure: {
      ru: ['Действительное причастие от глагола وَقَىٰ: называет того, кто защищает. У слабой основы وَاقِي конечная ي в некоторых падежных формах выпадает.', 'Неопределённая форма именительного или родительного падежа — وَاقٍ (wāqin); с артиклем — الْوَاقِي (al-wāqī). Подпись wāq передаёт чтение без падежного окончания.'],
      en: ['An active participle of وَقَىٰ, naming the one who protects. The weak stem وَاقِي loses its final ي in some case forms.', 'The indefinite nominative or genitive is وَاقٍ (wāqin); with the article it is الْوَاقِي (al-wāqī). The label wāq omits the case ending.'],
    },
    meaning: {
      ru: { lead: 'Защищающий, оберегающий; защитник.', body: 'Здесь действие защиты представлено через того, кто его осуществляет. В отличие от وِقَاء, акцент на защищающем, а не на средстве защиты.' },
      en: { lead: 'One who protects or guards; a protector.', body: 'The act of protection is expressed through whoever provides it. Unlike وِقَاء, the focus is on the protecting agent rather than the means of protection.' },
    },
    structureSources: ['corpus', 'jawhari'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  taqiyy: {
    pattern: 'فَعِيل', patternReading: 'faʿīl',
    structure: {
      ru: ['Прилагательное, обозначающее качество человека. فَعِيل — один из разборов модели, приводимых у Lane; там же обсуждается альтернативное историческое объяснение.', 'Слово близко по употреблению к مُتَّقٍ, но имеет другую форму. Множественное число — أَتْقِيَاء (atqiyāʾ). Удвоенная ي в تَقِيّ относится к строению слова.'],
      en: ['An adjective describing a person’s quality. فَعِيل is one of the pattern analyses recorded by Lane, who also discusses an alternative historical account.', 'Its usage is close to مُتَّقٍ, but its form differs. A plural is أَتْقِيَاء (atqiyāʾ). The doubled ي in تَقِيّ belongs to the word’s formation.'],
    },
    meaning: {
      ru: { lead: 'Человек, которому свойственна تَقْوَى.', body: 'Слово характеризует человека через качество. Lane сопоставляет его с مُتَّقٍ. Осторожность в поступках и праведное поведение относятся к возможным проявлениям; конкретный акцент задаёт контекст.' },
      en: { lead: 'A person characterised by تَقْوَى.', body: 'The adjective presents the quality as characteristic of a person. Lane compares it with مُتَّقٍ. Care in conduct and righteous behaviour are possible expressions; context determines the emphasis.' },
    },
    occurrenceNote: {
      ru: 'Особенность источника: корпус включает сюда تُقَاتِهِ из 3:102:7 и размечает его как существительное во множественном числе. Это иная словоформа, а не буквальное написание تَقِيّ. Счётчик сохраняет группировку корпуса.',
      en: 'Source distinction: the Corpus includes تُقَاتِهِ at 3:102:7 in this group and tags it as a plural noun. This is a different surface form, not the literal spelling تَقِيّ. The count preserves the Corpus grouping.',
    },
    structureSources: ['laneTqy'], meaningSources: ['laneTqy', 'jawhari'], related: ['taqwa', 'atqa', 'muttaqin'],
  },
  atqa: {
    pattern: 'أَفْعَل', patternReading: 'afʿal',
    structure: {
      ru: ['Сравнительная форма прилагательного: показывает большую степень качества. Традиционный арабский термин — اسم التفضيل.', 'Это не глагол IV породы. Конечный слабый согласный даёт ى. Конструкция может означать «более…» или «самый…» в зависимости от контекста.'],
      en: ['An elative adjective expressing a greater degree of a quality. The traditional Arabic term is اسم التفضيل.', 'It is not a Form IV verb. The final weak consonant gives ى. Depending on the construction, it can express “more…” or “most…”.'],
    },
    meaning: {
      ru: { lead: 'В большей степени обладающий تَقْوَى.', body: 'Сравнивается степень качества: большее остережение и оберегание себя от недолжного. Само основание сравнения задаёт контекст.' },
      en: { lead: 'Having a greater degree of تَقْوَى.', body: 'The form compares the degree of the quality: greater care in guarding oneself against wrongdoing. Context supplies the basis of comparison.' },
    },
    structureSources: ['laneTqy', 'corpus'], meaningSources: ['laneTqy'], related: ['taqiyy', 'taqwa'],
  },
  wiqaa: {
    pattern: 'فِعَال', patternReading: 'fiʿāl',
    structure: {
      ru: ['Существительное, обозначающее средство защиты. Оно связано с глаголом وَقَىٰ, поэтому находится с ним на внутренней орбите.', 'На месте конечной корневой ي после долгого ā появляется ء: وِقَاء. Аль-Джаухари также приводит вариант وَقَاء с другой начальной огласовкой.'],
      en: ['A noun naming a means of protection. It is related to وَقَىٰ and therefore shares the inner orbit with it.', 'After long ā, the final root ي appears as ء in وِقَاء. Al-Jawhari also records وَقَاء with a different initial vowel.'],
    },
    meaning: {
      ru: { lead: 'Средство защиты, защитный покров; щит.', body: 'Аль-Джаухари определяет его через то, чем защищают что-либо. «Щит» здесь — понятный пример средства защиты, а не ограничение слова только военным предметом.' },
      en: { lead: 'A means of protection, a protective covering; a shield.', body: 'Al-Jawhari defines it through what is used to protect something. A shield is one example of a protective means; the word is not limited to a military object.' },
    },
    structureSources: ['jawhari'], meaningSources: ['jawhari', 'raghib'], related: ['waqa', 'wiqaya', 'waq'],
  },
  wiqaya: {
    pattern: 'فِعَالَة', patternReading: 'fiʿāla',
    structure: {
      ru: ['Существительное действия — масдар от وَقَىٰ. Модель فِعَالَة называет действие защиты.', 'Корневая ي сохраняется перед окончанием ة: وِقَايَة. В словарях эта же форма может называть и то, что служит защитой.'],
      en: ['A verbal noun of وَقَىٰ. The pattern فِعَالَة names the act of protecting.', 'The root ي remains before the ending ة in وِقَايَة. Dictionaries also use the same form for something that provides protection.'],
    },
    meaning: {
      ru: { lead: 'Защита, предохранение, сохранение от вреда.', body: 'В определении ар-Рагиба главное — сохранение того, что защищают, от повреждения и вреда. В центре внимания действие защиты; в отдельных употреблениях — защитное средство.' },
      en: { lead: 'Protection, safeguarding, preservation from harm.', body: 'Al-Raghib’s definition focuses on keeping the protected object safe from damage and harm. The main focus is the act of protection, though some usages name a protective means.' },
    },
    structureSources: ['jawhari', 'raghib'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  tawaqqa: {
    pattern: 'تَفَعَّلَ', patternReading: 'tafaʿʿala',
    structure: {
      ru: ['Глагол V породы. Модель добавляет начальную ت и удваивает вторую корневую букву — ق. Корневая و остаётся видимой после ت.', 'Настоящее время — يَتَوَقَّى (yatawaqqā). Конечная корневая ي в показанной форме передана через ى.'],
      en: ['A Form V verb. The pattern adds initial ت and doubles the second root letter ق. The root و remains visible after ت.', 'The present form is يَتَوَقَّى (yatawaqqā). The final root ي appears as ى in the displayed form.'],
    },
    meaning: {
      ru: { lead: 'Остерегаться, беречься, принимать предосторожности.', body: 'Lane объясняет глагол через осторожность и защиту от того, чего следует избегать. Аль-Джаухари отмечает близость تَوَقَّى и ٱتَّقَىٰ по значению; их словообразовательные модели различны.' },
      en: { lead: 'To beware, guard oneself, or take precautions.', body: 'Lane explains the verb through caution and guarding against something. Al-Jawhari notes the closeness in meaning between تَوَقَّى and ٱتَّقَىٰ; their derivational patterns differ.' },
    },
    structureSources: ['laneWqy', 'jawhari'], meaningSources: ['laneWqy', 'jawhari'], related: ['waqa', 'ittaqa'],
  },
}
