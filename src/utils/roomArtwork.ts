import roomWitheredBg from '../assets/images/room_withered_dusty_1794918945638.jpg';
import room0StarterBg from '../assets/images/room_0_starter_cabin_1794918946281.jpg';
import room50CottageBg from '../assets/images/room_50_cozy_cottage_1794918948460.jpg';
import room100HearthBg from '../assets/images/room_100_hearth_sunflower_1794918948150.jpg';
import room150StudyBg from '../assets/images/room_150_country_study_1794918948410.jpg';
import room200KitchenBg from '../assets/images/room_200_kitchen_suite_1794918949265.jpg';
import room250AtelierBg from '../assets/images/room_250_botanical_atelier_1794918964597.jpg';
import room300OrchardBg from '../assets/images/room_300_orchard_sunroom_1794918949279.jpg';
import room350AutumnBg from '../assets/images/room_350_autumn_hearth_1794918965486.jpg';
import room400GreenhouseBg from '../assets/images/room_400_victorian_greenhouse_1794918966625.jpg';
import room450WinterBg from '../assets/images/room_450_winter_chalet_1794918967068.jpg';
import room500WizardBg from '../assets/images/room_500_amethyst_wizard_1794918967380.jpg';
import room550MushroomBg from '../assets/images/room_550_mushroom_sanctuary_1794918968297.jpg';
import room600SakuraBg from '../assets/images/room_600_sakura_tatami_1794918969676.jpg';
import room650LavenderBg from '../assets/images/room_650_lavender_provence_1794918983864.jpg';
import room700ObservatoryBg from '../assets/images/room_700_moonlit_observatory_1794918985167.jpg';
import room750TropicalBg from '../assets/images/room_750_tropical_villa_1794918986473.jpg';
import room800AquariumBg from '../assets/images/room_800_coral_aquarium_1794918986513.jpg';
import room850ClockworkBg from '../assets/images/room_850_clockwork_library_1794918988328.jpg';
import room900RoyalBg from '../assets/images/room_900_royal_golden_hall_1794918988307.jpg';
import room950SkySuiteBg from '../assets/images/room_950_sky_cloud_suite_1794918988811.jpg';
import room1000AuroraBg from '../assets/images/room_1000_aurora_crystal_hall_1794919004153.jpg';
import room1050JadeBg from '../assets/images/room_1050_jade_palace_suite_1794919005672.jpg';
import room1100CelestialBg from '../assets/images/room_1100_celestial_wing_sanctum_1794919005999.jpg';
import room1150GalaxyBg from '../assets/images/room_1150_galaxy_crown_chamber_1794919006545.jpg';
import room1200ImperialBg from '../assets/images/room_1200_imperial_golden_throne_1794919007094.jpg';
import room1250CosmosBg from '../assets/images/room_1250_eternal_cosmos_palace_1794919007832.jpg';

export interface RoomArtworkTier {
  level: number;
  minPoints: number;
  nextPoints: number | null;
  bgUrl: string;
  icon: string;
  roomTitle: string;
  roomScaleLabel: string;
  furnitureName: string;
  lightingName: string;
  description: string;
  unlockedDecorItems: { emoji: string; label: string; quote: string }[];
  isDusty?: boolean;
}

export interface RoomFurnitureBlueprint {
  id: string;
  emoji: string;
  name: string;
  style: string;
  unlockScore: number;
  quote: string;
}

