import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Sparkles,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

// Authentic 16-bit retro pixel art game landscape maps (handcrafted Stardew Valley style tilesets)
import autumnBg from '../../assets/images/paradise_pixel_autumn_1793879484596.jpg';
import springBg from '../../assets/images/paradise_pixel_spring_1793879486507.jpg';
import summerBg from '../../assets/images/paradise_pixel_summer_1793879488062.jpg';
import winterBg from '../../assets/images/paradise_pixel_winter_1793879487326.jpg';

export type ParadiseSeason = 'autumn' | 'spring' | 'summer' | 'winter';
export type ParadiseTimeOfDay = 'day' | 'dawn' | 'sunset' | 'night';

// Roster of authentic Stardew Valley farm animals & companions
const STARDEW_ANIMAL_ROSTER = [
  'sdv_cat',            // 慵懶三花貓
  'sdv_dog',            // 忠實柴犬
  'sdv_duck',           // 綠頭野鴨 (swimmer)
  'sdv_white_chicken',  // 純白小母雞
  'sdv_brown_chicken',  // 棕羽母雞
  'sdv_blue_chicken',   // 夢幻藍雞
  'sdv_golden_chicken', // 極品黃金雞
  'sdv_rabbit_farm',    // 幸運雪兔
  'sdv_turtle',         // 海濱烏龜 (swimmer)
  'sdv_crow',           // 頑皮烏鴉 / 貓頭鷹 (percher)
  'sdv_pig',            // 松露萌豬
  'sdv_white_cow',      // 純潔白牛
  'sdv_brown_cow',      // 黃金棕牛
  'sdv_goat',           // 山羊
  'sdv_sheep',          // 蓬鬆綿羊
  'sdv_dinosaur',       // 史前恐龍
  'sdv_ostrich',        // 草原鴕鳥
  'sdv_horse',          // 忠心駿馬
  'sdv_void_chicken',   // 虛空幽靈雞
  'sdv_butterfly',      // 彩色彩蝶
];

// Determine the student's unique Stardew Valley companion avatar strictly from their roster selection
function resolveStardewCompanion(student: Student, index: number): string {
  // 1. Strictly prioritize the avatar the student selected in the Stardew Valley student roster page!
  if (student.stardewAvatar && student.stardewAvatar.trim() !== '') {
    return student.stardewAvatar;
  }
  if (student.avatar && student.avatar.trim() !== '') {
    return student.avatar;
  }
  // 2. Fallback to roster item default if unassigned
  const defaultItem = STARDEW_AVATARS[index % STARDEW_AVATARS.length]?.id || 'sdv_white_chicken';
  return defaultItem;
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
  facing: 'left' | 'right';
  action: 'idle' | 'walking' | 'swimming' | 'resting' | 'perched' | 'celebrating';
  isAquatic: boolean;
  speechBubble?: string;
  floatingText?: { text: string; isPositive: boolean; key: number };
  growthBonus: number; // visual scale factor based on points
  lastPetTime?: number;
}

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
}

