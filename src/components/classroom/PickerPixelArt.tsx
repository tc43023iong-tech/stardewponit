import React, { useState, useEffect } from 'react';
import { FishRewardItem, GemRewardItem } from '../../data/pickerRewards';

export type FishingPhase = 'idle' | 'casting' | 'waiting' | 'bite' | 'revealed';

export type MineRockContent = 'gem' | 'stone' | 'bat';

export interface MineRockState {
  index: number;
  content: MineRockContent;
  opened: boolean;
}

export const PixelDiceIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`shrink-0 ${className}`}
  >
    <rect x="4" y="4" width="16" height="16" fill="#fef3c7" />
    <rect x="3" y="4" width="1" height="16" fill="#78350f" />
    <rect x="20" y="4" width="1" height="16" fill="#78350f" />
    <rect x="4" y="3" width="16" height="1" fill="#78350f" />
    <rect x="4" y="20" width="16" height="1" fill="#78350f" />
    <rect x="4" y="18" width="16" height="2" fill="#f59e0b" />
    {/* Pips */}
    <rect x="7" y="7" width="2" height="2" fill="#92400e" />
    <rect x="15" y="7" width="2" height="2" fill="#92400e" />
    <rect x="11" y="11" width="2" height="2" fill="#dc2626" />
    <rect x="7" y="15" width="2" height="2" fill="#92400e" />
    <rect x="15" y="15" width="2" height="2" fill="#92400e" />
  </svg>
);

export const PixelFishingRodIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`shrink-0 ${className}`}
  >
    {/* Wooden Rod Handle & Pole */}
    <rect x="3" y="18" width="3" height="3" fill="#78350f" />
    <rect x="5" y="15" width="3" height="3" fill="#b45309" />
    <rect x="8" y="12" width="3" height="3" fill="#d97706" />
    <rect x="11" y="9" width="3" height="3" fill="#d97706" />
    <rect x="14" y="6" width="3" height="3" fill="#fbbf24" />
    <rect x="17" y="4" width="3" height="2" fill="#fef08a" />
    {/* Line */}
    <rect x="19" y="6" width="1" height="8" fill="#bae6fd" />
    {/* Bobber */}
    <rect x="18" y="14" width="3" height="2" fill="#ef4444" />
    <rect x="18" y="16" width="3" height="2" fill="#f8fafc" />
    <rect x="17" y="19" width="5" height="1" fill="#38bdf8" />
  </svg>
);

export const PixelPickaxeIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`shrink-0 ${className}`}
  >
    {/* Handle */}
    <rect x="4" y="18" width="3" height="3" fill="#78350f" />
    <rect x="6" y="16" width="3" height="3" fill="#92400e" />
    <rect x="8" y="14" width="3" height="3" fill="#b45309" />
    <rect x="10" y="12" width="3" height="3" fill="#b45309" />
    <rect x="12" y="10" width="3" height="3" fill="#92400e" />
    {/* Pickaxe Steel/Iridium Head */}
    <rect x="9" y="4" width="7" height="3" fill="#94a3b8" />
    <rect x="15" y="6" width="3" height="3" fill="#64748b" />
    <rect x="17" y="9" width="3" height="5" fill="#475569" />
    <rect x="6" y="5" width="3" height="2" fill="#cbd5e1" />
    <rect x="14" y="5" width="2" height="2" fill="#e2e8f0" />
  </svg>
);

