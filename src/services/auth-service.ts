
import { apiService } from './api-client';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '@/types/api';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
};

// Mock implementation for development
const mockAuthResponse = (userData: any): ApiResponse<AuthResponse> => {
  // For development purposes only - simulate successful auth
  return {
    isSuccess: true,
    value: {
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24h from now
      userId: 'user-' + Math.random().toString(36).substring(2, 10),
      userName: userData.name || userData.email.split('@')[0]
    }
  };
};

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('Login request:', credentials);
      
      // In a development environment without a real backend,
      // we can use a mock response
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock login response');
        return mockAuthResponse(credentials);
      }
      
      const response = await apiService.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      
      if (response.isSuccess && response.value) {
        // Save token to local storage
        localStorage.setItem('auth_token', response.value.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to connect to authentication service. Please try again.']
      };
    }
  },
  
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('Register request:', userData);
      
      // In a development environment without a real backend,
      // we can use a mock response
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock register response');
        return mockAuthResponse(userData);
      }
      
      const response = await apiService.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
      
      if (response.isSuccess && response.value) {
        // Save token to local storage
        localStorage.setItem('auth_token', response.value.token);
      }
      
      return response;
    } catch (error) {
      console.error('Register error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to connect to registration service. Please try again.']
      };
    }
  },
  
  async logout(): Promise<ApiResponse<void>> {
    try {
      // For development without a real backend
      if (process.env.NODE_ENV === 'development') {
        // Just remove the token from localStorage
        localStorage.removeItem('auth_token');
        return { isSuccess: true };
      }
      
      const response = await apiService.post<void>(AUTH_ENDPOINTS.LOGOUT);
      
      // Remove token regardless of response
      localStorage.removeItem('auth_token');
      
      return response;
    } catch (error) {
      // Remove token even if there's an error
      localStorage.removeItem('auth_token');
      
      console.error('Logout error:', error);
      return {
        isSuccess: true, // Consider logout successful even if API call fails
        errors: ['Logged out locally, but server notification failed.']
      };
    }
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};
