import React, { useState, useEffect, useMemo } from 'react';
import { soundManager } from '../../utils/sound';

export interface FestivalInfo {
  month: number;
  name: string;
  stardewName: string;
  icon: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  particleType: 'snow' | 'hearts' | 'sakura' | 'fireflies' | 'maple' | 'pumpkins' | 'jellies' | 'stars' | 'clover' | 'butterflies' | 'fireworks' | 'harvest';
}

export const FESTIVAL_CALENDAR: Record<number, FestivalInfo> = {
  1: {
    month: 1,
    name: '元旦晨星慶典',
    stardewName: 'New Year Starlight Festival',
    icon: '🌟',
    description: '新的一年萬象更新！金黃星光與慶典彩屑迎來新的希望。',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400',
    particleType: 'stars',
  },
  2: {
    month: 2,
    name: '情人節愛心花舞祭',
    stardewName: 'Festival of Hearts & Flower Dance',
    icon: '💖',
    description: '星露谷花舞節與情人節！粉紅與緋紅愛心冉冉升騰，飄散浪漫花瓣。',
    accentColor: '#EC4899',
    badgeBg: 'bg-pink-500/20 text-pink-200 border-pink-400',
    particleType: 'hearts',
  },
  3: {
    month: 3,
    name: '春日綠意幸運祭',
    stardewName: 'Lucky Clover Spring Festival',
    icon: '🍀',
    description: '萬物復甦春暖花開，幸運四葉草隨微風起舞，好運連連！',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400',
    particleType: 'clover',
  },
  4: {
    month: 4,
    name: '春日櫻花彩蛋節',
    stardewName: 'Egg Festival & Cherry Blossoms',
    icon: '🌸',
    description: '粉嫩櫻花雨隨風旋舞，草地上灑落春日彩蛋與滿園生機。',
    accentColor: '#F472B6',
    badgeBg: 'bg-pink-400/20 text-pink-100 border-pink-300',
    particleType: 'sakura',
  },
  5: {
    month: 5,
    name: '晨光花蝶野餐節',
    stardewName: 'Flower & Butterfly Picnic',
    icon: '🦋',
    description: '陽光明媚的野餐時光，彩色小蝴蝶在繽紛花叢中翩翩飛舞。',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400',
    particleType: 'butterflies',
  },
  6: {
    month: 6,
    name: '仲夏林間螢火蟲之夜',
    stardewName: 'Summer Solstice Fireflies',
    icon: '🌿',
    description: '神秘森林中的靜謐夏夜，無數金色螢火蟲在微風中閃爍浮升。',
    accentColor: '#84CC16',
    badgeBg: 'bg-lime-500/20 text-lime-200 border-lime-400',
    particleType: 'fireflies',
  },
  7: {
    month: 7,
    name: '仲夏海風煙火祭',
    stardewName: 'Midsummer Beach Fireworks',
    icon: '🎆',
    description: '夏日海灘的歡樂節慶，五彩波光泡泡與慶典煙火星塵點亮夜空！',
    accentColor: '#06B6D4',
    badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400',
    particleType: 'fireworks',
  },
  8: {
    month: 8,
    name: '月光水母之夜',
    stardewName: 'Dance of the Moonlight Jellies',
    icon: '🪼',
    description: '星露谷最浪漫神秘的夏末盛會！藍綠夜光水母在波光粼粼的海面游動。',
    accentColor: '#38BDF8',
    badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400',
    particleType: 'jellies',
  },
  9: {
    month: 9,
    name: '中秋月圓豐收博覽會',
    stardewName: 'Stardew Harvest Fair',
    icon: '🌾',
    description: '金燦燦的農作物大豐收，皎潔明月與金黃麥浪迎來歡慶！',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400',
    particleType: 'harvest',
  },
  10: {
    month: 10,
    name: '萬靈節南瓜狂歡祭',
    stardewName: "Spirit's Eve & Golden Pumpkins",
    icon: '🎃',
    description: '萬聖節南瓜燈火幽幽亮起，神秘紫色星塵與糖果帶來狂歡氛圍！',
    accentColor: '#EA580C',
    badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-400',
    particleType: 'pumpkins',
  },
  11: {
    month: 11,
    name: '深秋紅楓感恩祭',
    stardewName: 'Late Autumn Maple & Feast',
    icon: '🍁',
    description: '濃郁深秋楓紅似火，層層疊疊的紅楓與金杏葉漫天飛舞。',
    accentColor: '#DC2626',
    badgeBg: 'bg-red-500/20 text-red-200 border-red-400',
    particleType: 'maple',
  },
  12: {
    month: 12,
    name: '冬日冬雪冰晶節',
    stardewName: 'Feast of the Winter Star',
    icon: '❄️',
    description: '銀裝素裹的冬日星盛會！晶瑩璀璨的六角雪花漫天飄灑，溫馨而靜謐。',
    accentColor: '#93C5FD',
    badgeBg: 'bg-blue-400/20 text-blue-100 border-blue-300',
    particleType: 'snow',
  },
};

