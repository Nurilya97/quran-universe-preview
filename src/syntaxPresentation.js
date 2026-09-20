// Presentation adapter for the verified 2:197 syntax shown in Ayah Space.
// Evidence lives in ayahPrototype.js and is cross-checked against the Quranic
// Arabic Corpus word-by-word / i'rab analysis for 2:197.
//
// Arrow direction is explanatory reading (governor / first element → dependent),
// not a claim that every visible arrow is imported directly from a dependency graph.

function getInnaClause(ayah) {
  const text = ayah.tokens[25]?.analysis?.ru?.syntax?.text || ''
  if (
    ayah.reference !== '2:197' ||
    !['اسم إِنَّ', 'مُضاف إليه', 'خبر إِنَّ'].every(term => text.includes(term)) ||
    ayah.tokens.slice(22, 26).map(t => t.ar).join(' ') !== 'فَإِنَّ خَيْرَ ٱلزَّادِ ٱلتَّقْوَىٰ'
  ) return null

  return {
    id: 'inna-clause',
    range: [23, 26],
    evidence: { file: 'src/ayahPrototype.js', token: 26, field: 'analysis.ru/en.syntax.text' },
    coverage: {
      ru: 'Разобрана конструкция 2:197:23–26: إِنَّ, именная часть, идафа и خبر إِنَّ.',
      en: 'This analysis covers 2:197:23–26: إِنَّ, its nominal argument, the iḍāfa and خبر إِنَّ.',
    },
    steps: [
      {
        id: 'inna',
        from: 23,
        to: 24,
        active: [23, 24],
        terms: ['inna', 'ismInna'],
        short: { ru: 'إِنَّ + اسمها', en: 'إِنَّ + its ism' },
        term: 'إِنَّ · اسْم إِنَّ',
        tr: 'inna · ism inna',
        ru: 'إِنَّ (inna) вводит усиленное утверждение. خَيْرَ (khayra) — его именная часть, اسم إِنَّ (ism inna). После إِنَّ это слово находится в состоянии manṣūb; здесь оно слышится и пишется с окончанием -a: khayra.',
        en: 'إِنَّ (inna) introduces an emphatic statement. خَيْرَ (khayra) is its nominal argument, اسم إِنَّ (ism inna). After إِنَّ the word is in the manṣūb state; here that is heard and written with the final -a: khayra.',
      },
      {
        id: 'idafa',
        from: 24,
        to: 25,
        active: [24, 25],
        terms: ['idafa', 'mudaf', 'mudafIlayhi'],
        short: { ru: 'Идафа', en: 'Iḍāfa' },
        term: 'مُضَاف · مُضَاف إِلَيْهِ',
        tr: 'muḍāf · muḍāf ilayhi',
        ru: 'ٱلزَّادِ (al-zādi) уточняет خَيْرَ (khayra): вместе получается «лучший запас». Это идафа: خَيْرَ — muḍāf, а ٱلزَّادِ — muḍāf ilayhi. Второе слово находится в состоянии majrūr; здесь это видно по окончанию -i: al-zādi.',
        en: 'ٱلزَّادِ (al-zādi) specifies خَيْرَ (khayra): together they mean “the best provision.” This is an iḍāfa: خَيْرَ is the muḍāf and ٱلزَّادِ is the muḍāf ilayhi. The second word is in the majrūr state; here it is visible in the final -i: al-zādi.',
      },
      {
        id: 'predicate',
        from: 24,
        to: 26,
        active: [24, 25, 26],
        group: [24, 25],
        terms: ['khabarInna'],
        short: { ru: 'خبر إِنَّ', en: 'خبر إِنَّ' },
        term: 'خَبَر إِنَّ',
        tr: 'khabar inna',
        ru: 'ٱلتَّقْوَىٰ (al-taqwā) завершает утверждение о خَيْرَ ٱلزَّادِ (khayra al-zādi) — «лучшем запасе»: сообщает, чем он является. Здесь ٱلتَّقْوَىٰ выполняет роль خبر إِنَّ (khabar inna) и находится в состоянии marfūʿ. Из-за конечной ىٰ (alif maqṣūra) ожидаемая ḍamma не проявляется на письме.',
        en: 'ٱلتَّقْوَىٰ (al-taqwā) completes the statement about خَيْرَ ٱلزَّادِ (khayra al-zādi), “the best provision,” by saying what it is. Here ٱلتَّقْوَىٰ functions as خبر إِنَّ (khabar inna) and is in the marfūʿ state. Because it ends in ىٰ (alif maqṣūra), the expected ḍamma is not visibly shown.',
      },
    ],
  }
}

