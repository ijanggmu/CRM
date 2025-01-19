'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus } from 'lucide-react';

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    source: 'Website',
    status: 'New',
    assignedTo: 'John Smith',
    lastContact: '2024-03-20',
  },
  // Add more mock data as needed
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}