import React, { useState, useEffect } from 'react';
import { SectionId, UserSavedData } from '../../types/game';
import { LEVEL_DEFINITIONS } from '../../data/gameData';
import { PixelSprite } from '../common/PixelSprite';
import { GameAtmosphere } from '../common/GameAtmosphere';
import { soundManager } from '../../utils/sound';
import { evaluateSectionAnswer } from '../../utils/answerChecker';

// Section Views
import { SectionAView } from '../sections/SectionAView';
import { SectionBView } from '../sections/SectionBView';
import { SectionDView } from '../sections/SectionDView';
import { SectionEView } from '../sections/SectionEView';
import { SectionGView } from '../sections/SectionGView';
import { SectionHView } from '../sections/SectionHView';
import { SectionIView } from '../sections/SectionIView';
import { SectionKView, SectionKAnswers } from '../sections/SectionKView';

interface SinglePlayerGameProps {
  sectionId: SectionId;
  userData: UserSavedData;
  onFinishLevel: (stars: number, scoreGained: number) => void;
  onExit: () => void;
}

export const SinglePlayerGame: React.FC<SinglePlayerGameProps> = ({
  sectionId,
  userData,
  onFinishLevel,
  onExit,
}) => {
  const levelDef = LEVEL_DEFINITIONS[sectionId];
  const [qIndex, setQIndex] = useState(0);

  // Score & status
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lastScoreGained, setLastScoreGained] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Independent question answers
  const [answerA, setAnswerA] = useState<string | null>(null);
  const [answerB, setAnswerB] = useState<string>('');
  const [answerD, setAnswerD] = useState<string>('');
  const [answerE, setAnswerE] = useState<'in' | 'with' | null>(null);
  const [answerG, setAnswerG] = useState<{ past: string; pastParticiple: string; presentParticiple: string }>({
    past: '',
    pastParticiple: '',
    presentParticiple: '',
  });
  const [answerH, setAnswerH] = useState<Record<number, string>>({});
  const [answerI, setAnswerI] = useState<string>('');
  const [answerK, setAnswerK] = useState<SectionKAnswers>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
  });

  // Timer loop
  useEffect(() => {
    if (isSubmitted || isGameOver) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, isGameOver]);

  // Reset inputs when question index changes
  const resetQuestionInputs = () => {
    setIsSubmitted(false);
    setIsCorrect(null);
    setTimerSeconds(0);
    setLastScoreGained(0);
    setAnswerA(null);
    setAnswerB('');
    setAnswerD('');
    setAnswerE(null);
    setAnswerG({ past: '', pastParticiple: '', presentParticiple: '' });
    setAnswerI('');
  };

  // Instant evaluation handler (NO separate submit button!)
  const triggerInstantEvaluation = (providedAnswer: any) => {
    if (isSubmitted) return;
    const result = evaluateSectionAnswer(sectionId, qIndex, providedAnswer, timerSeconds);

    setIsSubmitted(true);
    setIsCorrect(result.isCorrect);
    setLastScoreGained(result.scoreGained);
    setScore((prev) => prev + result.scoreGained);

    if (result.isCorrect) {
      soundManager.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      soundManager.playIncorrect();
    }
  };

  // Instant Tap for Section A
  const handleSelectA = (key: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setAnswerA(key);
    triggerInstantEvaluation(key);
  };

  // Instant Tap for Section E
  const handleSelectE = (choice: 'in' | 'with') => {
    if (isSubmitted) return;
    soundManager.playClick();
    setAnswerE(choice);
    triggerInstantEvaluation(choice);
  };

  const handleNext = () => {
    soundManager.playClick();
    // Sections H and K are full-screen single-stage exercises
    if (sectionId === 'H' || sectionId === 'K') {
      setIsGameOver(true);
      soundManager.playVictory();
      return;
    }

    if (qIndex + 1 < levelDef.totalQuestions) {
      setQIndex((prev) => prev + 1);
      resetQuestionInputs();
    } else {
      setIsGameOver(true);
      soundManager.playVictory();
    }
  };

  // Calculate final stars
  const calculateStars = () => {
    const totalQ = sectionId === 'H' ? 6 : sectionId === 'K' ? 7 : levelDef.totalQuestions;
    const finalCorrect = sectionId === 'H' || sectionId === 'K' ? Math.round(score / 10) : correctCount;
    const ratio = finalCorrect / totalQ;
    if (ratio >= 0.85) return 3;
    if (ratio >= 0.6) return 2;
    if (ratio >= 0.3) return 1;
    return 0;
  };

  const handleFinishAndSave = () => {
    const stars = calculateStars();
    onFinishLevel(stars, score);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 flex flex-col gap-4">
      {/* Top HUD Bar */}
      <div className="pixel-wood-box p-3 flex items-center justify-between gap-3">
        {/* Left: Section & Character info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#faeed1] border-2 border-[#7c4f24] flex items-center justify-center shrink-0">
            <PixelSprite name={levelDef.character.avatarType} size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#b45309]">
                {levelDef.sectionCode}
              </span>
              <span className="text-xs text-[#78350f] font-medium hidden sm:inline">·</span>
              <span className="font-bold text-xs text-[#4a2e13]">
                {levelDef.name}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#854d0e]">
              {levelDef.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Score, Timer & Exit Button */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-[#ecd4a4] px-2.5 py-1 border border-[#8b5a2b]">
            <PixelSprite name="coin_gold" size={16} />
            <span className="font-bold text-xs text-[#4a2800]">{score} pts</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-[#ecd4a4] px-2.5 py-1 border border-[#8b5a2b]">
            <span className="font-bold text-xs text-[#5c3708]">{timerSeconds}s</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onExit();
            }}
            className="text-xs font-semibold text-[#854d0e] hover:text-[#4a2800] underline px-2 py-1 cursor-pointer"
          >
            Exit to map
          </button>
        </div>
      </div>

      {/* Rich Stardew Farm Atmosphere Header: fence, hen, rabbit, sunflowers, speech bubble */}
      <GameAtmosphere
        characterName={levelDef.character.name}
        characterRole={levelDef.character.role}
        avatarType={levelDef.character.avatarType}
        characterSpeech={levelDef.character.greeting}
        sectionTitle={levelDef.name}
        subtitle={levelDef.instruction}
      />

      {/* Progress Bar */}
      {sectionId !== 'H' && sectionId !== 'K' && (
        <div className="w-full bg-[#3d2511] p-1 border-2 border-[#5a3818]">
          <div
            className="bg-[#22c55e] h-2.5 transition-all duration-300"
            style={{
              width: `${((qIndex + (isSubmitted ? 1 : 0)) / levelDef.totalQuestions) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Main Play Area */}
      {!isGameOver ? (
        <div className="pixel-wood-box p-4 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
          {/* Section Specific Interactive Component */}
          {sectionId === 'A' && (
            <SectionAView
              questionIndex={qIndex}
              selectedKey={answerA}
              onSelect={handleSelectA}
              submitted={isSubmitted}
              playerTheme="blue"
            />
          )}

          {sectionId === 'B' && (
            <div className="flex flex-col gap-3">
              <SectionBView
                questionIndex={qIndex}
                typedAnswer={answerB}
                onChange={setAnswerB}
                submitted={isSubmitted}
                isCorrect={isCorrect}
                playerTheme="blue"
              />
              {!isSubmitted && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!answerB.trim()}
                    onClick={() => triggerInstantEvaluation(answerB)}
                    className="pixel-btn-blue px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Check word →
                  </button>
                </div>
              )}
            </div>
          )}

          {sectionId === 'D' && (
            <div className="flex flex-col gap-3">
              <SectionDView
                questionIndex={qIndex}
                typedSentence={answerD}
                onChange={setAnswerD}
                submitted={isSubmitted}
                isCorrect={isCorrect}
                playerTheme="blue"
              />
              {!isSubmitted && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!answerD.trim()}
                    onClick={() => triggerInstantEvaluation(answerD)}
                    className="pixel-btn-green px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Check sentence →
                  </button>
                </div>
              )}
            </div>
          )}

          {sectionId === 'E' && (
            <SectionEView
              questionIndex={qIndex}
              selectedChoice={answerE}
              onSelect={handleSelectE}
              submitted={isSubmitted}
              playerTheme="blue"
            />
          )}

          {sectionId === 'G' && (
            <div className="flex flex-col gap-3">
              <SectionGView
                questionIndex={qIndex}
                answers={answerG}
                onChange={(field, val) => setAnswerG((prev) => ({ ...prev, [field]: val }))}
                submitted={isSubmitted}
                playerTheme="blue"
              />
              {!isSubmitted && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!answerG.past.trim() || !answerG.pastParticiple.trim() || !answerG.presentParticiple.trim()}
                    onClick={() => triggerInstantEvaluation(answerG)}
                    className="pixel-btn-gold px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Harvest verb forms →
                  </button>
                </div>
              )}
            </div>
          )}

          {sectionId === 'H' && (
            <div className="flex flex-col gap-3">
              <SectionHView
                answers={answerH}
                onSetAnswer={(id, word) => {
                  const updated = { ...answerH, [id]: word };
                  setAnswerH(updated);
                  if (Object.keys(updated).length === 6) {
                    triggerInstantEvaluation(updated);
                  }
                }}
                onClearAnswer={(id) =>
                  setAnswerH((prev) => {
                    const updated = { ...prev };
                    delete updated[id];
                    return updated;
                  })
                }
                submitted={isSubmitted}
                playerTheme="blue"
              />
            </div>
          )}

          {sectionId === 'I' && (
            <div className="flex flex-col gap-3">
              <SectionIView
                questionIndex={qIndex}
                typedTranslation={answerI}
                onChange={setAnswerI}
                submitted={isSubmitted}
                isCorrect={isCorrect}
                playerTheme="blue"
              />
              {!isSubmitted && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!answerI.trim()}
                    onClick={() => triggerInstantEvaluation(answerI)}
                    className="pixel-btn-blue px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Check translation →
                  </button>
                </div>
              )}
            </div>
          )}

          {sectionId === 'K' && (
            <div className="flex flex-col gap-3">
              <SectionKView
                answers={answerK}
                onChange={(idx, val) => {
                  const updated = { ...answerK, [idx]: val };
                  setAnswerK(updated);
                  const filledCount = Object.values(updated).filter((v) => v.trim()).length;
                  if (filledCount === 7) {
                    triggerInstantEvaluation(updated);
                  }
                }}
                submitted={isSubmitted}
                playerTheme="blue"
              />
              {!isSubmitted && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => triggerInstantEvaluation(answerK)}
                    className="pixel-btn-gold px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Check cottage tidy mission →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Next Question Bar (NO submit button!) */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-[#8b5a2b] mt-2">
            <div className="text-xs text-[#78350f] font-semibold">
              {sectionId !== 'H' && sectionId !== 'K' ? (
                <span>
                  Question {qIndex + 1} of {levelDef.totalQuestions}
                </span>
              ) : (
                <span>Level quest in progress</span>
              )}
            </div>

            {/* When submitted, show Next Question button */}
            {isSubmitted && (
              <button
                type="button"
                onClick={handleNext}
                className="pixel-btn-gold px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wide cursor-pointer flex items-center gap-2 animate-in fade-in"
              >
                <span>
                  {sectionId === 'H' ||
                  sectionId === 'K' ||
                  qIndex + 1 === levelDef.totalQuestions
                    ? 'View Final Results →'
                    : 'Next Question →'}
                </span>
                <PixelSprite name="check" size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Victory Screen */
        <div className="pixel-wood-box p-6 sm:p-8 flex flex-col items-center text-center gap-5 max-w-xl mx-auto w-full animate-in zoom-in-95">
          <div className="w-16 h-16 bg-[#ffd885] border-3 border-[#8b5a2b] flex items-center justify-center p-2 shadow-md">
            <PixelSprite name="trophy" size={44} animate={true} />
          </div>

          <div>
            <span className="text-xs font-bold text-[#b45309] block">
              Mission completed!
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#4a2800] mt-1">
              {levelDef.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f] mt-1">
              You showed great English grammar and vocabulary mastery!
            </p>
          </div>

          {/* Stars Awarded */}
          <div className="flex items-center gap-3 bg-[#ecd4a4] p-3 border-2 border-[#8b5a2b]">
            {[1, 2, 3].map((starIdx) => (
              <PixelSprite
                key={starIdx}
                name={starIdx <= calculateStars() ? 'star_full' : 'star_empty'}
                size={32}
                animate={starIdx <= calculateStars()}
              />
            ))}
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            <div className="bg-[#fff9ed] p-3 border border-[#b45309]">
              <span className="text-xs text-[#854d0e] font-semibold block">Total points</span>
              <span className="font-pixel text-base text-[#15803d]">+{score}</span>
            </div>
            <div className="bg-[#fff9ed] p-3 border border-[#b45309]">
              <span className="text-xs text-[#854d0e] font-semibold block">Gold earned</span>
              <span className="font-pixel text-base text-[#d97706]">+{Math.max(20, score)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setQIndex(0);
                setScore(0);
                setCorrectCount(0);
                setIsGameOver(false);
                resetQuestionInputs();
              }}
              className="pixel-btn-blue flex-1 py-2.5 font-bold text-xs cursor-pointer"
            >
              Retry Mission
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                handleFinishAndSave();
              }}
              className="pixel-btn-gold flex-1 py-2.5 font-bold text-xs cursor-pointer"
            >
              Save & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
