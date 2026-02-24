'use client';

import { cn } from '@/libs/utils/twMerge';
import { useMemo, useState, useRef } from 'react';
import { Pencil } from 'lucide-react';

type Props = {
  max?: number;
  id: string;
  value: string;
  error?: string | null;
  placeholder?: string;
  className?: string;
  onChange?: (v: string) => void;
  onBlur?: () => void;
};

export default function Textarea({
  max = 200,
  id,
  value,
  error,
  placeholder,
  className,
  onChange,
  onBlur,
}: Props) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const count = useMemo(() => value.length, [value]);

  return (
    <div
      className={cn(
        'bg-bg-input relative flex w-full grow-1 flex-col rounded-[20px] border-1 border-[#4e4e4e] px-2.5 py-2.5',
        isFocused ? 'border-[#FF5126]' : '',
        className,
      )}
    >
      <p className="text-body3 mb-2.5 flex items-center gap-1 text-[#d6d6d6]">
        <Pencil size={14} color="rgba(255, 81, 38, 0.7)" />
        상세 내용을 작성해 주세요.
      </p>
      <textarea
        id={id}
        ref={textRef}
        value={value}
        maxLength={max}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChange={(e) => onChange?.(e.target.value)}
        rows={6}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        placeholder={placeholder}
        className="bg-bg-input scrollbar caret-main placeholder:text-disabled placeholder:text-body4 w-full grow-1 resize-none text-sm text-neutral-100 focus:outline-none"
      />

      <div className="text-body4 text-text-disabled pointer-events-none mt-2.5 flex justify-end">
        <span className="text-white">{count} </span>/ {max}
      </div>
      {error && <p className="text-body4 absolute -bottom-5 left-0 text-[#FF5126]">{error}</p>}
    </div>
  );
}
