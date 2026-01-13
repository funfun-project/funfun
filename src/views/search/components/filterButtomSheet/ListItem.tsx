'use client';

import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/libs/utils/twMerge';
import { Check } from 'lucide-react';

type Props = {
  name: string;
  toggle?: null | string;
  setToggle?: Dispatch<SetStateAction<string>>;
};

export default function ListItem({ name, toggle, setToggle }: Props) {
  const handleClick = () => {
    if (toggle === name) {
      setToggle?.('');
      return;
    }
    setToggle?.(name);
  };
  return (
    <>
      <li onClick={handleClick} className="w-full border-b border-b-[#292929]">
        <button className="flex w-full justify-between px-[10px] py-[9px]">
          <span className={cn('text-body2', name === toggle ? 'text-[#FF5126]' : 'text-[#f6f6f6]')}>
            {name}
          </span>
          <Check size={20} color={name === toggle ? '#FF5126' : '#535353'} />
        </button>
      </li>
    </>
  );
}
