import kitchenWitheredBg from '../assets/images/kitchen_withered_sooty_1795001301026.jpg';
import kitchen0StarterBg from '../assets/images/kitchen_0_starter_hearth_1795001301425.jpg';
import kitchen50CountryBg from '../assets/images/kitchen_50_country_pantry_1795001302069.jpg';
import kitchen100SunflowerBg from '../assets/images/kitchen_100_sunflower_bakery_1795001303801.jpg';
import kitchen150StoneOvenBg from '../assets/images/kitchen_150_stone_oven_1795001304075.jpg';
import kitchen200DoubleRangeBg from '../assets/images/kitchen_200_double_farm_range_1795001305387.jpg';
import kitchen250WoodlandTeaBg from '../assets/images/kitchen_250_woodland_tea_bar_1795001305182.jpg';
import kitchen300OrchardBg from '../assets/images/kitchen_300_orchard_preserve_1795001305494.jpg';
import kitchen350AutumnSpiceBg from '../assets/images/kitchen_350_autumn_spice_hearth_1795001306246.jpg';
import kitchen400GlasshouseBg from '../assets/images/kitchen_400_botanical_glasshouse_1795001307386.jpg';
import kitchen450WinterCocoaBg from '../assets/images/kitchen_450_winter_cocoa_lodge_1795001308109.jpg';
import kitchen500WizardAlchemyBg from '../assets/images/kitchen_500_wizard_alchemy_kitchen_1795001308559.jpg';
import kitchen550TruffleBistroBg from '../assets/images/kitchen_550_truffle_mushroom_bistro_1795001309700.jpg';
import kitchen600SakuraMatchaBg from '../assets/images/kitchen_600_sakura_matcha_kitchen_1795001310060.jpg';
import kitchen650LavenderBg from '../assets/images/kitchen_650_lavender_patisserie_1795001333067.jpg';
import kitchen700MoonlitBg from '../assets/images/kitchen_700_moonlit_bistro_1795001333465.jpg';
import kitchen750GingerIslandBg from '../assets/images/kitchen_750_ginger_island_grill_1795001332584.jpg';
import kitchen800SeasideBarBg from '../assets/images/kitchen_800_seaside_oyster_bar_1795001333413.jpg';
import kitchen850ClockworkBg from '../assets/images/kitchen_850_clockwork_roastery_1795001333416.jpg';
import kitchen900RoyalBanquetBg from '../assets/images/kitchen_900_royal_banquet_kitchen_1795001334042.jpg';
import kitchen950CloudSouffleBg from '../assets/images/kitchen_950_cloud_souffle_patisserie_1795001333170.jpg';
import kitchen1000AuroraIceBg from '../assets/images/kitchen_1000_aurora_ice_parlor_1795001334172.jpg';
import kitchen1050JadeDimsumBg from '../assets/images/kitchen_1050_jade_imperial_dimsum_1795001332835.jpg';
import kitchen1100CelestialGoldBg from '../assets/images/kitchen_1100_celestial_gold_kitchen_1795001333600.jpg';
import kitchen1150GalaxyBg from '../assets/images/kitchen_1150_galaxy_molecular_kitchen_1795001334027.jpg';
import kitchen1200SolarHallBg from '../assets/images/kitchen_1200_solar_grand_hall_1795001335111.jpg';
import kitchen1250CosmosBg from '../assets/images/kitchen_1250_eternal_cosmos_kitchen_1795001334797.jpg';

export interface KitchenArtworkTier {
  level: number;
  minPoints: number;
  nextPoints: number | null;
  bgUrl: string;
  icon: string;
  kitchenTitle: string;
  kitchenScaleLabel: string;
  stoveName: string;
  specialtyDish: string;
  showcaseDishId: string;
  description: string;
  unlockedGearItems: { emoji: string; label: string; quote: string }[];
  isSooty?: boolean;
}

export interface KitchenIngredient {
  name: string;
  qty: number;
  iconUrl: string;
}

export interface KitchenDishBlueprint {
  id: string;
  url: string;
  name: string;
  style: string;
  unlockScore: number;
  cookingUtensil: string;
  buffEffect: string;
  recipeSteps: string;
  ingredients: KitchenIngredient[];
  quote: string;
}

export interface KitchenwareVisualTier {
  tierIndex: number;
  minPoints: number;
  ovenName: string;
  spatulaName: string;
  ovenTierLabel: string;
  ovenScale: number; // visual scale multiplier so the oven noticeably grows as score rises
  ovenStyle: 'sooty' | 'iron' | 'country' | 'brick' | 'copper' | 'arcane' | 'royal' | 'aurora' | 'cosmos';
  spatulaStyle: 'wooden' | 'steel' | 'copper' | 'arcane' | 'gold' | 'iridium' | 'prismatic';
  upgradeNote: string;
}

