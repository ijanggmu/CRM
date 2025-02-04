'use client';

import { useState } from 'react';
import { DataTable } from '@/components/common/data-table';
import { PolicyDialog } from '@/components/policies/policy-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Policy, usePolicies } from '@/hooks/use-policies';
import { LoadingSpinner } from '@/components/layout/loading';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export default function PoliciesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { policies, isLoading, deletePolicy } = usePolicies();

  const columns: ColumnDef<Policy>[] = [
    {
      accessorKey: 'id',
      header: 'Policy ID',
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <div className="font-medium">{row.getValue('customer')}</div>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'premium',
      header: 'Premium',
      cell: ({ row }) => (
        <div className="font-medium text-right">{row.getValue('premium')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Active' ? 'destructive' : 'secondary'}>
          {row.getValue('status')}
        </Badge>
      ),
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('expiryDate'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Policies</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Policy
        </Button>
      </div>
      
      <DataTable<Policy>
          data={policies}
          columns={columns}
          moduleType="policies"
          onDelete={(policy) => deletePolicy(policy.id)}
/>
      
      <PolicyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}