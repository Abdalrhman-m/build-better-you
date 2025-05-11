
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from '@/application/di/container';
import { ProfileService } from '@/application/services/ProfileService';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/domain/entities/UserProfile';

export function useProfileService() {
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const profileService = container.get<ProfileService>('profileService');

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profile = await profileService.getProfile();
      return profile;
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      setIsUpdating(true);
      try {
        return await profileService.updateProfile(profileData);
      } finally {
        setIsUpdating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    }
  });

  const updateEmail = async (email: string): Promise<boolean> => {
    setIsUpdating(true);
    try {
      await profileService.updateEmail(email);
      toast({
        title: "Email updated",
        description: "Your email has been successfully updated.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Email update failed",
        description: error.message || "Failed to update email.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    setIsUpdating(true);
    try {
      await profileService.updatePassword(password);
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    setIsUpdating(true);
    try {
      const url = await profileService.uploadAvatar(file);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been successfully uploaded.",
      });
      return url;
    } catch (error: any) {
      toast({
        title: "Avatar upload failed",
        description: error.message || "Failed to upload avatar.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    updateProfile: (profileData: Partial<UserProfile>) => updateProfileMutation.mutate(profileData),
    updateEmail,
    updatePassword,
    uploadAvatar
  };
}
