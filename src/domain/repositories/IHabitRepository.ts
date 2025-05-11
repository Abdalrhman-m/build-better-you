
import { Habit } from "../entities/Habit";

export interface CreateHabitDTO {
  name: string;
  description: string;
  category: string;
}

export interface UpdateHabitDTO {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface CompleteHabitDTO {
  id: string;
  completedDate: string;
}

export interface IHabitRepository {
  getAll(): Promise<Habit[]>;
  getById(id: string): Promise<Habit | null>;
  getByCategory(category: string): Promise<Habit[]>;
  create(habit: CreateHabitDTO): Promise<string>;
  update(habit: UpdateHabitDTO): Promise<void>;
  delete(id: string): Promise<void>;
  complete(completeData: CompleteHabitDTO): Promise<void>;
  getAnalytics(): Promise<any>;
}
