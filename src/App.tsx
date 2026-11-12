/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ClassroomClass, Student, ViewTab, PointHistoryItem } from './types/classroom';
import { INITIAL_CLASSES } from './data/classroomData';
import { CLASSROOM_PAGE_THEMES } from './data/classroomThemes';
import { soundManager } from './utils/sound';
import { pokemonSound } from './utils/pokemonAudio';
import {
  directExportClassroomJSON,
  normalizeImportedClasses,
  normalizeImportedCsv,
} from './utils/classroomDataIO';

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
import { ScenicPageBackdrop } from './components/classroom/ScenicPageBackdrop';
import { AmbientEffects } from './components/common/AmbientEffects';
import { FestivalCelebrationOverlay } from './components/classroom/FestivalCelebrationOverlay';
import { PixelSprite } from './components/common/PixelSprite';
import { PokemonClassView } from './components/pokemon/PokemonClassView';
import { PixelParadiseView } from './components/classroom/PixelParadiseView';

const STORAGE_CLASSES_KEY = 'stardew_classroom_classes_v2';
const STORAGE_CURRENT_CLASS_KEY = 'stardew_classroom_current_class_id';
const STORAGE_APP_MODE_KEY = 'miss_iong_app_mode';
const STORAGE_POKEMON_CLASSES_KEY = 'miss_iong_class_data_v2';

