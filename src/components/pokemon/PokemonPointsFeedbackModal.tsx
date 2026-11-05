import React, { useEffect, useState } from 'react';
import { Student } from '../../types/classroom';
import { resolvePokemonAvatar, isEmoji } from '../../utils/pokemonAvatars';

interface PokemonPointsFeedbackModalProps {
  student: Student;
  delta: number;
  reason?: string;
  eyeProtection?: boolean;
  onClose: () => void;
  onUndo?: () => void;
}

export const PokemonPointsFeedbackModal: React.FC<PokemonPointsFeedbackModalProps> = ({
  student,
  delta,
  reason,
  eyeProtection = false,
  onClose,
  onUndo,
}) => {
  const isPositive = delta > 0;
  const isDark = eyeProtection;

  // Background particles state
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (isPositive) {
      // Floating bubbles and celebratory emojis
      const emojis = ['🎈', '❤️', '💖', '💝', '✨', '⭐', '🎉', '🌟'];
      const items = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 95}%`,
        size: `${Math.random() * 1.5 + 1.2}rem`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: `${Math.random() * 0.8}s`,
        duration: `${Math.random() * 1.5 + 2}s`,
      }));
      setParticles(items);
    } else {
      // Tear drops / rain emojis
      const emojis = ['😢', '😭', '💧', '🩹'];
      const items = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 95}%`,
        delay: `${Math.random() * 0.8}s`,
        duration: `${Math.random() * 0.8 + 1}s`,
        content: emojis[Math.floor(Math.random() * emojis.length)],
      }));
      setParticles(items);
    }
  }, [isPositive]);

  // Auto-dismiss after exactly 1.3 seconds as requested
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1300);
    return () => clearTimeout(timer);
  }, [onClose]);

  const avatarUrl = resolvePokemonAvatar(student.pokemonId || student.avatar);
  const isEmojiAvatar = isEmoji(avatarUrl);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden cursor-pointer select-none ${
        isDark ? 'bg-slate-950/85 text-slate-100' : isPositive ? 'bg-stone-900/70' : 'bg-slate-900/70'
      }`}
    >
      {/* Background Floating Particles */}
      {isPositive
        ? particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none select-none filter drop-shadow-md z-5 text-center"
              style={{
                left: p.left,
                bottom: '-50px',
                fontSize: p.size,
                animation: `float-heart ${p.duration} cubic-bezier(0.15, 0.75, 0.4, 1) forwards`,
                animationDelay: p.delay,
              }}
            >
              {p.emoji}
            </div>
          ))
        : particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none z-5 text-2xl opacity-75"
              style={{
                left: p.left,
                top: '-50px',
                animation: `rain-fall ${p.duration} linear infinite`,
                animationDelay: p.delay,
              }}
            >
              {p.content}
            </div>
          ))}

      {/* Decorative ambient icons */}
      <div className="absolute top-10 left-10 text-8xl opacity-15 select-none animate-pulse pointer-events-none z-10">
        {isPositive ? '✨' : '☁️'}
      </div>
      <div className="absolute bottom-10 right-10 text-9xl opacity-15 select-none pointer-events-none z-10">
        {isPositive ? '🎈' : '⛈️'}
      </div>

      {/* Main Feedback Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm sm:max-w-md rounded-[3rem] p-6 sm:p-7 border-[4px] shadow-2xl relative animate-in zoom-in duration-300 z-20 flex flex-col items-center ${
          isDark
            ? 'bg-slate-900 border-slate-700 shadow-slate-950/80 text-slate-100'
            : `bg-[#FFFDF9] ${isPositive ? 'border-[#81C784]' : 'border-[#FB7185]'}`
        }`}
      >
        {/* Top Title: 恭喜你！ or 繼續努力！ */}
        <div className="flex flex-col items-center gap-1 mb-2 text-center w-full">
          <div className="flex items-center gap-2">
            <span className={`text-4xl sm:text-5xl select-none ${isPositive ? 'animate-bounce' : 'animate-pulse'}`}>
              {isPositive ? '🌟' : '🩹'}
            </span>
            <h2
              className={`font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none ${
                isDark
                  ? isPositive
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                  : isPositive
                  ? 'text-[#2E7D32]'
                  : 'text-[#BE123C]'
              }`}
            >
              {isPositive ? '恭喜你！' : '繼續努力！'}
            </h2>
          </div>

          {/* Student roll number and name */}
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className={`text-xs font-black px-2.5 py-0.5 rounded-full border shadow-xs ${
                isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-[#8D6E63] border-[#D7CCC8]'
              }`}
            >
              #{student.rollNo}
            </span>
            <h3 className={`font-black text-2xl sm:text-3xl tracking-tight ${isDark ? 'text-slate-100' : 'text-[#5D4037]'}`}>
              {student.name}
            </h3>
          </div>

          {/* Subtitle tag */}
          <div
            className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] mt-0.5 px-3 py-0.5 rounded-full ${
              isDark
                ? isPositive
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950/70 text-rose-300 border border-rose-800'
                : isPositive
                ? 'bg-[#E8F8F0] text-[#2E7D32] border border-[#81C784]/60'
                : 'bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]'
            }`}
          >
            {isPositive ? 'Excellent Effort' : 'Keep it up'}
          </div>

          {/* Reason if provided */}
          {reason && (
            <div
              className={`mt-1.5 px-4 py-0.5 rounded-xl border text-sm sm:text-base font-black shadow-xs truncate max-w-full ${
                isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-[#795548] border-[#D7CCC8]'
              }`}
            >
              {reason}
            </div>
          )}
        </div>

        {/* Center Avatar with Halo */}
        <div className="w-full flex items-center justify-center my-1.5 relative">
          <div
            className={`absolute inset-0 opacity-20 blur-xl scale-110 -z-0 rounded-full ${
              isPositive ? 'bg-[#81C784]' : 'bg-[#FB7185]'
            }`}
          />
          <div
            className={`relative flex items-center justify-center transition-all overflow-hidden w-32 h-32 sm:w-40 sm:h-40 border-2 shadow-sm rounded-3xl ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-[#E7DFD5]'
            }`}
          >
            {isEmojiAvatar ? (
              <span className="text-6xl sm:text-7xl z-10 relative select-none">{avatarUrl}</span>
            ) : (
              <img
                src={avatarUrl}
                className="w-full h-full object-contain z-10 relative"
                alt={student.name}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>

        {/* Giant Points Delta Pill */}
        <div className="my-1.5">
          <div
            className={`px-7 py-1 rounded-2xl font-black text-3xl sm:text-4xl shadow-md border-b-4 ${
              isPositive
                ? 'bg-[#2E7D32] text-white border-[#1B5E20]'
                : 'bg-[#E11D48] text-white border-[#9F1239]'
            }`}
          >
            {delta > 0 ? `+${delta}` : delta}
          </div>
        </div>

        {/* Total Score Display Bar */}
        <div
          className={`w-full rounded-2xl p-2.5 px-4 sm:px-5 border flex justify-between items-center shadow-xs ${
            isDark
              ? 'bg-slate-800/90 border-slate-700 text-amber-300'
              : 'bg-gradient-to-r from-[#FFFDF0] to-[#FFF9E6] border-[#FDE68A] text-[#854D0E]'
          }`}
        >
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-75">Total Score</span>
            <span className="text-xs font-black">🪙 目前總分</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums">
            {student.points}
          </div>
        </div>

        {/* Undo Button */}
        {onUndo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUndo();
            }}
            className={`mt-2.5 px-4 py-1.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider flex items-center gap-1.5 border shadow-xs active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
                : 'bg-white text-[#8D6E63] hover:bg-[#FAF8F5] hover:text-[#5D4037] border-[#D7CCC8]'
            }`}
          >
            <span>🧹</span> 擦掉它 (Undo)
          </button>
        )}
      </div>

      {/* Floating animation keyframes styles */}
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes float-heart {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          15% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-130vh) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
