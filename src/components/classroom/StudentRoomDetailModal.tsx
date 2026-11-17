import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import {
  getStudentRoomArtwork,
  ROOM_BACKGROUND_MILESTONES,
  LIVE_ROOM_FURNITURE_ROSTER,
  RoomArtworkTier,
  RoomFurnitureBlueprint,
} from '../../utils/roomArtwork';
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
  Lamp,
  Sofa,
  Home,
  Image as ImageIcon,
  Sprout,
} from 'lucide-react';

interface StudentRoomDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
  onSwitchToFarm?: (student: Student) => void;
}

interface IndoorCompanion {
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

const INDOOR_PET_QUOTES = [
  '這個新房間好舒服喔～可以在地毯上打滾了！',
  '窗外的風景超漂亮的，今天也要繼續賺分數！',
  '好期待下一個 50 分解鎖的新豪華房間！✨',
  '房間裡暖呼呼的，最喜歡在這裡看書休息了～',
];

const celebratedRoomUpgradeTiers = new Map<string, number>();

export const StudentRoomDetailModal: React.FC<StudentRoomDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
  onSwitchToFarm,
}) => {
  const [activeTab, setActiveTab] = useState<'room' | 'roadmap' | 'furniture'>('room');
  const [clickedNote, setClickedNote] = useState<string | null>(null);
  const [previewMinPoints, setPreviewMinPoints] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isDusty = student.points < 0;
  const maxGoal = 1250;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  const roomTier = student.points >= 50 ? Math.floor(student.points / 50) : 0;
  const isExactMultipleOf50 = student.points >= 50 && student.points % 50 === 0;
  const prevRoomTierRef = useRef<{ studentId: string; tier: number }>({
    studentId: student.id,
    tier: roomTier,
  });

  // Trigger room upgrade celebration + particle burst on modal mount if at an uncelebrated multiple of 50
  useEffect(() => {
    setCelebrationMilestone(null);
    if (isExactMultipleOf50 && celebratedRoomUpgradeTiers.get(student.id) !== roomTier) {
      celebratedRoomUpgradeTiers.set(student.id, roomTier);
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        setCelebrationMilestone(roomTier * 50);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [student.id]);

  // Trigger room upgrade celebration + particle burst when crossing a 50-point multiple live
  useEffect(() => {
    const prev = prevRoomTierRef.current;
    if (prev.studentId !== student.id) {
      prevRoomTierRef.current = { studentId: student.id, tier: roomTier };
      return;
    }

    if (roomTier > prev.tier && roomTier >= 1) {
      celebratedRoomUpgradeTiers.set(student.id, roomTier);
      const targetMilestone = roomTier * 50;
      prevRoomTierRef.current = { studentId: student.id, tier: roomTier };
      const timer = setTimeout(() => {
        soundManager.playAchievementUnlock();
        setCelebrationMilestone(targetMilestone);
      }, 1360);
      return () => clearTimeout(timer);
    }

    if (roomTier < prev.tier) {
      if (roomTier === 0) {
        celebratedRoomUpgradeTiers.delete(student.id);
      } else {
        celebratedRoomUpgradeTiers.set(student.id, roomTier);
      }
    }
    prevRoomTierRef.current = { studentId: student.id, tier: roomTier };
  }, [student.id, student.points, roomTier]);

  const defaultArtwork = getStudentRoomArtwork(student.points);
  const previewMilestone: RoomArtworkTier | undefined =
    previewMinPoints !== null && !isDusty && student.points >= previewMinPoints
      ? ROOM_BACKGROUND_MILESTONES.find((m) => m.minPoints === previewMinPoints)
      : undefined;
  const roomArtwork = previewMilestone || defaultArtwork;

  useEffect(() => {
    if (previewMinPoints !== null && student.points < previewMinPoints) {
      setPreviewMinPoints(null);
    }
  }, [student.id, student.points, previewMinPoints]);

  const unlockedRoomsCount = isDusty
    ? 0
    : ROOM_BACKGROUND_MILESTONES.filter((m) => m.minPoints >= 50 && student.points >= m.minPoints).length;

  const unlockedFurniture = isDusty
    ? []
    : LIVE_ROOM_FURNITURE_ROSTER.filter((f) => f.unlockScore <= student.points);

  // Indoor companion(s): student's selected Stardew companion + extra cute housemate at higher milestones
  const companionAvatarId = student.stardewAvatar || student.avatar || 'sdv_white_chicken';

  const buildIndoorCompanions = (): IndoorCompanion[] => {
    if (isDusty) {
      return [
        {
          id: 'sdv_crow',
          name: '閣樓烏鴉',
          quote: '嘎嘎…外面在下雨，趕快加分回到 0 分以上就能搬進明亮新房間！',
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

    const list: IndoorCompanion[] = [
      {
        id: companionAvatarId,
        name: `${student.name} 的夥伴`,
        quote: INDOOR_PET_QUOTES[student.points % INDOOR_PET_QUOTES.length],
        x: 38,
        y: 74,
        targetX: 38,
        targetY: 74,
        direction: 1,
        isWalking: false,
        pauseTimer: 6,
        bobOffset: 0,
      },
    ];

    if (student.points >= 200) {
      list.push({
        id: 'junimo',
        name: '祝尼魔小精靈',
        quote: '哇～房間越變越大了！我最喜歡幫忙整理書架和花瓶！🍎',
        x: 62,
        y: 76,
        targetX: 62,
        targetY: 76,
        direction: -1,
        isWalking: false,
        pauseTimer: 9,
        bobOffset: 0,
      });
    }

    if (student.points >= 600) {
      list.push({
        id: 'sdv_blue_chicken',
        name: '幸運藍雞管家',
        quote: '咕咕～這麼高級的裝潢住起來真是太幸福啦！💎',
        x: 76,
        y: 72,
        targetX: 76,
        targetY: 72,
        direction: -1,
        isWalking: false,
        pauseTimer: 11,
        bobOffset: 0,
      });
    }

    return list;
  };

  const [companions, setCompanions] = useState<IndoorCompanion[]>(buildIndoorCompanions);

  useEffect(() => {
    setCompanions(buildIndoorCompanions());
  }, [student.id, student.points, isDusty, companionAvatarId]);

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
              targetX = Math.floor(Math.random() * 72) + 14;
              targetY = Math.floor(Math.random() * 18) + 66;
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

  const handleCompanionClick = (comp: IndoorCompanion) => {
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

  const handleFurnitureBadgeClick = (item: RoomFurnitureBlueprint, isUnlocked: boolean) => {
    if (isUnlocked) {
      soundManager.playCollect();
      setClickedNote(`🛋️ 【${item.name}】（${item.style}）：${item.quote}`);
    } else {
      soundManager.playTick();
      const needed = item.unlockScore - student.points;
      setClickedNote(`🔒 【${item.name}】將於 ${item.unlockScore} 分解鎖，目前還差 ${needed} 分！`);
    }
    setTimeout(() => setClickedNote(null), 3200);
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
                  🏠 【{student.name}】的專屬星露谷房間
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{roomArtwork.roomScaleLabel} · {roomArtwork.roomTitle}</span>
                <span className={isDusty ? 'text-rose-300' : 'text-[#86efac]'}>
                  {isDusty
                    ? '· 🕸️ 雨夜小閣樓，加分回到 0 分以上即可搬入原木小屋！'
                    : `· 已解鎖 ${unlockedRoomsCount}/25 間 50 分升級房間 · ${unlockedFurniture.length}/16 件家具`}
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
                <span>戶外農場</span>
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
              <span aria-hidden="true">🏡</span>
              <span className="tabular-nums">目前小屋積分：{student.points} 分 / 1250 分</span>
              {student.points >= 1250 ? (
                <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black">
                  💎 1250分宇宙星辰神殿！25間豪華房間與16件夢幻家具全解鎖！
                </span>
              ) : isDusty ? (
                <span className="text-[11px] text-rose-300 font-bold">
                  (🕸️ 負分待整理 · 還差 {Math.abs(student.points)} 分搬回晴朗原木新房)
                </span>
              ) : (
                <span className="text-[11px] text-[#fed7aa] font-bold">
                  (每 50 分升級房間 · 家具 {unlockedFurniture.length}/16 · 房間 {unlockedRoomsCount}/25)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-sm">
              <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
                <div
                  className={`h-full transition-all duration-700 ${
                    student.points >= 1250
                      ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse'
                      : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-pixel text-[11px] text-[#fed7aa] whitespace-nowrap tabular-nums">
                {progressPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('room');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'room'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🏠 實景房間
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
              🖼️ 房間升級圖鑑 (50~1250分)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('furniture');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'furniture'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🛋️ 夢幻家具圖鑑 ({unlockedFurniture.length}/16)
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING PIXEL ROOM INTERIOR */}
          {activeTab === 'room' && (
            <div className="space-y-3">
              {/* Room Status Banner */}
              <div
                className={`border-2 px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs ${
                  isDusty
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-[#fef9c3] border-[#ca8a04]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{roomArtwork.icon}</span>
                  <div>
                    <span
                      className={`font-pixel text-[11px] font-bold block ${
                        isDusty ? 'text-rose-900' : 'text-[#854d0e]'
                      }`}
                    >
                      【目前房間裝潢】{roomArtwork.roomTitle}（{roomArtwork.roomScaleLabel}）
                      {previewMilestone && (
                        <span className="ml-2 text-emerald-700 font-black">
                          (正在預覽已解鎖的 {previewMilestone.minPoints} 分房間)
                        </span>
                      )}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isDusty ? 'text-rose-800' : 'text-[#713f12]'
                      }`}
                    >
                      主家具：{roomArtwork.furnitureName} ｜ 採光：{roomArtwork.lightingName}
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
                      回到目前最高階房間
                    </button>
                  )}
                  {isDusty ? (
                    <span className="text-[11px] font-pixel text-rose-800 bg-rose-200/80 px-2 py-0.5 rounded border border-rose-400">
                      還需 {Math.abs(student.points)} 分升級明亮木屋
                    </span>
                  ) : defaultArtwork.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#854d0e] bg-amber-200/80 px-2 py-0.5 rounded border border-[#ca8a04]">
                      距 {defaultArtwork.nextPoints} 分新房間尚需: {defaultArtwork.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      💎 已解鎖全部 25 間滿級夢幻房間！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('roadmap');
                    }}
                    className={`text-xs font-bold underline cursor-pointer ${
                      isDusty
                        ? 'text-rose-800 hover:text-rose-950'
                        : 'text-[#854d0e] hover:text-[#451a03]'
                    }`}
                  >
                    查看全部房間 (50~1250) →
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

              {/* AUTHENTIC 16-BIT PIXEL ART ROOM INTERIOR STAGE */}
              <div
                className={`relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none ${
                  isDusty ? 'bg-[#1c1917]' : 'bg-[#2b1807]'
                }`}
                style={{
                  height: isFullscreen ? '78vh' : '540px',
                }}
              >
                <img
                  src={roomArtwork.bgUrl}
                  alt={`${student.name} 的星露谷房間`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-all duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Top gradient for legible HUD */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

                {/* Top Interactive Furniture & Lighting Pills */}
                <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`🛋️ 【${roomArtwork.furnitureName}】：${roomArtwork.description}`);
                        setTimeout(() => setClickedNote(null), 3200);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#ffebb3] border border-[#a16207] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Sofa className="w-3.5 h-3.5 text-amber-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {roomArtwork.furnitureName.split(' ')[0]}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTick();
                        setClickedNote(`💡 【${roomArtwork.lightingName}】：柔和的光影讓整間屋子充滿溫馨氣息！`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#2b1807]/85 hover:bg-[#3f240b] text-[#fde68a] border border-[#ca8a04] text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs cursor-pointer transition-colors"
                    >
                      <Lamp className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="truncate max-w-[160px] sm:max-w-none">
                        {roomArtwork.lightingName}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg bg-[#2b1807]/85 border text-[11px] font-bold shadow-md backdrop-blur-xs ${
                      isDusty
                        ? 'text-rose-200 border-rose-500/80'
                        : 'text-[#fde047] border-[#8b5a2b]'
                    }`}
                  >
                    {roomArtwork.icon} {roomArtwork.roomTitle}
                  </div>
                </div>

                {/* Bottom Room Decor Shelf + Furniture Encyclopedia Link */}
                <div className="absolute bottom-3 left-3 z-25 flex items-center gap-1.5 bg-[#2b1807]/85 border-2 border-[#8b5a2b] px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-xs max-w-[92%] overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#fed7aa] mr-1 hidden sm:inline shrink-0">
                    房間亮點:
                  </span>
                  {roomArtwork.unlockedDecorItems.map((decor) => (
                    <button
                      key={decor.label}
                      type="button"
                      onClick={() => {
                        soundManager.playCollect();
                        setClickedNote(`${decor.emoji} 【${decor.label}】：${decor.quote}`);
                        setTimeout(() => setClickedNote(null), 3000);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-[#3f240b]/90 hover:bg-[#5a3818] text-[#ffebb3] border border-[#8b5a2b] text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0 transition-transform hover:scale-105"
                      title={decor.quote}
                    >
                      <span>{decor.emoji}</span>
                      <span>{decor.label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('furniture');
                    }}
                    className="ml-1 px-2 py-1 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 border border-[#fbbf24]/50"
                  >
                    <Home className="w-3 h-3" />
                    <span>家具圖鑑 ({unlockedFurniture.length}/16)</span>
                  </button>
                </div>

                {/* Free-Roaming Companion(s) on Room Floor */}
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
                          {isDusty ? '💧' : '❤️'}
                        </div>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 font-pixel text-[9px] bg-[#2b1807]/95 text-[#ffebb3] px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none border border-[#8b5a2b] z-40">
                        {comp.name}
                      </div>
                      <div
                        className={`transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-md select-none ${
                          isDusty ? 'brightness-90 saturate-75' : ''
                        }`}
                        style={{ transform: `scaleX(${comp.direction})` }}
                      >
                        <div className={isDusty ? 'animate-crow-hop-flap' : 'animate-pet-breathe'}>
                          <AvatarRenderer avatar={comp.id} name={comp.name} size={50} bare={true} />
                        </div>
                      </div>
                      <div className="w-8 h-1.5 bg-black/35 rounded-full blur-[1px] -mt-1 pointer-events-none" />
                    </div>
                  ))}

                  {student.points >= 1250 && (
                    <div className="absolute bottom-3 right-3 bg-[#2b1807]/90 border-2 border-[#fbbf24] px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#fde047]" />
                      <span className="font-pixel text-[11px] text-[#fde047] font-bold">
                        💎 1250分永恆宇宙星辰殿 · 25間夢幻房間全制霸！
                      </span>
                    </div>
                  )}
                </div>

                {/* Ambient indoor sparkle/dust */}
                {!isDusty && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    <div className="absolute top-1/4 left-1/4 text-xs text-yellow-100/75 animate-ping">
                      ✨
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
            </div>
          )}

          {/* TAB 2: 50-POINT ROOM UPGRADE ROADMAP (0 to 1250) */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-[#ede0c2] p-3.5 rounded-xl border border-[#c4a675] text-xs text-stone-700 flex items-start gap-2.5">
                <ImageIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#4a2800] block text-sm">
                    🏠 每湊夠 50 分全面翻新升級專屬房間（50 → 1250 分共 25 種漸進豪華房型）
                  </span>
                  <p className="mt-0.5 text-xs text-[#5a3818]">
                    從 0 分的原木起點小木屋出發，每累積 50 分就會擴建裝潢、增添新家具與景觀窗景，直至 1250 分永恆宇宙星辰水晶神殿！點擊任一「已解鎖」房間即可立即進入體驗。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {ROOM_BACKGROUND_MILESTONES.map((milestone) => {
                  const isUnlocked = !isDusty && student.points >= milestone.minPoints;
                  const isCurrentHighest =
                    !isDusty && defaultArtwork.minPoints === milestone.minPoints;
                  const isPreviewing = roomArtwork.minPoints === milestone.minPoints;

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
                          alt={`${milestone.minPoints}分 ${milestone.roomTitle}`}
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
                              ? '0 分起點小屋'
                              : `${milestone.minPoints} 分房型`}
                          </span>

                          {isCurrentHighest ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-[#4a2800] shadow">
                              ✨ 目前所屬房型
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
                              {milestone.icon} {milestone.roomTitle}
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
                                setActiveTab('room');
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
                          <span className="font-bold text-[#854d0e]">🛋️ 家具：</span>
                          {milestone.furnitureName}
                        </div>
                        <div className="bg-white/75 px-2 py-1 rounded border border-stone-200 truncate">
                          <span className="font-bold text-[#b45309]">💡 採光：</span>
                          {milestone.lightingName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 16 DREAM ROOM FURNITURE ROSTER */}
          {activeTab === 'furniture' && (
            <div className="space-y-4">
              <div className="bg-[#fffbeb] p-3 rounded-xl border border-[#f59e0b] text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-[#78350f] block text-sm">
                    🛋️ 星露谷 16 件夢幻房間家具圖鑑（0 ~ 1250 分逐步解鎖收藏）
                  </span>
                  <span className="text-xs text-[#92400e]">
                    隨著房間積分提升，從拼布木床、紅磚壁爐、立式鋼琴到銀河天球儀與水晶鋼琴陸續搬進你的小屋！
                  </span>
                </div>
                <span className="font-pixel text-xs font-bold bg-white text-[#78350f] px-3 py-1 rounded-lg border border-[#f59e0b] shrink-0 tabular-nums">
                  已解鎖 {unlockedFurniture.length} / {LIVE_ROOM_FURNITURE_ROSTER.length} 件家具
                </span>
              </div>

              {clickedNote && (
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] px-4 py-2 rounded-xl text-xs font-bold text-[#78350f] shadow-sm flex items-center gap-2">
                  <Sofa className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{clickedNote}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {LIVE_ROOM_FURNITURE_ROSTER.map((item) => {
                  const isUnlocked = !isDusty && student.points >= item.unlockScore;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleFurnitureBadgeClick(item, isUnlocked)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all text-left cursor-pointer hover:shadow-md ${
                        isUnlocked
                          ? 'bg-[#fdfbf7] border-[#f59e0b] shadow-sm hover:-translate-y-0.5'
                          : 'bg-[#ede0c2]/60 border-[#c4a675] opacity-75'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#c4a675] shrink-0 shadow-xs relative flex items-center justify-center text-2xl">
                        <span>{item.emoji}</span>
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
                            {item.name}
                          </span>
                          <span
                            className={`text-[10px] font-pixel px-1.5 py-0.5 rounded font-bold shrink-0 ${
                              isUnlocked
                                ? 'bg-[#fef3c7] text-[#b45309]'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {item.unlockScore} 分
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-amber-800 block truncate mt-0.5">
                          {item.style}
                        </span>
                        <p className="text-[10px] text-stone-600 line-clamp-2 mt-0.5 leading-snug">
                          {item.quote}
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
            🏠 每滿 50 分解鎖新房型裝潢 (50~1250分) · 家具圖鑑收錄於上方分頁
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
          const unlockedRoomArt = getStudentRoomArtwork(celebrationMilestone);
          return (
            <UpgradeCelebrationOverlay
              isOpen={true}
              mode="room"
              studentName={student.name}
              milestonePoints={celebrationMilestone}
              unlockedTitle={`${unlockedRoomArt.roomTitle}（${unlockedRoomArt.roomScaleLabel}）`}
              unlockedSubtitle={`${unlockedRoomArt.description} 新解鎖：${unlockedRoomArt.furnitureName}！`}
              unlockedIcon={unlockedRoomArt.icon}
              unlockedImageUrl={unlockedRoomArt.bgUrl}
              onClose={() => setCelebrationMilestone(null)}
            />
          );
        })()}
      </div>
    </div>
  );
};
