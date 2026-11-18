import bathWitheredFoggyBg from '../assets/images/bath_withered_foggy_1795002233662.jpg';
import bath0WoodenBasinBg from '../assets/images/bath_0_wooden_basin_1795002233812.jpg';
import bath50MintTileBg from '../assets/images/bath_50_mint_tile_1795002234728.jpg';
import bath100SunflowerTubBg from '../assets/images/bath_100_sunflower_tub_1795002235184.jpg';
import bath150BubbleFoamBg from '../assets/images/bath_150_bubble_foam_1795002235472.jpg';
import bath200CopperShowerBg from '../assets/images/bath_200_copper_shower_1795002235960.jpg';
import bath250HerbalSaunaBg from '../assets/images/bath_250_herbal_sauna_1795002236619.jpg';
import bath300PeachSpaBg from '../assets/images/bath_300_peach_spa_1795002237436.jpg';
import bath350AutumnOnsenBg from '../assets/images/bath_350_autumn_onsen_1795002238367.jpg';
import bath400GreenhouseBathBg from '../assets/images/bath_400_greenhouse_bath_1795002238144.jpg';
import bath450WinterHotspringBg from '../assets/images/bath_450_winter_hotspring_1795002238935.jpg';
import bath500AmethystBathBg from '../assets/images/bath_500_amethyst_bath_1795002239517.jpg';
import bath550BambooSpaBg from '../assets/images/bath_550_bamboo_spa_1795002239634.jpg';
import bath600SakuraOnsenBg from '../assets/images/bath_600_sakura_onsen_1795002240123.jpg';
import bath650LavenderSoapBg from '../assets/images/bath_650_lavender_soap_1795002242119.jpg';
import bath700MoonlitPoolBg from '../assets/images/bath_700_moonlit_pool_1795002240594.jpg';
import bath750GingerLagoonBg from '../assets/images/bath_750_ginger_lagoon_1795002242066.jpg';
import bath800CoralMermaidBg from '../assets/images/bath_800_coral_mermaid_1795002242939.jpg';
import bath850SteampunkBathBg from '../assets/images/bath_850_steampunk_bath_1795002243063.jpg';
import bath900RoyalMarbleBg from '../assets/images/bath_900_royal_marble_1795002243549.jpg';
import bath950CloudJacuzziBg from '../assets/images/bath_950_cloud_jacuzzi_1795002244011.jpg';
import bath1000AuroraIceBg from '../assets/images/bath_1000_aurora_ice_1795002244543.jpg';
import bath1050JadeEmperorBg from '../assets/images/bath_1050_jade_emperor_1795002244973.jpg';
import bath1100CelestialSwanBg from '../assets/images/bath_1100_celestial_swan_1795002245854.jpg';
import bath1150GalaxyNebulaBg from '../assets/images/bath_1150_galaxy_nebula_1795002246249.jpg';
import bath1200SolarPalaceBg from '../assets/images/bath_1200_solar_palace_1795002247472.jpg';
import bath1250EternalCosmosBg from '../assets/images/bath_1250_eternal_cosmos_1795002247804.jpg';

export interface BathroomArtworkTier {
  level: number;
  minPoints: number;
  nextPoints: number | null;
  bgUrl: string;
  icon: string;
  bathroomTitle: string;
  bathroomScaleLabel: string;
  tubFacility: string;
  signatureAroma: string;
  description: string;
  unlockedBathFeatures: { emoji: string; label: string; quote: string }[];
  isFoggy?: boolean;
}

export interface BathwareVisualTier {
  tierIndex: number;
  minPoints: number;
  tubName: string;
  showerName: string;
  tierLabel: string;
  tubScale: number;
  tubStyle: 'foggy' | 'wooden' | 'mint' | 'bubble' | 'copper' | 'amethyst' | 'royal' | 'aurora' | 'cosmos';
  showerStyle: 'leaky' | 'wooden' | 'porcelain' | 'brass' | 'amethyst' | 'gold' | 'prismatic';
  upgradeNote: string;
}

export interface BathroomSpaItem {
  id: string;
  url: string;
  name: string;
  category: string;
  unlockScore: number;
  aromaEffect: string;
  usageTip: string;
  quote: string;
}

export const BATHWARE_VISUAL_TIERS: BathwareVisualTier[] = [
  {
    tierIndex: -1,
    minPoints: -999,
    tubName: '滴水舊木盆',
    showerName: '生鏽小水瓢',
    tierLabel: '舊浴 Lv.0',
    tubScale: 0.8,
    tubStyle: 'foggy',
    showerStyle: 'leaky',
    upgradeNote: '快加分回到 0 分以上，把洗手間打掃得閃閃發亮！',
  },
  {
    tierIndex: 0,
    minPoints: 0,
    tubName: '原木檜木小浴桶',
    showerName: '手工木杓水龍頭',
    tierLabel: '原木 Lv.1',
    tubScale: 0.88,
    tubStyle: 'wooden',
    showerStyle: 'wooden',
    upgradeNote: '散發淡淡木頭清香的新手澡盆，湊滿 50 分就能換上瓷磚新浴室！',
  },
  {
    tierIndex: 1,
    minPoints: 50,
    tubName: '薄荷瓷釉清新浴缸',
    showerName: '亮白陶瓷花灑',
    tierLabel: '瓷釉 Lv.2',
    tubScale: 0.96,
    tubStyle: 'mint',
    showerStyle: 'porcelain',
    upgradeNote: '明亮薄荷瓷磚與乾淨陶瓷浴缸登場，每天洗手泡澡心情大好！',
  },
  {
    tierIndex: 2,
    minPoints: 150,
    tubName: '雲朵泡泡貓腳大浴缸',
    showerName: '柔霧雙溫蓮蓬頭',
    tierLabel: '泡泡 Lv.3',
    tubScale: 1.04,
    tubStyle: 'bubble',
    showerStyle: 'porcelain',
    upgradeNote: '浴缸變大還會冒出綿密泡泡，小黃鴨也在水面上快樂游泳囉！',
  },
  {
    tierIndex: 3,
    minPoints: 300,
    tubName: '鍛銅恆溫玫瑰花瓣浴缸',
    showerName: '復古黃銅雨淋花灑',
    tierLabel: '鍛銅 Lv.4',
    tubScale: 1.12,
    tubStyle: 'copper',
    showerStyle: 'brass',
    upgradeNote: '質感黃銅大型花灑與花瓣浴缸，水溫永遠剛剛好，香噴噴又療癒！',
  },
  {
    tierIndex: 4,
    minPoints: 500,
    tubName: '奧術紫晶魔藥按摩池',
    showerName: '星紋紫晶秘法花灑',
    tierLabel: '魔導 Lv.5',
    tubScale: 1.2,
    tubStyle: 'amethyst',
    showerStyle: 'amethyst',
    upgradeNote: '紫水晶散發柔和魔力微光，泡澡同時瞬間補滿整天活力能量！',
  },
  {
    tierIndex: 5,
    minPoints: 750,
    tubName: '皇家純金大理石溫泉池',
    showerName: '純金瀑布雨淋龍頭',
    tierLabel: '黃金 Lv.6',
    tubScale: 1.26,
    tubStyle: 'royal',
    showerStyle: 'gold',
    upgradeNote: '氣派大理石金邊浴池搭配純金瀑布淋浴頭，宛如宮廷渡假勝地！',
  },
  {
    tierIndex: 6,
    minPoints: 1000,
    tubName: '極光水晶冰藍按摩池',
    showerName: '極光稜鏡星雨花灑',
    tierLabel: '極光 Lv.7',
    tubScale: 1.33,
    tubStyle: 'aurora',
    showerStyle: 'prismatic',
    upgradeNote: '突破千分！極光流光在池面閃耀，水流化作閃亮晶瑩的星雨！',
  },
  {
    tierIndex: 7,
    minPoints: 1250,
    tubName: '永恆星之果實夢幻按摩聖池',
    showerName: '五彩銀河聖光水幕',
    tierLabel: '神話 MAX',
    tubScale: 1.4,
    tubStyle: 'cosmos',
    showerStyle: 'prismatic',
    upgradeNote: '1250 分洗手間最高殿堂！七彩星果神泉瀑布永不枯竭！',
  },
];

