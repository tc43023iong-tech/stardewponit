import React from 'react';
import { BathwareVisualTier } from '../../utils/bathroomArtwork';
import { Sparkles, Droplets } from 'lucide-react';

interface PixelBathtubSvgProps {
  tier: BathwareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelBathtubSvg: React.FC<PixelBathtubSvgProps> = ({
  tier,
  size = 56,
  isUpgrading = false,
}) => {
  const paletteMap: Record<
    BathwareVisualTier['tubStyle'],
    { outer: string; rim: string; water: string; foam: string; feet: string; gem?: string }
  > = {
    foggy: { outer: '#57534e', rim: '#78716c', water: '#475569', foam: '#94a3b8', feet: '#292524' },
    wooden: { outer: '#92400e', rim: '#d97706', water: '#38bdf8', foam: '#bae6fd', feet: '#451a03' },
    mint: { outer: '#10b981', rim: '#a7f3d0', water: '#22d3ee', foam: '#ffffff', feet: '#065f46' },
    bubble: { outer: '#f8fafc', rim: '#93c5fd', water: '#38bdf8', foam: '#ffffff', feet: '#f59e0b' },
    copper: { outer: '#d97706', rim: '#fde68a', water: '#f472b6', foam: '#fbcfe8', feet: '#78350f' },
    amethyst: {
      outer: '#6d28d9',
      rim: '#ddd6fe',
      water: '#818cf8',
      foam: '#e9d5ff',
      feet: '#4c1d95',
      gem: '#e879f9',
    },
    royal: {
      outer: '#f8fafc',
      rim: '#facc15',
      water: '#38bdf8',
      foam: '#fef08a',
      feet: '#b45309',
      gem: '#ef4444',
    },
    aurora: {
      outer: '#0e7490',
      rim: '#67e8f9',
      water: '#2dd4bf',
      foam: '#ccfbf1',
      feet: '#164e63',
      gem: '#a5f3fc',
    },
    cosmos: {
      outer: '#4338ca',
      rim: '#fde047',
      water: '#a855f7',
      foam: '#f5d0fe',
      feet: '#312e81',
      gem: '#f472b6',
    },
  };

  const p = paletteMap[tier.tubStyle];
  const scaledSize = Math.round(size * tier.tubScale);

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
        {/* Rising pixel bubbles for non-foggy tiers */}
        {tier.tubStyle !== 'foggy' && (
          <g className="animate-kitchen-flame">
            <rect x="8" y="6" width="2" height="2" fill={p.foam} opacity="0.85" />
            <rect x="15" y="4" width="3" height="3" fill="#ffffff" opacity="0.9" />
            <rect x="22" y="7" width="2" height="2" fill={p.foam} opacity="0.8" />
          </g>
        )}
        {/* Water surface & bubbles inside rim */}
        <rect x="5" y="13" width="22" height="4" fill={p.water} />
        <rect x="6" y="12" width="5" height="2" fill={p.foam} />
        <rect x="13" y="11" width="6" height="3" fill={p.foam} />
        <rect x="20" y="12" width="5" height="2" fill={p.foam} />
        {/* Tiny rubber duck pixel accent for tier >= 2 */}
        {tier.tierIndex >= 2 && (
          <>
            <rect x="15" y="10" width="3" height="2" fill="#facc15" />
            <rect x="17" y="10" width="1" height="1" fill="#f97316" />
          </>
        )}
        {/* Tub rim */}
        <rect x="3" y="14" width="26" height="3" fill={p.rim} />
        {/* Main Tub Body */}
        <rect x="4" y="17" width="24" height="8" fill={p.outer} />
        <rect x="6" y="25" width="20" height="2" fill={p.outer} />
        {/* Pixel gloss highlight */}
        <rect x="6" y="18" width="20" height="2" fill="rgba(255,255,255,0.24)" />
        {/* Tub Faucet on right */}
        <rect x="25" y="9" width="2" height="6" fill={p.feet} />
        <rect x="22" y="9" width="4" height="2" fill={p.rim} />
        {/* Clawfoot Legs */}
        <rect x="6" y="26" width="4" height="3" fill={p.feet} />
        <rect x="22" y="26" width="4" height="3" fill={p.feet} />
        {/* Center Gem / Crest for luxury tiers */}
        {p.gem && (
          <>
            <rect x="14" y="19" width="4" height="3" fill={p.gem} />
            <rect x="15" y="20" width="2" height="1" fill="#ffffff" />
          </>
        )}
      </svg>
    </div>
  );
};

