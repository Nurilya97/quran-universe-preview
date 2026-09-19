// Presentation adapter for existing Quran Universe analysis; no inferred dependencies.
// Evidence: ayahPrototype.js, 2:197, token 26, analysis.ru/en.syntax.text.
// Arrow direction follows explanatory reading (governor → complement), not a
// claim that these are imported Quranic Arabic Corpus dependency edges.
export function getSyntaxPresentation(ayah) {
  const text = ayah.tokens[25]?.analysis?.ru?.syntax?.text || ''
  if (ayah.reference !== '2:197' ||
      !['اسم إِنَّ', 'مُضاف إليه', 'خبر إِنَّ'].every(term => text.includes(term)) ||
      ayah.tokens.slice(22, 26).map(t => t.ar).join(' ') !== 'فَإِنَّ خَيْرَ ٱلزَّادِ ٱلتَّقْوَىٰ') return null
  return {
    range: [23, 26],
    evidence: { file: 'src/ayahPrototype.js', token: 26, field: 'analysis.ru/en.syntax.text' },
    steps: [
      { id: 'inna', from: 23, to: 24, active: [23, 24],
        term: 'إِنَّ · اسْم إِنَّ', tr: 'inna · ism inna',
        notes: {
          ru: [
            { word: 23, text: 'связка فَ + إِنَّ: связывает с предыдущей мыслью и вводит усиленное утверждение' },
            { word: 24, text: '«лучший» — именная часть после إِنَّ' },
          ],
          en: [
            { word: 23, text: 'فَ + إِنَّ: links to the preceding thought and introduces an emphatic statement' },
            { word: 24, text: '“best” — the nominal element after إِنَّ' },
          ],
        },
        ru: 'إِنَّ (inna) вводит усиленное утверждение. خَيْرَ (khayra) — его именная часть, اسم إِنَّ (ism inna). После إِنَّ это слово находится в состоянии manṣūb; здесь оно слышится и пишется с окончанием -a: khayra.',
        en: 'إِنَّ (inna) introduces an emphatic statement. خَيْرَ (khayra) is its nominal argument, اسم إِنَّ (ism inna). After إِنَّ the word is in the manṣūb state; here that is heard and written with the final -a: khayra.' },
      { id: 'idafa', from: 24, to: 25, active: [24, 25],
        term: 'مُضَاف · مُضَاف إِلَيْهِ', tr: 'muḍāf · muḍāf ilayhi',
        notes: {
          ru: [
            { word: 24, text: '«лучший» — первое слово сочетания' },
            { word: 25, text: '«запас» — уточняет первое слово и завершает сочетание «лучший запас»' },
          ],
          en: [
            { word: 24, text: '“best” — the first word of the construction' },
            { word: 25, text: '“provision” — specifies the first word and completes “the best provision”' },
          ],
        },
        ru: 'ٱلزَّادِ (al-zādi) уточняет خَيْرَ (khayra): вместе получается «лучший запас». Это идафа: خَيْرَ — muḍāf, а ٱلزَّادِ — muḍāf ilayhi. Второе слово находится в состоянии majrūr; здесь это видно по окончанию -i: al-zādi.',
        en: 'ٱلزَّادِ (al-zādi) specifies خَيْرَ (khayra): together they mean “the best provision.” This is an iḍāfa: خَيْرَ is the muḍāf and ٱلزَّادِ is the muḍāf ilayhi. The second word is in the majrūr state; here it is visible in the final -i: al-zādi.' },
      { id: 'predicate', from: 24, to: 26, active: [24, 25, 26], group: [24, 25],
        term: 'خَبَر إِنَّ', tr: 'khabar inna',
        notes: {
          ru: [
            { word: 24, text: '«лучший» — начало фразы «лучший запас»' },
            { word: 25, text: '«запас» — завершает эту именную фразу' },
            { word: 26, text: '«благочестие» — сообщает, чем является названный «лучший запас»' },
          ],
          en: [
            { word: 24, text: '“best” — begins the phrase “the best provision”' },
            { word: 25, text: '“provision” — completes that nominal phrase' },
            { word: 26, text: '“piety” — states what the named “best provision” is' },
          ],
        },
        ru: 'ٱلتَّقْوَىٰ (al-taqwā) завершает утверждение о خَيْرَ ٱلزَّادِ (khayra al-zādi) — «лучшем запасе»: сообщает, чем он является. Здесь ٱلتَّقْوَىٰ выполняет роль خبر إِنَّ (khabar inna) и находится в состоянии marfūʿ. Из-за конечной ىٰ (alif maqṣūra) ожидаемая ḍamma не проявляется на письме.',
        en: 'ٱلتَّقْوَىٰ (al-taqwā) completes the statement about خَيْرَ ٱلزَّادِ (khayra al-zādi), “the best provision,” by saying what it is. Here ٱلتَّقْوَىٰ functions as خبر إِنَّ (khabar inna) and is in the marfūʿ state. Because it ends in ىٰ (alif maqṣūra), the expected ḍamma is not visibly shown.' },
    ],
  }
}
