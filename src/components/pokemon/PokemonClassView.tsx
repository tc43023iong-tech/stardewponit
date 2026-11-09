import React, { useState, useEffect, useRef } from 'react';
import { ClassroomClass, Student, PointHistoryItem } from '../../types/classroom';
import { PokemonHeader } from './PokemonHeader';
import { PokemonTimerBar } from './PokemonTimerBar';
import { PokemonCooldownZone, CoolingStudentItem } from './PokemonCooldownZone';
import { PokemonToolbar, SortMode } from './PokemonToolbar';
import { PokemonStudentCard } from './PokemonStudentCard';
import { PokemonQuickBatchModal } from './PokemonQuickBatchModal';
import { PokemonPointsModal } from './PokemonPointsModal';
import { PokemonRandomPickerModal } from './PokemonRandomPickerModal';
import { PokemonLeaderboardModal } from './PokemonLeaderboardModal';
import { PokemonAchievementModal } from './PokemonAchievementModal';
import { PokemonExportImportModal } from './PokemonExportImportModal';
import { PokemonAvatarPickerModal } from './PokemonAvatarPickerModal';
import { PokemonClassSettingsModal } from './PokemonClassSettingsModal';
import { PokemonPointsFeedbackModal } from './PokemonPointsFeedbackModal';
import { pokemonSound } from '../../utils/pokemonAudio';

interface PokemonClassViewProps {
  classes: ClassroomClass[];
  currentClassId: string;
  onUpdateClasses: (updated: ClassroomClass[]) => void;
  onSelectClass: (classId: string) => void;
  onSwitchToStardew: () => void;
}

const STORAGE_EYE_PROTECTION = 'miss_iong_eye_protection';
const STORAGE_PICKED_HISTORY = 'miss_iong_picked_history';

