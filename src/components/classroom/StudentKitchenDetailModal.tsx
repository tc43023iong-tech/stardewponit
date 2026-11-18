import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import {
  getStudentKitchenArtwork,
  getStudentKitchenwareTier,
  KITCHEN_BACKGROUND_MILESTONES,
  LIVE_KITCHEN_DISH_ROSTER,
  KitchenArtworkTier,
  KitchenDishBlueprint,
} from '../../utils/kitchenArtwork';
import { soundManager } from '../../utils/sound';
import { UpgradeCelebrationOverlay } from './UpgradeCelebrationOverlay';
import { PixelKitchenwareUpgradeFX } from './PixelKitchenwareDisplay';
import {
  X,
  Plus,
  Star,
  Sparkles,
  CheckCircle2,
  Lock,
  Volume2,
  Maximize2,
  Minimize2,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Image as ImageIcon,
  Sprout,
  Home,
  BookOpen,
  Bath,
} from 'lucide-react';

interface StudentKitchenDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToBathroom?: (student: Student) => void;
}

interface KitchenCompanion {
  id: string;
  name: string;
  quote: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  direction: 1 | -1;
  isWalking: boolean;
  pauseTimer: number;
  bobOffset: number;
  heartActive?: boolean;
}

const KITCHEN_COMPANION_QUOTES = [
  '今天要煮什麼美味料理呢？香味已經飄滿整間教室啦！',
  '把食材洗乾淨再下鍋，就能做出三星完美美味喔！',
  '好期待下一個 50 分解鎖的夢幻主題大廚房與高級廚具！✨',
  '爐火正旺、鍋子閃閃發亮，我們是最棒的黃金拍檔廚師！',
];

const celebratedKitchenUpgradeTiers = new Map<string, number>();

