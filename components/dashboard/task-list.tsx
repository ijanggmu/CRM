'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const tasks = [
  {
    id: 1,
    task: 'Review pending claims',
    assignee: 'John Doe',
    priority: 'High',
    dueDate: '2024-03-25',
    completed: false,
  },
  {
    id: 2,
    task: 'Follow up with potential clients',
    assignee: 'Jane Smith',
    priority: 'Medium',
    dueDate: '2024-03-26',
    completed: true,
  },
  {
    id: 3,
    task: 'Update policy documentation',
    assignee: 'Bob Johnson',
    priority: 'Low',
    dueDate: '2024-03-27',
    completed: false,
  },
];

export function TaskList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox checked={task.completed} />
            </TableCell>
            <TableCell>{task.task}</TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}