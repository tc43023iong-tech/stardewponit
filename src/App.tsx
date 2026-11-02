/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ClassroomClass, Student, ViewTab, PointHistoryItem } from './types/classroom';
import { INITIAL_CLASSES, getCropGrowth } from './data/classroomData';
import { CLASSROOM_PAGE_THEMES } from './data/classroomThemes';
import { soundManager } from './utils/sound';

// Components
import { ClassHeader } from './components/classroom/ClassHeader';
import { StudentsView } from './components/classroom/StudentsView';
import { LeaderboardView } from './components/classroom/LeaderboardView';
import { HistoryView } from './components/classroom/HistoryView';
import { FarmShowcaseView } from './components/classroom/FarmShowcaseView';
import { StudentFarmDetailModal } from './components/classroom/StudentFarmDetailModal';
import { PointsModal } from './components/classroom/PointsModal';
import { TimerModal } from './components/classroom/TimerModal';
import { RandomPickerModal } from './components/classroom/RandomPickerModal';
import { PointsFeedbackModal, PointsFeedbackData } from './components/classroom/PointsFeedbackModal';
import { AvatarPickerModal } from './components/classroom/AvatarPickerModal';
import { AmbientEffects } from './components/common/AmbientEffects';
import { PixelSprite } from './components/common/PixelSprite';

const STORAGE_CLASSES_KEY = 'stardew_classroom_classes_v2';
const STORAGE_CURRENT_CLASS_KEY = 'stardew_classroom_current_class_id';