export default function App() {
  // App Mode: 'pokemon' (Main Interface as requested) | 'stardew' (Stardew Valley Classroom)
  const [appMode, setAppMode] = useState<'pokemon' | 'stardew'>('pokemon');

  // Persistent Classes State
  const [classes, setClasses] = useState<ClassroomClass[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POKEMON_CLASSES_KEY) || localStorage.getItem(STORAGE_CLASSES_KEY);
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

  // Monthly Festival Celebration state (auto-determined by real month or manually selected)
  const [festivalForcedMonth, setFestivalForcedMonth] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('stardew_festival_month');
      return saved !== null && saved !== '' ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });
  const [isFestivalSelectorOpen, setIsFestivalSelectorOpen] = useState(false);

  const handleFestivalMonthChange = (month: number | null) => {
    setFestivalForcedMonth(month);
    try {
      if (month !== null) {
        localStorage.setItem('stardew_festival_month', String(month));
      } else {
        localStorage.removeItem('stardew_festival_month');
      }
    } catch {}
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to LocalStorage on class changes (Sync both keys for 100% two-way persistence)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CLASSES_KEY, JSON.stringify(classes));
      localStorage.setItem(STORAGE_POKEMON_CLASSES_KEY, JSON.stringify(classes));
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
    pokemonSound.setMuted(muted);
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
    let updatedSt: Student | null = null;
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id !== currentClassId) return cls;
        return {
          ...cls,
          students: cls.students.map((st) => {
            if (st.id !== studentId) return st;
            const updatedHistory = (st.history || []).filter(
              (h) => h.id !== historyId && String(h.timestamp) !== historyId
            );
            const isPos = delta > 0;
            const revertedPoints = st.points - delta;
            const revertedPos = isPos ? Math.max(0, (st.posPoints || 0) - delta) : st.posPoints || 0;
            const revertedNeg = !isPos ? Math.max(0, (st.negPoints || 0) - Math.abs(delta)) : st.negPoints || 0;
            updatedSt = {
              ...st,
              points: revertedPoints,
              posPoints: revertedPos,
              negPoints: revertedNeg,
              history: updatedHistory,
            };
            return updatedSt;
          }),
        };
      })
    );

    if (updatedSt) {
      const savedStudent = updatedSt as Student;
      setPointsModalStudents((prev) =>
        prev ? prev.map((s) => (s.id === studentId ? savedStudent : s)) : null
      );
    }
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

  // Auto-determine seasonal background theme according to current real calendar month
  const getThemeByMonth = (month = new Date().getMonth() + 1): string => {
    // Spring: March (3), April (4), May (5) -> 春日青翠農莊
    if (month >= 3 && month <= 5) return 'spring_farm';
    // Summer: June (6), July (7), August (8) -> 盛夏向日葵花海
    if (month >= 6 && month <= 8) return 'summer_sunflower';
    // Autumn: September (9), October (10), November (11) -> 溫馨楓葉秋收
    if (month >= 9 && month <= 11) return 'autumn_amber';
    // Winter: December (12), January (1), February (2) -> 冬雪晴空
    return 'winter_frost';
  };

  // Auto-determine time of day according to current 24-hour clock (晨昏變換)
  const getCurrentTimeOfDay = (hour = new Date().getHours()): 'dawn' | 'day' | 'sunset' | 'night' => {
    // Dawn: 05:00 - 08:59 晨光黎明
    if (hour >= 5 && hour < 9) return 'dawn';
    // Day: 09:00 - 16:59 晴朗白晝
    if (hour >= 9 && hour < 17) return 'day';
    // Sunset: 17:00 - 19:59 夕陽黃昏
    if (hour >= 17 && hour < 20) return 'sunset';
    // Night: 20:00 - 04:59 靜謐星夜
    return 'night';
  };

  // Page Theme State: Automatically derived from current real month (3-5春, 6-8夏, 9-11秋, 12-2冬)
  const [pageThemeId, setPageThemeId] = useState<string>(() => {
    const isManualLocked = localStorage.getItem('stardew_theme_manual_locked') === 'true';
    const saved = localStorage.getItem('stardew_classroom_theme');
    if (isManualLocked && saved && CLASSROOM_PAGE_THEMES.some((t) => t.id === saved)) {
      return saved;
    }
    return getThemeByMonth();
  });

  const activePageTheme =
    CLASSROOM_PAGE_THEMES.find((t) => t.id === pageThemeId) || CLASSROOM_PAGE_THEMES[0];

  // Time of Day State: 晨昏變換 (Dawn 黎明, Day 白晝, Sunset 黃昏, Night 星夜)
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'sunset' | 'night'>(() => {
    const isManual = localStorage.getItem('stardew_time_manual_locked') === 'true';
    const saved = localStorage.getItem('stardew_time_of_day') as 'dawn' | 'day' | 'sunset' | 'night' | null;
    if (isManual && saved && ['dawn', 'day', 'sunset', 'night'].includes(saved)) {
      return saved;
    }
    return getCurrentTimeOfDay();
  });

  const [isTimeAuto, setIsTimeAuto] = useState<boolean>(() => {
    return localStorage.getItem('stardew_time_manual_locked') !== 'true';
  });

  // Automatically update pageThemeId when real month changes or on mount
  useEffect(() => {
    const checkAndSyncMonth = () => {
      const isManualLocked = localStorage.getItem('stardew_theme_manual_locked') === 'true';
      if (!isManualLocked) {
        const currentMonth = new Date().getMonth() + 1;
        const monthTheme = getThemeByMonth(currentMonth);
        setPageThemeId((prev) => {
          if (prev !== monthTheme) {
            localStorage.setItem('stardew_classroom_theme', monthTheme);
            return monthTheme;
          }
          return prev;
        });
      }
    };

    checkAndSyncMonth();
    const interval = setInterval(checkAndSyncMonth, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Automatically update timeOfDay with real clock (晨昏變換)
  useEffect(() => {
    const checkAndSyncTime = () => {
      if (isTimeAuto) {
        const current = getCurrentTimeOfDay();
        setTimeOfDay(current);
      }
    };

    checkAndSyncTime();
    const interval = setInterval(checkAndSyncTime, 20 * 1000); // Check every 20 seconds
    return () => clearInterval(interval);
  }, [isTimeAuto]);

  const handleSelectPageTheme = (themeId: string) => {
    soundManager.playClick();
    if (themeId === '__auto_month__') {
      localStorage.removeItem('stardew_theme_manual_locked');
      const monthTheme = getThemeByMonth();
      setPageThemeId(monthTheme);
      localStorage.setItem('stardew_classroom_theme', monthTheme);
      const matched = CLASSROOM_PAGE_THEMES.find((t) => t.id === monthTheme);
      showStardewToast(`📅 已切換為依真實月份自動切換場景（當前：${matched?.name || monthTheme}）`);
      return;
    }
    setPageThemeId(themeId);
    localStorage.setItem('stardew_classroom_theme', themeId);
    localStorage.setItem('stardew_theme_manual_locked', 'true');
  };

  const handleToggleTimeOfDay = () => {
    soundManager.playClick();
    const cycle: ('auto' | 'dawn' | 'day' | 'sunset' | 'night')[] = ['auto', 'dawn', 'day', 'sunset', 'night'];
    const currentMode = isTimeAuto ? 'auto' : timeOfDay;
    const currentIndex = cycle.indexOf(currentMode);
    const nextMode = cycle[(currentIndex + 1) % cycle.length];

    if (nextMode === 'auto') {
      setIsTimeAuto(true);
      localStorage.removeItem('stardew_time_manual_locked');
      const current = getCurrentTimeOfDay();
      setTimeOfDay(current);
      const label = current === 'dawn' ? '清晨 🌅' : current === 'sunset' ? '黃昏 🌇' : current === 'night' ? '夜晚 🌙' : '白天 ☀️';
      showStardewToast(`⏰ 晨昏已恢復為依真實時鐘自動變換（目前時段：${label}）`);
    } else {
      setIsTimeAuto(false);
      localStorage.setItem('stardew_time_manual_locked', 'true');
      localStorage.setItem('stardew_time_of_day', nextMode);
      setTimeOfDay(nextMode);
      const label = nextMode === 'dawn' ? '🌅 黎明清晨' : nextMode === 'sunset' ? '🌇 夕陽黃昏' : nextMode === 'night' ? '🌙 靜謐星夜' : '☀️ 晴朗白晝';
      showStardewToast(`🎨 晨昏時段已手動切換為：${label}`);
    }
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
              stardewAvatar: avatarUrlOrSprite,
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

  // Floating Toast State for Stardew Mode
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showStardewToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Direct One-Click Export: Opens native OS Save As folder dialog (Exact same JSON backup as Pokemon mode)
  const handleExportData = async () => {
    try {
      const result = await directExportClassroomJSON(classes);
      if (result === 'saved') {
        soundManager.playCorrect();
        showStardewToast('💾 班級完整備份檔案已成功儲存至您指定的資料夾！');
      } else if (result === 'downloaded') {
        soundManager.playCorrect();
        showStardewToast('💾 班級完整備份檔案已下載至您的電腦下載資料夾！');
      }
    } catch {
      showStardewToast('⚠️ 匯出時發生錯誤，請稍後重試。');
    }
  };

  // Direct One-Click Import: Immediately pops native folder/file selector dialog (Exact same as Pokemon mode)
  const handleTriggerImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.json')) {
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          const normalized = normalizeImportedClasses(parsed, classes, currentClassId);

          if (normalized && normalized.length > 0) {
            setClasses(normalized);
            soundManager.playVictory();
            showStardewToast(
              `🎉 成功匯入 ${normalized.length} 個班級！所有學生分數、雙介面頭像、卡片背景壁紙與歷史紀錄已完全還原！`
            );
          } else {
            showStardewToast('⚠️ 無法辨識此 JSON 格式，請確認是否為課堂系統匯出的備份檔。');
          }
        } catch {
          showStardewToast('⚠️ JSON 解析失敗，請檢查檔案格式是否正確。');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const updated = normalizeImportedCsv(content, classes, currentClassId);
          if (updated) {
            setClasses(updated);
            soundManager.playVictory();
            showStardewToast(`🎉 成功由 CSV 表格匯入更新 ${currentClass.className} 的雙邊成績、頭像與歷史紀錄！`);
          } else {
            showStardewToast('⚠️ CSV 表格內容為空或無法辨識格式。');
          }
        } catch {
          showStardewToast('⚠️ CSV 解析出錯，請確認檔案編碼是否為 UTF-8。');
        }
      };
      reader.readAsText(file);
    } else {
      showStardewToast('⚠️ 請選取 .json 備份檔或 .csv 表格檔。');
    }
  };

  // Render Pokemon Classroom as the Main Interface (as requested: "把復刻的這個網站作為主界面")
  if (appMode === 'pokemon') {
    return (
      <PokemonClassView
        classes={classes}
        currentClassId={currentClassId}
        onUpdateClasses={setClasses}
        onSelectClass={setCurrentClassId}
        onSwitchToStardew={() => setAppMode('stardew')}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />
    );
  }

  return (
    <div className="min-h-screen text-[#2b2b2b] flex flex-col font-sans relative selection:bg-[#fabc3f] selection:text-[#4a2800]">
      {/* Dynamic Stardew Valley Panoramic Scenic Backdrop (Sky, Sun/Moon, Clouds, Mountain Silhouettes, Horizon Fence & Pasture) */}
      <ScenicPageBackdrop theme={activePageTheme} timeOfDay={timeOfDay} />

      {/* Floating Action Toast Notification (Exact match to Pokemon feedback) */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] max-w-xl w-[92vw] px-6 py-4 rounded-2xl bg-[#FFFDF9] text-[#4a2800] border-4 border-[#b45309] shadow-2xl flex items-center justify-between gap-3 animate-fade-in font-pixel select-none">
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">✨</span>
            <p className="font-bold text-xs sm:text-sm leading-snug">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="w-7 h-7 rounded-full bg-[#faeed1] hover:bg-[#fed7aa] text-[#8b5a2b] font-bold text-base flex items-center justify-center shrink-0 cursor-pointer border border-[#b45309]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hidden File Input for Direct Folder Dialog Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Monthly Festival Celebration Ambient Effects (12月雪花 ❄️, 2月愛心 💖, 4月櫻花 🌸 等) */}
      <FestivalCelebrationOverlay
        forcedMonth={festivalForcedMonth}
        onMonthChange={handleFestivalMonthChange}
        showSelector={isFestivalSelectorOpen}
        onCloseSelector={() => setIsFestivalSelectorOpen(false)}
      />

      {/* Main Top Header Bar */}
      <ClassHeader
        classes={classes}
        currentClassId={currentClassId}
        onSelectClass={setCurrentClassId}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenRandomPicker={() => setIsRandomPickerOpen(true)}
        onExportData={handleExportData}
        onImportData={handleTriggerImport}
        onResetPoints={handleResetClassPoints}
        onAddNewClass={handleAddNewClass}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        currentThemeId={pageThemeId}
        onSelectTheme={handleSelectPageTheme}
        onSwitchToPokemon={() => setAppMode('pokemon')}
        isParadiseOpen={activeTab === 'paradise'}
        onToggleParadise={() => {
          setActiveTab((prev) => (prev === 'paradise' ? 'students' : 'paradise'));
        }}
        activeFestivalMonth={festivalForcedMonth}
        onOpenFestivalSelector={() => setIsFestivalSelectorOpen(true)}
        timeOfDay={timeOfDay}
        onToggleTimeOfDay={handleToggleTimeOfDay}
        isTimeAuto={isTimeAuto}
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

        {activeTab === 'paradise' && (
          <PixelParadiseView
            students={currentClass.students}
            className={currentClass.className}
            onApplyPoints={handleApplyPoints}
            onChangeAvatar={(st) => setAvatarPickerStudent(st)}
            onClose={() => setActiveTab('students')}
            initialTimeOfDay={timeOfDay}
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
          onUndoPoint={handleUndoPoint}
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
