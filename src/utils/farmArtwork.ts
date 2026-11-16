import witheredFarmBg from '../assets/images/student_farm_withered_1794665971206.jpg';
import starterFarmBg from '../assets/images/student_farm_starter_1794665062055.jpg';
import meadow50Bg from '../assets/images/farm_50_meadow_1794737497642.jpg';
import sunflower100Bg from '../assets/images/student_farm_100_sunflower_1794666229024.jpg';
import windmill150Bg from '../assets/images/pixel_verb_farm_1793505163424.jpg';
import standard200Bg from '../assets/images/stardew_farm_bg_1793625320760.jpg';
import brook250Bg from '../assets/images/pixel_magic_forest_1793505143610.jpg';
import orchard300Bg from '../assets/images/student_farm_300_orchard_1794666230123.jpg';
import autumn350Bg from '../assets/images/stardew_autumn_bg_1793625338487.jpg';
import greenhouse400Bg from '../assets/images/student_farm_400_greenhouse_1794666232665.jpg';
import winter450Bg from '../assets/images/stardew_winter_bg_1793625352268.jpg';
import enchanted500Bg from '../assets/images/student_farm_enchanted_1794665062723.jpg';
import woods550Bg from '../assets/images/stardew_woods_bg_1793625369367.jpg';
import sakura600Bg from '../assets/images/student_farm_600_sakura_1794666230942.jpg';
import lavender650Bg from '../assets/images/farm_650_lavender_1794737498364.jpg';
import moonlit700Bg from '../assets/images/student_farm_700_moonlit_1794666232145.jpg';
import tropical750Bg from '../assets/images/farm_750_tropical_1794737497755.jpg';
import seaside800Bg from '../assets/images/student_farm_800_seaside_1794666233276.jpg';
import observatory850Bg from '../assets/images/farm_850_observatory_1794737498662.jpg';
import legendary900Bg from '../assets/images/student_farm_legendary_1794665063858.jpg';
import skygarden950Bg from '../assets/images/farm_950_skygarden_1794737498817.jpg';
import celestial1000Bg from '../assets/images/student_farm_1000_celestial_1794666233761.jpg';
import palace1050Bg from '../assets/images/farm_1050_palace_1794831909649.jpg';
import skydynasty1100Bg from '../assets/images/farm_1100_skydynasty_1794831911252.jpg';
import stardust1150Bg from '../assets/images/farm_1150_stardust_1794831911890.jpg';
import imperial1200Bg from '../assets/images/farm_1200_imperial_1794831912502.jpg';
import eternal1250Bg from '../assets/images/farm_1250_eternal_1794831913248.jpg';

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
    nextPoints: 50,
    bgUrl: starterFarmBg,
    icon: '🪵',
    showcaseCropId: 'sdv_parsnip',
    showcaseLabel: '原木初建農舍',
    description: '剛翻好土壤的起點牧區，湊夠 50 分即可解鎖第一張專屬農莊背景！',
    unlockedCrops: [
      { id: 'sdv_parsnip', label: '防風草' },
      { id: 'sdv_blue_jazz', label: '藍爵士花' },
    ],
  },
  {
    level: 1,
    minPoints: 50,
    nextPoints: 100,
    bgUrl: meadow50Bg,
    icon: '💠',
    showcaseCropId: 'sdv_blue_jazz',
    showcaseLabel: '藍爵士花田木屋',
    description: '突破 50 分！木屋旁開滿寶石藍爵士花叢，小鴨池塘波光粼粼！',
    unlockedCrops: [
      { id: 'sdv_parsnip', label: '防風草' },
      { id: 'sdv_blue_jazz', label: '藍爵士花' },
    ],
  },
  {
    level: 2,
    minPoints: 100,
    nextPoints: 150,
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
    level: 3,
    minPoints: 150,
    nextPoints: 200,
    bgUrl: windmill150Bg,
    icon: '🌾',
    showcaseCropId: 'sdv_cauliflower',
    showcaseLabel: '風車夕陽牧場',
    description: '突破 150 分！石砌風車緩緩轉動，紅穀倉旁種滿甘藍花與金黃作物！',
    unlockedCrops: [
      { id: 'sdv_strawberry', label: '甜美草莓' },
      { id: 'sdv_cauliflower', label: '巨大甘藍花' },
    ],
  },
  {
    level: 4,
    minPoints: 200,
    nextPoints: 250,
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
    level: 5,
    minPoints: 250,
    nextPoints: 300,
    bgUrl: brook250Bg,
    icon: '🫐',
    showcaseCropId: 'sdv_blueberry',
    showcaseLabel: '翡翠林間溪橋',
    description: '突破 250 分！林蔭木橋橫跨清澈溪流，苔蘚古樹與野生藍莓簇擁！',
    unlockedCrops: [
      { id: 'sdv_blueberry', label: '飽滿藍莓' },
      { id: 'sdv_sunflower', label: '盛開向日葵' },
    ],
  },
  {
    level: 6,
    minPoints: 300,
    nextPoints: 350,
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
    level: 7,
    minPoints: 350,
    nextPoints: 400,
    bgUrl: autumn350Bg,
    icon: '🍁',
    showcaseCropId: 'sdv_pumpkin',
    showcaseLabel: '金秋楓紅莊園',
    description: '突破 350 分！金橘楓林包圍豐收農舍，稻草人守護著成排肥美田地！',
    unlockedCrops: [
      { id: 'sdv_melon', label: '多汁甜瓜' },
      { id: 'sdv_pumpkin', label: '秋季巨瓜' },
    ],
  },
  {
    level: 8,
    minPoints: 400,
    nextPoints: 450,
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
    level: 9,
    minPoints: 450,
    nextPoints: 500,
    bgUrl: winter450Bg,
    icon: '❄️',
    showcaseCropId: 'sdv_crystal_fruit',
    showcaseLabel: '雪映松林冰雪莊',
    description: '突破 450 分！銀白冬雪覆蓋松林木橋，煙囪飄出溫暖炊煙！',
    unlockedCrops: [
      { id: 'sdv_hot_pepper', label: '火紅辣椒' },
      { id: 'sdv_crystal_fruit', label: '冬日水晶果' },
    ],
  },
  {
    level: 10,
    minPoints: 500,
    nextPoints: 550,
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
    level: 11,
    minPoints: 550,
    nextPoints: 600,
    bgUrl: woods550Bg,
    icon: '🍄',
    showcaseCropId: 'sdv_fairy_rose',
    showcaseLabel: '螢火蘑菇秘境',
    description: '突破 550 分！發光藍紫蘑菇與星夜螢火蟲在祕境池畔悄然起舞！',
    unlockedCrops: [
      { id: 'sdv_pumpkin', label: '秋季巨瓜' },
      { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
    ],
  },
  {
    level: 12,
    minPoints: 600,
    nextPoints: 650,
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
    level: 13,
    minPoints: 650,
    nextPoints: 700,
    bgUrl: lavender650Bg,
    icon: '🪻',
    showcaseCropId: 'sdv_fairy_rose',
    showcaseLabel: '薰衣草蜂園莊園',
    description: '突破 650 分！成片紫色薰衣草花海環繞石砌農莊與木蜂箱，香氣四溢！',
    unlockedCrops: [
      { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
      { id: 'sdv_sunflower', label: '盛開向日葵' },
    ],
  },
  {
    level: 14,
    minPoints: 700,
    nextPoints: 750,
    bgUrl: moonlit700Bg,
    icon: '🌙',
    showcaseCropId: 'sdv_crystal_fruit',
    showcaseLabel: '星月魔法高塔',
    description: '突破 700 分！繁星點點的秘法高塔與微光花田在月色下閃耀！',
    unlockedCrops: [
      { id: 'sdv_crystal_fruit', label: '冬日水晶果' },
      { id: 'sdv_fairy_rose', label: '仙女玫瑰' },
      { id: 'sdv_pineapple', label: '熱帶鳳梨' },
    ],
  },
  {
    level: 15,
    minPoints: 750,
    nextPoints: 800,
    bgUrl: tropical750Bg,
    icon: '🍍',
    showcaseCropId: 'sdv_pineapple',
    showcaseLabel: '薑島椰林熱帶莊',
    description: '突破 750 分！椰風海浪、碧綠瀑布與金黃鳳梨田構築出熱帶天堂！',
    unlockedCrops: [
      { id: 'sdv_pineapple', label: '熱帶鳳梨' },
      { id: 'sdv_melon', label: '多汁甜瓜' },
    ],
  },
  {
    level: 16,
    minPoints: 800,
    nextPoints: 850,
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
    level: 17,
    minPoints: 850,
    nextPoints: 900,
    bgUrl: observatory850Bg,
    icon: '🔭',
    showcaseCropId: 'sdv_sweet_gem_berry',
    showcaseLabel: '寶石天文觀星莊',
    description: '突破 850 分！暮色下的黃銅天文圓頂莊園與大理石噴泉典雅非凡！',
    unlockedCrops: [
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      { id: 'sdv_crystal_fruit', label: '冬日水晶果' },
    ],
  },
  {
    level: 18,
    minPoints: 900,
    nextPoints: 950,
    bgUrl: legendary900Bg,
    icon: '👑',
    showcaseCropId: 'sdv_ancient_fruit',
    showcaseLabel: '皇家金輝天宮',
    description: '突破 900 分！黃金鐘樓與純金噴泉矗立莊園，距離星露極光只差 100 分！',
    unlockedCrops: [
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
    ],
  },
  {
    level: 19,
    minPoints: 950,
    nextPoints: 1000,
    bgUrl: skygarden950Bg,
    icon: '☁️',
    showcaseCropId: 'sdv_starfruit',
    showcaseLabel: '雲端浮空黃金苑',
    description: '突破 950 分！飄浮於雲海之上的彩虹瀑布神殿與奢華楊桃黃金花園！',
    unlockedCrops: [
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
    ],
  },
  {
    level: 20,
    minPoints: 1000,
    nextPoints: 1050,
    bgUrl: celestial1000Bg,
    icon: '✨',
    showcaseCropId: 'sdv_stardrop',
    showcaseLabel: '星露極光仙境',
    description: '達成 1000 分傳奇！極光映照水晶宮殿與七彩瀑布，繼續邁向 1250 分終極殿堂！',
    unlockedCrops: [
      { id: 'sdv_stardrop', label: '星之果實' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
    ],
  },
  {
    level: 21,
    minPoints: 1050,
    nextPoints: 1100,
    bgUrl: palace1050Bg,
    icon: '🏯',
    showcaseCropId: 'sdv_starfruit',
    showcaseLabel: '翡翠水晶宮殿莊園',
    description: '突破 1050 分！翡翠白玉宮殿與金色圓頂矗立雙層瀑布之上，配備稜鏡溫室與黃金作物雕像！',
    unlockedCrops: [
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_stardrop', label: '星之果實' },
    ],
  },
  {
    level: 22,
    minPoints: 1100,
    nextPoints: 1150,
    bgUrl: skydynasty1100Bg,
    icon: '🪽',
    showcaseCropId: 'sdv_ancient_fruit',
    showcaseLabel: '浮空聖殿天宮莊',
    description: '突破 1100 分！飛翼白玉水橋凌駕金色雲海，彩虹水晶橋連接天空浮空聖殿與梯田果園！',
    unlockedCrops: [
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_stardrop', label: '星之果實' },
    ],
  },
  {
    level: 23,
    minPoints: 1150,
    nextPoints: 1200,
    bgUrl: stardust1150Bg,
    icon: '🌌',
    showcaseCropId: 'sdv_sweet_gem_berry',
    showcaseLabel: '星辰銀河皇冠莊園',
    description: '突破 1150 分！紫金星雲與巨型銀河星環低垂天際，彩繪玻璃尖塔與發光水晶果林輝煌壯麗！',
    unlockedCrops: [
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
      { id: 'sdv_crystal_fruit', label: '冬日水晶果' },
      { id: 'sdv_stardrop', label: '星之果實' },
    ],
  },
  {
    level: 24,
    minPoints: 1200,
    nextPoints: 1250,
    bgUrl: imperial1200Bg,
    icon: '🏛️',
    showcaseCropId: 'sdv_starfruit',
    showcaseLabel: '萬國朝聖黃金帝國',
    description: '突破 1200 分！雙座黃金大鐘樓與三層凱旋大理石階梯氣勢磅礴，太陽神金雕噴泉閃耀夕陽！',
    unlockedCrops: [
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_stardrop', label: '星之果實' },
    ],
  },
  {
    level: 25,
    minPoints: 1250,
    nextPoints: null,
    bgUrl: eternal1250Bg,
    icon: '💎',
    showcaseCropId: 'sdv_stardrop',
    showcaseLabel: '永恆神話宇宙神殿',
    description: '達成 1250 分至高宇宙傳奇！七彩極光行星與稜鏡瀑布環繞水晶神殿，25 張豪華農莊背景全解鎖！',
    unlockedCrops: [
      { id: 'sdv_stardrop', label: '星之果實' },
      { id: 'sdv_starfruit', label: '奢華楊桃' },
      { id: 'sdv_ancient_fruit', label: '遠古水果' },
      { id: 'sdv_sweet_gem_berry', label: '寶石甜莓' },
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

  // Pick the highest milestone unlocked at 50-point steps (0, 50, 100, ..., 1250)
  for (let i = FARM_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= FARM_BACKGROUND_MILESTONES[i].minPoints) {
      return FARM_BACKGROUND_MILESTONES[i];
    }
  }

  return FARM_BACKGROUND_MILESTONES[0];
}
