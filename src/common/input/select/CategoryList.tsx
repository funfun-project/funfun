'use client';

import { cn } from '@/libs/utils/twMerge';
import ListItem from './ListItem';

type Props = {
  items: string[] | undefined;
  className?: string;
  onSelect: (item: string) => void;
};

export default function CategoryList({ items, className, onSelect }: Props) {
  return (
    <ul
      className={cn(
        'bg-bg-input absolute z-20 mt-1.25 flex w-full flex-col gap-2.5 rounded-[3px] px-3.5 py-2',
        className,
      )}
    >
      {items?.map((item) => (
        <ListItem key={item} item={item} onSelect={onSelect} />
      ))}
    </ul>
  );
}