export const KITCHENWARE_VISUAL_TIERS: KitchenwareVisualTier[] = [
  {
    tierIndex: -1,
    minPoints: -999,
    ovenName: '積灰未點火舊鐵爐',
    spatulaName: '缺角老木鍋鏟',
    ovenTierLabel: '舊灶 Lv.0',
    ovenScale: 0.8,
    ovenStyle: 'sooty',
    spatulaStyle: 'wooden',
    upgradeNote: '快加分回到 0 分以上重新點亮溫暖爐火！',
  },
  {
    tierIndex: 0,
    minPoints: 0,
    ovenName: '迷你柴火小鐵灶',
    spatulaName: '原木初心者鍋鏟',
    ovenTierLabel: '鐵灶 Lv.1',
    ovenScale: 0.88,
    ovenStyle: 'iron',
    spatulaStyle: 'wooden',
    upgradeNote: '樸實好用的新手小火爐，再努力湊滿 50 分就能讓烤箱長大升級！',
  },
  {
    tierIndex: 1,
    minPoints: 50,
    ovenName: '鄉村雙層烘烤爐',
    spatulaName: '拋光精鋼主廚鏟',
    ovenTierLabel: '鋼灶 Lv.2',
    ovenScale: 0.96,
    ovenStyle: 'country',
    spatulaStyle: 'steel',
    upgradeNote: '烤箱長大了！升級透視玻璃烤箱門，鍋鏟也進化為閃亮精鋼主廚鏟！',
  },
  {
    tierIndex: 2,
    minPoints: 150,
    ovenName: '高溫紅磚石窯烤爐',
    spatulaName: '鍛銅專業料理鏟',
    ovenTierLabel: '石窯 Lv.3',
    ovenScale: 1.04,
    ovenStyle: 'brick',
    spatulaStyle: 'copper',
    upgradeNote: '圓頂石砌窯爐火光四射，鍛銅鍋鏟導熱超快，披薩與麵包香氣翻倍！',
  },
  {
    tierIndex: 3,
    minPoints: 300,
    ovenName: '雙排黃銅大型蒸烤爐',
    spatulaName: '精工紅銅星紋鍋鏟',
    ovenTierLabel: '黃銅 Lv.4',
    ovenScale: 1.12,
    ovenStyle: 'copper',
    spatulaStyle: 'copper',
    upgradeNote: '雙排大容量黃銅烤爐登場！同時蒸烤多道甜點與果醬完全不費力！',
  },
  {
    tierIndex: 4,
    minPoints: 500,
    ovenName: '奧術紫晶煉金大烤爐',
    spatulaName: '附魔紫晶星光鍋鏟',
    ovenTierLabel: '魔導 Lv.5',
    ovenScale: 1.2,
    ovenStyle: 'arcane',
    spatulaStyle: 'arcane',
    upgradeNote: '紫晶符文附魔爐火！鍋鏟揮舞時會飄出奇幻紫色星塵與雙倍美味魔法！',
  },
  {
    tierIndex: 5,
    minPoints: 750,
    ovenName: '皇家純金巨型連爐',
    spatulaName: '皇家黃金主廚神鏟',
    ovenTierLabel: '黃金 Lv.6',
    ovenScale: 1.26,
    ovenStyle: 'royal',
    spatulaStyle: 'gold',
    upgradeNote: '氣派純金鑲邊雙門御膳烤爐，搭配閃亮純金鍋鏟，瞬間端出五星海陸全宴！',
  },
  {
    tierIndex: 6,
    minPoints: 1000,
    ovenName: '極光水晶稜鏡神爐',
    spatulaName: '銥金極光幻彩鍋鏟',
    ovenTierLabel: '銥金 Lv.7',
    ovenScale: 1.33,
    ovenStyle: 'aurora',
    spatulaStyle: 'iridium',
    upgradeNote: '突破千分！寒冰極光水晶爐能同時急凍雪酪與高溫炙燒，銥金神鏟光彩奪目！',
  },
  {
    tierIndex: 7,
    minPoints: 1250,
    ovenName: '永恆星果宇宙究極神爐',
    spatulaName: '五彩神話銀河金鏟',
    ovenTierLabel: '神話 MAX',
    ovenScale: 1.4,
    ovenStyle: 'cosmos',
    spatulaStyle: 'prismatic',
    upgradeNote: '1250 分最高神廚榮耀！蘊含五彩碎片與星之果實之力的宇宙級夢幻廚具！',
  },
];

export function getStudentKitchenwareTier(points: number): KitchenwareVisualTier {
  if (points < 0) return KITCHENWARE_VISUAL_TIERS[0];
  for (let i = KITCHENWARE_VISUAL_TIERS.length - 1; i >= 1; i--) {
    if (points >= KITCHENWARE_VISUAL_TIERS[i].minPoints) {
      return KITCHENWARE_VISUAL_TIERS[i];
    }
  }
  return KITCHENWARE_VISUAL_TIERS[1];
}

