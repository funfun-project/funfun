'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/libs/utils/twMerge';
import CategoryList from './CategoryList';
import { getInputClassName } from '../inputStyle';

type Props = {
  id?: string;
  className?: string;
  value: string;
  placeholder: string;
  error?: string | null;
  items?: string[];
  onSelect?: (v: string) => void;
  onBlur?: () => void;
};

export default function SelectInput({
  id,
  className,
  value,
  placeholder,
  error = null,
  items = [],
  onSelect,
  onBlur,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const ignoreNextToggleRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [valueList, setValueList] = useState<string[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (rootRef.current && !rootRef.current.contains(target)) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [onBlur]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBlur]);

  const selectToggle = () => {
    if (ignoreNextToggleRef.current) return;

    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        queueMicrotask(() => inputRef.current?.focus());
      } else {
        onBlur?.();
      }

      return next;
    });
  };

  const handleSelect = (item: string) => {
    ignoreNextToggleRef.current = true;

    const isRemoving = valueList.includes(item);
    const nextList = isRemoving
      ? valueList.filter((prevItem) => prevItem !== item)
      : [...valueList, item];

    // 2. 상태를 업데이트합니다.
    setValueList(nextList);

    // 3. '이미 계산된' nextList의 길이를 체크합니다.
    if (nextList.length === 3) {
      setIsOpen(false);
      onBlur?.();

      const value = nextList.join(' • ');
      onSelect?.(value);
    }
    requestAnimationFrame(() => {
      ignoreNextToggleRef.current = false;
    });
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <input
        id={id}
        ref={inputRef}
        className={getInputClassName({
          isActive: isOpen,
          error,
          clickable: true,
        })}
        autoComplete="off"
        value={value}
        placeholder={error ?? placeholder}
        readOnly
        onClick={selectToggle}
        onBlur={() => {
          onSelect?.(value);
          selectToggle();
        }}
      />

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={selectToggle}
        className={cn(
          'absolute top-2.5 right-2.5 transition-transform',
          isOpen ? 'rotate-180' : '',
        )}
      >
        <ChevronDown size={24} color="#5E5E5E" />
      </button>

      {isOpen && <CategoryList items={items} onSelect={handleSelect} />}
    </div>
  );
}
