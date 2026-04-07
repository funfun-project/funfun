'use client';

import React, { useState, useRef } from 'react';
import { getInputClassName } from './inputStyle';
import { CircleCheck } from 'lucide-react';

type Props = {
  id?: string;
  mode?: 'address';
  className?: string;
  value: string;
  placeholder: string;
  error?: string | null;
  onFocus?: () => void;
  onChange?: (v: string) => void;
  onBlur?: () => void;
  addressSuccess?: boolean;
};

export default function TextInput({
  id,
  mode,
  className,
  value,
  placeholder,
  error = null,
  onChange,
  onFocus,
  onBlur,
  addressSuccess,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        ref={inputRef}
        autoComplete="off"
        value={value}
        placeholder={error ?? placeholder}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') inputRef.current?.blur();
        }}
        className={getInputClassName({
          isActive: isFocused,
          error,
          className,
        })}
      />
      {mode === 'address' && (
        <span className="absolute top-2.75 right-2.5">
          <CircleCheck size={22} color={addressSuccess ? 'rgba(255,81,38,.7)' : '#5E5E5E'} />
        </span>
      )}
    </div>
  );
}
