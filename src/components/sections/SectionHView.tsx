import React from 'react';
import { SECTION_H_DATA, SECTION_H_WORDS } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';

interface SectionHViewProps {
  answers: Record<number, string>; // { 1: 'sandals', 2: 'accessory', ... }
  onSetAnswer: (questionId: number, word: string) => void;
  onClearAnswer: (questionId: number) => void;
  submitted: boolean;
  playerTheme?: 'blue' | 'green';
}

export const SectionHView: React.FC<SectionHViewProps> = ({
  answers,
  onSetAnswer,
  onClearAnswer,
  submitted,
  playerTheme = 'blue',
}) => {
  const [activeQuestionId, setActiveQuestionId] = React.useState<number | null>(1);

  // List of words already placed
  const placedWords = Object.values(answers).filter(Boolean);

  const handleWordClick = (word: string) => {
    if (submitted) return;
    soundManager.playClick();
    if (activeQuestionId) {
      onSetAnswer(activeQuestionId, word);
      // Automatically advance active question to next unfilled question
      const nextUnfilled = SECTION_H_DATA.find(
        (q) => q.id !== activeQuestionId && !answers[q.id]
      );
      if (nextUnfilled) {
        setActiveQuestionId(nextUnfilled.id);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Cavern Word Bank of 6 Treasures */}
      <div className="pixel-parchment p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#78350f] flex items-center gap-1.5">
            <PixelSprite name="gem_diamond" size={14} />
            <span>Treasure vault: use each word only once</span>
          </span>
          <span className="text-[11px] font-semibold text-[#854d0e]">
            {placedWords.length} / 6 placed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTION_H_WORDS.map((word) => {
            const isUsed = placedWords.includes(word);
            return (
              <button
                key={word}
                type="button"
                disabled={submitted || isUsed}
                onClick={() => handleWordClick(word)}
                className={`py-2 px-1 text-center border-2 transition-all cursor-pointer ${
                  isUsed
                    ? 'bg-[#e5e5e5] border-[#a3a3a3] text-[#737373] opacity-50 cursor-not-allowed line-through'
                    : 'bg-[#ffebb3] border-[#b45309] text-[#4a2800] hover:bg-[#ffe082] shadow-[0_2px_0_#78350f] active:translate-y-0.5'
                }`}
              >
                <span className="font-pixel text-[10px] sm:text-xs uppercase block">
                  {word}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Sentences with Slots */}
      <div className="flex flex-col gap-2">
        {SECTION_H_DATA.map((item) => {
          const placedWord = answers[item.id] || '';
          const isCorrect = placedWord.toLowerCase() === item.answer.toLowerCase();
          const isTargeted = activeQuestionId === item.id;
          const parts = item.sentence.split('___');

          return (
            <div
              key={item.id}
              onClick={() => {
                if (!submitted) {
                  soundManager.playClick();
                  setActiveQuestionId(item.id);
                }
              }}
              className={`p-2.5 sm:p-3 border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                isTargeted && !submitted
                  ? playerTheme === 'blue'
                    ? 'bg-[#eff6ff] border-[#2563eb] ring-2 ring-[#3b82f6]'
                    : 'bg-[#f0fdf4] border-[#16a34a] ring-2 ring-[#22c55e]'
                  : 'bg-[#fffaf0] border-[#8b5a2b]'
              }`}
            >
              {/* Sentence text */}
              <div className="text-xs sm:text-sm text-[#381a00] font-medium leading-relaxed flex-1">
                <span className="font-pixel text-[9px] text-[#8b5a2b] mr-1.5">
                  #{item.id}
                </span>
                {parts[0]}
                {/* Word slot */}
                <span
                  className={`inline-block px-2.5 py-0.5 mx-1 font-pixel text-[10px] sm:text-xs uppercase border-b-2 ${
                    placedWord
                      ? submitted
                        ? isCorrect
                          ? 'bg-[#bbf7d0] border-[#16a34a] text-[#14532d]'
                          : 'bg-[#fecaca] border-[#dc2626] text-[#991b1b]'
                        : playerTheme === 'blue'
                        ? 'bg-[#bfdbfe] border-[#2563eb] text-[#1d4ed8]'
                        : 'bg-[#bbf7d0] border-[#16a34a] text-[#15803d]'
                      : 'bg-[#faeed1] border-[#8b5a2b] text-[#a8743d] border-dashed'
                  }`}
                >
                  {placedWord || '________'}
                </span>
                {parts[1]}
              </div>

              {/* Slot Actions & Chest */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {placedWord && !submitted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      onClearAnswer(item.id);
                    }}
                    className="text-[10px] font-bold text-[#dc2626] bg-[#fee2e2] px-1.5 py-0.5 border border-[#dc2626] hover:bg-[#fecaca]"
                  >
                    Remove
                  </button>
                )}

                {/* Animated Chest Reward */}
                <div title={submitted && isCorrect ? 'Chest Unlocked!' : 'Locked Chest'}>
                  <PixelSprite
                    name={submitted && isCorrect ? 'chest_open' : 'chest_closed'}
                    size={24}
                    animate={submitted && isCorrect}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <div className="bg-[#fff9ed] border-2 border-[#b45309] p-3 text-xs text-[#5c3708]">
          <span className="font-bold block mb-1">Mine Overseer's Report:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
            {SECTION_H_DATA.map((q) => (
              <div key={q.id}>
                #{q.id}: <strong className="uppercase">{q.answer}</strong> ({q.clue})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
