'use client';

import { useState } from 'react';
import { DataTable } from '@/components/common/data-table';
import { CustomerDialog } from '@/components/customers/customer-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCustomers } from '@/hooks/use-customers';
import { LoadingSpinner } from '@/components/layout/loading';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export default function CustomersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { customers, isLoading, deleteCustomer } = useCustomers();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'policies',
      header: 'Policies',
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.getValue('policies')}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Active' ? 'success' : 'secondary'}>
          {row.getValue('status')}
        </Badge>
      ),
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
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      <DataTable
        data={customers}
        columns={columns}
        moduleType="customers"
        onDelete={deleteCustomer}
      />
      
      <CustomerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}