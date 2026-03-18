'use client';

import { cn } from '@/libs/utils/twMerge';
import { Plus } from 'lucide-react';

type Props = {
  mode?: 'gathering' | 'inquiry';
  onClick: () => void;
  className?: string;
};

export default function AddImage({ mode = 'gathering', onClick, className }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className={cn(
        'bg-bg-input flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border-2 border-[#4e4e4e]',
        className,
      )}
    >
      <p className="text-[#D6D6D6]">
        {mode === 'gathering' ? '대표 사진을 추가해 주세요' : '사진을 추가해 주세요'}
      </p>
      <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
        <Plus color="#FF5126" size={28} />
      </div>
    </div>
  );
}
