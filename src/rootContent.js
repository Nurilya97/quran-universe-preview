import { WQY_PUBLIC_MODEL } from './canonicalWqy.js'

// Short editorial explanations based only on the public sources linked below.
// This lexical guide presents public word-level explanations and linked sources.
export const CONTENT_SOURCES = {
  corpus: { url: 'https://corpus.quran.com/qurandictionary.jsp?q=wqy', ru: 'Коранический арабский корпус · University of Leeds', en: 'Quranic Arabic Corpus · University of Leeds' },
  lexicon: { url: 'https://arabiclexicon.hawramani.com/%D9%88%D9%82%D9%89/', ru: 'Arabic Lexicon · свод классических словарей · وقى', en: 'Arabic Lexicon · classical lexicon collection · وقى' },
  taqwa: { url: 'https://www.almaany.com/ar/dict/ar-ar/%D8%AA%D9%82%D9%88%D9%89/', ru: 'Almaany · تقوى', en: 'Almaany · تقوى' },
  raghib: { url: 'https://arabiclexicon.hawramani.com/?p=9899#3cb2a3', ru: 'Ар-Рагиб · «Аль-Муфрадат», وقى', en: 'Al-Raghib · Al-Mufradat, وقى' },
  jawhari: { url: 'https://arabiclexicon.hawramani.com/?p=9899#feef21', ru: 'Аль-Джаухари · «Ас-Сихах», وقى', en: 'Al-Jawhari · Al-Sihah, وقى' },
  laneWqy: { url: 'https://arabiclexicon.hawramani.com/?p=9899#0d72b9', ru: 'Lane · Arabic-English Lexicon, وقى', en: 'Lane · Arabic-English Lexicon, وقى' },
  laneTqy: { url: 'https://arabiclexicon.hawramani.com/?p=17705#09c7e5', ru: 'Lane · Arabic-English Lexicon, تقى', en: 'Lane · Arabic-English Lexicon, تقى' },
  lisanWqy: { url: 'https://www.islamweb.net/ar/library/content/122/9138/%D9%88%D9%82%D9%8A', ru: 'Ибн Манзур · «Лисан аль-Араб» · وقى', en: 'Ibn Manzur · Lisan al-Arab · وقى' },
  furuqTaqi: { url: 'https://ablibrary.net/book_content/b/2655/137', ru: 'Абу Хиляль аль-Аскари · «Аль-Фурук аль-лугавийя» · التقي والمتقي', en: 'Abu Hilal al-Askari · Al-Furuq al-Lughawiyya · التقي والمتقي' },
  ibnFaris: { url: 'https://arabiclexicon.hawramani.com/?p=15912#565c1b', ru: 'Ибн Фарис · «Мака̄йӣс аль-луга», وقى', en: 'Ibn Faris · Maqayis al-Lugha, وقى' },
  tuqatPattern: { url: 'https://www.greattafsirs.com/Tafsir_Library.aspx?AyahNo=28&MadhabNo=1&SoraNo=3&TafsirNo=5', ru: 'Аль-Куртуби · языковой разбор تُقَاة, 3:28', en: 'Al-Qurtubi · linguistic analysis of تُقَاة, 3:28' },
  tuqatCorpus: { url: 'https://corpus.quran.com/wordmorphology.jsp?location=(3:102:7)', ru: 'Разметка слова تُقَاتِهِ · 3:102:7', en: 'Annotation of تُقَاتِهِ · 3:102:7' },
  baqarahMuttaqin: { url: 'https://quran.com/2/2-5', ru: 'Аль-Бакара 2:2–5 · описание المُتَّقِينَ', en: 'Al-Baqarah 2:2–5 · description of المُتَّقِينَ' },
  lbbCorpus: { url: 'https://corpus.quran.com/qurandictionary.jsp?q=lbb', ru: 'Quranic Arabic Corpus · корень ل ب ب', en: 'Quranic Arabic Corpus · root ل ب ب' },
  laneLbb: { url: 'https://www.laneslexicon.com/word/%D9%84%D8%A8/n37427', ru: 'Lane · Arabic-English Lexicon · لبب', en: 'Lane · Arabic-English Lexicon · لبب' },
  lisanLbb: { url: 'https://arabiclexicon.hawramani.com/?p=7855#295848', ru: 'Ибн Манзур · «Лисан аль-Араб» · لبب', en: 'Ibn Manzur · Lisan al-Arab · لبب' },
  jawhariLbb: { url: 'https://arabiclexicon.hawramani.com/?p=7855#5823c9', ru: 'Аль-Джаухари · «Ас-Сихах» · لبب', en: 'Al-Jawhari · Al-Sihah · لبب' },
  arabicLexiconLbb: { url: 'https://arabiclexicon.hawramani.com/%D9%84%D9%8E%D8%A8%D9%8E%D8%A8%D9%8E/', ru: 'Arabic Lexicon · свод классических словарей · لبب', en: 'Arabic Lexicon · classical lexicon collection · لبب' },
  raghibLbb: { url: 'https://www.hodaalquran.com/article/11285', ru: 'Ар-Рагиб · «Аль-Муфрадат» · لب', en: 'Al-Raghib · Al-Mufradat · لب' },
}

export const ROOT_CONTENT = {
  ru: {
    lead: WQY_PUBLIC_MODEL.rootNucleus.ru,
    body: 'Ибн Фарис описывает этот корень через отделение одного от другого посредством защиты, а Ар-Рагиб — через сохранение от вреда. В производной линии ٱتَّقَىٰ (ittaqā) → تَقْوَىٰ (taqwā) это защитное ядро развивается во внутреннюю позицию человека; кораническое употребление раскрывает её через осознанность перед Всевышним, различение, трепет, внимание к границам и сознательный выбор.',
  },
  en: {
    lead: WQY_PUBLIC_MODEL.rootNucleus.en,
    body: 'Ibn Faris describes this root through keeping one thing apart from another by means of protection, while Al-Raghib frames it as preservation from harm. In the derived line ٱتَّقَىٰ (ittaqā) → تَقْوَىٰ (taqwā), this protective core develops into an inner stance, while Quranic usage unfolds it through awareness before the Most High, discernment, awe, attention to boundaries, and conscious choice.',
  },
  sources: ['ibnFaris', 'raghib'],
}

