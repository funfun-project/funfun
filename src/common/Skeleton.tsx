import '@/assets/styles/skeleton.css';
import { cn } from '@/libs/utils/twMerge';

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} />;
}
