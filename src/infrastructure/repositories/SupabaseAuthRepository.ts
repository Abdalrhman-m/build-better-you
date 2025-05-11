
import { supabase } from '@/integrations/supabase/client';
import { IAuthRepository, LoginDTO, RegisterDTO, AuthResultDTO } from '@/domain/repositories/IAuthRepository';

export class SupabaseAuthRepository implements IAuthRepository {
  async login(credentials: LoginDTO): Promise<AuthResultDTO> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
      
    if (error) {
      throw new Error(error.message);
    }
      
    if (data && data.user) {
      return {
        token: data.session?.access_token || '',
        expiresAt: new Date(data.session?.expires_at || 0).toISOString(),
        userId: data.user.id,
        userName: data.user.email?.split('@')[0] || ''
      };
    }
      
    throw new Error('Unknown error during login');
  }
  
  async register(userData: RegisterDTO): Promise<AuthResultDTO> {
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
      throw new Error(error.message);
    }
    
    if (data && data.user) {
      return {
        token: data.session?.access_token || '',
        expiresAt: new Date(data.session?.expires_at || 0).toISOString(),
        userId: data.user.id,
        userName: userData.name || userData.email.split('@')[0]
      };
    }
    
    throw new Error('Unknown error during registration');
  }
  
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
  }
  
  async getCurrentSession(): Promise<any | null> {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return {
        session: data.session,
        user: data.session.user
      };
    }
    return null;
  }
  
  isAuthenticated(): boolean {
    return !!supabase.auth.getSession(); 
  }
}
