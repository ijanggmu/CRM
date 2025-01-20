'use client';

import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/api/mock-data';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getTasks();
      setTasks(response);
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (data: Omit<Task, 'id'>) => {
    try {
      const newTask = await mockApi.createTask(data);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const updatedTask = await mockApi.updateTask(id, data);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await mockApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };
}