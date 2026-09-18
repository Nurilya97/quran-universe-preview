// Public-facing morphology teaching layer for the current و ق ي preview.
// It explains derivation and inflection without making individual letters carry
// meanings that belong to a whole Arabic pattern.
//
// Segment kinds:
// root       — a root consonant visible in this surface form
// pattern    — material belonging to a derivational pattern
// inflection — number/case/indefiniteness marking added after derivation
// change     — a surface segment created through morphophonological change

export const MORPH_COPY = {
  ru: {
    formula: 'Как собрано слово',
    root: 'Корень',
    pattern: 'Шаблон',
    inflection: 'Грамматика',
    change: 'Изменение',
    tapHint: 'Нажми на цветную часть, чтобы увидеть её роль.',
    lineage: 'Откуда получилось слово',
    patternEffect: 'Что делает шаблон',
    transformations: 'Как форма изменилась',
    more: 'Технические детали',
    current: 'Итоговая форма',
    rootStep: 'корень',
    patternStep: 'словообразовательная модель',
    noteVariants: 'У этой формы есть несколько традиционных объяснений исторического образования. Здесь показан рабочий разбор; альтернативы не скрываются.',
  },
  en: {
    formula: 'How the word is built',
    root: 'Root',
    pattern: 'Pattern',
    inflection: 'Grammar',
    change: 'Change',
    tapHint: 'Tap a coloured part to see its role.',
    lineage: 'Where the word comes from',
    patternEffect: 'What the pattern does',
    transformations: 'How the form changes',
    more: 'Technical details',
    current: 'Surface form',
    rootStep: 'root',
    patternStep: 'derivational pattern',
    noteVariants: 'This form has more than one traditional account of its historical formation. The working analysis is shown without hiding alternatives.',
  },
}

