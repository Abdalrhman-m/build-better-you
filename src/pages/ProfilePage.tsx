
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Camera, Key, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { profileService } from '@/services/profile-service';
import { UserProfile } from '@/types/api';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const profileFormSchema = z.object({
  username: z.string().min(3).max(50),
});

const emailFormSchema = z.object({
  email: z.string().email(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
    },
  });

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await profileService.getProfile();
      if (response.isSuccess && response.value) {
        setProfile(response.value);
        setAvatarUrl(response.value.avatar_url || null);
        
        // Update form values
        profileForm.reset({
          username: response.value.username || '',
        });
        
        if (user) {
          emailForm.reset({
            email: user.userName || '',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error loading profile',
          description: response.errors?.[0] || 'Failed to load profile data',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load profile data',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      const response = await profileService.updateProfile({
        username: data.username,
      });

      if (response.isSuccess) {
        setProfile(response.value);
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Update failed',
          description: response.errors?.[0] || 'Failed to update profile',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
    }
  };

  const onEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    try {
      const response = await profileService.updateEmail(data.email);

      if (response.isSuccess) {
        toast({
          title: 'Email update requested',
          description: 'Please check your inbox to confirm your new email address',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Update failed',
          description: response.errors?.[0] || 'Failed to update email',
        });
      }
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update email',
      });
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    try {
      const response = await profileService.updatePassword(data.newPassword);

      if (response.isSuccess) {
        toast({
          title: 'Password updated',
          description: 'Your password has been updated successfully',
        });
        passwordForm.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Update failed',
          description: response.errors?.[0] || 'Failed to update password',
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update password',
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please select an image smaller than 2MB',
      });
      return;
    }

    try {
      setUploading(true);
      const response = await profileService.uploadAvatar(file);

      if (response.isSuccess && response.value) {
        setAvatarUrl(response.value);
        fetchProfile(); // Refresh profile data
        toast({
          title: 'Avatar updated',
          description: 'Your profile picture has been updated successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: response.errors?.[0] || 'Failed to upload avatar',
        });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload avatar',
      });
    } finally {
      setUploading(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile || !profile.username) return 'U';
    
    const nameParts = profile.username.split(' ');
    if (nameParts.length === 1) {
      return profile.username.slice(0, 2).toUpperCase();
    }
    
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading profile...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
              <span className="sr-only">Upload avatar</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
            </label>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile?.username || 'User Profile'}</h1>
              <Badge variant="outline" className="ml-2">User</Badge>
            </div>
            <p className="text-muted-foreground">{user?.userName || 'Loading...'}</p>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Password</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={!profileForm.formState.isDirty}>
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>
                  Update your email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={!emailForm.formState.isDirty}>
                      Update Email
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">
                      Change Password
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
