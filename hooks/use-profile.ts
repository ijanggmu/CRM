'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  bio?: string;
  avatar?: string;
}

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile: Profile = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        title: 'Field Officer',
        bio: 'Experienced field officer with expertise in customer relations.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      };

      setProfile(mockProfile);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updatedProfile: Partial<Profile>) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(prev => ({ ...prev!, ...updatedProfile }));
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updatePassword = async (passwordUpdate: PasswordUpdate) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    updatePassword,
  };
}