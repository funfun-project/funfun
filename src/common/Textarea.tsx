'use client';

import { cn } from '@/libs/utils/twMerge';
import { useMemo, useState } from 'react';
import { Pencil } from 'lucide-react';

type Props = {
  max?: number;
  placeholder?: string;
  className?: string;
};

export default function Textarea({ max = 200, placeholder, className }: Props) {
  const [value, setValue] = useState('');

  const count = useMemo(() => value.length, [value]);

  return (
    <div
      className={cn(
        'bg-bg-input relative w-full grow-1 rounded-[20px] border-1 border-[#4e4e4e] px-2.5 pt-2.5',
        className,
      )}
    >
      <p className="text-body3 mb-2.5 flex items-center gap-1 text-[#d6d6d6]">
        <Pencil size={14} color="rgba(255, 81, 38, 0.7)" />
        상세 내용을 작성해 주세요.
      </p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, max))}
        maxLength={max}
        rows={6}
        placeholder={placeholder}
        className="bg-bg-input caret-main placeholder:text-disabled placeholder:text-body4 w-full resize-none text-sm text-neutral-100 focus:outline-none"
      />

      <div className="pointer-events-none absolute right-2.5 bottom-2.5 text-xs text-neutral-400">
        {count} / {max}
      </div>
    </div>
  );
}
