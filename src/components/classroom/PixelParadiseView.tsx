import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import { STARDEW_AVATARS } from '../../data/classroomData';
import { soundManager } from '../../utils/sound';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  X,
  Volume2,
  VolumeX,
  Search,
  Heart,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Crosshair,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { ParadiseAnimatedBackdrop } from './ParadiseAnimatedBackdrop';

// Wide panoramic 16-bit retro pixel art game world maps (Stardew Valley style, 16:9 expansive scenery)
import autumnBg from '../../assets/images/paradise_wide_autumn_1794664724856.jpg';
import springBg from '../../assets/images/paradise_wide_spring_1794664721186.jpg';
import summerBg from '../../assets/images/paradise_wide_summer_1794664723512.jpg';
import winterBg from '../../assets/images/paradise_wide_winter_1794664724169.jpg';
import sakuraBg from '../../assets/images/paradise_wide_sakura_1794831906929.jpg';
import starlightBg from '../../assets/images/paradise_wide_starlight_1794831907811.jpg';
import tropicalBg from '../../assets/images/paradise_wide_tropical_1794831908752.jpg';
import skycastleBg from '../../assets/images/paradise_wide_skycastle_1794831909789.jpg';
import englishbookBg from '../../assets/images/paradise_wide_englishbook_1794919908315.jpg';
import pinyinBg from '../../assets/images/paradise_wide_pinyin_1794919908584.jpg';
import polarBg from '../../assets/images/theme_polar_arctic_1795428667683.jpg';
import volcanoBg from '../../assets/images/theme_volcano_lava_1795428666672.jpg';
import blizzardBg from '../../assets/images/theme_blizzard_mountain_1795428666505.jpg';
import candyBg from '../../assets/images/theme_candy_drinks_1795428666849.jpg';
import underwaterBg from '../../assets/images/theme_underwater_ocean_1795428666589.jpg';
import junkfoodBg from '../../assets/images/theme_junk_food_1795428746765.jpg';
import dinoBg from '../../assets/images/theme_dino_jungle_1795428666405.jpg';
import parisBg from '../../assets/images/paradise_paris_eiffel_1795430843298.jpg';

import { PointsFeedbackModal, PointsFeedbackData } from './PointsFeedbackModal';

import { pokemonSound } from '../../utils/pokemonAudio';

export type ParadiseSeason =
  | 'autumn'
  | 'spring'
  | 'summer'
  | 'winter'
  | 'sakura'
  | 'starlight'
  | 'tropical'
  | 'skycastle'
  | 'englishbook'
  | 'pinyin'
  | 'polar'
  | 'volcano'
  | 'blizzard'
  | 'candy'
  | 'underwater'
  | 'junkfood'
  | 'dino'
  | 'paris';
export type ParadiseTimeOfDay = 'day' | 'dawn' | 'sunset' | 'night';

// World expansion multiplier & native 16:9 panoramic aspect ratio
const WORLD_SCALE = 1.5;
const WORLD_ASPECT = 16 / 9;
const MAX_ZOOM = 2.4;

