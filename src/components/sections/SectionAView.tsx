import React from 'react';
import { SECTION_A_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

interface SectionAViewProps {
  questionIndex: number;
  selectedKey: string | null;
  onSelect: (key: string) => void;
  submitted: boolean;
  playerTheme?: 'blue' | 'green';
}

export const SectionAView: React.FC<SectionAViewProps> = ({
  questionIndex,
  selectedKey,
  onSelect,
  submitted,
  playerTheme = 'blue',
}) => {
  const currentQ = SECTION_A_DATA.questions[questionIndex];

  return (
    <div className="flex flex-col gap-3.5">
      {/* Situation wooden signboard */}
      <div className="pixel-parchment p-3 sm:p-4 relative">
        <div className="flex items-center justify-between mb-1">
          <span className="font-pixel text-[10px] text-[#8b5a2b] font-bold">
            Situation {questionIndex + 1} of {SECTION_A_DATA.questions.length}
          </span>
          <div className="flex items-center gap-1">
            <PixelSprite name="sunflower" size={16} />
            <span className="text-[11px] text-[#78350f] font-semibold">Tap your advice:</span>
          </div>
        </div>
        <p className="text-sm sm:text-base font-bold text-[#381a00] leading-snug">
          "{currentQ.situation}"
        </p>
      </div>

      {/* 6 Advice Cards (A through F) - Instant Tap to Answer! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SECTION_A_DATA.options.map((opt) => {
          const isSelected = selectedKey === opt.key;
          const isCorrectChoice = opt.key === currentQ.correctKey;

          let cardStyle =
            'bg-[#fffaf0] border-[#8b5a2b] text-[#331c07] hover:bg-[#fff0d6] hover:border-[#5a3818]';
          if (isSelected) {
            cardStyle =
              playerTheme === 'blue'
                ? 'bg-[#dbeafe] border-[#1d4ed8] text-[#1e3a8a] ring-2 ring-[#3b82f6]'
                : 'bg-[#dcfce7] border-[#15803d] text-[#14532d] ring-2 ring-[#22c55e]';
          }

          if (submitted) {
            if (isCorrectChoice) {
              cardStyle = 'bg-[#bbf7d0] border-[#16a34a] text-[#14532d] font-bold shadow-sm';
            } else if (isSelected && !isCorrectChoice) {
              cardStyle = 'bg-[#fecaca] border-[#dc2626] text-[#7f1d1d] opacity-85';
            } else {
              cardStyle = 'bg-[#f5f5f4] border-[#d6d3d1] text-[#78716c] opacity-50';
            }
          }

          return (
            <button
              key={opt.key}
              type="button"
              disabled={submitted}
              onClick={() => onSelect(opt.key)}
              className={`p-3 border-2 text-left cursor-pointer transition-all flex items-start gap-2.5 rounded-xs ${cardStyle}`}
            >
              <span
                className={`font-pixel text-xs px-2 py-0.5 border shrink-0 mt-0.5 ${
                  isSelected
                    ? playerTheme === 'blue'
                      ? 'bg-[#2563eb] text-white border-[#1d4ed8]'
                      : 'bg-[#16a34a] text-white border-[#15803d]'
                    : 'bg-[#faeed1] text-[#78350f] border-[#8b5a2b]'
                }`}
              >
                {opt.key}
              </span>
              <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
                {opt.text}
              </div>

              {submitted && isCorrectChoice && (
                <PixelSprite name="check" size={18} className="mt-0.5" />
              )}
              {submitted && isSelected && !isCorrectChoice && (
                <PixelSprite name="cross" size={18} className="mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation when submitted */}
      {submitted && (
        <div className="bg-[#fff9ed] border-2 border-[#b45309] p-3 text-xs text-[#5c3708] mt-1 animate-in fade-in">
          <span className="font-bold block mb-0.5">Village Elder's advice tip:</span>
          <p className="leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}
    </div>
  );
};
