import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getCropGrowth } from '../../data/classroomData';
import { getStudentFarmArtwork } from '../../utils/farmArtwork';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentFarmDetailModal } from './StudentFarmDetailModal';
import { soundManager } from '../../utils/sound';
import { Sprout, Eye } from 'lucide-react';

interface FarmShowcaseViewProps {
  students: Student[];
  onOpenPointsModal: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
}

export const FarmShowcaseView: React.FC<FarmShowcaseViewProps> = ({
  students,
  onOpenPointsModal,
  onQuickAdd,
}) => {
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  const handleOpenStudentFarm = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Farm Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4c8c38] border-2 border-[#285416] rounded-lg flex items-center justify-center text-white shadow">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🌾 星露谷班級豐收田園 (Classroom Farm)
            </h3>
            <p className="text-xs text-stone-700 font-bold">
              每湊夠 50 分即解鎖全新 16-bit 農莊背景（50 → 1000 分共 20 種專屬背景）！點擊學生卡片即可進入實景農場、動物圖鑑與植物圖鑑！
            </p>
          </div>
        </div>

        {/* 1000分 50-Point Progression Scale Legend */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="text-rose-800">🌧️ &lt;0烏鴉荒地</span>
          <span aria-hidden="true">·</span>
          <span>🪵 0起點</span>
          <span aria-hidden="true">→</span>
          <span>💠 50藍花</span>
          <span aria-hidden="true">→</span>
          <span>🌻 100向日葵</span>
          <span aria-hidden="true">→</span>
          <span>🏡 200紅屋牧場</span>
          <span aria-hidden="true">→</span>
          <span>🍎 300果園</span>
          <span aria-hidden="true">→</span>
          <span>🌿 400溫室</span>
          <span aria-hidden="true">→</span>
          <span>🔮 500紫晶</span>
          <span aria-hidden="true">→</span>
          <span>🌸 600櫻花</span>
          <span aria-hidden="true">→</span>
          <span>🌙 700星月</span>
          <span aria-hidden="true">→</span>
          <span>🏖️ 800海濱</span>
          <span aria-hidden="true">→</span>
          <span>👑 900金宮</span>
          <span aria-hidden="true">→</span>
          <span className="text-amber-900 font-black">✨ 1000極光 (每50分換1張!)</span>
        </div>
      </div>

      {/* Pixel-Art Student Farm Cards Grid */}
      <div className="bg-[#3d220a] border-4 border-[#251305] p-3.5 sm:p-5 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {students.map((st) => {
            const crop = getCropGrowth(st.points);
            const artwork = getStudentFarmArtwork(st.points);
            const companionId = st.stardewAvatar || st.avatar || 'sdv_white_chicken';

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentFarm(st)}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer select-none aspect-[16/11] flex flex-col justify-between bg-[#2b1807] shadow-md hover:shadow-2xl hover:-translate-y-0.5 ${
                  st.points < 0
                    ? 'border-[#f43f5e]/80 ring-1 ring-rose-500/40'
                    : st.points >= 1000
                    ? 'border-[#fbbf24] ring-2 ring-[#fde047]'
                    : st.points >= 700
                    ? 'border-[#818cf8]'
                    : st.points >= 400
                    ? 'border-[#c084fc]'
                    : st.points >= 100
                    ? 'border-[#4ade80]'
                    : 'border-[#8b5a2b] hover:border-[#fbbf24]'
                }`}
              >
                {/* 16-bit Pixel Art Farm Backdrop */}
                <img
                  src={artwork.bgUrl}
                  alt={`${st.name} 的星露谷農場`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />

                {/* Measured Contrast Scrim for Crisp Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/60 pointer-events-none" />

                {/* Top Row: Roll No & Points */}
                <div className="relative z-10 px-2.5 pt-2 flex items-center justify-between text-xs text-white">
                  <span className="font-mono font-black tracking-tight tabular-nums drop-shadow-sm">
                    #{String(st.rollNo).padStart(2, '0')} {st.name}
                  </span>
                  <span className="font-mono font-black text-[#fde047] tabular-nums drop-shadow-sm">
                    {st.points} 分
                  </span>
                </div>

                {/* Pasture Foreground: Negative score -> ONLY a lone crow; positive -> Companion + Tier Crop */}
                <div className="relative z-10 flex items-end justify-center gap-3 my-auto pt-3 pointer-events-none">
                  {st.points < 0 ? (
                    <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                      <AvatarRenderer avatar="sdv_crow" name="田間烏鴉" size={44} bare={true} />
                      <div className="w-7 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                    </div>
                  ) : (
                    <>
                      <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                        <AvatarRenderer avatar={companionId} name={st.name} size={46} bare={true} />
                        <div className="w-8 h-1.5 bg-black/45 rounded-full blur-[1px] -mt-1" />
                      </div>
                      <div className="relative flex flex-col items-center group-hover:scale-110 transition-transform duration-200">
                        <AvatarRenderer avatar={artwork.showcaseCropId} name={crop.label} size={32} bare={true} />
                        <div className="w-5 h-1 bg-black/40 rounded-full blur-[1px] -mt-0.5" />
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Row: Farm Stage & Action */}
                <div className="relative z-10 px-2.5 pb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-100/95 font-bold truncate drop-shadow-sm">
                    {artwork.showcaseLabel}
                  </span>
                  <span className="text-[#fde047] font-bold flex items-center gap-1 shrink-0 group-hover:text-white transition-colors whitespace-nowrap">
                    <Eye className="w-3 h-3" />
                    進入
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Student Farm Exploration Modal */}
      {inspectingStudent && (
        <StudentFarmDetailModal
          student={inspectingStudent}
          onClose={() => setInspectingStudent(null)}
          onQuickAdd={onQuickAdd}
          onOpenPointsModal={onOpenPointsModal}
        />
      )}
    </div>
  );
};
