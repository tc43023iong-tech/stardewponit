import React from 'react';
import { SECTION_G_DATA } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';

interface SectionGAnswers {
  past: string;
  pastParticiple: string;
  presentParticiple: string;
}

interface SectionGViewProps {
  questionIndex: number; // 0 to 7 (8 verbs)
  answers: SectionGAnswers;
  onChange: (field: keyof SectionGAnswers, val: string) => void;
  submitted: boolean;
  playerTheme?: 'blue' | 'green';
}

export const SectionGView: React.FC<SectionGViewProps> = ({
  questionIndex,
  answers,
  onChange,
  submitted,
  playerTheme = 'blue',
}) => {
  const verbItem = SECTION_G_DATA[questionIndex];

  const isPastCorrect = answers.past.trim().toLowerCase() === verbItem.past.toLowerCase();
  const isPpCorrect =
    answers.pastParticiple.trim().toLowerCase() === verbItem.pastParticiple.toLowerCase();
  const isPrpCorrect =
    answers.presentParticiple.trim().toLowerCase() === verbItem.presentParticiple.toLowerCase();

  const allThreeCorrect = isPastCorrect && isPpCorrect && isPrpCorrect;

  return (
    <div className="flex flex-col gap-3">
      {/* Verb Header banner */}
      <div className="pixel-parchment p-3 sm:p-4 flex items-center justify-between">
        <div>
          <span className="font-pixel text-[9px] text-[#8b5a2b] uppercase block">
            Crop Plant {questionIndex + 1} of {SECTION_G_DATA.length}:
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-pixel text-xs text-[#78350f]">Base Verb:</span>
            <span className="font-pixel text-base sm:text-lg text-[#15803d] px-2 py-0.5 bg-[#eaf7e3] border border-[#70b05b]">
              {verbItem.base}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <PixelSprite
            name={submitted && allThreeCorrect ? 'melon' : 'sunflower'}
            size={36}
            animate={submitted && allThreeCorrect}
          />
        </div>
      </div>

      <div className="text-xs font-semibold text-[#4a2e13]">
        Transform "{verbItem.base}" into its three required grammatical forms:
      </div>

      {/* 3 Form Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Past Form */}
        <div className="bg-[#fffdf7] border-2 border-[#8b5a2b] p-2.5 flex flex-col gap-1">
          <label className="font-pixel text-[9px] text-[#78350f] uppercase">
            1. Simple Past:
          </label>
          <input
            type="text"
            disabled={submitted}
            value={answers.past}
            onChange={(e) => onChange('past', e.target.value)}
            placeholder="e.g. past tense"
            className={`w-full px-2.5 py-2 text-sm border font-medium outline-hidden transition-all ${
              submitted
                ? isPastCorrect
                  ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                  : 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'
                : playerTheme === 'blue'
                ? 'focus:border-[#2563eb] bg-white border-[#b88b4a]'
                : 'focus:border-[#16a34a] bg-white border-[#b88b4a]'
            }`}
          />
          {submitted && (
            <div className="text-[11px] font-bold mt-0.5 flex items-center justify-between">
              <span className={isPastCorrect ? 'text-[#16a34a]' : 'text-[#dc2626]'}>
                {isPastCorrect ? 'Correct!' : verbItem.past}
              </span>
              <PixelSprite name={isPastCorrect ? 'check' : 'cross'} size={12} />
            </div>
          )}
        </div>

        {/* Past Participle */}
        <div className="bg-[#fffdf7] border-2 border-[#8b5a2b] p-2.5 flex flex-col gap-1">
          <label className="font-pixel text-[9px] text-[#78350f] uppercase">
            2. Past Participle:
          </label>
          <input
            type="text"
            disabled={submitted}
            value={answers.pastParticiple}
            onChange={(e) => onChange('pastParticiple', e.target.value)}
            placeholder="e.g. have / has..."
            className={`w-full px-2.5 py-2 text-sm border font-medium outline-hidden transition-all ${
              submitted
                ? isPpCorrect
                  ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                  : 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'
                : playerTheme === 'blue'
                ? 'focus:border-[#2563eb] bg-white border-[#b88b4a]'
                : 'focus:border-[#16a34a] bg-white border-[#b88b4a]'
            }`}
          />
          {submitted && (
            <div className="text-[11px] font-bold mt-0.5 flex items-center justify-between">
              <span className={isPpCorrect ? 'text-[#16a34a]' : 'text-[#dc2626]'}>
                {isPpCorrect ? 'Correct!' : verbItem.pastParticiple}
              </span>
              <PixelSprite name={isPpCorrect ? 'check' : 'cross'} size={12} />
            </div>
          )}
        </div>

        {/* Present Participle */}
        <div className="bg-[#fffdf7] border-2 border-[#8b5a2b] p-2.5 flex flex-col gap-1">
          <label className="font-pixel text-[9px] text-[#78350f] uppercase">
            3. Present Participle:
          </label>
          <input
            type="text"
            disabled={submitted}
            value={answers.presentParticiple}
            onChange={(e) => onChange('presentParticiple', e.target.value)}
            placeholder="e.g. -ing form"
            className={`w-full px-2.5 py-2 text-sm border font-medium outline-hidden transition-all ${
              submitted
                ? isPrpCorrect
                  ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                  : 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'
                : playerTheme === 'blue'
                ? 'focus:border-[#2563eb] bg-white border-[#b88b4a]'
                : 'focus:border-[#16a34a] bg-white border-[#b88b4a]'
            }`}
          />
          {submitted && (
            <div className="text-[11px] font-bold mt-0.5 flex items-center justify-between">
              <span className={isPrpCorrect ? 'text-[#16a34a]' : 'text-[#dc2626]'}>
                {isPrpCorrect ? 'Correct!' : verbItem.presentParticiple}
              </span>
              <PixelSprite name={isPrpCorrect ? 'check' : 'cross'} size={12} />
            </div>
          )}
        </div>
      </div>

      {/* Verb Master Summary Card after submit */}
      {submitted && (
        <div
          className={`p-3 border-2 text-xs flex flex-col gap-1 ${
            allThreeCorrect
              ? 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
              : 'bg-[#fff1f2] border-[#e11d48] text-[#881337]'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            <PixelSprite name={allThreeCorrect ? 'check' : 'cross'} size={14} />
            <span>
              {allThreeCorrect
                ? 'Golden Harvest! All 3 forms are spot on.'
                : 'Review the full verb row below:'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center font-pixel text-[9px] mt-1 bg-white/70 p-2 border border-current">
            <div>
              <span className="opacity-75 block">Base</span>
              <span className="font-bold">{verbItem.base}</span>
            </div>
            <div>
              <span className="opacity-75 block">Past</span>
              <span className="font-bold">{verbItem.past}</span>
            </div>
            <div>
              <span className="opacity-75 block">Past Part.</span>
              <span className="font-bold">{verbItem.pastParticiple}</span>
            </div>
            <div>
              <span className="opacity-75 block">Pres. Part.</span>
              <span className="font-bold">{verbItem.presentParticiple}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
