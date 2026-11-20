import React, { useMemo, useState, useEffect } from 'react';
import { Sparkles, ArrowUpCircle, X } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export interface UpgradeCelebrationOverlayProps {
  isOpen: boolean;
  mode: 'farm' | 'room' | 'kitchen' | 'livingRoom' | 'bathroom';
  studentName: string;
  milestonePoints: number;
  unlockedTitle: string;
  unlockedSubtitle: string;
  unlockedIcon: string;
  unlockedImageUrl?: string;
  onClose: () => void;
}

interface BurstParticleSpec {
  id: number;
  tx: number;
  ty: number;
  rot: number;
  scale: number;
  delay: number;
  duration: number;
  color: string;
  shape: 'square' | 'diamond' | 'star' | 'leaf';
}

const PARTICLE_COLORS = [
  '#fde047', // bright gold
  '#facc15', // amber gold
  '#f97316', // sunset orange
  '#4ade80', // emerald green
  '#38bdf8', // sky crystal
  '#f472b6', // blossom pink
  '#ffffff', // pure sparkle
];

const PARTICLE_SHAPES: BurstParticleSpec['shape'][] = ['star', 'square', 'diamond', 'leaf'];

export const UpgradeCelebrationOverlay: React.FC<UpgradeCelebrationOverlayProps> = ({
  isOpen,
  mode,
  studentName,
  milestonePoints,
  unlockedTitle,
  unlockedSubtitle,
  unlockedIcon,
  unlockedImageUrl,
  onClose,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [unlockedImageUrl, milestonePoints]);

  // Deterministic 38-particle radial burst specs (2 waves for dramatic fountain/firework feel)
  const particles = useMemo<BurstParticleSpec[]>(() => {
    const count = 38;
    const list: BurstParticleSpec[] = [];
    for (let i = 0; i < count; i++) {
      const wave = i < 24 ? 0 : 1;
      const baseAngle = ((i % (wave === 0 ? 24 : 14)) / (wave === 0 ? 24 : 14)) * Math.PI * 2;
      const jitterAngle = ((i * 37) % 19) * 0.028 - 0.25;
      const angle = baseAngle + jitterAngle;
      const radius = wave === 0 ? 150 + ((i * 29) % 135) : 105 + ((i * 23) % 95);
      const tx = Math.round(Math.cos(angle) * radius);
      const ty = Math.round(Math.sin(angle) * radius - 18);
      const rot = ((i % 2 === 0 ? 1 : -1) * (140 + ((i * 43) % 220)));
      const scale = 0.85 + ((i * 17) % 7) * 0.1;
      const delay = wave === 0 ? (i % 6) * 0.035 : 0.22 + (i % 5) * 0.04;
      const duration = wave === 0 ? 1.35 + (i % 4) * 0.15 : 1.2 + (i % 3) * 0.14;
      list.push({
        id: i,
        tx,
        ty,
        rot,
        scale,
        delay,
        duration,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        shape: PARTICLE_SHAPES[i % PARTICLE_SHAPES.length],
      });
    }
    return list;
  }, []);

  if (!isOpen) return null;

  const tierNumber = Math.max(1, Math.floor(milestonePoints / 50));
  const modeLabel =
    mode === 'farm'
      ? '專屬農場升級'
      : mode === 'kitchen'
      ? '專屬廚房升級'
      : mode === 'livingRoom'
      ? '專屬客廳升級'
      : mode === 'bathroom'
      ? '專屬洗手間升級'
      : '溫馨房間升級';

  return (
    <div
      className="fixed inset-0 z-[10050] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden select-none"
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
      {/* Radial Celebratory Particle Burst Layer (compositor-only GPU transform + opacity) */}
      <div
        key={`burst-${mode}-${milestonePoints}-${studentName}`}
        className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Expanding golden pixel shockwave ring */}
        <div
          className="animate-upgrade-ring absolute w-56 h-56 border-4 border-[#fde047] shadow-[0_0_28px_rgba(253,224,71,0.85)]"
          style={{ borderRadius: '0px' }}
        />
        <div
          className="animate-upgrade-ring absolute w-40 h-40 border-4 border-[#4ade80]"
          style={{ borderRadius: '0px', animationDelay: '0.12s' }}
        />

        {/* Pixel burst particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="animate-upgrade-particle absolute flex items-center justify-center font-black drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
            style={
              {
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--rot': `${p.rot}deg`,
                '--sc': p.scale,
                '--delay': `${p.delay}s`,
                '--dur': `${p.duration}s`,
                color: p.color,
              } as React.CSSProperties
            }
          >
            {p.shape === 'star' ? (
              <span className="text-lg leading-none">✦</span>
            ) : p.shape === 'leaf' ? (
              <span className="text-sm leading-none">✿</span>
            ) : p.shape === 'diamond' ? (
              <span
                className="block w-3 h-3 rotate-45 border border-black/30"
                style={{ backgroundColor: p.color }}
              />
            ) : (
              <span
                className="block w-3 h-3 border border-black/35"
                style={{ backgroundColor: p.color }}
              />
            )}
          </span>
        ))}
      </div>

      {/* Main Stardew Wooden "恭喜升級！" Celebration Popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md pixel-wood-box bg-[#faeed1] text-[#4a2800] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.65)] animate-upgrade-modal-pop"
      >
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#5a3818] via-[#7c4d21] to-[#5a3818] px-4 py-3 border-b-4 border-[#2b1807] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ArrowUpCircle className="w-5 h-5 text-[#fde047] shrink-0" />
            <span className="font-pixel text-xs text-[#ffebb3] truncate">
              {modeLabel} · 第 {tierNumber} 階里程碑
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-7 h-7 bg-[#3b1f0b] hover:bg-[#8b5a2b] text-[#ffebb3] flex items-center justify-center border border-[#a16207] cursor-pointer shrink-0"
            aria-label="關閉升級通知"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Popup Body */}
        <div className="p-5 text-center space-y-4 bg-gradient-to-b from-[#fffbeb] via-[#faeed1] to-[#f3deb3]">
          {/* Big Celebration Heading */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center justify-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🎉
              </span>
              <h2 className="font-pixel text-2xl sm:text-3xl font-black text-[#b45309] tracking-wide drop-shadow-[0_2px_0_rgba(255,255,255,0.85)]">
                恭喜升級！
              </h2>
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
            </div>
            <p className="text-sm font-bold text-[#5a3818]">
              【<span className="text-[#92400e] font-black">{studentName}</span>】積分達到{' '}
              <span className="inline-block px-2 py-0.5 bg-[#fef08a] border-2 border-[#ca8a04] font-pixel text-xs text-[#78350f] shadow-xs">
                {milestonePoints} 分
              </span>{' '}
              啦！
            </p>
          </div>

          {/* Unlocked Artwork Preview Card */}
          <div className="border-4 border-[#5a3818] bg-[#2b1807] overflow-hidden shadow-lg text-left">
            <div className="relative h-40 w-full bg-[#3b230d] flex items-center justify-center overflow-hidden">
              {unlockedImageUrl && !imgError ? (
                <img
                  src={unlockedImageUrl}
                  alt={unlockedTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 text-[#fde68a]">
                  <span className="text-4xl">{unlockedIcon}</span>
                  <span className="font-pixel text-xs">{unlockedTitle}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#eab308] text-[#4a2800] font-pixel text-[10px] font-black border border-[#78350f] shadow">
                NEW UNLOCKED!
              </div>
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-2 text-white">
                <span className="text-xl shrink-0">{unlockedIcon}</span>
                <span className="font-pixel text-xs sm:text-sm font-bold text-[#fef08a] truncate drop-shadow">
                  {unlockedTitle}
                </span>
              </div>
            </div>
            <div className="bg-[#fdf6e2] px-3 py-2.5 border-t-2 border-[#8b5a2b]">
              <p className="text-xs font-bold text-[#5a3818] leading-relaxed">
                {unlockedSubtitle}
              </p>
            </div>
          </div>

          {/* Confirm Action Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-2.5 px-4 pixel-btn-gold text-sm font-pixel font-black text-[#4a2800] border-2 border-[#78350f] flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#92400e]" />
            <span>太棒了！立即欣賞新空間</span>
          </button>
        </div>
      </div>
    </div>
  );
};
