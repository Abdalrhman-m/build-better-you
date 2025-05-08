
import { apiService } from './api-client';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '@/types/api';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
};

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    
    if (response.isSuccess && response.value) {
      // Save token to local storage
      localStorage.setItem('auth_token', response.value.token);
    }
    
    return response;
  },
  
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
    
    if (response.isSuccess && response.value) {
      // Save token to local storage
      localStorage.setItem('auth_token', response.value.token);
    }
    
    return response;
  },
  
  async logout(): Promise<ApiResponse<void>> {
    const response = await apiService.post<void>(AUTH_ENDPOINTS.LOGOUT);
    
    // Remove token regardless of response
    localStorage.removeItem('auth_token');
    
    return response;
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};
