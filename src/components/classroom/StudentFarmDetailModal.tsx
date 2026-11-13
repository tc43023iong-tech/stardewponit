import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { getFarmTier, getCropGrowth, LIVE_FARM_ANIMALS_ROSTER, LiveFarmAnimalBlueprint } from '../../data/classroomData';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { FarmAnimalSprite } from './FarmAnimalSprite';
import { soundManager } from '../../utils/sound';
import { X, Plus, Star, Sparkles, CheckCircle2, Lock, Volume2, Maximize2, Minimize2, Hammer, Droplets, Shield, Award } from 'lucide-react';

interface StudentFarmDetailModalProps {
  student: Student;
  onClose: () => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onOpenPointsModal: (student: Student) => void;
}

interface WanderingAnimal {
  id: string;
  name: string;
  subtitle: string;
  quote: string;
  url: string;
  sprite: string;
  x: number; // percentage 6% to 88%
  y: number; // percentage 42% to 86%
  targetX: number;
  targetY: number;
  direction: 1 | -1; // 1 = right, -1 = left
  isWalking: boolean;
  pauseTimer: number; // in ticks
  bobOffset: number;
  heartActive?: boolean;
}

// 7 All Expansion Tiers Reference for the Expansion Almanac Tab
const ALL_EXPANSION_TIERS = [
  {
    level: 1,
    minPoints: 0,
    title: 'Lv.1 原木初建起步期',
    fence: '粗鋸原木木樁圍欄 (樸實天然)',
    trough: '杉木手工釘製水槽 (清冽井水)',
    decorations: ['乾草捆', '木質小水桶'],
    summary: '開拓起步！以粗原木木樁圈定牧區，杉木小水槽供動物飲用。',
    icon: '🪵',
  },
  {
    level: 2,
    minPoints: 50,
    title: 'Lv.2 硬木圍欄田園擴建',
    fence: '堅固硬木圍欄 (十字榫卯)',
    trough: '青石雕鑿防漏水槽 (蓄存甘露)',
    decorations: ['守護稻草人', '農用木推車', '石板小徑'],
    summary: '田園圍欄升級！鋪設堅固硬木柵欄與防漏青石水槽！',
    icon: '🌲',
  },
  {
    level: 3,
    minPoints: 150,
    title: 'Lv.3 白木牧場設施擴建',
    fence: '鄉村白漆牧場木柵欄 (開闊牧區)',
    trough: '純銅自動閥門水槽 (恆定注水)',
    decorations: ['木棧觀景台', '清涼水塘石階', '稻草人立柱', '木箱花圃'],
    summary: '牧場初具規模！增設白木欄杆與純銅自動補水槽！',
    icon: '🏡',
  },
  {
    level: 4,
    minPoints: 300,
    title: 'Lv.4 鐵藝果園莊園擴建',
    fence: '鍛鐵精工雕花護欄 (堅固防風)',
    trough: '漢白玉雙層噴泉水槽 (清泉激盪)',
    decorations: ['甘泉水井', '復古風向雞', '鵝卵石休閒小徑', '遮陽花架'],
    summary: '莊園全面擴建！升級為鍛鐵雕花欄杆與雙層大理石噴泉！',
    icon: '🏰',
  },
  {
    level: 5,
    minPoints: 500,
    title: 'Lv.5 秘境林地附魔擴建',
    fence: '附魔紫晶強化護欄 (夜間微光)',
    trough: '銥金晶石多層湧泉 (甘醇泉水)',
    decorations: ['祝尼魔小木亭', '紫晶路燈', '魔法水晶花壇', '石板大道'],
    summary: '林地秘境擴建！鋪設銥金護欄與晶石水池，動物心情大好！',
    icon: '🔮',
  },
  {
    level: 6,
    minPoints: 750,
    title: 'Lv.6 皇家金輝莊園擴建',
    fence: '皇家黃金帝國護欄 (金雕鏤空)',
    trough: '皇家黃金天鵝噴泉 (金色活水)',
    decorations: ['黃金迎賓大門', '星輝路燈', '古典繁花拱門', '紅木野餐長椅'],
    summary: '奢華莊園擴建！黃金護欄與天鵝噴泉落成，金碧輝煌！',
    icon: '👑',
  },
  {
    level: 7,
    minPoints: 1000,
    title: 'Lv.MAX 星露傳奇天宮',
    fence: '星露傳奇結界護欄 (極致銥晶流光)',
    trough: '萬物生息·星露女神神泉 (彩虹湧泉)',
    decorations: ['星露榮譽金盃', '黃金時鐘', '純金女神雕像', '七彩祥雲', '銥金自動撫摸機'],
    summary: '終極農場擴建完工！全自動神泉灌溉，傳奇結界護佑，滿分金盃閃耀！',
    icon: '🌟',
  },
];

