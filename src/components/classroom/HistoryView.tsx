import React, { useState, useMemo } from 'react';
import { Student, PointHistoryItem, RollCallRecord } from '../../types/classroom';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import {
  PixelFishingRodIcon,
  PixelPickaxeIcon,
  RewardPixelIcon,
} from './PickerPixelArt';
import {
  Search,
  Undo2,
  History as HistoryIcon,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Users,
  Coins,
  ClipboardList,
} from 'lucide-react';

interface HistoryViewProps {
  students: Student[];
  rollCallLogs?: RollCallRecord[];
  drawnStudentIds?: string[];
  onUndoPoint: (historyId: string, studentId: string, delta: number) => void;
  onClearHistory: () => void;
  onClearRollCallLogs?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  students,
  rollCallLogs = [],
  drawnStudentIds = [],
  onUndoPoint,
  onClearHistory,
  onClearRollCallLogs,
}) => {
  const [subTab, setSubTab] = useState<'points' | 'rollcall'>('points');
  const [modeFilter, setModeFilter] = useState<'all' | 'fishing' | 'mining'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all history items from all students in current class
  const allHistory = useMemo(() => {
    const list: PointHistoryItem[] = [];
    students.forEach((s) => {
      (s.history || []).forEach((h, hIdx) => {
        const safeId = h.id || `hist_${s.id}_${h.timestamp || 0}_${hIdx}`;
        list.push({
          ...h,
          id: safeId,
        });
      });
    });
    return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [students]);

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return allHistory;
    const q = searchQuery.toLowerCase();
    return allHistory.filter(
      (h) =>
        (h.studentName && h.studentName.toLowerCase().includes(q)) ||
        (h.reason && h.reason.toLowerCase().includes(q)) ||
        (h.reasonEn && h.reasonEn.toLowerCase().includes(q))
    );
  }, [allHistory, searchQuery]);

  const filteredRollCallLogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...rollCallLogs]
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((rec) => {
        if (modeFilter !== 'all' && rec.mode !== modeFilter) return false;
        if (!q) return true;
        return (
          rec.studentName.toLowerCase().includes(q) ||
          String(rec.rollNo).includes(q) ||
          (rec.rewardName && rec.rewardName.toLowerCase().includes(q)) ||
          (rec.coinSource && rec.coinSource.toLowerCase().includes(q))
        );
      });
  }, [rollCallLogs, modeFilter, searchQuery]);

  const drawnStudentsInSession = useMemo(() => {
    const idSet = new Set(drawnStudentIds);
    return students.filter((s) => idSet.has(s.id));
  }, [students, drawnStudentIds]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleUndo = (item: PointHistoryItem) => {
    if (
      window.confirm(
        `確定要撤銷「${item.studentName}」的這筆記錄 (${item.delta > 0 ? `+${item.delta}` : item.delta} 分) 嗎？`
      )
    ) {
      soundManager.playClick();
      onUndoPoint(item.id, item.studentId, item.delta);
    }
  };

  const getRarityLabel = (rec: RollCallRecord) => {
    if (rec.rewardType === 'gem') {
      if (rec.rewardRarity === 'legendary') return '稀世珍寶';
      if (rec.rewardRarity === 'rare') return '秘境寶石';
      return '晶瑩寶石';
    }
    if (rec.rewardRarity === 'legendary') return '傳說魚';
    if (rec.rewardRarity === 'rare') return '稀有魚';
    return '普通魚';
  };

  return (
    <div className="space-y-4">
      {/* Sub-Tabs Bar */}
      <div className="pixel-parchment p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSubTab('points');
            }}
            className={`px-4 py-2 rounded-lg border-2 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'points'
                ? 'bg-[#6a4422] text-[#ffd700] border-[#361f0d] shadow-md'
                : 'bg-[#faeed1] text-[#5a3818] border-[#c4a675] hover:bg-[#ffeec2]'
            }`}
          >
            <HistoryIcon className="w-4 h-4" />
            <span>加減分記錄 ({allHistory.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSubTab('rollcall');
            }}
            className={`px-4 py-2 rounded-lg border-2 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
              subTab === 'rollcall'
                ? 'bg-[#075985] text-white border-[#0c4a6e] shadow-md'
                : 'bg-[#faeed1] text-[#5a3818] border-[#c4a675] hover:bg-[#ffeec2]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>釣魚與礦洞點名記錄 ({rollCallLogs.length})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-stone-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              subTab === 'points'
                ? '搜尋學生姓名或評分原因...'
                : '搜尋學生姓名、魚種或寶石名稱...'
            }
            className="w-full bg-[#fdfbf7] border-2 border-[#8b5a2b] pl-8 pr-3 py-1.5 text-xs font-bold rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* TAB 1: POINTS HISTORY */}
      {subTab === 'points' && (
        <div className="space-y-3">
          <div className="pixel-parchment px-4 py-2.5 rounded-xl flex items-center justify-between gap-2 shadow-sm">
            <span className="text-xs font-bold text-[#5a3818]">
              共 {filteredHistory.length} 筆加扣分記錄
            </span>
            {allHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      '確定要清空本班所有加扣分歷史記錄嗎？（學生現有積分不會改變）'
                    )
                  ) {
                    soundManager.playClick();
                    onClearHistory();
                  }
                }}
                className="px-2.5 py-1 text-xs font-bold text-[#b91c1c] hover:bg-[#fee2e2] rounded border border-[#fca5a5] flex items-center gap-1 cursor-pointer"
                title="清空歷史歷程"
              >
                <Trash2 className="w-3.5 h-3.5" /> 清空記錄
              </button>
            )}
          </div>

          <div className="pixel-parchment rounded-xl p-4 shadow-md">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <HistoryIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-pixel text-xs text-[#5a3818]">尚無加扣分記錄</p>
                <p className="text-xs mt-1">
                  在學生名冊點選評分或快速加減分後，歷程將會在此顯示。
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#dfcca4]/60">
                {filteredHistory.map((item, index) => {
                  const uniqueKey = item.id
                    ? `${item.id}_${item.studentId}_${index}`
                    : `hist_${item.studentId}_${item.timestamp}_${index}`;
                  return (
                    <div
                      key={uniqueKey}
                      className="py-3 flex flex-wrap items-center justify-between gap-3 hover:bg-[#fff9ea] px-2 rounded transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                            item.delta > 0
                              ? 'bg-[#dcfce7] border-[#86efac] text-[#15803d]'
                              : 'bg-[#fee2e2] border-[#fca5a5] text-[#b91c1c]'
                          }`}
                        >
                          {item.delta > 0 ? (
                            <PixelSprite name="star_full" size={18} />
                          ) : (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#3d240d]">
                              {item.studentName}
                            </span>
                            <span
                              className={`font-pixel text-xs font-bold px-2 py-0.5 rounded border ${
                                item.delta > 0
                                  ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac]'
                                  : 'bg-[#fee2e2] text-[#b91c1c] border-[#fca5a5]'
                              }`}
                            >
                              {item.delta > 0 ? `+${item.delta}` : item.delta} 分
                            </span>
                          </div>
                          <div className="text-xs text-stone-600 font-bold mt-0.5">
                            {item.reason}
                          </div>
                          {item.reasonEn && (
                            <div className="text-[10px] text-stone-400">{item.reasonEn}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <span className="text-[11px] font-mono text-stone-500">
                          {formatTime(item.timestamp)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUndo(item)}
                          className="px-2.5 py-1 text-xs font-bold text-[#b45309] hover:bg-[#ffeec2] border border-[#d6ba89] rounded flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                          title="撤銷本筆加減分"
                        >
                          <Undo2 className="w-3.5 h-3.5" /> 撤銷
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FISHING & MINING ROLL-CALL HISTORY */}
      {subTab === 'rollcall' && (
        <div className="space-y-4">
          {/* Current Session Drawn Pool Card */}
          <div className="pixel-parchment p-4 rounded-xl border-2 border-[#8b5a2b] shadow-md space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#854d0e]" />
                <h4 className="font-pixel text-xs sm:text-sm text-[#4a2800] font-bold">
                  本節課輪抽進度（不重複點名名單）
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#fef9c3] border border-[#ca8a04] font-pixel text-xs font-bold text-[#854d0e]">
                已抽 {drawnStudentsInSession.length} / {students.length} 人
              </span>
            </div>

            {drawnStudentsInSession.length === 0 ? (
              <p className="text-xs text-stone-600 font-bold">
                本輪尚未抽出任何同學，開啟「隨機點名」進行釣魚或礦洞點名後，已抽名單會即時同步於此。
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {drawnStudentsInSession.map((st) => (
                  <span
                    key={st.id}
                    className="px-2.5 py-1 rounded-lg bg-[#fffbeb] border border-[#d6b37c] text-xs font-bold text-[#4a2800]"
                  >
                    #{st.rollNo} {st.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Mode Filter & Clear Bar */}
          <div className="pixel-parchment px-4 py-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: '全部模式' },
                { id: 'fishing', label: '釣魚點名' },
                { id: 'mining', label: '礦洞點名' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setModeFilter(item.id as 'all' | 'fishing' | 'mining');
                  }}
                  className={`px-3 py-1 rounded-md border text-xs font-pixel font-bold cursor-pointer transition-colors ${
                    modeFilter === item.id
                      ? 'bg-[#6a4422] text-[#ffd700] border-[#361f0d]'
                      : 'bg-[#faeed1] text-[#5a3818] border-[#c4a675] hover:bg-[#ffeec2]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <span className="text-xs font-bold text-stone-600 ml-2">
                共 {filteredRollCallLogs.length} 筆點名記錄
              </span>
            </div>

            {rollCallLogs.length > 0 && onClearRollCallLogs && (
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      '確定要清空本班的釣魚與礦洞點名記錄嗎？（學生已獲得的金幣與收藏不會受到影響）'
                    )
                  ) {
                    soundManager.playClick();
                    onClearRollCallLogs();
                  }
                }}
                className="px-2.5 py-1 text-xs font-bold text-[#b91c1c] hover:bg-[#fee2e2] rounded border border-[#fca5a5] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> 清空點名記錄
              </button>
            )}
          </div>

          {/* Roll Call Records List */}
          <div className="pixel-parchment rounded-xl p-4 shadow-md">
            {filteredRollCallLogs.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-pixel text-xs text-[#5a3818]">尚無釣魚或礦洞點名記錄</p>
                <p className="text-xs mt-1">
                  使用頂部「隨機點名」選擇「釣魚點名」或「礦洞點名」抽中同學後，記錄會顯示在這裡。
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#dfcca4]/60">
                {filteredRollCallLogs.map((rec) => {
                  const isFishing = rec.mode === 'fishing';
                  return (
                    <div
                      key={rec.id}
                      className="py-3 px-2 flex flex-wrap items-center justify-between gap-3 hover:bg-[#fff9ea] rounded transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Mode Pixel Icon */}
                        <div
                          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 ${
                            isFishing
                              ? 'bg-[#e0f2fe] border-[#0284c7]'
                              : 'bg-[#f3e8ff] border-[#7e22ce]'
                          }`}
                        >
                          {isFishing ? (
                            <PixelFishingRodIcon size={24} />
                          ) : (
                            <PixelPickaxeIcon size={24} />
                          )}
                        </div>

                        {/* Student + Mode Tag + Reward */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-pixel font-black border ${
                                isFishing
                                  ? 'bg-[#e0f2fe] text-[#075985] border-[#7dd3fc]'
                                  : 'bg-[#f3e8ff] text-[#6b21a8] border-[#d8b4fe]'
                              }`}
                            >
                              {isFishing ? '釣魚點名' : '礦洞點名'}
                            </span>

                            <span className="font-black text-sm sm:text-base text-[#3d240d]">
                              #{rec.rollNo} {rec.studentName}
                            </span>

                            {rec.answeredCorrect && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d] border border-[#86efac] text-[10px] font-pixel font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>已答對</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2.5 flex-wrap mt-1 text-xs font-bold text-stone-700">
                            {rec.rewardName && (
                              <span className="inline-flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#d6ba89]">
                                <RewardPixelIcon
                                  imageUrl={rec.rewardImageUrl}
                                  name={rec.rewardName}
                                  type={rec.rewardType || (isFishing ? 'fish' : 'gem')}
                                  size={18}
                                />
                                <span>{rec.rewardName}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.2 rounded font-pixel ${
                                    rec.rewardRarity === 'legendary'
                                      ? 'bg-[#fef08a] text-[#854d0e]'
                                      : rec.rewardRarity === 'rare'
                                      ? 'bg-[#ede9fe] text-[#5b21b6]'
                                      : 'bg-stone-100 text-stone-600'
                                  }`}
                                >
                                  {getRarityLabel(rec)}
                                </span>
                              </span>
                            )}

                            {rec.coinsEarned && rec.coinsEarned > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#fef9c3] text-[#b45309] border border-[#fde047] font-pixel text-[11px]">
                                <Coins className="w-3 h-3" />
                                <span>
                                  +{rec.coinsEarned} 金幣
                                  {rec.coinSource ? `（${rec.coinSource}）` : ''}
                                </span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-stone-400">
                                尚未領取答對金幣加成
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-stone-500 shrink-0">
                        {formatTime(rec.timestamp)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