export const LIVE_KITCHEN_DISH_ROSTER: KitchenDishBlueprint[] = [
  {
    id: 'sdv_fried_egg',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/18/Fried_Egg.png',
    name: '煎雞蛋 (Fried Egg)',
    style: '清晨暖胃 · 基礎家常菜',
    unlockScore: 0,
    cookingUtensil: '鑄鐵平底鍋',
    buffEffect: '能量 +50 · 健康 +22',
    recipeSteps: '打入新鮮農場雞蛋，小火慢煎至蛋白微脆金黃。',
    ingredients: [
      {
        name: '雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png',
      },
    ],
    quote: '金黃微焦的太陽蛋滋滋作響，是每位小小廚師踏入廚房的第一道幸福美味！',
  },
  {
    id: 'sdv_salad',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Salad.png',
    name: '田園沙拉 (Salad)',
    style: '清爽鮮蔬 · 健康開胃菜',
    unlockScore: 50,
    cookingUtensil: '原木沙拉碗',
    buffEffect: '能量 +113 · 健康 +50',
    recipeSteps: '將鮮採蒲公英葉與甘藍菜切絲冰鎮，拌入清香醋汁。',
    ingredients: [
      {
        name: '蒲公英',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Dandelion.png',
      },
      {
        name: '甘藍菜',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/d/d1/Kale.png',
      },
    ],
    quote: '清脆蒲公英與嫩綠甘藍淋上特調醋汁，莉亞最愛的活力鮮蔬料理！',
  },
  {
    id: 'sdv_pancakes',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6b/Pancakes.png',
    name: '香甜薄煎餅 (Pancakes)',
    style: '金色早晨 · 蜂蜜烘焙',
    unlockScore: 100,
    cookingUtensil: '精鋼平底鍋',
    buffEffect: '採集 +2 · 能量 +90',
    recipeSteps: '將小麥粉與雞蛋打勻，雙面煎至金黃蓬鬆後疊高淋蜜。',
    ingredients: [
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png',
      },
    ],
    quote: '蓬鬆雙層金黃鬆餅淋上溫熱奶油糖漿，連採集大師都會讚不絕口！',
  },
  {
    id: 'sdv_pizza',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pizza.png',
    name: '窯烤披薩 (Pizza)',
    style: '石爐焗烤 · 起司牽絲',
    unlockScore: 150,
    cookingUtensil: '高溫紅磚石窯',
    buffEffect: '能量 +150 · 健康 +67',
    recipeSteps: '麵皮鋪滿多汁紅番茄與厚切奶酪，送入石窯高溫現烤。',
    ingredients: [
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '番茄',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9d/Tomato.png',
      },
      {
        name: '奶酪',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Cheese.png',
      },
    ],
    quote: '石砌磚窯現烤出爐的濃郁起司番茄披薩，山姆和謝恩每次必點！',
  },
  {
    id: 'sdv_complete_breakfast',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Complete_Breakfast.png',
    name: '完美早餐 (Complete Breakfast)',
    style: '營養滿分 · 元氣套餐',
    unlockScore: 200,
    cookingUtensil: '黃銅雙排大灶',
    buffEffect: '耕種 +2 · 能量 +200',
    recipeSteps: '同步煎好太陽蛋、薄煎餅與黃金薯餅，搭配鮮奶熱飲上桌。',
    ingredients: [
      {
        name: '煎雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/18/Fried_Egg.png',
      },
      {
        name: '牛奶',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/92/Milk.png',
      },
      {
        name: '馬鈴薯',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c2/Potato.png',
      },
    ],
    quote: '太陽蛋、香煎鬆餅與香脆薯餅的夢幻組合，吃飽飽讓體力與專注力飆升！',
  },
  {
    id: 'sdv_blueberry_tart',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Blueberry_Tart.png',
    name: '藍莓千層酥 (Blueberry Tart)',
    style: '森林漿果 · 下午茶點',
    unlockScore: 250,
    cookingUtensil: '午茶烘焙烤模',
    buffEffect: '能量 +125 · 健康 +56',
    recipeSteps: '將鮮甜藍莓裹入焦糖糖粉，填入酥脆奶香塔皮烘烤。',
    ingredients: [
      {
        name: '藍莓',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Blueberry.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '糖',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png',
      },
      {
        name: '雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png',
      },
    ],
    quote: '飽滿多汁的夏日藍莓搭配酥脆奶油派皮，下午茶時間最療癒的小確幸！',
  },
  {
    id: 'sdv_maple_bar',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/18/Maple_Bar.png',
    name: '楓糖棒 (Maple Bar)',
    style: '醇厚楓香 · 甜蜜糕點',
    unlockScore: 300,
    cookingUtensil: '黃銅熬糖銅鍋',
    buffEffect: '耕種 +1 · 採集 +1 · 挖礦 +1',
    recipeSteps: '長條酥軟麵糰炸至金黃，淋滿現採濃厚琥珀楓糖漿。',
    ingredients: [
      {
        name: '楓糖漿',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Maple_Syrup.png',
      },
      {
        name: '糖',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
    ],
    quote: '沾滿亮晶晶濃郁楓糖漿的長條甜甜圈，咬下一口滿嘴甜蜜森林氣息！',
  },
  {
    id: 'sdv_pumpkin_pie',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7d/Pumpkin_Pie.png',
    name: '黃金南瓜派 (Pumpkin Pie)',
    style: '秋收慶典 · 香料烘焙',
    unlockScore: 350,
    cookingUtensil: '楓香烘焙烤箱',
    buffEffect: '能量 +225 · 健康 +101',
    recipeSteps: '將蒸熟甜南瓜搗泥拌入牛奶與砂糖，烤成絲絨金黃派。',
    ingredients: [
      {
        name: '南瓜',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/6/64/Pumpkin.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '牛奶',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/92/Milk.png',
      },
      {
        name: '糖',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png',
      },
    ],
    quote: '剛出爐的絲滑肉桂南瓜派，是金秋豐收祭典餐桌上最耀眼的主角！',
  },
  {
    id: 'sdv_fruit_salad',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Fruit_Salad.png',
    name: '彩虹水果沙拉 (Fruit Salad)',
    style: '鮮果拼盤 · 維他命盛宴',
    unlockScore: 400,
    cookingUtensil: '溫室水晶冷盤',
    buffEffect: '能量 +263 · 健康 +118',
    recipeSteps: '現摘多汁甜瓜、藍莓與杏子切塊冰鎮，淋上微酸果露。',
    ingredients: [
      {
        name: '藍莓',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Blueberry.png',
      },
      {
        name: '甜瓜',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/19/Melon.png',
      },
      {
        name: '杏子',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fc/Apricot.png',
      },
    ],
    quote: '集結藍莓、甜瓜與杏子的繽紛果香，玻璃花房裡最受歡迎的繽紛甜品！',
  },
  {
    id: 'sdv_chocolate_cake',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/87/Chocolate_Cake.png',
    name: '濃厚巧克力蛋糕 (Chocolate Cake)',
    style: '冬夜可可 · 經典慶祝',
    unlockScore: 450,
    cookingUtensil: '雙門甜點烘烤爐',
    buffEffect: '能量 +150 · 健康 +67',
    recipeSteps: '細粉與砂糖混合濃醇蜂蜜可可烘培成海綿蛋糕體，擠上雙層巧克力花飾。',
    ingredients: [
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '糖',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png',
      },
      {
        name: '雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png',
      },
    ],
    quote: '綿密濃醇的雙層黑巧克力海綿蛋糕，最適合配著暖爐熱可可一起分享！',
  },
  {
    id: 'sdv_squid_ink_ravioli',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/86/Squid_Ink_Ravioli.png',
    name: '秘法墨汁餃 (Squid Ink Ravioli)',
    style: '奧術秘製 · 抗減益特餐',
    unlockScore: 500,
    cookingUtensil: '奧術紫晶煉金大鍋',
    buffEffect: '挖礦 +1 · 免疫負面狀態',
    recipeSteps: '以深海墨魚汁揉入細緻麵皮，包裹濃醇番茄起司燉煮入味。',
    ingredients: [
      {
        name: '魷魚墨汁',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/ac/Squid_Ink.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '番茄',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9d/Tomato.png',
      },
    ],
    quote: '閃耀神祕紫澤的手工義式餃，能讓小廚師在挑戰中抵禦一切失誤！',
  },
  {
    id: 'sdv_fried_mushroom',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/4a/Fried_Mushroom.png',
    name: '金香炒蘑菇 (Fried Mushroom)',
    style: '洞窟野味 · 蒜香快炒',
    unlockScore: 550,
    cookingUtensil: '岩漿炙火平鍋',
    buffEffect: '攻擊 +2 · 能量 +135',
    recipeSteps: '將普通蘑菇與羊肚菌切片，以大火爆炒出山林鮮甜脆香。',
    ingredients: [
      {
        name: '普通蘑菇',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Common_Mushroom.png',
      },
      {
        name: '紫蘑菇',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Purple_Mushroom.png',
      },
    ],
    quote: '在幽深洞穴微光中快火翻炒出的濃郁野菇香氣，令所有人食指大動！',
  },
  {
    id: 'sdv_maki_roll',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Maki_Roll.png',
    name: '和風生魚壽司 (Maki Roll)',
    style: '職人刀工 · 櫻花日料',
    unlockScore: 600,
    cookingUtensil: '檜木壽司竹簾',
    buffEffect: '能量 +100 · 健康 +45',
    recipeSteps: '將晶瑩香米飯平鋪於烤海苔之上，捲入現切鮮嫩鮭魚切片。',
    ingredients: [
      {
        name: '鮭魚',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Salmon.png',
      },
      {
        name: '大米',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/d/da/Rice.png',
      },
    ],
    quote: '晶瑩香米捲著鮮嫩海味與清脆海苔，展現細膩如職人般的料理功力！',
  },
  {
    id: 'sdv_plum_pudding',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a0/Plum_Pudding.png',
    name: '蜜糖李子布丁 (Plum Pudding)',
    style: '香頌茶點 · 莓果濃蜜',
    unlockScore: 700,
    cookingUtensil: '法式銅製布丁模',
    buffEffect: '能量 +175 · 健康 +78',
    recipeSteps: '甜果乾浸泡金黃花蜜後拌入麵糊細心蒸烤，切開飄散柔和果酒甜香。',
    ingredients: [
      {
        name: '野生山莓',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/25/Blackberry.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '蜂蜜',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Honey.png',
      },
    ],
    quote: '散發普羅旺斯花蜜香甜的經典歐式布丁，星月夜下品嚐最浪漫！',
  },
  {
    id: 'sdv_tropical_curry',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/32/Tropical_Curry.png',
    name: '薑島熱帶咖喱 (Tropical Curry)',
    style: '南洋香料 · 鳳梨盛盤',
    unlockScore: 750,
    cookingUtensil: '海島竹編熾烤灶',
    buffEffect: '採集 +4 · 能量 +150',
    recipeSteps: '椰奶燉煮黃金鳳梨塊與香辣紅椒，盛入整顆挖空鳳梨碗中。',
    ingredients: [
      {
        name: '椰子',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Coconut.png',
      },
      {
        name: '菠蘿',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Pineapple.png',
      },
      {
        name: '辣椒',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Hot_Pepper.png',
      },
    ],
    quote: '盛裝在整顆挖空金鑽鳳梨裡的濃郁椰香咖喱，散發陽光海風的熱情！',
  },
  {
    id: 'sdv_triple_shot_espresso',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/36/Triple_Shot_Espresso.png',
    name: '三倍濃縮咖啡 (Triple Shot Espresso)',
    style: '齒輪萃取 · 速度飆升',
    unlockScore: 850,
    cookingUtensil: '黃銅蒸氣咖啡機',
    buffEffect: '速度 +1 (長效提神)',
    recipeSteps: '三份新鮮現焙咖啡豆高壓萃取濃縮精華，滑順濃郁回甘。',
    ingredients: [
      {
        name: '咖啡',
        qty: 3,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Coffee.png',
      },
    ],
    quote: '喝一口瞬間精神百倍、走路如飛的黃金鐘樓咖啡廳神級飲品！',
  },
  {
    id: 'sdv_lobster_bisque',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/0/0a/Lobster_Bisque.png',
    name: '皇家龍蝦濃湯 (Lobster Bisque)',
    style: '宮廷海味 · 頂級主菜',
    unlockScore: 900,
    cookingUtensil: '皇家純金湯鍋',
    buffEffect: '釣魚 +3 · 能量 +225',
    recipeSteps: '整隻鮮活龍蝦熬出紅亮蝦膏，融入特選濃純鮮奶慢火收汁。',
    ingredients: [
      {
        name: '龍蝦',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Lobster.png',
      },
      {
        name: '特大牛奶',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/6/67/Large_Milk.png',
      },
    ],
    quote: '威利秘傳的金黃奶油龍蝦濃湯，每一口都濃郁鮮甜得彷彿置身皇家晚宴！',
  },
  {
    id: 'sdv_seafoam_pudding',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/33/Seafoam_Pudding.png',
    name: '海泡極光布丁 (Seafoam Pudding)',
    style: '極光幻彩 · 垂釣神助',
    unlockScore: 1000,
    cookingUtensil: '極光水晶冰鍋',
    buffEffect: '釣魚 +4 · 能量 +175',
    recipeSteps: '融合比目魚鮮露與午夜魷魚墨精華，化為如極光般碧綠閃耀的綿密布丁。',
    ingredients: [
      {
        name: '午夜魷魚',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/8/83/Midnight_Squid.png',
      },
      {
        name: '魷魚墨汁',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/ac/Squid_Ink.png',
      },
    ],
    quote: '閃爍北極光色澤的夢幻深海布丁，讓千分神廚成為全谷最傳奇的釣手！',
  },
  {
    id: 'sdv_pink_cake',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/32/Pink_Cake.png',
    name: '夢幻粉紅蛋糕 (Pink Cake)',
    style: '夢幻甜瓜 · 心心點綴',
    unlockScore: 1050,
    cookingUtensil: '金龍雙門烘焙宮窯',
    buffEffect: '能量 +250 · 健康 +112',
    recipeSteps: '鮮打甜瓜果汁揉入雪白細麵糊烘烤，裱上可愛粉紅愛心糖霜。',
    ingredients: [
      {
        name: '甜瓜',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/1/19/Melon.png',
      },
      {
        name: '小麥粉',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png',
      },
      {
        name: '糖',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png',
      },
      {
        name: '雞蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png',
      },
    ],
    quote: '用多汁甜瓜製成、點綴紅心糖霜的夢幻蛋糕，海莉與賈斯的終極夢想！',
  },
  {
    id: 'sdv_magic_rock_candy',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Magic_Rock_Candy.png',
    name: '五彩魔法冰糖 (Magic Rock Candy)',
    style: '神話至高 · 全能料理王',
    unlockScore: 1250,
    cookingUtensil: '永恆星果宇宙神爐',
    buffEffect: '採礦+2 · 幸運+5 · 速度+1 · 防禦+5 · 攻擊+5',
    recipeSteps: '將傳說五彩碎片與銀河楊桃精華於星果神壇融合結晶，凝成永恆七彩聖糖。',
    ingredients: [
      {
        name: '五彩碎片',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/5/56/Prismatic_Shard.png',
      },
      {
        name: '楊桃',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/d/db/Starfruit.png',
      },
      {
        name: '金蛋',
        qty: 1,
        iconUrl: 'https://stardewvalleywiki.com/mediawiki/images/en/9/97/Golden_Egg.png',
      },
    ],
    quote: '匯聚五彩碎片星辰魔力的傳說結晶甜點，1250 分宇宙廚神殿堂的最高榮耀！',
  },
];

