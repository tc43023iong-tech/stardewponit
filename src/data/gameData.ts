import { LevelInfo, SectionId, FarmDecoration } from '../types/game';

export const LEVEL_DEFINITIONS: Record<SectionId, LevelInfo> = {
  A: {
    id: 'A',
    sectionCode: 'Section A',
    name: 'Advice Village',
    subtitle: 'Choose the Best Advice!',
    instruction: 'Read the situation and choose the most suitable advice from the village elders.',
    bgImage: '/src/assets/images/pixel_advice_village_1793505143461.jpg',
    character: {
      name: 'Elder Lewis',
      role: 'Village Mayor',
      avatarType: 'mayor',
      greeting: 'Welcome to Advice Village, young farmer! Good citizens always offer wise, caring advice to their neighbours.'
    },
    totalQuestions: 5,
  },
  B: {
    id: 'B',
    sectionCode: 'Section B',
    name: 'Grammar Workshop',
    subtitle: 'Find the Mistake!',
    instruction: 'Each sentence has ONE mistake. Type the correct word to fix the woodworking blueprint.',
    bgImage: '/src/assets/images/pixel_grammar_workshop_1793505163524.jpg',
    character: {
      name: 'Robin',
      role: 'Master Carpenter',
      avatarType: 'craftsman',
      greeting: 'Look at these blueprints! Some words are bent out of shape. Help me forge the correct grammar!'
    },
    totalQuestions: 5,
  },
  D: {
    id: 'D',
    sectionCode: 'Section D',
    name: "Who's Forest",
    subtitle: 'The Magical WHO Forest',
    instruction: 'Combine the two sentences into ONE complete sentence using the relative pronoun WHO.',
    bgImage: '/src/assets/images/pixel_magic_forest_1793505143610.jpg',
    character: {
      name: 'Sylva',
      role: 'Forest Guardian',
      avatarType: 'forest_nymph',
      greeting: 'The ancient trees whisper in fragments! Connect their thoughts together using the magical word WHO.'
    },
    totalQuestions: 3,
  },
  E: {
    id: 'E',
    sectionCode: 'Section E',
    name: 'Fashion Boutique',
    subtitle: 'IN or WITH?',
    instruction: 'Choose IN or WITH to complete each sentence.',
    bgImage: '/src/assets/images/pixel_fashion_boutique_1793505162590.jpg',
    character: {
      name: 'Emily',
      role: 'Master Tailor',
      avatarType: 'fashion_rabbit',
      greeting: 'Welcome to my boutique! Dressing with style requires the right preposition—IN or WITH?'
    },
    grammarTip: {
      title: 'Grammar Rule: IN vs. WITH',
      rule: 'IN = clothing items (e.g., She is in a red dress).\nWITH = physical features, accessories or things someone has or uses (e.g., The girl with glasses).',
      example: 'Example: The boy IN the warm jacket WITH the shiny watch.'
    },
    totalQuestions: 8,
  },
  G: {
    id: 'G',
    sectionCode: 'Section G',
    name: 'Verb Transformation Farm',
    subtitle: 'The Magical Verb Farm',
    instruction: 'Complete the verb table by filling in the Past, Past Participle and Present Participle.',
    bgImage: '/src/assets/images/pixel_verb_farm_1793505163424.jpg',
    character: {
      name: 'Farmer Marnie',
      role: 'Ranch Caretaker',
      avatarType: 'farmer',
      greeting: 'Our crops grow as verbs transform! Harvest the correct past and participle forms.'
    },
    totalQuestions: 8,
  },
  H: {
    id: 'H',
    sectionCode: 'Section H',
    name: 'Vocabulary Treasure Mine',
    subtitle: 'The Six Hidden Treasures',
    instruction: 'Use each word ONLY ONCE to complete the sentences and unlock the crystal chests.',
    bgImage: '/src/assets/images/pixel_treasure_mine_1793505144718.jpg',
    character: {
      name: 'Marlon',
      role: 'Cave Miner',
      avatarType: 'miner',
      greeting: 'Six precious gems are locked deep in the cavern! Slot each vocabulary key into its rightful lock.'
    },
    totalQuestions: 6,
  },
  I: {
    id: 'I',
    sectionCode: 'Section I',
    name: 'Translation Library',
    subtitle: 'The Magical Translation Library',
    instruction: 'Translate English into Chinese and Chinese into English using accurate vocabulary.',
    bgImage: '/src/assets/images/pixel_fox_cottage_1793505144532.jpg',
    character: {
      name: 'Penny',
      role: 'Village Librarian',
      avatarType: 'librarian',
      greeting: 'Welcome to our ancient archive! Bilingual scholars can bridge the two languages with ease.'
    },
    totalQuestions: 4,
  },
  K: {
    id: 'K',
    sectionCode: 'Section K',
    name: 'Fox Family Cottage',
    subtitle: "The Little Foxes' Secret Mission",
    instruction: 'Complete the dialogue using SHOULD, SHOULDN’T and the correct adverb/verb form of words in brackets.',
    bgImage: '/src/assets/images/pixel_fox_cottage_1793505144532.jpg',
    character: {
      name: 'Rusty & Pip',
      role: 'Fox Siblings',
      avatarType: 'foxes',
      greeting: 'Shh! We are tidying the cottage quietly so we do not wake Mother Fox!'
    },
    totalQuestions: 7,
  },
};