export default function App() {
  // Persistent Classes State
  const [classes, setClasses] = useState<ClassroomClass[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLASSES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default
    }
    return INITIAL_CLASSES;
  });

  const [currentClassId, setCurrentClassId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_CURRENT_CLASS_KEY);
      if (savedId) {
        return savedId;
      }
    } catch {}
    return '1a-ma';
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('students');

  // Modals state
  const [pointsModalStudents, setPointsModalStudents] = useState<Student[] | null>(null);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isRandomPickerOpen, setIsRandomPickerOpen] = useState(false);
  const [pointsFeedback, setPointsFeedback] = useState<PointsFeedbackData | null>(null);
  const [avatarPickerStudent, setAvatarPickerStudent] = useState<Student | null>(null);
  const [inspectFarmStudent, setInspectFarmStudent] = useState<Student | null>(null);

  // Sound & Music state
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [isMusicPlaying, setIsMusicPlaying] = useState(soundManager.isMusicPlaying);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to LocalStorage on class changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CLASSES_KEY, JSON.stringify(classes));
    } catch {}
  }, [classes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CURRENT_CLASS_KEY, currentClassId);
    } catch {}
  }, [currentClassId]);

  // Auto resume music on first user click
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!soundManager.isMuted && soundManager.isMusicPlaying) {
        soundManager.startMusic();
        setIsMusicPlaying(true);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    setIsMusicPlaying(!muted && soundManager.isMusicPlaying);
  };

  const handleToggleMusic = () => {
    const active = soundManager.toggleMusic();
    setIsMusicPlaying(active);
  };

  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];

  // Apply Points (Single or Batch)
  const handleApplyPoints = (
    targetStudents: Student[],
    delta: number,
    reasonZh: string,
    reasonEn?: string,
    icon?: string
  ) => {
    const targetIds = new Set(targetStudents.map((s) => s.id));
    const now = Date.now();

    // Calculate updated points for the 1.3s feedback pop-up
    const updatedScores: Record<string, number> = {};
    targetStudents.forEach((st) => {
      const currentSt = currentClass.students.find((s) => s.id === st.id) || st;
      updatedScores[st.id] = currentSt.points + delta;
    });

    if (delta > 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playBuzzer();
    }

    // Trigger 1.3s celebratory ("恭喜你！") or encouraging ("繼續加油！") feedback overlay
    setPointsFeedback({
      students: targetStudents,
      delta,
      reason: reasonZh,
      updatedScores,
    });

    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => {
            if (!targetIds.has(st.id)) return st;

            const newTotal = st.points + delta;
            const newPos = delta > 0 ? st.posPoints + delta : st.posPoints;
            const newNeg = delta < 0 ? st.negPoints + delta : st.negPoints;

            const historyEntry: PointHistoryItem = {
              id: `hist_${now}_${st.id}_${Math.random().toString(36).substring(2, 6)}`,
              timestamp: now,
              studentId: st.id,
              studentName: st.name,
              delta,
              reason: reasonZh,
              reasonEn,
              icon,
            };

            return {
              ...st,
              points: newTotal,
              posPoints: newPos,
              negPoints: newNeg,
              history: [historyEntry, ...(st.history || [])],
            };
          }),
        };
      })
    );
  };

  // Quick Add / Subtract shortcut
  const handleQuickAdd = (student: Student, delta: number) => {
    handleApplyPoints(
      [student],
      delta,
      delta > 0 ? `快速鼓勵 (+${delta}分)` : `快速提醒 (${delta}分)`,
      delta > 0 ? 'Quick encouragement' : 'Quick reminder',
      delta > 0 ? '🌱' : '⚠️'
    );
  };

  // Batch Add shortcut
  const handleBatchAdd = (targetStudents: Student[], delta: number) => {
    if (delta > 0) {
      soundManager.playCorrect();
    } else {
      soundManager.playBuzzer();
    }
    handleApplyPoints(
      targetStudents,
      delta,
      delta > 0 ? `批次鼓勵獎勵 (+${delta}分)` : `批次違紀扣分 (${delta}分)`,
      delta > 0 ? 'Batch encouragement' : 'Batch reminder',
      delta > 0 ? '🌟' : '⚠️'
    );
  };

  // Undo point change from history
  const handleUndoPoint = (historyId: string, studentId: string, delta: number) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => {
            if (st.id !== studentId) return st;
            const updatedHistory = st.history.filter((h) => h.id !== historyId);
            const revertedPoints = st.points - delta;
            const revertedPos = delta > 0 ? st.posPoints - delta : st.posPoints;
            const revertedNeg = delta < 0 ? st.negPoints - delta : st.negPoints;
            return {
              ...st,
              points: revertedPoints,
              posPoints: Math.max(0, revertedPos),
              negPoints: revertedNeg,
              history: updatedHistory,
            };
          }),
        };
      })
    );
  };

  // Clear all history for current class
  const handleClearHistory = () => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => ({
            ...st,
            history: [],
          })),
        };
      })
    );
  };

  // Reset all students' points back to 0 in current class
  const handleResetClassPoints = () => {
    if (
      window.confirm(
        `確定要重設「${currentClass.className}」所有學生的分數嗎？\n此操作將會清空該班積分與歷程。`
      )
    ) {
      soundManager.playClick();
      setClasses((prevClasses) =>
        prevClasses.map((cls) => {
          if (cls.id !== currentClassId) return cls;
          return {
            ...cls,
            students: cls.students.map((st) => ({
              ...st,
              points: 0,
              posPoints: 0,
              negPoints: 0,
              history: [],
            })),
          };
        })
      );
    }
  };

  // Page Theme State (stored in localStorage)
  const [pageThemeId, setPageThemeId] = useState<string>(() => {
    return localStorage.getItem('stardew_classroom_theme') || 'spring_farm';
  });

  const activePageTheme = CLASSROOM_PAGE_THEMES.find((t) => t.id === pageThemeId) || CLASSROOM_PAGE_THEMES[0];

  const handleSelectPageTheme = (themeId: string) => {
    soundManager.playClick();
    setPageThemeId(themeId);
    localStorage.setItem('stardew_classroom_theme', themeId);
  };

  const handleBatchSetCardBackground = (cardBg: string) => {
    soundManager.playVictory();
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => ({
            ...st,
            cardBackground: cardBg,
          })),
        };
      })
    );
  };

  // Save updated avatar and optional card background
  const handleSaveAvatar = (studentId: string, avatarUrlOrSprite: string, cardBackground?: string) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => {
            if (st.id !== studentId) return st;
            return {
              ...st,
              avatar: avatarUrlOrSprite,
              ...(cardBackground !== undefined ? { cardBackground } : {}),
            };
          }),
        };
      })
    );
  };

  // Add new custom class
  const handleAddNewClass = (className: string) => {
    const newId = `class_${Date.now()}`;
    const newCls: ClassroomClass = {
      id: newId,
      className,
      students: [
        {
          id: `${newId}-1`,
          rollNo: 1,
          name: '範例同學',
          points: 0,
          posPoints: 0,
          negPoints: 0,
          groupId: 1,
          avatar: 'junimo',
          history: [],
        },
      ],
    };
    setClasses((prev) => [...prev, newCls]);
    setCurrentClassId(newId);
    soundManager.playCorrect();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['學號', '姓名', '總積分(分)', '累計加分', '累計扣分', '作物階段'];
    const rows = currentClass.students.map((st) => [
      st.rollNo,
      st.name,
      st.points,
      st.posPoints,
      st.negPoints,
      getCropGrowth(st.points).label,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentClass.className}_學生積分名冊.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Trigger Import CSV
  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        // Try JSON import first if file is json
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            setClasses(parsed);
            alert('成功匯入備份資料！');
            return;
          }
        }

        // CSV Parser
        const lines = text
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        if (lines.length <= 1) return;

        const newStudents: Student[] = [];
        // Skip header if line 1 contains words like '學號' or 'name'
        const startIdx = lines[0].includes('學號') || lines[0].includes('name') ? 1 : 0;

        for (let i = startIdx; i < lines.length; i++) {
          const cols = lines[i]
            .split(',')
            .map((c) => c.replace(/^["']|["']$/g, '').trim());
          if (cols.length >= 2) {
            const rollNo = parseInt(cols[0], 10) || i + 1;
            const name = cols[1];
            const groupMatch = cols[2]?.match(/\d+/);
            const groupId = groupMatch ? parseInt(groupMatch[0], 10) : ((i % 6) + 1);
            const points = parseInt(cols[3], 10) || 0;

            newStudents.push({
              id: `${currentClass.id}-${rollNo}`,
              rollNo,
              name,
              points,
              posPoints: points > 0 ? points : 0,
              negPoints: points < 0 ? points : 0,
              groupId,
              avatar: 'junimo',
              history: [],
            });
          }
        }

        if (newStudents.length > 0) {
          setClasses((prev) =>
            prev.map((c) => (c.id === currentClassId ? { ...c, students: newStudents } : c))
          );
          soundManager.playVictory();
          alert(`成功匯入 ${newStudents.length} 位學生至「${currentClass.className}」！`);
        }
      } catch (err) {
        alert('匯入解析失敗，請確認檔案格式是否正確。');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${activePageTheme.bgGradient} text-[#2b2b2b] flex flex-col font-sans relative selection:bg-[#fabc3f] selection:text-[#4a2800] transition-colors duration-700`}>
      {/* Background Decorative Farm Texture Patterns */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage:
            activePageTheme.patternType === 'grass'
              ? 'radial-gradient(#15803d 15%, transparent 16%), radial-gradient(#166534 15%, transparent 16%)'
              : activePageTheme.patternType === 'sunflower'
              ? 'radial-gradient(#ca8a04 18%, transparent 19%)'
              : activePageTheme.patternType === 'autumn'
              ? 'radial-gradient(#c2410c 18%, transparent 19%)'
              : activePageTheme.patternType === 'snow'
              ? 'radial-gradient(#bae6fd 12%, transparent 14%)'
              : activePageTheme.patternType === 'magic'
              ? 'radial-gradient(#a855f7 16%, transparent 18%)'
              : 'repeating-linear-gradient(0deg, #451a03 0px, #451a03 3px, #78350f 3px, #78350f 12px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Soft warm sunbeam / vignette overlay */}
      <div className="fixed inset-0 pointer-events-none bg-radial from-transparent via-black/10 to-black/40 z-0" />

      {/* Hidden File Input for CSV Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.json"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Floating Autumn Ambient Leaves */}
      <AmbientEffects leafCount={12} />

      {/* Main Top Header Bar */}
      <ClassHeader
        classes={classes}
        currentClassId={currentClassId}
        onSelectClass={setCurrentClassId}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenRandomPicker={() => setIsRandomPickerOpen(true)}
        onExportData={handleExportCSV}
        onImportData={handleTriggerImport}
        onResetPoints={handleResetClassPoints}
        onAddNewClass={handleAddNewClass}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* View Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 relative z-10">
        {activeTab === 'students' && (
          <StudentsView
            students={currentClass.students}
            onOpenPointsModal={(selected) => setPointsModalStudents(selected)}
            onQuickAdd={handleQuickAdd}
            onChangeAvatar={(st) => setAvatarPickerStudent(st)}
            onBatchAdd={handleBatchAdd}
            onOpenFarmDetail={(st) => setInspectFarmStudent(st)}
            currentTheme={activePageTheme}
            onSelectPageTheme={handleSelectPageTheme}
            onBatchSetCardBackground={handleBatchSetCardBackground}
          />
        )}

        {activeTab === 'farm' && (
          <FarmShowcaseView
            students={currentClass.students}
            onOpenPointsModal={(st) => setPointsModalStudents([st])}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeTab === 'ranking' && (
          <LeaderboardView
            students={currentClass.students}
            onOpenPointsModal={(st) => setPointsModalStudents([st])}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            students={currentClass.students}
            onUndoPoint={handleUndoPoint}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 px-4 bg-[#3b230d] border-t-4 border-[#251406] text-center text-xs text-[#fed7aa] flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <PixelSprite name="sunflower" size={16} />
          <span className="font-pixel text-[11px] text-[#ffebb3]">
            容老師的課堂 (Stardew Valley Class Points Manager)
          </span>
        </div>
        <span className="text-stone-400">·</span>
        <span>7大班級學生名冊與評分規則已完全同步</span>
        <span className="text-stone-400">·</span>
        <span>資料自動儲存於瀏覽器</span>
      </footer>

      {/* Modals */}
      {pointsModalStudents && (
        <PointsModal
          students={pointsModalStudents}
          onClose={() => setPointsModalStudents(null)}
          onApplyPoints={handleApplyPoints}
        />
      )}

      {isTimerOpen && <TimerModal onClose={() => setIsTimerOpen(false)} />}

      {isRandomPickerOpen && (
        <RandomPickerModal
          students={currentClass.students}
          onClose={() => setIsRandomPickerOpen(false)}
          onOpenPointsForStudent={(st) => {
            setIsRandomPickerOpen(false);
            setPointsModalStudents([st]);
          }}
          onQuickAdd={handleQuickAdd}
        />
      )}

      {pointsFeedback && (
        <PointsFeedbackModal
          data={pointsFeedback}
          onClose={() => setPointsFeedback(null)}
        />
      )}

      {avatarPickerStudent && (
        <AvatarPickerModal
          student={avatarPickerStudent}
          onClose={() => setAvatarPickerStudent(null)}
          onSaveAvatar={handleSaveAvatar}
        />
      )}

      {inspectFarmStudent && (
        <StudentFarmDetailModal
          student={inspectFarmStudent}
          onClose={() => setInspectFarmStudent(null)}
          onQuickAdd={handleQuickAdd}
          onOpenPointsModal={(st) => {
            setInspectFarmStudent(null);
            setPointsModalStudents([st]);
          }}
        />
      )}
    </div>
  );
}
