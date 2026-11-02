import React, { useState } from 'react';
import { PixelSprite } from '../common/PixelSprite';
import { STARDEW_AVATARS } from '../../data/classroomData';

interface AvatarRendererProps {
  avatar?: string;
  name: string;
  size?: number;
  className?: string;
  bare?: boolean; // When true, renders pure sprite/image with no white card, background, or border
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  avatar,
  name,
  size = 56,
  className = '',
  bare = false,
}) => {
  const [imgError, setImgError] = useState(false);

  // If avatar is an external URL
  if (avatar && (avatar.startsWith('http://') || avatar.startsWith('https://')) && !imgError) {
    if (bare) {
      return (
        <div 
          className={`relative flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
          style={{ width: size, height: size }}
        >
          <img
            src={avatar}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-xs pointer-events-none"
            onError={() => setImgError(true)}
          />
        </div>
      );
    }
    return (
      <div 
        className={`relative rounded-xl overflow-hidden bg-amber-50/90 border-2 border-[#8b5a2b] flex items-center justify-center shrink-0 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={avatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Check if avatar maps to a known item in STARDEW_AVATARS that has a URL
  const matchedItem = STARDEW_AVATARS.find((a) => a.id === avatar);
  if (matchedItem?.url && !imgError) {
    if (bare) {
      return (
        <div 
          className={`relative flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
          style={{ width: size, height: size }}
        >
          <img
            src={matchedItem.url}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-xs pointer-events-none"
            onError={() => setImgError(true)}
          />
        </div>
      );
    }
    return (
      <div 
        className={`relative rounded-xl overflow-hidden bg-amber-50/90 border-2 border-[#8b5a2b] flex items-center justify-center shrink-0 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={matchedItem.url}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Otherwise treat as PixelSprite
  const spriteName = matchedItem?.sprite || avatar || 'junimo';
  if (bare) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 drop-shadow-sm select-none ${className}`}
        style={{ width: size, height: size }}
      >
        <PixelSprite name={spriteName} size={size} />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#faeed1] border-2 border-[#8b5a2b] flex items-center justify-center shrink-0 shadow-inner ${className}`}
      style={{ width: size, height: size }}
    >
      <PixelSprite name={spriteName} size={size * 0.72} />
    </div>
  );
};