export const WORD_CONTENT = {
  waqa: {
    pattern: 'فَعَلَ', patternReading: 'faʿala',
    structure: {
      ru: ['Глагол I породы. Корневые буквы — و، ق، ي. Начальная و и конечная ي относятся к слабым согласным, поэтому в разных формах глагола они могут изменяться или выпадать.', 'В словарной форме وَقَىٰ конечная ي передана через ى. Настоящее время — يَقِي (yaqī), повелительная форма — قِ (qi).'],
      en: ['A Form I verb with the root letters و، ق، ي. The first and last root letters are weak consonants, so they may change or disappear in inflected forms.', 'The final ي appears as ى in وَقَىٰ. The present form is يَقِي (yaqī), and the singular imperative is قِ (qi).'],
    },
    meaning: {
      ru: { lead: 'وَقَىٰ (waqā) — защищать, оберегать, предохранять кого-либо или что-либо от вреда.', body: 'Фокус на действии защиты, направленном на другой объект: кто-то защищает кого-то или что-то. Контекст уточняет, от какого вреда.' },
      en: { lead: 'وَقَىٰ (waqā) — to protect, guard, or preserve someone or something from harm.', body: 'The focus is the act of protection directed toward another object. Context identifies what kind of harm is being prevented.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'وَقَىٰ (waqā) — само действие «защищать»; وِقَايَة (wiqāya) — защита как действие или процесс; وِقَاء (wiqāʾ) — средство или покров защиты; وَاقٍ (wāqin) — защитник.',
      en: 'وَقَىٰ (waqā) is the act “to protect”; وِقَايَة (wiqāya) is protection as an action or process; وِقَاء (wiqāʾ) is a protective means or covering; وَاقٍ (wāqin) is the protector.',
    },
    structureSources: ['jawhari', 'corpus'], meaningSources: ['raghib', 'laneWqy'], related: ['wiqaya', 'wiqaa', 'waq'],
  },
  ittaqa: {
    pattern: 'اِفْتَعَلَ', patternReading: 'iftaʿala',
    structure: {
      ru: ['Глагол VIII породы от و ق ي. При образовании этой формы начальная корневая و изменяется и сливается с ت модели: поэтому в ٱتَّقَىٰ видна удвоенная ت.', 'Настоящее время — يَتَّقِي (yattaqī). Регулярный масдар, то есть существительное действия, — اِتِّقَاء (ittiqāʾ). تَقْوَى — связанное существительное со своей моделью.'],
      en: ['A Form VIII verb from و ق ي. The first root letter و changes and assimilates with the pattern’s ت, producing the doubled ت in ٱتَّقَىٰ.', 'The present form is يَتَّقِي (yattaqī). The regular verbal noun is اِتِّقَاء (ittiqāʾ). تَقْوَى is a related noun with its own pattern.'],
    },
    meaning: {
      ru: { lead: 'ٱتَّقَىٰ (ittaqā) — беречь себя, остерегаться, предохранять себя от вреда или дурного последствия.', body: 'В Коране слово часто относится к тому, как человек ведёт себя перед Аллахом: помнит о Нём, учитывает Его границы и старается их не нарушать.' },
      en: { lead: 'ٱتَّقَىٰ (ittaqā) — to guard oneself, beware, or protect oneself from harm or a bad consequence.', body: 'In the Quran the word often describes how a person acts before Allah: remembering Him, paying attention to His boundaries, and trying not to cross them.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'Оба глагола могут означать «беречься / остерегаться». تَوَقَّىٰ (tawaqqā) чаще употребляется, когда речь о конкретной опасности и конкретных мерах, чтобы её избежать. ٱتَّقَىٰ (ittaqā), особенно в Коране, шире: человек бережёт себя от дурного, помня об Аллахе и не переходя Его границы.',
      en: 'Both verbs can mean “to guard oneself / beware.” تَوَقَّىٰ (tawaqqā) is more often used for a specific danger and specific steps taken to avoid it. ٱتَّقَىٰ (ittaqā), especially in the Quran, is broader: a person guards against wrongdoing while remembering Allah and keeping His boundaries.',
    },
    structureSources: ['jawhari', 'laneTqy'], meaningSources: ['raghib', 'laneWqy', 'lisanWqy'], related: ['taqwa', 'muttaqin', 'tuqat'],
  },
  taqwa: {
    pattern: 'فَعْلَى', patternReading: 'faʿlā',
    structure: {
      ru: ['Существительное, называющее качество или состояние и словообразовательно связанное с ٱتَّقَىٰ. Для существительного показана собственная модель فَعْلَى.', 'Чтобы увидеть происхождение букв, классическая морфология реконструирует исходную форму وَقْيَا от корня و ق ي. Сначала начальная корневая و заменяется на ت: وَقْيَا → تَقْيَا. Затем конечная корневая ي в имени на فَعْلَى заменяется на و: تَقْيَا → تَقْوَىٰ. Поэтому начальная ت восходит к первой корневой و, а و после ق — к третьей корневой ي.', 'Промежуточные формы здесь показаны как морфологическая реконструкция для объяснения изменений букв, а не как отдельные словарные слова. Классические источники могут по-разному располагать промежуточные стадии; важно, что начальная و соотносится с ت, а конечная корневая ي — с و после ق. Орбита VIII обозначает словообразовательную семью; собственная модель существительного — فَعْلَى.'],
      en: ['A noun naming a quality or state and derivationally related to ٱتَّقَىٰ. The noun is shown with its own pattern فَعْلَى.', 'To make the letters transparent, classical morphology reconstructs an underlying وَقْيَا from the root و ق ي. First, the initial root و is replaced by ت: وَقْيَا → تَقْيَا. Then the final root ي in a noun on فَعْلَى is replaced by و: تَقْيَا → تَقْوَىٰ. Thus initial ت goes back to the first root و, while the و after ق goes back to the third root ي.', 'The intermediate forms are shown here as a morphological reconstruction that explains the letter changes, not as separate dictionary words. Classical sources may order the intermediate stages differently; the key correspondences remain initial و with ت and final root ي with the و after ق. Orbit VIII represents the derivational family; the noun’s own pattern is فَعْلَى.'],
    },
    meaning: {
      ru: { lead: 'تَقْوَىٰ (taqwā) — благочестие, праведность, осознанность перед Аллахом.', body: 'Каждое из этих слов передаёт одну сторону تَقْوَىٰ (taqwā). «Благочестие» подчёркивает отношение к Аллаху и жизнь в соответствии с ним; «праведность» — правильность поступков; «осознанность перед Аллахом» — постоянную память о Нём и внимание к Его границам. تَقْوَىٰ (taqwā) шире любого одного из этих слов.' },
      en: { lead: 'تَقْوَىٰ (taqwā) — piety, righteousness, God-consciousness.', body: 'Each rendering highlights one side of تَقْوَىٰ (taqwā). “Piety” stresses devotion to Allah and the life that follows from it; “righteousness” stresses right conduct; “God-consciousness” stresses remembering Allah and staying attentive to His boundaries. تَقْوَىٰ (taqwā) is broader than any one of these words.' },
    },
    meaningMap: [
      {
        id: 'component',
        ru: { title: 'Кораническое раскрытие', description: 'В 2:2–5 مُتَّقِين (muttaqīn) описаны через убеждения и поступки. Это показывает, как تَقْوَىٰ (taqwā) проявляется в жизни, а не заменяет её словарное определение.', items: [
          { term: 'Вера в сокрытое и откровение', definition: 'Человек принимает руководство Аллаха и реальность, известную через откровение.' },
          { term: 'Молитва и расходование из дарованного', definition: 'Внутреннее состояние становится видимым в конкретных поступках.' },
          { term: 'Руководство и успех', definition: 'В 2:5 эти результаты названы после описания مُتَّقِين (muttaqīn).' },
        ] },
        en: { title: 'Quranic unfolding', description: 'In 2:2–5, مُتَّقِين (muttaqīn) are described through convictions and actions. This shows how تَقْوَىٰ (taqwā) appears in life rather than replacing its lexical definition.', items: [
          { term: 'Belief in the unseen and revelation', definition: 'The person accepts Allah’s guidance and realities known through revelation.' },
          { term: 'Prayer and spending from what is provided', definition: 'The inward state becomes visible in concrete actions.' },
          { term: 'Guidance and success', definition: 'In 2:5 these outcomes are named after the description of مُتَّقِين (muttaqīn).' },
        ] },
      },
    ],
    translationNotes: {
      ru: [
        {
          tone: 'positive',
          title: 'Допустимые переводы',
          text: 'Какой вариант выбрать, показывает сам аят. В 2:197 основным переводом остаётся «благочестие».',
        },
        {
          tone: 'warning',
          title: '«Богобоязненность»',
          text: 'Проблемна как общий перевод تَقْوَىٰ (taqwā), потому что ставит страх на первое место и сужает смысл. تَقْوَىٰ (taqwā) может включать благоговейный трепет и почтение к Аллаху, но не сводится к боязни.',
        },
      ],
      en: [
        {
          tone: 'positive',
          title: 'Valid translations',
          text: 'The ayah itself shows which rendering fits best. In 2:197 the primary rendering remains “piety”.',
        },
        {
          tone: 'warning',
          title: '“God-fearing”',
          text: 'Problematic as a general rendering because it puts fear at the centre and narrows the meaning. تَقْوَىٰ (taqwā) can include reverential awe and regard for Allah, but it is not reducible to fear.',
        },
      ],
    },
    distinction: {
      ru: 'ٱتَّقَىٰ (ittaqā) — действие «беречь себя / остерегаться»; تَقْوَىٰ (taqwā) — состояние или качество, из которого такое поведение вырастает; مُتَّقِين (muttaqīn) — люди, у которых оно проявляется в выборе и поступках.',
      en: 'ٱتَّقَىٰ (ittaqā) is the action “to guard oneself / beware”; تَقْوَىٰ (taqwā) is the state or quality from which such conduct grows; مُتَّقِين (muttaqīn) are people in whom it appears through choices and actions.',
    },
    structureSources: ['laneTqy', 'jawhari'], meaningSources: ['raghib', 'laneTqy', 'baqarahMuttaqin'], related: ['ittaqa', 'taqiyy', 'muttaqin'],
  },

  tuqat: {
    pattern: 'فُعَلَة', patternReading: 'fuʿala',
    structure: {
      ru: ['Существительное действия — масдар, связанный с ٱتَّقَىٰ. В разборе 3:28 корпус отмечает единственное число, женский род и винительный падеж: تُقَاةً.', 'Модель فُعَلَة приведена по языковому разбору аль-Куртуби: начальная و заменяется на ت, а конечная корневая ي — на долгий ā. В словарях обсуждаются и другие разборы формы.'],
      en: ['A verbal noun related to ٱتَّقَىٰ. At 3:28, the Corpus annotates تُقَاةً as feminine singular and accusative.', 'The pattern فُعَلَة follows Al-Qurtubi’s linguistic analysis: initial و becomes ت, and the final root ي becomes long ā. Dictionaries also discuss other analyses of this form.'],
    },
    meaning: {
      ru: { lead: 'تُقَاة (tuqāt) — предосторожность, остережение; конкретная защитная мера.', body: 'Слово называет не общее качество человека, а действие или меру, которую принимают, чтобы уберечься в определённой ситуации.' },
      en: { lead: 'تُقَاة (tuqāt) — caution, precaution, or a specific protective measure.', body: 'The word names an act or measure taken for protection in a particular situation, not a broad personal quality.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'تُقَاة (tuqāt) — конкретная предосторожность или защитная мера; تَقْوَىٰ (taqwā) — более широкое состояние или качество.',
      en: 'تُقَاة (tuqāt) is a specific precaution or protective measure; تَقْوَىٰ (taqwā) is a broader state or quality.',
    },
    structureSources: ['tuqatPattern', 'corpus'], meaningSources: ['jawhari', 'laneTqy'], related: ['ittaqa', 'taqwa'],
  },
  muttaqin: {
    pattern: 'مُفْتَعِل', patternReading: 'muftaʿil',
    structure: {
      ru: ['Действительное причастие VIII породы: называет того, кто совершает действие ٱتَّقَىٰ. Модель дана для единственного числа; в центре показана форма множественного числа.', 'Единственное число — مُتَّقٍ (muttaqin). Множественное — مُتَّقُونَ (muttaqūna) в именительном и مُتَّقِينَ (muttaqīna) в винительном или родительном падеже. Долгое ī отличает показанную форму множественного числа.'],
      en: ['An active participle of Form VIII, naming someone who performs ٱتَّقَىٰ. The pattern is singular; the displayed word is plural.', 'The singular is مُتَّقٍ (muttaqin). The plural is مُتَّقُونَ (muttaqūna) in the nominative and مُتَّقِينَ (muttaqīna) in the accusative or genitive. Long ī distinguishes the displayed plural form.'],
    },
    meaning: {
      ru: { lead: 'مُتَّقِين (muttaqīn) — благочестивые, праведные, осознанные перед Аллахом, остерегающиеся нарушать Его границы.', body: 'Это качество видно в том, как человек выбирает и поступает: он старается не переходить границы Аллаха и удерживается от дурного.' },
      en: { lead: 'مُتَّقِين (muttaqīn) — the pious, the righteous, the God-conscious; people who guard against crossing Allah’s boundaries.', body: 'This quality is visible in how they choose and act: they try not to cross Allah’s boundaries and hold themselves back from wrongdoing.' },
    },
    meaningMap: [
      {
        id: 'component',
        ru: { title: 'Коранический контекст 2:3–5', description: 'Коран сам показывает, что характеризует этих людей в данном отрывке.', items: [
          { term: 'Вера', definition: 'Вера в сокрытое, откровение и Последнюю жизнь.' },
          { term: 'Действие', definition: 'Установление молитвы и расходование из дарованного.' },
          { term: 'Результат', definition: 'Руководство от Господа и успех.' },
        ] },
        en: { title: 'Quranic context 2:3–5', description: 'The Quran itself shows what characterises these people in this passage.', items: [
          { term: 'Belief', definition: 'Belief in the unseen, revelation, and the Hereafter.' },
          { term: 'Action', definition: 'Establishing prayer and spending from what is provided.' },
          { term: 'Outcome', definition: 'Guidance from their Lord and success.' },
        ] },
      },
    ],
    distinction: {
      ru: 'مُتَّقٍ (muttaqin) и تَقِيّ (taqiyy) оба можно перевести как «благочестивый / праведный». В مُتَّقٍ (muttaqin) сильнее чувствуется, что человек проявляет это качество в своих действиях и остерегается нарушать границы. تَقِيّ (taqiyy) сильнее описывает благочестие как уже закрепившуюся черту человека; в классическом источнике это слово считается более сильной похвалой.',
      en: 'مُتَّقٍ (muttaqin) and تَقِيّ (taqiyy) can both be translated as “pious / righteous.” مُتَّقٍ (muttaqin) more strongly suggests that the quality is being shown in what the person does and in avoiding crossed boundaries. تَقِيّ (taqiyy) presents piety more as an established trait of the person; a classical source treats it as the stronger expression of praise.',
    },
    structureSources: ['corpus', 'laneTqy'], meaningSources: ['raghib', 'laneTqy', 'baqarahMuttaqin', 'furuqTaqi'], related: ['ittaqa', 'taqwa'],
  },
  waq: {
    pattern: 'فَاعِل', patternReading: 'fāʿil',
    structure: {
      ru: ['Действительное причастие от глагола وَقَىٰ: называет того, кто защищает. У слабой основы وَاقِي конечная ي в некоторых падежных формах выпадает.', 'Неопределённая форма именительного или родительного падежа — وَاقٍ (wāqin); с артиклем — الْوَاقِي (al-wāqī). Подпись wāq передаёт чтение без падежного окончания.'],
      en: ['An active participle of وَقَىٰ, naming the one who protects. The weak stem وَاقِي loses its final ي in some case forms.', 'The indefinite nominative or genitive is وَاقٍ (wāqin); with the article it is الْوَاقِي (al-wāqī). The label wāq omits the case ending.'],
    },
    meaning: {
      ru: { lead: 'وَاقٍ (wāqin) — защитник; тот, кто защищает или оберегает.', body: 'В фокусе не действие и не средство, а тот, от кого исходит защита.' },
      en: { lead: 'وَاقٍ (wāqin) — a protector or guardian; the one who protects.', body: 'The focus is neither the action nor the protective means, but the agent from whom protection comes.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'وَاقٍ (wāqin) — защитник; وَقَىٰ (waqā) — «защищать»; وِقَاء (wiqāʾ) — средство или покров защиты.',
      en: 'وَاقٍ (wāqin) is the protector; وَقَىٰ (waqā) means “to protect”; وِقَاء (wiqāʾ) is a protective means or covering.',
    },
    structureSources: ['corpus', 'jawhari'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  taqiyy: {
    pattern: 'فَعِيل', patternReading: 'faʿīl',
    structure: {
      ru: ['Прилагательное, обозначающее качество человека. فَعِيل — один из разборов модели, приводимых у Lane; там же обсуждается альтернативное историческое объяснение.', 'Слово близко по употреблению к مُتَّقٍ, но имеет другую форму. Множественное число — أَتْقِيَاء (atqiyāʾ). Удвоенная ي в تَقِيّ относится к строению слова.'],
      en: ['An adjective describing a person’s quality. فَعِيل is one of the pattern analyses recorded by Lane, who also discusses an alternative historical account.', 'Its usage is close to مُتَّقٍ, but its form differs. A plural is أَتْقِيَاء (atqiyāʾ). The doubled ي in تَقِيّ belongs to the word’s formation.'],
    },
    meaning: {
      ru: { lead: 'تَقِيّ (taqiyy) — благочестивый, праведный; человек, у которого تَقْوَىٰ (taqwā) стала устойчивой и выраженной чертой.', body: 'Здесь в фокусе не отдельный акт остережения, а характеристика самого человека. Классический источник по лексическим различиям прямо отмечает у تَقِيّ (taqiyy) оттенок усиления и более сильной похвалы по сравнению с مُتَّقٍ (muttaqin).' },
      en: { lead: 'تَقِيّ (taqiyy) — pious, righteous; a person in whom تَقْوَىٰ (taqwā) has become an established and strongly marked quality.', body: 'The focus is not one act of guarding but the person’s characterization. A classical lexical-differences source explicitly gives تَقِيّ (taqiyy) an intensified, more strongly praiseworthy colouring than مُتَّقٍ (muttaqin).' },
    },
    occurrenceNote: {
      ru: 'Особенность источника: корпус включает сюда تُقَاتِهِ из 3:102:7 и размечает его как существительное во множественном числе. Это отдельная словоформа; счётчик сохраняет именно такую группировку корпуса.',
      en: 'Source distinction: the Corpus includes تُقَاتِهِ at 3:102:7 in this group and tags it as a plural noun. It is a separate surface form, and the count preserves this Corpus grouping.',
    },
    meaningMap: [],
    distinction: {
      ru: 'تَقِيّ (taqiyy) и مُتَّقٍ (muttaqin) оба можно перевести как «благочестивый / праведный». تَقِيّ (taqiyy) сильнее подчёркивает благочестие как закрепившуюся черту человека и считается более сильной похвалой; مُتَّقٍ (muttaqin) сильнее показывает это качество через действия человека.',
      en: 'تَقِيّ (taqiyy) and مُتَّقٍ (muttaqin) can both be translated as “pious / righteous.” تَقِيّ (taqiyy) more strongly presents piety as an established trait and is treated as the stronger praise; مُتَّقٍ (muttaqin) more strongly shows the quality through what the person does.',
    },
    structureSources: ['laneTqy'], meaningSources: ['laneTqy', 'jawhari', 'furuqTaqi'], related: ['taqwa', 'atqa', 'muttaqin'],
  },
  atqa: {
    pattern: 'أَفْعَل', patternReading: 'afʿal',
    structure: {
      ru: ['Сравнительная форма прилагательного: показывает большую степень качества. Традиционный арабский термин — اسم التفضيل.', 'Форма относится к اسم التفضيل. Конечный слабый согласный даёт ى. Конструкция может означать «более…» или «самый…» в зависимости от контекста.'],
      en: ['An elative adjective expressing a greater degree of a quality. The traditional Arabic term is اسم التفضيل.', 'The form belongs to اسم التفضيل. The final weak consonant gives ى. Depending on the construction, it can express “more…” or “most…”.'],
    },
    meaning: {
      ru: { lead: 'أَتْقَى (atqā) — более / наиболее благочестивый; тот, у кого сильнее выражена تَقْوَىٰ (taqwā).', body: 'Это сравнительно-превосходная форма: конструкция показывает, означает ли она «более благочестивый» или «наиболее благочестивый».' },
      en: { lead: 'أَتْقَى (atqā) — more / most pious; having a greater degree of تَقْوَىٰ (taqwā).', body: 'It is an elative form: the construction determines whether it means “more pious” or “most pious.”' },
    },
    meaningMap: [],
    distinction: {
      ru: 'تَقِيّ (taqiyy) просто характеризует человека как благочестивого; أَتْقَى (atqā) сравнивает степень этого качества.',
      en: 'تَقِيّ (taqiyy) simply characterises a person as pious; أَتْقَى (atqā) compares the degree of that quality.',
    },
    structureSources: ['laneTqy', 'corpus'], meaningSources: ['laneTqy'], related: ['taqiyy', 'taqwa'],
  },
  wiqaa: {
    pattern: 'فِعَال', patternReading: 'fiʿāl',
    structure: {
      ru: ['Существительное, обозначающее средство защиты. Оно связано с глаголом وَقَىٰ, поэтому находится с ним на внутренней орбите.', 'На месте конечной корневой ي после долгого ā появляется ء: وِقَاء. Аль-Джаухари также приводит вариант وَقَاء с другой начальной огласовкой.'],
      en: ['A noun naming a means of protection. It is related to وَقَىٰ and therefore shares the inner orbit with it.', 'After long ā, the final root ي appears as ء in وِقَاء. Al-Jawhari also records وَقَاء with a different initial vowel.'],
    },
    meaning: {
      ru: { lead: 'وِقَاء (wiqāʾ) — средство защиты, защитный покров или барьер; например щит.', body: 'В фокусе то, чем защищают: предмет или преграда между защищаемым и вредом.' },
      en: { lead: 'وِقَاء (wiqāʾ) — a means of protection, protective covering, or barrier; for example, a shield.', body: 'The focus is what protection is provided with: an object or barrier between what is protected and the harm.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'وِقَاء (wiqāʾ) — средство защиты; وِقَايَة (wiqāya) — защита как действие или процесс; وَاقٍ (wāqin) — тот, кто защищает.',
      en: 'وِقَاء (wiqāʾ) is the protective means; وِقَايَة (wiqāya) is protection as an action or process; وَاقٍ (wāqin) is the one who protects.',
    },
    structureSources: ['jawhari'], meaningSources: ['jawhari', 'raghib'], related: ['waqa', 'wiqaya', 'waq'],
  },
  wiqaya: {
    pattern: 'فِعَالَة', patternReading: 'fiʿāla',
    structure: {
      ru: ['Существительное действия — масдар от وَقَىٰ. Модель فِعَالَة называет действие защиты.', 'Корневая ي сохраняется перед окончанием ة: وِقَايَة. В словарях эта же форма может называть и то, что служит защитой.'],
      en: ['A verbal noun of وَقَىٰ. The pattern فِعَالَة names the act of protecting.', 'The root ي remains before the ending ة in وِقَايَة. Dictionaries also use the same form for something that provides protection.'],
    },
    meaning: {
      ru: { lead: 'وِقَايَة (wiqāya) — защита, предохранение; само действие или процесс сохранения от вреда.', body: 'Слово называет защиту как процесс, а не обязательно конкретный предмет, которым защищают.' },
      en: { lead: 'وِقَايَة (wiqāya) — protection or safeguarding; the action or process of preserving from harm.', body: 'The word names protection as a process, not necessarily the concrete object used for protection.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'وِقَايَة (wiqāya) — процесс защиты; وَقَىٰ (waqā) — глагол «защищать»; وِقَاء (wiqāʾ) — средство или покров защиты.',
      en: 'وِقَايَة (wiqāya) is the process of protection; وَقَىٰ (waqā) is the verb “to protect”; وِقَاء (wiqāʾ) is a protective means or covering.',
    },
    structureSources: ['jawhari', 'raghib'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  tawaqqa: {
    pattern: 'تَفَعَّلَ', patternReading: 'tafaʿʿala',
    structure: {
      ru: ['Глагол V породы. Модель добавляет начальную ت и удваивает вторую корневую букву — ق. Корневая و остаётся видимой после ت.', 'Настоящее время — يَتَوَقَّى (yatawaqqā). Конечная корневая ي в показанной форме передана через ى.'],
      en: ['A Form V verb. The pattern adds initial ت and doubles the second root letter ق. The root و remains visible after ت.', 'The present form is يَتَوَقَّى (yatawaqqā). The final root ي appears as ى in the displayed form.'],
    },
    meaning: {
      ru: { lead: 'تَوَقَّىٰ (tawaqqā) — беречься, остерегаться, принимать конкретные меры предосторожности.', body: 'Обычно речь о конкретной опасности: человек замечает её и делает что-то, чтобы избежать вреда.' },
      en: { lead: 'تَوَقَّىٰ (tawaqqā) — to guard oneself, beware, or take concrete precautions.', body: 'It usually refers to a specific danger: a person notices it and does something to avoid the harm.' },
    },
    meaningMap: [],
    distinction: {
      ru: 'Оба глагола могут означать «беречься / остерегаться». تَوَقَّىٰ (tawaqqā) чаще относится к конкретной опасности и конкретным мерам, чтобы её избежать. ٱتَّقَىٰ (ittaqā), особенно в Коране, шире: человек бережёт себя от дурного, помня об Аллахе и не переходя Его границы.',
      en: 'Both verbs can mean “to guard oneself / beware.” تَوَقَّىٰ (tawaqqā) more often refers to a specific danger and specific steps taken to avoid it. ٱتَّقَىٰ (ittaqā), especially in the Quran, is broader: a person guards against wrongdoing while remembering Allah and keeping His boundaries.',
    },
    structureSources: ['laneWqy', 'jawhari'], meaningSources: ['laneWqy', 'jawhari', 'lisanWqy'], related: ['waqa', 'ittaqa'],
  },
}


export const LBB_ROOT_CONTENT = {
  ru: {
    lead: 'ل ب ب (l-b-b) — сердцевина, определяющая внутренняя точка.',
    body: 'Фундаментальный механизм корня раскрывается как движение к этой точке: не остановиться на внешнем или промежуточном, дойти до самой сути и удержаться при ней до конца. Поэтому одна и та же семья охватывает буквальную сердцевину, способность доходить до сути в понимании, попадание в определённую точку, а также пребывание при месте или деле без отхода от него.',
  },
  en: {
    lead: 'ل ب ب (l-b-b) — the core, the defining inner point.',
    body: 'The root’s fundamental mechanism unfolds as movement toward that point: not stopping at the outer or intermediate layer, reaching the essence itself, and remaining with it to completion. The same family therefore covers a literal core, the ability to reach the essence in understanding, contact with a precise point, and staying with a place or matter without leaving it.',
  },
  rootNucleus: {
    ru: 'Сердцевина / суть → дойти до неё, не остановившись раньше → удержаться при ней до конца.',
    en: 'Core / essence → reach it without stopping short → remain with it through completion.',
  },
  sources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'raghibLbb', 'lbbCorpus'],
}

export const LBB_DERIVATION_NOTES = {
  lubb: {
    connectionRu: 'Это базовый образ корня: внутренняя сердцевина и суть вещи. От него развивается и интеллектуальная линия — способность доходить до сути.',
    connectionEn: 'This is the root’s static image: the inner core, kernel, and pure or choicest part of a thing. In intellectual usage the same image is applied to the human capacity to reach the essence itself.',
  },
  albab: {
    connectionRu: 'أَلْبَاب — множественное от لُبّ. Физический образ «сердцевины» здесь переносится на разумение: способность различать суть за внешним.',
    connectionEn: 'أَلْبَاب is the plural of لُبّ in the intellectual line. Here the core becomes an image of understanding that passes through outward layers and admixtures, discerns the defining essence, and does not leave it.',
  },
  labib: {
    connectionRu: 'لَبِيب образовано от لُبّ и называет человека, у которого это качество есть: способность видеть суть за внешним.',
    connectionEn: 'لَبِيب is a person who possesses لُبّ. It is therefore more than a generic label “intelligent”: it characterises someone able to pass beyond the outward layer and reach the essence.',
  },
  labba: {
    connectionRu: 'Это базовая глагольная ветвь корня. В её словарных значениях повторяется идея достижения или удержания определённой точки.',
    connectionEn: 'Form I shows the root’s basic mechanism in action. Its attested usages can reach the kernel of an almond, the point called لَبَّة, a position directly opposite, or remaining at a place. The shared line is reaching the defining point rather than stopping short.',
    formRu: 'I форма не добавляет отдельного приставочного механизма: здесь непосредственно проявляется действие самого корня.',
    formEn: 'Form I adds no separate prefixed mechanism here: it directly realises the action of the root itself.',
  },
  labbaba: {
    connectionRu: 'Связь идёт по двум засвидетельствованным линиям корня: через لُبّ — внутреннюю сердцевину зерна, и через لَبَب / لَبَّة — область верхней груди.',
    connectionEn: 'In Form II the root mechanism is made operative on an object: grain develops a لُبّ, while in the bodily line the action is directed to clothing at the لَبَب / لَبَّة area.',
    formRu: 'Во II форме действие направляется на объект: у зерна формируется сердцевина, а в телесной линии действие связано с областью груди.',
    formEn: 'Form II فَعَّلَ makes the root meaning operative in an object here: forming a core or acting through the defining chest point.',
  },
  alabba: {
    connectionRu: 'Здесь корневая идея проявляется как достигнутое состояние: появилась внутренняя часть или субъект закрепился при месте / деле.',
    connectionEn: 'This form repeatedly presents the root as an achieved state: grain develops an inner part; at a place or matter the subject remains and does not leave. It is not merely neutral “being somewhere” but staying with the reached point.',
    formRu: 'IV форма показывает вхождение в состояние, где корневой смысл уже проявился как результат.',
    formEn: 'In the attested senses of this family, Form IV أَفْعَلَ presents entry into a state in which the root’s result has been reached.',
  },
  talabbaba: {
    connectionRu: 'Связь с корнем проходит через телесную линию لَبَب / لَبَّة — область груди, где одежда собирается и закрепляется.',
    connectionEn: 'A person gathers the clothing on their own body at the chest, girds themself, and prepares. The subject thus brings themself into a gathered and secured state.',
    formRu: 'V форма переносит действие II формы на самого человека: не собрать другого, а собраться самому.',
    formEn: 'Form V تَفَعَّلَ turns the Form II action onto the subject: not “gather another” but “gather oneself.”',
  },
  istalabba: {
    connectionRu: 'Объект проверки здесь — لُبّ человека, его способность понимать и доходить до сути.',
    connectionEn: 'Here the object of examination is a person’s لُبّ: how far they truly possess understanding capable of reaching the essence.',
    formRu: 'X форма здесь даёт смысл проверки: выявить и испытать لُبّ человека.',
    formEn: 'Form X اِسْتَفْعَلَ here seeks to reveal or test what the root expresses: to examine a person’s لُبّ.',
  },
  labab: {
    connectionRu: 'Связь прямая: لَبَب — и название верхней части груди, и название ремня, который проходит по этой области.',
    connectionEn: 'لَبَب names the upper chest area and a breast-girth. The strap is named through the chest area where it lies. Its function of keeping the saddle from shifting also resonates with the root’s holding mechanism, but is not presented here as the historically proven reason for the name.',
  },
  labbaChest: {
    connectionRu: 'Это телесная ветвь корня: لَبَّة называет конкретную точку верхней груди между ключицами.',
    connectionEn: 'لَبَّة is a specific point of the upper chest between the collarbones. In the verbal line لَبَّهُ the action is directed to that precise point, not merely “somewhere on the chest.”',
  },
  talbib: {
    connectionRu: 'Слово связано с لَبَب / لَبَّة через область груди, где находится соответствующая часть одежды.',
    connectionEn: 'تَلْبِيب concerns clothing specifically at the لَبَب area: gathering it there or seizing a person by that part of the garment. Its connection to the root runs through the defining chest point.',
    formRu: 'تَلْبِيب — масдар II формы لَبَّبَ, то есть название самого действия.',
    formEn: 'تَلْبِيب is the verbal noun of Form II لَبَّبَ, naming the action itself.',
  },
  libaba: {
    connectionRu: 'Связь идёт через телесную ветвь لَبَب / لَبَّة: эта одежда располагается и собирается в области верхней груди и плеч.',
    connectionEn: 'The garment is named through the area where it is gathered and worn: the upper chest and shoulders. The connection here runs through the physical لَبَب / لَبَّة.',
  },
  labiba: {
    connectionRu: 'Это отдельное засвидетельствованное слово из того же словарного гнезда. Lane сопоставляет его с بَقِيرَة.',
    connectionEn: 'لَبِيبَة is an independently attested name for a particular garment; Lane compares it with بَقِيرَة. The interface keeps it as a distinct lexical sense rather than forcing it into the “understanding” or “core” branch.',
  },
  malbub: {
    connectionRu: 'Связь идёт через существительное لَبَب — нагрудный ремень.',
    connectionEn: 'The lexical meaning connects directly to لَبَب as the breast-girth: مَلْبُوب is an animal on which that strap is fitted.',
  },
  mulabb: {
    connectionRu: 'Связь идёт через существительное لَبَب — нагрудный ремень.',
    connectionEn: 'The connection is transparent through the object لَبَب: the word describes an animal fitted with this breast-girth.',
  },
  mulbab: {
    connectionRu: 'Связь идёт через существительное لَبَب — нагрудный ремень.',
    connectionEn: 'The connection is transparent through the object لَبَب: the word describes an animal fitted with this breast-girth.',
  },
  ulbub: {
    connectionRu: 'Это буквальная линия لُبّ: внутренняя сердцевина или ядро.',
    connectionEn: 'The edible inner part of a fruit or stone directly preserves the literal image of لُبّ — the inner kernel.',
  },
  labbNoun: {
    connectionRu: 'Это глагольная ветвь корня со значением удерживаться при достигнутом месте или деле.',
    connectionEn: 'In the staying-line the root expresses more than duration: لزوم, keeping to something and not leaving it. It is the same completed movement: reaching and remaining with what has been reached.',
  },
  lubab: {
    connectionRu: 'لُبَاب продолжает базовый образ لُبّ: внутреннюю, отборную и наиболее существенную часть.',
    connectionEn: 'لُبَاب sharpens the static core-image: the pure, choicest, most essential part of a thing.',
  },
  lababa: {
    connectionRu: 'В линии разумения لَبَابَة связано с لُبّ и لَبِيب — с обладанием разумением. Значение «небольшое пастбище» относится к отдельному словарному употреблению.',
    connectionEn: 'لَبَابَة is attested as a verbal noun in the لَبَّ / لَبِيب line: becoming possessed of لُبّ, i.e. understanding. A homonymous lexical sense connected with a small amount of pasture is shown separately and not merged with this line.',
  },
  lababPasture: {
    connectionRu: 'Это отдельное словарное употребление формы لَبَاب; его не смешиваем с لُبَاب «чистая, отборная часть».',
    connectionEn: 'In this usage لَبَاب means a small amount of pasture or herbage. It is an attested separate lexical sense and does not need to be artificially derived from the intellectual line of لُبّ.',
  },
}

export const LBB_WORD_CONTENT = {
  albab: {
    pattern: 'أَفْعَال', patternReading: 'afʿāl',
    structure: {
      ru: [
        'أَلْبَاب (albāb) — ломаное множественное число от لُبّ (lubb).',
        'Модель множественного числа — أَفْعَال (afʿāl). Корневые буквы остаются ل ب ب; начальная أ и внутренний ا принадлежат модели множественного числа.',
      ],
      en: [
        'أَلْبَاب (albāb) is the broken plural of لُبّ (lubb).',
        'Its plural pattern is أَفْعَال (afʿāl). The root letters remain ل ب ب; initial أ and internal ا belong to the plural pattern.',
      ],
    },
    meaning: {
      ru: {
        lead: 'أَلْبَاب (albāb) — разумение, которое доходит до сути и не остаётся на внешнем.',
        body: 'Единственное لُبّ буквально называет сердцевину, ядро и чистую или отборную часть. В человеческой линии этот образ становится внутренней способностью пройти внешнее, частное или отвлекающее, распознать определяющую суть и удержать её так, чтобы понимание влияло на выбор.',
      },
      en: {
        lead: 'أَلْبَاب (albāb) — understanding that reaches the essence rather than remaining at the surface.',
        body: 'The singular لُبّ literally names a core, kernel, and pure or choicest part. In the human line this image becomes an inward capacity to pass through the outward, partial, or distracting layer, recognise the defining essence, and retain it so that understanding shapes choice.',
      },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Фундаментальный механизм', description: 'Кораническое значение сохраняет физический образ сердцевины.', items: [
          { term: 'Сердцевина — لُبّ', definition: 'Не внешний слой, а внутренняя, чистая и определяющая часть вещи.', connector: 'пройти внешнее' },
          { term: 'Дойти до сути', definition: 'Не остановиться на первом впечатлении, отдельном фрагменте или оболочке, а распознать то, что определяет вещь.', connector: 'не отойти от найденного' },
          { term: 'Удержаться при сути', definition: 'Сохранить распознанное как ориентир для последующего понимания и выбора.' },
        ] },
        en: { title: 'Fundamental mechanism', description: 'The Quranic sense preserves the physical image of the core.', items: [
          { term: 'Core — لُبّ', definition: 'Not the outer layer but the inner, pure, defining part of a thing.', connector: 'pass beyond the outward layer' },
          { term: 'Reach the essence', definition: 'Do not stop at first impression, a partial fragment, or the shell; recognise what defines the thing.', connector: 'do not leave what was found' },
          { term: 'Remain with the essence', definition: 'Keep what was recognised as an orientation for later understanding and choice.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Кораническая проверка', description: 'Все 16 коранических употреблений корня представлены формой أَلْبَاب; контексты повторяют один и тот же тип работы с сутью.', items: [
          { term: 'Внешнее → существенное', definition: '5:100 противопоставляет впечатляющее количество الخبيث его действительному качеству; 2:179 требует увидеть жизнь внутри механизма القصاص.' },
          { term: 'Событие → урок', definition: '12:111 ведёт от рассказа о событиях к عِبْرَة; 39:21 — от наблюдаемого жизненного цикла растения к ذِكْرَى.' },
          { term: 'Текст → внутренний смысл', definition: '38:29 связывает تدبّر аятов с تذكّر أولو الألباب; 3:7 не позволяет неоднозначной части оторваться от целого.' },
          { term: 'Различение → следование', definition: '39:18 описывает тех, кто слушает сказанное, распознаёт أحسنه и затем следует ему.' },
        ] },
        en: { title: 'Quranic validation', description: 'All 16 Quranic occurrences of the root are represented by أَلْبَاب; their contexts repeatedly show the same kind of movement toward essence.', items: [
          { term: 'Outward appearance → what matters', definition: '5:100 contrasts the impressive quantity of الخبيث with its actual quality; 2:179 requires seeing life within the mechanism of القصاص.' },
          { term: 'Event → lesson', definition: '12:111 moves from narrated events to عِبْرَة; 39:21 from the visible life-cycle of a plant to ذِكْرَى.' },
          { term: 'Text → inward meaning', definition: '38:29 links تدبّر of the verses with تذكّر by أولو الألباب; 3:7 prevents an ambiguous part from being detached from the whole.' },
          { term: 'Discernment → following', definition: '39:18 describes those who listen, recognise أحسنه, and then follow it.' },
        ] },
      },
    ],
    distinction: {
      ru: 'Ар-Рагиб формулирует различие так: каждый لُبّ является عقل, но не каждый عقل является لُبّ; لُبّ — разумение, очищенное от примесей. Поэтому «разум» слишком широко, а «глубокое разумение» ближе, если помнить сам механизм: пройти к сути и удержаться при ней.',
      en: 'Al-Raghib states the distinction this way: every لُبّ is عقل, but not every عقل is لُبّ; لُبّ is understanding purified from admixtures. “Intellect” is therefore too broad, while “deep understanding” is closer when the mechanism is retained: reaching the essence and remaining with it.',
    },
    structureSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'lbbCorpus'],
    meaningSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'raghibLbb', 'lbbCorpus'],
    related: ['lubb', 'labib'],
    occurrenceNote: {
      ru: 'Quranic Arabic Corpus отмечает 16 вхождений корня ل ب ب; все они представлены существительным أَلْبَاب.',
      en: 'The Quranic Arabic Corpus records 16 occurrences of the root ل ب ب, all represented by the noun أَلْبَاب.',
    },
  },

  lubb: {
    pattern: 'فُعْل', patternReading: 'fuʿl',
    structure: {
      ru: ['لُبّ (lubb) — словарная форма единственного числа, от которой образовано множественное أَلْبَاب (albāb).'],
      en: ['لُبّ (lubb) is the singular dictionary form whose plural is أَلْبَاب (albāb).'],
    },
    meaning: {
      ru: { lead: 'Сердцевина, ядро, чистая или отборная часть.', body: 'Это исходный физический образ семьи. Применительно к человеку он становится способностью не останавливаться на оболочке, а доходить до определяющей сути и держаться её.' },
      en: { lead: 'Core, kernel, pure or choicest part.', body: 'This is the family’s primary physical image. Applied to a person, it becomes the capacity not to stop at the shell but to reach the defining essence and remain with it.' },
    },
    meaningMap: [],
    structureSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    meaningSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'raghibLbb'],
    related: ['albab', 'labib'],
  },

  labib: {
    pattern: 'فَعِيل', patternReading: 'faʿīl',
    structure: {
      ru: ['لَبِيب (labīb) — прилагательное качества от корневой семьи ل ب ب: человек, обладающий لُبّ.'],
      en: ['لَبِيب (labīb) is a quality adjective from the ل ب ب family: a person possessing لُبّ.'],
    },
    meaning: {
      ru: { lead: 'Проницательный, обладающий لُبّ.', body: 'لَبِيب характеризует человека через фундаментальный образ корня: он способен пройти внешнее, увидеть определяющую суть и не потерять её за второстепенным.' },
      en: { lead: 'Discerning, possessing لُبّ.', body: 'لَبِيب characterises a person through the root’s fundamental image: able to pass beyond the outward layer, see the defining essence, and not lose it behind what is secondary.' },
    },
    meaningMap: [],
    structureSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    meaningSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    related: ['lubb', 'albab'],
  },
}
