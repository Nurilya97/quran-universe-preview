import { WQY_PUBLIC_MODEL } from './canonicalWqy.js'

// Short editorial explanations based only on the public sources linked below.
// This is a lexical guide, not a translation of Quranic verses or a private archive.
export const CONTENT_SOURCES = {
  corpus: { url: 'https://corpus.quran.com/qurandictionary.jsp?q=wqy', ru: 'Коранический арабский корпус · University of Leeds', en: 'Quranic Arabic Corpus · University of Leeds' },
  raghib: { url: 'https://arabiclexicon.hawramani.com/?p=9899#3cb2a3', ru: 'Ар-Рагиб · «Аль-Муфрадат», وقى', en: 'Al-Raghib · Al-Mufradat, وقى' },
  jawhari: { url: 'https://arabiclexicon.hawramani.com/?p=9899#feef21', ru: 'Аль-Джаухари · «Ас-Сихах», وقى', en: 'Al-Jawhari · Al-Sihah, وقى' },
  laneWqy: { url: 'https://arabiclexicon.hawramani.com/?p=9899#0d72b9', ru: 'Lane · Arabic-English Lexicon, وقى', en: 'Lane · Arabic-English Lexicon, وقى' },
  laneTqy: { url: 'https://arabiclexicon.hawramani.com/?p=17705#09c7e5', ru: 'Lane · Arabic-English Lexicon, تقى', en: 'Lane · Arabic-English Lexicon, تقى' },
  ibnFaris: { url: 'https://arabiclexicon.hawramani.com/?p=15912#565c1b', ru: 'Ибн Фарис · «Мака̄йӣс аль-луга», وقى', en: 'Ibn Faris · Maqayis al-Lugha, وقى' },
  tuqatPattern: { url: 'https://www.greattafsirs.com/Tafsir_Library.aspx?AyahNo=28&MadhabNo=1&SoraNo=3&TafsirNo=5', ru: 'Аль-Куртуби · языковой разбор تُقَاة, 3:28', en: 'Al-Qurtubi · linguistic analysis of تُقَاة, 3:28' },
  tuqatCorpus: { url: 'https://corpus.quran.com/wordmorphology.jsp?location=(3:102:7)', ru: 'Разметка слова تُقَاتِهِ · 3:102:7', en: 'Annotation of تُقَاتِهِ · 3:102:7' },
  baqarahMuttaqin: { url: 'https://quran.com/2/2-5', ru: 'Аль-Бакара 2:2–5 · описание المُتَّقِينَ', en: 'Al-Baqarah 2:2–5 · description of المُتَّقِينَ' },
}

