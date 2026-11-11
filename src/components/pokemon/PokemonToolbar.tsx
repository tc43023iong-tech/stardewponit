import React from 'react';

export type SortMode = 'id_asc' | 'score_desc' | 'neg_desc';

interface PokemonToolbarProps {
  sortMode: SortMode;
  onSetSortMode: (mode: SortMode) => void;
  eyeProtection: boolean;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
  isMultiSelect: boolean;
  onToggleMultiSelect: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectedCount: number;
  totalStudentsCount: number;
  onOpenMultiDraw: () => void;
  onSingleRandomPick: () => void;
  isPickingRandom: boolean;
  pickedCount: number;
  onResetPickedList: () => void;
  onBatchScoreSelected: () => void;
  onSendToCooldown: () => void;
  onResetClassPoints: () => void;
  onAddStudent: () => void;
  onOpenClassSettings: () => void;
  isTimerOpen: boolean;
  onToggleTimer: () => void;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const PokemonToolbar: React.FC<PokemonToolbarProps> = ({
  sortMode,
  onSetSortMode,
  eyeProtection,
  onOpenLeaderboard,
  onOpenAchievements,
  isMultiSelect,
  onToggleMultiSelect,
  onSelectAll,
  onDeselectAll,
  selectedCount,
  totalStudentsCount,
  onOpenMultiDraw,
  onSingleRandomPick,
  isPickingRandom,
  pickedCount,
  onResetPickedList,
  onBatchScoreSelected,
  onSendToCooldown,
  onResetClassPoints,
  onAddStudent,
  onOpenClassSettings,
  isTimerOpen,
  onToggleTimer,
  isMuted = false,
  onToggleSound,
}) => {
  const isDark = eyeProtection;

  const baseBtnClass =
    'px-4 py-2 font-black text-sm sm:text-base transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap rounded-2xl shadow-xs cursor-pointer';

  const defaultBtnClass = isDark
    ? `${baseBtnClass} bg-slate-850 border border-slate-700 text-slate-200 hover:bg-slate-800`
    : `${baseBtnClass} bg-white text-[#5D4037] border-2 border-[#D7CCC8] hover:border-[#F59E0B] hover:bg-[#FFFDF9]`;

  const activeOrangeBtnClass = isDark
    ? `${baseBtnClass} bg-[#F59E0B] text-white border border-[#B45309] shadow-md`
    : `${baseBtnClass} bg-[#F59E0B] text-white border-2 border-[#B45309] shadow-md`;

  const activeRedBtnClass = isDark
    ? `${baseBtnClass} bg-rose-700 text-white border border-rose-800 shadow-md`
    : `${baseBtnClass} bg-[#F43F5E] text-white border-2 border-[#9F1239] shadow-md`;

  const inactiveRedBtnClass = isDark
    ? `${baseBtnClass} bg-slate-850 border border-slate-700 text-rose-300 hover:bg-slate-800`
    : `${baseBtnClass} bg-white text-[#F43F5E] border-2 border-[#FECDD3] hover:border-[#F43F5E] hover:bg-[#FFF1F2]`;

  return (
    <div
      className={`mx-4 sm:mx-8 mt-2 p-3 rounded-[2.5rem] border-2 shadow-xs overflow-x-auto custom-scrollbar shrink-0 transition-colors duration-500 ${
        isDark ? 'bg-slate-900/85 border-slate-800' : 'bg-[#FFFDF9]/90 border-[#D7CCC8]'
      }`}
    >
      <div className="flex flex-nowrap items-center gap-3 min-w-max px-2 py-0.5">
        {/* Sort & Rank Group */}
        <div className="flex flex-nowrap gap-2 items-center">
          <button
            type="button"
            onClick={() => onSetSortMode('id_asc')}
            className={sortMode === 'id_asc' ? activeOrangeBtnClass : defaultBtnClass}
            title="依照學號排序"
          >
            學號
          </button>
          <button
            type="button"
            onClick={() => onSetSortMode('score_desc')}
            className={sortMode === 'score_desc' ? activeOrangeBtnClass : defaultBtnClass}
            title="依照分數高到低排序"
          >
            高到低
          </button>
          <button
            type="button"
            onClick={() => onSetSortMode('neg_desc')}
            className={sortMode === 'neg_desc' ? activeRedBtnClass : inactiveRedBtnClass}
            title="違規榜 / 負分排序"
          >
            👿
          </button>
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className={`${defaultBtnClass} hover:scale-105 !px-3.5`}
            title="每週龍虎榜 (Weekly Leaderboard)"
          >
            💯
          </button>
          <button
            type="button"
            onClick={onOpenAchievements}
            className={`${defaultBtnClass} hover:scale-105 !px-3.5`}
            title="學生積分成就系統 (Achievement System)"
          >
            🎖️ 成就
          </button>
        </div>

        {/* Multi-Select Controls */}
        <div
          className={`flex flex-nowrap items-center gap-1.5 p-1.5 px-3 rounded-2xl border transition-colors duration-500 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-[#D7CCC8]'
          }`}
        >
          <button
            type="button"
            onClick={onToggleMultiSelect}
            className={`${defaultBtnClass} !border-none !shadow-none !text-sm !px-3 ${
              isMultiSelect
                ? isDark
                  ? '!bg-amber-700 !text-white !rounded-xl'
                  : '!bg-[#F59E0B] !text-white !rounded-xl'
                : ''
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full mr-1.5 border-2 inline-block ${
                isMultiSelect
                  ? 'bg-white border-white'
                  : isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-slate-200 border-slate-300'
              }`}
            />
            多選
          </button>
          <div className={`w-[1px] h-4 mx-0.5 ${isDark ? 'bg-slate-800' : 'bg-stone-200'}`} />
          <button
            type="button"
            onClick={onSelectAll}
            className={`px-2.5 py-1 font-black text-xs rounded-xl transition-all cursor-pointer ${
              isDark ? 'text-amber-400 hover:bg-slate-800' : 'text-[#B45309] hover:bg-amber-50'
            }`}
          >
            全選
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className={`px-2.5 py-1 font-black text-xs rounded-xl transition-all cursor-pointer ${
              isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-stone-400 hover:bg-stone-50'
            }`}
          >
            取消
          </button>
        </div>

        {/* Lucky Draw Controls */}
        <div
          className={`flex flex-nowrap items-center rounded-2xl p-1.5 px-3 border-2 shadow-xs transition-colors duration-500 ${
            isDark ? 'bg-slate-950/70 border-yellow-600/80' : 'bg-[#FFF8E1] border-[#FDE68A]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenMultiDraw}
            className={`px-3 py-1 font-black text-sm cursor-pointer ${isDark ? 'text-yellow-400' : 'text-[#B45309]'}`}
          >
            👥 多人抽取
          </button>
          <div className={`w-[2px] h-4 mx-1 ${isDark ? 'bg-yellow-800/40' : 'bg-[#FDE68A]'}`} />
          <button
            type="button"
            onClick={onSingleRandomPick}
            disabled={isPickingRandom}
            className={`px-4 py-1 font-black text-sm hover:scale-102 transition-transform cursor-pointer disabled:opacity-50 ${
              isDark ? 'text-yellow-400' : 'text-[#B45309]'
            }`}
          >
            隨機 ({pickedCount}/{totalStudentsCount})
          </button>
          <button
            type="button"
            onClick={onResetPickedList}
            className={`ml-1 p-1 rounded-xl transition-colors border border-transparent cursor-pointer ${
              isDark ? 'hover:bg-yellow-950/40 text-yellow-500' : 'hover:bg-[#FDE68A] text-[#B45309]'
            }`}
            title="重設隨機抽中名單"
          >
            🔄
          </button>
        </div>

        {/* Batch Score Action */}
        <button
          type="button"
          onClick={onBatchScoreSelected}
          disabled={selectedCount === 0}
          className={`${baseBtnClass} ${
            isDark
              ? 'bg-slate-900 border border-slate-700 text-slate-400'
              : 'bg-[#E8F8F0] border-2 border-[#81C784] text-[#2E7D32]'
          } disabled:opacity-30 !text-sm`}
        >
          評分 ({selectedCount})
        </button>

        {/* Send to Cooldown */}
        <button
          type="button"
          onClick={onSendToCooldown}
          disabled={selectedCount === 0}
          className={`${baseBtnClass} ${
            isDark
              ? 'bg-cyan-950/40 border border-cyan-800/60 text-cyan-300'
              : 'bg-[#E0F7FA] border-2 border-[#00ACC1] text-[#006064]'
          } disabled:opacity-30 !text-sm`}
          title="將選中學生送入頂部冷靜區進行暫時隔離"
        >
          ❄️ 冷靜區({selectedCount})
        </button>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onResetClassPoints}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs border-2 bg-white border-[#D7CCC8] hover:border-[#8D6E63] text-[#5D4037] hover:scale-105 active:scale-90 transition-all cursor-pointer"
            title="重設全班分數"
          >
            🔙
          </button>
          <button
            type="button"
            onClick={onAddStudent}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs border-2 bg-[#FFF3E0] border-[#FFB74D] hover:border-[#F57C00] text-[#E65100] hover:scale-105 active:scale-90 transition-all cursor-pointer"
            title="新增學生"
          >
            👤+
          </button>
          <button
            type="button"
            onClick={onOpenClassSettings}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs border-2 bg-[#F3E5F5] border-[#CE93D8] hover:border-[#AB47BC] text-[#6A1B9A] hover:scale-105 active:scale-90 transition-all cursor-pointer"
            title="系統設定 & 名單管理"
          >
            ⚙️
          </button>
          {/* Sound Toggle Button */}
          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs border-2 hover:scale-105 active:scale-90 transition-all cursor-pointer select-none ${
                isMuted
                  ? isDark
                    ? 'bg-slate-800 border-rose-800 text-rose-400'
                    : 'bg-rose-50 border-rose-300 text-rose-600'
                  : isDark
                  ? 'bg-slate-800 border-emerald-800 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-600'
              }`}
              title={isMuted ? '音效已靜音 (Sound Muted - 點擊開啟)' : '音效播放中 (Sound On - 點擊靜音)'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTimer}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-xs border-2 hover:scale-105 active:scale-90 transition-all cursor-pointer ${
              isTimerOpen ? 'bg-[#F59E0B] border-[#B45309] text-white' : 'bg-white border-[#D7CCC8] text-[#5D4037]'
            }`}
            title="課堂計時器 (Class Timer)"
          >
            ⌚️
          </button>
        </div>
      </div>
    </div>
  );
};