export const KITCHEN_BACKGROUND_MILESTONES: KitchenArtworkTier[] = [
  {
    level: 0,
    minPoints: 0,
    nextPoints: 50,
    bgUrl: kitchen0StarterBg,
    icon: '🪵',
    kitchenTitle: '原木火塘起點小廚',
    kitchenScaleLabel: 'LV.0 起點小廚灶',
    stoveName: '柴火鑄鐵爐 & 銅茶壺',
    specialtyDish: '金黃太陽煎蛋 & 農村麵包',
    showcaseDishId: 'sdv_fried_egg',
    description: '溫馨樸實的起點小廚房，爐灶火苗剛點燃，再賺取 50 分即可升級鄉村香草備料台！',
    unlockedGearItems: [
      { emoji: '🍳', label: '鑄鐵平底鍋', quote: '煎出第一顆完美太陽蛋的魔法平底鍋！' },
      { emoji: '🫖', label: '響笛銅茶壺', quote: '爐上總是不停冒著暖暖白煙的開水壺！' },
    ],
  },
  {
    level: 1,
    minPoints: 50,
    nextPoints: 100,
    bgUrl: kitchen50CountryBg,
    icon: '🌿',
    kitchenTitle: '鼠尾草鄉村香草廚房',
    kitchenScaleLabel: 'LV.1 鄉村備料小廚',
    stoveName: '燉湯鑄鐵灶 & 原木流理台',
    specialtyDish: '田園鮮蔬沙拉 & 自釀蜂蜜果醬',
    showcaseDishId: 'sdv_salad',
    description: '突破 50 分！多出整排鼠尾草綠櫥櫃、垂掛的乾燥香草蒜辮與滿架酸甜果醬罐！',
    unlockedGearItems: [
      { emoji: '🌿', label: '懸掛乾燥香草', quote: '迷迭香與百里香讓每道菜香氣四溢！' },
      { emoji: '🫙', label: '草莓蜂蜜果醬', quote: '塗在剛烤好的麵包上實在太幸福了！' },
    ],
  },
  {
    level: 2,
    minPoints: 100,
    nextPoints: 150,
    bgUrl: kitchen100SunflowerBg,
    icon: '🌻',
    kitchenTitle: '向日葵陽光烘焙坊',
    kitchenScaleLabel: 'LV.2 黃金烘焙廚房',
    stoveName: '金磚麵包烤爐 & 中島揉麵桌',
    specialtyDish: '香甜薄煎餅 & 金黃牛角麵包',
    showcaseDishId: 'sdv_pancakes',
    description: '突破 100 分！窗外是整片向日葵花田，屋內金磚烤爐每天端出香噴噴可頌與厚鬆餅！',
    unlockedGearItems: [
      { emoji: '🥐', label: '酥香金可頌', quote: '層層酥脆的奶油香氣飄滿整座村莊！' },
      { emoji: '🌻', label: '花瓶向日葵', quote: '陽光般閃耀的花朵陪你一起開心烘焙！' },
    ],
  },
  {
    level: 3,
    minPoints: 150,
    nextPoints: 200,
    bgUrl: kitchen150StoneOvenBg,
    icon: '🍕',
    kitchenTitle: '托斯卡尼石窯披薩屋',
    kitchenScaleLabel: 'LV.3 石窯火烤廚房',
    stoveName: '圓頂石砌窯烤爐 & 大理石揉台',
    specialtyDish: '瑪格麗特窯烤披薩',
    showcaseDishId: 'sdv_pizza',
    description: '突破 150 分！閃著橘紅炭火的圓頂石砌披薩窯正式啟用，搭配大理石揉麵台與紅銅平底鍋！',
    unlockedGearItems: [
      { emoji: '🔥', label: '圓頂石窯爐', quote: '高溫炭火只需幾分鐘就能烤出拉絲披薩！' },
      { emoji: '🍅', label: '串掛紅番茄', quote: '現摘熟透的番茄與橄欖油是美味秘訣！' },
    ],
  },
  {
    level: 4,
    minPoints: 200,
    nextPoints: 250,
    bgUrl: kitchen200DoubleRangeBg,
    icon: '🥞',
    kitchenTitle: '雙爐排牧場豐盛廚房',
    kitchenScaleLabel: 'LV.4 雙爐排大廚房',
    stoveName: '黃銅雙排八口大瓦斯爐',
    specialtyDish: '完美早餐特餐 & 鮮乳漿果盅',
    showcaseDishId: 'sdv_complete_breakfast',
    description: '突破 200 分！升級雙組大型黃銅烤爐，能同時熬煮三鍋鮮湯並現煎香甜藍莓鬆餅！',
    unlockedGearItems: [
      { emoji: '🥛', label: '牧場鮮奶瓶', quote: '每天清晨直送的濃醇純鮮乳！' },
      { emoji: '🫐', label: '鮮採莓果籃', quote: '滿滿草莓與藍莓點亮整桌完美早餐！' },
    ],
  },
  {
    level: 5,
    minPoints: 250,
    nextPoints: 300,
    bgUrl: kitchen250WoodlandTeaBg,
    icon: '🫐',
    kitchenTitle: '林間野莓手沖茶屋',
    kitchenScaleLabel: 'LV.5 森系午茶吧台',
    stoveName: '綠林鐵爐 & 彩繪陶瓷茶具牆',
    specialtyDish: '藍莓千層酥 & 野花抹茶拿鐵',
    showcaseDishId: 'sdv_blueberry_tart',
    description: '突破 250 分！青苔木樑下陳列著繽紛手繪茶壺牆與雙層野莓塔架，充滿童話森林茶會氣息！',
    unlockedGearItems: [
      { emoji: '🫖', label: '彩繪瓷茶壺', quote: '收藏世界各地花紋的夢幻下午茶組！' },
      { emoji: '🥧', label: '雙層莓果塔', quote: '每一顆野莓都閃耀著林間晨露！' },
    ],
  },
  {
    level: 6,
    minPoints: 300,
    nextPoints: 350,
    bgUrl: kitchen300OrchardBg,
    icon: '🍯',
    kitchenTitle: '果園壓榨蜜釀醬坊',
    kitchenScaleLabel: 'LV.6 果香蜜釀工坊',
    stoveName: '巨型橡木壓果機 & 熬煮銅大鍋',
    specialtyDish: '楓糖棒 & 熱香料蘋果汁',
    showcaseDishId: 'sdv_maple_bar',
    description: '突破 300 分！整面木牆排滿紅寶石草莓醬與水蜜桃果泥罐，木製壓果機香氣撲鼻！',
    unlockedGearItems: [
      { emoji: '🍎', label: '橡木壓汁機', quote: '現榨鮮甜果實濃縮成一瓶瓶甜蜜果露！' },
      { emoji: '🍲', label: '琥珀熬糖銅鍋', quote: '咕嘟咕嘟熬出閃亮濃郁的焦糖與楓糖漿！' },
    ],
  },
  {
    level: 7,
    minPoints: 350,
    nextPoints: 400,
    bgUrl: kitchen350AutumnSpiceBg,
    icon: '🎃',
    kitchenTitle: '金秋楓香南瓜烘焙閣',
    kitchenScaleLabel: 'LV.7 秋收暖香廚坊',
    stoveName: '紅磚暖爐與銅邊烘焙大灶',
    specialtyDish: '黃金肉桂南瓜派 & 糖霜捲',
    showcaseDishId: 'sdv_pumpkin_pie',
    description: '突破 350 分！夕陽下的金秋廚房點綴著火紅楓葉花環，滿桌南瓜派與肉桂捲令人垂涎欲滴！',
    unlockedGearItems: [
      { emoji: '🎃', label: '金秋甜南瓜', quote: '現蒸南瓜泥讓派餡綿密得像絲絨一樣！' },
      { emoji: '🥨', label: '肉桂糖霜捲', quote: '剛出爐就立刻被同學們排隊預約一空！' },
    ],
  },
  {
    level: 8,
    minPoints: 400,
    nextPoints: 450,
    bgUrl: kitchen400GlasshouseBg,
    icon: '🥗',
    kitchenTitle: '植物玻璃溫室鮮食館',
    kitchenScaleLabel: 'LV.8 溫室鮮萃廚房',
    stoveName: '大理石鮮萃長島 & 香草育苗架',
    specialtyDish: '彩虹水果沙拉 & 檸檬薄荷特調',
    showcaseDishId: 'sdv_fruit_salad',
    description: '突破 400 分！拱形透明玻璃屋頂垂掛滿盆新鮮香草與檸檬樹，現摘現切最清甜！',
    unlockedGearItems: [
      { emoji: '🍋', label: '現摘鮮黃檸檬', quote: '替每盤水果沙拉增添最清新的陽光果酸！' },
      { emoji: '🪴', label: '懸吊香草籃', quote: '伸手就能摘下新鮮薄荷與羅勒葉點綴擺盤！' },
    ],
  },
  {
    level: 9,
    minPoints: 450,
    nextPoints: 500,
    bgUrl: kitchen450WinterCocoaBg,
    icon: '🍫',
    kitchenTitle: '冬雪木屋熱可可甜坊',
    kitchenScaleLabel: 'LV.9 冬雪溫暖甜品屋',
    stoveName: '石砌松枝壁爐 & 熱可可銅鍋',
    specialtyDish: '濃厚巧克力蛋糕 & 薑餅屋',
    showcaseDishId: 'sdv_chocolate_cake',
    description: '突破 450 分！窗外大雪紛飛，屋內壁爐閃耀暖光，棉花糖熱可可配糖霜薑餅屋最療癒！',
    unlockedGearItems: [
      { emoji: '🏠', label: '糖霜薑餅屋', quote: '屋頂灑滿糖粉的精緻點心藝術品！' },
      { emoji: '☕', label: '棉花糖熱可可', quote: '喝一口從手心暖到心底的冬日魔法飲品！' },
    ],
  },
  {
    level: 10,
    minPoints: 500,
    nextPoints: 550,
    bgUrl: kitchen500WizardAlchemyBg,
    icon: '🔮',
    kitchenTitle: '奧術星果魔法煉金廚',
    kitchenScaleLabel: 'LV.10 奇幻魔藥廚房',
    stoveName: '星紋浮光紫晶雙魔藥大鍋',
    specialtyDish: '秘法墨汁餃 & 星果長生露',
    showcaseDishId: 'sdv_squid_ink_ravioli',
    description: '突破 500 分！在發光魔法陣上烹煮紫晶奇幻佳餚，瓶瓶星之果實露水閃耀奇蹟光芒！',
    unlockedGearItems: [
      { emoji: '🧪', label: '發光魔藥罐', quote: '一滴魔法香辛料就能讓整道菜飄浮閃光！' },
      { emoji: '⭐', label: '星果金露瓶', quote: '充滿森林奧秘與雙倍靈感的奇蹟飲品！' },
    ],
  },
  {
    level: 11,
    minPoints: 550,
    nextPoints: 600,
    bgUrl: kitchen550TruffleBistroBg,
    icon: '🍄',
    kitchenTitle: '螢火松露洞窟私廚館',
    kitchenScaleLabel: 'LV.11 秘境私廚工坊',
    stoveName: '石拱雙口岩漿熱火煎台',
    specialtyDish: '現刨黑松露野菇燉飯',
    showcaseDishId: 'sdv_fried_mushroom',
    description: '突破 550 分！洞壁綻放藍紫夜光蘑菇微光，滿籃珍貴黑松露在銅鍋裡滋滋煎出極品鮮香！',
    unlockedGearItems: [
      { emoji: '🍄', label: '夜光紫蘑菇', quote: '發著柔光的稀世森林蘑菇是主廚珍藏！' },
      { emoji: '🧺', label: '整籃黑松露', quote: '農場小豬辛苦掘出的頂級黑金松露！' },
    ],
  },
  {
    level: 12,
    minPoints: 600,
    nextPoints: 650,
    bgUrl: kitchen600SakuraMatchaBg,
    icon: '🍣',
    kitchenTitle: '和風櫻花壽司抹茶館',
    kitchenScaleLabel: 'LV.12 職人料亭御廚',
    stoveName: '檜木板前壽司檯 & 茶釜湯鍋',
    specialtyDish: '和風生魚壽司 & 手刷宇治抹茶',
    showcaseDishId: 'sdv_maki_roll',
    description: '突破 600 分！飄落櫻花瓣的障子門庭院前，端坐檜木壽司吧台品嚐手捲壽司與翡翠抹茶！',
    unlockedGearItems: [
      { emoji: '🍵', label: '竹筅手刷抹茶', quote: '打出綿密細泡的濃郁京都風味茶湯！' },
      { emoji: '🍣', label: '板前鮮魚壽司', quote: '刀工細膩、醋飯香甜的星露谷海味代表！' },
    ],
  },
  {
    level: 13,
    minPoints: 650,
    nextPoints: 700,
    bgUrl: kitchen650LavenderBg,
    icon: '🪻',
    kitchenTitle: '普羅旺斯薰衣草甜點坊',
    kitchenScaleLabel: 'LV.13 南法香頌甜廚',
    stoveName: '粉紫鄉村烤爐 & 黃銅攪拌機',
    specialtyDish: '蜜糖夾心馬卡龍塔 & 紫羅蘭蛋糕',
    showcaseDishId: 'sdv_plum_pudding',
    description: '突破 650 分！推開落地門就是紫色薰衣草花海，玻璃餅乾櫃裡擺滿彩虹馬卡龍與花蜜千層！',
    unlockedGearItems: [
      { emoji: '🧁', label: '彩虹馬卡龍塔', quote: '外酥內軟的夢幻法式甜點珠寶！' },
      { emoji: '🪻', label: '普羅旺斯花束', quote: '淡淡花香混合著烘焙奶油甜香！' },
    ],
  },
  {
    level: 14,
    minPoints: 700,
    nextPoints: 750,
    bgUrl: kitchen700MoonlitBg,
    icon: '🌙',
    kitchenTitle: '星月玻璃天窗餐酒廚',
    kitchenScaleLabel: 'LV.14 星夜主廚餐桌',
    stoveName: '黑金黃銅專業雙烤箱大灶',
    specialtyDish: '星夜藍莓派 & 月光松露燉飯',
    showcaseDishId: 'sdv_fiddlehead_risotto',
    description: '突破 700 分！拱形玻璃穹頂直接框住銀河與彎月，蠟燭微光下端出熱騰騰燉飯與藍莓派！',
    unlockedGearItems: [
      { emoji: '🕯️', label: '燭光長吧台', quote: '浪漫溫馨的夜晚小廚美食時光！' },
      { emoji: '🌙', label: '銀河玻璃頂', quote: '一邊看星座閃爍一邊大顯身手！' },
    ],
  },
  {
    level: 15,
    minPoints: 750,
    nextPoints: 800,
    bgUrl: kitchen750GingerIslandBg,
    icon: '🏝️',
    kitchenTitle: '薑島椰林沙灘火焰吧',
    kitchenScaleLabel: 'LV.15 海島度假御廚',
    stoveName: '竹編海灘炙烤雙爐灶',
    specialtyDish: '薑島熱帶咖喱 & 金鑽鳳梨果昔',
    showcaseDishId: 'sdv_tropical_curry',
    description: '突破 750 分！茅草竹屋緊鄰碧藍海灣，現切香蕉芒果、椰子殼盛湯與滋滋飄香的熱帶咖喱！',
    unlockedGearItems: [
      { emoji: '🍍', label: '鳳梨鮮果飲', quote: '插著小雨傘的冰涼海島迎賓特調！' },
      { emoji: '🥭', label: '黃金芒果籃', quote: '薑島剛摘下的熟甜熱帶水果總匯！' },
    ],
  },
  {
    level: 16,
    minPoints: 800,
    nextPoints: 850,
    bgUrl: kitchen800SeasideBarBg,
    icon: '🦞',
    kitchenTitle: '碧海拱窗極鮮海鮮館',
    kitchenScaleLabel: 'LV.16 海港五星海鮮殿',
    stoveName: '壁爐海鮮銅鍋 & 碎冰鮮魚檯',
    specialtyDish: '現蒸帝王蟹 & 海鮮雜燴湯',
    showcaseDishId: 'sdv_chowder',
    description: '突破 800 分！雙面拱形海景窗遠眺燈塔帆船，碎冰台鋪滿藍蟹生蠔與豪華刺身拚盤！',
    unlockedGearItems: [
      { emoji: '🦀', label: '極鮮碎冰台', quote: '漁船當日現撈直達廚房的海洋鮮味！' },
      { emoji: '🍲', label: '濃郁海鮮湯', quote: '用龍蝦殼與奶油慢火熬煮的金色鮮湯！' },
    ],
  },
  {
    level: 17,
    minPoints: 850,
    nextPoints: 900,
    bgUrl: kitchen850ClockworkBg,
    icon: '☕',
    kitchenTitle: '黃金齒輪咖啡烘豆殿',
    kitchenScaleLabel: 'LV.17 蒸氣龐克咖啡廳',
    stoveName: '銅製蒸氣烘豆塔 & 多頭義式機',
    specialtyDish: '三倍濃縮咖啡 & 提拉米蘇塔',
    showcaseDishId: 'sdv_triple_shot_espresso',
    description: '突破 850 分！金色巨輪精密運轉烘焙頂級可可豆，濃郁咖啡香氣配滑順提拉米蘇無敵！',
    unlockedGearItems: [
      { emoji: '⚙️', label: '黃金烘豆塔', quote: '精準控溫將每一顆咖啡豆烘出焦糖醇香！' },
      { emoji: '🍰', label: '絲滑提拉米蘇', quote: '大人小孩都會愛上的可可千層甜品！' },
    ],
  },
  {
    level: 18,
    minPoints: 900,
    nextPoints: 950,
    bgUrl: kitchen900RoyalBanquetBg,
    icon: '👑',
    kitchenTitle: '皇家金輝宮廷御膳房',
    kitchenScaleLabel: 'LV.18 王室御膳大殿',
    stoveName: '四連金飾大理石皇家烤爐陣',
    specialtyDish: '皇家龍蝦濃湯 & 銀蓋烤全宴',
    showcaseDishId: 'sdv_lobster_bisque',
    description: '突破 900 分！挑高白石穹頂與水晶大吊燈下，金色鑲邊烤爐同時烹調最氣派的王室饗宴！',
    unlockedGearItems: [
      { emoji: '👑', label: '銀輝覆蓋盅', quote: '掀開銀蓋瞬間滿桌金色美味閃耀全場！' },
      { emoji: '🕯️', label: '宮廷水晶燈', quote: '照亮整座長桌金盤銀器的貴族光輝！' },
    ],
  },
  {
    level: 19,
    minPoints: 950,
    nextPoints: 1000,
    bgUrl: kitchen950CloudSouffleBg,
    icon: '☁️',
    kitchenTitle: '雲端白玉舒芙蕾甜苑',
    kitchenScaleLabel: 'LV.19 浮空雲海甜點殿',
    stoveName: '七彩粉晶浮空發光烘爐',
    specialtyDish: '雲朵草莓舒芙蕾 & 虹彩聖代',
    showcaseDishId: 'sdv_ice_cream',
    description: '突破 950 分！白玉拱廊飄浮在彩虹雲海之間，粉紅水晶烤爐烘出比雲朵更綿軟的舒芙蕾！',
    unlockedGearItems: [
      { emoji: '🌈', label: '雲端彩虹拱', quote: '推開窗就能觸摸到棉花糖般的七彩雲朵！' },
      { emoji: '🍨', label: '水晶聖代瓶', quote: '閃閃發光的雲海果醬優格甜杯！' },
    ],
  },
  {
    level: 20,
    minPoints: 1000,
    nextPoints: 1050,
    bgUrl: kitchen1000AuroraIceBg,
    icon: '✨',
    kitchenTitle: '星露極光冰晶甜品殿',
    kitchenScaleLabel: 'LV.20 千分傳奇極光廚',
    stoveName: '星鑽冰雪吧台 & 極光水晶灶',
    specialtyDish: '彩虹極光雪酪 & 星型餅乾塔',
    showcaseDishId: 'sdv_seafoam_pudding',
    description: '達成 1000 分傳奇！北極光透過萬花筒晶拱灑落星塵冰沙吧台，每份甜點都像寶石般閃耀！',
    unlockedGearItems: [
      { emoji: '🍧', label: '極光七彩雪酪', quote: '將北極光的色彩冰封進甜美果汁雪酪中！' },
      { emoji: '💎', label: '水晶拱頂門', quote: '折射夢幻翡翠與紫羅蘭極光的雪宮走廊！' },
    ],
  },
  {
    level: 21,
    minPoints: 1050,
    nextPoints: 1100,
    bgUrl: kitchen1050JadeDimsumBg,
    icon: '🐉',
    kitchenTitle: '翡翠金龍禦品點心閣',
    kitchenScaleLabel: 'LV.21 國寶翡翠御膳廳',
    stoveName: '青龍雕柱巨型萬層蒸籠灶',
    specialtyDish: '蓮花瓷壺銘茶 & 粉紅甜瓜蛋糕',
    showcaseDishId: 'sdv_pink_cake',
    description: '突破 1050 分！金龍盤繞翡翠玉柱，中央旺火蒸騰著層層黃金流沙包與粉蓮御茶！',
    unlockedGearItems: [
      { emoji: '🥟', label: '黃金萬層蒸籠', quote: '掀蓋瞬時湧出馥郁白煙與點心鮮香！' },
      { emoji: '🪷', label: '青瓷蓮花茶壺', quote: '皇帝御用等級的高雅清茶點心席！' },
    ],
  },
  {
    level: 22,
    minPoints: 1100,
    nextPoints: 1150,
    bgUrl: kitchen1100CelestialGoldBg,
    icon: '🪽',
    kitchenTitle: '天界金羽聖光宴會廳',
    kitchenScaleLabel: 'LV.22 天宮金翼料理殿',
    stoveName: '自動懸浮黃金鍋組 & 星果轉塔',
    specialtyDish: '黃金星果塔 & 蜂蜜仙露',
    showcaseDishId: 'sdv_autumn_s_bounty',
    description: '突破 1100 分！金色翅膀拱門下，閃亮金鍋竟然自己飛在半空中翻炒，金塔點心如陽光閃耀！',
    unlockedGearItems: [
      { emoji: '🍳', label: '浮空黃金平鍋', quote: '受祝福的黃金廚具會自動翻炒出完美火候！' },
      { emoji: '🌟', label: '星果金旋轉塔', quote: '三層高塔擺滿閃閃發光的黃金星果派！' },
    ],
  },
  {
    level: 23,
    minPoints: 1150,
    nextPoints: 1200,
    bgUrl: kitchen1150GalaxyBg,
    icon: '🌌',
    kitchenTitle: '銀河星雲分子料理室',
    kitchenScaleLabel: 'LV.23 宇宙星辰分子殿',
    stoveName: '霓虹稜鏡反重力烹飪中島',
    specialtyDish: '浮空銀河千層 & 星際水果露',
    showcaseDishId: 'sdv_super_meal',
    description: '突破 1150 分！玻璃天頂外是旋轉土星與璀璨星雲，霓虹餐檯上的奇幻甜點正緩緩漂浮自轉！',
    unlockedGearItems: [
      { emoji: '🪐', label: '星雲分子甜品', quote: '咬一口彷彿在宇宙銀河裡漫步的奇幻美味！' },
      { emoji: '⚡', label: '雷射炙燒槍', quote: '未來科技與星露谷農產融合的巔峰料理術！' },
    ],
  },
  {
    level: 24,
    minPoints: 1200,
    nextPoints: 1250,
    bgUrl: kitchen1200SolarHallBg,
    icon: '☀️',
    kitchenTitle: '帝國金陽萬國盛宴廳',
    kitchenScaleLabel: 'LV.24 金陽凱旋御廚殿',
    stoveName: '雙翼純金磚窯 & 雙長列皇室中島',
    specialtyDish: '全席金陽海陸大餐 & 歡慶蛋糕',
    showcaseDishId: 'sdv_red_plate',
    description: '突破 1200 分！巨型彩繪太陽玻璃窗光芒萬丈，雙座黃金長島擺滿各國珍饈迎接榮耀凱旋！',
    unlockedGearItems: [
      { emoji: '☀️', label: '太陽聖光彩窗', quote: '金燦陽光灑落在每一道閃亮御膳上！' },
      { emoji: '🍽️', label: '萬國珍饈長席', quote: '足以招待全校師生共享歡慶的夢幻盛宴！' },
    ],
  },
  {
    level: 25,
    minPoints: 1250,
    nextPoints: null,
    bgUrl: kitchen1250CosmosBg,
    icon: '💎',
    kitchenTitle: '永恆星果宇宙廚神殿',
    kitchenScaleLabel: 'LV.25 至高宇宙神廚宮',
    stoveName: '浮空星之果實晶壇 & 星雲雙穹窯',
    specialtyDish: '五彩魔法冰糖 & 傳說星果滿漢席',
    showcaseDishId: 'sdv_magic_rock_candy',
    description: '達成 1250 分至高宇宙神廚傳說！雙道七彩彩虹瀑布環繞浮空星之果實料理壇，25 座夢幻廚房全制霸！',
    unlockedGearItems: [
      { emoji: '🌟', label: '星之果實晶壇', quote: '蘊含宇宙所有風味與祝福的最高廚藝殿堂！' },
      { emoji: '🌈', label: '七彩雙極瀑布', quote: '源源不絕湧出純淨虹光星泉的夢幻聖境！' },
      { emoji: '🍬', label: '五彩魔法冰糖', quote: '全星露谷最強傳說甜點就在這裡誕生！' },
    ],
  },
];

