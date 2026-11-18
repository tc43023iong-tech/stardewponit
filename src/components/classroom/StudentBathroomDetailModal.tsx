import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import {
  getStudentBathroomArtwork,
  getStudentBathwareTier,
  BATHROOM_BACKGROUND_MILESTONES,
  LIVE_BATHROOM_SPA_ROSTER,
  BathroomArtworkTier,
  BathroomSpaItem,
} from '../../utils/bathroomArtwork';
import { soundManager } from '../../utils/sound';
import { UpgradeCelebrationOverlay } from './UpgradeCelebrationOverlay';
import { PixelBathwareUpgradeFX } from './PixelBathwareDisplay';
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
  Bath,
  Image as ImageIcon,
  Sprout,
  Home,
  ChefHat,
  BookOpen,
} from 'lucide-react';

interface StudentBathroomDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onSwitchToFarm?: (student: Student) => void;
  onSwitchToRoom?: (student: Student) => void;
  onSwitchToKitchen?: (student: Student) => void;
}

interface BathCompanion {
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

const BATH_COMPANION_QUOTES = [
  '洗完澡香噴噴、泡泡綿綿的，整個人充滿正能量！',
  '勤洗手、保持整潔好習慣，積分很快就會衝向下一階啦！',
  '好期待下一個 50 分解鎖的新豪華溫泉浴室與高級浴具！✨',
  '熱呼呼的蒸氣配上花香浴鹽，這裡根本是星露谷最棒的療癒基地～',
];

const celebratedBathroomUpgradeTiers = new Map<string, number>();

export const StudentBathroomDetailModal: React.FC<StudentBathroomDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
  onSwitchToFarm,
  onSwitchToRoom,
  onSwitchToKitchen,
}) => {
  const [activeTab, setActiveTab] = useState<'bathroom' | 'roadmap' | 'spa'>('bathroom');
  const [spaFilter, setSpaFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedSpaItem, setSelectedSpaItem] = useState<BathroomSpaItem | null>(null);
  const [clickedNote, setClickedNote] = useState<string | null>(null);
  const [previewMinPoints, setPreviewMinPoints] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [bathwareFxActive, setBathwareFxActive] = useState<boolean>(false);
  const [bathwareFxPoints, setBathwareFxPoints] = useState<number>(0);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isFoggy = student.points < 0;
  const maxGoal = 1250;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  const bathroomTier = student.points >= 50 ? Math.floor(student.points / 50) : 0;
  const isExactMultipleOf50 = student.points >= 50 && student.points % 50 === 0;
  const prevBathTierRef = useRef<{ studentId: string; tier: number }>({
    studentId: student.id,
    tier: bathroomTier,
  });

  const bathwareTier = getStudentBathwareTier(student.points);

  const triggerBathwareAnimation = (pts: number) => {
    setBathwareFxPoints(pts);
    setBathwareFxActive(false);
    requestAnimationFrame(() => {
      setBathwareFxActive(true);
    });
  };

  useEffect(() => {
    if (!bathwareFxActive) return;
    const t = setTimeout(() => setBathwareFxActive(false), 3800);
    return () => clearTimeout(t);
  }, [bathwareFxActive]);

  // Trigger bathroom & bathware upgrade celebration on mount if at an uncelebrated multiple of 50
  useEffect(() => {
    setCelebrationMilestone(null);
    setSelectedSpaItem(null);
    if (isExactMultipleOf50 && celebratedBathroomUpgradeTiers.get(student.id) !== bathroomTier) {
      celebratedBathroomUpgradeTiers.set(student.id, bathroomTier);
      const milestonePts = bathroomTier * 50;
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerBathwareAnimation(milestonePts);
        setCelebrationMilestone(milestonePts);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [student.id]);

  // Trigger bathroom & bathware upgrade animation + celebration modal when crossing a 50-point multiple live
  useEffect(() => {
    const prev = prevBathTierRef.current;
    if (prev.studentId !== student.id) {
      prevBathTierRef.current = { studentId: student.id, tier: bathroomTier };
      return;
    }

    if (bathroomTier > prev.tier && bathroomTier >= 1) {
      celebratedBathroomUpgradeTiers.set(student.id, bathroomTier);
      const targetMilestone = bathroomTier * 50;
      prevBathTierRef.current = { studentId: student.id, tier: bathroomTier };
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        triggerBathwareAnimation(targetMilestone);
        setCelebrationMilestone(targetMilestone);
      }, 1360);
      return () => clearTimeout(timer);
    }

    if (bathroomTier < prev.tier) {
      if (bathroomTier === 0) {
        celebratedBathroomUpgradeTiers.delete(student.id);
      } else {
        celebratedBathroomUpgradeTiers.set(student.id, bathroomTier);
      }
    }
    prevBathTierRef.current = { studentId: student.id, tier: bathroomTier };
  }, [student.id, student.points, bathroomTier]);

  const defaultArtwork = getStudentBathroomArtwork(student.points);
  const previewMilestone: BathroomArtworkTier | undefined =
    previewMinPoints !== null && !isFoggy && student.points >= previewMinPoints
      ? BATHROOM_BACKGROUND_MILESTONES.find((m) => m.minPoints === previewMinPoints)
      : undefined;
  const bathroomArtwork = previewMilestone || defaultArtwork;

  useEffect(() => {
    if (previewMinPoints !== null && student.points < previewMinPoints) {
      setPreviewMinPoints(null);
    }
  }, [student.id, student.points, previewMinPoints]);

  const unlockedBathroomsCount = isFoggy
    ? 0
    : BATHROOM_BACKGROUND_MILESTONES.filter((m) => m.minPoints >= 50 && student.points >= m.minPoints).length;

  const unlockedSpaItems = isFoggy
    ? []
    : LIVE_BATHROOM_SPA_ROSTER.filter((item) => item.unlockScore <= student.points);

  const filteredSpaItems = LIVE_BATHROOM_SPA_ROSTER.filter((item) => {
    const isUnlocked = !isFoggy && student.points >= item.unlockScore;
    if (spaFilter === 'unlocked') return isUnlocked;
    if (spaFilter === 'locked') return !isUnlocked;
    return true;
  });

  const companionAvatarId = student.stardewAvatar || student.avatar || 'sdv_duck';

  const buildBathCompanions = (): BathCompanion[] => {
    if (isFoggy) {
      return [
        {
          id: 'sdv_crow',
          name: '霧氣小烏鴉',
          quote: '嘎嘎…浴室積滿水霧了，趕快加分回到 0 分以上就能一起打掃得亮晶晶！',
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

    const list: BathCompanion[] = [
      {
        id: companionAvatarId,
        name: `${student.name} 的沐浴夥伴`,
        quote: BATH_COMPANION_QUOTES[student.points % BATH_COMPANION_QUOTES.length],
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
        id: 'sdv_duck',
        name: '嘎嘎戲水鴨',
        quote: '呱呱！最喜歡滿滿的泡泡大浴缸，每天洗香香超快樂！🫧',
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
        name: '祝尼魔湯屋管家',
        quote: '我已經把蓬鬆毛巾和香氛浴鹽都準備好囉～✨',
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

  const [companions, setCompanions] = useState<BathCompanion[]>(buildBathCompanions);

  useEffect(() => {
    setCompanions(buildBathCompanions());
  }, [student.id, student.points, isFoggy, companionAvatarId]);

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

  const handleCompanionClick = (comp: BathCompanion) => {
    soundManager.playCorrect();
    setClickedNote(`🫧 【${comp.name}】：「${comp.quote}」`);
    setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: true } : c)));
    setTimeout(() => {
      setCompanions((prev) => prev.map((c) => (c.id === comp.id ? { ...c, heartActive: false } : c)));
    }, 1400);
    setTimeout(() => {
      setClickedNote((curr) => (curr?.includes(comp.name) ? null : curr));
    }, 3200);
  };

  const handleSpaItemPreview = (item: BathroomSpaItem, isUnlocked: boolean) => {
    setSelectedSpaItem(item);
    if (isUnlocked) {
      soundManager.playCollect();
      setClickedNote(`🛁 使用【${bathwareTier.tubName}】搭配「${item.name}」！（${item.aromaEffect}）`);
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
                  🛁 【{student.name}】的專屬星露谷洗手間
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{bathroomArtwork.bathroomScaleLabel} · {bathroomArtwork.bathroomTitle}</span>
                <span className={isFoggy ? 'text-rose-300' : 'text-[#7dd3fc]'}>
                  {isFoggy
                    ? '· 🌫️ 霧氣舊澡間，加分回到 0 分以上即可升級閃亮浴間！'
                    : `· 浴具 ${bathwareTier.tierLabel} · 浴室 ${unlockedBathroomsCount}/25 · 備品 ${unlockedSpaItems.length}/${LIVE_BATHROOM_SPA_ROSTER.length}`}
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
            {onSwitchToKitchen && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchToKitchen(student);
                }}
                className="bg-[#c2410c] hover:bg-[#9a3412] text-white border border-[#fdba74] px-2.5 py-1 text-xs font-pixel font-bold rounded flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                title="切換參觀該同學的專屬夢幻廚房"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>廚房</span>
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
              <span aria-hidden="true">🛁</span>
              <span className="tabular-nums">目前洗手間積分：{student.points} 分 / 1250 分</span>
              {student.points >= 1250 ? (
                <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black">
                  💎 1250分星之果實宇宙聖泉殿！25間洗手間與{LIVE_BATHROOM_SPA_ROSTER.length}種沐浴品全解鎖！
                </span>
              ) : isFoggy ? (
                <span className="text-[11px] text-rose-300 font-bold">
                  (🌫️ 負分霧氣期 · 還差 {Math.abs(student.points)} 分重返明亮原木浴間)
                </span>
              ) : (
                <span className="text-[11px] text-[#bae6fd] font-bold">
                  (每 50 分全面升級擴建 · 備品 {unlockedSpaItems.length}/{LIVE_BATHROOM_SPA_ROSTER.length} · 浴室 {unlockedBathroomsCount}/25)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-sm">
              <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ${
                    student.points >= 1250
                      ? 'bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 animate-pulse'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500'
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
                  setActiveTab('bathroom');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'bathroom'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🛁 實景洗手間
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
                🖼️ 洗手間升級圖鑑 (50~1250分)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('spa');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === 'spa'
                    ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                    : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
                }`}
              >
                🫧 香氛沐浴圖鑑 ({unlockedSpaItems.length}/{LIVE_BATHROOM_SPA_ROSTER.length})
              </button>
            </div>

            {!isFoggy && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playAchievementUnlock();
                  triggerBathwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#0369a1] hover:bg-[#0284c7] text-[#e0f2fe] border border-[#7dd3fc]/60 flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                title="點擊觀看「浴缸放大、花灑進階」像素浴具進化特效"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                <span>預覽浴具升級特效</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING PIXEL BATHROOM INTERIOR */}
          {activeTab === 'bathroom' && (
            <div className="space-y-3">
              {/* Bathroom Status Banner */}
              <div
                className={`border-2 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs ${
                  isFoggy
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-[#e0f2fe] border-[#0284c7]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{bathroomArtwork.icon}</span>
                  <div>
                    <span
                      className={`font-pixel text-[11px] font-bold block ${
                        isFoggy ? 'text-rose-900' : 'text-[#0c4a6e]'
                      }`}
                    >
                      【目前洗手間等級】{bathroomArtwork.bathroomTitle}（{bathroomArtwork.bathroomScaleLabel}）
                      {previewMilestone && (
                        <span className="ml-2 text-emerald-700 font-black">
                          (正在預覽已解鎖的 {previewMilestone.minPoints} 分浴室)
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isFoggy ? 'text-rose-800' : 'text-[#0369a1]'
                      }`}
                    >
                      浴具配置：{bathwareTier.tubName} ＋ {bathwareTier.showerName}
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
                      回到目前最高階浴室
                    </button>
                  )}
                  {isFoggy ? (
                    <span className="text-[11px] font-pixel text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded border border-rose-400">
                      還需 {Math.abs(student.points)} 分重返明亮潔淨浴室
                    </span>
                  ) : defaultArtwork.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#0c4a6e] bg-sky-200/80 px-2 py-0.5 rounded border border-[#0284c7]">
                      距 {defaultArtwork.nextPoints} 分浴間升級尚需: {defaultArtwork.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      💎 已解鎖全部 25 間滿級夢幻洗手間！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('roadmap');
                    }}
                    className={`text-xs font-bold underline cursor-pointer ${
                      isFoggy
                        ? 'text-rose-800 hover:text-rose-950'
                        : 'text-[#0369a1] hover:text-[#0c4a6e]'
                    }`}
                  >
                    查看全部浴室 (50~1250) →
                  </button>
                </div>
              </div>

              {/* Interactive Interaction Note */}
              {clickedNote && (
                <div className="bg-[#e0f2fe] border-2 border-[#0284c7] px-4 py-2.5 rounded-xl text-center text-xs font-bold text-[#0c4a6e] shadow-md animate-bounce flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              {/* AUTHENTIC 16-BIT PIXEL ART BATHROOM INTERIOR STAGE */}
              <div
                className={`relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none ${
                  isFoggy ? 'bg-[#1c1917]' : 'bg-[#0f172a]'
                }`}
                style={{
                  height: isFullscreen ? '70vh' : '500px',
                }}
              >
                <img
                  src={bathroomArtwork.bgUrl}
                  alt={`${student.name} 的星露谷洗手間`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Top gradient for legible HUD */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

                {/* Top Interactive Bath Facility & Aroma Buttons */}
                <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`🛁 【${bathroomArtwork.tubFacility}】：${bathroomArtwork.description}`);
                        setTimeout(() => setClickedNote(null), 3200);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#0c4a6e]/85 hover:bg-[#0369a1] text-[#e0f2fe] border border-[#38bdf8] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Bath className="w-3.5 h-3.5 text-cyan-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {bathroomArtwork.tubFacility.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick();
                        setClickedNote(`🫧 【專屬香氣：${bathroomArtwork.signatureAroma}】：整間洗手間都飄散著舒服宜人的味道！`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#0c4a6e]/85 hover:bg-[#0369a1] text-[#bae6fd] border border-[#38bdf8] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 text-sky-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {bathroomArtwork.signatureAroma}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg bg-[#0f172a]/85 border text-[11px] font-bold shadow-md backdrop-blur-xs ${
                      isFoggy
                        ? 'text-rose-200 border-rose-500/80'
                        : 'text-[#7dd3fc] border-[#0284c7]'
                    }`}
                  >
                    {bathroomArtwork.icon} {bathroomArtwork.bathroomTitle}
                  </div>
                </div>

                {/* Live Pixel Bathware Evolution Dock (Bathtub Grow + Showerhead Tier-Up FX) */}
                <div className="absolute bottom-14 right-3 z-25 max-w-[92%] sm:max-w-sm pointer-events-auto">
                  <PixelBathwareUpgradeFX
                    isActive={bathwareFxActive}
                    milestonePoints={bathwareFxPoints || Math.max(50, Math.floor(student.points / 50) * 50)}
                    tier={bathwareTier}
                    onReplay={
                      !isFoggy
                        ? () => {
                            soundManager.playAchievementUnlock();
                            triggerBathwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                          }
                        : undefined
                    }
                  />
                </div>

                {/* Bottom Bathroom Features Shelf */}
                <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 bg-[#0f172a]/85 border-2 border-[#0284c7] px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-xs max-w-[92%] overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#bae6fd] mr-1 hidden sm:inline shrink-0">
                    浴室亮點:
                  </span>
                  {bathroomArtwork.unlockedBathFeatures.map((feat) => (
                    <button
                      key={feat.label}
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`${feat.emoji} 【${feat.label}】：${feat.quote}`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-[#0c4a6e]/90 hover:bg-[#0369a1] text-[#e0f2fe] border border-[#38bdf8]/60 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-transform hover:scale-105"
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
                      setActiveTab('spa');
                    }}
                    className="ml-1 px-2 py-1 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 border border-[#7dd3fc]/60"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>沐浴圖鑑 ({unlockedSpaItems.length}/{LIVE_BATHROOM_SPA_ROSTER.length})</span>
                  </button>
                </div>

                {/* Free-Roaming Bath Companion(s) */}
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
                        <div className="absolute -top-8 text-sky-400 animate-bounce text-xl filter drop-shadow">
                          {isFoggy ? '💧' : '🫧'}
                        </div>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 font-pixel text-[9px] bg-[#0c4a6e]/95 text-[#e0f2fe] px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-[#38bdf8] z-40">
                        {comp.name}
                      </div>
                      <div
                        className={`transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-md select-none ${
                          isFoggy ? 'brightness-90 saturate-75' : ''
                        }`}
                        style={{ transform: `scaleX(${comp.direction})` }}
                      >
                        <div className={isFoggy ? 'animate-crow-hop-flap' : 'animate-pet-breathe'}>
                          <AvatarRenderer avatar={comp.id} name={comp.name} size={50} bare={true} />
                        </div>
                      </div>
                      <div className="w-8 h-1.5 bg-black/35 rounded-full blur-[1px] -mt-1 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Ambient water & steam sparkle */}
                {!isFoggy && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute top-1/4 left-1/4 text-xs text-cyan-200/75 animate-ping">
                      🫧
                    </div>
                    <div
                      className="absolute top-1/3 right-1/4 text-xs text-sky-200/75 animate-ping"
                      style={{ animationDelay: '1.1s' }}
                    >
                      ✨
                    </div>
                  </div>
                )}
              </div>

              {/* UNLOCKED PIXEL SPA ESSENTIALS SHELF IN MAIN BATHROOM VIEW */}
              <div className="bg-[#fdf6e2] border-2 border-[#a3794b] rounded-xl p-3 shadow-sm space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#0284c7]" />
                    <h4 className="font-pixel text-xs font-bold text-[#4a2800]">
                      已解鎖像素香氛沐浴備品陳列架（點擊體驗泡澡香氣！）
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#0c4a6e] bg-[#e0f2fe] px-2 py-0.5 rounded border border-[#7dd3fc]">
                      已解鎖 {unlockedSpaItems.length} / {LIVE_BATHROOM_SPA_ROSTER.length} 種備品
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setActiveTab('spa');
                      }}
                      className="text-[11px] font-bold text-[#0369a1] hover:text-[#0c4a6e] underline cursor-pointer"
                    >
                      打開完整沐浴圖鑑 →
                    </button>
                  </div>
                </div>

                {isFoggy ? (
                  <div className="bg-rose-50 border border-rose-300 rounded-lg px-3 py-2 text-xs font-bold text-rose-800">
                    🌫️ 負分霧氣期暫時收起沐浴香氛架，回到 0 分以上就會立即亮麗登場！
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {LIVE_BATHROOM_SPA_ROSTER.map((item) => {
                      const isUnlocked = student.points >= item.unlockScore;
                      const isSelected = selectedSpaItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSpaItemPreview(item, isUnlocked)}
                          className={`relative shrink-0 p-1.5 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e0f2fe] border-[#0284c7] ring-2 ring-[#38bdf8] -translate-y-0.5 shadow-md'
                              : isUnlocked
                              ? 'bg-white border-[#38bdf8]/60 hover:border-[#0284c7] hover:-translate-y-0.5 shadow-xs'
                              : 'bg-[#ede0c2]/65 border-[#c4a675] opacity-55 grayscale-[70%]'
                          }`}
                          title={
                            isUnlocked
                              ? `${item.name} — 點擊體驗香氛效果`
                              : `🔒 需達 ${item.unlockScore} 分解鎖 ${item.name}`
                          }
                        >
                          <AvatarRenderer avatar={item.url} name={item.name} size={38} bare />
                          <span className="text-[9px] font-pixel font-bold text-[#0c4a6e] max-w-[60px] truncate">
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

                {/* Selected Spa Item Detail Inspector */}
                {selectedSpaItem && (
                  <div className="bg-[#f0f9ff] border-2 border-[#0284c7] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 bg-white rounded-xl border-2 border-[#38bdf8] shadow-xs shrink-0">
                        <AvatarRenderer
                          avatar={selectedSpaItem.url}
                          name={selectedSpaItem.name}
                          size={46}
                          bare
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#0c4a6e]">
                            {selectedSpaItem.name}
                          </span>
                          <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]">
                            {selectedSpaItem.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {selectedSpaItem.aromaEffect}
                          </span>
                        </div>
                        <p className="text-xs text-[#075985] font-bold mt-1">
                          使用方法：{selectedSpaItem.usageTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 50-POINT BATHROOM UPGRADE ROADMAP (0 to 1250) */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-[#e0f2fe] p-3.5 rounded-xl border border-[#38bdf8] text-xs text-[#0c4a6e] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <ImageIcon className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0c4a6e] block text-sm">
                      🛁 每湊夠 50 分全面升級擴建專屬洗手間與浴具（50 → 1250 分共 25 種主題夢幻湯屋）
                    </span>
                    <p className="mt-0.5 text-xs text-[#075985]">
                      每跨越 50 分就會觸發「浴缸放大、花灑進階」像素浴具進化特效，並解鎖全新星露谷浴場裝潢！點擊已解鎖洗手間即可立即參觀。
                    </p>
                  </div>
                </div>
                {!isFoggy && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playAchievementUnlock();
                      setActiveTab('bathroom');
                      triggerBathwareAnimation(Math.max(50, Math.floor(student.points / 50) * 50));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-pixel font-bold flex items-center gap-1.5 cursor-pointer shadow active:scale-95 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                    <span>回浴室看浴具進化特效</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {BATHROOM_BACKGROUND_MILESTONES.map((milestone) => {
                  const isUnlocked = !isFoggy && student.points >= milestone.minPoints;
                  const isCurrentHighest =
                    !isFoggy && defaultArtwork.minPoints === milestone.minPoints;
                  const isPreviewing = bathroomArtwork.minPoints === milestone.minPoints;
                  const milestoneWareTier = getStudentBathwareTier(milestone.minPoints);

                  return (
                    <div
                      key={milestone.minPoints}
                      className={`rounded-xl border-2 overflow-hidden transition-all flex flex-col ${
                        isCurrentHighest
                          ? 'bg-[#e0f2fe] border-[#0284c7] shadow-md ring-2 ring-[#38bdf8]'
                          : isUnlocked
                          ? 'bg-[#fdfbf7] border-[#4ade80] shadow-xs'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-80'
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f172a]">
                        <img
                          src={milestone.bgUrl}
                          alt={`${milestone.minPoints}分 ${milestone.bathroomTitle}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${
                            isUnlocked ? '' : 'grayscale-[55%] brightness-75 blur-[1px]'
                          }`}
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                          <span className="font-pixel text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#0c4a6e]/90 text-[#bae6fd] border border-[#38bdf8]">
                            {milestone.minPoints === 0
                              ? '0 分起點浴間'
                              : `${milestone.minPoints} 分浴室 (${milestoneWareTier.tierLabel})`}
                          </span>

                          {isCurrentHighest ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-400 text-[#082f49] shadow">
                              ✨ 目前所屬洗手間
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
                              {milestone.icon} {milestone.bathroomTitle}
                            </h4>
                            <p className="text-[11px] text-sky-100/95 line-clamp-1">
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
                                setActiveTab('bathroom');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer shadow ${
                                isPreviewing
                                  ? 'bg-sky-400 text-[#082f49]'
                                  : 'bg-white/95 hover:bg-white text-[#0c4a6e]'
                              }`}
                            >
                              {isPreviewing ? '預覽中 ✓' : '進去看看'}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-2.5 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#5a3818]">
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#0284c7]">🛁 浴具：</span>
                          {milestoneWareTier.tubName}
                        </div>
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#0369a1]">🫧 香氣：</span>
                          {milestone.signatureAroma}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 20 STARDEW BATH & SPA ITEMS ENCYCLOPEDIA */}
          {activeTab === 'spa' && (
            <div className="space-y-4">
              <div className="bg-[#f0f9ff] p-3.5 rounded-xl border border-[#38bdf8] text-xs text-[#0c4a6e] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-[#0c4a6e] block text-sm">
                    🫧 星露谷香氛沐浴圖鑑系統（0 ~ 1250 分逐步解鎖 {LIVE_BATHROOM_SPA_ROSTER.length} 種像素備品）
                  </span>
                  <span className="text-xs text-[#075985]">
                    累積積分即可獲得星露谷特色香皂、花瓣浴鹽與珍奇澡盆收藏！點擊已解鎖項目還能使用【{bathwareTier.tubName}】體驗泡澡！
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: `全部 (${LIVE_BATHROOM_SPA_ROSTER.length})` },
                    { id: 'unlocked', label: `已解鎖 (${unlockedSpaItems.length})` },
                    {
                      id: 'locked',
                      label: `待解鎖 (${LIVE_BATHROOM_SPA_ROSTER.length - unlockedSpaItems.length})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSpaFilter(tab.id as 'all' | 'unlocked' | 'locked');
                      }}
                      className={`px-2.5 py-1 rounded-lg font-pixel text-[10px] font-bold border cursor-pointer transition-colors ${
                        spaFilter === tab.id
                          ? 'bg-[#0284c7] text-white border-[#0c4a6e] shadow-xs'
                          : 'bg-white text-[#0c4a6e] border-[#38bdf8] hover:bg-[#e0f2fe]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {clickedNote && (
                <div className="bg-[#e0f2fe] border-2 border-[#0284c7] px-4 py-2 rounded-xl text-xs font-bold text-[#0c4a6e] shadow-sm flex items-center gap-2">
                  <Bath className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredSpaItems.map((item) => {
                  const isUnlocked = !isFoggy && student.points >= item.unlockScore;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSpaItemPreview(item, isUnlocked)}
                      className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition-all text-left cursor-pointer hover:shadow-md ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#38bdf8] shadow-sm hover:-translate-y-0.5'
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
                                ? 'bg-[#e0f2fe] text-[#0369a1] border border-[#38bdf8]/40'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {item.unlockScore} 分解鎖
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e0f2fe] text-[#075985]">
                            🫧 {item.category}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            ✨ {item.aromaEffect}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-700 mt-1.5 leading-snug">
                          {item.usageTip}
                        </p>
                        <p className="text-[11px] text-[#0369a1] font-bold italic mt-1">
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
            🛁 每滿 50 分觸發專屬洗手間與浴具升級特效 · 累積積分自動解鎖 {LIVE_BATHROOM_SPA_ROSTER.length} 種香氛沐浴備品
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
          const unlockedBathArt = getStudentBathroomArtwork(celebrationMilestone);
          const unlockedWare = getStudentBathwareTier(celebrationMilestone);
          return (
            <UpgradeCelebrationOverlay
              isOpen={true}
              mode="bathroom"
              studentName={student.name}
              milestonePoints={celebrationMilestone}
              unlockedTitle={`${unlockedBathArt.bathroomTitle} · ${unlockedWare.tubName}`}
              unlockedSubtitle={`浴具全面升級！升級為「${unlockedWare.tubName}」與「${unlockedWare.showerName}」，整間浴室散發「${unlockedBathArt.signatureAroma}」的幸福氣息！`}
              unlockedIcon={unlockedBathArt.icon}
              unlockedImageUrl={unlockedBathArt.bgUrl}
              onClose={() => {
                setCelebrationMilestone(null);
                triggerBathwareAnimation(celebrationMilestone);
              }}
            />
          );
        })()}
      </div>
    </div>
  );
};