export const PixelBatSprite: React.FC<{ size?: number; className?: string }> = ({
  size = 56,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    shapeRendering="crispEdges"
    className={`shrink-0 ${className}`}
  >
    {/* Left Wing */}
    <rect x="2" y="8" width="4" height="2" fill="#6d28d9" />
    <rect x="1" y="10" width="6" height="3" fill="#7c3aed" />
    <rect x="3" y="13" width="3" height="2" fill="#5b21b6" />
    {/* Right Wing */}
    <rect x="18" y="8" width="4" height="2" fill="#6d28d9" />
    <rect x="17" y="10" width="6" height="3" fill="#7c3aed" />
    <rect x="18" y="13" width="3" height="2" fill="#5b21b6" />
    {/* Ears */}
    <rect x="8" y="5" width="2" height="3" fill="#4c1d95" />
    <rect x="14" y="5" width="2" height="3" fill="#4c1d95" />
    <rect x="9" y="6" width="1" height="2" fill="#f472b6" />
    <rect x="14" y="6" width="1" height="2" fill="#f472b6" />
    {/* Round Body */}
    <rect x="7" y="8" width="10" height="9" fill="#5b21b6" />
    <rect x="8" y="7" width="8" height="10" fill="#6d28d9" />
    {/* Cute Face */}
    <rect x="9" y="10" width="2" height="2" fill="#fef08a" />
    <rect x="13" y="10" width="2" height="2" fill="#fef08a" />
    <rect x="10" y="11" width="1" height="1" fill="#1e1b4b" />
    <rect x="13" y="11" width="1" height="1" fill="#1e1b4b" />
    {/* Blush */}
    <rect x="8" y="12" width="1" height="1" fill="#f472b6" />
    <rect x="15" y="12" width="1" height="1" fill="#f472b6" />
    {/* Friendly Smile */}
    <rect x="10" y="14" width="4" height="1" fill="#fde68a" />
  </svg>
);

export const RewardPixelIcon: React.FC<{
  imageUrl?: string;
  name: string;
  type: 'fish' | 'gem';
  size?: number;
  className?: string;
}> = ({ imageUrl, name, type, size = 64, className = '' }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [imageUrl]);

  if (imageUrl && !failed) {
    return (
      <img
        src={imageUrl}
        alt={name}
        referrerPolicy="no-referrer"
        className={`object-contain select-none pointer-events-none ${className}`}
        style={{ width: size, height: size, imageRendering: 'pixelated' }}
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback 16-bit pixel SVG
  if (type === 'fish') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        shapeRendering="crispEdges"
        className={`shrink-0 ${className}`}
      >
        <rect x="4" y="9" width="3" height="6" fill="#0284c7" />
        <rect x="7" y="7" width="10" height="10" fill="#38bdf8" />
        <rect x="17" y="9" width="3" height="6" fill="#0ea5e9" />
        <rect x="10" y="5" width="4" height="2" fill="#fbbf24" />
        <rect x="16" y="10" width="2" height="2" fill="#0f172a" />
        <rect x="9" y="11" width="5" height="2" fill="#bae6fd" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      shapeRendering="crispEdges"
      className={`shrink-0 ${className}`}
    >
      <rect x="8" y="4" width="8" height="3" fill="#67e8f9" />
      <rect x="5" y="7" width="14" height="4" fill="#22d3ee" />
      <rect x="7" y="11" width="10" height="4" fill="#06b6d4" />
      <rect x="9" y="15" width="6" height="3" fill="#0891b2" />
      <rect x="11" y="18" width="2" height="2" fill="#0e7490" />
      <rect x="8" y="7" width="3" height="2" fill="#ecfeff" />
    </svg>
  );
};

interface PixelPondSceneProps {
  timeOfDay: 'dawn' | 'day' | 'sunset' | 'night';
  phase: FishingPhase;
  caughtFish: FishRewardItem | null;
}

export const PixelPondScene: React.FC<PixelPondSceneProps> = ({
  timeOfDay,
  phase,
  caughtFish,
}) => {
  const palette = {
    dawn: {
      skyTop: '#4c1d95',
      skyMid: '#db2777',
      skyLow: '#fbcfe8',
      sunColor: '#fde047',
      hillFar: '#475569',
      hillNear: '#15803d',
      waterTop: '#3b82f6',
      waterMid: '#1d4ed8',
      waterDeep: '#1e3a8a',
      shimmer: '#fed7aa',
      label: '清晨池塘',
    },
    day: {
      skyTop: '#0284c7',
      skyMid: '#38bdf8',
      skyLow: '#bae6fd',
      sunColor: '#fde047',
      hillFar: '#16a34a',
      hillNear: '#15803d',
      waterTop: '#0ea5e9',
      waterMid: '#0284c7',
      waterDeep: '#0369a1',
      shimmer: '#e0f2fe',
      label: '白晝池塘',
    },
    sunset: {
      skyTop: '#4338ca',
      skyMid: '#ea580c',
      skyLow: '#fdba74',
      sunColor: '#fb923c',
      hillFar: '#7c2d12',
      hillNear: '#365314',
      waterTop: '#0f766e',
      waterMid: '#115e59',
      waterDeep: '#134e4a',
      shimmer: '#fde68a',
      label: '黃昏池塘',
    },
    night: {
      skyTop: '#020617',
      skyMid: '#0f172a',
      skyLow: '#1e1b4b',
      sunColor: '#fef9c3',
      hillFar: '#064e3b',
      hillNear: '#022c22',
      waterTop: '#0f172a',
      waterMid: '#0c4a6e',
      waterDeep: '#082f49',
      shimmer: '#7dd3fc',
      label: '星夜池塘',
    },
  }[timeOfDay];

  const isBobberInWater = phase === 'waiting' || phase === 'bite';
  const showFishShadow = phase === 'waiting' || phase === 'bite';

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-4 border-[#5a3818] shadow-inner select-none">
      {/* 16-bit Pixel Pond Backdrop SVG */}
      <svg
        viewBox="0 0 320 140"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="w-full h-full block"
      >
        {/* Sky Banding */}
        <rect x="0" y="0" width="320" height="22" fill={palette.skyTop} />
        <rect x="0" y="22" width="320" height="24" fill={palette.skyMid} />
        <rect x="0" y="46" width="320" height="20" fill={palette.skyLow} />

        {/* Night Stars or Daytime Pixel Clouds */}
        {timeOfDay === 'night' ? (
          <g fill="#fef9c3">
            <rect x="28" y="10" width="2" height="2" />
            <rect x="74" y="18" width="2" height="2" />
            <rect x="116" y="8" width="2" height="2" />
            <rect x="165" y="15" width="2" height="2" />
            <rect x="210" y="11" width="2" height="2" />
            <rect x="242" y="24" width="2" height="2" />
            <rect x="292" y="12" width="2" height="2" />
            {/* Pixel Crescent Moon */}
            <rect x="262" y="12" width="12" height="12" fill={palette.sunColor} />
            <rect x="268" y="10" width="8" height="10" fill={palette.skyTop} />
          </g>
        ) : (
          <g>
            {/* Sun */}
            <rect x="258" y="12" width="16" height="16" fill={palette.sunColor} />
            <rect x="254" y="16" width="24" height="8" fill={palette.sunColor} />
            {/* Clouds */}
            <rect x="44" y="14" width="34" height="8" fill="#ffffff" opacity="0.82" />
            <rect x="52" y="10" width="18" height="4" fill="#ffffff" opacity="0.82" />
            <rect x="150" y="20" width="42" height="7" fill="#ffffff" opacity="0.72" />
            <rect x="160" y="16" width="22" height="4" fill="#ffffff" opacity="0.72" />
          </g>
        )}

        {/* Distant Hills & Pine Silhouettes */}
        <rect x="0" y="54" width="320" height="12" fill={palette.hillFar} />
        <rect x="12" y="42" width="14" height="16" fill={palette.hillNear} />
        <rect x="16" y="36" width="6" height="6" fill={palette.hillNear} />
        <rect x="275" y="40" width="18" height="20" fill={palette.hillNear} />
        <rect x="280" y="34" width="8" height="6" fill={palette.hillNear} />
        <rect x="296" y="45" width="16" height="15" fill={palette.hillNear} />

        {/* Grassy Shoreline Bank */}
        <rect x="0" y="62" width="320" height="8" fill={palette.hillNear} />
        <rect x="0" y="68" width="320" height="4" fill="#4d7c0f" />

        {/* Pond Water Layers */}
        <rect x="0" y="72" width="320" height="18" fill={palette.waterTop} />
        <rect x="0" y="90" width="320" height="26" fill={palette.waterMid} />
        <rect x="0" y="116" width="320" height="24" fill={palette.waterDeep} />

        {/* Pixel Water Shimmer Lines */}
        <g fill={palette.shimmer} opacity="0.45">
          <rect x="110" y="78" width="18" height="2" />
          <rect x="210" y="84" width="22" height="2" />
          <rect x="145" y="102" width="26" height="2" />
          <rect x="255" y="110" width="16" height="2" />
          <rect x="88" y="122" width="24" height="2" />
        </g>

        {/* Lilypads & Cattails */}
        <rect x="236" y="96" width="14" height="5" fill="#16a34a" />
        <rect x="242" y="96" width="4" height="2" fill={palette.waterMid} />
        <rect x="272" y="84" width="12" height="4" fill="#22c55e" />
        <rect x="296" y="58" width="2" height="18" fill="#166534" />
        <rect x="295" y="54" width="4" height="6" fill="#78350f" />
        <rect x="304" y="61" width="2" height="16" fill="#166534" />

        {/* Wooden Fishing Pier on the Left */}
        <rect x="0" y="68" width="76" height="8" fill="#92400e" />
        <rect x="0" y="70" width="76" height="2" fill="#b45309" />
        <rect x="18" y="76" width="5" height="20" fill="#543310" />
        <rect x="58" y="76" width="5" height="22" fill="#543310" />

        {/* Pixel Farmer Silhouette / Angler Holding Rod on Pier */}
        <rect x="36" y="45" width="10" height="7" fill="#2563eb" />
        <rect x="34" y="48" width="14" height="2" fill="#1d4ed8" />
        <rect x="37" y="52" width="8" height="5" fill="#fed7aa" />
        <rect x="35" y="57" width="12" height="7" fill="#b45309" />
        <rect x="36" y="64" width="4" height="4" fill="#1e3a8a" />
        <rect x="42" y="64" width="4" height="4" fill="#1e3a8a" />

        {/* Fishing Rod Pole */}
        <line
          x1="47"
          y1="60"
          x2={phase === 'casting' ? '82' : '94'}
          y2={phase === 'casting' ? '32' : '38'}
          stroke="#d97706"
          strokeWidth="2.5"
        />

        {/* Fishing Line */}
        {phase !== 'idle' && (
          <line
            x1={phase === 'casting' ? '82' : '94'}
            y1={phase === 'casting' ? '32' : '38'}
            x2="176"
            y2={phase === 'revealed' ? '58' : phase === 'bite' ? '99' : '94'}
            stroke="#e0f2fe"
            strokeWidth="1"
            strokeDasharray={phase === 'casting' ? '2 2' : undefined}
          />
        )}
      </svg>

      {/* Nighttime Fireflies */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-1/3 w-2 h-2 bg-lime-300 shadow-[0_0_8px_#bef264] animate-firefly-float" />
          <div className="absolute top-20 right-1/4 w-2 h-2 bg-amber-300 shadow-[0_0_8px_#fcd34d] animate-firefly-blink" />
          <div className="absolute bottom-14 right-1/3 w-1.5 h-1.5 bg-lime-200 shadow-[0_0_6px_#d9f99d] animate-firefly-float" />
        </div>
      )}

      {/* Time-of-Day Pill Label */}
      <div className="absolute top-2.5 left-3 px-2.5 py-1 rounded bg-[#2b1807]/80 border border-[#8b5a2b] text-[11px] font-pixel text-[#ffebb3] shadow">
        {palette.label}
      </div>

      {/* Underwater Swimming Fish Shadow (1-2s waiting -> approaches bobber) */}
      {showFishShadow && (
        <div className="absolute left-[50%] top-[67%] -translate-x-1/2 pointer-events-none">
          <div className="animate-fish-shadow">
            <svg width="46" height="22" viewBox="0 0 24 12" shapeRendering="crispEdges">
              <rect x="2" y="4" width="3" height="4" fill="#082f49" opacity="0.7" />
              <rect x="5" y="2" width="12" height="8" fill="#082f49" opacity="0.75" />
              <rect x="17" y="4" width="4" height="4" fill="#082f49" opacity="0.75" />
            </svg>
          </div>
        </div>
      )}

      {/* Water Ripple Rings Around Bobber */}
      {isBobberInWater && (
        <div className="absolute left-[55%] top-[67%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-12 h-5 border-2 border-[#e0f2fe]/80 rounded-full animate-water-ripple" />
          <div
            className="w-12 h-5 border-2 border-[#bae6fd]/70 rounded-full animate-water-ripple absolute inset-0"
            style={{ animationDelay: '0.6s' }}
          />
        </div>
      )}

      {/* Pixel Bobber */}
      {(phase === 'casting' || phase === 'waiting' || phase === 'bite') && (
        <div
          className={`absolute left-[55%] top-[65%] -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
            phase === 'casting'
              ? 'animate-bobber-drop'
              : phase === 'bite'
              ? 'animate-bobber-bite'
              : 'animate-bobber-float'
          }`}
        >
          <svg width="20" height="22" viewBox="0 0 10 11" shapeRendering="crispEdges">
            <rect x="4" y="0" width="2" height="2" fill="#f8fafc" />
            <rect x="2" y="2" width="6" height="3" fill="#ef4444" />
            <rect x="2" y="5" width="6" height="3" fill="#f8fafc" />
            <rect x="3" y="8" width="4" height="1" fill="#94a3b8" />
          </svg>
        </div>
      )}

      {/* Bite Exclamation Sign */}
      {phase === 'bite' && (
        <div className="absolute left-[55%] top-[41%] -translate-x-1/2 bg-[#fde047] text-[#78350f] font-pixel font-black text-base px-3 py-1 rounded-lg border-3 border-[#78350f] shadow-xl animate-bounce">
          上鉤了!
        </div>
      )}

      {/* Caught Fish Pulling Up Into View */}
      {phase === 'revealed' && caughtFish && (
        <div className="absolute left-[55%] top-[44%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none animate-bounce">
          <div
            className={`p-2 rounded-2xl border-3 shadow-2xl ${
              caughtFish.rarity === 'legendary'
                ? 'bg-[#fef08a]/95 border-[#ca8a04] ring-4 ring-amber-300'
                : caughtFish.rarity === 'rare'
                ? 'bg-[#ede9fe]/95 border-[#7c3aed] ring-2 ring-violet-300'
                : 'bg-[#fdfbf7]/95 border-[#0284c7]'
            }`}
          >
            <RewardPixelIcon
              imageUrl={caughtFish.imageUrl}
              name={caughtFish.name}
              type="fish"
              size={64}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface PixelMineSceneProps {
  rocks: MineRockState[];
  hittingIndex: number | null;
  lastRockMessage: string | null;
  foundGem: GemRewardItem | null;
  isMiningLocked: boolean;
  onStrikeRock: (rockIndex: number) => void;
}

export const PixelMineScene: React.FC<PixelMineSceneProps> = ({
  rocks,
  hittingIndex,
  lastRockMessage,
  foundGem,
  isMiningLocked,
  onStrikeRock,
}) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-4 border-[#3b230d] bg-[#1e1624] shadow-inner select-none p-4 sm:p-6">
      {/* Pixel Cavern Wall & Torch Backdrop */}
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      >
        <rect x="0" y="0" width="320" height="82" fill="#231a2e" />
        <rect x="0" y="82" width="320" height="38" fill="#3b2d22" />
        {/* Wooden Mine Support Beams */}
        <rect x="20" y="0" width="8" height="84" fill="#5c3614" />
        <rect x="292" y="0" width="8" height="84" fill="#5c3614" />
        <rect x="0" y="6" width="320" height="7" fill="#6b421d" />
        {/* Rock Stalactites & Cavern Details */}
        <rect x="64" y="13" width="12" height="10" fill="#342842" />
        <rect x="152" y="13" width="18" height="8" fill="#342842" />
        <rect x="234" y="13" width="14" height="12" fill="#342842" />
        {/* Wall Crystals */}
        <rect x="44" y="34" width="4" height="6" fill="#38bdf8" opacity="0.6" />
        <rect x="268" y="38" width="4" height="7" fill="#a855f7" opacity="0.6" />
        {/* Torch Left */}
        <rect x="26" y="34" width="4" height="10" fill="#78350f" />
        <rect x="25" y="28" width="6" height="6" fill="#f97316" />
        <rect x="26" y="26" width="4" height="4" fill="#fde047" />
        {/* Torch Right */}
        <rect x="290" y="34" width="4" height="10" fill="#78350f" />
        <rect x="289" y="28" width="6" height="6" fill="#f97316" />
        <rect x="290" y="26" width="4" height="4" fill="#fde047" />
      </svg>

      {/* Mine Status Pill */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded bg-[#2b1807]/90 border border-[#8b5a2b] text-xs font-pixel text-[#ffebb3]">
          星露谷深層礦洞
        </span>
        {lastRockMessage && (
          <span className="px-3 py-1 rounded bg-[#fef3c7] border-2 border-[#b45309] text-xs sm:text-sm font-bold text-[#78350f] shadow">
            {lastRockMessage}
          </span>
        )}
      </div>

      {/* 3 Big Side-by-Side Mine Boulders */}
      <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto py-3">
        {rocks.map((rock) => {
          const isHitting = hittingIndex === rock.index;
          const canClick = !rock.opened && !isMiningLocked && hittingIndex === null;

          return (
            <button
              key={rock.index}
              type="button"
              disabled={!canClick}
              onClick={() => onStrikeRock(rock.index)}
              className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-3 transition-all min-h-[168px] sm:min-h-[192px] ${
                rock.opened
                  ? rock.content === 'gem'
                    ? 'bg-[#fef9c3]/20 border-[#facc15] ring-2 ring-amber-300'
                    : 'bg-[#1a1320]/70 border-[#524364] opacity-85'
                  : canClick
                  ? 'bg-[#2c2138]/85 hover:bg-[#3a2c4a] border-[#8b5a2b] hover:border-[#fabc3f] hover:-translate-y-1 cursor-pointer shadow-xl active:scale-95'
                  : 'bg-[#2c2138]/75 border-[#5a3818] cursor-not-allowed'
              }`}
            >
              {/* Rock Number Badge */}
              <span className="absolute top-2 left-2.5 px-2 py-0.5 rounded bg-[#4a2e13] text-[#ffebb3] font-pixel text-[11px] border border-[#8b5a2b]">
                {rock.index + 1} 號礦石
              </span>

              {/* Animated Pickaxe on Strike */}
              {isHitting && (
                <div className="absolute -top-3 right-3 z-20 animate-pickaxe-swing pointer-events-none">
                  <PixelPickaxeIcon size={54} />
                </div>
              )}

              {/* Unopened Pixel Boulder */}
              {!rock.opened && (
                <div className={`flex flex-col items-center ${isHitting ? 'animate-rock-shake' : ''}`}>
                  <svg
                    width="96"
                    height="84"
                    viewBox="0 0 24 21"
                    shapeRendering="crispEdges"
                    className="drop-shadow-lg"
                  >
                    {/* Main Boulder Silhouette */}
                    <rect x="6" y="2" width="12" height="3" fill="#78716c" />
                    <rect x="4" y="5" width="16" height="4" fill="#64748b" />
                    <rect x="2" y="9" width="20" height="6" fill="#57534e" />
                    <rect x="4" y="15" width="16" height="4" fill="#44403c" />
                    {/* Highlights & Cracks */}
                    <rect x="7" y="4" width="6" height="2" fill="#a8a29e" />
                    <rect x="5" y="7" width="4" height="2" fill="#94a3b8" />
                    <rect x="13" y="10" width="5" height="2" fill="#3f3f46" />
                    <rect x="8" y="13" width="3" height="2" fill="#292524" />
                    {/* Subtle Mineral Glint */}
                    <rect x="15" y="6" width="2" height="2" fill="#cbd5e1" />
                  </svg>
                  <span className="mt-1 font-pixel text-xs sm:text-sm font-bold text-[#fde68a]">
                    {isHitting ? '敲擊中...' : '點擊敲開'}
                  </span>
                </div>
              )}

              {/* Opened: Plain Stone */}
              {rock.opened && rock.content === 'stone' && (
                <div className="flex flex-col items-center">
                  <svg width="76" height="68" viewBox="0 0 24 20" shapeRendering="crispEdges">
                    <rect x="3" y="12" width="5" height="4" fill="#78716c" />
                    <rect x="9" y="10" width="6" height="5" fill="#57534e" />
                    <rect x="16" y="13" width="4" height="3" fill="#a8a29e" />
                    <rect x="6" y="16" width="11" height="2" fill="#44403c" />
                  </svg>
                  <span className="mt-1 px-2.5 py-0.5 rounded bg-stone-700 text-stone-200 font-pixel text-xs font-bold border border-stone-500">
                    普通石頭
                  </span>
                </div>
              )}

              {/* Opened: Friendly Little Bat */}
              {rock.opened && rock.content === 'bat' && (
                <div className="flex flex-col items-center relative">
                  <div className="animate-bat-fly pointer-events-none">
                    <PixelBatSprite size={64} />
                  </div>
                  <span className="mt-2 px-2.5 py-0.5 rounded bg-violet-900/90 text-violet-100 font-pixel text-xs font-bold border border-violet-400">
                    友善小蝙蝠飛走了
                  </span>
                </div>
              )}

              {/* Opened: Hidden Gem Discovered */}
              {rock.opened && rock.content === 'gem' && foundGem && (
                <div className="flex flex-col items-center animate-bounce">
                  <div className="p-2 rounded-xl bg-[#fef08a]/95 border-3 border-[#ca8a04] shadow-xl">
                    <RewardPixelIcon
                      imageUrl={foundGem.imageUrl}
                      name={foundGem.name}
                      type="gem"
                      size={58}
                    />
                  </div>
                  <span className="mt-1.5 px-2.5 py-0.5 rounded bg-[#ca8a04] text-white font-pixel text-xs font-black shadow">
                    {foundGem.name}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
