import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../../types/classroom';
import { resolvePokemonAvatar, getCardTheme, isEmoji } from '../../utils/pokemonAvatars';

interface FloatingBadge {
  id: number;
  delta: number;
  type: 'pos' | 'neg';
}

interface PokemonStudentCardProps {
  student: Student;
  rank?: number;
  isSelected: boolean;
  isMultiSelectMode: boolean;
  isNegKingMode: boolean;
  isCoolingOff: boolean;
  eyeProtection: boolean;
  onClick: () => void;
  onAvatarClick?: (e: React.MouseEvent) => void;
  onPokemonClick?: (e: React.MouseEvent) => void;
}

export const PokemonStudentCard: React.FC<PokemonStudentCardProps> = ({
  student,
  rank,
  isSelected,
  isMultiSelectMode,
  isNegKingMode,
  isCoolingOff,
  eyeProtection,
  onClick,
  onAvatarClick,
  onPokemonClick,
}) => {
  const isDark = eyeProtection;
  const prevPoints = useRef(student.points);
  const prevPos = useRef(student.posPoints || 0);
  const prevNeg = useRef(student.negPoints || 0);

  const [cardVibrate, setCardVibrate] = useState<'pos' | 'neg' | 'none'>('none');
  const [avatarVibrate, setAvatarVibrate] = useState<'pos' | 'neg' | 'none'>('none');
  const [floatingBadges, setFloatingBadges] = useState<FloatingBadge[]>([]);

  // Track points changes
  useEffect(() => {
    if (student.points !== prevPoints.current) {
      const delta = student.points - prevPoints.current;
      const isPos = delta > 0;
      prevPoints.current = student.points;

      setCardVibrate(isPos ? 'pos' : 'neg');
      setAvatarVibrate(isPos ? 'pos' : 'neg');

      const badgeId = Date.now() + Math.random();
      setFloatingBadges((prev) => [...prev, { id: badgeId, delta, type: isPos ? 'pos' : 'neg' }]);

      const timer1 = setTimeout(() => {
        setCardVibrate('none');
        setAvatarVibrate('none');
      }, 750);

      const timer2 = setTimeout(() => {
        setFloatingBadges((prev) => prev.filter((b) => b.id !== badgeId));
      }, 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [student.points]);

  const avatarUrl = resolvePokemonAvatar(
    student.pokemonAvatar || student.pokemonId || (student.avatar && !student.avatar.startsWith('sdv_') ? student.avatar : undefined) || 25
  );
  const isEmojiAvatar = isEmoji(avatarUrl);
  const cardBgKey =
    student.cardBackground ||
    (student as any).cardTheme ||
    (student as any).themeKey ||
    (student as any).theme ||
    (student as any).background ||
    (student as any).cardBg ||
    (student as any).bgKey;
  const theme = getCardTheme(cardBgKey);

  const isFirst = rank === 1 && !isNegKingMode;
  const isNegKing = rank === 1 && isNegKingMode;

  const cardVibrateClass =
    cardVibrate === 'pos'
      ? 'animate-card-pos z-20 ring-4 ring-emerald-400/60 !border-emerald-400'
      : cardVibrate === 'neg'
      ? 'animate-card-neg z-20 ring-4 ring-rose-500/60 !border-rose-400'
      : '';

  const avatarVibrateClass =
    avatarVibrate === 'pos' ? 'animate-avatar-pos' : avatarVibrate === 'neg' ? 'animate-avatar-neg' : '';

  return (
    <div
      onClick={isCoolingOff ? undefined : onClick}
      className={`theme-card relative rounded-[2rem] transition-all cursor-pointer group flex flex-col p-3 border select-none ${
        isDark
          ? '!bg-slate-900 !text-slate-100 !border-slate-800 shadow-xs'
          : theme?.bgUrl
          ? `bg-[#FFFDF9] text-[#5D4037] ${theme.accentBorder} shadow-sm`
          : isFirst
          ? 'bg-gradient-to-b from-[#FFFDF2] to-[#FFF9E6] border-[#FDE68A] shadow-xs'
          : 'bg-[#FFFDF9] text-[#5D4037] border-[#EFEBE6] hover:border-[#D7CCC8] shadow-xs hover:shadow-sm'
      } ${cardVibrateClass} ${
        isSelected
          ? isDark
            ? 'bg-slate-850 !border-amber-500 ring-2 ring-amber-500/40 shadow-sm'
            : 'bg-[#FFFBEB] !border-[#F59E0B] ring-2 ring-[#F59E0B]/40 shadow-sm'
          : 'hover:-translate-y-1 hover:scale-[1.035] hover:shadow-xl hover:ring-2 hover:ring-[#F59E0B]/30 duration-300 ease-out'
      } ${isCoolingOff ? 'opacity-60 bg-cyan-50/20 scale-[0.98] !border-[#00ACC1]/40' : ''}`}
    >
      {/* Background Image if theme has bgUrl */}
      {theme?.bgUrl && (
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
          <img
            src={theme.bgUrl}
            alt=""
            className="w-full h-full object-cover opacity-90 group-hover:opacity-95 transition-opacity duration-300 filter contrast-[1.05] saturate-[1.15]"
            referrerPolicy="no-referrer"
          />
          <div
            className={`absolute inset-0 ${
              isDark ? 'bg-slate-950/45' : 'bg-gradient-to-b from-white/15 via-transparent to-white/30'
            }`}
          />
        </div>
      )}

      {/* Floating Delta Badges */}
      {floatingBadges.map((b) => (
        <div
          key={b.id}
          className={`absolute left-1/2 top-8 pointer-events-none z-50 transform -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full font-black shadow-xl border-2 backdrop-blur-[2px] ${
            b.type === 'pos'
              ? 'animate-float-badge-up bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white border-white ring-4 ring-emerald-400/30'
              : 'animate-float-badge-down bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white border-white ring-4 ring-rose-400/30'
          }`}
        >
          <span className="text-base select-none">{b.type === 'pos' ? '🌱' : '🩹'}</span>
          <span className="tabular-nums drop-shadow-sm font-black text-2xl tracking-tight leading-none">
            {b.delta > 0 ? `+${b.delta}` : b.delta}
          </span>
        </div>
      ))}

      {/* Cooling off Overlay */}
      {isCoolingOff && (
        <div className="absolute inset-0 bg-[#E0F7FA]/40 pointer-events-none z-30 flex items-center justify-center border-2 border-[#00ACC1]/40 rounded-[2rem] overflow-hidden backdrop-blur-[1px]">
          <div className="absolute top-2 right-2 bg-[#00ACC1] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <span>❄️ 冷靜中</span>
          </div>
          <span className="text-7xl opacity-20 select-none animate-spin" style={{ animationDuration: '20s' }}>
            ❄️
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-1.5 relative z-10">
        {/* Multi-select check icon */}
        {isMultiSelectMode && isSelected && (
          <div className="absolute top-1 right-1 z-40 bg-[#F59E0B] w-7 h-7 rounded-full border-2 border-white shadow-xs flex items-center justify-center animate-in zoom-in duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Top Header Row of Card: Roll No + Rank Pill + Total Score */}
        <div className="flex justify-between items-start w-full mb-2.5 z-30">
          <div className="flex items-center gap-1.5">
            {/* Roll No badge */}
            <div
              className={`flex items-center px-2.5 py-0.5 rounded-xl shadow-xs border font-black transition-transform ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-emerald-400'
                  : isNegKingMode
                  ? 'bg-[#FFE0B2] border-[#FB8C00]/50 text-[#E65100]'
                  : theme?.bgUrl
                  ? 'bg-[#FFFDF9]/95 border-emerald-300/80 text-[#1B5E20] shadow-xs backdrop-blur-md ring-1 ring-white/80'
                  : 'bg-[#E8F8F0] border-[#81C784]/60 text-[#2E7D32]'
              }`}
              title={`學號 #${student.rollNo}`}
            >
              <span className="text-sm tracking-tight leading-none font-bold">#{student.rollNo}</span>
            </div>

            {/* Rank badge */}
            {rank !== undefined && (
              <div
                className={`flex items-center justify-center rounded-lg font-black px-1.5 py-0.5 text-[11px] border transition-transform ${
                  isFirst
                    ? 'bg-[#FEF08A] text-[#854D0E] border-[#EAB308]/60 font-black animate-wiggle'
                    : isNegKing
                    ? 'bg-rose-900 text-rose-100 border-rose-950 animate-wiggle'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : theme?.bgUrl
                    ? 'bg-[#FFFDF9]/95 text-[#795548] border-[#D7CCC8]/80 shadow-xs backdrop-blur-md ring-1 ring-white/80'
                    : 'bg-[#F5EBE1] text-[#795548] border-[#D7CCC8]/60'
                }`}
              >
                {isFirst || isNegKing ? '👑 1' : `${rank}位`}
              </div>
            )}

            {/* 500+ milestone badge */}
            {student.points >= 500 && (
              <div
                className="flex items-center justify-center rounded-lg font-black px-1.5 py-0.5 text-[11px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 border border-amber-300 shadow-2xs"
                title="👑 傳奇領航者（達成 500 分里程碑尊榮金冠標記）"
              >
                👑 500+
              </div>
            )}
          </div>

          {/* Points Chip */}
          <div
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-xl border shadow-xs z-30 transition-all duration-300 ${
              isFirst
                ? theme?.bgUrl
                  ? 'bg-[#FEF9C3]/95 border-[#F59E0B] text-[#78350F] shadow-sm backdrop-blur-md ring-1 ring-white/90'
                  : 'bg-gradient-to-r from-[#FFF9C4] to-[#FFE082] border-[#F59E0B]/60 text-[#78350F]'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-amber-300'
                : isNegKingMode
                ? theme?.bgUrl
                  ? 'bg-[#FFF1F2]/95 border-[#FECDD3] text-[#9F1239] shadow-sm backdrop-blur-md ring-1 ring-white/90'
                  : 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]'
                : theme?.bgUrl
                ? 'bg-[#FFFDF9]/95 border-[#F59E0B]/60 text-[#78350F] shadow-sm backdrop-blur-md ring-1 ring-white/90'
                : 'bg-gradient-to-r from-[#FFFDF0] to-[#FFF9D6] border-[#FCD34D] text-[#854D0E]'
            }`}
          >
            <span className="text-xs leading-none">{isNegKingMode ? '⚡' : '🎉'}</span>
            <span className="text-lg font-black leading-none tabular-nums">
              {isNegKingMode ? `-${student.negPoints || 0}` : student.points}
            </span>
          </div>
        </div>

        {/* Student Name */}
        <div className="mb-2 text-left z-30">
          <h3
            className={`font-black text-xl tracking-tight leading-tight truncate transition-all duration-300 inline-block px-2.5 py-1 rounded-xl shadow-xs ${
              isDark
                ? '!text-white !bg-slate-950/95 !border !border-slate-700 shadow-md ring-1 ring-slate-800/80'
                : theme?.bgUrl
                ? 'text-[#4E2713] bg-white/95 shadow-xs border border-white/90'
                : 'text-[#4E2713] bg-white/90 shadow-2xs border border-[#EFEBE6]'
            }`}
            title={student.name}
          >
            {student.name}
          </h3>
        </div>

        {/* Center Avatar Container */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onAvatarClick) onAvatarClick(e);
            else if (onPokemonClick) onPokemonClick(e);
          }}
          className={`relative w-full mx-auto mb-2.5 flex items-center justify-center group-hover:scale-103 transition-transform duration-300 ease-out z-20 overflow-hidden border ${avatarVibrateClass} rounded-2xl aspect-square max-w-[115px] p-2 ${
            isDark
              ? 'bg-slate-950/80 border-slate-800'
              : theme?.bgUrl
              ? 'bg-white/90 border-white/80 shadow-sm'
              : 'bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF] border-[#EFEBE6]'
          }`}
          title="點擊自訂寶可夢頭像與背景"
        >
          {isEmojiAvatar ? (
            <span className="text-5xl z-10 relative drop-shadow-xs select-none">{avatarUrl}</span>
          ) : (
            <img
              src={avatarUrl}
              alt={student.name}
              className="w-full h-full object-contain z-10 relative drop-shadow-xs"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          )}

          {/* Hover prompt */}
          {!isMultiSelectMode && (
            <div
              className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px] z-20 rounded-2xl ${
                isDark ? 'bg-slate-900/80 text-amber-300' : 'bg-white/75 text-[#5D4037]'
              }`}
            >
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#E8F8F0] text-[#2E7D32] border border-[#81C784] shadow-xs">
                點我更換 🐾
              </span>
            </div>
          )}
        </div>

        {/* Bottom Positive & Negative Stat Boxes */}
        <div className="w-full grid grid-cols-2 gap-1.5 mt-auto z-30">
          <div
            className={`border flex flex-col items-center justify-center shadow-xs rounded-xl py-1 px-1.5 transition-all duration-300 ${
              isDark
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                : 'bg-[#E8F8F0] border-[#81C784]/50 text-[#2E7D32]'
            }`}
          >
            <span className="font-extrabold text-[9px] opacity-75 leading-none mb-0.5">🌱 做得好</span>
            <span className="font-black text-lg leading-tight tabular-nums">+{student.posPoints || 0}</span>
          </div>

          <div
            className={`border flex flex-col items-center justify-center shadow-xs rounded-xl py-1 px-1.5 transition-all duration-300 ${
              isNegKingMode
                ? isDark
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-slate-800 border-slate-900 text-white'
                : isDark
                ? 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                : 'bg-[#FFF1F2] border-[#FECDD3] text-[#BE123C]'
            }`}
          >
            <span className="font-extrabold text-[9px] opacity-75 leading-none mb-0.5">🩹 要注意</span>
            <span className="font-black text-lg leading-tight tabular-nums">-{student.negPoints || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
