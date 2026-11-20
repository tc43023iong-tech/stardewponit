import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Student, PickerMode } from '../../types/classroom';
import { soundManager } from '../../utils/sound';
import { AvatarRenderer } from './AvatarRenderer';
import { PixelSprite } from '../common/PixelSprite';
import {
  FishRewardItem,
  GemRewardItem,
  rollRandomFish,
  rollRandomGem,
} from '../../data/pickerRewards';
import {
  FishingPhase,
  MineRockState,
  MineRockContent,
  PixelDiceIcon,
  PixelFishingRodIcon,
  PixelPickaxeIcon,
  PixelPondScene,
  PixelMineScene,
  RewardPixelIcon,
} from './PickerPixelArt';
import { LegendaryCatchOverlay } from './LegendaryCatchOverlay';
import {
  X,
  Sparkles,
  Shuffle,
  Star,
  RotateCcw,
  Users,
  Settings,
  CheckCircle2,
  ArrowRight,
  Award,
  SlidersHorizontal,
} from 'lucide-react';

interface RandomPickerModalProps {
  classId?: string;
  students: Student[];
  timeOfDay?: 'dawn' | 'day' | 'sunset' | 'night';
  onClose: () => void;
  onOpenPointsForStudent: (student: Student) => void;
  onQuickAdd: (student: Student, delta: number) => void;
  onRecordFishingCatch: (student: Student, fish: FishRewardItem) => string;
  onClaimFishingCorrectBonus: (student: Student, recordId: string) => void;
  onRecordMineGem: (student: Student, gem: GemRewardItem) => string;
  onMarkMineAnsweredCorrect: (recordId: string) => void;
  onLegendaryCatch?: (student: Student, fish: FishRewardItem) => void;
}

const STORAGE_DRAWN_PREFIX = 'stardew_random_picker_drawn_';
const STORAGE_NO_REPEAT_KEY = 'stardew_random_picker_no_repeat';

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

function loadNoRepeatSetting(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_NO_REPEAT_KEY);
    return saved === null ? true : saved === 'true';
  } catch {
    return true;
  }
}

