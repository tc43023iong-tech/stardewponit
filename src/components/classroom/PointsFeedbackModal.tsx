import React, { useEffect } from 'react';
import { Student } from '../../types/classroom';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { Sparkles, HeartHandshake, Award } from 'lucide-react';

export interface PointsFeedbackData {
  students: Student[];
  delta: number;
  reason: string;
  updatedScores: Record<string, number>; // studentId -> updated total points
}

interface PointsFeedbackModalProps {
  data: PointsFeedbackData;
  onClose: () => void;
}

export const PointsFeedbackModal: React.FC<PointsFeedbackModalProps> = ({
  data,
  onClose,
}) => {
  const { students, delta, reason, updatedScores } = data;
  const isPositive = delta > 0;
  const isBatch = students.length > 1;

  // Auto close after exactly 1.3 seconds (1300 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onClose]);

  const primaryStudent = students[0];
  const primaryScore = primaryStudent ? updatedScores[primaryStudent.id] ?? primaryStudent.points : 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm cursor-pointer select-none animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-2xl border-4 p-5 sm:p-6 shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 ${
          isPositive
            ? 'bg-gradient-to-b from-[#fdfbf7] via-[#f0fdf4] to-[#dcfce7] border-[#16a34a] shadow-[0_0_35px_rgba(22,163,74,0.35)]'
            : 'bg-gradient-to-b from-[#fdfbf7] via-[#fff7ed] to-[#fed7aa] border-[#ea580c] shadow-[0_0_35px_rgba(234,88,12,0.35)]'
        }`}
      >
        {/* Top Decorative Floating Badges */}
        <div className="absolute top-2 right-3 opacity-40 pointer-events-none">
          {isPositive ? (
            <PixelSprite name="star_full" size={28} className="animate-spin" />
          ) : (
            <PixelSprite name="sunflower" size={28} />
          )}
        </div>
        <div className="absolute top-2 left-3 opacity-40 pointer-events-none">
          {isPositive ? (
            <PixelSprite name="coin_gold" size={28} />
          ) : (
            <PixelSprite name="clover" size={28} />
          )}
        </div>

        {/* 1. Main Title: 恭喜你！ or 繼續加油！ */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            {isPositive ? (
              <span className="text-3xl animate-bounce">🎉</span>
            ) : (
              <span className="text-3xl animate-pulse">💪</span>
            )}
            <h2
              className={`font-pixel text-xl sm:text-2xl font-black tracking-wide ${
                isPositive ? 'text-[#15803d]' : 'text-[#c2410c]'
              }`}
            >
              {isPositive ? '恭喜你！' : '繼續加油！'}
            </h2>
            {isPositive ? (
              <span className="text-3xl animate-bounce">✨</span>
            ) : (
              <span className="text-3xl animate-pulse">🌱</span>
            )}
          </div>

          {/* Subtitle / Encouragement Banner */}
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-pixel border shadow-xs ${
              isPositive
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            {isPositive ? '星露谷莊園蓬勃生長中' : '每一次努力都是成長的種子'}
          </div>
        </div>

        {/* 2. Target Student(s) Display */}
        <div className="flex flex-col items-center justify-center my-3">
          {!isBatch && primaryStudent ? (
            <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-xl border border-stone-200 shadow-sm">
              <div className="p-1 rounded-xl bg-[#faeed1] border-2 border-[#8b5a2b] shadow-xs">
                <AvatarRenderer avatar={primaryStudent.avatar} name={primaryStudent.name} size={54} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-pixel text-stone-500 block">
                  #{primaryStudent.rollNo} 學號
                </span>
                <h3 className="font-extrabold text-lg text-[#3d240d] leading-tight">
                  {primaryStudent.name}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-white/80 px-4 py-2 rounded-xl border border-stone-200 shadow-sm w-full">
              <div className="flex items-center -space-x-3 mb-1">
                {students.slice(0, 5).map((s) => (
                  <div key={s.id} className="p-0.5 rounded-full bg-white border-2 border-[#8b5a2b] shadow-xs">
                    <AvatarRenderer avatar={s.avatar} name={s.name} size={36} />
                  </div>
                ))}
              </div>
              <span className="font-bold text-sm text-[#3d240d]">
                {students[0]?.name} 等共 {students.length} 位同學
              </span>
            </div>
          )}
        </div>

        {/* 3. Reason & Points Delta Banner */}
        <div
          className={`my-3 p-3 rounded-xl border-2 text-center flex flex-col items-center justify-center gap-1 shadow-inner ${
            isPositive
              ? 'bg-[#dcfce7]/90 border-[#86efac] text-[#14532d]'
              : 'bg-[#ffedd5]/90 border-[#fdba74] text-[#7c2d12]'
          }`}
        >
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-600">評定原因：</span>
            <span className="font-black text-sm sm:text-base">{reason}</span>
          </div>

          <div
            className={`font-pixel text-lg sm:text-xl font-black px-3 py-0.5 rounded-lg border mt-1 shadow-xs ${
              isPositive
                ? 'bg-emerald-500 text-white border-emerald-600'
                : 'bg-rose-500 text-white border-rose-600'
            }`}
          >
            {delta > 0 ? `+${delta} 分` : `${delta} 分`}
          </div>
        </div>

        {/* 4. Current Score (目前的分數是什麼) */}
        <div className="mt-4 pt-3 border-t-2 border-stone-200/80 text-center flex flex-col items-center">
          <span className="text-xs font-bold text-stone-600 mb-1 flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-500" />
            目前的分數是：
          </span>

          {!isBatch && (
            <div className="flex items-center justify-center gap-1.5 font-pixel text-2xl sm:text-3xl font-black text-[#5a3818] bg-white/90 px-5 py-1.5 rounded-xl border-2 border-[#8b5a2b] shadow-sm">
              <PixelSprite name="coin_gold" size={24} />
              <span className="text-[#b45309]">{primaryScore}</span>
              <span className="text-base sm:text-lg text-[#5a3818] font-bold">分</span>
            </div>
          )}

          {isBatch && (
            <div className="text-xs font-pixel text-[#5a3818] bg-white/90 px-4 py-2 rounded-xl border-2 border-[#8b5a2b] shadow-sm max-h-24 overflow-y-auto w-full">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-left">
                {students.map((st) => (
                  <div key={st.id} className="truncate">
                    <span className="font-bold text-[#3d240d]">{st.name}: </span>
                    <span className="font-black text-[#b45309]">
                      {updatedScores[st.id] ?? st.points} 分
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 1.3s Timer Progress Line at Bottom */}
        <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full ${isPositive ? 'bg-emerald-500' : 'bg-orange-500'}`}
            style={{
              animation: 'progress1300ms 1.3s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress1300ms {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
};
