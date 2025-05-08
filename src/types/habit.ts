
export interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  category: string;
  completedDates: string[]; // ISO date strings "YYYY-MM-DD"
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHabitRequest {
  name: string;
  description: string;
  category: string;
}

export interface UpdateHabitRequest {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface CompleteHabitRequest {
  id: string;
  completedDate: string; // ISO date string "YYYY-MM-DD"
}
