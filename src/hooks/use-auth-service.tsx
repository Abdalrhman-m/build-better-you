
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '@/application/di/container';
import { AuthService } from '@/application/services/AuthService';
import { useToast } from '@/hooks/use-toast';
import { LoginDTO, RegisterDTO } from '@/domain/repositories/IAuthRepository';

export function useAuthService() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const authService = container.get<AuthService>('authService');

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const session = await authService.getCurrentSession();
        if (session?.user) {
          setUser({
            token: session.session.access_token,
            expiresAt: new Date(session.session.expires_at! * 1000).toISOString(),
            userId: session.user.id,
            userName: session.user.email?.split('@')[0] || 'User'
          });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      setUser(result);
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/dashboard');
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      setUser(result);
      setIsAuthenticated(true);
      toast({
        title: "Account created!",
        description: "Welcome to Habit Builder. Let's get started!",
      });
      navigate('/dashboard');
      return true;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error creating your account.",
        variant: "destructive",
      });
      console.error("Registration failed:", error);
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
      setIsAuthenticated(false);
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

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout
  };
}
