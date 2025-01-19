'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText } from 'lucide-react';

const policies = [
  {
    id: 'POL001',
    customer: 'John Doe',
    type: 'Auto Insurance',
    premium: '$150/month',
    status: 'Active',
    expiryDate: '2025-03-15',
  },
  // Add more mock data as needed
];

export default function PoliciesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Policies</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Policy
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Policy Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search policies..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.id}</TableCell>
                  <TableCell>{policy.customer}</TableCell>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>{policy.premium}</TableCell>
                  <TableCell>{policy.status}</TableCell>
                  <TableCell>{policy.expiryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}