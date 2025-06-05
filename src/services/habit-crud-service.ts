
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse } from '@/types/api';
import { 
  Habit, 
  CreateHabitRequest, 
  UpdateHabitRequest, 
  CompleteHabitRequest 
} from '@/types/habit';
import { encryptionUtils } from '@/utils/encryption';
import { habitTransformer } from '@/utils/habit-transformer';

export const habitCrudService = {
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

      const habits = await habitTransformer.transformHabitsFromDatabase(data);

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
      const encryptedName = await encryptionUtils.encryptText(habitData.name);
      const encryptedDescription = habitData.description ? await encryptionUtils.encryptText(habitData.description) : null;

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
      const encryptedName = await encryptionUtils.encryptText(habitData.name);
      const encryptedDescription = habitData.description ? await encryptionUtils.encryptText(habitData.description) : null;

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
      // First delete all habit completions for this habit
      const { error: completionsError } = await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', id);

      if (completionsError) {
        console.error('Error deleting habit completions:', completionsError);
        return {
          isSuccess: false,
          errors: [completionsError.message]
        };
      }

      // Then delete the habit itself
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
  }
};
