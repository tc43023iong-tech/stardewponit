import { RewardRarity } from '../types/classroom';

export interface FishRewardItem {
  id: string;
  name: string;
  enName: string;
  rarity: RewardRarity;
  rarityLabel: string;
  imageUrl: string;
  description: string;
  accentColor: string;
}

export interface GemRewardItem {
  id: string;
  name: string;
  enName: string;
  rarity: RewardRarity;
  rarityLabel: string;
  imageUrl: string;
  description: string;
  accentColor: string;
}

export const FISH_REWARD_POOL: FishRewardItem[] = [
  // Common Fish (70%)
  {
    id: 'perch',
    name: '河鱸',
    enName: 'Perch',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/4/43/Perch.png',
    description: '活力充沛的淡水河鱸，最喜歡在涼爽的池塘裡游動。',
    accentColor: '#65a30d',
  },
  {
    id: 'carp',
    name: '鯉魚',
    enName: 'Carp',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Carp.png',
    description: '性情溫馴的池塘常見鯉魚，金黃色鱗片閃閃發光。',
    accentColor: '#ca8a04',
  },
  {
    id: 'sunfish',
    name: '太陽魚',
    enName: 'Sunfish',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/5/56/Sunfish.png',
    description: '喜歡在溫暖陽光下接近水面游動的亮橘色河魚。',
    accentColor: '#ea580c',
  },
  {
    id: 'salmon',
    name: '鮭魚',
    enName: 'Salmon',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Salmon.png',
    description: '逆流而上的勇敢河流鮭魚，深受星露谷村民喜愛。',
    accentColor: '#e11d48',
  },
  {
    id: 'sardine',
    name: '沙丁魚',
    enName: 'Sardine',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/0/04/Sardine.png',
    description: '銀白色小巧靈活的魚兒，常成群結隊在水面穿梭。',
    accentColor: '#0284c7',
  },
  {
    id: 'bream',
    name: '鯛魚',
    enName: 'Bream',
    rarity: 'common',
    rarityLabel: '普通魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/8/82/Bream.png',
    description: '銀藍相間的優雅淡水魚，喜歡在微風夜晚現身。',
    accentColor: '#0891b2',
  },

  // Rare Fish (25%)
  {
    id: 'rainbow_trout',
    name: '彩虹鱒魚',
    enName: 'Rainbow Trout',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/14/Rainbow_Trout.png',
    description: '魚身閃耀七彩斑紋的稀有鱒魚，據說曾帶來幸運彩光。',
    accentColor: '#7c3aed',
  },
  {
    id: 'largemouth_bass',
    name: '大嘴鱸魚',
    enName: 'Largemouth Bass',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/11/Largemouth_Bass.png',
    description: '體型碩大的湖泊霸主，拉起時需要穩住釣竿才行。',
    accentColor: '#059669',
  },
  {
    id: 'tuna',
    name: '金槍魚',
    enName: 'Tuna',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c5/Tuna.png',
    description: '泳速極快的深海健將，銀藍背鰭充滿力量感。',
    accentColor: '#2563eb',
  },
  {
    id: 'eel',
    name: '鰻魚',
    enName: 'Eel',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/91/Eel.png',
    description: '修長靈巧的神秘長鰻，總是伴隨涼爽微風悄悄上鉤。',
    accentColor: '#4f46e5',
  },
  {
    id: 'catfish',
    name: '鯰魚',
    enName: 'Catfish',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/99/Catfish.png',
    description: '長著長鬍鬚的珍稀淡水大魚，釣魚高手最引以為傲的收穫。',
    accentColor: '#0f766e',
  },
  {
    id: 'tiger_trout',
    name: '虎紋鱒魚',
    enName: 'Tiger Trout',
    rarity: 'rare',
    rarityLabel: '稀有魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/0/01/Tiger_Trout.png',
    description: '身上帶著華麗金橙虎紋的罕見鱒魚，極具收藏價值。',
    accentColor: '#d97706',
  },

  // Legendary Fish (5%)
  {
    id: 'legend',
    name: '傳說之魚',
    enName: 'Legend',
    rarity: 'legendary',
    rarityLabel: '傳說魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/10/Legend.png',
    description: '山林湖最神秘的傳奇魚王，只有極少數幸運兒才能親手釣起。',
    accentColor: '#eab308',
  },
  {
    id: 'crimsonfish',
    name: '緋紅魚',
    enName: 'Crimsonfish',
    rarity: 'legendary',
    rarityLabel: '傳說魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/d/dc/Crimsonfish.png',
    description: '渾身火紅的傳說級魚王，揮動魚鰭時彷彿點亮整片池水。',
    accentColor: '#dc2626',
  },
  {
    id: 'angler',
    name: '鮟鱇魚',
    enName: 'Angler',
    rarity: 'legendary',
    rarityLabel: '傳說魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/b/bf/Angler.png',
    description: '頭頂自帶發光燈籠的稀有傳說魚王，照亮深水秘境。',
    accentColor: '#f59e0b',
  },
  {
    id: 'glacierfish',
    name: '冰川魚',
    enName: 'Glacierfish',
    rarity: 'legendary',
    rarityLabel: '傳說魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Glacierfish.png',
    description: '散發冰雪寒氣的晶藍魚王，皇冠般背鰭象徵無上榮耀。',
    accentColor: '#06b6d4',
  },
  {
    id: 'mutant_carp',
    name: '變種鯉魚',
    enName: 'Mutant Carp',
    rarity: 'legendary',
    rarityLabel: '傳說魚',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/c/cb/Mutant_Carp.png',
    description: '閃耀翡翠螢光的秘境魚王，在全星露谷中屈指可數。',
    accentColor: '#16a34a',
  },
];

