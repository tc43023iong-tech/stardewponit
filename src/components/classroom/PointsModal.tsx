import React, { useState } from 'react';
import { Student, PointPreset } from '../../types/classroom';
import { POSITIVE_PRESETS, NEGATIVE_PRESETS } from '../../data/classroomData';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { AvatarRenderer } from './AvatarRenderer';
import { X, Sparkles, AlertTriangle, Plus, Minus, Send } from 'lucide-react';

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
  // Custom score state located right beside the student's name in the header
  const [customDeltaInput, setCustomDeltaInput] = useState<string>('5');
  const [isNegativeSign, setIsNegativeSign] = useState<boolean>(false);
  const [customReasonInput, setCustomReasonInput] = useState<string>('');

  const isBatch = students.length > 1;
  const primaryStudent = students[0];

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
    const parsedNumber = Math.abs(parseInt(customDeltaInput, 10) || 1);
    const finalDelta = (isNegativeSign ? -1 : 1) * parsedNumber;
    const defaultReason = finalDelta > 0 ? '自訂加分獎勵' : '自訂扣分提醒';
    const reasonText = customReasonInput.trim() || defaultReason;

    if (finalDelta > 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playBuzzer();
    }

    onApplyPoints(
      students,
      finalDelta,
      reasonText,
      'Custom Adjustment',
      finalDelta > 0 ? '⭐' : '⚠️'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="pixel-wood-box max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl">
        {/* Top Header: Student info & Direct Inline Custom Points Input */}
        <div className="bg-[#5a3818] text-[#ffebb3] px-3.5 py-2.5 border-b-4 border-[#361f0d] flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 shadow-md">
          {/* Left: Student Avatar + Name + Current Score */}
          <div className="flex items-center gap-2.5 min-w-0">
            {!isBatch && primaryStudent ? (
              <div className="shrink-0 p-0.5 rounded-xl bg-amber-50/20 border-2 border-[#8b5a2b] shadow-xs">
                <AvatarRenderer avatar={primaryStudent.avatar} name={primaryStudent.name} size={38} />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border-2 border-amber-600 flex items-center justify-center shrink-0">
                <PixelSprite name="star_full" size={22} />
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
                  <span className="font-pixel text-[10px] bg-[#3b1f0b] text-[#fed7aa] px-1.5 py-0.5 rounded border border-[#8b5a2b] shrink-0">
                    #{primaryStudent.rollNo}
                  </span>
                )}
              </div>
              {!isBatch && primaryStudent && (
                <div className="text-[11px] font-bold text-[#fed7aa] mt-0.5 flex items-center gap-1.5">
                  <span>目前得分：</span>
                  <span className="text-[#ffd700] font-pixel text-[10px]">
                    {primaryStudent.points} 分
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Center: Custom Score Input Box - Placed directly beside student's name */}
          <form
            onSubmit={handleApplyCustom}
            className="flex items-center gap-1.5 bg-[#3b1f0b] px-2.5 py-1.5 rounded-xl border-2 border-[#ca8a04] shadow-md ring-1 ring-amber-500/50 flex-wrap sm:flex-nowrap"
          >
            <span className="font-pixel text-[10px] sm:text-[11px] font-bold text-[#ffd700] whitespace-nowrap">
              自訂分數：
            </span>

            {/* +/- Mode Switch Toggle Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsNegativeSign(!isNegativeSign);
              }}
              className={`px-2 py-1 rounded-md font-pixel text-xs font-black flex items-center gap-1 border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                isNegativeSign
                  ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white border-[#f87171] ring-1 ring-red-400'
                  : 'bg-[#16a34a] hover:bg-[#15803d] text-white border-[#86efac] ring-1 ring-emerald-400'
              }`}
              title={isNegativeSign ? '目前為扣分模式，點擊切換為加分' : '目前為加分模式，點擊切換為扣分'}
            >
              {isNegativeSign ? (
                <>
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>扣分(-)</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>加分(+)</span>
                </>
              )}
            </button>

            {/* Number Input */}
            <div className="flex items-center gap-1 bg-[#faeed1] border-2 border-[#8b5a2b] rounded-md px-1.5 py-0.5">
              <input
                type="number"
                min="1"
                max="999"
                value={customDeltaInput}
                onChange={(e) => setCustomDeltaInput(e.target.value)}
                placeholder="分數"
                className="w-12 sm:w-14 bg-transparent text-[#4a2800] font-pixel text-xs font-bold text-center focus:outline-none"
              />
              <span className="text-[11px] font-pixel font-bold text-[#8b5a2b]">分</span>
            </div>

            {/* Reason Input */}
            <input
              type="text"
              value={customReasonInput}
              onChange={(e) => setCustomReasonInput(e.target.value)}
              placeholder="事由(選填)"
              className="w-24 sm:w-36 h-7 bg-[#faeed1] border-2 border-[#8b5a2b] text-[#4a2800] text-xs font-bold rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#fabc3f]"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className={`h-7 px-2.5 rounded-md font-pixel text-xs font-bold text-white flex items-center gap-1 cursor-pointer shadow transition-all active:scale-95 border-2 ${
                isNegativeSign
                  ? 'bg-[#b91c1c] hover:bg-[#991b1b] border-[#ef4444]'
                  : 'bg-[#059669] hover:bg-[#047857] border-[#34d399]'
              }`}
            >
              <span>送出</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

          {/* Right: Close Modal Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-7 h-7 bg-[#3b1f0b] hover:bg-[#8b5a2b] text-[#fed7aa] flex items-center justify-center border-2 border-[#8b5a2b] rounded cursor-pointer transition-colors shrink-0"
            title="關閉"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Body: ALWAYS Side-by-Side Left (加分項) & Right (扣分項) */}
        <div className="p-2.5 sm:p-4 overflow-y-auto max-h-[74vh] bg-[#fbf5e6]">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 items-start">
            {/* ================= LEFT COLUMN: 加分項 (Positive Presets) ================= */}
            <div className="bg-[#f0fdf4] border-2 border-[#86efac] rounded-xl p-2 sm:p-3 shadow-xs">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#86efac]/80">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#16a34a] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    +
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#14532d] flex items-center gap-1 truncate">
                      <span>🌱 獎勵加分項目</span>
                      <span className="text-[10px] text-[#16a34a] font-normal">({POSITIVE_PRESETS.length}項)</span>
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-[#15803d] truncate">游標懸停晃動，點擊加分</p>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-[#16a34a] shrink-0" />
              </div>

              {/* Positive List */}
              <div className="space-y-1.5">
                {POSITIVE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="item-wobble-hover w-full p-1.5 sm:p-2 bg-white hover:bg-[#dcfce7] border-2 border-[#bbf7d0] hover:border-[#10b981] rounded-lg text-left flex items-center justify-between group shadow-xs cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                      <span className="text-base sm:text-xl shrink-0 group-hover:scale-120 transition-transform">
                        {preset.icon}
                      </span>
                      <div className="min-w-0 truncate">
                        <div className="font-bold text-[11px] sm:text-xs text-[#14532d] truncate group-hover:text-[#047857]">
                          {preset.labelZh}
                        </div>
                        <div className="text-[9px] text-stone-500 truncate hidden md:block">
                          {preset.labelEn}
                        </div>
                      </div>
                    </div>
                    <span className="font-pixel text-[10px] sm:text-xs font-black bg-[#dcfce7] group-hover:bg-[#10b981] text-[#15803d] group-hover:text-white border border-[#86efac] px-1 sm:px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                      +{preset.points}分
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ================= RIGHT COLUMN: 扣分項 (Negative Presets) ================= */}
            <div className="bg-[#fef2f2] border-2 border-[#fca5a5] rounded-xl p-2 sm:p-3 shadow-xs">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#fca5a5]/80">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#dc2626] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                    -
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#7f1d1d] flex items-center gap-1 truncate">
                      <span>⚠️ 違紀扣分項目</span>
                      <span className="text-[10px] text-[#dc2626] font-normal">({NEGATIVE_PRESETS.length}項)</span>
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-[#b91c1c] truncate">游標懸停晃動，點擊扣分</p>
                  </div>
                </div>
                <AlertTriangle className="w-4 h-4 text-[#dc2626] shrink-0" />
              </div>

              {/* Negative List */}
              <div className="space-y-1.5">
                {NEGATIVE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="item-wobble-hover w-full p-1.5 sm:p-2 bg-white hover:bg-[#fee2e2] border-2 border-[#fecaca] hover:border-[#ef4444] rounded-lg text-left flex items-center justify-between group shadow-xs cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                      <span className="text-base sm:text-xl shrink-0 group-hover:scale-120 transition-transform">
                        {preset.icon}
                      </span>
                      <div className="min-w-0 truncate">
                        <div className="font-bold text-[11px] sm:text-xs text-[#7f1d1d] truncate group-hover:text-[#991b1b]">
                          {preset.labelZh}
                        </div>
                        <div className="text-[9px] text-stone-500 truncate hidden md:block">
                          {preset.labelEn}
                        </div>
                      </div>
                    </div>
                    <span className="font-pixel text-[10px] sm:text-xs font-black bg-[#fee2e2] group-hover:bg-[#ef4444] text-[#b91c1c] group-hover:text-white border border-[#fca5a5] px-1 sm:px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                      {preset.points}分
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#faeed1] px-4 py-2.5 border-t-2 border-[#c4a675] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5a3818]">
          <span className="text-[11px] font-bold text-stone-600">
            ✨ 左欄為獎勵加分、右欄為違紀扣分；游標懸停晃動提示，頂部名字旁可輸入自訂分數！
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1 bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] font-bold border-2 border-[#a3794b] rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
