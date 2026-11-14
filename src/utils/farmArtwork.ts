import witheredFarmBg from '../assets/images/student_farm_withered_1794665971206.jpg';
import starterFarmBg from '../assets/images/student_farm_starter_1794665062055.jpg';
import sunflower100Bg from '../assets/images/student_farm_100_sunflower_1794666229024.jpg';
import standard200Bg from '../assets/images/stardew_farm_bg_1793625320760.jpg';
import orchard300Bg from '../assets/images/student_farm_300_orchard_1794666230123.jpg';
import greenhouse400Bg from '../assets/images/student_farm_400_greenhouse_1794666232665.jpg';
import enchanted500Bg from '../assets/images/student_farm_enchanted_1794665062723.jpg';
import sakura600Bg from '../assets/images/student_farm_600_sakura_1794666230942.jpg';
import moonlit700Bg from '../assets/images/student_farm_700_moonlit_1794666232145.jpg';
import seaside800Bg from '../assets/images/student_farm_800_seaside_1794666233276.jpg';
import legendary900Bg from '../assets/images/student_farm_legendary_1794665063858.jpg';
import celestial1000Bg from '../assets/images/student_farm_1000_celestial_1794666233761.jpg';

export interface FarmArtworkTier {
  level: number;
  minPoints: number;
  nextPoints: number | null;
  bgUrl: string;
  icon: string;
  showcaseCropId: string;
  showcaseLabel: string;
  description: string;
  unlockedCrops: { id: string; label: string }[];
  isWithered?: boolean;
}

