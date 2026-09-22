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
      ru: {
        lead: 'تَقْوَىٰ (taqwā) — состояние направленности к Аллаху, в котором память о Нём и Его присутствии, внимание к установленным Им границам и остережение от их нарушения направляют выбор человека.',
        body: 'Корень و ق ي сохраняет защитное ядро — оберегание и удерживание от вреда. Связанная форма ٱتَّقَىٰ (ittaqā) показывает активную позицию самого человека. Это объясняет механизм слова, но не создаёт один обязательный перевод для всех аятов. В 2:197 утверждённый русский перевод — «благочестие»; источник этого состояния раскрывается отдельно.',
      },
      en: {
        lead: 'تَقْوَىٰ (taqwā) names an orientation toward Allah in which remembrance of Him, attention to His boundaries, and guarding against crossing them shape a person’s choices.',
        body: 'The root و ق ي preserves the protective nucleus of guarding and preservation, while ٱتَّقَىٰ (ittaqā) shows the person actively taking that protective stance. This explains the semantic mechanism without forcing one universal translation. In 2:197 the approved context rendering is “piety”, with the source of that state explained separately.',
      },
    },
    meaningMap: [
      {
        id: 'mechanism',
        ru: { title: 'Источник состояния', description: 'Это не отдельный перевод слова, а внутренняя логика, из которой формируется поведение.', items: [
          { term: 'Память об Аллахе и Его присутствии', definition: 'Человек держит в памяти, перед Кем он живёт и делает выбор.', connector: 'обращает внимание на границы' },
          { term: 'Осознание Его границ', definition: 'Человек понимает установленные Аллахом пределы и соотносит с ними свои решения.', connector: 'ведёт к остережению' },
          { term: 'Остережение', definition: 'Зная это, человек остерегается нарушать установленные границы и совершать зло.' },
        ] },
        en: { title: 'Source of the state', description: 'This is not a separate translation but the inner logic from which conduct develops.', items: [
          { term: 'Remembrance of Allah and His presence', definition: 'A person keeps in mind before Whom they live and make choices.', connector: 'directs attention to boundaries' },
          { term: 'Awareness of His boundaries', definition: 'The person recognises the limits established by Allah and measures choices against them.', connector: 'leads to guarding' },
          { term: 'Guarding oneself', definition: 'With that awareness, the person guards against crossing those boundaries and doing evil.' },
        ] },
      },
      {
        id: 'component',
        ru: { title: 'Кораническое раскрытие', description: 'В 2:2–5 Коран описывает المُتَّقِينَ через признаки и действия; это контекстное раскрытие людей, а не словарная дефиниция taqwā.', items: [
          { term: 'Вера в сокрытое — الغيب (al-ghayb)', definition: 'Признание реальности за пределами непосредственного чувственного восприятия, известной через откровение.' },
          { term: 'Убеждённость в Последней жизни — الآخرة (al-ākhirah)', definition: 'Осознание продолжения жизни после земного этапа и ответственности за выбор.' },
          { term: 'Вера в откровение', definition: 'Доверие руководству, которое Аллах сообщает через откровение.' },
          { term: 'Внимание к установленным границам', definition: 'Соотнесение выбора с тем, что дозволено и запрещено.' },
        ] },
        en: { title: 'Quranic unfolding', description: 'In 2:2–5 the Quran describes المُتَّقِينَ through traits and actions; this describes the people in context rather than serving as a dictionary definition of taqwā.', items: [
          { term: 'Belief in the unseen — الغيب (al-ghayb)', definition: 'Acknowledging realities beyond immediate sensory perception and known through revelation.' },
          { term: 'Certainty in the Hereafter — الآخرة (al-ākhirah)', definition: 'Awareness of life beyond the earthly stage and responsibility for one’s choices.' },
          { term: 'Faith in revelation', definition: 'Trusting the guidance communicated by Allah through revelation.' },
          { term: 'Attention to established boundaries', definition: 'Measuring one’s choices against what is permitted and prohibited.' },
        ] },
      },
      {
        id: 'manifestation',
        ru: { title: 'Поведение', description: 'Внутренняя направленность становится видимой в поступках.', items: [
          { term: 'Молитва', definition: 'Регулярное обращение к Аллаху через установленную молитву.' },
          { term: 'Расходование из дарованного', definition: 'Готовность делиться из того, чем Аллах наделил человека.' },
          { term: 'Праведные поступки', definition: 'Поступки, соответствующие руководству; это описание поведения, а не полный перевод taqwā.' },
        ] },
        en: { title: 'Conduct', description: 'The inward orientation becomes visible in action.', items: [
          { term: 'Prayer', definition: 'Regularly turning to Allah through established prayer.' },
          { term: 'Spending from what has been provided', definition: 'Sharing from what Allah has provided.' },
          { term: 'Righteous conduct', definition: 'Actions aligned with guidance; this describes conduct rather than serving as a complete translation of taqwā.' },
        ] },
      },
      {
        id: 'result',
        ru: { title: 'Следствия', description: 'В 2:5 после описания المُتَّقِينَ названы результаты этой направленности.', items: [
          { term: 'Руководство от Господа', definition: 'Человек находится на пути руководства, которое помогает ему видеть направление и делать дальнейший выбор.' },
          { term: 'Успех — الفلاح (al-falāḥ)', definition: 'Благой исход, связанный со следованием руководству.' },
          { term: 'Оберегание', definition: 'Защитный смысл корня проявляется в том, что человек удерживается от того, что ведёт к вреду.' },
        ] },
        en: { title: 'Outcomes', description: 'After describing المُتَّقِينَ, 2:5 names the outcomes of this orientation.', items: [
          { term: 'Guidance from their Lord', definition: 'The person remains upon guidance that helps them recognise direction and make further choices.' },
          { term: 'Success — الفلاح (al-falāḥ)', definition: 'A good outcome associated with following guidance.' },
          { term: 'Protection', definition: 'The protective sense of the root appears in being held back from what leads to harm.' },
        ] },
      },
    ],
    translationNotes: {
      ru: [
        {
          tone: 'positive',
          title: 'В 2:197 — «благочестие»',
          text: '«Благочестие» передаёт почитание Всевышнего и поведение, соответствующее этому почитанию. В taqwā источник такого состояния раскрывается отдельно: память об Аллахе и Его присутствии, осознание Его границ и остережение от их нарушения.',
        },
        {
          tone: 'warning',
          title: '«Осознанность» — не самостоятельный перевод',
          text: 'Осознанность может описывать часть внутреннего механизма, но по-русски не передаёт всего состояния и направленности к послушанию. Поэтому она используется в объяснении источника, а не как замена слова taqwā.',
        },
      ],
      en: [
        {
          tone: 'positive',
          title: 'In 2:197 — “piety”',
          text: '“Piety” is used as the context rendering. The source of that state is explained separately through remembrance of Allah, attention to His boundaries, and guarding against crossing them.',
        },
        {
          tone: 'warning',
          title: 'Awareness is explanatory, not a universal gloss',
          text: 'Awareness can describe part of the inward mechanism, but it does not by itself exhaust the Quranic concept or establish one universal English rendering.',
        },
      ],
    },
    distinction: {
      ru: 'تَقْوَىٰ (taqwā) называет состояние/качество. Его защитное ядро приходит от و ق ي (w-q-y) и ٱتَّقَىٰ (ittaqā); конкретный перевод выбирается по контексту аята.',
      en: 'تَقْوَىٰ (taqwā) names a state/quality. Its protective nucleus comes from و ق ي (w-q-y) and ٱتَّقَىٰ (ittaqā); the surface translation is chosen from the context of the ayah.',
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
