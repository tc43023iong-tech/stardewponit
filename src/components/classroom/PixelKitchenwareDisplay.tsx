import React from 'react';
import { KitchenwareVisualTier } from '../../utils/kitchenArtwork';
import { Sparkles, Flame } from 'lucide-react';

interface PixelOvenSvgProps {
  tier: KitchenwareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelOvenSvg: React.FC<PixelOvenSvgProps> = ({
  tier,
  size = 56,
  isUpgrading = false,
}) => {
  const paletteMap: Record<
    KitchenwareVisualTier['ovenStyle'],
    { body: string; trim: string; door: string; fire: string; chimney: string; gem?: string }
  > = {
    sooty: { body: '#57534e', trim: '#292524', door: '#1c1917', fire: '#44403c', chimney: '#44403c' },
    iron: { body: '#52525b', trim: '#27272a', door: '#3f3f46', fire: '#f97316', chimney: '#3f3f46' },
    country: { body: '#4d7c0f', trim: '#78350f', door: '#fef08a', fire: '#fb923c', chimney: '#713f12' },
    brick: { body: '#b91c1c', trim: '#7f1d1d', door: '#fbbf24', fire: '#f97316', chimney: '#991b1b' },
    copper: { body: '#d97706', trim: '#78350f', door: '#fde047', fire: '#fb7185', chimney: '#b45309' },
    arcane: {
      body: '#6d28d9',
      trim: '#4c1d95',
      door: '#c4b5fd',
      fire: '#a855f7',
      chimney: '#5b21b6',
      gem: '#e879f9',
    },
    royal: {
      body: '#eab308',
      trim: '#854d0e',
      door: '#fef08a',
      fire: '#f59e0b',
      chimney: '#ca8a04',
      gem: '#ef4444',
    },
    aurora: {
      body: '#0891b2',
      trim: '#164e63',
      door: '#a5f3fc',
      fire: '#22d3ee',
      chimney: '#0e7490',
      gem: '#67e8f9',
    },
    cosmos: {
      body: '#4f46e5',
      trim: '#fde047',
      door: '#f0abfc',
      fire: '#38bdf8',
      chimney: '#6366f1',
      gem: '#f472b6',
    },
  };

  const p = paletteMap[tier.ovenStyle];
  const scaledSize = Math.round(size * tier.ovenScale);

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
        {/* Pixel Chimney Pipe */}
        <rect x="13" y="2" width="6" height="6" fill={p.chimney} />
        <rect x="12" y="2" width="8" height="2" fill={p.trim} />
        {/* Oven Crown / Top */}
        <rect x="4" y="8" width="24" height="3" fill={p.trim} />
        {/* Main Oven Body */}
        <rect x="5" y="11" width="22" height="17" fill={p.body} />
        {/* Pixel Highlight Top-Left */}
        <rect x="6" y="12" width="20" height="2" fill="rgba(255,255,255,0.22)" />
        {/* Side Frame & Legs */}
        <rect x="4" y="11" width="2" height="17" fill={p.trim} />
        <rect x="26" y="11" width="2" height="17" fill={p.trim} />
        <rect x="5" y="28" width="4" height="3" fill={p.trim} />
        <rect x="23" y="28" width="4" height="3" fill={p.trim} />
        <rect x="4" y="27" width="24" height="2" fill={p.trim} />
        {/* Top Control Knobs (upgrade tiers >= country get extra knobs) */}
        <rect x="7" y="12" width="2" height="2" fill="#fde047" />
        <rect x="11" y="12" width="2" height="2" fill="#fde047" />
        {tier.tierIndex >= 2 && (
          <>
            <rect x="19" y="12" width="2" height="2" fill="#fde047" />
            <rect x="23" y="12" width="2" height="2" fill="#fde047" />
          </>
        )}
        {/* Oven Glowing Hearth Window */}
        <rect x="8" y="16" width="16" height="9" fill="#1c1917" />
        <rect x="9" y="17" width="14" height="7" fill={p.door} opacity="0.28" />
        {/* Inner Animated Pixel Flame */}
        {tier.ovenStyle !== 'sooty' && (
          <g className="animate-kitchen-flame">
            <rect x="11" y="21" width="10" height="3" fill={p.fire} />
            <rect x="12" y="19" width="3" height="4" fill="#fde047" />
            <rect x="17" y="18" width="3" height="5" fill="#fde047" />
            <rect x="14" y="17" width="4" height="6" fill="#fef9c3" />
          </g>
        )}
        {/* Oven Handle */}
        <rect x="10" y="15" width="12" height="1.5" fill="#fef3c7" />
        {/* Prestige Gem / Stardrop Crest for higher tiers */}
        {p.gem && (
          <>
            <rect x="14" y="11" width="4" height="3" fill={p.gem} />
            <rect x="15" y="12" width="2" height="1" fill="#ffffff" />
          </>
        )}
      </svg>
    </div>
  );
};

interface PixelSpatulaSvgProps {
  tier: KitchenwareVisualTier;
  size?: number;
  isUpgrading?: boolean;
}

