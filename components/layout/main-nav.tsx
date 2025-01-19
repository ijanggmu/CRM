'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BarChart3,
  Users,
  UserPlus,
  FileCheck,
  FileText,
  Settings,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Leads',
    href: '/leads',
    icon: UserPlus,
  },
  {
    title: 'Claims',
    href: '/claims',
    icon: FileCheck,
  },
  {
    title: 'Policies',
    href: '/policies',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface MainNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function MainNav({ isCollapsed, onToggle }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'relative border-r bg-[#1C75CD] text-white h-screen',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        <div
          className={cn(
            'flex items-center gap-2',
            isCollapsed && 'justify-center w-full'
          )}
        >
          {!isCollapsed && (
            <span className="font-bold text-xl">Project Connectivity</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/10"
            onClick={onToggle}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-4">
        <nav className="grid gap-1 px-2">
          {sidebarNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10',
                pathname === item.href && 'bg-white/20',
                isCollapsed && 'justify-center'
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}