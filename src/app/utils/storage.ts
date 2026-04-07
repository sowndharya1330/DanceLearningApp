import { UserProgress } from "../data/courses";

const STORAGE_KEY = "dance_progress";

export const progressStorage = {
  getProgress: (): Record<string, UserProgress> => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  saveProgress: (lessonId: string, progress: Partial<UserProgress>) => {
    const allProgress = progressStorage.getProgress();
    const existing = allProgress[lessonId] || {
      lessonId,
      completed: false,
      lastWatched: 0,
      practiceCount: 0,
    };

    allProgress[lessonId] = { ...existing, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  },

  markComplete: (lessonId: string) => {
    progressStorage.saveProgress(lessonId, {
      completed: true,
      dateCompleted: new Date().toISOString(),
    });
  },

  incrementPractice: (lessonId: string) => {
    const progress = progressStorage.getProgress();
    const current = progress[lessonId] || {
      lessonId,
      completed: false,
      lastWatched: 0,
      practiceCount: 0,
    };
    progressStorage.saveProgress(lessonId, {
      practiceCount: current.practiceCount + 1,
    });
  },

  updateLastWatched: (lessonId: string, timestamp: number) => {
    progressStorage.saveProgress(lessonId, {
      lastWatched: timestamp,
    });
  },

  getLessonProgress: (lessonId: string): UserProgress | null => {
    const progress = progressStorage.getProgress();
    return progress[lessonId] || null;
  },
};
