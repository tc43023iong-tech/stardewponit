import React from 'react';
import { Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

interface PokemonLeaderboardModalProps {
  students: Student[];
  onClose: () => void;
  onStudentClick: (student: Student) => void;
}

export const PokemonLeaderboardModal: React.FC<PokemonLeaderboardModalProps> = ({
  students,
  onClose,
  onStudentClick,
}) => {
  const sorted = [...students].sort((a, b) => b.points - a.points);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#5D4037]">
        {/* Header */}
        <div className="bg-[#FFF3E0] py-4 px-6 md:px-8 flex justify-between items-center border-b-3 border-[#D7CCC8] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💯</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">每週榮譽龍虎榜 (Class Leaderboard)</h2>
              <p className="text-xs text-[#8D6E63] font-bold">全班個人積分實時排名榮耀展示</p>
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

        {/* Podium Area for Top 3 */}
        {sorted.length >= 3 && (
          <div className="bg-gradient-to-b from-[#FEF3C7]/40 to-transparent p-5 pb-3 flex justify-center items-end gap-3 sm:gap-6 border-b border-[#E7DFD5] shrink-0">
            {/* 2nd Place */}
            {second && (
              <div
                onClick={() => onStudentClick(second)}
                className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105"
              >
                <span className="text-2xl mb-1">🥈</span>
                <img
                  src={resolveStudentAvatar(second)}
                  alt={second.name}
                  className="w-16 h-16 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-black text-sm text-[#5D4037] mt-1">{second.name}</span>
                <span className="font-mono font-black text-sm text-[#2E7D32]">{second.points} 分</span>
                <div className="w-20 sm:w-24 h-16 bg-gradient-to-t from-slate-300 to-slate-200 border-2 border-slate-400 rounded-t-xl mt-2 flex items-center justify-center font-black text-lg text-slate-700 shadow-sm">
                  #2
                </div>
              </div>
            )}

            {/* 1st Place */}
            {first && (
              <div
                onClick={() => onStudentClick(first)}
                className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105 -translate-y-2"
              >
                <span className="text-3xl mb-1 animate-bounce">👑</span>
                <img
                  src={resolveStudentAvatar(first)}
                  alt={first.name}
                  className="w-20 h-20 object-contain drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="font-black text-base text-[#B45309] mt-1">{first.name}</span>
                <span className="font-mono font-black text-base text-[#2E7D32]">{first.points} 分</span>
                <div className="w-24 sm:w-28 h-24 bg-gradient-to-t from-amber-400 to-yellow-300 border-2 border-amber-500 rounded-t-2xl mt-2 flex items-center justify-center font-black text-2xl text-amber-950 shadow-md">
                  #1
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {third && (
              <div
                onClick={() => onStudentClick(third)}
                className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105"
              >
                <span className="text-2xl mb-1">🥉</span>
                <img
                  src={resolveStudentAvatar(third)}
                  alt={third.name}
                  className="w-16 h-16 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-black text-sm text-[#5D4037] mt-1">{third.name}</span>
                <span className="font-mono font-black text-sm text-[#2E7D32]">{third.points} 分</span>
                <div className="w-20 sm:w-24 h-12 bg-gradient-to-t from-amber-700/40 to-amber-600/30 border-2 border-amber-700/50 rounded-t-xl mt-2 flex items-center justify-center font-black text-lg text-amber-900 shadow-sm">
                  #3
                </div>
              </div>
            )}
          </div>
        )}

        {/* Full Ranking List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 custom-scrollbar">
          {sorted.map((student, idx) => {
            const avatarUrl = resolveStudentAvatar(student);
            const rankNum = idx + 1;

            return (
              <div
                key={student.id}
                onClick={() => onStudentClick(student)}
                className="flex items-center justify-between p-3 px-4 rounded-2xl bg-white border border-[#E7DFD5] hover:border-[#F59E0B] shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-xs ${
                      rankNum === 1
                        ? 'bg-amber-400 text-amber-950'
                        : rankNum === 2
                        ? 'bg-slate-300 text-slate-800'
                        : rankNum === 3
                        ? 'bg-amber-700/30 text-amber-900'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    #{rankNum}
                  </span>
                  <img
                    src={avatarUrl}
                    alt={student.name}
                    className="w-10 h-10 object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-base">{student.name}</span>
                    <span className="text-[11px] text-stone-400 font-bold">
                      座號 #{student.rollNo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-emerald-700 font-bold">+{student.posPoints || 0}</span>
                    <span className="text-stone-300">/</span>
                    <span className="text-rose-700 font-bold">-{student.negPoints || 0}</span>
                  </div>
                  <div className="font-mono font-black text-xl text-[#2E7D32] min-w-[60px] text-right">
                    {student.points} 分
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
