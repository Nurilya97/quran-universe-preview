// Quran Universe — public Word Structure teaching model for و ق ي.
// UI taxonomy follows a simple morpheme-first model:
// root (stored separately), prefix, suffix, ending, particle, and internal form/pattern.
// Only roles actually present in a word are shown in the legend.
//
// Important: "form" is not an extra morpheme with a standalone translation.
// It marks visible material whose role belongs to the derivational pattern or to a
// morphophonological change inside that pattern.

export const MORPH_ROLES = {
  root: { ru: 'Корень', en: 'Root' },
  prefix: { ru: 'Префикс', en: 'Prefix' },
  suffix: { ru: 'Суффикс', en: 'Suffix' },
  ending: { ru: 'Окончание', en: 'Ending' },
  particle: { ru: 'Частица', en: 'Particle' },
  form: { ru: 'Форма', en: 'Form' },
}

export const MORPH_COPY = {
  ru: {
    analysis: 'Разбор слова',
    root: 'Корень',
    derivedFrom: 'Происходит от',
    patternEffect: 'Что нам даёт форма',
    technical: 'Технический разбор',
    noSeparateMeaning: 'Отдельно не переводится: его функция появляется только внутри всей формы.',
  },
  en: {
    analysis: 'Word analysis',
    root: 'Root',
    derivedFrom: 'Comes from',
    patternEffect: 'What the form tells us',
    technical: 'Technical analysis',
    noSeparateMeaning: 'It is not translated separately: its function exists only inside the whole form.',
  },
}

