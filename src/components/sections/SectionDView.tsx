import React from 'react';
import { SECTION_D_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

interface SectionDViewProps {
  questionIndex: number;
  typedSentence: string;
  onChange: (val: string) => void;
  submitted: boolean;
  isCorrect?: boolean | null;
  playerTheme?: 'blue' | 'green';
}

export const SectionDView: React.FC<SectionDViewProps> = ({
  questionIndex,
  typedSentence,
  onChange,
  submitted,
  isCorrect,
  playerTheme = 'blue',
}) => {
  const item = SECTION_D_DATA[questionIndex];

  return (
    <div className="flex flex-col gap-3">
      {/* Two Forest Sentence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-[#f2fcf5] border-2 border-[#6ee7b7] p-3 shadow-xs">
          <span className="font-pixel text-[9px] text-[#059669] uppercase block mb-1">
            Sentence 1:
          </span>
          <p className="text-sm sm:text-base font-bold text-[#064e3b]">
            "{item.sentence1}"
          </p>
        </div>

        <div className="bg-[#f2fcf5] border-2 border-[#6ee7b7] p-3 shadow-xs">
          <span className="font-pixel text-[9px] text-[#059669] uppercase block mb-1">
            Sentence 2:
          </span>
          <p className="text-sm sm:text-base font-bold text-[#064e3b]">
            "{item.sentence2}"
          </p>
        </div>
      </div>

      <div className="bg-[#ecfdf5] border border-[#a7f3d0] p-2.5 text-xs text-[#065f46]">
        Combine both sentences into one complete sentence using the word{' '}
        <span className="font-bold underline">WHO</span>.
      </div>

      {/* Typing box */}
      <div className="flex flex-col gap-1.5">
        <label className="font-pixel text-[9px] text-[#065f46] uppercase">
          Your Combined Sentence:
        </label>
        <textarea
          rows={2}
          disabled={submitted}
          value={typedSentence}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`e.g. ${item.modelAnswer}`}
          className={`w-full px-3 py-2 text-sm sm:text-base border-2 font-medium outline-hidden transition-all resize-none ${
            playerTheme === 'blue'
              ? 'focus:border-[#2563eb] focus:bg-[#eff6ff]'
              : 'focus:border-[#16a34a] focus:bg-[#f0fdf4]'
          } ${
            submitted
              ? isCorrect
                ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                : 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'
              : 'bg-white border-[#8b5a2b] text-[#2b2b2b]'
          }`}
        />
      </div>

      {/* Model Answer & Grammar breakdown */}
      {submitted && (
        <div
          className={`p-3 border-2 text-xs flex flex-col gap-1.5 ${
            isCorrect
              ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
              : 'bg-[#fff1f2] border-[#e11d48] text-[#881337]'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            <PixelSprite name={isCorrect ? 'check' : 'cross'} size={14} />
            <span>{isCorrect ? 'Magical connection made!' : 'Close attempt!'}</span>
          </div>
          <div>
            <span className="font-semibold">Model Answer: </span>
            <span className="font-bold italic">"{item.modelAnswer}"</span>
          </div>
          <div className="text-[11px] opacity-90">
            {item.hint}
          </div>
        </div>
      )}
    </div>
  );
};
