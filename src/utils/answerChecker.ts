import { SectionId } from '../types/game';
import {
  SECTION_A_DATA,
  SECTION_B_DATA,
  SECTION_D_DATA,
  SECTION_E_DATA,
  SECTION_G_DATA,
  SECTION_H_DATA,
  SECTION_I_DATA,
} from '../data/gameData';

export interface EvaluationResult {
  isCorrect: boolean;
  scoreGained: number;
  details?: any;
}

export const evaluateSectionAnswer = (
  sectionId: SectionId,
  questionIndex: number,
  playerAnswer: any,
  timeTakenSeconds: number = 0
): EvaluationResult => {
  let isCorrect = false;

  switch (sectionId) {
    case 'A': {
      const q = SECTION_A_DATA.questions[questionIndex];
      isCorrect = playerAnswer === q.correctKey;
      break;
    }

    case 'B': {
      const item = SECTION_B_DATA[questionIndex];
      const normalized = (playerAnswer || '').trim().toLowerCase();
      isCorrect = item.acceptedAnswers.some((ans) => ans.toLowerCase() === normalized);
      break;
    }

    case 'D': {
      const item = SECTION_D_DATA[questionIndex];
      const normalized = (playerAnswer || '')
        .trim()
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .replace(/\s+/g, ' ');

      isCorrect = item.acceptableMatches.some((match) => {
        const normMatch = match
          .toLowerCase()
          .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
          .replace(/\s+/g, ' ');
        return normalized === normMatch;
      });

      // Flexible check: must contain "who" and key words
      if (!isCorrect && normalized.includes('who')) {
        if (questionIndex === 0 && normalized.includes('crying') && normalized.includes('ben')) {
          isCorrect = true;
        } else if (
          questionIndex === 1 &&
          normalized.includes('blue dress') &&
          normalized.includes('lucy')
        ) {
          isCorrect = true;
        } else if (
          questionIndex === 2 &&
          normalized.includes('tall') &&
          normalized.includes('strong') &&
          normalized.includes('chan')
        ) {
          isCorrect = true;
        }
      }
      break;
    }

    case 'E': {
      const item = SECTION_E_DATA[questionIndex];
      isCorrect = (playerAnswer || '').toLowerCase() === item.answer;
      break;
    }

    case 'G': {
      const item = SECTION_G_DATA[questionIndex];
      const ans = playerAnswer || { past: '', pastParticiple: '', presentParticiple: '' };
      const pastOk = (ans.past || '').trim().toLowerCase() === item.past.toLowerCase();
      const ppOk = (ans.pastParticiple || '').trim().toLowerCase() === item.pastParticiple.toLowerCase();
      const prpOk = (ans.presentParticiple || '').trim().toLowerCase() === item.presentParticiple.toLowerCase();
      // Partial or full credit: full 10 if all 3, or prorated
      isCorrect = pastOk && ppOk && prpOk;
      break;
    }

    case 'H': {
      // Whole exercise submitted
      const answersMap = playerAnswer || {};
      let correctCount = 0;
      SECTION_H_DATA.forEach((q) => {
        if ((answersMap[q.id] || '').toLowerCase() === q.answer.toLowerCase()) {
          correctCount++;
        }
      });
      isCorrect = correctCount === SECTION_H_DATA.length;
      return {
        isCorrect,
        scoreGained: correctCount * 10,
        details: { correctCount, total: SECTION_H_DATA.length },
      };
    }

    case 'I': {
      const item = SECTION_I_DATA[questionIndex];
      const normalized = (playerAnswer || '').trim().toLowerCase();
      if (item.type === 'EN_TO_ZH') {
        // Traditional Chinese keyword presence
        const matchedKeywords = item.acceptableChineseKeywords?.filter((kw) =>
          normalized.includes(kw.toLowerCase())
        );
        isCorrect = (matchedKeywords?.length || 0) >= 2;
      } else {
        // English sentence check
        const cleanNorm = normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/\s+/g, ' ');
        isCorrect = (item.acceptableEnglishMatches || []).some((m) => {
          const cleanM = m.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/\s+/g, ' ');
          return cleanNorm.includes(cleanM) || cleanM.includes(cleanNorm);
        });
      }
      break;
    }

    case 'K': {
      // Fox dialogue with 7 blanks
      const ans = playerAnswer || {};
      const c1 = (ans[1] || '').trim().toLowerCase() === 'noisily';
      const c2 = (ans[2] || '').trim().toLowerCase() === 'should';
      const c3 = (ans[3] || '').trim().toLowerCase() === 'quickly';
      const c4 = (ans[4] || '').trim().toLowerCase() === 'carelessly';
      const c5 = (ans[5] || '').trim().toLowerCase() === 'quietly';
      const c6 =
        (ans[6] || '').trim().toLowerCase() === "shouldn't" ||
        (ans[6] || '').trim().toLowerCase() === 'should not' ||
        (ans[6] || '').trim().toLowerCase() === 'shouldnt';
      const c7 = (ans[7] || '').trim().toLowerCase() === 'should';

      const correctList = [c1, c2, c3, c4, c5, c6, c7];
      const correctCount = correctList.filter(Boolean).length;
      isCorrect = correctCount >= 6; // generous threshold for overall completion
      return {
        isCorrect: correctCount === 7,
        scoreGained: correctCount * 10,
        details: { correctCount, total: 7 },
      };
    }
  }

  // Speed bonus: +5 points if answered correctly within 8 seconds
  let scoreGained = 0;
  if (isCorrect) {
    scoreGained = 10;
    if (timeTakenSeconds > 0 && timeTakenSeconds <= 8) {
      scoreGained += 5;
    }
  }

  return { isCorrect, scoreGained };
};
