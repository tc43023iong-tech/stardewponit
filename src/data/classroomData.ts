import { ClassroomClass, PointPreset } from '../types/classroom';
import rawClasses from './referenceClasses.json';

// Positive presets from reference site
export const POSITIVE_PRESETS: PointPreset[] = [
  { id: 'pos_1', labelZh: '小鼓勵', labelEn: 'Small encouragement', points: 1, type: 'positive', icon: '🌱' },
  { id: 'pos_2', labelZh: '積極參與', labelEn: 'Good participation', points: 2, type: 'positive', icon: '🙋‍♂️' },
  { id: 'pos_3', labelZh: '讚讚讚～', labelEn: 'Amazing amazing!', points: 3, type: 'positive', icon: '👍' },
  { id: 'pos_4', labelZh: '尊重容老師！', labelEn: 'Respect Miss Iong!', points: 5, type: 'positive', icon: '👩‍🏫' },
  { id: 'pos_5', labelZh: '你太讓容老師高興了😊！', labelEn: 'You made Miss Iong so happy! 😊', points: 7, type: 'positive', icon: '❤️' },
  { id: 'pos_6', labelZh: '知錯能改，讚讚讚！', labelEn: 'Correcting mistakes, great job!', points: 8, type: 'positive', icon: '🌟' },
  { id: 'pos_7', labelZh: '你簡直太棒了🥳👍！', labelEn: 'You are simply amazing 🥳👍!', points: 10, type: 'positive', icon: '🏆' },
  { id: 'pos_8', labelZh: '提前完成作業', labelEn: 'Early homework completion', points: 15, type: 'positive', icon: '📝' },
  { id: 'pos_9', labelZh: '你超級無敵棒！！！！！', labelEn: 'You are super duper amazing!!!!!', points: 20, type: 'positive', icon: '🌈' },
  { id: 'pos_10', labelZh: '不得了！不得了！', labelEn: 'Unbelievable! Amazing!', points: 30, type: 'positive', icon: '⚡' },
  { id: 'pos_11', labelZh: '啦啦啦～你治癒了老師', labelEn: 'La la la~ You healed the teacher', points: 40, type: 'positive', icon: '🎶' },
  { id: 'pos_12', labelZh: '做得好，給你加分無需理由！', labelEn: 'Good job, giving you points needs no reason!', points: 50, type: 'positive', icon: '🎁' },
  { id: 'pos_13', labelZh: '你真是無可挑剔，完美至極！', labelEn: 'You are truly impeccable and beyond perfection!', points: 60, type: 'positive', icon: '💎' },
  { id: 'pos_14', labelZh: '老師可太喜歡你了！', labelEn: 'Miss Iong loves you so much!', points: 70, type: 'positive', icon: '💖' },
  { id: 'pos_15', labelZh: '優秀優秀優秀！', labelEn: 'Outstanding and brilliant!', points: 80, type: 'positive', icon: '🏅' },
  { id: 'pos_16', labelZh: '還有誰比你棒？', labelEn: 'Who is better than you?', points: 90, type: 'positive', icon: '👑' },
  { id: 'pos_17', labelZh: '恭喜你，+100分！', labelEn: 'Congratulations, +100 points!', points: 100, type: 'positive', icon: '💯' },
];

// Negative presets from reference site
export const NEGATIVE_PRESETS: PointPreset[] = [
  { id: 'neg_1', labelZh: '溫馨提示', labelEn: 'Gentle reminder', points: -1, type: 'negative', icon: '⚠️' },
  { id: 'neg_2', labelZh: '小懲大戒', labelEn: 'Small punishment, big warning', points: -2, type: 'negative', icon: '🔨' },
  { id: 'neg_3', labelZh: '態度欠佳', labelEn: 'Bad attitude', points: -3, type: 'negative', icon: '😒' },
  { id: 'neg_4', labelZh: '過於吵鬧', labelEn: 'Noisy', points: -5, type: 'negative', icon: '📢' },
  { id: 'neg_5', labelZh: '離開座位', labelEn: 'Leaving seat', points: -5, type: 'negative', icon: '🏃' },
  { id: 'neg_6', labelZh: '不舉手發言，0禮貌', labelEn: 'Speaking without raising hand, zero manners', points: -5, type: 'negative', icon: '🤐' },
  { id: 'neg_7', labelZh: '坐姿差', labelEn: 'Poor sitting posture', points: -6, type: 'negative', icon: '🪑' },
  { id: 'neg_8', labelZh: '胡亂說話或影響他人學習！', labelEn: "Talking nonsense or disturbing others' learning!", points: -10, type: 'negative', icon: '🗣️' },
  { id: 'neg_9', labelZh: '對容老師無禮', labelEn: 'Disrespectful to Miss Iong', points: -10, type: 'negative', icon: '🚫' },
  { id: 'neg_10', labelZh: '欠交作業', labelEn: 'Missing homework', points: -20, type: 'negative', icon: '📄' },
  { id: 'neg_11', labelZh: '你太令容老師失望了😢！', labelEn: 'You disappointed Miss Iong! 😢', points: -20, type: 'negative', icon: '😢' },
  { id: 'neg_12', labelZh: '完蛋了，完蛋了...', labelEn: "Oh no, it's over...", points: -30, type: 'negative', icon: '💥' },
  { id: 'neg_13', labelZh: '屢勸不改，態度惡劣', labelEn: 'Repeated warnings, bad attitude', points: -40, type: 'negative', icon: '🛑' },
  { id: 'neg_14', labelZh: '扣你分已無需理由！', labelEn: 'Deducting your points needs no reason!', points: -50, type: 'negative', icon: '⚡' },
  { id: 'neg_15', labelZh: '🚽 我要喝水/去洗手間..所以扣50分，2個月不能換頭像背景.', labelEn: 'Asking for water/toilet...', points: -50, type: 'negative', icon: '🚽' },
  { id: 'neg_16', labelZh: '需要懲罰來讓你清醒！', labelEn: 'Need punishment to sober you up!', points: -60, type: 'negative', icon: '❄️' },
  { id: 'neg_17', labelZh: '還需繼續努力啊！', labelEn: 'Still need to keep working hard!', points: -70, type: 'negative', icon: '🧗' },
  { id: 'neg_18', labelZh: '唉，無言以對！', labelEn: 'Sigh, speechless!', points: -80, type: 'negative', icon: '🤦' },
  { id: 'neg_19', labelZh: '你自己覺得自己怎樣？', labelEn: 'What do you think of yourself?', points: -90, type: 'negative', icon: '🪞' },
  { id: 'neg_20', labelZh: '耶，扣100分！', labelEn: 'Yay, deduct 100 points!', points: -100, type: 'negative', icon: '💣' },
];

