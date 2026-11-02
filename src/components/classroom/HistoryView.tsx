import React, { useState, useMemo } from 'react';
import { Student, PointHistoryItem } from '../../types/classroom';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { Search, Undo2, History as HistoryIcon, Trash2 } from 'lucide-react';

interface HistoryViewProps {
  students: Student[];
  onUndoPoint: (historyId: string, studentId: string, delta: number) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  students,
  onUndoPoint,
  onClearHistory,
}) => {
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
    // Sort descending by timestamp
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

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleUndo = (item: PointHistoryItem) => {
    if (window.confirm(`確定要撤銷「${item.studentName}」的這筆記錄 (${item.delta > 0 ? `+${item.delta}` : item.delta} 分) 嗎？`)) {
      soundManager.playClick();
      onUndoPoint(item.id, item.studentId, item.delta);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar */}
      <div className="pixel-parchment p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-stone-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋學生姓名或評分原因..."
            className="w-full bg-[#fdfbf7] border-2 border-[#8b5a2b] pl-8 pr-3 py-1.5 text-xs font-bold rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#5a3818]">
            共 {filteredHistory.length} 筆加扣分記錄
          </span>
          {allHistory.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('確定要清空本班所有歷史記錄嗎？（學生現有積分不會改變）')) {
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
      </div>

      {/* History Log List */}
      <div className="pixel-parchment rounded-xl p-4 shadow-md">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <HistoryIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-pixel text-xs text-[#5a3818]">尚無加扣分記錄</p>
            <p className="text-xs mt-1">在學生名冊點選評分或快速加減分後，歷程將會在此顯示。</p>
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
                    <span className="text-2xl shrink-0">{item.icon || (item.delta > 0 ? '🌟' : '⚠️')}</span>
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
  );
};

