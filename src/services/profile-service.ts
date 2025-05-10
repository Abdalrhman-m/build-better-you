
import { supabase } from '@/integrations/supabase/client';
import { ApiResponse, UserProfile } from '@/types/api';

export const profileService = {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: data as UserProfile
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to fetch profile']
      };
    }
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
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
        console.error('Error updating profile:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: data as UserProfile
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to update profile']
      };
    }
  },

  async updateEmail(email: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.auth.updateUser({ email });
      
      if (error) {
        console.error('Error updating email:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: undefined
      };
    } catch (error) {
      console.error('Email update error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to update email']
      };
    }
  },

  async updatePassword(password: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error('Error updating password:', error);
        return {
          isSuccess: false,
          errors: [error.message]
        };
      }

      return {
        isSuccess: true,
        value: undefined
      };
    } catch (error) {
      console.error('Password update error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to update password']
      };
    }
  },

  async uploadAvatar(file: File): Promise<ApiResponse<string>> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        return {
          isSuccess: false,
          errors: ['User not authenticated']
        };
      }

      const userId = session.session.user.id;
      const fileExtension = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExtension}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        return {
          isSuccess: false,
          errors: [uploadError.message]
        };
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update profile with new avatar URL
      await this.updateProfile({ avatar_url: data.publicUrl });

      return {
        isSuccess: true,
        value: data.publicUrl
      };
    } catch (error) {
      console.error('Avatar upload error:', error);
      return {
        isSuccess: false,
        errors: ['Failed to upload avatar']
      };
    }
  }
};
