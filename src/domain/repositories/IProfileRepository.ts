
import { UserProfile } from "../entities/UserProfile";

export interface IProfileRepository {
  getProfile(): Promise<UserProfile | null>;
  updateProfile(profile: Partial<UserProfile>): Promise<UserProfile>;
  updateEmail(email: string): Promise<void>;
  updatePassword(password: string): Promise<void>;
  uploadAvatar(file: File): Promise<string>;
}
