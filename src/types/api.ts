
// Response wrapper based on Ardalis.Result pattern
export interface ApiResponse<T> {
  isSuccess: boolean;
  value?: T;
  errors?: string[];
  validationErrors?: Record<string, string[]>;
  status?: number;
}

// Pagination model for list responses
export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Auth models
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  userId: string;
  userName: string;
}
