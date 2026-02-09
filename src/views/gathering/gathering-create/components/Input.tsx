'use client';

import type React from 'react';
import { validationInput } from '@/libs/utils/createGathering';
import { cn } from '@/libs/utils/twMerge';
import { useRef, useState } from 'react';

type Props = {
  className: string;
  type: string;
  value?: string | Date;
  placeholder: string;
};

export default function Input({ className, type, value, placeholder }: Props) {
  const inputRef = useRef(null);
  const [action, setAction] = useState(false);
  const [error, setError] = useState(false);

  const handleBlur = (type: string, e: React.FocusEvent<HTMLInputElement>) => {
    const validValue = value ? value : e.target.value;
    const validationResult = validationInput(type, validValue);
    setError(validationResult);
    setAction(false);
  };

  return (
    <>
      <div className={cn('mt-1.25', className)}>
        <input
          className={cn(
            'bg-bg-input placeholder:text-text-disabled flex h-11 w-full items-center pl-3.5',
            action ? 'border-main border-1' : '',
          )}
          ref={inputRef}
          placeholder={placeholder}
          onFocus={() => setAction(true)}
          onBlur={(e) => handleBlur(type, e)}
        />
        {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>}
      </div>
    </>
  );
}