export function getStudentBathwareTier(points: number): BathwareVisualTier {
  if (points < 0) return BATHWARE_VISUAL_TIERS[0];
  for (let i = BATHWARE_VISUAL_TIERS.length - 1; i >= 1; i--) {
    if (points >= BATHWARE_VISUAL_TIERS[i].minPoints) {
      return BATHWARE_VISUAL_TIERS[i];
    }
  }
  return BATHWARE_VISUAL_TIERS[1];
}

export const LIVE_BATHROOM_SPA_ROSTER: BathroomSpaItem[] = [
  {
    id: 'bath_item_soapstone',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/81/Soapstone.png',
    name: '手工溫潤肥皂石 (Soapstone)',
    category: '基礎潔淨 · 礦石香皂',
    unlockScore: 0,
    aromaEffect: '潔淨手感 +1 · 柔滑保濕',
    usageTip: '洗手前輕搓 20 秒，綿密泡泡帶走所有灰塵與疲憊。',
    quote: '滑溜溫潤的天然肥皂石，放在原木洗手台旁最乾淨清爽！',
  },
  {
    id: 'bath_item_cloth',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/51/Cloth.png',
    name: '蓬鬆純棉擦手巾 (Fluffy Cloth)',
    category: '織品備品 · 柔暖棉巾',
    unlockScore: 50,
    aromaEffect: '保暖乾燥 +2 · 柔軟滿分',
    usageTip: '剛洗完手臉用陽光曬過的純棉毛巾輕輕按乾，超級舒服。',
    quote: '艾米麗親手織的軟綿綿毛巾，擦手就像被雲朵包圍一樣！',
  },
  {
    id: 'bath_item_sunflower',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/81/Sunflower.png',
    name: '向日葵精油泡泡球 (Sunflower Bath)',
    category: '陽光植萃 · 精油浴球',
    unlockScore: 100,
    aromaEffect: '好心情 +3 · 陽光花香',
    usageTip: '丟進溫熱浴缸裡立刻滋滋冒泡，整間浴室瞬間充滿向日葵香氣！',
    quote: '海莉最推薦的夏日金色泡泡球，泡完精神百倍！',
  },
  {
    id: 'bath_item_duck',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/38/Duck.png',
    name: '嘎嘎漂浮澡盆鴨 (Bath Duck)',
    category: '療癒伴偶 · 戲水夥伴',
    unlockScore: 150,
    aromaEffect: '快樂指數 +5 · 水花四濺',
    usageTip: '輕按鴨嘴會發出可愛的「嘎～！」聲，陪你開心泡泡泡浴。',
    quote: '沒有小鴨鴨的泡泡浴就不算完整啦～今天也要快樂學習！',
  },
  {
    id: 'bath_item_duck_feather',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Duck_Feather.png',
    name: '翡翠羽絨沐浴刷 (Feather Brush)',
    category: '精緻浴具 · 柔嫩刷具',
    unlockScore: 200,
    aromaEffect: '光澤柔亮 +3 · 輕柔呵護',
    usageTip: '閃耀綠寶石光澤的柔軟羽毛，拿來拂拭水珠超級夢幻。',
    quote: '陽光照射下閃著虹彩光芒的幸運鴨羽，洗手間收藏級寶物！',
  },
  {
    id: 'bath_item_green_tea',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/8f/Green_Tea.png',
    name: '卡洛琳綠茶足浴湯包 (Green Tea Spa)',
    category: '草本桑拿 · 舒緩湯包',
    unlockScore: 250,
    aromaEffect: '放鬆專注 +4 · 清新茶韻',
    usageTip: '投入蒸汽桑拿木桶，清幽抹茶蒸氣讓人立刻靜下心來！',
    quote: '茶室摘下的嫩綠茶葉，在桑拿房裡蒸出滿滿森林氣息～',
  },
  {
    id: 'bath_item_sweet_pea',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/d9/Sweet_Pea.png',
    name: '甜豌豆香氛浴鹽 (Sweet Pea Salts)',
    category: '甜蜜花浴 · 香氛浴鹽',
    unlockScore: 300,
    aromaEffect: '甜美香氛 +5 · 柔和舒壓',
    usageTip: '加入兩匙粉紫結晶浴鹽，池水立刻散發迷人甜美花果香。',
    quote: '水蜜桃色浴缸搭上甜豌豆香氣，連空氣都變得甜蜜起來！',
  },
  {
    id: 'bath_item_honey',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Honey.png',
    name: '野花蜂蜜潤膚露 (Wild Honey Balm)',
    category: '滋養保養 · 蜂蜜護膚',
    unlockScore: 350,
    aromaEffect: '水嫩潤澤 +5 · 秋日暖甜',
    usageTip: '泡完溫泉後在雙手抹上一點蜂蜜護膚露，暖呼呼又嫩滑！',
    quote: '金黃濃稠的花蜜精華，守護秋冬不乾燥的小秘訣。',
  },
  {
    id: 'bath_item_tulip',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/cf/Tulip.png',
    name: '鬱金香花瓣泡澡盅 (Tulip Petals)',
    category: '溫室花浴 · 花瓣湯池',
    unlockScore: 400,
    aromaEffect: '春意盎然 +6 · 花瓣漂浮',
    usageTip: '撒一把新鮮鬱金香花瓣在水面上，拍張超美的溫室浴室打卡照！',
    quote: '繽紛花瓣隨著水波輕輕晃動，宛如置身植物園秘境～',
  },
  {
    id: 'bath_item_crocus',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Crocus.png',
    name: '雪山藏紅花暖泉精萃 (Crocus Onsen)',
    category: '冬雪秘湯 · 暖身精萃',
    unlockScore: 450,
    aromaEffect: '抗寒保暖 +6 · 暖心湯泉',
    usageTip: '下雪天泡在加入藏紅花的熱湯池裡，從腳尖暖到頭頂！',
    quote: '冬日雪地綻放的珍貴花朵，讓熱騰騰的溫泉更有魔力。',
  },
  {
    id: 'bath_item_amethyst',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Amethyst.png',
    name: '紫水晶能量礦物浴鹽 (Amethyst Salts)',
    category: '魔法能量 · 礦晶浴鹽',
    unlockScore: 500,
    aromaEffect: '魔力回復 +8 · 紫晶星光',
    usageTip: '整顆紫水晶結晶放進池底發光，艾比蓋爾最愛的夢幻浴池！',
    quote: '神秘紫光映照著星空磁磚，泡澡就像在做魔法能量補給！',
  },
  {
    id: 'bath_item_aquamarine',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a2/Aquamarine.png',
    name: '海藍寶石清涼湧泉石 (Aquamarine Spring)',
    category: '山泉水景 · 清澈透亮',
    unlockScore: 550,
    aromaEffect: '清涼淨化 +8 · 澄澈山泉',
    usageTip: '竹筒湧泉水流經過海藍寶石變得格外冰涼清澈，洗臉超醒腦！',
    quote: '聽著叮咚流水聲與竹林風聲，心情瞬間平靜下來。',
  },
  {
    id: 'bath_item_fairy_rose',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Fairy_Rose.png',
    name: '玫瑰仙子櫻花浴粉 (Fairy Rose Powder)',
    category: '和風雅浴 · 仙子花香',
    unlockScore: 600,
    aromaEffect: '優雅放鬆 +9 · 櫻瓣翩翩',
    usageTip: '粉嫩細緻的玫瑰花浴粉融化於檜木浴池，如夢似幻的粉色溫泉！',
    quote: '粉紅花瓣飄落湯池表面，連微風都帶著甜蜜的幸福味道。',
  },
  {
    id: 'bath_item_blue_jazz',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Blue_Jazz.png',
    name: '藍爵薰衣草香氛精油 (Blue Jazz Oil)',
    category: '普羅旺斯 · 舒眠香氛',
    unlockScore: 650,
    aromaEffect: '舒壓好眠 +9 · 湛藍花韻',
    usageTip: '滴三滴在擴香瓶中，整間浴室瀰漫高級法式精油香氣。',
    quote: '藍紫花香淡雅迷人，是小鎮最受歡迎的高級芳療配方！',
  },
  {
    id: 'bath_item_coral',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Coral.png',
    name: '海濱粉紅珊瑚海鹽 (Coral Sea Salt)',
    category: '海洋礦物 · 深海浴鹽',
    unlockScore: 750,
    aromaEffect: '海洋活力 +10 · 薑島浪花',
    usageTip: '富含海洋微量元素的薑島珊瑚浴鹽，洗完感覺像在海島渡假！',
    quote: '薑島陽光海浪的味道封存在粉嫩珊瑚中，超療癒！',
  },
  {
    id: 'bath_item_nautilus',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Nautilus_Shell.png',
    name: '人魚鸚鵡螺香皂碟 (Nautilus Dish)',
    category: '海洋宮廷 · 貝殼工藝',
    unlockScore: 800,
    aromaEffect: '珍珠光采 +11 · 人魚祝福',
    usageTip: '把洗臉香皂放在精美螺旋鸚鵡螺貝殼碟上，連洗手都有儀式感！',
    quote: '海洋美人魚贈送的珍奇貝殼碟，閃耀著柔和虹彩光暈～',
  },
  {
    id: 'bath_item_ruby',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Ruby.png',
    name: '皇家紅寶石溫熱暖石 (Ruby Hot Stone)',
    category: '宮廷湯療 · 紅寶暖石',
    unlockScore: 900,
    aromaEffect: '元氣滿滿 +12 · 皇家熱敷',
    usageTip: '溫熱紅寶石置於金邊池畔散發暖意，帝王級溫泉水療享受！',
    quote: '白大理石配上紅寶石的溫暖光芒，貴氣十足！',
  },
  {
    id: 'bath_item_frozen_tear',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/ec/Frozen_Tear.png',
    name: '極光冰淚晶瑩露珠 (Frozen Tear Mist)',
    category: '極光保養 · 冰晶噴霧',
    unlockScore: 1000,
    aromaEffect: '晶透煥采 +15 · 極光微霧',
    usageTip: '輕噴極光水霧，整個人彷彿置身北極光穹頂下的澄澈雪泉！',
    quote: '千分達成紀念聖品！在北極光與冰晶溫泉間綻放奇蹟光彩。',
  },
  {
    id: 'bath_item_pearl',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pearl.png',
    name: '人魚夜明珍珠泡澡球 (Luminous Pearl)',
    category: '天界奇珍 · 珍珠浴球',
    unlockScore: 1100,
    aromaEffect: '光輝閃耀 +18 · 珍珠微光',
    usageTip: '放進溫泉池中會散發如月光般的柔和珠光泡沫，華麗無比！',
    quote: '稀有程度堪比海洋瑰寶的純白珍珠，獻給最優秀的模範同學。',
  },
  {
    id: 'bath_item_stardrop',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Stardrop.png',
    name: '星之果實永恆神泉露 (Stardrop Elixir)',
    category: '傳說滿級 · 宇宙星泉',
    unlockScore: 1250,
    aromaEffect: 'MAX 滿分祝福 · 全能煥發',
    usageTip: '1250 分傳說極致聖物！散發你最喜愛味道的夢幻七彩星泉泡泡！',
    quote: '「你的腦海裡充滿了對最棒事物與乾淨美好生活的回憶！」— 宇宙最高榮耀！',
  },
];