export const PixelSpatulaSvg: React.FC<PixelSpatulaSvgProps> = ({
  tier,
  size = 44,
  isUpgrading = false,
}) => {
  const bladeColors: Record<
    KitchenwareVisualTier['spatulaStyle'],
    { blade: string; edge: string; handle: string; pommel: string }
  > = {
    wooden: { blade: '#b45309', edge: '#d97706', handle: '#78350f', pommel: '#451a03' },
    steel: { blade: '#cbd5e1', edge: '#f8fafc', handle: '#78350f', pommel: '#e2e8f0' },
    copper: { blade: '#f59e0b', edge: '#fde68a', handle: '#7c2d12', pommel: '#fbbf24' },
    arcane: { blade: '#a855f7', edge: '#f0abfc', handle: '#312e81', pommel: '#e879f9' },
    gold: { blade: '#facc15', edge: '#fef9c3', handle: '#92400e', pommel: '#fde047' },
    iridium: { blade: '#8b5cf6', edge: '#67e8f9', handle: '#1e1b4b', pommel: '#22d3ee' },
    prismatic: { blade: '#f472b6', edge: '#fef08a', handle: '#312e81', pommel: '#38bdf8' },
  };

  const c = bladeColors[tier.spatulaStyle];

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
        {/* Pixel Blade (Slotted Turner) */}
        <rect x="11" y="2" width="10" height="8" fill={c.edge} />
        <rect x="12" y="3" width="8" height="6" fill={c.blade} />
        {/* Blade Slots */}
        <rect x="14" y="4" width="1.5" height="4" fill="#1e293b" opacity="0.45" />
        <rect x="17" y="4" width="1.5" height="4" fill="#1e293b" opacity="0.45" />
        {/* Neck */}
        <rect x="10" y="9" width="3" height="3" fill={c.edge} />
        <rect x="8" y="11" width="3" height="3" fill={c.blade} />
        {/* Handle */}
        <rect x="6" y="13" width="3" height="3" fill={c.handle} />
        <rect x="4" y="15" width="3" height="3" fill={c.handle} />
        <rect x="2" y="17" width="3" height="4" fill={c.pommel} />
        {/* Prismatic / Enchantment Pixel Stars */}
        {(tier.tierIndex >= 4) && (
          <>
            <rect x="19" y="1" width="2" height="2" fill="#fef08a" />
            <rect x="9" y="4" width="2" height="2" fill="#67e8f9" />
          </>
        )}
      </svg>
    </div>
  );
};

interface PixelKitchenwareUpgradeFXProps {
  isActive: boolean;
  milestonePoints: number;
  tier: KitchenwareVisualTier;
  onReplay?: () => void;
}

export const PixelKitchenwareUpgradeFX: React.FC<PixelKitchenwareUpgradeFXProps> = ({
  isActive,
  milestonePoints,
  tier,
  onReplay,
}) => {
  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        isActive
          ? 'bg-gradient-to-br from-[#2b1807]/95 via-[#4a2800]/95 to-[#2b1807]/95 border-[#fde047] ring-2 ring-[#fbbf24] shadow-[0_0_24px_rgba(250,204,21,0.7)] px-3.5 py-2.5'
          : 'bg-[#2b1807]/88 border-[#8b5a2b] px-3 py-2 shadow-lg hover:border-[#fbbf24]'
      } backdrop-blur-xs`}
    >
      {/* Active Pixel Upgrade Sparkles */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span
            className="animate-kitchen-spark absolute left-5 bottom-4 text-xs text-[#fde047]"
            style={{ '--sx': '-18px', '--sy': '-32px' } as React.CSSProperties}
          >
            ✦
          </span>
          <span
            className="animate-kitchen-spark absolute right-6 bottom-5 text-xs text-[#38bdf8]"
            style={{ '--sx': '20px', '--sy': '-30px', animationDelay: '0.2s' } as React.CSSProperties}
          >
            ★
          </span>
          <span
            className="animate-kitchen-spark absolute left-1/2 bottom-4 text-xs text-[#fb923c]"
            style={{ '--sx': '6px', '--sy': '-38px', animationDelay: '0.35s' } as React.CSSProperties}
          >
            ✨
          </span>
        </div>
      )}

      <div className="relative z-10 flex items-center gap-3">
        {/* Live Pixel Oven & Spatula Visual Pair */}
        <div className="flex items-end gap-1 shrink-0 bg-black/35 px-2 py-1 rounded-lg border border-[#a16207]/60">
          <PixelOvenSvg tier={tier} size={isActive ? 44 : 38} isUpgrading={isActive} />
          <PixelSpatulaSvg tier={tier} size={isActive ? 36 : 30} isUpgrading={isActive} />
        </div>

        {/* Kitchenware Status Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isActive ? (
              <span className="font-pixel text-[10px] bg-[#eab308] text-[#4a2800] px-1.5 py-0.5 rounded font-black animate-pulse flex items-center gap-1">
                <Flame className="w-3 h-3" />
                廚具升級！{milestonePoints}分特效
              </span>
            ) : (
              <span className="font-pixel text-[10px] bg-[#5a3818] text-[#fde047] px-1.5 py-0.5 rounded border border-[#a16207]">
                {tier.ovenTierLabel}
              </span>
            )}
            <span className="text-[11px] font-bold text-[#ffebb3] truncate">
              {tier.ovenName} · {tier.spatulaName}
            </span>
          </div>
          <p className="text-[10px] text-[#fed7aa] line-clamp-1 mt-0.5">
            {isActive
              ? '✨ 烤箱長大變氣派、鍋鏟進化閃耀高級光澤！'
              : tier.upgradeNote}
          </p>
        </div>

        {onReplay && !isActive && (
          <button
            type="button"
            onClick={onReplay}
            className="ml-auto shrink-0 px-2 py-1 rounded-lg bg-[#9a3412] hover:bg-[#c2410c] text-[#ffedd5] text-[10px] font-bold flex items-center gap-1 border border-[#fdba74]/50 cursor-pointer active:scale-95"
            title="播放像素廚具升級進化特效"
          >
            <Sparkles className="w-3 h-3 text-[#fde047]" />
            <span className="hidden sm:inline">廚具特效</span>
          </button>
        )}
      </div>
    </div>
  );
};
