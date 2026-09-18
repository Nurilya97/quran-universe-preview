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
    noSeparateMeaning: 'Отдельно не переводится: его функция появляется только внутри всей формы.',
  },
  en: {
    analysis: 'Word analysis',
    root: 'Root',
    derivedFrom: 'Comes from',
    patternEffect: 'What the form tells us',
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
  },
}
