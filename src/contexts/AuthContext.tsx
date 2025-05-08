
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth-service';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthResponse | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Here you would typically validate the token or get user info
          // For now we'll just set as authenticated if there's a token
          // In a real app, you would call an endpoint to get user data
          
          // Mock user object based on token existence
          // Replace this with actual API call in the future
          setUser({
            token,
            expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24h from now
            userId: 'user-id', // This would come from the API
            userName: 'User' // This would come from the API
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      if (response.isSuccess && response.value) {
        setUser(response.value);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate('/dashboard');
        return true;
      } else {
        toast({
          title: "Login failed",
          description: response.errors?.[0] || "Please check your credentials and try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      
      if (response.isSuccess && response.value) {
        setUser(response.value);
        toast({
          title: "Account created!",
          description: "Welcome to Habit Builder. Let's get started!",
        });
        navigate('/dashboard');
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: response.errors?.[0] || "There was an error creating your account.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      navigate('/');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        isLoading, 
        user, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