// Section A Questions
export const SECTION_A_DATA = {
  options: [
    { key: 'A', text: 'You should discuss your idea with him.' },
    { key: 'B', text: 'We shouldn’t make fun of others.' },
    { key: 'C', text: 'You should not lie to her.' },
    { key: 'D', text: 'You should take care of him.' },
    { key: 'E', text: 'You should share your toys with her.' },
    { key: 'F', text: 'You should be nice to others.' },
  ],
  questions: [
    {
      id: 1,
      situation: 'I broke Grandma’s cup, but I told her that the dog did it.',
      correctKey: 'C',
      explanation: 'Telling someone a false story is lying. You should be honest and not lie to her.',
    },
    {
      id: 2,
      situation: 'My teammate and I have different ideas, and I feel angry.',
      correctKey: 'A',
      explanation: 'When working together, it is important to communicate calmly and discuss your ideas.',
    },
    {
      id: 3,
      situation: 'My cousin is crying because I won’t let her play with my toy cars.',
      correctKey: 'E',
      explanation: 'Sharing toys with family brings joy and stops quarrels.',
    },
    {
      id: 4,
      situation: 'A new pupil answered a question incorrectly, and some children laughed.',
      correctKey: 'B',
      explanation: 'Everyone makes mistakes when learning. We shouldn’t tease or make fun of classmates.',
    },
    {
      id: 5,
      situation: 'My little brother is sick.',
      correctKey: 'D',
      explanation: 'When a family member is unwell, we should look after them and take care of them.',
    },
  ],
};

// Section B Questions
export const SECTION_B_DATA = [
  {
    id: 1,
    sentence: 'They should finished their homework before playing games.',
    errorWord: 'finished',
    correctWord: 'finish',
    acceptedAnswers: ['finish'],
    correctedSentence: 'They should finish their homework before playing games.',
    ruleExplanation: 'After modal verbs like "should", always use the base form of the verb ("finish", not "finished").',
  },
  {
    id: 2,
    sentence: 'He should writes clearly so everyone can read his work.',
    errorWord: 'writes',
    correctWord: 'write',
    acceptedAnswers: ['write'],
    correctedSentence: 'He should write clearly so everyone can read his work.',
    ruleExplanation: 'After "should", use the bare infinitive / base form ("write", not "writes").',
  },
  {
    id: 3,
    sentence: 'The girl should jump the queue in the canteen.',
    errorWord: 'should',
    correctWord: 'should not',
    acceptedAnswers: ['should not', "shouldn't", 'shouldnt'],
    correctedSentence: 'The girl should not jump the queue in the canteen.',
    ruleExplanation: 'Jumping the queue is bad manners. She "should not" or "shouldn\'t" jump the queue.',
  },
  {
    id: 4,
    sentence: 'Speak polite when you ask the teacher for help.',
    errorWord: 'polite',
    correctWord: 'politely',
    acceptedAnswers: ['politely'],
    correctedSentence: 'Speak politely when you ask the teacher for help.',
    ruleExplanation: 'We need an adverb ("politely") to describe the action verb "speak", not an adjective ("polite").',
  },
  {
    id: 5,
    sentence: 'Jack should run noisily in the library.',
    errorWord: 'should',
    correctWord: 'should not',
    acceptedAnswers: ['should not', "shouldn't", 'shouldnt', 'not', 'quietly'],
    correctedSentence: 'Jack should not run noisily in the library.',
    ruleExplanation: 'Libraries are quiet study spaces. Jack "should not" make noise or run.',
  },
];

