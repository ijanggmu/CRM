'use client';

import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/api/mock-data';
import { toast } from 'sonner';

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getDashboardStats();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboardData,
  };
}