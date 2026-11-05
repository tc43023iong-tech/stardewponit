import React, { useState, useEffect, useRef } from 'react';
import { pokemonSound } from '../../utils/pokemonAudio';

interface PokemonTimerBarProps {
  eyeProtection: boolean;
}

export const PokemonTimerBar: React.FC<PokemonTimerBarProps> = ({ eyeProtection }) => {
  const isDark = eyeProtection;
  const [timerMode, setTimerMode] = useState<'countdown' | 'countup'>('countdown');
  const [initialSeconds, setInitialSeconds] = useState<number>(180); // 3 minutes default
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [minInput, setMinInput] = useState<string>('03');
  const [secInput, setSecInput] = useState<string>('00');

  const timerRef = useRef<number | null>(null);

  // Sync inputs with remainingSeconds when not running
  useEffect(() => {
    if (!isRunning) {
      const m = Math.floor(remainingSeconds / 60);
      const s = remainingSeconds % 60;
      setMinInput(String(m).padStart(2, '0'));
      setSecInput(String(s).padStart(2, '0'));
    }
  }, [remainingSeconds, isRunning]);

  // Tick interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        if (timerMode === 'countdown') {
          setRemainingSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsRunning(false);
              pokemonSound.playTimerAlarm();
              return 0;
            }
            return prev - 1;
          });
        } else {
          setRemainingSeconds((prev) => prev + 1);
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timerMode]);

  const handleSetPreset = (secs: number) => {
    pokemonSound.playTimerClick();
    setIsRunning(false);
    setInitialSeconds(secs);
    setRemainingSeconds(secs);
  };

  const handleAdjust = (delta: number) => {
    pokemonSound.playTimerClick();
    setRemainingSeconds((prev) => {
      const next = Math.max(0, prev + delta);
      if (!isRunning) setInitialSeconds(next);
      return next;
    });
  };

  const toggleRun = () => {
    pokemonSound.playTimerClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    pokemonSound.playTimerClick();
    setIsRunning(false);
    setRemainingSeconds(timerMode === 'countdown' ? initialSeconds : 0);
  };

  const formatDisplay = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className={`mx-4 sm:mx-8 mt-2 p-5 rounded-[2.5rem] border-3 shadow-md flex flex-col xl:flex-row items-center justify-between gap-5 transition-all duration-500 ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/95 border-[#8D6E63] text-[#5D4037]'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⏱️</span>
          <div className="flex flex-col leading-tight">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-1.5">
              課堂計時器 <span className="text-base text-stone-400 font-bold">(Class Timer)</span>
            </h2>
            <span className="text-xs font-bold text-stone-400">TIMER ASSISTANT 🌱</span>
          </div>
        </div>

        {/* Mode Switch: Countdown vs Countup */}
        <div className="flex gap-1.5 bg-[#FFFDF9] p-1 rounded-2xl border border-[#D7CCC8]">
          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setTimerMode('countdown');
              setRemainingSeconds(initialSeconds);
              pokemonSound.playTimerClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
              timerMode === 'countdown'
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-[#F59E0B] text-white shadow-xs'
                : 'hover:bg-black/5 text-stone-500'
            }`}
          >
            ⏱️ 倒數計時
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setTimerMode('countup');
              setRemainingSeconds(0);
              pokemonSound.playTimerClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
              timerMode === 'countup'
                ? isDark
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'bg-[#F59E0B] text-white shadow-xs'
                : 'hover:bg-black/5 text-stone-500'
            }`}
          >
            ⏱️ 正向計時
          </button>
        </div>
      </div>

      {/* Center Large Clock & Controls */}
      <div className="flex items-center gap-4">
        <div
          className={`font-mono font-black text-4xl sm:text-5xl px-6 py-2 rounded-2xl border-2 tracking-wider ${
            remainingSeconds === 0 && timerMode === 'countdown'
              ? 'bg-red-100 text-red-600 border-red-400 animate-pulse'
              : isDark
              ? 'bg-slate-950 text-amber-300 border-slate-700'
              : 'bg-[#FFFDF9] text-[#5D4037] border-[#D7CCC8]'
          }`}
        >
          {formatDisplay(remainingSeconds)}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleRun}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
              isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#4CAF50] hover:bg-[#43A047]'
            }`}
          >
            {isRunning ? '⏸️ 暫停' : '▶️ 開始'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-2xl font-black text-sm bg-stone-200 hover:bg-stone-300 text-stone-700 active:scale-95 transition-all cursor-pointer"
          >
            🔄 重置
          </button>
        </div>
      </div>

      {/* Right Presets & Quick Adjustments */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {timerMode === 'countdown' ? (
          <>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '1分', sec: 60 },
                { label: '2分', sec: 120 },
                { label: '3分', sec: 180 },
                { label: '5分', sec: 300 },
              ].map((p) => (
                <button
                  key={p.sec}
                  type="button"
                  onClick={() => handleSetPreset(p.sec)}
                  className={`px-2.5 py-1 rounded-xl font-black text-xs border transition-all cursor-pointer ${
                    initialSeconds === p.sec
                      ? 'bg-[#F59E0B] text-white border-[#B45309] shadow-xs'
                      : 'bg-white hover:bg-stone-50 text-[#5D4037] border-[#D7CCC8]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleAdjust(-30)}
                className="px-2 py-1 rounded-xl font-black text-xs bg-white border border-[#D7CCC8] hover:bg-stone-50 text-[#5D4037]"
                title="減少 30 秒"
              >
                -30s
              </button>
              <button
                type="button"
                onClick={() => handleAdjust(30)}
                className="px-2 py-1 rounded-xl font-black text-xs bg-white border border-[#D7CCC8] hover:bg-stone-50 text-[#5D4037]"
                title="增加 30 秒"
              >
                +30s
              </button>
              <button
                type="button"
                onClick={() => handleAdjust(60)}
                className="px-2 py-1 rounded-xl font-black text-xs bg-white border border-[#D7CCC8] hover:bg-stone-50 text-[#5D4037]"
                title="增加 1 分鐘"
              >
                +1m
              </button>
            </div>
          </>
        ) : (
          <div className="text-center font-black text-xs text-stone-400 px-4 py-2 border border-dashed border-[#D7CCC8] rounded-2xl">
            正計時模式中 📈 自 00:00 向上計時
          </div>
        )}
      </div>
    </div>
  );
};
