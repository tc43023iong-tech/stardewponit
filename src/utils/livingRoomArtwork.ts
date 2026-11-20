import livingWitheredDimBg from '../assets/images/living_withered_dim_1795192598063.jpg';
import living0WoodenSofaBg from '../assets/images/living_0_wooden_sofa_1795192597607.jpg';
import living50RetroGameBg from '../assets/images/living_50_retro_game_1795192598349.jpg';
import living100SunflowerBg from '../assets/images/living_100_sunflower_lounge_1795192598757.jpg';
import living150SnackBarBg from '../assets/images/living_150_snack_bar_1795192596098.jpg';
import living200ArcadeBg from '../assets/images/living_200_arcade_corner_1795192598273.jpg';
import living250FireplaceCinemaBg from '../assets/images/living_250_fireplace_cinema_1795192597571.jpg';
import living300PeachKaraokeBg from '../assets/images/living_300_peach_karaoke_1795192597787.jpg';
import living350AutumnBoardgameBg from '../assets/images/living_350_autumn_boardgame_1795192598435.jpg';
import living400GreenhouseTeaBg from '../assets/images/living_400_greenhouse_tea_1795192598364.jpg';
import living450WinterCocoaBg from '../assets/images/living_450_winter_cocoa_1795192597884.jpg';
import living500AmethystArcadeBg from '../assets/images/living_500_amethyst_arcade_1795192598150.jpg';
import living550BambooVinylBg from '../assets/images/living_550_bamboo_vinyl_1795192598175.jpg';
import living600SakuraTheaterBg from '../assets/images/living_600_sakura_theater_1795192598039.jpg';
import living650LavenderCraftBg from '../assets/images/living_650_lavender_craft_1795192615268.jpg';
import living700MoonlitStargazeBg from '../assets/images/living_700_moonlit_stargaze_1795192624328.jpg';
import living750GingerTikiBg from '../assets/images/living_750_ginger_tiki_1795192623807.jpg';
import living800CoralAquariumBg from '../assets/images/living_800_coral_aquarium_1795192623547.jpg';
import living850SteampunkPinballBg from '../assets/images/living_850_steampunk_pinball_1795192624251.jpg';
import living900RoyalBanquetBg from '../assets/images/living_900_royal_banquet_1795192624140.jpg';
import living950CloudVrBg from '../assets/images/living_950_cloud_vr_1795192623904.jpg';
import living1000AuroraEsportsBg from '../assets/images/living_1000_aurora_esports_1795192623474.jpg';
import living1050JadePavilionBg from '../assets/images/living_1050_jade_pavilion_1795192623397.jpg';
import living1100CelestialMusicBg from '../assets/images/living_1100_celestial_music_1795192623836.jpg';
import living1150GalaxyHolodeckBg from '../assets/images/living_1150_galaxy_holodeck_1795192623890.jpg';
import living1200SolarCinemaBg from '../assets/images/living_1200_solar_cinema_1795192623158.jpg';
import living1250EternalStarfruitBg from '../assets/images/living_1250_eternal_starfruit_1795192623886.jpg';

export interface LivingRoomArtworkTier {
  level: number;
  minPoints: number;
  nextPoints: number | null;
  bgUrl: string;
  icon: string;
  livingRoomTitle: string;
  scaleLabel: string;
  consoleFacility: string;
  snackFeature: string;
  tvShowHighlight: string;
  description: string;
  unlockedFunFeatures: { emoji: string; label: string; quote: string }[];
  isDim?: boolean;
}

export interface LivingWareVisualTier {
  tierIndex: number;
  minPoints: number;
  tvName: string;
  consoleName: string;
  tierLabel: string;
  tvScale: number;
  tvStyle: 'dim' | 'retro' | 'wood' | 'flat' | 'cinema' | 'arcane' | 'royal' | 'aurora' | 'cosmos';
  consoleStyle: 'unplugged' | 'famicom' | 'board' | 'arcade' | 'karaoke' | 'crystal' | 'gold' | 'prismatic';
  upgradeNote: string;
}

export interface LivingRoomActivityItem {
  id: string;
  url: string;
  name: string;
  category: '美味零食' | '暢快飲品' | '電玩桌遊' | '視聽手作';
  unlockScore: number;
  moodEffect: string;
  enjoyTip: string;
  quote: string;
}

export interface LivingTvChannel {
  id: string;
  channelNo: string;
  icon: string;
  name: string;
  showTitle: string;
  screenTheme: string;
  pixelEmojiScene: string[];
  broadcastLine: string;
}

export const LIVING_TV_CHANNELS: LivingTvChannel[] = [
  {
    id: 'weather',
    channelNo: 'CH 1',
    icon: '🌤️',
    name: '星露谷氣象台',
    showTitle: '明日天氣預報與收成快報',
    screenTheme: 'from-sky-400 via-cyan-300 to-emerald-400',
    pixelEmojiScene: ['☀️', '⛅', '🌾', '🌻'],
    broadcastLine: '「各位小鎮居民早安！明天將是陽光普照的好天氣，最適合在客廳喝冰果汁配點心啦！」',
  },
  {
    id: 'queen_of_sauce',
    channelNo: 'CH 2',
    icon: '🍰',
    name: '醬料女皇美食秀',
    showTitle: '派對爆米花與草莓奶昔特輯',
    screenTheme: 'from-amber-400 via-orange-300 to-rose-400',
    pixelEmojiScene: ['🍿', '🍓', '🍕', '🧁'],
    broadcastLine: '「歡迎收看〈醬料女皇〉！今天教大家在客廳邊追劇邊享用熱騰騰的窯烤起司披薩與甜蜜草莓飲！」',
  },
  {
    id: 'fortune',
    channelNo: 'CH 3',
    icon: '🔮',
    name: '每日星象幸運台',
    showTitle: '好運小精靈每日運勢占卜',
    screenTheme: 'from-indigo-700 via-purple-600 to-fuchsia-500',
    pixelEmojiScene: ['🔮', '✨', '🌙', '⭐'],
    broadcastLine: '「水晶球閃閃發亮！今天好運小精靈站在你這邊，課堂表現與小遊戲一定能拿超高分！」',
  },
  {
    id: 'junimo_anime',
    channelNo: 'CH 4',
    icon: '🎮',
    name: '祝尼魔冒險動畫',
    showTitle: '草原之王與卡丁車大冒險',
    screenTheme: 'from-emerald-600 via-teal-500 to-lime-400',
    pixelEmojiScene: ['👾', '🏎️', '🍎', '🏆'],
    broadcastLine: '「Biu Biu！祝尼魔小英雄衝上彩虹軌道，收集滿五顆星之果實就能發動無敵加速喔！」',
  },
  {
    id: 'music_mtv',
    channelNo: 'CH 5',
    icon: '🎵',
    name: '星露谷金曲音樂台',
    showTitle: '鹈鶘鎮點唱機 24H 精選',
    screenTheme: 'from-pink-500 via-violet-500 to-sky-500',
    pixelEmojiScene: ['🎵', '🎸', '🎤', '🪩'],
    broadcastLine: '「點播一首輕快的〈春之華爾茲〉～快拿起麥克風在客廳開一場溫馨歡唱派對吧！」',
  },
];