interface PixelShowerheadSvgProps {
  tier: BathwareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelShowerheadSvg: React.FC<PixelShowerheadSvgProps> = ({
  tier,
  size = 44,
  isUpgrading = false,
}) => {
  const colors: Record<
    BathwareVisualTier['showerStyle'],
    { pipe: string; head: string; spray: string }
  > = {
    leaky: { pipe: '#78716c', head: '#57534e', spray: '#94a3b8' },
    wooden: { pipe: '#92400e', head: '#d97706', spray: '#38bdf8' },
    porcelain: { pipe: '#cbd5e1', head: '#f8fafc', spray: '#60a5fa' },
    brass: { pipe: '#d97706', head: '#fde047', spray: '#38bdf8' },
    amethyst: { pipe: '#7c3aed', head: '#e879f9', spray: '#c084fc' },
    gold: { pipe: '#ca8a04', head: '#fef08a', spray: '#67e8f9' },
    prismatic: { pipe: '#6366f1', head: '#f472b6', spray: '#a5f3fc' },
  };

  const c = colors[tier.showerStyle];

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
        {/* Pipe arm */}
        <rect x="4" y="4" width="12" height="2.5" fill={c.pipe} />
        <rect x="4" y="4" width="2.5" height="14" fill={c.pipe} />
        {/* Valve */}
        <rect x="2" y="13" width="5" height="2" fill={c.head} />
        {/* Rainfall Shower Head */}
        <rect x="13" y="6" width="6" height="2" fill={c.pipe} />
        <rect x="11" y="8" width="10" height="3" fill={c.head} />
        {/* Water Spray Droplets */}
        {tier.showerStyle !== 'leaky' ? (
          <g className="animate-kitchen-flame">
            <rect x="12" y="13" width="1.5" height="3" fill={c.spray} />
            <rect x="15" y="15" width="1.5" height="3" fill={c.spray} />
            <rect x="18" y="13" width="1.5" height="3" fill={c.spray} />
            <rect x="13.5" y="18" width="1.5" height="3" fill={c.spray} />
            <rect x="17" y="18" width="1.5" height="3" fill={c.spray} />
          </g>
        ) : (
          <rect x="15" y="14" width="2" height="3" fill={c.spray} />
        )}
      </svg>
    </div>
  );
};

interface PixelBathwareUpgradeFXProps {
  isActive: boolean;
  milestonePoints: number;
  tier: BathwareVisualTier;
  onReplay?: () => void;
}

export const PixelBathwareUpgradeFX: React.FC<PixelBathwareUpgradeFXProps> = ({
  isActive,
  milestonePoints,
  tier,
  onReplay,
}) => {
  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        isActive
          ? 'bg-gradient-to-br from-[#0f2942]/95 via-[#164e63]/95 to-[#0f2942]/95 border-[#67e8f9] ring-2 ring-[#22d3ee] shadow-[0_0_24px_rgba(34,211,238,0.65)] px-3.5 py-2.5'
          : 'bg-[#172536]/88 border-[#38bdf8]/60 px-3 py-2 shadow-lg hover:border-[#67e8f9]'
      } backdrop-blur-xs`}
    >
      {/* Active Pixel Sparkles */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span
            className="animate-kitchen-spark absolute left-5 bottom-4 text-xs text-[#a5f3fc]"
            style={{ '--sx': '-18px', '--sy': '-32px' } as React.CSSProperties}
          >
            🫧
          </span>
          <span
            className="animate-kitchen-spark absolute right-6 bottom-5 text-xs text-[#fde047]"
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
        {/* Live Pixel Bathtub & Showerhead Pair */}
        <div className="flex items-end gap-1 shrink-0 bg-black/35 px-2 py-1 rounded-lg border border-[#38bdf8]/50">
          <PixelBathtubSvg tier={tier} size={isActive ? 44 : 38} isUpgrading={isActive} />
          <PixelShowerheadSvg tier={tier} size={isActive ? 36 : 30} isUpgrading={isActive} />
        </div>

        {/* Bathware Status Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isActive ? (
              <span className="font-pixel text-[10px] bg-[#22d3ee] text-[#082f49] px-1.5 py-0.5 rounded font-black animate-pulse flex items-center gap-1">
                <Droplets className="w-3 h-3" />
                浴具升級！{milestonePoints}分特效
              </span>
            ) : (
              <span className="font-pixel text-[10px] bg-[#0c4a6e] text-[#bae6fd] px-1.5 py-0.5 rounded border border-[#38bdf8]/60">
                {tier.tierLabel}
              </span>
            )}
            <span className="text-[11px] font-bold text-[#e0f2fe] truncate">
              {tier.tubName} · {tier.showerName}
            </span>
          </div>
          <p className="text-[10px] text-[#bae6fd] line-clamp-1 mt-0.5">
            {isActive
              ? '✨ 浴缸變寬大豪華、花灑升級閃耀清新光澤！'
              : tier.upgradeNote}
          </p>
        </div>

        {onReplay && !isActive && (
          <button
            type="button"
            onClick={onReplay}
            className="ml-auto shrink-0 px-2 py-1 rounded-lg bg-[#0369a1] hover:bg-[#0284c7] text-[#e0f2fe] text-[10px] font-bold flex items-center gap-1 border border-[#7dd3fc]/50 cursor-pointer active:scale-95"
            title="播放像素浴具升級進化特效"
          >
            <Sparkles className="w-3 h-3 text-[#fde047]" />
            <span className="hidden sm:inline">浴具特效</span>
          </button>
        )}
      </div>
    </div>
  );
};
