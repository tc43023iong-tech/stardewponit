export type SectionId = 'A' | 'B' | 'D' | 'E' | 'G' | 'H' | 'I' | 'K';

export type GameMode = 'single' | 'twoplayer';

export interface LevelInfo {
  id: SectionId;
  sectionCode: string;
  name: string;
  subtitle: string;
  instruction: string;
  bgImage: string;
  character: {
    name: string;
    role: string;
    avatarType: 'mayor' | 'craftsman' | 'forest_nymph' | 'fashion_rabbit' | 'farmer' | 'miner' | 'librarian' | 'foxes';
    greeting: string;
  };
  grammarTip?: {
    title: string;
    rule: string;
    example: string;
  };
  totalQuestions: number;
}

export interface PlayerScoreState {
  score: number;
  correctCount: number;
  totalAnswered: number;
  streak: number;
  submitted: boolean;
  selectedAnswer: any;
  isCorrect: boolean | null;
  speedBonusEarned: boolean;
}

export interface FarmDecoration {
  id: string;
  name: string;
  category: 'crop' | 'animal' | 'building' | 'special';
  cost: number;
  starRequirement: number;
  description: string;
  pixelSvg: string; // Identifier for pixel art SVG renderer
}

export interface UserSavedData {
  totalCoins: number;
  completedLevels: Record<string, {
    stars: number;
    highScore: number;
    completedAt: string;
  }>;
  unlockedDecorations: string[];
  placedDecorations: Array<{
    instanceId: string;
    decorId: string;
    gridX: number;
    gridY: number;
  }>;
  trophies: string[];
}