export const PixelParadiseView: React.FC<PixelParadiseViewProps> = ({
  students,
  className,
  onApplyPoints,
  onChangeAvatar,
  onClose,
}) => {
  // Season state: default is 'autumn' as shown in the reference photo
  const [season, setSeason] = useState<ParadiseSeason>('autumn');

  // Time of Day lighting: 'day' (default), 'dawn', 'sunset', 'night'
  const [timeOfDay, setTimeOfDay] = useState<ParadiseTimeOfDay>('day');

  // Name tags visibility toggle
  const [showNameTags, setShowNameTags] = useState<boolean>(true);

  // Zoom and camera pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [focusedCompanionId, setFocusedCompanionId] = useState<string | null>(null);

  // Student finder search query
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Fullscreen container state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Point scoring modal for focused companion
  const [scoringStudent, setScoringStudent] = useState<Student | null>(null);

  // Mute audio in paradise
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(soundManager.isMuted);

  // Determine if a student's companion is aquatic (swimming in lake)
  const checkIsAquatic = (student: Student, stardewAvatar: string, idx: number): boolean => {
    if (student.rollNo === 21) return true;
    if (stardewAvatar === 'sdv_duck' || stardewAvatar === 'sdv_turtle') return true;
    return idx % 9 === 7;
  };

  // Determine initial coordinates exactly matching reference photo (image_0bc01590.png)
  const getInitialCoordinates = (rollNo: number, idx: number, isAquatic: boolean) => {
    // Fixed landmarks matching reference photo students:
    if (rollNo === 13) return { x: 23, y: 28, action: 'perched' as const }; // Owl perched on top-left rock
    if (rollNo === 4) return { x: 27, y: 35, action: 'idle' as const };     // Griffin/bird standing
    if (rollNo === 14) return { x: 34, y: 40, action: 'walking' as const };  // Puppy walking
    if (rollNo === 8) return { x: 15, y: 48, action: 'idle' as const };     // Duckling/chick
    if (rollNo === 16) return { x: 39, y: 26, action: 'walking' as const };  // Cat exploring
    if (rollNo === 22) return { x: 67, y: 14, action: 'idle' as const };     // Top companion near trees
    if (rollNo === 10) return { x: 63, y: 22, action: 'idle' as const };     // Near center trees
    if (rollNo === 9) return { x: 42, y: 64, action: 'resting' as const };   // Shore panda
    if (rollNo === 5) return { x: 40, y: 70, action: 'resting' as const };   // Shore bunny
    if (rollNo === 15) return { x: 52, y: 68, action: 'resting' as const };  // Shore piglet
    if (rollNo === 21) return { x: 74, y: 78, action: 'swimming' as const }; // [21 庭羽] in the lake

    if (isAquatic) {
      // Azure lake area (x: 65% - 92%, y: 72% - 90%)
      return {
        x: 66 + ((idx * 13) % 25),
        y: 72 + ((idx * 11) % 18),
        action: 'swimming' as const,
      };
    }

    // Land meadow zones avoiding obstacles:
    const zones = [
      { minX: 12, maxX: 34, minY: 18, maxY: 55 }, // Left meadow & cobblestones
      { minX: 25, maxX: 44, minY: 28, maxY: 52 }, // Mid-left clearing
      { minX: 65, maxX: 88, minY: 16, maxY: 42 }, // Upper right near log
      { minX: 38, maxX: 56, minY: 60, maxY: 72 }, // Sandy beach shoreline
      { minX: 18, maxX: 38, minY: 68, maxY: 86 }, // Lower left forest path
    ];
    const z = zones[idx % zones.length];
    return {
      x: z.minX + Math.random() * (z.maxX - z.minX),
      y: z.minY + Math.random() * (z.maxY - z.minY),
      action: 'idle' as const,
    };
  };

  // State of all active student companions in the paradise
  const [companions, setCompanions] = useState<CompanionState[]>(() => {
    return students.map((s, idx) => {
      const stardewAvatar = resolveStardewCompanion(s, idx);
      const isAquatic = checkIsAquatic(s, stardewAvatar, idx);
      const init = getInitialCoordinates(s.rollNo, idx, isAquatic);
      const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));

      return {
        id: s.id,
        studentId: s.id,
        name: s.name,
        rollNo: s.rollNo,
        stardewAvatar,
        x: init.x,
        y: init.y,
        targetX: init.x,
        targetY: init.y,
        facing: Math.random() > 0.5 ? 'right' : 'left',
        action: init.action,
        isAquatic,
        growthBonus,
      };
    });
  });

  // Sync companions when students prop changes (e.g. when student's avatar is changed in the Stardew roster)
  useEffect(() => {
    setCompanions((prev) =>
      students.map((s, idx) => {
        const existing = prev.find((p) => p.studentId === s.id);
        const stardewAvatar = resolveStardewCompanion(s, idx);
        const isAquatic = checkIsAquatic(s, stardewAvatar, idx);
        const growthBonus = Math.min(0.55, Math.max(0, s.points * 0.005));

        if (existing) {
          let nextX = existing.x;
          let nextY = existing.y;
          let nextAction = existing.action;

          // If avatar changed to non-aquatic while swimming in deep lake, move to beach
          if (!isAquatic && existing.action === 'swimming') {
            nextX = 42;
            nextY = 64;
            nextAction = 'resting';
          } else if (isAquatic && existing.action !== 'swimming') {
            nextX = 74;
            nextY = 78;
            nextAction = 'swimming';
          }

          return {
            ...existing,
            name: s.name,
            rollNo: s.rollNo,
            stardewAvatar,
            isAquatic,
            x: nextX,
            y: nextY,
            action: nextAction,
            growthBonus,
          };
        }

        const init = getInitialCoordinates(s.rollNo, idx, isAquatic);
        return {
          id: s.id,
          studentId: s.id,
          name: s.name,
          rollNo: s.rollNo,
          stardewAvatar,
          x: init.x,
          y: init.y,
          targetX: init.x,
          targetY: init.y,
          facing: 'right',
          action: init.action,
          isAquatic,
          growthBonus,
        };
      })
    );
  }, [students]);

  // Autonomous wandering & life cycle simulation
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      setCompanions((prev) =>
        prev.map((c) => {
          if (c.action === 'celebrating') return c;

          // 28% chance to pick a new destination and wander
          if (Math.random() < 0.28) {
            let nextX = c.x;
            let nextY = c.y;
            let nextAction: CompanionState['action'] = c.action;

            if (c.isAquatic) {
              // Lake boundaries: x in [62, 92], y in [70, 92]
              nextX = Math.max(62, Math.min(92, c.x + (Math.random() * 10 - 5)));
              nextY = Math.max(70, Math.min(92, c.y + (Math.random() * 8 - 4)));
              nextAction = 'swimming';
            } else {
              // Land boundaries: avoid deep lake (x > 62 && y > 72)
              let deltaX = (Math.random() * 10 - 5);
              let deltaY = (Math.random() * 8 - 4);
              let candX = Math.max(8, Math.min(90, c.x + deltaX));
              let candY = Math.max(14, Math.min(85, c.y + deltaY));

              // If wandering into lake, pause on the sandy shore
              if (candX > 60 && candY > 70) {
                candY = 65;
                nextAction = 'resting';
              } else {
                nextAction = Math.random() < 0.4 ? 'walking' : 'idle';
              }

              nextX = candX;
              nextY = candY;
            }

            const facing = nextX < c.x ? 'left' : 'right';

            return {
              ...c,
              targetX: nextX,
              targetY: nextY,
              facing,
              action: nextAction,
              speechBubble:
                Math.random() < 0.08
                  ? ['🌾', '✨', '🐾', '🌸', '🎵', '💤', '🐟', '🍀', '🍎', '💖'][Math.floor(Math.random() * 10)]
                  : undefined,
            };
          }

          // Smoothly step toward target
          const dx = c.targetX - c.x;
          const dy = c.targetY - c.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 0.4) {
            return {
              ...c,
              x: c.x + (dx / dist) * 0.32,
              y: c.y + (dy / dist) * 0.32,
              action: c.isAquatic ? 'swimming' : 'walking',
            };
          } else {
            return {
              ...c,
              action: c.isAquatic ? 'swimming' : c.action === 'walking' ? 'idle' : c.action,
            };
          }
        })
      );
    }, 450);

    return () => clearInterval(wanderInterval);
  }, []);

  // Center camera when companion is focused
  useEffect(() => {
    if (focusedCompanionId) {
      const comp = companions.find((c) => c.id === focusedCompanionId);
      if (comp) {
        const targetPanX = (50 - comp.x) * 4;
        const targetPanY = (50 - comp.y) * 4;
        setPanOffset({ x: targetPanX, y: targetPanY });
        setZoomLevel(1.8);
      }
    }
  }, [focusedCompanionId, companions]);

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

    // 1. Play crystal ding chime
    soundManager.playDingChime();

    // 2. Apply points to app state
    onApplyPoints(
      [scoringStudent],
      delta,
      reason,
      delta > 0 ? 'Paradise accomplishment' : 'Gentle reminder',
      delta > 0 ? '✨' : '🩹'
    );

    // 3. Trigger creature celebration & growth animation
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

    // Reset celebration after 1.8s
    setTimeout(() => {
      setCompanions((prev) =>
        prev.map((c) =>
          c.studentId === scoringStudent.id
            ? { ...c, action: c.isAquatic ? 'swimming' : 'idle' }
            : c
        )
      );
    }, 1800);

    setScoringStudent(null);
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

  // Reset Zoom
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setFocusedCompanionId(null);
  };

  // Jump camera directly to student companion ("孩子一眼找到自己那隻")
  const handleFindStudent = (studentId: string) => {
    setFocusedCompanionId(studentId);
    const targetStudent = students.find((s) => s.id === studentId);
    if (targetStudent) {
      setScoringStudent(targetStudent);
    }
    setIsSearchOpen(false);
  };

  // Select appropriate 16-bit pixel art map image by season
  const currentSeasonBg = useMemo(() => {
    switch (season) {
      case 'spring':
        return springBg;
      case 'summer':
        return summerBg;
      case 'winter':
        return winterBg;
      case 'autumn':
      default:
        return autumnBg;
    }
  }, [season]);

  const seasonEmoji = useMemo(() => {
    switch (season) {
      case 'spring': return '🌸';
      case 'summer': return '☀️';
      case 'winter': return '❄️';
      case 'autumn':
      default: return '🍂';
    }
  }, [season]);

  // Lighting overlay filter based on timeOfDay
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

  // Filtered students for quick companion finder
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      String(s.rollNo).includes(studentSearch)
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[88vh] min-h-[620px] max-h-[960px] bg-[#1a2d12] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#5A3818] select-none flex flex-col font-sans"
    >
      {/* 1. TOP PARADISE CONTROL BAR (Teacher Tools) */}
      <div className="z-30 bg-[#2b1807]/95 backdrop-blur-md px-4 py-2 border-b-2 border-[#160c04] flex flex-wrap items-center justify-between gap-2 text-[#FFEBB3] shadow-md shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xl animate-bounce">😆</span>
          <div className="flex flex-col">
            <span className="font-pixel text-xs sm:text-sm text-[#FFEBB3] tracking-wide flex items-center gap-2">
              <span>夥伴像素樂園 · {className}</span>
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
              title="快速搜尋並定位學生夥伴"
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

          {/* Season Selector (春夏秋冬) */}
          <div className="flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('spring');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'autumn' ? 'bg-[#D97706] text-white shadow-xs ring-1 ring-amber-300' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至秋天 (🍂 金黃楓林 · 100% 復刻照片像素場景)"
            >
              🍂 秋
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setSeason('winter');
              }}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                season === 'winter' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="切換至冬天 (❄️ 銀白雪景 · 像素地圖)"
            >
              ❄️ 冬
            </button>
          </div>

          {/* Time of Day Lighting Toggle (時間光影切換) */}
          <div className="hidden sm:flex items-center bg-[#1b0f04] p-1 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'day' ? 'bg-amber-500 text-stone-900 shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="暖陽白晝 (Default)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="夕陽暮色"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`p-1 text-xs rounded-lg cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
              title="螢火星夜"
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
            title="打開/隱藏學生名字標籤 (方便孩子一眼找到自己那隻)"
          >
            {showNameTags ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">名字標籤</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-[#1b0f04] p-0.5 rounded-xl border border-[#7a481c]">
            <button
              onClick={() => {
                soundManager.playClick();
                setZoomLevel((z) => Math.min(2.5, z + 0.3));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="放大畫面 (Zoom In)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setZoomLevel((z) => Math.max(1, z - 0.3));
              }}
              className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="縮小畫面 (Zoom Out)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                handleResetZoom();
              }}
              className="p-1.5 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="重設全景視角"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio Chime Mute */}
          <button
            onClick={() => {
              const muted = soundManager.toggleMute();
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

      {/* 2. THE LIVING PIXEL PARADISE CANVAS (100% Authentic 16-Bit Retro Pixel-Art Game Map) */}
      <div 
        className="relative flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#334e1c]"
        onClick={() => {
          if (isSearchOpen) setIsSearchOpen(false);
        }}
      >
        {/* Pan and Zoom Layer */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out origin-center"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {/* A. 100% PURE 16-BIT RETRO PIXEL ART MAP BACKGROUND */}
          <img
            src={currentSeasonBg}
            alt="Pixel Paradise Map"
            className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 image-rendering-pixelated"
            style={{
              imageRendering: 'pixelated',
            }}
          />

          {/* Subtle Pixel Grid Texture (enhances tactile 16-bit retro feeling) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* B. TIME OF DAY LIGHTING OVERLAY */}
          <div className={`absolute inset-0 ${lightingFilter}`} />

          {/* Night Time Fireflies */}
          {timeOfDay === 'night' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#FDE047] animate-pulse"
                  style={{
                    left: `${(i * 17 + 8) % 94}%`,
                    top: `${(i * 23 + 12) % 85}%`,
                    animationDuration: `${2 + (i % 3)}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* C. FLOATING WEATHER PARTICLES (Pixel Autumn Leaves, Petals, Snow) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-base select-none"
                style={{
                  left: `${(i * 19 + 7) % 96}%`,
                  top: '-30px',
                  animation: `floating-weather 7.5s linear infinite`,
                  animationDelay: `${(i * 0.42) % 6}s`,
                  opacity: 0.88,
                }}
              >
                {seasonEmoji}
              </div>
            ))}

            {/* Ambient Butterflies */}
            <div className="absolute top-[26%] left-[28%] text-base select-none animate-bounce" style={{ animationDuration: '3s' }}>
              🦋
            </div>
            <div className="absolute top-[46%] left-[64%] text-sm select-none animate-bounce" style={{ animationDuration: '4.2s' }}>
              🦋
            </div>
          </div>

          {/* D. STUDENT LIVING COMPANIONS (100% PURE STARDEW VALLEY ANIMALS IN PARADISE) */}
          {companions.map((comp) => {
            const isSelected = comp.id === focusedCompanionId;
            const currentStudent = students.find((s) => s.id === comp.studentId);
            const totalPoints = currentStudent?.points || 0;
            const isSwimming = comp.action === 'swimming';
            const scale = 1 + comp.growthBonus;

            return (
              <div
                key={comp.id}
                onClick={(e) => {
                  soundManager.playClick();
                  setFocusedCompanionId(comp.id);
                  if (currentStudent) {
                    setScoringStudent(currentStudent);
                  }
                }}
                className={`absolute cursor-pointer transition-all duration-300 z-20 group ${
                  isSelected ? 'z-40 scale-125' : 'hover:scale-115'
                }`}
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* A. Name Tag Pill [04 承恩] (Exact Replica of Photo image_0bc01590.png) */}
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

                {/* B. Floating celebration +N or heart explosion */}
                {comp.floatingText && (
                  <div
                    key={comp.floatingText.key}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 font-black text-xl animate-bounce pointer-events-none z-50 px-2.5 py-0.5 rounded-full shadow-lg border bg-gradient-to-r from-emerald-500 to-green-600 text-white border-white flex items-center gap-1"
                  >
                    <span>{comp.floatingText.text}</span>
                  </div>
                )}

                {/* Cute speech thought */}
                {comp.speechBubble && !comp.floatingText && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-800 bg-white/95 border border-stone-800 rounded-full px-2 py-0.5 shadow-md animate-pulse z-30 whitespace-nowrap">
                    {comp.speechBubble}
                  </div>
                )}

                {/* C. Pixel Water ripple & wake effect under swimming companion */}
                {isSwimming && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-9 rounded-full border-2 border-cyan-200/80 bg-cyan-300/35 animate-ping -z-10 pointer-events-none" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-cyan-100/60 blur-[1px] -z-10 pointer-events-none" />
                  </>
                )}

                {/* D. Pure Stardew Valley Creature Sprite (Rendered via AvatarRenderer) */}
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    comp.facing === 'left' ? 'scale-x-[-1]' : 'scale-x-[1]'
                  } ${isSwimming ? 'animate-swim-bob' : comp.action === 'walking' ? 'animate-walk-wobble' : 'animate-pet-breathe'}`}
                  style={{
                    width: `${46 * scale}px`,
                    height: `${46 * scale}px`,
                  }}
                  title={`點擊選中 ${comp.name} · 右上角愛心撫摸`}
                >
                  <AvatarRenderer
                    avatar={comp.stardewAvatar}
                    name={comp.name}
                    size={46 * scale}
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

      {/* 3. BOTTOM COMPANION SPOTLIGHT & QUICK ACTION DOCK */}
      {focusedCompanion && focusedStudent && (
        <div className="z-30 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2.5 border-t-2 border-[#D7CCC8] flex flex-wrap items-center justify-between gap-3 shadow-xl shrink-0 animate-in slide-in-from-bottom-2 duration-200">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                if (onChangeAvatar && focusedStudent) {
                  soundManager.playClick();
                  onChangeAvatar(focusedStudent);
                }
              }}
              className="w-12 h-12 bg-[#faeed1] rounded-2xl border-2 border-[#8D6E63] hover:border-amber-500 hover:ring-2 hover:ring-amber-400 p-1 flex items-center justify-center shadow-xs cursor-pointer transition-all group"
              title="點擊更換此學生在星露谷名冊的頭像 🎨"
            >
              <AvatarRenderer
                avatar={focusedCompanion.stardewAvatar}
                name={focusedCompanion.name}
                size={40}
                bare={true}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#E8F8F0] text-[#2E7D32] border border-[#81C784] font-black">
                  #{focusedStudent.rollNo}
                </span>
                <h4 className="text-base font-black text-[#5D4037]">{focusedStudent.name}</h4>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-full font-bold">
                  🪙 {focusedStudent.points} 分
                </span>
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
              <p className="text-[11px] text-stone-500 font-bold mt-0.5 flex items-center gap-1.5">
                <span>
                  {focusedCompanion.action === 'swimming'
                    ? '🏊 正在湖裡悠游'
                    : focusedCompanion.action === 'perched'
                    ? '🪨 站在岩石上眺望'
                    : focusedCompanion.action === 'resting'
                    ? '🏖️ 在沙灘邊曬太陽'
                    : '🐾 正在樹林散步'}
                </span>
                <span>·</span>
                <span className="text-[#2E7D32]">體型成長 +{Math.round(focusedCompanion.growthBonus * 100)}%</span>
              </p>
            </div>
          </div>

          {/* Quick Point Award Buttons ("叮一聲，夥伴就往前長一點") */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs font-black text-[#8D6E63] mr-1 hidden sm:inline">⚡ 獎勵長大：</span>
            {[
              { delta: 1, label: '+1 小鼓勵', icon: '🌱' },
              { delta: 2, label: '+2 積極參與', icon: '🙋‍♂️' },
              { delta: 3, label: '+3 讚讚讚', icon: '👍' },
              { delta: 5, label: '+5 尊重老師', icon: '❤️' },
              { delta: 10, label: '+10 超棒', icon: '🏆' },
            ].map((btn) => (
              <button
                key={btn.delta}
                onClick={() => handleAwardPoints(btn.delta, btn.label)}
                className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}

            <button
              onClick={() => handleAwardPoints(-1, '溫馨提醒 (-1)')}
              className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 font-black text-xs rounded-xl transition-all cursor-pointer"
              title="扣 1 分提醒"
            >
              -1 提醒
            </button>

            <button
              onClick={() => setFocusedCompanionId(null)}
              className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-black text-xs rounded-xl cursor-pointer"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* Animation keyframes for living nature */}
      <style>{`
        @keyframes floating-weather {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.95; }
          90% { opacity: 0.95; }
          100% { transform: translate(140px, 640px) rotate(360deg); opacity: 0; }
        }
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
      `}</style>
    </div>
  );
};
