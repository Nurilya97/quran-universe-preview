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
        ru: 'إِنَّ вводит усиленное утверждение. خَيْرَ — его именная часть (اسم إِنَّ), поэтому стоит в винительном падеже.',
        en: 'إِنَّ introduces an emphatic statement. خَيْرَ is its nominal argument (ism inna), so it takes the accusative case.' },
      { id: 'idafa', from: 24, to: 25, active: [24, 25],
        term: 'مُضَاف · مُضَاف إِلَيْهِ', tr: 'muḍāf · muḍāf ilayhi',
        ru: 'ٱلزَّادِ уточняет خَيْرَ: «лучший запас». Вместе они образуют идафу. Второе слово стоит в родительном падеже.',
        en: 'ٱلزَّادِ specifies خَيْرَ: “the best provision.” Together they form an iḍāfa; the second noun takes the genitive case.' },
      { id: 'predicate', from: 24, to: 26, active: [24, 25, 26], group: [24, 25],
        term: 'خَبَر إِنَّ', tr: 'khabar inna',
        ru: 'ٱلتَّقْوَىٰ завершает утверждение о «лучшем запасе»: сообщает, чем он является. Это خبر إِنَّ в именительном падеже; дамма на конечной ىٰ не видна.',
        en: 'ٱلتَّقْوَىٰ completes the statement about “the best provision,” saying what it is. This is khabar inna, in the nominative; the final ىٰ does not display the ḍamma.' },
    ],
  }
}
