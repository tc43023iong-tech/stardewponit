import React, { useState } from 'react';
import { SECTION_E_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';

interface SectionEViewProps {
  questionIndex: number;
  selectedChoice: string | null;
  onSelect: (choice: 'in' | 'with') => void;
  submitted: boolean;
  playerTheme?: 'blue' | 'green';
}

export const SectionEView: React.FC<SectionEViewProps> = ({
  questionIndex,
  selectedChoice,
  onSelect,
  submitted,
  playerTheme = 'blue',
}) => {
  const item = SECTION_E_DATA[questionIndex];
  const [showRuleReminder, setShowRuleReminder] = useState(false);

  // Split sentence around blank
  const parts = item.sentence.split('___');

  return (
    <div className="flex flex-col gap-3.5">
      {/* Grammar Reminder Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs text-[#78350f] font-semibold">
          <PixelSprite name="fashion_rabbit" size={20} />
          <span>Tap "in" or "with" to answer:</span>
        </div>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setShowRuleReminder(!showRuleReminder);
          }}
          className="text-xs font-semibold text-[#854d0e] underline hover:text-[#5c3708] flex items-center gap-1 cursor-pointer"
        >
          <span>{showRuleReminder ? 'Hide rule helper' : 'Show rule reminder (in vs with)'}</span>
        </button>
      </div>

      {showRuleReminder && (
        <div className="bg-[#fef9c3] border-2 border-[#ca8a04] p-3 text-xs text-[#713f12] animate-in fade-in">
          <div className="font-bold mb-1">Tailor's Rulebook:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <div className="bg-white/80 p-2 border border-[#eab308]">
              <span className="font-bold text-[#b45309]">in: </span>
              <span>Used for clothing articles (e.g. in a red dress, in a winter coat).</span>
            </div>
            <div className="bg-white/80 p-2 border border-[#eab308]">
              <span className="font-bold text-[#b45309]">with: </span>
              <span>Used for accessories, tools, luggage, or physical features (e.g. with glasses, with a ring).</span>
            </div>
          </div>
        </div>
      )}

      {/* Sentence with interactive blank */}
      <div className="pixel-parchment p-3 sm:p-5">
        <span className="font-pixel text-[10px] text-[#8b5a2b] font-bold block mb-1">
          Boutique sentence {questionIndex + 1} of {SECTION_E_DATA.length}:
        </span>
        <div className="text-sm sm:text-base font-bold text-[#381a00] leading-relaxed">
          {parts[0]}
          <span
            className={`inline-block px-3 py-0.5 mx-1.5 border-b-2 font-bold text-sm sm:text-base ${
              selectedChoice
                ? submitted
                  ? selectedChoice.toLowerCase() === item.answer
                    ? 'bg-[#bbf7d0] border-[#16a34a] text-[#14532d]'
                    : 'bg-[#fecaca] border-[#dc2626] text-[#991b1b]'
                  : playerTheme === 'blue'
                  ? 'bg-[#bfdbfe] border-[#2563eb] text-[#1d4ed8]'
                  : 'bg-[#bbf7d0] border-[#16a34a] text-[#15803d]'
                : 'bg-[#f5e6cc] border-[#8b5a2b] text-[#8b5a2b]'
            }`}
          >
            {selectedChoice ? selectedChoice : '______'}
          </span>
          {parts[1]}
        </div>
      </div>

      {/* Two Large Interactive Choice Buttons - Instant Tap! */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {(['in', 'with'] as const).map((choice) => {
          const isSelected = selectedChoice === choice;
          const isCorrect = choice === item.answer;

          let btnClass = 'bg-[#fffaf0] border-[#8b5a2b] text-[#4a2e13] hover:bg-[#fff0d6]';
          if (isSelected) {
            btnClass =
              playerTheme === 'blue'
                ? 'bg-[#2563eb] text-white border-[#1d4ed8] shadow-[0_3px_0_#1e3a8a]'
                : 'bg-[#16a34a] text-white border-[#15803d] shadow-[0_3px_0_#14532d]';
          }

          if (submitted) {
            if (isCorrect) {
              btnClass = 'bg-[#22c55e] text-white border-[#15803d] font-bold shadow-[0_3px_0_#14532d]';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-[#ef4444] text-white border-[#991b1b] opacity-80';
            } else {
              btnClass = 'bg-[#f5f5f4] text-[#a8a29e] border-[#d6d3d1] opacity-50';
            }
          }

          return (
            <button
              key={choice}
              type="button"
              disabled={submitted}
              onClick={() => {
                soundManager.playClick();
                onSelect(choice);
              }}
              className={`py-4 px-3 border-3 cursor-pointer text-center transition-all ${btnClass}`}
            >
              <span className="font-pixel text-lg sm:text-xl font-bold block">
                {choice}
              </span>
              <span className="text-xs font-semibold opacity-90 block mt-1">
                {choice === 'in' ? 'Clothing & dresses' : 'Accessories & features'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback when submitted */}
      {submitted && (
        <div
          className={`p-3 border-2 text-xs flex flex-col gap-1 mt-1 animate-in fade-in ${
            selectedChoice === item.answer
              ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
              : 'bg-[#fff1f2] border-[#e11d48] text-[#881337]'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            <PixelSprite name={selectedChoice === item.answer ? 'check' : 'cross'} size={14} />
            <span>
              Correct answer: <strong className="font-bold">{item.answer}</strong>
            </span>
          </div>
          <div>Clue: {item.focusItem}</div>
          <div className="text-[11px] opacity-90">{item.explanation}</div>
        </div>
      )}
    </div>
  );
};
