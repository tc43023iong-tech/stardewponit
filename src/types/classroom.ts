export interface PointHistoryItem {
  id: string;
  timestamp: number;
  studentId: string;
  studentName: string;
  delta: number;
  reason: string;
  reasonEn?: string;
  icon?: string;
}

export interface Student {
  id: string;
  rollNo: number;
  name: string;
  points: number;
  posPoints: number;
  negPoints: number;
  groupId?: number; // 1 to 6
  avatar?: string;
  cardBackground?: string; // Custom card background theme ID
  history: PointHistoryItem[];
}

export interface ClassroomClass {
  id: string;
  className: string;
  students: Student[];
}

export interface PointPreset {
  id: string;
  labelZh: string;
  labelEn: string;
  points: number;
  type: 'positive' | 'negative';
  icon: string;
}

export type ViewTab = 'students' | 'farm' | 'ranking' | 'history';

export interface ClassroomTheme {
  id: string;
  name: string;
  bgKey: string;
  bgImage?: string;
}
