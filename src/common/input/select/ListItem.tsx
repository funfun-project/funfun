'use client';

import { cn } from '@/libs/utils/twMerge';
import { useState } from 'react';

type Props = {
  item: string;
  onSelect: (item: string) => void;
};
export default function ListItem({ item, onSelect }: Props) {
  const [select, setSelect] = useState(false);

  return (
    <>
      <li
        key={item}
        className={cn('text-body3 cursor-pointer', select ? 'text-text-active' : 'text-[#5e5e5e]')}
        onMouseDown={(e) => {
          if (select) {
            setSelect(false);
          } else {
            setSelect(true);
          }
          e.preventDefault();
          e.stopPropagation();
          onSelect(item);
        }}
      >
        {item}
      </li>
    </>
  );
}
