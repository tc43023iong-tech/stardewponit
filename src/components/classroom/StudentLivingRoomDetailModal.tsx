import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import {
  getStudentLivingRoomArtwork,
  getStudentLivingWareTier,
  LIVING_ROOM_BACKGROUND_MILESTONES,
  LIVE_LIVING_ROOM_ACTIVITIES,
  LIVING_TV_CHANNELS,
  LivingRoomArtworkTier,
  LivingRoomActivityItem,
} from '../../utils/livingRoomArtwork';
import { soundManager } from '../../utils/sound';
import { UpgradeCelebrationOverlay } from './UpgradeCelebrationOverlay';
import { PixelLivingRoomUpgradeFX } from './PixelLivingRoomDisplay';
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
  Tv,
  Gamepad2,
  Popcorn,
  Image as ImageIcon,
  Sprout,
  Home,
  ChefHat,
  Bath,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
  Play,
} from 'lucide-react';

interface StudentLivingRoomDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToKitchen?: (student: Student) => void;
  onSwitchToBathroom?: (student: Student) => void;
}

interface LivingCompanion {
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

interface ArcadeCellItem {
  emoji: string;
  label: string;
  points: number;
  isTrap?: boolean;
}

interface MemoryCard {
  uid: number;
  pairId: string;
  name: string;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const LIVING_COMPANION_QUOTES = [
  '快來沙發坐下！剛爆好的奶油爆米花跟冰果茶都準備好囉～🍿',
  '今天的電視節目超精彩，打完電動再一起玩桌遊吧！🎮',
  '好期待下一個 50 分解鎖的新豪華娛樂大客廳與超大巨幕！✨',
  '在這裡吃喝玩樂最開心了，積分也會跟著努力一起起飛喔！',
];

const ARCADE_SPAWN_POOL: ArcadeCellItem[] = [
  { emoji: '⭐', label: '星之果實', points: 3 },
  { emoji: '🍿', label: '奶油爆米花', points: 2 },
  { emoji: '💎', label: '五彩寶石', points: 5 },
  { emoji: '🍓', label: '甜草莓飲', points: 2 },
  { emoji: '🪨', label: '頑皮石頭', points: -2, isTrap: true },
];

const buildShuffledMemoryDeck = (): MemoryCard[] => {
  const chosen = [
    LIVE_LIVING_ROOM_ACTIVITIES[2], // popcorn
    LIVE_LIVING_ROOM_ACTIVITIES[3], // pancakes
    LIVE_LIVING_ROOM_ACTIVITIES[5], // pizza
    LIVE_LIVING_ROOM_ACTIVITIES[7], // strawberry drink
    LIVE_LIVING_ROOM_ACTIVITIES[9], // chocolate cake
    LIVE_LIVING_ROOM_ACTIVITIES[18], // rainbow shell / starfruit treat
  ].filter(Boolean);

  const pairs = [...chosen, ...chosen].map((item, idx) => ({
    uid: idx,
    pairId: item.id,
    name: item.name.split(' ')[0],
    url: item.url,
    isFlipped: false,
    isMatched: false,
  }));

  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
};

const celebratedLivingRoomUpgradeTiers = new Map<string, number>();

export const StudentLivingRoomDetailModal: React.FC<StudentLivingRoomDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToKitchen,
  onSwitchToBathroom,
}) => {
  const [activeTab, setActiveTab] = useState<'livingRoom' | 'games' | 'roadmap' | 'activities'>(
    'livingRoom'
  );
  const [activityStatusFilter, setActivityStatusFilter] = useState<'all' | 'unlocked' | 'locked'>(
    'all'
  );
  const [activityCatFilter, setActivityCatFilter] = useState<
    'all' | '美味零食' | '暢快飲品' | '電玩桌遊' | '視聽手作'
  >('all');
  const [selectedActivity, setSelectedActivity] = useState<LivingRoomActivityItem | null>(null);
  const [clickedNote, setClickedNote] = useState<string | null>(null);
  const [previewMinPoints, setPreviewMinPoints] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [livingWareFxActive, setLivingWareFxActive] = useState<boolean>(false);
  const [livingWareFxPoints, setLivingWareFxPoints] = useState<number>(0);

  // Interactive TV Channel State
  const [tvChannelIndex, setTvChannelIndex] = useState<number>(0);
  const [isTvOn, setIsTvOn] = useState<boolean>(true);

  // Mini-Game A: 15s Junimo Arcade Whack/Catch
  const [arcadeRunning, setArcadeRunning] = useState<boolean>(false);
  const [arcadeTimeLeft, setArcadeTimeLeft] = useState<number>(15);
  const [arcadeScore, setArcadeScore] = useState<number>(0);
  const [arcadeBestScore, setArcadeBestScore] = useState<number>(0);
  const [arcadeGrid, setArcadeGrid] = useState<(ArcadeCellItem | null)[]>(
    () => Array(9).fill(null)
  );
  const [arcadeLastResult, setArcadeLastResult] = useState<string | null>(null);
  const arcadeTimerRef = useRef<number | null>(null);
  const arcadeSpawnRef = useRef<number | null>(null);

  // Mini-Game B: Living Room Memory Flip Game
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(buildShuffledMemoryDeck);
  const [memorySelectedUids, setMemorySelectedUids] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);
  const [memoryLocked, setMemoryLocked] = useState<boolean>(false);
  const memoryTimeoutRef = useRef<number | null>(null);

  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isDim = student.points < 0;
  const maxGoal = 1250;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  const livingTier = student.points >= 50 ? Math.floor(student.points / 50) : 0;
  const isExactMultipleOf50 = student.points >= 50 && student.points % 50 === 0;
  const prevLivingTierRef = useRef<{ studentId: string; tier: number }>({
    studentId: student.id,
    tier: livingTier,
  });

  const livingWareTier = getStudentLivingWareTier(student.points);
  const currentChannel = LIVING_TV_CHANNELS[tvChannelIndex % LIVING_TV_CHANNELS.length];

  const triggerLivingWareAnimation = (pts: number) => {
    setLivingWareFxPoints(pts);
    setLivingWareFxActive(false);
    requestAnimationFrame(() => {
      setLivingWareFxActive(true);
    });
  };

  useEffect(() => {
    if (!livingWareFxActive) return;
    const t = setTimeout(() => setLivingWareFxActive(false), 3800);
    return () => clearTimeout(t);
  }, [livingWareFxActive]);

  // Trigger living room & media equipment upgrade celebration on mount if at an uncelebrated multiple of 50
  useEffect(() => {
    setCelebrationMilestone(null);
    setSelectedActivity(null);
    if (
      isExactMultipleOf50 &&
      celebratedLivingRoomUpgradeTiers.get(student.id) !== livingTier
    ) {
      celebratedLivingRoomUpgradeTiers.set(student.id, livingTier);
      const milestonePts = livingTier * 50;
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerLivingWareAnimation(milestonePts);
        setCelebrationMilestone(milestonePts);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [student.id]);

  // Trigger living room upgrade animation + celebration modal when crossing a 50-point multiple live
  useEffect(() => {
    const prev = prevLivingTierRef.current;
    if (prev.studentId !== student.id) {
      prevLivingTierRef.current = { studentId: student.id, tier: livingTier };
      return;
    }

    if (livingTier > prev.tier && livingTier >= 1) {
      celebratedLivingRoomUpgradeTiers.set(student.id, livingTier);
      const targetMilestone = livingTier * 50;
      prevLivingTierRef.current = { studentId: student.id, tier: livingTier };
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerLivingWareAnimation(targetMilestone);
        setCelebrationMilestone(targetMilestone);
      }, 1360);
      return () => clearTimeout(timer);
    }

    if (livingTier < prev.tier) {
      if (livingTier === 0) {
        celebratedLivingRoomUpgradeTiers.delete(student.id);
      } else {
        celebratedLivingRoomUpgradeTiers.set(student.id, livingTier);
      }
    }
    prevLivingTierRef.current = { studentId: student.id, tier: livingTier };
  }, [student.id, student.points, livingTier]);

  // Cleanup mini-game timers on unmount or modal close
  const stopArcadeTimers = () => {
    if (arcadeTimerRef.current !== null) {
      window.clearInterval(arcadeTimerRef.current);
      arcadeTimerRef.current = null;
    }
    if (arcadeSpawnRef.current !== null) {
      window.clearInterval(arcadeSpawnRef.current);
      arcadeSpawnRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopArcadeTimers();
      if (memoryTimeoutRef.current !== null) {
        window.clearTimeout(memoryTimeoutRef.current);
      }
    };
  }, []);

  // Start Mini-Game A
  const handleStartArcadeGame = () => {
    stopArcadeTimers();
    soundManager.playCorrect();
    setArcadeScore(0);
    setArcadeTimeLeft(15);
    setArcadeLastResult(null);
    setArcadeRunning(true);

    const spawnItems = () => {
      const nextGrid: (ArcadeCellItem | null)[] = Array(9).fill(null);
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * 9);
        const item = ARCADE_SPAWN_POOL[Math.floor(Math.random() * ARCADE_SPAWN_POOL.length)];
        nextGrid[idx] = item;
      }
      setArcadeGrid(nextGrid);
    };

    spawnItems();
    arcadeSpawnRef.current = window.setInterval(spawnItems, 680);
    arcadeTimerRef.current = window.setInterval(() => {
      setArcadeTimeLeft((prev) => {
        if (prev <= 1) {
          stopArcadeTimers();
          setArcadeRunning(false);
          setArcadeGrid(Array(9).fill(null));
          soundManager.playVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!arcadeRunning && arcadeTimeLeft === 0) {
      setArcadeBestScore((prev) => Math.max(prev, arcadeScore));
      setArcadeLastResult(
        `🎉 時間到！本次客廳電玩挑戰拿下 ${arcadeScore} 分！${
          arcadeScore >= 20 ? '太神啦，是星露谷街機王！🏆' : '再挑戰一次衝破紀錄吧！'
        }`
      );
    }
  }, [arcadeRunning, arcadeTimeLeft, arcadeScore]);

  const handleArcadeCellHit = (index: number) => {
    if (!arcadeRunning) return;
    const cell = arcadeGrid[index];
    if (!cell) return;

    if (cell.isTrap) {
      soundManager.playPointDeduct();
    } else {
      soundManager.playCollect();
    }
    setArcadeScore((prev) => Math.max(0, prev + cell.points));
    setArcadeGrid((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  // Memory Game handlers
  const handleResetMemoryGame = () => {
    if (memoryTimeoutRef.current !== null) {
      window.clearTimeout(memoryTimeoutRef.current);
      memoryTimeoutRef.current = null;
    }
    soundManager.playClick();
    setMemoryCards(buildShuffledMemoryDeck());
    setMemorySelectedUids([]);
    setMemoryMoves(0);
    setMemoryLocked(false);
  };

  const handleFlipMemoryCard = (uid: number) => {
    if (memoryLocked) return;
    const card = memoryCards.find((c) => c.uid === uid);
    if (!card || card.isFlipped || card.isMatched) return;

    soundManager.playClick();
    const updated = memoryCards.map((c) => (c.uid === uid ? { ...c, isFlipped: true } : c));
    const nextSelected = [...memorySelectedUids, uid];
    setMemoryCards(updated);
    setMemorySelectedUids(nextSelected);

    if (nextSelected.length === 2) {
      setMemoryMoves((m) => m + 1);
      setMemoryLocked(true);
      const first = updated.find((c) => c.uid === nextSelected[0])!;
      const second = updated.find((c) => c.uid === nextSelected[1])!;

      if (first.pairId === second.pairId) {
        soundManager.playCollect();
        const afterMatch = updated.map((c) =>
          c.uid === first.uid || c.uid === second.uid ? { ...c, isMatched: true } : c
        );
        setMemoryCards(afterMatch);
        setMemorySelectedUids([]);
        setMemoryLocked(false);
        if (afterMatch.every((c) => c.isMatched)) {
          setTimeout(() => soundManager.playVictory(), 250);
        }
      } else {
        memoryTimeoutRef.current = window.setTimeout(() => {
          setMemoryCards((curr) =>
            curr.map((c) =>
              c.uid === first.uid || c.uid === second.uid ? { ...c, isFlipped: false } : c
            )
          );
          setMemorySelectedUids([]);
          setMemoryLocked(false);
        }, 720);
      }
    }
  };

  const matchedPairsCount = Math.floor(memoryCards.filter((c) => c.isMatched).length / 2);
  const totalMemoryPairs = Math.floor(memoryCards.length / 2);

  const defaultArtwork = getStudentLivingRoomArtwork(student.points);
  const previewMilestone: LivingRoomArtworkTier | undefined =
    previewMinPoints !== null && !isDim && student.points >= previewMinPoints
      ? LIVING_ROOM_BACKGROUND_MILESTONES.find((m) => m.minPoints === previewMinPoints)
      : undefined;
  const livingArtwork = previewMilestone || defaultArtwork;

  useEffect(() => {
    if (previewMinPoints !== null && student.points < previewMinPoints) {
      setPreviewMinPoints(null);
    }
  }, [student.id, student.points, previewMinPoints]);

  const unlockedLivingRoomsCount = isDim
    ? 0
    : LIVING_ROOM_BACKGROUND_MILESTONES.filter(
        (m) => m.minPoints >= 50 && student.points >= m.minPoints
      ).length;

  const unlockedActivities = isDim
    ? []
    : LIVE_LIVING_ROOM_ACTIVITIES.filter((item) => item.unlockScore <= student.points);

  const filteredActivities = LIVE_LIVING_ROOM_ACTIVITIES.filter((item) => {
    const isUnlocked = !isDim && student.points >= item.unlockScore;
    if (activityStatusFilter === 'unlocked' && !isUnlocked) return false;
    if (activityStatusFilter === 'locked' && isUnlocked) return false;
    if (activityCatFilter !== 'all' && item.category !== activityCatFilter) return false;
    return true;
  });

  const companionAvatarId = student.stardewAvatar || student.avatar || 'sdv_dog';

  const buildLivingCompanions = (): LivingCompanion[] => {
    if (isDim) {
      return [
        {
          id: 'sdv_crow',
          name: '停電小烏鴉',
          quote: '嘎嘎…客廳停電黑漆漆的，加分回到 0 分以上就能打開電視開零食派對啦！',
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

    const list: LivingCompanion[] = [
      {
        id: companionAvatarId,
        name: `${student.name} 的客廳夥伴`,
        quote: LIVING_COMPANION_QUOTES[student.points % LIVING_COMPANION_QUOTES.length],
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

    if (student.points >= 150) {
      list.push({
        id: 'sdv_cat',
        name: '沙發打盹小貓咪',
        quote: '喵嗚～電視前面的軟地毯最暖和，看卡通配爆米花好幸福！📺',
        x: 58,
        y: 74,
        targetX: 58,
        targetY: 74,
        direction: -1,
        isWalking: false,
        pauseTimer: 9,
        bobOffset: 0,
      });
    }

    if (student.points >= 550) {
      list.push({
        id: 'junimo',
        name: '祝尼魔電玩玩伴',
        quote: '我已經把雙人搖桿和冰涼草莓飲都擺在茶几上囉，快來 PK 一場！🎮',
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

  const [companions, setCompanions] = useState<LivingCompanion[]>(buildLivingCompanions);

  useEffect(() => {
    setCompanions(buildLivingCompanions());
  }, [student.id, student.points, isDim, companionAvatarId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompanions((prev) =>
        prev.map((comp) => {
          let { x, y, targetX, targetY, direction, isWalking, pauseTimer, bobOffset, heartActive } =
            comp;

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

  const handleCompanionClick = (comp: LivingCompanion) => {
    soundManager.playCorrect();
    setClickedNote(`🛋️ 【${comp.name}】：「${comp.quote}」`);
    setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: true } : c)));
    setTimeout(() => {
      setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: false } : c)));
    }, 1400);
    setTimeout(() => {
      setClickedNote((curr) => (curr?.includes(comp.name) ? null : curr));
    }, 3200);
  };

  const handleActivityPreview = (item: LivingRoomActivityItem, isUnlocked: boolean) => {
    setSelectedActivity(item);
    if (isUnlocked) {
      soundManager.playCollect();
      setClickedNote(`🎉 在【${livingArtwork.livingRoomTitle.split('・')[1] || livingArtwork.livingRoomTitle}】享受「${item.name}」！（${item.moodEffect}）`);
      setCompanions((prev) => prev.map((c) => ({ ...c, heartActive: true })));
      setTimeout(() => {
        setCompanions((prev) => prev.map((c) => ({ ...c, heartActive: false })));
      }, 1200);
    } else {
      soundManager.playTick();
      const needed = item.unlockScore - student.points;
      setClickedNote(`🔒 【${item.name}】將於 ${item.unlockScore} 分解鎖，目前還差 ${needed} 分！`);
    }
    setTimeout(() => setClickedNote(null), 3400);
  };

  const handleSwitchTvChannel = (nextIdx: number) => {
    if (isDim) {
      soundManager.playTick();
      setClickedNote('🕯️ 目前客廳停電中，回到 0 分以上就能打開彩色電視收看節目囉！');
      setTimeout(() => setClickedNote(null), 3000);
      return;
    }
    const wrapped = (nextIdx + LIVING_TV_CHANNELS.length) % LIVING_TV_CHANNELS.length;
    setTvChannelIndex(wrapped);
    setIsTvOn(true);
    const ch = LIVING_TV_CHANNELS[wrapped];
    soundManager.playCollect();
    setClickedNote(`📺 轉台至【${ch.channelNo} ${ch.name}】：${ch.broadcastLine}`);
    setTimeout(() => setClickedNote(null), 3800);
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
                  🛋️ 【{student.name}】的專屬星露谷歡樂客廳
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>
                  {livingArtwork.scaleLabel} · {livingArtwork.livingRoomTitle}
                </span>
                <span className={isDim ? 'text-rose-300' : 'text-[#e9d5ff]'}>
                  {isDim
                    ? '· 🕯️ 停電舊客廳，加分回到 0 分以上即可開燈玩樂！'
                    : `· 設備 ${livingWareTier.tierLabel} · 客廳 ${unlockedLivingRoomsCount}/25 · 吃喝玩樂 ${unlockedActivities.length}/${LIVE_LIVING_ROOM_ACTIVITIES.length}`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {onSwitchToFarm && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToFarm(student);
                }}
                className="bg-[#4c8c38] hover:bg-[#3f752e] text-white border border-[#86efac] px-2 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
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
                className="bg-[#b45309] hover:bg-[#92400e] text-white border border-[#fbbf24] px-2 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的專屬溫馨房間"
              >
                <Home className="w-3.5 h-3.5" />
                <span>房間</span>
              </button>
            )}
            {onSwitchToKitchen && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToKitchen(student);
                }}
                className="bg-[#c2410c] hover:bg-[#9a3412] text-white border border-[#fdba74] px-2 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的專屬夢幻廚房"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>廚房</span>
              </button>
            )}
            {onSwitchToBathroom && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToBathroom(student);
                }}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white border border-[#7dd3fc] px-2 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
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
              className="pixel-btn-gold px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
            >
              <Star className="w-3.5 h-3.5 fill-[#633300]" />
              <span>評定</span>
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

        {/* Score HUD Progress Bar & 4 Tab Switchers */}
        <div className="bg-[#4a2e13] px-4 py-2 text-[#ffebb3] border-b-2 border-[#2b1807] flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-pixel text-xs text-[#ffd700]">
              <span aria-hidden="true">🛋️</span>
              <span className="tabular-nums">目前客廳積分：{student.points} 分 / 1250 分</span>
              {student.points >= 1250 ? (
                <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black">
                  ⭐ 1250分永恆星果娛樂殿堂！25間客廳與{LIVE_LIVING_ROOM_ACTIVITIES.length}項吃喝玩樂全解鎖！
                </span>
              ) : isDim ? (
                <span className="text-[11px] text-rose-300 font-bold">
                  (🕯️ 停電狀態 · 還差 {Math.abs(student.points)} 分重新點亮彩色大電視)
                </span>
              ) : (
                <span className="text-[11px] text-[#e9d5ff] font-bold">
                  (每 50 分全面升級電視與電玩區 · 吃喝玩樂 {unlockedActivities.length}/{LIVE_LIVING_ROOM_ACTIVITIES.length} · 客廳 {unlockedLivingRoomsCount}/25)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-sm">
              <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ${
                    student.points >= 1250
                      ? 'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-amber-300 animate-pulse'
                      : 'bg-gradient-to-r from-violet-400 to-fuchsia-500'
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
                  setActiveTab('livingRoom');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'livingRoom'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🛋️ 實景客廳＆看電視
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('games');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'games'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🎮 客廳遊樂場 (玩小遊戲!)
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
                🖼️ 客廳升級圖鑑 (50~1250分)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('activities');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'activities'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🍿 吃喝玩樂圖鑑 ({unlockedActivities.length}/{LIVE_LIVING_ROOM_ACTIVITIES.length})
              </button>
            </div>

            {!isDim && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playAchievementUnlock();
                  triggerLivingWareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#6d28d9] hover:bg-[#7c3aed] text-[#f3e8ff] border border-[#d8b4fe]/60 flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                title="點擊觀看「大電視進化、搖桿主機升級」像素特效"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>預覽影音升級特效</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING PIXEL LIVING ROOM INTERIOR + LIVE TV TUNER */}
          {activeTab === 'livingRoom' && (
            <div className="space-y-3">
              {/* Living Room Status Banner */}
              <div
                className={`border-2 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs ${
                  isDim ? 'bg-rose-50 border-rose-400' : 'bg-[#f5f3ff] border-[#7c3aed]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{livingArtwork.icon}</span>
                  <div>
                    <span
                      className={`font-pixel text-[11px] font-bold block ${
                        isDim ? 'text-rose-900' : 'text-[#4c1d95]'
                      }`}
                    >
                      【目前客廳等級】{livingArtwork.livingRoomTitle}（{livingArtwork.scaleLabel}）
                      {previewMilestone && (
                        <span className="ml-2 text-emerald-700 font-black">
                          (正在預覽已解鎖的 {previewMilestone.minPoints} 分客廳)
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isDim ? 'text-rose-800' : 'text-[#6d28d9]'
                      }`}
                    >
                      影音配置：{livingWareTier.tvName} ＋ {livingWareTier.consoleName}
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
                      回到目前最高階客廳
                    </button>
                  )}
                  {isDim ? (
                    <span className="text-[11px] font-pixel text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded border border-rose-400">
                      還需 {Math.abs(student.points)} 分重啟歡樂客廳
                    </span>
                  ) : defaultArtwork.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#4c1d95] bg-violet-200/80 px-2 py-0.5 rounded border border-[#7c3aed]">
                      距 {defaultArtwork.nextPoints} 分客廳升級尚需: {defaultArtwork.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      ⭐ 已解鎖全部 25 間滿級夢幻客廳！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('games');
                    }}
                    className="px-2.5 py-0.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>馬上去玩遊戲 →</span>
                  </button>
                </div>
              </div>

              {/* Interactive Interaction Note */}
              {clickedNote && (
                <div className="bg-[#f3e8ff] border-2 border-[#7c3aed] px-4 py-2.5 rounded-xl text-center text-xs font-bold text-[#4c1d95] shadow-md animate-bounce flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              {/* AUTHENTIC 16-BIT PIXEL ART LIVING ROOM STAGE */}
              <div
                className={`relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none ${
                  isDim ? 'bg-[#1c1917]' : 'bg-[#1e1b4b]'
                }`}
                style={{
                  height: isFullscreen ? '70vh' : '500px',
                }}
              >
                <img
                  src={livingArtwork.bgUrl}
                  alt={`${student.name} 的星露谷歡樂客廳`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Top gradient for legible HUD */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

                {/* Top Interactive Console & Snack Buttons */}
                <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`🎮 【${livingArtwork.consoleFacility}】：${livingArtwork.description}`);
                        setTimeout(() => setClickedNote(null), 3200);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2e1065]/85 hover:bg-[#581c87] text-[#f3e8ff] border border-[#c084fc] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {livingArtwork.consoleFacility.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick();
                        setClickedNote(`🍿 【茶几美味：${livingArtwork.snackFeature}】：吃飽喝足心情一級棒！`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2e1065]/85 hover:bg-[#581c87] text-[#fde68a] border border-[#c084fc] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Popcorn className="w-3.5 h-3.5 text-amber-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {livingArtwork.snackFeature}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg bg-[#1e1b4b]/85 border text-[11px] font-bold shadow-md backdrop-blur-xs ${
                      isDim
                        ? 'text-rose-200 border-rose-500/80'
                        : 'text-[#e9d5ff] border-[#a855f7]'
                    }`}
                  >
                    {livingArtwork.icon} {livingArtwork.livingRoomTitle}
                  </div>
                </div>

                {/* Live Interactive Pixel TV Receiver Widget (Top Left under HUD) */}
                <div className="absolute top-14 left-3 z-25 w-64 sm:w-72 pointer-events-auto">
                  <div className="bg-[#1e1b4b]/90 border-2 border-[#a855f7] rounded-xl p-2 shadow-xl backdrop-blur-xs text-white">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Tv className="w-3.5 h-3.5 text-[#f472b6] shrink-0" />
                        <span className="font-pixel text-[10px] text-[#fde047] truncate">
                          {isDim ? '沒訊號' : `${currentChannel.channelNo} ${currentChannel.name}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSwitchTvChannel(tvChannelIndex - 1)}
                          className="p-0.5 rounded bg-[#4c1d95] hover:bg-[#6d28d9] border border-[#c084fc]/60 cursor-pointer"
                          title="上一台"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSwitchTvChannel(tvChannelIndex + 1)}
                          className="p-0.5 rounded bg-[#4c1d95] hover:bg-[#6d28d9] border border-[#c084fc]/60 cursor-pointer"
                          title="下一台"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setIsTvOn((v) => !v);
                          }}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-pixel border cursor-pointer ${
                            isTvOn && !isDim
                              ? 'bg-emerald-600 border-emerald-300 text-white'
                              : 'bg-stone-700 border-stone-500 text-stone-300'
                          }`}
                        >
                          {isTvOn && !isDim ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>

                    {/* Mini TV Screen */}
                    <div
                      onClick={() => handleSwitchTvChannel(tvChannelIndex + 1)}
                      className={`rounded-lg border border-black/60 px-2.5 py-1.5 cursor-pointer transition-all ${
                        isDim || !isTvOn
                          ? 'bg-stone-800 text-stone-400'
                          : `bg-gradient-to-r ${currentChannel.screenTheme} text-slate-950 shadow-inner`
                      }`}
                      title="點擊螢幕轉台看下一個星露谷節目！"
                    >
                      {isDim || !isTvOn ? (
                        <div className="text-[10px] font-pixel text-center py-1">
                          {isDim ? '📺 停電雪花中…' : '📺 電視待機中（點擊開機）'}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black truncate">
                              {currentChannel.icon} {currentChannel.showTitle}
                            </p>
                            <p className="text-[9px] font-bold opacity-85 truncate">
                              點擊換台 (共 5 個星露谷頻道)
                            </p>
                          </div>
                          <div className="flex items-center gap-0.5 text-sm shrink-0 animate-pulse">
                            {currentChannel.pixelEmojiScene.map((em, idx) => (
                              <span key={idx}>{em}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Pixel TV & Console Evolution Dock */}
                <div className="absolute bottom-14 right-3 z-25 max-w-[92%] sm:max-w-sm pointer-events-auto">
                  <PixelLivingRoomUpgradeFX
                    isActive={livingWareFxActive}
                    milestonePoints={livingWareFxPoints || Math.max(50, Math.floor(student.points / 50) * 50)}
                    tier={livingWareTier}
                    onReplay={
                      !isDim
                        ? () => {
                            soundManager.playAchievementUnlock();
                            triggerLivingWareAnimation(
                              Math.max(50, Math.floor(student.points / 50) * 50)
                            );
                          }
                        : undefined
                    }
                  />
                </div>

                {/* Bottom Living Room Features Shelf */}
                <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 bg-[#1e1b4b]/88 border-2 border-[#a855f7] px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-xs max-w-[92%] overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#e9d5ff] mr-1 hidden sm:inline shrink-0">
                    客廳亮點:
                  </span>
                  {livingArtwork.unlockedFunFeatures.map((feat) => (
                    <button
                      key={feat.label}
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`${feat.emoji} 【${feat.label}】：${feat.quote}`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-[#4c1d95]/90 hover:bg-[#6d28d9] text-[#faf5ff] border border-[#c084fc]/60 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-transform hover:scale-105"
                      title={feat.quote}
                    >
                      <span>{feat.emoji}</span>
                      <span>{feat.label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('games');
                    }}
                    className="ml-1 px-2 py-1 rounded-lg bg-[#ec4899] hover:bg-[#db2777] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 border border-[#fbcfe8]/60"
                  >
                    <Gamepad2 className="w-3 h-3" />
                    <span>玩客廳小遊戲</span>
                  </button>
                </div>

                {/* Free-Roaming Living Room Companion(s) */}
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
                        <div className="absolute -top-8 text-fuchsia-400 animate-bounce text-xl filter drop-shadow">
                          {isDim ? '💧' : '🎉'}
                        </div>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 font-pixel text-[9px] bg-[#2e1065]/95 text-[#f3e8ff] px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-[#c084fc] z-40">
                        {comp.name}
                      </div>
                      <div
                        className={`transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-md select-none ${
                          isDim ? 'brightness-90 saturate-75' : ''
                        }`}
                        style={{ transform: `scaleX(${comp.direction})` }}
                      >
                        <div className={isDim ? 'animate-crow-hop-flap' : 'animate-pet-breathe'}>
                          <AvatarRenderer avatar={comp.id} name={comp.name} size={50} bare={true} />
                        </div>
                      </div>
                      <div className="w-8 h-1.5 bg-black/35 rounded-full blur-[1px] -mt-1 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Ambient party sparkle */}
                {!isDim && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute top-1/4 right-1/3 text-xs text-fuchsia-200/75 animate-ping">
                      🎵
                    </div>
                    <div
                      className="absolute top-1/3 right-1/4 text-xs text-amber-200/75 animate-ping"
                      style={{ animationDelay: '1.1s' }}
                    >
                      ✨
                    </div>
                  </div>
                )}
              </div>

              {/* UNLOCKED SNACKS, DRINKS & FUN ITEMS QUICK-SERVE SHELF */}
              <div className="bg-[#fdf6e2] border-2 border-[#a3794b] rounded-xl p-3 shadow-sm space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Popcorn className="w-4 h-4 text-[#7c3aed]" />
                    <h4 className="font-pixel text-xs font-bold text-[#4a2800]">
                      客廳吃喝玩樂茶几快選架（點擊立刻吃點心、喝飲料、玩玩具！）
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#4c1d95] bg-[#f3e8ff] px-2 py-0.5 rounded border border-[#d8b4fe]">
                      已解鎖 {unlockedActivities.length} / {LIVE_LIVING_ROOM_ACTIVITIES.length} 項
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setActiveTab('activities');
                      }}
                      className="text-[11px] font-bold text-[#6d28d9] hover:text-[#4c1d95] underline cursor-pointer"
                    >
                      打開完整吃喝玩樂圖鑑 →
                    </button>
                  </div>
                </div>

                {isDim ? (
                  <div className="bg-rose-50 border border-rose-300 rounded-lg px-3 py-2 text-xs font-bold text-rose-800">
                    🕯️ 負分停電期暫時收起零食與遊戲櫃，回到 0 分以上就會立即擺滿點心登場！
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {LIVE_LIVING_ROOM_ACTIVITIES.map((item) => {
                      const isUnlocked = student.points >= item.unlockScore;
                      const isSelected = selectedActivity?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleActivityPreview(item, isUnlocked)}
                          className={`relative shrink-0 p-1.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#f3e8ff] border-[#7c3aed] ring-2 ring-[#c084fc] -translate-y-0.5 shadow-md'
                              : isUnlocked
                              ? 'bg-white border-[#c084fc]/60 hover:border-[#7c3aed] hover:-translate-y-0.5 shadow-xs'
                              : 'bg-[#ede0c2]/65 border-[#c4a675] opacity-55 grayscale-[70%]'
                          }`}
                          title={
                            isUnlocked
                              ? `${item.name} — 點擊在客廳吃喝玩樂！`
                              : `🔒 需達 ${item.unlockScore} 分解鎖 ${item.name}`
                          }
                        >
                          <AvatarRenderer avatar={item.url} name={item.name} size={38} bare />
                          <span className="text-[9px] font-pixel font-bold text-[#4c1d95] max-w-[60px] truncate">
                            {item.name.split(' ')[0]}
                          </span>
                          {!isUnlocked && (
                            <span className="absolute -top-1.5 -right-1.5 bg-stone-700 text-white text-[9px] font-pixel px-1 rounded shadow flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                              {item.unlockScore}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Selected Activity Inspector */}
                {selectedActivity && (
                  <div className="bg-[#f5f3ff] border-2 border-[#7c3aed] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 bg-white rounded-xl border-2 border-[#c084fc] shadow-xs shrink-0">
                        <AvatarRenderer
                          avatar={selectedActivity.url}
                          name={selectedActivity.name}
                          size={46}
                          bare
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#4c1d95]">
                            {selectedActivity.name}
                          </span>
                          <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-[#f3e8ff] text-[#6d28d9] border border-[#d8b4fe]">
                            {selectedActivity.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {selectedActivity.moodEffect}
                          </span>
                        </div>
                        <p className="text-xs text-[#5b21b6] font-bold mt-1">
                          體驗玩法：{selectedActivity.enjoyTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PLAYABLE LIVING ROOM MINI-GAMES ARCADE + LIVE TV CHANNELS */}
          {activeTab === 'games' && (
            <div className="space-y-4">
              {/* Top Interactive 5-Channel TV Bar */}
              <div className="bg-[#1e1b4b] border-2 border-[#7c3aed] rounded-2xl p-3.5 text-white shadow-lg space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#f472b6]" />
                    <span className="font-pixel text-xs sm:text-sm text-[#fde047]">
                      📺 客廳 5 頻道星露谷大電視（點擊切換節目！）
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {LIVING_TV_CHANNELS.map((ch, idx) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => handleSwitchTvChannel(idx)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
                          !isDim && isTvOn && tvChannelIndex === idx
                            ? 'bg-[#f472b6] text-white border-white shadow'
                            : 'bg-[#312e81] hover:bg-[#4c1d95] text-[#e9d5ff] border-[#a855f7]/50'
                        }`}
                      >
                        {ch.icon} {ch.channelNo}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`rounded-xl border-2 border-black/50 p-3 flex flex-wrap items-center justify-between gap-3 ${
                    isDim
                      ? 'bg-stone-800 text-stone-300'
                      : `bg-gradient-to-r ${currentChannel.screenTheme} text-slate-950`
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-pixel text-xs font-black">
                      {isDim
                        ? '🕯️ 停電模式：電視無訊號（回到 0 分以上開播）'
                        : `${currentChannel.channelNo} · ${currentChannel.name} —《${currentChannel.showTitle}》`}
                    </div>
                    <p className="text-xs font-bold mt-1 opacity-95">
                      {isDim
                        ? '趕快賺取正分重新通電，就可以邊看節目邊吃爆米花！'
                        : currentChannel.broadcastLine}
                    </p>
                  </div>
                  {!isDim && (
                    <div className="flex items-center gap-1.5 text-2xl bg-white/45 px-3 py-1.5 rounded-xl border border-white/60 shadow-inner">
                      {currentChannel.pixelEmojiScene.map((em, i) => (
                        <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                          {em}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dual Mini-Games Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Mini-Game A: 15s Junimo Starfruit Arcade */}
                <div className="bg-[#fdfbf7] border-2 border-[#7c3aed] rounded-2xl p-4 shadow-md flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-pixel text-xs sm:text-sm text-[#4c1d95] flex items-center gap-1.5">
                          <Gamepad2 className="w-4 h-4 text-[#7c3aed]" />
                          <span>街機 1：祝尼魔星果大作戰 (15秒)</span>
                        </h4>
                        <p className="text-[11px] text-stone-600 font-bold mt-0.5">
                          快手點擊 ⭐(+3) 🍿(+2) 💎(+5)，小心別點到石頭 🪨(-2) 喔！
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartArcadeGame}
                        className="px-3 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-pixel font-bold flex items-center gap-1 cursor-pointer shadow active:scale-95 shrink-0"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{arcadeRunning ? '重新開始' : '開始遊戲'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#f3e8ff] border border-[#d8b4fe] rounded-lg px-3 py-1.5 text-xs font-bold text-[#4c1d95] mb-3">
                      <span>⏱️ 剩餘：{arcadeTimeLeft} 秒</span>
                      <span>🎯 本局：{arcadeScore} 分</span>
                      <span className="flex items-center gap-1 text-amber-700">
                        <Trophy className="w-3.5 h-3.5" /> 最高：{arcadeBestScore}
                      </span>
                    </div>

                    {/* 3x3 Pixel Arcade Board */}
                    <div className="grid grid-cols-3 gap-2 bg-[#2e1065] p-3 rounded-xl border-4 border-[#4c1d95] shadow-inner">
                      {arcadeGrid.map((cell, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleArcadeCellHit(idx)}
                          disabled={!arcadeRunning}
                          className={`aspect-[4/3] rounded-xl border-2 flex flex-col items-center justify-center transition-all select-none ${
                            cell
                              ? cell.isTrap
                                ? 'bg-rose-950/90 border-rose-400 hover:scale-105 active:scale-90 cursor-pointer shadow-lg'
                                : 'bg-gradient-to-br from-amber-300/95 to-yellow-200 border-white hover:scale-105 active:scale-90 cursor-pointer shadow-lg'
                              : 'bg-[#1e1b4b]/80 border-[#5b21b6]/60 cursor-default'
                          }`}
                        >
                          {cell ? (
                            <>
                              <span className="text-2xl sm:text-3xl leading-none">{cell.emoji}</span>
                              <span
                                className={`text-[10px] font-pixel font-black mt-1 ${
                                  cell.isTrap ? 'text-rose-200' : 'text-[#4a2800]'
                                }`}
                              >
                                {cell.points > 0 ? `+${cell.points}` : cell.points}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs text-[#6d28d9]/60 font-pixel">·</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {arcadeLastResult && (
                    <div className="bg-amber-50 border border-amber-400 rounded-lg px-3 py-2 text-xs font-bold text-amber-900">
                      {arcadeLastResult}
                    </div>
                  )}
                </div>

                {/* Mini-Game B: Living Room Snack & Toy Memory Match */}
                <div className="bg-[#fdfbf7] border-2 border-[#db2777] rounded-2xl p-4 shadow-md flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-pixel text-xs sm:text-sm text-[#9d174d] flex items-center gap-1.5">
                          <span>🃏</span>
                          <span>桌遊 2：派對點心記憶翻牌 (6組配對)</span>
                        </h4>
                        <p className="text-[11px] text-stone-600 font-bold mt-0.5">
                          翻出相同的客廳點心與飲品配對，考驗記憶力！
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetMemoryGame}
                        className="px-2.5 py-1.5 rounded-lg bg-[#db2777] hover:bg-[#be185d] text-white text-xs font-pixel font-bold flex items-center gap-1 cursor-pointer shadow active:scale-95 shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>洗牌重玩</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#fdf2f8] border border-[#fbcfe8] rounded-lg px-3 py-1.5 text-xs font-bold text-[#9d174d] mb-3">
                      <span>🃏 已配對：{matchedPairsCount} / {totalMemoryPairs} 組</span>
                      <span>👆 翻牌次數：{memoryMoves} 次</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 bg-[#4a2e13] p-3 rounded-xl border-4 border-[#2b1807] shadow-inner">
                      {memoryCards.map((card) => {
                        const revealed = card.isFlipped || card.isMatched;
                        return (
                          <button
                            key={card.uid}
                            type="button"
                            onClick={() => handleFlipMemoryCard(card.uid)}
                            className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all cursor-pointer select-none ${
                              card.isMatched
                                ? 'bg-emerald-100 border-emerald-500 shadow-inner'
                                : revealed
                                ? 'bg-white border-[#f472b6] shadow-md scale-105'
                                : 'bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] border-[#ddd6fe]/60 shadow active:scale-95'
                            }`}
                          >
                            {revealed ? (
                              <>
                                <AvatarRenderer avatar={card.url} name={card.name} size={36} bare />
                                <span className="text-[9px] font-bold text-[#4a2800] truncate max-w-full mt-0.5">
                                  {card.name}
                                </span>
                              </>
                            ) : (
                              <span className="text-xl text-amber-200 font-pixel">?</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {matchedPairsCount === totalMemoryPairs && totalMemoryPairs > 0 && (
                    <div className="bg-emerald-50 border border-emerald-400 rounded-lg px-3 py-2 text-xs font-bold text-emerald-900">
                      🎉 太厲害了！只用 {memoryMoves} 步就收集完成全部客廳美食記憶配對！🏆
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 50-POINT LIVING ROOM UPGRADE ROADMAP (0 to 1250) */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-[#f5f3ff] p-3.5 rounded-xl border border-[#a855f7] text-xs text-[#4c1d95] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <ImageIcon className="w-5 h-5 text-[#7c3aed] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#4c1d95] block text-sm">
                      🛋️ 每湊夠 50 分全面升級擴建專屬歡樂客廳（50 → 1250 分共 25 種主題娛樂廳）
                    </span>
                    <p className="mt-0.5 text-xs text-[#5b21b6]">
                      每跨越 50 分就會觸發「電視變巨幕、電玩主機升級」像素進化特效，解鎖街機、家庭劇院、黑膠吧台與零食長桌！
                    </p>
                  </div>
                </div>
                {!isDim && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playAchievementUnlock();
                      setActiveTab('livingRoom');
                      triggerLivingWareAnimation(
                        Math.max(50, Math.floor(student.points / 50) * 50)
                      );
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-pixel font-bold flex items-center gap-1.5 cursor-pointer shadow active:scale-95 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                    <span>回客廳看影音進化特效</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {LIVING_ROOM_BACKGROUND_MILESTONES.map((milestone) => {
                  const isUnlocked = !isDim && student.points >= milestone.minPoints;
                  const isCurrentHighest =
                    !isDim && defaultArtwork.minPoints === milestone.minPoints;
                  const isPreviewing = livingArtwork.minPoints === milestone.minPoints;
                  const milestoneWareTier = getStudentLivingWareTier(milestone.minPoints);

                  return (
                    <div
                      key={milestone.minPoints}
                      className={`rounded-xl border-2 overflow-hidden transition-all flex flex-col ${
                        isCurrentHighest
                          ? 'bg-[#f5f3ff] border-[#7c3aed] shadow-md ring-2 ring-[#c084fc]'
                          : isUnlocked
                          ? 'bg-[#fdfbf7] border-[#4ade80] shadow-xs'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-80'
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1e1b4b]">
                        <img
                          src={milestone.bgUrl}
                          alt={`${milestone.minPoints}分 ${milestone.livingRoomTitle}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${
                            isUnlocked ? '' : 'grayscale-[55%] brightness-75 blur-[1px]'
                          }`}
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="font-pixel text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#2e1065]/90 text-[#f3e8ff] border border-[#c084fc]">
                            {milestone.minPoints === 0
                              ? '0 分起點客廳'
                              : `${milestone.minPoints} 分客廳 (${milestoneWareTier.tierLabel})`}
                          </span>

                          {isCurrentHighest ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-400 text-[#1e1b4b] shadow">
                              ✨ 目前所屬客廳
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
                              {milestone.icon} {milestone.livingRoomTitle}
                            </h4>
                            <p className="text-[11px] text-violet-100/95 line-clamp-1">
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
                                setActiveTab('livingRoom');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer shadow ${
                                isPreviewing
                                  ? 'bg-violet-400 text-[#1e1b4b]'
                                  : 'bg-white/95 hover:bg-white text-[#4c1d95]'
                              }`}
                            >
                              {isPreviewing ? '預覽中 ✓' : '進去看看'}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-2.5 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#5a3818]">
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#7c3aed]">🎮 娛樂：</span>
                          {milestone.consoleFacility}
                        </div>
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#db2777]">🍿 茶點：</span>
                          {milestone.snackFeature}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: 22 EAT, DRINK & PLAY ACTIVITIES ENCYCLOPEDIA */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="bg-[#f5f3ff] p-3.5 rounded-xl border border-[#a855f7] text-xs text-[#4c1d95] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-[#4c1d95] block text-sm">
                      🍿 星露谷客廳吃喝玩樂圖鑑（0 ~ 1250 分逐步解鎖 {LIVE_LIVING_ROOM_ACTIVITIES.length} 項寶貝）
                    </span>
                    <span className="text-xs text-[#5b21b6]">
                      涵蓋美食點心、暢快飲品、電玩桌遊與視聽手作！點擊已解鎖項目就能立刻在客廳開派對享用！
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: `全部 (${LIVE_LIVING_ROOM_ACTIVITIES.length})` },
                      { id: 'unlocked', label: `已解鎖 (${unlockedActivities.length})` },
                      {
                        id: 'locked',
                        label: `待解鎖 (${LIVE_LIVING_ROOM_ACTIVITIES.length - unlockedActivities.length})`,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setActivityStatusFilter(tab.id as 'all' | 'unlocked' | 'locked');
                        }}
                        className={`px-2.5 py-1 rounded-lg font-pixel text-[10px] font-bold border cursor-pointer transition-colors ${
                          activityStatusFilter === tab.id
                            ? 'bg-[#7c3aed] text-white border-[#4c1d95] shadow-xs'
                            : 'bg-white text-[#4c1d95] border-[#c084fc] hover:bg-[#f3e8ff]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter Row */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#d8b4fe]">
                  {[
                    { id: 'all', label: '✨ 全部類型' },
                    { id: '美味零食', label: '🍿 美味零食' },
                    { id: '暢快飲品', label: '🧃 暢快飲品' },
                    { id: '電玩桌遊', label: '🎮 電玩桌遊' },
                    { id: '視聽手作', label: '📺 視聽手作' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setActivityCatFilter(
                          cat.id as 'all' | '美味零食' | '暢快飲品' | '電玩桌遊' | '視聽手作'
                        );
                      }}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-colors ${
                        activityCatFilter === cat.id
                          ? 'bg-[#db2777] text-white border-[#9d174d] shadow-xs'
                          : 'bg-white text-[#5b21b6] border-[#e9d5ff] hover:bg-[#fdf2f8]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {clickedNote && (
                <div className="bg-[#f3e8ff] border-2 border-[#7c3aed] px-4 py-2 rounded-xl text-xs font-bold text-[#4c1d95] shadow-sm flex items-center gap-2">
                  <Popcorn className="w-4 h-4 text-[#7c3aed] shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredActivities.map((item) => {
                  const isUnlocked = !isDim && student.points >= item.unlockScore;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleActivityPreview(item, isUnlocked)}
                      className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition-all text-left cursor-pointer hover:shadow-md ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#c084fc] shadow-sm hover:-translate-y-0.5'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-80'
                      }`}
                    >
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
                                ? 'bg-[#f3e8ff] text-[#6d28d9] border border-[#c084fc]/40'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {item.unlockScore} 分解鎖
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f3e8ff] text-[#5b21b6]">
                            🎉 {item.category}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            ✨ {item.moodEffect}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-700 mt-1.5 leading-snug">
                          {item.enjoyTip}
                        </p>
                        <p className="text-[11px] text-[#6d28d9] font-bold italic mt-1">
                          「{item.quote}」
                        </p>
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
            🛋️ 每滿 50 分觸發專屬客廳與大電視電玩升級特效 · 看電視、玩遊戲、吃喝玩樂全都有！
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
          const unlockedLivingArt = getStudentLivingRoomArtwork(celebrationMilestone);
          const unlockedWare = getStudentLivingWareTier(celebrationMilestone);
          return (
            <UpgradeCelebrationOverlay
              isOpen={true}
              mode="livingRoom"
              studentName={student.name}
              milestonePoints={celebrationMilestone}
              unlockedTitle={`${unlockedLivingArt.livingRoomTitle} · ${unlockedWare.tvName}`}
              unlockedSubtitle={`歡樂客廳全面升級！換上「${unlockedWare.tvName}」與「${unlockedWare.consoleName}」，茶几上擺滿「${unlockedLivingArt.snackFeature}」！`}
              unlockedIcon={unlockedLivingArt.icon}
              unlockedImageUrl={unlockedLivingArt.bgUrl}
              onClose={() => {
                setCelebrationMilestone(null);
                triggerLivingWareAnimation(celebrationMilestone);
              }}
            />
          );
        })()}
      </div>
    </div>
  );
};
