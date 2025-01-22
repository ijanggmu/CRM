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
import { useClaims, type Claim } from '@/hooks/use-claims';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/layout/loading';

const claimFormSchema = z.object({
  customer: z.string().min(2, 'Customer name must be at least 2 characters'),
  type: z.string().min(2, 'Type must be at least 2 characters'),
  amount: z.string().min(1, 'Amount is required'),
  status: z.enum(['Pending', 'Approved', 'Under Review', 'Rejected']),
});

interface ClaimDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim?: Claim | null;
}

export function ClaimDialog({ open, onOpenChange, claim }: ClaimDialogProps) {
  const { createClaim, updateClaim } = useClaims();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof claimFormSchema>>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      customer: claim?.customer || '',
      type: claim?.type || '',
      amount: claim?.amount || '',
      status: (claim?.status as any) || 'Pending',
    },
  });

  async function onSubmit(values: z.infer<typeof claimFormSchema>) {
    setIsSubmitting(true);
    try {
      if (claim) {
        await updateClaim(claim.id, values);
        toast.success('Claim updated successfully');
      } else {
        await createClaim(values);
        toast.success('Claim created successfully');
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error(claim ? 'Failed to update claim' : 'Failed to create claim');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{claim ? 'Edit Claim' : 'Add New Claim'}</DialogTitle>
          <DialogDescription>
            {claim
              ? 'Update the claim information below'
              : 'Fill in the information below to create a new claim'}
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="$0.00" />
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
                {claim ? 'Update Claim' : 'Create Claim'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}