'use client';

import { cn } from '@/libs/utils/twMerge';

type Props = {
  item: string;
  onSelect: (item: string) => void;
  selected?: string[];
};

export default function ListItem({ item, onSelect, selected }: Props) {
  // useState 대신 부모의 selected 배열에 포함 여부로 select 상태 결정
  const select = selected?.includes(item);

  return (
    <li
      className={cn('text-body3 cursor-pointer', select ? 'text-text-active' : 'text-[#5e5e5e]')}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(item);
      }}
    >
      {item}
    </li>
  );
}