export const FARM_BACKGROUND_MILESTONES: FarmArtworkTier[] = [
  {
    level: 0,
    minPoints: 0,
    nextPoints: 100,
    bgUrl: starterFarmBg,
    icon: '🪵',
    showcaseCropId: 'sdv_parsnip',
    showcaseLabel: '原木初建農舍',
    description: '剛翻好土壤的起點牧區，等待你收集積分讓農舍一步步升級！',
    unlockedCrops: [
      { id: 'sdv_parsnip', label: '防風草' },
      { id: 'sdv_blue_jazz', label: '藍爵士花' },
    ],
  },
  {
    level: 1,
    minPoints: 100,
    nextPoints: 200,
    bgUrl: sunflower100Bg,
    icon: '🌻',
    showcaseCropId: 'sdv_strawberry',
    showcaseLabel: '向日葵晨曦農舍',
    description: '突破 100 分！木屋旁綻放向日葵與草莓花圃，還蓋起了石頭水井！',
    unlockedCrops: [
      { id: 'sdv_parsnip', label: '防風草' },
      { id: 'sdv_blue_jazz', label: '藍爵士花' },
      { id: 'sdv_strawberry', label: '甜美草莓' },
    ],
  },
  {
    level: 2,
    minPoints: 200,
    nextPoints: 300,
    bgUrl: standard200Bg,
    icon: '🏡',
    showcaseCropId: 'sdv_sunflower',
    showcaseLabel: '紅屋頂牧場家園',
    description: '突破 200 分！紅瓦農舍搭配穀倉與筒倉，整齊的田地生機盎然！',
    unlockedCrops: [
      { id: 'sdv_strawberry', label: '甜美草莓' },
      { id: 'sdv_cauliflower', label: '巨大甘藍花' },
      { id: 'sdv_sunflower', label: '盛開向日葵' },
    ],
  },
  {
    level: 3,
    minPoints: 300,
    nextPoints: 400,
    bgUrl: orchard300Bg,
    icon: '🍎',
    showcaseCropId: 'sdv_melon',
    showcaseLabel: '河畔水車果園莊',
    description: '突破 300 分！溪畔建起水車小屋與木橋，果樹結滿香甜蘋果與柳橙！',
    unlockedCrops: [
      { id: 'sdv_blueberry', label: '飽滿藍莓' },
      { id: 'sdv_melon', label: '多汁甜瓜' },
      { id: 'sdv_sunflower', label: '盛開向日葵' },
    ],
  },
  {
    level: 4,
    minPoints: 400,
    nextPoints: 500,
    bgUrl: greenhouse400Bg,
    icon: '🌿',
    showcaseCropId: 'sdv_hot_pepper',
    showcaseLabel: '琉璃溫室花坊',
    description: '突破 400 分！華麗的維多利亞玻璃溫室落成，四季皆能培育珍奇花卉！',
    unlockedCrops: [
      { id: 'sdv_melon', label: '多汁甜瓜' },
      { id: 'sdv_blueberry', label: '飽滿藍莓' },
      { id: 'sdv_hot_pepper', label: '火紅辣椒' },
    ],
  },
  {
    level: 5,
    minPoints: 500,
    nextPoints: 600,
    bgUrl: enchanted500Bg,
    icon: '🔮',
    showcaseCropId: 'sdv_pumpkin',
    showcaseLabel: '紫晶附魔莊園',
    description: '突破 500 分！紫晶守護噴泉與石砌莊園登場，充滿魔幻能量！',
    unlockedCrops: [
      { id: 'sdv_pumpkin', label: '秋季巨瓜' },
      { id: 'sdv_blueberry', label: '飽滿藍莓' },
      { id: 'sdv_hot_pepper', label: '火紅辣椒' },
    ],
  },
  {
    level: 6,
    minPoints: 600,
    nextPoints: 700,
    bgUrl: sakura600Bg,
    icon: '🌸',
    showcaseCropId: 'sdv_fairy_rose',
    showcaseLabel: '櫻花溫泉別院',
    description: '突破 600 分！粉嫩櫻花盛開於錦鯉池與露天溫泉旁，如詩如畫！',
    unlockedCrops: [
      { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
      { id: 'sdv_pumpkin', label: '秋季巨瓜' },
      { id: 'sdv_strawberry', label: '甜美草莓' },
    ],
  },
  {
    level: 7,
    minPoints: 700,
    nextPoints: 800,
    bgUrl: moonlit700Bg,
    icon: '🌙',
    showcaseCropId: 'sdv_crystal_fruit',
    showcaseLabel: '星月魔法高塔',
    description: '突破 700 分！繁星點點的秘法高塔與微光花田在月色下閃耀！',
    unlockedCrops: [
      { id: 'sdv_crystal_fruit', label: '水晶果' },
      { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
      { id: 'sdv_pineapple', label: '熱帶鳳梨' },
    ],
  },
  {
    level: 8,
    minPoints: 800,
    nextPoints: 900,
    bgUrl: seaside800Bg,
    icon: '🏖️',
    showcaseCropId: 'sdv_sweet_gem_berry',
    showcaseLabel: '珊瑚海濱度假莊',
    description: '突破 800 分！坐擁金黃夕陽海灘、紅白燈塔與椰林鳳梨園的夢幻海莊！',
    unlockedCrops: [
      { id: 'sdv_pineapple', label: '熱帶鳳梨' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      { id: 'sdv_melon', label: '多汁甜瓜' },
    ],
  },
  {
    level: 9,
    minPoints: 900,
    nextPoints: 1000,
    bgUrl: legendary900Bg,
    icon: '👑',
    showcaseCropId: 'sdv_ancient_fruit',
    showcaseLabel: '皇家金輝天宮',
    description: '突破 900 分！黃金鐘樓與純金噴泉矗立莊園，距離傳奇只差最後一步！',
    unlockedCrops: [
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      { id: 'sdv_golden_pumpkin', label: '黃金南瓜' },
    ],
  },
  {
    level: 10,
    minPoints: 1000,
    nextPoints: null,
    bgUrl: celestial1000Bg,
    icon: '✨',
    showcaseCropId: 'sdv_stardrop',
    showcaseLabel: '星露極光仙境',
    description: '達成 1000 分滿分傳奇！極光映照水晶宮殿與七彩瀑布，萬物共榮！',
    unlockedCrops: [
      { id: 'sdv_stardrop', label: '星之果實' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      { id: 'sdv_prismatic_shard', label: '五彩碎片' },
    ],
  },
];

export const WITHERED_FARM_ARTWORK: FarmArtworkTier = {
  level: -1,
  minPoints: -999,
  nextPoints: 0,
  bgUrl: witheredFarmBg,
  icon: '🌧️',
  showcaseCropId: 'sdv_crow',
  showcaseLabel: '荒蕪待整理農地',
  description: '目前為負分陰雨期，努力加分回到 0 分以上即可重現晴朗綠意！',
  unlockedCrops: [{ id: 'sdv_crow', label: '田間烏鴉 (農地荒蕪中)' }],
  isWithered: true,
};

export function getStudentFarmArtwork(points: number): FarmArtworkTier {
  if (points < 0) {
    return WITHERED_FARM_ARTWORK;
  }

  // Pick the highest milestone unlocked at 100-point steps (0, 100, 200, ..., 1000)
  for (let i = FARM_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= FARM_BACKGROUND_MILESTONES[i].minPoints) {
      return FARM_BACKGROUND_MILESTONES[i];
    }
  }

  return FARM_BACKGROUND_MILESTONES[0];
}
