import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../../utils/sound';
import { PixelSprite } from '../common/PixelSprite';
import { X, Play, Pause, RotateCcw, Clock, Maximize2, Minimize2 } from 'lucide-react';

interface TimerModalProps {
  onClose: () => void;
}

export const TimerModal: React.FC<TimerModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'countdown' | 'countup'>('countdown');
  const [secondsLeft, setSecondsLeft] = useState<number>(180); // Default 3 min
  const [initialSeconds, setInitialSeconds] = useState<number>(180);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'countdown') {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              soundManager.playAlarm();
              return 0;
            }
            if (prev <= 4) {
              soundManager.playTick();
            }
            return prev - 1;
          });
        } else {
          setSecondsLeft((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode]);

  const handleStartPause = () => {
    soundManager.playClick();
    if (secondsLeft <= 0 && mode === 'countdown') {
      setSecondsLeft(initialSeconds);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    soundManager.playClick();
    setIsRunning(false);
    if (mode === 'countdown') {
      setSecondsLeft(initialSeconds);
    } else {
      setSecondsLeft(0);
    }
  };

  const handleSetPreset = (secs: number) => {
    soundManager.playClick();
    setIsRunning(false);
    setInitialSeconds(secs);
    setSecondsLeft(secs);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
      <div
        ref={modalRef}
        className={`pixel-wood-box w-full max-w-xl flex flex-col overflow-hidden text-[#4a2800] transition-all ${
          isFullscreen ? 'h-full max-w-none rounded-none justify-between p-8' : ''
        }`}
      >
        {/* Header */}
        <div className="bg-[#6a4422] text-[#ffebb3] px-4 py-3 border-b-4 border-[#361f0d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#ffd700]" />
            <h3 className="font-pixel text-xs sm:text-sm">
              課堂計時器 (Classroom Timer 🌱)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer"
              title={isFullscreen ? '退出全螢幕' : '投屏全螢幕'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1 hover:bg-[#8b5a2b] text-[#ffd700] rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#faeed1]">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#d6ba89] p-1 rounded-lg mb-6 border border-[#a3794b]">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsRunning(false);
                setMode('countdown');
                setSecondsLeft(initialSeconds);
              }}
              className={`px-4 py-1.5 rounded text-xs font-bold font-pixel cursor-pointer transition-colors ${
                mode === 'countdown'
                  ? 'bg-[#6a4422] text-[#ffebb3] shadow'
                  : 'text-[#4a2800] hover:bg-[#eeddbb]'
              }`}
            >
              ⏱️ 倒數計時
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsRunning(false);
                setMode('countup');
                setSecondsLeft(0);
              }}
              className={`px-4 py-1.5 rounded text-xs font-bold font-pixel cursor-pointer transition-colors ${
                mode === 'countup'
                  ? 'bg-[#6a4422] text-[#ffebb3] shadow'
                  : 'text-[#4a2800] hover:bg-[#eeddbb]'
              }`}
            >
              📈 正計時碼錶
            </button>
          </div>

          {/* Big Digital Display */}
          <div className="relative pixel-wood-dark p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-[#251406] my-2 text-center w-full max-w-md">
            <div
              className={`font-pixel text-5xl sm:text-7xl tracking-wider select-none ${
                secondsLeft <= 5 && mode === 'countdown' && isRunning
                  ? 'text-[#f87171] animate-pulse'
                  : 'text-[#ffebb3]'
              }`}
            >
              {formatTime(secondsLeft)}
            </div>

            {/* Status note */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-pixel text-[#d6ba89]">
              <PixelSprite name="chicken" size={20} animate={isRunning} />
              <span>{isRunning ? '計時中... TICKING 🌱' : '已就緒 READY'}</span>
            </div>
          </div>

          {/* Quick Presets (Only in countdown mode) */}
          {mode === 'countdown' && (
            <div className="flex items-center flex-wrap justify-center gap-2 my-4">
              {[
                { label: '30秒', secs: 30 },
                { label: '1分鐘', secs: 60 },
                { label: '2分鐘', secs: 120 },
                { label: '3分鐘', secs: 180 },
                { label: '5分鐘', secs: 300 },
                { label: '10分鐘', secs: 600 },
              ].map((preset) => (
                <button
                  key={preset.secs}
                  onClick={() => handleSetPreset(preset.secs)}
                  className={`px-3 py-1 text-xs font-bold font-pixel rounded border cursor-pointer transition-all ${
                    initialSeconds === preset.secs
                      ? 'bg-[#fabc3f] text-[#4a2800] border-[#8b5a2b]'
                      : 'bg-[#ede0c2] text-stone-700 border-[#c4a675] hover:bg-[#ffeec2]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleStartPause}
              className={`px-6 py-3 rounded-lg font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all ${
                isRunning
                  ? 'bg-[#e11d48] hover:bg-[#be123c] text-white border-2 border-[#881337]'
                  : 'pixel-btn-green text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> 暫停 PAUSE
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> 開始 START
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-lg font-pixel text-xs sm:text-sm font-bold bg-[#ede0c2] hover:bg-[#dfcca4] text-[#4a2800] border-2 border-[#8b5a2b] flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> 重設 RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
