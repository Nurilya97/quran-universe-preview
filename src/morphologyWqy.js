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
  fusion: { ru: 'Корень + форма', en: 'Root + form' },
}

export const MORPH_COPY = {
  ru: {
    analysis: 'Разбор слова',
    root: 'Корень',
    derivedFrom: 'Происходит от',
    patternEffect: 'Что нам даёт форма',
    wordFormation: 'Словообразование',
    form: 'Форма',
    evolution: 'Цепочка словообразования',
  },
  en: {
    analysis: 'Word analysis',
    root: 'Root',
    derivedFrom: 'Comes from',
    patternEffect: 'What the form tells us',
    wordFormation: 'Word formation',
    form: 'Form',
    evolution: 'Derivational chain',
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
        ru: 'Касратан показывает неопределённую форму в رفع/جر.',
        en: 'Kasratan marks the indefinite nominative/genitive form here.',
      },
    ],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'وَقَىٰ называет действие «защищать»; وَاقٍ называет того, кто это действие выполняет.',
      en: 'وَقَىٰ names the action “to protect”; وَاقٍ names the one who performs it.',
    },
    pattern: {
      ar: 'فَاعِل', reading: 'fāʿil',
      ru: { title: 'Действительное причастие · اسم الفاعل', text: 'Модель переводит действие на деятеля: وَقَىٰ «защищать» → وَاقٍ «защищающий / защитник».' },
      en: { title: 'Active participle · اسم الفاعل', text: 'The pattern shifts from the action to its doer: وَقَىٰ “to protect” → وَاقٍ “one who protects / protector”.' },
    },
  },

  ittaqa: {
    displayArabic: 'ٱتَّقَىٰ',
    visualParts: [
      { text: 'ٱ', role: 'form' },
      { text: 'تَّ', role: 'fusion' },
      { text: 'قَ', role: 'root' },
      { text: 'ىٰ', role: 'root' },
    ],
    transformation: {
      root: 'و', form: 'ت', result: 'تّ',
      ru: 'و корня сливается с ت VIII формы.',
      en: 'The root و assimilates with the Form VIII ت.',
    },
    components: [],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'Базовый глагол называет защиту. VIII форма перестраивает это действие так, что оно относится к позиции самого субъекта.',
      en: 'The base verb names protection. Form VIII reshapes the action so that it concerns the subject’s own stance.',
    },
    pattern: {
      ar: 'اِفْتَعَلَ', reading: 'iftaʿala',
      ru: { title: 'Глагол VIII формы', text: 'ٱتَّقَىٰ (ittaqā) передаёт действие самого субъекта: беречь / защищать себя, остерегаться, ограждать себя от чего-либо.' },
      en: { title: 'Form VIII verb', text: 'ٱتَّقَىٰ (ittaqā) describes an action of the subject: to guard or protect oneself, be cautious, or guard oneself against something.' },
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
        ru: 'Участвует в образовании действительного причастия от производного глагола.',
        en: 'Part of active-participle formation from a derived verb.',
      },
      {
        role: 'ending', ar: 'ـينَ', reading: '-īna',
        ru: 'Окончание мужского سالم-множественного в نصب/جر. Показывает число и падеж.',
        en: 'The sound masculine plural ending in the accusative/genitive. It marks number and case.',
      },
    ],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы', metaEn: 'Form VIII verb',
      ru: 'مُتَّقِينَ (muttaqīn) связано с مُتَّقٍ (muttaqī) — действительным причастием от ٱتَّقَىٰ (ittaqā). Эта форма называет уже не само действие, а человека, который его осуществляет и характеризуется им.',
      en: 'مُتَّقِينَ (muttaqīn) is related to مُتَّقٍ (muttaqī), the active participle of ٱتَّقَىٰ (ittaqā). This form names not the action itself but the person who performs it and is characterised by it.',
    },
    pattern: {
      ar: 'مُفْتَعِل', reading: 'muftaʿil',
      ru: { title: 'Действительное причастие VIII формы', text: 'Форма مُفْتَعِل (muftaʿil) переводит действие на его носителя: مُتَّقٍ (muttaqī) — тот, кто практикует تَقْوَىٰ (taqwā) и становится носителем этого качества. То есть человек, для которого осознанное остережение и защита стали устойчивой практикой и характеристикой. Множественное число — مُتَّقِينَ (muttaqīn).' },
      en: { title: 'Form VIII active participle', text: 'The مُفْتَعِل (muftaʿil) pattern shifts the action to its bearer: مُتَّقٍ (muttaqī) is a person who practises تَقْوَىٰ (taqwā) and becomes characterised by it. In other words, conscious caution and protection become an enduring practice and quality. The plural is مُتَّقِينَ (muttaqīn).' },
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
      ru: 'تَقْوَىٰ (taqwā) происходит от глагола ٱتَّقَىٰ (ittaqā).',
      en: 'تَقْوَىٰ (taqwā) comes from the verb ٱتَّقَىٰ (ittaqā).',
    },
    pattern: {
      ar: 'اِفْتَعَلَ', reading: 'iftaʿala',
      ru: { title: 'VIII форма', text: '' },
      en: { title: 'Form VIII', text: '' },
    },
    formation: {
      ru: 'تَقْوَىٰ (taqwā) происходит от глагола ٱتَّقَىٰ (ittaqā). ٱتَّقَىٰ означает: беречь / защищать себя, остерегаться, ограждать себя от чего-либо. تَقْوَىٰ описывает это действие как состояние или качество человека. В этом смысле осознанность становится способом защиты: человек осознаёт то, от чего нужно себя уберечь, и остерегается этого.',
      en: 'تَقْوَىٰ (taqwā) comes from the verb ٱتَّقَىٰ (ittaqā). ٱتَّقَىٰ means: to guard or protect oneself, be cautious, or guard oneself against something. تَقْوَىٰ describes this action as a state or quality of a person. In this sense, awareness becomes a form of protection: a person recognizes what they need to guard themselves from and is cautious of it.',
    },
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы · беречь / защищать себя, остерегаться', metaEn: 'Form VIII verb · guard/protect oneself, be cautious' },
      { ar: 'تَقْوَىٰ', reading: 'taqwā', metaRu: 'существительное · осознанное остережение как внутренняя защита', metaEn: 'noun · conscious caution as inner protection' },
    ],
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
      ru: 'Слово сравнивает степень качества внутри той же семьи.',
      en: 'The word compares degree within the same quality family.',
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
        ru: 'Часть именной формы.',
        en: 'Part of the nominal formation.',
      },
    ],
    derivedFrom: {
      ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'семья глагола VIII формы', metaEn: 'Form VIII verbal family',
      ru: 'Глагольная линия оформляется как существительное действия/предосторожности.',
      en: 'The verbal line is packaged as a noun of action/precaution.',
    },
    pattern: {
      ar: 'فُعَلَة', reading: 'fuʿalah',
      ru: { title: 'Именная форма действия', text: 'Называет само остережение / принятие мер защиты.' },
      en: { title: 'Action noun', text: 'Names the act/state of precaution.' },
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
      ru: { title: 'Прилагательное качества', text: 'Называет человека через устойчивое качество.' },
      en: { title: 'Quality adjective', text: 'Describes a person through a characteristic quality.' },
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
        ru: 'Завершает именную модель فِعَالَة.',
        en: 'Completes the فِعَالَة nominal pattern.',
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
        ru: 'Словообразовательный префикс V формы.',
        en: 'A derivational prefix of Form V.',
      },
    ],
    derivedFrom: {
      ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'V форма перестраивает базовое защитное действие в действие самого субъекта: беречься / принимать предосторожности.',
      en: 'Form V reshapes the basic protective action into one carried out by the subject: guard oneself / take precautions.',
    },
    pattern: {
      ar: 'تَفَعَّلَ', reading: 'tafaʿʿala',
      ru: { title: 'Глагол V формы', text: 'В этом корне даёт линию «беречься / остерегаться / принимать предосторожности».' },
      en: { title: 'Form V verb', text: 'In this root, it gives the line “guard oneself / be cautious / take precautions”.' },
    },
  },
}