import {
  STARDEW_AVATARS,
  STARDEW_AVATAR_CATEGORIES,
  StardewAvatarCategory,
  StardewAvatarItem,
} from './stardewAvatars';

export { STARDEW_AVATARS, STARDEW_AVATAR_CATEGORIES };
export type { StardewAvatarCategory, StardewAvatarItem };

export const POKEMON_AVATARS: any[] = []; // Removed per user request

// Exact 15 Farm Animals for the Living Classroom Farm Pasture
export interface LiveFarmAnimalBlueprint {
  id: string;
  name: string;
  subtitle: string;
  quote: string;
  unlockScore: number;
  url: string;
  spriteFallback: string;
}

export const LIVE_FARM_ANIMALS_ROSTER: LiveFarmAnimalBlueprint[] = [
  {
    id: 'sdv_white_chicken',
    name: '純白小母雞 (White Chicken)',
    subtitle: '農場咕咕雞',
    quote: '咕咕咕～生下了一顆新鮮大雞蛋！🥚',
    unlockScore: 0,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/22/White_Chicken.png',
    spriteFallback: 'chicken',
  },
  {
    id: 'sdv_brown_chicken',
    name: '棕羽母雞 (Brown Chicken)',
    subtitle: '優質大雞蛋',
    quote: '咯咯咯！生下了優質大雞蛋，香氣撲鼻！🍳',
    unlockScore: 60,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Brown_Chicken.png',
    spriteFallback: 'chicken',
  },
  {
    id: 'sdv_duck',
    name: '綠頭野鴨 (Duck)',
    subtitle: '水塘游泳萌鴨',
    quote: '嘎嘎嘎！在清澈水塘邊快樂划水，羽毛好蓬鬆～🦆',
    unlockScore: 120,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/38/Duck.png',
    spriteFallback: 'duck',
  },
  {
    id: 'sdv_rabbit_farm',
    name: '幸運雪兔 (Rabbit)',
    subtitle: '掉落兔子的腳',
    quote: '小白兔抽動粉紅小鼻子，掉落了幸運兔腳！🐇✨',
    unlockScore: 180,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Rabbit.png',
    spriteFallback: 'rabbit',
  },
  {
    id: 'sdv_white_cow',
    name: '純潔白牛 (White Cow)',
    subtitle: '濃醇鮮牛奶',
    quote: '哞哞哞～產出了濃醇大牛奶！🥛',
    unlockScore: 260,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/36/White_Cow.png',
    spriteFallback: 'cow',
  },
  {
    id: 'sdv_brown_cow',
    name: '黃金棕牛 (Brown Cow)',
    subtitle: '優質起司',
    quote: '哞～嚼著甜美乾草，醞釀出優質起司！🧀',
    unlockScore: 340,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3e/Brown_Cow.png',
    spriteFallback: 'cow',
  },
  {
    id: 'sdv_goat',
    name: '山羊 (Goat)',
    subtitle: '高山山羊奶',
    quote: '咩～高山山羊在圍欄上輕盈跳躍，產出珍品羊奶！🥛',
    unlockScore: 420,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/52/Goat.png',
    spriteFallback: 'cow',
  },
  {
    id: 'sdv_sheep',
    name: '蓬鬆綿羊 (Sheep)',
    subtitle: '頂級羊毛',
    quote: '咩咩～軟綿綿的頂級羊毛，剪下來好溫暖！🧶',
    unlockScore: 500,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Sheep.png',
    spriteFallback: 'cow',
  },
  {
    id: 'sdv_pig',
    name: '松露萌豬 (Pig)',
    subtitle: '拱出珍貴松露',
    quote: '哼哼！在泥土裡拱出了一顆價值連城的黑松露！🍄',
    unlockScore: 580,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/30/Pig.png',
    spriteFallback: 'pig',
  },
  {
    id: 'sdv_blue_chicken',
    name: '夢幻藍雞 (Blue Chicken)',
    subtitle: '謝恩摯愛品種',
    quote: '咯咯咯！閃耀著湛藍寶石光芒的夢幻幸運雞！💙',
    unlockScore: 660,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/61/Blue_Chicken.png',
    spriteFallback: 'blue_chicken',
  },
  {
    id: 'sdv_void_chicken',
    name: '虛空幽靈雞 (Void Chicken)',
    subtitle: '巫師神秘寵物',
    quote: '黑紅雙眸閃爍，生下了巫師最愛的虛空之蛋！🔮',
    unlockScore: 740,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/67/Void_Chicken.png',
    spriteFallback: 'blue_chicken',
  },
  {
    id: 'sdv_dinosaur',
    name: '遠古恐龍 (Dinosaur)',
    subtitle: '史前霸王龍',
    quote: '吼吼吼！史前恐龍搖著可愛的大尾巴～🦖！',
    unlockScore: 820,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/89/Dinosaur.png',
    spriteFallback: 'dinosaur',
  },
  {
    id: 'sdv_ostrich',
    name: '草原鴕鳥 (Ostrich)',
    subtitle: '巨無霸鴕鳥蛋',
    quote: '撲騰著長脖子，下了一顆巨無霸鴕鳥蛋！🥚🎉',
    unlockScore: 900,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Ostrich.png',
    spriteFallback: 'chicken',
  },
  {
    id: 'sdv_horse',
    name: '忠心駿馬 (Horse)',
    subtitle: '奔馳坐騎',
    quote: '嘶鳴奔馳！農夫最好的忠心夥伴，馬蹄得得響！🐎',
    unlockScore: 950,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Horse.png',
    spriteFallback: 'cow',
  },
  {
    id: 'sdv_golden_chicken',
    name: '極品黃金雞 (Golden Chicken)',
    subtitle: '百分之百完美傳奇',
    quote: '👑 滿級極致傳奇！黃金神雞降臨，萬丈光芒，生出純金之蛋！💯✨',
    unlockScore: 1000,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3c/Golden_Chicken.png',
    spriteFallback: 'golden_chicken',
  },
];

