import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { getFarmTier, getCropGrowth, LIVE_FARM_ANIMALS_ROSTER, LiveFarmAnimalBlueprint } from '../../data/classroomData';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';
import { X, Plus, Star, Sparkles, CheckCircle2, Lock, Volume2, Maximize2, Minimize2, Heart, Award } from 'lucide-react';

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

export const StudentFarmDetailModal: React.FC<StudentFarmDetailModalProps> = ({
  student,
  onClose,
  onQuickAdd,
  onOpenPointsModal,
}) => {
  const [activeTab, setActiveTab] = useState<'farm' | 'almanac'>('farm');
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
      const startY = 46 + ((i * 17) % 38);
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
          direction: 1,
          isWalking: false,
          pauseTimer: 10,
          bobOffset: 0,
          heartActive: false,
        };
      });
    });
  }, [student.points]);

  // Smooth wandering loop
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      setAnimals((prevList) =>
        prevList.map((anim) => {
          // If paused, decrement pause timer
          if (anim.pauseTimer > 0) {
            return {
              ...anim,
              pauseTimer: anim.pauseTimer - 1,
              isWalking: false,
              bobOffset: 0,
            };
          }

          // If reached target, pick a new tranquil meadow destination
          const dist = Math.hypot(anim.targetX - anim.x, anim.targetY - anim.y);
          if (dist < 1.8) {
            const nextX = Math.floor(Math.random() * 74) + 8; // 8% to 82%
            const nextY = Math.floor(Math.random() * 36) + 48; // 48% to 84%
            const nextPause = Math.floor(Math.random() * 18) + 8; // pause 1-3 seconds
            const nextDir = (nextX >= anim.x ? 1 : -1) as 1 | -1;
            return {
              ...anim,
              targetX: nextX,
              targetY: nextY,
              direction: nextDir,
              pauseTimer: nextPause,
              isWalking: false,
              bobOffset: 0,
            };
          }

          // Walk smoothly towards target
          const stepSpeed = 0.6;
          const angle = Math.atan2(anim.targetY - anim.y, anim.targetX - anim.x);
          const newX = anim.x + Math.cos(angle) * stepSpeed;
          const newY = anim.y + Math.sin(angle) * stepSpeed;
          const nextDir = (Math.cos(angle) >= 0 ? 1 : -1) as 1 | -1;
          const nextBob = Math.sin(Date.now() / 150) * 3;

          return {
            ...anim,
            x: newX,
            y: newY,
            direction: nextDir,
            isWalking: true,
            bobOffset: nextBob,
          };
        })
      );
    }, 110);

    return () => clearInterval(wanderInterval);
  }, []);

  // Handle animal click
  const handleAnimalClick = (anim: WanderingAnimal) => {
    soundManager.playCollect();
    setClickedAnimalNote(`${anim.name} · ${anim.subtitle}：「${anim.quote}」`);

    // Trigger heart emote
    setAnimals((prev) =>
      prev.map((a) => (a.id === anim.id ? { ...a, heartActive: true } : a))
    );
    setTimeout(() => {
      setAnimals((prev) =>
        prev.map((a) => (a.id === anim.id ? { ...a, heartActive: false } : a))
      );
    }, 1800);

    setTimeout(() => setClickedAnimalNote(null), 3500);
  };

  // Plant density and types based on score (6 up to 36 plants at 1000分)
  const plantCount = Math.min(36, Math.max(6, Math.floor((Math.max(0, student.points) / 1000) * 30) + 6));

  const toggleFullscreen = () => {
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
                  🌾 【{student.name}】的專屬星露谷農場
                </h3>
                <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{student.rollNo}
                </span>
              </div>
              <p className="text-[11px] text-[#fed7aa] font-bold mt-0.5 flex items-center gap-1.5">
                <span>{farmTier.tierName}</span>
                <span className="text-[#86efac]">· 藍天白雲，微風輕拂，15種農場動物熱鬧漫步！</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playCorrect();
                onQuickAdd(student, 2);
              }}
              className="bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] border border-[#86efac] px-2.5 py-1 text-xs font-pixel font-bold rounded cursor-pointer active:scale-95 shadow-xs"
              title="給予+2分"
            >
              <Plus className="w-3 h-3 inline mr-0.5" /> 2分
            </button>
            <button
              onClick={() => {
                soundManager.playCorrect();
                onQuickAdd(student, 5);
              }}
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

        {/* 1000分 Score HUD Progress */}
        <div className="bg-[#4a2e13] px-4 py-2 text-[#ffebb3] border-b-2 border-[#2b1807] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-pixel text-xs text-[#ffd700]">
            <PixelSprite name="coin_gold" size={16} />
            <span>目前莊園積分：{student.points} 分 / 1000 分</span>
            {student.points >= 1000 ? (
              <span className="bg-[#eab308] text-[#4a2800] text-[10px] px-2 py-0.5 rounded font-black animate-pulse">
                👑 1000分滿級傳奇！15種動物全解鎖！
              </span>
            ) : (
              <span className="text-[11px] text-[#fed7aa] font-bold">
                (已解鎖 {animals.length}/15 種農場動物)
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
          {activeTab === 'farm' && (
            <div className="space-y-3">
              {/* Animal Interaction Dialogue Notice */}
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
                  height: isFullscreen ? '78vh' : '500px',
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
                <div className="absolute top-24 inset-x-0 flex items-end justify-between px-6 pointer-events-none z-10">
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
                <div className="absolute top-48 inset-x-4 sm:inset-x-8 z-15 bg-[#603813]/90 border-3 border-[#3b1703] p-3 rounded-xl shadow-inner">
                  <div className="flex items-center justify-between text-[11px] font-pixel text-[#ffebb3] mb-1.5">
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

                      // Varied natural sway timing
                      const duration = 2.4 + (i % 5) * 0.35;
                      const delay = -((i * 0.45) % 3);

                      return (
                        <div
                          key={i}
                          className="w-9 h-9 bg-[#451e06] rounded-lg border border-[#2b0f02] flex items-center justify-center p-0.5 hover:scale-125 transition-transform cursor-pointer drop-shadow-md"
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
                          <PixelSprite name={cropType} size={24} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. 動物走來走去 (Free-Roaming Walking Animals on the Green Pasture) */}
                <div className="absolute inset-x-0 bottom-0 top-74 pointer-events-auto z-20 overflow-hidden">
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

                      {/* Animated Sprite / Image Facing Direction */}
                      <div
                        className="transition-transform duration-200 hover:scale-125 flex items-center justify-center"
                        style={{
                          transform: `scaleX(${anim.direction})`,
                        }}
                      >
                        <AvatarRenderer avatar={anim.id} name={anim.name} size={42} />
                      </div>

                      {/* Mini shadow under animal */}
                      <div className="w-7 h-1.5 bg-black/25 rounded-full blur-[0.5px] -mt-1 pointer-events-none" />
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
                  <div className="absolute top-1/2 right-1/4 text-xs text-yellow-100/70 animate-ping" style={{ animationDelay: '1.2s' }}>
                    ✨
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: 15 Farm Animals Almanac / Progression Roadmap to 1000分 */}
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
            🌾 點擊草地漫步的動物可與牠們打招呼互動 · 1000 分滿分全 15 種動物全員團圓
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] text-xs font-bold border border-[#a3794b] rounded-lg cursor-pointer"
          >
            返回名冊
          </button>
        </div>
      </div>
    </div>
  );
};
