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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. HIGH RESOLUTION STARDEW VALLEY SCENIC PANORAMA WALLPAPER */}
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
      ) : (
        <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay" />
      )}

      {/* 3. SUBTLE DRIFTING PIXEL CLOUDS ON THE HORIZON */}
      <div className="absolute top-0 inset-x-0 h-40 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-6 left-12 w-48 h-12 bg-white/70 rounded-full blur-[1px] animate-cloud-slow" />
        <div
          className="absolute top-14 left-1/2 w-60 h-14 bg-white/60 rounded-full blur-[1px] animate-cloud-med"
          style={{ animationDelay: '-14s' }}
        />
      </div>

      {/* 4. SOFT READABILITY GRADIENT OVERLAY (Ensures foreground cards and text stand out with 100% clarity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
