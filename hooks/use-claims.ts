'use client';

import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/api/mock-data';
import { toast } from 'sonner';

export interface Claim {
  id: string;
  customer: string;
  type: string;
  amount: string;
  status: string;
  submittedDate: string;
}

export function useClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getClaims();
      setClaims(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load claims');
    } finally {
      setIsLoading(false);
    }
  };

  const createClaim = async (data: Omit<Claim, 'id' | 'submittedDate'>) => {
    try {
      const newClaim = await mockApi.createClaim(data);
      setClaims(prev => [...prev, newClaim]);
      toast.success('Claim created successfully');
      return newClaim;
    } catch (err) {
      toast.error('Failed to create claim');
      throw err;
    }
  };

  const updateClaim = async (id: string, data: Partial<Claim>) => {
    try {
      const updatedClaim = await mockApi.updateClaim(id, data);
      setClaims(prev =>
        prev.map(claim =>
          claim.id === id ? { ...claim, ...updatedClaim } : claim
        )
      );
      toast.success('Claim updated successfully');
    } catch (err) {
      toast.error('Failed to update claim');
      throw err;
    }
  };

  const deleteClaim = async (id: string) => {
    try {
      await mockApi.deleteClaim(id);
      setClaims(prev => prev.filter(claim => claim.id !== id));
      toast.success('Claim deleted successfully');
    } catch (err) {
      toast.error('Failed to delete claim');
      throw err;
    }
  };

  return {
    claims,
    isLoading,
    error,
    createClaim,
    updateClaim,
    deleteClaim,
  };
}