export const LIVING_WARE_VISUAL_TIERS: LivingWareVisualTier[] = [
  {
    tierIndex: -1,
    minPoints: -999,
    tvName: '沒插電雪花黑白機',
    consoleName: '卡住舊搖桿',
    tierLabel: '停電 Lv.0',
    tvScale: 0.8,
    tvStyle: 'dim',
    consoleStyle: 'unplugged',
    upgradeNote: '快加分回到 0 分以上，幫客廳通電開電視、擺上熱騰騰茶點！',
  },
  {
    tierIndex: 0,
    minPoints: 0,
    tvName: '橡木復古彩色電視',
    consoleName: '木頭桌遊棋盤盒',
    tierLabel: '木屋 Lv.1',
    tvScale: 0.88,
    tvStyle: 'retro',
    consoleStyle: 'board',
    upgradeNote: '溫暖木頭電視播著卡通，湊滿 50 分就能接上紅白電玩主機！',
  },
  {
    tierIndex: 1,
    minPoints: 50,
    tvName: '雙聲道胡桃木電視',
    consoleName: '經典紅白電玩主機',
    tierLabel: '電玩 Lv.2',
    tvScale: 0.96,
    tvStyle: 'wood',
    consoleStyle: 'famicom',
    upgradeNote: '接上雙人紅白遊戲機，端出奶油爆米花跟夥伴一起破關超開心！',
  },
  {
    tierIndex: 2,
    minPoints: 150,
    tvName: '高清寬螢幕薄型電視',
    consoleName: '復古街機雙搖桿台',
    tierLabel: '街機 Lv.3',
    tvScale: 1.04,
    tvStyle: 'flat',
    consoleStyle: 'arcade',
    upgradeNote: '客廳換上寬螢幕電視與直立電玩街機，還有草莓奶昔零食吧台！',
  },
  {
    tierIndex: 3,
    minPoints: 300,
    tvName: '超巨幅壁爐投影布幕',
    consoleName: '閃亮卡拉OK點唱台',
    tierLabel: '影廳 Lv.4',
    tvScale: 1.12,
    tvStyle: 'cinema',
    consoleStyle: 'karaoke',
    upgradeNote: '整面牆變成家庭電影院與歡唱舞台，邊吃鬆餅披薩邊開派對！',
  },
  {
    tierIndex: 4,
    minPoints: 500,
    tvName: '奧術紫晶雙重電競螢幕',
    consoleName: '霓虹巫師街機雙機台',
    tierLabel: '魔導 Lv.5',
    tvScale: 1.2,
    tvStyle: 'arcane',
    consoleStyle: 'crystal',
    upgradeNote: '紫色魔法水晶螢幕搭配霓虹雙機台，黑膠唱盤與抹茶甜品都登場！',
  },
  {
    tierIndex: 5,
    minPoints: 750,
    tvName: '皇家純金邊框劇院螢幕',
    consoleName: '黃銅齒輪彈珠檯霸主',
    tierLabel: '黃金 Lv.6',
    tvScale: 1.26,
    tvStyle: 'royal',
    consoleStyle: 'gold',
    upgradeNote: '金碧輝煌的宮廷大劇院加上奢華三層下午茶點心塔，尊榮享受！',
  },
  {
    tierIndex: 6,
    minPoints: 1000,
    tvName: '極光穹頂全息電競大屏',
    consoleName: '北極光炫彩雙人主機座',
    tierLabel: '極光 Lv.7',
    tvScale: 1.33,
    tvStyle: 'aurora',
    consoleStyle: 'prismatic',
    upgradeNote: '突破千分！極光玻璃穹頂下的超夢幻電競影院，炫彩全息閃耀！',
  },
  {
    tierIndex: 7,
    minPoints: 1250,
    tvName: '永恆星之果實宇宙巨幕',
    consoleName: '七彩夢幻全能遊樂殿堂',
    tierLabel: '神話 MAX',
    tvScale: 1.4,
    tvStyle: 'cosmos',
    consoleStyle: 'prismatic',
    upgradeNote: '1250 分歡樂客廳最高境界！集結電玩、劇院、點心盛宴於一身！',
  },
];

export function getStudentLivingWareTier(points: number): LivingWareVisualTier {
  if (points < 0) return LIVING_WARE_VISUAL_TIERS[0];
  for (let i = LIVING_WARE_VISUAL_TIERS.length - 1; i >= 1; i--) {
    if (points >= LIVING_WARE_VISUAL_TIERS[i].minPoints) {
      return LIVING_WARE_VISUAL_TIERS[i];
    }
  }
  return LIVING_WARE_VISUAL_TIERS[1];
}