// Exact 16 Farm Plants, Flowers & Legendary Crops for the Plant Encyclopedia
export interface LiveFarmPlantBlueprint {
  id: string;
  name: string;
  season: '春季' | '夏季' | '秋季' | '冬季' | '傳奇四季';
  subtitle: string;
  quote: string;
  growthDays: string;
  unlockScore: number;
  url: string;
  spriteFallback: string;
}

export const LIVE_FARM_PLANTS_ROSTER: LiveFarmPlantBlueprint[] = [
  {
    id: 'sdv_parsnip',
    name: '防風草 (Parsnip)',
    season: '春季',
    subtitle: '初春開墾第一株作物',
    growthDays: '4 天成熟',
    quote: '🌱 剛翻好土就能種下的甜脆根莖，每位農夫的第一份收成！',
    unlockScore: 0,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/db/Parsnip.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_blue_jazz',
    name: '藍爵士花 (Blue Jazz)',
    season: '春季',
    subtitle: '幸運午餐花卉原料',
    growthDays: '7 天綻放',
    quote: '💠 如星辰般綻放的寶石藍球狀花朵，吸引蝴蝶與蜜蜂飛舞！',
    unlockScore: 50,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Blue_Jazz.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_strawberry',
    name: '甜美草莓 (Strawberry)',
    season: '春季',
    subtitle: '復活節人氣王牌莓果',
    growthDays: '8 天成熟 · 可連續採收',
    quote: '🍓 鮮紅欲滴的甜蜜果實，每 4 天就能再次結出滿滿草莓！',
    unlockScore: 100,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6d/Strawberry.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_cauliflower',
    name: '巨大甘藍花 (Cauliflower)',
    season: '春季',
    subtitle: '有機會結成巨大作物',
    growthDays: '12 天熟成',
    quote: '🥦 飽吸春日陽光與露水的雪白花球，甚至能長成比屋子還大的巨菜！',
    unlockScore: 150,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Cauliflower.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_sunflower',
    name: '盛開向日葵 (Sunflower)',
    season: '夏季',
    subtitle: '夏秋雙季燦爛金花',
    growthDays: '8 天綻放',
    quote: '🌻 永遠迎向陽光露出微笑的金色花盤，收成時還會回贈新種子！',
    unlockScore: 200,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/81/Sunflower.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_blueberry',
    name: '飽滿藍莓 (Blueberry)',
    season: '夏季',
    subtitle: '一株多果夏季之王',
    growthDays: '13 天成熟 · 每次採收 3 顆',
    quote: '🫐 結實纍纍的晶瑩藍莓叢，一摘就是整籃滿滿的夏日幸福！',
    unlockScore: 250,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Blueberry.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_melon',
    name: '多汁甜瓜 (Melon)',
    season: '夏季',
    subtitle: '粉嫩清甜巨大瓜果',
    growthDays: '12 天熟成',
    quote: '🍈 盛夏最解暑的粉紅甜心大甜瓜，清香撲鼻令人暑氣全消！',
    unlockScore: 300,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/19/Melon.png',
    spriteFallback: 'melon',
  },
  {
    id: 'sdv_hot_pepper',
    name: '火紅辣椒 (Hot Pepper)',
    season: '夏季',
    subtitle: '鎮長最愛香辣鮮果',
    growthDays: '5 天成熟 · 可連續採收',
    quote: '🌶️ 熱辣鮮紅的小巧辣椒，做成香辣起司烤辣椒香氣十足！',
    unlockScore: 400,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Hot_Pepper.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_pumpkin',
    name: '秋季巨型南瓜 (Pumpkin)',
    season: '秋季',
    subtitle: '秋收慶典代表作物',
    growthDays: '13 天熟成',
    quote: '🎃 金橘厚實的萬聖大南瓜，熬成南瓜湯溫暖整個秋天！',
    unlockScore: 500,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/64/Pumpkin.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_fairy_rose',
    name: '仙女玫瑰 (Fairy Rose)',
    season: '秋季',
    subtitle: '釀造最頂級仙女蜂蜜',
    growthDays: '12 天綻放',
    quote: '🌹 散發淡雅奇香的夢幻紫粉玫瑰，傳說夜晚會引來森林小精靈！',
    unlockScore: 600,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Fairy_Rose.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_crystal_fruit',
    name: '冬日水晶果 (Crystal Fruit)',
    season: '冬季',
    subtitle: '嚴冬雪地中的冰藍果實',
    growthDays: '7 天凝結成熟',
    quote: '❄️ 在寒冬白雪裡孕育而生的透明冰藍果實，咬下一口清脆回甘！',
    unlockScore: 700,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/16/Crystal_Fruit.png',
    spriteFallback: 'gem_diamond',
  },
  {
    id: 'sdv_pineapple',
    name: '熱帶鳳梨 (Pineapple)',
    season: '夏季',
    subtitle: '薑島陽光熱帶黃金果',
    growthDays: '14 天成熟 · 可連續採收',
    quote: '🍍 沐浴在海濱陽光與海風下的金黃鳳梨，甜美多汁！',
    unlockScore: 750,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Pineapple.png',
    spriteFallback: 'sunflower',
  },
  {
    id: 'sdv_sweet_gem_berry',
    name: '寶石甜莓 (Sweet Gem Berry)',
    season: '秋季',
    subtitle: '全山谷最珍稀寶石之果',
    growthDays: '24 天慢熟奇果',
    quote: '💎 唯有注入耐心與心血才能培育出的紅寶石果實，價值非凡！',
    unlockScore: 800,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/88/Sweet_Gem_Berry.png',
    spriteFallback: 'gem_diamond',
  },
  {
    id: 'sdv_ancient_fruit',
    name: '遠古水果 (Ancient Fruit)',
    season: '傳奇四季',
    subtitle: '跨越千年的上古神果',
    growthDays: '28 天成熟 · 四季連收',
    quote: '🍇 從沉睡千年的遠古種子喚醒的湛藍奇果，春夏秋不枯竭！',
    unlockScore: 900,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/0/01/Ancient_Fruit.png',
    spriteFallback: 'gem_diamond',
  },
  {
    id: 'sdv_starfruit',
    name: '奢華楊桃 (Starfruit)',
    season: '夏季',
    subtitle: '沙漠綠洲星光果實',
    growthDays: '13 天熟成',
    quote: '⭐ 宛如金色五角星般璀璨的頂級名果，品嚐起來彷彿滿口星光！',
    unlockScore: 950,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/db/Starfruit.png',
    spriteFallback: 'star_full',
  },
  {
    id: 'sdv_stardrop',
    name: '星之果實 (Stardrop)',
    season: '傳奇四季',
    subtitle: '1000分滿級奇蹟聖果',
    growthDays: '1000 分成就限定',
    quote: '🌟 傳說中的紫晶星露奇果！吃下它會感受到最純粹的幸福與力量！',
    unlockScore: 1000,
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Stardrop.png',
    spriteFallback: 'star_full',
  },
];

