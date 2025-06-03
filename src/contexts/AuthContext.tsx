
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth-service';
import { supabase } from '@/integrations/supabase/client';
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
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize auth state from Supabase
  useEffect(() => {
    // Set up the auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        
        // Update session state
        setSession(currentSession);
        
        // If we have a session, format user data
        if (currentSession?.user) {
          const userData: AuthResponse = {
            token: currentSession.access_token,
            expiresAt: new Date(currentSession.expires_at! * 1000).toISOString(),
            userId: currentSession.user.id,
            userName: currentSession.user.email?.split('@')[0] || 'User'
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );
    
    // THEN check for an existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
        const userData: AuthResponse = {
          token: data.session.access_token,
          expiresAt: new Date(data.session.expires_at! * 1000).toISOString(),
          userId: data.session.user.id,
          userName: data.session.user.email?.split('@')[0] || 'User'
        };
        setUser(userData);
        setSession(data.session);
      }
      
      setIsLoading(false);
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log("Logging in with:", credentials);
      const response = await authService.login(credentials);
      console.log("Login response:", response);
      
      if (response.isSuccess && response.value) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        // Don't navigate here, let the auth state change handle it
        return true;
      } else {
        const errorMessage = response.errors && response.errors.length > 0 
          ? response.errors[0] 
          : "Please check your credentials and try again.";
        
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
        });
        console.error("Login failed:", errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
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
      console.log("Registering with:", userData);
      const response = await authService.register(userData);
      console.log("Register response:", response);
      
      if (response.isSuccess && response.value) {
        toast({
          title: "Account created!",
          description: "Welcome to Medovate. Let's get started!",
        });
        // Don't navigate here, let the auth state change handle it
        return true;
      } else {
        const errorMessage = response.errors && response.errors.length > 0 
          ? response.errors[0] 
          : "There was an error creating your account.";
          
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
        console.error("Registration failed:", errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
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
      setSession(null);
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
