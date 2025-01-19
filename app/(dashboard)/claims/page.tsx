'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText } from 'lucide-react';

const claims = [
  {
    id: 'CLM001',
    customer: 'John Doe',
    type: 'Auto Insurance',
    amount: '$2,500',
    status: 'Pending',
    submittedDate: '2024-03-15',
  },
  // Add more mock data as needed
];

export default function ClaimsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Claims</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search claims..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.customer}</TableCell>
                  <TableCell>{claim.type}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>{claim.submittedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}