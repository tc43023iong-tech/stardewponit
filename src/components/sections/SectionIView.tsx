import React from 'react';
import { SECTION_I_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

interface SectionIViewProps {
  questionIndex: number;
  typedTranslation: string;
  onChange: (val: string) => void;
  submitted: boolean;
  isCorrect?: boolean | null;
  playerTheme?: 'blue' | 'green';
}

export const SectionIView: React.FC<SectionIViewProps> = ({
  questionIndex,
  typedTranslation,
  onChange,
  submitted,
  isCorrect,
  playerTheme = 'blue',
}) => {
  const item = SECTION_I_DATA[questionIndex];

  return (
    <div className="flex flex-col gap-3">
      {/* Source Language Card */}
      <div className="pixel-parchment p-3 sm:p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="font-pixel text-[9px] text-[#8b5a2b] uppercase">
            Scroll {questionIndex + 1} of {SECTION_I_DATA.length} (
            {item.type === 'EN_TO_ZH' ? 'English → Traditional Chinese' : 'Traditional Chinese → English'})
          </span>
          <span className="text-[11px] font-semibold text-[#854d0e] bg-[#faeed1] px-2 py-0.5 border border-[#8b5a2b]">
            {item.type === 'EN_TO_ZH' ? 'EN → 中文' : '中文 → EN'}
          </span>
        </div>

        <p className="text-sm sm:text-lg font-bold text-[#381a00] leading-snug mt-1">
          "{item.prompt}"
        </p>
      </div>

      {/* Typing box */}
      <div className="flex flex-col gap-1.5">
        <label className="font-pixel text-[9px] text-[#78350f] uppercase">
          {item.type === 'EN_TO_ZH'
            ? 'Type your Traditional Chinese translation (繁體中文):'
            : 'Type your English translation:'}
        </label>
        <textarea
          rows={2}
          disabled={submitted}
          value={typedTranslation}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            item.type === 'EN_TO_ZH'
              ? '例如：那個戴眼鏡的男生是誰？'
              : 'e.g. Who is the boy in the black suit?'
          }
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

      {/* Feedback & Model translation */}
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
            <span>{isCorrect ? 'Accurate translation!' : 'Good effort!'}</span>
          </div>
          <div>
            <span className="font-semibold">Suggested Translation: </span>
            <span className="font-bold italic text-sm">"{item.modelAnswer}"</span>
          </div>
          <div className="text-[11px] opacity-90 mt-0.5">
            Key points: {item.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