export const BATHROOM_BACKGROUND_MILESTONES: BathroomArtworkTier[] = [
  {
    level: 1,
    minPoints: 0,
    nextPoints: 50,
    bgUrl: bath0WoodenBasinBg,
    icon: '🪵',
    bathroomTitle: '0分・初心者原木盥洗室',
    bathroomScaleLabel: 'Lv.1 原木澡間',
    tubFacility: '檜木小浴桶 ＋ 陶瓷洗手盆',
    signatureAroma: '原木清香肥皂水',
    description: '溫馨質樸的農莊原木小浴室！只要再累積 50 分，就能鋪上亮麗的薄荷綠瓷磚大升級！',
    unlockedBathFeatures: [
      { emoji: '🪣', label: '檜木小浴桶', quote: '雖然迷你，但裝滿熱水泡腳一樣暖呼呼！' },
      { emoji: '🪞', label: '圓框小木鏡', quote: '每天早上刷牙洗臉看一眼，充滿幹勁出門上課！' },
      { emoji: '🧼', label: '天然肥皂石', quote: '保持雙手清潔衛生，健康第一名！' },
    ],
  },
  {
    level: 2,
    minPoints: 50,
    nextPoints: 100,
    bgUrl: bath50MintTileBg,
    icon: '🌿',
    bathroomTitle: '50分・薄荷瓷磚清新浴間',
    bathroomScaleLabel: 'Lv.2 薄荷衛浴',
    tubFacility: '薄荷瓷釉浴缸 ＋ 立柱瓷盆',
    signatureAroma: '薄荷葉與鮮蕨清新氣息',
    description: '恭喜達到 50 分！牆面全面貼上閃亮的薄荷綠方格瓷磚，還有整齊疊好的條紋毛巾與陽光窗戶！',
    unlockedBathFeatures: [
      { emoji: '🪴', label: '窗邊翠綠蕨盆栽', quote: '綠色植物讓浴室空氣特別清新舒暢！' },
      { emoji: '🧻', label: '整齊毛巾架', quote: '藍白條紋與純棉浴巾整整齊齊，好習慣滿分！' },
      { emoji: '🚿', label: '陶瓷溫水龍頭', quote: '水質清澈見底，洗完臉立刻神清氣爽！' },
    ],
  },
  {
    level: 3,
    minPoints: 100,
    nextPoints: 150,
    bgUrl: bath100SunflowerTubBg,
    icon: '🌻',
    bathroomTitle: '100分・向日葵木桶湯屋',
    bathroomScaleLabel: 'Lv.3 暖陽湯屋',
    tubFacility: '大口徑雪松木桶 ＋ 黃銅水龍頭',
    signatureAroma: '向日葵花蜜暖香',
    description: '達成 100 分！寬敞原木風呂配上洗手台上的大束向日葵，窗外就是開滿鮮花的星露谷田園！',
    unlockedBathFeatures: [
      { emoji: '🌻', label: '向日葵花瓶', quote: '金黃向日葵迎著窗外陽光，浴室亮晶晶！' },
      { emoji: '🛁', label: '加深雪松木湯桶', quote: '深度剛剛好可以舒服伸展雙腳泡熱水澡！' },
      { emoji: '🧶', label: '民俗花紋地墊', quote: '踩上去軟綿綿又防滑，走出浴桶好安全！' },
    ],
  },
  {
    level: 4,
    minPoints: 150,
    nextPoints: 200,
    bgUrl: bath150BubbleFoamBg,
    icon: '🫧',
    bathroomTitle: '150分・泡泡雲朵洗手間',
    bathroomScaleLabel: 'Lv.4 泡泡樂園',
    tubFacility: '金腳白瓷泡泡大浴缸 ＋ 高架花灑',
    signatureAroma: '天空海鹽綿密泡泡',
    description: '150 分解鎖夢幻貓腳白瓷浴缸！整缸滿出來像雲朵般的泡泡，連黃色小鴨也跳進來游水啦！',
    unlockedBathFeatures: [
      { emoji: '🐤', label: '嘎嘎黃色小鴨', quote: '在雲朵泡泡堆裡悠哉漂浮的快樂夥伴！' },
      { emoji: '🫧', label: '無限綿密泡沫', quote: '輕輕一撥泡泡飛上天，像下起快樂的肥皂雪！' },
      { emoji: '🧺', label: '色彩繽紛折疊巾', quote: '粉黃藍綠四色柔軟毛巾任你挑選！' },
    ],
  },
  {
    level: 5,
    minPoints: 200,
    nextPoints: 250,
    bgUrl: bath200CopperShowerBg,
    icon: '🚿',
    bathroomTitle: '200分・鍛銅雨淋浴室',
    bathroomScaleLabel: 'Lv.5 工業雅痞',
    tubFacility: '玻璃獨立雨淋花灑間 ＋ 銅管烘巾架',
    signatureAroma: '琥珀雪松與柑橘精油',
    description: '200 分裝潢大幅躍進！配有大片星光鏡燈化妝台、復古暖磚牆、鍛銅毛巾加熱架與大面積雨淋淋浴間！',
    unlockedBathFeatures: [
      { emoji: '💡', label: '明星閃亮化妝鏡', quote: '一圈暖黃燈泡照亮微笑，每天自信滿點！' },
      { emoji: '♨️', label: '鍛銅加熱毛巾架', quote: '毛巾永遠暖呼呼、烘得香噴噴的喔！' },
      { emoji: '🌧️', label: '黃銅大雨淋花灑', quote: '細密柔和的水柱灑落，超級紓壓解勞！' },
    ],
  },
  {
    level: 6,
    minPoints: 250,
    nextPoints: 300,
    bgUrl: bath250HerbalSaunaBg,
    icon: '🌿',
    bathroomTitle: '250分・草藥松木桑拿房',
    bathroomScaleLabel: 'Lv.6 芬蘭桑拿',
    tubFacility: '松木雙層蒸氣桑拿台 ＋ 藥草冷泉桶',
    signatureAroma: '尤加利與樺樹葉芳香',
    description: '250 分建成專屬北歐木造桑拿浴屋！掛滿清新乾燥香草束，搭配溫暖桑拿石爐與木勺湯桶！',
    unlockedBathFeatures: [
      { emoji: '🪵', label: '高溫桑拿熱石爐', quote: '舀一勺清水淋在熱石上，白霧蒸氣瞬間升起！' },
      { emoji: '🌿', label: '吊掛森林香草束', quote: '尤加利葉與百里香交織出深山森林浴香氣！' },
      { emoji: '❄️', label: '窗外雪松冷景', quote: '一邊暖呼呼蒸桑拿一邊欣賞窗外松林！' },
    ],
  },
  {
    level: 7,
    minPoints: 300,
    nextPoints: 350,
    bgUrl: bath300PeachSpaBg,
    icon: '🍑',
    bathroomTitle: '300分・水蜜桃香氛浴殿',
    bathroomScaleLabel: 'Lv.7 粉桃芳療',
    tubFacility: '花瓣泡澡白瓷缸 ＋ 雕花雙人梳妝鏡',
    signatureAroma: '蜜桃薔薇香氛蠟燭',
    description: '300 分打造甜美粉嫩的香氛療癒浴室！飄浮花瓣浴池配上溫暖香氛蠟燭與粉彩窗簾，浪漫滿分！',
    unlockedBathFeatures: [
      { emoji: '🌸', label: '漂浮花瓣溫湯', quote: '粉紅與鵝黃花瓣在水波上旋轉，芳香撲鼻！' },
      { emoji: '🕯️', label: '精油芳香小蠟燭', quote: '柔和燭光閃耀，讓整個洗手間超級放鬆！' },
      { emoji: '🍑', label: '水蜜桃果園窗景', quote: '打開窗戶就能看見春天粉嫩的桃樹開花！' },
    ],
  },
  {
    level: 8,
    minPoints: 350,
    nextPoints: 400,
    bgUrl: bath350AutumnOnsenBg,
    icon: '🍁',
    bathroomTitle: '350分・楓紅露天風呂',
    bathroomScaleLabel: 'Lv.8 楓葉湯泉',
    tubFacility: '日式四方檜木大湯池 ＋ 石板地板',
    signatureAroma: '秋季紅葉與檜木暖湯',
    description: '350 分迎來日式和風楓葉露天風呂！敞開寬闊木格窗就是滿山紅橘楓林，落葉輕飄入熱騰騰湯池！',
    unlockedBathFeatures: [
      { emoji: '🍁', label: '楓葉暖簾與紅葉景', quote: '火紅楓葉襯托著白霧溫泉，美得像畫一樣！' },
      { emoji: '🏮', label: '木格紙燈籠', quote: '地板四角立著溫暖紙燈籠，夜間泡澡更有氛圍！' },
      { emoji: '🥣', label: '竹製出水口', quote: '清澈熱水從竹管潺潺流入檜木浴池，聲音超療癒！' },
    ],
  },
  {
    level: 9,
    minPoints: 400,
    nextPoints: 450,
    bgUrl: bath400GreenhouseBathBg,
    icon: '🌱',
    bathroomTitle: '400分・溫室花藤陽光浴室',
    bathroomScaleLabel: 'Lv.9 植物玻璃屋',
    tubFacility: '玻璃穹頂下沉石砌浴池 ＋ 石牆台盆',
    signatureAroma: '清晨雨露與盛開繡球花',
    description: '400 分把整座溫室搬進洗手間啦！挑高透明玻璃屋頂垂滿長春藤與繽紛花盆，沐浴在森林氧氣中！',
    unlockedBathFeatures: [
      { emoji: '🪴', label: '懸吊蕨類花籃', quote: '抬頭滿眼都是翠綠藤蔓與藍紫繡球花，活力十足！' },
      { emoji: '🪨', label: '天然石砌下沉湯池', quote: '踏兩步石階走進溫潤石池，宛如天然森林湧泉！' },
      { emoji: '☀️', label: '全採光玻璃穹頂', quote: '陽光穿透綠葉灑在水面，閃閃發亮超級漂亮！' },
    ],
  },
  {
    level: 10,
    minPoints: 450,
    nextPoints: 500,
    bgUrl: bath450WinterHotspringBg,
    icon: '❄️',
    bathroomTitle: '450分・冬雪暖泉湯屋',
    bathroomScaleLabel: 'Lv.10 雪見名湯',
    tubFacility: '火山岩溫泉大池 ＋ 鑄鐵取暖壁爐',
    signatureAroma: '冬雪松針與硫磺美肌湯',
    description: '450 分升級雪山景觀溫泉湯屋！窗外是紛飛大雪與銀白針葉林，室內卻被壁爐和熱湯燻得暖洋洋！',
    unlockedBathFeatures: [
      { emoji: '🏔️', label: '雪山落雪落地窗', quote: '看雪花在冰晶窗外飛舞，自己在熱泉裡完全不冷！' },
      { emoji: '🔥', label: '更衣處小鑄鐵火爐', quote: '披上毛巾烤一下火，身體馬上暖呼呼的！' },
      { emoji: '🪨', label: '黑岩礦物質大池', quote: '天然岩石泉池保溫極佳，泡完皮膚滑溜溜！' },
    ],
  },
  {
    level: 11,
    minPoints: 500,
    nextPoints: 550,
    bgUrl: bath500AmethystBathBg,
    icon: '🔮',
    bathroomTitle: '500分・巫師紫晶魔藥浴池',
    bathroomScaleLabel: 'Lv.11 紫晶秘湯',
    tubFacility: '紫水晶環繞星月魔藥大浴池',
    signatureAroma: '薰衣草魔藥與紫晶微光',
    description: '突破 500 分大關！神秘的巫師紫晶浴室啟用，巨型紫晶洞簇擁著冒泡星空魔藥池，地板鋪滿星月花磚！',
    unlockedBathFeatures: [
      { emoji: '💎', label: '發光紫水晶柱', quote: '魔法水晶自動點亮浴室，夜晚不必開燈也夢幻無比！' },
      { emoji: '🧪', label: '彩色魔藥香氛瓶', quote: '紫粉藍三瓶不同口味的魔法泡泡浴露排在池畔！' },
      { emoji: '✨', label: '星月拼花磁磚', quote: '腳下每塊磁磚都閃耀著金黃星星與弦月！' },
    ],
  },
  {
    level: 12,
    minPoints: 550,
    nextPoints: 600,
    bgUrl: bath550BambooSpaBg,
    icon: '🎋',
    bathroomTitle: '550分・翠竹山泉療癒室',
    bathroomScaleLabel: 'Lv.12 竹林禪意',
    tubFacility: '巨竹流水石臼洗手池 ＋ 木桶湯屋',
    signatureAroma: '青竹葉露與山林晨霧',
    description: '550 分踏入清幽翠竹泉鄉！綠竹林環繞整個木屋，大竹筒嘩啦啦倒出甘甜山泉，旁邊鋪滿圓潤鵝卵石！',
    unlockedBathFeatures: [
      { emoji: '🎋', label: '天然巨竹引水柱', quote: '清涼泉水落進圓石缽，激起清脆的水花聲！' },
      { emoji: '🪨', label: '光腳鵝卵石步道', quote: '踩在平滑的圓石上做足底放鬆，精神大振！' },
      { emoji: '🌲', label: '360° 翠竹森林窗景', quote: '滿窗深淺不一的綠竹影，彷彿住進世外桃源！' },
    ],
  },
  {
    level: 13,
    minPoints: 600,
    nextPoints: 650,
    bgUrl: bath600SakuraOnsenBg,
    icon: '🌸',
    bathroomTitle: '600分・櫻花溫泉雅室',
    bathroomScaleLabel: 'Lv.13 櫻花湯殿',
    tubFacility: '大面和室庭園湯池 ＋ 獨立洗浴坐台區',
    signatureAroma: '春櫻花瓣與和風檜木',
    description: '600 分打造寬敞豪華的日式櫻花大浴場！推開拉門就是盛開的粉色櫻花庭園與石燈籠，設有一整排個人木盆沖洗區！',
    unlockedBathFeatures: [
      { emoji: '🌸', label: '櫻花瓣浮湯池', quote: '隨風飛進來的櫻花瓣飄在水面，美得令人屏息！' },
      { emoji: '🪵', label: '整排個人洗浴木盆區', quote: '配好小板凳與銅花灑，就像高級日本溫泉旅館！' },
      { emoji: '🍵', label: '榻榻米休憩茶席', quote: '泡完澡還能坐在和室裡喝杯熱茶休息一下！' },
    ],
  },
  {
    level: 14,
    minPoints: 650,
    nextPoints: 700,
    bgUrl: bath650LavenderSoapBg,
    icon: '🪻',
    bathroomTitle: '650分・薰衣草精油澡堂',
    bathroomScaleLabel: 'Lv.14 法式莊園',
    tubFacility: '黃金貓腳泡澡浴缸 ＋ 薰衣草馬賽克牆',
    signatureAroma: '南法普羅旺斯薰衣草香',
    description: '650 分宛如來到法式香氛莊園！大片淡紫馬賽克牆掛滿乾燥薰衣草束，石砌圓拱門外陽光灑進紅磚地面！',
    unlockedBathFeatures: [
      { emoji: '🪻', label: '現採倒掛薰衣草束', quote: '淡淡紫色花香撲鼻而來，讓人一秒放鬆所有壓力！' },
      { emoji: '🚿', label: '典雅金黃浴缸龍頭', quote: '亮晶晶黃銅雙把手與電話造型手持花灑超復古！' },
      { emoji: '🏛️', label: '南法石頭圓拱廊', quote: '窗外是一望無際的紫色薰衣草花田！' },
    ],
  },
  {
    level: 15,
    minPoints: 700,
    nextPoints: 750,
    bgUrl: bath700MoonlitPoolBg,
    icon: '🌙',
    bathroomTitle: '700分・星月倒影藍泉浴殿',
    bathroomScaleLabel: 'Lv.15 月光藍泉',
    tubFacility: '玻璃穹頂深藍馬賽克大泳浴池',
    signatureAroma: '夜空星塵與清冷藍蓮',
    description: '700 分解鎖如夢似幻的星月天窗藍泉殿！彎彎新月與繁星就高掛在玻璃拱頂正上方，清楚倒映在澄澈池水中！',
    unlockedBathFeatures: [
      { emoji: '🌙', label: '鏡面新月水池倒影', quote: '池水平靜得像一面藍寶石鏡子，把月亮捧在手心！' },
      { emoji: '🕯️', label: '銀製壁掛燭台', quote: '藍色牆面上的溫暖燭火搖曳，營造超靜謐夜晚感！' },
      { emoji: '✨', label: '全景夜空觀星天窗', quote: '泡澡同時仰望整個星露谷的滿天星斗！' },
    ],
  },
  {
    level: 16,
    minPoints: 750,
    nextPoints: 800,
    bgUrl: bath750GingerLagoonBg,
    icon: '🏝️',
    bathroomTitle: '750分・薑島椰林瀑布浴室',
    bathroomScaleLabel: 'Lv.16 熱帶海島',
    tubFacility: '天然山岩瀑布潟湖池 ＋ 竹管野外淋浴',
    signatureAroma: '朱槿木槿花與海島熱帶椰香',
    description: '750 分航向薑島祕密渡假村！竹棚下有天然石頭洗手台，踏出兩步就是閃耀土耳其藍的飛瀑冷熱瀉湖池！',
    unlockedBathFeatures: [
      { emoji: '🌊', label: '天然岩壁飛瀑水池', quote: '從巨岩頂端沖瀉下清涼碧水，池面還冒著閃亮星星！' },
      { emoji: '🌺', label: '紅豔木槿花叢', quote: '熱帶鮮紅扶桑花圍繞著整座竹亭，滿滿海島渡假風！' },
      { emoji: '🥥', label: '火山石壁竹管淋浴', quote: '體驗最貼近大自然的海邊露天沖涼爽快感！' },
    ],
  },
  {
    level: 17,
    minPoints: 800,
    nextPoints: 850,
    bgUrl: bath800CoralMermaidBg,
    icon: '🐚',
    bathroomTitle: '800分・珊瑚貝殼人魚浴宮',
    bathroomScaleLabel: 'Lv.17 深海人魚',
    tubFacility: '巨型虹彩珍珠大貝殼浴缸',
    signatureAroma: '粉紅珊瑚露與珍珠光韻',
    description: '800 分潛入海底人魚水晶宮！粉紅巨型珊瑚拱門窗外有魚群與美人魚游過，躺在閃耀珠光的大貝殼浴缸裡泡澡！',
    unlockedBathFeatures: [
      { emoji: '🐚', label: '巨型珠光貝殼浴缸', quote: '宛如維納斯誕生般的奇蹟大貝殼，散發七彩虹光！' },
      { emoji: '🧜‍♀️', label: '海底全景珊瑚窗', quote: '小丑魚與人魚剪影從蔚藍海水中悠遊經過！' },
      { emoji: '🫧', label: '珍珠發光圓化妝鏡', quote: '鏡框鑲滿了會發亮的深海大珍珠與小海馬掛巾！' },
    ],
  },
  {
    level: 18,
    minPoints: 850,
    nextPoints: 900,
    bgUrl: bath850SteampunkBathBg,
    icon: '⚙️',
    bathroomTitle: '850分・齒輪黃銅蒸氣浴場',
    bathroomScaleLabel: 'Lv.18 蒸氣齒輪',
    tubFacility: '全黃銅大貓腳浴缸 ＋ 精工熱能銅管淋浴',
    signatureAroma: '暖茶琥珀與精煉銅蒸氣',
    description: '850 分由克林特與矮人聯手打造的維多利亞蒸氣齒輪浴場！牆面精密黃銅齒輪轉動調節水溫與壓力，炫酷度破表！',
    unlockedBathFeatures: [
      { emoji: '⚙️', label: '黃銅壓力表與齒輪牆', quote: '轉動紅色水閥就能切換五段蒸氣熱湯溫度，超科技！' },
      { emoji: '🛁', label: '亮面純銅大浴缸', quote: '導熱極佳又華麗的純銅缸身，映照暖橘彩繪玻璃光影！' },
      { emoji: '🕰️', label: '複古花窗彩繪玻璃', quote: '早晨陽光透過金色幾何彩窗灑滿棋盤瓷磚！' },
    ],
  },
  {
    level: 19,
    minPoints: 900,
    nextPoints: 950,
    bgUrl: bath900RoyalMarbleBg,
    icon: '👑',
    bathroomTitle: '900分・皇家大理石金柱浴殿',
    bathroomScaleLabel: 'Lv.19 羅馬皇室',
    tubFacility: '金獅湧泉大理石羅馬浴池 ＋ 金柱迴廊',
    signatureAroma: '皇室乳香與黃金柑橘',
    description: '900 分進階尊貴羅馬帝國皇家大浴殿！高聳純白大理石柱鑲著華麗金雕柱頭，金獅噴泉不斷注入澄澈泉水！',
    unlockedBathFeatures: [
      { emoji: '🦁', label: '黃金獅頭湧泉壁雕', quote: '雄偉金色獅口湧出溫暖泉水流進中央大理石大池！' },
      { emoji: '🏛️', label: '白大理石金柱穹頂', quote: '挑高拱頂空間開闊氣派，回音都變得莊嚴好聽！' },
      { emoji: '🟨', label: '皇室金黃蓬鬆浴巾', quote: '壁龕架上整齊堆疊著皇家金色絲絨大浴巾！' },
    ],
  },
  {
    level: 20,
    minPoints: 950,
    nextPoints: 1000,
    bgUrl: bath950CloudJacuzziBg,
    icon: '☁️',
    bathroomTitle: '950分・雲端天鵝絨按摩池',
    bathroomScaleLabel: 'Lv.20 雲海露台',
    tubFacility: '天空露台珍珠氣泡按摩池 ＋ 純金淋浴柱',
    signatureAroma: '天空微風與純淨白雲',
    description: '950 分蓋在萬呎高空的雲端陽台浴室！白色按摩池冒著療癒泡泡，遠望粉色夕陽雲海與漂浮空中城堡！',
    unlockedBathFeatures: [
      { emoji: '☁️', label: '蓬鬆天頂白雲裝飾', quote: '柔和棉花糖白雲漂浮在拱門上方，伸手幾乎能摸到！' },
      { emoji: '🏰', label: '雲海對岸浮空城堡', quote: '泡著氣泡按摩池欣賞粉彩雲海上飄浮的夢幻城堡！' },
      { emoji: '✨', label: '全套黃金檯面洗具', quote: '金光閃閃的水龍頭與大圓鏡，每一刻都是貴賓級體驗！' },
    ],
  },
  {
    level: 21,
    minPoints: 1000,
    nextPoints: 1050,
    bgUrl: bath1000AuroraIceBg,
    icon: '🌌',
    bathroomTitle: '1000分・極光水晶溫泉殿',
    bathroomScaleLabel: 'Lv.21 千分極光',
    tubFacility: '巨型玻璃穹頂冰晶藍綠發光溫泉湖',
    signatureAroma: '北極光薄荷與冰晶花蜜',
    description: '恭喜突破 1000 分傳奇！北極光翡翠綠與紫羅蘭舞動在整片玻璃冰屋穹頂之上，池底天然冰晶散發魔幻光芒！',
    unlockedBathFeatures: [
      { emoji: '🌌', label: '極光全景大穹頂', quote: '綠色與紫色極光光幕在夜空中翻騰舞動，夢幻到不真實！' },
      { emoji: '💎', label: '翡翠結晶溫泉岸', quote: '圍繞池邊的巨型翡翠水晶將池水染成閃亮青綠色！' },
      { emoji: '❄️', label: '冰柱與暖熱蒸汽並存', quote: '外面結著冰柱，池子裡卻暖意蒸騰、充滿森林暖光！' },
    ],
  },
  {
    level: 22,
    minPoints: 1050,
    nextPoints: 1100,
    bgUrl: bath1050JadeEmperorBg,
    icon: '🐉',
    bathroomTitle: '1050分・翡翠玉石御湯宮',
    bathroomScaleLabel: 'Lv.22 翠玉龍宮',
    tubFacility: '整塊翡翠玉雕圓形溫泉池 ＋ 金龍吐水泉',
    signatureAroma: '翠蓮清露與沉香檀木',
    description: '1050 分晉升東方皇家翠玉龍湯宮！碧綠通透的玉石圓池上漂浮著發光粉紅蓮花燈，黃金巨龍雕塑噴吐靈泉！',
    unlockedBathFeatures: [
      { emoji: '🐉', label: '壁畫黃金神龍噴泉', quote: '金碧輝煌的神龍張口傾瀉出絲滑甘甜的靈泉水柱！' },
      { emoji: '🪷', label: '發光粉色蓮花水燈', quote: '十餘朵亮晶晶的蓮花盞隨著水波輕輕浮動，祥和尊貴！' },
      { emoji: '💚', label: '碧綠翠玉圓柱大殿', quote: '整座大廳由珍貴翡翠雕琢而成，連燈籠都散發綠寶石光輝！' },
    ],
  },
  {
    level: 23,
    minPoints: 1100,
    nextPoints: 1150,
    bgUrl: bath1100CelestialSwanBg,
    icon: '🪽',
    bathroomTitle: '1100分・天界羽翼聖泉浴室',
    bathroomScaleLabel: 'Lv.23 天界聖池',
    tubFacility: '展翅金雕白晝天鵝噴泉八角聖池',
    signatureAroma: '天界聖蓮與白羽晨露',
    description: '1100 分步入天界純白金翼聖殿！展翅潔白天鵝雕像頂著金色光環立於八角噴泉中央，傾瀉星光閃耀的清泉！',
    unlockedBathFeatures: [
      { emoji: '🦢', label: '金色光環白天鵝噴泉', quote: '純白羽翼張開灑下閃亮結晶瀑布，池水波光粼粼！' },
      { emoji: '🪽', label: '天使翼彩繪聖窗', quote: '高挑拱窗透出溫暖金光，牆上裝飾著可愛的飛行小雲朵！' },
      { emoji: '✨', label: '金邊珍珠盥洗檯', quote: '白玉大理石搭配金竪琴裝飾與粉藍魔法香水瓶！' },
    ],
  },
  {
    level: 24,
    minPoints: 1150,
    nextPoints: 1200,
    bgUrl: bath1150GalaxyNebulaBg,
    icon: '🌠',
    bathroomTitle: '1150分・銀河星雲漂浮浴宮',
    bathroomScaleLabel: 'Lv.24 銀河天浴',
    tubFacility: '黑曜石星雲無邊際星塵泡澡池',
    signatureAroma: '星辰迷霧與銥金微光',
    description: '1150 分遨遊無垠外太空！整座洗手間建立在星雲觀測巨蛋之中，黑曜石方池將整片紫色青藍銀河星海吸納進水波裡！',
    unlockedBathFeatures: [
      { emoji: '🌌', label: '星系漂浮太空穹頂', quote: '旋轉的螺旋星系與發光行星近在咫尺，泡澡就像漂在宇宙！' },
      { emoji: '✨', label: '星雲液態光波池', quote: '池水閃耀著銀河青紫星塵漩渦，輕輕一撥滿手星星！' },
      { emoji: '🔮', label: '銥金幽藍水晶火盆', quote: '四周圍繞著稀有的紫晶礦柱與冷光提燈，深邃神祕！' },
    ],
  },
  {
    level: 25,
    minPoints: 1200,
    nextPoints: 1250,
    bgUrl: bath1200SolarPalaceBg,
    icon: '☀️',
    bathroomTitle: '1200分・金陽神輝大浴場',
    bathroomScaleLabel: 'Lv.25 太陽神殿',
    tubFacility: '太陽金瀑黃金泉水大殿堂',
    signatureAroma: '金陽蜂蜜與神聖橙花',
    description: '1200 分到達太陽神輝極境！高聳金色石拱門與巨型太陽浮雕之下，宛如融化黃金般閃耀光芒的溫泉瀑布傾瀉而下！',
    unlockedBathFeatures: [
      { emoji: '☀️', label: '黃金太陽瀑布壁泉', quote: '滿溢陽光光暈的溫暖黃金水幕從微笑太陽像奔湧而入！' },
      { emoji: '🔥', label: '金色星光火炬盆', quote: '池畔兩座金火盆照亮全場，水面綻放無數四芒星光點！' },
      { emoji: '🏛️', label: '陽光玻璃穹頂迴廊', quote: '整座神殿充滿正能量陽光，進來洗澡就能充滿無限好運！' },
    ],
  },
  {
    level: 26,
    minPoints: 1250,
    nextPoints: null,
    bgUrl: bath1250EternalCosmosBg,
    icon: '💎',
    bathroomTitle: '1250分・永恆星之果實夢幻溫泉聖殿',
    bathroomScaleLabel: 'Lv.26 MAX 宇宙巔峰',
    tubFacility: '五彩稜鏡瀑布 ＋ 星之果實天界圓池',
    signatureAroma: '最喜愛事物的永恆五彩香氛',
    description: '1250 分洗手間最高神話里程碑！七彩稜鏡晶石簇擁著彩虹大瀑布，池心嵌著象徵終極榮耀的紫色星之果實徽章，旁有休憩紫絨沙發與發光蘑菇！',
    unlockedBathFeatures: [
      { emoji: '🌈', label: '五彩碎片彩虹大瀑布', quote: '由整面巨型彩虹水晶守護的神聖瀑布，泡一秒立刻補滿宇宙能量！' },
      { emoji: '⭐', label: '星之果實聖池徽章', quote: '池階正中央閃耀的紫色星果徽章，證明你是全班潔淨與榮譽的宇宙神王！' },
      { emoji: '🛋️', label: '紫絨星空休息小客廳', quote: '泡完神泉還能坐在旁邊的紫絨扶手椅欣賞滿牆繁星！' },
    ],
  },
];

