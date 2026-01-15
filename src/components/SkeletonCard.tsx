import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`flex items-center py-4 ${className}`}>
      <div className="bg-text-disabled mr-3 h-14 w-14 animate-pulse rounded-lg"></div>
      <div className="flex flex-grow flex-col gap-2">
        <div className="bg-text-disabled h-4 w-3/4 animate-pulse"></div>
        <div className="bg-text-disabled h-3.5 w-2/5 animate-pulse"></div>
      </div>
    </div>
  );
}
