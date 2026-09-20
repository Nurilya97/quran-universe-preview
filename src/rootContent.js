import { WQY_PUBLIC_MODEL } from './canonicalWqy.js'

// Short editorial explanations based only on the public sources linked below.
// This lexical guide presents public word-level explanations and linked sources.
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
          { term: 'Сохранение от вреда', definition: 'Защита сохраняет оберегаемое от воздействия вреда.' },
        ] },
        en: { title: 'Outcomes', description: 'The outcome of وَقَىٰ (waqā) is preservation of the protected object from harm.', items: [
          { term: 'Preservation from harm', definition: 'Protection keeps what is guarded safe from harm.' },
        ] },
      },
    ],
    distinction: {
      ru: 'Базовый глагол семьи: وَقَىٰ (waqā) называет само действие «защищать». وِقَايَة (wiqāya) называет защиту как процесс, وَاقٍ (wāqin) — того, кто защищает, а وِقَاء (wiqāʾ) — средство защиты.',
      en: 'The base verb of the family: وَقَىٰ (waqā) names the act “to protect.” وِقَايَة (wiqāya) names protection as a process, وَاقٍ (wāqin) the protector, and وِقَاء (wiqāʾ) the means of protection.',
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
      ru: { lead: 'Занимать активную защитную позицию.', body: WQY_PUBLIC_MODEL.operativeMechanism.ru },
      en: { lead: 'To take an active, protection-oriented stance.', body: WQY_PUBLIC_MODEL.operativeMechanism.en },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'ٱتَّقَىٰ (ittaqā) переносит защитное действие на самого субъекта.', items: [
          { term: 'Защитная позиция', definition: 'Человек сам занимает позицию, которая помогает ему уберечь себя от того, что определяется контекстом.' },
          { term: 'Остережение', definition: 'Распознать то, от чего следует себя уберечь, и держаться от этого в стороне.' },
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
    ],
    distinction: {
      ru: 'ٱتَّقَىٰ (ittaqā) — действие самого субъекта: он принимает защитную позицию. تَقْوَىٰ (taqwā) называет состояние/качество, возникающее из этой линии, а مُتَّقٍ (muttaqin) — человека, который осуществляет это действие.',
      en: 'ٱتَّقَىٰ (ittaqā) is the subject’s own action: taking a protective stance. تَقْوَىٰ (taqwā) names the state/quality developing from this line, while مُتَّقٍ (muttaqin) names the person who enacts it.',
    },
    structureSources: ['jawhari', 'laneTqy'], meaningSources: ['raghib', 'laneWqy'], related: ['taqwa', 'muttaqin', 'tuqat'],
  },
  taqwa: {
    pattern: 'فَعْلَى', patternReading: 'faʿlā',
    structure: {
      ru: ['Существительное, называющее качество или состояние и словообразовательно связанное с ٱتَّقَىٰ. Для существительного показана собственная модель فَعْلَى.', 'Здесь показан распространённый разбор по модели فَعْلَى. Корневая و соответствует начальной ت; изменение конечной ي участвует в образовании сочетания ـوَى. Поэтому корень остаётся و ق ي, хотя в слове видна ت.', 'Словари приводят и другие объяснения исторического образования. Орбита VIII обозначает словообразовательную семью; модель существительного показана отдельно как فَعْلَى.'],
      en: ['A noun naming a quality or state and derivationally related to ٱتَّقَىٰ. The noun is shown with its own pattern فَعْلَى.', 'The common analysis shown here uses فَعْلَى. The initial ت corresponds to the root’s و; a change involving the final ي contributes to ـوَى. The root therefore remains و ق ي despite the visible ت.', 'Dictionaries also record other accounts of its historical formation. Orbit VIII represents the derivational family; the noun’s own pattern is shown separately as فَعْلَى.'],
    },
    meaning: {
      ru: { lead: 'تَقْوَىٰ (taqwā) — целостное состояние осознанности перед Всевышним, основанное на вере и доверии Ему, осознании сокрытой реальности и Последней жизни.', body: 'Корень و ق ي сохраняет направление защиты и оберегания, а связь с ٱتَّقَىٰ (ittaqā) показывает активную позицию человека. Человек помнит о Всевышнем, воспринимает эту жизнь в связи с тем, что будет после неё, держит в сознании Его границы и делает выбор, который оберегает его. Остережение греха и наказания — часть защитного механизма. Более широкий уровень تَقْوَىٰ (taqwā) — сама осознанность перед Всевышним, из которой рождаются внимание, выбор и остережение.' },
      en: { lead: 'تَقْوَىٰ (taqwā) is a holistic state of awareness before the Most High, grounded in faith and trust in Him, awareness of the unseen, and certainty in the Hereafter.', body: 'The root و ق ي retains the direction of protection and guarding, while its link to ٱتَّقَىٰ (ittaqā) shows an active stance taken by the person. A person keeps the Most High in mind, understands this life in relation to what comes after it, remains attentive to His boundaries, and makes choices that guard them. Guarding against sin and punishment is one part of this protective mechanism; the broader level of تَقْوَىٰ (taqwā) is the state of awareness before the Most High from which attention, choice, and caution arise.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'Осознанность перед Всевышним делает последствия выбора значимыми для человека, помогает различать направление и приводит к защитному действию.', items: [
          { term: 'Осознанность перед Всевышним', definition: 'Помнить о Нём, верить и доверять Ему, осознавать сокрытую реальность и Последнюю жизнь и воспринимать свой выбор в свете Его руководства.', connector: 'даёт различение' },
          { term: 'Распознавание', definition: 'Человек замечает границу, направление и последствия выбора: что приближает к руководству, а что ведёт к нарушению и вреду.', connector: 'ведёт к защитному действию' },
          { term: 'Оберегание себя', definition: 'Человек удерживается от того, что ведёт к греху и вредному исходу, и выбирает действие, которое сохраняет его в рамках руководства.' },
        ] },
        en: { title: 'Mechanism', description: 'Awareness before the Most High makes the consequences of choice meaningful, helps a person discern direction, and leads to protective action.', items: [
          { term: 'Awareness before the Most High', definition: 'Keeping Him in mind, believing in and trusting Him, recognising the unseen and the Hereafter, and viewing one’s choices through His guidance.', connector: 'gives discernment' },
          { term: 'Recognition', definition: 'The person notices the boundary, direction, and consequences of a choice: what moves toward guidance and what leads toward transgression and harm.', connector: 'leads to protective action' },
          { term: 'Self-guarding', definition: 'The person holds back from what leads to sin and harmful consequences and chooses what keeps them within guidance.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Составные части механизма', description: 'Коран раскрывает основания, на которых держится эта осознанность и из которых формируется выбор человека.', items: [
          { term: 'Вера в сокрытое — الغيب (al-ghayb)', definition: 'Признание реальности за пределами непосредственного чувственного восприятия, известной через откровение: Всевышнего, ангелов, Рая, Ада и других сокрытых вещей.' },
          { term: 'Убеждённость в Последней жизни — الآخرة (al-ākhirah)', definition: 'Осознание продолжения жизни после земного этапа и того, что за выбором человека последуют расчёт и воздаяние.' },
          { term: 'Вера в откровение', definition: 'Доверие тому, что Всевышний сообщает человеку через Своё руководство, и принятие этого руководства как основы для выбора.' },
          { term: 'Внимание к границам дозволенного', definition: 'Понимание установленных Всевышним границ и сознательное стремление оставаться в их пределах.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'The Quran unfolds the foundations that sustain this awareness and shape a person’s choices.', items: [
          { term: 'Belief in the unseen — الغيب (al-ghayb)', definition: 'Acknowledging realities beyond immediate sensory perception and known through revelation: the Most High, angels, Paradise, Hell, and other unseen realities.' },
          { term: 'Certainty in the Hereafter — الآخرة (al-ākhirah)', definition: 'Awareness of life continuing beyond the earthly stage and of reckoning and recompense following a person’s choices.' },
          { term: 'Faith in revelation', definition: 'Trusting what the Most High communicates through revelation and accepting that guidance as a basis for one’s choices.' },
          { term: 'Attention to the permitted boundaries', definition: 'Recognising the boundaries set by the Most High and consciously remaining within them.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Вера и осознанность становятся видимыми в действиях человека.', items: [
          { term: 'Благочестие', definition: 'Нравственное качество, проявляющееся в почтительном отношении к вере и в поведении, согласованном с её предписаниями. Здесь это одно из поведенческих проявлений تَقْوَىٰ (taqwā).' },
          { term: 'Молитва', definition: 'Регулярное обращение к Всевышнему и поддержание связи с Ним через установленную молитву.' },
          { term: 'Расходование из дарованного', definition: 'Готовность делиться с другими из того, чем Всевышний наделил человека.' },
          { term: 'Праведность', definition: 'Характеристика поступков, соответствующих руководству Всевышнего; одно из проявлений تَقْوَىٰ (taqwā).' },
        ] },
        en: { title: 'Manifestations', description: 'Faith and awareness become visible in a person’s actions.', items: [
          { term: 'Piety', definition: 'A religious and moral quality expressed through reverence and conduct shaped by religious guidance. Here it is one behavioral manifestation of تَقْوَىٰ (taqwā), not a complete definition of the concept itself.' },
          { term: 'Prayer', definition: 'Regularly turning to the Most High and maintaining the relationship through established prayer.' },
          { term: 'Spending from what has been provided', definition: 'Being willing to share with others from what the Most High has provided.' },
          { term: 'Righteousness', definition: 'A description of conduct aligned with divine guidance; one manifestation of تَقْوَىٰ (taqwā).' },
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
    translationNotes: {
      ru: [
        {
          tone: 'warning',
          title: 'Богобоязненность — неверный перевод',
          text: 'Само слово «богобоязненность» построено вокруг боязни: «Бого-» + «боязненность». Поэтому страх оказывается на первом месте. Это плохо согласуется с кораническим раскрытием تَقْوَىٰ (taqwā), где в центре стоят осознанность перед Всевышним, вера и доверие Ему, различение, внимание к Его границам и сознательный выбор.',
        },
        {
          tone: 'positive',
          title: 'Трепет — более близкий вариант',
          text: '«Трепет» ближе, потому что передаёт одновременно почтительное осознание величия Всевышнего, уважение, внутреннюю собранность и внимательность перед Ним. Страх может присутствовать как один из оттенков, а центром остаётся осознанное отношение к Всевышнему.',
        },
      ],
      en: [
        {
          tone: 'warning',
          title: '“God-fearing” is an inaccurate rendering',
          text: '“God-fearing” places fear at the centre of the meaning and narrows the broader Quranic sense of تَقْوَىٰ (taqwā): awareness before the Most High, faith and trust in Him, discernment, attention to His boundaries, and protective choice.',
        },
        {
          tone: 'positive',
          title: '“Awe” is a closer rendering',
          text: '“Awe” better conveys reverent awareness of the greatness of the Most High, respect, inner attentiveness, and seriousness toward Him. Fear can appear as one shade within that response, while reverent awareness remains central.',
        },
      ],
    },
        distinction: {
      ru: 'تَقْوَىٰ (taqwā) называет состояние/качество. Его защитное ядро приходит от و ق ي (w-q-y) и ٱتَّقَىٰ (ittaqā), а более широкий смысл раскрывается кораническим описанием.',
      en: 'تَقْوَىٰ (taqwā) names a state/quality. Its protective core comes from و ق ي (w-q-y) and ٱتَّقَىٰ (ittaqā), while its broader sense is unfolded by Quranic description.',
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
      ru: { lead: 'تُقَاة (tuqāt) — остережение, предосторожность или защитная мера.', body: 'Форма называет само остережение как действие или меру защиты. Акцент находится на конкретной предосторожности; تَقْوَىٰ (taqwā) раскрывает более широкое состояние.' },
      en: { lead: 'تُقَاة (tuqāt) is caution, precaution, or a protective measure.', body: 'The form names caution as an act or protective measure. The focus is a concrete precaution; تَقْوَىٰ (taqwā) unfolds a broader state.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'تُقَاة (tuqāt) называет само остережение или принятие защитной меры.', items: [
          { term: 'Предосторожность', definition: 'Действие, предпринимаемое заранее для предотвращения вреда или опасного последствия.' },
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
    distinction: {
      ru: 'تُقَاة (tuqāt) называет конкретное остережение или защитную меру; تَقْوَىٰ (taqwā) в Коране раскрывается как более широкое состояние.',
      en: 'تُقَاة (tuqāt) names a concrete act of caution or protective measure; تَقْوَىٰ (taqwā) is unfolded in the Quran as a broader state.',
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
      ru: { lead: 'مُتَّقِينَ (muttaqīn) — люди, которые осуществляют ٱتَّقَىٰ (ittaqā): их تَقْوَىٰ (taqwā) проявляется в выборе и поступках.', body: 'Это множественное действительное причастие от ٱتَّقَىٰ (ittaqā), поэтому слово называет людей через их защитно-ориентированную позицию. В 2:3–5 Коран сам раскрывает их: вера в сокрытое и откровение, убеждённость в Последней жизни, молитва, расходование из дарованного, руководство и успех.' },
      en: { lead: 'مُتَّقِينَ (muttaqīn) are people who enact ٱتَّقَىٰ (ittaqā): their تَقْوَىٰ (taqwā) becomes visible in choices and actions.', body: 'This is the plural active participle of ٱتَّقَىٰ (ittaqā), so it names people through their protection-oriented stance. In 2:3–5, the Quran itself unfolds them through belief in the unseen and revelation, certainty in the Hereafter, prayer, spending, guidance, and success.' },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'Как действительное причастие, مُتَّقِينَ (muttaqīn) называет людей через осуществляемую ими защитную позицию ٱتَّقَىٰ (ittaqā).', items: [
          { term: 'Осознанные перед Всевышним', definition: 'Люди, которые живут с пониманием присутствия и руководства Всевышнего и соотносят с этим свои решения.' },
          { term: 'Оберегающие себя', definition: 'Их осознанность приводит к внимательности к границам и к выбору, который удерживает от вреда и нарушения.' },
        ] },
        en: { title: 'Mechanism', description: 'As an active participle, مُتَّقِينَ (muttaqīn) names people through the protective stance of ٱتَّقَىٰ (ittaqā) that they enact.', items: [
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
          { term: 'Доверие Всевышнему', definition: 'Вера в Его руководство формирует готовность следовать установленным Им границам и при неполной доступной человеку картине.' },
        ] },
        en: { title: 'Components of the mechanism', description: 'In 2:3–4, the Quran unfolds the inner convictions on which this state is built.', items: [
          { term: 'Belief in the unseen — الغيب (al-ghayb)', definition: 'Acknowledging the Most High and other unseen realities known through revelation: angels, Paradise, Hell, and what lies beyond immediate perception.' },
          { term: 'Faith in revelation', definition: 'Accepting what was revealed to the Messenger ﷺ and what was revealed before as true guidance from the Most High.' },
          { term: 'Certainty in the Hereafter — الآخرة (al-ākhirah)', definition: 'Deep certainty that life continues beyond this world and includes reckoning and recompense, so earthly choices carry consequences.' },
          { term: 'Trust in the Most High', definition: 'Faith in His guidance creates readiness to follow the boundaries He has set even with only a partial view of the whole picture.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Проявления', description: 'Эти внутренние убеждения становятся видимыми в действиях.', items: [
          { term: 'Установление молитвы', definition: 'Поддержание постоянной связи со Всевышним через молитву.' },
          { term: 'Расходование из дарованного', definition: 'Готовность делиться из того, чем Всевышний наделил человека.' },
          { term: 'Следование руководству', definition: 'Вера направляет реальные решения и поступки человека.' },
        ] },
        en: { title: 'Manifestations', description: 'These inner convictions become visible in action.', items: [
          { term: 'Establishing prayer', definition: 'Maintaining a continuing relationship with the Most High through prayer.' },
          { term: 'Spending from what has been provided', definition: 'A willingness to give from what the Most High has provided.' },
          { term: 'Following guidance', definition: 'Faith directs real decisions and actions.' },
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
    distinction: {
      ru: 'مُتَّقِينَ (muttaqīn) называет людей через осуществляемую ими позицию ٱتَّقَىٰ (ittaqā); تَقِيّ (taqiyy) описывает человека через качество تَقْوَىٰ (taqwā). Первый акцентирует действие и позицию, второй — характеристику.',
      en: 'مُتَّقِينَ (muttaqīn) names people through the enacted stance of ٱتَّقَىٰ (ittaqā); تَقِيّ (taqiyy) describes a person through the quality of تَقْوَىٰ (taqwā). The first foregrounds stance and action, the second a characteristic.',
    },
    structureSources: ['corpus', 'laneTqy'], meaningSources: ['raghib', 'laneTqy', 'baqarahMuttaqin'], related: ['ittaqa', 'taqwa'],
  },
  waq: {
    pattern: 'فَاعِل', patternReading: 'fāʿil',
    structure: {
      ru: ['Действительное причастие от глагола وَقَىٰ: называет того, кто защищает. У слабой основы وَاقِي конечная ي в некоторых падежных формах выпадает.', 'Неопределённая форма именительного или родительного падежа — وَاقٍ (wāqin); с артиклем — الْوَاقِي (al-wāqī). Подпись wāq передаёт чтение без падежного окончания.'],
      en: ['An active participle of وَقَىٰ, naming the one who protects. The weak stem وَاقِي loses its final ي in some case forms.', 'The indefinite nominative or genitive is وَاقٍ (wāqin); with the article it is الْوَاقِي (al-wāqī). The label wāq omits the case ending.'],
    },
    meaning: {
      ru: { lead: 'Защищающий, оберегающий; защитник.', body: 'Здесь действие защиты представлено через того, кто его осуществляет. Акцент находится на самом защищающем; وِقَاء (wiqāʾ) называет средство защиты.' },
      en: { lead: 'One who protects or guards; a protector.', body: 'The act of protection is expressed through whoever provides it. The focus is on the protecting agent; وِقَاء (wiqāʾ) names the means of protection.' },
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
    ],
    distinction: {
      ru: 'وَاقٍ (wāqin) называет самого защищающего; وَقَىٰ (waqā) называет действие защиты, а وِقَاء (wiqāʾ) — средство защиты.',
      en: 'وَاقٍ (wāqin) names the protector; وَقَىٰ (waqā) names the act of protection, while وِقَاء (wiqāʾ) names the protective means.',
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
      ru: { lead: 'تَقِيّ (taqiyy) — человек, описанный как обладающий качеством تَقْوَىٰ (taqwā).', body: 'Это прилагательное: акцент находится на качестве как характеристике человека. تَقِيّ (taqiyy) близок к مُتَّقٍ (muttaqin) по смысловой семье; грамматически здесь на первом плане свойство человека.' },
      en: { lead: 'تَقِيّ (taqiyy) is a person described as possessing the quality of تَقْوَىٰ (taqwā).', body: 'It is an adjective, so the focus is the quality as a characteristic of the person. تَقِيّ (taqiyy) belongs to the same semantic family as مُتَّقٍ (muttaqin); grammatically the person’s attribute is foregrounded.' },
    },
    occurrenceNote: {
      ru: 'Особенность источника: корпус включает сюда تُقَاتِهِ из 3:102:7 и размечает его как существительное во множественном числе. Это отдельная словоформа; счётчик сохраняет именно такую группировку корпуса.',
      en: 'Source distinction: the Corpus includes تُقَاتِهِ at 3:102:7 in this group and tags it as a plural noun. It is a separate surface form, and the count preserves this Corpus grouping.',
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Механизм', description: 'تَقِيّ (taqiyy) описывает تَقْوَىٰ (taqwā) как качество, характеризующее человека.', items: [
          { term: 'Носитель качества', definition: 'Человек, для которого осознанность перед Всевышним и защитная направленность стали устойчивой характеристикой.' },
        ] },
        en: { title: 'Mechanism', description: 'تَقِيّ (taqiyy) presents تَقْوَىٰ (taqwā) as a quality characterising the person.', items: [
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
      ru: ['Сравнительная форма прилагательного: показывает большую степень качества. Традиционный арабский термин — اسم التفضيل.', 'Форма относится к اسم التفضيل. Конечный слабый согласный даёт ى. Конструкция может означать «более…» или «самый…» в зависимости от контекста.'],
      en: ['An elative adjective expressing a greater degree of a quality. The traditional Arabic term is اسم التفضيل.', 'The form belongs to اسم التفضيل. The final weak consonant gives ى. Depending on the construction, it can express “more…” or “most…”.'],
    },
    meaning: {
      ru: { lead: 'أَتْقَى (atqā) — более или наиболее обладающий تَقْوَىٰ (taqwā), в зависимости от конструкции.', body: 'Это форма сравнения اسم التفضيل (ism al-tafḍīl), показывающая большую степень той же تَقْوَىٰ (taqwā).' },
      en: { lead: 'أَتْقَى (atqā) means having a greater or greatest degree of تَقْوَىٰ (taqwā), depending on the construction.', body: 'It is the elative form اسم التفضيل (ism al-tafḍīl), comparing the degree of the same تَقْوَىٰ (taqwā).' },
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
    ],
    distinction: {
      ru: 'أَتْقَى (atqā) показывает степень تَقْوَىٰ (taqwā): «более / наиболее» обладающий тем же качеством.',
      en: 'أَتْقَى (atqā) expresses the degree of تَقْوَىٰ (taqwā): “more / most” characterised by the same quality.',
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
      ru: { lead: 'Средство защиты, защитный покров; щит.', body: 'Аль-Джаухари определяет его через то, чем защищают что-либо. «Щит» — один из наглядных примеров такого средства защиты.' },
      en: { lead: 'A means of protection, a protective covering; a shield.', body: 'Al-Jawhari defines it through what is used to protect something. A shield is one clear example of such a protective means.' },
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
    ],
    distinction: {
      ru: 'وِقَاء (wiqāʾ) — то, чем защищают: барьер, покров, средство. وَاقٍ (wāqin) — сам защитник, а وِقَايَة (wiqāya) — процесс защиты.',
      en: 'وِقَاء (wiqāʾ) is what protection is provided with: a barrier, covering, or means. وَاقٍ (wāqin) is the protector, while وِقَايَة (wiqāya) is the process of protection.',
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
      ru: { lead: 'وِقَايَة (wiqāya) — защита / предохранение как действие или процесс.', body: 'Это масдар от وَقَىٰ (waqā): глагол называет «защищать», а وِقَايَة (wiqāya) — саму защиту как действие, процесс или понятие сохранения от вреда.' },
      en: { lead: 'وِقَايَة (wiqāya) is protection / safeguarding as an action or process.', body: 'It is the verbal noun of وَقَىٰ (waqā): the verb means “to protect,” while وِقَايَة (wiqāya) names protection itself as an action, process, or concept of preservation from harm.' },
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
    ],
    distinction: {
      ru: 'وِقَايَة (wiqāya) — название самой защиты как действия/процесса. وَقَىٰ (waqā) — глагол «защищать», а وِقَاء (wiqāʾ) — средство, которым защищают.',
      en: 'وِقَايَة (wiqāya) names protection itself as an action/process. وَقَىٰ (waqā) is the verb “to protect,” while وِقَاء (wiqāʾ) is the means used for protection.',
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
      ru: { lead: 'تَوَقَّىٰ (tawaqqā) — беречься, остерегаться, принимать меры предосторожности.', body: 'Словари сближают تَوَقَّىٰ (tawaqqā) и ٱتَّقَىٰ (ittaqā) по значению. Здесь تَوَقَّىٰ (tawaqqā) показан как словарная форма практического остережения, а различие моделей раскрывается в «Строении слова».' },
      en: { lead: 'تَوَقَّىٰ (tawaqqā) means to guard oneself, beware, or take precautions.', body: 'Lexicons bring تَوَقَّىٰ (tawaqqā) and ٱتَّقَىٰ (ittaqā) close in meaning. Here تَوَقَّىٰ (tawaqqā) is presented as a lexical form of practical caution, while the pattern difference is explained in Word Structure.' },
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
    ],
    distinction: {
      ru: 'تَوَقَّىٰ (tawaqqā) словарно очень близок к ٱتَّقَىٰ (ittaqā). В «Значении» они показаны как близкие формы, а различие их моделей раскрывается отдельно в «Строении слова».',
      en: 'تَوَقَّىٰ (tawaqqā) is lexically very close to ٱتَّقَىٰ (ittaqā). Meaning presents them as closely related forms, while Word Structure explains their different patterns.',
    },
    structureSources: ['laneWqy', 'jawhari'], meaningSources: ['laneWqy', 'jawhari'], related: ['waqa', 'ittaqa'],
  },
}


export const LBB_ROOT_CONTENT = {
  ru: {
    lead: 'ل ب ب (l-b-b) — внутренняя, чистая сердцевина; применительно к человеку — чистое и глубокое разумение.',
    body: 'В словарях для ل ب ب зафиксированы значения сердцевины и чистой части вещи, разума и разумения, верхней части груди и места ожерелья, нагрудного ремня, захвата за одежду у груди, а также пребывания и удерживания на месте.',
  },
  en: {
    lead: 'ل ب ب (l-b-b) — the inner, pure core; when applied to a person, purified and deep understanding.',
    body: 'Lexicons record for ل ب ب senses of an inner core or pure part, understanding and intellect, the upper chest and necklace area, a breast-girth, grasping clothing at the chest, and remaining or keeping to a place.',
  },
  rootNucleus: {
    ru: 'Чистая внутренняя сердцевина → глубокое, очищенное разумение.',
    en: 'Pure inner core → deep, purified understanding.',
  },
  sources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'raghibLbb', 'lbbCorpus'],
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
        'Its plural pattern is أَفْعَال (afʿāl). The root letters remain ل ب ب; initial أ and the internal ا belong to the plural pattern.',
      ],
    },
    meaning: {
      ru: {
        lead: 'أَلْبَاب (albāb) — множественное от لُبّ: глубокое, очищенное разумение.',
        body: 'Образ начинается с внутренней сердцевины вещи — её чистой и лучшей части. Применительно к человеку لُبّ становится обозначением разума, способного видеть суть без помех и примесей. Поэтому أُولِي ٱلْأَلْبَابِ можно читать как «обладатели глубокого разумения»: люди, способные дойти от внешней формы к внутреннему смыслу.',
      },
      en: {
        lead: 'أَلْبَاب (albāb) is the plural of لُبّ: deep, purified understanding.',
        body: 'The image begins with the inner core of a thing — its pure and choicest part. Applied to a person, لُبّ denotes understanding able to reach the essence without obscuring impurities. Thus أُولِي ٱلْأَلْبَابِ can be read as “possessors of deep understanding”: people able to move from outward form to inward meaning.',
      },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Смысловое ядро', description: 'В центре этой линии — внутренняя, чистая часть вещи. Отсюда развивается значение внутренней способности видеть суть.', items: [
          { term: 'لُبّ · lubb', definition: 'Сердцевина, ядро, внутренняя мякоть; также чистая или отборная часть чего-либо.', connector: 'переносится на внутреннюю способность человека' },
          { term: 'Разумение', definition: 'Внутренняя способность понимать, различать и доходить до сути, не оставаясь на внешней оболочке.' },
        ] },
        en: { title: 'Semantic core', description: 'At the centre of this line is the inner, pure part of a thing. From there the sense extends to an inward human faculty that reaches the essence.', items: [
          { term: 'لُبّ · lubb', definition: 'Core, kernel, inner pulp; also the pure or choicest part of something.', connector: 'extends to the human inward faculty' },
          { term: 'Understanding', definition: 'The inward capacity to understand, discern, and reach the essence rather than remain at the outer surface.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Производные основной смысловой линии', description: 'Эти формы удерживают связь с сердцевиной, чистой сутью и разумением.', items: [
          { term: 'لُبَاب · lubāb', definition: 'Чистая суть, отборная часть, самое существенное в вещи.' },
          { term: 'لَبَّ / لَبِبَ · labba / labiba', definition: 'Стать обладателем لُبّ — быть разумным, проницательным.' },
          { term: 'لَبَابَة · labāba', definition: 'Разумность, проницательность; состояние обладания لُبّ.' },
          { term: 'لَبِيب · labīb', definition: 'Разумный, проницательный человек, обладающий لُبّ.' },
          { term: 'أَلِبَّاء · alibbāʾ', definition: 'Множественное от لَبِيب: разумные, проницательные люди.' },
          { term: 'أَلْبَاب · albāb', definition: 'Множественное от لُبّ. В Коране именно эта форма представляет корень ل ب ب.' },
        ] },
        en: { title: 'Derivatives in the main semantic line', description: 'These forms preserve the connection with the inner core, pure essence, and understanding.', items: [
          { term: 'لُبَاب · lubāb', definition: 'Pure essence, choicest part, what is most essential in a thing.' },
          { term: 'لَبَّ / لَبِبَ · labba / labiba', definition: 'To become possessed of لُبّ — to be intelligent or discerning.' },
          { term: 'لَبَابَة · labāba', definition: 'Intelligence or discernment; the state of possessing لُبّ.' },
          { term: 'لَبِيب · labīb', definition: 'An intelligent, discerning person possessing لُبّ.' },
          { term: 'أَلِبَّاء · alibbāʾ', definition: 'Plural of لَبِيب: intelligent or discerning people.' },
          { term: 'أَلْبَاب · albāb', definition: 'Plural of لُبّ. In the Quran, this is the form in which the root ل ب ب appears.' },
        ] },
      },
      {
        id: 'branch',
        ru: { title: 'Другие словарные ветви', description: 'В том же корневом гнезде словари фиксируют и другие линии. Их полезно видеть, но не следует автоматически переносить их значения на أَلْبَاب.', items: [
          { term: 'لَبَب / لَبَّة', definition: 'Область верхней части груди, горла или места ожерелья.' },
          { term: 'تَلْبِيب / لَبَّبَ', definition: 'Собрать одежду у груди или схватить человека за ворот / переднюю часть одежды.' },
          { term: 'أَلَبَّ / لَبَّ بالمكان', definition: 'Оставаться, пребывать, держаться места.' },
          { term: 'تَلَبَّبَ', definition: 'Подпоясаться, собраться, приготовиться; в ряде употреблений — привести одежду в собранное положение у груди.' },
        ] },
        en: { title: 'Other lexical branches', description: 'The same root entry also records other lexical lines. They are useful to see, but their meanings should not automatically be transferred to أَلْبَاب.', items: [
          { term: 'لَبَب / لَبَّة', definition: 'The upper chest, throat area, or the place where a necklace rests.' },
          { term: 'تَلْبِيب / لَبَّبَ', definition: 'To gather clothing at the chest or seize someone by the collar/front of the garment.' },
          { term: 'أَلَبَّ / لَبَّ بالمكان', definition: 'To remain, stay, or keep to a place.' },
          { term: 'تَلَبَّبَ', definition: 'To gird oneself, gather oneself, or make ready; in some uses, to arrange clothing closely around the chest.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Кораническое раскрытие أَلْبَاب', description: 'В Коране أَلْبَاب встречается 16 раз и появляется рядом с напоминанием, размышлением, различением и распознаванием знамений.', items: [
          { term: 'تَذَكُّر · напоминание', definition: 'Способность воспринять напоминание и удержать его смысл.' },
          { term: 'تَدَبُّر · размышление', definition: 'Способность рассмотреть сказанное глубже и проследить его внутреннюю логику.' },
          { term: 'Распознавание знамений', definition: 'Увидеть в наблюдаемом не только внешнее событие, но и значение, на которое оно указывает.' },
          { term: 'Различение и выбор', definition: 'Сопоставить услышанное, распознать существенное и последовать лучшему.' },
        ] },
        en: { title: 'Quranic unfolding of أَلْبَاب', description: 'أَلْبَاب occurs 16 times in the Quran and repeatedly appears with remembrance, reflection, discernment, and recognition of signs.', items: [
          { term: 'تَذَكُّر · remembrance', definition: 'The capacity to receive a reminder and retain its meaning.' },
          { term: 'تَدَبُّر · reflection', definition: 'The capacity to examine what is said more deeply and follow its inner logic.' },
          { term: 'Recognising signs', definition: 'Seeing not only the outward event but also the meaning toward which it points.' },
          { term: 'Discernment and choice', definition: 'Comparing what is heard, recognising what is essential, and following what is best.' },
        ] },
      },
    ],
    distinction: {
      ru: '«Разум» передаёт общий уровень, но словарная семья ل ب ب добавляет образ внутренней чистой сердцевины и способности доходить до сути. Поэтому для أَلْبَاب в Quran Universe мы сохраняем более точное «глубокое разумение».',
      en: '“Intellect” conveys the broad level, while the ل ب ب lexical family adds the image of an inner pure core and the capacity to reach the essence. Quran Universe therefore keeps the more specific “deep understanding” for أَلْبَاب.',
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
      ru: { lead: 'Сердцевина, чистая или лучшая часть; применительно к человеку — разумение.', body: 'Физическое значение внутреннего ядра переходит в обозначение внутренней способности человека понимать и различать.' },
      en: { lead: 'Core, kernel, pure or choicest part; applied to a person, understanding.', body: 'The physical sense of an inner kernel extends to the inward human capacity for understanding and discernment.' },
    },
    meaningMap: [],
    structureSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    meaningSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb', 'raghibLbb'],
    related: ['albab', 'labib'],
  },

  labib: {
    pattern: 'فَعِيل', patternReading: 'faʿīl',
    structure: {
      ru: ['لَبِيب (labīb) — прилагательное от той же корневой семьи: человек, обладающий разумением.'],
      en: ['لَبِيب (labīb) is an adjective from the same root family: a person possessing understanding.'],
    },
    meaning: {
      ru: { lead: 'Разумный, обладающий глубоким пониманием.', body: 'Прилагательное переносит смысл لُبّ на человека: он характеризуется разумением, проницательностью и способностью видеть суть.' },
      en: { lead: 'Intelligent, possessing understanding.', body: 'The adjective applies the sense of لُبّ to a person: someone characterised by understanding, discernment, and the ability to grasp the essence.' },
    },
    meaningMap: [],
    structureSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    meaningSources: ['lisanLbb', 'jawhariLbb', 'laneLbb', 'arabicLexiconLbb'],
    related: ['lubb', 'albab'],
  },
}