// Helper to determine crop stage
export function getCropGrowth(points: number): {
  stage: string;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
} {
  if (points >= 1000) {
    return { stage: 'legendary', label: '星露谷傳奇仙境 👑💯', icon: '👑', color: '#eab308', badgeBg: 'bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-950 border-amber-500 ring-1 ring-amber-400 shadow-xs' };
  } else if (points >= 750) {
    return { stage: 'master', label: '極致黃金莊園 🌟', icon: '🌟', color: '#f59e0b', badgeBg: 'bg-amber-100 text-amber-900 border-amber-400' };
  } else if (points >= 500) {
    return { stage: 'junimo', label: '祝尼魔秘境 🍇', icon: '🍇', color: '#8b5cf6', badgeBg: 'bg-purple-100 text-purple-900 border-purple-400' };
  } else if (points >= 300) {
    return { stage: 'bountiful', label: '碩大金瓜農場 🎃', icon: '🎃', color: '#ea580c', badgeBg: 'bg-orange-100 text-orange-900 border-orange-400' };
  } else if (points >= 150) {
    return { stage: 'harvest', label: '豐收甜瓜田 🍈', icon: '🍈', color: '#10b981', badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-400' };
  } else if (points >= 50) {
    return { stage: 'bloom', label: '盛開向日葵 🌻', icon: '🌻', color: '#eab308', badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-400' };
  } else if (points >= 20) {
    return { stage: 'sprout', label: '欣欣抽芽 🌿', icon: '🌿', color: '#22c55e', badgeBg: 'bg-green-100 text-green-900 border-green-400' };
  } else if (points >= 0) {
    return { stage: 'seed', label: '初生嫩苗 🌱', icon: '🌱', color: '#84cc16', badgeBg: 'bg-lime-100 text-lime-900 border-lime-400' };
  } else {
    return { stage: 'withered', label: '雜草需打理 🍂', icon: '🍂', color: '#ef4444', badgeBg: 'bg-rose-100 text-rose-900 border-rose-300' };
  }
}

export interface FarmExpansionInfo {
  level: number;
  levelTitle: string;
  minPoints: number;
  nextPoints: number | null;
  fenceType: 'simple_wood' | 'hardwood' | 'ranch_rail' | 'wrought_iron' | 'iridium_fence' | 'golden_fence' | 'celestial_barrier';
  fenceName: string;
  waterTroughType: 'wooden_trough' | 'stone_basin' | 'copper_auto_trough' | 'marble_fountain' | 'iridium_crystal_fountain' | 'golden_fountain' | 'celestial_spring';
  waterTroughName: string;
  decorations: string[];
  expansionSummary: string;
}

export interface FarmTierInfo {
  tierNumber: number;
  tierName: string;
  themeStyle: string;
  bgGradient: string;
  cardSkyColor: string;
  groundColor: string;
  unlockedPlants: string[];
  unlockedAnimals: string[];
  maxCapacity: number;
  featureDescription: string;
  expansion: FarmExpansionInfo;
}

const FARM_TIER_STEPS_50: Array<{
  minPoints: number;
  tierName: string;
  levelTitle: string;
  themeStyle: string;
  bgGradient: string;
  cardSkyColor: string;
  groundColor: string;
  fenceType: FarmExpansionInfo['fenceType'];
  fenceName: string;
  waterTroughType: FarmExpansionInfo['waterTroughType'];
  waterTroughName: string;
  decorations: string[];
  featureDescription: string;
  expansionSummary: string;
}> = [
  {
    minPoints: 0,
    tierName: '原木初建牧區 (0分起步)',
    levelTitle: 'Lv.0 原木初建起步期 (0分)',
    themeStyle: 'starter_dirt',
    bgGradient: 'from-stone-100 via-amber-50 to-stone-200',
    cardSkyColor: '#f5f5f4',
    groundColor: '#854d0e',
    fenceType: 'simple_wood',
    fenceName: '粗鋸原木木樁圍欄 (樸實天然)',
    waterTroughType: 'wooden_trough',
    waterTroughName: '杉木手工釘製水槽 (清冽井水)',
    decorations: ['小木屋', '小菜園', '原木柵欄'],
    featureDescription: '剛耕耘的肥沃土地！湊夠 50 分即可解鎖第一張專屬農莊背景「藍爵士花田木屋」！',
    expansionSummary: '開拓起步！累計至 50 分即可解鎖第一張新農莊背景！',
  },
  {
    minPoints: 50,
    tierName: '藍爵士花田木屋 (50分)',
    levelTitle: 'Lv.1 藍爵士花田木屋 (50分)',
    themeStyle: 'meadow_50',
    bgGradient: 'from-sky-50 via-lime-50 to-emerald-100',
    cardSkyColor: '#e0f2fe',
    groundColor: '#4ade80',
    fenceType: 'simple_wood',
    fenceName: '原木花圃圍欄與碎石小徑',
    waterTroughType: 'wooden_trough',
    waterTroughName: '睡蓮小鴨池塘清泉',
    decorations: ['藍爵士花田', '小鴨池塘', '窗邊花箱'],
    featureDescription: '突破 50 分！木屋前綻放寶石藍爵士花，水池還有小鴨游水！',
    expansionSummary: '50 分首張新背景解鎖！藍花盛開，再累積 50 分解鎖向日葵農舍！',
  },
  {
    minPoints: 100,
    tierName: '向日葵晨曦農舍 (100分)',
    levelTitle: 'Lv.2 向日葵晨曦農舍 (100分)',
    themeStyle: 'sunflower_meadow',
    bgGradient: 'from-yellow-50 via-lime-50 to-emerald-100',
    cardSkyColor: '#fef9c3',
    groundColor: '#4ade80',
    fenceType: 'hardwood',
    fenceName: '堅固硬木圍欄與石砌矮牆',
    waterTroughType: 'stone_basin',
    waterTroughName: '青石雕鑿水井與小水塘',
    decorations: ['石砌水井', '向日葵花圃', '紅草莓田'],
    featureDescription: '突破 100 分！向日葵與草莓花圃盛開，並築起石頭水井！',
    expansionSummary: '100 分背景解鎖！農舍升級並添置石水井，向日葵迎風微笑！',
  },
  {
    minPoints: 150,
    tierName: '風車夕陽牧場 (150分)',
    levelTitle: 'Lv.3 風車夕陽牧場 (150分)',
    themeStyle: 'windmill_sunset',
    bgGradient: 'from-amber-50 via-orange-50 to-lime-100',
    cardSkyColor: '#ffedd5',
    groundColor: '#22c55e',
    fenceType: 'hardwood',
    fenceName: '雙層實木牧場護欄',
    waterTroughType: 'stone_basin',
    waterTroughName: '石畔牧場小水塘',
    decorations: ['石砌大風車', '紅木穀倉', '甘藍南瓜田'],
    featureDescription: '突破 150 分！金黃夕陽下風車轉動，甘藍花與南瓜田欣欣向榮！',
    expansionSummary: '150 分背景解鎖！風車與紅穀倉矗立牧場，牧群越來越熱鬧！',
  },
  {
    minPoints: 200,
    tierName: '紅屋頂牧場家園 (200分)',
    levelTitle: 'Lv.4 紅屋頂牧場家園 (200分)',
    themeStyle: 'thriving_coop',
    bgGradient: 'from-emerald-50 via-lime-50 to-amber-100',
    cardSkyColor: '#dcfce7',
    groundColor: '#22c55e',
    fenceType: 'ranch_rail',
    fenceName: '紅木牧場圍欄與穀倉走廊',
    waterTroughType: 'stone_basin',
    waterTroughName: '牧場清泉石砌水塘',
    decorations: ['紅色大穀倉', '紅磚筒倉', '溪邊木橋'],
    featureDescription: '突破 200 分！擁有大穀倉與高聳筒倉，動物們快樂齊聚！',
    expansionSummary: '200 分背景解鎖！大穀倉落成，朝繁榮莊園穩步邁進！',
  },
  {
    minPoints: 250,
    tierName: '翡翠林間溪橋 (250分)',
    levelTitle: 'Lv.5 翡翠林間溪橋 (250分)',
    themeStyle: 'magic_brook',
    bgGradient: 'from-emerald-50 via-teal-50 to-lime-100',
    cardSkyColor: '#ccfbf1',
    groundColor: '#16a34a',
    fenceType: 'ranch_rail',
    fenceName: '森林木拱橋與野花步道',
    waterTroughType: 'copper_auto_trough',
    waterTroughName: '林間活水清溪瀑布',
    decorations: ['古樹拱橋', '螢光花叢', '睡蓮溪流'],
    featureDescription: '突破 250 分！清澈溪流穿過綠蔭森林，藍莓與鮮花遍地綻放！',
    expansionSummary: '250 分背景解鎖！享受林間芬多精與溪流微風！',
  },
  {
    minPoints: 300,
    tierName: '河畔水車果園莊 (300分)',
    levelTitle: 'Lv.6 河畔水車果園莊 (300分)',
    themeStyle: 'bountiful_ranch',
    bgGradient: 'from-orange-50 via-amber-50 to-lime-100',
    cardSkyColor: '#ffedd5',
    groundColor: '#16a34a',
    fenceType: 'ranch_rail',
    fenceName: '果園原木柵欄與石板小徑',
    waterTroughType: 'copper_auto_trough',
    waterTroughName: '溪畔水車引流清泉槽',
    decorations: ['水車磨坊小屋', '蘋果橘子園', '整齊甜瓜田'],
    featureDescription: '突破 300 分！水車小屋沿溪而建，果樹結滿香甜水果！',
    expansionSummary: '300 分背景解鎖！水流推動木水車，果園結實纍纍！',
  },
  {
    minPoints: 350,
    tierName: '金秋楓紅莊園 (350分)',
    levelTitle: 'Lv.7 金秋楓紅莊園 (350分)',
    themeStyle: 'autumn_amber',
    bgGradient: 'from-amber-50 via-orange-50 to-yellow-100',
    cardSkyColor: '#fed7aa',
    groundColor: '#ca8a04',
    fenceType: 'hardwood',
    fenceName: '秋楓原木圍欄與稻草人哨站',
    waterTroughType: 'stone_basin',
    waterTroughName: '秋林古井清泉池',
    decorations: ['稻草人', '金橘楓林', '金黃麥捆'],
    featureDescription: '突破 350 分！金秋楓葉染紅山頭，成排南瓜與穀倉構成豐收畫卷！',
    expansionSummary: '350 分背景解鎖！進入金黃燦爛的秋收季節！',
  },
  {
    minPoints: 400,
    tierName: '琉璃溫室花坊 (400分)',
    levelTitle: 'Lv.8 琉璃溫室花坊 (400分)',
    themeStyle: 'glass_greenhouse',
    bgGradient: 'from-emerald-50 via-teal-50 to-lime-100',
    cardSkyColor: '#d1fae5',
    groundColor: '#16a34a',
    fenceType: 'wrought_iron',
    fenceName: '鍛鐵精工雕花拱門護欄',
    waterTroughType: 'copper_auto_trough',
    waterTroughName: '溫室恆溫自動滴灌噴水池',
    decorations: ['玻璃大溫室', '薰衣草花田', '玫瑰花圃'],
    featureDescription: '突破 400 分！維多利亞玻璃溫室落成，鍛鐵雕花護欄氣派典雅！',
    expansionSummary: '400 分背景解鎖！豪華玻璃溫室四季皆能培育珍奇植物！',
  },
  {
    minPoints: 450,
    tierName: '雪映松林冰雪莊 (450分)',
    levelTitle: 'Lv.9 雪映松林冰雪莊 (450分)',
    themeStyle: 'winter_frost',
    bgGradient: 'from-sky-50 via-blue-50 to-slate-100',
    cardSkyColor: '#e0f2fe',
    groundColor: '#0284c7',
    fenceType: 'wrought_iron',
    fenceName: '覆雪松木柵欄與雪橋護欄',
    waterTroughType: 'marble_fountain',
    waterTroughName: '冬日冰湖暖流清池',
    decorations: ['雪松森林', '木屋炊煙', '冬雪石橋'],
    featureDescription: '突破 450 分！白雪點綴松林與木屋煙囪，宛如童話雪國農莊！',
    expansionSummary: '450 分背景解鎖！銀白冬季裡依然溫暖宜居的夢幻小屋！',
  },
  {
    minPoints: 500,
    tierName: '紫晶附魔莊園 (500分)',
    levelTitle: 'Lv.10 紫晶附魔莊園 (500分)',
    themeStyle: 'junimo_grove',
    bgGradient: 'from-purple-50 via-pink-50 to-emerald-100',
    cardSkyColor: '#f3e8ff',
    groundColor: '#15803d',
    fenceType: 'iridium_fence',
    fenceName: '附魔紫晶強化護欄 (夜間微光)',
    waterTroughType: 'iridium_crystal_fountain',
    waterTroughName: '銥金晶石多層湧泉 (甘醇泉水)',
    decorations: ['紫晶能量噴泉', '石砌大宅', '紫晶路燈'],
    featureDescription: '突破 500 分！水晶噴泉與石砌大宅登場，散發耀眼魔幻能量！',
    expansionSummary: '500 分半程里程碑達成！紫晶噴泉正式啟用！',
  },
  {
    minPoints: 550,
    tierName: '螢火蘑菇秘境 (550分)',
    levelTitle: 'Lv.11 螢火蘑菇秘境 (550分)',
    themeStyle: 'woods_glow',
    bgGradient: 'from-indigo-50 via-purple-50 to-teal-100',
    cardSkyColor: '#e0e7ff',
    groundColor: '#0f766e',
    fenceType: 'iridium_fence',
    fenceName: '秘境星苔古木護欄',
    waterTroughType: 'iridium_crystal_fountain',
    waterTroughName: '月影睡蓮螢火靈池',
    decorations: ['發光巨蘑菇', '點點螢火蟲', '秘境林間道'],
    featureDescription: '突破 550 分！奇幻發光蘑菇林與螢火睡蓮池帶來不可思議的寧靜！',
    expansionSummary: '550 分背景解鎖！走進星露谷最神秘的發光森林！',
  },
  {
    minPoints: 600,
    tierName: '櫻花溫泉別院 (600分)',
    levelTitle: 'Lv.12 櫻花溫泉別院 (600分)',
    themeStyle: 'sakura_springs',
    bgGradient: 'from-pink-50 via-rose-50 to-emerald-100',
    cardSkyColor: '#fbcfe8',
    groundColor: '#16a34a',
    fenceType: 'wrought_iron',
    fenceName: '和風石燈籠庭園步道',
    waterTroughType: 'marble_fountain',
    waterTroughName: '天然岩石暖泉與錦鯉池',
    decorations: ['粉櫻花樹', '朱紅拱橋', '露天溫泉池'],
    featureDescription: '突破 600 分！粉櫻飄落錦鯉池與露天溫泉旁，如詩如畫！',
    expansionSummary: '600 分背景解鎖！在櫻花溫泉別院裡放鬆賞花！',
  },
  {
    minPoints: 650,
    tierName: '薰衣草蜂園莊園 (650分)',
    levelTitle: 'Lv.13 薰衣草蜂園莊園 (650分)',
    themeStyle: 'lavender_apiary',
    bgGradient: 'from-violet-50 via-purple-50 to-amber-100',
    cardSkyColor: '#ede9fe',
    groundColor: '#15803d',
    fenceType: 'wrought_iron',
    fenceName: '山坡石牆與花海木柵',
    waterTroughType: 'marble_fountain',
    waterTroughName: '花海山溪石橋清池',
    decorations: ['紫色薰衣草田', '木製養蜂箱群', '陽光溫室別館'],
    featureDescription: '突破 650 分！山坡種滿浪漫薰衣草，蜂箱醞釀著甜美仙女花蜜！',
    expansionSummary: '650 分背景解鎖！紫霞滿山的薰衣草蜂園香氣迷人！',
  },
  {
    minPoints: 700,
    tierName: '星月魔法高塔 (700分)',
    levelTitle: 'Lv.14 星月魔法高塔 (700分)',
    themeStyle: 'moonlit_tower',
    bgGradient: 'from-indigo-50 via-purple-50 to-slate-100',
    cardSkyColor: '#c7d2fe',
    groundColor: '#15803d',
    fenceType: 'iridium_fence',
    fenceName: '星輝紫晶附魔燈柱欄',
    waterTroughType: 'iridium_crystal_fountain',
    waterTroughName: '星光螢火魔力靈泉',
    decorations: ['法師尖塔', '夜間螢光花圃', '魔力許願水池'],
    featureDescription: '突破 700 分！繁星下魔法尖塔與螢光水晶花田閃耀奇幻星輝！',
    expansionSummary: '700 分背景解鎖！仰望星夜高塔，點亮魔力結晶！',
  },
  {
    minPoints: 750,
    tierName: '薑島椰林熱帶莊 (750分)',
    levelTitle: 'Lv.15 薑島椰林熱帶莊 (750分)',
    themeStyle: 'ginger_island',
    bgGradient: 'from-cyan-50 via-emerald-50 to-amber-100',
    cardSkyColor: '#cffafe',
    groundColor: '#16a34a',
    fenceType: 'ranch_rail',
    fenceName: '熱帶竹木圍欄與海濱棧道',
    waterTroughType: 'marble_fountain',
    waterTroughName: '碧藍瀉湖山泉瀑布',
    decorations: ['茅草海島別墅', '黃金鳳梨園', '碧綠瀑布瀉湖'],
    featureDescription: '突破 750 分！椰子樹搖曳在碧綠瀉湖與黃金鳳梨田旁，度假感滿分！',
    expansionSummary: '750 分背景解鎖！登上薑島熱帶農莊享受陽光與鳳梨香！',
  },
  {
    minPoints: 800,
    tierName: '珊瑚海濱度假莊 (800分)',
    levelTitle: 'Lv.16 珊瑚海濱度假莊 (800分)',
    themeStyle: 'seaside_resort',
    bgGradient: 'from-sky-50 via-amber-50 to-teal-100',
    cardSkyColor: '#bae6fd',
    groundColor: '#16a34a',
    fenceType: 'golden_fence',
    fenceName: '海濱椰林精緻木柵欄',
    waterTroughType: 'marble_fountain',
    waterTroughName: '珊瑚貝殼清泉水池',
    decorations: ['紅白燈塔', '海岸木棧道', '夕陽觀景台'],
    featureDescription: '突破 800 分！金黃夕陽海灘搭配紅白燈塔與椰林花田！',
    expansionSummary: '800 分背景解鎖！聽著海浪聲照料珊瑚海岸莊園！',
  },
  {
    minPoints: 850,
    tierName: '寶石天文觀星莊 (850分)',
    levelTitle: 'Lv.17 寶石天文觀星莊 (850分)',
    themeStyle: 'gem_observatory',
    bgGradient: 'from-purple-50 via-rose-50 to-amber-100',
    cardSkyColor: '#f3e8ff',
    groundColor: '#15803d',
    fenceType: 'golden_fence',
    fenceName: '暮色銅燈石柱莊園護欄',
    waterTroughType: 'marble_fountain',
    waterTroughName: '三層雕像大理石噴泉',
    decorations: ['黃銅天文圓頂', '紅寶石甜莓田', '暖燈石砌大道'],
    featureDescription: '突破 850 分！華麗天文圓頂大宅座落暮霞下，大理石噴泉與寶石甜莓輝映！',
    expansionSummary: '850 分背景解鎖！在天文圓頂下培育全山谷最珍貴的寶石甜莓！',
  },
  {
    minPoints: 900,
    tierName: '皇家金輝天宮 (900分)',
    levelTitle: 'Lv.18 皇家金輝天宮 (900分)',
    themeStyle: 'golden_estate',
    bgGradient: 'from-amber-100 via-orange-50 to-yellow-100',
    cardSkyColor: '#fde68a',
    groundColor: '#166534',
    fenceType: 'golden_fence',
    fenceName: '皇家黃金帝國雕花護欄',
    waterTroughType: 'golden_fountain',
    waterTroughName: '皇家黃金天鵝噴泉 (金色活水)',
    decorations: ['黃金鐘樓', '迎賓金門', '黃金蓮花池'],
    featureDescription: '突破 900 分！黃金時鐘塔與雙層純金噴泉矗立中央，金碧輝煌！',
    expansionSummary: '900 分背景解鎖！皇家黃金莊園距離最終雲端仙境近在咫尺！',
  },
  {
    minPoints: 950,
    tierName: '雲端浮空黃金苑 (950分)',
    levelTitle: 'Lv.19 雲端浮空黃金苑 (950分)',
    themeStyle: 'sky_garden',
    bgGradient: 'from-sky-50 via-amber-50 to-pink-50',
    cardSkyColor: '#fef3c7',
    groundColor: '#16a34a',
    fenceType: 'celestial_barrier',
    fenceName: '黃金雲海大理石迴廊欄',
    waterTroughType: 'celestial_spring',
    waterTroughName: '七彩彩虹天池瀑布',
    decorations: ['浮空大理石神殿', '彩虹瀑布', '星光楊桃田'],
    featureDescription: '突破 950 分！莊園升上朵朵彩雲之上，彩虹瀑布澆灌金色楊桃田！',
    expansionSummary: '950 分背景解鎖！距離 1000 分滿級極光仙境只剩最後 50 分！',
  },
  {
    minPoints: 1000,
    tierName: '星露極光傳奇仙境 (1000分)',
    levelTitle: 'Lv.20 星露極光仙境 (1000分)',
    themeStyle: 'legendary_haven',
    bgGradient: 'from-amber-100 via-yellow-100 to-emerald-200',
    cardSkyColor: '#fef08a',
    groundColor: '#15803d',
    fenceType: 'celestial_barrier',
    fenceName: '星露極光水晶結界護欄',
    waterTroughType: 'celestial_spring',
    waterTroughName: '七彩極光·星露女神湧泉',
    decorations: ['極光水晶宮殿', '浮空星燈', '七彩瀑布'],
    featureDescription: '突破 1000 分！動物與植物圖鑑全收集完成，並解鎖更壯觀的 1050～1250 分豪華殿堂！',
    expansionSummary: '1000 分背景解鎖！七彩極光映照仙境，繼續衝刺 1050 分翡翠水晶宮殿！',
  },
  {
    minPoints: 1050,
    tierName: '翡翠水晶宮殿莊園 (1050分)',
    levelTitle: 'Lv.21 翡翠水晶宮殿莊園 (1050分)',
    themeStyle: 'emerald_palace',
    bgGradient: 'from-emerald-100 via-amber-50 to-teal-100',
    cardSkyColor: '#a7f3d0',
    groundColor: '#166534',
    fenceType: 'golden_fence',
    fenceName: '翡翠大理石鍍金宮廷護欄',
    waterTroughType: 'celestial_spring',
    waterTroughName: '雙層玉階飛瀑聖泉池',
    decorations: ['翡翠金頂大宮殿', '稜鏡玻璃溫室', '黃金作物雕像'],
    featureDescription: '突破 1050 分！翡翠白玉宮殿、黃金圓頂與雙層瀑布花園盡顯皇家氣派！',
    expansionSummary: '1050 分豪華背景解鎖！翡翠水晶宮殿與稜鏡溫室震撼登場！',
  },
  {
    minPoints: 1100,
    tierName: '浮空聖殿天宮莊 (1100分)',
    levelTitle: 'Lv.22 浮空聖殿天宮莊 (1100分)',
    themeStyle: 'sky_dynasty',
    bgGradient: 'from-sky-100 via-amber-50 to-yellow-100',
    cardSkyColor: '#bae6fd',
    groundColor: '#15803d',
    fenceType: 'celestial_barrier',
    fenceName: '飛翼白玉雲海天橋護欄',
    waterTroughType: 'celestial_spring',
    waterTroughName: '天宮飛翼瀑布雲泉',
    decorations: ['浮空飛翼聖殿', '彩虹水晶長橋', '雲海梯田果園'],
    featureDescription: '突破 1100 分！天使飛翼石橋與彩虹水晶長橋凌駕雲海，壯觀非凡！',
    expansionSummary: '1100 分豪華背景解鎖！浮空聖殿高懸金色雲海之上！',
  },
  {
    minPoints: 1150,
    tierName: '星辰銀河皇冠莊園 (1150分)',
    levelTitle: 'Lv.23 星辰銀河皇冠莊園 (1150分)',
    themeStyle: 'stardust_galaxy',
    bgGradient: 'from-indigo-100 via-purple-100 to-amber-50',
    cardSkyColor: '#c4b5fd',
    groundColor: '#0f766e',
    fenceType: 'iridium_fence',
    fenceName: '星辰彩繪玻璃星輝護欄',
    waterTroughType: 'iridium_crystal_fountain',
    waterTroughName: '銀河星環藍寶石魔鏡泉',
    decorations: ['星雲皇家天文堡', '巨型銀河星環', '夜光水晶果林'],
    featureDescription: '突破 1150 分！絢爛星雲與巨型銀河光環環繞彩繪玻璃城堡與結晶果園！',
    expansionSummary: '1150 分豪華背景解鎖！置身浩瀚星雲與銀河皇冠天文莊園！',
  },
  {
    minPoints: 1200,
    tierName: '萬國朝聖黃金帝國 (1200分)',
    levelTitle: 'Lv.24 萬國朝聖黃金帝國 (1200分)',
    themeStyle: 'golden_empire',
    bgGradient: 'from-amber-100 via-orange-100 to-yellow-200',
    cardSkyColor: '#fcd34d',
    groundColor: '#15803d',
    fenceType: 'golden_fence',
    fenceName: '帝國凱旋純金石柱長廊',
    waterTroughType: 'golden_fountain',
    waterTroughName: '太陽神純金凱旋巨型噴泉',
    decorations: ['雙子黃金鐘樓宮', '三層凱旋石階', '太陽神金雕噴泉'],
    featureDescription: '突破 1200 分！雙子黃金鐘樓與三層凱旋石階氣勢如虹，夕陽映照黃金帝國！',
    expansionSummary: '1200 分豪華背景解鎖！帝國級宏偉莊園輝煌耀眼！',
  },
  {
    minPoints: 1250,
    tierName: '永恆神話宇宙神殿 (1250分 MAX)',
    levelTitle: 'Lv.25 永恆神話宇宙神殿 (1250分)',
    themeStyle: 'eternal_cosmos',
    bgGradient: 'from-cyan-100 via-purple-100 to-amber-100',
    cardSkyColor: '#fef08a',
    groundColor: '#15803d',
    fenceType: 'celestial_barrier',
    fenceName: '宇宙永恆結晶黃金結界',
    waterTroughType: 'celestial_spring',
    waterTroughName: '七彩宇宙稜鏡瀑布聖泉',
    decorations: ['宇宙結晶大聖殿', '七彩稜鏡瀑布', '星環行星天幕'],
    featureDescription: '達成 1250 分至高巔峰神話！25 種專屬農莊背景、15 種動物與 16 種植物全數解鎖！',
    expansionSummary: '1250 分終極神話背景解鎖！宇宙星環與結晶大聖殿見證最高榮耀！',
  },
];

// 0 to 1250 分 Farm Tier System (Every 50 points unlocks a distinct farm background & facility upgrade)
export function getFarmTier(points: number): FarmTierInfo {
  if (points < 0) {
    return {
      tierNumber: 0,
      tierName: '陰雨荒蕪待整理農地 (負分警報)',
      themeStyle: 'withered_storm',
      bgGradient: 'from-stone-300 via-slate-200 to-stone-400',
      cardSkyColor: '#475569',
      groundColor: '#57534e',
      unlockedPlants: ['乾枯雜草', '待清理碎石'],
      unlockedAnimals: ['田間烏鴉'],
      maxCapacity: 1,
      featureDescription: '目前為負分狀態，農地被陰雨與烏鴉佔據！努力加分回到正分即可恢復晴朗綠意！',
      expansion: {
        level: 0,
        levelTitle: 'Lv.0 荒蕪待修復時期',
        minPoints: -999,
        nextPoints: 0,
        fenceType: 'simple_wood',
        fenceName: '傾倒破損舊木柵 (急需修繕)',
        waterTroughType: 'wooden_trough',
        waterTroughName: '乾涸龜裂木水槽 (暫無清泉)',
        decorations: ['枯枝雜草', '泥濘積水', '田間烏鴉'],
        expansionSummary: '目前處於負分陰雨期，只有烏鴉駐守農地，回到 0 分以上將立刻重現青翠農舍！',
      },
    };
  }

  const clampedPoints = Math.max(0, points);
  let matchedIndex = 0;
  for (let i = FARM_TIER_STEPS_50.length - 1; i >= 0; i--) {
    if (clampedPoints >= FARM_TIER_STEPS_50[i].minPoints) {
      matchedIndex = i;
      break;
    }
  }

  const spec = FARM_TIER_STEPS_50[matchedIndex];
  const nextStep = FARM_TIER_STEPS_50[matchedIndex + 1];

  return {
    tierNumber: matchedIndex + 1,
    tierName: spec.tierName,
    themeStyle: spec.themeStyle,
    bgGradient: spec.bgGradient,
    cardSkyColor: spec.cardSkyColor,
    groundColor: spec.groundColor,
    unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map(
      (p) => p.name.split(' ')[0]
    ),
    unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map(
      (a) => a.name.split(' ')[0]
    ),
    maxCapacity: Math.min(100, 5 + matchedIndex * 5),
    featureDescription: spec.featureDescription,
    expansion: {
      level: matchedIndex + 1,
      levelTitle: spec.levelTitle,
      minPoints: spec.minPoints,
      nextPoints: nextStep ? nextStep.minPoints : null,
      fenceType: spec.fenceType,
      fenceName: spec.fenceName,
      waterTroughType: spec.waterTroughType,
      waterTroughName: spec.waterTroughName,
      decorations: spec.decorations,
      expansionSummary: spec.expansionSummary,
    },
  };
}

// Format initial classes with default avatar and pokemonId
export const INITIAL_CLASSES: ClassroomClass[] = (rawClasses as any[]).map((cls) => {
  return {
    id: cls.id,
    className: cls.className,
    students: cls.students.map((st: any, idx: number) => {
      const defaultSprite = STARDEW_AVATARS[idx % STARDEW_AVATARS.length]?.id || 'chicken';
      const initialAvatar = st.stardewAvatar || st.avatar || defaultSprite;
      return {
        id: st.id,
        rollNo: st.rollNo,
        name: st.name,
        points: st.points || 0,
        posPoints: st.posPoints || 0,
        negPoints: st.negPoints || 0,
        groupId: (idx % 6) + 1,
        pokemonId: st.pokemonId || ((idx % 150) + 1),
        pokemonAvatar: st.pokemonAvatar,
        stardewAvatar: initialAvatar,
        avatar: initialAvatar,
        cardBackground: st.cardBackground || 'default',
        history: st.history || [],
      };
    }),
  };
});
