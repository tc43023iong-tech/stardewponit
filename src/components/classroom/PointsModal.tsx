import React, { useState, useMemo } from 'react';
import { Student, PointPreset, PointHistoryItem } from '../../types/classroom';
import { POSITIVE_PRESETS, NEGATIVE_PRESETS } from '../../data/classroomData';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { AvatarRenderer } from './AvatarRenderer';
import { X, Plus, Minus, Send, Sparkles, AlertTriangle } from 'lucide-react';

interface PointsModalProps {
  students: Student[];
  onClose: () => void;
  onApplyPoints: (
    targetStudents: Student[],
    delta: number,
    reasonZh: string,
    reasonEn?: string,
    icon?: string
  ) => void;
  onUndoPoint?: (historyId: string, studentId: string, delta: number) => void;
}

export const PointsModal: React.FC<PointsModalProps> = ({
  students,
  onClose,
  onApplyPoints,
  onUndoPoint,
}) => {
  // Custom score state located directly beside student name in header
  const [customDeltaInput, setCustomDeltaInput] = useState<string>('5');
  const [isNegativeSign, setIsNegativeSign] = useState<boolean>(false);
  const [customReasonInput, setCustomReasonInput] = useState<string>('');

  // History detail panel state
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const isBatch = students.length > 1;
  const primaryStudent = students[0];

  const handleSelectPreset = (preset: PointPreset) => {
    onApplyPoints(students, preset.points, preset.labelZh, preset.labelEn, preset.icon);
    onClose();
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedNumber = Math.abs(parseInt(customDeltaInput, 10) || 1);
    const finalDelta = (isNegativeSign ? -1 : 1) * parsedNumber;
    const defaultReason = finalDelta > 0 ? '自訂加分獎勵' : '自訂扣分提醒';
    const reasonText = customReasonInput.trim() || defaultReason;

    onApplyPoints(
      students,
      finalDelta,
      reasonText,
      'Custom Adjustment',
      finalDelta > 0 ? '⭐' : '⚠️'
    );
    onClose();
  };

  const handleEraseItem = (item: PointHistoryItem) => {
    if (!primaryStudent || !onUndoPoint) return;
    const confirmMsg = `確定要擦除這條紀錄嗎？\n\n事由：「${item.reason}」 (${item.delta > 0 ? `+${item.delta}` : item.delta} 分)\n時間：${new Date(item.timestamp).toLocaleString('zh-HK')}\n\n擦除後將自動相應扣除或補回總分！`;
    if (window.confirm(confirmMsg)) {
      soundManager.playClick();
      onUndoPoint(item.id, primaryStudent.id, item.delta);
    }
  };

  // Compute trend points for SVG chart
  const trendData = useMemo(() => {
    if (!primaryStudent || !primaryStudent.history || primaryStudent.history.length === 0) {
      return [];
    }
    const sorted = [...primaryStudent.history].sort((a, b) => a.timestamp - b.timestamp);
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
  }, [primaryStudent]);

  if (showHistoryModal && primaryStudent) {
    const historyList = [...(primaryStudent.history || [])].reverse();
    const minVal = trendData.length > 0 ? Math.min(0, ...trendData.map((d) => d.points)) : 0;
    const maxVal = trendData.length > 0 ? Math.max(10, ...trendData.map((d) => d.points)) : 10;
    const range = Math.max(1, maxVal - minVal);

    return (
      <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs animate-in fade-in duration-150 select-none">
        <div className="pixel-wood-box max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl">
          {/* Header */}
          <div className="bg-[#5a3818] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex justify-between items-center shrink-0 shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📜</span>
              <h3 className="font-pixel text-sm sm:text-base text-[#ffd700] flex items-center gap-2">
                <span>小黑板歷史紀錄 & 成長軌跡</span>
                <span className="text-[#fed7aa]">- 【{primaryStudent.name}】</span>
                <span className="text-[10px] bg-[#3b1f0b] text-[#ffd700] px-2 py-0.5 rounded border border-[#8b5a2b]">
                  #{primaryStudent.rollNo}
                </span>
              </h3>
            </div>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="text-[#fed7aa] hover:text-white text-2xl font-black transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto md:overflow-hidden p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-0 bg-[#f7efd8] custom-scrollbar">
            {/* Left: Progress Trend */}
            <div className="col-span-1 md:col-span-7 flex flex-col h-[340px] md:h-full overflow-hidden bg-white/90 rounded-2xl p-4 border-2 border-[#c4a675] shadow-xs">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  <span className="font-bold text-[#4a2800] text-sm sm:text-base">
                    分數起伏趨勢 (Progress Trend)
                  </span>
                </div>
                <div className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-lg text-xs font-bold border border-emerald-300">
                  目前得分：{primaryStudent.points} 分
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-2 mb-3 shrink-0">
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-center">
                  <div className="text-[10px] font-bold text-amber-800">🪙 累積總分</div>
                  <div className="text-sm font-black text-amber-900 font-mono">{primaryStudent.points}</div>
                </div>
                <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-center">
                  <div className="text-[10px] font-bold text-emerald-800">🌱 獎勵正分</div>
                  <div className="text-sm font-black text-emerald-700 font-mono">+{primaryStudent.posPoints || 0}</div>
                </div>
                <div className="bg-rose-50 p-2 rounded-lg border border-rose-200 text-center">
                  <div className="text-[10px] font-bold text-rose-800">⚠️ 違紀扣分</div>
                  <div className="text-sm font-black text-rose-600 font-mono">-{primaryStudent.negPoints || 0}</div>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 text-center">
                  <div className="text-[10px] font-bold text-stone-600">📝 紀錄筆數</div>
                  <div className="text-sm font-black text-stone-700 font-mono">{primaryStudent.history?.length || 0}</div>
                </div>
              </div>

              {/* Trend Graph */}
              <div className="flex-1 min-h-0 relative w-full rounded-xl bg-stone-50/80 border border-stone-200 p-2 flex flex-col justify-end">
                {trendData.length === 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 font-bold gap-2">
                    <span className="text-3xl">📊</span>
                    <span className="text-xs">目前還沒有分數變化資料喔～</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="stardewTrendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5a2b" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8b5a2b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                        const y = 140 - pct * 120;
                        return (
                          <line
                            key={i}
                            x1="10"
                            y1={y}
                            x2="390"
                            y2={y}
                            stroke="#dfcca4"
                            strokeDasharray="4 4"
                            strokeWidth="1"
                          />
                        );
                      })}

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
                            fill="url(#stardewTrendGrad)"
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
                            stroke="#8b5a2b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      )}

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
                              r="4.5"
                              fill="#ffd700"
                              stroke="#5a3818"
                              strokeWidth="2"
                              className="transition-transform hover:scale-150"
                            />
                            <title>{`${d.date} ${d.time}\n${d.reason} (${d.delta > 0 ? `+${d.delta}` : d.delta}分)\n目前累計: ${d.points}分`}</title>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="flex justify-between items-center text-[9px] text-stone-500 font-bold px-2 pt-1 border-t border-stone-200">
                      <span>起始</span>
                      <span>分數歷程 ({trendData.length} 個點)</span>
                      <span>目前 ({primaryStudent.points}分)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Points Log */}
            <div className="col-span-1 md:col-span-5 flex flex-col h-[380px] md:h-full overflow-hidden bg-white/80 rounded-2xl p-4 border-2 border-[#c4a675] shadow-xs">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">📝</span>
                  <span className="font-bold text-[#4a2800] text-sm sm:text-base">
                    事件明細簿 (Points Log)
                  </span>
                </div>
                <span className="text-[11px] font-bold text-stone-500">
                  共 {historyList.length} 筆
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {historyList.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 font-bold text-xs">
                    目前還沒有紀錄喔～
                  </div>
                ) : (
                  historyList.map((item, idx) => {
                    const isPos = item.delta > 0;
                    return (
                      <div
                        key={`${item.id || item.timestamp}_${idx}`}
                        className="bg-white p-2.5 rounded-xl border border-[#dfcca4] flex justify-between items-center hover:bg-[#fffbf0] transition-colors shadow-2xs group"
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-stone-400 text-[9px] font-bold">
                            {new Date(item.timestamp).toLocaleString('zh-HK')}
                          </span>
                          <span
                            className="text-[#4a2800] font-bold text-xs truncate"
                            title={item.reason}
                          >
                            {item.reason}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div
                            className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${
                              isPos
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-rose-50 text-rose-800 border-rose-300'
                            }`}
                          >
                            {isPos ? `+${item.delta}` : item.delta}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleEraseItem(item)}
                            className="bg-white hover:bg-rose-50 text-stone-400 hover:text-rose-600 w-7 h-7 rounded-full transition-all active:scale-90 flex items-center justify-center border border-stone-200 shadow-xs cursor-pointer group-hover:border-rose-300"
                            title="擦掉它 (擦除此條分數紀錄並相應復原總分)"
                          >
                            <span className="text-sm">🧹</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t-2 border-[#c4a675] bg-[#faeed1] text-center shrink-0">
            <button
              type="button"
              onClick={() => setShowHistoryModal(false)}
              className="item-wobble-hover px-8 py-2 bg-[#8b5a2b] hover:bg-[#70441e] text-[#ffd700] rounded-xl font-bold text-sm shadow-md active:scale-95 border-b-3 border-[#5a3818] cursor-pointer"
            >
              回去加分吧！ 🌱
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="pixel-wood-box max-w-5xl w-full h-[90vh] max-h-[92vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl">
        {/* Top Header: Student info & Direct Inline Custom Points Input */}
        <div className="bg-[#5a3818] text-[#ffebb3] px-3 sm:px-4 py-2.5 border-b-4 border-[#361f0d] flex flex-wrap items-center justify-between gap-3 shadow-md">
          {/* Left: Student Avatar + Name + RollNo */}
          <div className="flex items-center gap-2.5 min-w-0">
            {!isBatch && primaryStudent ? (
              <div className="shrink-0 p-0.5 rounded-xl bg-amber-50/20 border-2 border-[#8b5a2b] shadow-xs">
                <AvatarRenderer avatar={primaryStudent.avatar} name={primaryStudent.name} size={40} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border-2 border-amber-600 flex items-center justify-center shrink-0">
                <PixelSprite name="star_full" size={24} />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-pixel text-xs sm:text-sm text-[#ffd700] truncate">
                  {isBatch
                    ? `批次評分 (${students.length}人)`
                    : `【${primaryStudent?.name}】`}
                </h3>
                {!isBatch && primaryStudent && (
                  <>
                    <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-1.5 py-0.5 rounded border border-[#8b5a2b] shrink-0">
                      #{primaryStudent.rollNo}
                    </span>

                    {/* ✏️ 筆的emoji按鍵：查看細節與擦除紀錄 */}
                    <button
                      type="button"
                      onClick={() => setShowHistoryModal(true)}
                      className="px-2 py-0.5 rounded-lg bg-amber-500/30 hover:bg-amber-500/50 text-[#ffd700] border border-amber-400 font-pixel text-[10px] flex items-center gap-1 active:scale-95 transition-all cursor-pointer ml-1"
                      title="點擊查看加減分明細，可擦除該分數紀錄 ✏️"
                    >
                      <span>✏️</span>
                      <span>歷程明細 ({primaryStudent.history?.length || 0})</span>
                    </button>
                  </>
                )}
              </div>
              {!isBatch && primaryStudent && (
                <div className="text-[11px] font-bold text-[#fed7aa] mt-0.5 flex items-center gap-1.5">
                  <span>目前得分：</span>
                  <span className="text-[#ffd700] font-pixel text-[10px]">
                    {primaryStudent.points} 分
                  </span>
                  <span className="text-[10px] text-stone-300">
                    (+{primaryStudent.posPoints || 0} / -{primaryStudent.negPoints || 0})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Center: Custom Score Input Box - Placed right beside student name */}
          <form
            onSubmit={handleApplyCustom}
            className="flex items-center gap-1.5 bg-[#3b1f0b] px-2.5 py-1.5 rounded-xl border-2 border-[#ca8a04] shadow-md ring-1 ring-amber-500/50 flex-wrap sm:flex-nowrap"
          >
            <span className="font-pixel text-[10px] sm:text-[11px] font-bold text-[#ffd700] whitespace-nowrap">
              自訂分數：
            </span>

            {/* +/- Mode Switch Toggle Button with wobble hover */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsNegativeSign(!isNegativeSign);
              }}
              className={`item-wobble-hover px-2 py-1 rounded-md font-pixel text-xs font-black flex items-center gap-1 border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isNegativeSign
                  ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white border-[#f87171] ring-1 ring-red-400'
                  : 'bg-[#16a34a] hover:bg-[#15803d] text-white border-[#86efac] ring-1 ring-emerald-400'
              }`}
              title={isNegativeSign ? '目前為扣分模式，點擊切換為加分(+)' : '目前為加分模式，點擊切換為扣分(-)'}
            >
              {isNegativeSign ? (
                <>
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>扣分</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>加分</span>
                </>
              )}
            </button>

            {/* Direct Number Input */}
            <input
              type="number"
              min="1"
              max="1000"
              value={customDeltaInput}
              onChange={(e) => setCustomDeltaInput(e.target.value)}
              className="w-14 sm:w-16 bg-[#271306] border border-[#a3794b] text-[#ffd700] font-pixel text-xs sm:text-sm px-2 py-1 rounded-md text-center focus:outline-none focus:border-[#ffd700]"
              placeholder="分值"
            />

            {/* Optional Reason Input */}
            <input
              type="text"
              value={customReasonInput}
              onChange={(e) => setCustomReasonInput(e.target.value)}
              placeholder="事由 (可選)"
              className="w-24 sm:w-32 bg-[#271306] border border-[#a3794b] text-[#ffedd5] text-xs px-2 py-1 rounded-md focus:outline-none focus:border-[#ffd700] placeholder:text-stone-400 truncate"
            />

            {/* Submit Button with wobble */}
            <button
              type="submit"
              className="item-wobble-hover bg-[#ca8a04] hover:bg-[#eab308] text-[#271306] font-pixel text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1 border-2 border-[#fef08a] cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
            >
              <Send className="w-3 h-3" />
              <span>發送</span>
            </button>
          </form>

          {/* Right: Close Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="item-wobble-hover text-[#ffd700] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="關閉視窗"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into Left (Positive) and Right (Negative) Columns with guaranteed scrollability */}
        <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden p-3 sm:p-4 bg-[#f7efd8] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-full min-h-0">
            {/* Left Column: Positive presets */}
            <div className="pixel-parchment p-3 rounded-xl flex flex-col h-[320px] md:h-full min-h-0 overflow-hidden shadow-sm border-2 border-[#86efac]/70">
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#bbf7d0] shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#15803d]">
                  <Sparkles className="w-4 h-4 text-[#16a34a]" />
                  <span>🌱 獎勵加分項目 ({POSITIVE_PRESETS.length})</span>
                </div>
                <span className="text-[10px] font-bold text-stone-500 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  點選直接給予獎勵
                </span>
              </div>

              {/* Scrollable list of positive presets */}
              <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1.5 custom-scrollbar">
                {POSITIVE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="item-wobble-hover w-full flex items-center justify-between p-2 rounded-lg bg-[#ffffff]/90 hover:bg-[#dcfce7] border-2 border-[#bbf7d0] hover:border-[#4ade80] transition-all cursor-pointer group shadow-2xs text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <span className="text-xl shrink-0 group-hover:scale-115 transition-transform">
                        {preset.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#14532d] truncate">
                          {preset.labelZh}
                        </div>
                        <div className="text-[9px] text-stone-500 truncate hidden sm:block">
                          {preset.labelEn}
                        </div>
                      </div>
                    </div>
                    <span className="font-pixel text-[10px] sm:text-xs font-black bg-[#dcfce7] group-hover:bg-[#16a34a] text-[#15803d] group-hover:text-white border border-[#86efac] px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                      +{preset.points}分
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Negative presets */}
            <div className="pixel-parchment p-3 rounded-xl flex flex-col h-[320px] md:h-full min-h-0 overflow-hidden shadow-sm border-2 border-[#fca5a5]/70">
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#fecdd3] shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#b91c1c]">
                  <AlertTriangle className="w-4 h-4 text-[#dc2626]" />
                  <span>⚠️ 違紀扣分項目 ({NEGATIVE_PRESETS.length})</span>
                </div>
                <span className="text-[10px] font-bold text-stone-500 bg-rose-100/80 px-2 py-0.5 rounded-full">
                  點選直接扣除點數
                </span>
              </div>

              {/* Scrollable list of negative presets */}
              <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1.5 custom-scrollbar">
                {NEGATIVE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="item-wobble-hover w-full flex items-center justify-between p-2 rounded-lg bg-[#ffffff]/90 hover:bg-[#fee2e2] border-2 border-[#fecdd3] hover:border-[#f87171] transition-all cursor-pointer group shadow-2xs text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <span className="text-xl shrink-0 group-hover:scale-115 transition-transform">
                        {preset.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#7f1d1d] truncate">
                          {preset.labelZh}
                        </div>
                        <div className="text-[9px] text-stone-500 truncate hidden sm:block">
                          {preset.labelEn}
                        </div>
                      </div>
                    </div>
                    <span className="font-pixel text-[10px] sm:text-xs font-black bg-[#fee2e2] group-hover:bg-[#ef4444] text-[#b91c1c] group-hover:text-white border border-[#fca5a5] px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                      {preset.points}分
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#faeed1] px-4 py-2 border-t-2 border-[#c4a675] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5a3818] shrink-0">
          <span className="text-[11px] font-bold text-stone-600">
            ✨ 點擊學生名字旁的 ✏️ 筆圖標可展開加減分歷史紀錄並擦除特定項目！
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="item-wobble-hover px-4 py-1 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] font-bold border-2 border-[#a3794b] rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
