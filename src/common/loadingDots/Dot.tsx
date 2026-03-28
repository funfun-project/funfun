'use client';

import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/dotsLoading.css';

type Props = {
  className?: string;
  delay: number;
};

export default function Dot({ className, delay }: Props) {
  return (
    <>
      <div
        className={cn('loading-animation h-2.5 w-2.5 rounded-full bg-[#FF5126]', className)}
        style={{
          animationDelay: `${delay * 0.2}s`,
        }}
      ></div>
    </>
  );
}
