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
    derivedFrom: 'Производное от',
    patternEffect: 'Что нам даёт форма',
    wordFormation: 'Словообразование',
    form: 'Форма',
    evolution: 'Цепочка словообразования',
  },
  en: {
    analysis: 'Word analysis',
    root: 'Root',
    derivedFrom: 'Derived from',
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
      { text: 'ىٰ', role: 'root' },
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
      { text: 'ق', role: 'root', mark: 'kasratan', markRole: 'ending' },
    ],
    components: [
      {
        role: 'ending', ar: 'ـٍ', reading: '-in',
        ru: 'Танвин с касрой показывает неопределённую форму в رفع/جر.',
        en: 'Tanwin with kasra marks the indefinite nominative/genitive form here.',
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'وَاقٍ', reading: 'wāqin', metaRu: 'действительное причастие · защищающий / защитник', metaEn: 'active participle · one who protects / protector' },
    ],
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы · беречь / защищать себя, остерегаться', metaEn: 'Form VIII verb · guard/protect oneself, be cautious' },
    ],
  },

  muttaqin: {
    displayArabic: 'مُتَّقِينَ',
    visualParts: [
      { text: 'مُ', role: 'prefix' },
      { text: 'تَّ', role: 'fusion' },
      { text: 'قِ', role: 'root' },
      { text: 'ينَ', role: 'ending' },
    ],
    transformation: {
      root: 'و', form: 'ت', result: 'تّ',
      ru: 'و корня сливается с ت формы; конечная корневая ي в этой форме множественного числа выпадает перед ـينَ.',
      en: 'The root و assimilates with the form’s ت; the final root ي is dropped here before the plural ending ـينَ.',
    },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы · беречь / защищать себя, остерегаться', metaEn: 'Form VIII verb · guard/protect oneself, be cautious' },
      { ar: 'مُتَّقٍ', reading: 'muttaqī', metaRu: 'действительное причастие VIII формы · носитель качества', metaEn: 'Form VIII active participle · bearer of the quality' },
      { ar: 'مُتَّقِينَ', reading: 'muttaqīn', metaRu: 'множественное число · носители качества', metaEn: 'plural · bearers of the quality' },
    ],
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
      { text: 'أَ', role: 'form' },
      { text: 'تْ', role: 'root' },
      { text: 'قَ', role: 'root' },
      { text: 'ى', role: 'root' },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'تَقْوَىٰ / تَقِيّ', reading: 'taqwā / taqiyy', metaRu: 'семья качества', metaEn: 'quality family' },
      { ar: 'أَتْقَى', reading: 'atqā', metaRu: 'большая степень качества', metaEn: 'greater degree of the quality' },
    ],
  },

  tuqat: {
    displayArabic: 'تُقَاة',
    visualParts: [
      { text: 'تُ', role: 'root' },
      { text: 'قَ', role: 'root' },
      { text: 'ا', role: 'root' },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'ٱتَّقَىٰ', reading: 'ittaqā', metaRu: 'глагол VIII формы · остерегаться / ограждать себя', metaEn: 'Form VIII verb · guard oneself / be cautious' },
      { ar: 'تُقَاة', reading: 'tuqāt', metaRu: 'существительное действия · остережение / мера защиты', metaEn: 'action noun · precaution / protective measure' },
    ],
  },

  taqiyy: {
    displayArabic: 'تَقِيّ',
    visualParts: [
      { text: 'تَ', role: 'root' },
      { text: 'قِ', role: 'root' },
      { text: 'يّ', role: 'fusion' },
    ],
    transformation: {
      root: 'ي', form: 'ي', result: 'يّ',
      ru: 'Конечная корневая ي соединяется с ي модели فَعِيل и даёт удвоенную يّ.',
      en: 'The final root ي combines with the ي of the فَعِيل pattern, producing doubled يّ.',
    },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'ٱتَّقَىٰ / تَقْوَىٰ', reading: 'ittaqā / taqwā', metaRu: 'действие и качество этой семьи', metaEn: 'action and quality in this family' },
      { ar: 'تَقِيّ', reading: 'taqiyy', metaRu: 'прилагательное · человек, характеризуемый этим качеством', metaEn: 'adjective · a person characterised by the quality' },
    ],
  },

  wiqaa: {
    displayArabic: 'وِقَاء',
    visualParts: [
      { text: 'وِقَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ء', role: 'root' },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'وِقَاء', reading: 'wiqāʾ', metaRu: 'существительное · средство / покров защиты', metaEn: 'noun · means / covering of protection' },
    ],
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'وِقَايَة', reading: 'wiqāya', metaRu: 'масдар · защита / предохранение как процесс', metaEn: 'verbal noun · protection / safeguarding as a process' },
    ],
  },

  tawaqqa: {
    displayArabic: 'تَوَقَّىٰ',
    visualParts: [
      { text: 'تَ', role: 'prefix' },
      { text: 'وَ', role: 'root' },
      { text: 'قَّ', role: 'fusion' },
      { text: 'ىٰ', role: 'root' },
    ],
    transformation: {
      root: 'ق', form: 'ق', result: 'قّ',
      ru: 'В V форме вторая корневая буква ق удваивается; конечная ىٰ представляет корневую ي.',
      en: 'In Form V, the second root letter ق is doubled; final ىٰ represents the root ي.',
    },
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
    evolution: [
      { ar: 'و ق ي', reading: 'w-q-y', metaRu: 'корень', metaEn: 'root' },
      { ar: 'وَقَىٰ', reading: 'waqā', metaRu: 'глагол I формы · защищать, оберегать', metaEn: 'Form I verb · to protect, guard' },
      { ar: 'تَوَقَّىٰ', reading: 'tawaqqā', metaRu: 'глагол V формы · беречься / принимать предосторожности', metaEn: 'Form V verb · guard oneself / take precautions' },
    ],
  },

  lubb: {
    displayArabic: 'لُبّ',
    visualParts: [
      { text: 'لُ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    components: [],
    derivedFrom: null,
    pattern: {
      ar: 'فُعْل', reading: 'fuʿl',
      ru: { title: 'Именная форма', text: 'لُبّ (lubb) — словарная форма корня ل ب ب. Шадда на ب показывает соединение второй и третьей одинаковых корневых букв.' },
      en: { title: 'Nominal form', text: 'لُبّ (lubb) is the dictionary form of the root ل ب ب. The shadda on ب represents the joining of the second and third identical root letters.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لُبّ', reading: 'lubb', metaRu: 'единственное число · сердцевина / суть / разумение', metaEn: 'singular noun · core / essence / understanding' },
    ],
  },

  albab: {
    displayArabic: 'أَلْبَاب',
    visualParts: [
      { text: 'أَ', role: 'form' },
      { text: 'لْ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لُبّ', reading: 'lubb', metaRu: 'единственное число', metaEn: 'singular noun',
      ru: 'لُبّ (lubb) называет сердцевину, чистую или отборную часть; применительно к человеку — способность доходить до сути. أَلْبَاب (albāb) — его ломаное множественное число.',
      en: 'لُبّ (lubb) names a core, pure or choicest part; when applied to a person, the capacity to reach the essence. أَلْبَاب (albāb) is its broken plural.',
    },
    pattern: {
      ar: 'أَفْعَال', reading: 'afʿāl',
      ru: { title: 'Ломаное множественное число', text: 'Модель أَفْعَال (afʿāl) образует множественное أَلْبَاب (albāb) от لُبّ (lubb). Начальная أ и внутренний ا принадлежат модели, а корневые буквы остаются ل ب ب.' },
      en: { title: 'Broken plural', text: 'The أَفْعَال (afʿāl) pattern forms أَلْبَاب (albāb), the plural of لُبّ (lubb). Initial أ and internal ا belong to the pattern, while the root letters remain ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لُبّ', reading: 'lubb', metaRu: 'единственное число · сердцевина / суть', metaEn: 'singular noun · core / essence' },
      { ar: 'أَلْبَاب', reading: 'albāb', metaRu: 'ломаное множественное · разумение, доходящее до сути', metaEn: 'broken plural · understanding that reaches the essence' },
    ],
  },

  labib: {
    displayArabic: 'لَبِيب',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بِ', role: 'root' },
      { text: 'ي', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لُبّ', reading: 'lubb', metaRu: 'именная корневая семья', metaEn: 'nominal root family',
      ru: 'لَبِيب (labīb) характеризует человека как обладателя لُبّ: того, кто способен пройти внешнее и дойти до сути.',
      en: 'لَبِيب (labīb) characterises a person as a possessor of لُبّ: someone able to pass beyond the outward layer and reach the essence.',
    },
    pattern: {
      ar: 'فَعِيل', reading: 'faʿīl',
      ru: { title: 'Прилагательное качества', text: 'Модель فَعِيل формирует характеристику носителя качества: لَبِيب — человек, обладающий لُبّ, то есть способностью доходить до сути.' },
      en: { title: 'Quality adjective', text: 'The فَعِيل pattern forms a quality adjective: لَبِيب is a person possessing لُبّ, the capacity to reach the essence.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لُبّ', reading: 'lubb', metaRu: 'сердцевина / разумение', metaEn: 'core / understanding' },
      { ar: 'لَبِيب', reading: 'labīb', metaRu: 'прилагательное · обладающий لُبّ', metaEn: 'adjective · possessing لُبّ' },
    ],
  },

  labba: {
    displayArabic: 'لَبَّ',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    transformation: {
      root: 'ب + ب', form: '—', result: 'بّ',
      ru: 'В удвоенном корне вторая и третья одинаковые корневые ب стягиваются в одну букву с шаддой.',
      en: 'In the geminate root, the second and third identical root letters ب are written as one consonant with shadda.',
    },
    components: [],
    derivedFrom: null,
    pattern: {
      ar: 'فَعَّ', reading: 'faʿʿa',
      ru: { title: 'Глагол I формы · удвоенный корень', text: 'Базовая глагольная форма корня ل ب ب. Шадда здесь передаёт две корневые ب, а не отдельный суффикс.' },
      en: { title: 'Form I verb · geminate root', text: 'The base verbal form of ل ب ب. The shadda represents the two root letters ب rather than a separate suffix.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّ', reading: 'labba', metaRu: 'глагол I формы', metaEn: 'Form I verb' },
    ],
  },

  labbaba: {
    displayArabic: 'لَبَّبَ',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بَّ', role: 'fusion' },
      { text: 'بَ', role: 'root' },
    ],
    transformation: {
      root: 'ب', form: 'ّ', result: 'بّ',
      ru: 'II форма удваивает вторую корневую букву; третья корневая ب остаётся отдельной.',
      en: 'Form II doubles the second root consonant; the third root ب remains separate.',
    },
    components: [],
    derivedFrom: {
      ar: 'لَبَّ', reading: 'labba', metaRu: 'глагол I формы', metaEn: 'Form I verb',
      ru: 'II форма делает корневое действие направленным на объект: в словарях это видно и в линии формирования сердцевины зерна, и в действии с одеждой у груди.',
      en: 'Form II makes the root action operative on an object: lexicons show this both in forming a grain’s kernel and in action involving clothing at the chest.',
    },
    pattern: {
      ar: 'فَعَّلَ', reading: 'faʿʿala',
      ru: { title: 'Глагол II формы', text: 'К модели добавляется удвоение второй корневой буквы. Для ل ب ب это даёт видимую последовательность بّ + ب.' },
      en: { title: 'Form II verb', text: 'The pattern doubles the second root consonant. With ل ب ب this yields the visible sequence بّ + ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّ', reading: 'labba', metaRu: 'I форма', metaEn: 'Form I' },
      { ar: 'لَبَّبَ', reading: 'labbaba', metaRu: 'II форма', metaEn: 'Form II' },
    ],
  },

  alabba: {
    displayArabic: 'أَلَبَّ',
    visualParts: [
      { text: 'أَ', role: 'prefix' },
      { text: 'لَ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    transformation: {
      root: 'ب + ب', form: '—', result: 'بّ',
      ru: 'Две конечные корневые ب объединяются под шаддой после применения модели IV формы.',
      en: 'The two final root letters ب merge under shadda after the Form IV pattern is applied.',
    },
    components: [
      { role: 'prefix', ar: 'أَـ', reading: 'a-', ru: 'Префикс IV формы.', en: 'Form IV prefix.' },
    ],
    derivedFrom: {
      ar: 'لَبَّ', reading: 'labba', metaRu: 'базовая семья корня', metaEn: 'base root family',
      ru: 'IV форма أَفْعَلَ добавляет начальную أ и оформляет отдельную глагольную ветвь корня.',
      en: 'Form IV أَفْعَلَ adds initial أ and forms a distinct verbal branch of the root.',
    },
    pattern: {
      ar: 'أَفْعَلَ', reading: 'afʿala',
      ru: { title: 'Глагол IV формы', text: 'В удвоенном корне конечные одинаковые радикалы стягиваются: ожидаемая последовательность ب + ب реализуется как بّ.' },
      en: { title: 'Form IV verb', text: 'In a geminate root, the final identical radicals contract: the underlying ب + ب is realised as بّ.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'أَلَبَّ', reading: 'alabba', metaRu: 'IV форма', metaEn: 'Form IV' },
    ],
  },

  talabbaba: {
    displayArabic: 'تَلَبَّبَ',
    visualParts: [
      { text: 'تَ', role: 'prefix' },
      { text: 'لَ', role: 'root' },
      { text: 'بَّ', role: 'fusion' },
      { text: 'بَ', role: 'root' },
    ],
    transformation: {
      root: 'ب', form: 'ّ', result: 'بّ',
      ru: 'V форма сохраняет удвоение второй корневой буквы, как в связанной II форме.',
      en: 'Form V retains the doubling of the second root consonant found in its related Form II.',
    },
    components: [
      { role: 'prefix', ar: 'تَـ', reading: 'ta-', ru: 'Префикс V формы.', en: 'Form V prefix.' },
    ],
    derivedFrom: {
      ar: 'لَبَّبَ', reading: 'labbaba', metaRu: 'II форма', metaEn: 'Form II',
      ru: 'V форма разворачивает действие на самого субъекта: в засвидетельствованном употреблении человек собирает одежду на себе и готовится.',
      en: 'Form V turns the action onto the subject: in the attested usage a person gathers their clothing on themself and prepares.',
    },
    pattern: {
      ar: 'تَفَعَّلَ', reading: 'tafaʿʿala',
      ru: { title: 'Глагол V формы', text: 'Начальная تَـ и удвоение второй корневой буквы образуют модель تَفَعَّلَ.' },
      en: { title: 'Form V verb', text: 'Initial تَـ plus doubling of the second root consonant forms the تَفَعَّلَ pattern.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّبَ', reading: 'labbaba', metaRu: 'II форма', metaEn: 'Form II' },
      { ar: 'تَلَبَّبَ', reading: 'talabbaba', metaRu: 'V форма', metaEn: 'Form V' },
    ],
  },

  istalabba: {
    displayArabic: 'اِسْتَلَبَّ',
    visualParts: [
      { text: 'اِسْتَ', role: 'prefix' },
      { text: 'لَ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    transformation: {
      root: 'ب + ب', form: '—', result: 'بّ',
      ru: 'Две конечные корневые ب стягиваются под шаддой.',
      en: 'The two final root letters ب contract under shadda.',
    },
    components: [
      { role: 'prefix', ar: 'اِسْتَـ', reading: 'ista-', ru: 'Префикс X формы.', en: 'Form X prefix.' },
    ],
    derivedFrom: {
      ar: 'لُبّ', reading: 'lubb', metaRu: 'сердцевина / разумение', metaEn: 'core / understanding',
      ru: 'Словарное употребление направляет X форму на чей-либо لُبّ: испытать или проверить его разумение.',
      en: 'The attested Form X usage is directed at a person’s لُبّ: to test or examine their understanding.',
    },
    pattern: {
      ar: 'اِسْتَفْعَلَ', reading: 'istafʿala',
      ru: { title: 'Глагол X формы', text: 'Начальная последовательность اِسْتَـ принадлежит модели X формы; корень остаётся ل ب ب.' },
      en: { title: 'Form X verb', text: 'Initial اِسْتَـ belongs to the Form X pattern; the root remains ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لُبّ', reading: 'lubb', metaRu: 'разумение / сердцевина', metaEn: 'understanding / core' },
      { ar: 'اِسْتَلَبَّ', reading: 'istalabba', metaRu: 'X форма · испытать لُبّ', metaEn: 'Form X · test a person’s لُبّ' },
    ],
  },

  lubab: {
    displayArabic: 'لُبَاب',
    visualParts: [
      { text: 'لُ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لُبّ', reading: 'lubb', metaRu: 'базовое существительное', metaEn: 'base noun',
      ru: 'لُبَاب развивает ту же именную линию: чистая, отборная, наиболее существенная часть.',
      en: 'لُبَاب develops the same nominal line: the pure, choicest, most essential part.',
    },
    pattern: {
      ar: 'فُعَال', reading: 'fuʿāl',
      ru: { title: 'Именная модель', text: 'Внутренний ا принадлежит модели; три корневые буквы остаются ل ب ب.' },
      en: { title: 'Nominal pattern', text: 'The internal ا belongs to the pattern; the three root consonants remain ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لُبّ', reading: 'lubb', metaRu: 'сердцевина / суть', metaEn: 'core / essence' },
      { ar: 'لُبَاب', reading: 'lubāb', metaRu: 'чистая / отборная часть', metaEn: 'pure / choicest part' },
    ],
  },

  lababa: {
    displayArabic: 'لَبَابَة',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'بَ', role: 'root' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      { role: 'suffix', ar: 'ـة', reading: '-ah', ru: 'Завершает именную модель فَعَالَة.', en: 'Completes the فَعَالَة nominal pattern.' },
    ],
    derivedFrom: {
      ar: 'لَبَّ / لَبِيب', reading: 'labba / labīb', metaRu: 'линия разумения', metaEn: 'understanding line',
      ru: 'В словарях لَبَابَة засвидетельствовано как масдар: стать обладателем لُبّ, то есть разумения.',
      en: 'Lexicons attest لَبَابَة as a verbal noun: becoming possessed of لُبّ, i.e. understanding.',
    },
    pattern: {
      ar: 'فَعَالَة', reading: 'faʿālah',
      ru: { title: 'Масдар / именная модель', text: 'ا и конечная ة принадлежат модели; корневые согласные — ل ب ب.' },
      en: { title: 'Verbal noun / nominal pattern', text: 'ا and final ة belong to the pattern; the root consonants are ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّ', reading: 'labba', metaRu: 'стать обладателем لُبّ', metaEn: 'become possessed of لُبّ' },
      { ar: 'لَبَابَة', reading: 'labāba', metaRu: 'масдар этой линии', metaEn: 'verbal noun of this line' },
    ],
  },

  labbNoun: {
    displayArabic: 'لَبّ',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لَبَّ بالمكان', reading: 'labba bi-l-makān', metaRu: 'глагольная линия пребывания', metaEn: 'staying verbal line',
      ru: 'لَبّ выступает как масдар в линии «оставаться / держаться места или дела».',
      en: 'لَبّ functions as a verbal noun in the line “remain / keep to a place or matter.”',
    },
    pattern: {
      ar: 'فَعّ', reading: 'faʿʿ',
      ru: { title: 'Масдар удвоенного глагола', text: 'Шадда объединяет вторую и третью одинаковые корневые ب.' },
      en: { title: 'Verbal noun of a geminate verb', text: 'The shadda joins the second and third identical root letters ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّ', reading: 'labba', metaRu: 'оставаться / держаться', metaEn: 'remain / keep to' },
      { ar: 'لَبّ', reading: 'labb', metaRu: 'масдар · пребывание / удерживание', metaEn: 'verbal noun · remaining / keeping to' },
    ],
  },

  ulbub: {
    displayArabic: 'أُلْبُوب',
    visualParts: [
      { text: 'أُ', role: 'form' },
      { text: 'لْ', role: 'root' },
      { text: 'بُ', role: 'root' },
      { text: 'و', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لُبّ', reading: 'lubb', metaRu: 'внутреннее ядро', metaEn: 'inner kernel',
      ru: 'أُلْبُوب называет съедобное внутреннее ядро косточки плода и сохраняет буквальный образ لُبّ.',
      en: 'أُلْبُوب names the edible kernel inside a fruit stone and preserves the literal image of لُبّ.',
    },
    pattern: {
      ar: 'أُفْعُول', reading: 'ufʿūl',
      ru: { title: 'Именная модель', text: 'Начальная أ и و принадлежат модели; корневые согласные — ل ب ب.' },
      en: { title: 'Nominal pattern', text: 'Initial أ and و belong to the pattern; the root consonants are ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'أُلْبُوب', reading: 'ulbūb', metaRu: 'ядро косточки плода', metaEn: 'kernel of a fruit stone' },
    ],
  },

  lababPasture: {
    displayArabic: 'لَبَاب',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: null,
    pattern: {
      ar: 'فَعَال', reading: 'faʿāl',
      ru: { title: 'Отдельное словарное существительное', text: 'Словари фиксируют это написание в значении небольшого количества пастбища / травы. В интерфейсе оно не смешивается с لُبَاب «чистая, отборная часть».' },
      en: { title: 'Separate lexical noun', text: 'Lexicons attest this spelling for a small amount of pasture/herbage. The interface keeps it distinct from لُبَاب “pure, choicest part.”' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'словарное гнездо', metaEn: 'lexical root family' },
      { ar: 'لَبَاب', reading: 'labāb', metaRu: 'небольшое пастбище / немного травы', metaEn: 'a little pasture / herbage' },
    ],
  },

  labab: {
    displayArabic: 'لَبَب',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: null,
    pattern: {
      ar: 'فَعَل', reading: 'faʿal',
      ru: { title: 'Именная форма', text: 'Все три согласные слова — корневые. Словари фиксируют телесное значение верхней груди, нагрудный ремень и отдельное значение части песчаного холма.' },
      en: { title: 'Nominal form', text: 'All three consonants are root letters. Lexicons record the upper-chest sense, a breast-girth, and a separate sense referring to part of a sand-hill.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَب', reading: 'labab', metaRu: 'верх груди / нагрудный ремень', metaEn: 'upper chest / breast-girth' },
    ],
  },

  labbaChest: {
    displayArabic: 'لَبَّة',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بَّ', role: 'root' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      { role: 'suffix', ar: 'ـة', reading: '-ah', ru: 'Именное окончание.', en: 'Nominal ending.' },
    ],
    derivedFrom: null,
    pattern: {
      ar: 'فَعَّة', reading: 'faʿʿah',
      ru: { title: 'Именная форма удвоенного корня', text: 'Шадда объединяет две корневые ب; конечная ة завершает существительное.' },
      en: { title: 'Nominal form of a geminate root', text: 'The shadda joins the two root letters ب; final ة completes the noun.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّة', reading: 'labba', metaRu: 'точка верхней груди между ключицами', metaEn: 'upper-chest hollow between the collarbones' },
    ],
  },

  libaba: {
    displayArabic: 'لِبَابَة',
    visualParts: [
      { text: 'لِ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ا', role: 'form' },
      { text: 'بَ', role: 'root' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      { role: 'suffix', ar: 'ـة', reading: '-ah', ru: 'Завершает именную модель.', en: 'Completes the nominal pattern.' },
    ],
    derivedFrom: {
      ar: 'تَلَبَّبَ', reading: 'talabbaba', metaRu: 'одежная линия корня', metaEn: 'garment-related line',
      ru: 'لِبَابَة — то, что носит مُتَلَبِّب: одежда / драпировка, надеваемая при подготовке и собираемая на верхней части груди и плечах.',
      en: 'لِبَابَة is what a مُتَلَبِّب wears: a garment/drapery used in preparation and gathered over the upper chest and shoulders.',
    },
    pattern: {
      ar: 'فِعَالَة', reading: 'fiʿālah',
      ru: { title: 'Именная модель', text: 'Внутренний ا и конечная ة принадлежат модели; корневые согласные — ل ب ب.' },
      en: { title: 'Nominal pattern', text: 'Internal ا and final ة belong to the pattern; the root consonants are ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'تَلَبَّبَ', reading: 'talabbaba', metaRu: 'собраться / подтянуть одежду', metaEn: 'gather/tuck up clothing' },
      { ar: 'لِبَابَة', reading: 'libāba', metaRu: 'одежда этой линии', metaEn: 'garment in this line' },
    ],
  },

  labiba: {
    displayArabic: 'لَبِيبَة',
    visualParts: [
      { text: 'لَ', role: 'root' },
      { text: 'بِ', role: 'root' },
      { text: 'ي', role: 'form' },
      { text: 'بَ', role: 'root' },
      { text: 'ة', role: 'suffix' },
    ],
    components: [
      { role: 'suffix', ar: 'ـة', reading: '-ah', ru: 'Завершает именную модель فَعِيلَة.', en: 'Completes the فَعِيلَة nominal pattern.' },
    ],
    derivedFrom: null,
    pattern: {
      ar: 'فَعِيلَة', reading: 'faʿīlah',
      ru: { title: 'Именная модель', text: 'Словари фиксируют لَبِيبَة как название определённого вида одежды, сопоставляя его с بَقِيرَة. Дополнительную смысловую мотивацию интерфейс не выдумывает.' },
      en: { title: 'Nominal pattern', text: 'Lexicons attest لَبِيبَة as the name of a particular garment, comparing it with بَقِيرَة. The interface does not invent an additional semantic motivation.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'словарное гнездо', metaEn: 'lexical root family' },
      { ar: 'لَبِيبَة', reading: 'labība', metaRu: 'название одежды', metaEn: 'garment name' },
    ],
  },

  malbub: {
    displayArabic: 'مَلْبُوب',
    visualParts: [
      { text: 'مَ', role: 'prefix' },
      { text: 'لْ', role: 'root' },
      { text: 'بُ', role: 'root' },
      { text: 'و', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [
      { role: 'prefix', ar: 'مَـ', reading: 'ma-', ru: 'مَـ задаёт место / носителя проявления корневого смысла: то, на чём действие или состояние проявилось и закрепилось. Остальная модель уточняет характер этой связи.', en: 'مَـ marks the locus / bearer where the root meaning manifests: what the action or state appears on and becomes established in. The rest of the pattern specifies the nature of that relation.' },
    ],
    derivedFrom: null,
    pattern: {
      ar: 'مَفْعُول', reading: 'mafʿūl',
      ru: { title: 'Причастно-именная модель', text: 'Словари фиксируют два значения этой формы: характеризуемый разумением и животное, снабжённое нагрудным ремнём لَبَب.' },
      en: { title: 'Participial/nominal pattern', text: 'Lexicons record two senses for this form: characterised by understanding, and a beast fitted with a لَبَب breast-girth.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'مَلْبُوب', reading: 'malbūb', metaRu: 'словарная производная форма', metaEn: 'attested derived form' },
    ],
  },

  mulabb: {
    displayArabic: 'مُلَبّ',
    visualParts: [
      { text: 'مُ', role: 'prefix' },
      { text: 'لَ', role: 'root' },
      { text: 'بّ', role: 'root' },
    ],
    components: [
      { role: 'prefix', ar: 'مُـ', reading: 'mu-', ru: 'مُـ добавляет значение носителя / обладателя корневого действия или качества: того, в ком этот смысл проявляется. Остальная модель уточняет вид связи.', en: 'مُـ adds the meaning of a bearer / possessor of the root action or quality: the one in whom that meaning manifests. The rest of the pattern specifies the relation.' },
    ],
    derivedFrom: {
      ar: 'لَبَب', reading: 'labab', metaRu: 'нагрудный ремень', metaEn: 'breast-girth',
      ru: 'مُلَبّ характеризует животное как снабжённое нагрудным ремнём لَبَب.',
      en: 'مُلَبّ describes a beast as fitted with a لَبَب breast-girth.',
    },
    pattern: {
      ar: 'مُفَعّ', reading: 'mufaʿʿ',
      ru: { title: 'Производная именная форма', text: 'Шадда объединяет две конечные корневые ب; начальная مُـ принадлежит производной модели.' },
      en: { title: 'Derived nominal form', text: 'The shadda joins the two final root letters ب; initial مُـ belongs to the derived pattern.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَب', reading: 'labab', metaRu: 'нагрудный ремень', metaEn: 'breast-girth' },
      { ar: 'مُلَبّ', reading: 'mulabb', metaRu: 'снабжённый этим ремнём', metaEn: 'fitted with this girth' },
    ],
  },

  mulbab: {
    displayArabic: 'مُلْبَب',
    visualParts: [
      { text: 'مُ', role: 'prefix' },
      { text: 'لْ', role: 'root' },
      { text: 'بَ', role: 'root' },
      { text: 'ب', role: 'root' },
    ],
    components: [
      { role: 'prefix', ar: 'مُـ', reading: 'mu-', ru: 'مُـ указывает на носителя / обладателя проявленного корневого смысла; здесь — носителя состояния «снабжён لَبَب».', en: 'مُـ points to the bearer / possessor of the manifested root meaning; here, the bearer of the state “fitted with لَبَب”.' },
    ],
    derivedFrom: {
      ar: 'لَبَب', reading: 'labab', metaRu: 'нагрудный ремень', metaEn: 'breast-girth',
      ru: 'مُلْبَب — словарный вариант формы для животного, снабжённого لَبَب.',
      en: 'مُلْبَب is an attested variant for a beast fitted with a لَبَب.',
    },
    pattern: {
      ar: 'مُفْعَل', reading: 'mufʿal',
      ru: { title: 'Словарная производная форма', text: 'Начальная مُـ принадлежит модели; далее видны три корневые согласные ل ب ب без стяжения.' },
      en: { title: 'Attested derived form', text: 'Initial مُـ belongs to the pattern; the three root consonants ل ب ب remain visibly separate.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَب', reading: 'labab', metaRu: 'нагрудный ремень', metaEn: 'breast-girth' },
      { ar: 'مُلْبَب', reading: 'mulbab', metaRu: 'снабжённый ремнём', metaEn: 'fitted with the girth' },
    ],
  },

  talbib: {
    displayArabic: 'تَلْبِيب',
    visualParts: [
      { text: 'تَ', role: 'form' },
      { text: 'لْ', role: 'root' },
      { text: 'بِ', role: 'root' },
      { text: 'ي', role: 'form' },
      { text: 'ب', role: 'root' },
    ],
    components: [],
    derivedFrom: {
      ar: 'لَبَّبَ', reading: 'labbaba', metaRu: 'II форма', metaEn: 'Form II',
      ru: 'تَلْبِيب — масдар II формы. Отдельно словари называют этим словом часть одежды в области لَبَب.',
      en: 'تَلْبِيب is the verbal noun of Form II. Lexicons also use the word for the portion of clothing at the لَبَب area.',
    },
    pattern: {
      ar: 'تَفْعِيل', reading: 'tafʿīl',
      ru: { title: 'Масдар II формы', text: 'Начальная ت и внутренний ي принадлежат модели تَفْعِيل; корневые согласные — ل ب ب.' },
      en: { title: 'Form II verbal noun', text: 'Initial ت and internal ي belong to the تَفْعِيل pattern; the root consonants are ل ب ب.' },
    },
    evolution: [
      { ar: 'ل ب ب', reading: 'l-b-b', metaRu: 'корень', metaEn: 'root' },
      { ar: 'لَبَّبَ', reading: 'labbaba', metaRu: 'II форма', metaEn: 'Form II' },
      { ar: 'تَلْبِيب', reading: 'talbīb', metaRu: 'масдар II формы', metaEn: 'Form II verbal noun' },
    ],
  }
}