// Section D Questions
export const SECTION_D_DATA = [
  {
    id: 1,
    sentence1: 'This boy is crying.',
    sentence2: 'His name is Ben.',
    modelAnswer: 'The boy who is crying is Ben.',
    acceptableMatches: [
      'the boy who is crying is ben',
      'this boy who is crying is ben',
      'ben is the boy who is crying',
      'the boy who is crying is named ben',
      'this boy who is crying is named ben',
      'ben is the boy who is crying.',
      'the boy who is crying is ben.',
      "ben is the boy who's crying",
    ],
    hint: 'Start with "The boy who..." or "Ben is the boy who..."',
  },
  {
    id: 2,
    sentence1: 'The girl is wearing a blue dress.',
    sentence2: 'Her name is Lucy.',
    modelAnswer: 'The girl who is wearing a blue dress is Lucy.',
    acceptableMatches: [
      'the girl who is wearing a blue dress is lucy',
      'lucy is the girl who is wearing a blue dress',
      'the girl who is wearing a blue dress is named lucy',
      'the girl who is wearing a blue dress is lucy.',
      'lucy is the girl who is wearing a blue dress.',
      "lucy is the girl who's wearing a blue dress",
    ],
    hint: 'Combine both sentences into one using "who".',
  },
  {
    id: 3,
    sentence1: 'This man is tall and strong.',
    sentence2: 'His name is Mr Chan.',
    modelAnswer: 'The man who is tall and strong is Mr Chan.',
    acceptableMatches: [
      'the man who is tall and strong is mr chan',
      'this man who is tall and strong is mr chan',
      'mr chan is the man who is tall and strong',
      'the man who is tall and strong is named mr chan',
      'the man who is tall and strong is mr chan.',
      'mr chan is the man who is tall and strong.',
      'the man who is tall and strong is mr. chan',
      'mr. chan is the man who is tall and strong',
    ],
    hint: 'Identify the subject ("Mr Chan" or "The man") and connect with "who is tall and strong".',
  },
];

// Section E Questions
export const SECTION_E_DATA = [
  {
    id: 1,
    sentence: 'Mia walked into the school party ___ a beautiful blue dress and black sandals.',
    answer: 'in',
    focusItem: 'a beautiful blue dress and black sandals (clothing)',
    explanation: 'A dress and sandals are articles of clothing, so we use "IN".',
  },
  {
    id: 2,
    sentence: 'Look at that little boy ___ the adorable green sandals on his feet near the playground.',
    answer: 'with',
    focusItem: 'the adorable green sandals on his feet (item he has on his feet)',
    explanation: 'Here "with" indicates the item he has with him / on his feet.',
  },
  {
    id: 3,
    sentence: 'The boy ___ a shiny diamond ring on his finger smiled happily at his friends.',
    answer: 'with',
    focusItem: 'a shiny diamond ring (an accessory/item he has on his finger)',
    explanation: 'A diamond ring is an accessory someone possesses or wears on their finger, so we use "WITH".',
  },
  {
    id: 4,
    sentence: 'My aunt looks very handsome ___ her warm winter coat on this cold morning.',
    answer: 'in',
    focusItem: 'her warm winter coat (garment she is dressed in)',
    explanation: 'For a coat someone is wearing / dressed inside, use "IN".',
  },
  {
    id: 5,
    sentence: 'The woman ___ the dark sunglasses is our friendly Maths teacher from next door.',
    answer: 'with',
    focusItem: 'the dark sunglasses (eyewear accessory)',
    explanation: 'Glasses and sunglasses are accessories someone has/wears, so we use "WITH".',
  },
  {
    id: 6,
    sentence: 'The tired tourist ___ the heavy luggage asked for directions at the busy train station.',
    answer: 'with',
    focusItem: 'the heavy luggage (something they are carrying)',
    explanation: 'Luggage is an object the tourist is carrying, so we use "WITH".',
  },
  {
    id: 7,
    sentence: 'Mr Wong drew a long, straight line ___ a plastic ruler during our art lesson.',
    answer: 'with',
    focusItem: 'a plastic ruler (an instrument / tool used)',
    explanation: 'A ruler is a tool used to perform an action, so we use "WITH".',
  },
  {
    id: 8,
    sentence: 'Amy matched her new shoes ___ a colourful leather accessory for the school show.',
    answer: 'with',
    focusItem: 'a colourful leather accessory (paired item)',
    explanation: 'To match something with another item, we use the preposition "WITH".',
  },
];

