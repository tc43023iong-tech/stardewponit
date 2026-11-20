import React from 'react';
import { LivingWareVisualTier } from '../../utils/livingRoomArtwork';
import { Sparkles, Tv } from 'lucide-react';

interface PixelTvSvgProps {
  tier: LivingWareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelTvSvg: React.FC<PixelTvSvgProps> = ({
  tier,
  size = 54,
  isUpgrading = false,
}) => {
  const paletteMap: Record<
    LivingWareVisualTier['tvStyle'],
    { frame: string; bezel: string; screen: string; glow: string; stand: string; accent?: string }
  > = {
    dim: { frame: '#57534e', bezel: '#44403c', screen: '#64748b', glow: '#94a3b8', stand: '#292524' },
    retro: { frame: '#92400e', bezel: '#b45309', screen: '#38bdf8', glow: '#bae6fd', stand: '#451a03' },
    wood: { frame: '#78350f', bezel: '#d97706', screen: '#4ade80', glow: '#fef08a', stand: '#451a03' },
    flat: { frame: '#1e293b', bezel: '#475569', screen: '#0ea5e9', glow: '#7dd3fc', stand: '#0f172a' },
    cinema: {
      frame: '#334155',
      bezel: '#f8fafc',
      screen: '#f97316',
      glow: '#fde047',
      stand: '#1e293b',
      accent: '#fb923c',
    },
    arcane: {
      frame: '#581c87',
      bezel: '#c084fc',
      screen: '#8b5cf6',
      glow: '#f0abfc',
      stand: '#3b0764',
      accent: '#e879f9',
    },
    royal: {
      frame: '#b45309',
      bezel: '#facc15',
      screen: '#38bdf8',
      glow: '#fef9c3',
      stand: '#78350f',
      accent: '#ef4444',
    },
    aurora: {
      frame: '#0e7490',
      bezel: '#67e8f9',
      screen: '#10b981',
      glow: '#a5f3fc',
      stand: '#164e63',
      accent: '#22d3ee',
    },
    cosmos: {
      frame: '#4338ca',
      bezel: '#fde047',
      screen: '#a855f7',
      glow: '#f9a8d4',
      stand: '#312e81',
      accent: '#f472b6',
    },
  };

  const p = paletteMap[tier.tvStyle];
  const scaledSize = Math.round(size * tier.tvScale);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        isUpgrading ? 'animate-kitchen-oven-grow' : ''
      }`}
      style={{ width: scaledSize, height: scaledSize }}
    >
      <svg
        viewBox="0 0 32 32"
        width={scaledSize}
        height={scaledSize}
        style={{ imageRendering: 'pixelated' }}
        aria-hidden="true"
      >
        {/* TV Antennas for retro / wood / dim */}
        {tier.tierIndex <= 1 && (
          <>
            <rect x="10" y="3" width="2" height="4" fill={p.bezel} />
            <rect x="20" y="3" width="2" height="4" fill={p.bezel} />
          </>
        )}

        {/* Outer TV Frame */}
        <rect x="3" y="7" width="26" height="17" fill={p.frame} />
        <rect x="4" y="8" width="24" height="15" fill={p.bezel} />

        {/* Screen Canvas */}
        <rect x="6" y="10" width="20" height="11" fill={p.screen} />

        {/* Screen Pixel Content */}
        {tier.tvStyle === 'dim' ? (
          <>
            <rect x="8" y="12" width="3" height="2" fill={p.glow} opacity="0.6" />
            <rect x="15" y="15" width="4" height="2" fill={p.glow} opacity="0.5" />
            <rect x="20" y="12" width="3" height="3" fill={p.glow} opacity="0.7" />
          </>
        ) : (
          <g className="animate-kitchen-flame">
            <rect x="8" y="12" width="4" height="3" fill={p.glow} />
            <rect x="14" y="13" width="6" height="4" fill="#ffffff" opacity="0.85" />
            <rect x="21" y="11" width="3" height="3" fill={p.glow} opacity="0.9" />
          </g>
        )}

        {/* Top Jewel / Star Ornament on high tiers */}
        {p.accent && (
          <>
            <rect x="14" y="5" width="4" height="3" fill={p.accent} />
            <rect x="15" y="6" width="2" height="1" fill="#ffffff" />
          </>
        )}

        {/* TV Base Stand */}
        <rect x="13" y="24" width="6" height="3" fill={p.stand} />
        <rect x="9" y="27" width="14" height="2" fill={p.frame} />
      </svg>
    </div>
  );
};

interface PixelConsoleSvgProps {
  tier: LivingWareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelConsoleSvg: React.FC<PixelConsoleSvgProps> = ({
  tier,
  size = 42,
  isUpgrading = false,
}) => {
  const colors: Record<
    LivingWareVisualTier['consoleStyle'],
    { body: string; pad: string; btn: string }
  > = {
    unplugged: { body: '#57534e', pad: '#44403c', btn: '#78716c' },
    board: { body: '#92400e', pad: '#fde68a', btn: '#ef4444' },
    famicom: { body: '#f8fafc', pad: '#dc2626', btn: '#facc15' },
    arcade: { body: '#312e81', pad: '#38bdf8', btn: '#f472b6' },
    karaoke: { body: '#db2777', pad: '#fbcfe8', btn: '#fde047' },
    crystal: { body: '#6d28d9', pad: '#e879f9', btn: '#22d3ee' },
    gold: { body: '#ca8a04', pad: '#fef08a', btn: '#ef4444' },
    prismatic: { body: '#0284c7', pad: '#67e8f9', btn: '#fde047' },
  };

  const c = colors[tier.consoleStyle];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        isUpgrading ? 'animate-kitchen-spatula-shine' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ imageRendering: 'pixelated' }}
        aria-hidden="true"
      >
        {/* Controller Cord */}
        <rect x="11" y="2" width="2" height="5" fill={c.pad} />
        {/* Gamepad Shell */}
        <rect x="3" y="7" width="18" height="10" fill={c.body} />
        <rect x="4" y="16" width="5" height="3" fill={c.body} />
        <rect x="15" y="16" width="5" height="3" fill={c.body} />
        {/* D-Pad */}
        <rect x="6" y="10" width="2" height="4" fill={c.pad} />
        <rect x="5" y="11" width="4" height="2" fill={c.pad} />
        {/* Action Buttons */}
        <rect x="15" y="10" width="2" height="2" fill={c.btn} />
        <rect x="17" y="12" width="2" height="2" fill={c.btn} />
        {/* Center Glow */}
        <rect x="11" y="12" width="2" height="1.5" fill={c.btn} />
      </svg>
    </div>
  );
};

interface PixelLivingRoomUpgradeFXProps {
  isActive: boolean;
  milestonePoints: number;
  tier: LivingWareVisualTier;
  onReplay?: () => void;
}

export const PixelLivingRoomUpgradeFX: React.FC<PixelLivingRoomUpgradeFXProps> = ({
  isActive,
  milestonePoints,
  tier,
  onReplay,
}) => {
  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        isActive
          ? 'bg-gradient-to-br from-[#2e1065]/95 via-[#581c87]/95 to-[#312e81]/95 border-[#f472b6] ring-2 ring-[#fde047] shadow-[0_0_24px_rgba(244,114,182,0.65)] px-3.5 py-2.5'
          : 'bg-[#251538]/88 border-[#c084fc]/60 px-3 py-2 shadow-lg hover:border-[#f472b6]'
      } backdrop-blur-xs`}
    >
      {isActive && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span
            className="animate-kitchen-spark absolute left-5 bottom-4 text-xs text-[#fde047]"
            style={{ '--sx': '-18px', '--sy': '-32px' } as React.CSSProperties}
          >
            🎮
          </span>
          <span
            className="animate-kitchen-spark absolute right-6 bottom-5 text-xs text-[#f472b6]"
            style={{ '--sx': '20px', '--sy': '-30px', animationDelay: '0.2s' } as React.CSSProperties}
          >
            ✦
          </span>
          <span
            className="animate-kitchen-spark absolute left-1/2 bottom-4 text-xs text-[#67e8f9]"
            style={{ '--sx': '6px', '--sy': '-38px', animationDelay: '0.35s' } as React.CSSProperties}
          >
            ✨
          </span>
        </div>
      )}

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-end gap-1 shrink-0 bg-black/35 px-2 py-1 rounded-lg border border-[#c084fc]/50">
          <PixelTvSvg tier={tier} size={isActive ? 44 : 38} isUpgrading={isActive} />
          <PixelConsoleSvg tier={tier} size={isActive ? 34 : 28} isUpgrading={isActive} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isActive ? (
              <span className="font-pixel text-[10px] bg-[#f472b6] text-white px-1.5 py-0.5 rounded font-black animate-pulse flex items-center gap-1">
                <Tv className="w-3 h-3" />
                影音升級！{milestonePoints}分特效
              </span>
            ) : (
              <span className="font-pixel text-[10px] bg-[#4c1d95] text-[#e9d5ff] px-1.5 py-0.5 rounded border border-[#c084fc]/60">
                {tier.tierLabel}
              </span>
            )}
            <span className="text-[11px] font-bold text-[#fae8ff] truncate">
              {tier.tvName} · {tier.consoleName}
            </span>
          </div>
          <p className="text-[10px] text-[#e9d5ff] line-clamp-1 mt-0.5">
            {isActive
              ? '✨ 電視螢幕變超大、遊樂主機全面進化閃耀歡樂光芒！'
              : tier.upgradeNote}
          </p>
        </div>

        {onReplay && !isActive && (
          <button
            type="button"
            onClick={onReplay}
            className="ml-auto shrink-0 px-2 py-1 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-[#faf5ff] text-[10px] font-bold flex items-center gap-1 border border-[#e9d5ff]/50 cursor-pointer active:scale-95"
            title="播放像素電視與遊樂機進化特效"
          >
            <Sparkles className="w-3 h-3 text-[#fde047]" />
            <span className="hidden sm:inline">設備特效</span>
          </button>
        )}
      </div>
    </div>
  );
};
