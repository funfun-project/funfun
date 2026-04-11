'use client';

import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/progressbar.css';

interface StepProgressBarProps {
  step: number;
  total: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function StepProgressBar({
  step,
  total,
  activeColor = '#FF5126',
  inactiveColor = '#555',
}: StepProgressBarProps) {
  return (
    <div className="flex gap-2 py-5">
      {Array.from({ length: total }).map((_, index) => {
        const current = index + 1;
        const isActive = step >= current;

        return (
          <div
            key={current}
            // className="flex-1 py-1"
            className="flex-1"
            style={{
              backgroundColor: isActive ? activeColor : inactiveColor,
              transition: '0.3s',
            }}
          >
            <div className={cn('bg-main h-full w-0', isActive ? 'progressAction' : '')}></div>
          </div>
        );
      })}
    </div>
  );
}