export const ROOT_CONTENT = {
  ru: {
    lead: WQY_PUBLIC_MODEL.rootNucleus.ru,
    body: 'Ибн Фарис связывает корень с отведением одного от другого посредством чего-то третьего. Ар-Рагиб объясняет وِقَايَة как сохранение чего-либо от того, что причиняет ему вред. Отсюда связаны действие защиты, средство защиты и оберегание себя.',
  },
  en: {
    lead: WQY_PUBLIC_MODEL.rootNucleus.en,
    body: 'Ibn Faris connects the root with keeping one thing away from another by means of something else. Al-Raghib explains وِقَايَة as preserving something from what harms it. This connects the act of protecting, a means of protection, and guarding oneself.',
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
      ru: { lead: 'Защищать, оберегать кого-либо или что-либо.', body: 'Действие направлено на сохранение того, кого защищают, от вреда. Что именно оберегают и от чего — определяется дополнениями и контекстом.' },
      en: { lead: 'To protect or preserve someone or something.', body: 'The action keeps its object safe from harm. The surrounding words identify who or what is protected and what they are protected from.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'وَقَىٰ (waqā) называет само действие защиты.', items: [
          { term: 'Защищать / оберегать', definition: 'Создавать защиту между тем, что оберегают, и тем, что может причинить ему вред.' },
        ] },
        en: { title: 'Mechanism', description: 'وَقَىٰ (waqā) names the act of protection itself.', items: [
          { term: 'To protect / guard', definition: 'To create protection between what is guarded and what could cause it harm.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Составные части механизма', description: 'Контекст показывает, кто защищает, что защищают и от чего.', items: [
          { term: 'Защищаемое', definition: 'Человек или объект, который сохраняют от вреда.' },
          { term: 'Угроза или вред', definition: 'То, от чего направлено действие защиты; конкретное содержание определяется контекстом.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'Context identifies who protects, what is protected, and what it is protected from.', items: [
          { term: 'The protected object', definition: 'The person or thing being kept safe from harm.' },
          { term: 'Threat or harm', definition: 'What the protective action is directed against; its specific content comes from context.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Результат действия وَقَىٰ (waqā) — сохранение защищаемого от вреда.', items: [
          { term: 'Сохранение от вреда', definition: 'Вред не достигает того, что находится под защитой.' },
        ] },
        en: { title: 'Outcomes', description: 'The outcome of وَقَىٰ (waqā) is preservation of the protected object from harm.', items: [
          { term: 'Preservation from harm', definition: 'Harm does not reach what is being protected.' },
        ] },
      },
    ],
    structureSources: ['jawhari', 'corpus'], meaningSources: ['raghib', 'laneWqy'], related: ['wiqaya', 'wiqaa', 'waq'],
  },
  ittaqa: {
    pattern: 'اِفْتَعَلَ', patternReading: 'iftaʿala',
    structure: {
      ru: ['Глагол VIII породы от و ق ي. При образовании этой формы начальная корневая و изменяется и сливается с ت модели: поэтому в ٱتَّقَىٰ видна удвоенная ت.', 'Настоящее время — يَتَّقِي (yattaqī). Регулярный масдар, то есть существительное действия, — اِتِّقَاء (ittiqāʾ). تَقْوَى — связанное существительное со своей моделью.'],
      en: ['A Form VIII verb from و ق ي. The first root letter و changes and assimilates with the pattern’s ت, producing the doubled ت in ٱتَّقَىٰ.', 'The present form is يَتَّقِي (yattaqī). The regular verbal noun is اِتِّقَاء (ittiqāʾ). تَقْوَى is a related noun with its own pattern.'],
    },
    meaning: {
      ru: { lead: 'Занимать активную защитную позицию.', body: WQY_PUBLIC_MODEL.operativeMechanism.ru + ' ' + WQY_PUBLIC_MODEL.roleSafeguards.directObject.ru },
      en: { lead: 'To take an active, protection-oriented stance.', body: WQY_PUBLIC_MODEL.operativeMechanism.en + ' ' + WQY_PUBLIC_MODEL.roleSafeguards.directObject.en },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'ٱتَّقَىٰ (ittaqā) переносит защитное действие на самого субъекта.', items: [
          { term: 'Защитная позиция', definition: 'Человек сам занимает позицию, которая помогает ему уберечь себя от того, что определяется контекстом.' },
          { term: 'Остережение', definition: 'Распознать то, от чего следует себя уберечь, и не приближаться к этому.' },
        ] },
        en: { title: 'Mechanism', description: 'ٱتَّقَىٰ (ittaqā) turns the protective action toward the subject themself.', items: [
          { term: 'Protective stance', definition: 'The person takes a position that helps guard them from what the context identifies.' },
          { term: 'Caution', definition: 'To recognise what should be guarded against and avoid approaching it.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Составные части механизма', description: 'Для защитного выбора нужны распознавание границы и действие.', items: [
          { term: 'Внимательность', definition: 'Замечать, где находится граница, риск или возможный вред.' },
          { term: 'Саморегуляция', definition: 'Соотносить своё действие с распознанной границей и удерживать себя от её нарушения.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'Protective choice requires recognising a boundary and acting on it.', items: [
          { term: 'Attentiveness', definition: 'Noticing where a boundary, risk, or possible harm lies.' },
          { term: 'Self-regulation', definition: 'Relating one’s action to the recognised boundary and restraining oneself from crossing it.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Защитная позиция направлена на то, чтобы человек не оказался в том, от чего он себя оберегает.', items: [
          { term: 'Оберегание себя', definition: 'Человек удерживается от действия или положения, которое несёт вред или нарушение.' },
        ] },
        en: { title: 'Outcomes', description: 'The protective stance aims to keep the person from what they are guarding against.', items: [
          { term: 'Self-protection', definition: 'The person is kept from an action or condition that brings harm or transgression.' },
        ] },
      },
    ],
    structureSources: ['jawhari', 'laneTqy'], meaningSources: ['raghib', 'laneWqy'], related: ['taqwa', 'muttaqin', 'tuqat'],
  },
  taqwa: {
    pattern: 'فَعْلَى', patternReading: 'faʿlā',
    structure: {
      ru: ['Существительное, называющее качество или состояние. Оно связано с ٱتَّقَىٰ, но само не является глаголом VIII породы.', 'Здесь показан распространённый разбор по модели فَعْلَى. Корневая و соответствует начальной ت; изменение конечной ي участвует в образовании сочетания ـوَى. Поэтому корень остаётся و ق ي, хотя в слове видна ت.', 'Словари приводят и другие объяснения исторического образования. Орбита VIII обозначает словообразовательную семью, а не номер породы существительного.'],
      en: ['A noun naming a quality or state. It is related to ٱتَّقَىٰ, but is not itself a Form VIII verb.', 'The common analysis shown here uses فَعْلَى. The initial ت corresponds to the root’s و; a change involving the final ي contributes to ـوَى. The root therefore remains و ق ي despite the visible ت.', 'Dictionaries also record other accounts of its historical formation. Orbit VIII represents the derivational family, not a verb-form number assigned to the noun.'],
    },
    meaning: {
      ru: { lead: 'تَقْوَىٰ (taqwā) — целостное состояние осознанности перед Всевышним, основанное на вере и доверии Ему, осознании сокрытой реальности и Последней жизни.', body: 'Корень و ق ي сохраняет направление защиты и оберегания, а связь с ٱتَّقَىٰ (ittaqā) показывает активную позицию человека. Человек помнит о Всевышнем, воспринимает эту жизнь в связи с тем, что будет после неё, держит в сознании Его границы и делает выбор, который оберегает его. Остережение греха и наказания — часть защитного механизма. Более широкий уровень تَقْوَىٰ (taqwā) — сама осознанность перед Всевышним, из которой рождаются внимание, выбор и остережение.' },
      en: { lead: 'تَقْوَىٰ (taqwā) is a holistic state of awareness before the Most High, grounded in faith and trust in Him, awareness of the unseen, and certainty in the Hereafter.', body: 'The root و ق ي retains the direction of protection and guarding, while its link to ٱتَّقَىٰ (ittaqā) shows an active stance taken by the person. A person keeps the Most High in mind, understands this life in relation to what comes after it, remains attentive to His boundaries, and makes choices that guard them. Guarding against sin and punishment is one part of this protective mechanism; the broader level of تَقْوَىٰ (taqwā) is the state of awareness before the Most High from which attention, choice, and caution arise.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'В основе — осознанная ориентированность перед Всевышним, которая приводит к защитному выбору.', items: [
          { term: 'Осознанность перед Всевышним', definition: 'Помнить о Нём, верить и доверять Ему, воспринимать жизнь в свете Его руководства и того, что существует за пределами непосредственного восприятия.' },
          { term: 'Оберегание себя', definition: 'Из этой осознанности человек внимательно относится к установленным границам и выбирает то, что помогает ему не приблизиться к вреду и нарушению.' },
        ] },
        en: { title: 'Mechanism', description: 'At the centre is conscious orientation before the Most High, which leads to protective choices.', items: [
          { term: 'Awareness before the Most High', definition: 'Keeping Him in mind, believing in and trusting Him, and understanding life through His guidance and realities beyond immediate perception.' },
          { term: 'Self-guarding', definition: 'From this awareness, a person pays attention to the boundaries that have been set and chooses what keeps them away from harm and transgression.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Составные части механизма', description: 'Коран раскрывает это состояние через убеждения, которые формируют восприятие и выбор человека.', items: [
          { term: 'Вера в сокрытое — الغيب (al-ghayb)', definition: 'Признание реальности, которая не воспринимается непосредственно чувствами и известна через откровение: Всевышнего, ангелов, Рая, Ада и других сокрытых вещей.' },
          { term: 'Убеждённость в Последней жизни — الآخرة (al-ākhirah)', definition: 'Осознание, что земная жизнь не является конечной и что за выбором человека последуют расчёт и воздаяние.' },
          { term: 'Вера в откровение', definition: 'Доверие тому, что Всевышний сообщает человеку через Своё руководство, и принятие этого руководства как основы для выбора.' },
          { term: 'Внимание к границам дозволенного', definition: 'Понимание того, где проходят установленные Всевышним границы, и сознательное стремление не выходить за них.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'The Quran unfolds this state through beliefs that shape a person’s perception and choices.', items: [
          { term: 'Belief in the unseen — الغيب (al-ghayb)', definition: 'Acknowledging realities not directly perceived by the senses and known through revelation: the Most High, angels, Paradise, Hell, and other unseen realities.' },
          { term: 'Certainty in the Hereafter — الآخرة (al-ākhirah)', definition: 'Awareness that earthly life is not the end and that a person’s choices are followed by reckoning and recompense.' },
          { term: 'Faith in revelation', definition: 'Trusting what the Most High communicates through revelation and accepting that guidance as a basis for one’s choices.' },
          { term: 'Attention to the permitted boundaries', definition: 'Recognising the boundaries set by the Most High and consciously seeking not to cross them.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Вера и осознанность становятся видимыми в действиях человека.', items: [
          { term: 'Молитва', definition: 'Регулярное обращение к Всевышнему и поддержание связи с Ним через установленную молитву.' },
          { term: 'Расходование из дарованного', definition: 'Готовность отдавать из того, чем Всевышний наделил человека, а не замыкать полученное только на себе.' },
          { term: 'Праведность', definition: 'Более широкая характеристика поступков, которые соответствуют руководству Всевышнего. Это проявление تَقْوَىٰ (taqwā), а не её полное определение.' },
        ] },
        en: { title: 'Manifestations', description: 'Faith and awareness become visible in a person’s actions.', items: [
          { term: 'Prayer', definition: 'Regularly turning to the Most High and maintaining the relationship through established prayer.' },
          { term: 'Spending from what has been provided', definition: 'Being willing to give from what the Most High has provided rather than keeping it entirely for oneself.' },
          { term: 'Righteousness', definition: 'A broader description of conduct aligned with divine guidance. It is a manifestation of تَقْوَىٰ (taqwā), not its complete definition.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'В 2:5 после описания المُتَّقِينَ названы результаты этой ориентированности.', items: [
          { term: 'Руководство от Господа', definition: 'Человек находится на пути руководства, которое помогает ему видеть направление и делать дальнейший выбор.' },
          { term: 'Успех — الفلاح (al-falāḥ)', definition: 'Итоговая состоятельность и благой исход, к которому приводит следование руководству Всевышнего.' },
          { term: 'Оберегание', definition: 'Защитный смысл корня проявляется в том, что такая осознанность удерживает человека от того, что ведёт к вреду.' },
        ] },
        en: { title: 'Outcomes', description: 'After describing المُتَّقِينَ, 2:5 names the outcomes of this orientation.', items: [
          { term: 'Guidance from their Lord', definition: 'The person remains upon guidance that helps them recognise direction and make further choices.' },
          { term: 'Success — الفلاح (al-falāḥ)', definition: 'A good and ultimately successful outcome reached through following the guidance of the Most High.' },
          { term: 'Protection', definition: 'The protective sense of the root appears in how this awareness restrains a person from what leads to harm.' },
        ] },
      },
    ],
    structureSources: ['laneTqy', 'jawhari'], meaningSources: ['raghib', 'laneTqy', 'baqarahMuttaqin'], related: ['ittaqa', 'taqiyy', 'muttaqin'],
  },
  tuqat: {
    pattern: 'فُعَلَة', patternReading: 'fuʿala',
    structure: {
      ru: ['Существительное действия — масдар, связанный с ٱتَّقَىٰ. В разборе 3:28 корпус отмечает единственное число, женский род и винительный падеж: تُقَاةً.', 'Модель فُعَلَة приведена по языковому разбору аль-Куртуби: начальная و заменяется на ت, а конечная корневая ي — на долгий ā. В словарях обсуждаются и другие разборы формы.'],
      en: ['A verbal noun related to ٱتَّقَىٰ. At 3:28, the Corpus annotates تُقَاةً as feminine singular and accusative.', 'The pattern فُعَلَة follows Al-Qurtubi’s linguistic analysis: initial و becomes ت, and the final root ي becomes long ā. Dictionaries also discuss other analyses of this form.'],
    },
    meaning: {
      ru: { lead: 'Остережение, принятие мер защиты.', body: 'Слово называет само действие или состояние предосторожности. Аль-Джаухари связывает его с تَقِيَّة и глаголом ٱتَّقَىٰ. Значение конкретного употребления следует рассматривать в его контексте.' },
      en: { lead: 'Taking precautions or guarding oneself.', body: 'The word names the act or state of precaution. Al-Jawhari links it with تَقِيَّة and ٱتَّقَىٰ. Each occurrence should be understood in its own context.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'تُقَاة (tuqāt) называет само остережение или принятие защитной меры.', items: [
          { term: 'Предосторожность', definition: 'Действие, предпринимаемое заранее, чтобы не допустить вреда или опасного последствия.' },
        ] },
        en: { title: 'Mechanism', description: 'تُقَاة (tuqāt) names the act of caution or taking a protective measure.', items: [
          { term: 'Precaution', definition: 'An action taken in advance to prevent harm or a dangerous consequence.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'В конкретном контексте остережение выражается в определённой защитной мере.', items: [
          { term: 'Защитная мера', definition: 'Конкретное действие, через которое человек старается уберечь себя в данной ситуации.' },
        ] },
        en: { title: 'Manifestations', description: 'In context, caution takes the form of a particular protective measure.', items: [
          { term: 'Protective measure', definition: 'A concrete action through which a person seeks to guard themselves in a given situation.' },
        ] },
      },
    ],
    structureSources: ['tuqatPattern', 'corpus'], meaningSources: ['jawhari', 'laneTqy'], related: ['ittaqa', 'taqwa'],
  },
  muttaqin: {
    pattern: 'مُفْتَعِل', patternReading: 'muftaʿil',
    structure: {
      ru: ['Действительное причастие VIII породы: называет того, кто совершает действие ٱتَّقَىٰ. Модель дана для единственного числа; в центре показана форма множественного числа.', 'Единственное число — مُتَّقٍ (muttaqin). Множественное — مُتَّقُونَ (muttaqūna) в именительном и مُتَّقِينَ (muttaqīna) в винительном или родительном падеже. Долгое ī отличает показанную форму множественного числа.'],
      en: ['An active participle of Form VIII, naming someone who performs ٱتَّقَىٰ. The pattern is singular; the displayed word is plural.', 'The singular is مُتَّقٍ (muttaqin). The plural is مُتَّقُونَ (muttaqūna) in the nominative and مُتَّقِينَ (muttaqīna) in the accusative or genitive. Long ī distinguishes the displayed plural form.'],
    },
    meaning: {
      ru: { lead: 'مُتَّقِينَ (muttaqīn) — люди, для которых تَقْوَىٰ (taqwā) стала устойчивым состоянием осознанности перед Всевышним и основой их выбора.', body: 'В начале Аль-Бакара Коран сам раскрывает это состояние: они верят в сокрытое, устанавливают молитву, расходуют из дарованного, верят в откровение и убеждены в Последней жизни. Поэтому مُتَّقِينَ (muttaqīn) нельзя свести только к «боящимся» или «остерегающимся»: это люди, чья вера формирует внимательность, доверие, поступки и защитную направленность.' },
      en: { lead: 'مُتَّقِينَ (muttaqīn) are people for whom تَقْوَىٰ (taqwā) has become an enduring state of awareness before the Most High and a basis for their choices.', body: 'At the opening of Al-Baqarah, the Quran itself unfolds this state: they believe in the unseen, establish prayer, spend from what they have been provided, believe in revelation, and are certain of the Hereafter. مُتَّقِينَ (muttaqīn) therefore cannot be reduced to merely “those who fear” or “those who are cautious”: their faith shapes awareness, trust, conduct, and a protective orientation.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'مُتَّقِينَ (muttaqīn) описаны через устойчивое состояние веры, осознанности и защитного выбора.', items: [
          { term: 'Осознанные перед Всевышним', definition: 'Люди, которые живут с пониманием присутствия и руководства Всевышнего и соотносят с этим свои решения.' },
          { term: 'Оберегающие себя', definition: 'Их осознанность приводит к внимательности к границам и к выбору, который удерживает от вреда и нарушения.' },
        ] },
        en: { title: 'Mechanism', description: 'مُتَّقِينَ (muttaqīn) are described through an enduring state of faith, awareness, and protective choice.', items: [
          { term: 'Aware before the Most High', definition: 'People who live with awareness of the presence and guidance of the Most High and relate their decisions to that reality.' },
          { term: 'Those who guard themselves', definition: 'Their awareness leads to attention to boundaries and choices that keep them from harm and transgression.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Составные части механизма', description: 'В 2:3–4 Коран раскрывает внутренние убеждения, на которых строится это состояние.', items: [
          { term: 'Вера в сокрытое — الغيب (al-ghayb)', definition: 'Признание Всевышнего и других сокрытых реалий, известных через откровение: ангелов, Рая, Ада и того, что находится за пределами непосредственного восприятия.' },
          { term: 'Вера в откровение', definition: 'Принятие того, что ниспослано Посланнику ﷺ и было ниспослано прежде, как истинного руководства от Всевышнего.' },
          { term: 'Убеждённость в Последней жизни — الآخرة (al-ākhirah)', definition: 'Глубокая уверенность, что после этой жизни есть продолжение, расчёт и воздаяние; поэтому земной выбор имеет последствия.' },
          { term: 'Доверие Всевышнему', definition: 'Вера в Его руководство формирует готовность следовать установленным Им границам даже тогда, когда человек не видит всей картины.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'In 2:3–4, the Quran unfolds the inner convictions on which this state is built.', items: [
          { term: 'Belief in the unseen — الغيب (al-ghayb)', definition: 'Acknowledging the Most High and other unseen realities known through revelation: angels, Paradise, Hell, and what lies beyond immediate perception.' },
          { term: 'Faith in revelation', definition: 'Accepting what was revealed to the Messenger ﷺ and what was revealed before as true guidance from the Most High.' },
          { term: 'Certainty in the Hereafter — الآخرة (al-ākhirah)', definition: 'Deep certainty that life continues beyond this world and includes reckoning and recompense, so earthly choices carry consequences.' },
          { term: 'Trust in the Most High', definition: 'Faith in His guidance creates readiness to follow the boundaries He has set even when a person cannot see the whole picture.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Эти внутренние убеждения становятся видимыми в действиях.', items: [
          { term: 'Установление молитвы', definition: 'Поддержание постоянной связи со Всевышним через молитву.' },
          { term: 'Расходование из дарованного', definition: 'Готовность делиться из того, чем Всевышний наделил человека.' },
          { term: 'Следование руководству', definition: 'Вера не остаётся только внутренним убеждением, а направляет реальные решения и поступки.' },
        ] },
        en: { title: 'Manifestations', description: 'These inner convictions become visible in action.', items: [
          { term: 'Establishing prayer', definition: 'Maintaining a continuing relationship with the Most High through prayer.' },
          { term: 'Spending from what has been provided', definition: 'A willingness to give from what the Most High has provided.' },
          { term: 'Following guidance', definition: 'Faith does not remain only an inner conviction but directs real decisions and actions.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'В 2:5 Коран сразу называет результат описанного состояния.', items: [
          { term: 'Руководство от их Господа', definition: 'Они находятся на руководстве, которое задаёт направление дальнейшему выбору.' },
          { term: 'Успех — الفلاح (al-falāḥ)', definition: 'Они названы преуспевшими: вера, осознанность и действие приводят к благому исходу.' },
          { term: 'Оберегание', definition: 'Через эту осознанность и следование руководству человек удерживается от того, что ведёт к вреду.' },
        ] },
        en: { title: 'Outcomes', description: 'In 2:5, the Quran immediately names the outcome of the state just described.', items: [
          { term: 'Guidance from their Lord', definition: 'They are upon guidance that gives direction to their further choices.' },
          { term: 'Success — الفلاح (al-falāḥ)', definition: 'They are described as successful: faith, awareness, and action lead toward a good outcome.' },
          { term: 'Protection', definition: 'Through this awareness and following guidance, a person is restrained from what leads to harm.' },
        ] },
      },
    ],
    structureSources: ['corpus', 'laneTqy'], meaningSources: ['raghib', 'laneTqy', 'baqarahMuttaqin'], related: ['ittaqa', 'taqwa'],
  },
  waq: {
    pattern: 'فَاعِل', patternReading: 'fāʿil',
    structure: {
      ru: ['Действительное причастие от глагола وَقَىٰ: называет того, кто защищает. У слабой основы وَاقِي конечная ي в некоторых падежных формах выпадает.', 'Неопределённая форма именительного или родительного падежа — وَاقٍ (wāqin); с артиклем — الْوَاقِي (al-wāqī). Подпись wāq передаёт чтение без падежного окончания.'],
      en: ['An active participle of وَقَىٰ, naming the one who protects. The weak stem وَاقِي loses its final ي in some case forms.', 'The indefinite nominative or genitive is وَاقٍ (wāqin); with the article it is الْوَاقِي (al-wāqī). The label wāq omits the case ending.'],
    },
    meaning: {
      ru: { lead: 'Защищающий, оберегающий; защитник.', body: 'Здесь действие защиты представлено через того, кто его осуществляет. В отличие от وِقَاء, акцент на защищающем, а не на средстве защиты.' },
      en: { lead: 'One who protects or guards; a protector.', body: 'The act of protection is expressed through whoever provides it. Unlike وِقَاء, the focus is on the protecting agent rather than the means of protection.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'وَاقٍ (wāqin) переносит действие защиты на того, кто её осуществляет.', items: [
          { term: 'Защитник / оберегающий', definition: 'Тот, от кого исходит действие защиты и кто препятствует вреду достичь защищаемого.' },
        ] },
        en: { title: 'Mechanism', description: 'وَاقٍ (wāqin) shifts the protective action to the one who performs it.', items: [
          { term: 'Protector / guardian', definition: 'The one from whom protection comes and who prevents harm from reaching what is protected.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Наличие وَاقٍ (wāqin) означает наличие действующего источника защиты.', items: [
          { term: 'Защищённость', definition: 'Защищаемое получает защиту благодаря тому, кто её осуществляет.' },
        ] },
        en: { title: 'Outcomes', description: 'The presence of a وَاقٍ (wāqin) means there is an acting source of protection.', items: [
          { term: 'Protection', definition: 'The protected object receives protection through the one who provides it.' },
        ] },
      },
    ],
    structureSources: ['corpus', 'jawhari'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  taqiyy: {
    pattern: 'فَعِيل', patternReading: 'faʿīl',
    structure: {
      ru: ['Прилагательное, обозначающее качество человека. فَعِيل — один из разборов модели, приводимых у Lane; там же обсуждается альтернативное историческое объяснение.', 'Слово близко по употреблению к مُتَّقٍ, но имеет другую форму. Множественное число — أَتْقِيَاء (atqiyāʾ). Удвоенная ي в تَقِيّ относится к строению слова.'],
      en: ['An adjective describing a person’s quality. فَعِيل is one of the pattern analyses recorded by Lane, who also discusses an alternative historical account.', 'Its usage is close to مُتَّقٍ, but its form differs. A plural is أَتْقِيَاء (atqiyāʾ). The doubled ي in تَقِيّ belongs to the word’s formation.'],
    },
    meaning: {
      ru: { lead: 'Человек, которому свойственна تَقْوَى.', body: 'Слово характеризует человека через качество. Lane сопоставляет его с مُتَّقٍ. Осторожность в поступках и праведное поведение относятся к возможным проявлениям; конкретный акцент задаёт контекст.' },
      en: { lead: 'A person characterised by تَقْوَى.', body: 'The adjective presents the quality as characteristic of a person. Lane compares it with مُتَّقٍ. Care in conduct and righteous behaviour are possible expressions; context determines the emphasis.' },
    },
    occurrenceNote: {
      ru: 'Особенность источника: корпус включает сюда تُقَاتِهِ из 3:102:7 и размечает его как существительное во множественном числе. Это иная словоформа, а не буквальное написание تَقِيّ. Счётчик сохраняет группировку корпуса.',
      en: 'Source distinction: the Corpus includes تُقَاتِهِ at 3:102:7 in this group and tags it as a plural noun. This is a different surface form, not the literal spelling تَقِيّ. The count preserves the Corpus grouping.',
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'تَقِيّ (taqiyy) описывает человека через устойчивое качество تَقْوَىٰ (taqwā).', items: [
          { term: 'Носитель качества', definition: 'Человек, для которого осознанность перед Всевышним и защитная направленность стали устойчивой характеристикой.' },
        ] },
        en: { title: 'Mechanism', description: 'تَقِيّ (taqiyy) describes a person through the enduring quality of تَقْوَىٰ (taqwā).', items: [
          { term: 'Bearer of the quality', definition: 'A person for whom awareness before the Most High and a protective orientation have become a stable characteristic.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Качество становится видимым в выборе и поведении человека.', items: [
          { term: 'Внимательность к границам', definition: 'Человек соотносит свои поступки с установленными Всевышним границами.' },
          { term: 'Праведное поведение', definition: 'Поступки, соответствующие руководству, могут быть проявлением этого качества.' },
        ] },
        en: { title: 'Manifestations', description: 'The quality becomes visible in a person’s choices and conduct.', items: [
          { term: 'Attention to boundaries', definition: 'The person relates their actions to the boundaries set by the Most High.' },
          { term: 'Righteous conduct', definition: 'Actions aligned with guidance can manifest this quality.' },
        ] },
      },
    ],
    structureSources: ['laneTqy'], meaningSources: ['laneTqy', 'jawhari'], related: ['taqwa', 'atqa', 'muttaqin'],
  },
  atqa: {
    pattern: 'أَفْعَل', patternReading: 'afʿal',
    structure: {
      ru: ['Сравнительная форма прилагательного: показывает большую степень качества. Традиционный арабский термин — اسم التفضيل.', 'Это не глагол IV породы. Конечный слабый согласный даёт ى. Конструкция может означать «более…» или «самый…» в зависимости от контекста.'],
      en: ['An elative adjective expressing a greater degree of a quality. The traditional Arabic term is اسم التفضيل.', 'It is not a Form IV verb. The final weak consonant gives ى. Depending on the construction, it can express “more…” or “most…”.'],
    },
    meaning: {
      ru: { lead: 'В большей степени обладающий تَقْوَى.', body: 'Сравнивается степень качества: большее остережение, оберегание себя и более последовательное удерживание установленных границ. Само основание сравнения задаёт контекст.' },
      en: { lead: 'Having a greater degree of تَقْوَى.', body: 'The form compares the degree of the quality: greater care in guarding oneself against wrongdoing. Context supplies the basis of comparison.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'أَتْقَى (atqā) сравнивает степень تَقْوَىٰ (taqwā).', items: [
          { term: 'Большая степень качества', definition: 'Та же осознанность и защитная направленность выражены сильнее или последовательнее; конкретное основание сравнения задаёт контекст.' },
        ] },
        en: { title: 'Mechanism', description: 'أَتْقَى (atqā) compares the degree of تَقْوَىٰ (taqwā).', items: [
          { term: 'Greater degree of the quality', definition: 'The same awareness and protective orientation are expressed more strongly or consistently; context supplies the basis of comparison.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Большая степень качества видна в более последовательном выборе.', items: [
          { term: 'Более последовательное соблюдение границ', definition: 'Человек устойчивее соотносит свои поступки с руководством и границами Всевышнего.' },
        ] },
        en: { title: 'Manifestations', description: 'A greater degree of the quality is visible in more consistent choices.', items: [
          { term: 'More consistent observance of boundaries', definition: 'The person more consistently relates conduct to the guidance and boundaries of the Most High.' },
        ] },
      },
    ],
    structureSources: ['laneTqy', 'corpus'], meaningSources: ['laneTqy'], related: ['taqiyy', 'taqwa'],
  },
  wiqaa: {
    pattern: 'فِعَال', patternReading: 'fiʿāl',
    structure: {
      ru: ['Существительное, обозначающее средство защиты. Оно связано с глаголом وَقَىٰ, поэтому находится с ним на внутренней орбите.', 'На месте конечной корневой ي после долгого ā появляется ء: وِقَاء. Аль-Джаухари также приводит вариант وَقَاء с другой начальной огласовкой.'],
      en: ['A noun naming a means of protection. It is related to وَقَىٰ and therefore shares the inner orbit with it.', 'After long ā, the final root ي appears as ء in وِقَاء. Al-Jawhari also records وَقَاء with a different initial vowel.'],
    },
    meaning: {
      ru: { lead: 'Средство защиты, защитный покров; щит.', body: 'Аль-Джаухари определяет его через то, чем защищают что-либо. «Щит» здесь — понятный пример средства защиты, а не ограничение слова только военным предметом.' },
      en: { lead: 'A means of protection, a protective covering; a shield.', body: 'Al-Jawhari defines it through what is used to protect something. A shield is one example of a protective means; the word is not limited to a military object.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'وِقَاء (wiqāʾ) называет то, что становится между защищаемым и вредом.', items: [
          { term: 'Средство защиты', definition: 'Покров, барьер или другое средство, которое препятствует вреду достичь защищаемого.' },
        ] },
        en: { title: 'Mechanism', description: 'وِقَاء (wiqāʾ) names what stands between the protected object and harm.', items: [
          { term: 'Means of protection', definition: 'A covering, barrier, or other means that prevents harm from reaching what is protected.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Функция وِقَاء (wiqāʾ) — обеспечить защищённость.', items: [
          { term: 'Защитный покров', definition: 'Защищаемое получает барьер между собой и источником вреда.' },
        ] },
        en: { title: 'Outcomes', description: 'The function of وِقَاء (wiqāʾ) is to provide protection.', items: [
          { term: 'Protective covering', definition: 'The protected object gains a barrier between itself and the source of harm.' },
        ] },
      },
    ],
    structureSources: ['jawhari'], meaningSources: ['jawhari', 'raghib'], related: ['waqa', 'wiqaya', 'waq'],
  },
  wiqaya: {
    pattern: 'فِعَالَة', patternReading: 'fiʿāla',
    structure: {
      ru: ['Существительное действия — масдар от وَقَىٰ. Модель فِعَالَة называет действие защиты.', 'Корневая ي сохраняется перед окончанием ة: وِقَايَة. В словарях эта же форма может называть и то, что служит защитой.'],
      en: ['A verbal noun of وَقَىٰ. The pattern فِعَالَة names the act of protecting.', 'The root ي remains before the ending ة in وِقَايَة. Dictionaries also use the same form for something that provides protection.'],
    },
    meaning: {
      ru: { lead: 'Защита, предохранение, сохранение от вреда.', body: 'В определении ар-Рагиба главное — сохранение того, что защищают, от повреждения и вреда. В центре внимания действие защиты; в отдельных употреблениях — защитное средство.' },
      en: { lead: 'Protection, safeguarding, preservation from harm.', body: 'Al-Raghib’s definition focuses on keeping the protected object safe from damage and harm. The main focus is the act of protection, though some usages name a protective means.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'وِقَايَة (wiqāya) называет защиту как процесс.', items: [
          { term: 'Предохранение', definition: 'Действие, направленное на то, чтобы сохранить кого-либо или что-либо от повреждения и вреда.' },
        ] },
        en: { title: 'Mechanism', description: 'وِقَايَة (wiqāya) names protection as a process.', items: [
          { term: 'Safeguarding', definition: 'An action directed toward preserving someone or something from damage and harm.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Успешная وِقَايَة (wiqāya) приводит к сохранению защищаемого.', items: [
          { term: 'Сохранение от вреда', definition: 'То, что защищают, остаётся невредимым или менее подверженным вреду.' },
        ] },
        en: { title: 'Outcomes', description: 'Successful وِقَايَة (wiqāya) results in preservation of what is protected.', items: [
          { term: 'Preservation from harm', definition: 'What is protected remains unharmed or less exposed to harm.' },
        ] },
      },
    ],
    structureSources: ['jawhari', 'raghib'], meaningSources: ['raghib', 'laneWqy'], related: ['waqa', 'wiqaa'],
  },
  tawaqqa: {
    pattern: 'تَفَعَّلَ', patternReading: 'tafaʿʿala',
    structure: {
      ru: ['Глагол V породы. Модель добавляет начальную ت и удваивает вторую корневую букву — ق. Корневая و остаётся видимой после ت.', 'Настоящее время — يَتَوَقَّى (yatawaqqā). Конечная корневая ي в показанной форме передана через ى.'],
      en: ['A Form V verb. The pattern adds initial ت and doubles the second root letter ق. The root و remains visible after ت.', 'The present form is يَتَوَقَّى (yatawaqqā). The final root ي appears as ى in the displayed form.'],
    },
    meaning: {
      ru: { lead: 'Остерегаться, беречься, принимать предосторожности.', body: 'Lane объясняет глагол через осторожность и защиту от того, чего следует избегать. Аль-Джаухари отмечает близость تَوَقَّى и ٱتَّقَىٰ по значению; их словообразовательные модели различны.' },
      en: { lead: 'To beware, guard oneself, or take precautions.', body: 'Lane explains the verb through caution and guarding against something. Al-Jawhari notes the closeness in meaning between تَوَقَّى and ٱتَّقَىٰ; their derivational patterns differ.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'تَوَقَّىٰ (tawaqqā) показывает защиту как практическое действие самого человека.', items: [
          { term: 'Беречься / остерегаться', definition: 'Замечать возможный вред и сознательно выстраивать своё поведение так, чтобы его избежать.' },
        ] },
        en: { title: 'Mechanism', description: 'تَوَقَّىٰ (tawaqqā) presents protection as the person’s own practical action.', items: [
          { term: 'To guard oneself / beware', definition: 'To notice possible harm and deliberately shape one’s behaviour to avoid it.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Защитная позиция выражается в конкретных мерах предосторожности.', items: [
          { term: 'Принятие мер', definition: 'Человек меняет действие, маршрут или поведение, чтобы снизить вероятность вреда.' },
        ] },
        en: { title: 'Manifestations', description: 'The protective stance is expressed through concrete precautions.', items: [
          { term: 'Taking precautions', definition: 'The person changes an action, route, or behaviour to reduce the likelihood of harm.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'Цель предосторожности — не допустить вреда.', items: [
          { term: 'Избежание вреда', definition: 'Человек не попадает в ситуацию или действие, от которого стремился себя уберечь.' },
        ] },
        en: { title: 'Outcomes', description: 'The aim of precaution is to prevent harm.', items: [
          { term: 'Avoidance of harm', definition: 'The person avoids the situation or action they were seeking to guard against.' },
        ] },
      },
    ],
    structureSources: ['laneWqy', 'jawhari'], meaningSources: ['laneWqy', 'jawhari'], related: ['waqa', 'ittaqa'],
  },
}
