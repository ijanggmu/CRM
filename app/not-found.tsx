'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <FileQuestion className="mx-auto h-24 w-24 text-primary/50" />
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. Please check the URL or return to the dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => router.push('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}