export const LIVE_LIVING_ROOM_ACTIVITIES: LivingRoomActivityItem[] = [
  {
    id: 'living_item_retro_tv',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/46/Retro_TV.png',
    name: '復古彩色電視 (Retro TV)',
    category: '視聽手作',
    unlockScore: 0,
    moodEffect: '娛樂度 +2 · 氣象與美食台',
    enjoyTip: '轉開復古旋鈕收看〈醬料女皇〉與明日農耕氣象，客廳充滿歡笑！',
    quote: '每個星露谷小屋的靈魂所在，每天早上一開機就有好多趣事！',
  },
  {
    id: 'living_item_apple_tea',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/8f/Green_Tea.png',
    name: '暖暖青茶茶壺 (Warm Green Tea)',
    category: '暢快飲品',
    unlockScore: 0,
    moodEffect: '專注回復 +2 · 清新茶香',
    enjoyTip: '倒一杯卡洛琳特製的暖熱翠綠茶飲，配著小點心看電視超愜意。',
    quote: '溫熱茶香在客廳木桌上輕輕飄散，喝完立刻精神滿滿！',
  },
  {
    id: 'living_item_popcorn_snack',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Popcorn.png',
    name: '奶油電影爆米花 (Movie Popcorn)',
    category: '美味零食',
    unlockScore: 50,
    moodEffect: '追劇快樂 +3 · 酥脆香甜',
    enjoyTip: '打電動、看電影絕對少不了整大碗剛爆好的金黃香濃爆米花！',
    quote: '喀滋喀滋～一顆接一顆停不下來，分給客廳裡的小夥伴一起吃！',
  },
  {
    id: 'living_item_pancakes',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6b/Pancakes.png',
    name: '蜂蜜黃金鬆餅盤 (Honey Pancakes)',
    category: '美味零食',
    unlockScore: 100,
    moodEffect: '幸福感 +4 · 甜蜜點心',
    enjoyTip: '邊玩桌上遊戲邊咬一口軟綿香甜的蜂蜜鬆餅，快樂翻倍！',
    quote: '陽光透進客廳窗戶照在鬆餅上，真是完美的週末午茶時光！',
  },
  {
    id: 'living_item_milkshake',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/92/Milk.png',
    name: '草莓香草冰奶昔 (Berry Milkshake)',
    category: '暢快飲品',
    unlockScore: 150,
    moodEffect: '清涼暢快 +4 · 冰甜好喝',
    enjoyTip: '客廳零食吧台現打的粉紅奶昔，插上吸管配餅乾一口喝下超幸福！',
    quote: '上頭點綴著鮮奶油與鮮紅莓果，客廳瞬間變身時尚甜品店！',
  },
  {
    id: 'living_item_pizza',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pizza.png',
    name: '派對起司厚披薩 (Party Pizza)',
    category: '美味零食',
    unlockScore: 200,
    moodEffect: '派對活力 +5 · 牽絲美味',
    enjoyTip: '打街機打到一半肚子餓？來兩片剛出爐的拉絲起司番茄披薩吧！',
    quote: '沙姆最愛的電玩夜必備披薩，邊打機邊分享最快樂！',
  },
  {
    id: 'living_item_coffee',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Coffee.png',
    name: '暖心棉花糖可可 (Hot Cocoa)',
    category: '暢快飲品',
    unlockScore: 250,
    moodEffect: '暖胃元氣 +5 · 電影良伴',
    enjoyTip: '窩進家庭劇院的大懶骨頭沙發，捧著熱呼呼的可可看溫馨動畫片！',
    quote: '壁爐火光噼啪響著，喝一口甜滋滋熱可可心都融化了！',
  },
  {
    id: 'living_item_jukebox',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/0/02/Mini-Jukebox.png',
    name: '歡唱迷你點唱機 (Mini-Jukebox)',
    category: '視聽手作',
    unlockScore: 300,
    moodEffect: '節奏感 +6 · 派對金曲',
    enjoyTip: '拿起卡拉OK麥克風配上迷你點唱機，在客廳開一場小鎮演唱會！',
    quote: '音樂響起全場跟著搖擺，每個人都是星露谷最佳閃亮歌手！',
  },
  {
    id: 'living_item_pumpkin_pie',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7d/Pumpkin_Pie.png',
    name: '桌遊秋日南瓜派 (Pumpkin Pie)',
    category: '美味零食',
    unlockScore: 350,
    moodEffect: '腦力 +6 · 桌遊補給',
    enjoyTip: '下西洋棋、玩桌遊動腦時來一塊綿密南瓜派，思緒立刻變清晰！',
    quote: '棋盤與撲克牌擺滿桌面，配上肉桂派簡直是秋季最佳派對！',
  },
  {
    id: 'living_item_fruit_salad',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Fruit_Salad.png',
    name: '玻璃花房鮮果盤 (Fruit Salad)',
    category: '美味零食',
    unlockScore: 400,
    moodEffect: '清爽元氣 +6 · 鮮果滋味',
    enjoyTip: '在滿滿綠植的陽光溫室客廳裡品嚐繽紛鮮果沙拉，健康又美味！',
    quote: '滿滿色彩繽紛的多汁水果，看一眼就讓人心情明朗起來！',
  },
  {
    id: 'living_item_chocolate_cake',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/87/Chocolate_Cake.png',
    name: '雪屋雙層巧克力糕 (Choco Cake)',
    category: '美味零食',
    unlockScore: 450,
    moodEffect: '甜蜜滿足 +7 · 冬夜慶祝',
    enjoyTip: '看著窗外飄雪與客廳溫暖壁爐，切一塊濃厚巧克力蛋糕享受假期！',
    quote: '綿密可可海綿蛋糕配雪景電影，冬季最幸福的室內活動！',
  },
  {
    id: 'living_item_wizard_couch',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/22/Wizard_Couch.png',
    name: '紫晶魔導電競沙發 (Wizard Couch)',
    category: '電玩桌遊',
    unlockScore: 500,
    moodEffect: '手感 +8 · 舒適支撐',
    enjoyTip: '坐上紫絨魔法沙發連打三場星際射擊街機都不覺得累！',
    quote: '法師高塔訂製的閃亮紫沙發，搭配紫晶霓虹螢幕酷炫滿點！',
  },
  {
    id: 'living_item_maki_roll',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Maki_Roll.png',
    name: '茶室和風壽司卷 (Tea House Sushi)',
    category: '美味零食',
    unlockScore: 550,
    moodEffect: '精緻美味 +8 · 日式茶點',
    enjoyTip: '聽著黑膠唱片的溫柔旋律，在暖桌旁品嚐精緻海苔壽司與抹茶！',
    quote: '竹林微風吹拂、黑膠輕轉，這才是懂享受生活的客廳風格～',
  },
  {
    id: 'living_item_pink_cake',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/32/Pink_Cake.png',
    name: '櫻花野餐粉紅蛋糕 (Pink Cake)',
    category: '美味零食',
    unlockScore: 600,
    moodEffect: '幸福爆表 +9 · 櫻花派對',
    enjoyTip: '邊看著巨型電影電視、邊喝珍珠奶茶配可愛粉紅愛心蛋糕！',
    quote: '粉紅花瓣飄進陽台，這塊甜點甜進每位朋友的心坎裡！',
  },
  {
    id: 'living_item_plum_pudding',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a0/Plum_Pudding.png',
    name: '手作工坊蜜果派 (Craft Pudding)',
    category: '視聽手作',
    unlockScore: 650,
    moodEffect: '創造力 +9 · 手作下午茶',
    enjoyTip: '在畫架畫完薰衣草風景畫、折好繽紛紙鶴，再坐下來享用甜點！',
    quote: '畫筆與色紙點綴著桌角，每個周末都能做出超有成就感的作品！',
  },
  {
    id: 'living_item_blueberry_tart',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Blueberry_Tart.png',
    name: '觀星藍莓塔套餐 (Stargaze Tart)',
    category: '美味零食',
    unlockScore: 700,
    moodEffect: '探索靈感 +10 · 觀星茶點',
    enjoyTip: '用黃銅天文望遠鏡看完夜空流星後，來一份酥脆藍莓塔配星光茶！',
    quote: '深藍夜幕與湖面月色就在落地窗外，最浪漫的客廳之夜！',
  },
  {
    id: 'living_item_tropical_drink',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/32/Tropical_Curry.png',
    name: '薑島鳳梨冰特調 (Island Smoothie)',
    category: '暢快飲品',
    unlockScore: 750,
    moodEffect: '海島元氣 +10 · 沁涼解渴',
    enjoyTip: '躺在吊床沙發吹海風看節目，喝一口插著小雨傘的鳳梨椰奶凍飲！',
    quote: '不用坐船就能在客廳享受薑島陽光渡假氛圍，超chill！',
  },
  {
    id: 'living_item_aquarium',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/14/Aquatic_Sanctuary.png',
    name: '發光深海水族巨幕 (Coral Aquarium)',
    category: '視聽手作',
    unlockScore: 800,
    moodEffect: '療癒指數 +12 · 夢幻水母',
    enjoyTip: '整面牆的發光水母與珊瑚水族箱隨音樂閃爍，比電視還迷人！',
    quote: '坐在貝殼沙發上欣賞發光魚群游過眼前，壓力瞬間全消！',
  },
  {
    id: 'living_item_espresso',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/36/Triple_Shot_Espresso.png',
    name: '鐘樓三倍特調冰飲 (Clockwork Brew)',
    category: '暢快飲品',
    unlockScore: 850,
    moodEffect: '反應速度 +12 · 彈珠高手',
    enjoyTip: '來一杯齒輪茶几上的提神特調，挑戰蒸氣龍彈珠檯最高分紀錄！',
    quote: '彈珠噹噹噹瘋狂跳分，喝一口特調反應速度直接飆升！',
  },
  {
    id: 'living_item_junimo_kart',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Junimo_Kart_Arcade_System.png',
    name: '祝尼魔卡丁車街機 (Junimo Arcade)',
    category: '電玩桌遊',
    unlockScore: 1000,
    moodEffect: '電玩神技 +15 · 千分紀念',
    enjoyTip: '千分極光電競廳正式開幕！隨時都能邀請全班同學來一局大對決！',
    quote: '超人氣祝尼魔卡丁車大型街機搬進客廳啦，快來刷新紀錄！',
  },
  {
    id: 'living_item_catalogue',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e8/Furniture_Catalogue.png',
    name: '皇家夢幻傢俬目錄 (Deluxe Lounge)',
    category: '視聽手作',
    unlockScore: 1150,
    moodEffect: '創意無限 +18 · 自由裝潢',
    enjoyTip: '打開神級設計圖鑑，銀河桌遊、雲端VR與皇家劇場想換什麼就換什麼！',
    quote: '所有客廳精品全收錄，把這裡改造成宇宙最強娛樂基地！',
  },
  {
    id: 'living_item_stardrop_party',
    url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Magic_Rock_Candy.png',
    name: '五彩星果歡樂盛宴 (Stardrop Feast)',
    category: '美味零食',
    unlockScore: 1250,
    moodEffect: 'MAX 滿分狂歡 · 無限歡樂',
    enjoyTip: '1250 分滿級專屬！端出五彩魔法冰糖、星果蛋糕與七彩氣泡飲大慶祝！',
    quote: '全星露谷最頂尖的夢幻遊樂客廳誕生！吃喝玩樂樣樣都是傳奇！',
  },
];

