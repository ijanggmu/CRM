'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadsDataTable } from '@/components/leads/leads-table';
import { LeadDialog } from '@/components/leads/lead-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLeads } from '@/hooks/use-leads';
import { LoadingSpinner } from '@/components/layout/loading';

export default function LeadsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading } = useLeads();

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
        <h1 className="text-3xl font-bold">Leads</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>
      
      <LeadsDataTable />
      <LeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}