export type TabType = 'today' | 'analytics' | 'timer' | 'profile';

export type HabitCategory = 'study' | 'health' | 'fitness' | 'mindset' | 'sleep' | 'mindfulness' | 'reading';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  categoryLabel: string;
  details: string;
  streak: number;
  streakMax?: number;
  targetMinutes: number;
  completed: boolean;
  dueText?: string;
  actionButtonText?: string;
  color: string;
  emblem: string;
  adherenceRate?: number;
  isAtRisk?: boolean;
  riskMessage?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'night';
  frequency?: 'daily' | 'weekdays' | 'custom';
  atomicFormula?: {
    afterI: string;
    iWill: string;
    reward: string;
  };
  reminderEnabled?: boolean;
  reminderTime?: string;
}

export interface DayProgress {
  dayName: string;
  dayNumber: number;
  dateStr: string;
  completed: boolean;
  isToday: boolean;
}

export type AtmosphereType = 'rain' | 'library' | 'binaural' | 'none';
