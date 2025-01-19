'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const recentClaims = [
  {
    id: 'CLM001',
    customer: 'John Doe',
    type: 'Auto Insurance',
    amount: '$2,500',
    status: 'Pending',
  },
  {
    id: 'CLM002',
    customer: 'Jane Smith',
    type: 'Home Insurance',
    amount: '$5,000',
    status: 'Approved',
  },
  {
    id: 'CLM003',
    customer: 'Bob Johnson',
    type: 'Life Insurance',
    amount: '$10,000',
    status: 'Under Review',
  },
];

export function RecentClaims() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentClaims.map((claim) => (
          <TableRow key={claim.id}>
            <TableCell>{claim.id}</TableCell>
            <TableCell>{claim.customer}</TableCell>
            <TableCell>{claim.type}</TableCell>
            <TableCell>{claim.amount}</TableCell>
            <TableCell>{claim.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}