import React, { useMemo } from 'react';
import { Student } from '../../types/classroom';
import { FishRewardItem } from '../../data/pickerRewards';
import { AvatarRenderer } from './AvatarRenderer';
import { RewardPixelIcon } from './PickerPixelArt';
import { PixelSprite } from '../common/PixelSprite';
import { Award, X } from 'lucide-react';

interface LegendaryCatchOverlayProps {
  student: Student;
  fish: FishRewardItem;
  onClose: () => void;
}

export const LegendaryCatchOverlay: React.FC<LegendaryCatchOverlayProps> = ({
  student,
  fish,
  onClose,
}) => {
  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, idx) => ({
        id: idx,
        left: `${(idx * 3.7) % 100}%`,
        delay: `${(idx % 7) * 0.12}s`,
        duration: `${1.8 + (idx % 5) * 0.35}s`,
        color: ['#facc15', '#f97316', '#38bdf8', '#a855f7', '#4ade80'][idx % 5],
      })),
    []
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 select-none overflow-hidden"
    >
      {/* Falling Pixel Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute top-0 w-3 h-3 animate-petal-sway"
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
            }}
          />
        ))}
      </div>

      {/* Glowing Celebration Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full pixel-wood-box p-6 sm:p-8 text-center border-4 border-[#facc15] ring-4 ring-amber-300/60 shadow-[0_0_60px_rgba(250,204,21,0.55)] bg-[#fffbeb]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#6a4422] hover:bg-[#8b5a2b] text-[#ffd700] cursor-pointer"
          title="關閉慶祝畫面"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ca8a04] to-[#eab308] text-white font-pixel text-sm sm:text-base font-black shadow-md mb-4">
          <Award className="w-5 h-5" />
          <span>傳說級漁獲降臨！5% 奇蹟魚王</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 my-3">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-2xl bg-white border-3 border-[#8b5a2b] shadow-lg">
              <AvatarRenderer avatar={student.avatar} name={student.name} size={76} />
            </div>
            <span className="mt-2 px-2.5 py-0.5 rounded bg-[#4a2e13] text-[#ffebb3] font-pixel text-xs">
              #{student.rollNo} {student.name}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <PixelSprite name="star_full" size={32} animate />
          </div>

          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#fef08a] to-[#fde047] border-4 border-[#b45309] shadow-xl animate-bounce">
              <RewardPixelIcon
                imageUrl={fish.imageUrl}
                name={fish.name}
                type="fish"
                size={84}
              />
            </div>
            <span className="mt-2 px-3 py-0.5 rounded bg-[#b45309] text-white font-pixel text-sm font-black">
              {fish.name} ({fish.enName})
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base font-bold text-[#5a3818] mt-3 mb-5 leading-relaxed">
          全班歡呼！{student.name} 在池塘釣起了傳說級「{fish.name}」，已收錄至個人魚類圖鑑收藏！
        </p>

        <button
          type="button"
          onClick={onClose}
          className="pixel-btn-gold px-8 py-3 text-base font-pixel font-black rounded-xl cursor-pointer shadow-lg active:scale-95"
        >
          太棒了！繼續課堂點名
        </button>
      </div>
    </div>
  );
};