export const LIVE_ROOM_FURNITURE_ROSTER: RoomFurnitureBlueprint[] = [
  {
    id: 'furn_bed',
    emoji: '🛏️',
    name: '手工拼布小木床',
    style: '溫馨起點家具',
    unlockScore: 0,
    quote: '軟綿綿的拼布棉被，每天都能睡個香甜的好覺！',
  },
  {
    id: 'furn_tea',
    emoji: '🫖',
    name: '藍爵士花茶桌組',
    style: '鄉村木屋家具',
    unlockScore: 50,
    quote: '窗邊擺著藍爵士鮮花與花茶壺，充滿早晨的清香！',
  },
  {
    id: 'furn_fireplace',
    emoji: '🔥',
    name: '紅磚暖爐與復古電視',
    style: '向日葵暖居',
    unlockScore: 100,
    quote: '劈啪作響的紅磚壁爐與彩色電視機，整個客廳都暖呼呼的！',
  },
  {
    id: 'furn_desk',
    emoji: '🪶',
    name: '橡木書桌與地球儀',
    style: '典雅書齋',
    unlockScore: 150,
    quote: '擺滿百科全書與羽毛筆的書桌，還有香噴噴的草莓派下午茶！',
  },
  {
    id: 'furn_kitchen',
    emoji: '🍳',
    name: '銅鍋鄉村烘焙廚灶',
    style: '兩房豪華套房',
    unlockScore: 200,
    quote: '掛滿閃亮銅鍋的磚砌烤爐，隨時都在烘烤香甜的手工麵包！',
  },
  {
    id: 'furn_easel',
    emoji: '🎨',
    name: '森林畫架與挑高閣樓',
    style: '森系藝術閣樓',
    unlockScore: 250,
    quote: '爬上木梯就是專屬秘密閣樓，陽光從松林窗戶灑在油畫布上！',
  },
  {
    id: 'furn_piano',
    emoji: '🎹',
    name: '原木直立式鋼琴',
    style: '果園陽光花廳',
    unlockScore: 300,
    quote: '彈奏一曲星露谷田園小調，窗外結滿紅蘋果的果樹也跟著搖曳！',
  },
  {
    id: 'furn_autumn',
    emoji: '🎃',
    name: '南瓜雕刻燭台與毛毯沙發',
    style: '金秋楓紅暖閣',
    unlockScore: 350,
    quote: '暖橘格紋大沙發配上肉桂熱蘋果汁，迎接最詩意的金秋午後！',
  },
  {
    id: 'furn_conservatory',
    emoji: '🌹',
    name: '維多利亞鐵藝玻璃花床',
    style: '玻璃溫室花房',
    unlockScore: 400,
    quote: '睡在玫瑰與蘭花環繞的玻璃溫室穹頂下，彷彿置身童話花園！',
  },
  {
    id: 'furn_cocoa',
    emoji: '☕',
    name: '冬雪松林熱可可吧台',
    style: '雪夜木屋套房',
    unlockScore: 450,
    quote: '窗外大雪紛飛，室內聖誕燈串閃爍，喝一口加滿棉花糖的熱可可！',
  },
  {
    id: 'furn_alchemy',
    emoji: '🔮',
    name: '紫晶魔法煉金實驗台',
    style: '巫師秘境書齋',
    unlockScore: 500,
    quote: '散發神秘光芒的紫水晶柱與發光藥水瓶，能解開所有難題！',
  },
  {
    id: 'furn_sakura',
    emoji: '🍡',
    name: '和風櫻花茶几與錦鯉庭院',
    style: '櫻花溫泉別院',
    unlockScore: 600,
    quote: '拉開和紙拉門就是粉櫻與錦鯉池塘，品嚐現刷抹茶與三色糰子！',
  },
  {
    id: 'furn_telescope',
    emoji: '🔭',
    name: '黃銅天象望遠鏡與星穹',
    style: '星月觀星閣樓',
    unlockScore: 700,
    quote: '透過弧形玻璃天窗仰望新月與星座，記錄屬於自己的星辰日記！',
  },
  {
    id: 'furn_aquarium',
    emoji: '🐠',
    name: '海底珊瑚巨型水族牆',
    style: '海濱度假豪宅',
    unlockScore: 800,
    quote: '整面牆都是會發光的水母與熱帶魚群，伴著夕陽海浪聲入眠！',
  },
  {
    id: 'furn_orrery',
    emoji: '⚙️',
    name: '黃金行星機械天球儀',
    style: '鐘錶機械圖書館',
    unlockScore: 850,
    quote: '雙層挑高紅木旋轉梯與精密黃銅齒輪天球儀，知識能量滿點！',
  },
  {
    id: 'furn_cosmos_piano',
    emoji: '💎',
    name: '宇宙星鑽水晶大鋼琴',
    style: '永恆宇宙神殿',
    unlockScore: 1250,
    quote: '星之果實懸浮於彩虹極光瀑布中央，演奏跨越銀河的奇蹟樂章！',
  },
];

