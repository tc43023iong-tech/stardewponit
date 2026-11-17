import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import {
  getFarmTier,
  getCropGrowth,
  LIVE_FARM_ANIMALS_ROSTER,
  LIVE_FARM_PLANTS_ROSTER,
  LiveFarmPlantBlueprint,
} from '../../data/classroomData';
import { AvatarRenderer } from './AvatarRenderer';
import {
  getStudentFarmArtwork,
  FARM_BACKGROUND_MILESTONES,
  FarmArtworkTier,
} from '../../utils/farmArtwork';
import { soundManager } from '../../utils/sound';
import { UpgradeCelebrationOverlay } from './UpgradeCelebrationOverlay';
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
  Droplets,
  Shield,
  Sprout,
  Image as ImageIcon,
  Home,
} from 'lucide-react';

interface StudentFarmDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
}

interface WanderingAnimal {
  id: string;
  name: string;
  subtitle: string;
  quote: string;
  url: string;
  sprite: string;
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

const WITHERED_CROW_BLUEPRINT = {
  id: 'sdv_crow',
  name: '田間烏鴉 (Crow)',
  subtitle: '等待農場放晴中',
  quote: '嘎嘎…目前為負分陰雨期，動物夥伴都先回家躲雨了，趕快加分回到 0 分以上吧！',
  unlockScore: -999,
  url: 'https://stardewvalleywiki.com/mediawiki/images/en/f/fa/Crow.png',
  spriteFallback: 'crow',
};

const celebratedBadgeTiers = new Map<string, number>();

const PixelFarmMasterBadge: React.FC<{ unlocked: boolean }> = ({ unlocked }) => (
  <svg
    width={44}
    height={44}
    viewBox="0 0 20 20"
    shapeRendering="crispEdges"
    className="shrink-0 select-none"
    aria-hidden="true"
  >
    {/* Top pixel ribbon */}
    <rect x="6" y="1" width="3" height="3" fill={unlocked ? '#dc2626' : '#78716c'} />
    <rect x="11" y="1" width="3" height="3" fill={unlocked ? '#b91c1c' : '#57534e'} />
    <rect x="8" y="2" width="4" height="2" fill={unlocked ? '#f59e0b' : '#a8a29e'} />

    {/* Outer octagonal pixel medal rim */}
    <rect x="5" y="4" width="10" height="2" fill={unlocked ? '#b45309' : '#57534e'} />
    <rect x="3" y="6" width="14" height="8" fill={unlocked ? '#d97706' : '#78716c'} />
    <rect x="5" y="14" width="10" height="3" fill={unlocked ? '#92400e' : '#44403c'} />
    <rect x="7" y="17" width="6" height="2" fill={unlocked ? '#78350f' : '#292524'} />

    {/* Bright inner gold face */}
    <rect x="5" y="6" width="10" height="8" fill={unlocked ? '#fde047' : '#a8a29e'} />
    <rect x="6" y="5" width="8" height="1" fill={unlocked ? '#fef08a' : '#d6d3d1'} />
    <rect x="6" y="14" width="8" height="1" fill={unlocked ? '#f59e0b' : '#78716c'} />

    {/* Left & right pixel wheat leaves */}
    <rect x="4" y="8" width="1" height="4" fill={unlocked ? '#22c55e' : '#57534e'} />
    <rect x="15" y="8" width="1" height="4" fill={unlocked ? '#22c55e' : '#57534e'} />

    {/* Center Stardew Star / Sprout Gem */}
    <rect x="9" y="6" width="2" height="2" fill={unlocked ? '#ffffff' : '#d6d3d1'} />
    <rect x="7" y="8" width="6" height="2" fill={unlocked ? '#f97316' : '#78716c'} />
    <rect x="8" y="10" width="4" height="2" fill={unlocked ? '#ea580c' : '#57534e'} />
    <rect x="7" y="12" width="2" height="2" fill={unlocked ? '#f59e0b' : '#57534e'} />
    <rect x="11" y="12" width="2" height="2" fill={unlocked ? '#f59e0b' : '#57534e'} />
    <rect x="9" y="8" width="2" height="2" fill={unlocked ? '#fef9c3' : '#a8a29e'} />
  </svg>
);

const SEASON_FILTERS: Array<{
  key: 'all' | '春季' | '夏季' | '秋季' | '冬季' | '傳奇四季';
  label: string;
}> = [
  { key: 'all', label: '🌿 全部四季 (16種)' },
  { key: '春季', label: '🌸 春季作物' },
  { key: '夏季', label: '☀️ 夏季作物' },
  { key: '秋季', label: '🍁 秋季作物' },
  { key: '冬季', label: '❄️ 冬季珍果' },
  { key: '傳奇四季', label: '✨ 傳奇四季' },
];

export const StudentFarmDetailModal: React.FC<StudentFarmDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
  onSwitchToRoom,
}) => {
  const [activeTab, setActiveTab] = useState<'farm' | 'expansion' | 'almanac' | 'plants'>('farm');
  const [clickedAnimalNote, setClickedAnimalNote] = useState<string | null>(null);
  const [clickedPlantNote, setClickedPlantNote] = useState<string | null>(null);
  const [plantSeasonFilter, setPlantSeasonFilter] = useState<
    'all' | '春季' | '夏季' | '秋季' | '冬季' | '傳奇四季'
  >('all');
  const [previewMinPoints, setPreviewMinPoints] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [justUnlockedBadge, setJustUnlockedBadge] = useState<boolean>(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const farmTier = getFarmTier(student.points);
  const cropInfo = getCropGrowth(student.points);
  const isWithered = student.points < 0;
  const maxGoal = 1250;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  // 50-point multiple achievement badge ("農場達人") calculations
  const badgeTier = student.points >= 50 ? Math.floor(student.points / 50) : 0;
  const isExactMultipleOf50 = student.points >= 50 && student.points % 50 === 0;
  const nextBadgeMilestone = (badgeTier + 1) * 50;
  const pointsTowardNextBadge = student.points >= 0 ? student.points % 50 : 0;
  const badgeCyclePercent = isExactMultipleOf50
    ? 100
    : Math.min(100, Math.round((pointsTowardNextBadge / 50) * 100));

  const prevBadgeRef = useRef<{ studentId: string; tier: number }>({
    studentId: student.id,
    tier: badgeTier,
  });

  // Play special achievement unlock sound & celebratory upgrade popup on modal mount (if exact 50-pt multiple not yet celebrated)
  useEffect(() => {
    setCelebrationMilestone(null);
    if (isExactMultipleOf50 && celebratedBadgeTiers.get(student.id) !== badgeTier) {
      celebratedBadgeTiers.set(student.id, badgeTier);
      setJustUnlockedBadge(true);
      const sfxTimer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        setCelebrationMilestone(badgeTier * 50);
      }, 260);
      const animTimer = setTimeout(() => {
        setJustUnlockedBadge(false);
      }, 3600);
      return () => {
        clearTimeout(sfxTimer);
        clearTimeout(animTimer);
      };
    }
  }, [student.id]);

  // Play special achievement unlock sound, burst particles & show "恭喜升級！" popup when crossing a 50-point multiple live
  useEffect(() => {
    const prev = prevBadgeRef.current;
    if (prev.studentId !== student.id) {
      prevBadgeRef.current = { studentId: student.id, tier: badgeTier };
      return;
    }

    if (badgeTier > prev.tier && badgeTier >= 1) {
      celebratedBadgeTiers.set(student.id, badgeTier);
      setJustUnlockedBadge(true);
      const targetMilestone = badgeTier * 50;
      const sfxTimer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        setCelebrationMilestone(targetMilestone);
      }, 1360);
      const animTimer = setTimeout(() => {
        setJustUnlockedBadge(false);
      }, 4200);
      prevBadgeRef.current = { studentId: student.id, tier: badgeTier };
      return () => {
        clearTimeout(sfxTimer);
        clearTimeout(animTimer);
      };
    }

    if (badgeTier < prev.tier) {
      if (badgeTier === 0) {
        celebratedBadgeTiers.delete(student.id);
      } else {
        celebratedBadgeTiers.set(student.id, badgeTier);
      }
    }
    prevBadgeRef.current = { studentId: student.id, tier: badgeTier };
  }, [student.id, student.points, badgeTier]);

  // Filter animals and plants unlocked by student's current score
  const unlockedAnimals = isWithered
    ? []
    : LIVE_FARM_ANIMALS_ROSTER.filter((a) => a.unlockScore <= student.points);
  const unlockedPlants = isWithered
    ? []
    : LIVE_FARM_PLANTS_ROSTER.filter((p) => p.unlockScore <= student.points);

  const activeAnimalBlueprints = isWithered
    ? [WITHERED_CROW_BLUEPRINT]
    : unlockedAnimals.length > 0
    ? unlockedAnimals
    : [LIVE_FARM_ANIMALS_ROSTER[0]];

  const defaultArtwork = getStudentFarmArtwork(student.points);
  const previewMilestone: FarmArtworkTier | undefined =
    previewMinPoints !== null && !isWithered && student.points >= previewMinPoints
      ? FARM_BACKGROUND_MILESTONES.find((m) => m.minPoints === previewMinPoints)
      : undefined;
  const farmArtwork = previewMilestone || defaultArtwork;

  // Reset manual preview if student score drops below previewed threshold or student changes
  useEffect(() => {
    if (previewMinPoints !== null && student.points < previewMinPoints) {
      setPreviewMinPoints(null);
    }
  }, [student.id, student.points, previewMinPoints]);

  // Initialize wandering animals on the open lower green pasture (y: 60%..87%)
  const [animals, setAnimals] = useState<WanderingAnimal[]>(() => {
    return activeAnimalBlueprints.map((bp, i) => {
      const startX = 10 + ((i * 13) % 78);
      const startY = 60 + ((i * 11) % 26);
      return {
        id: bp.id,
        name: bp.name,
        subtitle: bp.subtitle,
        quote: bp.quote,
        url: bp.url,
        sprite: bp.spriteFallback,
        x: startX,
        y: startY,
        targetX: startX,
        targetY: startY,
        direction: (i % 2 === 0 ? 1 : -1) as 1 | -1,
        isWalking: false,
        pauseTimer: Math.floor(Math.random() * 12) + 4,
        bobOffset: 0,
        heartActive: false,
      };
    });
  });

  // Re-sync animals if student points change
  useEffect(() => {
    setAnimals((prev) => {
      return activeAnimalBlueprints.map((bp, i) => {
        const existing = prev.find((p) => p.id === bp.id);
        if (existing) return existing;
        const startX = 10 + ((i * 13) % 78);
        const startY = 60 + ((i * 11) % 26);
        return {
          id: bp.id,
          name: bp.name,
          subtitle: bp.subtitle,
          quote: bp.quote,
          url: bp.url,
          sprite: bp.spriteFallback,
          x: startX,
          y: startY,
          targetX: startX,
          targetY: startY,
          direction: (i % 2 === 0 ? 1 : -1) as 1 | -1,
          isWalking: false,
          pauseTimer: Math.floor(Math.random() * 10) + 3,
          bobOffset: 0,
          heartActive: false,
        };
      });
    });
  }, [student.points, isWithered, activeAnimalBlueprints.length]);

  // Gentle animal walking tick simulation across the wide grass pasture
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals((prev) =>
        prev.map((anim) => {
          let { x, y, targetX, targetY, direction, isWalking, pauseTimer, bobOffset, heartActive } =
            anim;

          if (isWalking) {
            const dx = targetX - x;
            const dy = targetY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.8) {
              isWalking = false;
              pauseTimer = Math.floor(Math.random() * 16) + 6;
              bobOffset = 0;
            } else {
              const speed = 0.42;
              const stepX = (dx / dist) * speed;
              const stepY = (dy / dist) * speed;
              x += stepX;
              y += stepY;
              direction = dx >= 0 ? 1 : -1;
              bobOffset = (bobOffset + 1.2) % 4 === 0 ? -2 : 0;
            }
          } else {
            if (pauseTimer > 0) {
              pauseTimer -= 1;
            } else {
              targetX = Math.floor(Math.random() * 82) + 8;
              targetY = Math.floor(Math.random() * 27) + 60;
              isWalking = true;
            }
          }

          return {
            ...anim,
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

  const handleAnimalClick = (anim: WanderingAnimal) => {
    soundManager.playCorrect();
    setClickedAnimalNote(
      isWithered
        ? `🐦‍⬛ 【田間烏鴉】：嘎嘎…目前為負分陰雨期，小雞與動物夥伴都先躲起來了，趕快加分回到 0 分以上吧！`
        : `💖 【${anim.name.split(' ')[0]}】歡快地叫喚了一聲：「${anim.quote}」`
    );

    setAnimals((prev) => prev.map((a) => (a.id === anim.id ? { ...a, heartActive: true } : a)));

    setTimeout(() => {
      setAnimals((prev) => prev.map((a) => (a.id === anim.id ? { ...a, heartActive: false } : a)));
    }, 1400);

    setTimeout(() => {
      setClickedAnimalNote((curr) => (curr?.includes(anim.name.split(' ')[0]) ? null : curr));
    }, 3200);
  };

  const handlePlantCardClick = (plant: LiveFarmPlantBlueprint, isUnlocked: boolean) => {
    if (isUnlocked) {
      soundManager.playCollect();
      setClickedPlantNote(
        `🌿 【${plant.name.split(' ')[0]}】（${plant.season} · ${plant.growthDays}）：${plant.quote}`
      );
    } else {
      soundManager.playTick();
      const needed = plant.unlockScore - student.points;
      setClickedPlantNote(
        `🔒 【${plant.name.split(' ')[0]}】將於 ${plant.unlockScore} 分解鎖，目前還差 ${needed} 分！`
      );
    }
    setTimeout(() => setClickedPlantNote(null), 3400);
  };

  const handleTroughClick = () => {
    soundManager.playCollect();
    setClickedAnimalNote(
      `💦 【${farmTier.expansion.waterTroughName}】：水質清澈甘冽，動物們暢飲後神采奕奕！`
    );
    setTimeout(() => setClickedAnimalNote(null), 3000);
  };

  const handleFenceClick = () => {
    soundManager.playTick();
    setClickedAnimalNote(
      `🛡️ 【${farmTier.expansion.fenceName}】：堅固美觀的擴建護欄，讓整個牧區整齊安全！`
    );
    setTimeout(() => setClickedAnimalNote(null), 3000);
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

  const filteredPlantsRoster =
    plantSeasonFilter === 'all'
      ? LIVE_FARM_PLANTS_ROSTER
      : LIVE_FARM_PLANTS_ROSTER.filter((p) => p.season === plantSeasonFilter);

  const unlockedBackgroundCount = isWithered
    ? 0
    : FARM_BACKGROUND_MILESTONES.filter((m) => m.minPoints >= 50 && student.points >= m.minPoints)
        .length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalContainerRef}
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
                  🌾 【{student.name}】的專屬星露谷農場
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{farmTier.tierName}</span>
                <span className={isWithered ? 'text-rose-300' : 'text-[#86efac]'}>
                  {isWithered
                    ? '· 🌧️ 陰雨荒蕪中（烏鴉巡田），加油賺取正分就能重見晴空與小動物！'
                    : `· 已解鎖 ${unlockedBackgroundCount}/25 張五十分解鎖背景 · ${unlockedPlants.length}/16 種植物`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSwitchToRoom && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToRoom(student);
                }}
                className="bg-[#b45309] hover:bg-[#92400e] text-white border border-[#fbbf24] px-2.5 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的室內溫馨房間"
              >
                <Home className="w-3.5 h-3.5" />
                <span>溫馨房間</span>
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

        {/* 1250分 Score HUD Progress Bar & 4 Tab Switchers */}
        <div className="bg-[#4a2e13] px-4 py-2 text-[#ffebb3] border-b-2 border-[#2b1807] flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-pixel text-xs text-[#ffd700]">
              <span aria-hidden="true">🪙</span>
              <span className="tabular-nums">目前莊園積分：{student.points} 分 / 1250 分</span>
              {student.points >= 1250 ? (
                <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black">
                  💎 1250分宇宙巔峰傳奇！25大豪華背景、15種動物與16種植物全解鎖！
                </span>
              ) : isWithered ? (
                <span className="text-[11px] text-rose-300 font-bold">
                  (🌧️ 負分待修復 · 還差 {Math.abs(student.points)} 分重返晴朗初建牧區)
                </span>
              ) : (
                <span className="text-[11px] text-[#fed7aa] font-bold">
                  (動物 {unlockedAnimals.length}/15 · 植物 {unlockedPlants.length}/16 · 背景 {unlockedBackgroundCount}/25)
                </span>
              )}
            </div>

            {/* Progress bar to 1250分 */}
            <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-sm">
              <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ${
                    student.points >= 1250
                      ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse'
                      : 'bg-gradient-to-r from-lime-400 to-emerald-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-pixel text-[11px] text-[#fed7aa] whitespace-nowrap tabular-nums">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* 4 Navigation Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('farm');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'farm'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🏡 實景農場
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('expansion');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'expansion'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🖼️ 背景與擴建 (50~1250分)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('almanac');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'almanac'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              📖 動物圖鑑 ({unlockedAnimals.length}/15)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('plants');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'plants'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🌿 植物圖鑑 ({unlockedPlants.length}/16)
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING COZY STARDEW VALLEY FARM CANVAS */}
          {activeTab === 'farm' && (
            <div className="space-y-3">
              {/* Farm Expansion Status Banner */}
              <div
                className={`border-2 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs ${
                  isWithered
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-[#fef9c3] border-[#ca8a04]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{isWithered ? '🌧️' : farmArtwork.icon}</span>
                  <div>
                    <span
                      className={`font-pixel text-[11px] font-bold block ${
                        isWithered ? 'text-rose-900' : 'text-[#854d0e]'
                      }`}
                    >
                      【目前農場背景】{farmArtwork.showcaseLabel}
                      {previewMilestone && (
                        <span className="ml-2 text-emerald-700 font-black">
                          (正在預覽已解鎖的 {previewMilestone.minPoints} 分背景)
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isWithered ? 'text-rose-800' : 'text-[#713f12]'
                      }`}
                    >
                      圍欄：{farmTier.expansion.fenceName} ｜ 水槽：{farmTier.expansion.waterTroughName}
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
                      回到目前最高階背景
                    </button>
                  )}
                  {isWithered ? (
                    <span className="text-[11px] font-pixel text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded border border-rose-400">
                      還需 {Math.abs(student.points)} 分恢復綠意農舍
                    </span>
                  ) : farmTier.expansion.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#854d0e] bg-amber-200/80 px-2 py-0.5 rounded border border-[#ca8a04]">
                      距 {farmTier.expansion.nextPoints} 分新背景尚需: {farmTier.expansion.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      💎 已解鎖全部 25 種滿級豪華背景！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('expansion');
                    }}
                    className={`text-xs font-bold underline cursor-pointer ${
                      isWithered
                        ? 'text-rose-800 hover:text-rose-950'
                        : 'text-[#854d0e] hover:text-[#451a03]'
                    }`}
                  >
                    查看全部背景 (50~1250) →
                  </button>
                </div>
              </div>

              {/* Dynamic Achievement Badge Display Area ("成就徽章" · 50分倍數解鎖發光「農場達人」) */}
              <div
                className={`border-2 px-3.5 py-2.5 rounded-xl flex flex-wrap items-center justify-between gap-3 transition-all duration-300 ${
                  badgeTier >= 1
                    ? justUnlockedBadge
                      ? 'bg-gradient-to-r from-[#fef9c3] via-[#fef08a] to-[#fde68a] border-[#d97706] shadow-lg ring-2 ring-[#facc15]'
                      : 'bg-gradient-to-r from-[#fffbeb] via-[#fef9c3] to-[#fef3c7] border-[#ca8a04] shadow-sm'
                    : 'bg-[#ede0c2]/85 border-[#c4a675]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (badgeTier >= 1) {
                        soundManager.playAchievementUnlock();
                        setJustUnlockedBadge(true);
                        setTimeout(() => setJustUnlockedBadge(false), 1800);
                      } else {
                        soundManager.playTick();
                      }
                    }}
                    title={
                      badgeTier >= 1
                        ? '點擊重溫「農場達人」成就獲得音效！'
                        : '總分達 50 分倍數即可點亮徽章'
                    }
                    className={`relative p-1.5 shrink-0 cursor-pointer transition-transform active:scale-95 ${
                      badgeTier >= 1
                        ? `pixel-badge-master-frame ${justUnlockedBadge ? 'animate-pixel-badge-unlock' : ''}`
                        : 'border-2 border-[#a8a29e] bg-[#e7e5e4]/80 opacity-75'
                    }`}
                  >
                    <PixelFarmMasterBadge unlocked={badgeTier >= 1} />
                    {badgeTier >= 1 && (
                      <>
                        <span
                          aria-hidden="true"
                          className="absolute -top-2 -left-1.5 text-[11px] text-amber-500 animate-pixel-sparkle pointer-events-none"
                        >
                          ✦
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1.5 -right-1.5 text-[11px] text-yellow-500 animate-pixel-sparkle pointer-events-none"
                          style={{ animationDelay: '0.6s' }}
                        >
                          ✦
                        </span>
                      </>
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-pixel text-[11px] font-bold text-[#5a3818]">
                        🏅 成就徽章
                      </span>
                      {badgeTier >= 1 ? (
                        <>
                          <span className="font-pixel text-[11px] px-2 py-0.5 bg-[#5a3818] text-[#fde047] border border-[#b45309] shadow-xs">
                            ✨ 農場達人 Lv.{badgeTier}
                          </span>
                          {isExactMultipleOf50 && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500 text-white shadow-xs animate-pulse">
                              🎉 達成 {student.points} 分滿格里程碑！
                            </span>
                          )}
                          {justUnlockedBadge && (
                            <span className="text-[11px] font-black text-[#b45309]">
                              🎊 新徽章解鎖！
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="font-pixel text-[10px] px-2 py-0.5 bg-stone-300/80 text-stone-700 border border-stone-400">
                          🔒 農場達人（未解鎖）
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold mt-1 text-[#78350f]">
                      {isWithered ? (
                        <span className="text-rose-800">
                          🌧️ 負分期間徽章暫時休眠中，回到 0 分以上並達到 50 分倍數即可點亮「農場達人」徽章！
                        </span>
                      ) : badgeTier >= 1 ? (
                        <span>
                          已於 <strong className="text-[#92400e]">{badgeTier * 50} 分</strong> 解鎖發光像素「農場達人」徽章（點擊左側徽章可重溫獲得音效）
                        </span>
                      ) : (
                        <span>
                          總分達到 <strong className="text-[#92400e]">50 分倍數</strong>（50、100、150...）即點亮發光像素「農場達人」徽章，目前還差{' '}
                          <strong className="text-[#b45309]">{50 - student.points} 分</strong>！
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Mini 50-point cycle progress indicator */}
                {!isWithered && (
                  <div className="flex flex-col items-end gap-1 shrink-0 min-w-[140px]">
                    <div className="flex items-center justify-between w-full text-[10px] font-pixel font-bold text-[#78350f] gap-2">
                      <span>{badgeTier >= 1 ? `下一階 ${nextBadgeMilestone} 分` : '解鎖進度 50 分'}</span>
                      <span className="tabular-nums">
                        {isExactMultipleOf50 ? '50/50' : `${pointsTowardNextBadge}/50`}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#3b1f0b] border border-[#8b5a2b] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          badgeTier >= 1
                            ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500'
                            : 'bg-gradient-to-r from-lime-400 to-emerald-500'
                        }`}
                        style={{ width: `${badgeCyclePercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Animal & Decor Interaction Dialogue Notice */}
              {clickedAnimalNote && (
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] px-4 py-2.5 rounded-xl text-center text-xs font-bold text-[#78350f] shadow-md animate-bounce flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>{clickedAnimalNote}</span>
                </div>
              )}

              {/* AUTHENTIC 16-BIT PIXEL ART STARDEW VALLEY FARM STAGE */}
              <div
                className={`relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none ${
                  isWithered ? 'bg-[#2c2826]' : 'bg-[#2b4d1e]'
                }`}
                style={{
                  height: isFullscreen ? '78vh' : '540px',
                }}
              >
                {/* 1. Full 16-bit Pixel Art Homestead Scene */}
                <img
                  src={farmArtwork.bgUrl}
                  alt={`${student.name} 的星露谷專屬農場`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Subtle top gradient only for HUD legibility */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

                {/* 2. Top-Left Clean Interactive Facility Controls (Fence & Water Trough) */}
                <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={handleFenceClick}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#ffebb3] border border-[#a16207] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                      title={`點擊查看圍欄設施：${farmTier.expansion.fenceName}`}
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-300" />
                      <span className="truncate max-w-[150px] sm:max-w-none">
                        {farmTier.expansion.fenceName.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleTroughClick}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#bae6fd] border border-[#0284c7] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                      title={`點擊查看水槽噴泉：${farmTier.expansion.waterTroughName}`}
                    >
                      <Droplets className="w-3.5 h-3.5 text-sky-300" />
                      <span className="truncate max-w-[150px] sm:max-w-none">
                        {farmTier.expansion.waterTroughName.split(' ')[0]}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg bg-[#2b1807]/85 border text-[11px] font-bold shadow-md backdrop-blur-xs ${
                      isWithered
                        ? 'text-rose-200 border-rose-500/80'
                        : 'text-[#fde047] border-[#8b5a2b]'
                    }`}
                  >
                    {farmArtwork.icon} {farmArtwork.showcaseLabel} · {cropInfo.label}
                  </div>
                </div>

                {/* 3. Unlocked Stardew Crops & Harvest Shelf + Direct Link to Plant Encyclopedia */}
                <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 bg-[#2b1807]/85 border-2 border-[#8b5a2b] px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-xs max-w-[92%] overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#fed7aa] mr-1 hidden sm:inline shrink-0">
                    {isWithered ? '田間狀態:' : '代表植物:'}
                  </span>
                  {farmArtwork.unlockedCrops.map((crop, idx) => (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedAnimalNote(
                          isWithered
                            ? `🐦‍⬛ 【田間烏鴉】：目前積分為負分，作物暫時枯萎了，趕快加分回到 0 分以上讓嫩芽重生吧！`
                            : `🌾 【${crop.label}】在農場陽光與微風中閃閃發亮！收成品質滿分！`
                        );
                        setTimeout(() => setClickedAnimalNote(null), 2800);
                      }}
                      className="p-0.5 rounded-lg hover:bg-white/15 hover:scale-125 transition-transform cursor-pointer shrink-0"
                      style={
                        isWithered
                          ? undefined
                          : {
                              animation: `plantWindSway ${2.6 + (idx % 3) * 0.4}s ease-in-out infinite`,
                              animationDelay: `${-(idx * 0.4)}s`,
                            }
                      }
                      title={`${crop.label}（點擊查看）`}
                    >
                      <div className={isWithered && crop.id === 'sdv_crow' ? 'animate-crow-hop-flap' : ''}>
                        <AvatarRenderer avatar={crop.id} name={crop.label} size={28} bare={true} />
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('plants');
                    }}
                    className="ml-1 px-2 py-1 rounded-lg bg-[#4c8c38] hover:bg-[#3f752e] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 border border-[#86efac]/50"
                  >
                    <Sprout className="w-3 h-3" />
                    <span>植物圖鑑 ({unlockedPlants.length}/16)</span>
                  </button>
                </div>

                {/* 4. Free-Roaming Authentic Stardew Farm Animals on the Pasture */}
                <div className="absolute inset-0 pointer-events-auto z-20 overflow-hidden">
                  {animals.map((anim) => (
                    <div
                      key={anim.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnimalClick(anim);
                      }}
                      className="absolute cursor-pointer transition-transform duration-150 group select-none flex flex-col items-center"
                      style={{
                        left: `${anim.x}%`,
                        top: `${anim.y}%`,
                        transform: `translate(-50%, -50%) translateY(${anim.bobOffset}px)`,
                      }}
                      title={`${anim.name} · ${anim.subtitle} (點擊互動)`}
                    >
                      {anim.heartActive && (
                        <div className="absolute -top-8 text-rose-500 animate-bounce text-xl filter drop-shadow">
                          {isWithered ? '💧' : '❤️'}
                        </div>
                      )}

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 font-pixel text-[9px] bg-[#2b1807]/95 text-[#ffebb3] px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none flex flex-col items-center border border-[#8b5a2b] z-40">
                        <span className="font-bold text-[#ffd700]">{anim.name.split(' ')[0]}</span>
                        <span className="text-[8px] text-[#fed7aa]">
                          {isWithered ? '淋雨等待放晴中' : anim.subtitle}
                        </span>
                      </div>

                      <div
                        className={`transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-md select-none ${
                          isWithered ? 'brightness-90 saturate-75' : ''
                        }`}
                        style={{
                          transform: `scaleX(${anim.direction})`,
                        }}
                      >
                        <div className={isWithered || anim.id === 'sdv_crow' ? 'animate-crow-hop-flap' : ''}>
                          <AvatarRenderer avatar={anim.id} name={anim.name} size={54} bare={true} />
                        </div>
                      </div>

                      <div
                        className={`w-9 h-2 bg-black/30 rounded-full blur-[1px] -mt-1.5 pointer-events-none ${
                          isWithered || anim.id === 'sdv_crow' ? 'animate-crow-shadow' : ''
                        }`}
                      />
                    </div>
                  ))}

                  {/* 1250分 Celebration Banner */}
                  {student.points >= 1250 ? (
                    <div className="absolute bottom-3 right-3 bg-[#2b1807]/90 border-2 border-[#fbbf24] px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#fde047]" />
                      <span className="font-pixel text-[11px] text-[#fde047] font-bold">
                        💎 1250分永恆宇宙神殿 · 25大豪華背景全制霸！
                      </span>
                    </div>
                  ) : student.points >= 1000 && (
                    <div className="absolute bottom-3 right-3 bg-[#2b1807]/90 border-2 border-[#fbbf24] px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#fde047]" />
                      <span className="font-pixel text-[11px] text-[#fde047] font-bold">
                        👑 突破 1000 分傳奇！向 1250 分宇宙殿堂邁進！
                      </span>
                    </div>
                  )}
                </div>

                {/* Ambient stage weather */}
                {isWithered ? (
                  <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
                    {Array.from({ length: 18 }).map((_, idx) => (
                      <div
                        key={`farm-rain-${idx}`}
                        className="absolute w-[1.5px] h-5 bg-gradient-to-b from-transparent via-slate-300/60 to-sky-200/70 animate-pixel-rain"
                        style={{
                          left: `${(idx * 5.7 + 2) % 98}%`,
                          top: '-24px',
                          animationDuration: `${0.85 + (idx % 3) * 0.15}s`,
                          animationDelay: `${(idx * 0.17) % 1.2}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute top-1/4 left-1/5 text-xs text-white/75 animate-ping">
                      🌸
                    </div>
                    <div
                      className="absolute top-1/3 right-1/4 text-xs text-yellow-100/75 animate-ping"
                      style={{ animationDelay: '1.2s' }}
                    >
                      ✨
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 50-POINT MILESTONE BACKGROUNDS & EXPANSION ROADMAP (0, 50, 100, ..., 1250) */}
          {activeTab === 'expansion' && (
            <div className="space-y-4">
              <div className="bg-[#ede0c2] p-3.5 rounded-xl border border-[#c4a675] text-xs text-stone-700 flex items-start gap-2.5">
                <ImageIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#4a2800] block text-sm">
                    🖼️ 每湊夠 50 分解鎖一張專屬農莊背景（50 → 1250 分共 25 種獨特豪華背景）
                  </span>
                  <p className="mt-0.5 text-xs text-[#5a3818]">
                    從 0 分起步的原木小屋開始，每累積滿 50 分（50、100、150 … 1000 … 直至超豪華 1250 分宇宙神殿）就會解鎖全新 16-bit 農莊風景與擴建設施！點擊任一「已解鎖」卡片即可切換至實景預覽。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {FARM_BACKGROUND_MILESTONES.map((milestone) => {
                  const isUnlocked = !isWithered && student.points >= milestone.minPoints;
                  const isCurrentHighest =
                    !isWithered && defaultArtwork.minPoints === milestone.minPoints;
                  const isPreviewing = farmArtwork.minPoints === milestone.minPoints;
                  const expTier = getFarmTier(milestone.minPoints);

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
                      {/* 16:9 Farm Background Preview */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#2b1807]">
                        <img
                          src={milestone.bgUrl}
                          alt={`${milestone.minPoints}分 ${milestone.showcaseLabel}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${
                            isUnlocked ? '' : 'grayscale-[55%] brightness-75 blur-[1px]'
                          }`}
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="font-pixel text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#2b1807]/90 text-[#fde047] border border-[#a16207]">
                            {milestone.minPoints === 0
                              ? '0 分起點'
                              : `${milestone.minPoints} 分背景`}
                          </span>

                          {isCurrentHighest ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-[#4a2800] shadow">
                              ✨ 目前所屬階級
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
                          <div>
                            <h4 className="font-bold text-sm drop-shadow">
                              {milestone.icon} {milestone.showcaseLabel}
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
                                setActiveTab('farm');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer shadow ${
                                isPreviewing
                                  ? 'bg-amber-400 text-[#4a2800]'
                                  : 'bg-white/95 hover:bg-white text-[#4a2800]'
                              }`}
                            >
                              {isPreviewing ? '預覽中 ✓' : '切回實景觀看'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Facility Details Footer */}
                      <div className="p-2.5 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#5a3818]">
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#854d0e]">🛡️ 圍欄：</span>
                          {expTier.expansion.fenceName}
                        </div>
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#0284c7]">💧 水源：</span>
                          {expTier.expansion.waterTroughName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 15 Farm Animals Almanac */}
          {activeTab === 'almanac' && (
            <div className="space-y-4">
              <div className="bg-[#ede0c2] p-3 rounded-xl border border-[#c4a675] text-xs text-stone-700">
                <span className="font-bold text-[#4a2800]">🐾 星露谷 15 種農場動物圖鑑與解鎖體系：</span>
                學生每獲得積分突破門檻，相應的農場動物就會入住其個人牧場自由漫步！達 1000
                分即可達成滿級極致傳奇，15 種動物全員到齊！
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {LIVE_FARM_ANIMALS_ROSTER.map((animal) => {
                  const isUnlocked = !isWithered && student.points >= animal.unlockScore;
                  return (
                    <div
                      key={animal.id}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#10b981] shadow-sm'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-75'
                      }`}
                    >
                      <div className="p-1 rounded-xl bg-white border border-[#c4a675] shrink-0 shadow-xs relative">
                        <AvatarRenderer avatar={animal.id} name={animal.name} size={48} />
                        {isUnlocked ? (
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="absolute -top-1 -right-1 bg-stone-400 text-white rounded-full p-0.5 shadow">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#3d240d] truncate">
                            {animal.name.split(' ')[0]}
                          </span>
                          <span
                            className={`text-[10px] font-pixel px-1.5 py-0.5 rounded font-bold ${
                              isUnlocked
                                ? 'bg-[#dcfce7] text-[#15803d]'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {animal.unlockScore} 分
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-amber-800 block truncate">
                          {animal.subtitle}
                        </span>
                        <p className="text-[10px] text-stone-500 truncate mt-0.5">{animal.quote}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: 16 Farm Plants & Crops Encyclopedia (植物圖鑑) */}
          {activeTab === 'plants' && (
            <div className="space-y-4">
              <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#81c784] text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-[#1b5e20] block text-sm">
                    🌿 星露谷 16 種農場植物圖鑑（0 ~ 1000 分四季培育收集）
                  </span>
                  <span className="text-xs text-[#2e7d32]">
                    隨著莊園積分累積，從春天的防風草、草莓到冬日水晶果與傳說星之果實將陸續收入植物圖鑑！點擊植物卡片可聆聽培育秘訣。
                  </span>
                </div>
                <span className="font-pixel text-xs font-bold bg-white text-[#1b5e20] px-3 py-1 rounded-lg border border-[#81c784] shrink-0 tabular-nums">
                  已收集 {unlockedPlants.length} / {LIVE_FARM_PLANTS_ROSTER.length} 種植物
                </span>
              </div>

              {/* Season Filter Controls */}
              <div className="flex items-center gap-1.5 flex-wrap bg-white/75 p-2 rounded-xl border border-[#c4a675]">
                {SEASON_FILTERS.map((sf) => (
                  <button
                    key={sf.key}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setPlantSeasonFilter(sf.key);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      plantSeasonFilter === sf.key
                        ? 'bg-[#4c8c38] text-white shadow-xs'
                        : 'bg-[#f5e6c8] text-[#5a3818] hover:bg-[#ecd4a7]'
                    }`}
                  >
                    {sf.label}
                  </button>
                ))}
              </div>

              {clickedPlantNote && (
                <div className="bg-[#ecfdf5] border-2 border-[#10b981] px-4 py-2 rounded-xl text-xs font-bold text-[#065f46] shadow-sm flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{clickedPlantNote}</span>
                </div>
              )}

              {/* 16 Plants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredPlantsRoster.map((plant) => {
                  const isUnlocked = !isWithered && student.points >= plant.unlockScore;
                  return (
                    <button
                      key={plant.id}
                      type="button"
                      onClick={() => handlePlantCardClick(plant, isUnlocked)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all text-left cursor-pointer hover:shadow-md ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#22c55e] shadow-sm hover:-translate-y-0.5'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-75'
                      }`}
                    >
                      <div className="p-1 rounded-xl bg-white border border-[#c4a675] shrink-0 shadow-xs relative">
                        <AvatarRenderer avatar={plant.id} name={plant.name} size={48} />
                        {isUnlocked ? (
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="absolute -top-1 -right-1 bg-stone-400 text-white rounded-full p-0.5 shadow">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-xs text-[#3d240d] truncate">
                            {plant.name.split(' ')[0]}
                          </span>
                          <span
                            className={`text-[10px] font-pixel px-1.5 py-0.5 rounded font-bold shrink-0 ${
                              isUnlocked
                                ? 'bg-[#dcfce7] text-[#15803d]'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {plant.unlockScore} 分
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 mt-0.5 truncate">
                          <span>{plant.season}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 truncate">{plant.growthDays}</span>
                        </div>
                        <p className="text-[10px] text-stone-600 line-clamp-2 mt-0.5 leading-snug">
                          {plant.quote}
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
            🌾 每滿 50 分解鎖新農場背景 (50~1250分) · 動物與植物圖鑑同步收錄於上方分頁
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
          const unlockedArt = getStudentFarmArtwork(celebrationMilestone);
          return (
            <UpgradeCelebrationOverlay
              isOpen={true}
              mode="farm"
              studentName={student.name}
              milestonePoints={celebrationMilestone}
              unlockedTitle={unlockedArt.showcaseLabel}
              unlockedSubtitle={unlockedArt.description}
              unlockedIcon={unlockedArt.icon}
              unlockedImageUrl={unlockedArt.bgUrl}
              onClose={() => setCelebrationMilestone(null)}
            />
          );
        })()}
      </div>
    </div>
  );
};
