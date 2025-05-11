
import { IHabitRepository, CreateHabitDTO, UpdateHabitDTO, CompleteHabitDTO } from '@/domain/repositories/IHabitRepository';
import { Habit } from '@/domain/entities/Habit';
import axios from 'axios';

export class ApiHabitRepository implements IHabitRepository {
  private apiUrl: string;
  
  constructor() {
    this.apiUrl = 'https://api.your-backend.com/api';
  }
  
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  private getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  
  async getAll(): Promise<Habit[]> {
    const response = await axios.get(`${this.apiUrl}/habits`, {
      headers: this.getAuthHeader()
    });
    
    if (response.data.isSuccess) {
      return response.data.value as Habit[];
    }
    
    throw new Error(response.data.errors?.[0] || 'Failed to fetch habits');
  }
  
  async getById(id: string): Promise<Habit | null> {
    const response = await axios.get(`${this.apiUrl}/habits/${id}`, {
      headers: this.getAuthHeader()
    });
    
    if (response.data.isSuccess) {
      return response.data.value as Habit;
    }
    
    if (response.status === 404) {
      return null;
    }
    
    throw new Error(response.data.errors?.[0] || 'Failed to fetch habit');
  }
  
  async getByCategory(category: string): Promise<Habit[]> {
    const response = await axios.get(`${this.apiUrl}/habits/category/${category}`, {
      headers: this.getAuthHeader()
    });
    
    if (response.data.isSuccess) {
      return response.data.value as Habit[];
    }
    
    throw new Error(response.data.errors?.[0] || 'Failed to fetch habits by category');
  }
  
  async create(habitData: CreateHabitDTO): Promise<string> {
    const response = await axios.post(`${this.apiUrl}/habits`, habitData, {
      headers: this.getAuthHeader()
    });
    
    if (response.data.isSuccess) {
      return response.data.value;
    }
    
    throw new Error(response.data.errors?.[0] || 'Failed to create habit');
  }
  
  async update(habitData: UpdateHabitDTO): Promise<void> {
    const response = await axios.put(`${this.apiUrl}/habits/${habitData.id}`, habitData, {
      headers: this.getAuthHeader()
    });
    
    if (!response.data.isSuccess) {
      throw new Error(response.data.errors?.[0] || 'Failed to update habit');
    }
  }
  
  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${this.apiUrl}/habits/${id}`, {
      headers: this.getAuthHeader()
    });
    
    if (!response.data.isSuccess) {
      throw new Error(response.data.errors?.[0] || 'Failed to delete habit');
    }
  }
  
  async complete(completeData: CompleteHabitDTO): Promise<void> {
    const response = await axios.post(`${this.apiUrl}/habits/${completeData.id}/complete`, 
      { completedDate: completeData.completedDate }, 
      { headers: this.getAuthHeader() }
    );
    
    if (!response.data.isSuccess) {
      throw new Error(response.data.errors?.[0] || 'Failed to complete habit');
    }
  }
  
  async getAnalytics(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/habits/analytics`, {
      headers: this.getAuthHeader()
    });
    
    if (response.data.isSuccess) {
      return response.data.value;
    }
    
    throw new Error(response.data.errors?.[0] || 'Failed to fetch analytics');
  }
}