export const GEM_REWARD_POOL: GemRewardItem[] = [
  {
    id: 'emerald',
    name: '綠寶石',
    enName: 'Emerald',
    rarity: 'rare',
    rarityLabel: '秘境寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Emerald.png',
    description: '翠綠透亮的天然祖母綠寶石，象徵生機與智慧。',
    accentColor: '#16a34a',
  },
  {
    id: 'ruby',
    name: '紅寶石',
    enName: 'Ruby',
    rarity: 'rare',
    rarityLabel: '秘境寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Ruby.png',
    description: '閃耀溫暖火焰光澤的紅寶石，代表課堂上的勇氣與熱情。',
    accentColor: '#dc2626',
  },
  {
    id: 'aquamarine',
    name: '海藍寶石',
    enName: 'Aquamarine',
    rarity: 'common',
    rarityLabel: '晶瑩寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a2/Aquamarine.png',
    description: '宛如星露谷晴空與清泉般的湛藍水晶寶石。',
    accentColor: '#0284c7',
  },
  {
    id: 'diamond',
    name: '鑽石',
    enName: 'Diamond',
    rarity: 'legendary',
    rarityLabel: '璀璨鑽石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/e/ea/Diamond.png',
    description: '萬中選一的極品璀璨鑽石，在礦洞燭火下折出耀眼光芒。',
    accentColor: '#38bdf8',
  },
  {
    id: 'amethyst',
    name: '紫水晶',
    enName: 'Amethyst',
    rarity: 'common',
    rarityLabel: '晶瑩寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Amethyst.png',
    description: '散發柔和紫光的結晶原石，阿比蓋爾最珍愛的礦石。',
    accentColor: '#9333ea',
  },
  {
    id: 'topaz',
    name: '黃水晶',
    enName: 'Topaz',
    rarity: 'common',
    rarityLabel: '晶瑩寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Topaz.png',
    description: '金黃通透的暖陽水晶，給課堂帶來滿滿正能量。',
    accentColor: '#d97706',
  },
  {
    id: 'jade',
    name: '翡翠',
    enName: 'Jade',
    rarity: 'rare',
    rarityLabel: '秘境寶石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Jade.png',
    description: '溫潤細膩的碧玉翡翠，礦洞深處難得一見的美玉。',
    accentColor: '#059669',
  },
  {
    id: 'prismatic_shard',
    name: '五彩碎片',
    enName: 'Prismatic Shard',
    rarity: 'legendary',
    rarityLabel: '極稀神石',
    imageUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/5/56/Prismatic_Shard.png',
    description: '匯聚彩虹七彩之光的傳說礦石，據說蘊含銀河神兵之力。',
    accentColor: '#ec4899',
  },
];

export const FISH_BY_NAME: Record<string, FishRewardItem> = Object.fromEntries(
  FISH_REWARD_POOL.map((f) => [f.name, f])
);

export const GEM_BY_NAME: Record<string, GemRewardItem> = Object.fromEntries(
  GEM_REWARD_POOL.map((g) => [g.name, g])
);

/**
 * Roll a random fish using exact rarity weights:
 * Common: 70%, Rare: 25%, Legendary: 5%
 */
export function rollRandomFish(): FishRewardItem {
  const roll = Math.random();
  let targetRarity: RewardRarity = 'common';
  if (roll < 0.7) {
    targetRarity = 'common';
  } else if (roll < 0.95) {
    targetRarity = 'rare';
  } else {
    targetRarity = 'legendary';
  }
  const candidates = FISH_REWARD_POOL.filter((f) => f.rarity === targetRarity);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Roll a random gem from the Stardew mine gem pool
 */
export function rollRandomGem(): GemRewardItem {
  const roll = Math.random();
  // Slight rarity curve while giving great variety (Emerald, Ruby, Aquamarine, Diamond, etc.)
  let pool: GemRewardItem[];
  if (roll < 0.1) {
    pool = GEM_REWARD_POOL.filter((g) => g.rarity === 'legendary');
  } else if (roll < 0.45) {
    pool = GEM_REWARD_POOL.filter((g) => g.rarity === 'rare');
  } else {
    pool = GEM_REWARD_POOL.filter((g) => g.rarity === 'common');
  }
  const source = pool.length > 0 ? pool : GEM_REWARD_POOL;
  return source[Math.floor(Math.random() * source.length)];
}
