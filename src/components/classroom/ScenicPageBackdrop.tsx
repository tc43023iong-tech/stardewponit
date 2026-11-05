import React from 'react';
import { PageTheme } from '../../data/classroomThemes';
import { SCENIC_PAGE_IMAGES } from '../../data/scenicBackgrounds';

interface ScenicPageBackdropProps {
  theme: PageTheme;
}

export const ScenicPageBackdrop: React.FC<ScenicPageBackdropProps> = ({ theme }) => {
  const bgImage = SCENIC_PAGE_IMAGES[theme.id] || SCENIC_PAGE_IMAGES.spring_farm;

  const isWinter = theme.id === 'winter_frost';
  const isAutumn = theme.id === 'autumn_amber';
  const isWoods = theme.id === 'secret_woods';
  const isIridium = theme.id === 'iridium_cavern' || theme.id === 'iridium';
  const isGold = theme.id === 'golden_palace' || theme.id === 'golden';
  const isOcean = theme.id === 'ocean_sunset' || theme.id === 'ocean';
  const isGalaxy = theme.id === 'galaxy_starlight' || theme.id === 'galaxy';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. HIGH-DEFINITION STARDEW VALLEY SCENIC PANORAMA WALLPAPER */}
      <img
        src={bgImage}
        alt="Stardew Valley Farm Panorama"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] transition-opacity duration-700 select-none pointer-events-none"
      />

      {/* 2. THEMATIC TINT OVERLAY */}
      {isWinter ? (
        <div className="absolute inset-0 bg-sky-900/10 mix-blend-color-dodge" />
      ) : isAutumn ? (
        <div className="absolute inset-0 bg-amber-950/15 mix-blend-overlay" />
      ) : isWoods ? (
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-multiply" />
      ) : isIridium ? (
        <div className="absolute inset-0 bg-purple-950/25 mix-blend-color-dodge" />
      ) : isGold ? (
        <div className="absolute inset-0 bg-amber-500/15 mix-blend-overlay" />
      ) : isOcean ? (
        <div className="absolute inset-0 bg-rose-950/15 mix-blend-overlay" />
      ) : isGalaxy ? (
        <div className="absolute inset-0 bg-indigo-950/25 mix-blend-screen" />
      ) : (
        <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay" />
      )}

      {/* 3. DYNAMIC SPECIAL EFFECTS LAYER: GALAXY (星空漫步 - 閃爍星光與極光束) */}
      {isGalaxy && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Central Prismatic Beam Pulse */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-cyan-400/25 via-fuchsia-500/15 to-transparent blur-md animate-pulse" />

          {/* Twinkling Pixel Stars Clusters */}
          <div className="absolute top-12 left-16 text-cyan-200 text-lg animate-twinkle">✦</div>
          <div className="absolute top-24 left-1/3 text-fuchsia-200 text-sm animate-twinkle-delayed">✧</div>
          <div className="absolute top-8 right-24 text-amber-200 text-xl animate-twinkle">★</div>
          <div className="absolute top-36 right-1/4 text-cyan-100 text-xs animate-twinkle-delayed">✦</div>
          <div className="absolute top-20 right-1/3 text-purple-200 text-base animate-twinkle">✧</div>
          <div className="absolute top-48 left-1/4 text-emerald-200 text-sm animate-twinkle-delayed">✦</div>
          <div className="absolute top-16 left-2/3 text-pink-200 text-lg animate-twinkle">✧</div>
          <div className="absolute top-52 right-16 text-cyan-300 text-xs animate-twinkle-delayed">★</div>

          {/* Floating Prismatic Star Dust */}
          <div className="absolute bottom-32 left-1/4 text-purple-300/80 text-sm animate-floating-drift">✨</div>
          <div className="absolute bottom-44 right-1/3 text-cyan-300/80 text-base animate-floating-drift" style={{ animationDelay: '-2s' }}>✨</div>
        </div>
      )}

      {/* 4. DYNAMIC SPECIAL EFFECTS LAYER: OCEAN (海濱夕陽 - 水波湧動與夕陽水面金光) */}
      {isOcean && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sunset Horizon Radiance */}
          <div className="absolute top-16 left-0 right-1/2 h-48 bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-transparent blur-xl" />

          {/* Ocean Water Undulating Wave Layers */}
          <div className="absolute bottom-12 inset-x-0 h-36 opacity-30 animate-ocean-wave">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path
                d="M 0 50 Q 250 20 500 50 T 1000 50 L 1000 100 L 0 100 Z"
                fill="#38bdf8"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 inset-x-0 h-32 opacity-25 animate-ocean-wave" style={{ animationDelay: '-1.8s' }}>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path
                d="M 0 40 Q 250 70 500 40 T 1000 40 L 1000 100 L 0 100 Z"
                fill="#0284c7"
              />
            </svg>
          </div>

          {/* Water Sunset Gleam Sparkles */}
          <div className="absolute bottom-28 left-1/3 text-amber-300 text-sm animate-water-gleam">✧</div>
          <div className="absolute bottom-20 left-1/2 text-orange-200 text-xs animate-water-gleam" style={{ animationDelay: '-1.2s' }}>✦</div>
          <div className="absolute bottom-16 left-2/5 text-amber-200 text-base animate-water-gleam" style={{ animationDelay: '-0.7s' }}>✧</div>
        </div>
      )}

      {/* 5. DYNAMIC SPECIAL EFFECTS LAYER: IRIDIUM (紫金秘境 - 紫水晶脈衝微光與微粒) */}
      {isIridium && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radioactive Amethyst Crystal Pulse Glow */}
          <div className="absolute top-1/4 left-12 w-48 h-48 rounded-full bg-purple-600/20 blur-2xl animate-crystal-pulse" />
          <div className="absolute top-1/3 right-16 w-56 h-56 rounded-full bg-fuchsia-600/20 blur-2xl animate-crystal-pulse" style={{ animationDelay: '-1.6s' }} />

          {/* Floating Radioactive Crystal Dust */}
          <div className="absolute top-28 left-20 text-purple-300 text-base animate-floating-drift">🔮</div>
          <div className="absolute top-44 right-28 text-fuchsia-300 text-sm animate-floating-drift" style={{ animationDelay: '-2.2s' }}>✨</div>
          <div className="absolute bottom-36 left-1/3 text-purple-400 text-xs animate-twinkle">✦</div>
          <div className="absolute bottom-48 right-1/3 text-violet-300 text-sm animate-twinkle-delayed">✧</div>
        </div>
      )}

      {/* 6. DYNAMIC SPECIAL EFFECTS LAYER: GOLDEN PALACE (皇家金輝 - 殿堂浮光與金屑) */}
      {isGold && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Chandelier & Trophy Radiant Gleam */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-64 bg-amber-300/20 blur-2xl animate-gold-gleam" />

          {/* Floating Royal Gold Sparkles & Specks */}
          <div className="absolute top-20 left-1/4 text-amber-300 text-lg animate-floating-drift">✨</div>
          <div className="absolute top-32 right-1/4 text-yellow-200 text-base animate-floating-drift" style={{ animationDelay: '-1.8s' }}>👑</div>
          <div className="absolute bottom-40 left-1/3 text-amber-400 text-sm animate-twinkle">✦</div>
          <div className="absolute bottom-28 right-1/3 text-yellow-300 text-sm animate-twinkle-delayed">✧</div>
          <div className="absolute top-48 right-1/5 text-amber-300 text-xs animate-twinkle">★</div>
        </div>
      )}

      {/* 7. CLASSIC DRIFTING PIXEL CLOUDS FOR DAYTIME THEMES */}
      {!isIridium && !isGold && !isGalaxy && (
        <div className="absolute top-0 inset-x-0 h-40 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-6 left-12 w-48 h-12 bg-white/70 rounded-full blur-[1px] animate-cloud-slow" />
          <div
            className="absolute top-14 left-1/2 w-60 h-14 bg-white/60 rounded-full blur-[1px] animate-cloud-med"
            style={{ animationDelay: '-14s' }}
          />
        </div>
      )}

      {/* 8. SOFT READABILITY GRADIENT OVERLAY (Ensures foreground cards and text stand out with 100% clarity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