// Auto-determine season according to real-world calendar month
export function getSeasonByMonth(month = new Date().getMonth() + 1): ParadiseSeason {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// Determine the student's unique Stardew Valley companion avatar strictly from their roster selection
function resolveStardewCompanion(student: Student, index: number): string {
  if (student.stardewAvatar && student.stardewAvatar.trim() !== '') {
    return student.stardewAvatar;
  }
  if (student.avatar && student.avatar.trim() !== '') {
    return student.avatar;
  }
  const defaultItem = STARDEW_AVATARS[index % STARDEW_AVATARS.length]?.id || 'sdv_white_chicken';
  return defaultItem;
}

const CLASSIC_LAKE_SEASONS = new Set<ParadiseSeason>(['spring', 'summer', 'autumn', 'winter']);

const PARADISE_LOOP_VIDEOS: Partial<Record<ParadiseSeason, string>> = {
  polar: '/assets/videos/paradise_polar_arctic.mp4',
  volcano: '/assets/videos/paradise_volcano_lava.mp4',
  blizzard: '/assets/videos/paradise_blizzard_mountain.mp4',
  candy: '/assets/videos/paradise_candy_drinks.mp4',
  underwater: '/assets/videos/paradise_underwater_ocean.mp4',
  paris: '/assets/videos/paradise_paris_eiffel.mp4',
};

// 9 spatial world regions (3x3 grid) so companions visit genuinely varied areas instead of bouncing in one spot
const PARADISE_MAP_ZONES = [
  { id: 0, minX: 6, maxX: 31, minY: 13, maxY: 34 },  // NW
  { id: 1, minX: 35, maxX: 63, minY: 13, maxY: 34 }, // N-Mid
  { id: 2, minX: 67, maxX: 93, minY: 13, maxY: 36 }, // NE
  { id: 3, minX: 6, maxX: 31, minY: 38, maxY: 62 },  // W-Mid
  { id: 4, minX: 35, maxX: 63, minY: 38, maxY: 62 }, // Center
  { id: 5, minX: 67, maxX: 93, minY: 39, maxY: 62 }, // E-Mid
  { id: 6, minX: 6, maxX: 32, minY: 66, maxY: 89 },  // SW
  { id: 7, minX: 36, maxX: 61, minY: 66, maxY: 89 }, // S-Mid
  { id: 8, minX: 67, maxX: 93, minY: 67, maxY: 89 }, // SE
];

// Walkable lower ground zones specifically for Paris Eiffel Tower scene (Champ de Mars, Cafe plaza, bridge & lower-left garden; never in the upper sky)
const PARIS_GROUND_ZONES = [
  { id: 0, minX: 7, maxX: 37, minY: 62, maxY: 83 },  // West promenade & Le Cafe de Mars terrace
  { id: 1, minX: 40, maxX: 73, minY: 49, maxY: 63 }, // Upper Champ de Mars lawn beneath the Eiffel Tower
  { id: 2, minX: 38, maxX: 60, minY: 63, maxY: 79 }, // Central flowerbed park pathways
  { id: 3, minX: 62, maxX: 91, minY: 57, maxY: 74 }, // East fountain courtyard
  { id: 4, minX: 16, maxX: 82, minY: 75, maxY: 84 }, // South riverside promenade & bridge approach
  { id: 5, minX: 6, maxX: 31, minY: 81, maxY: 94 },  // Southwest garden park
];

// Keep land companions within walkable ground (respecting SE lake on classic maps & sky/Seine bounds on Paris Eiffel Tower map)
function sanitizeLandPoint(
  x: number,
  y: number,
  avoidSeLake = false,
  isParis = false
): { x: number; y: number } {
  const cx = Math.max(4, Math.min(95, x));
  if (isParis) {
    let cy = Math.max(49, Math.min(94, y));
    // Stone bridge crossing over Seine canal is walkable
    if (cx >= 72 && cx <= 83 && cy >= 78 && cy <= 93) {
      return { x: cx, y: cy };
    }
    // Southwest garden courtyard is walkable
    if (cx <= 32) {
      return { x: cx, y: cy };
    }
    // Keep land companions on the riverside promenade above the Seine River canal
    if (cx > 83 && cy > 80) {
      cy = 79.5;
    } else if (cy > 84.5) {
      cy = 84;
    }
    return { x: cx, y: cy };
  }

  const cy = Math.max(11, Math.min(90, y));
  if (!avoidSeLake) {
    return { x: cx, y: cy };
  }
  if (cx >= 65 && cx <= 88 && cy >= 64 && cy <= 71) {
    return { x: cx, y: cy };
  }
  if (cx > 65 && cy > 69) {
    if (cx - 65 < cy - 69) {
      return { x: 61, y: cy };
    }
    return { x: cx, y: 63 };
  }
  return { x: cx, y: cy };
}

function getZoneIndexForPoint(x: number, y: number, isParis = false): number {
  if (isParis) {
    if (x < 33 && y >= 81) return 5;
    if (x < 38) return 0;
    if (y < 63 && x <= 73) return 1;
    if (x >= 62 && y < 74) return 3;
    if (y >= 75) return 4;
    return 2;
  }
  const col = x < 34 ? 0 : x < 66 ? 1 : 2;
  const row = y < 37 ? 0 : y < 65 ? 1 : 2;
  return row * 3 + col;
}

function pickRandomZonePoint(
  recentZones: number[] = [],
  currentX = 50,
  currentY = 50,
  avoidSeLake = false,
  isParis = false
): { x: number; y: number; zoneId: number } {
  const zones = isParis ? PARIS_GROUND_ZONES : PARADISE_MAP_ZONES;
  const currentZone = getZoneIndexForPoint(currentX, currentY, isParis);
  const blocked = new Set<number>([currentZone, ...recentZones.slice(-3)]);
  if (avoidSeLake && !isParis) {
    blocked.add(8);
  }
  let candidates = zones.filter((z) => !blocked.has(z.id));
  if (candidates.length === 0) {
    candidates = zones.filter((z) => z.id !== currentZone && (isParis || !avoidSeLake || z.id !== 8));
  }
  if (candidates.length === 0) {
    candidates = zones;
  }
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  const rawX = chosen.minX + Math.random() * (chosen.maxX - chosen.minX);
  const rawY = chosen.minY + Math.random() * (chosen.maxY - chosen.minY);
  const pt = sanitizeLandPoint(rawX, rawY, avoidSeLake, isParis);
  return { x: pt.x, y: pt.y, zoneId: chosen.id };
}

// Builds an irregular, non-linear multi-waypoint route across varied walkable regions of the map
function buildIrregularRoute(
  startX: number,
  startY: number,
  recentZones: number[] = [],
  avoidSeLake = false,
  isSprint = false,
  isAquatic = false,
  isUnderwaterWorld = false,
  isParis = false
): { waypoints: Array<{ x: number; y: number }>; nextRecentZones: number[] } {
  if (isAquatic && isParis && !isSprint) {
    // Ducks & turtles can paddle playfully along the Seine river canal at the bottom
    const pt = { x: 37 + Math.random() * 31, y: 88 + Math.random() * 7 };
    const curveMid = {
      x: Math.max(36, Math.min(69, (startX + pt.x) / 2 + (Math.random() * 10 - 5))),
      y: Math.max(87, Math.min(95, (startY + pt.y) / 2 + (Math.random() * 4 - 2))),
    };
    return { waypoints: [curveMid, pt], nextRecentZones: recentZones };
  }

  if (isAquatic && !isUnderwaterWorld && !isParis && !isSprint) {
    // Classic aquatic pets can roam widely between lakeside shore, piers, and pond
    const pt =
      Math.random() < 0.35
        ? { x: 52 + Math.random() * 14, y: 63 + Math.random() * 18 }
        : { x: 67 + Math.random() * 26, y: 69 + Math.random() * 21 };
    const curveMid = {
      x: Math.max(46, Math.min(94, (startX + pt.x) / 2 + (Math.random() * 14 - 7))),
      y: Math.max(60, Math.min(91, (startY + pt.y) / 2 + (Math.random() * 12 - 6))),
    };
    return { waypoints: [curveMid, pt], nextRecentZones: recentZones };
  }

  const legCount = isSprint ? 3 : Math.random() < 0.65 ? 2 : 1;
  const waypoints: Array<{ x: number; y: number }> = [];
  const nextRecent = [...recentZones];
  let cursorX = startX;
  let cursorY = startY;

  for (let i = 0; i < legCount; i++) {
    const picked = pickRandomZonePoint(nextRecent, cursorX, cursorY, avoidSeLake, isParis);
    // Insert an off-axis curved detour point so path bends unpredictably instead of linear A<->B movement
    const dx = picked.x - cursorX;
    const dy = picked.y - cursorY;
    const dist = Math.hypot(dx, dy) || 1;
    const perpX = -dy / dist;
    const perpY = dx / dist;
    const curveSign = Math.random() < 0.5 ? 1 : -1;
    const bendOffset = (isParis ? 6 + Math.random() * 10 : 10 + Math.random() * 16) * curveSign;
    const tMid = 0.35 + Math.random() * 0.3;
    const midPt = sanitizeLandPoint(
      cursorX + dx * tMid + perpX * bendOffset,
      cursorY + dy * tMid + perpY * bendOffset,
      avoidSeLake,
      isParis
    );
    if (dist > 22) {
      waypoints.push(midPt);
    }
    waypoints.push({ x: picked.x, y: picked.y });
    nextRecent.push(picked.zoneId);
    cursorX = picked.x;
    cursorY = picked.y;
  }

  return {
    waypoints,
    nextRecentZones: nextRecent.slice(-4),
  };
}

interface CompanionState {
  id: string;
  studentId: string;
  name: string;
  rollNo: number;
  stardewAvatar: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  targetX: number;
  targetY: number;
  waypoints?: Array<{ x: number; y: number }>;
  recentZones?: number[];
  curveSign?: number;
  facing: 'left' | 'right';
  action: 'idle' | 'walking' | 'swimming' | 'resting' | 'perched' | 'celebrating' | 'running';
  speed: number;
  swayPhase: number;
  swaySpeed: number;
  runUntil?: number;
  pauseUntil?: number;
  wanderTimer?: number;
  isAquatic: boolean;
  speechBubble?: string;
  speechType?: 'os' | 'dialogue' | 'action';
  speechExpiresAt?: number;
  floatingText?: { text: string; isPositive: boolean; key: number };
  growthBonus: number;
  lastPetTime?: number;
}

// Random Inner Monologue (OS) lines tailored by context
const LAND_INNER_OS: string[] = [
  '（偷偷在心裡許願：今天也要被老師誇獎✨）',
  '（草地好軟喔，好想在這裡翻個滾…🌱）',
  '（剛剛好像有蝴蝶飛過去？算了追不到🦋）',
  '（其實我偷偷存了不少分，準備升級農場🏡）',
  '（嗯…晚餐吃起司還是草莓派好呢🍓）',
  '（好想看看 1000 分的極光仙境長什麼樣子🌌）',
  '（假裝很認真散步，其實在找四葉幸運草🍀）',
  '（哼著只有自己聽得見的小曲子～🎵）',
  '（今天的太陽公公心情看起來也不錯☀️）',
  '（希望好朋友等一下會經過這裡找我玩🐾）',
  '（舉手回答問題的勇氣 +10！我準備好了🙋）',
  '（呼…深呼吸一下，充滿元氣繼續探險！💪）',
];

const AQUATIC_INNER_OS: string[] = [
  '（水溫剛剛好～泡在水裡最舒服了💧）',
  '（水面下面好像有閃亮亮的魚影游過去🐟）',
  '（踢水踢水～看我划得這麼優雅🏊）',
  '（游累了再去岸邊曬太陽休息一下吧🏖️）',
  '（湖面亮晶晶的，好像灑滿星星✨）',
];

const SEASON_INNER_OS: Record<ParadiseSeason, string[]> = {
  spring: [
    '（聞到淡淡的櫻花香…春天真是太棒了🌸）',
    '（好想吃剛採下來的甜美草莓呀🍓）',
    '（春風吹得眼睛瞇瞇的，好舒服～🌿）',
  ],
  summer: [
    '（大熱天最想咬一口冰涼粉嫩甜瓜了🍈）',
    '（向日葵開得比我還要精神呢🌻）',
    '（聽說湖邊吹來的風特別涼爽喔🌊）',
  ],
  autumn: [
    '（踩在金黃落葉上的聲音好好聽呀🍂）',
    '（不知道今年秋天會不會種出巨型南瓜🎃）',
    '（秋風涼涼的，最適合大家一起野餐啦🧺）',
  ],
  winter: [
    '（呼～吹出白白的霧氣了，好像小雲朵☁️）',
    '（雪地裡的水晶果閃閃發光呢❄️）',
    '（好想喝一碗熱呼呼的玉米濃湯🍲）',
  ],
  sakura: [
    '（整片粉紅櫻花吹雪太浪漫了吧🌸）',
    '（紅橋那邊的茶屋好像有賣三色糰子🍡）',
    '（櫻花花瓣飄進池塘裡像粉紅小船一樣✨）',
  ],
  starlight: [
    '（頭頂上的極光好像在跳舞耶🌌）',
    '（紫色的水晶樹會微微發光，好神奇🔮）',
    '（夜晚的星光市集熱鬧又夢幻✨）',
  ],
  tropical: [
    '（薑島的海風吹起來好消暑喔🏝️）',
    '（沙灘上的椰子樹跟鳳梨田超壯觀🍍）',
    '（好想划著小木船去珊瑚礁探險🌊）',
  ],
  skycastle: [
    '（站在軟綿綿的雲海上看風景太幸福了☁️）',
    '（黃金涼亭的噴泉水聲好療癒呀⛲）',
    '（這裡就是傳說中的天空植物園嗎🌈）',
  ],
  englishbook: [
    '（哇！我竟然住進了立體英文繪本裡面📖）',
    '（前面廣場有巨大的 ABC 積木和鋼筆噴泉呢✒️）',
    '（今天來學幾個新單字吧：Apple、Starlight、Adventure！🌟）',
  ],
  pinyin: [
    '（歡迎來到普通話拼音世界～b p m f 排排站！🏮）',
    '（走過一聲二聲三聲四聲彩虹橋去蓮花池看鯉魚🌈）',
    '（唸對聲調的話，小紅燈籠好像會變得更亮喔✨）',
  ],
  polar: [
    '（南極小企鵝剛剛滑倒滾進雪堆裡，太可愛了吧🐧）',
    '（北極熊寶寶毛茸茸的，好想過去抱一下🐻‍❄️）',
    '（極光閃閃發亮，冰雪世界一點都不覺得冷呢❄️）',
  ],
  volcano: [
    '（哇！岩漿瀑布好壯觀，鞋底都要暖呼呼起來了🌋）',
    '（火山島的黑曜石亮晶晶的，好像隱藏很多寶石💎）',
    '（小心炙熱的岩漿泡泡，一起去橋上吹海風吧🔥）',
  ],
  blizzard: [
    '（哇啊啊～雪山的暴風雪好猛烈，抓緊帽子別被吹走啦🌨️）',
    '（遠處雪山木屋有暖呼呼的燈火，大家快過去取暖🏔️）',
    '（在暴風雪裡大冒險，感覺自己變成超帥的登山家❄️）',
  ],
  candy: [
    '（巧克力河散發香甜的可可味道，好想偷喝一口🍫）',
    '（那邊有巨無霸珍珠奶茶噴泉和草莓甜甜圈耶🧋）',
    '（棉花糖雲朵軟綿綿的，真想在棒棒糖樹下野餐🍭）',
  ],
  underwater: [
    '（咕嚕咕嚕～海龜先生和小章魚從我頭頂游過去了🐢）',
    '（粉紅色的大水母在深海裡發光，好像夢幻燈籠🪼）',
    '（發現閃亮亮的海底寶藏箱！魚群也跟著一起跳舞呢🐠）',
  ],
  junkfood: [
    '（起司漢堡蓋成的大房子也太香了吧！好想咬一口🍔）',
    '（那座披薩摩天輪跟金黃脆薯塔簡直是天堂🍕）',
    '（配上一大杯冰涼可樂跟糖霜甜甜圈，幸福指數爆表🍟）',
  ],
  dino: [
    '（哇！長頸腕龍在吃樹葉，原來恐龍這麼溫柔呀🦕）',
    '（小三角龍搖尾巴好可愛，叢林裡還有發光金琥珀✨）',
    '（穿過瀑布木橋去看看霸王龍大哥有沒有在睡午覺🦖）',
  ],
  paris: [
    '（站在巴黎鐵塔下的草地上散步，夕陽把天空染成粉金色好浪漫呀🗼✨）',
    '（快看！巴黎鐵塔頂端的光束在轉動，整座鐵塔都在閃閃發亮🌟）',
    '（塞納河畔的微風好舒服，真想去旁邊的咖啡館喝一杯熱可可☕）',
  ],
};

const NIGHT_INNER_OS: string[] = [
  '（星星一閃一閃的，數到第 28 顆了🌟）',
  '（螢火蟲飛過身邊！好夢幻喔✨）',
  '（夜晚的樂園安安靜靜的，心情好平靜🌙）',
];

const SUNSET_INNER_OS: string[] = [
  '（夕陽把天空塗成橘子汽水的顏色了🍊）',
  '（黃昏的光線照過來，影子拉得好長喔🌆）',
];

// Two-companion random mini-story pairs
const MINI_STORY_ENCOUNTERS: Array<{ lineA: string; lineB: string }> = [
  { lineA: '喂～你有帶草莓小點心嗎？🍓', lineB: '（糟糕…剛剛路上偷吃光了💦）' },
  { lineA: '你看那朵雲像不像大南瓜？☁️', lineB: '我覺得比較像蓬鬆的綿羊欸🐑' },
  { lineA: '猜拳！誰輸誰去幫忙澆花✌️', lineB: '（又出慢了…好啦我去提水桶🪣）' },
  { lineA: '今天表現超讚的喔！👍', lineB: '嘿嘿，我們一起衝向滿級吧！✨' },
  { lineA: '噓…老師是不是在看我們？👀', lineB: '（趕快站直裝作在欣賞風景🌲）' },
  { lineA: '這條小徑通往哪裡呀？🗺️', lineB: '不管啦，跟著感覺去探險吧！🌟' },
  { lineA: '你剛剛跑好快！💨', lineB: '（其實只是看到好吃的鬆餅🥞）' },
  { lineA: '一起在這裡發呆一下好嗎？🍀', lineB: '好呀，微風吹過來超舒服～🍃' },
];

interface PixelParadiseViewProps {
  students: Student[];
  className: string;
  onApplyPoints: (
    targets: Student[],
    delta: number,
    reasonZh: string,
    reasonEn?: string,
    icon?: string
  ) => void;
  onChangeAvatar?: (student: Student) => void;
  onClose?: () => void;
  isFullScreenMode?: boolean;
  initialTimeOfDay?: ParadiseTimeOfDay;
  onTimeOfDayChange?: (tod: ParadiseTimeOfDay) => void;
}

export const PixelParadiseView: React.FC<PixelParadiseViewProps> = ({
  students,
  className,
  onApplyPoints,
  onChangeAvatar,
  onClose,
  initialTimeOfDay = 'day',
  onTimeOfDayChange,
}) => {
  // Season state: automatically initialized and switched according to current calendar month
  const [season, setSeason] = useState<ParadiseSeason>(() => getSeasonByMonth());

  // Fullscreen / Windows PC feedback popup overlay state
  const [paradiseFeedback, setParadiseFeedback] = useState<PointsFeedbackData | null>(null);

  // Time of Day lighting synced with classroom
  const [timeOfDay, setTimeOfDay] = useState<ParadiseTimeOfDay>(initialTimeOfDay);

  useEffect(() => {
    if (initialTimeOfDay) {
      setTimeOfDay(initialTimeOfDay);
    }
  }, [initialTimeOfDay]);

  // Name tags visibility toggle
  const [showNameTags, setShowNameTags] = useState<boolean>(true);

  // Camera Viewport, Zoom, Pan & Drag state
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>({ w: 1280, h: 720 });

  // True 16:9 panoramic world dimensions based on viewport so scenery is never cropped
  const worldBaseSize = useMemo(() => {
    const baseW = Math.max(viewportSize.w, viewportSize.h * WORLD_ASPECT) * WORLD_SCALE;
    const baseH = baseW / WORLD_ASPECT;
    return { w: baseW, h: baseH };
  }, [viewportSize]);

  const minZoom = useMemo(() => {
    const fitZoom = Math.max(
      viewportSize.w / worldBaseSize.w,
      viewportSize.h / worldBaseSize.h
    );
    return Number(Math.max(0.45, fitZoom).toFixed(3));
  }, [viewportSize, worldBaseSize]);

  const [zoomLevel, setZoomLevel] = useState<number>(1 / WORLD_SCALE);
  const hasInitializedZoomRef = useRef(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    panX: number;
    panY: number;
    hasMoved: boolean;
  } | null>(null);

  const [focusedCompanionId, setFocusedCompanionId] = useState<string | null>(null);
  const [isFollowingCamera, setIsFollowingCamera] = useState<boolean>(false);

  // Student finder search query
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Fullscreen container state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Point scoring target
  const [scoringStudent, setScoringStudent] = useState<Student | null>(null);

  // Mute audio in paradise
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(soundManager.isMuted);

  // Random inner thoughts (OS) & mini-stories toggle
  const [showStories, setShowStories] = useState<boolean>(true);
  // Living world background animation effects toggle (enabled by default)
  const [showBackdropFx, setShowBackdropFx] = useState<boolean>(true);
  const seasonRef = useRef<ParadiseSeason>(season);
  const timeOfDayRef = useRef<ParadiseTimeOfDay>(timeOfDay);
  const showStoriesRef = useRef<boolean>(showStories);
  useEffect(() => {
    seasonRef.current = season;
    const avoidLake = CLASSIC_LAKE_SEASONS.has(season);
    const isUnderwater = season === 'underwater';
    const isParis = season === 'paris';

    setCompanions((prev) =>
      prev.map((c, idx) => {
        let nextX = c.x;
        let nextY = c.y;
        let nextAction = c.action;

        if (isParis) {
          if (c.isAquatic) {
            const inSeine = c.x >= 36 && c.x <= 69 && c.y >= 87 && c.y <= 95;
            if (!inSeine) {
              const init = getInitialCoordinates(idx, true, false, true);
              nextX = init.x;
              nextY = init.y;
            }
            nextAction = 'swimming';
          } else {
            const inUpperSkyOrTower = c.y < 49;
            const inSeineWater =
              (c.x > 32 && c.y > 84.5 && !(c.x >= 72 && c.x <= 83)) || (c.x > 83 && c.y > 80);
            if (inUpperSkyOrTower || inSeineWater) {
              const init = getInitialCoordinates(idx, false, false, true);
              nextX = init.x;
              nextY = init.y;
            }
            if (nextAction === 'swimming') {
              nextAction = 'walking';
            }
          }
        } else if (isUnderwater) {
          nextAction = 'swimming';
        } else if (!c.isAquatic && nextAction === 'swimming') {
          nextAction = 'walking';
        }

        const safeRecent = isParis
          ? [getZoneIndexForPoint(nextX, nextY, true)]
          : c.recentZones || [getZoneIndexForPoint(nextX, nextY, false)];

        const route = buildIrregularRoute(
          nextX,
          nextY,
          safeRecent,
          avoidLake,
          false,
          c.isAquatic,
          isUnderwater,
          isParis
        );
        const dest = route.waypoints[0] || { x: nextX, y: nextY };

        return {
          ...c,
          x: nextX,
          y: nextY,
          action: nextAction === 'celebrating' ? 'celebrating' : nextAction,
          targetX: dest.x,
          targetY: dest.y,
          waypoints: route.waypoints.slice(1),
          recentZones: route.nextRecentZones,
          facing: dest.x < nextX ? 'left' : 'right',
        };
      })
    );
  }, [season]);
  useEffect(() => {
    timeOfDayRef.current = timeOfDay;
  }, [timeOfDay]);
  useEffect(() => {
    showStoriesRef.current = showStories;
  }, [showStories]);

  // Measure viewport dimensions smoothly
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const updateSize = () => {
      setViewportSize({ w: el.clientWidth || 1280, h: el.clientHeight || 720 });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clamp pan coordinates so expanded world never leaves empty borders
  const clampPan = useCallback(
    (px: number, py: number, zoom: number, vw = viewportSize.w, vh = viewportSize.h) => {
      const worldW = worldBaseSize.w * zoom;
      const worldH = worldBaseSize.h * zoom;
      const minX = Math.min(0, vw - worldW);
      const minY = Math.min(0, vh - worldH);
      return {
        x: Math.max(minX, Math.min(0, px)),
        y: Math.max(minY, Math.min(0, py)),
      };
    },
    [viewportSize, worldBaseSize]
  );

  // Start at wide full-map overview on initial mount
  useEffect(() => {
    if (!hasInitializedZoomRef.current && viewportSize.w > 0 && viewportSize.h > 0) {
      hasInitializedZoomRef.current = true;
      setZoomLevel(minZoom);
      setPanOffset(clampPan(-(worldBaseSize.w * minZoom - viewportSize.w) / 2, -(worldBaseSize.h * minZoom - viewportSize.h) / 2, minZoom));
    }
  }, [minZoom, viewportSize, worldBaseSize, clampPan]);

  // Smoothly focus camera onto any map coordinate (x%, y%)
  const focusOnCoordinates = useCallback(
    (xPct: number, yPct: number, targetZoom?: number) => {
      const nextZoom = Math.max(minZoom, targetZoom ?? zoomLevel);
      const worldW = worldBaseSize.w * nextZoom;
      const worldH = worldBaseSize.h * nextZoom;
      const rawPanX = viewportSize.w / 2 - (xPct / 100) * worldW;
      const rawPanY = viewportSize.h / 2 - (yPct / 100) * worldH;
      if (targetZoom !== undefined) {
        setZoomLevel(nextZoom);
      }
      setPanOffset(clampPan(rawPanX, rawPanY, nextZoom));
    },
    [viewportSize, worldBaseSize, minZoom, zoomLevel, clampPan]
  );

  // Keep zoom & pan clamped on resize
  useEffect(() => {
    setZoomLevel((prev) => Math.max(minZoom, prev));
    setPanOffset((prev) => clampPan(prev.x, prev.y, Math.max(minZoom, zoomLevel)));
  }, [viewportSize, minZoom, zoomLevel, clampPan]);

  // Only genuine aquatic sprites are marked aquatic (removed idx % 9 trap so everyone freely explores)
  const checkIsAquatic = (student: Student, stardewAvatar: string): boolean => {
    if (stardewAvatar === 'sdv_duck' || stardewAvatar === 'sdv_turtle') return true;
    return student.rollNo === 21 && stardewAvatar.includes('duck');
  };

  // Distribute companions across walkable regions of the active scene
  const getInitialCoordinates = (
    idx: number,
    isAquatic: boolean,
    avoidLake: boolean,
    isParis = false
  ) => {
    if (isAquatic && isParis) {
      return {
        x: 38 + ((idx * 13) % 28),
        y: 89 + ((idx * 3) % 6),
        action: 'swimming' as const,
      };
    }

    if (isAquatic && avoidLake) {
      return {
        x: 68 + ((idx * 17) % 23),
        y: 71 + ((idx * 13) % 18),
        action: 'swimming' as const,
      };
    }

    const zones = isParis ? PARIS_GROUND_ZONES : PARADISE_MAP_ZONES;
    const availableZones =
      !isParis && avoidLake ? zones.filter((z) => z.id !== 8) : zones;
    const z = availableZones[idx % availableZones.length];
    const pt = sanitizeLandPoint(
      z.minX + Math.random() * (z.maxX - z.minX),
      z.minY + Math.random() * (z.maxY - z.minY),
      avoidLake,
      isParis
    );
    return {
      x: pt.x,
      y: pt.y,
      zoneId: z.id,
      action: 'walking' as const,
    };
  };

  // State of all active student companions in the paradise
  const [companions, setCompanions] = useState<CompanionState[]>(() => {
    const avoidLake = CLASSIC_LAKE_SEASONS.has(season);
    const isUnderwater = season === 'underwater';
    const isParis = season === 'paris';
    return students.map((s, idx) => {
      const stardewAvatar = resolveStardewCompanion(s, idx);
      const isAquatic = checkIsAquatic(s, stardewAvatar);
      const init = getInitialCoordinates(idx, isAquatic, avoidLake, isParis);
      const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));
      const initRecent = init.zoneId !== undefined ? [init.zoneId] : [];
      const route = buildIrregularRoute(
        init.x,
        init.y,
        initRecent,
        avoidLake,
        false,
        isAquatic,
        isUnderwater,
        isParis
      );
      const firstDest = route.waypoints[0] || { x: init.x, y: init.y };

      return {
        id: s.id,
        studentId: s.id,
        name: s.name,
        rollNo: s.rollNo,
        stardewAvatar,
        x: init.x,
        y: init.y,
        targetX: firstDest.x,
        targetY: firstDest.y,
        waypoints: route.waypoints.slice(1),
        recentZones: route.nextRecentZones,
        curveSign: Math.random() < 0.5 ? 1 : -1,
        facing: firstDest.x < init.x ? 'left' : 'right',
        action: isAquatic || isUnderwater ? 'swimming' : 'walking',
        speed: 0.1 + Math.random() * 0.09,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.05 + Math.random() * 0.05,
        wanderTimer: Math.floor(Math.random() * 60) + 30,
        isAquatic,
        growthBonus,
      };
    });
  });

  // Sync companions when students prop changes
  useEffect(() => {
    const avoidLake = CLASSIC_LAKE_SEASONS.has(seasonRef.current);
    const isUnderwater = seasonRef.current === 'underwater';
    const isParis = seasonRef.current === 'paris';
    setCompanions((prev) =>
      students.map((s, idx) => {
        const existing = prev.find((p) => p.studentId === s.id);
        const stardewAvatar = resolveStardewCompanion(s, idx);
        const isAquatic = checkIsAquatic(s, stardewAvatar);
        const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));

        if (existing) {
          return {
            ...existing,
            name: s.name,
            rollNo: s.rollNo,
            stardewAvatar,
            isAquatic,
            growthBonus,
          };
        }

        const init = getInitialCoordinates(idx, isAquatic, avoidLake, isParis);
        const initRecent = init.zoneId !== undefined ? [init.zoneId] : [];
        const route = buildIrregularRoute(
          init.x,
          init.y,
          initRecent,
          avoidLake,
          false,
          isAquatic,
          isUnderwater,
          isParis
        );
        const dest = route.waypoints[0] || { x: init.x, y: init.y };
        return {
          id: s.id,
          studentId: s.id,
          name: s.name,
          rollNo: s.rollNo,
          stardewAvatar,
          x: init.x,
          y: init.y,
          targetX: dest.x,
          targetY: dest.y,
          waypoints: route.waypoints.slice(1),
          recentZones: route.nextRecentZones,
          curveSign: Math.random() < 0.5 ? 1 : -1,
          facing: dest.x < init.x ? 'left' : 'right',
          action: isAquatic || isUnderwater ? 'swimming' : 'walking',
          speed: 0.1 + Math.random() * 0.09,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.05 + Math.random() * 0.05,
          wanderTimer: Math.floor(Math.random() * 60) + 30,
          isAquatic,
          growthBonus,
        };
      })
    );
  }, [students]);

  // Click Companion to Irregularly Wander / Sprint Across Different Map Regions + open Spotlight Dock
  const handleCompanionClick = (comp: CompanionState, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();

    const avoidLake = CLASSIC_LAKE_SEASONS.has(seasonRef.current);
    const isUnderwater = seasonRef.current === 'underwater';
    const isParis = seasonRef.current === 'paris';
    const route = buildIrregularRoute(
      comp.x,
      comp.y,
      comp.recentZones || [getZoneIndexForPoint(comp.x, comp.y, isParis)],
      avoidLake,
      true,
      comp.isAquatic,
      isUnderwater,
      isParis
    );
    const firstWaypoint = route.waypoints[0] || { x: comp.x, y: comp.y };
    const facing = firstWaypoint.x < comp.x ? 'left' : 'right';
    const runBubble = [
      '💨 換個地方探險~',
      '🏃 到處逛逛囉！',
      '⚡ 自由飛奔！',
      '🐾 無拘無束跑起來~',
      '😆 哈哈追不到！',
      '✨ 衝去對面看看！',
      '🗺️ 全圖大冒險~',
      '💖 超開心！',
    ][Math.floor(Math.random() * 8)];

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.id === comp.id) {
          return {
            ...c,
            action: 'running',
            targetX: firstWaypoint.x,
            targetY: firstWaypoint.y,
            waypoints: route.waypoints.slice(1),
            recentZones: route.nextRecentZones,
            curveSign: Math.random() < 0.5 ? 1 : -1,
            facing,
            speed: 0.44 + Math.random() * 0.24,
            wanderTimer: 220, // Protect full irregular multi-leg sprint from being cut short prematurely
            runUntil: Date.now() + 7200,
            pauseUntil: undefined,
            speechBubble: runBubble,
            speechType: 'action',
            speechExpiresAt: Date.now() + 3400,
          };
        }
        return c;
      })
    );

    setFocusedCompanionId(comp.id);
    const currentStudent = students.find((s) => s.id === comp.studentId);
    if (currentStudent) {
      setScoringStudent(currentStudent);
    }
  };

  // Silky-smooth 50ms Autonomous Multi-Zone Irregular Curved Roaming Engine
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const now = Date.now();
      const activeSeason = seasonRef.current;
      const avoidLake = CLASSIC_LAKE_SEASONS.has(activeSeason);
      const isUnderwaterWorld = activeSeason === 'underwater';
      const isParis = activeSeason === 'paris';

      setCompanions((prev) =>
        prev.map((c) => {
          if (c.action === 'celebrating') return c;

          let action = c.action;
          let speed = c.speed || 0.13;
          let targetX = c.targetX;
          let targetY = c.targetY;
          let waypoints = c.waypoints || [];
          let recentZones = c.recentZones || [];
          let curveSign = c.curveSign ?? 1;
          let wanderTimer = (c.wanderTimer ?? 35) - 1;
          let speechBubble = c.speechBubble;
          let speechType = c.speechType;
          let speechExpiresAt = c.speechExpiresAt;
          let pauseUntil = c.pauseUntil;
          const swayPhase = (c.swayPhase || 0) + (c.swaySpeed || 0.06);

          // Auto-expire timed speech/OS bubbles
          if (speechExpiresAt && now > speechExpiresAt) {
            speechBubble = undefined;
            speechType = undefined;
            speechExpiresAt = undefined;
          }

          // Clear finished story pause
          if (pauseUntil && now >= pauseUntil) {
            pauseUntil = undefined;
          }

          // Check if running sprint finished -> seamlessly transition to fresh normal explore
          if (action === 'running' && c.runUntil && now > c.runUntil) {
            action = c.isAquatic || isUnderwaterWorld ? 'swimming' : 'walking';
            speed = 0.11 + Math.random() * 0.08;
            speechBubble = undefined;
            speechType = undefined;
            speechExpiresAt = undefined;
          }

          // If pausing for a mini-story encounter, stand still and keep facing partner
          if (pauseUntil && now < pauseUntil && action !== 'running') {
            return {
              ...c,
              action: c.isAquatic || isUnderwaterWorld ? 'swimming' : 'idle',
              swayPhase,
              speechBubble,
              speechType,
              speechExpiresAt,
              pauseUntil,
            };
          }

          // Pick a brand new irregular multi-waypoint route across a different map zone when timer expires
          if (wanderTimer <= 0 && action !== 'running') {
            if (Math.random() < 0.84) {
              wanderTimer = Math.floor(Math.random() * 95) + 45;
              const route = buildIrregularRoute(
                c.x,
                c.y,
                recentZones,
                avoidLake,
                false,
                c.isAquatic,
                isUnderwaterWorld,
                isParis
              );
              targetX = route.waypoints[0]?.x ?? c.x;
              targetY = route.waypoints[0]?.y ?? c.y;
              waypoints = route.waypoints.slice(1);
              recentZones = route.nextRecentZones;
              curveSign = Math.random() < 0.5 ? 1 : -1;
              action = c.isAquatic || isUnderwaterWorld ? 'swimming' : 'walking';
              speed = 0.09 + Math.random() * 0.11;

              if (!speechBubble && Math.random() < 0.08) {
                speechBubble = ['🌾', '✨', '🐾', '🌸', '🎵', '🍀', '🍎', '💖', '🦋'][
                  Math.floor(Math.random() * 9)
                ];
                speechType = 'action';
                speechExpiresAt = now + 2400;
              }
            } else {
              wanderTimer = Math.floor(Math.random() * 28) + 18;
              action = c.isAquatic || isUnderwaterWorld ? 'swimming' : 'idle';
              if (!speechBubble && Math.random() < 0.18) {
                speechBubble = '💤';
                speechType = 'action';
                speechExpiresAt = now + 2000;
              }
            }
          }

          const dx = targetX - c.x;
          const dy = targetY - c.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 0.9 && (action === 'walking' || action === 'swimming' || action === 'running')) {
            const step = Math.min(dist, speed);
            const dirX = dx / dist;
            const dirY = dy / dist;

            // Organic unpredictable curved drift so movement never locks onto rigid linear corridors
            const swayAmp = action === 'running' ? 0.09 : 0.07;
            const sway =
              (Math.sin(swayPhase) * 0.65 + Math.cos(swayPhase * 0.43) * 0.35) * swayAmp * curveSign;
            const perpX = -dirY;
            const perpY = dirX;

            let nextX = c.x + dirX * step + perpX * sway;
            let nextY = c.y + dirY * step + perpY * sway;

            if (c.isAquatic && isParis && action !== 'running') {
              nextX = Math.max(36, Math.min(69, nextX));
              nextY = Math.max(87, Math.min(95, nextY));
            } else if (c.isAquatic && !isUnderwaterWorld && !isParis && action !== 'running') {
              nextX = Math.max(46, Math.min(95, nextX));
              nextY = Math.max(58, Math.min(92, nextY));
            } else {
              const safe = sanitizeLandPoint(nextX, nextY, avoidLake, isParis);
              nextX = safe.x;
              nextY = safe.y;
            }

            const facing: 'left' | 'right' = dx < -0.15 ? 'left' : dx > 0.15 ? 'right' : c.facing;

            return {
              ...c,
              x: nextX,
              y: nextY,
              targetX,
              targetY,
              waypoints,
              recentZones,
              curveSign,
              facing,
              action,
              speed,
              swayPhase,
              wanderTimer,
              speechBubble,
              speechType,
              speechExpiresAt,
              pauseUntil,
            };
          } else {
            // Reached current waypoint -> immediately advance to next queued waypoint in irregular route!
            if (waypoints.length > 0 && (action === 'running' || action === 'walking' || action === 'swimming')) {
              const [nextPt, ...restPts] = waypoints;
              const nextSpeed =
                action === 'running' ? 0.40 + Math.random() * 0.25 : 0.09 + Math.random() * 0.11;
              return {
                ...c,
                targetX: nextPt.x,
                targetY: nextPt.y,
                waypoints: restPts,
                recentZones,
                curveSign: Math.random() < 0.5 ? 1 : -1,
                facing: nextPt.x < c.x ? 'left' : 'right',
                speed: nextSpeed,
                swayPhase,
                wanderTimer,
                speechBubble,
                speechType,
                speechExpiresAt,
                pauseUntil,
              };
            }

            // Finished full route -> trigger next random zone roam quickly without lingering in place
            const nextWait = Math.min(wanderTimer, Math.floor(Math.random() * 20) + 8);
            let finalAction = action;
            if (action === 'running') {
              finalAction = c.isAquatic || isUnderwaterWorld ? 'swimming' : 'idle';
              speed = 0.12;
            } else if (action === 'walking') {
              finalAction = isUnderwaterWorld ? 'swimming' : 'idle';
            }

            return {
              ...c,
              action: finalAction,
              waypoints: [],
              recentZones,
              speed,
              swayPhase,
              wanderTimer: nextWait,
              speechBubble,
              speechType,
              speechExpiresAt,
              pauseUntil,
            };
          }
        })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  const companionsRef = useRef<CompanionState[]>(companions);
  useEffect(() => {
    companionsRef.current = companions;
  }, [companions]);

  // Autonomous Mini-Stories & Inner Monologue (OS) Scheduler
  useEffect(() => {
    const replyTimeouts: number[] = [];

    const triggerStoryOrOS = () => {
      if (!showStoriesRef.current) return;
      const snapshot = companionsRef.current;
      if (snapshot.length === 0) return;

      const now = Date.now();
      const activeSeason = seasonRef.current;
      const activeTod = timeOfDayRef.current;

      const activeBubbles = snapshot.filter(
        (c) => c.speechBubble && (!c.speechExpiresAt || c.speechExpiresAt > now)
      );
      if (activeBubbles.length >= 3) return;

      const eligible = snapshot.filter(
        (c) =>
          c.action !== 'running' &&
          c.action !== 'celebrating' &&
          (!c.pauseUntil || now >= c.pauseUntil) &&
          (!c.speechBubble || (c.speechExpiresAt && now > c.speechExpiresAt))
      );
      if (eligible.length === 0) return;

      // 40% chance for a two-companion nearby encounter mini-story
      if (eligible.length >= 2 && activeBubbles.length <= 1 && Math.random() < 0.4) {
        let pair: [CompanionState, CompanionState] | null = null;
        for (let i = 0; i < eligible.length && !pair; i++) {
          for (let j = i + 1; j < eligible.length; j++) {
            const dist = Math.hypot(eligible[i].x - eligible[j].x, eligible[i].y - eligible[j].y);
            if (dist < 16) {
              pair = [eligible[i], eligible[j]];
              break;
            }
          }
        }

        if (pair) {
          const [compA, compB] = pair;
          const encounter =
            MINI_STORY_ENCOUNTERS[Math.floor(Math.random() * MINI_STORY_ENCOUNTERS.length)];
          const isOsReply = encounter.lineB.startsWith('（');

          setCompanions((prev) =>
            prev.map((c) => {
              if (c.id === compA.id) {
                return {
                  ...c,
                  facing: compB.x < compA.x ? 'left' : 'right',
                  pauseUntil: now + 3800,
                  speechBubble: encounter.lineA,
                  speechType: 'dialogue',
                  speechExpiresAt: now + 3800,
                };
              }
              if (c.id === compB.id) {
                return {
                  ...c,
                  facing: compA.x < compB.x ? 'left' : 'right',
                  pauseUntil: now + 3800,
                };
              }
              return c;
            })
          );

          const tid = window.setTimeout(() => {
            if (!showStoriesRef.current) return;
            const replyNow = Date.now();
            setCompanions((prev) =>
              prev.map((c) =>
                c.id === compB.id
                  ? {
                      ...c,
                      speechBubble: encounter.lineB,
                      speechType: isOsReply ? 'os' : 'dialogue',
                      speechExpiresAt: replyNow + 3400,
                    }
                  : c
              )
            );
          }, 1250);
          replyTimeouts.push(tid);
          return;
        }
      }

      // Solo random Inner-Thought OS (內心話 OS) tailored by environment & season
      const chosen = eligible[Math.floor(Math.random() * eligible.length)];
      const pool: string[] = [
        ...(chosen.isAquatic ? AQUATIC_INNER_OS : LAND_INNER_OS),
        ...(SEASON_INNER_OS[activeSeason] || []),
      ];
      if (activeTod === 'night') {
        pool.push(...NIGHT_INNER_OS);
      } else if (activeTod === 'sunset') {
        pool.push(...SUNSET_INNER_OS);
      }
      const quote = pool[Math.floor(Math.random() * pool.length)];

      setCompanions((prev) =>
        prev.map((c) =>
          c.id === chosen.id
            ? {
                ...c,
                speechBubble: quote,
                speechType: 'os',
                speechExpiresAt: now + 4600,
              }
            : c
        )
      );
    };

    const initialTimer = window.setTimeout(triggerStoryOrOS, 1200);
    const storyInterval = window.setInterval(triggerStoryOrOS, 3800);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(storyInterval);
      replyTimeouts.forEach((tid) => window.clearTimeout(tid));
    };
  }, []);

  // Optional live camera follow ONLY when teacher explicitly toggles Follow Mode
  useEffect(() => {
    if (focusedCompanionId && isFollowingCamera) {
      const comp = companions.find((c) => c.id === focusedCompanionId);
      if (comp) {
        focusOnCoordinates(comp.x, comp.y);
      }
    }
  }, [focusedCompanionId, isFollowingCamera, companions, focusOnCoordinates]);

  // Interactive Petting ("💖 撫摸夥伴")
  const handlePetCompanion = (companionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPetSound();

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.id === companionId) {
          const cuteQuotes = ['🥰 蹭蹭你！', '💖 主人好棒！', '✨ 元氣滿滿！', '🌾 最喜歡你了！', '⭐ 幸福度滿格！'];
          const randomQuote = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
          return {
            ...c,
            speechBubble: randomQuote,
            speechType: 'action',
            speechExpiresAt: Date.now() + 3500,
            lastPetTime: Date.now(),
            floatingText: {
              text: '💖',
              isPositive: true,
              key: Date.now(),
            },
          };
        }
        return c;
      })
    );
  };

  // Handle Awarding Points to Companion ("叮一聲，夥伴就往前長一點")
  const handleAwardPoints = (delta: number, reason: string) => {
    if (!scoringStudent) return;

    onApplyPoints(
      [scoringStudent],
      delta,
      reason,
      delta > 0 ? 'Paradise accomplishment' : 'Gentle reminder',
      delta > 0 ? '✨' : '🩹'
    );

    const nextScore = scoringStudent.points + delta;
    setParadiseFeedback({
      students: [scoringStudent],
      delta,
      reason,
      updatedScores: { [scoringStudent.id]: nextScore },
    });

    setCompanions((prev) =>
      prev.map((c) => {
        if (c.studentId === scoringStudent.id) {
          return {
            ...c,
            action: 'celebrating',
            growthBonus: c.growthBonus + (delta > 0 ? 0.08 : 0),
            floatingText: {
              text: delta > 0 ? `+${delta}` : `${delta}`,
              isPositive: delta > 0,
              key: Date.now(),
            },
          };
        }
        return c;
      })
    );

    setTimeout(() => {
      setCompanions((prev) =>
        prev.map((c) =>
          c.studentId === scoringStudent.id
            ? { ...c, action: c.isAquatic ? 'swimming' : 'walking' }
            : c
        )
      );
    }, 1800);

    setScoringStudent(null);
  };

  // Pointer Drag-to-Pan handlers on the expansive canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: panOffset.x,
      panY: panOffset.y,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStartRef.current.hasMoved = true;
      setIsFollowingCamera(false);
    }
    if (dragStartRef.current.hasMoved) {
      setPanOffset(clampPan(dragStartRef.current.panX + dx, dragStartRef.current.panY + dy, zoomLevel));
    }
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
    setIsDragging(false);
  };

  // Mouse wheel smooth zoom around viewport center
  const handleWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.14 : 0.14;
    const nextZoom = Math.max(minZoom, Math.min(MAX_ZOOM, Number((zoomLevel + delta).toFixed(3))));
    if (nextZoom === zoomLevel) return;

    const ratio = nextZoom / zoomLevel;
    const cx = viewportSize.w / 2;
    const cy = viewportSize.h / 2;
    const nextPanX = cx - (cx - panOffset.x) * ratio;
    const nextPanY = cy - (cy - panOffset.y) * ratio;

    setZoomLevel(nextZoom);
    setPanOffset(clampPan(nextPanX, nextPanY, nextZoom));
  };

  // Toggle Fullscreen on smartboard
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Reset to full-map Overview
  const handleResetOverview = () => {
    setIsFollowingCamera(false);
    setFocusedCompanionId(null);
    setZoomLevel(minZoom);
    setPanOffset(
      clampPan(
        -(worldBaseSize.w * minZoom - viewportSize.w) / 2,
        -(worldBaseSize.h * minZoom - viewportSize.h) / 2,
        minZoom
      )
    );
  };

  // Jump camera directly to student companion ("孩子一眼找到自己那隻")
  const handleFindStudent = (studentId: string) => {
    setFocusedCompanionId(studentId);
    setIsFollowingCamera(true);
    const comp = companions.find((c) => c.studentId === studentId);
    if (comp) {
      focusOnCoordinates(comp.x, comp.y, 1.55);
    }
    const targetStudent = students.find((s) => s.id === studentId);
    if (targetStudent) {
      setScoringStudent(targetStudent);
    }
    setIsSearchOpen(false);
  };

  // Select appropriate 16-bit pixel art map image by scene/season
  const currentSeasonBg = useMemo(() => {
    switch (season) {
      case 'spring':
        return springBg;
      case 'summer':
        return summerBg;
      case 'winter':
        return winterBg;
      case 'sakura':
        return sakuraBg;
      case 'starlight':
        return starlightBg;
      case 'tropical':
        return tropicalBg;
      case 'skycastle':
        return skycastleBg;
      case 'englishbook':
        return englishbookBg;
      case 'pinyin':
        return pinyinBg;
      case 'polar':
        return polarBg;
      case 'volcano':
        return volcanoBg;
      case 'blizzard':
        return blizzardBg;
      case 'candy':
        return candyBg;
      case 'underwater':
        return underwaterBg;
      case 'junkfood':
        return junkfoodBg;
      case 'dino':
        return dinoBg;
      case 'paris':
        return parisBg;
      case 'autumn':
      default:
        return autumnBg;
    }
  }, [season]);

  const lightingFilter = useMemo(() => {
    switch (timeOfDay) {
      case 'dawn':
        return 'bg-gradient-to-tr from-amber-500/20 via-rose-400/15 to-transparent pointer-events-none mix-blend-overlay';
      case 'sunset':
        return 'bg-gradient-to-tr from-amber-800/35 via-rose-600/25 to-orange-500/20 pointer-events-none mix-blend-color-burn';
      case 'night':
        return 'bg-[#0a1128]/55 pointer-events-none mix-blend-multiply';
      case 'day':
      default:
        return 'pointer-events-none';
    }
  }, [timeOfDay]);

  const focusedCompanion = companions.find((c) => c.id === focusedCompanionId);
  const focusedStudent = students.find((s) => s.id === focusedCompanionId);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      String(s.rollNo).includes(studentSearch)
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-112px)] min-h-[680px] bg-[#1a2d12] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#5A3818] select-none flex flex-col font-sans"
    >
      {/* 1. TOP PARADISE CONTROL BAR (Teacher Tools) */}
      <div className="z-30 bg-[#2b1807]/95 backdrop-blur-md px-4 py-2 border-b-2 border-[#160c04] flex flex-wrap items-center justify-between gap-2 text-[#FFEBB3] shadow-md shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xl animate-bounce">😆</span>
          <div className="flex flex-col">
            <span className="font-pixel text-xs sm:text-sm text-[#FFEBB3] tracking-wide flex items-center gap-2">
              <span>{className}</span>
              <span className="text-[10px] bg-[#533010] px-2 py-0.5 rounded text-amber-200 border border-[#7a481c]">
                {students.length} 位星露谷夥伴
              </span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Quick Companion Finder Dropdown ("孩子一眼找到自己那隻") */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="px-2.5 py-1 text-xs font-bold rounded-xl border border-[#8B5A2B] bg-[#1b0f04] hover:bg-[#3d1f08] text-[#FFEBB3] flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="快速搜尋並放大定位學生夥伴"
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">尋找夥伴</span>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full mt-2 left-0 w-64 max-h-72 bg-[#FFFDF9] text-stone-800 rounded-2xl shadow-2xl border-2 border-[#8B5A2B] z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-stone-200 bg-amber-50">
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="輸入學生姓名或座號..."
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto flex-1 divide-y divide-stone-100 p-1">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => {
                      const comp = companions.find((c) => c.studentId === s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleFindStudent(s.id)}
                          className="w-full px-2 py-1.5 text-left text-xs hover:bg-amber-100/80 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                              #{s.rollNo}
                            </span>
                            <span className="font-bold">{s.name}</span>
                          </div>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {comp?.action === 'swimming' ? '🏊 水中' : '🐾 陸地'} · 🪙 {s.points}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-stone-400">找不到學生</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Scene & Season Background Selector (10 rich panoramic maps) */}
          <div className="flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c] flex-wrap gap-0.5">
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('spring');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'spring' ? 'bg-[#EC4899] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至春天 (🌸 櫻花繽紛 · 像素地圖)"
            >
              🌸 春
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('summer');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'summer' ? 'bg-[#16A34A] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至夏天 (☀️ 綠意陽光 · 像素地圖)"
            >
              ☀️ 夏
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('autumn');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'autumn' ? 'bg-[#D97706] text-white shadow-xs ring-1 ring-amber-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至秋天 (🍂 金黃楓林 · 像素地圖)"
            >
              🍂 秋
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('winter');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'winter' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至冬天 (❄️ 銀白雪景 · 像素地圖)"
            >
              ❄️ 冬
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('sakura');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'sakura' ? 'bg-[#F43F5E] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至櫻花神社 (🏯 和風櫻吹雪公園)"
            >
              🏯 櫻花谷
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('starlight');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'starlight' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至星光魔法谷 (🌌 極光星夜結晶市集)"
            >
              🌌 星光谷
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('tropical');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'tropical' ? 'bg-[#0D9488] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至薑島度假村 (🏝️ 碧海椰林熱帶沙灘)"
            >
              🏝️ 薑島
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('skycastle');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'skycastle' ? 'bg-[#0EA5E9] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至雲端空中花園 (☁️ 浮空大理石雲海花園)"
            >
              ☁️ 雲端園
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('englishbook');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'englishbook' ? 'bg-[#B45309] text-white shadow-xs ring-1 ring-amber-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至住在英文書裡 (📖 立體英文故事書奇幻小鎮)"
            >
              📖 英文書裡
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('pinyin');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'pinyin' ? 'bg-[#DC2626] text-white shadow-xs ring-1 ring-rose-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至住在普通話拼音裡面 (🏮 b p m f 四聲調國風書院)"
            >
              🏮 拼音世界
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('polar');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'polar' ? 'bg-[#0891B2] text-white shadow-xs ring-1 ring-cyan-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至南極企鵝與北極熊 (🐧 4秒無縫動態循環背景視頻)"
            >
              <span>🐧 企鵝北極熊</span>
              <span className="text-[9px] opacity-85">🎬</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('volcano');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'volcano' ? 'bg-[#EA580C] text-white shadow-xs ring-1 ring-orange-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至熾熱岩漿火山島 (🌋 4秒無縫動態循環背景視頻)"
            >
              <span>🌋 火山岩漿島</span>
              <span className="text-[9px] opacity-85">🎬</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('blizzard');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'blizzard' ? 'bg-[#475569] text-white shadow-xs ring-1 ring-sky-200' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至雪山猛烈暴風雪 (🌨️ 4秒無縫動態循環背景視頻)"
            >
              <span>🌨️ 雪山暴風雪</span>
              <span className="text-[9px] opacity-85">🎬</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('candy');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'candy' ? 'bg-[#DB2777] text-white shadow-xs ring-1 ring-pink-200' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至糖果飲料樂園 (🍭 4秒無縫動態循環背景視頻)"
            >
              <span>🍭 糖果飲料</span>
              <span className="text-[9px] opacity-85">🎬</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('underwater');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'underwater' ? 'bg-[#0D9488] text-white shadow-xs ring-1 ring-teal-200' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至繽紛海底世界 (🐠 4秒無縫動態循環背景視頻)"
            >
              <span>🐠 海底世界</span>
              <span className="text-[9px] opacity-85">🎬</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('junkfood');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'junkfood' ? 'bg-[#D97706] text-white shadow-xs ring-1 ring-yellow-200' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至歡樂垃圾食物樂園 (🍔 漢堡屋、薯條塔、披薩與動態氣泡特效)"
            >
              🍔 美食樂園
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('dino');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                season === 'dino' ? 'bg-[#16A34A] text-white shadow-xs ring-1 ring-lime-200' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至史前恐龍奇幻谷 (🦖 腕龍、三角龍、琥珀光點與翼龍動畫)"
            >
              🦖 恐龍島
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('paris');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                season === 'paris'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-xs ring-1 ring-amber-200'
                  : 'text-amber-200 hover:text-white bg-rose-950/40'
              }`}
              title="切換至巴黎鐵塔動態循環視頻場景 (🗼 4秒無縫循環背景視頻)"
            >
              <span>🗼 巴黎鐵塔</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-black/30 text-amber-200 font-black">🎬 視頻</span>
            </button>
          </div>

          {/* Time of Day Lighting Toggle */}
          <div className="hidden sm:flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                setTimeOfDay('dawn');
                onTimeOfDayChange?.('dawn');
              }}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'dawn' ? 'bg-rose-400 text-stone-900 shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="清晨微光 (鳥鳴)"
            >
              <Sunrise className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setTimeOfDay('day');
                onTimeOfDayChange?.('day');
              }}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'day' ? 'bg-amber-500 text-stone-900 shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="暖陽白晝 (流水)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setTimeOfDay('sunset');
                onTimeOfDayChange?.('sunset');
              }}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="夕陽暮色 (晚風與夕蟬)"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setTimeOfDay('night');
                onTimeOfDayChange?.('night');
              }}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="螢火星夜 (蟲鳴與蛙聲)"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Name Tags */}
          <button
            onClick={() => {
              soundManager.playClick();
              setShowNameTags(!showNameTags);
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              showNameTags
                ? 'bg-[#15803D] border-[#22C55E] text-white shadow-xs'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-300'
            }`}
            title="打開/隱藏學生名字標籤"
          >
            {showNameTags ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">名字標籤</span>
          </button>

          {/* Toggle Mini-Stories & Inner OS */}
          <button
            onClick={() => {
              soundManager.playClick();
              const next = !showStories;
              setShowStories(next);
              if (!next) {
                setCompanions((prev) =>
                  prev.map((c) =>
                    c.speechType === 'os' || c.speechType === 'dialogue'
                      ? { ...c, speechBubble: undefined, speechType: undefined, speechExpiresAt: undefined, pauseUntil: undefined }
                      : c
                  )
                );
              }
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              showStories
                ? 'bg-amber-600 border-amber-400 text-white shadow-xs'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-300'
            }`}
            title="開啟/隱藏隨機內心話 OS 與角色互動小劇情"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">💭 劇情</span>
          </button>

          {/* Toggle Living World Background Animations */}
          <button
            onClick={() => {
              soundManager.playClick();
              setShowBackdropFx((prev) => !prev);
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              showBackdropFx
                ? 'bg-teal-700 border-teal-400 text-white shadow-xs'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-300'
            }`}
            title="開啟/關閉樂園動態背景動畫特效 (雲朵、極光、飛鳥、魚群、花瓣與天氣光影)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">背景動畫</span>
          </button>

          {/* Zoom & Overview controls */}
          <div className="flex items-center bg-[#1b0f04] p-0.5 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                const nextZoom = Math.min(MAX_ZOOM, zoomLevel + 0.25);
                const ratio = nextZoom / zoomLevel;
                const cx = viewportSize.w / 2;
                const cy = viewportSize.h / 2;
                setZoomLevel(nextZoom);
                setPanOffset(clampPan(cx - (cx - panOffset.x) * ratio, cy - (cy - panOffset.y) * ratio, nextZoom));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="放大畫面 (Zoom In)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                const nextZoom = Math.max(minZoom, zoomLevel - 0.25);
                const ratio = nextZoom / zoomLevel;
                const cx = viewportSize.w / 2;
                const cy = viewportSize.h / 2;
                setZoomLevel(nextZoom);
                setPanOffset(clampPan(cx - (cx - panOffset.x) * ratio, cy - (cy - panOffset.y) * ratio, nextZoom));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="縮小至更廣視野 (Zoom Out)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                handleResetOverview();
              }}
              className="px-2 py-1 text-[11px] font-bold text-amber-200 hover:text-white flex items-center gap-1 cursor-pointer"
              title="重設全圖全景概覽視角"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden xl:inline">全圖</span>
            </button>
          </div>

          {/* Audio Chime Mute */}
          <button
            onClick={() => {
              const muted = soundManager.toggleMute();
              pokemonSound.setMuted(muted);
              setIsAudioMuted(muted);
            }}
            className={`p-1.5 text-xs rounded-xl border cursor-pointer ${
              !isAudioMuted
                ? 'bg-[#2E5927] border-[#559945] text-[#BBF7D0]'
                : 'bg-[#5A3818] border-[#8B5A2B] text-stone-400'
            }`}
            title={!isAudioMuted ? '叮聲與音效已開啟' : '音效已靜音'}
          >
            {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen for Classroom Projector */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 bg-[#5A3818] hover:bg-[#7A4C22] border border-[#8B5A2B] rounded-xl text-stone-200 hover:text-white cursor-pointer"
            title="課堂大螢幕全螢幕投影"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close Paradise View */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 bg-rose-900/80 hover:bg-rose-800 border border-rose-700 text-rose-200 hover:text-white rounded-xl cursor-pointer"
              title="返回星露谷一般介面"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1.5 TOP COMPANION SPOTLIGHT & QUICK ACTION DOCK (Visible high on classroom projector!) */}
      {focusedCompanion && focusedStudent && (
        <div className="z-30 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2 border-b-2 border-[#8B5A2B] flex flex-wrap items-center justify-between gap-2.5 shadow-lg shrink-0 animate-in slide-in-from-top-2 duration-200">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                if (onChangeAvatar && focusedStudent) {
                  soundManager.playClick();
                  onChangeAvatar(focusedStudent);
                }
              }}
              className="w-11 h-11 bg-[#faeed1] rounded-2xl border-2 border-[#8D6E63] hover:border-amber-500 hover:ring-2 hover:ring-amber-400 p-1 flex items-center justify-center shadow-xs cursor-pointer transition-all group shrink-0"
              title="點擊更換此學生在星露谷名冊的頭像 🎨"
            >
              <AvatarRenderer
                avatar={focusedCompanion.stardewAvatar}
                name={focusedCompanion.name}
                size={36}
                bare={true}
              />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#E8F8F0] text-[#2E7D32] border border-[#81C784] font-black">
                  #{focusedStudent.rollNo}
                </span>
                <h4 className="text-base font-black text-[#5D4037]">{focusedStudent.name}</h4>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
                  🪙 {focusedStudent.points} 分
                </span>
                {/* Follow & Zoom Toggle */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    const nextFollow = !isFollowingCamera;
                    setIsFollowingCamera(nextFollow);
                    if (nextFollow) {
                      focusOnCoordinates(focusedCompanion.x, focusedCompanion.y, 1.6);
                    }
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border transition-colors ${
                    isFollowingCamera
                      ? 'bg-sky-600 text-white border-sky-700'
                      : 'bg-sky-100 hover:bg-sky-200 text-sky-800 border-sky-300'
                  }`}
                  title="開啟或關閉鏡頭自動跟隨放大"
                >
                  <Crosshair className="w-3 h-3" />
                  <span>{isFollowingCamera ? '跟隨中' : '放大特寫'}</span>
                </button>
                {/* Pet Button */}
                <button
                  onClick={(e) => handlePetCompanion(focusedCompanion.id, e)}
                  className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="撫摸夥伴"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>摸摸</span>
                </button>
                {/* Change Avatar Button */}
                {onChangeAvatar && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      onChangeAvatar(focusedStudent);
                    }}
                    className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="在星露谷頭像庫中為此學生挑選專屬夥伴"
                  >
                    <span>🎨 更換夥伴</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-stone-500 font-bold mt-0.5 flex items-center flex-wrap gap-1.5">
                <span>
                  {focusedCompanion.action === 'swimming'
                    ? '🏊 正在水裡暢游'
                    : focusedCompanion.action === 'running'
                    ? '💨 正在全圖歡樂探險！'
                    : focusedCompanion.action === 'resting'
                    ? '🏖️ 在水岸邊曬太陽'
                    : '🐾 正在樂園自由探險'}
                </span>
                <span>·</span>
                <span className="text-[#2E7D32]">體型成長 +{Math.round(focusedCompanion.growthBonus * 100)}%</span>
                {focusedCompanion.speechBubble && (
                  <>
                    <span>·</span>
                    <span className="text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded-md border border-amber-200">
                      {focusedCompanion.speechType === 'os' ? '💭' : '💬'} {focusedCompanion.speechBubble}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* 3 Positive + 3 Negative Quick Point Controls */}
          <div className="flex items-center flex-wrap gap-1.5">
            {/* 3 Positive Items */}
            {[
              { delta: 1, label: '+1 小鼓勵', reason: '小鼓勵 (+1)', icon: '🌱' },
              { delta: 2, label: '+2 積極參與', reason: '積極參與 (+2)', icon: '🙋‍♂️' },
              { delta: 5, label: '+5 尊重老師', reason: '尊重容老師 (+5)', icon: '👩‍🏫' },
            ].map((btn) => (
              <button
                key={`pos-${btn.delta}`}
                onClick={() => handleAwardPoints(btn.delta, btn.reason)}
                className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                title={`為 ${focusedStudent.name} ${btn.label}`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}

            {/* 3 Negative Items */}
            {[
              { delta: -1, label: '-1 溫馨提示', reason: '溫馨提示 (-1)', icon: '⚠️' },
              { delta: -2, label: '-2 小懲大戒', reason: '小懲大戒 (-2)', icon: '🔨' },
              { delta: -5, label: '-5 過於吵鬧', reason: '過於吵鬧 (-5)', icon: '📢' },
            ].map((btn) => (
              <button
                key={`neg-${btn.delta}`}
                onClick={() => handleAwardPoints(btn.delta, btn.reason)}
                className="px-2.5 py-1 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                title={`為 ${focusedStudent.name} ${btn.label}`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                setIsFollowingCamera(false);
                setFocusedCompanionId(null);
              }}
              className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-black text-xs rounded-xl cursor-pointer"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* 2. EXPANSIVE PANNABLE LIVING PIXEL PARADISE CANVAS (145% x 145% World Map) */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheelZoom}
        className={`relative flex-1 w-full h-full overflow-hidden bg-[#334e1c] touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onClick={() => {
          if (isSearchOpen) setIsSearchOpen(false);
        }}
      >
        {/* Expanded Pan & Zoom World Layer (True 16:9 panoramic pixel world) */}
        <div
          className={`absolute top-0 left-0 origin-top-left ${
            isDragging ? '' : 'transition-transform duration-300 ease-out'
          }`}
          style={{
            width: `${worldBaseSize.w}px`,
            height: `${worldBaseSize.h}px`,
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
          }}
        >
          {/* A. 100% PURE 16-BIT RETRO PIXEL ART MAP BACKGROUND (Supports Seamless Looping Video & Crisp Pixel Art) */}
          <img
            src={currentSeasonBg}
            alt="Pixel Paradise Map"
            referrerPolicy="no-referrer"
            className="w-full h-full object-fill select-none pointer-events-none absolute inset-0 image-rendering-pixelated"
            style={{
              imageRendering: 'pixelated',
            }}
          />
          {PARADISE_LOOP_VIDEOS[season] && showBackdropFx && (
            <video
              key={`${season}-loop-video`}
              src={PARADISE_LOOP_VIDEOS[season]}
              poster={currentSeasonBg}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-fill select-none pointer-events-none absolute inset-0"
            />
          )}

          {/* Subtle Pixel Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* B. TIME OF DAY LIGHTING OVERLAY */}
          <div className={`absolute inset-0 ${lightingFilter}`} />

          {/* C & D. MULTI-LAYERED LIVING 16-BIT WORLD ANIMATION BACKDROP (Clouds, Aurora, Stars, Wildlife, Weather & Light) */}
          <ParadiseAnimatedBackdrop
            season={season}
            timeOfDay={timeOfDay}
            enabled={showBackdropFx}
          />

          {/* E. STUDENT LIVING COMPANIONS (Silky-smooth unrestricted world roaming) */}
          {companions.map((comp) => {
            const isSelected = comp.id === focusedCompanionId;
            const currentStudent = students.find((s) => s.id === comp.studentId);
            const totalPoints = currentStudent?.points || 0;
            const isSwimming = comp.action === 'swimming';
            const scale = 1 + comp.growthBonus;

            return (
              <div
                key={comp.id}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => handleCompanionClick(comp, e)}
                className={`absolute cursor-pointer z-20 group ${
                  isSelected ? 'z-40 scale-125' : 'hover:scale-115'
                } transition-transform duration-150`}
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* A. Name Tag Pill */}
                {showNameTags && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 transition-transform group-hover:scale-110">
                    <div
                      className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-black border tracking-tight shadow-md flex items-center gap-1 ${
                        isSelected
                          ? 'bg-amber-300 text-amber-950 border-amber-500 ring-2 ring-white shadow-lg'
                          : 'bg-white/95 text-[#1E293B] border-stone-800 shadow-stone-900/40'
                      }`}
                    >
                      <span className="opacity-75">{String(comp.rollNo).padStart(2, '0')}</span>
                      <span>{comp.name}</span>
                    </div>
                  </div>
                )}

                {/* B. Floating celebration +N / -N */}
                {comp.floatingText && (
                  <div
                    key={comp.floatingText.key}
                    className={`absolute -top-14 left-1/2 -translate-x-1/2 font-black text-xl animate-bounce pointer-events-none z-50 px-2.5 py-0.5 rounded-full shadow-lg border text-white border-white flex items-center gap-1 bg-gradient-to-r ${
                      comp.floatingText.isPositive
                        ? 'from-emerald-500 to-green-600'
                        : 'from-rose-500 to-red-600'
                    }`}
                  >
                    <span>{comp.floatingText.text}</span>
                  </div>
                )}

                {/* Mini-story dialogue / Inner-thought OS bubble */}
                {comp.speechBubble && !comp.floatingText && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-40 w-max max-w-[210px] text-center animate-in fade-in zoom-in-95 duration-200 ${
                      showNameTags ? '-top-8' : '-top-2'
                    }`}
                  >
                    <div
                      className={`px-2.5 py-1 text-[11px] font-bold leading-snug shadow-lg break-words ${
                        comp.speechType === 'os'
                          ? 'bg-[#FFFDF7]/95 border border-dashed border-amber-800/65 text-[#4A2E25] rounded-2xl'
                          : comp.speechType === 'dialogue'
                          ? 'bg-[#FFFBEB]/95 border-2 border-[#8B5A2B] text-[#451A03] rounded-xl'
                          : 'bg-white/95 border border-stone-700 text-stone-800 rounded-full'
                      }`}
                    >
                      {comp.speechType === 'os' && <span className="mr-1 text-[10px] opacity-80">💭</span>}
                      <span>{comp.speechBubble}</span>
                    </div>
                    {comp.speechType === 'os' ? (
                      <div className="flex flex-col items-center mt-0.5 gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF7]/95 border border-amber-800/50" />
                        <span className="w-1 h-1 rounded-full bg-[#FFFDF7]/95 border border-amber-800/50" />
                      </div>
                    ) : (
                      <div className="mx-auto w-2 h-2 rotate-45 -mt-1 bg-[#FFFBEB] border-r-2 border-b-2 border-[#8B5A2B]" />
                    )}
                  </div>
                )}

                {/* C. Pixel Water ripple under swimming companion */}
                {isSwimming && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-9 rounded-full border-2 border-cyan-200/80 bg-cyan-300/35 animate-ping -z-10 pointer-events-none" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-cyan-100/60 blur-[1px] -z-10 pointer-events-none" />
                  </>
                )}

                {/* D. Pure Stardew Valley Creature Sprite */}
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    comp.facing === 'left' ? 'scale-x-[-1]' : 'scale-x-[1]'
                  } ${
                    isSwimming
                      ? 'animate-swim-bob'
                      : comp.action === 'running'
                      ? 'animate-run-dash'
                      : comp.action === 'walking'
                      ? 'animate-walk-wobble'
                      : 'animate-pet-breathe'
                  }`}
                  style={{
                    width: `${48 * scale}px`,
                    height: `${48 * scale}px`,
                  }}
                  title={`點擊使 ${comp.name} 奔跑 · 拖曳地圖可自由探索全圖`}
                >
                  {/* Running dust puff particles 💨 behind feet */}
                  {comp.action === 'running' && (
                    <div className="absolute -bottom-2 -left-3 pointer-events-none z-30 flex items-center gap-0.5 animate-pulse">
                      <span className="text-base select-none">💨</span>
                      <span className="text-[10px] select-none text-stone-300">💨</span>
                    </div>
                  )}

                  <AvatarRenderer
                    avatar={comp.stardewAvatar}
                    name={comp.name}
                    size={48 * scale}
                    bare={true}
                  />

                  {/* Level / Growth star indicator */}
                  {totalPoints >= 10 && (
                    <div
                      className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs"
                      title={`夥伴已累積 ${totalPoints} 分！`}
                    >
                      ★
                    </div>
                  )}

                  {/* Interactive Heart Button on Hover (撫摸夥伴) */}
                  <button
                    onClick={(e) => handlePetCompanion(comp.id, e)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer z-40 text-[10px]"
                    title="💖 撫摸夥伴 (增加好感度)"
                  >
                    <Heart className="w-3 h-3 fill-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1.3s Full-Screen Feedback Modal */}
      {paradiseFeedback && (
        <PointsFeedbackModal
          data={paradiseFeedback}
          onClose={() => setParadiseFeedback(null)}
        />
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes pet-breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes walk-wobble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3.5px) rotate(-3.5deg); }
          75% { transform: translateY(-3.5px) rotate(3.5deg); }
        }
        @keyframes swim-bob {
          0%, 100% { transform: translateY(0) scaleY(0.94); }
          50% { transform: translateY(-4px) scaleY(1.06); }
        }
        @keyframes run-dash {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(4deg); }
        }
        .animate-pet-breathe {
          animation: pet-breathe 2.6s ease-in-out infinite;
        }
        .animate-walk-wobble {
          animation: walk-wobble 0.85s ease-in-out infinite;
        }
        .animate-swim-bob {
          animation: swim-bob 1.8s ease-in-out infinite;
        }
        .animate-run-dash {
          animation: run-dash 0.22s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
