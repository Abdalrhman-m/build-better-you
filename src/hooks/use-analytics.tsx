
import { useQuery } from '@tanstack/react-query';
import { habitService } from '@/services/habit-service';

export function useAnalytics() {
  // Get analytics data
  const { data: analyticsResponse, isLoading, error } = useQuery({
    queryKey: ['habits-analytics'],
    queryFn: async () => {
      const response = await habitService.getHabitAnalytics();
      if (!response.isSuccess) {
        throw new Error(response.errors?.[0] || 'Failed to fetch analytics');
      }
      return response;
    }
  });
  
  // Use real data or fallback to sample data
  const analytics = analyticsResponse?.value || {
    totalHabits: 0,
    completedToday: 0,
    weeklyPercentage: 0,
    monthlyPercentage: 0,
    yearlyPercentage: 0,
    categoryCounts: {},
    habits: []
  };
  
  return {
    analytics,
    isLoading,
    error
  };
}
