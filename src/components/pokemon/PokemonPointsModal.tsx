import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { POSITIVE_PRESETS, NEGATIVE_PRESETS } from '../../data/classroomData';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

interface PokemonPointsModalProps {
  students: Student[];
  onClose: () => void;
  onApplyPoints: (students: Student[], delta: number, reasonZh: string, reasonEn?: string) => void;
}

export const PokemonPointsModal: React.FC<PokemonPointsModalProps> = ({
  students,
  onClose,
  onApplyPoints,
}) => {
  const isMultiple = students.length > 1;
  const singleStudent = !isMultiple ? students[0] : null;

  // Custom delta input state
  const [customSign, setCustomSign] = useState<'+' | '-'>('+');
  const [customPointsInput, setCustomPointsInput] = useState<string>('5');
  const [customReason, setCustomReason] = useState<string>('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = parseInt(customPointsInput, 10);
    if (isNaN(rawVal) || rawVal === 0) return;
    const finalDelta = customSign === '+' ? Math.abs(rawVal) : -Math.abs(rawVal);
    const reasonText = customReason.trim() || (finalDelta > 0 ? '自訂加分獎勵' : '自訂扣分提醒');
    onApplyPoints(students, finalDelta, reasonText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#5D4037]">
        {/* Top Header */}
        <div className="bg-[#FFF3E0] py-3.5 px-6 md:px-8 flex justify-between items-center border-b-3 border-[#D7CCC8] shrink-0">
          <div className="flex items-center gap-3.5">
            {singleStudent ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#D7CCC8] p-1 flex items-center justify-center shadow-xs">
                  <img
                    src={resolveStudentAvatar(singleStudent)}
                    alt={singleStudent.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <span>{singleStudent.name}</span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white border border-[#D7CCC8] text-[#8D6E63]">
                      #{singleStudent.rollNo}
                    </span>
                  </h2>
                  <p className="text-xs font-bold text-[#8D6E63] flex items-center gap-2">
                    <span>目前得分：</span>
                    <span className="font-mono font-black text-sm text-[#2E7D32]">
                      {singleStudent.points} 分
                    </span>
                    <span>(正分 +{singleStudent.posPoints || 0} / 扣分 -{singleStudent.negPoints || 0})</span>
                  </p>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>⚡ 批次評分</span>
                  <span className="text-xs bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B] font-black rounded-full px-3 py-0.5">
                    已選取 {students.length} 位學生
                  </span>
                </h2>
                <p className="text-xs font-bold text-[#8D6E63] mt-0.5">
                  所有選中的學生將同步套用相同的評分項目 🌱
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8D6E63] hover:text-[#5D4037] active:scale-95 transition-all text-2xl font-black flex items-center justify-center border border-[#D7CCC8] shadow-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Top Fast Custom Points Input Row with +/- Toggle */}
        <form
          onSubmit={handleCustomSubmit}
          className="bg-[#FFF8E1] px-6 py-3 border-b-2 border-[#E7DFD5] flex flex-wrap items-center justify-between gap-3 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#8D6E63]">自訂分值：</span>
            {/* +/- Sign Toggle */}
            <div className="flex rounded-xl overflow-hidden border-2 border-[#D7CCC8] bg-white">
              <button
                type="button"
                onClick={() => setCustomSign('+')}
                className={`px-3 py-1 font-black text-sm transition-all cursor-pointer ${
                  customSign === '+'
                    ? 'bg-[#4CAF50] text-white shadow-xs'
                    : 'text-[#2E7D32] hover:bg-emerald-50'
                }`}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setCustomSign('-')}
                className={`px-3 py-1 font-black text-sm transition-all cursor-pointer ${
                  customSign === '-'
                    ? 'bg-[#F43F5E] text-white shadow-xs'
                    : 'text-[#C62828] hover:bg-rose-50'
                }`}
              >
                -
              </button>
            </div>

            {/* Points number input */}
            <input
              type="number"
              min="1"
              max="500"
              value={customPointsInput}
              onChange={(e) => setCustomPointsInput(e.target.value)}
              className="w-16 px-2 py-1 text-center font-mono font-black text-base bg-white rounded-xl border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <span className="text-xs font-bold text-stone-500">分</span>
          </div>

          {/* Reason input */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="輸入自訂評記事由 (選填)..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full px-3 py-1.5 bg-white rounded-xl border border-[#D7CCC8] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <button
            type="submit"
            className="item-wobble-hover px-5 py-1.5 rounded-xl font-black text-xs text-white bg-[#F59E0B] hover:bg-[#D97706] shadow-sm cursor-pointer whitespace-nowrap"
          >
            ⚡ 快速套用
          </button>
        </form>

        {/* Dual Column Scrollable Grid: Left = Positive, Right = Negative */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-3 divide-[#E7DFD5] bg-[#FFFBF0]/20">
          {/* Left Column: Positive Presets */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="py-2.5 px-4 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between shrink-0">
              <span className="font-black text-sm text-[#2E7D32] flex items-center gap-1.5">
                <span>🌱</span> 獎勵加分項目 ({POSITIVE_PRESETS.length})
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                點擊直接發送
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {POSITIVE_PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onApplyPoints(students, item.points, item.labelZh, item.labelEn)}
                  className="item-wobble-hover w-full flex items-center justify-between p-2.5 px-3.5 rounded-2xl bg-white hover:bg-emerald-50/60 border-2 border-emerald-100 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xl group-hover:scale-115 transition-transform">{item.icon}</span>
                    <div className="truncate">
                      <div className="font-black text-sm text-[#2E7D32] truncate">{item.labelZh}</div>
                      <div className="text-[10px] text-stone-400 font-bold truncate">{item.labelEn}</div>
                    </div>
                  </div>
                  <span className="font-mono font-black text-base text-white bg-[#2E7D32] px-2.5 py-0.5 rounded-xl shadow-xs shrink-0">
                    +{item.points}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Negative Presets */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="py-2.5 px-4 bg-rose-50/80 border-b border-rose-200 flex items-center justify-between shrink-0">
              <span className="font-black text-sm text-[#C62828] flex items-center gap-1.5">
                <span>⚠️</span> 違紀扣分項目 ({NEGATIVE_PRESETS.length})
              </span>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                點擊扣除分值
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {NEGATIVE_PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onApplyPoints(students, item.points, item.labelZh, item.labelEn)}
                  className="item-wobble-hover w-full flex items-center justify-between p-2.5 px-3.5 rounded-2xl bg-white hover:bg-rose-50/60 border-2 border-rose-100 hover:border-rose-400 shadow-xs hover:shadow-md transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xl group-hover:scale-115 transition-transform">{item.icon}</span>
                    <div className="truncate">
                      <div className="font-black text-sm text-[#C62828] truncate">{item.labelZh}</div>
                      <div className="text-[10px] text-stone-400 font-bold truncate">{item.labelEn}</div>
                    </div>
                  </div>
                  <span className="font-mono font-black text-base text-white bg-[#C62828] px-2.5 py-0.5 rounded-xl shadow-xs shrink-0">
                    {item.points}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
