'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const notifications = [
  {
    id: 1,
    title: 'New Lead Assigned',
    description: 'Sarah Johnson has been assigned to you',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Policy Renewal',
    description: 'Policy #POL001 is due for renewal',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'New Claim Filed',
    description: 'Claim #CLM003 has been submitted',
    time: '2 hours ago',
    unread: false,
  },
];

export function NotificationCenter() {
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Notifications</p>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          <DropdownMenuGroup>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-4">
                <div className="flex items-start justify-between w-full">
                  <p className={`text-sm font-medium ${notification.unread ? 'text-primary' : ''}`}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}