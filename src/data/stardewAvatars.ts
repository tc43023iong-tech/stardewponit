export type StardewAvatarCategory =
  | 'animals'
  | 'fish'
  | 'villagers'
  | 'special'
  | 'treasures'
  | 'cooking'
  | 'ingredients'
  | 'crops'
  | 'foraging'
  | 'artifacts'
  | 'minerals'
  | 'animal_products'
  | 'artisan'
  | 'resources'
  | 'furniture_seats'
  | 'furniture_tables'
  | 'furniture_beds'
  | 'decor_rugs'
  | 'decor_lighting'
  | 'decor_plants'
  | 'decor_wall'
  | 'furniture_special'
  | 'decor_floors'
  | 'clothes_hats'
  | 'clothes_shoes'
  | 'rings';

export interface StardewAvatarItem {
  id: string;
  name: string;
  category: StardewAvatarCategory;
  url?: string;
  sprite?: string;
  role?: string;
}

export const STARDEW_AVATAR_CATEGORIES: Array<{
  id: 'all' | StardewAvatarCategory;
  label: string;
}> = [
  { id: 'all', label: '🌟 全部' },
  { id: 'animals', label: '🐾 農場動物' },
  { id: 'fish', label: '🐟 魚類圖鑑' },
  { id: 'villagers', label: '🏡 小鎮村民' },
  { id: 'special', label: '✨ 特殊角色' },
  { id: 'treasures', label: '💎 傳奇珍寶' },
  { id: 'cooking', label: '🍳 烹飪菜品' },
  { id: 'ingredients', label: '🥬 烹飪原料' },
  { id: 'crops', label: '🌾 作物與花' },
  { id: 'foraging', label: '🍄 採集與海灘' },
  { id: 'artifacts', label: '🏺 古物典藏' },
  { id: 'minerals', label: '💠 礦物與晶球' },
  { id: 'animal_products', label: '🥛 動物產品' },
  { id: 'artisan', label: '🍷 加工品' },
  { id: 'resources', label: '🪵 資源與雜項' },
  { id: 'furniture_seats', label: '🪑 傢俬座椅' },
  { id: 'furniture_tables', label: '🪵 傢俬桌子' },
  { id: 'furniture_beds', label: '🛏️ 櫃床魚缸' },
  { id: 'decor_rugs', label: '🧶 裝飾地毯' },
  { id: 'decor_lighting', label: '🪔 燈與壁爐' },
  { id: 'decor_plants', label: '🪴 裝飾植物' },
  { id: 'decor_wall', label: '🖼️ 畫作窗飾' },
  { id: 'furniture_special', label: '📺 電視與擺設' },
  { id: 'decor_floors', label: '🧱 地板壁紙' },
  { id: 'clothes_hats', label: '👒 帽子頭飾' },
  { id: 'clothes_shoes', label: '🥾 鞋靴' },
  { id: 'rings', label: '💍 飾品戒指' },
];

