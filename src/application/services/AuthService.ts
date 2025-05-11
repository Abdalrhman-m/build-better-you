
import { IAuthRepository, LoginDTO, RegisterDTO, AuthResultDTO } from '@/domain/repositories/IAuthRepository';

export class AuthService {
  private authRepository: IAuthRepository;
  
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }
  
  async login(credentials: LoginDTO): Promise<AuthResultDTO> {
    try {
      return await this.authRepository.login(credentials);
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Failed to login");
    }
  }
  
  async register(userData: RegisterDTO): Promise<AuthResultDTO> {
    try {
      return await this.authRepository.register(userData);
    } catch (error: any) {
      console.error("Register error:", error);
      throw new Error(error.message || "Failed to register");
    }
  }
  
  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.message || "Failed to logout");
    }
  }
  
  async getCurrentSession(): Promise<any | null> {
    return this.authRepository.getCurrentSession();
  }
  
  isAuthenticated(): boolean {
    return this.authRepository.isAuthenticated();
  }
}
