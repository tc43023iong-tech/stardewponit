import React, { useState } from 'react';
import { Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';
import { pokemonSound } from '../../utils/pokemonAudio';

interface PokemonQuickBatchModalProps {
  students: Student[];
  onClose: () => void;
  onSubmitBatch: (deltas: Record<string, number>, reason: string) => void;
}

export const PokemonQuickBatchModal: React.FC<PokemonQuickBatchModalProps> = ({
  students,
  onClose,
  onSubmitBatch,
}) => {
  const [deltas, setDeltas] = useState<Record<string, number>>({});
  const [reason, setReason] = useState<string>('快速登記');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.rollNo).includes(searchQuery)
  );

  const handleDeltaChange = (studentId: string, val: string) => {
    const num = parseInt(val, 10);
    setDeltas((prev) => ({
      ...prev,
      [studentId]: isNaN(num) ? 0 : num,
    }));
  };

  const adjustDelta = (studentId: string, diff: number) => {
    if (diff > 0) {
      pokemonSound.playTimerClick();
    } else {
      pokemonSound.playUndo();
    }
    setDeltas((prev) => ({
      ...prev,
      [studentId]: (prev[studentId] || 0) + diff,
    }));
  };

  const handleApplyAll = (val: number) => {
    if (val > 0) {
      pokemonSound.playPointUp();
    } else {
      pokemonSound.playPointDown();
    }
    const newDeltas: Record<string, number> = {};
    students.forEach((s) => {
      newDeltas[s.id] = (deltas[s.id] || 0) + val;
    });
    setDeltas(newDeltas);
  };

  const handleClearAll = () => {
    setDeltas({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBatch(deltas, reason.trim() || '快速登記');
  };

  const nonZeroCount = Object.values(deltas).filter((v) => v !== 0).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl border-4 border-[#8D6E63] shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#5D4037]">
        {/* Header */}
        <div className="bg-[#FFF3E0] py-4 px-6 md:px-8 flex justify-between items-center border-b-3 border-[#D7CCC8] shrink-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
              <span>⚡ 快速整批評分</span>
              <span className="text-xs bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B] font-black rounded-full px-3 py-0.5">
                免動畫極速登記
              </span>
            </h2>
            <p className="text-[#8D6E63] text-xs font-bold mt-1">
              在表格中快速調整全班加減分，一鍵批次登記並播放音效 🌱
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8D6E63] hover:text-[#5D4037] active:scale-95 transition-all text-2xl font-black flex items-center justify-center border border-[#D7CCC8] shadow-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Action Controls & Quick Fill */}
        <div className="p-4 bg-[#FFF8E1] border-b border-[#E7DFD5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[220px]">
            <input
              type="text"
              placeholder="🔍 搜尋姓名或座號..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-xl border border-[#D7CCC8] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-black text-[#8D6E63] mr-1">全班快捷：</span>
            {[+1, +2, +5, -1, -2, -5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleApplyAll(val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                  val > 0
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                }`}
              >
                {val > 0 ? `+${val}` : val}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-1 rounded-lg text-xs font-black bg-stone-100 text-stone-600 border border-stone-300 hover:bg-stone-200 cursor-pointer"
            >
              清空
            </button>
          </div>
        </div>

        {/* Student Table */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 space-y-4 bg-[#FFFBF0]/30">
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar border-2 border-[#E7DFD5] rounded-2xl p-2 bg-white/80">
            {filteredStudents.length === 0 ? (
              <div className="py-12 text-center text-stone-400 font-black text-lg">
                無此條件的學生 🥺
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredStudents.map((student) => {
                  const avatarUrl = resolveStudentAvatar(student);
                  const currentDelta = deltas[student.id] || 0;

                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-2.5 px-3 rounded-xl border border-stone-200 bg-[#FFFDF9] hover:border-[#F59E0B] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={avatarUrl}
                          alt={student.name}
                          className="w-10 h-10 object-contain rounded-lg shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col truncate">
                          <span className="font-black text-base truncate">{student.name}</span>
                          <span className="text-xs text-stone-400 font-bold">
                            #{student.rollNo} · 現有 {student.points} 分
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => adjustDelta(student.id, -1)}
                          className="w-7 h-7 rounded-lg font-black bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 cursor-pointer flex items-center justify-center text-sm"
                        >
                          -1
                        </button>
                        <input
                          type="number"
                          value={currentDelta === 0 ? '' : currentDelta}
                          placeholder="0"
                          onChange={(e) => handleDeltaChange(student.id, e.target.value)}
                          className={`w-14 text-center py-1 font-mono font-black text-base rounded-lg border-2 focus:outline-none ${
                            currentDelta > 0
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-400'
                              : currentDelta < 0
                              ? 'bg-rose-50 text-rose-700 border-rose-400'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => adjustDelta(student.id, 1)}
                          className="w-7 h-7 rounded-lg font-black bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 cursor-pointer flex items-center justify-center text-sm"
                        >
                          +1
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reason & Submit Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 shrink-0">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
              <span className="text-xs font-black text-[#8D6E63] shrink-0">評記事由：</span>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="輸入事由，例如：課堂問答、作業訂正..."
                className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#D7CCC8] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-black text-sm bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl font-black text-base text-white bg-[#4CAF50] hover:bg-[#43A047] border-b-3 border-[#2E7D32] shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                💾 儲存全部變更分數 ({nonZeroCount} 人)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