// Section G Questions (Verb Table)
export const SECTION_G_DATA = [
  { id: 1, base: 'become', past: 'became', pastParticiple: 'become', presentParticiple: 'becoming' },
  { id: 2, base: 'break', past: 'broke', pastParticiple: 'broken', presentParticiple: 'breaking' },
  { id: 3, base: 'bring', past: 'brought', pastParticiple: 'brought', presentParticiple: 'bringing' },
  { id: 4, base: 'draw', past: 'drew', pastParticiple: 'drawn', presentParticiple: 'drawing' },
  { id: 5, base: 'come', past: 'came', pastParticiple: 'come', presentParticiple: 'coming' },
  { id: 6, base: 'cut', past: 'cut', pastParticiple: 'cut', presentParticiple: 'cutting' },
  { id: 7, base: 'do', past: 'did', pastParticiple: 'done', presentParticiple: 'doing' },
  { id: 8, base: 'cost', past: 'cost', pastParticiple: 'cost', presentParticiple: 'costing' },
];

// Section H Questions (Vocabulary Mine)
export const SECTION_H_WORDS = ['accessory', 'midnight', 'sandals', 'leader', 'diamond', 'skill'];

export const SECTION_H_DATA = [
  {
    id: 1,
    sentence: 'We love wearing ___ when the weather is hot.',
    answer: 'sandals',
    clue: 'Open summer footwear.',
  },
  {
    id: 2,
    sentence: 'This scarf is the perfect ___ to match your coat.',
    answer: 'accessory',
    clue: 'A decorative addition to an outfit.',
  },
  {
    id: 3,
    sentence: 'It is not healthy for pupils to eat heavy snacks at ___.',
    answer: 'midnight',
    clue: 'Twelve o’clock at night.',
  },
  {
    id: 4,
    sentence: 'Our team ___ always helps the coach clean the board.',
    answer: 'leader',
    clue: 'The head or captain of a group.',
  },
  {
    id: 5,
    sentence: 'Dr Darko and his gang are going to hide the ___ tonight.',
    answer: 'diamond',
    clue: 'A precious sparkling gemstone.',
  },
  {
    id: 6,
    sentence: 'Good drawing ___ can help you to make beautiful pictures.',
    answer: 'skill',
    clue: 'The ability to do something well through practice.',
  },
];

// Section I Questions (Translation Library)
export const SECTION_I_DATA = [
  {
    id: 1,
    prompt: 'Who’s the boy with the glasses?',
    type: 'EN_TO_ZH',
    modelAnswer: '那個戴眼鏡的男生是誰？',
    acceptableChineseKeywords: ['戴眼鏡', '戴著眼鏡', '戴鏡', '誰', '男生', '男孩', '男子'],
    explanation: 'with the glasses = 戴著眼鏡; who\'s the boy = 那個男生是誰？',
  },
  {
    id: 2,
    prompt: 'Kenny is the boy who has curly blonde hair.',
    type: 'EN_TO_ZH',
    modelAnswer: 'Kenny 是那個有一頭金色捲髮的男孩。',
    acceptableChineseKeywords: ['kenny', '肯尼', '金', '捲髮', '卷髮', '捲毛', '男孩', '男生'],
    explanation: 'who has curly blonde hair = 有金色捲髮的; boy = 男孩。',
  },
  {
    id: 3,
    prompt: '那個穿著黑色西裝的男生是誰？',
    type: 'ZH_TO_EN',
    modelAnswer: 'Who is the boy in the black suit?',
    acceptableEnglishMatches: [
      'who is the boy in the black suit',
      "who's the boy in the black suit",
      'who is the boy in a black suit',
      "who's the boy in a black suit",
      'who is the man in the black suit',
      "who's the man in the black suit",
      'who is the boy wearing a black suit',
      'who is the boy wearing the black suit',
    ],
    explanation: 'Use "IN" for clothing ("in the black suit") and "Who is the boy...?"',
  },
  {
    id: 4,
    prompt: 'Tom 是那個戴著連指手套的男生。',
    type: 'ZH_TO_EN',
    modelAnswer: 'Tom is the boy with the mittens.',
    acceptableEnglishMatches: [
      'tom is the boy with the mittens',
      'tom is the boy with mittens',
      'tom is the boy wearing mittens',
      'tom is the boy who is wearing mittens',
      'tom is the boy who has mittens',
      'tom is the boy wearing the mittens',
      'tom is the boy who is wearing the mittens',
    ],
    explanation: 'mittens = 連指手套. Use "with the mittens" or "wearing mittens".',
  },
];

// Section K Questions (Fox Cottage)
export const SECTION_K_WORDS = ['rude', 'tidy', 'polite', 'noisy', 'quick', 'quiet', 'careless'];

