export type StardewAvatarCategory =
  | 'animals'
  | 'villagers'
  | 'treasures'
  | 'cooking'
  | 'ingredients'
  | 'fish'
  | 'crops'
  | 'foraging'
  | 'artifacts'
  | 'minerals'
  | 'animal_products'
  | 'artisan'
  | 'resources'
  | 'fossils'
  | 'special';

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
  { id: 'villagers', label: '🏡 小鎮村民' },
  { id: 'special', label: '✨ 特殊角色' },
  { id: 'treasures', label: '💎 珍寶與神魚' },
  { id: 'cooking', label: '🍳 烹飪菜品' },
  { id: 'ingredients', label: '🥬 烹飪原料' },
  { id: 'fish', label: '🐟 魚類圖鑑' },
  { id: 'crops', label: '🌾 作物與花' },
  { id: 'foraging', label: '🍄 採集與海灘' },
  { id: 'artifacts', label: '🏺 古物典藏' },
  { id: 'minerals', label: '💠 礦物與晶球' },
  { id: 'animal_products', label: '🥛 動物產品' },
  { id: 'artisan', label: '🍷 加工品' },
  { id: 'resources', label: '🪵 資源與雜項' },
  { id: 'fossils', label: '🦴 薑島化石' },
];

// Complete 507 Stardew Valley Official Wiki PNG Avatar Roster
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/05/Cat.png",
    "sprite": "cat",
    "role": "農場撒嬌寵物"
  },
  {
    "id": "sdv_dog",
    "name": "忠實柴犬 (Dog)",
    "category": "animals",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/35/Dog.png",
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/10/Butterfly.png",
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
    "role": "綠洲商店老闆娘"
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
    "name": "斯奈爾教授 (Professor Snail)",
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
    "role": "夏日宴會評審"
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/96/Henchman.png",
    "sprite": "junimo",
    "role": "哥布林守門人"
  },
  {
    "id": "sdv_fizz",
    "name": "特使菲茲 (Fizz)",
    "category": "villagers",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/94/Fizz.png",
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
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/10/Legend.png",
    "sprite": "chicken",
    "role": "雨天山林湖之王"
  },
  {
    "id": "sdv_crimsonfish",
    "name": "夏日緋紅魚 (Crimsonfish)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/dc/Crimsonfish.png",
    "sprite": "chicken",
    "role": "東碼頭海中巨怪"
  },
  {
    "id": "sdv_angler",
    "name": "秋日鮟鱇魚 (Angler)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/b/bf/Angler.png",
    "sprite": "chicken",
    "role": "木橋小瀑布之王"
  },
  {
    "id": "sdv_glacierfish",
    "name": "冬日冰川魚 (Glacierfish)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Glacierfish.png",
    "sprite": "chicken",
    "role": "箭頭島極寒霸主"
  },
  {
    "id": "sdv_mutant_carp",
    "name": "變種巨鯉魚 (Mutant Carp)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/cb/Mutant_Carp.png",
    "sprite": "chicken",
    "role": "下水道綠光魚"
  },
  {
    "id": "sdv_lava_eel",
    "name": "熔岩鰻魚 (Lava Eel)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/12/Lava_Eel.png",
    "sprite": "chicken",
    "role": "礦坑100層紅光鰻"
  },
  {
    "id": "sdv_void_salmon",
    "name": "虛空鮭魚 (Void Salmon)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Void_Salmon.png",
    "sprite": "chicken",
    "role": "女巫沼澤神秘鮭魚"
  },
  {
    "id": "sdv_midnight_carp",
    "name": "午夜鯉魚 (Midnight Carp)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/33/Midnight_Carp.png",
    "sprite": "chicken",
    "role": "深夜湖泊發光鯉"
  },
  {
    "id": "sdv_blobfish",
    "name": "水滴魚 (Blobfish)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/7f/Blobfish.png",
    "sprite": "rabbit",
    "role": "深海夜市呆萌魚"
  },
  {
    "id": "sdv_spook_fish",
    "name": "幽靈魚 (Spook Fish)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/8c/Spook_Fish.png",
    "sprite": "chicken",
    "role": "深海潛水艇發光怪"
  },
  {
    "id": "sdv_stingray",
    "name": "刺魟魚 (Stingray)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Stingray.png",
    "sprite": "chicken",
    "role": "海盜洞穴珍稀魟"
  },
  {
    "id": "sdv_octopus",
    "name": "巨型章魚 (Octopus)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5a/Octopus.png",
    "sprite": "chicken",
    "role": "難度100超難釣章魚"
  },
  {
    "id": "sdv_rainbow_trout",
    "name": "彩虹鱒魚 (Rainbow Trout)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/14/Rainbow_Trout.png",
    "sprite": "chicken",
    "role": "有機率產出五彩碎片"
  },
  {
    "id": "sdv_sturgeon",
    "name": "傳奇鱘魚 (Sturgeon)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/42/Sturgeon.png",
    "sprite": "chicken",
    "role": "魚子醬珍貴魚種"
  },
  {
    "id": "sdv_lobster",
    "name": "鮮紅龍蝦 (Lobster)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Lobster.png",
    "sprite": "chicken",
    "role": "蟹籠頂級美味"
  },
  {
    "id": "sdv_crab",
    "name": "海濱螃蟹 (Crab)",
    "category": "treasures",
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/46/Golden_Pumpkin.png",
    "sprite": "coin_gold",
    "role": "萬靈節迷宮終極大獎"
  },
  {
    "id": "sdv_pearl",
    "name": "深海夜市珍珠 (Pearl)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/73/Pearl.png",
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
    "role": "秋季巨型作物"
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
    "name": "巨大花椰菜 (Cauliflower)",
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c4/Iridium_Bar.png",
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
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/44/Galaxy_Sword.png",
    "sprite": "gem_diamond",
    "role": "沙漠三石柱召喚神兵"
  },
  {
    "id": "sdv_infinity_blade",
    "name": "無限之刃 (Infinity Blade)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/4/40/Infinity_Blade.png",
    "sprite": "gem_diamond",
    "role": "火山鍛造終極神劍"
  },
  {
    "id": "sdv_return_scepter",
    "name": "回歸權杖 (Return Scepter)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/f3/Return_Scepter.png",
    "sprite": "coin_gold",
    "role": "瞬間傳送回農舍門口"
  },
  {
    "id": "sdv_horse_flute",
    "name": "召喚馬笛 (Horse Flute)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Horse_Flute.png",
    "sprite": "coin_gold",
    "role": "吹響即刻召喚愛馬"
  },
  {
    "id": "sdv_magic_candy",
    "name": "魔法搖滾糖 (Magic Rock Candy)",
    "category": "treasures",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Magic_Rock_Candy.png",
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
    "role": "下礦跑速加運氣神料理"
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
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/c/c5/Tuna.png",
    "sprite": "sunflower",
    "role": "海洋金槍魚"
  },
  {
    "id": "sdv_sardine",
    "name": "沙丁魚 (Sardine)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/04/Sardine.png",
    "sprite": "sunflower",
    "role": "海洋小沙丁"
  },
  {
    "id": "sdv_bream",
    "name": "鯛魚 (Bream)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/82/Bream.png",
    "sprite": "sunflower",
    "role": "夜間河流鯛魚"
  },
  {
    "id": "sdv_largemouth_bass",
    "name": "大嘴鱸魚 (Largemouth Bass)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/1/11/Largemouth_Bass.png",
    "sprite": "sunflower",
    "role": "湖泊大嘴鱸"
  },
  {
    "id": "sdv_salmon",
    "name": "鮭魚 (Salmon)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Salmon.png",
    "sprite": "sunflower",
    "role": "秋日河流鮭魚"
  },
  {
    "id": "sdv_flounder",
    "name": "比目魚 (Flounder)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/8/85/Flounder.png",
    "sprite": "sunflower",
    "role": "春夏比目魚"
  },
  {
    "id": "sdv_carp",
    "name": "鯉魚 (Carp)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Carp.png",
    "sprite": "sunflower",
    "role": "湖泊普通鯉魚"
  },
  {
    "id": "sdv_sunfish",
    "name": "太陽魚 (Sunfish)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/56/Sunfish.png",
    "sprite": "sunflower",
    "role": "河流太陽魚"
  },
  {
    "id": "sdv_eel",
    "name": "鰻魚 (Eel)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/91/Eel.png",
    "sprite": "sunflower",
    "role": "雨夜海洋鰻魚"
  },
  {
    "id": "sdv_squid",
    "name": "魷魚 (Squid)",
    "category": "ingredients",
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
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Clam.png",
    "sprite": "sunflower",
    "role": "海洋蛤蜊"
  },
  {
    "id": "sdv_crayfish",
    "name": "小龍蝦 (Crayfish)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/53/Crayfish.png",
    "sprite": "sunflower",
    "role": "淡水小龍蝦"
  },
  {
    "id": "sdv_cockle",
    "name": "蚌 (Cockle)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Cockle.png",
    "sprite": "sunflower",
    "role": "海洋小蚌"
  },
  {
    "id": "sdv_shrimp",
    "name": "蝦 (Shrimp)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/9/91/Shrimp.png",
    "sprite": "sunflower",
    "role": "海洋鮮蝦"
  },
  {
    "id": "sdv_snail",
    "name": "蝸牛 (Snail)",
    "category": "ingredients",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/d/d2/Snail.png",
    "sprite": "sunflower",
    "role": "淡水蝸牛"
  },
  {
    "id": "sdv_periwinkle",
    "name": "玉黍螺 (Periwinkle)",
    "category": "ingredients",
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
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e7/Sea_Urchin.png",
    "sprite": "clover",
    "role": "海灘紫海膽"
  },
  {
    "id": "sdv_rainbow_shell",
    "name": "彩虹貝殼 (Rainbow Shell)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Rainbow_Shell.png",
    "sprite": "clover",
    "role": "夏日彩虹貝"
  },
  {
    "id": "sdv_nautilus_shell",
    "name": "鸚鵡螺殼 (Nautilus Shell)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Nautilus_Shell.png",
    "sprite": "clover",
    "role": "冬日鸚鵡螺"
  },
  {
    "id": "sdv_oyster",
    "name": "牡蠣 (Oyster)",
    "category": "foraging",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/54/Oyster.png",
    "sprite": "clover",
    "role": "海灘牡蠣"
  },
  {
    "id": "sdv_mussel",
    "name": "貽貝 (Mussel)",
    "category": "foraging",
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
    "id": "sdv_fossilized_skull",
    "name": "薑島化石頭骨 (Fossilized Skull)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/7/72/Fossilized_Skull.png",
    "sprite": "dinosaur",
    "role": "薑島化石"
  },
  {
    "id": "sdv_fossilized_spine",
    "name": "薑島化石脊椎 (Fossilized Spine)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Fossilized_Spine.png",
    "sprite": "dinosaur",
    "role": "薑島化石"
  },
  {
    "id": "sdv_fossilized_ribs",
    "name": "薑島化石肋骨 (Fossilized Ribs)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/f/fc/Fossilized_Ribs.png",
    "sprite": "dinosaur",
    "role": "薑島化石"
  },
  {
    "id": "sdv_fossilized_leg",
    "name": "薑島化石腿骨 (Fossilized Leg)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/09/Fossilized_Leg.png",
    "sprite": "dinosaur",
    "role": "薑島化石"
  },
  {
    "id": "sdv_fossilized_tail",
    "name": "薑島化石尾巴 (Fossilized Tail)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Fossilized_Tail.png",
    "sprite": "dinosaur",
    "role": "薑島化石"
  },
  {
    "id": "sdv_snake_skull",
    "name": "蛇頭骨 (Snake Skull)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/2/25/Snake_Skull.png",
    "sprite": "dinosaur",
    "role": "薑島蛇化石"
  },
  {
    "id": "sdv_mummified_frog",
    "name": "木乃伊青蛙 (Mummified Frog)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Mummified_Frog.png",
    "sprite": "dinosaur",
    "role": "薑島木乃伊"
  },
  {
    "id": "sdv_mummified_bat",
    "name": "木乃伊蝙蝠 (Mummified Bat)",
    "category": "fossils",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/6/6f/Mummified_Bat.png",
    "sprite": "dinosaur",
    "role": "薑島木乃伊"
  },
  {
    "id": "sdv_junimo",
    "name": "祝尼魔 (Junimo)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/3/30/Junimo.png",
    "sprite": "junimo",
    "role": "森林綠色小精靈"
  },
  {
    "id": "sdv_witch",
    "name": "女巫 (Witch)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Witch.png",
    "sprite": "junimo",
    "role": "黑暗女巫"
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
    "id": "sdv_gourmand_frog",
    "name": "美食蛙 (Gourmand Frog)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/0/0c/Gourmand_Frog.png",
    "sprite": "junimo",
    "role": "薑島美食蛙"
  },
  {
    "id": "sdv_bear",
    "name": "森林熊 (Bear)",
    "category": "special",
    "url": "https://stardewvalleywiki.com/mediawiki/images/en/a/a4/Bear.png",
    "sprite": "junimo",
    "role": "愛楓糖漿的大熊"
  }
];
