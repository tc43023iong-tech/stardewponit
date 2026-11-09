import React, { useState, useMemo } from 'react';
import { Student, PointHistoryItem } from '../../types/classroom';
import { POSITIVE_PRESETS, NEGATIVE_PRESETS } from '../../data/classroomData';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';

interface PokemonPointsModalProps {
  students: Student[];
  onClose: () => void;
  onApplyPoints: (students: Student[], delta: number, reasonZh: string, reasonEn?: string) => void;
  onEraseHistoryItem?: (studentId: string, historyItemId: string, timestamp?: number) => void;
}

export const PokemonPointsModal: React.FC<PokemonPointsModalProps> = ({
  students,
  onClose,
  onApplyPoints,
  onEraseHistoryItem,
}) => {
  const isMultiple = students.length > 1;
  const singleStudent = !isMultiple ? students[0] : null;

  // Custom delta input state
  const [customSign, setCustomSign] = useState<'+' | '-'>('+');
  const [customPointsInput, setCustomPointsInput] = useState<string>('5');
  const [customReason, setCustomReason] = useState<string>('');

  // History detail panel state
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = parseInt(customPointsInput, 10);
    if (isNaN(rawVal) || rawVal === 0) return;
    const finalDelta = customSign === '+' ? Math.abs(rawVal) : -Math.abs(rawVal);
    const reasonText = customReason.trim() || (finalDelta > 0 ? '自訂加分獎勵' : '自訂扣分提醒');
    onApplyPoints(students, finalDelta, reasonText);
  };

  const handleEraseItem = (item: PointHistoryItem) => {
    if (!singleStudent || !onEraseHistoryItem) return;
    const confirmMsg = `確定要擦除這條加減分紀錄嗎？\n\n事由：「${item.reason}」 (${item.delta > 0 ? `+${item.delta}` : item.delta} 分)\n時間：${new Date(item.timestamp).toLocaleString('zh-HK')}\n\n擦除後將自動相應扣除或補回學生的總分！`;
    if (window.confirm(confirmMsg)) {
      onEraseHistoryItem(singleStudent.id, item.id, item.timestamp);
    }
  };

  // Compute progressive trend points for SVG chart
  const trendData = useMemo(() => {
    if (!singleStudent || !singleStudent.history || singleStudent.history.length === 0) {
      return [];
    }
    // Sort chronological (oldest to newest)
    const sorted = [...singleStudent.history].sort((a, b) => a.timestamp - b.timestamp);
    let runningTotal = 0;
    return sorted.map((item, idx) => {
      runningTotal += item.delta;
      return {
        idx: idx + 1,
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date(item.timestamp).toLocaleDateString([], { month: '2-digit', day: '2-digit' }),
        reason: item.reason,
        delta: item.delta,
        points: runningTotal,
      };
    });
  }, [singleStudent]);

  // If viewing history modal:
  if (showHistoryModal && singleStudent) {
    const historyList = [...(singleStudent.history || [])].reverse();
    const minVal = trendData.length > 0 ? Math.min(0, ...trendData.map((d) => d.points)) : 0;
    const maxVal = trendData.length > 0 ? Math.max(10, ...trendData.map((d) => d.points)) : 10;
    const range = Math.max(1, maxVal - minVal);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
        <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#5D4037]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] py-4 px-6 md:px-8 flex justify-between items-center shrink-0 border-b-3 border-[#5D4037]">
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">📜</span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <span>小黑板歷史紀錄 & 成長軌跡</span>
                <span className="text-amber-200">- {singleStudent.name}</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  #{singleStudent.rollNo}
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowHistoryModal(false)}
              className="text-white hover:text-amber-200 text-3xl font-black hover:scale-110 active:scale-95 transition-transform cursor-pointer leading-none"
              title="關閉"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto md:overflow-hidden p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-0 bg-[#FFFBF0]/30 custom-scrollbar">
            {/* Left Column: Progress Trend (7 cols) */}
            <div className="col-span-1 md:col-span-7 flex flex-col h-[340px] md:h-full overflow-hidden bg-white/90 rounded-[2rem] p-4 md:p-5 border-3 border-[#D7CCC8] shadow-xs">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  <span className="font-black text-[#5D4037] text-lg md:text-xl tracking-tight">
                    分數起伏趨勢 (Progress Trend)
                  </span>
                </div>
                <div className="bg-[#E8F8F0] text-[#2E7D32] px-3 py-1 rounded-2xl text-xs font-black border border-[#81C784]">
                  目前得分：{singleStudent.points} 分
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-2 mb-3 shrink-0">
                <div className="bg-[#FFF8E1] p-2 rounded-xl border border-amber-200 text-center">
                  <div className="text-[10px] font-bold text-amber-800">🪙 累積總分</div>
                  <div className="text-base font-black text-amber-900 font-mono">{singleStudent.points}</div>
                </div>
                <div className="bg-[#E8F8F0] p-2 rounded-xl border border-emerald-200 text-center">
                  <div className="text-[10px] font-bold text-emerald-800">🌱 獎勵正分</div>
                  <div className="text-base font-black text-emerald-700 font-mono">+{singleStudent.posPoints || 0}</div>
                </div>
                <div className="bg-[#FFF1F2] p-2 rounded-xl border border-rose-200 text-center">
                  <div className="text-[10px] font-bold text-rose-800">⚠️ 違紀扣分</div>
                  <div className="text-base font-black text-rose-600 font-mono">-{singleStudent.negPoints || 0}</div>
                </div>
                <div className="bg-stone-50 p-2 rounded-xl border border-stone-200 text-center">
                  <div className="text-[10px] font-bold text-stone-600">📝 紀錄筆數</div>
                  <div className="text-base font-black text-stone-700 font-mono">{singleStudent.history?.length || 0}</div>
                </div>
              </div>

              {/* SVG Trend Graph */}
              <div className="flex-1 min-h-0 relative w-full rounded-xl bg-stone-50/80 border border-stone-200 p-2 flex flex-col justify-end">
                {trendData.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 font-bold gap-2">
                    <span className="text-4xl">📊</span>
                    <span className="text-sm">目前還沒有分數變化資料喔～</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                        const y = 140 - pct * 120;
                        return (
                          <line
                            key={i}
                            x1="10"
                            y1={y}
                            x2="390"
                            y2={y}
                            stroke="#E7DFD5"
                            strokeDasharray="4 4"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Trend Area & Polyline */}
                      {trendData.length > 1 && (
                        <>
                          <polygon
                            points={`10,140 ${trendData
                              .map((d, i) => {
                                const x = 10 + (i / (trendData.length - 1)) * 380;
                                const y = 140 - ((d.points - minVal) / range) * 120;
                                return `${x},${y}`;
                              })
                              .join(' ')} 390,140`}
                            fill="url(#trendGradient)"
                          />
                          <polyline
                            points={trendData
                              .map((d, i) => {
                                const x = 10 + (i / (trendData.length - 1)) * 380;
                                const y = 140 - ((d.points - minVal) / range) * 120;
                                return `${x},${y}`;
                              })
                              .join(' ')}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      )}

                      {/* Data Dots */}
                      {trendData.map((d, i) => {
                        const x =
                          trendData.length === 1
                            ? 200
                            : 10 + (i / (trendData.length - 1)) * 380;
                        const y = 140 - ((d.points - minVal) / range) * 120;
                        return (
                          <g key={i} className="group cursor-pointer">
                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#FFF"
                              stroke="#D97706"
                              strokeWidth="2.5"
                              className="transition-transform hover:scale-150"
                            />
                            <title>{`${d.date} ${d.time}\n${d.reason} (${d.delta > 0 ? `+${d.delta}` : d.delta}分)\n目前累計: ${d.points}分`}</title>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold px-2 pt-1 border-t border-stone-200">
                      <span>初始起點</span>
                      <span>成長軌跡 ({trendData.length} 個點)</span>
                      <span>最新分數 ({singleStudent.points}分)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Points Log (5 cols) */}
            <div className="col-span-1 md:col-span-5 flex flex-col h-[380px] md:h-full overflow-hidden bg-white/80 rounded-[2rem] p-4 md:p-5 border-3 border-[#D7CCC8] shadow-xs">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <span className="font-black text-[#5D4037] text-lg md:text-xl tracking-tight">
                    事件明細簿 (Points Log)
                  </span>
                </div>
                <span className="text-xs font-bold text-stone-400">
                  共 {historyList.length} 筆紀錄
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                {historyList.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 font-bold text-sm">
                    目前還沒有紀錄喔～
                  </div>
                ) : (
                  historyList.map((item, idx) => {
                    const isPos = item.delta > 0;
                    return (
                      <div
                        key={`${item.id || item.timestamp}_${idx}`}
                        className="bg-white p-3 rounded-2xl border-2 border-[#E7DFD5] flex justify-between items-center hover:bg-[#FFFDF9] hover:border-amber-300 transition-all shadow-2xs group"
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-stone-400 text-[10px] font-bold">
                            {new Date(item.timestamp).toLocaleString('zh-HK')}
                          </span>
                          <span
                            className="text-[#5D4037] font-black text-sm truncate tracking-tight"
                            title={item.reason}
                          >
                            {item.reason}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div
                            className={`text-xs font-black px-2.5 py-0.5 rounded-xl border-2 ${
                              isPos
                                ? 'bg-[#E8F8F0] text-[#2E7D32] border-[#81C784]'
                                : 'bg-[#FFF1F2] text-[#BE123C] border-[#FFAAA6]'
                            }`}
                          >
                            {isPos ? `+${item.delta}` : item.delta}
                          </div>

                          {/* 🧹 擦掉它按鈕 (Undo / 擦除該分數紀錄) */}
                          <button
                            type="button"
                            onClick={() => handleEraseItem(item)}
                            className="bg-white hover:bg-rose-50 text-stone-400 hover:text-rose-600 w-8 h-8 rounded-full transition-all active:scale-90 flex items-center justify-center border border-stone-200 shadow-xs cursor-pointer group-hover:border-rose-300"
                            title="擦掉它 (撤銷此條分數紀錄並相應復原總分)"
                          >
                            <span className="text-base">🧹</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Footer: Return to Points board */}
          <div className="p-4 border-t-2 border-[#D7CCC8] bg-white/70 text-center shrink-0">
            <button
              type="button"
              onClick={() => setShowHistoryModal(false)}
              className="px-10 py-2.5 bg-[#8D6E63] text-white rounded-full font-black text-base hover:bg-[#795548] transition-all shadow-md active:scale-95 border-b-4 border-[#6D4C41] cursor-pointer"
            >
              回去加分吧！ 🌱
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
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
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black tracking-tight text-[#5D4037]">
                      {singleStudent.name}
                    </h2>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-white border border-[#D7CCC8] text-[#8D6E63]">
                      #{singleStudent.rollNo}
                    </span>

                    {/* ✏️ 筆的emoji按鈕：查看細節與擦除紀錄 */}
                    <button
                      type="button"
                      onClick={() => setShowHistoryModal(true)}
                      className="px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 text-[#8D6E63] hover:text-[#5D4037] font-black text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ml-1"
                      title="點擊查看加減分明細，可擦除該分數紀錄 ✏️"
                    >
                      <span className="text-sm">✏️</span>
                      <span>歷程明細 ({singleStudent.history?.length || 0})</span>
                    </button>
                  </div>
                  <p className="text-xs font-bold text-[#8D6E63] flex items-center gap-2 mt-0.5">
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
