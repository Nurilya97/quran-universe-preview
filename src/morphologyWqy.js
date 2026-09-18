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
      ru: { title: 'Глагол I формы', text: 'Передаёт базовое действие корня: защищать, оберегать. وَقَىٰ (waqā) — исходное действие этой семьи: защита направлена на то, чтобы вред не достиг того, кого или что оберегают.' },
      en: { title: 'Form I verb', text: 'Expresses the basic root action: to protect, to guard. وَقَىٰ (waqā) is the starting action of this family: protection is directed toward keeping harm from reaching what is protected.' },
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
      ru: 'وَقَىٰ (waqā) называет действие «защищать». وَاقٍ (wāqin) переносит внимание на того, от кого исходит защита — на защищающего или защитника.',
      en: 'وَقَىٰ (waqā) names the action “to protect”. وَاقٍ (wāqin) shifts attention to the one from whom protection comes — the protector.',
    },
    pattern: {
      ar: 'فَاعِل', reading: 'fāʿil',
      ru: { title: 'Действительное причастие · اسم الفاعل', text: 'Модель переводит действие на деятеля: وَقَىٰ (waqā) «защищать» → وَاقٍ (wāqin) «защищающий / защитник». Корневая идея защиты теперь выражена через того, кто эту защиту осуществляет.' },
      en: { title: 'Active participle · اسم الفاعل', text: 'The pattern shifts from the action to its doer: وَقَىٰ (waqā) “to protect” → وَاقٍ (wāqin) “one who protects / protector”. The root idea of protection is now expressed through the one who provides it.' },
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
      ru: 'وَقَىٰ (waqā) называет базовое действие защиты. В ٱتَّقَىٰ (ittaqā) защита становится действием самого субъекта: человек занимает активную защитную позицию и старается уберечь себя от того, чего следует остерегаться.',
      en: 'وَقَىٰ (waqā) names the basic act of protection. In ٱتَّقَىٰ (ittaqā), protection becomes the subject’s own action: the person takes an active protective stance and guards themselves against what should be avoided.',
    },
    pattern: {
      ar: 'اِفْتَعَلَ', reading: 'iftaʿala',
      ru: { title: 'Глагол VIII формы', text: 'ٱتَّقَىٰ (ittaqā) передаёт действие самого субъекта: беречь / защищать себя, остерегаться, ограждать себя от чего-либо. Это помогает увидеть, как базовая идея защиты превращается в личную защитно-ориентированную позицию человека.' },
      en: { title: 'Form VIII verb', text: 'ٱتَّقَىٰ (ittaqā) describes an action of the subject: to guard or protect oneself, be cautious, or guard oneself against something. This shows how the root idea of protection becomes a person’s own protection-oriented stance.' },
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
      ru: 'تَقْوَىٰ (taqwā) и تَقِيّ (taqiyy) задают качество этой семьи. أَتْقَى (atqā) показывает, что это качество выражено в большей степени.',
      en: 'تَقْوَىٰ (taqwā) and تَقِيّ (taqiyy) establish the quality in this family. أَتْقَى (atqā) shows that the quality is present to a greater degree.',
    },
    pattern: {
      ar: 'أَفْعَل', reading: 'afʿal',
      ru: { title: 'اسم التفضيل · сравнительная/превосходная степень', text: 'Модель выражает «более… / наиболее…» в зависимости от конструкции. Поэтому أَتْقَى (atqā) помогает сравнить степень تَقْوَىٰ (taqwā): та же защитная направленность может быть выражена сильнее или полнее.' },
      en: { title: 'اسم التفضيل · elative', text: 'The pattern expresses “more…” / “most…” depending on the construction. أَتْقَى (atqā) therefore compares the degree of تَقْوَىٰ (taqwā): the same protective orientation can be expressed to a greater degree.' },
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
      ru: 'تُقَاة (tuqāt) связано с ٱتَّقَىٰ (ittaqā): действие остережения и защиты оформляется как существительное. В фокусе оказывается само принятие меры предосторожности.',
      en: 'تُقَاة (tuqāt) is related to ٱتَّقَىٰ (ittaqā): the act of caution and protection is expressed as a noun. The focus is on the precautionary act itself.',
    },
    pattern: {
      ar: 'فُعَلَة', reading: 'fuʿalah',
      ru: { title: 'Именная форма действия', text: 'Называет остережение / принятие мер защиты. То есть действие ٱتَّقَىٰ (ittaqā) можно представить как конкретную меру предосторожности или состояние осторожности.' },
      en: { title: 'Action noun', text: 'Names the act or state of precaution. In other words, the action of ٱتَّقَىٰ (ittaqā) can be expressed as a concrete precaution or a state of caution.' },
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
      ru: 'تَقِيّ (taqiyy) связано с ٱتَّقَىٰ (ittaqā) и تَقْوَىٰ (taqwā) и переносит эту смысловую линию на характеристику человека: качество становится тем, чем его можно описать.',
      en: 'تَقِيّ (taqiyy) is related to ٱتَّقَىٰ (ittaqā) and تَقْوَىٰ (taqwā), shifting this semantic line into a description of a person: the quality becomes something that characterises them.',
    },
    pattern: {
      ar: 'فَعِيل', reading: 'faʿīl',
      ru: { title: 'Прилагательное качества', text: 'Называет человека через устойчивое качество. تَقِيّ (taqiyy) — человек, которому свойственна تَقْوَىٰ (taqwā): осознанное остережение и оберегание себя проявляются как его характеристика.' },
      en: { title: 'Quality adjective', text: 'Describes a person through a characteristic quality. تَقِيّ (taqiyy) is a person characterised by تَقْوَىٰ (taqwā): conscious caution and self-guarding appear as a quality of the person.' },
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
      ru: 'Из وَقَىٰ (waqā) «защищать» образуется وِقَاء (wiqāʾ) — название того, что служит средством или покровом защиты.',
      en: 'From وَقَىٰ (waqā), “to protect”, comes وِقَاء (wiqāʾ) — a noun for something that serves as a means or covering of protection.',
    },
    pattern: {
      ar: 'فِعَال', reading: 'fiʿāl',
      ru: { title: 'Существительное', text: 'Переводит защитное действие в название того, что служит защитой. В وِقَاء (wiqāʾ) корневая идея становится конкретным защитным средством или покровом; щит — один из понятных примеров.' },
      en: { title: 'Noun', text: 'Turns the protective action into a noun for what serves as protection. In وِقَاء (wiqāʾ), the root idea becomes a concrete protective means or covering; a shield is one clear example.' },
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
      ru: 'وَقَىٰ (waqā) «защищать» превращается в وِقَايَة (wiqāya) — «защита / предохранение». Теперь можно назвать само действие сохранения чего-либо от вреда.',
      en: 'وَقَىٰ (waqā), “to protect”, becomes وِقَايَة (wiqāya), “protection / safeguarding”. The act of keeping something safe from harm can now be named as a noun.',
    },
    pattern: {
      ar: 'فِعَالَة', reading: 'fiʿālah',
      ru: { title: 'Масдар · существительное действия', text: 'Называет само действие защиты как понятие. وِقَايَة (wiqāya) помогает увидеть корень как процесс: что-то сохраняют и оберегают так, чтобы вред его не достиг.' },
      en: { title: 'Verbal noun', text: 'Names the protective action as a noun. وِقَايَة (wiqāya) presents the root as a process: something is preserved and guarded so that harm does not reach it.' },
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
      ru: 'تَوَقَّىٰ (tawaqqā) образовано от وَقَىٰ (waqā) через V форму. Защитное действие становится личным действием самого человека: беречься, остерегаться, принимать меры предосторожности.',
      en: 'تَوَقَّىٰ (tawaqqā) is formed from وَقَىٰ (waqā) through Form V. The protective action becomes something the person does for themselves: guard oneself, be cautious, take precautions.',
    },
    pattern: {
      ar: 'تَفَعَّلَ', reading: 'tafaʿʿala',
      ru: { title: 'Глагол V формы', text: 'В этом корне даёт линию «беречься / остерегаться / принимать предосторожности». تَوَقَّىٰ (tawaqqā) показывает защиту как практическое действие человека: он сам предпринимает меры, чтобы уберечь себя.' },
      en: { title: 'Form V verb', text: 'In this root, it gives the line “guard oneself / be cautious / take precautions”. تَوَقَّىٰ (tawaqqā) presents protection as practical personal action: a person takes measures to guard themselves.' },
    },
  },
}