export const LIVING_ROOM_BACKGROUND_MILESTONES: LivingRoomArtworkTier[] = [
  {
    level: 0,
    minPoints: 0,
    nextPoints: 50,
    bgUrl: living0WoodenSofaBg,
    icon: '🛋️',
    livingRoomTitle: '0分・初心者原木小客廳',
    scaleLabel: 'Lv.1 原木起居間',
    consoleFacility: '木框彩色小電視 & 小茶壺茶几',
    snackFeature: '青脆紅蘋果與暖暖青茶',
    tvShowHighlight: 'CH1 農耕氣象台準時播報中',
    description: '溫馨質樸的木頭起居室！有柔軟草綠布沙發與小壁爐，再集滿 50 分就會裝上紅白電玩遊戲機喔！',
    unlockedFunFeatures: [
      { emoji: '📺', label: '復古彩色小電視', quote: '每天早上打開電視看看好玩的農場新聞！' },
      { emoji: '🍎', label: '新鮮蘋果午茶桌', quote: '配著暖茶吃蘋果，客廳充滿淡淡果香！' },
    ],
  },
  {
    level: 1,
    minPoints: 50,
    nextPoints: 100,
    bgUrl: living50RetroGameBg,
    icon: '🎮',
    livingRoomTitle: '50分・紅白電玩爆米花客廳',
    scaleLabel: 'Lv.2 復古遊戲廳',
    consoleFacility: '紅白雙人遊戲主機 & 手把',
    snackFeature: '奶油大碗爆米花 & 莓果氣泡飲',
    tvShowHighlight: '雙人合作冒險遊戲熱戰中！',
    description: '突破 50 分！客廳電視插上了經典紅白遊樂器與雙手把，茶几上還擺滿香噴噴奶油爆米花！',
    unlockedFunFeatures: [
      { emoji: '🎮', label: '雙人紅白遊戲機', quote: '按下 START 鍵就能跟小夥伴一起闖關冒險！' },
      { emoji: '🍿', label: '滿碗奶油爆米花', quote: '追劇玩遊戲的完美好搭檔，喀滋喀滋超滿足！' },
    ],
  },
  {
    level: 2,
    minPoints: 100,
    nextPoints: 150,
    bgUrl: living100SunflowerBg,
    icon: '🌻',
    livingRoomTitle: '100分・向日葵桌遊陽光廳',
    scaleLabel: 'Lv.3 陽光桌遊間',
    consoleFacility: '彩色六角地圖桌遊 & 大窗台',
    snackFeature: '蜂蜜檸檬冰飲 & 黃金小餅乾',
    tvShowHighlight: '晴空頻道 × 益智桌遊對戰',
    description: '突破 100 分！明亮黃色條紋沙發搭配六角板塊桌遊棋盤，陽光灑滿客廳充滿歡笑！',
    unlockedFunFeatures: [
      { emoji: '🎲', label: '趣味大富翁桌遊', quote: '擲骰子收集資源蓋房子，動腦又好玩！' },
      { emoji: '🍋', label: '冰涼蜂蜜檸檬汁', quote: '清爽解渴，玩桌遊玩到忘記時間！' },
    ],
  },
  {
    level: 3,
    minPoints: 150,
    nextPoints: 200,
    bgUrl: living150SnackBarBg,
    icon: '🥤',
    livingRoomTitle: '150分・草莓奶昔點心吧客廳',
    scaleLabel: 'Lv.4 甜點派對吧',
    consoleFacility: '壁掛寬螢幕電視 & 暖烘烘壁爐',
    snackFeature: '粉紅草莓奶昔、巧克力餅乾 & 糖果罐',
    tvShowHighlight: '料理節目與點心時間同時享受',
    description: '客廳多了一座超夢幻的零食甜點吧台！排滿高高的粉紅草莓奶昔與剛烤好的巧克力豆餅乾！',
    unlockedFunFeatures: [
      { emoji: '🥤', label: '鮮奶油草莓奶昔', quote: '冰涼香甜的粉紅奶昔，喝一口心情超粉嫩！' },
      { emoji: '🍪', label: '現烤巧克力餅乾', quote: '滿滿一盤香脆餅乾與彩虹糖果罐任你挑！' },
    ],
  },
  {
    level: 4,
    minPoints: 200,
    nextPoints: 250,
    bgUrl: living200ArcadeBg,
    icon: '🕹️',
    livingRoomTitle: '200分・大型電玩街機派對廳',
    scaleLabel: 'Lv.5 霓虹街機房',
    consoleFacility: '直立式宇宙街機 + 主機三合一',
    snackFeature: '起司臘腸披薩 & 冰涼氣泡可樂',
    tvShowHighlight: '星際射擊街機最高分挑戰中',
    description: '把整台大型街機搬進客廳！壁上掛著溫暖燈串、L型大沙發配起司披薩與冰可樂，根本夢想基地！',
    unlockedFunFeatures: [
      { emoji: '🕹️', label: '直立彩色大型街機', quote: '投下幸運代幣，挑戰草原之王破關紀錄！' },
      { emoji: '🍕', label: '牽絲起司熱披薩', quote: '和朋友一人一片披薩配冰可樂最痛快！' },
    ],
  },
  {
    level: 5,
    minPoints: 250,
    nextPoints: 300,
    bgUrl: living250FireplaceCinemaBg,
    icon: '🎬',
    livingRoomTitle: '250分・壁爐懶骨頭家庭劇院',
    scaleLabel: 'Lv.6 私人電影院',
    consoleFacility: '壁掛超大投影銀幕 & 立體音響',
    snackFeature: '拉花熱可可與香蒜麵包籃',
    tvShowHighlight: 'IMAX 森林冒險動畫電影放映中',
    description: '超大型投影幕登場！搭配軟綿綿的懶骨頭沙發、劈啪壁爐和熱可可，隨時包場看大片！',
    unlockedFunFeatures: [
      { emoji: '🎬', label: '超大牆面投影銀幕', quote: '關燈配上立體環繞音響，電影院就在家裡！' },
      { emoji: '🛋️', label: '蓬鬆懶骨頭沙發', quote: '整個人陷進去的舒適感，不想起來了啦！' },
    ],
  },
  {
    level: 6,
    minPoints: 300,
    nextPoints: 350,
    bgUrl: living300PeachKaraokeBg,
    icon: '🎤',
    livingRoomTitle: '300分・粉桃霓虹歡唱 KTV 廳',
    scaleLabel: 'Lv.7 歡唱音樂室',
    consoleFacility: '舞台麥克風支架 + 音符霓虹牆',
    snackFeature: '水蜜桃塔與蜜桃氣泡特調',
    tvShowHighlight: '閃亮卡拉OK伴唱系統全開！',
    description: '粉嫩桃色客廳搭起了專屬迷你小舞台！拿起麥克風對著音響高歌，還有黑膠與吉他伴奏喔！',
    unlockedFunFeatures: [
      { emoji: '🎤', label: '閃亮專屬小舞台', quote: '高唱星露谷主題曲，聲音傳遍整個小鎮！' },
      { emoji: '🍑', label: '甜蜜水蜜桃果塔', quote: '唱完一首歌來一口香甜桃塔潤潤喉！' },
    ],
  },
  {
    level: 7,
    minPoints: 350,
    nextPoints: 400,
    bgUrl: living350AutumnBoardgameBg,
    icon: '♟️',
    livingRoomTitle: '350分・楓秋西洋棋桌遊沙龍',
    scaleLabel: 'Lv.8 楓葉桌遊館',
    consoleFacility: '橡木長桌西洋棋、撲克牌與多面骰',
    snackFeature: '肉桂南瓜派與熱香料蘋果茶',
    tvShowHighlight: '秋日暖爐 × 燒腦桌遊之夜',
    description: '金黃楓葉圍繞的溫暖客廳！寬大木桌上擺滿西洋棋、撲克與 RPG 骰子，邊下棋邊吃南瓜派！',
    unlockedFunFeatures: [
      { emoji: '♟️', label: '精緻木雕西洋棋盤', quote: '跟同學來場棋逢敵手的智力大對決！' },
      { emoji: '🥧', label: '金黃肉桂南瓜派', quote: '濃濃奶油鮮奶油配肉桂蘋果茶超暖胃！' },
    ],
  },
  {
    level: 8,
    minPoints: 400,
    nextPoints: 450,
    bgUrl: living400GreenhouseTeaBg,
    icon: '🌿',
    livingRoomTitle: '400分・陽光溫室花茶沙龍',
    scaleLabel: 'Lv.9 植物玻璃屋',
    consoleFacility: '藤蔓環繞大電視 & 藤編花椅',
    snackFeature: '三層草莓甜點架 & 瓷器花茶組',
    tvShowHighlight: '自然生態探索頻道播映中',
    description: '360 度透光玻璃花房變身你的專屬客廳！懸掛滿滿翠綠蕨類植物，優雅享用三層英式下午茶！',
    unlockedFunFeatures: [
      { emoji: '🍰', label: '三層水果甜點架', quote: '草莓塔、馬卡龍和花草茶擺滿整桌！' },
      { emoji: '🪴', label: '森林系垂墜盆栽', quote: '在充滿芬多精的花房裡看電視超療癒！' },
    ],
  },
  {
    level: 9,
    minPoints: 450,
    nextPoints: 500,
    bgUrl: living450WinterCocoaBg,
    icon: '☕',
    livingRoomTitle: '450分・冬雪暖爐棉花糖可可廳',
    scaleLabel: 'Lv.10 雪見暖閣',
    consoleFacility: '落地雪景玻璃窗 + 大型高清電視',
    snackFeature: '棉花糖熱可可與楓糖鬆餅',
    tvShowHighlight: '冬日溫馨耶誕節目馬拉松',
    description: '窗外是銀白雪松林，屋內卻暖烘烘的！羊毛地毯配上飄著棉花糖的熱可可和楓糖格子鬆餅！',
    unlockedFunFeatures: [
      { emoji: '☕', label: '漂浮棉花糖熱可可', quote: '看著雪花慢慢飄落，捧著熱飲超幸福！' },
      { emoji: '🧇', label: '雙層楓糖格子鬆餅', quote: '淋滿琥珀楓糖漿與鮮奶油，咬下去好酥脆！' },
    ],
  },
  {
    level: 10,
    minPoints: 500,
    nextPoints: 550,
    bgUrl: living500AmethystArcadeBg,
    icon: '🔮',
    livingRoomTitle: '500分・巫師紫晶雙機電競房',
    scaleLabel: 'Lv.11 紫晶電競殿',
    consoleFacility: '三螢幕魔法桌機 + 雙台霓虹街機',
    snackFeature: '星光星星餅乾 & 閃亮魔藥汽水',
    tvShowHighlight: '星際戰機與法師大冒險雙開！',
    description: '突破 500 分！整面牆鑲嵌發光紫水晶洞，一邊是三螢幕電競桌、一邊是兩台發光霓虹大機台！',
    unlockedFunFeatures: [
      { emoji: '💻', label: '三螢幕紫晶電競區', quote: '畫質超絲滑，還可以跟同學連線大對決！' },
      { emoji: '🧪', label: '氣泡發光魔藥汽水', quote: '喝起來有藍莓蘇打的味道，超夢幻！' },
    ],
  },
  {
    level: 11,
    minPoints: 550,
    nextPoints: 600,
    bgUrl: living550BambooVinylBg,
    icon: '💿',
    livingRoomTitle: '550分・竹林和風黑膠暖桌廳',
    scaleLabel: 'Lv.12 竹林茶室',
    consoleFacility: '黑膠唱片轉盤音響 + 壁掛電視',
    snackFeature: '抹茶聖代杯與手沖煎茶',
    tvShowHighlight: '富士山風景頻道 × 黑膠爵士樂',
    description: '推開紙門就是翠綠竹林庭院！坐在超暖和的日式被爐桌裡吃抹茶冰淇淋聖代，聽黑膠音樂超放鬆！',
    unlockedFunFeatures: [
      { emoji: '💿', label: '實木黑膠唱片機', quote: '黑膠轉啊轉，放出溫暖復古的療癒音色～' },
      { emoji: '🍵', label: '雙層抹茶冰淇淋杯', quote: '濃郁抹茶凍配紅豆麻糬，消暑又美味！' },
    ],
  },
  {
    level: 12,
    minPoints: 600,
    nextPoints: 650,
    bgUrl: living600SakuraTheaterBg,
    icon: '🌸',
    livingRoomTitle: '600分・櫻花陽台珍奶影廳',
    scaleLabel: 'Lv.13 櫻花影院',
    consoleFacility: '陽台觀景大電視 + 粉櫻木沙發',
    snackFeature: '草莓大福、鯛魚燒與黑糖珍珠奶茶',
    tvShowHighlight: '星露谷春之農場實況大螢幕',
    description: '整片粉色櫻花盛開在露台外面，花瓣飄進木頭客廳裡，一邊吸大口珍珠奶茶一邊看大螢幕！',
    unlockedFunFeatures: [
      { emoji: '🧋', label: '黑糖珍珠鮮奶茶', quote: 'Q彈珍珠配草莓大福和現烤鯛魚燒絕配！' },
      { emoji: '🌸', label: '露天賞櫻木露台', quote: '微風把粉紅櫻花花瓣吹進家裡好夢幻！' },
    ],
  },
  {
    level: 13,
    minPoints: 650,
    nextPoints: 700,
    bgUrl: living650LavenderCraftBg,
    icon: '🎨',
    livingRoomTitle: '650分・薰衣草手作繪畫工坊',
    scaleLabel: 'Lv.14 手作美學廳',
    consoleFacility: '風景畫架 + 摺紙手作大長桌',
    snackFeature: '彩虹馬卡龍塔 & 薰衣草熱花茶',
    tvShowHighlight: '創意 DIY 教學節目隨時重播',
    description: '喜歡畫畫、摺紙做手工的夢想客廳！擺滿彩色紙鶴與畫筆調色盤，累了就吃顆馬卡龍喝茶休息！',
    unlockedFunFeatures: [
      { emoji: '🎨', label: '木頭畫架與調色盤', quote: '把窗外紫色薰衣草田畫成專屬油畫！' },
      { emoji: '🦢', label: '彩色手作千紙鶴台', quote: '剪紙、拼貼、摺紙鶴，做什麼都超好玩！' },
    ],
  },
  {
    level: 14,
    minPoints: 700,
    nextPoints: 750,
    bgUrl: living700MoonlitStargazeBg,
    icon: '🔭',
    livingRoomTitle: '700分・月光湖畔天文觀星廳',
    scaleLabel: 'Lv.15 星夜觀測站',
    consoleFacility: '黃銅天文望遠鏡 + 銀河星幕螢幕',
    snackFeature: '藍莓起司蛋糕與星空茶壺',
    tvShowHighlight: '4K 宇宙星雲紀錄片放映中',
    description: '整扇彎月造型飄窗對著星夜湖泊，拿著金色望遠鏡數星星，再吃一口滑順藍莓乳酪蛋糕！',
    unlockedFunFeatures: [
      { emoji: '🔭', label: '黃銅高倍望遠鏡', quote: '今晚木星與流星雨清晰得就在眼前！' },
      { emoji: '🍰', label: '星夜藍莓乳酪蛋糕', quote: '配上一壺閃爍星光藍茶，浪漫指數爆表！' },
    ],
  },
  {
    level: 15,
    minPoints: 750,
    nextPoints: 800,
    bgUrl: living750GingerTikiBg,
    icon: '🏝️',
    livingRoomTitle: '750分・薑島竹棚吊床海灘客廳',
    scaleLabel: 'Lv.16 熱帶渡假屋',
    consoleFacility: '朱槿花環繞電視 + 海風手工吊床',
    snackFeature: '整顆椰子冰沙 & 熱帶水果串',
    tvShowHighlight: '海島衝浪大賽實況轉播中',
    description: '坐在竹編涼亭客廳裡直接看碧藍海水與白色沙灘！躺在彩虹編織吊床上喝椰子插小傘特調！',
    unlockedFunFeatures: [
      { emoji: '🥥', label: '海島椰子插傘凍飲', quote: '配上鳳梨奇異果串，像天天在海邊渡假！' },
      { emoji: '🌴', label: '彩虹編織海風吊床', quote: '聽著海浪聲輕輕搖晃，超舒服～' },
    ],
  },
  {
    level: 16,
    minPoints: 800,
    nextPoints: 850,
    bgUrl: living800CoralAquariumBg,
    icon: '🪼',
    livingRoomTitle: '800分・人魚水母深海透明客廳',
    scaleLabel: 'Lv.17 海底珊瑚宮',
    consoleFacility: '巨型發光水母水族牆 + 珍珠電視',
    snackFeature: '深海氣泡蘇打與珍珠甜品架',
    tvShowHighlight: '深海美人魚交響樂現場直播',
    description: '整面牆是發光水母與彩色珊瑚礁水族箱！坐在貝殼絲絨沙發上欣賞五彩魚群圍繞身旁游過！',
    unlockedFunFeatures: [
      { emoji: '🪼', label: '全景發光水母巨牆', quote: '粉紅與湛藍水母優雅漂浮，如夢似幻！' },
      { emoji: '🐚', label: '人魚貝殼絲絨沙發', quote: '華麗貝殼吊燈照亮整個水晶地磚！' },
    ],
  },
  {
    level: 17,
    minPoints: 850,
    nextPoints: 900,
    bgUrl: living850SteampunkPinballBg,
    icon: '⚙️',
    livingRoomTitle: '850分・蒸氣龐克彈珠留聲廳',
    scaleLabel: 'Lv.18 齒輪遊樂場',
    consoleFacility: '蒸氣巨龍復古彈珠檯 + 黃銅留聲機',
    snackFeature: '焦糖奶油厚鬆餅 & 漸層冰咖啡',
    tvShowHighlight: '發條冒險動畫電影放映中',
    description: '酷炫銅齒輪與愛迪生燈泡裝飾的英倫風遊樂廳！左手玩閃亮巨龍彈珠檯、右手品嚐焦糖鬆餅！',
    unlockedFunFeatures: [
      { emoji: '🐉', label: '蒸氣巨龍發光彈珠檯', quote: '連撞五個紅燈分數翻倍，叮叮咚咚超刺激！' },
      { emoji: '📻', label: '黃銅大喇叭留聲機', quote: '轉動黑膠放出迷人的爵士冒險配樂！' },
    ],
  },
  {
    level: 18,
    minPoints: 900,
    nextPoints: 950,
    bgUrl: living900RoyalBanquetBg,
    icon: '👑',
    livingRoomTitle: '900分・皇家水晶吊燈宴會客廳',
    scaleLabel: 'Lv.19 金輝宮廷廳',
    consoleFacility: '純金雕花劇院大螢幕 + 絲絨貴族沙發',
    snackFeature: '三層草莓鮮奶油皇冠大蛋糕',
    tvShowHighlight: '星露谷年度交響音樂會直播',
    description: '拱形黃金大廳挑高無比，巨型水晶吊燈與紅色絲絨沙發齊聚，大理石桌正中央擺著華麗三層大蛋糕！',
    unlockedFunFeatures: [
      { emoji: '🎂', label: '三層皇家草莓慶典蛋糕', quote: '全班同學一起慶祝也不夠分完的超大蛋糕！' },
      { emoji: '👑', label: '純金雕花大劇院螢幕', quote: '連電視外框都用皇室金箔雕花打造！' },
    ],
  },
  {
    level: 19,
    minPoints: 950,
    nextPoints: 1000,
    bgUrl: living950CloudVrBg,
    icon: '☁️',
    livingRoomTitle: '950分・天空雲海 VR 馬卡龍廳',
    scaleLabel: 'Lv.20 雲端科技館',
    consoleFacility: '全息浮空 VR 眼鏡戰艙 + 雲朵沙發',
    snackFeature: '彩虹餐車馬卡龍 & 雲朵棉花糖蘇打',
    tvShowHighlight: '360° 空中飛行虛擬實境大冒險',
    description: '飄浮在金色雲海之上的空中客廳！戴上 VR 眼鏡在浮空全息螢幕裡翱翔，旁邊還有整台彩虹馬卡龍推車！',
    unlockedFunFeatures: [
      { emoji: '🥽', label: '浮空全息 VR 電玩艙', quote: '戴上眼鏡就像真的飛進星露谷雲端世界！' },
      { emoji: '🧁', label: '七彩雲朵馬卡龍推車', quote: '推車裝滿繽紛馬卡龍與棉花糖蘇打杯！' },
    ],
  },
  {
    level: 20,
    minPoints: 1000,
    nextPoints: 1050,
    bgUrl: living1000AuroraEsportsBg,
    icon: '🌌',
    livingRoomTitle: '1000分・極光玻璃穹頂電競廳',
    scaleLabel: 'Lv.21 千分極光殿',
    consoleFacility: '超寬幅霓虹晶螢幕 + 雙人全配電競座',
    snackFeature: '極光藍色蘇打調飲 & 派對塔可脆片',
    tvShowHighlight: '極光穹頂下星際競技決賽進行中！',
    description: '恭喜突破 1000 分傳奇！抬頭就是玻璃穹頂外舞動的翡翠北極光，面前是發光藍邊超大型電競遊樂系統！',
    unlockedFunFeatures: [
      { emoji: '🖥️', label: '極光發光寬幅電競屏', quote: '在夢幻極光夜空下玩遊戲，氣氛直接封神！' },
      { emoji: '🍹', label: '冰藍星辰蘇打特調', quote: '閃耀北極光藍色的氣泡飲配塔可脆片超過癮！' },
    ],
  },
  {
    level: 21,
    minPoints: 1050,
    nextPoints: 1100,
    bgUrl: living1050JadePavilionBg,
    icon: '🏮',
    livingRoomTitle: '1050分・翡翠宮燈籠茶點遊藝廳',
    scaleLabel: 'Lv.22 翡翠殿堂',
    consoleFacility: '龍紋金框巨幕 + 翡翠雕花大茶桌',
    snackFeature: '熱騰騰小籠蒸籠點心 & 烏龍茗茶',
    tvShowHighlight: '四季國畫山水動畫在金框裡流動',
    description: '典雅碧綠的宮燈映照雕梁畫棟，翡翠圓凳圍繞精雕大茶桌，掀開蒸籠冒出陣陣誘人點心白煙！',
    unlockedFunFeatures: [
      { emoji: '🥟', label: '御膳蒸籠港式點心', quote: '熱呼呼的蝦餃燒賣配清香烏龍茶太享受了！' },
      { emoji: '🏮', label: '碧玉雕花宮燈長廊', quote: '月洞門外掛滿暖光燈籠，氣派又雅緻！' },
    ],
  },
  {
    level: 22,
    minPoints: 1100,
    nextPoints: 1150,
    bgUrl: living1100CelestialMusicBg,
    icon: '🪽',
    livingRoomTitle: '1100分・天界羽翼豎琴音樂廳',
    scaleLabel: 'Lv.23 天界聖廳',
    consoleFacility: '黃金發光豎琴 + 星光自動演奏鋼琴',
    snackFeature: '蜂蜜千層蛋糕與黃金神蜜茶',
    tvShowHighlight: '天界星座星圖在神殿拱門旋轉閃耀',
    description: '白金羽翼沙發、自動彈奏星光鋼琴與黃金水晶豎琴齊奏樂章，宛如置身雲端之上的天使音樂宮殿！',
    unlockedFunFeatures: [
      { emoji: '🪉', label: '黃金星光水晶豎琴', quote: '輕撥琴弦就會化作金色音符飄散在空氣中！' },
      { emoji: '🎹', label: '星辰閃耀大鋼琴', quote: '不彈時也會自己演奏悅耳的星露谷協奏曲！' },
    ],
  },
  {
    level: 23,
    minPoints: 1150,
    nextPoints: 1200,
    bgUrl: living1150GalaxyHolodeckBg,
    icon: '🛸',
    livingRoomTitle: '1150分・銀河全息桌遊星艦廳',
    scaleLabel: 'Lv.24 銀河艦橋',
    consoleFacility: '桌面 3D 浮空全息戰棋桌 + 銀河環窗',
    snackFeature: '銀河星空冰淇淋聖代 & 紫星氣泡飲',
    tvShowHighlight: '太陽系與七彩星雲就在頭頂玻璃外旋轉',
    description: '坐進包圍整座星系的深紫弧形沙發！咖啡桌上直接浮現出立體發光 3D 全息大冒險桌遊，酷炫到極點！',
    unlockedFunFeatures: [
      { emoji: '👾', label: '立體浮空 3D 全息桌遊', quote: '迷你島嶼、船艦與寶箱全都漂浮在空中對戰！' },
      { emoji: '🍨', label: '閃耀星塵冰淇淋聖代', quote: '淋上銀河星粉糖漿的夢幻雙球聖代！' },
    ],
  },
  {
    level: 24,
    minPoints: 1200,
    nextPoints: 1250,
    bgUrl: living1200SolarCinemaBg,
    icon: '☀️',
    livingRoomTitle: '1200分・太陽神殿奢華首映大劇院',
    scaleLabel: 'Lv.25 太陽影城',
    consoleFacility: '太陽黃金拱門超大銀幕 + 50席專屬包廂',
    snackFeature: '黃金長桌水果塔、焦糖布丁與蜜露果汁',
    tvShowHighlight: '全校同學都能受邀前來的 VIP 電影首映會',
    description: '金陽彩繪玻璃穹頂灑落聖光，整座劇院級包廂放滿黃金絨座椅與滿滿一長桌數不盡的豪華派對甜點！',
    unlockedFunFeatures: [
      { emoji: '🎞️', label: '神殿級 VIP 包廂大銀幕', quote: '想播什麼電影、開什麼派對都能邀請全班同樂！' },
      { emoji: '🍮', label: '黃金長桌無限饗宴', quote: '滑嫩烤布丁、水果派和鮮榨果汁應有盡有！' },
    ],
  },
  {
    level: 25,
    minPoints: 1250,
    nextPoints: null,
    bgUrl: living1250EternalStarfruitBg,
    icon: '⭐',
    livingRoomTitle: '1250分・永恆星之果實夢幻娛樂聖殿',
    scaleLabel: 'Lv.26 MAX 宇宙巔峰',
    consoleFacility: '五彩街機排陣 + 星果七彩電影巨幕',
    snackFeature: '星之果實紫金雙蛋糕、馬卡龍塔與彩虹冰沙',
    tvShowHighlight: '七彩霓虹吊燈閃耀著「滿分傳說」星光',
    description: '1250 分歡樂客廳最終極致！左側一整排夢幻街機、中央星果星空巨幕、右側溢滿甜點與飲品的派對長桌，吃喝玩樂天下無雙！',
    unlockedFunFeatures: [
      { emoji: '🌈', label: '四連排五彩霓虹街機', quote: '祝尼魔卡丁車、草原之王與神秘機台隨便玩！' },
      { emoji: '🎂', label: '紫星果實雙層慶祝盛宴', quote: '滿桌發光美食與彩虹飲品，天天都是歡樂慶功宴！' },
    ],
  },
];

