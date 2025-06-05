
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse } from '@/types/api';
import { encryptionUtils } from '@/utils/encryption';

export const habitAnalyticsService = {
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
        const decryptedName = await encryptionUtils.decryptText(habit.name);
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
  }
};
