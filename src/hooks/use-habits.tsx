
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '@/services/habit-service';
import { Habit, CreateHabitRequest, UpdateHabitRequest } from '@/types/habit';
import { useToast } from '@/hooks/use-toast';
import { getRandomCompletionMessage } from '@/utils/completion-messages';

export function useHabits() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Get all habits
  const { data: habitsResponse, isLoading, error } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await habitService.getHabits();
      if (!response.isSuccess) {
        throw new Error(response.errors?.[0] || 'Failed to fetch habits');
      }
      return response;
    }
  });
  
  // Create habit mutation
  const createHabit = useMutation({
    mutationFn: (newHabit: CreateHabitRequest) => habitService.createHabit(newHabit),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          title: "Habit created",
          description: "Your new habit was created successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      } else {
        toast({
          title: "Failed to create habit",
          description: data.errors?.[0] || "An error occurred while creating your habit.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to create habit",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  });
  
  // Update habit mutation
  const updateHabit = useMutation({
    mutationFn: (updatedHabit: UpdateHabitRequest) => habitService.updateHabit(updatedHabit),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          title: "Habit updated",
          description: "Your habit was updated successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      } else {
        toast({
          title: "Failed to update habit",
          description: data.errors?.[0] || "An error occurred while updating your habit.",
          variant: "destructive",
        });
      }
    }
  });
  
  // Delete habit mutation
  const deleteHabit = useMutation({
    mutationFn: (id: string) => habitService.deleteHabit(id),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          title: "Habit deleted",
          description: "Your habit was deleted successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      } else {
        toast({
          title: "Failed to delete habit",
          description: data.errors?.[0] || "An error occurred while deleting your habit.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to delete habit",
        description: "An unexpected error occurred while deleting your habit.",
        variant: "destructive",
      });
    }
  });
  
  // Complete habit mutation - updated with personalized messages
  const completeHabit = useMutation({
    mutationFn: ({ id, completedDate }: { id: string, completedDate: string }) => 
      habitService.completeHabit({ id, completedDate }),
    onSuccess: (data, variables) => {
      if (data.isSuccess) {
        const personalizedMessage = getRandomCompletionMessage();
        
        toast({
          title: "Habit Completed! 🎉",
          description: personalizedMessage,
        });
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      } else {
        toast({
          title: "Failed to complete habit",
          description: data.errors?.[0] || "An error occurred while marking your habit as complete.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to complete habit",
        description: "An unexpected error occurred while completing your habit.",
        variant: "destructive",
      });
    }
  });

  // Uncomplete habit mutation
  const uncompleteHabit = useMutation({
    mutationFn: ({ id, completedDate }: { id: string, completedDate: string }) => 
      habitService.uncompleteHabit({ id, completedDate }),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast({
          title: "Habit unmarked",
          description: "Your habit has been unmarked as completed.",
        });
        queryClient.invalidateQueries({ queryKey: ['habits'] });
      } else {
        toast({
          title: "Failed to unmark habit",
          description: data.errors?.[0] || "An error occurred while unmarking your habit.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to unmark habit",
        description: "An unexpected error occurred while unmarking your habit.",
        variant: "destructive",
      });
    }
  });
  
  // Extract habits from response
  const habits = habitsResponse?.value || [];
  
  // Filter by category for tabs
  const getHabitsByCategory = (category: string) => {
    return habits.filter(h => h.category === category);
  };
  
  // Calculate metrics
  const totalHabits = habits.length;
  const completedToday = habits.filter(
    h => h.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length;
  
  // Get the highest streak
  const currentStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  
  return {
    habits,
    getHabitsByCategory,
    isLoading,
    error,
    createHabit: (newHabit: CreateHabitRequest) => createHabit.mutate(newHabit),
    updateHabit: (updatedHabit: UpdateHabitRequest) => updateHabit.mutate(updatedHabit),
    deleteHabit: (id: string) => deleteHabit.mutate(id),
    completeHabit: (id: string, date?: string) => {
      const targetDate = date || new Date().toISOString().split('T')[0];
      completeHabit.mutate({ id, completedDate: targetDate });
    },
    uncompleteHabit: (id: string, date?: string) => {
      const targetDate = date || new Date().toISOString().split('T')[0];
      uncompleteHabit.mutate({ id, completedDate: targetDate });
    },
    totalHabits,
    completedToday,
    currentStreak
  };
}