export const SECTION_K_DATA = {
  dialogueLines: [
    { speaker: 'Fox A', text: 'What are we doing in our home?' },
    {
      speaker: 'Fox B',
      text: 'Shh! You should not speak (1) [blank]. Our family is resting nearby!',
      blankIndex: 1,
      targetBaseWord: 'noisy',
      correctAnswer: 'noisily',
      acceptedAnswers: ['noisily'],
      hint: 'adverb from "noisy"',
    },
    {
      speaker: 'Fox B',
      text: 'We need to tidy the living room. Hurry, you (2) [blank] move (3) [blank].',
      blankIndex: 2,
      targetBaseWord: 'should',
      correctAnswer: 'should',
      acceptedAnswers: ['should'],
      hint: 'modal advice verb',
      secondaryBlank: {
        blankIndex: 3,
        targetBaseWord: 'quick',
        correctAnswer: 'quickly',
        acceptedAnswers: ['quickly'],
        hint: 'adverb from "quick"',
      },
    },
    {
      speaker: 'Fox B',
      text: 'We don’t want to behave (4) [blank] and knock over the flower vase.',
      blankIndex: 4,
      targetBaseWord: 'careless',
      correctAnswer: 'carelessly',
      acceptedAnswers: ['carelessly'],
      hint: 'adverb from "careless"',
    },
    {
      speaker: 'Fox B',
      text: 'You should walk (5) [blank], or our family will hear us.',
      blankIndex: 5,
      targetBaseWord: 'quiet',
      correctAnswer: 'quietly',
      acceptedAnswers: ['quietly'],
      hint: 'adverb from "quiet"',
    },
    { speaker: 'Fox A', text: 'Hand over that big cushion to me right now!' },
    {
      speaker: 'Fox B',
      text: 'You (6) [blank] speak rudely to me.',
      blankIndex: 6,
      targetBaseWord: 'should not',
      correctAnswer: "shouldn't",
      acceptedAnswers: ["shouldn't", 'should not', 'shouldnt'],
      hint: 'negative advice ("should not")',
    },
    {
      speaker: 'Fox A',
      text: 'I’m sorry! I (7) [blank] ask politely. May I please have that cushion?',
      blankIndex: 7,
      targetBaseWord: 'should',
      correctAnswer: 'should',
      acceptedAnswers: ['should'],
      hint: 'positive advice verb',
    },
    { speaker: 'Fox B', text: 'Of course! Here you go.' },
  ],
};

// Farm Decorations for Stardew Valley Farmstead
export const FARM_DECORATIONS: FarmDecoration[] = [
  {
    id: 'sunflower_patch',
    name: 'Sunny Sunflowers',
    category: 'crop',
    cost: 40,
    starRequirement: 1,
    description: 'Bright golden sunflowers that face the valley morning light.',
    pixelSvg: 'sunflower',
  },
  {
    id: 'starfruit_melon',
    name: 'Stardrop Melon',
    category: 'crop',
    cost: 70,
    starRequirement: 3,
    description: 'A plump, juicy giant melon sweet as starlight.',
    pixelSvg: 'melon',
  },
  {
    id: 'clucking_hen',
    name: 'Clucking Pixel Hen',
    category: 'animal',
    cost: 50,
    starRequirement: 2,
    description: 'Lays fresh golden eggs each morning behind the coop.',
    pixelSvg: 'chicken',
  },
  {
    id: 'fluffy_rabbit',
    name: 'Fluffy White Bunny',
    category: 'animal',
    cost: 80,
    starRequirement: 5,
    description: 'Loves fresh clover and hops around the carrot patch.',
    pixelSvg: 'rabbit',
  },
  {
    id: 'spotted_cow',
    name: 'Gentle Dairy Cow',
    category: 'animal',
    cost: 110,
    starRequirement: 8,
    description: 'Friendly farm cow that loves ear scratches and sweet hay.',
    pixelSvg: 'cow',
  },
  {
    id: 'wood_scarecrow',
    name: 'Valley Scarecrow',
    category: 'building',
    cost: 60,
    starRequirement: 4,
    description: 'Crafted with straw, a wooden post, and a cozy straw hat.',
    pixelSvg: 'scarecrow',
  },
  {
    id: 'wishing_well',
    name: 'Ancient Stone Well',
    category: 'building',
    cost: 120,
    starRequirement: 10,
    description: 'Draws fresh mineral water straight from the mountain spring.',
    pixelSvg: 'well',
  },
  {
    id: 'junimo_plush',
    name: 'Magic Junimo Figurine',
    category: 'special',
    cost: 150,
    starRequirement: 14,
    description: 'A friendly forest spirit bringing luck and harmony to your farm.',
    pixelSvg: 'junimo',
  },
];