export const StudentFarmDetailModal: React.FC<StudentFarmDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
}) => {
  const [activeTab, setActiveTab] = useState<'farm' | 'expansion' | 'almanac'>('farm');
  const [clickedAnimalNote, setClickedAnimalNote] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const farmTier = getFarmTier(student.points);
  const cropInfo = getCropGrowth(student.points);
  const maxGoal = 1000;
  const progressPercent = Math.min(100, Math.round((Math.max(0, student.points) / maxGoal) * 100));

  // Filter the exact 15 animals from LIVE_FARM_ANIMALS_ROSTER based on student points
  const unlockedAnimals = LIVE_FARM_ANIMALS_ROSTER.filter(
    (a) => a.unlockScore <= student.points
  );

  // Always ensure at least the 1st animal (純白小母雞) is present
  const activeAnimalBlueprints = unlockedAnimals.length > 0 ? unlockedAnimals : [LIVE_FARM_ANIMALS_ROSTER[0]];

  // Initialize wandering animals with comfortable random starting positions
  const [animals, setAnimals] = useState<WanderingAnimal[]>(() => {
    return activeAnimalBlueprints.map((bp, i) => {
      const startX = 8 + ((i * 13) % 76);
      const startY = 48 + ((i * 17) % 36);
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
        const startX = 10 + ((i * 13) % 72);
        const startY = 48 + ((i * 17) % 36);
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
  }, [student.points, activeAnimalBlueprints.length]);

  // Gentle animal walking tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals((prev) =>
        prev.map((anim) => {
          let { x, y, targetX, targetY, direction, isWalking, pauseTimer, bobOffset, heartActive } = anim;

          if (isWalking) {
            const dx = targetX - x;
            const dy = targetY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.8) {
              isWalking = false;
              pauseTimer = Math.floor(Math.random() * 18) + 8;
              bobOffset = 0;
            } else {
              const speed = 0.35;
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
              targetX = Math.floor(Math.random() * 78) + 8;
              targetY = Math.floor(Math.random() * 38) + 48;
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
    setClickedAnimalNote(`💖 【${anim.name.split(' ')[0]}】歡快地叫喚了一聲：「${anim.quote}」`);

    setAnimals((prev) =>
      prev.map((a) => (a.id === anim.id ? { ...a, heartActive: true } : a))
    );

    setTimeout(() => {
      setAnimals((prev) =>
        prev.map((a) => (a.id === anim.id ? { ...a, heartActive: false } : a))
      );
    }, 1400);

    setTimeout(() => {
      setClickedAnimalNote((curr) => (curr?.includes(anim.name.split(' ')[0]) ? null : curr));
    }, 3200);
  };

  const handleTroughClick = () => {
    soundManager.playCollect();
    setClickedAnimalNote(`💦 【${farmTier.expansion.waterTroughName}】：水質清澈甘冽，動物們暢飲後神采奕奕！`);
    setTimeout(() => setClickedAnimalNote(null), 3000);
  };

  const handleFenceClick = () => {
    soundManager.playTick();
    setClickedAnimalNote(`🛡️ 【${farmTier.expansion.fenceName}】：堅固美觀的擴建護欄，讓整個牧區整齊安全！`);
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

  // Plant count scaled by points: 4 up to 24 crops swaying naturally
  const plantCount = Math.min(24, Math.max(4, Math.floor(student.points / 35) + 4));

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
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5">
                <span>{farmTier.tierName}</span>
                <span className="text-[#86efac]">· 藍天白雲，微風輕拂，動植物與農場設施隨積分成長！</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        {/* 1000分 Score HUD Progress Bar & Tab Switchers */}
        <div className="bg-[#4a2e13] px-4 py-2 text-[#ffebb3] border-b-2 border-[#2b1807] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-pixel text-xs text-[#ffd700]">
            <PixelSprite name="coin_gold" size={16} />
            <span>目前莊園積分：{student.points} 分 / 1000 分</span>
            {student.points >= 1000 ? (
              <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black animate-pulse">
                👑 1000分滿級傳奇！農場設施與15種動物全解鎖！
              </span>
            ) : (
              <span className="text-[11px] text-[#fed7aa] font-bold">
                (已解鎖 {animals.length}/15 種農場動物 · {farmTier.expansion.levelTitle})
              </span>
            )}
          </div>

          {/* Progress bar to 1000分 */}
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="w-full bg-[#2b1807] h-3.5 rounded-full overflow-hidden border border-[#8b5a2b] relative shadow-inner">
              <div
                className={`h-full transition-all duration-700 ${
                  student.points >= 1000
                    ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse'
                    : 'bg-gradient-to-r from-lime-400 to-emerald-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-pixel text-[11px] text-[#fed7aa] whitespace-nowrap">
              {progressPercent}%
            </span>
          </div>

          {/* View Tab Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('farm');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors ${
                activeTab === 'farm'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🏡 實景農場 (動物漫步與微風)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('expansion');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors ${
                activeTab === 'expansion'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              🔨 農場擴建等級表 (圍欄/水槽)
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('almanac');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-pixel cursor-pointer transition-colors ${
                activeTab === 'almanac'
                  ? 'bg-[#fabc3f] text-[#4a2800] shadow'
                  : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
              }`}
            >
              📖 15種動物圖鑑 (0~1000分)
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] overflow-y-auto max-h-[76vh]">
          {/* TAB 1: LIVING COZY STARDEW VALLEY FARM CANVAS */}
          {activeTab === 'farm' && (
            <div className="space-y-3">
              {/* Farm Expansion Status Banner */}
              <div className="bg-[#fef9c3] border-2 border-[#ca8a04] px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔨</span>
                  <div>
                    <span className="font-pixel text-[11px] font-bold text-[#854d0e] block">
                      【農場擴建視覺進度】{farmTier.expansion.levelTitle}
                    </span>
                    <span className="text-xs font-bold text-[#713f12]">
                      圍欄：{farmTier.expansion.fenceName} ｜ 水槽：{farmTier.expansion.waterTroughName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {farmTier.expansion.nextPoints ? (
                    <span className="text-[11px] font-pixel text-[#854d0e] bg-amber-200/80 px-2 py-0.5 rounded border border-[#ca8a04]">
                      距下一級升級尚需: {farmTier.expansion.nextPoints - student.points} 分
                    </span>
                  ) : (
                    <span className="text-[11px] font-pixel text-[#15803d] bg-green-200/80 px-2 py-0.5 rounded border border-[#86efac]">
                      👑 已達成最高級極致擴建！
                    </span>
                  )}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('expansion');
                    }}
                    className="text-xs font-bold text-[#854d0e] hover:text-[#451a03] underline cursor-pointer"
                  >
                    查看擴建路線圖 →
                  </button>
                </div>
              </div>

              {/* Animal & Decor Interaction Dialogue Notice */}
              {clickedAnimalNote && (
                <div className="bg-[#fef3c7] border-2 border-[#f59e0b] px-4 py-2.5 rounded-xl text-center text-xs font-bold text-[#78350f] shadow-md animate-bounce flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>{clickedAnimalNote}</span>
                </div>
              )}

              {/* LIVING COZY STARDEW VALLEY FARM CANVAS */}
              <div
                className="relative rounded-2xl border-4 border-[#3b1f0b] overflow-hidden shadow-2xl select-none"
                style={{
                  height: isFullscreen ? '78vh' : '520px',
                  background: 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 26%, #bae6fd 42%, #86efac 50%, #22c55e 68%, #15803d 100%)',
                }}
              >
                {/* 1. 藍天白雲 (Blue Sky & Slowly Drifting Clouds) */}
                <div className="absolute inset-x-0 top-0 h-48 pointer-events-none overflow-hidden z-0">
                  {/* Gentle Sun with warm rays */}
                  <div className="absolute top-4 right-12 w-20 h-20 bg-yellow-200/90 rounded-full blur-xs shadow-[0_0_50px_rgba(253,224,71,0.8)] flex items-center justify-center">
                    <div className="w-14 h-14 bg-amber-300 rounded-full animate-pulse" />
                  </div>

                  {/* Cloud 1 (Slow top layer) */}
                  <div
                    className="absolute top-5 left-0 w-36 h-14 bg-white/85 rounded-full blur-[0.5px] shadow-sm animate-cloud-slow"
                    style={{ animationDelay: '0s' }}
                  >
                    <div className="absolute -top-4 left-6 w-16 h-16 bg-white/85 rounded-full" />
                    <div className="absolute -top-2 left-16 w-12 h-12 bg-white/85 rounded-full" />
                  </div>

                  {/* Cloud 2 (Mid layer) */}
                  <div
                    className="absolute top-14 left-1/3 w-48 h-16 bg-white/90 rounded-full blur-[0.5px] shadow-md animate-cloud-med"
                    style={{ animationDelay: '-12s' }}
                  >
                    <div className="absolute -top-6 left-8 w-20 h-20 bg-white/90 rounded-full" />
                    <div className="absolute -top-3 left-24 w-16 h-16 bg-white/90 rounded-full" />
                  </div>

                  {/* Cloud 3 (Low fluffy layer) */}
                  <div
                    className="absolute top-22 left-2/3 w-40 h-14 bg-white/80 rounded-full blur-[0.5px] shadow-sm animate-cloud-slow"
                    style={{ animationDelay: '-24s' }}
                  >
                    <div className="absolute -top-5 left-8 w-16 h-16 bg-white/80 rounded-full" />
                  </div>

                  {/* Distant Mountain Ridges */}
                  <svg
                    className="absolute bottom-6 inset-x-0 w-full h-24 opacity-40"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 60"
                  >
                    <polygon points="0,60 50,15 110,60 170,10 240,60 310,20 370,60 400,30 400,60" fill="#1b4332" />
                    <polygon points="20,60 70,25 130,60 200,18 270,60 340,28 400,60" fill="#2d6a4f" />
                  </svg>
                </div>

                {/* 2. Cozy Farm Structures (Farmhouse, Pond, Wooden Fences) */}
                <div className="absolute top-22 inset-x-0 flex items-end justify-between px-6 pointer-events-none z-10">
                  {/* Left: Red Farmhouse with Chimney Smoke */}
                  <div className="relative flex flex-col items-center">
                    {/* Puffing Chimney Smoke */}
                    <div className="absolute -top-8 right-3 w-4 h-4 bg-stone-200/80 rounded-full animate-smoke" />
                    <div className="w-22 h-16 bg-[#8b3a1d] border-3 border-[#3b1703] rounded-t-lg shadow-lg relative">
                      <div className="w-full h-8 bg-[#b91c1c] border-b-2 border-[#541313] rounded-t-lg" />
                      <div className="absolute bottom-0 left-2 w-5 h-8 bg-[#542407] border border-[#2b0f02]" />
                      <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#fef08a] border-2 border-[#542407]" />
                    </div>
                    <span className="font-pixel text-[9px] text-[#ffebb3] bg-[#3b1f0b]/80 px-1.5 rounded mt-0.5">
                      星露農舍
                    </span>
                  </div>

                  {/* Center: Sparkling Blue Water Pond where ducks splash */}
                  <div className="relative w-44 sm:w-60 h-16 bg-[#38bdf8] border-3 border-[#0284c7] rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-[#0284c7]/20 rounded-full animate-water-gleam" />
                    <span className="absolute text-[10px] text-[#0369a1] font-pixel font-bold">
                      清澈水塘 💧
                    </span>
                    {student.points >= 120 && (
                      <div className="absolute right-5 top-2 animate-bounce" title="綠頭野鴨正在游泳">
                        <PixelSprite name="duck" size={24} />
                      </div>
                    )}
                  </div>

                  {/* Right: Golden Clock / Well / Trophy */}
                  <div className="flex items-center gap-2">
                    {student.points >= 300 && (
                      <div className="flex flex-col items-center">
                        <PixelSprite name="well" size={36} />
                        <span className="font-pixel text-[9px] text-[#ffebb3] bg-[#3b1f0b]/80 px-1 rounded">
                          甘泉水井
                        </span>
                      </div>
                    )}
                    {student.points >= 1000 && (
                      <div className="flex flex-col items-center animate-bounce">
                        <PixelSprite name="clock" size={42} />
                        <span className="font-pixel text-[9px] text-amber-900 bg-yellow-300 font-bold px-1 rounded shadow">
                          黃金時鐘 👑
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. 植物搖晃 (Fertile Tilled Soil & Rows of Swaying Crops) */}
                <div className="absolute top-44 inset-x-4 sm:inset-x-8 z-15 bg-[#603813]/90 border-3 border-[#3b1703] p-2.5 rounded-xl shadow-inner">
                  <div className="flex items-center justify-between text-[11px] font-pixel text-[#ffebb3] mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>🌾 豐收耕作田</span>
                      <span className="text-[#86efac] text-[10px] font-sans font-bold">
                        (微風吹拂，共 {plantCount} 株作物輕輕搖擺～)
                      </span>
                    </span>
                    <span className="text-amber-300 font-bold">{cropInfo.label}</span>
                  </div>

                  {/* Swaying Plants Grid */}
                  <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-2 justify-items-center">
                    {Array.from({ length: plantCount }).map((_, i) => {
                      const cropType =
                        student.points >= 1000
                          ? i % 4 === 0 ? 'trophy' : i % 3 === 0 ? 'melon' : 'sunflower'
                          : student.points >= 500
                          ? i % 3 === 0 ? 'melon' : i % 2 === 0 ? 'sunflower' : 'rabbit'
                          : student.points >= 150
                          ? i % 2 === 0 ? 'sunflower' : 'melon'
                          : 'sunflower';

                      const duration = 2.4 + (i % 5) * 0.35;
                      const delay = -((i * 0.45) % 3);

                      return (
                        <div
                          key={i}
                          className="w-8 h-8 bg-[#451e06] rounded-lg border border-[#2b0f02] flex items-center justify-center p-0.5 hover:scale-125 transition-transform cursor-pointer drop-shadow-md"
                          style={{
                            transformOrigin: 'bottom center',
                            animation: `plantWindSway ${duration}s ease-in-out infinite`,
                            animationDelay: `${delay}s`,
                          }}
                          title={`第 ${i + 1} 株活力作物，點擊欣賞`}
                          onClick={() => {
                            soundManager.playCollect();
                            setClickedAnimalNote(`🌻 作物正在陽光與微風中茁壯生長！成長度 100%！`);
                            setTimeout(() => setClickedAnimalNote(null), 2500);
                          }}
                        >
                          <PixelSprite name={cropType} size={22} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. VISUAL FARM EXPANSION FENCE (農場擴建圍欄視覺效果) */}
                <div
                  onClick={handleFenceClick}
                  className="absolute top-68 inset-x-2 sm:inset-x-4 z-18 pointer-events-auto cursor-pointer"
                  title={`點擊查看圍欄資訊：${farmTier.expansion.fenceName}`}
                >
                  {/* Simple Wood Stakes (Lv.1) */}
                  {farmTier.expansion.fenceType === 'simple_wood' && (
                    <div className="flex items-center justify-between px-2">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-2.5 h-6 bg-[#854d0e] border border-[#451a03] rounded-t-sm shadow-xs" />
                          <div className="w-7 h-1 bg-[#a16207] -mt-4 border-b border-[#451a03]" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hardwood Fence (Lv.2) */}
                  {farmTier.expansion.fenceType === 'hardwood' && (
                    <div className="flex items-center justify-between px-2">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-3.5 h-7 bg-[#542407] border border-[#270f02] rounded-t shadow-sm relative">
                            <div className="w-1.5 h-1.5 bg-[#ca8a04] rounded-full mx-auto mt-0.5" />
                          </div>
                          <div className="w-8 h-1.5 bg-[#78350f] -mt-5 border-y border-[#270f02]" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ranch Rail White (Lv.3) */}
                  {farmTier.expansion.fenceType === 'ranch_rail' && (
                    <div className="flex items-center justify-between px-2">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-3 h-8 bg-white border border-stone-400 rounded-t shadow-sm" />
                          <div className="w-8 h-1.5 bg-white -mt-6 border-y border-stone-300" />
                          <div className="w-8 h-1 bg-white mt-1 border-b border-stone-300" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Wrought Iron (Lv.4) */}
                  {farmTier.expansion.fenceType === 'wrought_iron' && (
                    <div className="flex items-center justify-between px-2">
                      {Array.from({ length: 18 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-1.5 h-2 bg-[#0f172a] rounded-t-full" />
                          <div className="w-2 h-7 bg-[#1e293b] border-x border-[#0f172a] shadow-sm" />
                          <div className="w-7 h-1 bg-[#334155] -mt-5" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Iridium Glowing Fence (Lv.5) */}
                  {farmTier.expansion.fenceType === 'iridium_fence' && (
                    <div className="flex items-center justify-between px-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]">
                      {Array.from({ length: 18 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-2.5 h-3 bg-fuchsia-300 rounded-t-full animate-pulse" />
                          <div className="w-3 h-7 bg-[#7e22ce] border border-[#a855f7] shadow-lg" />
                          <div className="w-8 h-1.5 bg-purple-400 -mt-5 border border-purple-200" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Royal Golden Fence (Lv.6) */}
                  {farmTier.expansion.fenceType === 'golden_fence' && (
                    <div className="flex items-center justify-between px-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                      {Array.from({ length: 18 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-yellow-200 rotate-45 border border-amber-600" />
                          <div className="w-3.5 h-7 bg-gradient-to-b from-yellow-300 to-amber-500 border border-amber-700 shadow-md" />
                          <div className="w-8 h-1.5 bg-yellow-300 -mt-5 border-y border-amber-600" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Celestial Barrier (Lv.MAX) */}
                  {farmTier.expansion.fenceType === 'celestial_barrier' && (
                    <div className="flex items-center justify-between px-2 drop-shadow-[0_0_14px_rgba(56,189,248,0.9)]">
                      {Array.from({ length: 20 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col items-center animate-pulse">
                          <div className="w-3 h-3 bg-cyan-200 rounded-full shadow-lg" />
                          <div className="w-2 h-8 bg-gradient-to-b from-cyan-300 via-indigo-300 to-pink-300 rounded-full" />
                          <div className="w-7 h-1 bg-gradient-to-r from-cyan-200 to-pink-200 -mt-6" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. VISUAL FARM EXPANSION WATER TROUGH / FOUNTAIN (農場擴建水槽視覺效果) */}
                <div
                  onClick={handleTroughClick}
                  className="absolute bottom-4 left-6 sm:left-10 z-25 pointer-events-auto cursor-pointer hover:scale-110 transition-transform group flex flex-col items-center"
                  title={`點擊使用水槽：${farmTier.expansion.waterTroughName}`}
                >
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 font-pixel text-[9px] bg-[#3b1f0b]/95 text-[#ffd700] px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none border border-[#8b5a2b]">
                    {farmTier.expansion.waterTroughName}
                  </div>

                  {/* Wooden Trough (Lv.1) */}
                  {farmTier.expansion.waterTroughType === 'wooden_trough' && (
                    <div className="w-16 h-8 bg-[#854d0e] border-2 border-[#451a03] rounded-md shadow-lg flex items-center justify-center p-1 relative">
                      <div className="w-full h-full bg-[#38bdf8] rounded-sm border border-[#0284c7] relative overflow-hidden">
                        <div className="w-full h-full bg-[#0284c7]/20 animate-water-gleam" />
                      </div>
                      <div className="absolute -right-3 bottom-0 text-xs">🪣</div>
                    </div>
                  )}

                  {/* Stone Basin (Lv.2) */}
                  {farmTier.expansion.waterTroughType === 'stone_basin' && (
                    <div className="w-18 h-9 bg-[#64748b] border-2 border-[#334155] rounded-lg shadow-lg flex items-center justify-center p-1 relative">
                      <div className="w-full h-full bg-[#0284c7] rounded-sm border border-[#0369a1] overflow-hidden">
                        <div className="w-full h-full bg-cyan-200/30 animate-water-gleam" />
                      </div>
                      <div className="absolute -left-1 -bottom-1 text-xs">🌿</div>
                    </div>
                  )}

                  {/* Copper Auto Trough (Lv.3) */}
                  {farmTier.expansion.waterTroughType === 'copper_auto_trough' && (
                    <div className="w-20 h-10 bg-gradient-to-r from-amber-600 to-orange-700 border-2 border-amber-900 rounded-lg shadow-lg flex items-center justify-center p-1 relative">
                      <div className="w-full h-full bg-[#0ea5e9] rounded border border-[#0284c7] overflow-hidden">
                        <div className="w-full h-full bg-white/20 animate-water-gleam" />
                      </div>
                      <div className="absolute -top-3 right-2 text-xs">🚰</div>
                    </div>
                  )}

                  {/* Marble Fountain (Lv.4) */}
                  {farmTier.expansion.waterTroughType === 'marble_fountain' && (
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-4 bg-slate-200 border border-slate-400 rounded-t-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                      </div>
                      <div className="w-22 h-9 bg-slate-100 border-2 border-slate-400 rounded-b-xl shadow-lg flex items-center justify-center p-1">
                        <div className="w-full h-full bg-sky-400 rounded-b-lg animate-water-gleam" />
                      </div>
                    </div>
                  )}

                  {/* Iridium Crystal Fountain (Lv.5) */}
                  {farmTier.expansion.waterTroughType === 'iridium_crystal_fountain' && (
                    <div className="flex flex-col items-center drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                      <div className="w-8 h-5 bg-purple-500 border border-purple-300 rounded-t-full flex items-center justify-center animate-pulse">
                        <div className="w-2.5 h-2.5 bg-fuchsia-200 rounded-full" />
                      </div>
                      <div className="w-24 h-10 bg-[#581c87] border-2 border-[#a855f7] rounded-b-xl shadow-2xl flex items-center justify-center p-1">
                        <div className="w-full h-full bg-purple-400 rounded-b-lg animate-water-gleam" />
                      </div>
                    </div>
                  )}

                  {/* Royal Golden Fountain (Lv.6) */}
                  {farmTier.expansion.waterTroughType === 'golden_fountain' && (
                    <div className="flex flex-col items-center drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]">
                      <div className="text-sm -mb-1 animate-bounce">🦢</div>
                      <div className="w-26 h-10 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 border-2 border-amber-600 rounded-xl shadow-2xl flex items-center justify-center p-1">
                        <div className="w-full h-full bg-cyan-300 rounded-lg animate-water-gleam" />
                      </div>
                    </div>
                  )}

                  {/* Celestial Spring (Lv.MAX) */}
                  {farmTier.expansion.waterTroughType === 'celestial_spring' && (
                    <div className="flex flex-col items-center drop-shadow-[0_0_16px_rgba(56,189,248,0.9)] animate-pulse">
                      <div className="text-base -mb-1">✨⛲✨</div>
                      <div className="w-28 h-11 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 border-2 border-white rounded-2xl shadow-2xl flex items-center justify-center p-1">
                        <div className="w-full h-full bg-gradient-to-r from-cyan-200 to-pink-200 rounded-xl animate-water-gleam" />
                      </div>
                    </div>
                  )}
                  <span className="font-pixel text-[8px] text-[#ffebb3] bg-[#3b1f0b]/90 px-1.5 py-0.5 rounded shadow mt-0.5">
                    {farmTier.expansion.waterTroughType === 'wooden_trough' ? '杉木水槽' : '自動泉池'}
                  </span>
                </div>

                {/* 6. 動物走來走去 (Free-Roaming Walking Animals on the Green Pasture) */}
                <div className="absolute inset-x-0 bottom-0 top-70 pointer-events-auto z-20 overflow-hidden">
                  {/* Pasture Grass details */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(#14532d 15%, transparent 16%)',
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* Render Wandering Farm Animals */}
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
                      {/* Floating Heart Effect when clicked */}
                      {anim.heartActive && (
                        <div className="absolute -top-8 text-rose-500 animate-bounce text-xl filter drop-shadow">
                          ❤️
                        </div>
                      )}

                      {/* Name & Subtitle tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 font-pixel text-[9px] bg-[#3b1f0b]/95 text-[#ffebb3] px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none flex flex-col items-center border border-[#8b5a2b]">
                        <span className="font-bold text-[#ffd700]">{anim.name.split(' ')[0]}</span>
                        <span className="text-[8px] text-[#fed7aa]">{anim.subtitle}</span>
                      </div>

                      {/* Animated Sprite / Image Facing Direction - 100% Vector Pixel Sprite with NO white box */}
                      <div
                        className="transition-transform duration-200 hover:scale-125 flex items-center justify-center filter drop-shadow-sm select-none"
                        style={{
                          transform: `scaleX(${anim.direction})`,
                        }}
                      >
                        <FarmAnimalSprite animalId={anim.id} size={50} />
                      </div>

                      {/* Natural gentle shadow on green pasture under animal */}
                      <div className="w-8 h-2 bg-emerald-950/25 rounded-full blur-[0.5px] -mt-1 pointer-events-none" />
                    </div>
                  ))}

                  {/* 1000分 Rainbow Confetti celebration */}
                  {student.points >= 1000 && (
                    <div className="absolute bottom-3 right-6 bg-yellow-100/95 border-2 border-amber-500 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none animate-pulse">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span className="font-pixel text-xs text-amber-900 font-bold">
                        👑 1000分滿分極致榮譽！15種農場動物全員大團圓！
                      </span>
                    </div>
                  )}
                </div>

                {/* Ambient floating petals/dandelions */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  <div className="absolute top-1/4 left-1/5 text-xs text-white/70 animate-ping">
                    🌸
                  </div>
                  <div
                    className="absolute top-1/2 right-1/4 text-xs text-yellow-100/70 animate-ping"
                    style={{ animationDelay: '1.2s' }}
                  >
                    ✨
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FARM EXPANSION PROGRESSION ROADMAP (農場擴建階段表) */}
          {activeTab === 'expansion' && (
            <div className="space-y-4">
              <div className="bg-[#ede0c2] p-3.5 rounded-xl border border-[#c4a675] text-xs text-stone-700 flex items-start gap-2.5">
                <Hammer className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#4a2800] block text-sm">
                    🔨 星露谷農場擴建進度體系 (Farm Expansion Blueprint)
                  </span>
                  <p className="mt-0.5 text-xs text-[#5a3818]">
                    學生的農場會隨累計積分自動升級！圍欄將由原木木樁升級為硬木、白漆木柵、鍛鐵雕花、銥金紫晶直至皇家黃金與傳奇結界；水槽亦隨之進化為純銅自動閥門、漢白玉噴泉與星露女神神泉！
                  </p>
                </div>
              </div>

              {/* Tiers List */}
              <div className="space-y-3">
                {ALL_EXPANSION_TIERS.map((tier) => {
                  const isCurrent = farmTier.expansion.level === tier.level;
                  const isUnlocked = student.points >= tier.minPoints;

                  return (
                    <div
                      key={tier.level}
                      className={`p-3.5 rounded-xl border-2 transition-all ${
                        isCurrent
                          ? 'bg-[#fef9c3] border-[#ca8a04] shadow-md ring-2 ring-[#eab308]'
                          : isUnlocked
                          ? 'bg-[#f0fdf4] border-[#86efac]'
                          : 'bg-[#ede0c2]/50 border-[#c4a675] opacity-75'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 mb-2 border-stone-200">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tier.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-[#4a2800]">
                                {tier.title}
                              </h4>
                              {isCurrent && (
                                <span className="bg-[#eab308] text-[#4a2800] font-pixel text-[9px] px-2 py-0.5 rounded font-black">
                                  目前所屬階段
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-stone-600">{tier.summary}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`font-pixel text-xs px-2.5 py-1 rounded font-bold ${
                              isUnlocked
                                ? 'bg-[#dcfce7] text-[#15803d]'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {tier.minPoints} 分門檻
                          </span>
                          {isUnlocked ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-stone-400" />
                          )}
                        </div>
                      </div>

                      {/* Upgrade Items Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                          <span className="font-bold text-[#854d0e] flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5" /> 圍欄升級：
                          </span>
                          <span className="text-stone-700 font-medium block mt-0.5">
                            {tier.fence}
                          </span>
                        </div>

                        <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                          <span className="font-bold text-[#0284c7] flex items-center gap-1">
                            <Droplets className="w-3.5 h-3.5" /> 水槽/噴泉升級：
                          </span>
                          <span className="text-stone-700 font-medium block mt-0.5">
                            {tier.trough}
                          </span>
                        </div>

                        <div className="bg-white/80 p-2 rounded-lg border border-stone-200">
                          <span className="font-bold text-[#15803d] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> 特色莊園裝飾：
                          </span>
                          <span className="text-stone-700 font-medium block mt-0.5">
                            {tier.decorations.join('、')}
                          </span>
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

              {/* 15 Animals Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {LIVE_FARM_ANIMALS_ROSTER.map((animal) => {
                  const isUnlocked = student.points >= animal.unlockScore;
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
                        <p className="text-[10px] text-stone-500 truncate mt-0.5">
                          {animal.quote}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#faeed1] px-4 py-3 border-t-2 border-[#c4a675] flex items-center justify-between">
          <span className="text-xs font-bold text-stone-600">
            🌾 點擊草地漫步的動物、水槽或圍欄可進行互動 · 1000 分滿分 15 種動物與最高級擴建全到位
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-1.5 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] text-xs font-bold border border-[#a3794b] rounded-lg cursor-pointer"
          >
            返回名冊
          </button>
        </div>
      </div>
    </div>
  );
};
