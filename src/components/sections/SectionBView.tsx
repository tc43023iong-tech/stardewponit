import React from 'react';
import { SECTION_B_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

interface SectionBViewProps {
  questionIndex: number;
  typedAnswer: string;
  onChange: (val: string) => void;
  submitted: boolean;
  isCorrect?: boolean | null;
  playerTheme?: 'blue' | 'green';
}

export const SectionBView: React.FC<SectionBViewProps> = ({
  questionIndex,
  typedAnswer,
  onChange,
  submitted,
  isCorrect,
  playerTheme = 'blue',
}) => {
  const item = SECTION_B_DATA[questionIndex];

  // Helper to highlight the incorrect word in the sentence
  const renderSentenceWithHighlight = () => {
    if (!submitted) {
      return item.sentence;
    }
    const regex = new RegExp(`\\b(${item.errorWord})\\b`, 'i');
    const parts = item.sentence.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === item.errorWord.toLowerCase() ? (
            <span
              key={i}
              className="bg-[#fecaca] text-[#991b1b] line-through px-1 font-bold rounded-xs border border-[#dc2626]"
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Wood Carpenter Board with the sentence */}
      <div className="pixel-parchment p-3 sm:p-4">
        <span className="font-pixel text-[9px] text-[#8b5a2b] uppercase block mb-1">
          Blueprint Sentence {questionIndex + 1} of {SECTION_B_DATA.length}:
        </span>
        <p className="text-sm sm:text-base font-bold text-[#381a00] leading-relaxed">
          "{renderSentenceWithHighlight()}"
        </p>
      </div>

      <div className="bg-[#fff9ed] p-2.5 border border-[#c28410] text-xs text-[#5c3708]">
        Hint: Find the one grammatically incorrect word and type its correct replacement below.
      </div>

      {/* Answer Input Box */}
      <div className="flex flex-col gap-1.5">
        <label className="font-pixel text-[9px] text-[#78350f] uppercase">
          Type the correct word:
        </label>
        <div className="relative">
          <input
            type="text"
            disabled={submitted}
            value={typedAnswer}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type correct word here..."
            className={`w-full px-3 py-2.5 text-sm sm:text-base border-2 font-medium outline-hidden transition-all ${
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
          {submitted && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <PixelSprite name={isCorrect ? 'check' : 'cross'} size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Result feedback and corrected sentence */}
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
            <span>
              {isCorrect ? 'Well crafted!' : 'Blueprints corrected!'} Mistake:{' '}
              <span className="line-through">{item.errorWord}</span> →{' '}
              <span className="font-extrabold underline">{item.correctWord}</span>
            </span>
          </div>
          <div>
            <span className="font-semibold">Corrected Sentence: </span>
            <span className="italic font-medium">"{item.correctedSentence}"</span>
          </div>
          <div className="text-[11px] opacity-90 mt-0.5">
            Rule: {item.ruleExplanation}
          </div>
        </div>
      )}
    </div>
  );
};
