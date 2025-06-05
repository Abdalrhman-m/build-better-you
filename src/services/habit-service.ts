
import { habitCrudService } from './habit-crud-service';
import { habitCompletionService } from './habit-completion-service';
import { habitAnalyticsService } from './habit-analytics-service';

export const habitService = {
  // CRUD operations
  getHabits: habitCrudService.getHabits,
  createHabit: habitCrudService.createHabit,
  updateHabit: habitCrudService.updateHabit,
  deleteHabit: habitCrudService.deleteHabit,
  
  // Completion operations
  completeHabit: habitCompletionService.completeHabit,
  uncompleteHabit: habitCompletionService.uncompleteHabit,
  
  // Analytics operations
  getHabitAnalytics: habitAnalyticsService.getHabitAnalytics
};
