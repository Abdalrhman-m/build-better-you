import { supabase } from '@/integrations/supabase/client';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '@/types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('Login request:', credentials);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) {
        console.error('Supabase login error:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }
      
      if (data && data.user) {
        const authResponse: AuthResponse = {
          token: data.session?.access_token || '',
          expiresAt: new Date(data.session?.expires_at || 0).toISOString(),
          userId: data.user.id,
          userName: data.user.email?.split('@')[0] || ''
        };
        
        return {
          isSuccess: true,
          value: authResponse
        };
      }
      
      return {
        isSuccess: false,
        errors: ['Unknown error during login']
      };
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
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name
          }
        }
      });
      
      if (error) {
        console.error('Supabase register error:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }
      
      if (data && data.user) {
        // With Supabase, the user might need to confirm their email
        // We'll return success even if confirmation is pending
        const authResponse: AuthResponse = {
          token: data.session?.access_token || '',
          expiresAt: new Date(data.session?.expires_at || 0).toISOString(),
          userId: data.user.id,
          userName: userData.name || userData.email.split('@')[0]
        };
        
        return {
          isSuccess: true,
          value: authResponse
        };
      }
      
      return {
        isSuccess: false,
        errors: ['Unknown error during registration']
      };
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
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase logout error:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }
      
      return { isSuccess: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        isSuccess: true, // Consider logout successful even if API call fails
        errors: ['Logged out locally, but server notification failed.']
      };
    }
  },
  
  async getCurrentSession(): Promise<{ session: any; user: any } | null> {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return {
        session: data.session,
        user: data.session.user
      };
    }
    return null;
  },
  
  isAuthenticated(): boolean {
    // Fix: Use the correct approach to check authentication status
    return !!supabase.auth.getSession() || 
           !!localStorage.getItem('sb-auth-token');
  }
};
