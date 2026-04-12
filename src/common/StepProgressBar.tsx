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
  inactiveColor = '#292929',
}: StepProgressBarProps) {
  return (
    <div className="flex gap-2 py-5">
      {Array.from({ length: total }).map((_, index: number) => {
        const current = index + 1;
        const isActive = step >= current;

        return (
          <div key={current} className="h-1 flex-1 bg-[#292929]">
            <div
              className={cn(
                'bg-main h-full w-0',
                !(current === 1) && isActive ? 'progressAction' : '',
                current === 1 && 'w-full',
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
