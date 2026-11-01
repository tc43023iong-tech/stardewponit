import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { getCropGrowth, getFarmTier } from '../../data/classroomData';
import { PixelSprite } from '../common/PixelSprite';
import { AvatarRenderer } from './AvatarRenderer';
import { StudentFarmDetailModal } from './StudentFarmDetailModal';
import { soundManager } from '../../utils/sound';
import { Sprout, Star, Plus, Eye, Sparkles } from 'lucide-react';

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

  const getFarmSpriteForPoints = (points: number): string => {
    if (points >= 1000) return 'trophy';
    if (points >= 750) return 'melon';
    if (points >= 500) return 'junimo';
    if (points >= 300) return 'cow';
    if (points >= 150) return 'melon';
    if (points >= 50) return 'sunflower';
    if (points >= 20) return 'chicken';
    return 'rabbit';
  };

  const handleOpenStudentFarm = (student: Student) => {
    soundManager.playCorrect();
    setInspectingStudent(student);
  };

  return (
    <div className="space-y-4">
      {/* Farm Header */}
      <div className="pixel-parchment p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#70b05b] border-2 border-[#285416] rounded-lg flex items-center justify-center text-white shadow">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-pixel text-sm sm:text-base text-[#4a2800]">
              🌾 星露谷班級豐收田園 (Classroom Farm)
            </h3>
            <p className="text-xs text-stone-600 font-bold">
              點擊任一學生的田園地塊，即可走進他們的個人農場！分數越高（最高 1000 分），動植物越多越熱鬧！
            </p>
          </div>
        </div>

        {/* 1000分 Scale Legend */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#5a3818] flex-wrap bg-[#f5e0b7] px-3 py-1.5 rounded-lg border border-[#c4a675]">
          <span className="flex items-center gap-1">🌱 嫩苗(0分)</span>
          <span>→</span>
          <span className="flex items-center gap-1">🌻 向日葵(50分)</span>
          <span>→</span>
          <span className="flex items-center gap-1">🌽 牧場(150分)</span>
          <span>→</span>
          <span className="flex items-center gap-1">🍇 秘境(500分)</span>
          <span>→</span>
          <span className="flex items-center gap-1 text-amber-800 font-black">👑 滿級極致(1000分)</span>
        </div>
      </div>

      {/* Main Soil Farm Field Grid */}
      <div className="bg-[#5a3311] border-4 border-[#2b1807] p-4 sm:p-6 rounded-2xl shadow-2xl relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {students.map((st) => {
            const crop = getCropGrowth(st.points);
            const farmTier = getFarmTier(st.points);
            const farmSprite = getFarmSpriteForPoints(st.points);

            return (
              <div
                key={st.id}
                onClick={() => handleOpenStudentFarm(st)}
                className={`group relative p-2.5 rounded-xl border-3 transition-all cursor-pointer flex flex-col items-center justify-between select-none ${
                  st.points >= 1000
                    ? 'bg-gradient-to-b from-[#fef08a] to-[#22c55e] border-[#ffd700] ring-4 ring-amber-400 shadow-xl scale-102'
                    : st.points >= 500
                    ? 'bg-gradient-to-b from-[#f3e8ff] to-[#15803d] border-[#a855f7] shadow-lg hover:scale-105'
                    : st.points >= 150
                    ? 'bg-gradient-to-b from-[#e0f2fe] to-[#16a34a] border-[#38bdf8] shadow-md hover:scale-105'
                    : 'bg-[#783e16] hover:bg-[#8a4719] border-[#4a2208] shadow-sm hover:scale-105'
                }`}
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
                }}
              >
                {/* 1000分 Sparkle */}
                {st.points >= 1000 && (
                  <span className="absolute -top-2 -right-2 text-sm animate-ping">
                    👑
                  </span>
                )}

                {/* Top Bar on Tile: Roll No & Score */}
                <div className="w-full flex items-center justify-between text-[10px] mb-1">
                  <span className="font-pixel px-1.5 py-0.5 rounded bg-[#3b1f0b] text-[#ffd700] border border-[#5a3818]">
                    #{st.rollNo}
                  </span>
                  <span className="font-pixel text-[11px] font-bold text-[#ffd700] bg-[#251306]/80 px-1 rounded">
                    {st.points} 分
                  </span>
                </div>

                {/* Central Crop / Animal Sprite on Field Tile */}
                <div className="my-2 relative flex items-center justify-center h-14 w-14">
                  <PixelSprite
                    name={farmSprite}
                    size={46}
                    className="group-hover:scale-125 transition-transform drop-shadow-md"
                    animate={st.points >= 50}
                  />
                  {st.points >= 1000 && (
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      ✨
                    </span>
                  )}
                </div>

                {/* Student Avatar & Name */}
                <div className="flex items-center gap-1.5 w-full justify-center mt-1">
                  <AvatarRenderer avatar={st.avatar} name={st.name} size={22} />
                  <span
                    className={`font-extrabold text-xs truncate max-w-[80px] ${
                      st.points >= 150 ? 'text-[#1e293b]' : 'text-[#ffebb3]'
                    }`}
                  >
                    {st.name}
                  </span>
                </div>

                {/* Growth Stage Pill */}
                <div className="mt-1 text-[9px] font-bold text-[#ffe066] truncate text-center">
                  {crop.label.split(' ')[0]}
                </div>

                {/* Click to enter hint on hover */}
                <div className="mt-1.5 w-full bg-[#faeed1] hover:bg-[#fff9ea] text-[#5a3818] text-[10px] font-bold py-0.5 rounded border border-[#8b5a2b] flex items-center justify-center gap-1 shadow-xs group-hover:bg-[#fabc3f] group-hover:text-[#4a2800] transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>進入農場</span>
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