export const SOOTY_KITCHEN_ARTWORK: KitchenArtworkTier = {
  level: -1,
  minPoints: -999,
  nextPoints: 0,
  bgUrl: kitchenWitheredBg,
  icon: '🕸️',
  kitchenTitle: '冷清積灰舊灶間',
  kitchenScaleLabel: '待整理舊灶 (<0分)',
  stoveName: '未點火舊鐵爐 & 待洗鍋具',
  specialtyDish: '等待重燃爐火的第一道熱菜',
  showcaseDishId: 'sdv_fried_egg',
  description: '目前處於負分冷灶期，努力加分回到 0 分以上就能點燃溫暖爐火、展開美味料理冒險！',
  unlockedGearItems: [
    { emoji: '🪵', label: '備用乾柴堆', quote: '只要加分回到正分，就能立刻生火煮熱呼呼的大餐！' },
  ],
  isSooty: true,
};

export function getStudentKitchenArtwork(points: number): KitchenArtworkTier {
  if (points < 0) {
    return SOOTY_KITCHEN_ARTWORK;
  }

  for (let i = KITCHEN_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= KITCHEN_BACKGROUND_MILESTONES[i].minPoints) {
      return KITCHEN_BACKGROUND_MILESTONES[i];
    }
  }

  return KITCHEN_BACKGROUND_MILESTONES[0];
}
