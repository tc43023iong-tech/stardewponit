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

    const rollInterval = setInterval(() => {
      counter++;
      soundManager.playTick();

      // Pick random candidates temporarily
      const shuffled = [...students].sort(() => 0.5 - Math.random());
      const tempPicks = shuffled.slice(0, pickCount);
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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div className="pixel-wood-box max-w-xl w-full flex flex-col overflow-hidden text-[#4a2800]">
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
            className="p-1 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#faeed1] flex flex-col items-center">
          {/* Pick Count Selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold text-[#5a3818]">抽取人數：</span>
            {[1, 2, 4, 6].map((count) => (
              <button
                key={count}
                onClick={() => {
                  soundManager.playClick();
                  setPickCount(count);
                  setSelectedWinners([]);
                  setHasRolled(false);
                }}
                disabled={isRolling}
                className={`px-3 py-1 font-pixel text-xs rounded border cursor-pointer transition-all ${
                  pickCount === count
                    ? 'bg-[#fabc3f] text-[#4a2800] border-[#8b5a2b] shadow'
                    : 'bg-[#ede0c2] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
                }`}
              >
                {count} 人
              </button>
            ))}
          </div>

          {/* Winner Showcase Stage */}
          <div className="w-full bg-[#f4e2bd] border-4 border-[#7c4f24] p-4 sm:p-6 rounded-xl shadow-inner min-h-[180px] flex items-center justify-center relative">
            {hasRolled && (
              <div className="absolute top-2 text-[10px] font-pixel text-[#16a34a] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-400 animate-pulse">
                🎉 恭喜中選！幸運之星 🎉
              </div>
            )}

            <div
              className={`grid gap-4 w-full justify-items-center mt-2 ${
                pickCount === 1
                  ? 'grid-cols-1 max-w-xs'
                  : pickCount === 2
                  ? 'grid-cols-2 max-w-md'
                  : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {(hasRolled ? selectedWinners : displayCandidates).map((st) => (
                <div
                  key={st.id}
                  className={`pixel-parchment p-3 rounded-lg flex flex-col items-center text-center w-full shadow-md transition-transform ${
                    isRolling ? 'scale-95 opacity-80' : 'scale-100'
                  }`}
                >
                  <div className="relative mb-2">
                    <AvatarRenderer avatar={st.avatar} name={st.name} size={64} />
                    <span className="absolute -top-2 -left-2 bg-[#6a4422] text-[#ffebb3] font-pixel text-[10px] px-1.5 py-0.5 rounded border border-[#3b1f0b]">
                      #{st.rollNo}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-[#3d240d] mb-1 truncate max-w-full">
                    {st.name}
                  </h4>
                  <div className="text-xs font-pixel text-[#5a3818] mb-2">
                    {st.points} 分
                  </div>

                  {/* Immediate Action Buttons if Winner Revealed */}
                  {hasRolled && (
                    <div className="flex items-center gap-1 w-full pt-2 border-t border-[#dfcca4]">
                      <button
                        onClick={() => onQuickAdd(st, 2)}
                        className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer"
                        title="加2分"
                      >
                        +2
                      </button>
                      <button
                        onClick={() => onQuickAdd(st, 5)}
                        className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer"
                        title="加5分"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => onOpenPointsForStudent(st)}
                        className="pixel-btn-gold px-1.5 py-1 text-[10px] font-bold rounded cursor-pointer"
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
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleStartRoll}
              disabled={isRolling}
              className={`px-8 py-3.5 rounded-lg font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all ${
                isRolling
                  ? 'bg-stone-400 text-stone-200 cursor-not-allowed'
                  : 'pixel-btn-gold'
              }`}
            >
              <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? '抽取中... ROLLING 🌱' : '開始隨機抽籤 (DRAW)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
