import React, { useState } from 'react';
import { ClassroomClass, ViewTab } from '../../types/classroom';
import { CLASSROOM_PAGE_THEMES } from '../../data/classroomThemes';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';
import { 
  Users, 
  Trophy, 
  History, 
  Timer, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Music, 
  Download, 
  Upload, 
  RotateCcw,
  Sprout,
  Plus
} from 'lucide-react';
import { FESTIVAL_CALENDAR } from './FestivalCelebrationOverlay';

interface ClassHeaderProps {
  classes: ClassroomClass[];
  currentClassId: string;
  onSelectClass: (id: string) => void;
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenTimer: () => void;
  onOpenRandomPicker: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onResetPoints: () => void;
  onAddNewClass: (name: string) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  currentThemeId?: string;
  onSelectTheme?: (themeId: string) => void;
  onSwitchToPokemon?: () => void;
  isParadiseOpen?: boolean;
  onToggleParadise?: () => void;
  activeFestivalMonth?: number | null;
  onOpenFestivalSelector?: () => void;
  timeOfDay?: 'dawn' | 'day' | 'sunset' | 'night';
  onToggleTimeOfDay?: () => void;
  isTimeAuto?: boolean;
}

export const ClassHeader: React.FC<ClassHeaderProps> = ({
  classes,
  currentClassId,
  onSelectClass,
  activeTab,
  onSelectTab,
  onOpenTimer,
  onOpenRandomPicker,
  onExportData,
  onImportData,
  onResetPoints,
  onAddNewClass,
  isMuted,
  onToggleSound,
  isMusicPlaying,
  onToggleMusic,
  currentThemeId,
  onSelectTheme,
  onSwitchToPokemon,
  isParadiseOpen,
  onToggleParadise,
  activeFestivalMonth,
  onOpenFestivalSelector,
  timeOfDay = 'day',
  onToggleTimeOfDay,
  isTimeAuto = true,
}) => {
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  const currentCalMonth = new Date().getMonth() + 1;
  const effectiveMonth =
    activeFestivalMonth !== null && activeFestivalMonth !== undefined
      ? activeFestivalMonth
      : currentCalMonth;
  const activeFestival = FESTIVAL_CALENDAR[effectiveMonth] || FESTIVAL_CALENDAR[12];

  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];
  const totalClassPoints = currentClass?.students.reduce((acc, st) => acc + st.points, 0) || 0;

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    onAddNewClass(newClassName.trim());
    setNewClassName('');
    setShowAddClassModal(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4a2e13] border-b-4 border-[#2b1807] shadow-xl text-[#faeed1]">
      {/* Upper Bar: Title, Class Selection, Tools & Audio */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Class Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#6b421d] px-2.5 py-1.5 border-2 border-[#8b5a2b] shadow-inner">
            <PixelSprite name="sunflower" size={24} />
            <span className="font-pixel text-xs sm:text-sm text-[#ffebb3] tracking-wide whitespace-nowrap">
              容老師的課堂
            </span>
          </div>

          {/* Class Select Dropdown */}
          <div className="relative flex items-center">
            <select
              value={currentClassId}
              onChange={(e) => {
                soundManager.playClick();
                if (e.target.value === '__add_new__') {
                  setShowAddClassModal(true);
                } else {
                  onSelectClass(e.target.value);
                }
              }}
              className="bg-[#faeed1] text-[#4a2800] font-pixel text-xs sm:text-sm font-bold py-1.5 px-3 pr-8 border-2 border-[#8b5a2b] shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fabc3f]"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.className} ({cls.students.length}人)
                </option>
              ))}
              <option value="__add_new__">+ 新增班級...</option>
            </select>
          </div>

          {/* Class Points Chip */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#3a200a] px-3 py-1 border border-[#8b5a2b] text-xs font-pixel text-[#ffd700]">
            <PixelSprite name="coin_gold" size={16} />
            <span>班級總積分: {totalClassPoints} 分</span>
          </div>
        </div>

        {/* Classroom Tools Shortcut Bar */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Timer */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTimer();
            }}
            className="pixel-btn-gold px-2.5 py-1 text-xs font-pixel flex items-center gap-1.5 cursor-pointer"
            title="開啟課堂計時器 (倒數/正計時)"
          >
            <Timer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">計時器</span>
          </button>

          {/* Random Picker */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenRandomPicker();
            }}
            className="pixel-btn-blue px-2.5 py-1 text-xs font-pixel flex items-center gap-1.5 cursor-pointer text-white"
            title="隨機點名抽籤 (1人/多人)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">隨機點名</span>
          </button>

          <div className="h-5 w-[1px] bg-[#6b421d] mx-0.5" />

          {/* Data Export / Import */}
          <button
            onClick={() => {
              soundManager.playClick();
              onExportData();
            }}
            className="bg-[#5a3818] hover:bg-[#7a4c22] border border-[#8b5a2b] p-1.5 text-xs text-[#fed7aa] cursor-pointer"
            title="資料備份匯出 (彈出系統資料夾儲存，與寶可夢完全一致的完整 JSON 備份)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onImportData();
            }}
            className="bg-[#5a3818] hover:bg-[#7a4c22] border border-[#8b5a2b] p-1.5 text-xs text-[#fed7aa] cursor-pointer"
            title="資料還原匯入 (自動彈出資料夾，支援與寶可夢互通的完整 JSON 備份檔與 CSV)"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onResetPoints();
            }}
            className="bg-[#5a3818] hover:bg-[#7a4c22] border border-[#8b5a2b] p-1.5 text-xs text-[#fca5a5] hover:text-white cursor-pointer"
            title="重設目前班級分數"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-5 w-[1px] bg-[#6b421d] mx-0.5" />

          {/* Panoramic Scene Theme Selector */}
          {onSelectTheme && (
            <div className="flex items-center gap-1 bg-[#3a200a] px-2 py-0.5 border border-[#8b5a2b] rounded shadow-inner">
              <span className="text-xs" title="切換全景場景特效">🌄</span>
              <select
                value={currentThemeId || 'spring_farm'}
                onChange={(e) => onSelectTheme(e.target.value)}
                className="bg-[#faeed1] text-[#4a2800] text-[11px] font-bold border border-[#8b5a2b] rounded py-0.5 px-1.5 cursor-pointer focus:outline-none max-w-[125px] sm:max-w-none"
                title="切換星露谷全景背景場景與專屬動態特效（依月份自動切換、紫金秘境、皇家金輝等）"
              >
                <option value="__auto_month__">📅 依真實月份自動切換</option>
                {CLASSROOM_PAGE_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time of Day Toggle Button (晨昏變換: 清晨 / 白天 / 黃昏 / 夜晚) */}
          {onToggleTimeOfDay && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onToggleTimeOfDay();
              }}
              className="px-2 py-0.5 text-xs font-pixel rounded border border-[#8b5a2b] bg-[#3a200a] hover:bg-[#5a3818] text-[#ffedd5] flex items-center gap-1 transition-all active:scale-95 shadow-inner cursor-pointer"
              title={`切換晨昏時段 (目前：${
                timeOfDay === 'dawn'
                  ? '🌅 黎明清晨'
                  : timeOfDay === 'sunset'
                  ? '🌇 夕陽黃昏'
                  : timeOfDay === 'night'
                  ? '🌙 靜謐星夜'
                  : '☀️ 晴朗白晝'
              }${isTimeAuto ? ' - 依真實時鐘自動' : ' - 手動預覽'}，點擊切換)`}
            >
              <span className="text-sm">
                {timeOfDay === 'dawn' ? '🌅' : timeOfDay === 'sunset' ? '🌇' : timeOfDay === 'night' ? '🌙' : '☀️'}
              </span>
              <span className="hidden lg:inline text-[11px] font-bold">
                {timeOfDay === 'dawn' ? '清晨' : timeOfDay === 'sunset' ? '黃昏' : timeOfDay === 'night' ? '夜晚' : '白天'}
              </span>
            </button>
          )}

          {/* Monthly Festival Celebration Indicator & Selector Button */}
          {onOpenFestivalSelector && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenFestivalSelector();
              }}
              className="px-2.5 py-1 text-xs font-pixel rounded border border-[#8b5a2b] bg-[#3a200a] hover:bg-[#5a3818] text-[#ffd700] flex items-center gap-1.5 transition-all active:scale-95 shadow-inner cursor-pointer"
              title={`目前慶典：${activeFestival.month}月 ${activeFestival.name}（點擊切換或預覽 12月雪花 ❄️、2月愛心 💖 等）`}
            >
              <span className="text-sm animate-pulse">{activeFestival.icon}</span>
              <span className="hidden md:inline font-bold text-[11px] text-[#ffedd5]">
                {activeFestival.month}月 {activeFestival.name.slice(0, 5)}
              </span>
            </button>
          )}

          {/* Sound & Music Controls */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className={`p-1.5 text-xs border cursor-pointer rounded transition-all active:scale-95 ${
                !isMuted
                  ? 'bg-[#2e5927] border-[#559945] text-[#bbf7d0]'
                  : 'bg-[#5a3818] border-[#8b5a2b] text-rose-300'
              }`}
              title={isMuted ? '音效已靜音 (Sound Muted - 點擊開啟音效)' : '音效播放中 (Sound On - 點擊靜音)'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onToggleMusic}
            className={`p-1.5 text-xs border cursor-pointer rounded transition-all active:scale-95 ${
              isMusicPlaying
                ? 'bg-[#2e5927] border-[#559945] text-[#bbf7d0]'
                : 'bg-[#5a3818] border-[#8b5a2b] text-stone-400'
            }`}
            title={isMusicPlaying ? '關閉星露谷背景音樂' : '開啟星露谷背景音樂'}
          >
            <Music className="w-3.5 h-3.5" />
          </button>

          {/* Paradise Mode Button "😆" Placed immediately to the right of Music button as requested */}
          {onToggleParadise && (
            <button
              onClick={() => {
                soundManager.playClick();
                onToggleParadise();
              }}
              className={`p-1.5 text-xs border cursor-pointer rounded transition-all active:scale-90 flex items-center justify-center ${
                isParadiseOpen || activeTab === 'paradise'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 border-[#8b5a2b] text-[#4a2800] ring-2 ring-yellow-400 font-bold scale-105 shadow-md animate-pulse'
                  : 'bg-[#5a3818] hover:bg-[#6b421d] border-[#8b5a2b] text-yellow-300 hover:scale-105 shadow-xs'
              }`}
              title="開啟/關閉星露谷像素夥伴樂園 (Paradise Mode) 😆 全班每個孩子的夥伴都在樂園裡自己生活"
            >
              <span className="text-base leading-none select-none">😆</span>
            </button>
          )}

          {/* Return to Pokemon Main View Button */}
          {onSwitchToPokemon && (
            <button
              onClick={() => {
                soundManager.playClick();
                onSwitchToPokemon();
              }}
              className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-[#4a2800] border-2 border-[#b45309] px-2.5 py-1 text-xs font-pixel flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer rounded"
              title="返回寶可夢主介面 (Miss Iong's Pokémon Class)"
            >
              <span className="text-sm">⚡</span>
              <span className="font-bold whitespace-nowrap">寶可夢主介面</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-[#3b230d] border-t border-[#251406] px-3 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
        <button
          onClick={() => {
            soundManager.playClick();
            onSelectTab('students');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'students'
              ? 'bg-[#5a3818] text-[#ffd700] border-[#ffd700]'
              : 'text-[#d6ba89] border-transparent hover:text-white hover:bg-[#4a2e13]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>學生名冊 ({currentClass?.students.length || 0})</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectTab('ranking');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'ranking'
              ? 'bg-[#5a3818] text-[#ffd700] border-[#ffd700]'
              : 'text-[#d6ba89] border-transparent hover:text-white hover:bg-[#4a2e13]'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>榮譽榜</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectTab('farm');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'farm'
              ? 'bg-[#5a3818] text-[#ffd700] border-[#ffd700]'
              : 'text-[#d6ba89] border-transparent hover:text-white hover:bg-[#4a2e13]'
          }`}
        >
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>豐收農場</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectTab('history');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'history'
              ? 'bg-[#5a3818] text-[#ffd700] border-[#ffd700]'
              : 'text-[#d6ba89] border-transparent hover:text-white hover:bg-[#4a2e13]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>加扣分記錄</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectTab('paradise');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            activeTab === 'paradise'
              ? 'bg-[#5a3818] text-[#ffd700] border-[#ffd700]'
              : 'text-[#d6ba89] border-transparent hover:text-white hover:bg-[#4a2e13]'
          }`}
        >
          <span className="text-base leading-none">😆</span>
          <span>夥伴樂園</span>
        </button>
      </nav>

      {/* Add New Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="pixel-wood-box max-w-sm w-full p-5 text-[#4a2800]">
            <h3 className="font-pixel text-sm text-[#5a3818] mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" /> 新增班級
            </h3>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">班級名稱 (例如: 六甲 英文):</label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="輸入班級名稱"
                  className="w-full bg-[#faeed1] border-2 border-[#7c4f24] px-3 py-2 text-sm font-bold focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-3 py-1.5 bg-stone-300 hover:bg-stone-400 text-stone-800 text-xs font-bold border border-stone-500 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="pixel-btn-green px-4 py-1.5 text-xs font-bold text-white cursor-pointer"
                >
                  確認建立
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
