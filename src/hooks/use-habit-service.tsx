
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '@/application/di/container';
import { HabitService } from '@/application/services/HabitService';
import { useToast } from '@/hooks/use-toast';
import { CreateHabitDTO, UpdateHabitDTO } from '@/domain/repositories/IHabitRepository';

export function useHabitService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const habitService = container.get<HabitService>('habitService');
  
  // Get all habits
  const { data: habits, isLoading, error } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      return await habitService.getHabits();
    }
  });
  
  // Create habit mutation
  const createHabit = useMutation({
    mutationFn: (newHabit: CreateHabitDTO) => habitService.createHabit(newHabit),
    onSuccess: () => {
      toast({
        title: "Habit created",
        description: "Your new habit was created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create habit",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  });
  
  // Update habit mutation
  const updateHabit = useMutation({
    mutationFn: (updatedHabit: UpdateHabitDTO) => habitService.updateHabit(updatedHabit),
    onSuccess: () => {
      toast({
        title: "Habit updated",
        description: "Your habit was updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update habit",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  });
  
  // Delete habit mutation
  const deleteHabit = useMutation({
    mutationFn: (id: string) => habitService.deleteHabit(id),
    onSuccess: () => {
      toast({
        title: "Habit deleted",
        description: "Your habit was deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete habit",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  });
  
  // Complete habit mutation
  const completeHabit = useMutation({
    mutationFn: ({ id, completedDate }: { id: string, completedDate: string }) => 
      habitService.completeHabit({ id, completedDate }),
    onSuccess: () => {
      toast({
        title: "Habit completed!",
        description: `You've completed this habit today.`,
      });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to complete habit",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  });
  
  // Extract habits from response
  const habitsList = habits || [];
  
  // Filter by category for tabs
  const getHabitsByCategory = (category: string) => {
    return habitsList.filter(h => h.category === category);
  };
  
  // Calculate metrics
  const totalHabits = habitsList.length;
  const completedToday = habitsList.filter(
    h => h.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length;
  
  // Get the highest streak
  const currentStreak = habitsList.reduce((max, habit) => Math.max(max, habit.streak), 0);
  
  return {
    habits: habitsList,
    getHabitsByCategory,
    isLoading,
    error,
    createHabit: (newHabit: CreateHabitDTO) => createHabit.mutate(newHabit),
    updateHabit: (updatedHabit: UpdateHabitDTO) => updateHabit.mutate(updatedHabit),
    deleteHabit: (id: string) => deleteHabit.mutate(id),
    completeHabit: (id: string) => {
      const today = new Date().toISOString().split('T')[0];
      completeHabit.mutate({ id, completedDate: today });
    },
    totalHabits,
    completedToday,
    currentStreak
  };
}
