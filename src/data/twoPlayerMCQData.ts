import { SectionId } from '../types/game';

export interface MCQQuestion {
  id: number;
  prompt: string;
  subPrompt?: string;
  context?: string;
  options: Array<{
    key: string;
    text: string;
  }>;
  correctKey: string;
  explanation: string;
}

export const TWO_PLAYER_MCQ_DATA: Record<SectionId, MCQQuestion[]> = {
  // Section A: Advice Village (5 questions)
  A: [
    {
      id: 1,
      prompt: 'I broke Grandma’s cup, but I told her that the dog did it.',
      subPrompt: 'Choose the most suitable advice:',
      options: [
        { key: 'A', text: 'You should discuss your idea with him.' },
        { key: 'B', text: 'We shouldn’t make fun of others.' },
        { key: 'C', text: 'You should not lie to her.' },
        { key: 'D', text: 'You should take care of him.' },
      ],
      correctKey: 'C',
      explanation: 'Telling someone a false story is lying. You should be honest and not lie to her.',
    },
    {
      id: 2,
      prompt: 'My teammate and I have different ideas, and I feel angry.',
      subPrompt: 'Choose the most suitable advice:',
      options: [
        { key: 'A', text: 'You should discuss your idea with him.' },
        { key: 'B', text: 'We shouldn’t make fun of others.' },
        { key: 'C', text: 'You should not lie to her.' },
        { key: 'E', text: 'You should share your toys with her.' },
      ],
      correctKey: 'A',
      explanation: 'When working together, it is important to communicate calmly and discuss ideas.',
    },
    {
      id: 3,
      prompt: 'My cousin is crying because I won’t let her play with my toy cars.',
      subPrompt: 'Choose the most suitable advice:',
      options: [
        { key: 'B', text: 'We shouldn’t make fun of others.' },
        { key: 'D', text: 'You should take care of him.' },
        { key: 'E', text: 'You should share your toys with her.' },
        { key: 'F', text: 'You should be nice to others.' },
      ],
      correctKey: 'E',
      explanation: 'Sharing toys with your cousin brings joy and stops quarrels.',
    },
    {
      id: 4,
      prompt: 'A new pupil answered a question incorrectly, and some children laughed.',
      subPrompt: 'Choose the most suitable advice:',
      options: [
        { key: 'A', text: 'You should discuss your idea with him.' },
        { key: 'B', text: 'We shouldn’t make fun of others.' },
        { key: 'C', text: 'You should not lie to her.' },
        { key: 'D', text: 'You should take care of him.' },
      ],
      correctKey: 'B',
      explanation: 'Everyone makes mistakes when learning. We shouldn’t tease or make fun of classmates.',
    },
    {
      id: 5,
      prompt: 'My little brother is sick.',
      subPrompt: 'Choose the most suitable advice:',
      options: [
        { key: 'A', text: 'You should discuss your idea with him.' },
        { key: 'B', text: 'We shouldn’t make fun of others.' },
        { key: 'C', text: 'You should not lie to her.' },
        { key: 'D', text: 'You should take care of him.' },
      ],
      correctKey: 'D',
      explanation: 'When a family member is unwell, we should look after them and take care of him.',
    },
  ],

  // Section B: Grammar Workshop (Find the mistake - Multiple Choice)
  B: [
    {
      id: 1,
      prompt: 'They should finished their homework before playing games.',
      subPrompt: 'Choose the correct replacement for "finished":',
      options: [
        { key: 'A', text: 'finish' },
        { key: 'B', text: 'finishes' },
        { key: 'C', text: 'finishing' },
        { key: 'D', text: 'finished' },
      ],
      correctKey: 'A',
      explanation: 'After modal verbs like "should", always use the base form of the verb ("finish").',
    },
    {
      id: 2,
      prompt: 'He should writes clearly so everyone can read his work.',
      subPrompt: 'Choose the correct replacement for "writes":',
      options: [
        { key: 'A', text: 'write' },
        { key: 'B', text: 'wrote' },
        { key: 'C', text: 'written' },
        { key: 'D', text: 'writing' },
      ],
      correctKey: 'A',
      explanation: 'After "should", use the base form ("write", not "writes").',
    },
    {
      id: 3,
      prompt: 'The girl should jump the queue in the canteen.',
      subPrompt: 'Choose the correct replacement for "should":',
      options: [
        { key: 'A', text: 'should not' },
        { key: 'B', text: 'must' },
        { key: 'C', text: 'should' },
        { key: 'D', text: 'would' },
      ],
      correctKey: 'A',
      explanation: 'Jumping the queue is bad manners. She should not jump the queue.',
    },
    {
      id: 4,
      prompt: 'Speak polite when you ask the teacher for help.',
      subPrompt: 'Choose the correct replacement for "polite":',
      options: [
        { key: 'A', text: 'politely' },
        { key: 'B', text: 'politeness' },
        { key: 'C', text: 'impolite' },
        { key: 'D', text: 'politer' },
      ],
      correctKey: 'A',
      explanation: 'We need an adverb ("politely") to modify the action verb "speak".',
    },
    {
      id: 5,
      prompt: 'Jack should run noisily in the library.',
      subPrompt: 'Choose the correct replacement for "should":',
      options: [
        { key: 'A', text: 'should not' },
        { key: 'B', text: 'should' },
        { key: 'C', text: 'will' },
        { key: 'D', text: 'can' },
      ],
      correctKey: 'A',
      explanation: 'Libraries are quiet spaces. Jack should not run noisily.',
    },
  ],

  // Section D: Who's Forest (Sentence combination with who - Multiple Choice)
  D: [
    {
      id: 1,
      prompt: 'Sentence 1: This boy is crying. / Sentence 2: His name is Ben.',
      subPrompt: 'Choose the sentence that correctly combines them using "who":',
      options: [
        { key: 'A', text: 'The boy who is crying is Ben.' },
        { key: 'B', text: 'The boy who name is Ben is crying.' },
        { key: 'C', text: 'This boy who he is crying is Ben.' },
        { key: 'D', text: 'Ben who the boy is crying.' },
      ],
      correctKey: 'A',
      explanation: '"The boy who is crying is Ben." correctly connects the two thoughts with "who".',
    },
    {
      id: 2,
      prompt: 'Sentence 1: The girl is wearing a blue dress. / Sentence 2: Her name is Lucy.',
      subPrompt: 'Choose the sentence that correctly combines them using "who":',
      options: [
        { key: 'A', text: 'The girl who is wearing a blue dress is Lucy.' },
        { key: 'B', text: 'The girl who wearing a blue dress is her name Lucy.' },
        { key: 'C', text: 'Lucy is the girl who she wears a blue dress.' },
        { key: 'D', text: 'The girl who blue dress is wearing Lucy.' },
      ],
      correctKey: 'A',
      explanation: '"The girl who is wearing a blue dress is Lucy." combines them with proper relative pronoun usage.',
    },
    {
      id: 3,
      prompt: 'Sentence 1: This man is tall and strong. / Sentence 2: His name is Mr Chan.',
      subPrompt: 'Choose the sentence that correctly combines them using "who":',
      options: [
        { key: 'A', text: 'The man who is tall and strong is Mr Chan.' },
        { key: 'B', text: 'Mr Chan is the man who he is tall and strong.' },
        { key: 'C', text: 'This man who his name is Mr Chan is tall.' },
        { key: 'D', text: 'The man who is strong and tall Mr Chan.' },
      ],
      correctKey: 'A',
      explanation: '"The man who is tall and strong is Mr Chan." is grammatically sound and complete.',
    },
  ],

  // Section E: Fashion Boutique (in vs with - Multiple Choice)
  E: [
    {
      id: 1,
      prompt: 'Mia walked into the school party ___ a beautiful blue dress and black sandals.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'in',
      explanation: 'A dress and sandals are articles of clothing, so we use "in".',
    },
    {
      id: 2,
      prompt: 'Look at that little boy ___ the adorable green sandals on his feet near the playground.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'Here "with" indicates the items he has on his feet.',
    },
    {
      id: 3,
      prompt: 'The boy ___ a shiny diamond ring on his finger smiled happily at his friends.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'A diamond ring is an accessory someone has on their finger, so use "with".',
    },
    {
      id: 4,
      prompt: 'My aunt looks very handsome ___ her warm winter coat on this cold morning.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'in',
      explanation: 'A coat is a garment she is dressed in, so use "in".',
    },
    {
      id: 5,
      prompt: 'The woman ___ the dark sunglasses is our friendly Maths teacher from next door.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'Sunglasses are an accessory someone wears/has, so use "with".',
    },
    {
      id: 6,
      prompt: 'The tired tourist ___ the heavy luggage asked for directions at the busy train station.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'Luggage is an object carried, so use "with".',
    },
    {
      id: 7,
      prompt: 'Mr Wong drew a long, straight line ___ a plastic ruler during our art lesson.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'A ruler is a tool used to do an action, so use "with".',
    },
    {
      id: 8,
      prompt: 'Amy matched her new shoes ___ a colourful leather accessory for the school show.',
      subPrompt: 'Choose in or with:',
      options: [
        { key: 'in', text: 'in (clothing items)' },
        { key: 'with', text: 'with (accessories or features)' },
      ],
      correctKey: 'with',
      explanation: 'To match something with another item, use "with".',
    },
  ],

  // Section G: Verb Transformation Farm (8 verbs - Multiple Choice table rows)
  G: [
    {
      id: 1,
      prompt: 'Base verb: become',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'became · become · becoming' },
        { key: 'B', text: 'becomed · become · becoming' },
        { key: 'C', text: 'became · became · becomed' },
        { key: 'D', text: 'become · became · becoming' },
      ],
      correctKey: 'A',
      explanation: 'become → became (past) → become (past participle) → becoming (present participle)',
    },
    {
      id: 2,
      prompt: 'Base verb: break',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'broke · broken · breaking' },
        { key: 'B', text: 'breaked · broken · breaking' },
        { key: 'C', text: 'broke · broked · breaking' },
        { key: 'D', text: 'broken · broke · breaking' },
      ],
      correctKey: 'A',
      explanation: 'break → broke → broken → breaking',
    },
    {
      id: 3,
      prompt: 'Base verb: bring',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'brought · brought · bringing' },
        { key: 'B', text: 'brang · brung · bringing' },
        { key: 'C', text: 'brought · bringed · bringing' },
        { key: 'D', text: 'brought · broughten · bringing' },
      ],
      correctKey: 'A',
      explanation: 'bring → brought → brought → bringing',
    },
    {
      id: 4,
      prompt: 'Base verb: draw',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'drew · drawn · drawing' },
        { key: 'B', text: 'drawed · drawen · drawing' },
        { key: 'C', text: 'drew · drew · drawing' },
        { key: 'D', text: 'drawn · drew · drawing' },
      ],
      correctKey: 'A',
      explanation: 'draw → drew → drawn → drawing',
    },
    {
      id: 5,
      prompt: 'Base verb: come',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'came · come · coming' },
        { key: 'B', text: 'comed · comed · comeing' },
        { key: 'C', text: 'came · came · coming' },
        { key: 'D', text: 'come · came · comeing' },
      ],
      correctKey: 'A',
      explanation: 'come → came → come → coming',
    },
    {
      id: 6,
      prompt: 'Base verb: cut',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'cut · cut · cutting' },
        { key: 'B', text: 'cutted · cutted · cutting' },
        { key: 'C', text: 'cut · cutted · cuting' },
        { key: 'D', text: 'cut · cut · cuting' },
      ],
      correctKey: 'A',
      explanation: 'cut → cut → cut → cutting (double "t")',
    },
    {
      id: 7,
      prompt: 'Base verb: do',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'did · done · doing' },
        { key: 'B', text: 'did · did · doing' },
        { key: 'C', text: 'done · did · doing' },
        { key: 'D', text: 'doed · done · doing' },
      ],
      correctKey: 'A',
      explanation: 'do → did → done → doing',
    },
    {
      id: 8,
      prompt: 'Base verb: cost',
      subPrompt: 'Choose the correct past, past participle, and present participle:',
      options: [
        { key: 'A', text: 'cost · cost · costing' },
        { key: 'B', text: 'costed · costed · costing' },
        { key: 'C', text: 'cost · costed · costing' },
        { key: 'D', text: 'costed · cost · costing' },
      ],
      correctKey: 'A',
      explanation: 'cost → cost → cost → costing',
    },
  ],

  // Section H: Vocabulary Treasure Mine (6 questions - Multiple Choice)
  H: [
    {
      id: 1,
      prompt: 'We love wearing ___ when the weather is hot.',
      options: [
        { key: 'A', text: 'sandals' },
        { key: 'B', text: 'accessory' },
        { key: 'C', text: 'midnight' },
        { key: 'D', text: 'diamond' },
      ],
      correctKey: 'A',
      explanation: 'Sandals are open footwear ideal for hot summer days.',
    },
    {
      id: 2,
      prompt: 'This scarf is the perfect ___ to match your coat.',
      options: [
        { key: 'A', text: 'accessory' },
        { key: 'B', text: 'sandals' },
        { key: 'C', text: 'skill' },
        { key: 'D', text: 'leader' },
      ],
      correctKey: 'A',
      explanation: 'An accessory is a decorative addition to complement an outfit.',
    },
    {
      id: 3,
      prompt: 'It is not healthy for pupils to eat heavy snacks at ___.',
      options: [
        { key: 'A', text: 'midnight' },
        { key: 'B', text: 'leader' },
        { key: 'C', text: 'accessory' },
        { key: 'D', text: 'sandals' },
      ],
      correctKey: 'A',
      explanation: 'Midnight is 12 o\'clock at night, when the digestive system needs rest.',
    },
    {
      id: 4,
      prompt: 'Our team ___ always helps the coach clean the board.',
      options: [
        { key: 'A', text: 'leader' },
        { key: 'B', text: 'diamond' },
        { key: 'C', text: 'skill' },
        { key: 'D', text: 'midnight' },
      ],
      correctKey: 'A',
      explanation: 'A team leader takes responsibility and guides teammates.',
    },
    {
      id: 5,
      prompt: 'Dr Darko and his gang are going to hide the ___ tonight.',
      options: [
        { key: 'A', text: 'diamond' },
        { key: 'B', text: 'accessory' },
        { key: 'C', text: 'sandals' },
        { key: 'D', text: 'leader' },
      ],
      correctKey: 'A',
      explanation: 'A diamond is a precious sparkling gemstone.',
    },
    {
      id: 6,
      prompt: 'Good drawing ___ can help you to make beautiful pictures.',
      options: [
        { key: 'A', text: 'skill' },
        { key: 'B', text: 'midnight' },
        { key: 'C', text: 'diamond' },
        { key: 'D', text: 'accessory' },
      ],
      correctKey: 'A',
      explanation: 'Skill is the learned ability to perform an art or task with precision.',
    },
  ],

  // Section I: Translation Library (4 questions - Multiple Choice)
  I: [
    {
      id: 1,
      prompt: 'Who’s the boy with the glasses?',
      subPrompt: 'Choose the correct Traditional Chinese translation:',
      options: [
        { key: 'A', text: '那個戴眼鏡的男生是誰？' },
        { key: 'B', text: '那個拿著玻璃杯的男生是誰？' },
        { key: 'C', text: '誰是那個穿西裝的男生？' },
        { key: 'D', text: '那個戴眼鏡的女孩是誰？' },
      ],
      correctKey: 'A',
      explanation: 'with the glasses = 戴著眼鏡; who’s the boy = 那個男生是誰？',
    },
    {
      id: 2,
      prompt: 'Kenny is the boy who has curly blonde hair.',
      subPrompt: 'Choose the correct Traditional Chinese translation:',
      options: [
        { key: 'A', text: 'Kenny 是那個有一頭金色捲髮的男孩。' },
        { key: 'B', text: 'Kenny 是那個有一頭黑色直髮的男孩。' },
        { key: 'C', text: '肯尼是那個穿著金色外套的男孩。' },
        { key: 'D', text: 'Kenny 是那個戴著帽子和眼鏡的男孩。' },
      ],
      correctKey: 'A',
      explanation: 'curly blonde hair = 金色捲髮; boy = 男孩。',
    },
    {
      id: 3,
      prompt: '那個穿著黑色西裝的男生是誰？',
      subPrompt: 'Choose the correct English translation:',
      options: [
        { key: 'A', text: 'Who is the boy in the black suit?' },
        { key: 'B', text: 'Who is the boy with the black shoes?' },
        { key: 'C', text: 'Who is the girl in the black coat?' },
        { key: 'D', text: 'Which boy is wearing black trousers?' },
      ],
      correctKey: 'A',
      explanation: 'Use "in" for clothing articles ("in the black suit").',
    },
    {
      id: 4,
      prompt: 'Tom 是那個戴著連指手套的男生。',
      subPrompt: 'Choose the correct English translation:',
      options: [
        { key: 'A', text: 'Tom is the boy with the mittens.' },
        { key: 'B', text: 'Tom is the boy in the mittens.' },
        { key: 'C', text: 'Tom is the boy with the glasses.' },
        { key: 'D', text: 'Tom is the boy who wears a scarf.' },
      ],
      correctKey: 'A',
      explanation: 'mittens = 連指手套; use "with the mittens".',
    },
  ],

  // Section K: Fox Family Cottage (7 blanks - Multiple Choice)
  K: [
    {
      id: 1,
      prompt: 'Fox B: "Shh! You should not speak (1) [____]. Our family is resting nearby!"',
      subPrompt: 'Choose the correct form of "noisy":',
      options: [
        { key: 'A', text: 'noisily' },
        { key: 'B', text: 'noisy' },
        { key: 'C', text: 'noisier' },
        { key: 'D', text: 'noisiness' },
      ],
      correctKey: 'A',
      explanation: 'We need the adverb "noisily" to describe how you should not speak.',
    },
    {
      id: 2,
      prompt: 'Fox B: "We need to tidy the living room. Hurry, you (2) [____] move quickly."',
      subPrompt: 'Choose should or shouldn’t:',
      options: [
        { key: 'A', text: 'should' },
        { key: 'B', text: "shouldn't" },
        { key: 'C', text: 'could not' },
        { key: 'D', text: 'cannot' },
      ],
      correctKey: 'A',
      explanation: 'Fox B is giving positive advice to hurry: you "should" move quickly.',
    },
    {
      id: 3,
      prompt: 'Fox B: "Hurry, you should move (3) [____]."',
      subPrompt: 'Choose the correct form of "quick":',
      options: [
        { key: 'A', text: 'quickly' },
        { key: 'B', text: 'quick' },
        { key: 'C', text: 'quicker' },
        { key: 'D', text: 'quickness' },
      ],
      correctKey: 'A',
      explanation: 'We need the adverb "quickly" to describe the movement verb "move".',
    },
    {
      id: 4,
      prompt: 'Fox B: "We don’t want to behave (4) [____] and knock over the flower vase."',
      subPrompt: 'Choose the correct form of "careless":',
      options: [
        { key: 'A', text: 'carelessly' },
        { key: 'B', text: 'careless' },
        { key: 'C', text: 'caring' },
        { key: 'D', text: 'careful' },
      ],
      correctKey: 'A',
      explanation: 'We need the adverb "carelessly" to describe the verb "behave".',
    },
    {
      id: 5,
      prompt: 'Fox B: "You should walk (5) [____], or our family will hear us."',
      subPrompt: 'Choose the correct form of "quiet":',
      options: [
        { key: 'A', text: 'quietly' },
        { key: 'B', text: 'quiet' },
        { key: 'C', text: 'quieter' },
        { key: 'D', text: 'quietness' },
      ],
      correctKey: 'A',
      explanation: 'We need the adverb "quietly" to modify "walk".',
    },
    {
      id: 6,
      prompt: 'Fox A: "Hand over that big cushion to me right now!"\nFox B: "You (6) [____] speak rudely to me."',
      subPrompt: 'Choose the correct advice verb:',
      options: [
        { key: 'A', text: "shouldn't" },
        { key: 'B', text: 'should' },
        { key: 'C', text: 'must' },
        { key: 'D', text: 'always' },
      ],
      correctKey: 'A',
      explanation: 'Rude behavior is unacceptable: you "shouldn\'t" speak rudely.',
    },
    {
      id: 7,
      prompt: 'Fox A: "I’m sorry! I (7) [____] ask politely. May I please have that cushion?"',
      subPrompt: 'Choose the correct advice verb:',
      options: [
        { key: 'A', text: 'should' },
        { key: 'B', text: "shouldn't" },
        { key: 'C', text: 'cannot' },
        { key: 'D', text: 'never' },
      ],
      correctKey: 'A',
      explanation: 'Fox A recognizes the right thing to do: I "should" ask politely.',
    },
  ],
};
