import React from 'react';
import { PageTheme } from '../../data/classroomThemes';

interface ScenicPageBackdropProps {
  theme: PageTheme;
}

export const ScenicPageBackdrop: React.FC<ScenicPageBackdropProps> = ({ theme }) => {
  const isWinter = theme.id === 'winter_frost';
  const isAutumn = theme.id === 'autumn_amber';
  const isSummer = theme.id === 'summer_sunflower';
  const isWoods = theme.id === 'secret_woods';
  const isCabin = theme.id === 'cozy_homestead';

  // Dynamic sky gradients based on active theme
  const skyBackground = isWinter
    ? 'linear-gradient(180deg, #0284c7 0%, #38bdf8 30%, #bae6fd 60%, #e0f2fe 82%, #f1f5f9 100%)'
    : isAutumn
    ? 'linear-gradient(180deg, #9a3412 0%, #ea580c 25%, #fdba74 55%, #fed7aa 78%, #78350f 100%)'
    : isSummer
    ? 'linear-gradient(180deg, #0284c7 0%, #38bdf8 25%, #7dd3fc 50%, #fef08a 78%, #22c55e 100%)'
    : isWoods
    ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 35%, #1e3a2b 68%, #064e3b 100%)'
    : isCabin
    ? 'linear-gradient(180deg, #451a03 0%, #78350f 35%, #b45309 70%, #542d13 100%)'
    : 'linear-gradient(180deg, #0284c7 0%, #38bdf8 28%, #7dd3fc 48%, #bbf7d0 72%, #22c55e 100%)';

  // Ground base gradient
  const groundBackground = isWinter
    ? 'linear-gradient(180deg, #cbd5e1 0%, #e2e8f0 35%, #f1f5f9 100%)'
    : isAutumn
    ? 'linear-gradient(180deg, #9a3412 0%, #78350f 30%, #451a03 100%)'
    : isSummer
    ? 'linear-gradient(180deg, #15803d 0%, #166534 35%, #14532d 100%)'
    : isWoods
    ? 'linear-gradient(180deg, #064e3b 0%, #022c22 40%, #0f172a 100%)'
    : isCabin
    ? 'linear-gradient(180deg, #78350f 0%, #542d13 40%, #291505 100%)'
    : 'linear-gradient(180deg, #22c55e 0%, #16a34a 25%, #15803d 60%, #14532d 100%)';

  // Mountain silhouettes color
  const mountainFarColor = isWinter
    ? '#94a3b8'
    : isAutumn
    ? '#9a3412'
    : isSummer
    ? '#14532d'
    : isWoods
    ? '#1e1b4b'
    : isCabin
    ? '#361c0c'
    : '#1b4332';

  const mountainNearColor = isWinter
    ? '#64748b'
    : isAutumn
    ? '#7c2d12'
    : isSummer
    ? '#166534'
    : isWoods
    ? '#064e3b'
    : isCabin
    ? '#4a2610'
    : '#2d6a4f';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. SKY GRADIENT (Bright, scenic, panoramic) */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyBackground }}
      />

      {/* 2. CELESTIAL BODY: SUN OR MOON */}
      {!isWoods && !isCabin ? (
        <div className="absolute top-8 right-12 sm:right-28 w-24 h-24 bg-yellow-200/95 rounded-full blur-xs shadow-[0_0_90px_rgba(253,224,71,0.9)] flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 bg-amber-300 rounded-full shadow-inner" />
        </div>
      ) : isWoods ? (
        <div className="absolute top-10 right-20 w-20 h-20 bg-indigo-200/90 rounded-full blur-xs shadow-[0_0_70px_rgba(165,180,252,0.85)] flex items-center justify-center">
          <div className="w-14 h-14 bg-purple-300 rounded-full shadow-inner" />
        </div>
      ) : null}

      {/* 3. FLUFFY DRIFTING PIXEL CLOUDS */}
      {!isCabin && (
        <div className="absolute top-0 inset-x-0 h-48 overflow-hidden opacity-90">
          {/* Cloud 1 */}
          <div className="absolute top-6 left-12 w-48 h-14 bg-white/95 rounded-full blur-[0.5px] shadow-sm animate-cloud-slow">
            <div className="absolute -top-5 left-8 w-18 h-18 bg-white/95 rounded-full" />
            <div className="absolute -top-3 left-22 w-14 h-14 bg-white/95 rounded-full" />
          </div>
          {/* Cloud 2 */}
          <div
            className="absolute top-16 left-1/2 w-60 h-16 bg-white/85 rounded-full blur-[0.5px] shadow-md animate-cloud-med"
            style={{ animationDelay: '-14s' }}
          >
            <div className="absolute -top-6 left-10 w-22 h-22 bg-white/85 rounded-full" />
            <div className="absolute -top-4 left-32 w-16 h-16 bg-white/85 rounded-full" />
          </div>
          {/* Cloud 3 */}
          <div
            className="absolute top-26 left-1/4 w-40 h-12 bg-white/80 rounded-full blur-[0.5px] animate-cloud-slow"
            style={{ animationDelay: '-28s' }}
          >
            <div className="absolute -top-4 left-6 w-14 h-14 bg-white/80 rounded-full" />
            <div className="absolute -top-3 left-20 w-12 h-12 bg-white/80 rounded-full" />
          </div>
        </div>
      )}

      {/* 4. DISTANT MOUNTAIN SILHOUETTE LAYERS */}
      {!isCabin && (
        <div className="absolute top-24 inset-x-0 h-44">
          {/* Layer 1: Far mountain peaks */}
          <svg
            className="absolute bottom-6 inset-x-0 w-full h-32 opacity-50"
            preserveAspectRatio="none"
            viewBox="0 0 500 80"
          >
            <polygon
              points="0,80 50,20 120,80 190,15 280,80 360,25 430,80 500,30 500,80"
              fill={mountainFarColor}
            />
          </svg>

          {/* Layer 2: Near pine mountain ridge */}
          <svg
            className="absolute bottom-0 inset-x-0 w-full h-28 opacity-75"
            preserveAspectRatio="none"
            viewBox="0 0 500 70"
          >
            <polygon
              points="0,70 30,35 70,70 120,25 180,70 240,30 310,70 380,20 440,70 500,35 500,70"
              fill={mountainNearColor}
            />
          </svg>
        </div>
      )}

      {/* 5. WOODEN FARM FENCE RUNNING ALONG HORIZON */}
      {!isCabin && (
        <div className="absolute top-64 inset-x-0 flex items-center justify-between px-2 opacity-70 z-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center shrink-0">
              <div className="w-2.5 h-8 bg-[#542d13] border-x border-t border-[#2e1708] rounded-t-sm shadow-xs" />
              <div className="w-14 h-1.5 bg-[#783e18] -mt-6 border-y border-[#2e1708]" />
              <div className="w-14 h-1 bg-[#5c2f10] mt-1.5 border-b border-[#2e1708]" />
            </div>
          ))}
        </div>
      )}

      {/* 6. LOWER GROUND PASTURE & FARMLAND TEXTURE */}
      <div
        className="absolute bottom-0 inset-x-0 top-68 transition-all duration-1000"
        style={{
          background: groundBackground,
        }}
      >
        {/* Pixel Farmland Checkered Grass / Soil Grid Overlay */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: isCabin
              ? 'repeating-linear-gradient(90deg, #361a09 0px, #361a09 4px, #5c2f12 4px, #5c2f12 28px)'
              : 'repeating-conic-gradient(rgba(0,0,0,0.12) 0% 25%, transparent 0% 50%)',
            backgroundSize: isCabin ? '28px 28px' : '24px 24px',
          }}
        />

        {/* Scattered Stardew Farmland Plants & Wildflowers */}
        <div className="absolute inset-x-0 top-3 flex items-center justify-around opacity-60 text-sm select-none">
          <span className="drop-shadow">🌱</span>
          <span className="drop-shadow">🌻</span>
          <span className="drop-shadow">🌾</span>
          <span className="drop-shadow">🌼</span>
          <span className="drop-shadow">🌱</span>
          <span className="drop-shadow">🌸</span>
          <span className="drop-shadow">🌾</span>
          <span className="drop-shadow">🌻</span>
          <span className="drop-shadow">🍄</span>
          <span className="drop-shadow">🌱</span>
        </div>
      </div>

      {/* 7. SOFT WARM VIGNETTE FOR OPTIMAL CONTRAST */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/30 pointer-events-none" />
    </div>
  );
};
