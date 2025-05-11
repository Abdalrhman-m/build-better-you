
import { supabase } from '@/integrations/supabase/client';
import { IProfileRepository } from '@/domain/repositories/IProfileRepository';
import { UserProfile } from '@/domain/entities/UserProfile';

export class SupabaseProfileRepository implements IProfileRepository {
  async getProfile(): Promise<UserProfile | null> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.session.user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserProfile;
  }

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.session.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserProfile;
  }

  async updateEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ email });
    
    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      throw new Error(error.message);
    }
  }

  async uploadAvatar(file: File): Promise<string> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      throw new Error('User not authenticated');
    }

    const userId = session.session.user.id;
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    
    await this.updateProfile({ avatar_url: data.publicUrl });

    return data.publicUrl;
  }
}
