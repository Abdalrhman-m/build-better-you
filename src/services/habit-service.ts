
import { apiService } from './api-client';
import { ApiResponse, PagedResponse } from '@/types/api';
import { 
  Habit, 
  CreateHabitRequest, 
  UpdateHabitRequest, 
  CompleteHabitRequest 
} from '@/types/habit';

const HABIT_ENDPOINTS = {
  BASE: '/habits',
  BY_ID: (id: string) => `/habits/${id}`,
  COMPLETE: (id: string) => `/habits/${id}/complete`,
  ANALYTICS: '/habits/analytics',
};

export const habitService = {
  async getHabits(): Promise<ApiResponse<Habit[]>> {
    return apiService.get<Habit[]>(HABIT_ENDPOINTS.BASE);
  },
  
  async getHabitsPaged(pageNumber: number = 1, pageSize: number = 10): Promise<ApiResponse<PagedResponse<Habit>>> {
    return apiService.get<PagedResponse<Habit>>(`${HABIT_ENDPOINTS.BASE}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  },
  
  async getHabitById(id: string): Promise<ApiResponse<Habit>> {
    return apiService.get<Habit>(HABIT_ENDPOINTS.BY_ID(id));
  },
  
  async createHabit(habitData: CreateHabitRequest): Promise<ApiResponse<string>> {
    return apiService.post<string>(HABIT_ENDPOINTS.BASE, habitData);
  },
  
  async updateHabit(habitData: UpdateHabitRequest): Promise<ApiResponse<void>> {
    return apiService.put<void>(HABIT_ENDPOINTS.BY_ID(habitData.id), habitData);
  },
  
  async deleteHabit(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(HABIT_ENDPOINTS.BY_ID(id));
  },
  
  async completeHabit(request: CompleteHabitRequest): Promise<ApiResponse<void>> {
    return apiService.post<void>(HABIT_ENDPOINTS.COMPLETE(request.id), { completedDate: request.completedDate });
  },
  
  async getHabitsByCategory(category: string): Promise<ApiResponse<Habit[]>> {
    return apiService.get<Habit[]>(`${HABIT_ENDPOINTS.BASE}/category/${category}`);
  },
  
  async getHabitAnalytics(): Promise<ApiResponse<any>> {
    return apiService.get<any>(HABIT_ENDPOINTS.ANALYTICS);
  }
};
