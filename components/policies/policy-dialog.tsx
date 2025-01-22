'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePolicies, type Policy } from '@/hooks/use-policies';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/layout/loading';

const policyFormSchema = z.object({
  customer: z.string().min(2, 'Customer name must be at least 2 characters'),
  type: z.string().min(2, 'Type must be at least 2 characters'),
  premium: z.string().min(1, 'Premium is required'),
  status: z.enum(['Active', 'Inactive', 'Pending', 'Expired']),
  expiryDate: z.string().min(1, 'Expiry date is required'),
});

interface PolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy?: Policy | null;
}

export function PolicyDialog({ open, onOpenChange, policy }: PolicyDialogProps) {
  const { createPolicy, updatePolicy } = usePolicies();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof policyFormSchema>>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      customer: policy?.customer || '',
      type: policy?.type || '',
      premium: policy?.premium || '',
      status: (policy?.status as any) || 'Active',
      expiryDate: policy?.expiryDate || '',
    },
  });

  async function onSubmit(values: z.infer<typeof policyFormSchema>) {
    setIsSubmitting(true);
    try {
      if (policy) {
        await updatePolicy(policy.id, values);
        toast.success('Policy updated successfully');
      } else {
        await createPolicy(values);
        toast.success('Policy created successfully');
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error(policy ? 'Failed to update policy' : 'Failed to create policy');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{policy ? 'Edit Policy' : 'Add New Policy'}</DialogTitle>
          <DialogDescription>
            {policy
              ? 'Update the policy information below'
              : 'Fill in the information below to create a new policy'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Auto Insurance">Auto Insurance</SelectItem>
                      <SelectItem value="Home Insurance">Home Insurance</SelectItem>
                      <SelectItem value="Life Insurance">Life Insurance</SelectItem>
                      <SelectItem value="Health Insurance">Health Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="premium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="$0/month" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoadingSpinner className="mr-2 h-4 w-4" />}
                {policy ? 'Update Policy' : 'Create Policy'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}