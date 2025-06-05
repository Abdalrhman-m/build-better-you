
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse } from '@/types/api';
import { CompleteHabitRequest } from '@/types/habit';

export const habitCompletionService = {
  async completeHabit(request: CompleteHabitRequest): Promise<ApiResponse<void>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
      }

      // Check if the habit completion already exists
      const { data: existingCompletion } = await supabase
        .from('habit_completions')
        .select('id')
        .eq('habit_id', request.id)
        .eq('user_id', session.session.user.id)
        .eq('completed_date', request.completedDate)
        .single();

      if (existingCompletion) {
        return {
          isSuccess: false,
          errors: ['Habit already completed for this date']
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

  async uncompleteHabit(request: CompleteHabitRequest): Promise<ApiResponse<void>> {
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
        .delete()
        .eq('habit_id', request.id)
        .eq('user_id', session.session.user.id)
        .eq('completed_date', request.completedDate);

      if (error) {
        console.error('Error uncompleting habit:', error);
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
      console.error('Unexpected error uncompleting habit:', error);
      return {
        isSuccess: false,
        errors: ['Failed to uncomplete habit']
      };
    }
  }
};