export const FOGGY_BATHROOM_ARTWORK: BathroomArtworkTier = {
  level: 0,
  minPoints: -1,
  nextPoints: 0,
  bgUrl: bathWitheredFoggyBg,
  icon: '🌫️',
  bathroomTitle: '積水迷霧舊盥洗室（快加油掃除陰霾！）',
  bathroomScaleLabel: '負分霧氣期',
  tubFacility: '滴水舊木盆（急需整修清潔）',
  signatureAroma: '潮濕霧氣與小蜘蛛網',
  description: '目前積分為負數，小洗手間暫時變得冷清且佈滿水霧與蛛網。只要積極表現加分回到 0 分以上，溫暖亮麗的浴室馬上開張！',
  unlockedBathFeatures: [
    { emoji: '🪣', label: '滴水小木桶', quote: '水龍頭滴答滴答地響，正在等主人加分來修好它呢～' },
    { emoji: '🕸️', label: '角落小蛛網', quote: '小蜘蛛在等大家加分掃除，變回明亮潔淨的星露谷浴間！' },
  ],
  isFoggy: true,
};

export function getStudentBathroomArtwork(points: number): BathroomArtworkTier {
  if (points < 0) return FOGGY_BATHROOM_ARTWORK;

  for (let i = BATHROOM_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= BATHROOM_BACKGROUND_MILESTONES[i].minPoints) {
      return BATHROOM_BACKGROUND_MILESTONES[i];
    }
  }
  return BATHROOM_BACKGROUND_MILESTONES[0];
}