export const ROOM_BACKGROUND_MILESTONES: RoomArtworkTier[] = [
  {
    level: 0,
    minPoints: 0,
    nextPoints: 50,
    bgUrl: room0StarterBg,
    icon: '🪵',
    roomTitle: '原木起點小木屋',
    roomScaleLabel: 'LV.0 初級小木屋',
    furnitureName: '手工拼布床 & 小鬧鐘床頭櫃',
    lightingName: '單扇晴空木窗自然光',
    description: '溫馨整潔的原木起點房間，再賺取 50 分即可升級為浪漫碎花窗簾小屋！',
    unlockedDecorItems: [
      { emoji: '🛏️', label: '拼布木床', quote: '雖然樸實但被太陽曬得暖呼呼的！' },
      { emoji: '🌱', label: '小芽盆栽', quote: '窗邊的小芽正跟著你一起長大！' },
    ],
  },
  {
    level: 1,
    minPoints: 50,
    nextPoints: 100,
    bgUrl: room50CottageBg,
    icon: '💠',
    roomTitle: '藍花茶香溫馨臥室',
    roomScaleLabel: 'LV.1 舒適木屋臥室',
    furnitureName: '藍爵士花床 & 午茶方桌',
    lightingName: '紅白格紋雙窗柔光',
    description: '突破 50 分！換上了藍花被套、編織地毯與小書櫃，還多了一個小壁爐！',
    unlockedDecorItems: [
      { emoji: '🫖', label: '花茶點心', quote: '藍爵士花束旁放著熱騰騰的下午茶！' },
      { emoji: '📚', label: '橡木小書櫃', quote: '裡面排滿了英文繪本與冒險故事！' },
    ],
  },
  {
    level: 2,
    minPoints: 100,
    nextPoints: 150,
    bgUrl: room100HearthBg,
    icon: '🌻',
    roomTitle: '向日葵紅磚暖爐廳',
    roomScaleLabel: 'LV.2 陽光起居客廳',
    furnitureName: '復古電視機 & 格紋扶手椅',
    lightingName: '熊熊紅磚壁爐火光',
    description: '突破 100 分！紅磚壁爐、復古電視機與窗邊滿滿的向日葵花槽讓家裡充滿活力！',
    unlockedDecorItems: [
      { emoji: '📺', label: '復古電視', quote: '收看〈醬料女皇〉與每日氣象占卜！' },
      { emoji: '🌻', label: '向日葵花瓶', quote: '金色向日葵讓整個客廳都亮了起來！' },
    ],
  },
  {
    level: 3,
    minPoints: 150,
    nextPoints: 200,
    bgUrl: room150StudyBg,
    icon: '🪶',
    roomTitle: '典雅橡木書房餐廳',
    roomScaleLabel: 'LV.3 書香木屋廳堂',
    furnitureName: '大書桌地球儀 & 草莓派餐桌',
    lightingName: '三面採光橡木長窗',
    description: '突破 150 分！擁有專屬研究大書桌、高大書架與擺滿草莓派的溫馨長餐桌！',
    unlockedDecorItems: [
      { emoji: '🥧', label: '手工草莓派', quote: '剛烤好的甜美草莓派散發誘人香氣！' },
      { emoji: '🌍', label: '復古地球儀', quote: '一邊轉動地球儀一邊規劃世界探險！' },
    ],
  },
  {
    level: 4,
    minPoints: 200,
    nextPoints: 250,
    bgUrl: room200KitchenBg,
    icon: '🍳',
    roomTitle: '鄉村廚灶雙區套房',
    roomScaleLabel: 'LV.4 兩房一廳升級住宅',
    furnitureName: '銅鍋磚砌廚灶 & 四柱木床',
    lightingName: '燭光壁爐與廚房烘火',
    description: '突破 200 分！房屋正式擴建！左手邊是設備齊全的鄉村大廚房，右手邊是華麗四柱床臥室！',
    unlockedDecorItems: [
      { emoji: '🥖', label: '現烤歐包', quote: '石砌烤爐每天都能端出金黃鬆軟的麵包！' },
      { emoji: '🛏️', label: '四柱帳幔床', quote: '鋪著波斯花紋大地毯的超舒適睡眠區！' },
    ],
  },
  {
    level: 5,
    minPoints: 250,
    nextPoints: 300,
    bgUrl: room250AtelierBg,
    icon: '🎨',
    roomTitle: '森系藤蔓畫室閣樓',
    roomScaleLabel: 'LV.5 挑高複式閣樓',
    furnitureName: '原木油畫架 & 攀爬梯閣樓床',
    lightingName: '森林松影大景觀窗',
    description: '突破 250 分！牆面長滿常春藤蔓，還多了一層可以爬木梯上去的秘密樹屋書房閣樓！',
    unlockedDecorItems: [
      { emoji: '🎨', label: '風景畫架', quote: '畫布上正描繪著窗外的青翠松林！' },
      { emoji: '🐈', label: '打盹小貓', quote: '壁爐旁還蜷縮著一隻呼呼大睡的暖橘貓咪！' },
    ],
  },
  {
    level: 6,
    minPoints: 300,
    nextPoints: 350,
    bgUrl: room300OrchardBg,
    icon: '🎹',
    roomTitle: '果園拱窗鋼琴花廳',
    roomScaleLabel: 'LV.6 莊園陽光沙龍',
    furnitureName: '直立木鋼琴 & 玻璃果醬櫃',
    lightingName: '弧形大落地果園陽光窗',
    description: '突破 300 分！大片拱形落地窗外就是紅蘋果園，室內擺設直立式鋼琴與繽紛水果罐頭櫃！',
    unlockedDecorItems: [
      { emoji: '🎹', label: '木質鋼琴', quote: '琴鍵清脆悅耳，隨時來一場家庭音樂會！' },
      { emoji: '🫙', label: '果醬收藏櫃', quote: '整排裝滿藍莓、草莓與水蜜桃果醬的玻璃罐！' },
    ],
  },
  {
    level: 7,
    minPoints: 350,
    nextPoints: 400,
    bgUrl: room350AutumnBg,
    icon: '🍁',
    roomTitle: '金秋楓紅壁爐暖閣',
    roomScaleLabel: 'LV.7 秋收別墅客廳',
    furnitureName: '暖橘格紋沙發 & 南瓜燈餐櫃',
    lightingName: '楓林斜陽與暖黃吊燈',
    description: '突破 350 分！窗外火紅楓樹搖曳，壁爐上排滿可愛小南瓜，喝著熱肉桂蘋果汁好愜意！',
    unlockedDecorItems: [
      { emoji: '🎃', label: '微笑南瓜燈', quote: '散發柔和橘光的小南瓜讓秋夜格外溫馨！' },
      { emoji: '🛋️', label: '針織格紋沙發', quote: '披著厚實針織毛毯的超軟雙人沙發！' },
    ],
  },
  {
    level: 8,
    minPoints: 400,
    nextPoints: 450,
    bgUrl: room400GreenhouseBg,
    icon: '🌹',
    roomTitle: '維多利亞玻璃花房',
    roomScaleLabel: 'LV.8 玻璃溫室大套房',
    furnitureName: '鍛鐵花藝架子床 & 大理石茶桌',
    lightingName: '透明玻璃穹頂與暖黃燈串',
    description: '突破 400 分！整間臥室就像一座玫瑰蘭花盛開的維多利亞玻璃花房，夢幻滿點！',
    unlockedDecorItems: [
      { emoji: '🌹', label: '滿室粉紅玫瑰', quote: '四周盛開著四季綻放的珍奇玫瑰與蘭花！' },
      { emoji: '💡', label: '精靈小燈串', quote: '鐵藝拱架上垂掛著如星辰般的暖光燈串！' },
    ],
  },
  {
    level: 9,
    minPoints: 450,
    nextPoints: 500,
    bgUrl: room450WinterBg,
    icon: '❄️',
    roomTitle: '雪松木屋壁爐吧台',
    roomScaleLabel: 'LV.9 冬雪度假木屋',
    furnitureName: '聖誕松樹壁爐 & 熱可可吧台',
    lightingName: '白雪森林雪景窗 & 彩燈',
    description: '突破 450 分！巨大景觀窗外是銀白雪松林，屋內有閃閃發亮的聖誕樹與冒煙的熱可可鍋！',
    unlockedDecorItems: [
      { emoji: '🎄', label: '節慶聖誕樹', quote: '樹下堆滿了送給認真學習同學的禮物盒！' },
      { emoji: '☕', label: '棉花糖熱可可', quote: '冬夜裡最幸福的暖心甜蜜飲品！' },
    ],
  },
  {
    level: 10,
    minPoints: 500,
    nextPoints: 550,
    bgUrl: room500WizardBg,
    icon: '🔮',
    roomTitle: '紫晶法師煉金書齋',
    roomScaleLabel: 'LV.10 秘法魔法大套房',
    furnitureName: '紫絨天幕床 & 發光煉金魔藥桌',
    lightingName: '彩繪玻璃窗 & 紫水晶螢光',
    description: '突破 500 分！架上陳列著發光紫晶簇與星象古地圖，展現神奇的星露谷魔法學識！',
    unlockedDecorItems: [
      { emoji: '🧪', label: '彩虹魔法藥水', quote: '冒泡的粉紫魔藥能激發無限創造靈感！' },
      { emoji: '💎', label: '紫晶能量簇', quote: '來自礦井深處的完美紫水晶原礦！' },
    ],
  },
  {
    level: 11,
    minPoints: 550,
    nextPoints: 600,
    bgUrl: room550MushroomBg,
    icon: '🍄',
    roomTitle: '螢火夜光蘑菇樹洞',
    roomScaleLabel: 'LV.11 精靈生態秘境居',
    furnitureName: '室內錦鯉小溪 & 苔蘚圓床',
    lightingName: '夜光藍紫蘑菇生物微光',
    description: '突破 550 分！奇幻的巨型古樹洞居所，清澈錦鯉小溪直接流過床前，螢火蟲在室內起舞！',
    unlockedDecorItems: [
      { emoji: '🍄', label: '夜光藍蘑菇', quote: '像小夜燈般溫柔發光的森林精靈蘑菇！' },
      { emoji: '🐟', label: '室內錦鯉溪', quote: '踩著踏腳石就能欣賞悠游的彩色錦鯉！' },
    ],
  },
  {
    level: 12,
    minPoints: 600,
    nextPoints: 650,
    bgUrl: room600SakuraBg,
    icon: '🌸',
    roomTitle: '和風櫻花榻榻米茶室',
    roomScaleLabel: 'LV.12 日式庭園別院',
    furnitureName: '櫻花和室被褥 & 抹茶糰子桌',
    lightingName: '和紙提燈與櫻吹雪庭院光',
    description: '突破 600 分！開放式障子門面向落英繽紛的櫻花錦鯉庭園，清幽又浪漫！',
    unlockedDecorItems: [
      { emoji: '🍵', label: '宇治抹茶茶道組', quote: '搭配三色花見糰子，享受寧靜和風時光！' },
      { emoji: '🏮', label: '暖光和紙燈籠', quote: '木框和紙映照出最柔和的暖黃燈影！' },
    ],
  },
  {
    level: 13,
    minPoints: 650,
    nextPoints: 700,
    bgUrl: room650LavenderBg,
    icon: '🪻',
    roomTitle: '薰衣草香氛法式陽台',
    roomScaleLabel: 'LV.13 南法莊園套房',
    furnitureName: '紫羅蘭帳幔床 & 復古梳妝台',
    lightingName: '推開陽台直望薰衣草田晴光',
    description: '突破 650 分！木樑懸掛成束乾燥薰衣草，推開落地法式陽台就是紫色花海與蜂園！',
    unlockedDecorItems: [
      { emoji: '🪻', label: '薰衣草花束', quote: '滿室散發令人徹底放鬆的淡雅薰衣草香！' },
      { emoji: '🍯', label: '花蜜玻璃罐', quote: '梳妝台上擺著剛從莊園採收的純正花蜜！' },
    ],
  },
  {
    level: 14,
    minPoints: 700,
    nextPoints: 750,
    bgUrl: room700ObservatoryBg,
    icon: '🌙',
    roomTitle: '星月天窗觀星閣樓',
    roomScaleLabel: 'LV.14 星空天文套房',
    furnitureName: '大型黃銅望遠鏡 & 星座掛毯',
    lightingName: '玻璃天窗銀河新月與星形吊燈',
    description: '突破 700 分！弧形玻璃屋頂直接框住整片繁星夜空與弦月，配有專業黃銅天文望遠鏡！',
    unlockedDecorItems: [
      { emoji: '🔭', label: '黃銅望遠鏡', quote: '今夜能清晰看見木星衛星與銀河星雲！' },
      { emoji: '🌟', label: '發光星星吊燈', quote: '點點串燈與金色星燈讓整間閣樓閃閃動人！' },
    ],
  },
  {
    level: 15,
    minPoints: 750,
    nextPoints: 800,
    bgUrl: room750TropicalBg,
    icon: '🏝️',
    roomTitle: '薑島海風竹編度假屋',
    roomScaleLabel: 'LV.15 熱帶濱海別墅',
    furnitureName: '彩虹吊床 & 衝浪板 & 鳳梨吧',
    lightingName: '白紗海風推門直通椰林沙灘',
    description: '突破 750 分！推開飄逸白紗簾就能直接踏上薑島白沙灘，躺在彩虹吊床上吃現切鳳梨！',
    unlockedDecorItems: [
      { emoji: '🍍', label: '熱帶水果拼盤', quote: '新鮮金鑽鳳梨與椰子特調就在手邊！' },
      { emoji: '🏄', label: '彩繪衝浪板', quote: '隨時準備乘著碧綠海浪出發去冒險！' },
    ],
  },
  {
    level: 16,
    minPoints: 800,
    nextPoints: 850,
    bgUrl: room800AquariumBg,
    icon: '🐠',
    roomTitle: '珊瑚礁海底水族套房',
    roomScaleLabel: 'LV.16 深海全景豪宅',
    furnitureName: '珍珠貝殼大床 & 巨型玻璃水族牆',
    lightingName: '蔚藍水波光影與夕陽海景陽台',
    description: '突破 800 分！整面牆化作夢幻珊瑚礁海底水族館，水母與尼莫魚群伴著夕陽陽台閃耀！',
    unlockedDecorItems: [
      { emoji: '🐚', label: '珍珠貝殼吊燈', quote: '發光的巨大珍珠貝殼營造浪漫海洋氣息！' },
      { emoji: '🪼', label: '夜光水母群', quote: '在巨大水族玻璃牆後方優雅漂浮發光！' },
    ],
  },
  {
    level: 17,
    minPoints: 850,
    nextPoints: 900,
    bgUrl: room850ClockworkBg,
    icon: '⚙️',
    roomTitle: '黃金機械天球儀書殿',
    roomScaleLabel: 'LV.17 雙層皇家圖書殿堂',
    furnitureName: '雙層螺旋樓梯 & 巨型天球儀',
    lightingName: '星盤彩繪玫瑰圓窗暖金光',
    description: '突破 850 分！氣派的雙層紅木旋轉梯圖書館，中央矗立著運轉不息的黃金齒輪天球儀！',
    unlockedDecorItems: [
      { emoji: '⚙️', label: '黃銅天球儀', quote: '精密齒輪帶動九大行星模型緩緩運轉！' },
      { emoji: '🕰️', label: '雕花落地鐘', quote: '每一小時都會響起悠揚的金色報時鐘聲！' },
    ],
  },
  {
    level: 18,
    minPoints: 900,
    nextPoints: 950,
    bgUrl: room900RoyalBg,
    icon: '👑',
    roomTitle: '皇家金輝紅絨宮廷廳',
    roomScaleLabel: 'LV.18 金鑲白玉貴族大宅',
    furnitureName: '金盃榮譽展示櫃 & 金穗絲絨床',
    lightingName: '水晶垂墜吊燈與大理石壁爐',
    description: '突破 900 分！鑲金線條的大理石地磚與高大榮譽金盃展示櫃，盡顯皇家貴族風範！',
    unlockedDecorItems: [
      { emoji: '🏆', label: '榮譽金盃櫃', quote: '裡面陳列著代表每一分努力的璀璨獎盃！' },
      { emoji: '👑', label: '紅絨金邊王床', quote: '華麗垂墜的宮廷絨簾與金色雕花床柱！' },
    ],
  },
  {
    level: 19,
    minPoints: 950,
    nextPoints: 1000,
    bgUrl: room950SkySuiteBg,
    icon: '☁️',
    roomTitle: '雲端白玉彩虹天空苑',
    roomScaleLabel: 'LV.19 浮空雲海花園宮殿',
    furnitureName: '室內岩泉瀑布 & 黃金楊桃樹',
    lightingName: '雲海晴空彩虹穿過白玉拱廊',
    description: '突破 950 分！整座白玉迴廊漂浮於蓬鬆雲海之上，室內瀑布潺潺流淌，彩虹就在陽台邊！',
    unlockedDecorItems: [
      { emoji: '🌈', label: '雲端彩虹拱廊', quote: '伸手彷彿就能觸摸到雲海與七彩長虹！' },
      { emoji: '⭐', label: '金盆楊桃樹', quote: '白玉花盆中結滿晶瑩閃亮的黃金楊桃！' },
    ],
  },
  {
    level: 20,
    minPoints: 1000,
    nextPoints: 1050,
    bgUrl: room1000AuroraBg,
    icon: '✨',
    roomTitle: '星露極光水晶大廳',
    roomScaleLabel: 'LV.20 千分傳奇玻璃宮殿',
    furnitureName: '星鑽噴泉中心壇 & 翡翠絨沙發',
    lightingName: '整片翡翠極光穹頂玻璃大廳',
    description: '達成 1000 分傳奇！高聳的水晶拱頂綻放夢幻極光，七彩菱鏡噴泉在大廳中央閃閃發光！',
    unlockedDecorItems: [
      { emoji: '⛲', label: '水晶許願噴泉', quote: '噴泉池畔簇擁著閃閃發光的水藍水晶礦！' },
      { emoji: '🌌', label: '極光玻璃穹頂', quote: '抬頭就能盡情欣賞綠紫交織的極光盛宴！' },
    ],
  },
  {
    level: 21,
    minPoints: 1050,
    nextPoints: 1100,
    bgUrl: room1050JadeBg,
    icon: '🏯',
    roomTitle: '翡翠金龍瀑布別宮',
    roomScaleLabel: 'LV.21 國寶翡翠宮殿套房',
    furnitureName: '雙層室內蓮花瀑布 & 翡翠金床',
    lightingName: '雕龍石拱門遠眺雲霧瀑布山谷',
    description: '突破 1050 分！金龍盤繞的翡翠玉柱、室內飛瀑蓮花池與金葉盆景，雍容華貴無與倫比！',
    unlockedDecorItems: [
      { emoji: '🪷', label: '室內蓮花飛瀑', quote: '清涼瀑布直接傾瀉入盛開粉紅蓮花的玉池！' },
      { emoji: '🐉', label: '金龍翡翠柱', quote: '栩栩如生的黃金祥龍守護著整座宮室！' },
    ],
  },
  {
    level: 22,
    minPoints: 1100,
    nextPoints: 1150,
    bgUrl: room1100CelestialBg,
    icon: '🪽',
    roomTitle: '天界金羽彩虹聖殿',
    roomScaleLabel: 'LV.22 天空浮空聖殿大廳',
    furnitureName: '彩虹玻璃天橋 & 黃金豎琴王座',
    lightingName: '金羽拱門撒落璀璨金色神光',
    description: '突破 1100 分！金色天使之翼拱門下是七彩玻璃浮空天橋、黃金大豎琴與天使羽翼王座！',
    unlockedDecorItems: [
      { emoji: '🪕', label: '黃金天界豎琴', quote: '輕撥琴弦便會回盪宛如天籟的金色和弦！' },
      { emoji: '🌈', label: '稜鏡浮空走廊', quote: '踩在彩虹玻璃走廊上俯瞰金色雲海城市！' },
    ],
  },
  {
    level: 23,
    minPoints: 1150,
    nextPoints: 1200,
    bgUrl: room1150GalaxyBg,
    icon: '🌌',
    roomTitle: '星辰銀河星環皇冠廳',
    roomScaleLabel: 'LV.23 宇宙星雲觀星殿',
    furnitureName: '全息浮空星系球 & 紫晶吊燈',
    lightingName: '巨型土星光環與紫金銀河窗景',
    description: '突破 1150 分！巨型全景窗外旋轉著壯麗銀河與光環行星，大廳正中懸浮著星系投影晶球！',
    unlockedDecorItems: [
      { emoji: '🪐', label: '全息星系晶球', quote: '指尖輕觸就能近距離觀察整條銀河與星座！' },
      { emoji: '💜', label: '紫晶宮廷吊燈', quote: '在星光燦爛的穹頂下散發高貴紫金輝光！' },
    ],
  },
  {
    level: 24,
    minPoints: 1200,
    nextPoints: 1250,
    bgUrl: room1200ImperialBg,
    icon: '🏛️',
    roomTitle: '萬國朝聖黃金太陽廳',
    roomScaleLabel: 'LV.24 帝國凱旋黃金大廳',
    furnitureName: '雙側紅毯大理石梯 & 金鳳凰雕像',
    lightingName: '巨型太陽彩繪圓窗與夕陽金輝',
    description: '突破 1200 分！雙座凱旋旋轉大理石階梯、八尊金鳳凰守衛與豪華皇家宴會長桌氣勢磅礴！',
    unlockedDecorItems: [
      { emoji: '🦅', label: '黃金鳳凰雕像', quote: '象徵不屈努力與閃耀榮耀的純金鳳凰衛士！' },
      { emoji: '🕯️', label: '凱旋黃金宴桌', quote: '可邀請全班好友一同舉辦最盛大的慶功宴！' },
    ],
  },
  {
    level: 25,
    minPoints: 1250,
    nextPoints: null,
    bgUrl: room1250CosmosBg,
    icon: '💎',
    roomTitle: '永恆神話宇宙星辰殿',
    roomScaleLabel: 'LV.25 至高宇宙水晶宮殿',
    furnitureName: '浮空星之果實台 & 晶鑽大鋼琴',
    lightingName: '七彩極光宇宙瀑布 mirror 鏡面殿',
    description: '達成 1250 分至高宇宙傳奇！七彩銀河與水晶雙瀑布環繞整座晶鑽宮殿，25 間夢想房間全解鎖！',
    unlockedDecorItems: [
      { emoji: '🌟', label: '傳說星之果實', quote: '懸浮在殿堂中央閃耀七彩光芒的最高榮耀！' },
      { emoji: '🎹', label: '星鑽水晶鋼琴', quote: '將整片銀河的星光化為琴音的夢幻鋼琴！' },
      { emoji: '⛲', label: '星辰雙瀑布', quote: '從穹頂傾瀉而下的發光星塵瀑布映照鏡面地板！' },
    ],
  },
];

