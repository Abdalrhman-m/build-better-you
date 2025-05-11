
export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResultDTO {
  token: string;
  expiresAt: string;
  userId: string;
  userName: string;
}

export interface IAuthRepository {
  login(credentials: LoginDTO): Promise<AuthResultDTO>;
  register(userData: RegisterDTO): Promise<AuthResultDTO>;
  logout(): Promise<void>;
  getCurrentSession(): Promise<any | null>;
  isAuthenticated(): boolean;
}
