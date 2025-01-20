'use client';

import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/api/mock-data';
import { toast } from 'sonner';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policies: number;
  status: string;
  createdAt: string;
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getCustomers();
      setCustomers(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomer = async (data: Omit<Customer, 'id' | 'createdAt'>) => {
    try {
      const newCustomer = await mockApi.createCustomer(data);
      setCustomers(prev => [...prev, newCustomer]);
      toast.success('Customer created successfully');
      return newCustomer;
    } catch (err) {
      toast.error('Failed to create customer');
      throw err;
    }
  };

  const updateCustomer = async (id: string, data: Partial<Customer>) => {
    try {
      const updatedCustomer = await mockApi.updateCustomer(id, data);
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === id ? { ...customer, ...updatedCustomer } : customer
        )
      );
      toast.success('Customer updated successfully');
    } catch (err) {
      toast.error('Failed to update customer');
      throw err;
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await mockApi.deleteCustomer(id);
      setCustomers(prev => prev.filter(customer => customer.id !== id));
      toast.success('Customer deleted successfully');
    } catch (err) {
      toast.error('Failed to delete customer');
      throw err;
    }
  };

  return {
    customers,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}