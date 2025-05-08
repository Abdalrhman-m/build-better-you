
export interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  category: string;
  completedDates: string[]; // ISO date strings "YYYY-MM-DD"
}
