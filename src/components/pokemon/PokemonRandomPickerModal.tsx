import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { resolveStudentAvatar } from '../../utils/pokemonAvatars';
import { pokemonSound } from '../../utils/pokemonAudio';

interface PokemonRandomPickerModalProps {
  students: Student[];
  pickedHistoryIds: string[];
  onClose: () => void;
  onRecordPicked: (ids: string[]) => void;
  onScoreWinners: (winners: Student[]) => void;
}

export const PokemonRandomPickerModal: React.FC<PokemonRandomPickerModalProps> = ({
  students,
  pickedHistoryIds,
  onClose,
  onRecordPicked,
  onScoreWinners,
}) => {
  const [pickCount, setPickCount] = useState<number>(3);
  const [excludeAlreadyPicked, setExcludeAlreadyPicked] = useState<boolean>(true);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [winners, setWinners] = useState<Student[]>([]);
  const [rollingCandidate, setRollingCandidate] = useState<Student | null>(null);

  const rollIntervalRef = useRef<number | null>(null);

  // Filter candidate pool
  const candidatePool = excludeAlreadyPicked
    ? students.filter((s) => !pickedHistoryIds.includes(s.id))
    : students;

  const actualPool = candidatePool.length > 0 ? candidatePool : students;

  const handleStartDraw = () => {
    if (actualPool.length === 0 || isRolling) return;
    setIsRolling(true);
    setWinners([]);

    let count = 0;
    const maxSteps = 24;

    rollIntervalRef.current = window.setInterval(() => {
      count++;
      const randomStudent = actualPool[Math.floor(Math.random() * actualPool.length)];
      setRollingCandidate(randomStudent);
      pokemonSound.playShuffleTick(count, maxSteps);

      if (count >= maxSteps) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
        // Pick final winners
        const shuffled = [...actualPool].sort(() => 0.5 - Math.random());
        const chosen = shuffled.slice(0, Math.min(pickCount, actualPool.length));
        setWinners(chosen);
        setIsRolling(false);
        setRollingCandidate(null);
        pokemonSound.playShuffleSuccess();
        pokemonSound.playClapping();
        onRecordPicked(chosen.map((s) => s.id));
      }
    }, 85);
  };

  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-[2.5rem] border-4 border-[#8D6E63] shadow-2xl max-w-2xl w-full p-6 text-[#5D4037] flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#E7DFD5] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl animate-bounce">👥</span>
            <div>
              <h2 className="text-2xl font-black tracking-tight">幸運隨機抽籤 (Random Picker 🌱)</h2>
              <p className="text-xs text-[#8D6E63] font-bold">
                候選池：{actualPool.length} 人 · 歷史已抽中：{pickedHistoryIds.length} 人
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-[#8D6E63] font-black text-xl flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Candidate Count Options: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10人 */}
        <div className="flex flex-col gap-2 bg-[#FFF8E1] p-3.5 rounded-2xl border border-[#FDE68A]">
          <span className="text-xs font-black text-[#8D6E63]">抽取人數選擇：</span>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                disabled={isRolling}
                onClick={() => setPickCount(num)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs border transition-all cursor-pointer ${
                  pickCount === num
                    ? 'bg-[#F59E0B] text-white border-[#B45309] shadow-sm scale-105'
                    : 'bg-white text-[#5D4037] border-[#D7CCC8] hover:bg-stone-50'
                }`}
              >
                {num} 人
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={excludeAlreadyPicked}
              disabled={isRolling}
              onChange={(e) => setExcludeAlreadyPicked(e.target.checked)}
              className="rounded text-[#F59E0B] focus:ring-[#F59E0B] w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-bold text-[#8D6E63]">
              排除本輪已抽中過的學生（保證人人有機會）
            </span>
          </label>
        </div>

        {/* Center Display: Rolling or Winners */}
        <div className="min-h-[180px] bg-white rounded-3xl border-2 border-[#D7CCC8] p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          {isRolling && rollingCandidate ? (
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <img
                src={resolveStudentAvatar(rollingCandidate)}
                alt={rollingCandidate.name}
                className="w-24 h-24 object-contain animate-bounce"
                referrerPolicy="no-referrer"
              />
              <span className="font-black text-2xl text-[#B45309]">{rollingCandidate.name}</span>
              <span className="font-mono text-sm text-stone-400">#{rollingCandidate.rollNo}</span>
            </div>
          ) : winners.length > 0 ? (
            <div className="w-full flex flex-col items-center gap-4">
              <span className="text-xs font-black tracking-widest text-[#B45309] bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-full uppercase">
                🎉 幸運中選名單 ({winners.length} 人)
              </span>

              <div className="flex flex-wrap justify-center gap-3 w-full">
                {winners.map((w) => (
                  <div
                    key={w.id}
                    className="flex flex-col items-center p-3 rounded-2xl bg-amber-50/70 border-2 border-amber-300 shadow-sm min-w-[100px] animate-fade-in"
                  >
                    <img
                      src={resolveStudentAvatar(w)}
                      alt={w.name}
                      className="w-16 h-16 object-contain filter drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-black text-base text-[#5D4037] mt-1">{w.name}</span>
                    <span className="font-mono text-xs text-stone-400">#{w.rollNo}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-stone-400 flex flex-col items-center gap-2">
              <span className="text-4xl">🎲</span>
              <span className="font-black text-sm">點擊下方按鈕開始隨機抽取</span>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {winners.length > 0 && !isRolling && (
            <button
              type="button"
              onClick={() => onScoreWinners(winners)}
              className="px-5 py-2.5 rounded-2xl font-black text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
            >
              ⚡ 為抽中者評分 ({winners.length} 人)
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl font-black text-sm bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
            >
              關閉
            </button>

            <button
              type="button"
              disabled={isRolling || actualPool.length === 0}
              onClick={handleStartDraw}
              className="px-7 py-2.5 rounded-2xl font-black text-base text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] border-b-3 border-[#92400E] shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isRolling ? '抽籤中...' : `🚀 開始抽取 ${pickCount} 人`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