export const MORPHOLOGY = {
  waqa: {
    displayArabic: 'وَقَىٰ',
    segments: [
      { text: 'وَ', kind: 'root', ru: ['و — 1-я корневая', 'Первая буква корня و ق ي.'], en: ['و — 1st root consonant', 'The first consonant of the root و ق ي.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — 2-я корневая', 'Вторая буква корня.'], en: ['ق — 2nd root consonant', 'The second consonant of the root.'] },
      { text: 'ىٰ', kind: 'change', ru: ['ي → ىٰ', 'Третья корневая — ي. В этой слабой конечной позиции она проявляется как ألف مقصورة ىٰ.'], en: ['ي → ىٰ', 'The third root consonant is ي. In this final weak position it appears as alif maqṣūra ىٰ.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень: защита / ограждение', en: 'root: protection / shielding' },
      { ar: 'فَعَلَ', ru: 'базовая модель трёхбуквенного глагола', en: 'basic triliteral verb pattern' },
      { ar: 'وَقَىٰ', ru: 'глагол I формы', en: 'Form I verb' },
    ],
    effect: {
      ru: ['فَعَلَ · I форма', 'Базовый глагол выражает само действие корня без дополнительной согласной словообразовательной рамки. Здесь: действие защиты / оберегания.'],
      en: ['فَعَلَ · Form I', 'The basic verb expresses the root action without an added consonantal derivational frame. Here: the act of protecting / guarding.'],
    },
    transformations: {
      ru: ['Конечная ي — слабая корневая. В словарной форме وَقَىٰ она представлена как ىٰ.'],
      en: ['Final ي is a weak root consonant. In the citation form وَقَىٰ it is represented as ىٰ.'],
    },
  },

  waq: {
    displayArabic: 'وَاقٍ',
    segments: [
      { text: 'وَ', kind: 'root', ru: ['و — корень', 'Первая корневая остаётся видимой.'], en: ['و — root', 'The first root consonant remains visible.'] },
      { text: 'ا', kind: 'pattern', ru: ['ا — часть فَاعِل', 'Алиф стоит на характерном месте модели فَاعِل. Не алиф сам по себе, а вся модель образует اسم الفاعل.'], en: ['ا — part of فَاعِل', 'The alif occupies the characteristic slot of فَاعِل. The whole pattern—not the alif alone—forms the active participle.'] },
      { text: 'ق', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ٍ', kind: 'inflection', ru: ['ـٍ — падеж + неопределённость', 'В وَاقٍ конечная корневая ي уже выпала; касратан маркирует неопределённую форму в رفع/جر.'], en: ['ـٍ — case + indefiniteness', 'In وَاقٍ the final root ي has dropped; kasratan marks the indefinite nominative/genitive surface form.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'وَقَىٰ', ru: 'защищать / оберегать', en: 'to protect / guard' },
      { ar: 'فَاعِل', ru: 'модель действительного причастия', en: 'active-participle pattern' },
      { ar: 'وَاقِي', ru: 'основа: тот, кто защищает', en: 'stem: the one who protects' },
      { ar: 'وَاقٍ', ru: 'поверхностная форма رفع/جر', en: 'surface nominative/genitive form' },
    ],
    effect: {
      ru: ['فَاعِل · اسم الفاعل', 'Переводит перспективу с действия на деятеля: وَقَىٰ «защищать» → وَاقٍ «защищающий / защитник».'],
      en: ['فَاعِل · active participle', 'Shifts the perspective from the action to its doer: وَقَىٰ “to protect” → وَاقٍ “one who protects / protector”.'],
    },
    transformations: {
      ru: ['Основа — وَاقِي. Как у имени المنقوص, в неопределённом رفع/جر конечная ي удаляется: وَاقِي → وَاقٍ.'],
      en: ['The stem is وَاقِي. As a defective noun (اسم منقوص), final ي drops in the indefinite nominative/genitive: وَاقِي → وَاقٍ.'],
    },
  },

  ittaqa: {
    displayArabic: 'ٱتَّقَىٰ',
    segments: [
      { text: 'ٱ', kind: 'pattern', ru: ['ٱ — вход в VIII форму', 'همزة الوصل — часть модели اِفْتَعَلَ; помогает начать сочетание согласных.'], en: ['ٱ — Form VIII onset', 'Hamzat al-waṣl belongs to the اِفْتَعَلَ pattern and supports the initial consonant cluster.'] },
      { text: 'تَّ', kind: 'change', ru: ['و + ت → تّ', 'Здесь спрятаны два происхождения: корневая و была заменена на ت, а рядом уже стояла ت модели VIII. Две ت слились в تّ.'], en: ['و + ت → تّ', 'Two histories meet here: root و was replaced by ت, while Form VIII already contributed its own ت. The two ت merge as تّ.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — корень', 'Вторая корневая остаётся видимой.'], en: ['ق — root', 'The second root consonant remains visible.'] },
      { text: 'ىٰ', kind: 'change', ru: ['ي → ىٰ', 'Третья корневая — ي; в конечной слабой позиции она проявляется как ىٰ.'], en: ['ي → ىٰ', 'The third root consonant is ي; in the final weak position it appears as ىٰ.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'وَقَىٰ', ru: 'I форма: защищать / оберегать', en: 'Form I: protect / guard' },
      { ar: 'اِفْتَعَلَ', ru: 'шаблон VIII формы', en: 'Form VIII pattern' },
      { ar: 'اِوْتَقَى', ru: 'форма до замены و', en: 'pre-substitution form' },
      { ar: 'اِتْتَقَى', ru: 'و → ت', en: 'و → ت' },
      { ar: 'اِتَّقَى', ru: 'две ت сливаются', en: 'the two ت merge' },
    ],
    effect: {
      ru: ['اِفْتَعَلَ · VIII форма', 'У VIII формы нет одного универсального смысла для всех корней. В этом корне она переводит защитное действие в позицию самого субъекта: беречь себя, остерегаться, занимать защитно-ориентированную позицию.'],
      en: ['اِفْتَعَلَ · Form VIII', 'Form VIII has no single universal meaning across all roots. In this root, it turns the protective action toward the subject’s own stance: guarding oneself, taking precaution, adopting a protection-oriented posture.'],
    },
    transformations: {
      ru: ['اِوْتَقَى → اِتْتَقَى: начальная корневая و заменяется на ت перед ت الافتعال.', 'اِتْتَقَى → اِتَّقَى: две соседние ت ассимилируются и записываются с шаддой.', 'Конечная корневая ي в прошедшей форме проявляется как ىٰ.'],
      en: ['اِوْتَقَى → اِتْتَقَى: initial root و is replaced by ت before the Form VIII ت.', 'اِتْتَقَى → اِتَّقَى: adjacent ت consonants assimilate and are written with shadda.', 'Final root ي appears as ىٰ in this perfect form.'],
    },
  },

  muttaqin: {
    displayArabic: 'مُتَّقِينَ',
    segments: [
      { text: 'مُ', kind: 'pattern', ru: ['مُـ — часть اسم الفاعل', 'У производного глагола اسم الفاعل строится через مضارع: حرف المضارعة заменяется на م مضمومة. Мُـ — маркер внутри всей модели, не самостоятельное «значение обладателя».'], en: ['مُـ — part of the active participle', 'For derived verbs, the active participle is built from the imperfect: the imperfect prefix is replaced by م with ḍamma. مُـ is a marker inside the whole pattern, not an independent “possessor” meaning.'] },
      { text: 'تَّ', kind: 'change', ru: ['و + ت → تّ', 'Та же замена и ассимиляция, что в ٱتَّقَىٰ: корневая و скрыта внутри удвоенной ت.'], en: ['و + ت → تّ', 'The same substitution and assimilation as in ٱتَّقَىٰ: root و is hidden inside the doubled ت.'] },
      { text: 'قِ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ينَ', kind: 'inflection', ru: ['ـينَ — множественное число + падеж', 'Это окончание мужского سالم-множественного в نصب/جر. Оно не создаёт значение «практикующий». Собственная конечная ي основы перед этим удаляется.'], en: ['ـينَ — plural + case', 'This is the sound masculine plural ending in the accusative/genitive. It does not create the “practitioner” meaning. The stem’s own final ي is deleted before this ending.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'ٱتَّقَىٰ', ru: 'глагол VIII формы', en: 'Form VIII verb' },
      { ar: 'مُفْتَعِل', ru: 'модель действительного причастия VIII', en: 'Form VIII active-participle pattern' },
      { ar: 'مُتَّقِي', ru: 'основа причастия', en: 'participle stem' },
      { ar: 'مُتَّقٍ', ru: 'единственное число', en: 'singular' },
      { ar: 'مُتَّقِينَ', ru: 'множественное, نصب/جر', en: 'plural, accusative/genitive' },
    ],
    effect: {
      ru: ['مُفْتَعِل · اسم الفاعل VIII', 'Переводит действие ٱتَّقَىٰ на его носителя: не «действие остережения», а человек, который эту позицию осуществляет / ею характеризуется.'],
      en: ['مُفْتَعِل · Form VIII active participle', 'Moves from the action ٱتَّقَىٰ to its bearer: not “the act of guarding oneself,” but a person who enacts / is characterised by that stance.'],
    },
    transformations: {
      ru: ['Внутри основы действует то же و → ت → تّ, что и в глаголе ٱتَّقَىٰ.', 'Единственная основа оканчивается на корневую ي: مُتَّقِي / مُتَّقٍ.', 'При سالم-множественном конечная ي основы удаляется; затем добавляется самостоятельное окончание ـونَ или ـينَ. Поэтому ي в مُتَّقِينَ — часть окончания ـينَ, а не видимая корневая ي.'],
      en: ['The stem carries the same و → ت → تّ process as the verb ٱتَّقَىٰ.', 'The singular stem ends in the root ي: مُتَّقِي / مُتَّقٍ.', 'In the sound masculine plural, the stem-final ي is deleted and a separate ـونَ or ـينَ ending is added. Thus the visible ي in مُتَّقِينَ belongs to ـينَ, not to the visible root consonant.'],
    },
  },

  taqwa: {
    displayArabic: 'تَقْوَى',
    segments: [
      { text: 'تَ', kind: 'change', ru: ['ت — историческое изменение', 'В традиционном разборе эта ت связана с преобразованием начальной корневой و в семье ٱتَّقَىٰ. Это не отдельный универсальный префикс со своим значением.'], en: ['ت — historical change', 'In the traditional analysis this ت is tied to the transformation of initial root و in the ٱتَّقَىٰ family. It is not an independent universal prefix with its own meaning.'] },
      { text: 'قْ', kind: 'root', ru: ['ق — корень', 'Вторая корневая остаётся непосредственно видимой.'], en: ['ق — root', 'The second root consonant remains directly visible.'] },
      { text: 'وَى', kind: 'change', ru: ['ـوَى — слабая финаль', 'Конечная часть отражает историческое формообразование слабого корня; разные традиционные разборы описывают этот переход не одинаково.'], en: ['ـوَى — weak ending', 'The ending reflects the historical formation of a weak root; traditional analyses do not all describe the transition identically.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'ٱتَّقَىٰ', ru: 'глагольная семья VIII', en: 'Form VIII verbal family' },
      { ar: 'فَعْلَى', ru: 'один из традиционных разборов модели', en: 'one traditional pattern analysis' },
      { ar: 'تَقْوَى', ru: 'существительное: качество / состояние / направленность', en: 'noun: quality / state / orientation' },
    ],
    effect: {
      ru: ['Существительное в семье ٱتَّقَىٰ', 'Меняет грамматическую перспективу: ٱتَّقَىٰ называет действие/позицию субъекта, а تَقْوَى превращает эту смысловую линию в существительное, которое может называть качество, состояние или направленность.'],
      en: ['A noun in the ٱتَّقَىٰ family', 'Changes the grammatical perspective: ٱتَّقَىٰ names an action/stance, while تَقْوَى packages that semantic line as a noun that can denote a quality, state, or orientation.'],
    },
    transformations: {
      ru: ['Для تَقْوَى словари и грамматические источники дают несколько исторических объяснений образования.', 'Поэтому интерфейс показывает подтверждённую семейную связь и распространённый разбор فَعْلَى, но не выдаёт спорное побуквенное объяснение за единственно возможное.'],
      en: ['Dictionaries and morphology sources give more than one historical account of تَقْوَى.', 'The interface therefore shows the established family relation and the common فَعْلَى analysis without presenting a disputed letter-by-letter history as uniquely certain.'],
    },
    variantAnalysis: true,
  },

  atqa: {
    displayArabic: 'أَتْقَى',
    segments: [
      { text: 'أَ', kind: 'pattern', ru: ['أَـ — модель أَفْعَل', 'Начальная أ — часть модели اسم التفضيل.'], en: ['أَـ — أَفْعَل pattern', 'Initial أ belongs to the elative pattern اسم التفضيل.'] },
      { text: 'تْ', kind: 'change', ru: ['و → ت', 'Традиционный разбор связывает ت с заменой начальной корневой و; источники отмечают и альтернативное объяснение.'], en: ['و → ت', 'A traditional analysis links ت with replacement of initial root و; sources also record an alternative account.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ى', kind: 'change', ru: ['ي → ى', 'Конечная корневая ي переходит в ى в этой слабой форме.'], en: ['ي → ى', 'Final root ي appears as ى in this weak form.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'تَقْوَى / تَقِيّ', ru: 'семья качества', en: 'quality family' },
      { ar: 'أَفْعَل', ru: 'модель اسم التفضيل', en: 'elative pattern' },
      { ar: 'أَتْقَى', ru: 'более / наиболее обладающий качеством', en: 'having a greater / greatest degree of the quality' },
    ],
    effect: {
      ru: ['أَفْعَل · اسم التفضيل', 'Не создаёт новый глагол IV формы. Эта модель сравнивает степень качества: «более… / наиболее…» в зависимости от конструкции.'],
      en: ['أَفْعَل · elative', 'This is not a new Form IV verb. The pattern compares degree: “more…” / “most…” depending on construction.'],
    },
    transformations: {
      ru: ['Источники сходятся, что это اسم التفضيل на модели أَفْعَل и корень остаётся و ق ي.', 'Побуквенная история начальной ت имеет более одного традиционного объяснения, поэтому она помечена как изменение, а не как простой аффикс.'],
      en: ['Sources agree that this is an elative on أَفْعَل and that the root remains و ق ي.', 'The letter-by-letter history of initial ت has more than one traditional account, so it is marked as a change rather than a simple affix.'],
    },
    variantAnalysis: true,
  },

  tuqat: {
    displayArabic: 'تُقَاة',
    segments: [
      { text: 'تُ', kind: 'change', ru: ['ت — семейное преобразование و', 'Традиционный разбор связывает начальную ت с преобразованием корневой و.'], en: ['ت — family transformation of و', 'Traditional analysis connects initial ت with transformation of root و.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ا', kind: 'change', ru: ['ا — слабое изменение', 'Конечная корневая ي участвует в переходе к долгому ā в этой форме.'], en: ['ا — weak change', 'Final root ي participates in the shift to long ā in this form.'] },
      { text: 'ة', kind: 'pattern', ru: ['ة — часть именной модели', 'Формирует именную/масдарную форму; значение создаётся моделью целиком.'], en: ['ة — part of the nominal pattern', 'It belongs to the nominal/verbal-noun formation; meaning comes from the whole pattern.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'ٱتَّقَىٰ', ru: 'глагольная семья VIII', en: 'Form VIII verbal family' },
      { ar: 'فُعَلَة', ru: 'традиционный разбор модели', en: 'traditional pattern analysis' },
      { ar: 'تُقَاة', ru: 'существительное действия / предосторожности', en: 'verbal noun / precaution noun' },
    ],
    effect: {
      ru: ['Именная форма действия', 'Переводит глагольную смысловую линию в существительное: само остережение / принятие мер защиты.'],
      en: ['Action noun', 'Packages the verbal semantic line as a noun: the act/state of precaution or guarding oneself.'],
    },
    transformations: {
      ru: ['Форма редкая, и источники обсуждают её образование по-разному.', 'В интерфейсе она остаётся отмеченной как традиционный разбор, а не как универсальное правило для всех слов семьи.'],
      en: ['The form is rare and sources discuss its formation differently.', 'The interface marks this as a traditional analysis, not a universal rule for all words in the family.'],
    },
    variantAnalysis: true,
  },

  taqiyy: {
    displayArabic: 'تَقِيّ',
    segments: [
      { text: 'تَ', kind: 'change', ru: ['ت — семейное преобразование', 'Отражает историческое развитие семьи و ق ي; не самостоятельный смысловой префикс.'], en: ['ت — family transformation', 'Reflects the historical development of the و ق ي family; it is not an independent semantic prefix.'] },
      { text: 'قِ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'يّ', kind: 'change', ru: ['يّ — часть формы качества', 'Удвоенная ي относится к строению прилагательного; Lane приводит فَعِيل как один из разборов и обсуждает альтернативу.'], en: ['يّ — part of the adjective formation', 'The doubled ي belongs to the adjective’s formation; Lane gives فَعِيل as one analysis and discusses an alternative.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'تَقْوَى / ٱتَّقَىٰ', ru: 'словообразовательная семья', en: 'derivational family' },
      { ar: 'فَعِيل', ru: 'один из разборов модели', en: 'one pattern analysis' },
      { ar: 'تَقِيّ', ru: 'прилагательное: человек, характеризуемый качеством', en: 'adjective: a person characterised by the quality' },
    ],
    effect: {
      ru: ['Прилагательное качества', 'Переводит смысловую линию на устойчивую характеристику человека: не действие как событие, а качество носителя.'],
      en: ['Quality adjective', 'Shifts the semantic line to a characteristic of a person: not an event-like action, but a quality of its bearer.'],
    },
    transformations: {
      ru: ['Для исторического образования تَقِيّ также существуют разные объяснения; поэтому побуквенная схема отмечена как рабочая, а не абсолютная.'],
      en: ['The historical formation of تَقِيّ also has competing accounts, so the letter-by-letter map is shown as a working analysis rather than an absolute one.'],
    },
    variantAnalysis: true,
  },

  wiqaa: {
    displayArabic: 'وِقَاء',
    segments: [
      { text: 'وِ', kind: 'root', ru: ['و — корень', 'Первая корневая.'], en: ['و — root', 'The first root consonant.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ا', kind: 'pattern', ru: ['ا — часть فِعَال', 'Долгий ā входит в именную модель.'], en: ['ا — part of فِعَال', 'Long ā belongs to the nominal pattern.'] },
      { text: 'ء', kind: 'change', ru: ['ي → ء', 'Конечная корневая ي после долгого ā проявляется как همزة в وِقَاء.'], en: ['ي → ء', 'Final root ي appears as hamza after long ā in وِقَاء.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'وَقَىٰ', ru: 'защищать', en: 'to protect' },
      { ar: 'فِعَال', ru: 'именная модель', en: 'nominal pattern' },
      { ar: 'وِقَاء', ru: 'средство / покров защиты', en: 'means / covering of protection' },
    ],
    effect: {
      ru: ['فِعَال · существительное', 'Переводит действие защиты в имя того, что служит защитой / покрытием.'],
      en: ['فِعَال · noun', 'Packages the protective action as a noun for what serves as protection / covering.'],
    },
    transformations: {
      ru: ['Конечная корневая ي меняет графическую форму рядом с долгим ā и проявляется как ء.'],
      en: ['Final root ي changes its written form next to long ā and appears as ء.'],
    },
  },

  wiqaya: {
    displayArabic: 'وِقَايَة',
    segments: [
      { text: 'وِ', kind: 'root', ru: ['و — корень', 'Первая корневая.'], en: ['و — root', 'The first root consonant.'] },
      { text: 'قَ', kind: 'root', ru: ['ق — корень', 'Вторая корневая.'], en: ['ق — root', 'The second root consonant.'] },
      { text: 'ا', kind: 'pattern', ru: ['ا — часть فِعَالَة', 'Входит в модель масдара.'], en: ['ا — part of فِعَالَة', 'Belongs to the verbal-noun pattern.'] },
      { text: 'يَ', kind: 'root', ru: ['ي — корень', 'Третья корневая здесь сохраняется перед ة.'], en: ['ي — root', 'The third root consonant remains visible before ة.'] },
      { text: 'ة', kind: 'pattern', ru: ['ة — часть فِعَالَة', 'Завершает модель существительного действия.'], en: ['ة — part of فِعَالَة', 'Completes the verbal-noun pattern.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'وَقَىٰ', ru: 'защищать', en: 'to protect' },
      { ar: 'فِعَالَة', ru: 'модель масдара', en: 'verbal-noun pattern' },
      { ar: 'وِقَايَة', ru: 'защита / предохранение как действие', en: 'protection / safeguarding as an action' },
    ],
    effect: {
      ru: ['فِعَالَة · масдар', 'Превращает глагольное действие в существительное действия: «защищать» → «защита / предохранение».'],
      en: ['فِعَالَة · verbal noun', 'Turns the verbal action into an action noun: “to protect” → “protection / safeguarding”.'],
    },
    transformations: {
      ru: ['В отличие от وَاقٍ, конечная корневая ي здесь остаётся видимой, потому что после неё идёт ة.'],
      en: ['Unlike وَاقٍ, final root ي remains visible here because ة follows it.'],
    },
  },

  tawaqqa: {
    displayArabic: 'تَوَقَّىٰ',
    segments: [
      { text: 'تَ', kind: 'pattern', ru: ['تَـ — часть V формы', 'Начальная ت добавлена моделью تَفَعَّلَ.'], en: ['تَـ — part of Form V', 'Initial ت is added by the تَفَعَّلَ pattern.'] },
      { text: 'وَ', kind: 'root', ru: ['و — корень', 'Первая корневая здесь остаётся видимой.'], en: ['و — root', 'The first root consonant remains visible here.'] },
      { text: 'قَّ', kind: 'change', ru: ['ق + удвоение', 'Вторая корневая ق удваивается как часть модели V формы.'], en: ['ق + gemination', 'The second root consonant ق is geminated as part of the Form V pattern.'] },
      { text: 'ىٰ', kind: 'change', ru: ['ي → ىٰ', 'Конечная корневая ي проявляется как ىٰ.'], en: ['ي → ىٰ', 'Final root ي appears as ىٰ.'] },
    ],
    lineage: [
      { ar: 'و ق ي', ru: 'корень', en: 'root' },
      { ar: 'وَقَىٰ', ru: 'I форма', en: 'Form I' },
      { ar: 'تَفَعَّلَ', ru: 'модель V формы', en: 'Form V pattern' },
      { ar: 'تَوَقَّىٰ', ru: 'беречься / принимать предосторожности', en: 'guard oneself / take precautions' },
    ],
    effect: {
      ru: ['تَفَعَّلَ · V форма', 'В этом корне форма направляет защитную линию на самого субъекта: беречься, остерегаться, принимать предосторожности. Это lexical realization, а не универсальное значение V формы для всех корней.'],
      en: ['تَفَعَّلَ · Form V', 'In this root, the form directs the protective line toward the subject: guard oneself, beware, take precautions. This is a lexical realization, not a universal meaning of Form V across all roots.'],
    },
    transformations: {
      ru: ['Добавляется начальная ت.', 'Вторая корневая ق удваивается.', 'Конечная ي слабого корня проявляется как ىٰ.'],
      en: ['Initial ت is added.', 'The second root consonant ق is geminated.', 'Final root ي appears as ىٰ.'],
    },
  },
}
