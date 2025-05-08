
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
  
  // Sample analytics data structure
  // This would be replaced by actual data from the backend
  const analytics = analyticsResponse?.value || {
    weeklyPercentage: 85,
    monthlyPercentage: 72,
    yearlyPercentage: 65,
    categoryCounts: {
      health: 3,
      productivity: 2,
      mindfulness: 1,
      learning: 2,
      social: 1
    },
    completedDates: [
      '2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05',
      '2023-05-08', '2023-05-09', '2023-05-10', '2023-05-11', '2023-05-12',
      '2023-05-15', '2023-05-16', '2023-05-17', '2023-05-18', '2023-05-19',
      '2023-05-22', '2023-05-23', '2023-05-24', '2023-05-25', '2023-05-26',
      new Date().toISOString().split('T')[0] // Today
    ],
    habitPerformance: {
      weekly: [
        { name: "Drink 8 glasses of water", completed: 6, total: 7, percentage: 85 },
        { name: "Read for 30 minutes", completed: 5, total: 7, percentage: 71 },
        { name: "Meditate for 10 minutes", completed: 4, total: 7, percentage: 57 }
      ],
      monthly: [
        { name: "Drink 8 glasses of water", completed: 25, total: 30, percentage: 83 },
        { name: "Read for 30 minutes", completed: 20, total: 30, percentage: 67 },
        { name: "Meditate for 10 minutes", completed: 15, total: 30, percentage: 50 }
      ],
      yearly: [
        { name: "Drink 8 glasses of water", completed: 250, total: 365, percentage: 68 },
        { name: "Read for 30 minutes", completed: 200, total: 365, percentage: 55 },
        { name: "Meditate for 10 minutes", completed: 180, total: 365, percentage: 49 }
      ]
    }
  };
  
  return {
    analytics,
    isLoading,
    error
  };
}
