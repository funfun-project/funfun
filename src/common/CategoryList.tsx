'use client';

import { cn } from '@/libs/utils/twMerge';

type Props = {
  items: string[] | undefined;
  className?: string;
  onSelect: (item: string) => void;
};

export default function SelectBox({ items, className, onSelect }: Props) {
  return (
    <ul
      className={cn(
        'bg-bg-input absolute flex w-full flex-col gap-2.5 rounded-[3px] px-3.5 py-2',
        className,
      )}
    >
      {items?.map((item) => (
        <li
          key={item}
          className="text-text-disabled hover:text-text-active text-body3 cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
