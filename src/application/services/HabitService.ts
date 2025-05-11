
import { IHabitRepository, CreateHabitDTO, UpdateHabitDTO, CompleteHabitDTO } from '@/domain/repositories/IHabitRepository';
import { Habit } from '@/domain/entities/Habit';

export class HabitService {
  private habitRepository: IHabitRepository;
  
  constructor(habitRepository: IHabitRepository) {
    this.habitRepository = habitRepository;
  }
  
  async getHabits(): Promise<Habit[]> {
    try {
      return await this.habitRepository.getAll();
    } catch (error: any) {
      console.error("Get habits error:", error);
      throw new Error(error.message || "Failed to get habits");
    }
  }
  
  async getHabitById(id: string): Promise<Habit | null> {
    try {
      return await this.habitRepository.getById(id);
    } catch (error: any) {
      console.error("Get habit by ID error:", error);
      throw new Error(error.message || "Failed to get habit");
    }
  }
  
  async getHabitsByCategory(category: string): Promise<Habit[]> {
    try {
      return await this.habitRepository.getByCategory(category);
    } catch (error: any) {
      console.error("Get habits by category error:", error);
      throw new Error(error.message || "Failed to get habits by category");
    }
  }
  
  async createHabit(habitData: CreateHabitDTO): Promise<string> {
    try {
      return await this.habitRepository.create(habitData);
    } catch (error: any) {
      console.error("Create habit error:", error);
      throw new Error(error.message || "Failed to create habit");
    }
  }
  
  async updateHabit(habitData: UpdateHabitDTO): Promise<void> {
    try {
      await this.habitRepository.update(habitData);
    } catch (error: any) {
      console.error("Update habit error:", error);
      throw new Error(error.message || "Failed to update habit");
    }
  }
  
  async deleteHabit(id: string): Promise<void> {
    try {
      await this.habitRepository.delete(id);
    } catch (error: any) {
      console.error("Delete habit error:", error);
      throw new Error(error.message || "Failed to delete habit");
    }
  }
  
  async completeHabit(completeData: CompleteHabitDTO): Promise<void> {
    try {
      await this.habitRepository.complete(completeData);
    } catch (error: any) {
      console.error("Complete habit error:", error);
      throw new Error(error.message || "Failed to complete habit");
    }
  }
  
  async getHabitAnalytics(): Promise<any> {
    try {
      return await this.habitRepository.getAnalytics();
    } catch (error: any) {
      console.error("Get habit analytics error:", error);
      throw new Error(error.message || "Failed to get habit analytics");
    }
  }
}
