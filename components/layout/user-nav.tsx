'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from './loading';

export function UserNav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    // Add logout logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'dark' ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : theme === 'system' ? (
                <Laptop className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
                {theme === 'light' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {theme === 'dark' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Laptop className="mr-2 h-4 w-4" />
                System
                {theme === 'system' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleLogout} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="mr-2 h-4 w-4" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}