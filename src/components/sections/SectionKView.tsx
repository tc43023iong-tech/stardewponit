import React from 'react';
import { SECTION_K_WORDS } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

export interface SectionKAnswers {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
}

interface SectionKViewProps {
  answers: SectionKAnswers;
  onChange: (blankIdx: 1 | 2 | 3 | 4 | 5 | 6 | 7, val: string) => void;
  submitted: boolean;
  playerTheme?: 'blue' | 'green';
}

export const SectionKView: React.FC<SectionKViewProps> = ({
  answers,
  onChange,
  submitted,
  playerTheme = 'blue',
}) => {
  // Validation checks for the 7 blanks
  const check1 = answers[1].trim().toLowerCase() === 'noisily';
  const check2 = answers[2].trim().toLowerCase() === 'should';
  const check3 = answers[3].trim().toLowerCase() === 'quickly';
  const check4 = answers[4].trim().toLowerCase() === 'carelessly';
  const check5 = answers[5].trim().toLowerCase() === 'quietly';
  const check6 =
    answers[6].trim().toLowerCase() === "shouldn't" ||
    answers[6].trim().toLowerCase() === 'should not' ||
    answers[6].trim().toLowerCase() === 'shouldnt';
  const check7 = answers[7].trim().toLowerCase() === 'should';

  const checks = {
    1: check1,
    2: check2,
    3: check3,
    4: check4,
    5: check5,
    6: check6,
    7: check7,
  };

  const renderInput = (blankIdx: 1 | 2 | 3 | 4 | 5 | 6 | 7, placeholder: string, widthClass = 'w-24') => {
    const isBlankCorrect = checks[blankIdx];
    return (
      <span className="inline-flex items-center mx-1 align-middle">
        <input
          type="text"
          disabled={submitted}
          value={answers[blankIdx]}
          onChange={(e) => onChange(blankIdx, e.target.value)}
          placeholder={placeholder}
          className={`h-7 px-1.5 text-xs font-bold text-center border-2 outline-hidden ${widthClass} ${
            submitted
              ? isBlankCorrect
                ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                : 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'
              : playerTheme === 'blue'
              ? 'bg-white border-[#2563eb] text-[#1e3a8a]'
              : 'bg-white border-[#16a34a] text-[#14532d]'
          }`}
        />
        {submitted && (
          <span className="ml-0.5">
            <PixelSprite name={isBlankCorrect ? 'check' : 'cross'} size={12} />
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Cottage Word Bank */}
      <div className="pixel-parchment p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-pixel text-[9px] text-[#78350f] uppercase">
            Fox Cottage Word Bank:
          </span>
          <span className="text-[10px] text-[#854d0e]">
            Transform into adverbs or use SHOULD / SHOULDN'T
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SECTION_K_WORDS.map((w) => (
            <span
              key={w}
              className="font-pixel text-[9px] bg-[#fff8e7] px-2 py-1 border border-[#b45309] text-[#4a2800]"
            >
              {w}
            </span>
          ))}
          <span className="font-pixel text-[9px] bg-[#e0f2fe] px-2 py-1 border border-[#0284c7] text-[#0369a1]">
            should / shouldn't
          </span>
        </div>
      </div>

      {/* Illustrated Dialogue Area */}
      <div className="bg-[#5a3b20] p-3 border-3 border-[#361f0d] flex flex-col gap-3 max-h-[460px] overflow-y-auto">
        {/* Line 1 - Fox A */}
        <div className="flex items-start gap-2.5">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#faeed1] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#c2410c] block mb-0.5">Fox A</span>
            What are we doing in our home?
          </div>
        </div>

        {/* Line 2 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            Shh! You should not speak (1) {renderInput(1, '(1)', 'w-24')} (noisy). Our family is resting nearby!
          </div>
        </div>

        {/* Line 3 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            We need to tidy the living room. Hurry, you (2) {renderInput(2, '(2)', 'w-20')} move (3) {renderInput(3, '(3)', 'w-24')} (quick).
          </div>
        </div>

        {/* Line 4 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            We don’t want to behave (4) {renderInput(4, '(4)', 'w-26')} (careless) and knock over the flower vase.
          </div>
        </div>

        {/* Line 5 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            You should walk (5) {renderInput(5, '(5)', 'w-24')} (quiet), or our family will hear us.
          </div>
        </div>

        {/* Line 6 - Fox A */}
        <div className="flex items-start gap-2.5">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#faeed1] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#c2410c] block mb-0.5">Fox A</span>
            Hand over that big cushion to me right now!
          </div>
        </div>

        {/* Line 7 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            You (6) {renderInput(6, '(6)', 'w-24')} speak rudely to me.
          </div>
        </div>

        {/* Line 8 - Fox A */}
        <div className="flex items-start gap-2.5">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#faeed1] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#c2410c] block mb-0.5">Fox A</span>
            I’m sorry! I (7) {renderInput(7, '(7)', 'w-20')} ask politely. May I please have that cushion?
          </div>
        </div>

        {/* Line 9 - Fox B */}
        <div className="flex items-start gap-2.5 flex-row-reverse self-end">
          <div className="w-10 h-10 bg-[#ea580c] p-1 border-2 border-[#fff] shrink-0">
            <PixelSprite name="foxes" size={30} />
          </div>
          <div className="bg-[#fff9ed] p-2.5 border-2 border-[#8b5a2b] shadow-xs text-xs text-[#381a00] max-w-md">
            <span className="font-pixel text-[9px] text-[#b45309] block mb-0.5">Fox B</span>
            Of course! Here you go.
          </div>
        </div>
      </div>

      {/* Answer key summary if submitted */}
      {submitted && (
        <div className="bg-[#fff9ed] border-2 border-[#b45309] p-3 text-xs text-[#5c3708]">
          <span className="font-bold block mb-1">Cottage Tidy Mission Solution:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
            <div>(1) <strong>noisily</strong></div>
            <div>(2) <strong>should</strong></div>
            <div>(3) <strong>quickly</strong></div>
            <div>(4) <strong>carelessly</strong></div>
            <div>(5) <strong>quietly</strong></div>
            <div>(6) <strong>shouldn't</strong></div>
            <div>(7) <strong>should</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};
