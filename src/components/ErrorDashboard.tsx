import React from 'react';
import type { Bug } from '@shared/types';
import { Progress } from '@/components/ui/progress';
interface ErrorDashboardProps {
  bugs: Bug[];
}
// Custom styles for progress bar indicators to be used with Tailwind.
// Note: Shadcn's Progress component doesn't have an `indicatorClassName` prop.
// We apply these as direct classes, and Tailwind's JIT compiler will generate them.
const BAR_COLOR_CLASSES = [
  '[&>div]:bg-red-500',
  '[&>div]:bg-orange-500',
  '[&>div]:bg-amber-500',
  '[&>div]:bg-yellow-500',
  '[&>div]:bg-lime-500',
  '[&>div]:bg-green-500',
];
export function ErrorDashboard({ bugs }: ErrorDashboardProps) {
  const errorCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const bug of bugs) {
      counts.set(bug.errorType, (counts.get(bug.errorType) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a);
  }, [bugs]);
  const totalBugs = bugs.length;
  return (
    <div className="bugchan-container">
      <h2 className="bugchan-header">Common Errors (Last 24h)</h2>
      <div className="p-4 space-y-4">
        {totalBugs === 0 ? (
          <p className="text-sm text-muted-foreground">No bugs reported in the last 24 hours.</p>
        ) : (
          errorCounts.map(([errorType, count], index) => {
            const percentage = totalBugs > 0 ? (count / totalBugs) * 100 : 0;
            return (
              <div key={errorType}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium">{errorType}</span>
                  <span className="text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-3 ${BAR_COLOR_CLASSES[index % BAR_COLOR_CLASSES.length]}`} 
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}