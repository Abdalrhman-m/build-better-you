
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse } from '@/types/api';
import { 
  Habit, 
  CreateHabitRequest, 
  UpdateHabitRequest, 
  CompleteHabitRequest 
} from '@/types/habit';

// Helper function to calculate streak from completion dates
const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  // Sort dates in descending order (most recent first)
  const sortedDates = completedDates
    .map(date => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  // Check if there's a completion for today or yesterday
  const mostRecentCompletion = sortedDates[0];
  mostRecentCompletion.setHours(0, 0, 0, 0);
  
  // If most recent completion is more than 1 day ago, streak is 0
  const daysDiff = Math.floor((today.getTime() - mostRecentCompletion.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 1) return 0;
  
  // Start checking from today or yesterday
  if (daysDiff === 1) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // Count consecutive days going backwards
  for (const completionDate of sortedDates) {
    completionDate.setHours(0, 0, 0, 0);
    
    if (completionDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export const habitService = {
  async getHabits(): Promise<ApiResponse<Habit[]>> {
    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching habits:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      // Decrypt the data after fetching
      const habits: Habit[] = await Promise.all(data.map(async habit => {
        const completedDates = Array.isArray(habit.completed_dates) 
          ? habit.completed_dates.map(date => typeof date === 'string' ? date : date.toString())
          : [];
        
        // Calculate streak properly
        const calculatedStreak = calculateStreak(completedDates);
        
        // Decrypt name and description
        const decryptedName = await this.decryptText(habit.name);
        const decryptedDescription = habit.description ? await this.decryptText(habit.description) : '';
        
        return {
          id: habit.id,
          name: decryptedName,
          description: decryptedDescription,
          streak: calculatedStreak,
          category: habit.category,
          completedDates,
          userId: habit.user_id,
          createdAt: habit.created_at,
          updatedAt: habit.updated_at
        };
      }));

      return {
        isSuccess: true,
        value: habits
      };
    } catch (error) {
      console.error('Unexpected error fetching habits:', error);
      return {
        isSuccess: false,
        errors: ['Failed to fetch habits']
      };
    }
  },
  
  async createHabit(habitData: CreateHabitRequest): Promise<ApiResponse<string>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
      }

      // Encrypt the name and description before storing
      const encryptedName = await this.encryptText(habitData.name);
      const encryptedDescription = habitData.description ? await this.encryptText(habitData.description) : null;

      const { data, error } = await supabase
        .from('habits')
        .insert({
          name: encryptedName,
          description: encryptedDescription,
          category: habitData.category,
          user_id: session.session.user.id
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating habit:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: data.id
      };
    } catch (error) {
      console.error('Unexpected error creating habit:', error);
      return {
        isSuccess: false,
        errors: ['Failed to create habit']
      };
    }
  },
  
  async updateHabit(habitData: UpdateHabitRequest): Promise<ApiResponse<void>> {
    try {
      // Encrypt the name and description before updating
      const encryptedName = await this.encryptText(habitData.name);
      const encryptedDescription = habitData.description ? await this.encryptText(habitData.description) : null;

      const { error } = await supabase
        .from('habits')
        .update({
          name: encryptedName,
          description: encryptedDescription,
          category: habitData.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', habitData.id);

      if (error) {
        console.error('Error updating habit:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: undefined
      };
    } catch (error) {
      console.error('Unexpected error updating habit:', error);
      return {
        isSuccess: false,
        errors: ['Failed to update habit']
      };
    }
  },
  
  async deleteHabit(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting habit:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: undefined
      };
    } catch (error) {
      console.error('Unexpected error deleting habit:', error);
      return {
        isSuccess: false,
        errors: ['Failed to delete habit']
      };
    }
  },
  
  async completeHabit(request: CompleteHabitRequest): Promise<ApiResponse<void>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
      }

      const { error } = await supabase
        .from('habit_completions')
        .insert({
          habit_id: request.id,
          user_id: session.session.user.id,
          completed_date: request.completedDate
        });

      if (error) {
        console.error('Error completing habit:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: undefined
      };
    } catch (error) {
      console.error('Unexpected error completing habit:', error);
      return {
        isSuccess: false,
        errors: ['Failed to complete habit']
      };
    }
  },

  async getHabitAnalytics(): Promise<ApiResponse<any>> {
    try {
      const { data: habits, error } = await supabase
        .from('habits')
        .select('*');

      if (error) {
        console.error('Error fetching analytics:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      // Decrypt habit names for analytics
      const decryptedHabits = await Promise.all(habits.map(async habit => {
        const decryptedName = await this.decryptText(habit.name);
        return {
          ...habit,
          name: decryptedName
        };
      }));

      // Calculate analytics from real data
      const totalHabits = decryptedHabits.length;
      const categoryCounts = decryptedHabits.reduce((acc, habit) => {
        acc[habit.category] = (acc[habit.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const today = new Date().toISOString().split('T')[0];
      const completedToday = decryptedHabits.filter(habit => {
        // Safely check if completed_dates is an array and contains today's date
        if (Array.isArray(habit.completed_dates)) {
          return habit.completed_dates.some(date => 
            typeof date === 'string' && date === today
          );
        }
        return false;
      }).length;

      const weeklyPercentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

      return {
        isSuccess: true,
        value: {
          totalHabits,
          completedToday,
          weeklyPercentage,
          categoryCounts,
          habits: decryptedHabits
        }
      };
    } catch (error) {
      console.error('Unexpected error fetching analytics:', error);
      return {
        isSuccess: false,
        errors: ['Failed to fetch analytics']
      };
    }
  },

  // Helper method to encrypt text using database function
  async encryptText(text: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('encrypt_text', { text_to_encrypt: text });

      if (error) {
        console.error('Error encrypting text:', error);
        return text; // Return original text if encryption fails
      }

      return data;
    } catch (error) {
      console.error('Unexpected error encrypting text:', error);
      return text; // Return original text if encryption fails
    }
  },

  // Helper method to decrypt text using database function
  async decryptText(encryptedText: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('decrypt_text', { encrypted_text: encryptedText });

      if (error) {
        console.error('Error decrypting text:', error);
        return encryptedText; // Return original text if decryption fails
      }

      return data;
    } catch (error) {
      console.error('Unexpected error decrypting text:', error);
      return encryptedText; // Return original text if decryption fails
    }
  }
};
