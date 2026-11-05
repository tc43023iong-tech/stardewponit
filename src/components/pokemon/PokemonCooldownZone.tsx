import React from 'react';
import { Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

export interface CoolingStudentItem {
  id: string;
  timeLeft: number;
  duration: number;
}

interface PokemonCooldownZoneProps {
  coolingList: CoolingStudentItem[];
  students: Student[];
  eyeProtection: boolean;
  onReleaseStudent: (studentId: string) => void;
  onReleaseAll: () => void;
}

export const PokemonCooldownZone: React.FC<PokemonCooldownZoneProps> = ({
  coolingList,
  students,
  eyeProtection,
  onReleaseStudent,
  onReleaseAll,
}) => {
  const isDark = eyeProtection;
  if (coolingList.length === 0) return null;

  const totalTimeLeft = coolingList.reduce((acc, curr) => acc + curr.timeLeft, 0);
  const totalDuration = Math.max(1, coolingList.reduce((acc, curr) => acc + curr.duration, 0));
  const progressPercent = Math.min(100, Math.max(0, (totalTimeLeft / totalDuration) * 100));

  return (
    <div
      className={`mx-4 sm:mx-8 mt-2 p-5 rounded-[2.5rem] border-3 shadow-md flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-500 ${
        isDark ? 'bg-slate-900/90 border-cyan-850 text-cyan-200' : 'bg-[#E0F7FA]/70 border-[#00ACC1] text-[#006064]'
      }`}
    >
      <div className="flex flex-col gap-3 w-full md:w-auto flex-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-pulse">❄️</span>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            頂部冷靜區 <span className="text-sm opacity-80">(Cooldown Zone)</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2.5 items-center">
          {coolingList.map((item) => {
            const student = students.find((s) => s.id === item.id);
            if (!student) return null;
            const avatarUrl = resolveStudentAvatar(student);

            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full border-2 shadow-xs transition-all hover:scale-102 ${
                  isDark ? 'bg-slate-950/80 border-cyan-800/60 text-cyan-300' : 'bg-white border-[#00ACC1] text-[#006064]'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center border border-[#00ACC1]/40 shrink-0">
                  <img
                    src={avatarUrl}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    alt={student.name}
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-black text-sm">{student.name}</span>
                  <span className="text-[9px] opacity-75">#{student.rollNo}</span>
                </div>
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 animate-pulse">
                  {item.timeLeft}s
                </span>
                <button
                  type="button"
                  onClick={() => onReleaseStudent(item.id)}
                  className="w-5 h-5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center text-sm font-black cursor-pointer transition-all active:scale-90 ml-0.5"
                  title="結束此學生的冷靜狀態 / Release student"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
        <div className="flex flex-col gap-1 w-full sm:w-56">
          <div className="flex justify-between items-center font-black text-xs px-1 text-[#006064]">
            <span>累積剩餘冷靜時間</span>
            <span className="font-mono text-sm">{totalTimeLeft}s</span>
          </div>
          <div className="w-full bg-white/70 h-5 rounded-full overflow-hidden p-[2px] border-2 border-[#00ACC1]/40">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onReleaseAll}
          className="px-5 py-2.5 font-black text-sm bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl shadow-xs border-b-2 border-blue-700 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="一鍵結束所有學生的冷靜狀態 / Release all students"
        >
          🔥 釋放所有 ({coolingList.length})
        </button>
      </div>
    </div>
  );
};
