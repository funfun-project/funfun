'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/libs/utils/twMerge';
import { ChevronDown } from 'lucide-react';
import CategoryList from './CategoryList';

type Props = {
  id?: string;
  className?: string;
  value: string;
  placeholder: string;
  error?: string | null;

  mode?: 'text' | 'select';
  items?: string[];

  onChange?: (v: string) => void;
  onSelect?: (v: string) => void;
  onBlur?: () => void;
};

export default function Input({
  id,
  className,
  value,
  placeholder,
  error = null,
  mode = 'text',
  items = [],
  onChange,
  onSelect,
  onBlur,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const ignoreNextToggleRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showMainBorder = mode === 'select' ? isOpen : isFocused;

  const toggle = () => {
    if (mode !== 'select') return;

    if (ignoreNextToggleRef.current) return;

    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        queueMicrotask(() => inputRef.current?.focus());
      }

      return next;
    });
  };

  const handleBlur = () => {
    if (mode === 'text') {
      setIsFocused(false);
    }

    onBlur?.();
  };

  const handleSelect = (item: string) => {
    ignoreNextToggleRef.current = true;

    onSelect?.(item);
    setIsOpen(false);

    requestAnimationFrame(() => {
      ignoreNextToggleRef.current = false;
    });
  };

  return (
    <div className={cn('relative', className)}>
      <input
        id={id}
        ref={inputRef}
        className={cn(
          'bg-bg-input placeholder:text-text-disabled caret-main text-text-default box-border flex h-11 w-full items-center rounded-[3px] pl-3.5 outline-none',
          showMainBorder ? 'border-main border' : 'border border-transparent',
          error ? 'border border-[#FF5126]' : '',
          mode === 'select' && 'cursor-pointer',
        )}
        autoComplete="off"
        value={value}
        placeholder={error ?? placeholder}
        readOnly={mode === 'select'}
        onFocus={() => {
          if (mode === 'text') setIsFocused(true);
        }}
        onBlur={handleBlur}
        onClick={toggle}
        onChange={(e) => onChange?.(e.target.value)}
      />

      {mode === 'select' && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggle}
          className={cn(
            'absolute top-2.5 right-2.5 transition-transform',
            isOpen ? 'rotate-180' : '',
          )}
        >
          <ChevronDown size={24} color="#5E5E5E" />
        </button>
      )}

      {mode === 'select' && isOpen && <CategoryList items={items} onSelect={handleSelect} />}
    </div>
  );
}
