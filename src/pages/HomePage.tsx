import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Bug } from '@shared/types';
import { BugForm } from '@/components/BugForm';
import { ErrorDashboard } from '@/components/ErrorDashboard';
import { BugPost } from '@/components/BugPost';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
const POLLING_INTERVAL = 5000; // 5 seconds
export function HomePage() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBugs = useCallback(async () => {
    try {
      const response = await fetch('/api/bugs');
      if (!response.ok) {
        throw new Error('Failed to fetch bugs');
      }
      const data = await response.json();
      if (data.success) {
        setBugs(data.data);
        setError(null);
      } else {
        throw new Error(data.error || 'API returned an error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchBugs();
    const intervalId = setInterval(fetchBugs, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchBugs]);
  const activeBugs = useMemo(() => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    return bugs
      .filter((bug) => bug.timestamp >= twentyFourHoursAgo)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [bugs]);
  return (
    <div className="bg-background min-h-screen font-sans text-foreground">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-bold">BugChan 🪳</h1>
          <p className="text-sm text-muted-foreground italic">
            "the only good bug is a dead buug - Starship troopers"
          </p>
        </header>
        <div className="space-y-8">
          <BugForm onBugSubmit={fetchBugs} />
          <ErrorDashboard bugs={activeBugs} />
          <div className="bugchan-container">
            <h2 className="bugchan-header">The Board</h2>
            <div className="p-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : error ? (
                <p className="text-destructive text-center">{error}</p>
              ) : activeBugs.length > 0 ? (
                activeBugs.map((bug) => <BugPost key={bug.id} bug={bug} />)
              ) : (
                <p className="text-muted-foreground text-center py-8">The board is clear. No bugs in the last 24 hours!</p>
              )}
            </div>
          </div>
        </div>
        <footer className="text-center mt-12 text-xs text-muted-foreground">
            <p>Built with ❤️ by HCK-BLD-DEV on Cloudflare</p>
        </footer>
      </main>
      <Toaster richColors />
    </div>
  );
}