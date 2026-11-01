import React, { useState, useEffect } from 'react';
import { SectionId, UserSavedData } from '../../types/game';
import { LEVEL_DEFINITIONS } from '../../data/gameData';
import { TWO_PLAYER_MCQ_DATA, MCQQuestion } from '../../data/twoPlayerMCQData';
import { PixelSprite } from '../common/PixelSprite';
import { soundManager } from '../../utils/sound';

interface SplitScreenGameProps {
  sectionId: SectionId;
  userData: UserSavedData;
  onFinishLevel: (stars: number, scoreGained: number) => void;
  onExit: () => void;
}

export const SplitScreenGame: React.FC<SplitScreenGameProps> = ({
  sectionId,
  userData,
  onFinishLevel,
  onExit,
}) => {
  const levelDef = LEVEL_DEFINITIONS[sectionId];
  const questions: MCQQuestion[] = TWO_PLAYER_MCQ_DATA[sectionId] || [];
  const [qIndex, setQIndex] = useState(0);
  const currentQ = questions[qIndex] || questions[0];

  const [isGameOver, setIsGameOver] = useState(false);

  // Timers for each player
  const [p1Timer, setP1Timer] = useState(0);
  const [p2Timer, setP2Timer] = useState(0);

  // Player 1 Independent State
  const [p1Score, setP1Score] = useState(0);
  const [p1CorrectCount, setP1CorrectCount] = useState(0);
  const [p1SelectedKey, setP1SelectedKey] = useState<string | null>(null);
  const [p1Submitted, setP1Submitted] = useState(false);
  const [p1IsCorrect, setP1IsCorrect] = useState<boolean | null>(null);
  const [p1SpeedBonus, setP1SpeedBonus] = useState(false);

  // Player 2 Independent State
  const [p2Score, setP2Score] = useState(0);
  const [p2CorrectCount, setP2CorrectCount] = useState(0);
  const [p2SelectedKey, setP2SelectedKey] = useState<string | null>(null);
  const [p2Submitted, setP2Submitted] = useState(false);
  const [p2IsCorrect, setP2IsCorrect] = useState<boolean | null>(null);
  const [p2SpeedBonus, setP2SpeedBonus] = useState(false);

  // Timer loop
  useEffect(() => {
    if (p1Submitted && p2Submitted) return;
    const interval = setInterval(() => {
      if (!p1Submitted) setP1Timer((t) => t + 1);
      if (!p2Submitted) setP2Timer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [p1Submitted, p2Submitted]);

  // Both submitted check
  const bothSubmitted = p1Submitted && p2Submitted;

  useEffect(() => {
    if (bothSubmitted && p1IsCorrect === null && p2IsCorrect === null) {
      const correctKey = currentQ.correctKey;
      const res1Correct = p1SelectedKey === correctKey;
      const res2Correct = p2SelectedKey === correctKey;

      let s1 = res1Correct ? 10 : 0;
      let s2 = res2Correct ? 10 : 0;
      let p1Bonus = false;
      let p2Bonus = false;

      // Speed bonus: faster player gets +5 if both are correct
      if (res1Correct && res2Correct) {
        if (p1Timer < p2Timer) {
          s1 += 5;
          p1Bonus = true;
        } else if (p2Timer < p1Timer) {
          s2 += 5;
          p2Bonus = true;
        }
      }

      setP1IsCorrect(res1Correct);
      setP2IsCorrect(res2Correct);
      setP1SpeedBonus(p1Bonus);
      setP2SpeedBonus(p2Bonus);

      setP1Score((s) => s + s1);
      setP2Score((s) => s + s2);

      if (res1Correct) setP1CorrectCount((c) => c + 1);
      if (res2Correct) setP2CorrectCount((c) => c + 1);

      if (res1Correct || res2Correct) {
        soundManager.playCorrect();
      } else {
        soundManager.playIncorrect();
      }
    }
  }, [bothSubmitted, currentQ]);

  // INSTANT TAP FOR PLAYER 1: No submit button needed!
  const handleP1Tap = (key: string) => {
    if (p1Submitted) return;
    soundManager.playClick();
    setP1SelectedKey(key);
    setP1Submitted(true);
  };

  // INSTANT TAP FOR PLAYER 2: No submit button needed!
  const handleP2Tap = (key: string) => {
    if (p2Submitted) return;
    soundManager.playClick();
    setP2SelectedKey(key);
    setP2Submitted(true);
  };

  const handleNextTogether = () => {
    soundManager.playClick();
    if (qIndex + 1 < questions.length) {
      setQIndex((prev) => prev + 1);
      // Reset for next question
      setP1SelectedKey(null);
      setP2SelectedKey(null);
      setP1Submitted(false);
      setP2Submitted(false);
      setP1IsCorrect(null);
      setP2IsCorrect(null);
      setP1Timer(0);
      setP2Timer(0);
      setP1SpeedBonus(false);
      setP2SpeedBonus(false);
    } else {
      setIsGameOver(true);
      soundManager.playVictory();
    }
  };

  const getWinner = () => {
    if (p1Score > p2Score) return 'Player 1 (Blue Farmer) wins!';
    if (p2Score > p1Score) return 'Player 2 (Green Farmer) wins!';
    return "It's an honorable tie! Both are champions!";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 flex flex-col gap-3">
      {/* Decorative Top Scene Strip */}
      <div className="relative bg-[#5b7f3d] p-2.5 border-3 border-[#364f22] overflow-hidden shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center -space-x-1">
            <PixelSprite name="sunflower" size={22} />
            <PixelSprite name="chicken" size={20} animate={true} />
          </div>
          <div>
            <span className="font-pixel text-[11px] text-[#fff9db] font-bold block">
              {levelDef.sectionCode}: {levelDef.name}
            </span>
            <span className="text-xs text-[#d9f99d] font-semibold">
              Question {qIndex + 1} of {questions.length} · Tap any choice to lock answer!
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1">
            <PixelSprite name="rabbit" size={20} animate={true} />
            <PixelSprite name="melon" size={20} />
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onExit();
            }}
            className="text-xs font-semibold text-[#fef08a] hover:text-white underline cursor-pointer"
          >
            Exit to map
          </button>
        </div>
      </div>

      {!isGameOver ? (
        <div className="flex flex-col gap-3">
          {/* Synchronous Split Screen Grid: Equal Left & Right vertical panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
            {/* ===================== LEFT: PLAYER 1 (BLUE) ===================== */}
            <div className="pixel-wood-box p-4 border-4 border-[#1e40af] flex flex-col justify-between gap-3 bg-[#f0f7ff]">
              {/* Player 1 HUD */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#93c5fd]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#bfdbfe] border-2 border-[#2563eb] flex items-center justify-center shrink-0">
                    <PixelSprite name="player1" size={26} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#1e3a8a] block">Player 1</span>
                    <span className="text-[11px] text-[#2563eb] font-medium">Blue Farmer</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-[#1e40af] bg-[#dbeafe] px-2 py-0.5 border border-[#93c5fd]">
                    {p1Timer}s
                  </span>
                  <div className="flex items-center gap-1 bg-[#dbeafe] px-2 py-0.5 border border-[#93c5fd]">
                    <PixelSprite name="coin_gold" size={14} />
                    <span className="font-bold text-xs text-[#1e3a8a]">{p1Score} pts</span>
                  </div>
                </div>
              </div>

              {/* Progress bar P1 */}
              <div className="w-full bg-[#cbd5e1] h-2 border border-[#94a3b8] overflow-hidden">
                <div
                  className="bg-[#2563eb] h-full transition-all duration-300"
                  style={{
                    width: `${((qIndex + (p1Submitted ? 1 : 0)) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Situation / Prompt Card */}
              <div className="pixel-parchment p-3">
                <span className="font-bold text-[11px] text-[#1e40af] block mb-1">
                  Question {qIndex + 1}:
                </span>
                <p className="text-sm font-bold text-[#1e3a8a] leading-snug">
                  "{currentQ.prompt}"
                </p>
                {currentQ.subPrompt && (
                  <p className="text-xs text-[#3b82f6] font-semibold mt-1">
                    {currentQ.subPrompt}
                  </p>
                )}
              </div>

              {/* Player 1 Multiple Choice Options - Tap Instantly! */}
              <div className="flex flex-col gap-2">
                {currentQ.options.map((opt) => {
                  const isSelected = p1SelectedKey === opt.key;
                  const isCorrectChoice = opt.key === currentQ.correctKey;

                  let optClass = 'bg-[#fffaf0] border-[#93c5fd] text-[#1e3a8a] hover:bg-[#dbeafe]';
                  if (isSelected) {
                    optClass = 'bg-[#2563eb] text-white border-[#1d4ed8] shadow-[0_3px_0_#1e3a8a]';
                  }

                  if (bothSubmitted) {
                    if (isCorrectChoice) {
                      optClass = 'bg-[#22c55e] text-white border-[#15803d] font-bold shadow-[0_3px_0_#14532d]';
                    } else if (isSelected && !isCorrectChoice) {
                      optClass = 'bg-[#ef4444] text-white border-[#991b1b] opacity-80';
                    } else {
                      optClass = 'bg-[#f1f5f9] text-[#94a3b8] border-[#cbd5e1] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={p1Submitted}
                      onClick={() => handleP1Tap(opt.key)}
                      className={`p-2.5 sm:p-3 border-2 text-left cursor-pointer transition-all flex items-start gap-2.5 rounded-xs ${optClass}`}
                    >
                      <span
                        className={`font-pixel text-xs px-2 py-0.5 border shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#1d4ed8] text-white border-[#172554]'
                            : 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold leading-snug flex-1">
                        {opt.text}
                      </span>
                      {bothSubmitted && isCorrectChoice && (
                        <PixelSprite name="check" size={16} className="mt-0.5" />
                      )}
                      {bothSubmitted && isSelected && !isCorrectChoice && (
                        <PixelSprite name="cross" size={16} className="mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Player 1 Status Indicator (No separate submit button!) */}
              <div className="pt-2 border-t border-[#bfdbfe]">
                {!p1Submitted ? (
                  <div className="text-xs text-[#2563eb] font-semibold text-center py-1">
                    Tap your choice above to answer!
                  </div>
                ) : !bothSubmitted ? (
                  <div className="bg-[#dbeafe] border-2 border-[#60a5fa] p-2 text-center flex items-center justify-center gap-2 animate-pulse">
                    <PixelSprite name="chicken" size={20} animate={true} />
                    <span className="font-semibold text-xs text-[#1e40af]">
                      Choice locked! Waiting for Player 2...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-bold text-[#1e3a8a] bg-[#dbeafe] p-2 border border-[#93c5fd]">
                    <div className="flex items-center gap-1.5">
                      <PixelSprite name={p1IsCorrect ? 'check' : 'cross'} size={16} />
                      <span>{p1IsCorrect ? 'Correct! (+10 pts)' : 'Incorrect (0 pts)'}</span>
                    </div>
                    {p1SpeedBonus && (
                      <span className="text-[11px] text-[#854d0e] font-bold bg-[#fef08a] px-2 py-0.5 border border-[#eab308]">
                        +5 Speed bonus!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ===================== RIGHT: PLAYER 2 (GREEN) ===================== */}
            <div className="pixel-wood-box p-4 border-4 border-[#166534] flex flex-col justify-between gap-3 bg-[#f0fdf4]">
              {/* Player 2 HUD */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#86efac]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#bbf7d0] border-2 border-[#16a34a] flex items-center justify-center shrink-0">
                    <PixelSprite name="player2" size={26} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#14532d] block">Player 2</span>
                    <span className="text-[11px] text-[#16a34a] font-medium">Green Farmer</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-[#166534] bg-[#dcfce7] px-2 py-0.5 border border-[#86efac]">
                    {p2Timer}s
                  </span>
                  <div className="flex items-center gap-1 bg-[#dcfce7] px-2 py-0.5 border border-[#86efac]">
                    <PixelSprite name="coin_gold" size={14} />
                    <span className="font-bold text-xs text-[#14532d]">{p2Score} pts</span>
                  </div>
                </div>
              </div>

              {/* Progress bar P2 */}
              <div className="w-full bg-[#cbd5e1] h-2 border border-[#94a3b8] overflow-hidden">
                <div
                  className="bg-[#16a34a] h-full transition-all duration-300"
                  style={{
                    width: `${((qIndex + (p2Submitted ? 1 : 0)) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Situation / Prompt Card */}
              <div className="pixel-parchment p-3">
                <span className="font-bold text-[11px] text-[#15803d] block mb-1">
                  Question {qIndex + 1}:
                </span>
                <p className="text-sm font-bold text-[#14532d] leading-snug">
                  "{currentQ.prompt}"
                </p>
                {currentQ.subPrompt && (
                  <p className="text-xs text-[#16a34a] font-semibold mt-1">
                    {currentQ.subPrompt}
                  </p>
                )}
              </div>

              {/* Player 2 Multiple Choice Options - Tap Instantly! */}
              <div className="flex flex-col gap-2">
                {currentQ.options.map((opt) => {
                  const isSelected = p2SelectedKey === opt.key;
                  const isCorrectChoice = opt.key === currentQ.correctKey;

                  let optClass = 'bg-[#fffaf0] border-[#86efac] text-[#14532d] hover:bg-[#dcfce7]';
                  if (isSelected) {
                    optClass = 'bg-[#16a34a] text-white border-[#15803d] shadow-[0_3px_0_#14532d]';
                  }

                  if (bothSubmitted) {
                    if (isCorrectChoice) {
                      optClass = 'bg-[#22c55e] text-white border-[#15803d] font-bold shadow-[0_3px_0_#14532d]';
                    } else if (isSelected && !isCorrectChoice) {
                      optClass = 'bg-[#ef4444] text-white border-[#991b1b] opacity-80';
                    } else {
                      optClass = 'bg-[#f1f5f9] text-[#94a3b8] border-[#cbd5e1] opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={p2Submitted}
                      onClick={() => handleP2Tap(opt.key)}
                      className={`p-2.5 sm:p-3 border-2 text-left cursor-pointer transition-all flex items-start gap-2.5 rounded-xs ${optClass}`}
                    >
                      <span
                        className={`font-pixel text-xs px-2 py-0.5 border shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#14532d] text-white border-[#052e16]'
                            : 'bg-[#dcfce7] text-[#15803d] border-[#86efac]'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold leading-snug flex-1">
                        {opt.text}
                      </span>
                      {bothSubmitted && isCorrectChoice && (
                        <PixelSprite name="check" size={16} className="mt-0.5" />
                      )}
                      {bothSubmitted && isSelected && !isCorrectChoice && (
                        <PixelSprite name="cross" size={16} className="mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Player 2 Status Indicator (No separate submit button!) */}
              <div className="pt-2 border-t border-[#bbf7d0]">
                {!p2Submitted ? (
                  <div className="text-xs text-[#16a34a] font-semibold text-center py-1">
                    Tap your choice above to answer!
                  </div>
                ) : !bothSubmitted ? (
                  <div className="bg-[#dcfce7] border-2 border-[#4ade80] p-2 text-center flex items-center justify-center gap-2 animate-pulse">
                    <PixelSprite name="rabbit" size={20} animate={true} />
                    <span className="font-semibold text-xs text-[#14532d]">
                      Choice locked! Waiting for Player 1...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-bold text-[#14532d] bg-[#dcfce7] p-2 border border-[#86efac]">
                    <div className="flex items-center gap-1.5">
                      <PixelSprite name={p2IsCorrect ? 'check' : 'cross'} size={16} />
                      <span>{p2IsCorrect ? 'Correct! (+10 pts)' : 'Incorrect (0 pts)'}</span>
                    </div>
                    {p2SpeedBonus && (
                      <span className="text-[11px] text-[#854d0e] font-bold bg-[#fef08a] px-2 py-0.5 border border-[#eab308]">
                        +5 Speed bonus!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Both Ready: Feedback & Next Question Together Bar */}
          {bothSubmitted && (
            <div className="pixel-wood-dark p-3 text-center flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
              <div className="text-xs text-[#fed7aa] font-medium text-left">
                <span className="font-bold text-[#fde047]">Explanation: </span>
                {currentQ.explanation}
              </div>
              <button
                type="button"
                onClick={handleNextTogether}
                className="pixel-btn-gold px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wide cursor-pointer flex items-center gap-2 shrink-0"
              >
                <span>
                  {qIndex + 1 === questions.length
                    ? 'View Final Battle Results →'
                    : 'Next Question Together →'}
                </span>
                <PixelSprite name="check" size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* End of Battle Comparison Scoreboard */
        <div className="pixel-wood-box p-6 sm:p-8 flex flex-col items-center text-center gap-5 max-w-2xl mx-auto w-full animate-in zoom-in-95">
          <div className="w-16 h-16 bg-[#ffd885] border-3 border-[#8b5a2b] flex items-center justify-center p-2 shadow-md">
            <PixelSprite name="trophy" size={44} animate={true} />
          </div>

          <div>
            <span className="text-xs font-bold text-[#b45309] block">
              Two-Player Split Screen Battle Concluded!
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#4a2800] mt-1">
              {getWinner()}
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f] mt-1">
              Both farmers solved {levelDef.name} together with instant tap choices!
            </p>
          </div>

          {/* Comparison Scoreboard Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Player 1 Card */}
            <div
              className={`p-4 border-3 flex flex-col items-center gap-2 ${
                p1Score >= p2Score
                  ? 'bg-[#dbeafe] border-[#1d4ed8] shadow-md'
                  : 'bg-[#f1f5f9] border-[#cbd5e1]'
              }`}
            >
              <PixelSprite name="player1" size={40} />
              <span className="font-bold text-xs text-[#1e3a8a]">Player 1 (Blue)</span>
              <div className="font-pixel text-xl text-[#1e40af]">{p1Score} pts</div>
              <span className="text-xs text-[#2563eb]">
                {p1CorrectCount} / {questions.length} correct
              </span>
              {p1Score >= p2Score && (
                <span className="text-[11px] font-bold bg-[#fef08a] text-[#854d0e] px-2 py-0.5 border border-[#ca8a04]">
                  {p1Score > p2Score ? 'Gold Medalist' : 'Co-Champion'}
                </span>
              )}
            </div>

            {/* Player 2 Card */}
            <div
              className={`p-4 border-3 flex flex-col items-center gap-2 ${
                p2Score >= p1Score
                  ? 'bg-[#dcfce7] border-[#15803d] shadow-md'
                  : 'bg-[#f1f5f9] border-[#cbd5e1]'
              }`}
            >
              <PixelSprite name="player2" size={40} />
              <span className="font-bold text-xs text-[#14532d]">Player 2 (Green)</span>
              <div className="font-pixel text-xl text-[#15803d]">{p2Score} pts</div>
              <span className="text-xs text-[#16a34a]">
                {p2CorrectCount} / {questions.length} correct
              </span>
              {p2Score >= p1Score && (
                <span className="text-[11px] font-bold bg-[#fef08a] text-[#854d0e] px-2 py-0.5 border border-[#ca8a04]">
                  {p2Score > p1Score ? 'Gold Medalist' : 'Co-Champion'}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setQIndex(0);
                setP1Score(0);
                setP2Score(0);
                setP1CorrectCount(0);
                setP2CorrectCount(0);
                setP1SelectedKey(null);
                setP2SelectedKey(null);
                setP1Submitted(false);
                setP2Submitted(false);
                setP1IsCorrect(null);
                setP2IsCorrect(null);
                setP1Timer(0);
                setP2Timer(0);
                setIsGameOver(false);
              }}
              className="pixel-btn-blue flex-1 py-2.5 font-bold text-xs cursor-pointer"
            >
              Rematch Battle
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                const combinedScore = Math.max(p1Score, p2Score);
                const stars = combinedScore >= 50 ? 3 : combinedScore >= 30 ? 2 : 1;
                onFinishLevel(stars, combinedScore);
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