export const DUSTY_ROOM_ARTWORK: RoomArtworkTier = {
  level: -1,
  minPoints: -999,
  nextPoints: 0,
  bgUrl: roomWitheredBg,
  icon: '🕸️',
  roomTitle: '雨夜待整理小閣樓',
  roomScaleLabel: '待整理閣樓 (<0分)',
  furnitureName: '舊木單人床 & 未點燃石壁爐',
  lightingName: '雨夜微弱油燈光',
  description: '目前處於負分雨夜期，努力加分回到 0 分以上就能搬進陽光溫暖的原木新房間！',
  unlockedDecorItems: [
    { emoji: '🕯️', label: '舊煤油燈', quote: '雖然外面在下雨，只要加分就能立刻點亮大壁爐！' },
  ],
  isDusty: true,
};

export function getStudentRoomArtwork(points: number): RoomArtworkTier {
  if (points < 0) {
    return DUSTY_ROOM_ARTWORK;
  }

  for (let i = ROOM_BACKGROUND_MILESTONES.length - 1; i >= 0; i--) {
    if (points >= ROOM_BACKGROUND_MILESTONES[i].minPoints) {
      return ROOM_BACKGROUND_MILESTONES[i];
    }
  }

  return ROOM_BACKGROUND_MILESTONES[0];
}
