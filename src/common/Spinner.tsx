'use client';
import '@/assets/styles/spinner.css';
import { cn } from '@/libs/utils/twMerge';

export default function Spinner({ className }: { className?: string }) {
  return (
    <>
      <div className={cn('spinner-container h-12.5 w-12.5', className)}>
        <div className="spinner z-10"></div>
        <div className="spinner delay-one z-20"></div>
        <div className="spinner delay-two z-30"></div>
      </div>
    </>
  );
}
