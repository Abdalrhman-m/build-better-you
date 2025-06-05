
import { Habit } from '@/types/habit';
import { calculateStreak } from './streak-calculator';
import { encryptionUtils } from './encryption';

export const habitTransformer = {
  async transformHabitFromDatabase(habitData: any): Promise<Habit> {
    const completedDates = Array.isArray(habitData.completed_dates) 
      ? habitData.completed_dates.map(date => typeof date === 'string' ? date : date.toString())
      : [];
    
    // Calculate streak properly
    const calculatedStreak = calculateStreak(completedDates);
    
    // Decrypt name and description
    const decryptedName = await encryptionUtils.decryptText(habitData.name);
    const decryptedDescription = habitData.description ? await encryptionUtils.decryptText(habitData.description) : '';
    
    return {
      id: habitData.id,
      name: decryptedName,
      description: decryptedDescription,
      streak: calculatedStreak,
      category: habitData.category,
      completedDates,
      userId: habitData.user_id,
      createdAt: habitData.created_at,
      updatedAt: habitData.updated_at
    };
  },

  async transformHabitsFromDatabase(habitsData: any[]): Promise<Habit[]> {
    return Promise.all(habitsData.map(habit => this.transformHabitFromDatabase(habit)));
  }
};
