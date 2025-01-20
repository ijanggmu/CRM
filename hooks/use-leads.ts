'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: string;
  createdAt: string;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLeads: Lead[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234 567 890',
          status: 'New',
          source: 'Website',
          createdAt: '2024-03-20',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 234 567 891',
          status: 'Contacted',
          source: 'Referral',
          createdAt: '2024-03-19',
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          phone: '+1 234 567 892',
          status: 'Qualified',
          source: 'Social Media',
          createdAt: '2024-03-18',
        },
      ];

      setLeads(mockLeads);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const createLead = async (newLead: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lead: Lead = {
        ...newLead,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split('T')[0],
      };

      setLeads(prev => [...prev, lead]);
      setError(null);
      return lead;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateLead = async (id: string, updatedLead: Partial<Lead>) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLeads(prev =>
        prev.map(lead =>
          lead.id === id ? { ...lead, ...updatedLead } : lead
        )
      );
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLeads(prev => prev.filter(lead => lead.id !== id));
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    leads,
    isLoading,
    error,
    createLead,
    updateLead,
    deleteLead,
  };
}