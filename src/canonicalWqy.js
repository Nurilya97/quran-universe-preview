// Public-safe canonical snapshot exported from the private Quran Universe research repo.
// Semantic/control authority remains private. This file intentionally contains no Notion IDs,
// orchestrator state, private evidence packets, or unpublished research notes.
export const WQY_PUBLIC_MODEL = {
  sourceCommit: '2fb38e5d7b530922f9178e21cde3016a64cffb44',
  syncedAt: '2026-09-18',
  modelVersion: 'WQY-SM v0.2 — falsification-passed — 2026-09-17',
  phase: 'Visualization',
  publicationStatus: 'published_working_model',
  falsificationPassed: true,
  translationFidelityReviewed: true,
  humanReviewed: true,
  scholarReviewed: false,
  root: 'و ق ي',
  meaningMethodology: {
    status: 'approved_project_rule',
    principle: {
      ru: 'Значение слова в Quran Universe прежде всего выводится из самого Корана: его употреблений, морфологии и сопоставления всех коранических контекстов. Внешние источники используются как дополнительные проверочные слои.',
      en: 'In Quran Universe, a word’s meaning is derived first from the Quran itself: its usages, morphology, and comparison across Quranic contexts. External sources are used as additional verification layers.',
    },
    primaryEvidence: [
      { rank: 1, id: 'quran_usage', ru: 'Сам Коран: употребления слова и ближайших производных.', en: 'The Quran itself: usages of the word and its close derivatives.' },
      { rank: 2, id: 'morphology', ru: 'Арабская морфология и словообразование: корень, форма, шаблон и грамматическая функция.', en: 'Arabic morphology and derivation: root, form, pattern, and grammatical function.' },
      { rank: 3, id: 'cross_context', ru: 'Сопоставление всех коранических контекстов: предполагаемое значение должно выдерживать весь корпус употреблений.', en: 'Cross-context comparison across the Quran: a proposed meaning must hold across the full set of usages.' },
    ],
    secondaryEvidence: [
      { rank: 4, id: 'classical_lexicons', ru: 'Классические арабские словари: подтверждают лексическое ядро и диапазон значений.', en: 'Classical Arabic lexicons: confirm the lexical nucleus and semantic range.' },
      { rank: 5, id: 'translations', ru: 'Переводы: рассматриваются как варианты передачи смысла, а не как источник значения.', en: 'Translations: treated as renderings of meaning, not as the source of meaning.' },
      { rank: 6, id: 'tafsir', ru: 'Тафсиры: самый низкий приоритет; это человеческие интерпретации конкретных аятов, а не определяющий источник значения слова.', en: 'Tafsir: lowest priority; these are human interpretations of particular verses, not the controlling source for a word’s meaning.' },
    ],
    validationRule: {
      ru: 'Если смысловая модель не выдерживает другое кораническое употребление того же слова или его близкой формы, модель пересматривается.',
      en: 'If a semantic model fails against another Quranic usage of the same word or a closely related form, the model must be revised.',
    },
  },
  rootNucleus: {
    ru: 'Фундаментальное значение корня — ограждать / защищать, не позволяя вреду достигнуть защищаемого.',
    en: 'The fundamental meaning of the root is to protect / shield by preventing harm from reaching what is protected.',
  },
  operativeMechanism: {
    ru: 'ٱتَّقَىٰ (ittaqā) описывает активную защитную позицию: человек сам действует так, чтобы уберечь себя.',
    en: 'ٱتَّقَىٰ (ittaqā) describes an active protective stance: the person acts in a way that guards themself.',
  },
  roleSafeguards: {
    directObject: {
      ru: 'В конструкции اتقى + X прямой грамматический объект сам по себе не делает X источником опасности.',
      en: 'In اتقى + X, the direct grammatical object does not by itself make X the source of danger.',
    },
    noGlobalOppositeRule: {
      ru: 'Нельзя вводить и обратное абсолютное правило: в контекстах суда встречается отсутствие защитника от Аллаха — например مِنَ اللَّهِ مِنْ وَاقٍ.',
      en: 'The opposite absolute rule is also unsafe: judgment contexts can state that there is no protector from Allah, as in مِنَ اللَّهِ مِنْ وَاقٍ.',
      refs: ['13:34', '13:37'],
    },
  },
  translationFidelity: {
    universalEquivalent: false,
    ru: {
      summary: 'У تقوى/اتقى нет одного протестированного перевода, который сохранял бы всю модель во всех контекстах.',
      righteousness: '«Праведность» может передавать проявление или результат в отдельных контекстах, но не является полным определением механизма.',
      godFearing: '«Богобоязненность» не используется как нейтральный перевод по умолчанию: она сдвигает смысл к страху и может искажать роли.',
      q2_194: 'Для 2:194 «остерегайтесь наказания Аллаха» — role-safe интерпретирующий вариант, а не буквальный лексический эквивалент.',
    },
    en: {
      summary: 'No tested rendering preserves the whole تقوى/اتقى model in every context.',
      righteousness: '“Righteousness” can represent a manifestation or outcome in some contexts, but not the full mechanism.',
      godFearing: 'Fear-centered “God-fearing” language is not used as a neutral default because it can import a threat frame and distort semantic roles.',
      q2_194: 'For 2:194, “be mindful of Allah” is the preferred tested short English rendering; it remains a contextually good partial, not a universal equivalent.',
    },
  },
  reviewedContexts: {
    '2:194': {
      status: 'human_verified',
      ru: 'В контексте пропорционального ответа защитная позиция проявляется как саморегуляция перед Аллахом и удерживание разрешённой границы.',
      en: 'In the retaliation-boundary context, the protective stance is expressed as self-regulation before Allah and keeping the permitted boundary.',
    },
    '5:8': {
      status: 'human_verified',
      ru: 'Справедливость названа ближе к taqwā; righteousness/праведность могут передавать manifestation/outcome, но не весь protection-oriented mechanism.',
      en: 'Justice is described as nearer to taqwā; righteousness can render a manifestation/outcome layer without replacing the whole protection-oriented mechanism.',
    },
    '13:34': {
      status: 'human_verified',
      ru: 'Hard case: مِنَ اللَّهِ مِنْ وَاقٍ — нет защитника от Аллаха. Это опровергает старый абсолютный safeguard, но не защитное ядро корня.',
      en: 'Hard case: مِنَ اللَّهِ مِنْ وَاقٍ — no protector from Allah. This rejects the old absolute safeguard without overturning the protective root nucleus.',
    },
  },
  corpusCounts: {
    waqa: 16,
    ittaqa: 166,
    taqwa: 17,
    muttaqin: 49,
    atqa: 2,
    tuqat: 1,
    waq: 3,
    taqiyy: 4,
    total: 258,
  },
}
