import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Bug } from '@shared/types';
interface BugPostProps {
  bug: Bug;
}
export function BugPost({ bug }: BugPostProps) {
  const timeAgo = formatDistanceToNow(new Date(bug.timestamp), { addSuffix: true });
  return (
    <div className="bugchan-container bg-card mb-4 break-words transition-all duration-200">
      <div className="bugchan-header text-sm flex justify-between items-center">
        <span className="font-bold text-destructive-foreground/90">{bug.errorType}</span>
        <div className="text-xs text-primary-foreground/80">
          <span>{timeAgo}</span>
          <span className="ml-2">ID: {bug.id.slice(0, 8)}</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {bug.subject && <h3 className="text-lg font-bold text-foreground">{bug.subject}</h3>}
        {bug.imageUrl && (
          <a href={bug.imageUrl} target="_blank" rel="noopener noreferrer" className="block">
            <img
              src={bug.imageUrl}
              alt={bug.subject || 'Bug image'}
              className="max-w-xs max-h-80 object-contain rounded border border-border"
            />
          </a>
        )}
        <p className="text-foreground whitespace-pre-wrap text-sm">{bug.description}</p>
      </div>
    </div>
  );
}