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

// 0 to 1000 分 Farm Tier System with Farm Expansion (圍欄、水槽、裝飾物件自動升級)
export function getFarmTier(points: number): FarmTierInfo {
  const clampedPoints = Math.max(0, points);

  if (clampedPoints >= 1000) {
    return {
      tierNumber: 7,
      tierName: '星露谷傳奇極致天堂 (MAX 1000分)',
      themeStyle: 'legendary_haven',
      bgGradient: 'from-amber-100 via-yellow-100 to-emerald-200',
      cardSkyColor: '#fef08a',
      groundColor: '#15803d',
      unlockedPlants: ['金色巨南瓜', '星露果實', '遠古水果', '仙女玫瑰花海', '甜瓜果園', '向日葵花田', '草莓園', '野生防風草'],
      unlockedAnimals: ['極品黃金雞', '忠心駿馬', '草原鴕鳥', '遠古恐龍', '虛空幽靈雞', '夢幻藍雞', '松露萌豬', '蓬鬆綿羊', '山羊', '黃金棕牛', '純潔白牛', '幸運雪兔', '綠頭野鴨', '棕羽母雞', '純白小母雞'],
      maxCapacity: 100,
      featureDescription: '達成1000分巔峰成就！15種真實農場動物全滿載，動植物大狂歡！',
      expansion: {
        level: 7,
        levelTitle: 'Lv.MAX 星露傳奇天宮',
        minPoints: 1000,
        nextPoints: null,
        fenceType: 'celestial_barrier',
        fenceName: '星露傳奇結界護欄 (極致銥晶流光)',
        waterTroughType: 'celestial_spring',
        waterTroughName: '萬物生息·星露女神神泉 (彩虹湧泉)',
        decorations: ['星露榮譽金盃', '黃金時鐘', '純金女神雕像', '七彩祥雲', '銥金自動撫摸機'],
        expansionSummary: '終極農場擴建完工！全自動神泉灌溉，傳奇結界護佑，滿分金盃閃耀！',
      },
    };
  } else if (clampedPoints >= 750) {
    return {
      tierNumber: 6,
      tierName: '黃金豐收莊園 (750分+)',
      themeStyle: 'golden_estate',
      bgGradient: 'from-amber-50 via-orange-50 to-emerald-100',
      cardSkyColor: '#fed7aa',
      groundColor: '#166534',
      unlockedPlants: ['星露果實', '遠古水果', '仙女玫瑰', '巨型秋季南瓜', '甜瓜', '向日葵', '草莓'],
      unlockedAnimals: ['遠古恐龍', '虛空幽靈雞', '夢幻藍雞', '松露萌豬', '蓬鬆綿羊', '山羊', '黃金棕牛', '純潔白牛', '幸運雪兔', '綠頭野鴨', '棕羽母雞', '純白小母雞'],
      maxCapacity: 80,
      featureDescription: '擁有遠古恐龍與虛空雞，田地碩大肥沃，金黃燦爛！',
      expansion: {
        level: 6,
        levelTitle: 'Lv.6 皇家金輝莊園擴建',
        minPoints: 750,
        nextPoints: 1000,
        fenceType: 'golden_fence',
        fenceName: '皇家黃金帝國護欄 (金雕鏤空)',
        waterTroughType: 'golden_fountain',
        waterTroughName: '皇家黃金天鵝噴泉 (金色活水)',
        decorations: ['黃金迎賓大門', '星輝路燈', '古典繁花拱門', '紅木野餐長椅'],
        expansionSummary: '奢華莊園擴建！黃金護欄與天鵝噴泉落成，金碧輝煌！',
      },
    };
  } else if (clampedPoints >= 500) {
    return {
      tierNumber: 5,
      tierName: '祝尼魔秘境林地 (500分+)',
      themeStyle: 'junimo_grove',
      bgGradient: 'from-purple-50 via-pink-50 to-emerald-100',
      cardSkyColor: '#f3e8ff',
      groundColor: '#15803d',
      unlockedPlants: ['仙女玫瑰花海', '結實蘋果樹', '巨型秋季南瓜', '甜瓜田', '向日葵', '草莓'],
      unlockedAnimals: ['松露萌豬', '蓬鬆綿羊', '山羊', '黃金棕牛', '純潔白牛', '幸運雪兔', '綠頭野鴨', '棕羽母雞', '純白小母雞'],
      maxCapacity: 60,
      featureDescription: '松露萌豬歡喜拱松露，綿羊與乳牛在草地上悠閒吃草！',
      expansion: {
        level: 5,
        levelTitle: 'Lv.5 秘境林地附魔擴建',
        minPoints: 500,
        nextPoints: 750,
        fenceType: 'iridium_fence',
        fenceName: '附魔紫晶強化護欄 (夜間微光)',
        waterTroughType: 'iridium_crystal_fountain',
        waterTroughName: '銥金晶石多層湧泉 (甘醇泉水)',
        decorations: ['祝尼魔小木亭', '紫晶路燈', '魔法水晶花壇', '石板大道'],
        expansionSummary: '林地秘境擴建！鋪設銥金護欄與晶石水池，動物心情大好！',
      },
    };
  } else if (clampedPoints >= 300) {
    return {
      tierNumber: 4,
      tierName: '大豐收果園農莊 (300分+)',
      themeStyle: 'bountiful_ranch',
      bgGradient: 'from-orange-50 via-amber-50 to-lime-100',
      cardSkyColor: '#ffedd5',
      groundColor: '#16a34a',
      unlockedPlants: ['巨型秋季南瓜', '夏日大甜瓜', '向日葵田', '鮮紅草莓園', '野生防風草'],
      unlockedAnimals: ['山羊', '黃金棕牛', '純潔白牛', '幸運雪兔', '綠頭野鴨', '棕羽母雞', '純白小母雞'],
      maxCapacity: 45,
      featureDescription: '白牛與棕牛漫步草地，南瓜碩大飽滿，農莊生機勃勃！',
      expansion: {
        level: 4,
        levelTitle: 'Lv.4 鐵藝果園莊園擴建',
        minPoints: 300,
        nextPoints: 500,
        fenceType: 'wrought_iron',
        fenceName: '鍛鐵精工雕花護欄 (堅固防風)',
        waterTroughType: 'marble_fountain',
        waterTroughName: '漢白玉雙層噴泉水槽 (清泉激盪)',
        decorations: ['甘泉水井', '復古風向雞', '鵝卵石休閒小徑', '遮陽花架'],
        expansionSummary: '莊園全面擴建！升級為鍛鐵雕花欄杆與雙層大理石噴泉！',
      },
    };
  } else if (clampedPoints >= 150) {
    return {
      tierNumber: 3,
      tierName: '熱鬧牧場家園 (150分+)',
      themeStyle: 'thriving_coop',
      bgGradient: 'from-emerald-50 via-lime-50 to-amber-100',
      cardSkyColor: '#dcfce7',
      groundColor: '#22c55e',
      unlockedPlants: ['夏日大甜瓜', '金黃玉米叢', '向日葵花田', '鮮紅草莓'],
      unlockedAnimals: ['幸運雪兔', '綠頭野鴨', '棕羽母雞', '純白小母雞'],
      maxCapacity: 30,
      featureDescription: '建造了雞舍與水塘，小雞、野鴨與白兔歡樂奔跑！',
      expansion: {
        level: 3,
        levelTitle: 'Lv.3 白木牧場設施擴建',
        minPoints: 150,
        nextPoints: 300,
        fenceType: 'ranch_rail',
        fenceName: '鄉村白漆牧場木柵欄 (開闊牧區)',
        waterTroughType: 'copper_auto_trough',
        waterTroughName: '純銅自動閥門水槽 (恆定注水)',
        decorations: ['木棧觀景台', '清涼水塘石階', '稻草人立柱', '木箱花圃'],
        expansionSummary: '牧場初具規模！增設白木欄杆與純銅自動補水槽！',
      },
    };
  } else if (clampedPoints >= 50) {
    return {
      tierNumber: 2,
      tierName: '向日葵草青農圃 (50分+)',
      themeStyle: 'sunflower_meadow',
      bgGradient: 'from-yellow-50 via-lime-50 to-emerald-100',
      cardSkyColor: '#fef9c3',
      groundColor: '#4ade80',
      unlockedPlants: ['盛開向日葵', '鮮紅草莓', '初生防風草'],
      unlockedAnimals: ['純白小母雞'],
      maxCapacity: 15,
      featureDescription: '向日葵綻放笑臉，純白小母雞圍繞在草地上啄米！',
      expansion: {
        level: 2,
        levelTitle: 'Lv.2 硬木圍欄田園擴建',
        minPoints: 50,
        nextPoints: 150,
        fenceType: 'hardwood',
        fenceName: '堅固硬木圍欄 (十字榫卯)',
        waterTroughType: 'stone_basin',
        waterTroughName: '青石雕鑿防漏水槽 (蓄存甘露)',
        decorations: ['守護稻草人', '農用木推車', '石板小徑'],
        expansionSummary: '田園圍欄升級！鋪設堅固硬木柵欄與防漏青石水槽！',
      },
    };
  } else {
    return {
      tierNumber: 1,
      tierName: '開拓耕地嫩芽圃 (0分+)',
      themeStyle: 'starter_dirt',
      bgGradient: 'from-stone-100 via-amber-50 to-stone-200',
      cardSkyColor: '#f5f5f4',
      groundColor: '#854d0e',
      unlockedPlants: ['嫩綠小麥苗', '初生防風草嫩芽'],
      unlockedAnimals: ['純白小母雞 (農場咕咕雞)'],
      maxCapacity: 5,
      featureDescription: '剛耕耘的肥沃土壤，純白小雞正在尋覓種子！',
      expansion: {
        level: 1,
        levelTitle: 'Lv.1 原木初建起步期',
        minPoints: 0,
        nextPoints: 50,
        fenceType: 'simple_wood',
        fenceName: '粗鋸原木木樁圍欄 (樸實天然)',
        waterTroughType: 'wooden_trough',
        waterTroughName: '杉木手工釘製水槽 (清冽井水)',
        decorations: ['乾草捆', '木質小水桶'],
        expansionSummary: '開拓起步！以粗原木木樁圈定牧區，杉木小水槽供動物飲用。',
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