export const PokemonClassView: React.FC<PokemonClassViewProps> = ({
  classes,
  currentClassId,
  onUpdateClasses,
  onSelectClass,
  onSwitchToStardew,
}) => {
  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];
  const students = currentClass?.students || [];

  // Eye Protection / Sleep Mode
  const [eyeProtection, setEyeProtection] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_EYE_PROTECTION) === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleEyeProtection = () => {
    setEyeProtection((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_EYE_PROTECTION, String(next));
      } catch {}
      return next;
    });
  };

  // Timer Bar Visibility
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);

  // Sorting
  const [sortMode, setSortMode] = useState<SortMode>('id_asc');

  // Multi-select state
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Cooldown Zone
  const [coolingList, setCoolingList] = useState<CoolingStudentItem[]>([]);

  // Cooldown countdown effect
  useEffect(() => {
    if (coolingList.length === 0) return;
    const interval = setInterval(() => {
      setCoolingList((prev) =>
        prev
          .map((item) => ({ ...item, timeLeft: item.timeLeft - 1 }))
          .filter((item) => item.timeLeft > 0)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [coolingList]);

  // Picked students history
  const [pickedHistoryByClass, setPickedHistoryByClass] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PICKED_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const pickedHistoryIds = pickedHistoryByClass[currentClassId] || [];

  const handleRecordPicked = (ids: string[]) => {
    setPickedHistoryByClass((prev) => {
      const updated = {
        ...prev,
        [currentClassId]: [...new Set([...(prev[currentClassId] || []), ...ids])],
      };
      try {
        localStorage.setItem(STORAGE_PICKED_HISTORY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResetPickedList = () => {
    setPickedHistoryByClass((prev) => {
      const updated = { ...prev, [currentClassId]: [] };
      try {
        localStorage.setItem(STORAGE_PICKED_HISTORY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Single random roulette state
  const [isPickingRandom, setIsPickingRandom] = useState<boolean>(false);
  const [randomHighlightedIndex, setRandomHighlightedIndex] = useState<number | null>(null);

  // Modals state
  const [isQuickBatchOpen, setIsQuickBatchOpen] = useState<boolean>(false);
  const [pointsModalStudents, setPointsModalStudents] = useState<Student[] | null>(null);
  const [isMultiDrawOpen, setIsMultiDrawOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [exportImportMode, setExportImportMode] = useState<'export' | 'import' | null>(null);
  const [editingAvatarStudent, setEditingAvatarStudent] = useState<Student | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<{
    student: Student;
    delta: number;
    reason?: string;
    affectedStudents: Student[];
    historyId: string;
  } | null>(null);

  // Sorted Students
  const sortedStudents = [...students].sort((a, b) => {
    if (sortMode === 'score_desc') {
      return b.points - a.points;
    }
    if (sortMode === 'neg_desc') {
      return (b.negPoints || 0) - (a.negPoints || 0);
    }
    return a.rollNo - b.rollNo;
  });

  // Calculate ranks
  const ranksMap: Record<string, number> = {};
  const sortedByPoints = [...students].sort((a, b) => b.points - a.points);
  sortedByPoints.forEach((s, idx) => {
    ranksMap[s.id] = idx + 1;
  });

  // Single Random Pick Trigger
  const handleSingleRandomPick = () => {
    const pool = students.filter((s) => !pickedHistoryIds.includes(s.id));
    const targetPool = pool.length > 0 ? pool : students;
    if (targetPool.length === 0 || isPickingRandom) return;

    setIsPickingRandom(true);
    let step = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      step++;
      const randIdx = Math.floor(Math.random() * sortedStudents.length);
      setRandomHighlightedIndex(randIdx);
      pokemonSound.playShuffleTick(step, totalSteps);

      if (step >= totalSteps) {
        clearInterval(interval);
        const chosen = targetPool[Math.floor(Math.random() * targetPool.length)];
        const finalIdx = sortedStudents.findIndex((s) => s.id === chosen.id);
        setRandomHighlightedIndex(finalIdx !== -1 ? finalIdx : 0);
        setIsPickingRandom(false);
        pokemonSound.playShuffleSuccess();
        handleRecordPicked([chosen.id]);

        setTimeout(() => {
          setRandomHighlightedIndex(null);
          setPointsModalStudents([chosen]);
        }, 800);
      }
    }, 70);
  };

  // Cooldown actions
  const handleSendToCooldown = () => {
    if (selectedIds.size === 0) return;
    pokemonSound.playCoolingOff();
    const duration = 120; // 2 minutes cooldown
    const newItems: CoolingStudentItem[] = Array.from(selectedIds).map((id) => ({
      id,
      timeLeft: duration,
      duration,
    }));

    setCoolingList((prev) => [
      ...prev.filter((p) => !selectedIds.has(p.id)),
      ...newItems,
    ]);

    setSelectedIds(new Set());
    setIsMultiSelect(false);
  };

  const handleReleaseStudent = (studentId: string) => {
    setCoolingList((prev) => prev.filter((p) => p.id !== studentId));
  };

  const handleReleaseAll = () => {
    setCoolingList([]);
  };

  // Reset class points
  const handleResetClassPoints = () => {
    if (confirm(`確定要將【${currentClass.className}】全體學生的分數重設為 0 分嗎？此操作不可逆。`)) {
      const resetStudents = students.map((s) => ({
        ...s,
        points: 0,
        posPoints: 0,
        negPoints: 0,
      }));
      const updated = classes.map((c) =>
        c.id === currentClassId ? { ...c, students: resetStudents } : c
      );
      onUpdateClasses(updated);
    }
  };

  // Apply Points to Students (Shared with Stardew Valley state!)
  const handleApplyPoints = (
    targets: Student[],
    delta: number,
    reasonZh: string,
    reasonEn?: string
  ) => {
    const isPositive = delta > 0;
    const timestamp = Date.now();
    const targetIds = new Set(targets.map((s) => s.id));
    const historyId = `h_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

    if (isPositive) {
      pokemonSound.playPointUp();
    } else {
      pokemonSound.playPointDown();
    }

    const updatedStudents = students.map((s) => {
      if (!targetIds.has(s.id)) return s;

      const newHistoryItem: PointHistoryItem = {
        id: historyId,
        timestamp,
        studentId: s.id,
        studentName: s.name,
        delta,
        reason: reasonZh,
        reasonEn,
      };

      const newPoints = s.points + delta;
      const newPos = isPositive ? (s.posPoints || 0) + delta : s.posPoints || 0;
      const newNeg = !isPositive ? (s.negPoints || 0) + Math.abs(delta) : s.negPoints || 0;

      return {
        ...s,
        points: newPoints,
        posPoints: newPos,
        negPoints: newNeg,
        history: [...(s.history || []), newHistoryItem],
      };
    });

    const updatedClasses = classes.map((c) =>
      c.id === currentClassId ? { ...c, students: updatedStudents } : c
    );

    onUpdateClasses(updatedClasses);
    setPointsModalStudents(null);
    setSelectedIds(new Set());
    setIsMultiSelect(false);

    // Trigger full-screen "恭喜你！" or "繼續努力！" feedback card
    const targetStudent = updatedStudents.find((s) => s.id === targets[0].id) || targets[0];
    setFeedbackData({
      student: targetStudent,
      delta,
      reason: reasonZh,
      affectedStudents: targets,
      historyId,
    });
  };

  // Undo the last points application from the feedback modal
  const handleUndoFeedback = () => {
    if (!feedbackData) return;
    const { delta, affectedStudents, historyId } = feedbackData;
    const targetIds = new Set(affectedStudents.map((s) => s.id));
    const isPositive = delta > 0;

    const revertedStudents = students.map((s) => {
      if (!targetIds.has(s.id)) return s;

      const newPoints = s.points - delta;
      const newPos = isPositive ? Math.max(0, (s.posPoints || 0) - delta) : s.posPoints || 0;
      const newNeg = !isPositive ? Math.max(0, (s.negPoints || 0) - Math.abs(delta)) : s.negPoints || 0;
      const newHistory = (s.history || []).filter((h) => h.id !== historyId);

      return {
        ...s,
        points: newPoints,
        posPoints: newPos,
        negPoints: newNeg,
        history: newHistory,
      };
    });

    const updatedClasses = classes.map((c) =>
      c.id === currentClassId ? { ...c, students: revertedStudents } : c
    );

    setFeedbackData(null);
  };

  // Erase a specific point history record for a student and revert their points
  const handleEraseHistoryItem = (studentId: string, historyItemId: string, timestamp?: number) => {
    let deltaToRevert = 0;
    const updatedStudents = students.map((s) => {
      if (s.id !== studentId) return s;
      const historyList = s.history || [];
      const itemToErase = historyList.find(
        (h) => (historyItemId && h.id === historyItemId) || (timestamp && h.timestamp === timestamp)
      );
      if (!itemToErase) return s;

      deltaToRevert = itemToErase.delta;
      const isPositive = deltaToRevert > 0;
      const newPoints = s.points - deltaToRevert;
      const newPos = isPositive ? Math.max(0, (s.posPoints || 0) - deltaToRevert) : s.posPoints || 0;
      const newNeg = !isPositive ? Math.max(0, (s.negPoints || 0) - Math.abs(deltaToRevert)) : s.negPoints || 0;

      const filteredHistory = historyList.filter((h) => h !== itemToErase);

      return {
        ...s,
        points: newPoints,
        posPoints: newPos,
        negPoints: newNeg,
        history: filteredHistory,
      };
    });

    const updatedClasses = classes.map((c) =>
      c.id === currentClassId ? { ...c, students: updatedStudents } : c
    );

    onUpdateClasses(updatedClasses);

    // Also update pointsModalStudents in place so modal immediately updates
    if (pointsModalStudents) {
      setPointsModalStudents(
        pointsModalStudents.map((st) => updatedStudents.find((s) => s.id === st.id) || st)
      );
    }
  };

  // Quick Batch Scoring Submit (Quiet, no animations)
  const handleSubmitQuickBatch = (deltas: Record<string, number>, reason: string) => {
    const timestamp = Date.now();
    const updatedStudents = students.map((s) => {
      const delta = deltas[s.id] || 0;
      if (delta === 0) return s;

      const isPos = delta > 0;
      const historyItem: PointHistoryItem = {
        id: `h_quick_${timestamp}_${s.id}`,
        timestamp,
        studentId: s.id,
        studentName: s.name,
        delta,
        reason,
      };

      return {
        ...s,
        points: s.points + delta,
        posPoints: isPos ? (s.posPoints || 0) + delta : s.posPoints || 0,
        negPoints: !isPos ? (s.negPoints || 0) + Math.abs(delta) : s.negPoints || 0,
        history: [...(s.history || []), historyItem],
      };
    });

    const updatedClasses = classes.map((c) =>
      c.id === currentClassId ? { ...c, students: updatedStudents } : c
    );

    onUpdateClasses(updatedClasses);
    setIsQuickBatchOpen(false);
  };

  // Save student avatar & background
  const handleSaveAvatarAndBg = (updatedInfo: {
    pokemonId?: number;
    pokemonAvatar?: string;
    avatar?: string;
    cardBackground?: string;
  }) => {
    if (!editingAvatarStudent) return;
    const updatedStudent: Student = {
      ...editingAvatarStudent,
      ...(updatedInfo.pokemonId !== undefined ? { pokemonId: updatedInfo.pokemonId } : {}),
      ...(updatedInfo.pokemonAvatar !== undefined ? { pokemonAvatar: updatedInfo.pokemonAvatar } : {}),
      ...(updatedInfo.cardBackground !== undefined ? { cardBackground: updatedInfo.cardBackground } : {}),
    };
    const updatedStudents = students.map((s) =>
      s.id === editingAvatarStudent.id ? updatedStudent : s
    );
    const updatedClasses = classes.map((c) =>
      c.id === currentClassId ? { ...c, students: updatedStudents } : c
    );
    onUpdateClasses(updatedClasses);
    setEditingAvatarStudent(updatedStudent);
  };

  // Update Class from Settings
  const handleUpdateCurrentClass = (updated: ClassroomClass) => {
    const updatedClasses = classes.map((c) => (c.id === updated.id ? updated : c));
    onUpdateClasses(updatedClasses);
  };

  // All recent events for the bottom marquee
  const allEvents = students
    .flatMap((s) => s.history || [])
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 15);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        eyeProtection ? 'bg-slate-950 text-slate-100' : 'farm-bg text-[#5D4037]'
      }`}
    >
      {/* 1. Header with Farm Button */}
      <PokemonHeader
        classes={classes}
        currentClassId={currentClassId}
        onSelectClass={onSelectClass}
        eyeProtection={eyeProtection}
        onToggleEyeProtection={handleToggleEyeProtection}
        onOpenExport={() => setExportImportMode('export')}
        onOpenImport={() => setExportImportMode('import')}
        onOpenQuickBatch={() => setIsQuickBatchOpen(true)}
        onSwitchToStardew={onSwitchToStardew}
      />

      {/* 2. Collapsible Timer Bar */}
      {isTimerOpen && <PokemonTimerBar eyeProtection={eyeProtection} />}

      {/* 3. Cooldown Zone */}
      <PokemonCooldownZone
        coolingList={coolingList}
        students={students}
        eyeProtection={eyeProtection}
        onReleaseStudent={handleReleaseStudent}
        onReleaseAll={handleReleaseAll}
      />

      {/* 4. Action Toolbar */}
      <PokemonToolbar
        sortMode={sortMode}
        onSetSortMode={setSortMode}
        eyeProtection={eyeProtection}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        isMultiSelect={isMultiSelect}
        onToggleMultiSelect={() => {
          setIsMultiSelect(!isMultiSelect);
          setSelectedIds(new Set());
        }}
        onSelectAll={() => {
          setIsMultiSelect(true);
          setSelectedIds(new Set(students.map((s) => s.id)));
        }}
        onDeselectAll={() => setSelectedIds(new Set())}
        selectedCount={selectedIds.size}
        totalStudentsCount={students.length}
        onOpenMultiDraw={() => setIsMultiDrawOpen(true)}
        onSingleRandomPick={handleSingleRandomPick}
        isPickingRandom={isPickingRandom}
        pickedCount={pickedHistoryIds.length}
        onResetPickedList={handleResetPickedList}
        onBatchScoreSelected={() => {
          if (selectedIds.size > 0) {
            const targets = students.filter((s) => selectedIds.has(s.id));
            setPointsModalStudents(targets);
          }
        }}
        onSendToCooldown={handleSendToCooldown}
        onResetClassPoints={handleResetClassPoints}
        onAddStudent={() => setIsSettingsOpen(true)}
        onOpenClassSettings={() => setIsSettingsOpen(true)}
        isTimerOpen={isTimerOpen}
        onToggleTimer={() => setIsTimerOpen(!isTimerOpen)}
      />

      {/* 5. Main Student Cards Grid */}
      <main className="px-4 sm:px-8 md:px-12 flex-1 mt-4 pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {sortedStudents.map((student, idx) => {
            const isSelected = selectedIds.has(student.id);
            const isCooling = coolingList.some((c) => c.id === student.id);
            const isHighlighted = isPickingRandom && randomHighlightedIndex === idx;

            return (
              <div
                key={student.id}
                className={`transition-all duration-300 relative ${
                  isHighlighted ? 'scale-110 z-30 ring-4 ring-[#F59E0B] rounded-[2.5rem] shadow-2xl' : ''
                }`}
              >
                <PokemonStudentCard
                  student={student}
                  rank={ranksMap[student.id]}
                  isSelected={isSelected}
                  isMultiSelectMode={isMultiSelect}
                  isNegKingMode={sortMode === 'neg_desc'}
                  isCoolingOff={isCooling}
                  eyeProtection={eyeProtection}
                  onClick={() => {
                    if (isMultiSelect) {
                      const next = new Set(selectedIds);
                      if (next.has(student.id)) next.delete(student.id);
                      else next.add(student.id);
                      setSelectedIds(next);
                    } else {
                      setPointsModalStudents([student]);
                    }
                  }}
                  onAvatarClick={(e) => {
                    e.stopPropagation();
                    if (!isMultiSelect) {
                      setEditingAvatarStudent(student);
                    }
                  }}
                  onPokemonClick={(e) => {
                    e.stopPropagation();
                    if (!isMultiSelect) {
                      setEditingAvatarStudent(student);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* 6. Bottom Sticky Marquee of Events */}
      {allEvents.length > 0 && (
        <div
          className={`sticky bottom-0 left-0 right-0 z-40 py-2 px-3 backdrop-blur-md border-t shadow-md transition-colors ${
            eyeProtection
              ? 'bg-slate-900/90 border-slate-700/80 text-amber-100'
              : 'bg-[#FFFDF9]/95 border-[#E7DFD5] text-[#5D4037]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden">
            <div
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black shadow-xs select-none ${
                eyeProtection
                  ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                  : 'bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] text-[#854D0E] border border-[#FCD34D]'
              }`}
            >
              <span className="text-sm animate-bounce">📢</span>
              <span className="tracking-tight whitespace-nowrap">最新動態</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/70 text-[#92400E] font-black">
                {allEvents.length}
              </span>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <div className="animate-marquee gap-8 items-center text-xs font-bold">
                {allEvents.map((ev) => (
                  <span key={ev.id} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-black text-[#5D4037]">{ev.studentName}</span>
                    <span
                      className={`font-mono font-black px-1.5 py-0.5 rounded-md ${
                        ev.delta > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ev.delta > 0 ? `+${ev.delta}` : ev.delta}
                    </span>
                    <span className="text-stone-500">[{ev.reason}]</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modals */}
      {isQuickBatchOpen && (
        <PokemonQuickBatchModal
          students={students}
          onClose={() => setIsQuickBatchOpen(false)}
          onSubmitBatch={handleSubmitQuickBatch}
        />
      )}

      {pointsModalStudents && (
        <PokemonPointsModal
          students={pointsModalStudents}
          onClose={() => setPointsModalStudents(null)}
          onApplyPoints={handleApplyPoints}
          onEraseHistoryItem={handleEraseHistoryItem}
        />
      )}

      {isMultiDrawOpen && (
        <PokemonRandomPickerModal
          students={students}
          pickedHistoryIds={pickedHistoryIds}
          onClose={() => setIsMultiDrawOpen(false)}
          onRecordPicked={handleRecordPicked}
          onScoreWinners={(winners) => {
            setIsMultiDrawOpen(false);
            setPointsModalStudents(winners);
          }}
        />
      )}

      {isLeaderboardOpen && (
        <PokemonLeaderboardModal
          students={students}
          onClose={() => setIsLeaderboardOpen(false)}
          onStudentClick={(s) => {
            setIsLeaderboardOpen(false);
            setPointsModalStudents([s]);
          }}
        />
      )}

      {isAchievementsOpen && (
        <PokemonAchievementModal
          students={students}
          onClose={() => setIsAchievementsOpen(false)}
        />
      )}

      {exportImportMode && (
        <PokemonExportImportModal
          mode={exportImportMode}
          classes={classes}
          currentClassId={currentClassId}
          onClose={() => setExportImportMode(null)}
          onImportClasses={(imported) => {
            onUpdateClasses(imported);
          }}
        />
      )}

      {editingAvatarStudent && (
        <PokemonAvatarPickerModal
          student={editingAvatarStudent}
          onClose={() => setEditingAvatarStudent(null)}
          onSelectAvatar={(avatarId) => {
            const num = Number(avatarId);
            handleSaveAvatarAndBg({
              pokemonId: !isNaN(num) ? num : undefined,
              pokemonAvatar: isNaN(num) ? String(avatarId) : undefined,
            });
          }}
          onSelectTheme={(themeKey) => {
            handleSaveAvatarAndBg({ cardBackground: themeKey });
          }}
        />
      )}

      {feedbackData && (
        <PokemonPointsFeedbackModal
          student={feedbackData.student}
          delta={feedbackData.delta}
          reason={feedbackData.reason}
          eyeProtection={eyeProtection}
          onClose={() => setFeedbackData(null)}
          onUndo={handleUndoFeedback}
        />
      )}

      {isSettingsOpen && (
        <PokemonClassSettingsModal
          currentClass={currentClass}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateClass={handleUpdateCurrentClass}
        />
      )}
    </div>
  );
};