export const WITHERED_LIVING_ROOM_ARTWORK: LivingRoomArtworkTier = {
  level: -1,
  minPoints: -999,
  nextPoints: 0,
  bgUrl: livingWitheredDimBg,
  icon: '🕯️',
  livingRoomTitle: '停電灰暗舊客廳（快加油把燈點亮！）',
  scaleLabel: '負分停電期',
  consoleFacility: '沒插電的小雪花黑白電視 & 紙箱茶几',
  snackFeature: '點心罐暫時空空的，等分數回到 0 分就補滿！',
  tvShowHighlight: '沙沙雪花訊號等待連線中…',
  description: '因目前為負分狀態，客廳暫時停電暗暗的，電視也只有雪花。快賺取正分回到 0 分以上，重新開燈開派對！',
  unlockedFunFeatures: [
    { emoji: '🕯️', label: '小蠟燭油燈', quote: '微弱暖光照亮角落，加分就能打開燦爛大燈！' },
    { emoji: '📦', label: '紙箱茶几', quote: '正準備換成嶄新橡木大茶桌跟零食！' },
  ],
  isDim: true,
};

export function getStudentLivingRoomArtwork(points: number): LivingRoomArtworkTier {
  if (points < 0) return WITHERED_LIVING_ROOM_ARTWORK;
  for (let i = LIVING_ROOM_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= LIVING_ROOM_BACKGROUND_MILESTONES[i].minPoints) {
      return LIVING_ROOM_BACKGROUND_MILESTONES[i];
    }
  }
  return LIVING_ROOM_BACKGROUND_MILESTONES[0];
}
