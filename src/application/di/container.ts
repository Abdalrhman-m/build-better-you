
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { SupabaseProfileRepository } from '@/infrastructure/repositories/SupabaseProfileRepository';
import { ApiHabitRepository } from '@/infrastructure/repositories/ApiHabitRepository';
import { AuthService } from '@/application/services/AuthService';
import { ProfileService } from '@/application/services/ProfileService';
import { HabitService } from '@/application/services/HabitService';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { IProfileRepository } from '@/domain/repositories/IProfileRepository';
import { IHabitRepository } from '@/domain/repositories/IHabitRepository';

// Simple dependency injection container
class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    // Register repositories
    this.services.set('authRepository', new SupabaseAuthRepository());
    this.services.set('profileRepository', new SupabaseProfileRepository());
    this.services.set('habitRepository', new ApiHabitRepository());
    
    // Register services
    this.services.set('authService', new AuthService(this.get<IAuthRepository>('authRepository')));
    this.services.set('profileService', new ProfileService(this.get<IProfileRepository>('profileRepository')));
    this.services.set('habitService', new HabitService(this.get<IHabitRepository>('habitRepository')));
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  get<T>(serviceId: string): T {
    const service = this.services.get(serviceId);
    if (!service) {
      throw new Error(`Service ${serviceId} not found in container`);
    }
    return service as T;
  }
}

export const container = Container.getInstance();