function getClosingAddress(ayah) {
  const syntax = ayah.tokens[26]?.analysis?.ru?.syntax
  if (
    ayah.reference !== '2:197' ||
    !syntax?.title?.includes('فعل أمر') ||
    ayah.tokens.slice(26, 29).map(t => t.ar).join(' ') !== 'وَٱتَّقُونِ يَـٰٓأُو۟لِي ٱلْأَلْبَـٰبِ'
  ) return null

  return {
    id: 'closing-address',
    range: [27, 29],
    evidence: {
      file: 'src/ayahPrototype.js',
      token: 27,
      field: 'analysis.ru/en.syntax',
      external: 'Quranic Arabic Corpus 2:197:27–29 / iʿrāb',
    },
    coverage: {
      ru: 'Разобрана завершающая фраза 2:197:27–29: повеление وَٱتَّقُونِ и обращение يَـٰٓأُو۟لِي ٱلْأَلْبَـٰبِ.',
      en: 'This analysis covers the closing phrase 2:197:27–29: the imperative وَٱتَّقُونِ and the address يَـٰٓأُو۟لِي ٱلْأَلْبَـٰبِ.',
    },
    steps: [
      {
        id: 'imperative',
        from: 27,
        to: 27,
        active: [27],
        arrow: false,
        terms: ['imperative', 'pluralSubject', 'nunWiqaya', 'objectPronoun'],
        short: { ru: 'Повеление', en: 'Imperative' },
        term: 'فِعْل أَمْر',
        tr: 'fiʿl amr',
        ru: 'وَٱتَّقُونِ (wa-ittaqūni) — прямое повеление множественному адресату. Внутри формы ٱتَّقُوا стоит повелительный глагол VIII формы и واو الجماعة — субъект «вы». Конечная نِ — nūn al-wiqāya; подразумеваемая yā означает «Меня» и является объектным местоимением.',
        en: 'وَٱتَّقُونِ (wa-ittaqūni) is a direct imperative addressed to a plural audience. Inside ٱتَّقُوا is the Form VIII imperative together with واو الجماعة as the subject, “you”. The final نِ is nūn al-wiqāya; the understood yā means “Me” and functions as the object pronoun.',
      },
      {
        id: 'vocative',
        from: 28,
        to: 29,
        active: [28, 29],
        terms: ['vocativeParticle', 'munada', 'idafaAddress', 'mudafAddress', 'mudafIlayhiAddress'],
        short: { ru: 'Обращение', en: 'Vocative' },
        term: 'نِدَاء · إِضَافَة',
        tr: 'nidāʾ · iḍāfa',
        ru: 'يَا открывает прямое обращение. أُولِي (ulī) — munādā, то есть тот, к кому обращаются; одновременно это первое имя идафы. ٱلْأَلْبَابِ (al-albābi) — второе имя идафы и уточняет первое: «обладатели разумения».',
        en: 'يَا opens the direct address. أُولِي (ulī) is the munādā, the noun being addressed, and at the same time the first noun of an iḍāfa. ٱلْأَلْبَابِ (al-albābi) is the second noun of the iḍāfa and specifies the first: “possessors of understanding”.',
      },
    ],
  }
}

export function getSyntaxPresentation(ayah, selectedWord = 26) {
  if (ayah?.reference !== '2:197') return null
  if (selectedWord >= 23 && selectedWord <= 26) return getInnaClause(ayah)
  if (selectedWord >= 27 && selectedWord <= 29) return getClosingAddress(ayah)
  return null
}
