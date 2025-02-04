'use client';

import { useState } from 'react';
import { DataTable } from '@/components/common/data-table';
import { ClaimDialog } from '@/components/claims/claim-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useClaims } from '@/hooks/use-claims';
import { LoadingSpinner } from '@/components/layout/loading';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export default function ClaimsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { claims, isLoading, deleteClaim } = useClaims();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'Claim ID',
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
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="font-medium text-right">{row.getValue('amount')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={
            status === 'Pending' ? 'default' :
            status === 'Approved' ? 'destructive' :
            status === 'Under Review' ? 'secondary' :
            'outline'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'submittedDate',
      header: 'Submitted Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('submittedDate'));
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
        <h1 className="text-3xl font-bold">Claims</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>
      
      <DataTable
        data={claims}
        columns={columns}
        moduleType="claims"
        onDelete={deleteClaim}
      />
      
      <ClaimDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}