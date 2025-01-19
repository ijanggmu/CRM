'use client';

import { Bell, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserNav } from './user-nav';
import { NotificationCenter } from './notification-center';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="ml-auto flex items-center gap-4">
          <NotificationCenter />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>नेपाली</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserNav />
        </div>
      </div>
    </header>
  );
}