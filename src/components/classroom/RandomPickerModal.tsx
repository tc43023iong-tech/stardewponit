import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Student } from '../../types/classroom';
import { soundManager } from '../../utils/sound';
import { AvatarRenderer } from './AvatarRenderer';
import { X, Sparkles, Shuffle, Star, RotateCcw, Users } from 'lucide-react';

interface RandomPickerModalProps {
  classId?: string;
  students: Student[];
  onClose: () => void;
  onOpenPointsForStudent: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
}

const STORAGE_PREFIX = 'stardew_random_picker_drawn_';

// Unbiased Fisher-Yates shuffle
function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadDrawnIds(storageKey: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  classId = 'default',
  students,
  onClose,
  onOpenPointsForStudent,
  onQuickAdd,
}) => {
  const storageKey = `${STORAGE_PREFIX}${classId}`;

  const [pickCount, setPickCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [displayCandidates, setDisplayCandidates] = useState<Student[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<Student[]>([]);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [drawnIds, setDrawnIds] = useState<string[]>(() => loadDrawnIds(storageKey));
  const [roundStatusNote, setRoundStatusNote] = useState<string | null>(null);
  const [showDrawnList, setShowDrawnList] = useState<boolean>(false);

  const rollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync drawnIds if classId changes
  useEffect(() => {
    setDrawnIds(loadDrawnIds(storageKey));
    setSelectedWinners([]);
    setHasRolled(false);
    setRoundStatusNote(null);
  }, [storageKey]);

  // Persist drawnIds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(drawnIds));
    } catch {}
  }, [storageKey, drawnIds]);

  // Clean up rolling interval on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
      }
    };
  }, []);

  const validStudentIds = useMemo(() => new Set(students.map((s) => s.id)), [students]);
  const activeDrawnIds = useMemo(
    () => drawnIds.filter((id) => validStudentIds.has(id)),
    [drawnIds, validStudentIds]
  );
  const drawnSet = useMemo(() => new Set(activeDrawnIds), [activeDrawnIds]);

  const remainingStudents = useMemo(
    () => students.filter((s) => !drawnSet.has(s.id)),
    [students, drawnSet]
  );

  const alreadyDrawnStudents = useMemo(
    () =>
      activeDrawnIds
        .map((id) => students.find((s) => s.id === id))
        .filter((s): s is Student => Boolean(s)),
    [activeDrawnIds, students]
  );

  // Initialize candidate display with an unpicked student (or first student)
  useEffect(() => {
    if (students.length > 0 && displayCandidates.length === 0) {
      setDisplayCandidates([remainingStudents[0] || students[0]]);
    }
  }, [students, remainingStudents, displayCandidates.length]);

  const handleStartRoll = () => {
    if (students.length === 0 || isRolling) return;
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
      rollIntervalRef.current = null;
    }

    const actualPickCount = Math.min(pickCount, students.length);
    let finalWinners: Student[] = [];
    let nextDrawnIds: string[] = [];
    let cycleNotice: string | null = null;
    let animationPool: Student[] = remainingStudents;

    if (remainingStudents.length === 0) {
      // Previous round finished: auto-start a fresh cycle with all students
      finalWinners = shuffleArray(students).slice(0, actualPickCount);
      nextDrawnIds = finalWinners.map((s) => s.id);
      cycleNotice = '✨ 上一輪已全員抽完，已自動開始新一輪點名！';
      animationPool = students;
    } else if (remainingStudents.length >= actualPickCount) {
      // Draw strictly from unpicked students (zero repeat within the round)
      finalWinners = shuffleArray(remainingStudents).slice(0, actualPickCount);
      nextDrawnIds = [...activeDrawnIds, ...finalWinners.map((s) => s.id)];
      if (nextDrawnIds.length >= students.length) {
        cycleNotice = '🎊 本輪最後幾位同學已全部抽完，全員完成一輪點名！';
      }
      animationPool = remainingStudents;
    } else {
      // Draw all remaining unpicked students first, then replenish remaining slots from a fresh cycle
      const firstPart = shuffleArray(remainingStudents);
      const firstPartIds = new Set(firstPart.map((s) => s.id));
      const neededMore = actualPickCount - firstPart.length;
      const freshPool = students.filter((s) => !firstPartIds.has(s.id));
      const secondPart = shuffleArray(freshPool).slice(0, neededMore);
      finalWinners = [...firstPart, ...secondPart];
      nextDrawnIds = secondPart.map((s) => s.id);
      cycleNotice = '🔄 剩餘同學已優先抽完，不足名額已自動開啟新一輪補齊！';
      animationPool = students;
    }

    setIsRolling(true);
    setHasRolled(false);
    setSelectedWinners([]);
    setRoundStatusNote(null);

    let counter = 0;
    const maxRolls = 24;
    const intervalTime = 70;

    rollIntervalRef.current = setInterval(() => {
      counter++;
      soundManager.playTick();

      if (counter < maxRolls) {
        const previewSource = animationPool.length >= actualPickCount ? animationPool : students;
        const tempPicks = shuffleArray(previewSource).slice(0, actualPickCount);
        setDisplayCandidates(tempPicks);
      } else {
        if (rollIntervalRef.current) {
          clearInterval(rollIntervalRef.current);
          rollIntervalRef.current = null;
        }
        setDisplayCandidates(finalWinners);
        setSelectedWinners(finalWinners);
        setDrawnIds(nextDrawnIds);
        setRoundStatusNote(cycleNotice);
        setIsRolling(false);
        setHasRolled(true);
        soundManager.playVictory();
      }
    }, intervalTime);
  };

  const handleResetPool = () => {
    if (isRolling) return;
    soundManager.playClick();
    setDrawnIds([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setSelectedWinners([]);
    setHasRolled(false);
    setDisplayCandidates(students.length > 0 ? [students[0]] : []);
    setRoundStatusNote('🔄 已重置點名名單，全班重新加入本輪抽籤！');
  };

  const roundProgressPercent =
    students.length > 0 ? Math.min(100, Math.round((activeDrawnIds.length / students.length) * 100)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs select-none"
      onMouseDown={(e) => {
        e.currentTarget.dataset.backdropDown = e.target === e.currentTarget ? '1' : '0';
      }}
      onClick={(e) => {
        if (!isRolling && e.target === e.currentTarget && e.currentTarget.dataset.backdropDown === '1') {
          soundManager.playClick();
          onClose();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pixel-wood-box max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl"
      >
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <h3 className="font-pixel text-xs sm:text-sm">
              隨機抽籤點名 · 不重複輪抽制 (Random Picker 🌱)
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
          {/* Pick Count Selector with options: 1..10人 */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap justify-center bg-[#ede0c2] p-2.5 rounded-xl border-2 border-[#b88b4a] shadow-inner max-w-2xl">
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
                className={`px-2.5 py-1 font-pixel text-xs rounded-md border-2 cursor-pointer transition-all active:scale-95 whitespace-nowrap shrink-0 ${
                  pickCount === count
                    ? 'bg-[#fabc3f] text-[#4a2800] border-[#8b5a2b] shadow-md ring-2 ring-amber-400 font-black'
                    : 'bg-[#faeed1] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
                }`}
              >
                {count} 人
              </button>
            ))}
          </div>

          {/* Round No-Repeat Progress Bar */}
          <div className="w-full max-w-2xl mb-4 bg-[#f4e2bd] border-2 border-[#b88b4a] rounded-xl px-3.5 py-2 flex flex-col gap-1.5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#5a3818]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#854d0e] shrink-0" />
                <span>
                  本輪不重複進度：已抽{' '}
                  <span className="font-pixel text-[#15803d] tabular-nums">
                    {activeDrawnIds.length} / {students.length}
                  </span>{' '}
                  人
                </span>
                <span className="px-2 py-0.5 rounded bg-[#fef9c3] border border-[#ca8a04] text-[11px] font-pixel text-[#854d0e] tabular-nums">
                  {remainingStudents.length > 0
                    ? `剩餘未抽 ${remainingStudents.length} 人`
                    : '本輪已全員抽完！'}
                </span>
              </div>

              {alreadyDrawnStudents.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setShowDrawnList((prev) => !prev);
                  }}
                  className="text-[11px] font-bold text-[#854d0e] hover:text-[#4a2800] underline cursor-pointer whitespace-nowrap"
                >
                  {showDrawnList ? '收合已抽名單 ▲' : `查看已抽名單 (${alreadyDrawnStudents.length}) ▼`}
                </button>
              )}
            </div>

            <div className="w-full h-2 bg-[#3b1f0b] rounded-full overflow-hidden border border-[#8b5a2b]">
              <div
                className={`h-full transition-all duration-500 ${
                  remainingStudents.length === 0 && students.length > 0
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-400'
                }`}
                style={{ width: `${roundProgressPercent}%` }}
              />
            </div>

            {showDrawnList && alreadyDrawnStudents.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                {alreadyDrawnStudents.map((st) => (
                  <span
                    key={st.id}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#fffbeb] border border-[#d6b37c] text-[#5a3818]"
                  >
                    #{st.rollNo} {st.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {roundStatusNote && (
            <div className="mb-3 px-3.5 py-1.5 rounded-lg bg-[#fef3c7] border-2 border-[#f59e0b] text-xs font-bold text-[#78350f] shadow-xs text-center">
              {roundStatusNote}
            </div>
          )}

          {/* Winner Showcase Stage */}
          <div className="w-full bg-[#f4e2bd] border-4 border-[#7c4f24] p-3 sm:p-6 rounded-xl shadow-inner min-h-[220px] max-h-[50vh] overflow-y-auto flex flex-col items-center justify-center relative">
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

          {/* Roll Button + Reset Button Side-by-Side */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleStartRoll}
              disabled={isRolling || students.length === 0}
              className={`px-7 py-3 rounded-xl font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all whitespace-nowrap shrink-0 ${
                isRolling || students.length === 0
                  ? 'bg-stone-400 text-stone-200 cursor-not-allowed'
                  : 'pixel-btn-gold'
              }`}
            >
              <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>
                {isRolling
                  ? '抽取中... ROLLING 🌱'
                  : remainingStudents.length === 0 && students.length > 0
                  ? `開啟新一輪抽籤 (${pickCount}人)`
                  : `開始隨機抽籤 (${pickCount}人)`}
              </span>
            </button>

            <button
              type="button"
              onClick={handleResetPool}
              disabled={isRolling || (activeDrawnIds.length === 0 && !hasRolled)}
              title="清空本輪已抽紀錄，讓所有同學重新參與抽籤"
              className={`px-4 py-3 rounded-xl font-pixel text-xs sm:text-sm font-bold border-2 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                isRolling || (activeDrawnIds.length === 0 && !hasRolled)
                  ? 'bg-[#e7dec8] text-[#9b8565] border-[#c9b48f] cursor-not-allowed opacity-70'
                  : 'bg-[#ede0c2] hover:bg-[#e2cda0] text-[#5a3818] border-[#8b5a2b] shadow-md cursor-pointer active:scale-95'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>重置點名</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
