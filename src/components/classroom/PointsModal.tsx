import React, { useState } from 'react';
import { Student, PointPreset } from '../../types/classroom';
import { POSITIVE_PRESETS, NEGATIVE_PRESETS } from '../../data/classroomData';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { X, Sparkles, AlertTriangle, Edit3, Plus, Minus } from 'lucide-react';

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
}

export const PointsModal: React.FC<PointsModalProps> = ({
  students,
  onClose,
  onApplyPoints,
}) => {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative' | 'custom'>('positive');
  const [customDelta, setCustomDelta] = useState<number>(5);
  const [customIsNegative, setCustomIsNegative] = useState<boolean>(false);
  const [customReason, setCustomReason] = useState<string>('');

  const isBatch = students.length > 1;

  const handleSelectPreset = (preset: PointPreset) => {
    if (preset.points > 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playBuzzer();
    }
    onApplyPoints(students, preset.points, preset.labelZh, preset.labelEn, preset.icon);
    onClose();
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDelta = (customIsNegative ? -1 : 1) * Math.abs(customDelta || 1);
    const reasonText = customReason.trim() || (finalDelta > 0 ? '自訂加分獎勵' : '自訂扣分提醒');
    if (finalDelta > 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playBuzzer();
    }
    onApplyPoints(
      students,
      finalDelta,
      reasonText,
      'Custom Points Adjustment',
      finalDelta > 0 ? '⭐' : '⚠️'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div className="pixel-wood-box max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#4a2800] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PixelSprite name="star_full" size={20} />
            <div>
              <h3 className="font-pixel text-xs sm:text-sm">
                {isBatch
                  ? `🌟 批次加減分 (${students.length} 位學生)`
                  : `⭐ 評定表現：${students[0]?.name} (#${students[0]?.rollNo})`}
              </h3>
              <p className="text-[11px] text-[#fed7aa] font-sans">
                {isBatch
                  ? students.map((s) => s.name).slice(0, 5).join('、') +
                    (students.length > 5 ? ` 等共 ${students.length} 人` : '')
                  : `目前積分：${students[0]?.points} 分`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#4a2800] hover:bg-[#8b5a2b] text-white flex items-center justify-center border-2 border-[#ffebb3] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-[#4d2e13] px-3 pt-2 flex items-center gap-2 border-b-2 border-[#361f0d]">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('positive');
            }}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-lg transition-colors cursor-pointer ${
              activeTab === 'positive'
                ? 'bg-[#f7e6c4] text-[#15803d] border-t-2 border-x-2 border-[#5a3818]'
                : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#16a34a]" />
            <span>獎勵加分 (Positive)</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('negative');
            }}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-lg transition-colors cursor-pointer ${
              activeTab === 'negative'
                ? 'bg-[#f7e6c4] text-[#b91c1c] border-t-2 border-x-2 border-[#5a3818]'
                : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#dc2626]" />
            <span>違紀扣分 (Negative)</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('custom');
            }}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-lg transition-colors cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-[#f7e6c4] text-[#4a2800] border-t-2 border-x-2 border-[#5a3818]'
                : 'bg-[#6a4422] text-[#d6ba89] hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-600" />
            <span>自訂加減分</span>
          </button>
        </div>

        {/* Modal Body / Presets List */}
        <div className="p-3 sm:p-4 overflow-y-auto max-h-[60vh]">
          {/* Positive Tab */}
          {activeTab === 'positive' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POSITIVE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2.5 bg-[#fdfbf7] hover:bg-[#ecfdf5] border-2 border-[#a3794b] hover:border-[#10b981] rounded-lg text-left flex items-center justify-between group transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {preset.icon}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-xs sm:text-sm text-[#2b2b2b] truncate group-hover:text-[#065f46]">
                        {preset.labelZh}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">
                        {preset.labelEn}
                      </div>
                    </div>
                  </div>
                  <span className="font-pixel text-xs sm:text-sm font-bold bg-[#dcfce7] text-[#15803d] border border-[#86efac] px-2 py-1 rounded shrink-0">
                    +{preset.points}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Negative Tab */}
          {activeTab === 'negative' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NEGATIVE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2.5 bg-[#fdfbf7] hover:bg-[#fef2f2] border-2 border-[#a3794b] hover:border-[#ef4444] rounded-lg text-left flex items-center justify-between group transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {preset.icon}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-xs sm:text-sm text-[#2b2b2b] truncate group-hover:text-[#991b1b]">
                        {preset.labelZh}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">
                        {preset.labelEn}
                      </div>
                    </div>
                  </div>
                  <span className="font-pixel text-xs sm:text-sm font-bold bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] px-2 py-1 rounded shrink-0">
                    {preset.points}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Custom Tab */}
          {activeTab === 'custom' && (
            <form onSubmit={handleApplyCustom} className="space-y-4 max-w-md mx-auto py-2">
              {/* Type Toggle: Add or Subtract */}
              <div>
                <label className="block text-xs font-bold mb-1.5">評定類型：</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomIsNegative(false)}
                    className={`py-2 px-3 rounded-lg border-2 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      !customIsNegative
                        ? 'bg-[#dcfce7] border-[#10b981] text-[#15803d]'
                        : 'bg-[#faeed1] border-[#c4a675] text-stone-600'
                    }`}
                  >
                    <Plus className="w-4 h-4" /> 獎勵加分 (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomIsNegative(true)}
                    className={`py-2 px-3 rounded-lg border-2 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      customIsNegative
                        ? 'bg-[#fee2e2] border-[#ef4444] text-[#b91c1c]'
                        : 'bg-[#faeed1] border-[#c4a675] text-stone-600'
                    }`}
                  >
                    <Minus className="w-4 h-4" /> 違紀扣分 (-)
                  </button>
                </div>
              </div>

              {/* Point Value */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold">分數數值：</label>
                  <span className="font-pixel text-sm font-bold text-[#6a4422]">
                    {customIsNegative ? `-${customDelta}` : `+${customDelta}`} 分
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={customDelta}
                    onChange={(e) => setCustomDelta(Number(e.target.value))}
                    className="flex-1 accent-[#fabc3f] cursor-pointer"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={customDelta}
                    onChange={(e) => setCustomDelta(Number(e.target.value))}
                    className="w-16 px-2 py-1 bg-[#faeed1] border-2 border-[#8b5a2b] font-pixel text-xs font-bold text-center"
                  />
                </div>
                {/* Quick amount shortcuts */}
                <div className="flex items-center gap-1.5 mt-2">
                  {[2, 5, 10, 20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomDelta(amt)}
                      className="px-2 py-1 bg-[#faeed1] hover:bg-[#ffeec2] border border-[#8b5a2b] text-[11px] font-bold rounded cursor-pointer"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason / Remarks */}
              <div>
                <label className="block text-xs font-bold mb-1">評分事由 / 備註：</label>
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="例如: 課堂回答特別精彩、字體端正、協助同學..."
                  className="w-full bg-[#faeed1] border-2 border-[#7c4f24] px-3 py-2 text-xs font-bold rounded focus:outline-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg font-pixel text-xs font-bold shadow transition-all cursor-pointer ${
                  customIsNegative
                    ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white border-2 border-[#991b1b]'
                    : 'pixel-btn-green text-white'
                }`}
              >
                確認送出 ({customIsNegative ? `-${customDelta}` : `+${customDelta}`} 分)
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#faeed1] px-4 py-2 border-t-2 border-[#c4a675] flex items-center justify-between text-xs text-stone-600">
          <span>點選任一項目將即刻生效並記錄於加扣分歷程</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] font-bold border border-[#a3794b] rounded cursor-pointer"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
