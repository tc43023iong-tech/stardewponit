import React from 'react';
import { PixelSprite } from './PixelSprite';

interface GameAtmosphereProps {
  characterName: string;
  characterRole: string;
  avatarType: any;
  characterSpeech: string;
  sectionTitle: string;
  subtitle: string;
  season?: 'spring' | 'summer' | 'fall';
}

export const GameAtmosphere: React.FC<GameAtmosphereProps> = ({
  characterName,
  characterRole,
  avatarType,
  characterSpeech,
  sectionTitle,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-2.5 mb-2">
      {/* Decorative Top Scene Strip with Fence & Animals */}
      <div className="relative bg-[#5b7f3d] p-2.5 border-3 border-[#364f22] overflow-hidden shadow-md">
        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6b9449] to-[#4e6e33] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          {/* Left Farm Decorations: Sunflowers, Fence, Chicken */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
              <PixelSprite name="sunflower" size={24} className="hover:scale-110 transition-transform" />
              <PixelSprite name="sunflower" size={20} className="hover:scale-110 transition-transform" />
            </div>

            <div className="flex items-center gap-1.5 bg-[#425e2a]/80 px-2 py-1 border border-[#2d421c]">
              <PixelSprite name="chicken" size={20} animate={true} />
              <span className="text-[11px] font-semibold text-[#fef08a] hidden sm:inline">
                Pip the Hen
              </span>
            </div>
          </div>

          {/* Center Title Plaque */}
          <div className="text-center">
            <span className="font-pixel text-[11px] sm:text-xs text-[#fff9db] drop-shadow-sm font-bold block">
              {sectionTitle}
            </span>
            <span className="text-xs text-[#d9f99d] font-semibold">
              {subtitle}
            </span>
          </div>

          {/* Right Farm Decorations: Rabbit & Sleeping Cat */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#425e2a]/80 px-2 py-1 border border-[#2d421c]">
              <PixelSprite name="rabbit" size={20} animate={true} />
              <span className="text-[11px] font-semibold text-[#fce7f3] hidden sm:inline">
                Clover Bunny
              </span>
            </div>

            <div className="flex items-center -space-x-1">
              <PixelSprite name="melon" size={22} className="hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Character Speech Bubble Box */}
      <div className="pixel-parchment p-3 sm:p-3.5 flex items-start gap-3 bg-[#fff9ed]">
        <div className="relative shrink-0">
          <div className="w-12 h-12 bg-[#faeed1] border-2 border-[#7c4f24] flex items-center justify-center p-1 shadow-sm">
            <PixelSprite name={avatarType} size={36} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#70b05b] border border-[#285416] flex items-center justify-center">
            <PixelSprite name="check" size={10} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-[#5c3708]">
              {characterName}
            </span>
            <span className="text-[11px] text-[#8b5a2b] font-medium">
              ({characterRole})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4a2e13] font-medium mt-0.5 leading-snug">
            "{characterSpeech}"
          </p>
        </div>
      </div>
    </div>
  );
};