// Curated 790 Stardew Valley Avatar Roster
export const STARDEW_AVATARS: StardewAvatarItem[] = [
  {
    "id": "sdv_white_chicken",
    "name": "純白小母雞 (White Chicken)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/22/White_Chicken.png",
    "sprite": "chicken",
    "role": "農場咕咕雞"
  },
  {
    "id": "sdv_brown_chicken",
    "name": "棕羽母雞 (Brown Chicken)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Brown_Chicken.png",
    "sprite": "chicken",
    "role": "優質大雞蛋"
  },
  {
    "id": "sdv_blue_chicken",
    "name": "夢幻藍雞 (Blue Chicken)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/61/Blue_Chicken.png",
    "sprite": "blue_chicken",
    "role": "謝恩摯愛品種"
  },
  {
    "id": "sdv_void_chicken",
    "name": "虛空幽靈雞 (Void Chicken)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/67/Void_Chicken.png",
    "sprite": "blue_chicken",
    "role": "巫師神秘寵物"
  },
  {
    "id": "sdv_golden_chicken",
    "name": "極品黃金雞 (Golden Chicken)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3c/Golden_Chicken.png",
    "sprite": "golden_chicken",
    "role": "百分之百完美傳奇"
  },
  {
    "id": "sdv_duck",
    "name": "綠頭野鴨 (Duck)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/38/Duck.png",
    "sprite": "duck",
    "role": "水塘游泳萌鴨"
  },
  {
    "id": "sdv_rabbit_farm",
    "name": "幸運雪兔 (Rabbit)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Rabbit.png",
    "sprite": "rabbit",
    "role": "掉落兔子的腳"
  },
  {
    "id": "sdv_white_cow",
    "name": "純潔白牛 (White Cow)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/36/White_Cow.png",
    "sprite": "cow",
    "role": "濃醇鮮牛奶"
  },
  {
    "id": "sdv_brown_cow",
    "name": "黃金棕牛 (Brown Cow)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3e/Brown_Cow.png",
    "sprite": "cow",
    "role": "優質起司"
  },
  {
    "id": "sdv_goat",
    "name": "山羊 (Goat)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Goat.png",
    "sprite": "cow",
    "role": "高山山羊奶"
  },
  {
    "id": "sdv_sheep",
    "name": "蓬鬆綿羊 (Sheep)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Sheep.png",
    "sprite": "cow",
    "role": "頂級羊毛"
  },
  {
    "id": "sdv_pig",
    "name": "松露萌豬 (Pig)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/30/Pig.png",
    "sprite": "pig",
    "role": "拱出珍貴松露"
  },
  {
    "id": "sdv_dinosaur",
    "name": "遠古恐龍 (Dinosaur)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/89/Dinosaur.png",
    "sprite": "dinosaur",
    "role": "史前霸王龍"
  },
  {
    "id": "sdv_ostrich",
    "name": "草原鴕鳥 (Ostrich)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Ostrich.png",
    "sprite": "chicken",
    "role": "巨無霸鴕鳥蛋"
  },
  {
    "id": "sdv_horse",
    "name": "忠心駿馬 (Horse)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Horse.png",
    "sprite": "cow",
    "role": "奔馳坐騎"
  },
  {
    "id": "sdv_cat",
    "name": "慵懶三花貓 (Cat)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/29/Cat.gif",
    "sprite": "cat",
    "role": "農場撒嬌寵物"
  },
  {
    "id": "sdv_dog",
    "name": "忠實柴犬 (Dog)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/99/Dog.gif",
    "sprite": "dog",
    "role": "看門搖尾巴"
  },
  {
    "id": "sdv_turtle",
    "name": "海濱烏龜 (Turtle)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Turtle.png",
    "sprite": "rabbit",
    "role": "長壽守護"
  },
  {
    "id": "sdv_crow",
    "name": "頑皮烏鴉 (Crow)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fa/Crow.png",
    "sprite": "crow",
    "role": "稻草人死對頭"
  },
  {
    "id": "sdv_butterfly",
    "name": "彩色彩蝶 (Butterfly)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6c/ButterflyAnimated.gif",
    "sprite": "chicken",
    "role": "花間起舞"
  },
  {
    "id": "sdv_abigail",
    "name": "阿比蓋爾 (Abigail)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/88/Abigail.png",
    "sprite": "junimo",
    "role": "紫髮冒險少女"
  },
  {
    "id": "sdv_sebastian",
    "name": "塞巴斯蒂安 (Sebastian)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Sebastian.png",
    "sprite": "junimo",
    "role": "重機程式工程師"
  },
  {
    "id": "sdv_haley",
    "name": "海莉 (Haley)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Haley.png",
    "sprite": "junimo",
    "role": "時尚攝影師"
  },
  {
    "id": "sdv_penny",
    "name": "佩妮 (Penny)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ab/Penny.png",
    "sprite": "junimo",
    "role": "溫柔小鎮教師"
  },
  {
    "id": "sdv_leah",
    "name": "莉亞 (Leah)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Leah.png",
    "sprite": "junimo",
    "role": "森林雕塑藝術家"
  },
  {
    "id": "sdv_maru",
    "name": "瑪魯 (Maru)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f8/Maru.png",
    "sprite": "junimo",
    "role": "天文發明家"
  },
  {
    "id": "sdv_emily",
    "name": "艾米麗 (Emily)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/28/Emily.png",
    "sprite": "junimo",
    "role": "心靈手巧裁縫"
  },
  {
    "id": "sdv_alex",
    "name": "亞歷克斯 (Alex)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Alex.png",
    "sprite": "junimo",
    "role": "陽光美式橄欖球員"
  },
  {
    "id": "sdv_elliott",
    "name": "艾利歐特 (Elliott)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bd/Elliott.png",
    "sprite": "junimo",
    "role": "海濱浪漫詩人"
  },
  {
    "id": "sdv_harvey",
    "name": "哈維 (Harvey)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/95/Harvey.png",
    "sprite": "junimo",
    "role": "熱心仁慈鎮醫"
  },
  {
    "id": "sdv_sam",
    "name": "山姆 (Sam)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Sam.png",
    "sprite": "junimo",
    "role": "滑板吉他手"
  },
  {
    "id": "sdv_shane",
    "name": "謝恩 (Shane)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8b/Shane.png",
    "sprite": "junimo",
    "role": "藍雞繁育員"
  },
  {
    "id": "sdv_krobus",
    "name": "科羅布斯 (Krobus)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/71/Krobus.png",
    "sprite": "junimo",
    "role": "下水道暗影居民"
  },
  {
    "id": "sdv_linus",
    "name": "萊納斯 (Linus)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Linus.png",
    "sprite": "junimo",
    "role": "野外自然哲學家"
  },
  {
    "id": "sdv_willy",
    "name": "威利 (Willy)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/82/Willy.png",
    "sprite": "junimo",
    "role": "傳奇海釣高手"
  },
  {
    "id": "sdv_robin",
    "name": "羅賓 (Robin)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Robin.png",
    "sprite": "junimo",
    "role": "首席建築大師"
  },
  {
    "id": "sdv_marnie",
    "name": "瑪妮 (Marnie)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Marnie.png",
    "sprite": "junimo",
    "role": "動物牧場女主人"
  },
  {
    "id": "sdv_gus",
    "name": "格斯 (Gus)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Gus.png",
    "sprite": "junimo",
    "role": "星之果實酒吧主廚"
  },
  {
    "id": "sdv_wizard",
    "name": "法師 (Wizard)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c7/Wizard.png",
    "sprite": "junimo",
    "role": "奧術高塔秘法師"
  },
  {
    "id": "sdv_caroline",
    "name": "卡洛琳 (Caroline)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Caroline.png",
    "sprite": "junimo",
    "role": "茶室園藝愛好者"
  },
  {
    "id": "sdv_pierre",
    "name": "皮埃爾 (Pierre)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Pierre.png",
    "sprite": "junimo",
    "role": "良心雜貨店老闆"
  },
  {
    "id": "sdv_demetrius",
    "name": "德米特里厄斯 (Demetrius)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Demetrius.png",
    "sprite": "junimo",
    "role": "山谷生態學家"
  },
  {
    "id": "sdv_clint",
    "name": "克林特 (Clint)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Clint.png",
    "sprite": "junimo",
    "role": "鐵匠敲打大師"
  },
  {
    "id": "sdv_evelyn",
    "name": "艾芙琳奶奶 (Evelyn)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8e/Evelyn.png",
    "sprite": "junimo",
    "role": "烤餅乾奶奶"
  },
  {
    "id": "sdv_george",
    "name": "喬治爺爺 (George)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/George.png",
    "sprite": "junimo",
    "role": "看電視老爺爺"
  },
  {
    "id": "sdv_jas",
    "name": "賈斯 (Jas)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/55/Jas.png",
    "sprite": "junimo",
    "role": "天真跳繩小女孩"
  },
  {
    "id": "sdv_vincent",
    "name": "文森特 (Vincent)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Vincent.png",
    "sprite": "junimo",
    "role": "捉昆蟲小男孩"
  },
  {
    "id": "sdv_leo",
    "name": "里奧 (Leo)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1d/Leo.png",
    "sprite": "junimo",
    "role": "薑島鸚鵡之友"
  },
  {
    "id": "sdv_pam",
    "name": "潘姆 (Pam)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/da/Pam.png",
    "sprite": "junimo",
    "role": "沙漠校車司機"
  },
  {
    "id": "sdv_kent",
    "name": "肯特 (Kent)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/99/Kent.png",
    "sprite": "junimo",
    "role": "英勇退伍軍人"
  },
  {
    "id": "sdv_jodi",
    "name": "喬迪 (Jodi)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/41/Jodi.png",
    "sprite": "junimo",
    "role": "勤勞模範母親"
  },
  {
    "id": "sdv_sandy",
    "name": "桑迪 (Sandy)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Sandy.png",
    "sprite": "junimo",
    "role": "綠洲綠洲商店闆娘"
  },
  {
    "id": "sdv_marlon",
    "name": "馬龍 (Marlon)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/37/Marlon.png",
    "sprite": "junimo",
    "role": "冒險者公會會長"
  },
  {
    "id": "sdv_gil",
    "name": "吉爾 (Gil)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/64/Gil.png",
    "sprite": "junimo",
    "role": "搖椅上頒獎老人"
  },
  {
    "id": "sdv_gunther",
    "name": "岡瑟 (Gunther)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Gunther.png",
    "sprite": "junimo",
    "role": "博物館珍寶鑑定"
  },
  {
    "id": "sdv_mr_qi",
    "name": "齊先生 (Mr. Qi)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b4/Mr._Qi.png",
    "sprite": "junimo",
    "role": "神秘賭場掌控者"
  },
  {
    "id": "sdv_professor_snail",
    "name": "斯奈爾教授 (Prof. Snail)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d4/Professor_Snail.png",
    "sprite": "junimo",
    "role": "化石研究學者"
  },
  {
    "id": "sdv_birdie",
    "name": "伯蒂婆婆 (Birdie)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Birdie.png",
    "sprite": "junimo",
    "role": "海邊守望老奶奶"
  },
  {
    "id": "sdv_grandpa",
    "name": "親切爺爺 (Grandpa)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/88/Grandpa.png",
    "sprite": "junimo",
    "role": "農場傳承恩師"
  },
  {
    "id": "sdv_dwarf",
    "name": "矮人 (Dwarf)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Dwarf.png",
    "sprite": "junimo",
    "role": "地底炸彈商人"
  },
  {
    "id": "sdv_morris",
    "name": "莫里斯 (Morris)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/90/Morris.png",
    "sprite": "junimo",
    "role": "喬家超市經理"
  },
  {
    "id": "sdv_governor",
    "name": "州長總督 (Governor)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Governor.png",
    "sprite": "junimo",
    "role": "夏日夏威夷宴會評審"
  },
  {
    "id": "sdv_bouncer",
    "name": "墨鏡保鏢 (Bouncer)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f5/Bouncer.png",
    "sprite": "junimo",
    "role": "俱樂部守門保鏢"
  },
  {
    "id": "sdv_henchman",
    "name": "女巫心腹 (Henchman)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/21/Henchman_Portrait_1.png",
    "sprite": "junimo",
    "role": "哥布林守門人"
  },
  {
    "id": "sdv_fizz",
    "name": "特使菲茲 (Fizz)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a3/Fizz_00.png",
    "sprite": "junimo",
    "role": "齊先生高級特工"
  },
  {
    "id": "sdv_mayor_portrait",
    "name": "劉易斯鎮長 (Lewis)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2b/Lewis.png",
    "sprite": "junimo",
    "role": "鵜鶘鎮長老官"
  },
  {
    "id": "sdv_legend_fish",
    "name": "春日傳奇魚王 (Legend)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/10/Legend.png",
    "sprite": "chicken",
    "role": "雨天山林湖之王"
  },
  {
    "id": "sdv_crimsonfish",
    "name": "夏日緋紅魚 (Crimsonfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/dc/Crimsonfish.png",
    "sprite": "chicken",
    "role": "東碼頭海中巨怪"
  },
  {
    "id": "sdv_angler",
    "name": "秋日鮟鱇魚 (Angler)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bf/Angler.png",
    "sprite": "chicken",
    "role": "木橋小瀑布之王"
  },
  {
    "id": "sdv_glacierfish",
    "name": "冬日冰川魚 (Glacierfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Glacierfish.png",
    "sprite": "chicken",
    "role": "箭頭島極寒霸主"
  },
  {
    "id": "sdv_mutant_carp",
    "name": "變種巨鯉魚 (Mutant Carp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cb/Mutant_Carp.png",
    "sprite": "chicken",
    "role": "下水道綠光魚"
  },
  {
    "id": "sdv_lava_eel",
    "name": "熔岩鰻魚 (Lava Eel)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Lava_Eel.png",
    "sprite": "chicken",
    "role": "礦坑100層紅光鰻"
  },
  {
    "id": "sdv_void_salmon",
    "name": "虛空鮭魚 (Void Salmon)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Void_Salmon.png",
    "sprite": "chicken",
    "role": "女巫沼澤神秘鮭魚"
  },
  {
    "id": "sdv_midnight_carp",
    "name": "午夜鯉魚 (Midnight Carp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/33/Midnight_Carp.png",
    "sprite": "chicken",
    "role": "深夜湖泊發光鯉"
  },
  {
    "id": "sdv_blobfish",
    "name": "水滴魚 (Blobfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7f/Blobfish.png",
    "sprite": "rabbit",
    "role": "深海夜市呆萌魚"
  },
  {
    "id": "sdv_spook_fish",
    "name": "幽靈魚 (Spook Fish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8c/Spook_Fish.png",
    "sprite": "chicken",
    "role": "深海潛水艇發光怪"
  },
  {
    "id": "sdv_stingray",
    "name": "刺魟魚 (Stingray)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Stingray.png",
    "sprite": "chicken",
    "role": "海盜洞穴珍稀魟"
  },
  {
    "id": "sdv_octopus",
    "name": "巨型章魚 (Octopus)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5a/Octopus.png",
    "sprite": "chicken",
    "role": "難度100超難釣章魚"
  },
  {
    "id": "sdv_rainbow_trout",
    "name": "彩虹鱒魚 (Rainbow Trout)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/14/Rainbow_Trout.png",
    "sprite": "chicken",
    "role": "有機率產出五彩碎片"
  },
  {
    "id": "sdv_sturgeon",
    "name": "傳奇鱘魚 (Sturgeon)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/42/Sturgeon.png",
    "sprite": "chicken",
    "role": "魚子醬珍貴魚種"
  },
  {
    "id": "sdv_lobster",
    "name": "鮮紅龍蝦 (Lobster)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Lobster.png",
    "sprite": "chicken",
    "role": "蟹籠頂級美味"
  },
  {
    "id": "sdv_crab",
    "name": "海濱螃蟹 (Crab)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/63/Crab.png",
    "sprite": "rabbit",
    "role": "製作美味蟹餅"
  },
  {
    "id": "sdv_stardrop",
    "name": "星之果實 (Stardrop)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Stardrop.png",
    "sprite": "star_full",
    "role": "最大體力增加"
  },
  {
    "id": "sdv_prismatic_shard",
    "name": "五彩碎片 (Prismatic Shard)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/56/Prismatic_Shard.png",
    "sprite": "gem_diamond",
    "role": "彩虹耀眼神石"
  },
  {
    "id": "sdv_golden_pumpkin",
    "name": "百萬黃金南瓜 (Golden Pumpkin)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Golden_Pumpkin.png",
    "sprite": "coin_gold",
    "role": "萬靈節迷宮終極大獎"
  },
  {
    "id": "sdv_pearl",
    "name": "深海夜市珍珠 (Pearl)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pearl.png",
    "sprite": "gem_diamond",
    "role": "美人魚的餽贈"
  },
  {
    "id": "sdv_rabbits_foot",
    "name": "好運兔子的腳 (Rabbit's Foot)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ca/Rabbit%27s_Foot.png",
    "sprite": "rabbit",
    "role": "全鎮最愛好運禮物"
  },
  {
    "id": "sdv_truffle",
    "name": "極品黑松露 (Truffle)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Truffle.png",
    "sprite": "pig",
    "role": "美味松露油"
  },
  {
    "id": "sdv_ancient_fruit",
    "name": "遠古水果 (Ancient Fruit)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Ancient_Fruit.png",
    "sprite": "sunflower",
    "role": "上古傳奇瓊漿"
  },
  {
    "id": "sdv_starfruit",
    "name": "奢華楊桃 (Starfruit)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/db/Starfruit.png",
    "sprite": "star_full",
    "role": "頂級釀酒首選"
  },
  {
    "id": "sdv_sweet_gem_berry",
    "name": "寶石甜莓 (Sweet Gem Berry)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/88/Sweet_Gem_Berry.png",
    "sprite": "sunflower",
    "role": "老老坎諾利最愛"
  },
  {
    "id": "sdv_strawberry",
    "name": "甜美草莓 (Strawberry)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6d/Strawberry.png",
    "sprite": "sunflower",
    "role": "復活節最熱門作物"
  },
  {
    "id": "sdv_pumpkin",
    "name": "秋季巨型南瓜 (Pumpkin)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/64/Pumpkin.png",
    "sprite": "sunflower",
    "role": "農場巨大作物"
  },
  {
    "id": "sdv_hot_pepper",
    "name": "火紅辣椒 (Hot Pepper)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Hot_Pepper.png",
    "sprite": "sunflower",
    "role": "鎮長最愛熱辣蔬菜"
  },
  {
    "id": "sdv_blueberry",
    "name": "飽滿藍莓 (Blueberry)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Blueberry.png",
    "sprite": "sunflower",
    "role": "夏日連續豐收之王"
  },
  {
    "id": "sdv_cauliflower",
    "name": "巨大甘藍花 (Cauliflower)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Cauliflower.png",
    "sprite": "sunflower",
    "role": "春日巨大農產"
  },
  {
    "id": "sdv_fairy_rose",
    "name": "仙女玫瑰 (Fairy Rose)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Fairy_Rose.png",
    "sprite": "sunflower",
    "role": "釀出仙女蜂蜜"
  },
  {
    "id": "sdv_blue_jazz",
    "name": "藍爵士花 (Blue Jazz)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Blue_Jazz.png",
    "sprite": "sunflower",
    "role": "幸運午餐原料"
  },
  {
    "id": "sdv_parsnip",
    "name": "嫩甜防風草 (Parsnip)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/db/Parsnip.png",
    "sprite": "sunflower",
    "role": "新手村春日根莖"
  },
  {
    "id": "sdv_sunflower",
    "name": "盛開向日葵 (Sunflower)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/81/Sunflower.png",
    "sprite": "sunflower",
    "role": "迎向陽光的金色花盤"
  },
  {
    "id": "sdv_melon",
    "name": "夏日大甜瓜 (Melon)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/19/Melon.png",
    "sprite": "melon",
    "role": "清涼解暑粉甜瓜"
  },
  {
    "id": "sdv_crystal_fruit",
    "name": "冬日水晶果 (Crystal Fruit)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/16/Crystal_Fruit.png",
    "sprite": "gem_diamond",
    "role": "冰霜凝結的甜美果實"
  },
  {
    "id": "sdv_pineapple",
    "name": "熱帶鳳梨 (Pineapple)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Pineapple.png",
    "sprite": "sunflower",
    "role": "海濱椰林陽光果香"
  },
  {
    "id": "sdv_void_egg",
    "name": "虛空之蛋 (Void Egg)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Void_Egg.png",
    "sprite": "gem_diamond",
    "role": "女巫午夜飛過"
  },
  {
    "id": "sdv_dino_egg",
    "name": "恐龍巨蛋 (Dinosaur Egg)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a1/Dinosaur_Egg.png",
    "sprite": "dinosaur",
    "role": "孵出史前小龍"
  },
  {
    "id": "sdv_iridium_bar",
    "name": "純銥金錠 (Iridium Bar)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f3/Iridium_Bar.png",
    "sprite": "gem_diamond",
    "role": "極品工具升級"
  },
  {
    "id": "sdv_gold_bar",
    "name": "黃金金錠 (Gold Bar)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Gold_Bar.png",
    "sprite": "coin_gold",
    "role": "閃亮農具鑄造"
  },
  {
    "id": "sdv_galaxy_sword",
    "name": "銀河之劍 (Galaxy Sword)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/30/Galaxy_Sword.png",
    "sprite": "gem_diamond",
    "role": "沙漠三石柱召喚神兵"
  },
  {
    "id": "sdv_infinity_blade",
    "name": "無限之刃 (Infinity Blade)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/eb/Infinity_Blade.png",
    "sprite": "gem_diamond",
    "role": "火山鍛造終極神劍"
  },
  {
    "id": "sdv_return_scepter",
    "name": "回歸權杖 (Return Scepter)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/38/Return_Scepter.png",
    "sprite": "coin_gold",
    "role": "瞬間傳送回農舍門口"
  },
  {
    "id": "sdv_horse_flute",
    "name": "召喚馬笛 (Horse Flute)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/13/Horse_Flute.png",
    "sprite": "coin_gold",
    "role": "吹響即刻召喚愛馬"
  },
  {
    "id": "sdv_magic_candy",
    "name": "魔法搖滾糖 (Magic Rock Candy)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Magic_Rock_Candy.png",
    "sprite": "star_full",
    "role": "全屬性頂級狂暴增益"
  },
  {
    "id": "sdv_lucky_lunch",
    "name": "幸運午餐 (Lucky Lunch)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5d/Lucky_Lunch.png",
    "sprite": "coin_gold",
    "role": "運氣大增爆金光"
  },
  {
    "id": "sdv_pink_cake",
    "name": "夢幻粉紅蛋糕 (Pink Cake)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/32/Pink_Cake.png",
    "sprite": "coin_gold",
    "role": "哈維與海莉的最愛甜點"
  },
  {
    "id": "sdv_spicy_eel",
    "name": "香辣烤鰻魚 (Spicy Eel)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Spicy_Eel.png",
    "sprite": "coin_gold",
    "role": "下礦跑速＋運氣神料理"
  },
  {
    "id": "sunflower",
    "name": "盛開向日葵 (Sunflower)",
    "category": "treasures",
    "sprite": "sunflower",
    "role": "夏日燦爛陽光"
  },
  {
    "id": "sdv_fried_egg",
    "name": "煎雞蛋 (Fried Egg)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Fried_Egg.png",
    "sprite": "coin_gold",
    "role": "金黃太陽蛋"
  },
  {
    "id": "sdv_omelet",
    "name": "煎蛋卷 (Omelet)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Omelet.png",
    "sprite": "coin_gold",
    "role": "鬆軟蓬鬆蛋卷"
  },
  {
    "id": "sdv_salad",
    "name": "沙拉 (Salad)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Salad.png",
    "sprite": "coin_gold",
    "role": "清新田園沙拉"
  },
  {
    "id": "sdv_cheese_cauliflower",
    "name": "乳酪花椰菜 (Cheese Cauliflower)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Cheese_Cauliflower.png",
    "sprite": "coin_gold",
    "role": "香濃起司烤菜"
  },
  {
    "id": "sdv_baked_fish",
    "name": "烤魚 (Baked Fish)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Baked_Fish.png",
    "sprite": "coin_gold",
    "role": "香草烤魚排"
  },
  {
    "id": "sdv_parsnip_soup",
    "name": "防風草湯 (Parsnip Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/76/Parsnip_Soup.png",
    "sprite": "coin_gold",
    "role": "暖心濃湯"
  },
  {
    "id": "sdv_vegetable_medley",
    "name": "蔬菜雜燴 (Vegetable Medley)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0a/Vegetable_Medley.png",
    "sprite": "coin_gold",
    "role": "營養滿分雜菜"
  },
  {
    "id": "sdv_complete_breakfast",
    "name": "完美早餐 (Complete Breakfast)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Complete_Breakfast.png",
    "sprite": "coin_gold",
    "role": "征服世界早餐"
  },
  {
    "id": "sdv_fried_calamari",
    "name": "炸魷魚 (Fried Calamari)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Fried_Calamari.png",
    "sprite": "coin_gold",
    "role": "金黃酥脆圈圈"
  },
  {
    "id": "sdv_strange_bun",
    "name": "奇怪的小麵包 (Strange Bun)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5e/Strange_Bun.png",
    "sprite": "coin_gold",
    "role": "神秘餡料麵包"
  },
  {
    "id": "sdv_lobster_bisque",
    "name": "龍蝦濃湯 (Lobster Bisque)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0a/Lobster_Bisque.png",
    "sprite": "coin_gold",
    "role": "威利秘傳濃湯"
  },
  {
    "id": "sdv_maple_bar",
    "name": "楓糖棒 (Maple Bar)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Maple_Bar.png",
    "sprite": "coin_gold",
    "role": "楓糖甜甜圈"
  },
  {
    "id": "sdv_crab_cakes",
    "name": "蟹黃糕 (Crab Cakes)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/70/Crab_Cakes.png",
    "sprite": "coin_gold",
    "role": "金棕蟹肉餅"
  },
  {
    "id": "sdv_shrimp_cocktail",
    "name": "蝦雞尾酒 (Shrimp Cocktail)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8e/Shrimp_Cocktail.png",
    "sprite": "coin_gold",
    "role": "豪華開胃蝦杯"
  },
  {
    "id": "sdv_ginger_ale",
    "name": "薑汁汽水 (Ginger Ale)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Ginger_Ale.png",
    "sprite": "coin_gold",
    "role": "舒胃氣泡飲"
  },
  {
    "id": "sdv_banana_pudding",
    "name": "香蕉布丁 (Banana Pudding)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/40/Banana_Pudding.png",
    "sprite": "coin_gold",
    "role": "熱帶奶油甜點"
  },
  {
    "id": "sdv_mango_sticky_rice",
    "name": "芒果糯米飯 (Mango Sticky Rice)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Mango_Sticky_Rice.png",
    "sprite": "coin_gold",
    "role": "椰香甜芒果飯"
  },
  {
    "id": "sdv_poi",
    "name": "夏威夷芋泥 (Poi)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Poi.png",
    "sprite": "coin_gold",
    "role": "薑島傳統芋泥"
  },
  {
    "id": "sdv_tropical_curry",
    "name": "熱帶咖喱 (Tropical Curry)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/32/Tropical_Curry.png",
    "sprite": "coin_gold",
    "role": "鳳梨碗異國咖喱"
  },
  {
    "id": "sdv_squid_ink_ravioli",
    "name": "墨汁意大利餃 (Squid Ink Ravioli)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/86/Squid_Ink_Ravioli.png",
    "sprite": "coin_gold",
    "role": "黑色神秘餃子"
  },
  {
    "id": "sdv_fried_mushroom",
    "name": "炒蘑菇 (Fried Mushroom)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4a/Fried_Mushroom.png",
    "sprite": "coin_gold",
    "role": "原生態野菇香"
  },
  {
    "id": "sdv_pizza",
    "name": "披薩 (Pizza)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pizza.png",
    "sprite": "coin_gold",
    "role": "全鎮最受歡迎"
  },
  {
    "id": "sdv_bean_hotpot",
    "name": "豆類火鍋 (Bean Hotpot)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/24/Bean_Hotpot.png",
    "sprite": "coin_gold",
    "role": "健康青豆鍋"
  },
  {
    "id": "sdv_glazed_yams",
    "name": "琉璃山藥 (Glazed Yams)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/30/Glazed_Yams.png",
    "sprite": "coin_gold",
    "role": "焦糖香甜山藥"
  },
  {
    "id": "sdv_carp_surprise",
    "name": "驚喜鯉魚 (Carp Surprise)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Carp_Surprise.png",
    "sprite": "coin_gold",
    "role": "清淡油香鯉魚"
  },
  {
    "id": "sdv_hashbrowns",
    "name": "薯餅 (Hashbrowns)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8f/Hashbrowns.png",
    "sprite": "coin_gold",
    "role": "金黃酥脆薯餅"
  },
  {
    "id": "sdv_pancakes",
    "name": "薄煎餅 (Pancakes)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6b/Pancakes.png",
    "sprite": "coin_gold",
    "role": "雙層鬆軟煎餅"
  },
  {
    "id": "sdv_salmon_dinner",
    "name": "鮭魚晚餐 (Salmon Dinner)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8b/Salmon_Dinner.png",
    "sprite": "coin_gold",
    "role": "檸檬香鮭魚餐"
  },
  {
    "id": "sdv_fish_taco",
    "name": "魚肉卷 (Fish Taco)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d5/Fish_Taco.png",
    "sprite": "coin_gold",
    "role": "海味捲餅大餐"
  },
  {
    "id": "sdv_moss_soup",
    "name": "苔藓湯 (Moss Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/df/Moss_Soup.png",
    "sprite": "coin_gold",
    "role": "綠野濃湯"
  },
  {
    "id": "sdv_crispy_bass",
    "name": "香酥鱸魚 (Crispy Bass)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Crispy_Bass.png",
    "sprite": "coin_gold",
    "role": "麵包屑香酥魚"
  },
  {
    "id": "sdv_pepper_poppers",
    "name": "爆炒青椒 (Pepper Poppers)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/08/Pepper_Poppers.png",
    "sprite": "coin_gold",
    "role": "起司辣青椒"
  },
  {
    "id": "sdv_bread",
    "name": "麵包 (Bread)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Bread.png",
    "sprite": "coin_gold",
    "role": "硬皮法式麵包"
  },
  {
    "id": "sdv_tom_kha_soup",
    "name": "椰汁湯 (Tom Kha Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Tom_Kha_Soup.png",
    "sprite": "coin_gold",
    "role": "椰香海鮮湯"
  },
  {
    "id": "sdv_trout_soup",
    "name": "鱒魚湯 (Trout Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/48/Trout_Soup.png",
    "sprite": "coin_gold",
    "role": "鹹香魚湯"
  },
  {
    "id": "sdv_chocolate_cake",
    "name": "巧克力蛋糕 (Chocolate Cake)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Chocolate_Cake.png",
    "sprite": "coin_gold",
    "role": "厚軟糖巧克力"
  },
  {
    "id": "sdv_rhubarb_pie",
    "name": "大黃派 (Rhubarb Pie)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/21/Rhubarb_Pie.png",
    "sprite": "coin_gold",
    "role": "酸甜香酥派"
  },
  {
    "id": "sdv_cookie",
    "name": "餅乾 (Cookie)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/70/Cookie.png",
    "sprite": "coin_gold",
    "role": "手作嚼勁餅乾"
  },
  {
    "id": "sdv_spaghetti",
    "name": "意大利麵 (Spaghetti)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/08/Spaghetti.png",
    "sprite": "coin_gold",
    "role": "經典番茄麵"
  },
  {
    "id": "sdv_fried_eel",
    "name": "炒鰻魚 (Fried Eel)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/84/Fried_Eel.png",
    "sprite": "coin_gold",
    "role": "油香鰻魚片"
  },
  {
    "id": "sdv_sashimi",
    "name": "生魚片 (Sashimi)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/41/Sashimi.png",
    "sprite": "coin_gold",
    "role": "薄切鮮魚片"
  },
  {
    "id": "sdv_maki_roll",
    "name": "生魚壽司 (Maki Roll)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Maki_Roll.png",
    "sprite": "coin_gold",
    "role": "紫菜魚飯卷"
  },
  {
    "id": "sdv_tortilla",
    "name": "墨西哥薄餅 (Tortilla)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d7/Tortilla.png",
    "sprite": "coin_gold",
    "role": "玉米香薄餅"
  },
  {
    "id": "sdv_red_plate",
    "name": "紅之盛宴 (Red Plate)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/45/Red_Plate.png",
    "sprite": "coin_gold",
    "role": "抗氧化紅色大餐"
  },
  {
    "id": "sdv_eggplant_parmesan",
    "name": "帕爾瑪奶酪茄子 (Eggplant Parmesan)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Eggplant_Parmesan.png",
    "sprite": "coin_gold",
    "role": "芝香濃郁茄子"
  },
  {
    "id": "sdv_rice_pudding",
    "name": "大米布丁 (Rice Pudding)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ec/Rice_Pudding.png",
    "sprite": "coin_gold",
    "role": "奶油香甜布丁"
  },
  {
    "id": "sdv_ice_cream",
    "name": "冰淇淋 (Ice Cream)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5d/Ice_Cream.png",
    "sprite": "coin_gold",
    "role": "人人都愛的冰淇淋"
  },
  {
    "id": "sdv_blueberry_tart",
    "name": "藍莓千層酥 (Blueberry Tart)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Blueberry_Tart.png",
    "sprite": "coin_gold",
    "role": "清新藍莓酥"
  },
  {
    "id": "sdv_autumn_s_bounty",
    "name": "秋日恩賜 (Autumn's Bounty)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Autumn%27s_Bounty.png",
    "sprite": "coin_gold",
    "role": "秋天豐收風味"
  },
  {
    "id": "sdv_pumpkin_soup",
    "name": "南瓜湯 (Pumpkin Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/59/Pumpkin_Soup.png",
    "sprite": "coin_gold",
    "role": "秋日暖心湯"
  },
  {
    "id": "sdv_super_meal",
    "name": "巨無霸餐 (Super Meal)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d2/Super_Meal.png",
    "sprite": "coin_gold",
    "role": "能量滿格大餐"
  },
  {
    "id": "sdv_cranberry_sauce",
    "name": "紅莓醬 (Cranberry Sauce)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0b/Cranberry_Sauce.png",
    "sprite": "coin_gold",
    "role": "秋日特供果醬"
  },
  {
    "id": "sdv_stuffing",
    "name": "塞料麵包 (Stuffing)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9a/Stuffing.png",
    "sprite": "coin_gold",
    "role": "鼠尾草香熱麵包"
  },
  {
    "id": "sdv_farmer_s_lunch",
    "name": "農夫午餐 (Farmer's Lunch)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/79/Farmer%27s_Lunch.png",
    "sprite": "coin_gold",
    "role": "下田能量午餐"
  },
  {
    "id": "sdv_survival_burger",
    "name": "救生漢堡 (Survival Burger)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Survival_Burger.png",
    "sprite": "coin_gold",
    "role": "探險家便攜漢堡"
  },
  {
    "id": "sdv_dish_o_the_sea",
    "name": "海之菜餚 (Dish O' The Sea)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/ff/Dish_O%27_The_Sea.png",
    "sprite": "coin_gold",
    "role": "海上暖身魚餐"
  },
  {
    "id": "sdv_miner_s_treat",
    "name": "礦工特供 (Miner's Treat)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Miner%27s_Treat.png",
    "sprite": "coin_gold",
    "role": "礦工能量點心"
  },
  {
    "id": "sdv_roots_platter",
    "name": "塊莖拼盤 (Roots Platter)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Roots_Platter.png",
    "sprite": "coin_gold",
    "role": "停不下來的拼盤"
  },
  {
    "id": "sdv_triple_shot_espresso",
    "name": "三倍濃縮咖啡 (Triple Shot Espresso)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/36/Triple_Shot_Espresso.png",
    "sprite": "coin_gold",
    "role": "提神三倍咖啡"
  },
  {
    "id": "sdv_seafoam_pudding",
    "name": "海泡布丁 (Seafoam Pudding)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/33/Seafoam_Pudding.png",
    "sprite": "coin_gold",
    "role": "大海氣息布丁"
  },
  {
    "id": "sdv_algae_soup",
    "name": "海藻湯 (Algae Soup)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Algae_Soup.png",
    "sprite": "coin_gold",
    "role": "綠色海藻湯"
  },
  {
    "id": "sdv_pale_broth",
    "name": "清湯 (Pale Broth)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Pale_Broth.png",
    "sprite": "coin_gold",
    "role": "精緻淡黃清湯"
  },
  {
    "id": "sdv_plum_pudding",
    "name": "葡萄乾布丁 (Plum Pudding)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a0/Plum_Pudding.png",
    "sprite": "coin_gold",
    "role": "節日傳統小吃"
  },
  {
    "id": "sdv_artichoke_dip",
    "name": "水煮洋薊 (Artichoke Dip)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/77/Artichoke_Dip.png",
    "sprite": "coin_gold",
    "role": "清涼爽口洋薊"
  },
  {
    "id": "sdv_stir_fry",
    "name": "蔬菜什錦蓋飯 (Stir Fry)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Stir_Fry.png",
    "sprite": "coin_gold",
    "role": "大米上的蔬菜條"
  },
  {
    "id": "sdv_roasted_hazelnuts",
    "name": "烤榛子 (Roasted Hazelnuts)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Roasted_Hazelnuts.png",
    "sprite": "coin_gold",
    "role": "烤香榛子"
  },
  {
    "id": "sdv_pumpkin_pie",
    "name": "南瓜派 (Pumpkin Pie)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7d/Pumpkin_Pie.png",
    "sprite": "coin_gold",
    "role": "絲滑南瓜派"
  },
  {
    "id": "sdv_radish_salad",
    "name": "蘿蔔沙拉 (Radish Salad)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b9/Radish_Salad.png",
    "sprite": "coin_gold",
    "role": "脆脆蘿蔔沙拉"
  },
  {
    "id": "sdv_fruit_salad",
    "name": "水果沙拉 (Fruit Salad)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Fruit_Salad.png",
    "sprite": "coin_gold",
    "role": "夏季水果拼盤"
  },
  {
    "id": "sdv_blackberry_cobbler",
    "name": "黑莓脆皮餅 (Blackberry Cobbler)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/70/Blackberry_Cobbler.png",
    "sprite": "coin_gold",
    "role": "最好吃的黑莓餅"
  },
  {
    "id": "sdv_cranberry_candy",
    "name": "蔓越莓糖果 (Cranberry Candy)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9d/Cranberry_Candy.png",
    "sprite": "coin_gold",
    "role": "甜甜蔓越莓糖"
  },
  {
    "id": "sdv_bruschetta",
    "name": "意式烤麵包 (Bruschetta)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ca/Bruschetta.png",
    "sprite": "coin_gold",
    "role": "番茄酥脆麵包"
  },
  {
    "id": "sdv_coleslaw",
    "name": "卷心菜沙拉 (Coleslaw)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Coleslaw.png",
    "sprite": "coin_gold",
    "role": "清淡新鮮沙拉"
  },
  {
    "id": "sdv_fiddlehead_risotto",
    "name": "意式蕨菜燉飯 (Fiddlehead Risotto)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2d/Fiddlehead_Risotto.png",
    "sprite": "coin_gold",
    "role": "清炒蕨菜飯"
  },
  {
    "id": "sdv_poppyseed_muffin",
    "name": "虞美人籽鬆糕 (Poppyseed Muffin)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8e/Poppyseed_Muffin.png",
    "sprite": "coin_gold",
    "role": "鎮定香鬆糕"
  },
  {
    "id": "sdv_chowder",
    "name": "海鮮雜燴湯 (Chowder)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/95/Chowder.png",
    "sprite": "coin_gold",
    "role": "寒夜暖身雜燴"
  },
  {
    "id": "sdv_fish_stew",
    "name": "燴魚湯 (Fish Stew)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6f/Fish_Stew.png",
    "sprite": "coin_gold",
    "role": "大海味道魚湯"
  },
  {
    "id": "sdv_escargot",
    "name": "法式田螺 (Escargot)",
    "category": "cooking",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/Escargot.png",
    "sprite": "coin_gold",
    "role": "黃油香田螺"
  },
  {
    "id": "sdv_egg",
    "name": "蛋 (Egg)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/26/Egg.png",
    "sprite": "sunflower",
    "role": "母雞新鮮雞蛋"
  },
  {
    "id": "sdv_milk",
    "name": "牛奶 (Milk)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/92/Milk.png",
    "sprite": "sunflower",
    "role": "乳牛新鮮牛奶"
  },
  {
    "id": "sdv_kale",
    "name": "甘藍菜 (Kale)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d1/Kale.png",
    "sprite": "sunflower",
    "role": "春日綠葉菜"
  },
  {
    "id": "sdv_potato",
    "name": "土豆 (Potato)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c2/Potato.png",
    "sprite": "sunflower",
    "role": "春日地下寶藏"
  },
  {
    "id": "sdv_green_bean",
    "name": "青豆 (Green Bean)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Green_Bean.png",
    "sprite": "sunflower",
    "role": "架上攀爬青豆"
  },
  {
    "id": "sdv_rhubarb",
    "name": "大黃 (Rhubarb)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Rhubarb.png",
    "sprite": "sunflower",
    "role": "酸香大黃莖"
  },
  {
    "id": "sdv_garlic",
    "name": "蒜 (Garlic)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Garlic.png",
    "sprite": "sunflower",
    "role": "春日蒜頭"
  },
  {
    "id": "sdv_radish",
    "name": "蘿蔔 (Radish)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d5/Radish.png",
    "sprite": "sunflower",
    "role": "夏日脆蘿蔔"
  },
  {
    "id": "sdv_poppy",
    "name": "虞美人 (Poppy)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/37/Poppy.png",
    "sprite": "sunflower",
    "role": "夏日紅色花朵"
  },
  {
    "id": "sdv_tomato",
    "name": "番茄（西紅柿） (Tomato)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9d/Tomato.png",
    "sprite": "sunflower",
    "role": "夏日紅潤番茄"
  },
  {
    "id": "sdv_corn",
    "name": "玉米 (Corn)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f8/Corn.png",
    "sprite": "sunflower",
    "role": "夏秋金黃玉米"
  },
  {
    "id": "sdv_red_cabbage",
    "name": "紅葉卷心菜 (Red Cabbage)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2d/Red_Cabbage.png",
    "sprite": "sunflower",
    "role": "夏日紅葉菜"
  },
  {
    "id": "sdv_bok_choy",
    "name": "小白菜 (Bok Choy)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/40/Bok_Choy.png",
    "sprite": "sunflower",
    "role": "秋日小白菜"
  },
  {
    "id": "sdv_eggplant",
    "name": "茄子 (Eggplant)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8f/Eggplant.png",
    "sprite": "sunflower",
    "role": "秋日紫茄子"
  },
  {
    "id": "sdv_amaranth",
    "name": "莧菜 (Amaranth)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f6/Amaranth.png",
    "sprite": "sunflower",
    "role": "秋日紫紅莧菜"
  },
  {
    "id": "sdv_cranberries",
    "name": "蔓越莓 (Cranberries)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Cranberries.png",
    "sprite": "sunflower",
    "role": "秋日紅寶石果"
  },
  {
    "id": "sdv_yam",
    "name": "山藥 (Yam)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Yam.png",
    "sprite": "sunflower",
    "role": "秋日香甜山藥"
  },
  {
    "id": "sdv_beet",
    "name": "甜菜 (Beet)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Beet.png",
    "sprite": "sunflower",
    "role": "甜甜紅甜菜"
  },
  {
    "id": "sdv_artichoke",
    "name": "洋薊 (Artichoke)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/dd/Artichoke.png",
    "sprite": "sunflower",
    "role": "秋日洋薊"
  },
  {
    "id": "sdv_taro_root",
    "name": "芋頭 (Taro Root)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Taro_Root.png",
    "sprite": "sunflower",
    "role": "薑島芋頭"
  },
  {
    "id": "sdv_blackberry",
    "name": "黑莓 (Blackberry)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Blackberry.png",
    "sprite": "sunflower",
    "role": "秋日野黑莓"
  },
  {
    "id": "sdv_cave_carrot",
    "name": "山洞蘿蔔 (Cave Carrot)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/34/Cave_Carrot.png",
    "sprite": "sunflower",
    "role": "礦井山洞蘿蔔"
  },
  {
    "id": "sdv_common_mushroom",
    "name": "普通蘑菇 (Common Mushroom)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Common_Mushroom.png",
    "sprite": "sunflower",
    "role": "森林普通蘑菇"
  },
  {
    "id": "sdv_dandelion",
    "name": "蒲公英 (Dandelion)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Dandelion.png",
    "sprite": "sunflower",
    "role": "春日黃色小花"
  },
  {
    "id": "sdv_coconut",
    "name": "椰子 (Coconut)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Coconut.png",
    "sprite": "sunflower",
    "role": "沙漠椰子"
  },
  {
    "id": "sdv_fiddlehead_fern",
    "name": "蕨菜 (Fiddlehead Fern)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/48/Fiddlehead_Fern.png",
    "sprite": "sunflower",
    "role": "秘密森林蕨菜"
  },
  {
    "id": "sdv_hazelnut",
    "name": "榛子 (Hazelnut)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Hazelnut.png",
    "sprite": "sunflower",
    "role": "秋日榛子"
  },
  {
    "id": "sdv_wild_horseradish",
    "name": "野山葵 (Wild Horseradish)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/90/Wild_Horseradish.png",
    "sprite": "sunflower",
    "role": "春日野山葵"
  },
  {
    "id": "sdv_leek",
    "name": "韭蔥 (Leek)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/57/Leek.png",
    "sprite": "sunflower",
    "role": "春日韭蔥"
  },
  {
    "id": "sdv_morel",
    "name": "羊肚菌 (Morel)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Morel.png",
    "sprite": "sunflower",
    "role": "春日羊肚菌"
  },
  {
    "id": "sdv_salmonberry",
    "name": "野梅 (Salmonberry)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/59/Salmonberry.png",
    "sprite": "sunflower",
    "role": "春夏野莓"
  },
  {
    "id": "sdv_winter_root",
    "name": "冬根 (Winter Root)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/11/Winter_Root.png",
    "sprite": "sunflower",
    "role": "冬日雪地根莖"
  },
  {
    "id": "sdv_ginger",
    "name": "薑 (Ginger)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/85/Ginger.png",
    "sprite": "sunflower",
    "role": "薑島香薑"
  },
  {
    "id": "sdv_apple",
    "name": "蘋果 (Apple)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7d/Apple.png",
    "sprite": "sunflower",
    "role": "秋日紅蘋果"
  },
  {
    "id": "sdv_apricot",
    "name": "杏子 (Apricot)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fc/Apricot.png",
    "sprite": "sunflower",
    "role": "春日杏子"
  },
  {
    "id": "sdv_banana",
    "name": "香蕉 (Banana)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Banana.png",
    "sprite": "sunflower",
    "role": "薑島香蕉"
  },
  {
    "id": "sdv_mango",
    "name": "芒果 (Mango)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/38/Mango.png",
    "sprite": "sunflower",
    "role": "夏季金芒果"
  },
  {
    "id": "sdv_cheese",
    "name": "奶酪 (Cheese)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Cheese.png",
    "sprite": "sunflower",
    "role": "金黃壓酪奶酪"
  },
  {
    "id": "sdv_mayonnaise",
    "name": "蛋黃醬 (Mayonnaise)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Mayonnaise.png",
    "sprite": "sunflower",
    "role": "雞蛋製蛋黃醬"
  },
  {
    "id": "sdv_void_mayonnaise",
    "name": "虛空蛋黃醬 (Void Mayonnaise)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f3/Void_Mayonnaise.png",
    "sprite": "sunflower",
    "role": "黑色神秘蛋黃醬"
  },
  {
    "id": "sdv_coffee",
    "name": "咖啡 (Coffee)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Coffee.png",
    "sprite": "sunflower",
    "role": "小桶香濃咖啡"
  },
  {
    "id": "sdv_maple_syrup",
    "name": "楓糖漿 (Maple Syrup)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Maple_Syrup.png",
    "sprite": "sunflower",
    "role": "楓樹甜糖漿"
  },
  {
    "id": "sdv_squid_ink",
    "name": "魷魚墨汁 (Squid Ink)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ac/Squid_Ink.png",
    "sprite": "sunflower",
    "role": "深海魷魚墨汁"
  },
  {
    "id": "sdv_moss",
    "name": "苔藓 (Moss)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/64/Moss.png",
    "sprite": "sunflower",
    "role": "苔雨綠苔藓"
  },
  {
    "id": "sdv_tuna",
    "name": "金槍魚 (Tuna)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c5/Tuna.png",
    "sprite": "sunflower",
    "role": "海洋金槍魚"
  },
  {
    "id": "sdv_sardine",
    "name": "沙丁魚 (Sardine)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Sardine.png",
    "sprite": "sunflower",
    "role": "海洋小沙丁"
  },
  {
    "id": "sdv_bream",
    "name": "鯛魚 (Bream)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/82/Bream.png",
    "sprite": "sunflower",
    "role": "夜間河流鯛魚"
  },
  {
    "id": "sdv_largemouth_bass",
    "name": "大嘴鱸魚 (Largemouth Bass)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/11/Largemouth_Bass.png",
    "sprite": "sunflower",
    "role": "湖泊大嘴鱸"
  },
  {
    "id": "sdv_salmon",
    "name": "鮭魚 (Salmon)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Salmon.png",
    "sprite": "sunflower",
    "role": "秋日河流鮭魚"
  },
  {
    "id": "sdv_flounder",
    "name": "比目魚 (Flounder)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/85/Flounder.png",
    "sprite": "sunflower",
    "role": "春夏比目魚"
  },
  {
    "id": "sdv_carp",
    "name": "鯉魚 (Carp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Carp.png",
    "sprite": "sunflower",
    "role": "湖泊普通鯉魚"
  },
  {
    "id": "sdv_sunfish",
    "name": "太陽魚 (Sunfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/56/Sunfish.png",
    "sprite": "sunflower",
    "role": "河流太陽魚"
  },
  {
    "id": "sdv_eel",
    "name": "鰻魚 (Eel)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/91/Eel.png",
    "sprite": "sunflower",
    "role": "雨夜海洋鰻魚"
  },
  {
    "id": "sdv_squid",
    "name": "魷魚 (Squid)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/81/Squid.png",
    "sprite": "sunflower",
    "role": "冬夜海洋魷魚"
  },
  {
    "id": "sdv_sea_cucumber",
    "name": "海參 (Sea Cucumber)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sea_Cucumber.png",
    "sprite": "sunflower",
    "role": "秋冬海參"
  },
  {
    "id": "sdv_seaweed",
    "name": "海草 (Seaweed)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/13/Seaweed.png",
    "sprite": "sunflower",
    "role": "海洋綠海草"
  },
  {
    "id": "sdv_green_algae",
    "name": "綠藻 (Green Algae)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6d/Green_Algae.png",
    "sprite": "sunflower",
    "role": "河流綠藻"
  },
  {
    "id": "sdv_white_algae",
    "name": "白藻 (White Algae)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f7/White_Algae.png",
    "sprite": "sunflower",
    "role": "礦井白藻"
  },
  {
    "id": "sdv_clam",
    "name": "蛤 (Clam)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Clam.png",
    "sprite": "sunflower",
    "role": "海洋蛤蜊"
  },
  {
    "id": "sdv_crayfish",
    "name": "小龍蝦 (Crayfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Crayfish.png",
    "sprite": "sunflower",
    "role": "淡水小龍蝦"
  },
  {
    "id": "sdv_cockle",
    "name": "蚌 (Cockle)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Cockle.png",
    "sprite": "sunflower",
    "role": "海洋小蚌"
  },
  {
    "id": "sdv_shrimp",
    "name": "蝦 (Shrimp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/91/Shrimp.png",
    "sprite": "sunflower",
    "role": "海洋鮮蝦"
  },
  {
    "id": "sdv_snail",
    "name": "蝸牛 (Snail)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d2/Snail.png",
    "sprite": "sunflower",
    "role": "淡水蝸牛"
  },
  {
    "id": "sdv_periwinkle",
    "name": "玉黍螺 (Periwinkle)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1d/Periwinkle.png",
    "sprite": "sunflower",
    "role": "淡水玉黍螺"
  },
  {
    "id": "sdv_sugar",
    "name": "糖 (Sugar)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Sugar.png",
    "sprite": "sunflower",
    "role": "皮埃爾商店白糖"
  },
  {
    "id": "sdv_wheat_flour",
    "name": "大麥粉 (Wheat Flour)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Wheat_Flour.png",
    "sprite": "sunflower",
    "role": "金黃小麥粉"
  },
  {
    "id": "sdv_rice",
    "name": "大米 (Rice)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/da/Rice.png",
    "sprite": "sunflower",
    "role": "香噴噴大米"
  },
  {
    "id": "sdv_oil",
    "name": "油 (Oil)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/06/Oil.png",
    "sprite": "sunflower",
    "role": "料理用油"
  },
  {
    "id": "sdv_vinegar",
    "name": "醋 (Vinegar)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fe/Vinegar.png",
    "sprite": "sunflower",
    "role": "酸香米醋"
  },
  {
    "id": "sdv_anchovy",
    "name": "鳳尾魚 (Anchovy)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/79/Anchovy.png",
    "sprite": "duck",
    "role": "海洋小鳳尾魚"
  },
  {
    "id": "sdv_pufferfish",
    "name": "河豚 (Pufferfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/ba/Pufferfish.png",
    "sprite": "duck",
    "role": "夏日膨脹河豚"
  },
  {
    "id": "sdv_smallmouth_bass",
    "name": "小嘴鱸魚 (Smallmouth Bass)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Smallmouth_Bass.png",
    "sprite": "duck",
    "role": "春季湖泊鱸魚"
  },
  {
    "id": "sdv_walleye",
    "name": "大眼魚 (Walleye)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/05/Walleye.png",
    "sprite": "duck",
    "role": "秋夜大眼魚"
  },
  {
    "id": "sdv_perch",
    "name": "河鱸 (Perch)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/43/Perch.png",
    "sprite": "duck",
    "role": "冬日河鱸"
  },
  {
    "id": "sdv_catfish",
    "name": "鯰魚 (Catfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/99/Catfish.png",
    "sprite": "duck",
    "role": "雨日鯰魚"
  },
  {
    "id": "sdv_pike",
    "name": "狗魚 (Pike)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Pike.png",
    "sprite": "duck",
    "role": "夏冬狗魚"
  },
  {
    "id": "sdv_red_mullet",
    "name": "紅鯔魚 (Red Mullet)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Red_Mullet.png",
    "sprite": "duck",
    "role": "夏日紅鯔魚"
  },
  {
    "id": "sdv_herring",
    "name": "鯡魚 (Herring)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Herring.png",
    "sprite": "duck",
    "role": "春冬鯡魚"
  },
  {
    "id": "sdv_red_snapper",
    "name": "紅鯛魚 (Red Snapper)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d3/Red_Snapper.png",
    "sprite": "duck",
    "role": "夏秋紅鯛魚"
  },
  {
    "id": "sdv_super_cucumber",
    "name": "超級海參 (Super Cucumber)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d5/Super_Cucumber.png",
    "sprite": "duck",
    "role": "夏秋超級海參"
  },
  {
    "id": "sdv_ghostfish",
    "name": "鬼魚 (Ghostfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/72/Ghostfish.png",
    "sprite": "duck",
    "role": "礦井幽靈魚"
  },
  {
    "id": "sdv_stonefish",
    "name": "石魚 (Stonefish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/03/Stonefish.png",
    "sprite": "duck",
    "role": "礦井石魚"
  },
  {
    "id": "sdv_ice_pip",
    "name": "冰柱魚 (Ice Pip)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/63/Ice_Pip.png",
    "sprite": "duck",
    "role": "礦井100層冰魚"
  },
  {
    "id": "sdv_sandfish",
    "name": "沙魚 (Sandfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bb/Sandfish.png",
    "sprite": "duck",
    "role": "沙漠沙魚"
  },
  {
    "id": "sdv_scorpion_carp",
    "name": "蠍子鯉魚 (Scorpion Carp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/76/Scorpion_Carp.png",
    "sprite": "duck",
    "role": "沙漠蠍子鯉"
  },
  {
    "id": "sdv_tiger_trout",
    "name": "虎紋鱒魚 (Tiger Trout)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Tiger_Trout.png",
    "sprite": "duck",
    "role": "秋冬虎紋鱒"
  },
  {
    "id": "sdv_bullhead",
    "name": "牛頭魚 (Bullhead)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/db/Bullhead.png",
    "sprite": "duck",
    "role": "山湖牛頭魚"
  },
  {
    "id": "sdv_tilapia",
    "name": "羅非魚 (Tilapia)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Tilapia.png",
    "sprite": "duck",
    "role": "夏秋羅非魚"
  },
  {
    "id": "sdv_chub",
    "name": "圓鰭雅羅魚 (Chub)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bd/Chub.png",
    "sprite": "duck",
    "role": "山林圓鰭魚"
  },
  {
    "id": "sdv_dorado",
    "name": "鯕鰍 (Dorado)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Dorado.png",
    "sprite": "duck",
    "role": "夏日鯕鰍"
  },
  {
    "id": "sdv_albacore",
    "name": "長鰭金槍魚 (Albacore)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Albacore.png",
    "sprite": "duck",
    "role": "秋冬長鰭金槍"
  },
  {
    "id": "sdv_shad",
    "name": "西鯡 (Shad)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ef/Shad.png",
    "sprite": "duck",
    "role": "夏秋西鯡"
  },
  {
    "id": "sdv_lingcod",
    "name": "靈鱈 (Lingcod)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Lingcod.png",
    "sprite": "duck",
    "role": "冬日靈鱈"
  },
  {
    "id": "sdv_halibut",
    "name": "大比目魚 (Halibut)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/02/Halibut.png",
    "sprite": "duck",
    "role": "夏日大比目魚"
  },
  {
    "id": "sdv_woodskip",
    "name": "木躍魚 (Woodskip)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Woodskip.png",
    "sprite": "duck",
    "role": "秘密森林木魚"
  },
  {
    "id": "sdv_slimejack",
    "name": "史萊姆魚 (Slimejack)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/34/Slimejack.png",
    "sprite": "duck",
    "role": "女巫沼澤史萊姆魚"
  },
  {
    "id": "sdv_lionfish",
    "name": "獅子魚 (Lionfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bb/Lionfish.png",
    "sprite": "duck",
    "role": "薑島獅子魚"
  },
  {
    "id": "sdv_blue_discus",
    "name": "藍鐵餅魚 (Blue Discus)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ee/Blue_Discus.png",
    "sprite": "duck",
    "role": "薑島藍鐵餅"
  },
  {
    "id": "sdv_midnight_squid",
    "name": "午夜魷魚 (Midnight Squid)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/83/Midnight_Squid.png",
    "sprite": "duck",
    "role": "深海午夜魷魚"
  },
  {
    "id": "sdv_radioactive_carp",
    "name": "放射性鯉魚 (Radioactive Carp)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/57/Radioactive_Carp.png",
    "sprite": "duck",
    "role": "下水道傳奇二代"
  },
  {
    "id": "sdv_ms_angler",
    "name": "安格勒女士 (Ms. Angler)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bb/Ms._Angler.png",
    "sprite": "duck",
    "role": "瀑布傳奇二代"
  },
  {
    "id": "sdv_legend_ii",
    "name": "傳奇魚二代 (Legend II)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7a/Legend_II.png",
    "sprite": "duck",
    "role": "山湖傳奇二代"
  },
  {
    "id": "sdv_glacierfish_jr",
    "name": "小冰川魚 (Glacierfish Jr.)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/db/Glacierfish_Jr..png",
    "sprite": "duck",
    "role": "箭頭島傳奇二代"
  },
  {
    "id": "sdv_son_of_crimsonfish",
    "name": "緋紅魚之子 (Son of Crimsonfish)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Son_of_Crimsonfish.png",
    "sprite": "duck",
    "role": "東碼頭傳奇二代"
  },
  {
    "id": "sdv_goby",
    "name": "蝦虎魚 (Goby)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/67/Goby.png",
    "sprite": "duck",
    "role": "森林瀑布蝦虎魚"
  },
  {
    "id": "sdv_coffee_bean",
    "name": "咖啡豆 (Coffee Bean)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/33/Coffee_Bean.png",
    "sprite": "sunflower",
    "role": "多次收穫咖啡豆"
  },
  {
    "id": "sdv_hops",
    "name": "啤酒花 (Hops)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/59/Hops.png",
    "sprite": "sunflower",
    "role": "夏日啤酒花"
  },
  {
    "id": "sdv_wheat",
    "name": "小麥 (Wheat)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e2/Wheat.png",
    "sprite": "sunflower",
    "role": "夏秋小麥"
  },
  {
    "id": "sdv_grape",
    "name": "葡萄 (Grape)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c2/Grape.png",
    "sprite": "sunflower",
    "role": "秋日葡萄架"
  },
  {
    "id": "sdv_tulip",
    "name": "鬱金香 (Tulip)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cf/Tulip.png",
    "sprite": "sunflower",
    "role": "春日鬱金香"
  },
  {
    "id": "sdv_summer_spangle",
    "name": "夏日亮片花 (Summer Spangle)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Summer_Spangle.png",
    "sprite": "sunflower",
    "role": "夏日亮片花"
  },
  {
    "id": "sdv_unmilled_rice",
    "name": "未碾米 (Unmilled Rice)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fe/Unmilled_Rice.png",
    "sprite": "sunflower",
    "role": "春日未碾米"
  },
  {
    "id": "sdv_tea_leaves",
    "name": "茶葉 (Tea Leaves)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5b/Tea_Leaves.png",
    "sprite": "sunflower",
    "role": "茶樹葉片"
  },
  {
    "id": "sdv_cactus_fruit",
    "name": "仙人掌果 (Cactus Fruit)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/32/Cactus_Fruit.png",
    "sprite": "sunflower",
    "role": "沙漠仙人掌果"
  },
  {
    "id": "sdv_powdermelon",
    "name": "粉瓜 (Powdermelon)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Powdermelon.png",
    "sprite": "sunflower",
    "role": "冬日粉瓜"
  },
  {
    "id": "sdv_qi_fruit",
    "name": "齊瓜 (Qi Fruit)",
    "category": "crops",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b9/Qi_Fruit.png",
    "sprite": "sunflower",
    "role": "齊先生任務瓜"
  },
  {
    "id": "sdv_daffodil",
    "name": "水仙花 (Daffodil)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Daffodil.png",
    "sprite": "clover",
    "role": "春日水仙"
  },
  {
    "id": "sdv_spring_onion",
    "name": "大蔥 (Spring Onion)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0c/Spring_Onion.png",
    "sprite": "clover",
    "role": "春日大蔥"
  },
  {
    "id": "sdv_spice_berry",
    "name": "香料漿果 (Spice Berry)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Spice_Berry.png",
    "sprite": "clover",
    "role": "夏日香料果"
  },
  {
    "id": "sdv_sweet_pea",
    "name": "香豌豆花 (Sweet Pea)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d9/Sweet_Pea.png",
    "sprite": "clover",
    "role": "夏日香豌豆"
  },
  {
    "id": "sdv_red_mushroom",
    "name": "紅蘑菇 (Red Mushroom)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Red_Mushroom.png",
    "sprite": "clover",
    "role": "夏秋紅蘑菇"
  },
  {
    "id": "sdv_chanterelle",
    "name": "雞油菌 (Chanterelle)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1d/Chanterelle.png",
    "sprite": "clover",
    "role": "秋日雞油菌"
  },
  {
    "id": "sdv_purple_mushroom",
    "name": "紫蘑菇 (Purple Mushroom)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Purple_Mushroom.png",
    "sprite": "clover",
    "role": "秋日紫蘑菇"
  },
  {
    "id": "sdv_wild_plum",
    "name": "野生李子 (Wild Plum)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Wild_Plum.png",
    "sprite": "clover",
    "role": "秋日野生李子"
  },
  {
    "id": "sdv_snow_yam",
    "name": "雪山藥 (Snow Yam)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3f/Snow_Yam.png",
    "sprite": "clover",
    "role": "冬日雪山藥"
  },
  {
    "id": "sdv_crocus",
    "name": "番紅花 (Crocus)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Crocus.png",
    "sprite": "clover",
    "role": "冬日番紅花"
  },
  {
    "id": "sdv_holly",
    "name": "冬青樹 (Holly)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b8/Holly.png",
    "sprite": "clover",
    "role": "冬日冬青葉"
  },
  {
    "id": "sdv_coral",
    "name": "珊瑚 (Coral)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Coral.png",
    "sprite": "clover",
    "role": "海灘珊瑚"
  },
  {
    "id": "sdv_sea_urchin",
    "name": "海膽 (Sea Urchin)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e7/Sea_Urchin.png",
    "sprite": "clover",
    "role": "海灘紫海膽"
  },
  {
    "id": "sdv_rainbow_shell",
    "name": "彩虹貝殼 (Rainbow Shell)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Rainbow_Shell.png",
    "sprite": "clover",
    "role": "夏日彩虹貝"
  },
  {
    "id": "sdv_nautilus_shell",
    "name": "鸚鵡螺殼 (Nautilus Shell)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Nautilus_Shell.png",
    "sprite": "clover",
    "role": "冬日鸚鵡螺"
  },
  {
    "id": "sdv_oyster",
    "name": "牡蠣 (Oyster)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/54/Oyster.png",
    "sprite": "clover",
    "role": "海灘牡蠣"
  },
  {
    "id": "sdv_mussel",
    "name": "貽貝 (Mussel)",
    "category": "fish",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Mussel.png",
    "sprite": "clover",
    "role": "海灘貽貝"
  },
  {
    "id": "sdv_magma_cap",
    "name": "岩漿菇 (Magma Cap)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/77/Magma_Cap.png",
    "sprite": "clover",
    "role": "火山岩漿菇"
  },
  {
    "id": "sdv_dragon_tooth",
    "name": "龍牙 (Dragon Tooth)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Dragon_Tooth.png",
    "sprite": "clover",
    "role": "火山龍牙"
  },
  {
    "id": "sdv_dwarf_scroll_i",
    "name": "矮人卷軸一 (Dwarf Scroll I)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b9/Dwarf_Scroll_I.png",
    "sprite": "coin_gold",
    "role": "紅絲帶卷軸"
  },
  {
    "id": "sdv_dwarf_scroll_ii",
    "name": "矮人卷軸二 (Dwarf Scroll II)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ca/Dwarf_Scroll_II.png",
    "sprite": "coin_gold",
    "role": "綠絲帶卷軸"
  },
  {
    "id": "sdv_dwarf_scroll_iii",
    "name": "矮人卷軸三 (Dwarf Scroll III)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ec/Dwarf_Scroll_III.png",
    "sprite": "coin_gold",
    "role": "藍絲帶卷軸"
  },
  {
    "id": "sdv_dwarf_scroll_iv",
    "name": "矮人卷軸四 (Dwarf Scroll IV)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/85/Dwarf_Scroll_IV.png",
    "sprite": "coin_gold",
    "role": "金絲帶卷軸"
  },
  {
    "id": "sdv_chipped_amphora",
    "name": "碎片陶罐 (Chipped Amphora)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Chipped_Amphora.png",
    "sprite": "coin_gold",
    "role": "破損陶罐碎片"
  },
  {
    "id": "sdv_arrowhead",
    "name": "石箭頭 (Arrowhead)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d1/Arrowhead.png",
    "sprite": "coin_gold",
    "role": "古代石箭頭"
  },
  {
    "id": "sdv_ancient_doll",
    "name": "古代人偶 (Ancient Doll)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c0/Ancient_Doll.png",
    "sprite": "coin_gold",
    "role": "神秘古代人偶"
  },
  {
    "id": "sdv_elvish_jewelry",
    "name": "精靈珠寶 (Elvish Jewelry)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9d/Elvish_Jewelry.png",
    "sprite": "coin_gold",
    "role": "精靈首飾"
  },
  {
    "id": "sdv_chewing_stick",
    "name": "咀嚼棒 (Chewing Stick)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d2/Chewing_Stick.png",
    "sprite": "coin_gold",
    "role": "古代咀嚼棒"
  },
  {
    "id": "sdv_ornamental_fan",
    "name": "裝飾扇 (Ornamental Fan)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ab/Ornamental_Fan.png",
    "sprite": "coin_gold",
    "role": "精緻裝飾扇"
  },
  {
    "id": "sdv_rare_disc",
    "name": "稀有圓盤 (Rare Disc)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Rare_Disc.png",
    "sprite": "coin_gold",
    "role": "稀有石盤"
  },
  {
    "id": "sdv_ancient_sword",
    "name": "古代之劍 (Ancient Sword)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/76/Ancient_Sword.png",
    "sprite": "coin_gold",
    "role": "古代寶劍"
  },
  {
    "id": "sdv_rusty_spoon",
    "name": "生鏽的勺子 (Rusty Spoon)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Rusty_Spoon.png",
    "sprite": "coin_gold",
    "role": "生鏽勺子"
  },
  {
    "id": "sdv_rusty_spur",
    "name": "生鏽的馬刺 (Rusty Spur)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cd/Rusty_Spur.png",
    "sprite": "coin_gold",
    "role": "生鏽馬刺"
  },
  {
    "id": "sdv_rusty_cog",
    "name": "生鏽的齒輪 (Rusty Cog)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/74/Rusty_Cog.png",
    "sprite": "coin_gold",
    "role": "生鏽齒輪"
  },
  {
    "id": "sdv_chicken_statue",
    "name": "雞雕像 (Chicken Statue)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/af/Chicken_Statue.png",
    "sprite": "coin_gold",
    "role": "石雞雕像"
  },
  {
    "id": "sdv_ancient_seed",
    "name": "古代種子 (Ancient Seed)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/af/Ancient_Seed.png",
    "sprite": "coin_gold",
    "role": "上古種子"
  },
  {
    "id": "sdv_prehistoric_tool",
    "name": "史前工具 (Prehistoric Tool)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/26/Prehistoric_Tool.png",
    "sprite": "coin_gold",
    "role": "史前石器"
  },
  {
    "id": "sdv_dried_starfish",
    "name": "乾燥的海星 (Dried Starfish)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/df/Dried_Starfish.png",
    "sprite": "coin_gold",
    "role": "乾燥海星"
  },
  {
    "id": "sdv_anchor",
    "name": "船錨 (Anchor)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c0/Anchor.png",
    "sprite": "coin_gold",
    "role": "沉船之錨"
  },
  {
    "id": "sdv_glass_shards",
    "name": "玻璃碎片 (Glass Shards)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b9/Glass_Shards.png",
    "sprite": "coin_gold",
    "role": "彩色玻璃碎片"
  },
  {
    "id": "sdv_bone_flute",
    "name": "骨笛 (Bone Flute)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fc/Bone_Flute.png",
    "sprite": "coin_gold",
    "role": "骨製笛子"
  },
  {
    "id": "sdv_prehistoric_handaxe",
    "name": "史前手斧 (Prehistoric Handaxe)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/07/Prehistoric_Handaxe.png",
    "sprite": "coin_gold",
    "role": "史前手斧"
  },
  {
    "id": "sdv_dwarvish_helm",
    "name": "矮人頭盔 (Dwarvish Helm)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8b/Dwarvish_Helm.png",
    "sprite": "coin_gold",
    "role": "矮人頭盔"
  },
  {
    "id": "sdv_dwarf_gadget",
    "name": "矮人小工具 (Dwarf Gadget)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Dwarf_Gadget.png",
    "sprite": "coin_gold",
    "role": "矮人裝置"
  },
  {
    "id": "sdv_ancient_drum",
    "name": "古代鼓 (Ancient Drum)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1e/Ancient_Drum.png",
    "sprite": "coin_gold",
    "role": "古代木鼓"
  },
  {
    "id": "sdv_golden_mask",
    "name": "黃金面具 (Golden Mask)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Golden_Mask.png",
    "sprite": "coin_gold",
    "role": "黃金面具"
  },
  {
    "id": "sdv_golden_relic",
    "name": "黃金遺物 (Golden Relic)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/37/Golden_Relic.png",
    "sprite": "coin_gold",
    "role": "黃金遺物"
  },
  {
    "id": "sdv_strange_doll",
    "name": "奇怪的人偶綠 (Strange Doll)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0d/Strange_Doll.png",
    "sprite": "coin_gold",
    "role": "綠色奇怪人偶"
  },
  {
    "id": "sdv_prehistoric_scapula",
    "name": "史前肩胛骨 (Prehistoric Scapula)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ee/Prehistoric_Scapula.png",
    "sprite": "coin_gold",
    "role": "史前肩胛骨"
  },
  {
    "id": "sdv_prehistoric_tibia",
    "name": "史前脛骨 (Prehistoric Tibia)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ce/Prehistoric_Tibia.png",
    "sprite": "coin_gold",
    "role": "史前脛骨"
  },
  {
    "id": "sdv_prehistoric_skull",
    "name": "史前頭骨 (Prehistoric Skull)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Prehistoric_Skull.png",
    "sprite": "coin_gold",
    "role": "史前頭骨"
  },
  {
    "id": "sdv_skeletal_hand",
    "name": "骷髏手 (Skeletal Hand)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/da/Skeletal_Hand.png",
    "sprite": "coin_gold",
    "role": "骷髏手骨"
  },
  {
    "id": "sdv_prehistoric_rib",
    "name": "史前肋骨 (Prehistoric Rib)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/62/Prehistoric_Rib.png",
    "sprite": "coin_gold",
    "role": "史前肋骨"
  },
  {
    "id": "sdv_skeletal_tail",
    "name": "骷髏尾巴 (Skeletal Tail)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/29/Skeletal_Tail.png",
    "sprite": "coin_gold",
    "role": "骷髏尾骨"
  },
  {
    "id": "sdv_nautilus_fossil",
    "name": "鸚鵡螺化石 (Nautilus Fossil)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Nautilus_Fossil.png",
    "sprite": "coin_gold",
    "role": "鸚鵡螺化石"
  },
  {
    "id": "sdv_amphibian_fossil",
    "name": "兩棲動物化石 (Amphibian Fossil)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cf/Amphibian_Fossil.png",
    "sprite": "coin_gold",
    "role": "兩棲化石"
  },
  {
    "id": "sdv_palm_fossil",
    "name": "棕櫚化石 (Palm Fossil)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Palm_Fossil.png",
    "sprite": "coin_gold",
    "role": "棕櫚化石"
  },
  {
    "id": "sdv_trilobite",
    "name": "三葉蟲化石 (Trilobite)",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2b/Trilobite.png",
    "sprite": "coin_gold",
    "role": "三葉蟲化石"
  },
  {
    "id": "sdv_strange_doll_yellow",
    "name": "奇怪的人偶黃 (Strange Doll (yellow))",
    "category": "artifacts",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ef/Strange_Doll_(yellow).png",
    "sprite": "coin_gold",
    "role": "黃色奇怪人偶"
  },
  {
    "id": "sdv_emerald",
    "name": "祖母綠 (Emerald)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Emerald.png",
    "sprite": "gem_diamond",
    "role": "綠色寶石"
  },
  {
    "id": "sdv_aquamarine",
    "name": "海藍寶石 (Aquamarine)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a2/Aquamarine.png",
    "sprite": "gem_diamond",
    "role": "藍色寶石"
  },
  {
    "id": "sdv_ruby",
    "name": "紅寶石 (Ruby)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Ruby.png",
    "sprite": "gem_diamond",
    "role": "紅色寶石"
  },
  {
    "id": "sdv_amethyst",
    "name": "紫水晶 (Amethyst)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Amethyst.png",
    "sprite": "gem_diamond",
    "role": "紫色水晶"
  },
  {
    "id": "sdv_topaz",
    "name": "黃水晶 (Topaz)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Topaz.png",
    "sprite": "gem_diamond",
    "role": "黃色寶石"
  },
  {
    "id": "sdv_jade",
    "name": "翡翠 (Jade)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Jade.png",
    "sprite": "gem_diamond",
    "role": "綠色翡翠"
  },
  {
    "id": "sdv_diamond",
    "name": "鑽石 (Diamond)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ea/Diamond.png",
    "sprite": "gem_diamond",
    "role": "最珍貴寶石"
  },
  {
    "id": "sdv_earth_crystal",
    "name": "地晶石 (Earth Crystal)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/74/Earth_Crystal.png",
    "sprite": "gem_diamond",
    "role": "大地結晶"
  },
  {
    "id": "sdv_frozen_tear",
    "name": "淚晶石 (Frozen Tear)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ec/Frozen_Tear.png",
    "sprite": "gem_diamond",
    "role": "冰凍淚滴"
  },
  {
    "id": "sdv_fire_quartz",
    "name": "火水晶 (Fire Quartz)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5b/Fire_Quartz.png",
    "sprite": "gem_diamond",
    "role": "火焰水晶"
  },
  {
    "id": "sdv_quartz",
    "name": "石英 (Quartz)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cf/Quartz.png",
    "sprite": "gem_diamond",
    "role": "普通水晶"
  },
  {
    "id": "sdv_aerinite",
    "name": "青泥石 (Aerinite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6b/Aerinite.png",
    "sprite": "gem_diamond",
    "role": "藍色礦物"
  },
  {
    "id": "sdv_alamite",
    "name": "阿拉邁石 (Alamite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7c/Alamite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_baryte",
    "name": "重晶石 (Baryte)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Baryte.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_basalt",
    "name": "玄武岩 (Basalt)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/22/Basalt.png",
    "sprite": "gem_diamond",
    "role": "黑色火山岩"
  },
  {
    "id": "sdv_bixite",
    "name": "比克斯石 (Bixite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/98/Bixite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_calcite",
    "name": "方解石 (Calcite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Calcite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_celestine",
    "name": "天青石 (Celestine)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/19/Celestine.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_dolomite",
    "name": "白雲石 (Dolomite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d4/Dolomite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_esperite",
    "name": "埃斯佩石 (Esperite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Esperite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_fairy_stone",
    "name": "仙女石 (Fairy Stone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d9/Fairy_Stone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_fire_opal",
    "name": "火蛋白石 (Fire Opal)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/60/Fire_Opal.png",
    "sprite": "gem_diamond",
    "role": "火焰蛋白石"
  },
  {
    "id": "sdv_fluorapatite",
    "name": "氟磷灰石 (Fluorapatite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4a/Fluorapatite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_geminite",
    "name": "雙子石 (Geminite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/54/Geminite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_ghost_crystal",
    "name": "幽靈水晶 (Ghost Crystal)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d0/Ghost_Crystal.png",
    "sprite": "gem_diamond",
    "role": "透明水晶"
  },
  {
    "id": "sdv_granite",
    "name": "花崗岩 (Granite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4a/Granite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_helvite",
    "name": "日光榴石 (Helvite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3f/Helvite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_hematite",
    "name": "赤鐵礦 (Hematite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b1/Hematite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_jagoite",
    "name": "雅戈石 (Jagoite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Jagoite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_jamborite",
    "name": "詹博石 (Jamborite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Jamborite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_kyanite",
    "name": "藍晶石 (Kyanite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e4/Kyanite.png",
    "sprite": "gem_diamond",
    "role": "藍色晶石"
  },
  {
    "id": "sdv_lemon_stone",
    "name": "檸檬石 (Lemon Stone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Lemon_Stone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_limestone",
    "name": "石灰石 (Limestone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Limestone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_lunarite",
    "name": "月亮石 (Lunarite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/06/Lunarite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_malachite",
    "name": "孔雀石 (Malachite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Malachite.png",
    "sprite": "gem_diamond",
    "role": "綠色礦物"
  },
  {
    "id": "sdv_marble",
    "name": "大理石 (Marble)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/82/Marble.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_mudstone",
    "name": "泥岩 (Mudstone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Mudstone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_nekoite",
    "name": "內科石 (Nekoite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Nekoite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_neptunite",
    "name": "海王石 (Neptunite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/05/Neptunite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_obsidian",
    "name": "黑曜石 (Obsidian)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/23/Obsidian.png",
    "sprite": "gem_diamond",
    "role": "黑色火山玻璃"
  },
  {
    "id": "sdv_ocean_stone",
    "name": "海洋石 (Ocean Stone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Ocean_Stone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_opal",
    "name": "蛋白石 (Opal)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3c/Opal.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_orpiment",
    "name": "雌黃 (Orpiment)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/41/Orpiment.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_petrified_slime",
    "name": "石化史萊姆 (Petrified Slime)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/24/Petrified_Slime.png",
    "sprite": "gem_diamond",
    "role": "史萊姆化石"
  },
  {
    "id": "sdv_pyrite",
    "name": "黃鐵礦 (Pyrite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/64/Pyrite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_sandstone",
    "name": "砂岩 (Sandstone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d6/Sandstone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_selenite",
    "name": "透石膏 (Selenite)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5f/Selenite.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_slate",
    "name": "板岩 (Slate)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Slate.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_soapstone",
    "name": "皂石 (Soapstone)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/81/Soapstone.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_star_shards",
    "name": "星之碎片 (Star Shards)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3f/Star_Shards.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_tigerseye",
    "name": "虎眼石 (Tigerseye)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Tigerseye.png",
    "sprite": "gem_diamond",
    "role": "虎紋寶石"
  },
  {
    "id": "sdv_thunder_egg",
    "name": "雷蛋石 (Thunder Egg)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/14/Thunder_Egg.png",
    "sprite": "gem_diamond",
    "role": "博物館礦物"
  },
  {
    "id": "sdv_geode",
    "name": "晶球 (Geode)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/43/Geode.png",
    "sprite": "gem_diamond",
    "role": "敲開有礦物"
  },
  {
    "id": "sdv_frozen_geode",
    "name": "冰封晶球 (Frozen Geode)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bf/Frozen_Geode.png",
    "sprite": "gem_diamond",
    "role": "冬季晶球"
  },
  {
    "id": "sdv_magma_geode",
    "name": "岩漿晶球 (Magma Geode)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/89/Magma_Geode.png",
    "sprite": "gem_diamond",
    "role": "礦井深層晶球"
  },
  {
    "id": "sdv_omni_geode",
    "name": "萬象晶球 (Omni Geode)",
    "category": "minerals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/09/Omni_Geode.png",
    "sprite": "gem_diamond",
    "role": "什麼都可能開出"
  },
  {
    "id": "sdv_large_egg",
    "name": "大雞蛋 (Large Egg)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5d/Large_Egg.png",
    "sprite": "chicken",
    "role": "大隻新鮮雞蛋"
  },
  {
    "id": "sdv_duck_egg",
    "name": "鴨蛋 (Duck Egg)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Duck_Egg.png",
    "sprite": "chicken",
    "role": "鴨子下的蛋"
  },
  {
    "id": "sdv_duck_feather",
    "name": "鴨毛 (Duck Feather)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Duck_Feather.png",
    "sprite": "chicken",
    "role": "幸運鴨毛"
  },
  {
    "id": "sdv_wool",
    "name": "羊毛 (Wool)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/34/Wool.png",
    "sprite": "chicken",
    "role": "蓬鬆羊毛"
  },
  {
    "id": "sdv_large_milk",
    "name": "大瓶牛奶 (Large Milk)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/67/Large_Milk.png",
    "sprite": "chicken",
    "role": "大瓶鮮牛奶"
  },
  {
    "id": "sdv_goat_milk",
    "name": "羊奶 (Goat Milk)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/45/Goat_Milk.png",
    "sprite": "chicken",
    "role": "山羊鮮奶"
  },
  {
    "id": "sdv_large_goat_milk",
    "name": "大瓶羊奶 (Large Goat Milk)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Large_Goat_Milk.png",
    "sprite": "chicken",
    "role": "大瓶山羊奶"
  },
  {
    "id": "sdv_ostrich_egg",
    "name": "鴕鳥蛋 (Ostrich Egg)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Ostrich_Egg.png",
    "sprite": "chicken",
    "role": "巨型鴕鳥蛋"
  },
  {
    "id": "sdv_golden_egg",
    "name": "金蛋 (Golden Egg)",
    "category": "animal_products",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Golden_Egg.png",
    "sprite": "chicken",
    "role": "黃金母雞金蛋"
  },
  {
    "id": "sdv_wine",
    "name": "葡萄酒 (Wine)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Wine.png",
    "sprite": "coin_gold",
    "role": "果酒佳釀"
  },
  {
    "id": "sdv_juice",
    "name": "果汁 (Juice)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Juice.png",
    "sprite": "coin_gold",
    "role": "蔬菜果汁"
  },
  {
    "id": "sdv_beer",
    "name": "啤酒 (Beer)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b3/Beer.png",
    "sprite": "coin_gold",
    "role": "小麥啤酒"
  },
  {
    "id": "sdv_pale_ale",
    "name": "淡啤酒 (Pale Ale)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/Pale_Ale.png",
    "sprite": "coin_gold",
    "role": "啤酒花淡啤"
  },
  {
    "id": "sdv_mead",
    "name": "蜂蜜酒 (Mead)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/84/Mead.png",
    "sprite": "coin_gold",
    "role": "蜂蜜釀酒"
  },
  {
    "id": "sdv_green_tea",
    "name": "綠茶 (Green Tea)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8f/Green_Tea.png",
    "sprite": "coin_gold",
    "role": "清香綠茶"
  },
  {
    "id": "sdv_goat_cheese",
    "name": "山羊奶酪 (Goat Cheese)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c8/Goat_Cheese.png",
    "sprite": "coin_gold",
    "role": "山羊起司"
  },
  {
    "id": "sdv_duck_mayonnaise",
    "name": "鴨蛋黃醬 (Duck Mayonnaise)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/23/Duck_Mayonnaise.png",
    "sprite": "coin_gold",
    "role": "鴨蛋製蛋黃醬"
  },
  {
    "id": "sdv_dinosaur_mayonnaise",
    "name": "恐龍蛋黃醬 (Dinosaur Mayonnaise)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Dinosaur_Mayonnaise.png",
    "sprite": "coin_gold",
    "role": "恐龍蛋製蛋黃醬"
  },
  {
    "id": "sdv_jelly",
    "name": "果醬 (Jelly)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/05/Jelly.png",
    "sprite": "coin_gold",
    "role": "水果果醬"
  },
  {
    "id": "sdv_pickles",
    "name": "醃菜 (Pickles)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c7/Pickles.png",
    "sprite": "coin_gold",
    "role": "醃製蔬菜"
  },
  {
    "id": "sdv_roe",
    "name": "魚籽 (Roe)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/56/Roe.png",
    "sprite": "coin_gold",
    "role": "新鮮魚籽"
  },
  {
    "id": "sdv_aged_roe",
    "name": "陳年魚籽 (Aged Roe)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0e/Aged_Roe.png",
    "sprite": "coin_gold",
    "role": "陳年魚籽"
  },
  {
    "id": "sdv_caviar",
    "name": "魚子醬 (Caviar)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/89/Caviar.png",
    "sprite": "coin_gold",
    "role": "鱘魚魚子醬"
  },
  {
    "id": "sdv_honey",
    "name": "蜂蜜 (Honey)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Honey.png",
    "sprite": "coin_gold",
    "role": "花香蜂蜜"
  },
  {
    "id": "sdv_cloth",
    "name": "布料 (Cloth)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Cloth.png",
    "sprite": "coin_gold",
    "role": "羊毛織布"
  },
  {
    "id": "sdv_dried_fruit",
    "name": "果乾 (Dried Fruit)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/66/Dried_Fruit.png",
    "sprite": "coin_gold",
    "role": "乾燥水果"
  },
  {
    "id": "sdv_dried_mushrooms",
    "name": "乾蘑菇 (Dried Mushrooms)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Dried_Mushrooms.png",
    "sprite": "coin_gold",
    "role": "乾燥蘑菇"
  },
  {
    "id": "sdv_smoked_fish",
    "name": "煙燻魚 (Smoked Fish)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4c/Smoked_Fish.png",
    "sprite": "coin_gold",
    "role": "煙燻鮮魚"
  },
  {
    "id": "sdv_truffle_oil",
    "name": "松露油 (Truffle Oil)",
    "category": "artisan",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Truffle_Oil.png",
    "sprite": "coin_gold",
    "role": "松露製香油"
  },
  {
    "id": "sdv_wood",
    "name": "木材 (Wood)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/df/Wood.png",
    "sprite": "clover",
    "role": "建築基本材料"
  },
  {
    "id": "sdv_hardwood",
    "name": "硬木 (Hardwood)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Hardwood.png",
    "sprite": "clover",
    "role": "堅硬木材"
  },
  {
    "id": "sdv_stone",
    "name": "石頭 (Stone)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d4/Stone.png",
    "sprite": "clover",
    "role": "建築石材"
  },
  {
    "id": "sdv_fiber",
    "name": "植物纖維 (Fiber)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/45/Fiber.png",
    "sprite": "clover",
    "role": "雜草纖維"
  },
  {
    "id": "sdv_sap",
    "name": "樹液 (Sap)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Sap.png",
    "sprite": "clover",
    "role": "樹木汁液"
  },
  {
    "id": "sdv_coal",
    "name": "煤炭 (Coal)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a7/Coal.png",
    "sprite": "clover",
    "role": "黑色煤炭"
  },
  {
    "id": "sdv_copper_ore",
    "name": "銅礦石 (Copper Ore)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/Copper_Ore.png",
    "sprite": "clover",
    "role": "銅色礦石"
  },
  {
    "id": "sdv_copper_bar",
    "name": "銅錠 (Copper Bar)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Copper_Bar.png",
    "sprite": "clover",
    "role": "銅製金屬錠"
  },
  {
    "id": "sdv_iron_ore",
    "name": "鐵礦石 (Iron Ore)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Iron_Ore.png",
    "sprite": "clover",
    "role": "鐵色礦石"
  },
  {
    "id": "sdv_iron_bar",
    "name": "鐵錠 (Iron Bar)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6c/Iron_Bar.png",
    "sprite": "clover",
    "role": "鐵製金屬錠"
  },
  {
    "id": "sdv_gold_ore",
    "name": "金礦石 (Gold Ore)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f7/Gold_Ore.png",
    "sprite": "clover",
    "role": "金色礦石"
  },
  {
    "id": "sdv_iridium_ore",
    "name": "銥礦石 (Iridium Ore)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Iridium_Ore.png",
    "sprite": "clover",
    "role": "紫色銥礦"
  },
  {
    "id": "sdv_radioactive_ore",
    "name": "放射性礦石 (Radioactive Ore)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Radioactive_Ore.png",
    "sprite": "clover",
    "role": "綠色放射礦"
  },
  {
    "id": "sdv_radioactive_bar",
    "name": "放射性錠 (Radioactive Bar)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Radioactive_Bar.png",
    "sprite": "clover",
    "role": "放射性金屬錠"
  },
  {
    "id": "sdv_battery_pack",
    "name": "電池組 (Battery Pack)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Battery_Pack.png",
    "sprite": "clover",
    "role": "避雷針發電"
  },
  {
    "id": "sdv_refined_quartz",
    "name": "精煉石英 (Refined Quartz)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/98/Refined_Quartz.png",
    "sprite": "clover",
    "role": "精煉水晶"
  },
  {
    "id": "sdv_clay",
    "name": "粘土 (Clay)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a2/Clay.png",
    "sprite": "clover",
    "role": "挖地粘土"
  },
  {
    "id": "sdv_solar_essence",
    "name": "太陽精華 (Solar Essence)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Solar_Essence.png",
    "sprite": "clover",
    "role": "金色太陽精華"
  },
  {
    "id": "sdv_void_essence",
    "name": "虛空精華 (Void Essence)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1f/Void_Essence.png",
    "sprite": "clover",
    "role": "紫色虛空精華"
  },
  {
    "id": "sdv_slime",
    "name": "史萊姆泥 (Slime)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/38/Slime.png",
    "sprite": "clover",
    "role": "史萊姆掉落"
  },
  {
    "id": "sdv_bug_meat",
    "name": "蟲肉 (Bug Meat)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Bug_Meat.png",
    "sprite": "clover",
    "role": "蟲蟲肉塊"
  },
  {
    "id": "sdv_bat_wing",
    "name": "蝙蝠翅膀 (Bat Wing)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/35/Bat_Wing.png",
    "sprite": "clover",
    "role": "蝙蝠翅膀"
  },
  {
    "id": "sdv_bone_fragment",
    "name": "骨頭碎片 (Bone Fragment)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Bone_Fragment.png",
    "sprite": "clover",
    "role": "骨頭碎片"
  },
  {
    "id": "sdv_acorn",
    "name": "橡子 (Acorn)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cd/Acorn.png",
    "sprite": "clover",
    "role": "橡樹種子"
  },
  {
    "id": "sdv_maple_seed",
    "name": "楓樹種子 (Maple Seed)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/36/Maple_Seed.png",
    "sprite": "clover",
    "role": "楓樹種子"
  },
  {
    "id": "sdv_pine_cone",
    "name": "松果 (Pine Cone)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/90/Pine_Cone.png",
    "sprite": "clover",
    "role": "松樹種子"
  },
  {
    "id": "sdv_mahogany_seed",
    "name": "桃花心木種子 (Mahogany Seed)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/84/Mahogany_Seed.png",
    "sprite": "clover",
    "role": "桃花心木種子"
  },
  {
    "id": "sdv_oak_resin",
    "name": "橡樹樹脂 (Oak Resin)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/40/Oak_Resin.png",
    "sprite": "clover",
    "role": "橡樹樹脂"
  },
  {
    "id": "sdv_pine_tar",
    "name": "松焦油 (Pine Tar)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ce/Pine_Tar.png",
    "sprite": "clover",
    "role": "松樹焦油"
  },
  {
    "id": "sdv_field_snack",
    "name": "工作小食 (Field Snack)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Field_Snack.png",
    "sprite": "clover",
    "role": "種子做的小食"
  },
  {
    "id": "sdv_life_elixir",
    "name": "生命藥水 (Life Elixir)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Life_Elixir.png",
    "sprite": "clover",
    "role": "蘑菇生命藥水"
  },
  {
    "id": "sdv_oil_of_garlic",
    "name": "蒜油 (Oil of Garlic)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Oil_of_Garlic.png",
    "sprite": "clover",
    "role": "大蒜精油"
  },
  {
    "id": "sdv_bouquet",
    "name": "花束 (Bouquet)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/83/Bouquet.png",
    "sprite": "clover",
    "role": "求婚花束"
  },
  {
    "id": "sdv_mermaid_s_pendant",
    "name": "美人魚吊墜 (Mermaid's Pendant)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Mermaid%27s_Pendant.png",
    "sprite": "clover",
    "role": "美人魚餽贈吊墜"
  },
  {
    "id": "sdv_galaxy_soul",
    "name": "銀河之魂 (Galaxy Soul)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/17/Galaxy_Soul.png",
    "sprite": "clover",
    "role": "銀河武器強化"
  },
  {
    "id": "sdv_rain_totem",
    "name": "雨水圖騰 (Rain Totem)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f7/Rain_Totem.png",
    "sprite": "clover",
    "role": "召喚明日下雨"
  },
  {
    "id": "sdv_cherry_bomb",
    "name": "櫻桃炸彈 (Cherry Bomb)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Cherry_Bomb.png",
    "sprite": "clover",
    "role": "小型炸彈"
  },
  {
    "id": "sdv_bomb",
    "name": "炸彈 (Bomb)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Bomb.png",
    "sprite": "clover",
    "role": "中型炸彈"
  },
  {
    "id": "sdv_mystery_box",
    "name": "謎之盒 (Mystery Box)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/87/Mystery_Box.png",
    "sprite": "clover",
    "role": "神秘盒子"
  },
  {
    "id": "sdv_golden_mystery_box",
    "name": "金色謎之盒 (Golden Mystery Box)",
    "category": "resources",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Golden_Mystery_Box.png",
    "sprite": "clover",
    "role": "金色神秘盒子"
  },
  {
    "id": "sdv_trash_bear",
    "name": "垃圾熊 (Trash Bear)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5d/Trash_Bear.png",
    "sprite": "junimo",
    "role": "運河邊垃圾熊"
  },
  {
    "id": "sdv_old_mariner",
    "name": "老水手 (Old Mariner)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2b/Old_Mariner.png",
    "sprite": "junimo",
    "role": "海邊老水手"
  },
  {
    "id": "sdv_oak_chair",
    "name": "橡木椅 (Oak Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2a/Oak_Chair.png",
    "sprite": "chest_closed",
    "role": "橡木座椅"
  },
  {
    "id": "sdv_walnut_chair",
    "name": "胡桃木椅 (Walnut Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3f/Walnut_Chair.png",
    "sprite": "chest_closed",
    "role": "胡桃木座椅"
  },
  {
    "id": "sdv_birch_chair",
    "name": "樺木椅 (Birch Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0a/Birch_Chair.png",
    "sprite": "chest_closed",
    "role": "樺木座椅"
  },
  {
    "id": "sdv_mahogany_chair",
    "name": "桃花心木椅 (Mahogany Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ea/Mahogany_Chair.png",
    "sprite": "chest_closed",
    "role": "桃花心木座椅"
  },
  {
    "id": "sdv_country_chair",
    "name": "鄉村椅 (Country Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Country_Chair.png",
    "sprite": "chest_closed",
    "role": "鄉村風座椅"
  },
  {
    "id": "sdv_breakfast_chair",
    "name": "早餐椅 (Breakfast Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Breakfast_Chair.png",
    "sprite": "chest_closed",
    "role": "早餐座椅"
  },
  {
    "id": "sdv_crystal_chair",
    "name": "水晶椅 (Crystal Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/10/Crystal_Chair.png",
    "sprite": "chest_closed",
    "role": "水晶座椅"
  },
  {
    "id": "sdv_blue_diner_chair",
    "name": "藍色餐椅 (Blue Diner Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/08/Blue_Diner_Chair.png",
    "sprite": "chest_closed",
    "role": "藍色餐廳椅"
  },
  {
    "id": "sdv_red_diner_chair",
    "name": "紅色餐椅 (Red Diner Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/dd/Red_Diner_Chair.png",
    "sprite": "chest_closed",
    "role": "紅色餐廳椅"
  },
  {
    "id": "sdv_pink_office_chair",
    "name": "粉色辦公椅 (Pink Office Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e7/Pink_Office_Chair.png",
    "sprite": "chest_closed",
    "role": "粉色辦公椅"
  },
  {
    "id": "sdv_purple_office_chair",
    "name": "紫色辦公椅 (Purple Office Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/56/Purple_Office_Chair.png",
    "sprite": "chest_closed",
    "role": "紫色辦公椅"
  },
  {
    "id": "sdv_blue_stool",
    "name": "藍色凳子 (Blue Stool)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/32/Blue_Stool.png",
    "sprite": "chest_closed",
    "role": "藍色小凳"
  },
  {
    "id": "sdv_metal_chair",
    "name": "金屬椅 (Metal Chair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ae/Metal_Chair.png",
    "sprite": "chest_closed",
    "role": "金屬座椅"
  },
  {
    "id": "sdv_brown_armchair",
    "name": "棕色扶手椅 (Brown Armchair)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cf/Brown_Armchair.png",
    "sprite": "chest_closed",
    "role": "棕色扶手椅"
  },
  {
    "id": "sdv_brown_couch",
    "name": "棕色沙發 (Brown Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a6/Brown_Couch.png",
    "sprite": "chest_closed",
    "role": "棕色沙發"
  },
  {
    "id": "sdv_dark_couch",
    "name": "深色沙發 (Dark Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Dark_Couch.png",
    "sprite": "chest_closed",
    "role": "深色沙發"
  },
  {
    "id": "sdv_red_couch",
    "name": "紅色沙發 (Red Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ea/Red_Couch.png",
    "sprite": "chest_closed",
    "role": "紅色沙發"
  },
  {
    "id": "sdv_green_couch",
    "name": "綠色沙發 (Green Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/55/Green_Couch.png",
    "sprite": "chest_closed",
    "role": "綠色沙發"
  },
  {
    "id": "sdv_yellow_couch",
    "name": "黃色沙發 (Yellow Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d4/Yellow_Couch.png",
    "sprite": "chest_closed",
    "role": "黃色沙發"
  },
  {
    "id": "sdv_blue_couch",
    "name": "藍色沙發 (Blue Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/21/Blue_Couch.png",
    "sprite": "chest_closed",
    "role": "藍色沙發"
  },
  {
    "id": "sdv_large_brown_couch",
    "name": "大棕色沙發 (Large Brown Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/50/Large_Brown_Couch.png",
    "sprite": "chest_closed",
    "role": "大型棕色沙發"
  },
  {
    "id": "sdv_wizard_couch",
    "name": "巫師沙發 (Wizard Couch)",
    "category": "furniture_seats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/22/Wizard_Couch.png",
    "sprite": "chest_closed",
    "role": "巫師風沙發"
  },
  {
    "id": "sdv_oak_table",
    "name": "橡木桌 (Oak Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/15/Oak_Table.png",
    "sprite": "chest_closed",
    "role": "橡木桌"
  },
  {
    "id": "sdv_walnut_table",
    "name": "胡桃木桌 (Walnut Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6f/Walnut_Table.png",
    "sprite": "chest_closed",
    "role": "胡桃木桌"
  },
  {
    "id": "sdv_birch_table",
    "name": "樺木桌 (Birch Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/95/Birch_Table.png",
    "sprite": "chest_closed",
    "role": "樺木桌"
  },
  {
    "id": "sdv_mahogany_table",
    "name": "桃花心木桌 (Mahogany Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9c/Mahogany_Table.png",
    "sprite": "chest_closed",
    "role": "桃花心木桌"
  },
  {
    "id": "sdv_modern_table",
    "name": "現代桌 (Modern Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/72/Modern_Table.png",
    "sprite": "chest_closed",
    "role": "現代風桌"
  },
  {
    "id": "sdv_coffee_table",
    "name": "咖啡桌 (Coffee Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d6/Coffee_Table.png",
    "sprite": "chest_closed",
    "role": "客廳咖啡桌"
  },
  {
    "id": "sdv_puzzle_table",
    "name": "拼圖桌 (Puzzle Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Puzzle_Table.png",
    "sprite": "chest_closed",
    "role": "拼圖桌"
  },
  {
    "id": "sdv_luau_table",
    "name": "盧奧桌 (Luau Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/55/Luau_Table.png",
    "sprite": "chest_closed",
    "role": "盧奧節桌"
  },
  {
    "id": "sdv_dark_table",
    "name": "深色桌 (Dark Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6d/Dark_Table.png",
    "sprite": "chest_closed",
    "role": "深色桌"
  },
  {
    "id": "sdv_candy_table",
    "name": "糖果桌 (Candy Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ce/Candy_Table.png",
    "sprite": "chest_closed",
    "role": "糖果桌"
  },
  {
    "id": "sdv_festive_dining_table",
    "name": "節日餐桌 (Festive Dining Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Festive_Dining_Table.png",
    "sprite": "chest_closed",
    "role": "節日餐桌"
  },
  {
    "id": "sdv_winter_dining_table",
    "name": "冬季餐桌 (Winter Dining Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/de/Winter_Dining_Table.png",
    "sprite": "chest_closed",
    "role": "冬季餐桌"
  },
  {
    "id": "sdv_pub_table",
    "name": "酒吧桌 (Pub Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/34/Pub_Table.png",
    "sprite": "chest_closed",
    "role": "酒吧高桌"
  },
  {
    "id": "sdv_oak_end_table",
    "name": "橡木邊桌 (Oak End Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Oak_End_Table.png",
    "sprite": "chest_closed",
    "role": "橡木邊桌"
  },
  {
    "id": "sdv_walnut_end_table",
    "name": "胡桃木邊桌 (Walnut End Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5a/Walnut_End_Table.png",
    "sprite": "chest_closed",
    "role": "胡桃木邊桌"
  },
  {
    "id": "sdv_birch_end_table",
    "name": "樺木邊桌 (Birch End Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6a/Birch_End_Table.png",
    "sprite": "chest_closed",
    "role": "樺木邊桌"
  },
  {
    "id": "sdv_mahogany_end_table",
    "name": "桃花心木邊桌 (Mahogany End Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/63/Mahogany_End_Table.png",
    "sprite": "chest_closed",
    "role": "桃花心木邊桌"
  },
  {
    "id": "sdv_modern_end_table",
    "name": "現代邊桌 (Modern End Table)",
    "category": "furniture_tables",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Modern_End_Table.png",
    "sprite": "chest_closed",
    "role": "現代邊桌"
  },
  {
    "id": "sdv_oak_dresser",
    "name": "橡木梳妝台 (Oak Dresser)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/37/Oak_Dresser.png",
    "sprite": "chest_closed",
    "role": "橡木梳妝台"
  },
  {
    "id": "sdv_walnut_dresser",
    "name": "胡桃木梳妝台 (Walnut Dresser)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/be/Walnut_Dresser.png",
    "sprite": "chest_closed",
    "role": "胡桃木梳妝台"
  },
  {
    "id": "sdv_birch_dresser",
    "name": "樺木梳妝台 (Birch Dresser)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Birch_Dresser.png",
    "sprite": "chest_closed",
    "role": "樺木梳妝台"
  },
  {
    "id": "sdv_mahogany_dresser",
    "name": "桃花心木梳妝台 (Mahogany Dresser)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/00/Mahogany_Dresser.png",
    "sprite": "chest_closed",
    "role": "桃花心木梳妝台"
  },
  {
    "id": "sdv_dark_bookcase",
    "name": "深色書櫃 (Dark Bookcase)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cd/Dark_Bookcase.png",
    "sprite": "chest_closed",
    "role": "深色書櫃"
  },
  {
    "id": "sdv_modern_bookcase",
    "name": "現代書櫃 (Modern Bookcase)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/88/Modern_Bookcase.png",
    "sprite": "chest_closed",
    "role": "現代書櫃"
  },
  {
    "id": "sdv_birch_double_bed",
    "name": "樺木雙人床 (Birch Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/33/Birch_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "樺木雙人床"
  },
  {
    "id": "sdv_pirate_double_bed",
    "name": "海盜雙人床 (Pirate Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ac/Pirate_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "海盜雙人床"
  },
  {
    "id": "sdv_tropical_bed",
    "name": "熱帶床 (Tropical Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Tropical_Bed.png",
    "sprite": "chest_closed",
    "role": "熱帶單人床"
  },
  {
    "id": "sdv_tropical_double_bed",
    "name": "熱帶雙人床 (Tropical Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Tropical_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "熱帶雙人床"
  },
  {
    "id": "sdv_starry_double_bed",
    "name": "星空雙人床 (Starry Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a6/Starry_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "星空雙人床"
  },
  {
    "id": "sdv_strawberry_double_bed",
    "name": "草莓雙人床 (Strawberry Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/35/Strawberry_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "草莓雙人床"
  },
  {
    "id": "sdv_modern_double_bed",
    "name": "現代雙人床 (Modern Double Bed)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8d/Modern_Double_Bed.png",
    "sprite": "chest_closed",
    "role": "現代雙人床"
  },
  {
    "id": "sdv_small_fish_tank",
    "name": "小魚缸 (Small Fish Tank)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/79/Small_Fish_Tank.png",
    "sprite": "chest_closed",
    "role": "小型魚缸"
  },
  {
    "id": "sdv_modern_fish_tank",
    "name": "現代魚缸 (Modern Fish Tank)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Modern_Fish_Tank.png",
    "sprite": "chest_closed",
    "role": "現代魚缸"
  },
  {
    "id": "sdv_large_fish_tank",
    "name": "大魚缸 (Large Fish Tank)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Large_Fish_Tank.png",
    "sprite": "chest_closed",
    "role": "大型魚缸"
  },
  {
    "id": "sdv_deluxe_fish_tank",
    "name": "豪華魚缸 (Deluxe Fish Tank)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Deluxe_Fish_Tank.png",
    "sprite": "chest_closed",
    "role": "豪華魚缸"
  },
  {
    "id": "sdv_aquatic_sanctuary",
    "name": "水生庇護缸 (Aquatic Sanctuary)",
    "category": "furniture_beds",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/14/Aquatic_Sanctuary.png",
    "sprite": "chest_closed",
    "role": "水生庇護缸"
  },
  {
    "id": "sdv_blossom_rug",
    "name": "花朵地毯 (Blossom Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/67/Blossom_Rug.png",
    "sprite": "chest_open",
    "role": "花朵地毯"
  },
  {
    "id": "sdv_bone_rug",
    "name": "骨頭地毯 (Bone Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f5/Bone_Rug.png",
    "sprite": "chest_open",
    "role": "骨頭地毯"
  },
  {
    "id": "sdv_bouquet_rug",
    "name": "花束地毯 (Bouquet Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f0/Bouquet_Rug.png",
    "sprite": "chest_open",
    "role": "花束地毯"
  },
  {
    "id": "sdv_burlap_rug",
    "name": "麻布地毯 (Burlap Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/49/Burlap_Rug.png",
    "sprite": "chest_open",
    "role": "麻布地毯"
  },
  {
    "id": "sdv_dark_rug",
    "name": "深色地毯 (Dark Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e8/Dark_Rug.png",
    "sprite": "chest_open",
    "role": "深色地毯"
  },
  {
    "id": "sdv_fruit_salad_rug",
    "name": "水果沙拉地毯 (Fruit Salad Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7c/Fruit_Salad_Rug.png",
    "sprite": "chest_open",
    "role": "水果沙拉地毯"
  },
  {
    "id": "sdv_funky_rug",
    "name": "放克地毯 (Funky Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/63/Funky_Rug.png",
    "sprite": "chest_open",
    "role": "放克地毯"
  },
  {
    "id": "sdv_green_cottage_rug",
    "name": "綠色小屋地毯 (Green Cottage Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Green_Cottage_Rug.png",
    "sprite": "chest_open",
    "role": "綠色小屋地毯"
  },
  {
    "id": "sdv_red_cottage_rug",
    "name": "紅色小屋地毯 (Red Cottage Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Red_Cottage_Rug.png",
    "sprite": "chest_open",
    "role": "紅色小屋地毯"
  },
  {
    "id": "sdv_icy_rug",
    "name": "冰霜地毯 (Icy Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/68/Icy_Rug.png",
    "sprite": "chest_open",
    "role": "冰霜地毯"
  },
  {
    "id": "sdv_large_green_rug",
    "name": "大綠地毯 (Large Green Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Large_Green_Rug.png",
    "sprite": "chest_open",
    "role": "大型綠地毯"
  },
  {
    "id": "sdv_large_cottage_rug",
    "name": "大小屋地毯 (Large Cottage Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7c/Large_Cottage_Rug.png",
    "sprite": "chest_open",
    "role": "大型小屋地毯"
  },
  {
    "id": "sdv_large_red_rug",
    "name": "大紅地毯 (Large Red Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Large_Red_Rug.png",
    "sprite": "chest_open",
    "role": "大型紅地毯"
  },
  {
    "id": "sdv_light_green_rug",
    "name": "淺綠地毯 (Light Green Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ec/Light_Green_Rug.png",
    "sprite": "chest_open",
    "role": "淺綠地毯"
  },
  {
    "id": "sdv_monster_rug",
    "name": "怪物地毯 (Monster Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/74/Monster_Rug.png",
    "sprite": "chest_open",
    "role": "怪物地毯"
  },
  {
    "id": "sdv_mystic_rug",
    "name": "神秘地毯 (Mystic Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bb/Mystic_Rug.png",
    "sprite": "chest_open",
    "role": "神秘地毯"
  },
  {
    "id": "sdv_nautical_rug",
    "name": "航海地毯 (Nautical Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Nautical_Rug.png",
    "sprite": "chest_open",
    "role": "航海地毯"
  },
  {
    "id": "sdv_oceanic_rug",
    "name": "海洋地毯 (Oceanic Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Oceanic_Rug.png",
    "sprite": "chest_open",
    "role": "海洋地毯"
  },
  {
    "id": "sdv_old_world_rug",
    "name": "舊世界地毯 (Old World Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a3/Old_World_Rug.png",
    "sprite": "chest_open",
    "role": "舊世界地毯"
  },
  {
    "id": "sdv_patchwork_rug",
    "name": "拼布地毯 (Patchwork Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b3/Patchwork_Rug.png",
    "sprite": "chest_open",
    "role": "拼布地毯"
  },
  {
    "id": "sdv_pirate_rug",
    "name": "海盜地毯 (Pirate Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Pirate_Rug.png",
    "sprite": "chest_open",
    "role": "海盜地毯"
  },
  {
    "id": "sdv_red_rug",
    "name": "紅地毯 (Red Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/91/Red_Rug.png",
    "sprite": "chest_open",
    "role": "紅色地毯"
  },
  {
    "id": "sdv_snowy_rug",
    "name": "雪地地毯 (Snowy Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/48/Snowy_Rug.png",
    "sprite": "chest_open",
    "role": "雪地地毯"
  },
  {
    "id": "sdv_woodcut_rug",
    "name": "伐木地毯 (Woodcut Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Woodcut_Rug.png",
    "sprite": "chest_open",
    "role": "伐木地毯"
  },
  {
    "id": "sdv_floral_rug",
    "name": "花卉地毯 (Floral Rug)",
    "category": "decor_rugs",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6c/Floral_Rug.png",
    "sprite": "chest_open",
    "role": "花卉地毯"
  },
  {
    "id": "sdv_box_lamp",
    "name": "盒子燈 (Box Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Box_Lamp.png",
    "sprite": "star_full",
    "role": "盒子燈"
  },
  {
    "id": "sdv_candle_lamp",
    "name": "蠟燭燈 (Candle Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Candle_Lamp.png",
    "sprite": "star_full",
    "role": "蠟燭燈"
  },
  {
    "id": "sdv_classic_lamp",
    "name": "經典燈 (Classic Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/20/Classic_Lamp.png",
    "sprite": "star_full",
    "role": "經典台燈"
  },
  {
    "id": "sdv_country_lamp",
    "name": "鄉村燈 (Country Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Country_Lamp.png",
    "sprite": "star_full",
    "role": "鄉村台燈"
  },
  {
    "id": "sdv_modern_lamp",
    "name": "現代燈 (Modern Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Modern_Lamp.png",
    "sprite": "star_full",
    "role": "現代台燈"
  },
  {
    "id": "sdv_ornate_lamp",
    "name": "華麗燈 (Ornate Lamp)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7d/Ornate_Lamp.png",
    "sprite": "star_full",
    "role": "華麗台燈"
  },
  {
    "id": "sdv_brick_fireplace",
    "name": "磚壁爐 (Brick Fireplace)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Brick_Fireplace.png",
    "sprite": "star_full",
    "role": "磚砌壁爐"
  },
  {
    "id": "sdv_stone_fireplace",
    "name": "石壁爐 (Stone Fireplace)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c2/Stone_Fireplace.png",
    "sprite": "star_full",
    "role": "石砌壁爐"
  },
  {
    "id": "sdv_stove_fireplace",
    "name": "火爐壁爐 (Stove Fireplace)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/66/Stove_Fireplace.png",
    "sprite": "star_full",
    "role": "火爐壁爐"
  },
  {
    "id": "sdv_iridium_fireplace",
    "name": "銥金壁爐 (Iridium Fireplace)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/35/Iridium_Fireplace.png",
    "sprite": "star_full",
    "role": "銥金壁爐"
  },
  {
    "id": "sdv_elegant_fireplace",
    "name": "優雅壁爐 (Elegant Fireplace)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Elegant_Fireplace.png",
    "sprite": "star_full",
    "role": "優雅壁爐"
  },
  {
    "id": "sdv_torch",
    "name": "火炬 (Torch)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b2/Torch.png",
    "sprite": "star_full",
    "role": "戶外火炬"
  },
  {
    "id": "sdv_campfire",
    "name": "營火 (Campfire)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Campfire.png",
    "sprite": "star_full",
    "role": "戶外營火"
  },
  {
    "id": "sdv_gold_brazier",
    "name": "金火盆 (Gold Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b7/Gold_Brazier.png",
    "sprite": "star_full",
    "role": "金色火盆"
  },
  {
    "id": "sdv_wooden_brazier",
    "name": "木火盆 (Wooden Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/34/Wooden_Brazier.png",
    "sprite": "star_full",
    "role": "木製火盆"
  },
  {
    "id": "sdv_stone_brazier",
    "name": "石火盆 (Stone Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Stone_Brazier.png",
    "sprite": "star_full",
    "role": "石製火盆"
  },
  {
    "id": "sdv_barrel_brazier",
    "name": "木桶火盆 (Barrel Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/Barrel_Brazier.png",
    "sprite": "star_full",
    "role": "木桶火盆"
  },
  {
    "id": "sdv_skull_brazier",
    "name": "骷髏火盆 (Skull Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Skull_Brazier.png",
    "sprite": "star_full",
    "role": "骷髏火盆"
  },
  {
    "id": "sdv_carved_brazier",
    "name": "雕刻火盆 (Carved Brazier)",
    "category": "decor_lighting",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3c/Carved_Brazier.png",
    "sprite": "star_full",
    "role": "雕刻火盆"
  },
  {
    "id": "sdv_house_plant",
    "name": "室內植物 (House Plant)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/House_Plant.png",
    "sprite": "sunflower",
    "role": "室內盆栽"
  },
  {
    "id": "sdv_bonsai_tree",
    "name": "盆景樹 (Bonsai Tree)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b4/Bonsai_Tree.png",
    "sprite": "sunflower",
    "role": "盆景"
  },
  {
    "id": "sdv_indoor_palm",
    "name": "室內棕櫚 (Indoor Palm)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Indoor_Palm.png",
    "sprite": "sunflower",
    "role": "室內棕櫚"
  },
  {
    "id": "sdv_long_cactus",
    "name": "長仙人掌 (Long Cactus)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/27/Long_Cactus.png",
    "sprite": "sunflower",
    "role": "長仙人掌"
  },
  {
    "id": "sdv_long_palm",
    "name": "長棕櫚 (Long Palm)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Long_Palm.png",
    "sprite": "sunflower",
    "role": "長棕櫚"
  },
  {
    "id": "sdv_small_plant",
    "name": "小植物 (Small Plant)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f3/Small_Plant.png",
    "sprite": "sunflower",
    "role": "小盆栽"
  },
  {
    "id": "sdv_tall_house_plant",
    "name": "高身植物 (Tall House Plant)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/97/Tall_House_Plant.png",
    "sprite": "sunflower",
    "role": "高身盆栽"
  },
  {
    "id": "sdv_table_plant",
    "name": "桌上植物 (Table Plant)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/43/Table_Plant.png",
    "sprite": "sunflower",
    "role": "桌上盆栽"
  },
  {
    "id": "sdv_tree_column",
    "name": "樹柱 (Tree Column)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9a/Tree_Column.png",
    "sprite": "sunflower",
    "role": "樹形柱"
  },
  {
    "id": "sdv_deluxe_tree",
    "name": "豪華樹 (Deluxe Tree)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Deluxe_Tree.png",
    "sprite": "sunflower",
    "role": "豪華裝飾樹"
  },
  {
    "id": "sdv_exotic_tree",
    "name": "異國樹 (Exotic Tree)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/11/Exotic_Tree.png",
    "sprite": "sunflower",
    "role": "異國裝飾樹"
  },
  {
    "id": "sdv_garden_pot",
    "name": "花盆 (Garden Pot)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2c/Garden_Pot.png",
    "sprite": "sunflower",
    "role": "園藝花盆"
  },
  {
    "id": "sdv_jack_o_lantern",
    "name": "南瓜燈 (Jack-O-Lantern)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/17/Jack-O-Lantern.png",
    "sprite": "sunflower",
    "role": "萬靈節南瓜燈"
  },
  {
    "id": "sdv_grave_stone",
    "name": "墓碑 (Grave Stone)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fe/Grave_Stone.png",
    "sprite": "sunflower",
    "role": "墓碑裝飾"
  },
  {
    "id": "sdv_tub_o_flowers",
    "name": "花桶 (Tub o' Flowers)",
    "category": "decor_plants",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d9/Tub_o%27_Flowers.png",
    "sprite": "sunflower",
    "role": "花桶裝飾"
  },
  {
    "id": "sdv_my_first_painting",
    "name": "我的第一幅畫 (My First Painting)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b3/My_First_Painting.png",
    "sprite": "scroll",
    "role": "名畫"
  },
  {
    "id": "sdv_foliage_print",
    "name": "葉子版畫 (Foliage Print)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b7/Foliage_Print.png",
    "sprite": "scroll",
    "role": "夜市版畫"
  },
  {
    "id": "sdv_icy_banner",
    "name": "冰霜橫幅 (Icy Banner)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/ba/Icy_Banner.png",
    "sprite": "scroll",
    "role": "夜市橫幅"
  },
  {
    "id": "sdv_ornate_window",
    "name": "華麗窗戶 (Ornate Window)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Ornate_Window.png",
    "sprite": "scroll",
    "role": "華麗窗戶"
  },
  {
    "id": "sdv_small_window",
    "name": "小窗戶 (Small Window)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Small_Window.png",
    "sprite": "scroll",
    "role": "小窗戶"
  },
  {
    "id": "sdv_porthole",
    "name": "舷窗 (Porthole)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f7/Porthole.png",
    "sprite": "scroll",
    "role": "圓形舷窗"
  },
  {
    "id": "sdv_calendar",
    "name": "牆上日曆 (Calendar)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/15/Calendar.png",
    "sprite": "scroll",
    "role": "牆上日曆"
  },
  {
    "id": "sdv_ceiling_flags",
    "name": "天花板旗 (Ceiling Flags)",
    "category": "decor_wall",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a6/Ceiling_Flags.png",
    "sprite": "scroll",
    "role": "天花板旗幟"
  },
  {
    "id": "sdv_budget_tv",
    "name": "預算電視 (Budget TV)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Budget_TV.png",
    "sprite": "trophy",
    "role": "預算電視"
  },
  {
    "id": "sdv_plasma_tv",
    "name": "等離子電視 (Plasma TV)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/be/Plasma_TV.png",
    "sprite": "trophy",
    "role": "等離子電視"
  },
  {
    "id": "sdv_tropical_tv",
    "name": "熱帶電視 (Tropical TV)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/00/Tropical_TV.png",
    "sprite": "trophy",
    "role": "熱帶電視"
  },
  {
    "id": "sdv_retro_tv",
    "name": "復古電視 (Retro TV)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Retro_TV.png",
    "sprite": "trophy",
    "role": "復古電視"
  },
  {
    "id": "sdv_catalogue",
    "name": "目錄 (Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/49/Catalogue.png",
    "sprite": "trophy",
    "role": "皮埃爾目錄"
  },
  {
    "id": "sdv_furniture_catalogue",
    "name": "傢俬目錄 (Furniture Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e8/Furniture_Catalogue.png",
    "sprite": "trophy",
    "role": "傢俬目錄"
  },
  {
    "id": "sdv_retro_catalogue",
    "name": "復古目錄 (Retro Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/41/Retro_Catalogue.png",
    "sprite": "trophy",
    "role": "復古目錄"
  },
  {
    "id": "sdv_junimo_catalogue",
    "name": "祝尼魔目錄 (Junimo Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7f/Junimo_Catalogue.png",
    "sprite": "trophy",
    "role": "祝尼魔目錄"
  },
  {
    "id": "sdv_wizard_catalogue",
    "name": "巫師目錄 (Wizard Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Wizard_Catalogue.png",
    "sprite": "trophy",
    "role": "巫師目錄"
  },
  {
    "id": "sdv_trash_catalogue",
    "name": "垃圾目錄 (Trash Catalogue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/47/Trash_Catalogue.png",
    "sprite": "trophy",
    "role": "垃圾目錄"
  },
  {
    "id": "sdv_mini_jukebox",
    "name": "迷你點唱機 (Mini-Jukebox)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/02/Mini-Jukebox.png",
    "sprite": "trophy",
    "role": "迷你點唱機"
  },
  {
    "id": "sdv_sewing_machine",
    "name": "縫紉機 (Sewing Machine)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Sewing_Machine.png",
    "sprite": "trophy",
    "role": "縫紉機"
  },
  {
    "id": "sdv_workbench",
    "name": "工作台 (Workbench)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ea/Workbench.png",
    "sprite": "trophy",
    "role": "工作台"
  },
  {
    "id": "sdv_mini_fridge",
    "name": "迷你冰箱 (Mini-Fridge)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4d/Mini-Fridge.png",
    "sprite": "trophy",
    "role": "迷你冰箱"
  },
  {
    "id": "sdv_mini_shipping_bin",
    "name": "迷你出貨箱 (Mini-Shipping Bin)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1c/Mini-Shipping_Bin.png",
    "sprite": "trophy",
    "role": "迷你出貨箱"
  },
  {
    "id": "sdv_junimo_chest",
    "name": "祝尼魔箱子 (Junimo Chest)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bc/Junimo_Chest.png",
    "sprite": "trophy",
    "role": "祝尼魔箱子"
  },
  {
    "id": "sdv_stone_chest",
    "name": "石箱子 (Stone Chest)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Stone_Chest.png",
    "sprite": "trophy",
    "role": "石製箱子"
  },
  {
    "id": "sdv_chest",
    "name": "普通箱子 (Chest)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b3/Chest.png",
    "sprite": "trophy",
    "role": "木箱子"
  },
  {
    "id": "sdv_scarecrow",
    "name": "稻草人 (Scarecrow)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/75/Scarecrow.png",
    "sprite": "trophy",
    "role": "田間稻草人"
  },
  {
    "id": "sdv_deluxe_scarecrow",
    "name": "豪華稻草人 (Deluxe Scarecrow)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/59/Deluxe_Scarecrow.png",
    "sprite": "trophy",
    "role": "豪華稻草人"
  },
  {
    "id": "sdv_lawn_flamingo",
    "name": "草坪火烈鳥 (Lawn Flamingo)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c1/Lawn_Flamingo.png",
    "sprite": "trophy",
    "role": "草坪火烈鳥"
  },
  {
    "id": "sdv_big_green_cane",
    "name": "大綠手杖糖 (Big Green Cane)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Big_Green_Cane.png",
    "sprite": "trophy",
    "role": "聖誕手杖裝飾"
  },
  {
    "id": "sdv_big_red_cane",
    "name": "大紅手杖糖 (Big Red Cane)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Big_Red_Cane.png",
    "sprite": "trophy",
    "role": "聖誕手杖裝飾"
  },
  {
    "id": "sdv_green_canes",
    "name": "綠色手杖糖 (Green Canes)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/41/Green_Canes.png",
    "sprite": "trophy",
    "role": "聖誕手杖裝飾"
  },
  {
    "id": "sdv_red_canes",
    "name": "紅色手杖糖 (Red Canes)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f8/Red_Canes.png",
    "sprite": "trophy",
    "role": "聖誕手杖裝飾"
  },
  {
    "id": "sdv_mixed_cane",
    "name": "混合手杖糖 (Mixed Cane)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/52/Mixed_Cane.png",
    "sprite": "trophy",
    "role": "聖誕手杖裝飾"
  },
  {
    "id": "sdv_ornamental_hay_bale",
    "name": "裝飾乾草捆 (Ornamental Hay Bale)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/99/Ornamental_Hay_Bale.png",
    "sprite": "trophy",
    "role": "乾草捆裝飾"
  },
  {
    "id": "sdv_log_section",
    "name": "原木段 (Log Section)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/78/Log_Section.png",
    "sprite": "trophy",
    "role": "原木段裝飾"
  },
  {
    "id": "sdv_singing_stone",
    "name": "唱歌石 (Singing Stone)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5a/Singing_Stone.png",
    "sprite": "trophy",
    "role": "唱歌的石頭"
  },
  {
    "id": "sdv_stone_junimo",
    "name": "石祝尼魔 (Stone Junimo)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/31/Stone_Junimo.png",
    "sprite": "trophy",
    "role": "石祝尼魔"
  },
  {
    "id": "sdv_stone_owl",
    "name": "石貓頭鷹 (Stone Owl)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7c/Stone_Owl.png",
    "sprite": "trophy",
    "role": "石貓頭鷹"
  },
  {
    "id": "sdv_stone_parrot",
    "name": "石鸚鵡 (Stone Parrot)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a2/Stone_Parrot.png",
    "sprite": "trophy",
    "role": "石鸚鵡"
  },
  {
    "id": "sdv_stone_frog",
    "name": "石青蛙 (Stone Frog)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Stone_Frog.png",
    "sprite": "trophy",
    "role": "石青蛙"
  },
  {
    "id": "sdv_stone_cairn",
    "name": "石堆 (Stone Cairn)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d6/Stone_Cairn.png",
    "sprite": "trophy",
    "role": "石堆裝飾"
  },
  {
    "id": "sdv_bear_statue",
    "name": "熊雕像 (Bear Statue)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/43/Bear_Statue.png",
    "sprite": "trophy",
    "role": "熊雕像"
  },
  {
    "id": "sdv_junimo_kart_arcade_system",
    "name": "祝尼魔卡丁車街機 (Junimo Kart Arcade System)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Junimo_Kart_Arcade_System.png",
    "sprite": "trophy",
    "role": "街機遊戲機"
  },
  {
    "id": "sdv_prairie_king_arcade_system",
    "name": "草原之王街機 (Prairie King Arcade System)",
    "category": "furniture_special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/eb/Prairie_King_Arcade_System.png",
    "sprite": "trophy",
    "role": "街機遊戲機"
  },
  {
    "id": "sdv_wood_floor",
    "name": "木地板 (Wood Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/58/Wood_Floor.png",
    "sprite": "well",
    "role": "木地板"
  },
  {
    "id": "sdv_rustic_plank_floor",
    "name": "鄉村木板地板 (Rustic Plank Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Rustic_Plank_Floor.png",
    "sprite": "well",
    "role": "鄉村木板地板"
  },
  {
    "id": "sdv_stone_floor",
    "name": "石地板 (Stone Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Stone_Floor.png",
    "sprite": "well",
    "role": "石地板"
  },
  {
    "id": "sdv_stone_walkway_floor",
    "name": "石板路地板 (Stone Walkway Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Stone_Walkway_Floor.png",
    "sprite": "well",
    "role": "石板路地板"
  },
  {
    "id": "sdv_brick_floor",
    "name": "磚地板 (Brick Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/29/Brick_Floor.png",
    "sprite": "well",
    "role": "磚地板"
  },
  {
    "id": "sdv_wood_path",
    "name": "木小路 (Wood Path)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e3/Wood_Path.png",
    "sprite": "well",
    "role": "木小路"
  },
  {
    "id": "sdv_gravel_path",
    "name": "礫石小路 (Gravel Path)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/15/Gravel_Path.png",
    "sprite": "well",
    "role": "礫石小路"
  },
  {
    "id": "sdv_cobblestone_path",
    "name": "鵝卵石小路 (Cobblestone Path)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/90/Cobblestone_Path.png",
    "sprite": "well",
    "role": "鵝卵石小路"
  },
  {
    "id": "sdv_stepping_stone_path",
    "name": "踏石小路 (Stepping Stone Path)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Stepping_Stone_Path.png",
    "sprite": "well",
    "role": "踏石小路"
  },
  {
    "id": "sdv_crystal_path",
    "name": "水晶小路 (Crystal Path)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Crystal_Path.png",
    "sprite": "well",
    "role": "水晶小路"
  },
  {
    "id": "sdv_straw_floor",
    "name": "稻草地板 (Straw Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/85/Straw_Floor.png",
    "sprite": "well",
    "role": "稻草地板"
  },
  {
    "id": "sdv_weathered_floor",
    "name": "風化地板 (Weathered Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2a/Weathered_Floor.png",
    "sprite": "well",
    "role": "風化地板"
  },
  {
    "id": "sdv_crystal_floor",
    "name": "水晶地板 (Crystal Floor)",
    "category": "decor_floors",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Crystal_Floor.png",
    "sprite": "well",
    "role": "水晶地板"
  },
  {
    "id": "sdv_good_ol_cap",
    "name": "老式棒球帽 (Good Ol' Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1e/Good_Ol%27_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "農夫棒球帽"
  },
  {
    "id": "sdv_trucker_hat",
    "name": "卡車司機帽 (Trucker Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Trucker_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "卡車帽"
  },
  {
    "id": "sdv_official_cap",
    "name": "官方帽 (Official Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b4/Official_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "官方棒球帽"
  },
  {
    "id": "sdv_lucky_bow",
    "name": "幸運蝴蝶結 (Lucky Bow)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/71/Lucky_Bow.png",
    "sprite": "fashion_rabbit",
    "role": "幸運蝴蝶結"
  },
  {
    "id": "sdv_polka_bow",
    "name": "波點蝴蝶結 (Polka Bow)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b6/Polka_Bow.png",
    "sprite": "fashion_rabbit",
    "role": "波點蝴蝶結"
  },
  {
    "id": "sdv_bowler_hat",
    "name": "圓頂禮帽 (Bowler Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e1/Bowler_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "圓頂禮帽"
  },
  {
    "id": "sdv_top_hat",
    "name": "大禮帽 (Top Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8d/Top_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "大禮帽"
  },
  {
    "id": "sdv_sombrero",
    "name": "墨西哥帽 (Sombrero)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1c/Sombrero.png",
    "sprite": "fashion_rabbit",
    "role": "墨西哥寬邊帽"
  },
  {
    "id": "sdv_cowboy_hat",
    "name": "牛仔帽 (Cowboy Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/99/Cowboy_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "牛仔帽"
  },
  {
    "id": "sdv_magic_cowboy_hat",
    "name": "魔法牛仔帽 (Magic Cowboy Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/60/Magic_Cowboy_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "魔法牛仔帽"
  },
  {
    "id": "sdv_magic_turban",
    "name": "魔法頭巾 (Magic Turban)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/65/Magic_Turban.png",
    "sprite": "fashion_rabbit",
    "role": "魔法頭巾"
  },
  {
    "id": "sdv_golden_helmet",
    "name": "黃金頭盔 (Golden Helmet)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c6/Golden_Helmet.png",
    "sprite": "fashion_rabbit",
    "role": "黃金頭盔"
  },
  {
    "id": "sdv_deluxe_pirate_hat",
    "name": "豪華海盜帽 (Deluxe Pirate Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cb/Deluxe_Pirate_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "豪華海盜帽"
  },
  {
    "id": "sdv_fashion_hat",
    "name": "時尚帽 (Fashion Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Fashion_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "時尚帽子"
  },
  {
    "id": "sdv_earmuffs",
    "name": "耳罩 (Earmuffs)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/ca/Earmuffs.png",
    "sprite": "fashion_rabbit",
    "role": "冬日耳罩"
  },
  {
    "id": "sdv_tiara",
    "name": "皇冠頭飾 (Tiara)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6c/Tiara.png",
    "sprite": "fashion_rabbit",
    "role": "公主頭飾"
  },
  {
    "id": "sdv_santa_hat",
    "name": "聖誕帽 (Santa Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Santa_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "聖誕老人帽"
  },
  {
    "id": "sdv_straw_hat",
    "name": "草帽 (Straw Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b2/Straw_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "農夫草帽"
  },
  {
    "id": "sdv_sailor_s_cap",
    "name": "水手帽 (Sailor's Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/45/Sailor%27s_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "水手帽"
  },
  {
    "id": "sdv_hard_hat",
    "name": "安全帽 (Hard Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/08/Hard_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "工地安全帽"
  },
  {
    "id": "sdv_stocking_cap",
    "name": "毛線帽 (Stocking Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Stocking_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "毛線長帽"
  },
  {
    "id": "sdv_cat_ears",
    "name": "貓耳朵 (Cat Ears)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ab/Cat_Ears.png",
    "sprite": "fashion_rabbit",
    "role": "貓耳頭飾"
  },
  {
    "id": "sdv_mouse_ears",
    "name": "鼠耳朵 (Mouse Ears)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/05/Mouse_Ears.png",
    "sprite": "fashion_rabbit",
    "role": "鼠耳頭飾"
  },
  {
    "id": "sdv_cowpoke_hat",
    "name": "牧牛帽 (Cowpoke Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Cowpoke_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "牧牛帽"
  },
  {
    "id": "sdv_cowgal_hat",
    "name": "女牛仔帽 (Cowgal Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e7/Cowgal_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "女牛仔帽"
  },
  {
    "id": "sdv_hunter_s_cap",
    "name": "獵人帽 (Hunter's Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c9/Hunter%27s_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "獵人帽"
  },
  {
    "id": "sdv_watermelon_band",
    "name": "西瓜頭帶 (Watermelon Band)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b7/Watermelon_Band.png",
    "sprite": "fashion_rabbit",
    "role": "西瓜頭帶"
  },
  {
    "id": "sdv_mushroom_cap",
    "name": "蘑菇帽 (Mushroom Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/71/Mushroom_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "蘑菇帽"
  },
  {
    "id": "sdv_living_hat",
    "name": "活帽子 (Living Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/95/Living_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "傳說活帽子"
  },
  {
    "id": "sdv_squid_kid_s_hat",
    "name": "烏賊帽 (Squid Kid's Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/24/Squid_Kid%27s_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "烏賊小子帽"
  },
  {
    "id": "sdv_butterfly_bow",
    "name": "蝴蝶結髮飾 (Butterfly Bow)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Butterfly_Bow.png",
    "sprite": "fashion_rabbit",
    "role": "蝴蝶髮飾"
  },
  {
    "id": "sdv_sou_wester",
    "name": "西南風帽 (Sou'wester)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f0/Sou%27wester.png",
    "sprite": "fashion_rabbit",
    "role": "漁夫雨帽"
  },
  {
    "id": "sdv_blue_bonnet",
    "name": "藍色禮帽 (Blue Bonnet)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/ba/Blue_Bonnet.png",
    "sprite": "fashion_rabbit",
    "role": "藍色軟帽"
  },
  {
    "id": "sdv_white_turban",
    "name": "白色頭巾 (White Turban)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/60/White_Turban.png",
    "sprite": "fashion_rabbit",
    "role": "白色頭巾"
  },
  {
    "id": "sdv_elegant_turban",
    "name": "優雅頭巾 (Elegant Turban)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Elegant_Turban.png",
    "sprite": "fashion_rabbit",
    "role": "優雅頭巾"
  },
  {
    "id": "sdv_chef_hat",
    "name": "廚師帽 (Chef Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3b/Chef_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "廚師高帽"
  },
  {
    "id": "sdv_floppy_beanie",
    "name": "軟毛線帽 (Floppy Beanie)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0d/Floppy_Beanie.png",
    "sprite": "fashion_rabbit",
    "role": "軟毛線帽"
  },
  {
    "id": "sdv_beanie",
    "name": "毛線便帽 (Beanie)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Beanie.png",
    "sprite": "fashion_rabbit",
    "role": "毛線便帽"
  },
  {
    "id": "sdv_cloth_headband",
    "name": "布頭帶 (Cloth Headband)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/da/Cloth_Headband.png",
    "sprite": "fashion_rabbit",
    "role": "布頭帶"
  },
  {
    "id": "sdv_colorful_headband",
    "name": "彩色頭帶 (Colorful Headband)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/23/Colorful_Headband.png",
    "sprite": "fashion_rabbit",
    "role": "彩色頭帶"
  },
  {
    "id": "sdv_governor_s_hat",
    "name": "州長帽 (Governor's Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2e/Governor%27s_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "州長帽"
  },
  {
    "id": "sdv_goggles",
    "name": "護目鏡 (Goggles)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Goggles.png",
    "sprite": "fashion_rabbit",
    "role": "護目鏡"
  },
  {
    "id": "sdv_forager_s_hat",
    "name": "採集者帽 (Forager's Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/30/Forager%27s_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "採集者帽"
  },
  {
    "id": "sdv_warrior_helmet",
    "name": "戰士頭盔 (Warrior Helmet)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/68/Warrior_Helmet.png",
    "sprite": "fashion_rabbit",
    "role": "戰士頭盔"
  },
  {
    "id": "sdv_cool_cap",
    "name": "酷帽 (Cool Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Cool_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "酷炫棒球帽"
  },
  {
    "id": "sdv_sunglasses",
    "name": "太陽眼鏡 (Sunglasses)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/92/Sunglasses.png",
    "sprite": "fashion_rabbit",
    "role": "太陽眼鏡"
  },
  {
    "id": "sdv_leprechaun_hat",
    "name": "小妖精帽 (Leprechaun Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/49/Leprechaun_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "小妖精帽"
  },
  {
    "id": "sdv_witch_hat",
    "name": "女巫帽 (Witch Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/18/Witch_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "女巫尖帽"
  },
  {
    "id": "sdv_party_hat",
    "name": "紅色派對帽 (Party Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Party_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "紅色派對帽"
  },
  {
    "id": "sdv_arcane_hat",
    "name": "奧術帽 (Arcane Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c7/Arcane_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "奧術帽"
  },
  {
    "id": "sdv_star_helmet",
    "name": "星星頭盔 (Star Helmet)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/2a/Star_Helmet.png",
    "sprite": "fashion_rabbit",
    "role": "星星頭盔"
  },
  {
    "id": "sdv_pirate_hat",
    "name": "海盜帽 (Pirate Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Pirate_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "海盜帽"
  },
  {
    "id": "sdv_frog_hat",
    "name": "青蛙帽 (Frog Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d1/Frog_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "青蛙帽"
  },
  {
    "id": "sdv_small_cap",
    "name": "小帽 (Small Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/1a/Small_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "小棒球帽"
  },
  {
    "id": "sdv_blue_cowboy_hat",
    "name": "藍牛仔帽 (Blue Cowboy Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Blue_Cowboy_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "藍色牛仔帽"
  },
  {
    "id": "sdv_red_cowboy_hat",
    "name": "紅牛仔帽 (Red Cowboy Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fc/Red_Cowboy_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "紅色牛仔帽"
  },
  {
    "id": "sdv_cone_hat",
    "name": "錐形帽 (Cone Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d5/Cone_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "錐形帽"
  },
  {
    "id": "sdv_paper_hat",
    "name": "紙帽 (Paper Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5f/Paper_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "報紙紙帽"
  },
  {
    "id": "sdv_garbage_hat",
    "name": "垃圾帽 (Garbage Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a9/Garbage_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "垃圾桶蓋帽"
  },
  {
    "id": "sdv_radioactive_goggles",
    "name": "放射護目鏡 (Radioactive Goggles)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4d/Radioactive_Goggles.png",
    "sprite": "fashion_rabbit",
    "role": "放射護目鏡"
  },
  {
    "id": "sdv_swashbuckler_hat",
    "name": "水手大副帽 (Swashbuckler Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c4/Swashbuckler_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "大副帽"
  },
  {
    "id": "sdv_qi_mask",
    "name": "齊先生面具 (Qi Mask)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/dd/Qi_Mask.png",
    "sprite": "fashion_rabbit",
    "role": "齊先生面具"
  },
  {
    "id": "sdv_abigail_s_bow",
    "name": "阿比蓋爾蝴蝶結 (Abigail's Bow)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/02/Abigail%27s_Bow.png",
    "sprite": "fashion_rabbit",
    "role": "阿比蓋爾蝴蝶結"
  },
  {
    "id": "sdv_jester_hat",
    "name": "小丑帽 (Jester Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9b/Jester_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "小丑帽"
  },
  {
    "id": "sdv_pageboy_cap",
    "name": "報童帽 (Pageboy Cap)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4b/Pageboy_Cap.png",
    "sprite": "fashion_rabbit",
    "role": "報童帽"
  },
  {
    "id": "sdv_fishing_hat",
    "name": "漁夫帽 (Fishing Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d8/Fishing_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "釣魚帽"
  },
  {
    "id": "sdv_pink_bow",
    "name": "粉色蝴蝶結 (Pink Bow)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Pink_Bow.png",
    "sprite": "fashion_rabbit",
    "role": "粉色蝴蝶結"
  },
  {
    "id": "sdv_panda_hat",
    "name": "熊貓帽 (Panda Hat)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Panda_Hat.png",
    "sprite": "fashion_rabbit",
    "role": "熊貓帽"
  },
  {
    "id": "sdv_totem_mask",
    "name": "圖騰面具 (Totem Mask)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Totem_Mask.png",
    "sprite": "fashion_rabbit",
    "role": "圖騰面具"
  },
  {
    "id": "sdv_knight_s_helmet",
    "name": "騎士頭盔 (Knight's Helmet)",
    "category": "clothes_hats",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/62/Knight%27s_Helmet.png",
    "sprite": "fashion_rabbit",
    "role": "騎士頭盔"
  },
  {
    "id": "sdv_sneakers",
    "name": "運動鞋 (Sneakers)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Sneakers.png",
    "sprite": "farmer",
    "role": "運動鞋"
  },
  {
    "id": "sdv_rubber_boots",
    "name": "橡膠靴 (Rubber Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e8/Rubber_Boots.png",
    "sprite": "farmer",
    "role": "橡膠靴"
  },
  {
    "id": "sdv_leather_boots",
    "name": "皮靴 (Leather Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Leather_Boots.png",
    "sprite": "farmer",
    "role": "皮靴"
  },
  {
    "id": "sdv_work_boots",
    "name": "工作靴 (Work Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Work_Boots.png",
    "sprite": "farmer",
    "role": "工作靴"
  },
  {
    "id": "sdv_combat_boots",
    "name": "戰鬥靴 (Combat Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/63/Combat_Boots.png",
    "sprite": "farmer",
    "role": "戰鬥靴"
  },
  {
    "id": "sdv_tundra_boots",
    "name": "苔原靴 (Tundra Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/93/Tundra_Boots.png",
    "sprite": "farmer",
    "role": "苔原靴"
  },
  {
    "id": "sdv_thermal_boots",
    "name": "保暖靴 (Thermal Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Thermal_Boots.png",
    "sprite": "farmer",
    "role": "保暖靴"
  },
  {
    "id": "sdv_dark_boots",
    "name": "深色靴 (Dark Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8d/Dark_Boots.png",
    "sprite": "farmer",
    "role": "深色靴"
  },
  {
    "id": "sdv_firewalker_boots",
    "name": "火焰行者靴 (Firewalker Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fa/Firewalker_Boots.png",
    "sprite": "farmer",
    "role": "火焰行者靴"
  },
  {
    "id": "sdv_genie_shoes",
    "name": "精靈鞋 (Genie Shoes)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/98/Genie_Shoes.png",
    "sprite": "farmer",
    "role": "精靈鞋"
  },
  {
    "id": "sdv_space_boots",
    "name": "太空靴 (Space Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6e/Space_Boots.png",
    "sprite": "farmer",
    "role": "太空靴"
  },
  {
    "id": "sdv_cowboy_boots",
    "name": "牛仔靴 (Cowboy Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/15/Cowboy_Boots.png",
    "sprite": "farmer",
    "role": "牛仔靴"
  },
  {
    "id": "sdv_emily_s_magic_boots",
    "name": "艾米麗魔法靴 (Emily's Magic Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ac/Emily%27s_Magic_Boots.png",
    "sprite": "farmer",
    "role": "艾米麗魔法靴"
  },
  {
    "id": "sdv_leprechaun_shoes",
    "name": "小妖精鞋 (Leprechaun Shoes)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Leprechaun_Shoes.png",
    "sprite": "farmer",
    "role": "小妖精鞋"
  },
  {
    "id": "sdv_cinderclown_shoes",
    "name": "灰姑娘鞋 (Cinderclown Shoes)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Cinderclown_Shoes.png",
    "sprite": "farmer",
    "role": "灰姑娘小丑鞋"
  },
  {
    "id": "sdv_mermaid_boots",
    "name": "美人魚靴 (Mermaid Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/98/Mermaid_Boots.png",
    "sprite": "farmer",
    "role": "美人魚靴"
  },
  {
    "id": "sdv_dragonscale_boots",
    "name": "龍鱗靴 (Dragonscale Boots)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Dragonscale_Boots.png",
    "sprite": "farmer",
    "role": "龍鱗靴"
  },
  {
    "id": "sdv_crystal_shoes",
    "name": "水晶鞋 (Crystal Shoes)",
    "category": "clothes_shoes",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/69/Crystal_Shoes.png",
    "sprite": "farmer",
    "role": "水晶鞋"
  },
  {
    "id": "sdv_glow_ring",
    "name": "光輝戒指 (Glow Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/01/Glow_Ring.png",
    "sprite": "gem_diamond",
    "role": "夜間發光"
  },
  {
    "id": "sdv_small_glow_ring",
    "name": "小光輝戒指 (Small Glow Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6c/Small_Glow_Ring.png",
    "sprite": "gem_diamond",
    "role": "微微發光"
  },
  {
    "id": "sdv_magnet_ring",
    "name": "磁鐵戒指 (Magnet Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Magnet_Ring.png",
    "sprite": "gem_diamond",
    "role": "吸引物品"
  },
  {
    "id": "sdv_small_magnet_ring",
    "name": "小磁鐵戒指 (Small Magnet Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Small_Magnet_Ring.png",
    "sprite": "gem_diamond",
    "role": "小範圍吸引"
  },
  {
    "id": "sdv_glowstone_ring",
    "name": "光輝石戒指 (Glowstone Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/65/Glowstone_Ring.png",
    "sprite": "gem_diamond",
    "role": "光加磁力"
  },
  {
    "id": "sdv_iridium_band",
    "name": "銥金指環 (Iridium Band)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/77/Iridium_Band.png",
    "sprite": "gem_diamond",
    "role": "全能指環"
  },
  {
    "id": "sdv_vampire_ring",
    "name": "吸血鬼戒指 (Vampire Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Vampire_Ring.png",
    "sprite": "gem_diamond",
    "role": "吸血回復"
  },
  {
    "id": "sdv_savage_ring",
    "name": "野蠻戒指 (Savage Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/55/Savage_Ring.png",
    "sprite": "gem_diamond",
    "role": "擊殺加速"
  },
  {
    "id": "sdv_ring_of_yoba",
    "name": "約巴戒指 (Ring of Yoba)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/21/Ring_of_Yoba.png",
    "sprite": "gem_diamond",
    "role": "約巴庇護"
  },
  {
    "id": "sdv_burglar_s_ring",
    "name": "盜賊戒指 (Burglar's Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8b/Burglar%27s_Ring.png",
    "sprite": "gem_diamond",
    "role": "雙倍掉落"
  },
  {
    "id": "sdv_slime_charmer_ring",
    "name": "史萊姆剋星戒指 (Slime Charmer Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/51/Slime_Charmer_Ring.png",
    "sprite": "gem_diamond",
    "role": "史萊姆不傷你"
  },
  {
    "id": "sdv_warrior_ring",
    "name": "戰士戒指 (Warrior Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/13/Warrior_Ring.png",
    "sprite": "gem_diamond",
    "role": "戰士能量"
  },
  {
    "id": "sdv_thorns_ring",
    "name": "荊棘戒指 (Thorns Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5b/Thorns_Ring.png",
    "sprite": "gem_diamond",
    "role": "荊棘反傷"
  },
  {
    "id": "sdv_lucky_ring",
    "name": "幸運戒指 (Lucky Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/4c/Lucky_Ring.png",
    "sprite": "gem_diamond",
    "role": "幸運加成"
  },
  {
    "id": "sdv_hot_java_ring",
    "name": "熱爪哇戒指 (Hot Java Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/af/Hot_Java_Ring.png",
    "sprite": "gem_diamond",
    "role": "咖啡掉落"
  },
  {
    "id": "sdv_protection_ring",
    "name": "保護戒指 (Protection Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/16/Protection_Ring.png",
    "sprite": "gem_diamond",
    "role": "無敵延長"
  },
  {
    "id": "sdv_soul_sapper_ring",
    "name": "靈魂虹吸戒指 (Soul Sapper Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c8/Soul_Sapper_Ring.png",
    "sprite": "gem_diamond",
    "role": "靈魂虹吸"
  },
  {
    "id": "sdv_phoenix_ring",
    "name": "鳳凰戒指 (Phoenix Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e3/Phoenix_Ring.png",
    "sprite": "gem_diamond",
    "role": "每日復活一次"
  },
  {
    "id": "sdv_napalm_ring",
    "name": "凝固汽油戒指 (Napalm Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/82/Napalm_Ring.png",
    "sprite": "gem_diamond",
    "role": "怪物爆炸"
  },
  {
    "id": "sdv_crabshell_ring",
    "name": "蟹殼戒指 (Crabshell Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/eb/Crabshell_Ring.png",
    "sprite": "gem_diamond",
    "role": "防禦加成"
  },
  {
    "id": "sdv_sturdy_ring",
    "name": "堅固戒指 (Sturdy Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Sturdy_Ring.png",
    "sprite": "gem_diamond",
    "role": "負面減半"
  },
  {
    "id": "sdv_jukebox_ring",
    "name": "點唱機戒指 (Jukebox Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/13/Jukebox_Ring.png",
    "sprite": "gem_diamond",
    "role": "隨機音樂"
  },
  {
    "id": "sdv_amethyst_ring",
    "name": "紫水晶戒指 (Amethyst Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Amethyst_Ring.png",
    "sprite": "gem_diamond",
    "role": "擊退加成"
  },
  {
    "id": "sdv_topaz_ring",
    "name": "黃水晶戒指 (Topaz Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8a/Topaz_Ring.png",
    "sprite": "gem_diamond",
    "role": "防禦加成"
  },
  {
    "id": "sdv_aquamarine_ring",
    "name": "海藍寶石戒指 (Aquamarine Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8d/Aquamarine_Ring.png",
    "sprite": "gem_diamond",
    "role": "暴擊加成"
  },
  {
    "id": "sdv_jade_ring",
    "name": "翡翠戒指 (Jade Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d8/Jade_Ring.png",
    "sprite": "gem_diamond",
    "role": "暴擊傷害"
  },
  {
    "id": "sdv_emerald_ring",
    "name": "祖母綠戒指 (Emerald Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8a/Emerald_Ring.png",
    "sprite": "gem_diamond",
    "role": "速度加成"
  },
  {
    "id": "sdv_ruby_ring",
    "name": "紅寶石戒指 (Ruby Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d3/Ruby_Ring.png",
    "sprite": "gem_diamond",
    "role": "攻擊加成"
  },
  {
    "id": "sdv_immunity_band",
    "name": "免疫指環 (Immunity Band)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/09/Immunity_Band.png",
    "sprite": "gem_diamond",
    "role": "免疫加成"
  },
  {
    "id": "sdv_combined_ring",
    "name": "合成戒指 (Combined Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/b3/Combined_Ring.png",
    "sprite": "gem_diamond",
    "role": "合成戒指"
  },
  {
    "id": "sdv_wedding_ring",
    "name": "結婚戒指 (Wedding Ring)",
    "category": "rings",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fe/Wedding_Ring.png",
    "sprite": "gem_diamond",
    "role": "求婚戒指"
  }
];
