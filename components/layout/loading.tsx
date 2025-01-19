'use client';

import { Network } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <Network className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
        <div className="relative h-4 w-48 bg-muted rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-primary w-1/2 animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('animate-spin', className)}>
      <Network className="h-5 w-5" />
    </div>
  );
}