export const MORPHOLOGY = {
  waqa: {
    displayArabic: 'وَقَىٰ',
    visualParts: [
      { text: 'وَ', role: 'root' },
      { text: 'قَ', role: 'root' },
      { text: 'ىٰ', role: 'form' },
    ],
    components: [],
    derivedFrom: null,
    pattern: {
      ar: 'فَعَلَ', reading: 'faʿala',
      ru: { title: 'Глагол I формы', text: 'Передаёт базовое действие корня: защищать, оберегать.' },
      en: { title: 'Form I verb', text: 'Expresses the basic root action: to protect, to guard.' },
    },
    technical: {
      ru: ['Третья корневая — ي. В конечной слабой позиции словарной формы она проявляется как ىٰ.'],
      en: ['The third root consonant is ي. In this final weak position of the citation form it appears as ىٰ.'],
    },
  },

  waq: {
    displayArabic: 'وَاقٍ',
    visualParts: [
      { text: 'وَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ق', role: 'root' },
      { text: 'ٍ', role: 'ending' },
    ],
    components: [
      {
        role: 'ending', ar: 'ـٍ', reading: '-in',
        ru: 'Касратан здесь маркирует неопределённую форму в رفع/جر. Это грамматика готового слова, а не его основное значение.',
        en: 'Kasratan marks the indefinite nominative/genitive surface form here. It is grammar added to the word, not its lexical meaning.',
      },
    ],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'وَقَىٰ называет действие «защищать»; وَاقٍ называет того, кто это действие выполняет.',
      en: 'وَقَىٰ names the action “to protect”; وَاقٍ names the one who performs it.',
    },
    pattern: {
      ar: 'فَاعِل', reading: 'fāʿil',
      ru: { title: 'Действительное причастие · اسم الفاعل', text: 'Модель переводит действие на деятеля: وَقَىٰ «защищать» → وَاقٍ «защищающий / защитник». Алиф — часть этой модели; сам по себе он не означает «деятель».' },
      en: { title: 'Active participle · اسم الفاعل', text: 'The pattern shifts from the action to its doer: وَقَىٰ “to protect” → وَاقٍ “one who protects / protector”. The alif belongs to the pattern; it does not mean “doer” by itself.' },
    },
    technical: {
      ru: ['Основа действительного причастия — وَاقِي.', 'В неопределённом رفع/جر у اسم منقوص конечная ي основы выпадает: وَاقِي → وَاقٍ.'],
      en: ['The active-participle stem is وَاقِي.', 'In the indefinite nominative/genitive of an اسم منقوص, stem-final ي drops: وَاقِي → وَاقٍ.'],
    },
  },

  ittaqa: {
    displayArabic: 'ٱتَّقَىٰ',
    visualParts: [
      { text: 'ٱتَّ', role: 'form' },
      { text: 'قَ', role: 'root' },
      { text: 'ىٰ', role: 'form' },
    ],
    components: [],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'Базовый глагол называет защиту. VIII форма перестраивает это действие так, что оно относится к позиции самого субъекта.',
      en: 'The base verb names protection. Form VIII reshapes the action so that it concerns the subject’s own stance.',
    },
    pattern: {
      ar: 'اِفْتَعَلَ', reading: 'iftaʿala',
      ru: { title: 'Глагол VIII формы', text: 'В этом корне форма даёт смысловую линию «беречь себя / остерегаться / принимать защитную позицию». Это функция всей формы, а не отдельной буквы ت.' },
      en: { title: 'Form VIII verb', text: 'In this root, the form gives the semantic line “guard oneself / be cautious / take a protective stance”. This comes from the whole form, not from the letter ت by itself.' },
    },
    technical: {
      ru: ['اِوْتَقَى → اِتْتَقَى: начальная корневая و заменяется на ت перед ت формы VIII.', 'اِتْتَقَى → اِتَّقَى: две соседние ت сливаются и обозначаются шаддой.', 'Конечная корневая ي в этой форме проявляется как ىٰ.'],
      en: ['اِوْتَقَى → اِتْتَقَى: initial root و is replaced by ت before the Form VIII ت.', 'اِتْتَقَى → اِتَّقَى: the adjacent ت consonants merge and are marked with shadda.', 'Final root ي appears here as ىٰ.'],
    },
  },

  muttaqin: {
    displayArabic: 'مُتَّقِينَ',
    visualParts: [
      { text: 'مُ', role: 'prefix' },
      { text: 'تَّ', role: 'form' },
      { text: 'قِ', role: 'root' },
      { text: 'ينَ', role: 'ending' },
    ],
    components: [
      {
        role: 'prefix', ar: 'مُـ', reading: 'mu-',
        ru: 'Часть образования действительного причастия от производного глагола. Само مُـ не означает «обладатель качества» без остальной модели.',
        en: 'Part of active-participle formation from a derived verb. مُـ does not mean “possessor of the quality” independently of the whole pattern.',
      },
      {
        role: 'ending', ar: 'ـينَ', reading: '-īna',
        ru: 'Окончание мужского سالم-множественного в نصب/جر. Оно показывает число и падеж, но не создаёт лексическое значение слова.',
        en: 'The sound masculine plural ending in the accusative/genitive. It marks number and case but does not create the lexical meaning.',
      },
    ],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы', metaEn: 'Form VIII verb',
      ru: 'Глагол называет действие/позицию; причастие называет человека, который это действие осуществляет или им характеризуется.',
      en: 'The verb names the action/stance; the participle names a person who enacts it or is characterised by it.',
    },
    pattern: {
      ar: 'مُفْتَعِل', reading: 'muftaʿil',
      ru: { title: 'Действительное причастие VIII формы', text: 'Переводит действие ٱتَّقَىٰ на его носителя. Сначала образуется مُتَّقٍ, а уже затем множественное مُتَّقِينَ.' },
      en: { title: 'Form VIII active participle', text: 'Shifts the action ٱتَّقَىٰ to its bearer. First مُتَّقٍ is formed; the plural مُتَّقِينَ comes afterwards.' },
    },
    technical: {
      ru: ['В основе действует то же و → ت → تّ, что и в ٱتَّقَىٰ.', 'Единственная основа содержит конечную корневую ي: مُتَّقِي / مُتَّقٍ.', 'При سالم-множественном эта ي основы удаляется, затем добавляется окончание ـونَ или ـينَ. Поэтому видимая ي в مُتَّقِينَ относится к окончанию ـينَ.'],
      en: ['The stem carries the same و → ت → تّ process as ٱتَّقَىٰ.', 'The singular stem contains the final root ي: مُتَّقِي / مُتَّقٍ.', 'In the sound masculine plural, this stem-final ي is removed before ـونَ or ـينَ is added. The visible ي in مُتَّقِينَ therefore belongs to the ending ـينَ.'],
    },
  },

  taqwa: {
    displayArabic: 'تَقْوَى',
    visualParts: [
      { text: 'تَ', role: 'prefix' },
      { text: 'قْوَى', role: 'root' },
    ],
    components: [
      {
        role: 'prefix', ar: 'تَـ', reading: 'ta-',
        ru: '',
        en: '',
      },
    ],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы', metaEn: 'Form VIII verb',
      ru: 'تَقْوَى (taqwā) происходит от глагольной линии ٱتَّقَىٰ (ittaqā). Глагол называет действие: беречь себя, остерегаться, принимать защитную позицию. تَقْوَى называет уже само состояние или качество такой позиции.',
      en: 'تَقْوَى (taqwā) comes from the verbal line of ٱتَّقَىٰ (ittaqā). The verb names the action: to guard oneself, be cautious, or take a protective stance. تَقْوَى names the resulting state or quality.',
    },
    pattern: {
      ar: 'اِفْتَعَلَ', reading: 'iftaʿala',
      ru: { title: 'VIII форма глагола', text: 'Это показывает, от какого типа действия образовано تَقْوَى (taqwā): действие направлено на то, чтобы самому занять защитную, осторожную позицию. Поэтому слово описывает не просто «защиту» вообще, а внутреннее состояние осознанного остережения.' },
      en: { title: 'Form VIII verb', text: 'This shows the kind of action behind تَقْوَى (taqwā): the subject takes a protective, cautious stance. The noun therefore points to an inner state of conscious guarding rather than protection in the abstract.' },
    },
    technical: {
      ru: ['Корень остаётся و ق ي, даже если не все три корневые буквы буквально видны в современной поверхности слова.', 'Побуквенный исторический вывод начальной ت и финали ـوى описывается в традиционных источниках не полностью одинаково. Поэтому основной экран показывает корень и модель отдельно, не превращая спорный разбор в «значение букв».'],
      en: ['The root remains و ق ي even though all three root consonants are not literally visible in the modern surface form.', 'Traditional sources do not give one fully identical letter-by-letter historical account of initial ت and final ـوى. The main UI therefore keeps root and pattern separate instead of turning a disputed analysis into “letter meanings”.'],
    },
  },

  atqa: {
    displayArabic: 'أَتْقَى',
    visualParts: [
      { text: 'أَتْ', role: 'form' },
      { text: 'قَ', role: 'root' },
      { text: 'ى', role: 'form' },
    ],
    components: [],
    derivedFrom: {
      ar: 'تَقْوَى / تَقِيّ', reading: 'taqwā / taqiyy', metaRu: 'семья качества корня و ق ي', metaEn: 'quality family of و ق ي',
      ru: 'Это не глагол IV формы. Слово сравнивает степень качества внутри той же семьи.',
      en: 'This is not a Form IV verb. The word compares degree within the same quality family.',
    },
    pattern: {
      ar: 'أَفْعَل', reading: 'afʿal',
      ru: { title: 'اسم التفضيل · сравнительная/превосходная степень', text: 'Модель выражает «более… / наиболее…» в зависимости от конструкции.' },
      en: { title: 'اسم التفضيل · elative', text: 'The pattern expresses “more…” / “most…” depending on the construction.' },
    },
    technical: {
      ru: ['Корень — و ق ي; конечная слабая ي проявляется как ى.', 'Поскольку исторический разбор начальной ت имеет несколько объяснений, основной экран не приписывает ей отдельной функции вне всей модели.'],
      en: ['The root is و ق ي; final weak ي appears as ى.', 'Because the historical account of initial ت has more than one explanation, the main UI does not assign it a standalone function outside the whole pattern.'],
    },
  },

  tuqat: {
    displayArabic: 'تُقَاة',
    visualParts: [
      { text: 'تُ', role: 'form' },
      { text: 'قَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      {
        role: 'suffix', ar: 'ـة', reading: '-ah',
        ru: 'Часть именной формы. Здесь она не переводится сама по себе; значение создаёт всё словообразование.',
        en: 'Part of the nominal formation. It is not translated by itself here; the derivation as a whole creates the word.',
      },
    ],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ', metaRu: 'семья глагола VIII формы', metaEn: 'Form VIII verbal family',
      ru: 'Глагольная линия оформляется как существительное действия/предосторожности.',
      en: 'The verbal line is packaged as a noun of action/precaution.',
    },
    pattern: {
      ar: 'فُعَلَة', reading: 'fuʿalah',
      ru: { title: 'Именная форма действия', text: 'Называет само остережение / принятие мер защиты, а не человека, который его совершает.' },
      en: { title: 'Action noun', text: 'Names the act/state of precaution rather than the person who performs it.' },
    },
    technical: {
      ru: ['Форма редкая; основной экран показывает подтверждённую семейную связь и именную функцию, а спорные побуквенные детали не выдаёт за универсальное правило.'],
      en: ['The form is rare; the main UI shows the established family relation and nominal function without presenting disputed letter-level details as a universal rule.'],
    },
  },

  taqiyy: {
    displayArabic: 'تَقِيّ',
    visualParts: [
      { text: 'تَ', role: 'form' },
      { text: 'قِ', role: 'root' },
      { text: 'يّ', role: 'form' },
    ],
    components: [],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ / تَقْوَى', reading: 'ittaqā / taqwā', metaRu: 'словообразовательная семья', metaEn: 'derivational family',
      ru: 'Прилагательное переводит смысловую линию на характеристику человека.',
      en: 'The adjective shifts the semantic line to a characteristic of a person.',
    },
    pattern: {
      ar: 'فَعِيل', reading: 'faʿīl',
      ru: { title: 'Прилагательное качества', text: 'Называет человека через устойчивое качество, а не действие как событие.' },
      en: { title: 'Quality adjective', text: 'Describes a person through a characteristic quality rather than an action as an event.' },
    },
    technical: {
      ru: ['فَعِيل — один из традиционных разборов этой формы; поэтому основной экран показывает функцию прилагательного и не строит отдельные «значения» из ت или يّ.'],
      en: ['فَعِيل is one traditional analysis of this form, so the main UI presents the adjective function without inventing separate “meanings” for ت or يّ.'],
    },
  },

  wiqaa: {
    displayArabic: 'وِقَاء',
    visualParts: [
      { text: 'وِقَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ء', role: 'form' },
    ],
    components: [],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'Из действия «защищать» образуется существительное для средства/покрова защиты.',
      en: 'The action “to protect” yields a noun for a means or covering of protection.',
    },
    pattern: {
      ar: 'فِعَال', reading: 'fiʿāl',
      ru: { title: 'Существительное', text: 'Переводит защитное действие в название того, что служит защитой.' },
      en: { title: 'Noun', text: 'Turns the protective action into a noun for what serves as protection.' },
    },
    technical: {
      ru: ['Конечная корневая ي после долгого ā проявляется как ء в وِقَاء.'],
      en: ['Final root ي appears as ء after long ā in وِقَاء.'],
    },
  },

  wiqaya: {
    displayArabic: 'وِقَايَة',
    visualParts: [
      { text: 'وِقَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'يَ', role: 'root' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      {
        role: 'suffix', ar: 'ـة', reading: '-ah',
        ru: 'Завершает именную модель فِعَالَة. Здесь это часть словообразования, а не самостоятельное слово.',
        en: 'Completes the فِعَالَة nominal pattern. Here it is part of derivation, not an independent word.',
      },
    ],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'Глагольное действие становится существительным действия: «защищать» → «защита / предохранение».',
      en: 'The verbal action becomes an action noun: “to protect” → “protection / safeguarding”.',
    },
    pattern: {
      ar: 'فِعَالَة', reading: 'fiʿālah',
      ru: { title: 'Масдар · существительное действия', text: 'Называет само действие защиты как понятие.' },
      en: { title: 'Verbal noun', text: 'Names the protective action as a noun.' },
    },
    technical: {
      ru: ['Здесь третья корневая ي остаётся видимой перед ـة.'],
      en: ['Here the third root consonant ي remains visible before ـة.'],
    },
  },

  tawaqqa: {
    displayArabic: 'تَوَقَّىٰ',
    visualParts: [
      { text: 'تَ', role: 'prefix' },
      { text: 'وَ', role: 'root' },
      { text: 'قَّ', role: 'root' },
      { text: 'ىٰ', role: 'form' },
    ],
    components: [
      {
        role: 'prefix', ar: 'تَـ', reading: 'ta-',
        ru: 'Словообразовательный префикс V формы. Его функция раскрывается вместе со всей моделью تَفَعَّلَ.',
        en: 'A derivational prefix of Form V. Its function is understood together with the whole تَفَعَّلَ pattern.',
      },
    ],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'V форма перестраивает базовое защитное действие в действие самого субъекта: беречься / принимать предосторожности.',
      en: 'Form V reshapes the basic protective action into one carried out by the subject: guard oneself / take precautions.',
    },
    pattern: {
      ar: 'تَفَعَّلَ', reading: 'tafaʿʿala',
      ru: { title: 'Глагол V формы', text: 'В этом корне даёт линию «беречься / остерегаться / принимать предосторожности». Это значение всей формы, а не одного префикса تَـ.' },
      en: { title: 'Form V verb', text: 'In this root, it gives the line “guard oneself / be cautious / take precautions”. The meaning belongs to the whole form, not to prefix تَـ alone.' },
    },
    technical: {
      ru: ['Добавляется начальная تَـ.', 'Вторая корневая ق удваивается как часть модели.', 'Конечная корневая ي проявляется как ىٰ.'],
      en: ['Initial تَـ is added.', 'The second root consonant ق is geminated as part of the pattern.', 'Final root ي appears as ىٰ.'],
    },
  },
}