export const StudentKitchenDetailModal: React.FC<StudentKitchenDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToBathroom,
}) => {
  const [activeTab, setActiveTab] = useState<'kitchen' | 'roadmap' | 'dishes'>('kitchen');
  const [dishFilter, setDishFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<KitchenDishBlueprint | null>(null);
  const [clickedNote, setClickedNote] = useState<string | null>(null);
  const [previewMinPoints, setPreviewMinPoints] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [kitchenwareFxActive, setKitchenwareFxActive] = useState<boolean>(false);
  const [kitchenwareFxPoints, setKitchenwareFxPoints] = useState<number>(0);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isSooty = student.points < 0;
  const maxGoal = 1250;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  const kitchenTier = student.points >= 50 ? Math.floor(student.points / 50) : 0;
  const isExactMultipleOf50 = student.points >= 50 && student.points % 50 === 0;
  const prevKitchenTierRef = useRef<{ studentId: string; tier: number }>({
    studentId: student.id,
    tier: kitchenTier,
  });

  const kitchenwareTier = getStudentKitchenwareTier(student.points);

  const triggerKitchenwareAnimation = (pts: number) => {
    setKitchenwareFxPoints(pts);
    setKitchenwareFxActive(false);
    requestAnimationFrame(() => {
      setKitchenwareFxActive(true);
    });
  };

  useEffect(() => {
    if (!kitchenwareFxActive) return;
    const t = setTimeout(() => setKitchenwareFxActive(false), 3800);
    return () => clearTimeout(t);
  }, [kitchenwareFxActive]);

  // Trigger kitchen & kitchenware upgrade celebration on modal mount if at an uncelebrated multiple of 50
  useEffect(() => {
    setCelebrationMilestone(null);
    setSelectedRecipeDish(null);
    if (isExactMultipleOf50 && celebratedKitchenUpgradeTiers.get(student.id) !== kitchenTier) {
      celebratedKitchenUpgradeTiers.set(student.id, kitchenTier);
      const milestonePts = kitchenTier * 50;
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerKitchenwareAnimation(milestonePts);
        setCelebrationMilestone(milestonePts);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [student.id]);

  // Trigger kitchen & kitchenware upgrade animation + celebration modal when crossing a 50-point multiple live
  useEffect(() => {
    const prev = prevKitchenTierRef.current;
    if (prev.studentId !== student.id) {
      prevKitchenTierRef.current = { studentId: student.id, tier: kitchenTier };
      return;
    }

    if (kitchenTier > prev.tier && kitchenTier >= 1) {
      celebratedKitchenUpgradeTiers.set(student.id, kitchenTier);
      const targetMilestone = kitchenTier * 50;
      prevKitchenTierRef.current = { studentId: student.id, tier: kitchenTier };
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerKitchenwareAnimation(targetMilestone);
        setCelebrationMilestone(targetMilestone);
      }, 1360);
      return () => clearTimeout(timer);
    }

    if (kitchenTier < prev.tier) {
      if (kitchenTier === 0) {
        celebratedKitchenUpgradeTiers.delete(student.id);
      } else {
        celebratedKitchenUpgradeTiers.set(student.id, kitchenTier);
      }
    }
    prevKitchenTierRef.current = { studentId: student.id, tier: kitchenTier };
  }, [student.id, student.points, kitchenTier]);

  const defaultArtwork = getStudentKitchenArtwork(student.points);
  const previewMilestone: KitchenArtworkTier | undefined =
    previewMinPoints !== null && !isSooty && student.points >= previewMinPoints
      ? KITCHEN_BACKGROUND_MILESTONES.find((m) => m.minPoints === previewMinPoints)
      : undefined;
  const kitchenArtwork = previewMilestone || defaultArtwork;

  useEffect(() => {
    if (previewMinPoints !== null && student.points < previewMinPoints) {
      setPreviewMinPoints(null);
    }
  }, [student.id, student.points, previewMinPoints]);

  const unlockedKitchensCount = isSooty
    ? 0
    : KITCHEN_BACKGROUND_MILESTONES.filter((m) => m.minPoints >= 50 && student.points >= m.minPoints).length;

  const unlockedDishes = isSooty
    ? []
    : LIVE_KITCHEN_DISH_ROSTER.filter((d) => d.unlockScore <= student.points);

  const filteredDishes = LIVE_KITCHEN_DISH_ROSTER.filter((dish) => {
    const isUnlocked = !isSooty && student.points >= dish.unlockScore;
    if (dishFilter === 'unlocked') return isUnlocked;
    if (dishFilter === 'locked') return !isUnlocked;
    return true;
  });

  const companionAvatarId = student.stardewAvatar || student.avatar || 'sdv_white_chicken';

  const buildKitchenCompanions = (): KitchenCompanion[] => {
    if (isSooty) {
      return [
        {
          id: 'sdv_crow',
          name: '冷灶小烏鴉',
          quote: '嘎嘎…灶台冷冰冰的，趕快加分回到 0 分以上就能生火煎蛋啦！',
          x: 48,
          y: 74,
          targetX: 48,
          targetY: 74,
          direction: 1,
          isWalking: false,
          pauseTimer: 8,
          bobOffset: 0,
        },
      ];
    }

    const list: KitchenCompanion[] = [
      {
        id: companionAvatarId,
        name: `${student.name} 的主廚夥伴`,
        quote: KITCHEN_COMPANION_QUOTES[student.points % KITCHEN_COMPANION_QUOTES.length],
        x: 34,
        y: 72,
        targetX: 34,
        targetY: 72,
        direction: 1,
        isWalking: false,
        pauseTimer: 6,
        bobOffset: 0,
      },
    ];

    if (student.points >= 200) {
      list.push({
        id: 'junimo',
        name: '祝尼魔試吃員',
        quote: '哇～這間廚房的鍋鏟和烤爐越來越豪華，做出的鬆餅太香啦！🍎',
        x: 60,
        y: 74,
        targetX: 60,
        targetY: 74,
        direction: -1,
        isWalking: false,
        pauseTimer: 9,
        bobOffset: 0,
      });
    }

    if (student.points >= 600) {
      list.push({
        id: 'sdv_golden_chicken',
        name: '金雞甜點師',
        quote: '咕咕～每日現採黃金雞蛋保證讓你的料理圖鑑全解鎖！✨',
        x: 74,
        y: 70,
        targetX: 74,
        targetY: 70,
        direction: -1,
        isWalking: false,
        pauseTimer: 11,
        bobOffset: 0,
      });
    }

    return list;
  };

  const [companions, setCompanions] = useState<KitchenCompanion[]>(buildKitchenCompanions);

  useEffect(() => {
    setCompanions(buildKitchenCompanions());
  }, [student.id, student.points, isSooty, companionAvatarId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompanions((prev) =>
        prev.map((comp) => {
          let { x, y, targetX, targetY, direction, isWalking, pauseTimer, bobOffset, heartActive } = comp;

          if (isWalking) {
            const dx = targetX - x;
            const dy = targetY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.8) {
              isWalking = false;
              pauseTimer = Math.floor(Math.random() * 14) + 6;
              bobOffset = 0;
            } else {
              const speed = 0.4;
              x += (dx / dist) * speed;
              y += (dy / dist) * speed;
              direction = dx >= 0 ? 1 : -1;
              bobOffset = (bobOffset + 1.2) % 4 === 0 ? -2 : 0;
            }
          } else {
            if (pauseTimer > 0) {
              pauseTimer -= 1;
            } else {
              targetX = Math.floor(Math.random() * 68) + 14;
              targetY = Math.floor(Math.random() * 18) + 62;
              isWalking = true;
            }
          }

          return {
            ...comp,
            x,
            y,
            targetX,
            targetY,
            direction,
            isWalking,
            pauseTimer,
            bobOffset,
            heartActive,
          };
        })
      );
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleCompanionClick = (comp: KitchenCompanion) => {
    soundManager.playCorrect();
    setClickedNote(`💖 【${comp.name}】：「${comp.quote}」`);
    setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: true } : c)));
    setTimeout(() => {
      setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: false } : c)));
    }, 1400);
    setTimeout(() => {
      setClickedNote((curr) => (curr?.includes(comp.name) ? null : curr));
    }, 3200);
  };

  const handleCookDishPreview = (item: KitchenDishBlueprint, isUnlocked: boolean) => {
    setSelectedRecipeDish(item);
    if (isUnlocked) {
      soundManager.playCollect();
      setClickedNote(`🍲 使用【${kitchenwareTier.ovenName}】成功料理出「${item.name}」！（${item.buffEffect}）`);
      setCompanions((prev) => prev.map((c) => ({ ...c, heartActive: true })));
      setTimeout(() => {
        setCompanions((prev) => prev.map((c) => ({ ...c, heartActive: false })));
      }, 1200);
    } else {
      soundManager.playTick();
      const needed = item.unlockScore - student.points;
      setClickedNote(`🔒 【${item.name}】製作配方將於 ${item.unlockScore} 分解鎖，目前還差 ${needed} 分！`);
    }
    setTimeout(() => setClickedNote(null), 3400);
  };

  const toggleFullscreen = () => {
    soundManager.playClick();
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        e.currentTarget.dataset.backdropDown = e.target === e.currentTarget ? '1' : '0';
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && e.currentTarget.dataset.backdropDown === '1') {
          soundManager.playClick();
          onClose();
        }
      }}
    >
      <div
        ref={modalContainerRef}
        onClick={(e) => e.stopPropagation()}
        className={`pixel-wood-box w-full max-w-5xl flex flex-col overflow-hidden text-[#4a2800] max-h-[96vh] shadow-2xl transition-all ${
          isFullscreen ? 'h-full max-w-none rounded-none justify-between p-4' : ''
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-[#5a3818] text-[#ffebb3] px-4 py-3 border-b-4 border-[#2b1807] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white/10 border-2 border-[#8b5a2b] shadow-inner">
              <AvatarRenderer avatar={student.avatar} name={student.name} size={50} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-pixel text-xs sm:text-base text-[#ffd700]">
                  🍳 【{student.name}】的專屬星露谷廚房
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{kitchenArtwork.kitchenScaleLabel} · {kitchenArtwork.kitchenTitle}</span>
                <span className={isSooty ? 'text-rose-300' : 'text-[#86efac]'}>
                  {isSooty
                    ? '· 🕸️ 冷清舊灶間，加分回到 0 分以上即可重新生火烹飪！'
                    : `· 廚具 ${kitchenwareTier.ovenTierLabel} · 廚房 ${unlockedKitchensCount}/25 · 食譜 ${unlockedDishes.length}/${LIVE_KITCHEN_DISH_ROSTER.length}`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSwitchToFarm && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToFarm(student);
                }}
                className="bg-[#4c8c38] hover:bg-[#3f752e] text-white border border-[#86efac] px-2.5 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的戶外豐收農場"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>農場</span>
              </button>
            )}
            {onSwitchToRoom && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToRoom(student);
                }}
                className="bg-[#b45309] hover:bg-[#92400e] text-white border border-[#fbbf24] px-2.5 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的專屬溫馨房間"
              >
                <Home className="w-3.5 h-3.5" />
                <span>房間</span>
              </button>
            )}
            {onSwitchToBathroom && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToBathroom(student);
                }}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white border border-[#7dd3fc] px-2.5 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的專屬夢幻洗手間"
              >
                <Bath className="w-3.5 h-3.5" />
                <span>洗手間</span>
              </button>
            )}
            <button
              onClick={() => onQuickAdd(student, 2)}
              className="bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] border border-[#86efac] px-2.5 py-1 text-xs font-pixel font-bold rounded cursor-pointer active:scale-95 shadow-xs"
              title="給予+2分"
            >
              <Plus className="w-3 h-3 inline mr-0.5" /> 2分
            </button>
            <button
              onClick={() => onQuickAdd(student, 5)}
              className="bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] border border-[#86efac] px-2.5 py-1 text-xs font-pixel font-bold rounded cursor-pointer active:scale-95 shadow-xs"
              title="給予+5分"
            >
              <Plus className="w-3 h-3 inline mr-0.5" /> 5分
            </button>
            <button
              onClick={() => onOpenPointsModal(student)}
              className="pixel-btn-gold px-3.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
            >
              <Star className="w-3.5 h-3.5 fill-[#633300]" />
              <span>評定表現</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-[#7a4c22] text-[#ffd700] rounded cursor-pointer border border-[#8b5a2b]"
              title={isFullscreen ? '退出全螢幕' : '全螢幕放映'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-7 h-7 bg-[#3b1f0b] hover:bg-[#7a4c22] text-[#ffebb3] flex items-center justify-center border border-[#8b5a2b] cursor-pointer rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Score HUD Progress Bar & Tab Switchers */}
        <div className="bg-[#4a2e13] px-4 py-2 text-[#ffebb3] border-b-2 border-[#2b1807] flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-pixel text-xs text-[#ffd700]">
              <span aria-hidden="true">🍳</span>
              <span className="tabular-nums">目前廚房積分：{student.points} 分 / 1250 分</span>
              {student.points >= 1250 ? (
                <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black">
                  💎 1250分永恆星果宇宙廚神殿！25間豪華廚房與{LIVE_KITCHEN_DISH_ROSTER.length}道食譜全解鎖！
                </span>
              ) : isSooty ? (
                <span className="text-[11px] text-rose-300 font-bold">
                  (🕸️ 負分冷灶期 · 還差 {Math.abs(student.points)} 分重燃溫暖原木廚房)
                </span>
              ) : (
                <span className="text-[11px] text-[#fed7aa] font-bold">
                  (每 50 分觸發廚具進化 · 食譜 {unlockedDishes.length}/{LIVE_KITCHEN_DISH_ROSTER.length} · 廚房 {unlockedKitchensCount}/25)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-sm">
              <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ${
                    student.points >= 1250
                      ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-400 animate-pulse'
                      : 'bg-gradient-to-r from-orange-400 to-rose-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-pixel text-[11px] text-[#fed7aa] whitespace-nowrap tabular-nums">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('kitchen');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'kitchen'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🍳 實景廚房
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('roadmap');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'roadmap'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🖼️ 廚房升級圖鑑 (50~1250分)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('dishes');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'dishes'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                📖 料理圖鑑與配方 ({unlockedDishes.length}/{LIVE_KITCHEN_DISH_ROSTER.length})
              </button>
            </div>

            {!isSooty && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playAchievementUnlock();
                  triggerKitchenwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#7c2d12] hover:bg-[#9a3412] text-[#fde68a] border border-[#f59e0b]/60 flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                title="點擊觀看「烤箱變大、鍋鏟變高級」像素廚具進化特效"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>預覽廚具升級特效</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING PIXEL KITCHEN INTERIOR + PIXEL KITCHENWARE + UNLOCKED DISHES BAR */}
          {activeTab === 'kitchen' && (
            <div className="space-y-3">
              {/* Kitchen Status Banner */}
              <div
                className={`border-2 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs ${
                  isSooty
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-[#fef9c3] border-[#ca8a04]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{kitchenArtwork.icon}</span>
                  <div>
                    <span
                      className={`font-pixel text-[11px] font-bold block ${
                        isSooty ? 'text-rose-900' : 'text-[#854d0e]'
                      }`}
                    >
                      【目前廚房等級】{kitchenArtwork.kitchenTitle}（{kitchenArtwork.kitchenScaleLabel}）
                      {previewMilestone && (
                        <span className="ml-2 text-emerald-700 font-black">
                          (正在預覽已解鎖的 {previewMilestone.minPoints} 分廚房)
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isSooty ? 'text-rose-800' : 'text-[#713f12]'
                      }`}
                    >
                      廚具進化：{kitchenwareTier.ovenName} ＋ {kitchenwareTier.spatulaName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {previewMilestone && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setPreviewMinPoints(null);
                      }}
                      className="text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded cursor-pointer"
                    >
                      回到目前最高階廚房
                    </button>
                  )}
                  {isSooty ? (
                    <span className="text-[11px] font-pixel text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded border border-rose-400">
                      還需 {Math.abs(student.points)} 分重燃溫暖廚房
                    </span>
                  ) : defaultArtwork.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#854d0e] bg-amber-200/80 px-2 py-0.5 rounded border border-[#ca8a04]">
                      距 {defaultArtwork.nextPoints} 分廚具＆廚房升級尚需: {defaultArtwork.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      💎 已解鎖全部 25 間滿級神廚廚房！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('roadmap');
                    }}
                    className={`text-xs font-bold underline cursor-pointer ${
                      isSooty
                        ? 'text-rose-800 hover:text-rose-950'
                        : 'text-[#854d0e] hover:text-[#451a03]'
                    }`}
                  >
                    查看全部廚房 (50~1250) →
                  </button>
                </div>
              </div>

              {/* Interactive Interaction Note */}
              {clickedNote && (
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] px-4 py-2.5 rounded-xl text-center text-xs font-bold text-[#78350f] shadow-md animate-bounce flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              {/* AUTHENTIC 16-BIT PIXEL ART KITCHEN INTERIOR STAGE */}
              <div
                className={`relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none ${
                  isSooty ? 'bg-[#1c1917]' : 'bg-[#2b1807]'
                }`}
                style={{
                  height: isFullscreen ? '70vh' : '500px',
                }}
              >
                <img
                  src={kitchenArtwork.bgUrl}
                  alt={`${student.name} 的星露谷廚房`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Top gradient for legible HUD */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

                {/* Top Interactive Stove & Signature Dish Buttons */}
                <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`🔥 【${kitchenArtwork.stoveName}】：${kitchenArtwork.description}`);
                        setTimeout(() => setClickedNote(null), 3200);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#ffebb3] border border-[#c2410c] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {kitchenArtwork.stoveName.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick();
                        setClickedNote(`🍽️ 【招牌名菜：${kitchenArtwork.specialtyDish}】：剛烹調完成還冒著誘人香氣呢！`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#fde68a] border border-[#ca8a04] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {kitchenArtwork.specialtyDish}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg bg-[#2b1807]/85 border text-[11px] font-bold shadow-md backdrop-blur-xs ${
                      isSooty
                        ? 'text-rose-200 border-rose-500/80'
                        : 'text-[#fde047] border-[#8b5a2b]'
                    }`}
                  >
                    {kitchenArtwork.icon} {kitchenArtwork.kitchenTitle}
                  </div>
                </div>

                {/* Live Pixel Kitchenware Evolution Dock (Oven Grow + Spatula Tier-Up FX) */}
                <div className="absolute bottom-14 right-3 z-25 max-w-[92%] sm:max-w-sm pointer-events-auto">
                  <PixelKitchenwareUpgradeFX
                    isActive={kitchenwareFxActive}
                    milestonePoints={kitchenwareFxPoints || Math.max(50, Math.floor(student.points / 50) * 50)}
                    tier={kitchenwareTier}
                    onReplay={
                      !isSooty
                        ? () => {
                            soundManager.playAchievementUnlock();
                            triggerKitchenwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                          }
                        : undefined
                    }
                  />
                </div>

                {/* Bottom Kitchen Gear Shelf + Recipe Encyclopedia Link */}
                <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 bg-[#2b1807]/85 border-2 border-[#8b5a2b] px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-xs max-w-[92%] overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#fed7aa] mr-1 hidden sm:inline shrink-0">
                    廚房亮點:
                  </span>
                  {kitchenArtwork.unlockedGearItems.map((gear) => (
                    <button
                      key={gear.label}
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`${gear.emoji} 【${gear.label}】：${gear.quote}`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-[#3f240b]/90 hover:bg-[#5a3818] text-[#ffebb3] border border-[#8b5a2b] text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-transform hover:scale-105"
                      title={gear.quote}
                    >
                      <span>{gear.emoji}</span>
                      <span>{gear.label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('dishes');
                    }}
                    className="ml-1 px-2 py-1 rounded-lg bg-[#c2410c] hover:bg-[#9a3412] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 border border-[#fdba74]/60"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>料理與配方圖鑑 ({unlockedDishes.length}/{LIVE_KITCHEN_DISH_ROSTER.length})</span>
                  </button>
                </div>

                {/* Free-Roaming Chef Companion(s) on Kitchen Floor */}
                <div className="absolute inset-0 pointer-events-auto z-20 overflow-hidden">
                  {companions.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompanionClick(comp);
                      }}
                      className="absolute cursor-pointer transition-transform duration-150 group select-none flex flex-col items-center"
                      style={{
                        left: `${comp.x}%`,
                        top: `${comp.y}%`,
                        transform: `translate(-50%, -50%) translateY(${comp.bobOffset}px)`,
                      }}
                      title={`${comp.name}（點擊互動）`}
                    >
                      {comp.heartActive && (
                        <div className="absolute -top-8 text-rose-500 animate-bounce text-xl filter drop-shadow">
                          {isSooty ? '💧' : '❤️'}
                        </div>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 font-pixel text-[9px] bg-[#2b1807]/95 text-[#ffebb3] px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-[#8b5a2b] z-40">
                        {comp.name}
                      </div>
                      <div
                        className={`transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-md select-none ${
                          isSooty ? 'brightness-90 saturate-75' : ''
                        }`}
                        style={{ transform: `scaleX(${comp.direction})` }}
                      >
                        <div className={isSooty ? 'animate-crow-hop-flap' : 'animate-pet-breathe'}>
                          <AvatarRenderer avatar={comp.id} name={comp.name} size={50} bare={true} />
                        </div>
                      </div>
                      <div className="w-8 h-1.5 bg-black/35 rounded-full blur-[1px] -mt-1 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Ambient indoor kitchen shimmer */}
                {!isSooty && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute top-1/4 left-1/4 text-xs text-yellow-100/75 animate-ping">
                      ✨
                    </div>
                    <div
                      className="absolute top-1/3 right-1/4 text-xs text-orange-200/75 animate-ping"
                      style={{ animationDelay: '1.1s' }}
                    >
                      ✨
                    </div>
                  </div>
                )}
              </div>

              {/* UNLOCKED PIXEL DISH COUNTER & RECIPE PREVIEW SHELF IN MAIN KITCHEN VIEW */}
              <div className="bg-[#fdf6e2] border-2 border-[#a3794b] rounded-xl p-3 shadow-sm space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-[#c2410c]" />
                    <h4 className="font-pixel text-xs font-bold text-[#4a2800]">
                      已解鎖像素料理陳列台（點擊圖標查看製作配方！）
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#9a3412] bg-[#ffedd5] px-2 py-0.5 rounded border border-[#fdba74]">
                      已學會 {unlockedDishes.length} / {LIVE_KITCHEN_DISH_ROSTER.length} 道配方
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setActiveTab('dishes');
                      }}
                      className="text-[11px] font-bold text-[#854d0e] hover:text-[#4a2800] underline cursor-pointer"
                    >
                      打開完整料理圖鑑 →
                    </button>
                  </div>
                </div>

                {isSooty ? (
                  <div className="bg-rose-50 border border-rose-300 rounded-lg px-3 py-2 text-xs font-bold text-rose-800">
                    🕸️ 負分冷灶期間料理台暫時休息中，回到 0 分以上就會立即展示已解鎖的像素佳餚！
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {LIVE_KITCHEN_DISH_ROSTER.map((dish) => {
                      const isUnlocked = student.points >= dish.unlockScore;
                      const isSelected = selectedRecipeDish?.id === dish.id;
                      return (
                        <button
                          key={dish.id}
                          type="button"
                          onClick={() => handleCookDishPreview(dish, isUnlocked)}
                          className={`relative shrink-0 p-1.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#fef08a] border-[#b45309] ring-2 ring-[#f59e0b] -translate-y-0.5 shadow-md'
                              : isUnlocked
                              ? 'bg-white border-[#d97706]/60 hover:border-[#b45309] hover:-translate-y-0.5 shadow-xs'
                              : 'bg-[#ede0c2]/65 border-[#c4a675] opacity-55 grayscale-[70%]'
                          }`}
                          title={
                            isUnlocked
                              ? `${dish.name} — 點擊查看製作配方`
                              : `🔒 需達 ${dish.unlockScore} 分解鎖 ${dish.name}`
                          }
                        >
                          <AvatarRenderer avatar={dish.url} name={dish.name} size={38} bare />
                          <span className="text-[9px] font-pixel font-bold text-[#5a3818] max-w-[60px] truncate">
                            {dish.name.split(' ')[0]}
                          </span>
                          {!isUnlocked && (
                            <span className="absolute -top-1.5 -right-1.5 bg-stone-700 text-white text-[9px] font-pixel px-1 rounded shadow flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                              {dish.unlockScore}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Selected Dish Recipe Inspector Strip */}
                {selectedRecipeDish && (
                  <div className="bg-[#fffbeb] border-2 border-[#d97706] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 bg-white rounded-xl border-2 border-[#ca8a04] shadow-xs shrink-0">
                        <AvatarRenderer
                          avatar={selectedRecipeDish.url}
                          name={selectedRecipeDish.name}
                          size={46}
                          bare
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#4a2800]">
                            {selectedRecipeDish.name}
                          </span>
                          <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-[#ffedd5] text-[#9a3412] border border-[#fdba74]">
                            {selectedRecipeDish.cookingUtensil}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {selectedRecipeDish.buffEffect}
                          </span>
                        </div>
                        <p className="text-xs text-[#78350f] font-bold mt-1">
                          作法：{selectedRecipeDish.recipeSteps}
                        </p>
                      </div>
                    </div>

                    {/* Pixel Ingredients Formula */}
                    <div className="flex items-center gap-2 flex-wrap bg-white px-3 py-1.5 rounded-xl border border-[#e5c997]">
                      <span className="text-[11px] font-bold text-[#854d0e]">製作配方：</span>
                      {selectedRecipeDish.ingredients.map((ing) => (
                        <div
                          key={ing.name}
                          className="flex items-center gap-1 bg-[#faeed1] px-2 py-0.5 rounded-lg border border-[#c4a675]"
                        >
                          <AvatarRenderer avatar={ing.iconUrl} name={ing.name} size={22} bare />
                          <span className="text-[11px] font-bold text-[#4a2800]">
                            {ing.name}×{ing.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 50-POINT KITCHEN UPGRADE ROADMAP (0 to 1250) */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-[#ede0c2] p-3.5 rounded-xl border border-[#c4a675] text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <ImageIcon className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#4a2800] block text-sm">
                      🍳 每湊夠 50 分全面升級擴建專屬廚房與廚具（50 → 1250 分共 25 種主題夢幻廚房）
                    </span>
                    <p className="mt-0.5 text-xs text-[#5a3818]">
                      每跨越 50 分就會觸發「烤箱變大、鍋鏟變高級」像素廚具進化特效，並解鎖全新廚房裝潢！點擊已解鎖廚房即可立即參觀。
                    </p>
                  </div>
                </div>
                {!isSooty && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playAchievementUnlock();
                      setActiveTab('kitchen');
                      triggerKitchenwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-pixel font-bold flex items-center gap-1.5 cursor-pointer shadow active:scale-95 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                    <span>回廚房看廚具進化特效</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {KITCHEN_BACKGROUND_MILESTONES.map((milestone) => {
                  const isUnlocked = !isSooty && student.points >= milestone.minPoints;
                  const isCurrentHighest =
                    !isSooty && defaultArtwork.minPoints === milestone.minPoints;
                  const isPreviewing = kitchenArtwork.minPoints === milestone.minPoints;
                  const milestoneWareTier = getStudentKitchenwareTier(milestone.minPoints);

                  return (
                    <div
                      key={milestone.minPoints}
                      className={`rounded-xl border-2 overflow-hidden transition-all flex flex-col ${
                        isCurrentHighest
                          ? 'bg-[#fef9c3] border-[#ca8a04] shadow-md ring-2 ring-[#eab308]'
                          : isUnlocked
                          ? 'bg-[#fdfbf7] border-[#4ade80] shadow-xs'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-80'
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#2b1807]">
                        <img
                          src={milestone.bgUrl}
                          alt={`${milestone.minPoints}分 ${milestone.kitchenTitle}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${
                            isUnlocked ? '' : 'grayscale-[55%] brightness-75 blur-[1px]'
                          }`}
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="font-pixel text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#2b1807]/90 text-[#fde047] border border-[#a16207]">
                            {milestone.minPoints === 0
                              ? '0 分起點廚房'
                              : `${milestone.minPoints} 分廚房 (${milestoneWareTier.ovenTierLabel})`}
                          </span>

                          {isCurrentHighest ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-[#4a2800] shadow">
                              ✨ 目前所屬廚房
                            </span>
                          ) : isUnlocked ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1 shadow">
                              <CheckCircle2 className="w-3 h-3" /> 已解鎖
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-800/90 text-stone-200 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> 還差 {milestone.minPoints - student.points} 分
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between gap-2 text-white">
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm drop-shadow truncate">
                              {milestone.icon} {milestone.kitchenTitle}
                            </h4>
                            <p className="text-[11px] text-amber-100/95 line-clamp-1">
                              {milestone.description}
                            </p>
                          </div>

                          {isUnlocked && (
                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playCorrect();
                                setPreviewMinPoints(
                                  isCurrentHighest ? null : milestone.minPoints
                                );
                                setActiveTab('kitchen');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer shadow ${
                                isPreviewing
                                  ? 'bg-amber-400 text-[#4a2800]'
                                  : 'bg-white/95 hover:bg-white text-[#4a2800]'
                              }`}
                            >
                              {isPreviewing ? '預覽中 ✓' : '進去看看'}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-2.5 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#5a3818]">
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#c2410c]">🔥 廚具：</span>
                          {milestoneWareTier.ovenName}
                        </div>
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#b45309]">🍽️ 名菜：</span>
                          {milestone.specialtyDish}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 20 STARDEW DISHES & RECIPES ENCYCLOPEDIA */}
          {activeTab === 'dishes' && (
            <div className="space-y-4">
              <div className="bg-[#fffbeb] p-3.5 rounded-xl border border-[#f59e0b] text-xs text-stone-700 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-[#78350f] block text-sm">
                    📖 星露谷料理圖鑑與製作配方系統（0 ~ 1250 分逐步解鎖 {LIVE_KITCHEN_DISH_ROSTER.length} 道食譜）
                  </span>
                  <span className="text-xs text-[#92400e]">
                    累積積分即可自動學會更多星露谷名菜的完整製作配方！點擊已解鎖料理卡還能使用【{kitchenwareTier.ovenName}】現場試做～
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `全部 (${LIVE_KITCHEN_DISH_ROSTER.length})` },
                    { id: 'unlocked', label: `已解鎖 (${unlockedDishes.length})` },
                    {
                      id: 'locked',
                      label: `待解鎖 (${LIVE_KITCHEN_DISH_ROSTER.length - unlockedDishes.length})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setDishFilter(tab.id as 'all' | 'unlocked' | 'locked');
                      }}
                      className={`px-2.5 py-1 rounded-lg font-pixel text-[10px] font-bold border cursor-pointer transition-colors ${
                        dishFilter === tab.id
                          ? 'bg-[#c2410c] text-white border-[#7c2d12] shadow-xs'
                          : 'bg-white text-[#78350f] border-[#f59e0b] hover:bg-[#fef3c7]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {clickedNote && (
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] px-4 py-2 rounded-xl text-xs font-bold text-[#78350f] shadow-sm flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredDishes.map((item) => {
                  const isUnlocked = !isSooty && student.points >= item.unlockScore;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCookDishPreview(item, isUnlocked)}
                      className={`p-3.5 rounded-xl border-2 flex flex-col gap-2.5 transition-all text-left cursor-pointer hover:shadow-md ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#f59e0b] shadow-sm hover:-translate-y-0.5'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-xl bg-white border border-[#c4a675] shrink-0 shadow-xs relative">
                          <AvatarRenderer avatar={item.url} name={item.name} size={50} />
                          {isUnlocked ? (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="absolute -top-1 -right-1 bg-stone-500 text-white rounded-full p-0.5 shadow">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-[#3d240d] truncate">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-pixel px-2 py-0.5 rounded font-bold shrink-0 ${
                                isUnlocked
                                  ? 'bg-[#fef3c7] text-[#b45309] border border-[#f59e0b]/40'
                                  : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {item.unlockScore} 分解鎖
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap mt-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ffedd5] text-[#9a3412]">
                              🔥 {item.cookingUtensil}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              ✨ {item.buffEffect}
                            </span>
                          </div>

                          <p className="text-[11px] text-stone-700 mt-1.5 leading-snug">
                            {item.recipeSteps}
                          </p>
                        </div>
                      </div>

                      {/* Recipe Ingredients Strip with Wiki Pixel PNGs */}
                      <div className="pt-2 border-t border-[#e5d2ab] flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-[#78350f]">配方食材：</span>
                          {item.ingredients.map((ing) => (
                            <div
                              key={ing.name}
                              className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-[#d6ba89] shadow-2xs"
                            >
                              <AvatarRenderer avatar={ing.iconUrl} name={ing.name} size={20} bare />
                              <span className="text-[11px] font-bold text-[#4a2800]">
                                {ing.name} ×{ing.qty}
                              </span>
                            </div>
                          ))}
                        </div>

                        <span
                          className={`text-[10px] font-pixel font-bold px-2 py-0.5 rounded ${
                            isUnlocked
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {isUnlocked ? '點擊試做 🍳' : `還差 ${item.unlockScore - student.points} 分`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#faeed1] px-4 py-3 border-t-2 border-[#c4a675] flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-stone-600">
            🍳 每滿 50 分觸發廚具升級特效（烤箱變大、鍋鏟進化）· 累積積分自動解鎖 {LIVE_KITCHEN_DISH_ROSTER.length} 道料理製作配方
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-1.5 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] text-xs font-bold border border-[#a3794b] rounded-lg cursor-pointer shrink-0"
          >
            返回名冊
          </button>
        </div>

        {/* Celebratory Particle Burst + "恭喜升級！" Modal on 50-point Milestones */}
        {celebrationMilestone !== null && (() => {
          const unlockedKitchenArt = getStudentKitchenArtwork(celebrationMilestone);
          const unlockedWare = getStudentKitchenwareTier(celebrationMilestone);
          return (
            <UpgradeCelebrationOverlay
              isOpen={true}
              mode="kitchen"
              studentName={student.name}
              milestonePoints={celebrationMilestone}
              unlockedTitle={`${unlockedKitchenArt.kitchenTitle} · ${unlockedWare.ovenName}`}
              unlockedSubtitle={`廚具全面進化！烤箱升級為「${unlockedWare.ovenName}」，鍋鏟進階成「${unlockedWare.spatulaName}」，快端出「${unlockedKitchenArt.specialtyDish}」慶祝吧！`}
              unlockedIcon={unlockedKitchenArt.icon}
              unlockedImageUrl={unlockedKitchenArt.bgUrl}
              onClose={() => {
                setCelebrationMilestone(null);
                triggerKitchenwareAnimation(celebrationMilestone);
              }}
            />
          );
        })()}
      </div>
    </div>
  );
};
