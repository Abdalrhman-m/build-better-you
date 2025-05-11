
import { IProfileRepository } from '@/domain/repositories/IProfileRepository';
import { UserProfile } from '@/domain/entities/UserProfile';

export class ProfileService {
  private profileRepository: IProfileRepository;
  
  constructor(profileRepository: IProfileRepository) {
    this.profileRepository = profileRepository;
  }
  
  async getProfile(): Promise<UserProfile | null> {
    try {
      return await this.profileRepository.getProfile();
    } catch (error: any) {
      console.error("Get profile error:", error);
      throw new Error(error.message || "Failed to get profile");
    }
  }
  
  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      return await this.profileRepository.updateProfile(profile);
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw new Error(error.message || "Failed to update profile");
    }
  }
  
  async updateEmail(email: string): Promise<void> {
    try {
      await this.profileRepository.updateEmail(email);
    } catch (error: any) {
      console.error("Update email error:", error);
      throw new Error(error.message || "Failed to update email");
    }
  }
  
  async updatePassword(password: string): Promise<void> {
    try {
      await this.profileRepository.updatePassword(password);
    } catch (error: any) {
      console.error("Update password error:", error);
      throw new Error(error.message || "Failed to update password");
    }
  }
  
  async uploadAvatar(file: File): Promise<string> {
    try {
      return await this.profileRepository.uploadAvatar(file);
    } catch (error: any) {
      console.error("Upload avatar error:", error);
      throw new Error(error.message || "Failed to upload avatar");
    }
  }
}
