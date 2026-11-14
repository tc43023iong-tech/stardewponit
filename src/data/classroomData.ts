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

export interface StardewAvatarItem {
  id: string;
  name: string;
  category: 'villagers' | 'animals' | 'treasures';
  url?: string;
  sprite?: string;
  role?: string;
}

// 70+ Pure Stardew Valley Avatars (Companions, Animals, Villagers & Treasures - No Monsters/Items requested to be removed)
export const STARDEW_AVATARS: StardewAvatarItem[] = [
  // --- 1. 農場動物與核心寵物 (Farm Animals & Pets) ---
  { id: 'sdv_white_chicken', name: '純白小母雞 (White Chicken)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/22/White_Chicken.png', sprite: 'chicken', role: '農場咕咕雞' },
  { id: 'sdv_brown_chicken', name: '棕羽母雞 (Brown Chicken)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Brown_Chicken.png', sprite: 'chicken', role: '優質大雞蛋' },
  { id: 'sdv_blue_chicken', name: '夢幻藍雞 (Blue Chicken)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/61/Blue_Chicken.png', sprite: 'blue_chicken', role: '謝恩摯愛品種' },
  { id: 'sdv_void_chicken', name: '虛空幽靈雞 (Void Chicken)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/67/Void_Chicken.png', sprite: 'blue_chicken', role: '巫師神秘寵物' },
  { id: 'sdv_golden_chicken', name: '極品黃金雞 (Golden Chicken)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3c/Golden_Chicken.png', sprite: 'golden_chicken', role: '百分之百完美傳奇' },
  { id: 'sdv_duck', name: '綠頭野鴨 (Duck)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/38/Duck.png', sprite: 'duck', role: '水塘游泳萌鴨' },
  { id: 'sdv_rabbit_farm', name: '幸運雪兔 (Rabbit)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Rabbit.png', sprite: 'rabbit', role: '掉落兔子的腳' },
  { id: 'sdv_white_cow', name: '純潔白牛 (White Cow)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/36/White_Cow.png', sprite: 'cow', role: '濃醇鮮牛奶' },
  { id: 'sdv_brown_cow', name: '黃金棕牛 (Brown Cow)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3e/Brown_Cow.png', sprite: 'cow', role: '優質起司' },
  { id: 'sdv_goat', name: '山羊 (Goat)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/52/Goat.png', sprite: 'cow', role: '高山山羊奶' },
  { id: 'sdv_sheep', name: '蓬鬆綿羊 (Sheep)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/cc/Sheep.png', sprite: 'cow', role: '頂級羊毛' },
  { id: 'sdv_pig', name: '松露萌豬 (Pig)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/30/Pig.png', sprite: 'pig', role: '拱出珍貴松露' },
  { id: 'sdv_dinosaur', name: '遠古恐龍 (Dinosaur)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/89/Dinosaur.png', sprite: 'dinosaur', role: '史前霸王龍' },
  { id: 'sdv_ostrich', name: '草原鴕鳥 (Ostrich)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/ad/Ostrich.png', sprite: 'chicken', role: '巨無霸鴕鳥蛋' },
  { id: 'sdv_horse', name: '忠心駿馬 (Horse)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c3/Horse.png', sprite: 'cow', role: '奔馳坐騎' },
  { id: 'sdv_cat', name: '慵懶三花貓 (Cat)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/29/Cat.gif', sprite: 'cat', role: '農場撒嬌寵物' },
  { id: 'sdv_dog', name: '忠實柴犬 (Dog)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/99/Dog.gif', sprite: 'dog', role: '看門搖尾巴' },
  { id: 'sdv_turtle', name: '海濱烏龜 (Turtle)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e9/Turtle.png', sprite: 'rabbit', role: '長壽守護' },
  { id: 'sdv_crow', name: '頑皮烏鴉 (Crow)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fa/Crow.png', sprite: 'chicken', role: '稻草人死對頭' },
  { id: 'sdv_butterfly', name: '彩色彩蝶 (Butterfly)', category: 'animals', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6c/ButterflyAnimated.gif', sprite: 'chicken', role: '花間起舞' },

  // --- 2. 鵜鶘鎮村民與居民 (Pelican Town Villagers) ---
  { id: 'sdv_abigail', name: '阿比蓋爾 (Abigail)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/88/Abigail.png', role: '紫髮冒險少女' },
  { id: 'sdv_sebastian', name: '塞巴斯蒂安 (Sebastian)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a8/Sebastian.png', role: '重機程式工程師' },
  { id: 'sdv_haley', name: '海莉 (Haley)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Haley.png', role: '時尚攝影師' },
  { id: 'sdv_penny', name: '佩妮 (Penny)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/ab/Penny.png', role: '溫柔小鎮教師' },
  { id: 'sdv_leah', name: '莉亞 (Leah)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e6/Leah.png', role: '森林雕塑藝術家' },
  { id: 'sdv_maru', name: '瑪魯 (Maru)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f8/Maru.png', role: '天文發明家' },
  { id: 'sdv_emily', name: '艾米麗 (Emily)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/28/Emily.png', role: '心靈手巧裁縫' },
  { id: 'sdv_alex', name: '亞歷克斯 (Alex)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/0/04/Alex.png', role: '陽光美式橄欖球員' },
  { id: 'sdv_elliott', name: '艾利歐特 (Elliott)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/bd/Elliott.png', role: '海濱浪漫詩人' },
  { id: 'sdv_harvey', name: '哈維 (Harvey)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/95/Harvey.png', role: '熱心仁慈鎮醫' },
  { id: 'sdv_sam', name: '山姆 (Sam)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/94/Sam.png', role: '滑板吉他手' },
  { id: 'sdv_shane', name: '謝恩 (Shane)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/8b/Shane.png', role: '藍雞繁育員' },
  { id: 'sdv_krobus', name: '科羅布斯 (Krobus)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/71/Krobus.png', role: '下水道暗影居民' },
  { id: 'sdv_linus', name: '萊納斯 (Linus)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/31/Linus.png', role: '野外自然哲學家' },
  { id: 'sdv_willy', name: '威利 (Willy)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/82/Willy.png', role: '傳奇海釣高手' },
  { id: 'sdv_robin', name: '羅賓 (Robin)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/1b/Robin.png', role: '首席建築大師' },
  { id: 'sdv_marnie', name: '瑪妮 (Marnie)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/52/Marnie.png', role: '動物牧場女主人' },
  { id: 'sdv_gus', name: '格斯 (Gus)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/52/Gus.png', role: '星之果實酒吧主廚' },
  { id: 'sdv_wizard', name: '法師 (Wizard)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/c7/Wizard.png', role: '奧術高塔秘法師' },
  { id: 'sdv_caroline', name: '卡洛琳 (Caroline)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/87/Caroline.png', role: '茶室園藝愛好者' },
  { id: 'sdv_pierre', name: '皮埃爾 (Pierre)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7e/Pierre.png', role: '良心雜貨店老闆' },
  { id: 'sdv_demetrius', name: '德米特里厄斯 (Demetrius)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f9/Demetrius.png', role: '山谷生態學家' },
  { id: 'sdv_clint', name: '克林特 (Clint)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/31/Clint.png', role: '鐵匠敲打大師' },
  { id: 'sdv_evelyn', name: '艾芙琳奶奶 (Evelyn)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/8e/Evelyn.png', role: '烤餅乾奶奶' },
  { id: 'sdv_george', name: '喬治爺爺 (George)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/78/George.png', role: '看電視老爺爺' },
  { id: 'sdv_jas', name: '賈斯 (Jas)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/55/Jas.png', role: '天真跳繩小女孩' },
  { id: 'sdv_vincent', name: '文森特 (Vincent)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Vincent.png', role: '捉昆蟲小男孩' },
  { id: 'sdv_leo', name: '里奧 (Leo)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/1d/Leo.png', role: '薑島鸚鵡之友' },
  { id: 'sdv_pam', name: '潘姆 (Pam)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/da/Pam.png', role: '沙漠校車司機' },
  { id: 'sdv_kent', name: '肯特 (Kent)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/99/Kent.png', role: '英勇退伍軍人' },
  { id: 'sdv_jodi', name: '喬迪 (Jodi)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/41/Jodi.png', role: '勤勞模範母親' },
  { id: 'sdv_sandy', name: '桑迪 (Sandy)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Sandy.png', role: '綠洲綠洲商店闆娘' },
  { id: 'sdv_marlon', name: '馬龍 (Marlon)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/37/Marlon.png', role: '冒險者公會會長' },
  { id: 'sdv_gil', name: '吉爾 (Gil)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/64/Gil.png', role: '搖椅上頒獎老人' },
  { id: 'sdv_gunther', name: '岡瑟 (Gunther)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3d/Gunther.png', role: '博物館珍寶鑑定' },
  { id: 'sdv_mr_qi', name: '齊先生 (Mr. Qi)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/b4/Mr._Qi.png', role: '神秘賭場掌控者' },
  { id: 'sdv_professor_snail', name: '斯奈爾教授 (Prof. Snail)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/d4/Professor_Snail.png', role: '化石研究學者' },
  { id: 'sdv_birdie', name: '伯蒂婆婆 (Birdie)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/46/Birdie.png', role: '海邊守望老奶奶' },
  { id: 'sdv_grandpa', name: '親切爺爺 (Grandpa)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/88/Grandpa.png', role: '農場傳承恩師' },
  { id: 'sdv_dwarf', name: '矮人 (Dwarf)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/ed/Dwarf.png', role: '地底炸彈商人' },
  { id: 'sdv_morris', name: '莫里斯 (Morris)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/90/Morris.png', role: '喬家超市經理' },
  { id: 'sdv_governor', name: '州長總督 (Governor)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/46/Governor.png', role: '夏日夏威夷宴會評審' },
  { id: 'sdv_bouncer', name: '墨鏡保鏢 (Bouncer)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f5/Bouncer.png', role: '俱樂部守門保鏢' },
  { id: 'sdv_henchman', name: '女巫心腹 (Henchman)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/21/Henchman_Portrait_1.png', role: '哥布林守門人' },
  { id: 'sdv_fizz', name: '特使菲茲 (Fizz)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a3/Fizz_00.png', role: '齊先生高級特工' },
  { id: 'sdv_mayor_portrait', name: '劉易斯鎮長 (Lewis)', category: 'villagers', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2b/Lewis.png', role: '鵜鶘鎮長老官' },

  // --- 3. 傳奇神魚與水族 (Legendary Fish & Aquatic) ---
  { id: 'sdv_legend_fish', name: '春日傳奇魚王 (Legend)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/10/Legend.png', sprite: 'chicken', role: '雨天山林湖之王' },
  { id: 'sdv_crimsonfish', name: '夏日緋紅魚 (Crimsonfish)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/dc/Crimsonfish.png', sprite: 'chicken', role: '東碼頭海中巨怪' },
  { id: 'sdv_angler', name: '秋日鮟鱇魚 (Angler)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/b/bf/Angler.png', sprite: 'chicken', role: '木橋小瀑布之王' },
  { id: 'sdv_glacierfish', name: '冬日冰川魚 (Glacierfish)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fd/Glacierfish.png', sprite: 'chicken', role: '箭頭島極寒霸主' },
  { id: 'sdv_mutant_carp', name: '變種巨鯉魚 (Mutant Carp)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/cb/Mutant_Carp.png', sprite: 'chicken', role: '下水道綠光魚' },
  { id: 'sdv_lava_eel', name: '熔岩鰻魚 (Lava Eel)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/12/Lava_Eel.png', sprite: 'chicken', role: '礦坑100層紅光鰻' },
  { id: 'sdv_void_salmon', name: '虛空鮭魚 (Void Salmon)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/e0/Void_Salmon.png', sprite: 'chicken', role: '女巫沼澤神秘鮭魚' },
  { id: 'sdv_midnight_carp', name: '午夜鯉魚 (Midnight Carp)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/33/Midnight_Carp.png', sprite: 'chicken', role: '深夜湖泊發光鯉' },
  { id: 'sdv_blobfish', name: '水滴魚 (Blobfish)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/7/7f/Blobfish.png', sprite: 'rabbit', role: '深海夜市呆萌魚' },
  { id: 'sdv_spook_fish', name: '幽靈魚 (Spook Fish)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/8c/Spook_Fish.png', sprite: 'chicken', role: '深海潛水艇發光怪' },
  { id: 'sdv_stingray', name: '刺魟魚 (Stingray)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/3a/Stingray.png', sprite: 'chicken', role: '海盜洞穴珍稀魟' },
  { id: 'sdv_octopus', name: '巨型章魚 (Octopus)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/5a/Octopus.png', sprite: 'chicken', role: '難度100超難釣章魚' },
  { id: 'sdv_rainbow_trout', name: '彩虹鱒魚 (Rainbow Trout)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/14/Rainbow_Trout.png', sprite: 'chicken', role: '有機率產出五彩碎片' },
  { id: 'sdv_sturgeon', name: '傳奇鱘魚 (Sturgeon)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/42/Sturgeon.png', sprite: 'chicken', role: '魚子醬珍貴魚種' },
  { id: 'sdv_lobster', name: '鮮紅龍蝦 (Lobster)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9f/Lobster.png', sprite: 'chicken', role: '蟹籠頂級美味' },
  { id: 'sdv_crab', name: '海濱螃蟹 (Crab)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/63/Crab.png', sprite: 'rabbit', role: '製作美味蟹餅' },

  // --- 4. 傳奇珍寶、作物與魔法神器 (Treasures, Crops & Artifacts) ---
  { id: 'sdv_stardrop', name: '星之果實 (Stardrop)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a5/Stardrop.png', sprite: 'star_full', role: '最大體力增加' },
  { id: 'sdv_prismatic_shard', name: '五彩碎片 (Prismatic Shard)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/56/Prismatic_Shard.png', sprite: 'gem_diamond', role: '彩虹耀眼神石' },
  { id: 'sdv_golden_pumpkin', name: '百萬黃金南瓜 (Golden Pumpkin)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/94/Golden_Pumpkin.png', sprite: 'coin_gold', role: '萬靈節迷宮終極大獎' },
  { id: 'sdv_pearl', name: '深海夜市珍珠 (Pearl)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f4/Pearl.png', sprite: 'gem_diamond', role: '美人魚的餽贈' },
  { id: 'sdv_rabbits_foot', name: '好運兔子的腳 (Rabbit\'s Foot)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/c/ca/Rabbit%27s_Foot.png', sprite: 'rabbit', role: '全鎮最愛好運禮物' },
  { id: 'sdv_truffle', name: '極品黑松露 (Truffle)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Truffle.png', sprite: 'pig', role: '美味松露油' },
  { id: 'sdv_ancient_fruit', name: '遠古水果 (Ancient Fruit)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/0/01/Ancient_Fruit.png', sprite: 'sunflower', role: '上古傳奇瓊漿' },
  { id: 'sdv_starfruit', name: '奢華楊桃 (Starfruit)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/db/Starfruit.png', sprite: 'star_full', role: '頂級釀酒首選' },
  { id: 'sdv_sweet_gem_berry', name: '寶石甜莓 (Sweet Gem Berry)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/88/Sweet_Gem_Berry.png', sprite: 'sunflower', role: '老老坎諾利最愛' },
  { id: 'sdv_strawberry', name: '甜美草莓 (Strawberry)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/6d/Strawberry.png', sprite: 'sunflower', role: '復活節最熱門作物' },
  { id: 'sdv_pumpkin', name: '秋季巨型南瓜 (Pumpkin)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/6/64/Pumpkin.png', sprite: 'sunflower', role: '農場巨大作物' },
  { id: 'sdv_hot_pepper', name: '火紅辣椒 (Hot Pepper)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f1/Hot_Pepper.png', sprite: 'sunflower', role: '鎮長最愛熱辣蔬菜' },
  { id: 'sdv_blueberry', name: '飽滿藍莓 (Blueberry)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/9/9e/Blueberry.png', sprite: 'sunflower', role: '夏日連續豐收之王' },
  { id: 'sdv_cauliflower', name: '巨大甘藍花 (Cauliflower)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/aa/Cauliflower.png', sprite: 'sunflower', role: '春日巨大農產' },
  { id: 'sdv_fairy_rose', name: '仙女玫瑰 (Fairy Rose)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/5c/Fairy_Rose.png', sprite: 'sunflower', role: '釀出仙女蜂蜜' },
  { id: 'sdv_blue_jazz', name: '藍爵士花 (Blue Jazz)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Blue_Jazz.png', sprite: 'sunflower', role: '幸運午餐原料' },
  { id: 'sdv_parsnip', name: '嫩甜防風草 (Parsnip)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/d/db/Parsnip.png', sprite: 'sunflower', role: '新手村春日根莖' },
  { id: 'sdv_sunflower', name: '盛開向日葵 (Sunflower)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/8/81/Sunflower.png', sprite: 'sunflower', role: '迎向陽光的金色花盤' },
  { id: 'sdv_melon', name: '夏日大甜瓜 (Melon)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/19/Melon.png', sprite: 'melon', role: '清涼解暑粉甜瓜' },
  { id: 'sdv_crystal_fruit', name: '冬日水晶果 (Crystal Fruit)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/16/Crystal_Fruit.png', sprite: 'gem_diamond', role: '冰霜凝結的甜美果實' },
  { id: 'sdv_pineapple', name: '熱帶鳳梨 (Pineapple)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fb/Pineapple.png', sprite: 'sunflower', role: '海濱椰林陽光果香' },
  { id: 'sdv_void_egg', name: '虛空之蛋 (Void Egg)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/58/Void_Egg.png', sprite: 'gem_diamond', role: '女巫午夜飛過' },
  { id: 'sdv_dino_egg', name: '恐龍巨蛋 (Dinosaur Egg)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/a/a1/Dinosaur_Egg.png', sprite: 'dinosaur', role: '孵出史前小龍' },
  { id: 'sdv_iridium_bar', name: '純銥金錠 (Iridium Bar)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f3/Iridium_Bar.png', sprite: 'gem_diamond', role: '極品工具升級' },
  { id: 'sdv_gold_bar', name: '黃金金錠 (Gold Bar)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/4/4e/Gold_Bar.png', sprite: 'coin_gold', role: '閃亮農具鑄造' },
  { id: 'sdv_galaxy_sword', name: '銀河之劍 (Galaxy Sword)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/30/Galaxy_Sword.png', sprite: 'gem_diamond', role: '沙漠三石柱召喚神兵' },
  { id: 'sdv_infinity_blade', name: '無限之刃 (Infinity Blade)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/e/eb/Infinity_Blade.png', sprite: 'gem_diamond', role: '火山鍛造終極神劍' },
  { id: 'sdv_return_scepter', name: '回歸權杖 (Return Scepter)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/38/Return_Scepter.png', sprite: 'coin_gold', role: '瞬間傳送回農舍門口' },
  { id: 'sdv_horse_flute', name: '召喚馬笛 (Horse Flute)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/1/13/Horse_Flute.png', sprite: 'coin_gold', role: '吹響即刻召喚愛馬' },
  { id: 'sdv_magic_candy', name: '魔法搖滾糖 (Magic Rock Candy)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/2/2f/Magic_Rock_Candy.png', sprite: 'star_full', role: '全屬性頂級狂暴增益' },
  { id: 'sdv_lucky_lunch', name: '幸運午餐 (Lucky Lunch)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/5/5d/Lucky_Lunch.png', sprite: 'coin_gold', role: '運氣大增爆金光' },
  { id: 'sdv_pink_cake', name: '夢幻粉紅蛋糕 (Pink Cake)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/3/32/Pink_Cake.png', sprite: 'coin_gold', role: '哈維與海莉的最愛甜點' },
  { id: 'sdv_spicy_eel', name: '香辣烤鰻魚 (Spicy Eel)', category: 'treasures', url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/f2/Spicy_Eel.png', sprite: 'coin_gold', role: '下礦跑速＋運氣神料理' },
  { id: 'sunflower', name: '盛開向日葵 (Sunflower)', category: 'treasures', sprite: 'sunflower', role: '夏日燦爛陽光' },
];

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

// 0 to 1000 分 Farm Tier System (Every 100 points unlocks a distinct farm background & facility upgrade)
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
      unlockedAnimals: ['待照料小母雞'],
      maxCapacity: 1,
      featureDescription: '目前為負分狀態，農地被陰雨與雜草覆蓋！努力加分回到正分即可恢復晴朗綠意！',
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
        expansionSummary: '目前處於負分陰雨期，圍欄與水槽待修繕，回到 0 分以上將立刻重現青翠農舍！',
      },
    };
  }

  const clampedPoints = Math.max(0, points);

  if (clampedPoints >= 1000) {
    return {
      tierNumber: 11,
      tierName: '星露極光傳奇仙境 (1000分 MAX)',
      themeStyle: 'legendary_haven',
      bgGradient: 'from-amber-100 via-yellow-100 to-emerald-200',
      cardSkyColor: '#fef08a',
      groundColor: '#15803d',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.map((a) => a.name.split(' ')[0]),
      maxCapacity: 100,
      featureDescription: '達成 1000 分巔峰成就！10 種專屬背景、15 種動物與 16 種植物圖鑑全部解鎖！',
      expansion: {
        level: 11,
        levelTitle: 'Lv.10 星露極光仙境 (1000分)',
        minPoints: 1000,
        nextPoints: null,
        fenceType: 'celestial_barrier',
        fenceName: '星露極光水晶結界護欄',
        waterTroughType: 'celestial_spring',
        waterTroughName: '七彩極光·星露女神湧泉',
        decorations: ['星露榮譽金盃', '極光水晶宮殿', '浮空星燈', '七彩瀑布'],
        expansionSummary: '1000 分終極背景解鎖！七彩極光映照星露仙境，全圖鑑圓滿收集！',
      },
    };
  } else if (clampedPoints >= 900) {
    return {
      tierNumber: 10,
      tierName: '皇家金輝黃金天宮 (900分)',
      themeStyle: 'golden_estate',
      bgGradient: 'from-amber-100 via-orange-50 to-yellow-100',
      cardSkyColor: '#fde68a',
      groundColor: '#166534',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 90,
      featureDescription: '900 分解鎖皇家黃金時鐘塔與雙層純金噴泉，距離傳奇仙境僅剩最後 100 分！',
      expansion: {
        level: 10,
        levelTitle: 'Lv.9 皇家金輝天宮 (900分)',
        minPoints: 900,
        nextPoints: 1000,
        fenceType: 'golden_fence',
        fenceName: '皇家黃金帝國雕花護欄',
        waterTroughType: 'golden_fountain',
        waterTroughName: '皇家黃金天鵝噴泉 (金色活水)',
        decorations: ['黃金鐘樓', '迎賓金門', '繁花拱門', '黃金蓮花池'],
        expansionSummary: '900 分背景解鎖！黃金鐘樓矗立農莊中央，氣勢恢宏！',
      },
    };
  } else if (clampedPoints >= 800) {
    return {
      tierNumber: 9,
      tierName: '珊瑚海濱度假農莊 (800分)',
      themeStyle: 'seaside_resort',
      bgGradient: 'from-sky-50 via-amber-50 to-teal-100',
      cardSkyColor: '#bae6fd',
      groundColor: '#16a34a',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 80,
      featureDescription: '800 分解鎖海濱夕陽農莊！木棧道直通紅白燈塔，椰林間種滿鳳梨與甜瓜！',
      expansion: {
        level: 9,
        levelTitle: 'Lv.8 珊瑚海濱度假莊 (800分)',
        minPoints: 800,
        nextPoints: 900,
        fenceType: 'golden_fence',
        fenceName: '海濱椰林精緻木柵欄',
        waterTroughType: 'marble_fountain',
        waterTroughName: '珊瑚貝殼清泉水池',
        decorations: ['紅白燈塔', '海岸木棧道', '熱帶椰子樹', '夕陽觀景台'],
        expansionSummary: '800 分海濱背景解鎖！聽著浪濤聲照料海邊鳳梨園與小恐龍！',
      },
    };
  } else if (clampedPoints >= 700) {
    return {
      tierNumber: 8,
      tierName: '星月魔法高塔農莊 (700分)',
      themeStyle: 'moonlit_tower',
      bgGradient: 'from-indigo-50 via-purple-50 to-slate-100',
      cardSkyColor: '#c7d2fe',
      groundColor: '#15803d',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 70,
      featureDescription: '700 分解鎖星夜魔法高塔！微光藍花與星輝池塘在星空下柔和閃耀！',
      expansion: {
        level: 8,
        levelTitle: 'Lv.7 星月魔法植物園 (700分)',
        minPoints: 700,
        nextPoints: 800,
        fenceType: 'iridium_fence',
        fenceName: '星輝紫晶附魔燈柱欄',
        waterTroughType: 'iridium_crystal_fountain',
        waterTroughName: '星光螢火魔力靈泉',
        decorations: ['法師尖塔', '夜間螢光花圃', '魔力許願水池', '星空觀測台'],
        expansionSummary: '700 分星月背景解鎖！魔法尖塔與螢光水晶果讓夜晚也繽紛多彩！',
      },
    };
  } else if (clampedPoints >= 600) {
    return {
      tierNumber: 7,
      tierName: '櫻花溫泉別院 (600分)',
      themeStyle: 'sakura_springs',
      bgGradient: 'from-pink-50 via-rose-50 to-emerald-100',
      cardSkyColor: '#fbcfe8',
      groundColor: '#16a34a',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 60,
      featureDescription: '600 分解鎖櫻花溫泉別院！露天溫泉池、朱紅小橋與錦鯉池美不勝收！',
      expansion: {
        level: 7,
        levelTitle: 'Lv.6 櫻花溫泉別院 (600分)',
        minPoints: 600,
        nextPoints: 700,
        fenceType: 'wrought_iron',
        fenceName: '和風石燈籠庭園步道',
        waterTroughType: 'marble_fountain',
        waterTroughName: '天然岩石暖泉與錦鯉池',
        decorations: ['粉櫻花樹', '朱紅拱橋', '石雕庭園燈', '露天溫泉池'],
        expansionSummary: '600 分櫻花背景解鎖！花瓣飄落溫泉水面，夢幻藍雞正式報到！',
      },
    };
  } else if (clampedPoints >= 500) {
    return {
      tierNumber: 6,
      tierName: '紫晶附魔秘境莊園 (500分)',
      themeStyle: 'junimo_grove',
      bgGradient: 'from-purple-50 via-pink-50 to-emerald-100',
      cardSkyColor: '#f3e8ff',
      groundColor: '#15803d',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 55,
      featureDescription: '500 分解鎖紫晶附魔秘境！水晶噴泉與秋日大南瓜讓莊園閃耀紫晶光輝！',
      expansion: {
        level: 6,
        levelTitle: 'Lv.5 紫晶附魔莊園 (500分)',
        minPoints: 500,
        nextPoints: 600,
        fenceType: 'iridium_fence',
        fenceName: '附魔紫晶強化護欄 (夜間微光)',
        waterTroughType: 'iridium_crystal_fountain',
        waterTroughName: '銥金晶石多層湧泉 (甘醇泉水)',
        decorations: ['紫晶能量噴泉', '典雅石砌大宅', '紫晶路燈', '水果林園'],
        expansionSummary: '500 分背景解鎖！半山紫晶噴泉落成，綿羊與松露萌豬快來了！',
      },
    };
  } else if (clampedPoints >= 400) {
    return {
      tierNumber: 5,
      tierName: '琉璃溫室花坊莊園 (400分)',
      themeStyle: 'glass_greenhouse',
      bgGradient: 'from-emerald-50 via-teal-50 to-lime-100',
      cardSkyColor: '#d1fae5',
      groundColor: '#16a34a',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 45,
      featureDescription: '400 分解鎖維多利亞玻璃溫室！鍛鐵雕花拱門與玫瑰薰衣草花海盛開！',
      expansion: {
        level: 5,
        levelTitle: 'Lv.4 琉璃溫室花坊 (400分)',
        minPoints: 400,
        nextPoints: 500,
        fenceType: 'wrought_iron',
        fenceName: '鍛鐵精工雕花拱門護欄',
        waterTroughType: 'copper_auto_trough',
        waterTroughName: '溫室恆溫自動滴灌噴水池',
        decorations: ['玻璃大溫室', '薰衣草花田', '玫瑰花圃', '石磚農舍'],
        expansionSummary: '400 分背景解鎖！豪華玻璃溫室與鍛鐵雕花護欄展現大師級氣派！',
      },
    };
  } else if (clampedPoints >= 300) {
    return {
      tierNumber: 4,
      tierName: '河畔水車果園農莊 (300分)',
      themeStyle: 'bountiful_ranch',
      bgGradient: 'from-orange-50 via-amber-50 to-lime-100',
      cardSkyColor: '#ffedd5',
      groundColor: '#16a34a',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 38,
      featureDescription: '300 分解鎖溪畔水車與果樹林！木橋橫跨清澈溪流，甜瓜與南瓜大豐收！',
      expansion: {
        level: 4,
        levelTitle: 'Lv.3 河畔水車果園莊 (300分)',
        minPoints: 300,
        nextPoints: 400,
        fenceType: 'ranch_rail',
        fenceName: '果園原木柵欄與石板小徑',
        waterTroughType: 'copper_auto_trough',
        waterTroughName: '溪畔水車引流清泉槽',
        decorations: ['水車磨坊小屋', '溪流木拱橋', '蘋果橘子果園', '整齊南瓜田'],
        expansionSummary: '300 分背景解鎖！水流推動木水車，果園結實纍纍！',
      },
    };
  } else if (clampedPoints >= 200) {
    return {
      tierNumber: 3,
      tierName: '紅屋頂牧場家園 (200分)',
      themeStyle: 'thriving_coop',
      bgGradient: 'from-emerald-50 via-lime-50 to-amber-100',
      cardSkyColor: '#dcfce7',
      groundColor: '#22c55e',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 28,
      featureDescription: '200 分解鎖紅屋頂農莊！建造大穀倉與高聳筒倉，野鴨、兔兔與牛兒歡聚！',
      expansion: {
        level: 3,
        levelTitle: 'Lv.2 紅屋頂牧場家園 (200分)',
        minPoints: 200,
        nextPoints: 300,
        fenceType: 'ranch_rail',
        fenceName: '雙層紅木牧場圍欄',
        waterTroughType: 'stone_basin',
        waterTroughName: '牧場清泉石砌水塘',
        decorations: ['紅色大穀倉', '紅磚筒倉', '雙色菜田', '溪邊木橋'],
        expansionSummary: '200 分背景解鎖！擁有正式穀倉與大片蔬菜園，朝繁榮莊園邁進！',
      },
    };
  } else if (clampedPoints >= 100) {
    return {
      tierNumber: 2,
      tierName: '向日葵晨曦農舍 (100分)',
      themeStyle: 'sunflower_meadow',
      bgGradient: 'from-yellow-50 via-lime-50 to-emerald-100',
      cardSkyColor: '#fef9c3',
      groundColor: '#4ade80',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= clampedPoints).map((a) => a.name.split(' ')[0]),
      maxCapacity: 18,
      featureDescription: '恭喜突破 100 分！解鎖首個新背景：向日葵與草莓花圃盛開，並築起石頭水井！',
      expansion: {
        level: 2,
        levelTitle: 'Lv.1 向日葵晨曦農舍 (100分)',
        minPoints: 100,
        nextPoints: 200,
        fenceType: 'hardwood',
        fenceName: '堅固硬木圍欄與石砌矮牆',
        waterTroughType: 'stone_basin',
        waterTroughName: '青石雕鑿水井與小水塘',
        decorations: ['石砌水井', '向日葵花圃', '紅草莓田', '林間小池塘'],
        expansionSummary: '100 分新背景解鎖！農舍升級並添置石水井，向日葵迎風微笑！',
      },
    };
  } else {
    return {
      tierNumber: 1,
      tierName: '原木初建牧區 (0分起步)',
      themeStyle: 'starter_dirt',
      bgGradient: 'from-stone-100 via-amber-50 to-stone-200',
      cardSkyColor: '#f5f5f4',
      groundColor: '#854d0e',
      unlockedPlants: LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= clampedPoints).map((p) => p.name.split(' ')[0]),
      unlockedAnimals: ['純白小母雞'],
      maxCapacity: 5,
      featureDescription: '剛耕耘的肥沃土地！湊夠 100 分即可解鎖第一個新農莊背景「向日葵晨曦農舍」！',
      expansion: {
        level: 1,
        levelTitle: 'Lv.0 原木初建起步期 (0分)',
        minPoints: 0,
        nextPoints: 100,
        fenceType: 'simple_wood',
        fenceName: '粗鋸原木木樁圍欄 (樸實天然)',
        waterTroughType: 'wooden_trough',
        waterTroughName: '杉木手工釘製水槽 (清冽井水)',
        decorations: ['小木屋', '小菜園', '原木柵欄'],
        expansionSummary: '開拓起步！累計至 100 分即可解鎖下一個新背景！',
      },
    };
  }
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
