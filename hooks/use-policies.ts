'use client';

import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/api/mock-data';
import { toast } from 'sonner';

export interface Policy {
  id: string;
  customer: string;
  type: string;
  premium: string;
  status: string;
  expiryDate: string;
}

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getPolicies();
      setPolicies(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load policies');
    } finally {
      setIsLoading(false);
    }
  };

  const createPolicy = async (data: Omit<Policy, 'id'>) => {
    try {
      const newPolicy = await mockApi.createPolicy(data);
      setPolicies(prev => [...prev, newPolicy]);
      toast.success('Policy created successfully');
      return newPolicy;
    } catch (err) {
      toast.error('Failed to create policy');
      throw err;
    }
  };

  const updatePolicy = async (id: string, data: Partial<Policy>) => {
    try {
      const updatedPolicy = await mockApi.updatePolicy(id, data);
      setPolicies(prev =>
        prev.map(policy =>
          policy.id === id ? { ...policy, ...updatedPolicy } : policy
        )
      );
      toast.success('Policy updated successfully');
    } catch (err) {
      toast.error('Failed to update policy');
      throw err;
    }
  };

  const deletePolicy = async (id: string) => {
    try {
      await mockApi.deletePolicy(id);
      setPolicies(prev => prev.filter(policy => policy.id !== id));
      toast.success('Policy deleted successfully');
    } catch (err) {
      toast.error('Failed to delete policy');
      throw err;
    }
  };

  return {
    policies,
    isLoading,
    error,
    createPolicy,
    updatePolicy,
    deletePolicy,
  };
}