interface FestivalCelebrationOverlayProps {
  forcedMonth?: number | null; // null for automatic calendar month
  onMonthChange?: (month: number | null) => void;
  showSelector?: boolean;
  onCloseSelector?: () => void;
}

export const FestivalCelebrationOverlay: React.FC<FestivalCelebrationOverlayProps> = ({
  forcedMonth = null,
  onMonthChange,
  showSelector = false,
  onCloseSelector,
}) => {
  const currentCalendarMonth = new Date().getMonth() + 1;
  const activeMonth = forcedMonth !== null && forcedMonth !== undefined ? forcedMonth : currentCalendarMonth;
  const festival = FESTIVAL_CALENDAR[activeMonth] || FESTIVAL_CALENDAR[12];

  // Particle generation
  const particles = useMemo(() => {
    const count = festival.particleType === 'snow' || festival.particleType === 'sakura' ? 24 : 18;
    return Array.from({ length: count }).map((_, i) => {
      const left = (i * 5.2 + (i % 7) * 3) % 96 + 2;
      const delay = (i * 0.45) % 6;
      const duration = 6 + (i % 5) * 1.8;
      const size = 12 + (i % 4) * 5;
      const swing = 15 + (i % 3) * 20;

      return {
        id: i,
        left: `${left}%`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        size,
        swing,
        variant: i % 4,
      };
    });
  }, [festival.particleType]);

  return (
    <>
      {/* 1. Full-screen Pointer-Events-None Particle Canvas Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-25 select-none">
        {particles.map((p) => {
          // Render specific particle aesthetics based on festival type:
          switch (festival.particleType) {
            case 'snow': // 12 月 冬雪飄落 (Feast of the Winter Star)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-snow-fall"
                  style={{
                    left: p.left,
                    top: '-30px',
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                >
                  <div
                    className="flex items-center justify-center filter drop-shadow-sm transition-transform opacity-90"
                    style={{
                      transform: `scale(${0.75 + p.variant * 0.15})`,
                    }}
                  >
                    {p.variant === 0 ? (
                      <span className="text-white text-lg drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">❄️</span>
                    ) : p.variant === 1 ? (
                      <span className="text-cyan-100 text-sm drop-shadow-[0_0_5px_rgba(224,242,254,0.9)]">❅</span>
                    ) : p.variant === 2 ? (
                      <span className="text-white text-xs drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">✻</span>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-white/95 blur-[0.5px] shadow-[0_0_8px_#ffffff]" />
                    )}
                  </div>
                </div>
              );

            case 'hearts': // 2 月 愛心漂浮 (Festival of Hearts / Valentine)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-heart-float"
                  style={{
                    left: p.left,
                    bottom: '-40px',
                    animationDelay: p.delay,
                    animationDuration: `${parseFloat(p.duration) + 2}s`,
                  }}
                >
                  <div
                    className="flex flex-col items-center filter drop-shadow-md"
                    style={{
                      transform: `scale(${0.8 + p.variant * 0.2})`,
                    }}
                  >
                    {p.variant === 0 ? (
                      <span className="text-2xl animate-pulse">💖</span>
                    ) : p.variant === 1 ? (
                      <span className="text-xl">💕</span>
                    ) : p.variant === 2 ? (
                      <span className="text-lg">💗</span>
                    ) : (
                      <span className="text-base">🌸</span>
                    )}
                    {p.variant % 2 === 0 && (
                      <span className="text-[10px] text-pink-200/80 -mt-1">✨</span>
                    )}
                  </div>
                </div>
              );

            case 'sakura': // 4 月 櫻花雨 (Cherry Blossoms)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-sakura-fall"
                  style={{
                    left: p.left,
                    top: '-30px',
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                >
                  <span
                    className="inline-block text-pink-300 drop-shadow-sm opacity-90 filter"
                    style={{ fontSize: `${p.size + 2}px` }}
                  >
                    🌸
                  </span>
                </div>
              );

            case 'fireflies': // 6 月 螢火蟲 (Fireflies)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-firefly-drift"
                  style={{
                    left: p.left,
                    bottom: `${(p.id * 17) % 75 + 10}%`,
                    animationDelay: p.delay,
                    animationDuration: `${parseFloat(p.duration) + 1}s`,
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-lime-300/90 shadow-[0_0_12px_#a3e635] flex items-center justify-center animate-ping">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-100" />
                  </div>
                </div>
              );

            case 'jellies': // 8 月 月光水母 (Dance of the Moonlight Jellies)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-jelly-drift"
                  style={{
                    left: p.left,
                    bottom: '-50px',
                    animationDelay: p.delay,
                    animationDuration: `${parseFloat(p.duration) + 4}s`,
                  }}
                >
                  <div className="flex flex-col items-center filter drop-shadow-[0_0_10px_#38bdf8] opacity-85">
                    <span className="text-2xl animate-bounce">🪼</span>
                    <span className="text-[10px] text-cyan-200">🫧</span>
                  </div>
                </div>
              );

            case 'pumpkins': // 10 月 萬聖節南瓜 (Spirit's Eve)
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-pumpkin-swirl"
                  style={{
                    left: p.left,
                    top: '-30px',
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                >
                  <span className="inline-block text-xl filter drop-shadow-[0_0_6px_#ea580c]">
                    {p.variant === 0 ? '🎃' : p.variant === 1 ? '✨' : p.variant === 2 ? '🍬' : '🍂'}
                  </span>
                </div>
              );

            case 'maple': // 11 月 紅楓感恩祭 (Maple Leaves)
            default:
              return (
                <div
                  key={p.id}
                  className="absolute pointer-events-none animate-maple-fall"
                  style={{
                    left: p.left,
                    top: '-30px',
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                >
                  <span
                    className="inline-block text-red-500 drop-shadow-sm filter"
                    style={{ fontSize: `${p.size + 4}px` }}
                  >
                    {p.variant % 2 === 0 ? '🍁' : '🍂'}
                  </span>
                </div>
              );
          }
        })}
      </div>

      {/* 2. Interactive Festival Celebration Selector Modal (Allows teacher to test any month's festival) */}
      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none animate-in fade-in duration-150">
          <div className="pixel-wood-box max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#4a2800] shadow-2xl bg-[#FFFDF9] border-4 border-[#8B5A2B] rounded-3xl">
            {/* Header */}
            <div className="bg-[#5a3818] text-[#ffebb3] px-6 py-3.5 border-b-4 border-[#361f0d] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl animate-bounce">{festival.icon}</span>
                <div>
                  <h3 className="font-pixel text-base sm:text-lg text-[#ffd700] tracking-wide">
                    星露谷四季節日慶典特效 (Stardew Festivals)
                  </h3>
                  <p className="text-xs text-[#fed7aa] font-bold">
                    依照當前月份自動切換（12月雪花紛飛 ❄️、2月愛心漂浮 💖），亦可點擊立即預覽！
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseSelector}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Current Active Banner */}
            <div className="p-4 bg-amber-50/80 border-b-2 border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-2xl bg-white shadow-xs border border-amber-300">
                  {festival.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-sm text-[#4a2800] font-black">
                      目前特效：{festival.month} 月 · {festival.name}
                    </span>
                    {forcedMonth === null ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        自動依當前月份
                      </span>
                    ) : (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-400">
                        手動預覽模式
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 font-bold mt-0.5">{festival.description}</p>
                </div>
              </div>

              {forcedMonth !== null && onMonthChange && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onMonthChange(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-xs whitespace-nowrap"
                >
                  恢復自動切換
                </button>
              )}
            </div>

            {/* Month Grid Picker (1 ~ 12 Months) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-3 custom-scrollbar bg-[#fdfaf5]">
              {Object.values(FESTIVAL_CALENDAR).map((fest) => {
                const isSelected = activeMonth === fest.month;
                const isRealMonth = currentCalendarMonth === fest.month;

                return (
                  <button
                    key={fest.month}
                    type="button"
                    onClick={() => {
                      soundManager.playVictory();
                      if (onMonthChange) {
                        onMonthChange(fest.month);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left flex flex-col gap-1.5 transition-all cursor-pointer relative group active:scale-95 shadow-xs ${
                      isSelected
                        ? 'border-amber-500 bg-amber-100/90 ring-3 ring-amber-300/80 shadow-md scale-102'
                        : 'border-[#E7DFD5] bg-white hover:border-amber-400 hover:bg-amber-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl group-hover:scale-115 transition-transform">
                        {fest.icon}
                      </span>
                      <div className="flex items-center gap-1">
                        {isRealMonth && (
                          <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                            本月
                          </span>
                        )}
                        <span className="font-mono text-xs font-black text-stone-400">
                          {fest.month}月
                        </span>
                      </div>
                    </div>

                    <div className="font-black text-xs text-[#4a2800] truncate">
                      {fest.name}
                    </div>

                    <div className="text-[10px] text-stone-500 font-bold line-clamp-2 leading-tight">
                      {fest.description}
                    </div>

                    {isSelected && (
                      <span className="text-[10px] font-black text-amber-900 bg-amber-300 px-2 py-0.5 rounded-md self-start mt-1">
                        慶典播放中 ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-100 border-t border-stone-200 flex justify-between items-center text-xs font-bold text-stone-600 px-6">
              <span>💡 提示：點擊任何月份即可立即套用並預覽該月份的節日動畫特效！</span>
              <button
                type="button"
                onClick={onCloseSelector}
                className="px-5 py-1.5 rounded-xl bg-[#8B5A2B] hover:bg-[#70441E] text-white font-black cursor-pointer shadow-xs"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS keyframes for smooth festival ambient animations */}
      <style>{`
        @keyframes snow-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translate(65px, 105vh) rotate(360deg); opacity: 0.2; }
        }
        .animate-snow-fall {
          animation: snow-fall linear infinite;
        }

        @keyframes heart-float {
          0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
          15% { opacity: 0.95; transform: translate(10px, -15vh) scale(1.05); }
          50% { transform: translate(-15px, -50vh) scale(0.95); opacity: 0.9; }
          85% { opacity: 0.85; }
          100% { transform: translate(25px, -108vh) scale(1.15); opacity: 0; }
        }
        .animate-heart-float {
          animation: heart-float ease-in-out infinite;
        }

        @keyframes sakura-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.9; }
          50% { transform: translate(70px, 50vh) rotate(180deg); }
          85% { opacity: 0.9; }
          100% { transform: translate(130px, 105vh) rotate(360deg); opacity: 0; }
        }
        .animate-sakura-fall {
          animation: sakura-fall ease-in-out infinite;
        }

        @keyframes maple-fall {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.9; }
          50% { transform: translate(80px, 50vh) rotate(190deg); }
          80% { opacity: 0.9; }
          100% { transform: translate(140px, 105vh) rotate(360deg); opacity: 0; }
        }
        .animate-maple-fall {
          animation: maple-fall ease-in-out infinite;
        }

        @keyframes firefly-drift {
          0%, 100% { transform: translate(0, 0) scale(0.8); opacity: 0.2; }
          50% { transform: translate(30px, -35px) scale(1.2); opacity: 1; }
        }
        .animate-firefly-drift {
          animation: firefly-drift ease-in-out infinite;
        }

        @keyframes jelly-drift {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.85; }
          50% { transform: translate(-30px, -50vh); }
          80% { opacity: 0.85; }
          100% { transform: translate(20px, -105vh); opacity: 0; }
        }
        .animate-jelly-drift {
          animation: jelly-drift ease-in-out infinite;
        }

        @keyframes pumpkin-swirl {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translate(90px, 105vh) rotate(360deg); opacity: 0; }
        }
        .animate-pumpkin-swirl {
          animation: pumpkin-swirl linear infinite;
        }
      `}</style>
    </>
  );
};
