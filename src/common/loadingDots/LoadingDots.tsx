'use client';

import { cn } from '@/libs/utils/twMerge';
import Dot from './Dot';

type Props = {
  className?: string;
  // flex gap
  dotsInterval?: string;
  // dot 개수
  count?: number;
};

export default function LoadingDots({ className, dotsInterval, count = 3 }: Props) {
  const duration = count * 200;
  return (
    <div
      className={cn('flex gap-2.5', dotsInterval)}
      style={{ '--duration': `${duration}ms` } as React.CSSProperties}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} className={className} delay={i} />
      ))}
    </div>
  );
}
