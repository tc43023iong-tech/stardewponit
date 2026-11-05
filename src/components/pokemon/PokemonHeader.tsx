import React from 'react';
import { ClassroomClass } from '../../types/classroom';

interface PokemonHeaderProps {
  classes: ClassroomClass[];
  currentClassId: string;
  onSelectClass: (id: string) => void;
  eyeProtection: boolean;
  onToggleEyeProtection: () => void;
  onOpenExport: () => void;
  onOpenImport: () => void;
  onOpenQuickBatch: () => void;
  onSwitchToStardew: () => void;
}

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  classes,
  currentClassId,
  onSelectClass,
  eyeProtection,
  onToggleEyeProtection,
  onOpenExport,
  onOpenImport,
  onOpenQuickBatch,
  onSwitchToStardew,
}) => {
  const isDark = eyeProtection;

  const baseBtnClass =
    'px-4 py-2 font-black text-sm sm:text-base transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap rounded-2xl shadow-xs cursor-pointer';

  const defaultBtnClass = isDark
    ? `${baseBtnClass} bg-slate-850 border border-slate-700 text-slate-200 hover:bg-slate-800`
    : `${baseBtnClass} bg-white text-[#5D4037] border-2 border-[#D7CCC8] hover:border-[#F59E0B] hover:bg-[#FFFDF9]`;

  const quickBatchBtnClass = isDark
    ? `${baseBtnClass} bg-slate-800 text-emerald-300 border border-slate-700 hover:bg-slate-750 hover:scale-102`
    : `${baseBtnClass} bg-[#E8F8F0] text-[#2E7D32] border-2 border-[#81C784] hover:bg-[#C8E6C9] hover:scale-102`;

  const farmBtnClass = isDark
    ? `${baseBtnClass} bg-amber-950/80 text-amber-300 border-2 border-amber-600/80 hover:bg-amber-900 hover:scale-105 ring-2 ring-amber-400/30`
    : `${baseBtnClass} bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] text-[#78350F] border-2 border-[#F59E0B] hover:from-[#FDE68A] hover:to-[#FCD34D] hover:scale-105 shadow-md ring-2 ring-amber-300/60`;

  return (
    <header
      className={`py-4 px-6 md:px-10 flex flex-col lg:flex-row justify-between items-center shadow-md border-b-4 relative overflow-hidden shrink-0 transition-colors duration-500 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-[#FFFDF9]/95 border-[#8D6E63] backdrop-blur-xs'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl select-none animate-bounce" role="img" aria-label="sprout">
          🌱
        </span>
        <div className="flex flex-col">
          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight drop-shadow-xs select-none transition-colors duration-500 ${
              isDark ? 'text-slate-100' : 'text-[#5D4037]'
            }`}
          >
            Miss Iong's Class
          </h1>
          <span className="text-xs font-bold text-stone-400 tracking-wider">
            POKÉMON CLASS POINTS MANAGER ⚡
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 items-center justify-center mt-3 lg:mt-0">
        {/* Sleep / Eye-protection Mode Toggle */}
        <button
          type="button"
          onClick={onToggleEyeProtection}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs border-2 cursor-pointer transition-all active:scale-90 hover:scale-105 select-none ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-750'
              : 'bg-white border-[#D7CCC8] hover:border-[#F59E0B] text-slate-700'
          }`}
          title="請準備休息 (護眼模式)/Sleep Mode Toggle"
        >
          💤
        </button>

        {/* Class Selection Dropdown */}
        <div className="relative group">
          <select
            className={`appearance-none font-black py-2.5 px-6 pr-10 cursor-pointer focus:outline-none rounded-2xl shadow-xs border-2 text-base transition-all ${
              isDark
                ? 'bg-slate-850 text-slate-100 border-slate-750 hover:bg-slate-800'
                : 'bg-white text-[#5D4037] border-[#8D6E63] hover:bg-[#FFFDF9]'
            }`}
            value={currentClassId}
            onChange={(e) => onSelectClass(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id} className="text-slate-800 font-bold">
                {c.className}
              </option>
            ))}
          </select>
          <div
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-black ${
              isDark ? 'text-slate-300' : 'text-[#8D6E63]'
            }`}
          >
            ▼
          </div>
        </div>

        {/* Export Button */}
        <button type="button" onClick={onOpenExport} className={defaultBtnClass} title="匯出班級資料 (JSON / CSV)">
          📤 匯出
        </button>

        {/* Import Button */}
        <button type="button" onClick={onOpenImport} className={defaultBtnClass} title="匯入班級資料 (JSON / CSV)">
          📥 匯入
        </button>

        {/* Quick Batch Scoring Button */}
        <button
          type="button"
          onClick={onOpenQuickBatch}
          className={quickBatchBtnClass}
          title="快速整批評分 (免動畫極速登記)"
        >
          ⚡ 快速整批評分
        </button>

        {/* FARM EMOJI BUTTON - DIRECTLY TO THE RIGHT OF 快速整批評分 AS REQUESTED */}
        <button
          type="button"
          onClick={onSwitchToStardew}
          className={farmBtnClass}
          title="進入星露谷課堂介面 (Stardew Valley Classroom) 🌱"
        >
          <span className="text-xl animate-pulse">🏡</span>
          <span className="font-black text-xs sm:text-sm tracking-tight">星露谷農場</span>
        </button>
      </div>
    </header>
  );
};
