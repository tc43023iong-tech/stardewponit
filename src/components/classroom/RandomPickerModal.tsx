import React, { useState, useEffect } from 'react';
import { Student } from '../../types/classroom';
import { soundManager } from '../../utils/sound';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import { X, Sparkles, Shuffle, Star } from 'lucide-react';

interface RandomPickerModalProps {
  students: Student[];
  onClose: () => void;
  onOpenPointsForStudent: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  students,
  onClose,
  onOpenPointsForStudent,
  onQuickAdd,
}) => {
  const [pickCount, setPickCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [displayCandidates, setDisplayCandidates] = useState<Student[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<Student[]>([]);
  const [hasRolled, setHasRolled] = useState<boolean>(false);

  // Initialize candidate display with first student or empty
  useEffect(() => {
    if (students.length > 0 && displayCandidates.length === 0) {
      setDisplayCandidates([students[0]]);
    }
  }, [students]);

  const handleStartRoll = () => {
    if (students.length === 0 || isRolling) return;
    setIsRolling(true);
    setHasRolled(false);
    setSelectedWinners([]);

    let counter = 0;
    const maxRolls = 24;
    const intervalTime = 70;
    const actualPickCount = Math.min(pickCount, students.length);

    const rollInterval = setInterval(() => {
      counter++;
      soundManager.playTick();

      // Pick random candidates temporarily
      const shuffled = [...students].sort(() => 0.5 - Math.random());
      const tempPicks = shuffled.slice(0, actualPickCount);
      setDisplayCandidates(tempPicks);

      if (counter >= maxRolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setHasRolled(true);
        setSelectedWinners(tempPicks);
        soundManager.playVictory();
      }
    }, intervalTime);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs select-none">
      <div className="pixel-wood-box max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl">
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <h3 className="font-pixel text-xs sm:text-sm">
              隨機抽籤點名 (Random Picker 🌱)
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer transition-colors"
            title="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-[#faeed1] flex flex-col items-center overflow-y-auto">
          {/* Pick Count Selector with requested options: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10人 */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap justify-center bg-[#ede0c2] p-2.5 rounded-xl border-2 border-[#b88b4a] shadow-inner max-w-2xl">
            <span className="text-xs font-bold text-[#5a3818] whitespace-nowrap mr-1">
              抽取人數：
            </span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
              <button
                key={count}
                onClick={() => {
                  soundManager.playClick();
                  setPickCount(count);
                  setSelectedWinners([]);
                  setHasRolled(false);
                }}
                disabled={isRolling}
                className={`px-2.5 py-1 font-pixel text-xs rounded-md border-2 cursor-pointer transition-all active:scale-95 ${
                  pickCount === count
                    ? 'bg-[#fabc3f] text-[#4a2800] border-[#8b5a2b] shadow-md ring-2 ring-amber-400 font-black'
                    : 'bg-[#faeed1] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
                }`}
              >
                {count} 人
              </button>
            ))}
          </div>

          {/* Winner Showcase Stage */}
          <div className="w-full bg-[#f4e2bd] border-4 border-[#7c4f24] p-3 sm:p-6 rounded-xl shadow-inner min-h-[220px] max-h-[55vh] overflow-y-auto flex flex-col items-center justify-center relative">
            {hasRolled && (
              <div className="sticky top-0 z-20 mb-3 text-xs font-pixel text-[#16a34a] bg-emerald-100/95 px-3 py-1 rounded-full border border-emerald-400 shadow-sm animate-pulse">
                🎉 恭喜中選！幸運之星 ({selectedWinners.length}位) 🎉
              </div>
            )}

            <div
              className={`grid gap-3 w-full justify-items-center mt-1 ${
                pickCount === 1
                  ? 'grid-cols-1 max-w-xs'
                  : pickCount === 2
                  ? 'grid-cols-2 max-w-md'
                  : pickCount === 3
                  ? 'grid-cols-1 sm:grid-cols-3 max-w-2xl'
                  : pickCount === 4
                  ? 'grid-cols-2 sm:grid-cols-4 max-w-3xl'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
              }`}
            >
              {(hasRolled ? selectedWinners : displayCandidates).map((st) => (
                <div
                  key={st.id}
                  className={`pixel-parchment p-2.5 sm:p-3 rounded-xl flex flex-col items-center text-center w-full shadow-md transition-transform ${
                    isRolling ? 'scale-95 opacity-80' : 'scale-100'
                  }`}
                >
                  <div className="relative mb-2">
                    <AvatarRenderer avatar={st.avatar} name={st.name} size={pickCount > 4 ? 52 : 64} />
                    <span className="absolute -top-2 -left-2 bg-[#6a4422] text-[#ffebb3] font-pixel text-[10px] px-1.5 py-0.5 rounded border border-[#3b1f0b] shadow-xs">
                      #{st.rollNo}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#3d240d] mb-0.5 truncate max-w-full">
                    {st.name}
                  </h4>
                  <div className="text-xs font-pixel text-[#5a3818] mb-2 font-bold">
                    {st.points} 分
                  </div>

                  {/* Immediate Action Buttons if Winner Revealed */}
                  {hasRolled && (
                    <div className="flex items-center gap-1 w-full pt-1.5 border-t border-[#dfcca4]">
                      <button
                        onClick={() => onQuickAdd(st, 2)}
                        className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer shadow-xs active:scale-95"
                        title="加2分"
                      >
                        +2
                      </button>
                      <button
                        onClick={() => onQuickAdd(st, 5)}
                        className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer shadow-xs active:scale-95"
                        title="加5分"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => onOpenPointsForStudent(st)}
                        className="pixel-btn-gold px-2 py-1 text-[10px] font-bold rounded cursor-pointer shadow-xs active:scale-95"
                        title="開啟完整評分"
                      >
                        <Star className="w-3 h-3 fill-[#633300]" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Roll Button */}
          <div className="mt-4 sm:mt-6 flex items-center gap-3">
            <button
              onClick={handleStartRoll}
              disabled={isRolling}
              className={`px-8 py-3 rounded-xl font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all ${
                isRolling
                  ? 'bg-stone-400 text-stone-200 cursor-not-allowed'
                  : 'pixel-btn-gold'
              }`}
            >
              <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? '抽取中... ROLLING 🌱' : `開始隨機抽籤 (${pickCount}人)`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
