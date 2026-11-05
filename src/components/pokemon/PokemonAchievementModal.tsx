import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

interface PokemonAchievementModalProps {
  students: Student[];
  onClose: () => void;
}

interface AchievementDef {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  check: (s: Student, allStudents: Student[]) => boolean;
}

const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'ach_100',
    title: '破百榮譽大師',
    desc: '個人總分達到 100 分以上',
    icon: '💯',
    color: 'from-amber-400 to-yellow-500 border-amber-500 text-amber-950',
    check: (s) => s.points >= 100,
  },
  {
    id: 'ach_pos_50',
    title: '積極學習先鋒',
    desc: '累計獲得獎勵加分達到 50 分以上',
    icon: '🚀',
    color: 'from-emerald-400 to-green-500 border-green-500 text-green-950',
    check: (s) => (s.posPoints || 0) >= 50,
  },
  {
    id: 'ach_zero_neg',
    title: '零違規品格模範',
    desc: '保持 0 扣分且累計獲得 20 分以上獎勵',
    icon: '🛡️',
    color: 'from-blue-400 to-cyan-500 border-blue-500 text-blue-950',
    check: (s) => (s.negPoints || 0) === 0 && (s.posPoints || 0) >= 20,
  },
  {
    id: 'ach_champion',
    title: '課堂巔峰霸主',
    desc: '榮登全班總分第 1 名寶座',
    icon: '👑',
    color: 'from-purple-400 to-pink-500 border-purple-500 text-purple-950',
    check: (s, all) => {
      const highest = Math.max(...all.map((x) => x.points));
      return s.points === highest && highest > 0;
    },
  },
  {
    id: 'ach_early_bird',
    title: '閃耀新星',
    desc: '累計得分超過 30 分',
    icon: '🌟',
    color: 'from-orange-400 to-amber-500 border-orange-500 text-orange-950',
    check: (s) => s.points >= 30,
  },
];

export const PokemonAchievementModal: React.FC<PokemonAchievementModalProps> = ({
  students,
  onClose,
}) => {
  const [selectedAchievement, setSelectedAchievement] = useState<string>(ACHIEVEMENTS[0].id);
  const activeAch = ACHIEVEMENTS.find((a) => a.id === selectedAchievement) || ACHIEVEMENTS[0];
  const unlockedStudents = students.filter((s) => activeAch.check(s, students));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#5D4037]">
        {/* Header */}
        <div className="bg-[#FFF3E0] py-4 px-6 md:px-8 flex justify-between items-center border-b-3 border-[#D7CCC8] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎖️</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">學生積分成就榮譽堂</h2>
              <p className="text-xs text-[#8D6E63] font-bold">解鎖專屬頭銜徽章，表彰卓越品格與學習態度</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8D6E63] hover:text-[#5D4037] active:scale-95 transition-all text-2xl font-black flex items-center justify-center border border-[#D7CCC8] shadow-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Achievement Badges Selector Row */}
        <div className="p-4 bg-[#FFF8E1] border-b border-[#E7DFD5] flex gap-2.5 overflow-x-auto custom-scrollbar shrink-0">
          {ACHIEVEMENTS.map((ach) => {
            const count = students.filter((s) => ach.check(s, students)).length;
            const isSelected = ach.id === selectedAchievement;

            return (
              <button
                key={ach.id}
                type="button"
                onClick={() => setSelectedAchievement(ach.id)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 min-w-[130px] cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#F59E0B] shadow-md scale-102 ring-2 ring-[#F59E0B]/40'
                    : 'bg-white/70 border-stone-200 hover:bg-white text-stone-600'
                }`}
              >
                <span className="text-2xl">{ach.icon}</span>
                <span className="font-black text-xs whitespace-nowrap">{ach.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {count} 人解鎖
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Achievement Details Banner */}
        <div className="px-6 py-3.5 bg-white border-b border-[#E7DFD5] flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0">
            {activeAch.icon}
          </div>
          <div>
            <h3 className="font-black text-lg text-[#5D4037] flex items-center gap-2">
              <span>{activeAch.title}</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                解鎖名單 ({unlockedStudents.length} 人)
              </span>
            </h3>
            <p className="text-xs text-[#8D6E63] font-bold mt-0.5">{activeAch.desc}</p>
          </div>
        </div>

        {/* Unlocked Students Grid */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#FFFBF0]/30">
          {unlockedStudents.length === 0 ? (
            <div className="py-16 text-center text-stone-400 font-black flex flex-col items-center gap-2">
              <span className="text-4xl opacity-50">🔒</span>
              <span>目前尚無學生達成此成就，繼續努力！</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {unlockedStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white border-2 border-[#E7DFD5] shadow-xs hover:border-[#F59E0B] transition-all"
                >
                  <img
                    src={resolveStudentAvatar(student)}
                    alt={student.name}
                    className="w-14 h-14 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-black text-base text-[#5D4037] mt-1">{student.name}</span>
                  <span className="text-xs text-stone-400 font-bold">#{student.rollNo}</span>
                  <span className="font-mono font-black text-xs text-[#2E7D32] mt-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {student.points} 分
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
