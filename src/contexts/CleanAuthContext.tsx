
import React, { createContext, useContext } from 'react';
import { useAuthService } from '@/hooks/use-auth-service';
import { LoginDTO, RegisterDTO } from '@/domain/repositories/IAuthRepository';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (credentials: LoginDTO) => Promise<boolean>;
  register: (userData: RegisterDTO) => Promise<boolean>;
  logout: () => void;
}

const CleanAuthContext = createContext<AuthContextType | undefined>(undefined);

export const CleanAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthService();
  
  return (
    <CleanAuthContext.Provider 
      value={{ 
        isAuthenticated: auth.isAuthenticated, 
        isLoading: auth.isLoading, 
        user: auth.user, 
        login: auth.login, 
        register: auth.register, 
        logout: auth.logout 
      }}
    >
      {children}
    </CleanAuthContext.Provider>
  );
};

export const useCleanAuth = () => {
  const context = useContext(CleanAuthContext);
  if (context === undefined) {
    throw new Error('useCleanAuth must be used within a CleanAuthProvider');
  }
  return context;
};