function createShuffledMineRocks(): MineRockState[] {
  const contents: MineRockContent[] = shuffleArray<MineRockContent>(['gem', 'stone', 'bat']);
  return contents.map((content, index) => ({
    index,
    content,
    opened: false,
  }));
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  classId = 'default',
  students,
  timeOfDay = 'day',
  onClose,
  onOpenPointsForStudent,
  onQuickAdd,
  onRecordFishingCatch,
  onClaimFishingCorrectBonus,
  onRecordMineGem,
  onMarkMineAnsweredCorrect,
  onLegendaryCatch,
}) => {
  const storageKey = `${STORAGE_DRAWN_PREFIX}${classId}`;

  // Mode Switcher & Settings
  const [pickerMode, setPickerMode] = useState<PickerMode>('classic');
  const [noRepeatEnabled, setNoRepeatEnabled] = useState<boolean>(loadNoRepeatSetting);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Shared Drawn Pool
  const [drawnIds, setDrawnIds] = useState<string[]>(() => loadDrawnIds(storageKey));
  const [roundStatusNote, setRoundStatusNote] = useState<string | null>(null);
  const [showDrawnList, setShowDrawnList] = useState<boolean>(false);

  // Classic Picker State
  const [pickCount, setPickCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [displayCandidates, setDisplayCandidates] = useState<Student[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<Student[]>([]);
  const [hasRolled, setHasRolled] = useState<boolean>(false);

  // Fishing Picker State
  const [fishingPhase, setFishingPhase] = useState<FishingPhase>('idle');
  const [fishedStudent, setFishedStudent] = useState<Student | null>(null);
  const [caughtFish, setCaughtFish] = useState<FishRewardItem | null>(null);
  const [fishingRecordId, setFishingRecordId] = useState<string | null>(null);
  const [fishingBonusClaimed, setFishingBonusClaimed] = useState<boolean>(false);
  const [legendaryCelebration, setLegendaryCelebration] = useState<{
    student: Student;
    fish: FishRewardItem;
  } | null>(null);

  // Mining Picker State
  const [mineRocks, setMineRocks] = useState<MineRockState[]>(createShuffledMineRocks);
  const [hittingRockIndex, setHittingRockIndex] = useState<number | null>(null);
  const [lastRockMessage, setLastRockMessage] = useState<string | null>(null);
  const [minedStudent, setMinedStudent] = useState<Student | null>(null);
  const [foundGem, setFoundGem] = useState<GemRewardItem | null>(null);
  const [miningRecordId, setMiningRecordId] = useState<string | null>(null);
  const [miningCorrectMarked, setMiningCorrectMarked] = useState<boolean>(false);

  const rollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fishingTimersRef = useRef<number[]>([]);
  const miningTimerRef = useRef<number | null>(null);

  const clearFishingTimers = useCallback(() => {
    fishingTimersRef.current.forEach((id) => window.clearTimeout(id));
    fishingTimersRef.current = [];
  }, []);

  const clearMiningTimer = useCallback(() => {
    if (miningTimerRef.current !== null) {
      window.clearTimeout(miningTimerRef.current);
      miningTimerRef.current = null;
    }
  }, []);

  // Sync drawnIds if classId changes
  useEffect(() => {
    setDrawnIds(loadDrawnIds(storageKey));
    setSelectedWinners([]);
    setHasRolled(false);
    setRoundStatusNote(null);
    setFishingPhase('idle');
    setFishedStudent(null);
    setCaughtFish(null);
    setMineRocks(createShuffledMineRocks());
    setMinedStudent(null);
    setFoundGem(null);
    setLastRockMessage(null);
  }, [storageKey]);

  // Persist drawnIds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(drawnIds));
    } catch {}
  }, [storageKey, drawnIds]);

  // Persist noRepeatEnabled to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NO_REPEAT_KEY, String(noRepeatEnabled));
    } catch {}
  }, [noRepeatEnabled]);

  // Clean up all active timers on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      clearFishingTimers();
      clearMiningTimer();
    };
  }, [clearFishingTimers, clearMiningTimer]);

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

  // Initialize classic candidate display
  useEffect(() => {
    if (students.length > 0 && displayCandidates.length === 0) {
      setDisplayCandidates([remainingStudents[0] || students[0]]);
    }
  }, [students, remainingStudents, displayCandidates.length]);

  // Helper to draw N students honoring the noRepeatEnabled rule
  const drawStudentsFromPool = useCallback(
    (count: number): {
      winners: Student[];
      nextDrawnIds: string[];
      notice: string | null;
      animationPool: Student[];
    } => {
      const actualCount = Math.min(count, students.length);
      if (actualCount === 0) {
        return { winners: [], nextDrawnIds: activeDrawnIds, notice: null, animationPool: [] };
      }

      if (!noRepeatEnabled) {
        const winners = shuffleArray(students).slice(0, actualCount);
        return {
          winners,
          nextDrawnIds: activeDrawnIds,
          notice: null,
          animationPool: students,
        };
      }

      if (remainingStudents.length === 0) {
        const winners = shuffleArray(students).slice(0, actualCount);
        return {
          winners,
          nextDrawnIds: winners.map((s) => s.id),
          notice: '上一輪已全員抽完，已自動重置並開啟新一輪點名！',
          animationPool: students,
        };
      }

      if (remainingStudents.length >= actualCount) {
        const winners = shuffleArray(remainingStudents).slice(0, actualCount);
        const nextDrawnIds = [...activeDrawnIds, ...winners.map((s) => s.id)];
        const notice =
          nextDrawnIds.length >= students.length
            ? '本輪最後一位同學已抽完，全班完成一輪點名！'
            : null;
        return {
          winners,
          nextDrawnIds,
          notice,
          animationPool: remainingStudents,
        };
      }

      const firstPart = shuffleArray(remainingStudents);
      const firstPartIds = new Set(firstPart.map((s) => s.id));
      const neededMore = actualCount - firstPart.length;
      const freshPool = students.filter((s) => !firstPartIds.has(s.id));
      const secondPart = shuffleArray(freshPool).slice(0, neededMore);
      const winners = [...firstPart, ...secondPart];
      return {
        winners,
        nextDrawnIds: secondPart.map((s) => s.id),
        notice: '剩餘同學已優先抽完，不足名額已自動開啟新一輪補齊！',
        animationPool: students,
      };
    },
    [students, activeDrawnIds, remainingStudents, noRepeatEnabled]
  );

  // Live student sync helper (shows updated points & coins right after scoring)
  const resolveLiveStudent = (st: Student | null): Student | null => {
    if (!st) return null;
    return students.find((s) => s.id === st.id) || st;
  };

  const liveFishedStudent = resolveLiveStudent(fishedStudent);
  const liveMinedStudent = resolveLiveStudent(minedStudent);

  // Switch between modes safely
  const handleSelectMode = (nextMode: PickerMode) => {
    if (isRolling || (fishingPhase !== 'idle' && fishingPhase !== 'revealed') || hittingRockIndex !== null) {
      return;
    }
    soundManager.playClick();
    setPickerMode(nextMode);
    setRoundStatusNote(null);
  };

  // --- MODE 1: CLASSIC PICKER ---
  const handleStartClassicRoll = () => {
    if (students.length === 0 || isRolling) return;
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
      rollIntervalRef.current = null;
    }

    const { winners, nextDrawnIds, notice, animationPool } = drawStudentsFromPool(pickCount);
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
        const previewSource = animationPool.length >= winners.length ? animationPool : students;
        setDisplayCandidates(shuffleArray(previewSource).slice(0, winners.length));
      } else {
        if (rollIntervalRef.current) {
          clearInterval(rollIntervalRef.current);
          rollIntervalRef.current = null;
        }
        setDisplayCandidates(winners);
        setSelectedWinners(winners);
        if (noRepeatEnabled) {
          setDrawnIds(nextDrawnIds);
        }
        setRoundStatusNote(notice);
        setIsRolling(false);
        setHasRolled(true);
        soundManager.playVictory();
      }
    }, intervalTime);
  };

  // --- MODE 2: FISHING PICKER ---
  const isFishingAnimating =
    fishingPhase === 'casting' || fishingPhase === 'waiting' || fishingPhase === 'bite';

  const handleCastFishingRod = () => {
    if (students.length === 0 || isFishingAnimating) return;
    clearFishingTimers();

    const { winners, nextDrawnIds, notice } = drawStudentsFromPool(1);
    const chosenStudent = winners[0];
    if (!chosenStudent) return;

    const rolledFish = rollRandomFish();

    setFishedStudent(null);
    setCaughtFish(null);
    setFishingRecordId(null);
    setFishingBonusClaimed(false);
    setRoundStatusNote(null);
    setFishingPhase('casting');
    soundManager.playFishingCast();

    // Stage 2: Bobber hits water, ripples & fish shadow approaches (Wait ~1.5s)
    const t1 = window.setTimeout(() => {
      setFishingPhase('waiting');
    }, 450);

    // Subtle underwater nibble bubble while fish shadow swims close
    const t2 = window.setTimeout(() => {
      soundManager.playFishingNibble();
    }, 1250);

    // Stage 3: Fish bites!
    const t3 = window.setTimeout(() => {
      setFishingPhase('bite');
      soundManager.playFishingBite();
    }, 1950);

    // Stage 4: Pull up! Reveal fish + student simultaneously
    const t4 = window.setTimeout(() => {
      setFishingPhase('revealed');
      setCaughtFish(rolledFish);
      setFishedStudent(chosenStudent);
      if (noRepeatEnabled) {
        setDrawnIds(nextDrawnIds);
      }
      setRoundStatusNote(notice);

      const newRecId = onRecordFishingCatch(chosenStudent, rolledFish);
      setFishingRecordId(newRecId);

      if (rolledFish.rarity === 'legendary') {
        soundManager.playAchievementUnlock();
        setLegendaryCelebration({ student: chosenStudent, fish: rolledFish });
        onLegendaryCatch?.(chosenStudent, rolledFish);
      } else if (rolledFish.rarity === 'rare') {
        soundManager.playVictory();
      } else {
        soundManager.playHarvest();
      }
    }, 2350);

    fishingTimersRef.current = [t1, t2, t3, t4];
  };

  const handleFishingAnswerCorrect = () => {
    if (!liveFishedStudent) return;
    if (!fishingBonusClaimed && fishingRecordId) {
      setFishingBonusClaimed(true);
      soundManager.playCollect();
      onClaimFishingCorrectBonus(liveFishedStudent, fishingRecordId);
    } else {
      soundManager.playClick();
    }
    onOpenPointsForStudent(liveFishedStudent);
  };

  const handleFishingNextStudent = () => {
    soundManager.playClick();
    clearFishingTimers();
    setFishingPhase('idle');
    setFishedStudent(null);
    setCaughtFish(null);
    setFishingRecordId(null);
    setFishingBonusClaimed(false);
    setRoundStatusNote(null);
  };

  // --- MODE 3: MINING PICKER ---
  const isMineRevealed = Boolean(minedStudent && foundGem);

  const handleStrikeRock = (rockIndex: number) => {
    if (students.length === 0 || hittingRockIndex !== null || isMineRevealed) return;
    const targetRock = mineRocks.find((r) => r.index === rockIndex);
    if (!targetRock || targetRock.opened) return;

    clearMiningTimer();
    setHittingRockIndex(rockIndex);
    setLastRockMessage('揮動十字鎬敲擊礦石中...');
    soundManager.playMineStrike();

    miningTimerRef.current = window.setTimeout(() => {
      setHittingRockIndex(null);
      setMineRocks((prev) =>
        prev.map((r) => (r.index === rockIndex ? { ...r, opened: true } : r))
      );

      if (targetRock.content === 'stone') {
        soundManager.playMineStone();
        setLastRockMessage('敲到普通石頭，沒有隱藏寶石，請繼續敲下一塊石頭！');
        return;
      }

      if (targetRock.content === 'bat') {
        soundManager.playBatFlutter();
        setLastRockMessage('一隻友善的小蝙蝠開心地飛走了！請繼續敲下一塊石頭！');
        return;
      }

      // Discovered the hidden gem! Draw student and reveal simultaneously
      const { winners, nextDrawnIds, notice } = drawStudentsFromPool(1);
      const chosenStudent = winners[0];
      if (!chosenStudent) return;

      const gem = rollRandomGem();
      soundManager.playGemFind();

      if (noRepeatEnabled) {
        setDrawnIds(nextDrawnIds);
      }
      setRoundStatusNote(notice);
      setFoundGem(gem);
      setMinedStudent(chosenStudent);
      setMiningCorrectMarked(false);
      setLastRockMessage(`發現稀有礦洞寶石「${gem.name}」，已獲得 +3 金幣！`);

      const newRecId = onRecordMineGem(chosenStudent, gem);
      setMiningRecordId(newRecId);
    }, 420);
  };

  const handleRandomStrikeRock = () => {
    const unopened = mineRocks.filter((r) => !r.opened);
    if (unopened.length === 0 || hittingRockIndex !== null || isMineRevealed) return;
    const picked = unopened[Math.floor(Math.random() * unopened.length)];
    handleStrikeRock(picked.index);
  };

  const handleMiningAnswerCorrect = () => {
    if (!liveMinedStudent) return;
    soundManager.playClick();
    if (!miningCorrectMarked && miningRecordId) {
      setMiningCorrectMarked(true);
      onMarkMineAnsweredCorrect(miningRecordId);
    }
    onOpenPointsForStudent(liveMinedStudent);
  };

  const handleMiningNextStudent = () => {
    soundManager.playClick();
    clearMiningTimer();
    setMineRocks(createShuffledMineRocks());
    setHittingRockIndex(null);
    setMinedStudent(null);
    setFoundGem(null);
    setMiningRecordId(null);
    setMiningCorrectMarked(false);
    setLastRockMessage(null);
    setRoundStatusNote(null);
  };

  // --- SHARED RESET POOL ---
  const handleResetPool = () => {
    if (isRolling || isFishingAnimating || hittingRockIndex !== null) return;
    soundManager.playClick();
    setDrawnIds([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setSelectedWinners([]);
    setHasRolled(false);
    setDisplayCandidates(students.length > 0 ? [students[0]] : []);
    setRoundStatusNote('已重置本輪點名名單，全班重新加入輪抽！');
  };

  const roundProgressPercent =
    students.length > 0 ? Math.min(100, Math.round((activeDrawnIds.length / students.length) * 100)) : 0;

  const isBusy = isRolling || isFishingAnimating || hittingRockIndex !== null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs select-none"
      onMouseDown={(e) => {
        e.currentTarget.dataset.backdropDown = e.target === e.currentTarget ? '1' : '0';
      }}
      onClick={(e) => {
        if (!isBusy && e.target === e.currentTarget && e.currentTarget.dataset.backdropDown === '1') {
          soundManager.playClick();
          onClose();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pixel-wood-box max-w-6xl w-full max-h-[95vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl"
      >
        {/* Top Wooden Header Bar */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Sparkles className="w-5 h-5 text-[#ffd700] shrink-0" />
            <h3 className="font-pixel text-sm sm:text-base truncate">
              星露谷課堂隨機點名中心
            </h3>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#4a2e13] border border-[#8b5a2b] text-[11px] font-bold text-[#fde68a]">
              {noRepeatEnabled ? '不重複輪抽制：開啟' : '不重複輪抽制：關閉'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowSettings((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-lg border-2 text-xs font-pixel font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                showSettings
                  ? 'bg-[#fabc3f] text-[#4a2800] border-[#fef08a]'
                  : 'bg-[#4d2e13] hover:bg-[#5a3818] text-[#ffebb3] border-[#8b5a2b]'
              }`}
              title="設定點名規則"
            >
              <Settings className="w-4 h-4" />
              <span>規則設定</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (isBusy) return;
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer transition-colors"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel (Collapsible) */}
        {showSettings && (
          <div className="bg-[#4d2e13] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-[#ffd700] shrink-0" />
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#ffd700]">
                  本節不重複輪抽規則
                </div>
                <div className="text-[11px] text-[#fed7aa]">
                  開啟後，同一節課抽過的同學不會重複出現，直到全班輪流抽過一次才自動重置。
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setNoRepeatEnabled((prev) => !prev);
                }}
                className={`px-4 py-1.5 rounded-lg border-2 font-pixel text-xs font-black cursor-pointer transition-all ${
                  noRepeatEnabled
                    ? 'bg-[#16a34a] text-white border-[#86efac] shadow'
                    : 'bg-stone-600 text-stone-200 border-stone-400'
                }`}
              >
                {noRepeatEnabled ? '已開啟：不重複抽籤' : '已關閉：允許重複抽籤'}
              </button>

              <button
                type="button"
                onClick={handleResetPool}
                disabled={isBusy || activeDrawnIds.length === 0}
                className="px-3 py-1.5 rounded-lg bg-[#faeed1] hover:bg-[#ffeec2] disabled:opacity-50 text-[#4a2800] border-2 border-[#c4a675] font-pixel text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置本輪名單</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Scrollable Body */}
        <div className="p-3 sm:p-5 bg-[#faeed1] flex flex-col items-center overflow-y-auto flex-1">
          {/* 3 BIG SIDE-BY-SIDE MODE BUTTONS (Classroom Screen Friendly) */}
          <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 mb-4">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSelectMode('classic')}
              className={`p-3 sm:p-4 rounded-2xl border-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 transition-all cursor-pointer shadow-md active:scale-97 ${
                pickerMode === 'classic'
                  ? 'bg-gradient-to-b from-[#fef08a] to-[#fabc3f] border-[#78350f] text-[#3d240d] ring-3 ring-[#fde047] shadow-xl'
                  : 'bg-[#fdfbf7] hover:bg-[#fff7e0] border-[#b88b4a] text-[#5a3818]'
              } ${isBusy ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <PixelDiceIcon size={38} />
              <div className="text-center sm:text-left">
                <div className="font-pixel text-sm sm:text-xl font-black leading-tight">
                  普通點名
                </div>
                <div className="text-[11px] sm:text-xs font-bold opacity-80 hidden md:block">
                  支援 1 至 10 人快速抽籤
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSelectMode('fishing')}
              className={`p-3 sm:p-4 rounded-2xl border-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 transition-all cursor-pointer shadow-md active:scale-97 ${
                pickerMode === 'fishing'
                  ? 'bg-gradient-to-b from-[#bae6fd] to-[#38bdf8] border-[#075985] text-[#082f49] ring-3 ring-[#7dd3fc] shadow-xl'
                  : 'bg-[#fdfbf7] hover:bg-[#e0f2fe] border-[#b88b4a] text-[#5a3818]'
              } ${isBusy ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <PixelFishingRodIcon size={38} />
              <div className="text-center sm:text-left">
                <div className="font-pixel text-sm sm:text-xl font-black leading-tight">
                  釣魚點名
                </div>
                <div className="text-[11px] sm:text-xs font-bold opacity-80 hidden md:block">
                  池塘拋竿釣魚抽幸運星
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSelectMode('mining')}
              className={`p-3 sm:p-4 rounded-2xl border-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 transition-all cursor-pointer shadow-md active:scale-97 ${
                pickerMode === 'mining'
                  ? 'bg-gradient-to-b from-[#e9d5ff] to-[#a855f7] border-[#4c1d95] text-white ring-3 ring-[#d8b4fe] shadow-xl'
                  : 'bg-[#fdfbf7] hover:bg-[#f3e8ff] border-[#b88b4a] text-[#5a3818]'
              } ${isBusy ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <PixelPickaxeIcon size={38} />
              <div className="text-center sm:text-left">
                <div className="font-pixel text-sm sm:text-xl font-black leading-tight">
                  礦洞點名
                </div>
                <div className="text-[11px] sm:text-xs font-bold opacity-80 hidden md:block">
                  敲石尋寶揭曉幸運同學
                </div>
              </div>
            </button>
          </div>

          {/* Shared Round No-Repeat Progress Bar */}
          <div className="w-full mb-4 bg-[#f4e2bd] border-2 border-[#b88b4a] rounded-xl px-4 py-2.5 flex flex-col gap-1.5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#5a3818]">
              <div className="flex items-center gap-2 flex-wrap">
                <Users className="w-4 h-4 text-[#854d0e] shrink-0" />
                {noRepeatEnabled ? (
                  <>
                    <span>
                      本輪不重複進度：已抽{' '}
                      <span className="font-pixel text-[#15803d] tabular-nums">
                        {activeDrawnIds.length} / {students.length}
                      </span>{' '}
                      人
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#fef9c3] border border-[#ca8a04] text-xs font-pixel text-[#854d0e] tabular-nums">
                      {remainingStudents.length > 0
                        ? `剩餘未抽 ${remainingStudents.length} 人`
                        : '本輪已全員抽完！'}
                    </span>
                  </>
                ) : (
                  <span className="text-[#854d0e]">
                    自由隨機點名模式（未啟用輪抽不重複限制）
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {alreadyDrawnStudents.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setShowDrawnList((prev) => !prev);
                    }}
                    className="text-xs font-bold text-[#854d0e] hover:text-[#4a2800] underline cursor-pointer whitespace-nowrap"
                  >
                    {showDrawnList
                      ? '收合本輪已抽名單'
                      : `查看已抽名單 (${alreadyDrawnStudents.length})`}
                  </button>
                )}

                {activeDrawnIds.length > 0 && (
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={handleResetPool}
                    className="px-2.5 py-1 rounded bg-[#ede0c2] hover:bg-[#e2cda0] border border-[#8b5a2b] text-xs font-pixel text-[#5a3818] flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>重置</span>
                  </button>
                )}
              </div>
            </div>

            {noRepeatEnabled && (
              <div className="w-full h-2.5 bg-[#3b1f0b] rounded-full overflow-hidden border border-[#8b5a2b]">
                <div
                  className={`h-full transition-all duration-500 ${
                    remainingStudents.length === 0 && students.length > 0
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                      : 'bg-gradient-to-r from-emerald-500 to-lime-400'
                  }`}
                  style={{ width: `${roundProgressPercent}%` }}
                />
              </div>
            )}

            {showDrawnList && alreadyDrawnStudents.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {alreadyDrawnStudents.map((st) => (
                  <span
                    key={st.id}
                    className="text-xs font-bold px-2 py-0.5 rounded bg-[#fffbeb] border border-[#d6b37c] text-[#5a3818]"
                  >
                    #{st.rollNo} {st.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {roundStatusNote && (
            <div className="mb-3 px-4 py-1.5 rounded-lg bg-[#fef3c7] border-2 border-[#f59e0b] text-xs sm:text-sm font-bold text-[#78350f] shadow-xs text-center">
              {roundStatusNote}
            </div>
          )}

          {/* ================= MODE 1: CLASSIC PICKER ================= */}
          {pickerMode === 'classic' && (
            <div className="w-full flex flex-col items-center">
              {/* Pick Count Selector */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-4 flex-wrap justify-center bg-[#ede0c2] p-2.5 rounded-xl border-2 border-[#b88b4a] shadow-inner max-w-3xl">
                <span className="text-xs sm:text-sm font-bold text-[#5a3818] whitespace-nowrap mr-1">
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

              {/* Winner Showcase Stage */}
              <div className="w-full bg-[#f4e2bd] border-4 border-[#7c4f24] p-4 sm:p-6 rounded-xl shadow-inner min-h-[220px] max-h-[46vh] overflow-y-auto flex flex-col items-center justify-center relative">
                {hasRolled && (
                  <div className="sticky top-0 z-20 mb-3 text-xs sm:text-sm font-pixel text-[#16a34a] bg-emerald-100/95 px-4 py-1 rounded-full border-2 border-emerald-400 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>恭喜中選！幸運之星 ({selectedWinners.length} 位)</span>
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
                  {(hasRolled ? selectedWinners : displayCandidates).map((st) => {
                    const liveSt = resolveLiveStudent(st) || st;
                    return (
                      <div
                        key={liveSt.id}
                        className={`pixel-parchment p-2.5 sm:p-3 rounded-xl flex flex-col items-center text-center w-full shadow-md transition-transform ${
                          isRolling ? 'scale-95 opacity-80' : 'scale-100'
                        }`}
                      >
                        <div className="relative mb-2">
                          <AvatarRenderer
                            avatar={liveSt.avatar}
                            name={liveSt.name}
                            size={pickCount > 4 ? 52 : 68}
                          />
                          <span className="absolute -top-2 -left-2 bg-[#6a4422] text-[#ffebb3] font-pixel text-[10px] px-1.5 py-0.5 rounded border border-[#3b1f0b] shadow-xs">
                            #{liveSt.rollNo}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-base sm:text-lg text-[#3d240d] mb-0.5 truncate max-w-full">
                          {liveSt.name}
                        </h4>
                        <div className="text-xs font-pixel text-[#5a3818] mb-2 font-bold">
                          {liveSt.points} 分
                        </div>

                        {hasRolled && (
                          <div className="flex items-center gap-1 w-full pt-1.5 border-t border-[#dfcca4]">
                            <button
                              onClick={() => onQuickAdd(liveSt, 2)}
                              className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer shadow-xs active:scale-95"
                              title="加2分"
                            >
                              +2
                            </button>
                            <button
                              onClick={() => onQuickAdd(liveSt, 5)}
                              className="flex-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#15803d] text-[10px] font-pixel font-bold py-1 rounded border border-[#86efac] cursor-pointer shadow-xs active:scale-95"
                              title="加5分"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => onOpenPointsForStudent(liveSt)}
                              className="pixel-btn-gold px-2 py-1 text-[10px] font-bold rounded cursor-pointer shadow-xs active:scale-95"
                              title="開啟完整評分"
                            >
                              <Star className="w-3 h-3 fill-[#633300]" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roll Button */}
              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={handleStartClassicRoll}
                  disabled={isRolling || students.length === 0}
                  className={`px-8 py-3.5 rounded-xl font-pixel text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all whitespace-nowrap shrink-0 ${
                    isRolling || students.length === 0
                      ? 'bg-stone-400 text-stone-200 cursor-not-allowed'
                      : 'pixel-btn-gold'
                  }`}
                >
                  <Shuffle className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>
                    {isRolling
                      ? '抽取中...'
                      : remainingStudents.length === 0 && noRepeatEnabled && students.length > 0
                      ? `開啟新一輪抽籤 (${pickCount}人)`
                      : `開始隨機抽籤 (${pickCount}人)`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ================= MODE 2: FISHING PICKER ================= */}
          {pickerMode === 'fishing' && (
            <div className="w-full space-y-4">
              <PixelPondScene
                timeOfDay={timeOfDay}
                phase={fishingPhase}
                caughtFish={caughtFish}
              />

              {/* Status & Reveal Area */}
              {fishingPhase !== 'revealed' ? (
                <div className="flex flex-col items-center justify-center py-2 gap-3">
                  <div className="text-sm sm:text-base font-bold text-[#5a3818] text-center">
                    {fishingPhase === 'idle' && '準備好了嗎？點擊下方「拋竿」按鈕，看看誰會隨著魚兒一起上鉤！'}
                    {fishingPhase === 'casting' && '釣竿拋出！浮標正飛向池塘中央...'}
                    {fishingPhase === 'waiting' && '浮標水面泛起漣漪，池底有魚影正在悄悄游近...'}
                    {fishingPhase === 'bite' && '浮標沉下去了！準備拉起釣竿！'}
                  </div>

                  <button
                    type="button"
                    disabled={isFishingAnimating || students.length === 0}
                    onClick={handleCastFishingRod}
                    className={`px-10 py-4 rounded-2xl font-pixel text-lg sm:text-2xl font-black flex items-center gap-3 shadow-xl transition-all border-4 ${
                      isFishingAnimating || students.length === 0
                        ? 'bg-stone-400 border-stone-500 text-stone-100 cursor-not-allowed'
                        : 'bg-gradient-to-b from-[#38bdf8] to-[#0284c7] hover:from-[#7dd3fc] hover:to-[#0ea5e9] border-[#075985] text-white cursor-pointer active:scale-95'
                    }`}
                  >
                    <PixelFishingRodIcon size={34} />
                    <span>{isFishingAnimating ? '垂釣中...' : '拋竿'}</span>
                  </button>
                </div>
              ) : (
                liveFishedStudent &&
                caughtFish && (
                  <div className="pixel-parchment p-4 sm:p-5 rounded-2xl border-4 border-[#8b5a2b] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Revealed Student + Caught Fish */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      <div className="flex items-center gap-3.5">
                        <div className="relative p-1.5 rounded-2xl bg-white border-3 border-[#8b5a2b] shadow-lg shrink-0">
                          <AvatarRenderer
                            avatar={liveFishedStudent.avatar}
                            name={liveFishedStudent.name}
                            size={76}
                          />
                          <span className="absolute -top-2.5 -left-2.5 bg-[#6a4422] text-[#ffebb3] font-pixel text-xs px-2 py-0.5 rounded border border-[#3b1f0b]">
                            #{liveFishedStudent.rollNo}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-pixel text-[#15803d] font-bold">
                            釣竿上鉤！被抽中同學
                          </div>
                          <h4 className="font-black text-2xl sm:text-3xl text-[#3d240d] truncate">
                            {liveFishedStudent.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs font-pixel text-[#5a3818]">
                            <span>積分：{liveFishedStudent.points} 分</span>
                            <span className="inline-flex items-center gap-1 text-[#b45309] font-black">
                              <PixelSprite name="coin_gold" size={14} />
                              <span>金幣：{liveFishedStudent.coins || 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Caught Fish Info Pill */}
                      <div
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border-3 shadow-md ${
                          caughtFish.rarity === 'legendary'
                            ? 'bg-[#fef9c3] border-[#ca8a04]'
                            : caughtFish.rarity === 'rare'
                            ? 'bg-[#f3e8ff] border-[#7c3aed]'
                            : 'bg-[#e0f2fe] border-[#0284c7]'
                        }`}
                      >
                        <RewardPixelIcon
                          imageUrl={caughtFish.imageUrl}
                          name={caughtFish.name}
                          type="fish"
                          size={52}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base sm:text-lg text-[#291707]">
                              {caughtFish.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-pixel font-black ${
                                caughtFish.rarity === 'legendary'
                                  ? 'bg-[#ca8a04] text-white'
                                  : caughtFish.rarity === 'rare'
                                  ? 'bg-[#7c3aed] text-white'
                                  : 'bg-[#0284c7] text-white'
                              }`}
                            >
                              {caughtFish.rarityLabel}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-stone-600 mt-0.5">
                            已收入「{liveFishedStudent.name}」魚類收藏（目前共{' '}
                            {liveFishedStudent.fishCollection?.[caughtFish.name] || 1} 條）
                          </p>
                          {fishingBonusClaimed && (
                            <div className="inline-flex items-center gap-1 mt-1 text-xs font-pixel font-bold text-[#15803d]">
                              <PixelSprite name="coin_gold" size={13} />
                              <span>已獲得 +3 金幣（來源：釣魚點名答對）</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Two Big Teacher Action Buttons */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-center shrink-0">
                      <button
                        type="button"
                        onClick={handleFishingAnswerCorrect}
                        className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white border-3 border-[#14532d] font-pixel text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 whitespace-nowrap"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>答對了 (+3 金幣)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFishingNextStudent}
                        className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl pixel-btn-gold border-3 font-pixel text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 whitespace-nowrap"
                      >
                        <span>下一位</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* ================= MODE 3: MINING PICKER ================= */}
          {pickerMode === 'mining' && (
            <div className="w-full space-y-4">
              <PixelMineScene
                rocks={mineRocks}
                hittingIndex={hittingRockIndex}
                lastRockMessage={lastRockMessage}
                foundGem={foundGem}
                isMiningLocked={isMineRevealed}
                onStrikeRock={handleStrikeRock}
              />

              {!isMineRevealed ? (
                <div className="flex flex-col items-center justify-center py-2 gap-3">
                  <div className="text-sm sm:text-base font-bold text-[#5a3818] text-center">
                    點擊上方 3 塊大石頭中的任意一塊，或按下「敲石頭」自動隨機敲開一塊尋找閃亮寶石！
                  </div>

                  <button
                    type="button"
                    disabled={
                      hittingRockIndex !== null ||
                      students.length === 0 ||
                      mineRocks.every((r) => r.opened)
                    }
                    onClick={handleRandomStrikeRock}
                    className={`px-10 py-4 rounded-2xl font-pixel text-lg sm:text-2xl font-black flex items-center gap-3 shadow-xl transition-all border-4 ${
                      hittingRockIndex !== null || students.length === 0
                        ? 'bg-stone-400 border-stone-500 text-stone-100 cursor-not-allowed'
                        : 'bg-gradient-to-b from-[#a855f7] to-[#7e22ce] hover:from-[#c084fc] hover:to-[#9333ea] border-[#4c1d95] text-white cursor-pointer active:scale-95'
                    }`}
                  >
                    <PixelPickaxeIcon size={34} />
                    <span>{hittingRockIndex !== null ? '揮鎬敲擊中...' : '敲石頭'}</span>
                  </button>
                </div>
              ) : (
                liveMinedStudent &&
                foundGem && (
                  <div className="pixel-parchment p-4 sm:p-5 rounded-2xl border-4 border-[#7e22ce] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Revealed Student + Found Gem */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1 min-w-0">
                      <div className="flex items-center gap-3.5">
                        <div className="relative p-1.5 rounded-2xl bg-white border-3 border-[#8b5a2b] shadow-lg shrink-0">
                          <AvatarRenderer
                            avatar={liveMinedStudent.avatar}
                            name={liveMinedStudent.name}
                            size={76}
                          />
                          <span className="absolute -top-2.5 -left-2.5 bg-[#6a4422] text-[#ffebb3] font-pixel text-xs px-2 py-0.5 rounded border border-[#3b1f0b]">
                            #{liveMinedStudent.rollNo}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-pixel text-[#7e22ce] font-bold">
                            敲中寶石！被抽中同學
                          </div>
                          <h4 className="font-black text-2xl sm:text-3xl text-[#3d240d] truncate">
                            {liveMinedStudent.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs font-pixel text-[#5a3818]">
                            <span>積分：{liveMinedStudent.points} 分</span>
                            <span className="inline-flex items-center gap-1 text-[#b45309] font-black">
                              <PixelSprite name="coin_gold" size={14} />
                              <span>金幣：{liveMinedStudent.coins || 0}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Found Gem Info Pill */}
                      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border-3 border-[#ca8a04] bg-[#fef9c3] shadow-md">
                        <RewardPixelIcon
                          imageUrl={foundGem.imageUrl}
                          name={foundGem.name}
                          type="gem"
                          size={52}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base sm:text-lg text-[#291707]">
                              {foundGem.name}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-pixel font-black bg-[#7e22ce] text-white">
                              {foundGem.rarityLabel}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-stone-700 mt-0.5">
                            已收入「{liveMinedStudent.name}」寶石收藏（目前共{' '}
                            {liveMinedStudent.gemCollection?.[foundGem.name] || 1} 顆）
                          </p>
                          <div className="inline-flex items-center gap-1 mt-1 text-xs font-pixel font-bold text-[#b45309]">
                            <PixelSprite name="coin_gold" size={13} />
                            <span>已獲得 +3 金幣（來源：礦洞寶石）</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Two Big Teacher Action Buttons */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-center shrink-0">
                      <button
                        type="button"
                        onClick={handleMiningAnswerCorrect}
                        className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white border-3 border-[#14532d] font-pixel text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 whitespace-nowrap"
                      >
                        <Award className="w-5 h-5" />
                        <span>答對了（加分評定）</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleMiningNextStudent}
                        className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl pixel-btn-gold border-3 font-pixel text-base sm:text-lg font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 whitespace-nowrap"
                      >
                        <span>下一位</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Legendary Fish Full-Screen Celebration Overlay */}
      {legendaryCelebration && (
        <LegendaryCatchOverlay
          student={legendaryCelebration.student}
          fish={legendaryCelebration.fish}
          onClose={() => setLegendaryCelebration(null)}
        />
      )}
    </div>
  );
};
