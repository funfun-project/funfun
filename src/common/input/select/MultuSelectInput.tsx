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
  const [isOpen, setIsOpen] = useState(false);
  const [valueList, setValueList] = useState<string[]>([]);

  // 외부 클릭 시 닫기 및 값 업데이트 로직
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          // 닫힐 때 현재 선택된 리스트를 부모에게 전달
          onSelect?.(valueList.join(' • '));
          onBlur?.();
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, valueList, onSelect, onBlur]);

  const selectToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      // 닫는 동작일 때 부모에게 최종 값 전달
      if (!next) {
        onSelect?.(valueList.join(' • '));
        onBlur?.();
      }
      return next;
    });
  };

  const handleSelect = (item: string) => {
    const isRemoving = valueList.includes(item);
    let nextList: string[];

    if (isRemoving) {
      nextList = valueList.filter((prevItem) => prevItem !== item);
    } else {
      if (valueList.length >= 3) return;
      nextList = [...valueList, item];
    }

    setValueList(nextList);

    // 3개가 선택되면 자동으로 닫고 값 업데이트
    if (nextList.length === 3) {
      setIsOpen(false);
      onSelect?.(nextList.join(' • '));
      onBlur?.();
    }
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <input
        id={id}
        className={getInputClassName({
          // 핵심: 리스트가 열려있을 때만 isActive를 true로 줌.
          // error가 있으면 함수 내부 로직에 의해 border-[#FF5126]이 우선 적용됨.
          isActive: isOpen,
          error: error, // 에러가 있으면 보더가 생기고, 없으면 사라짐
          clickable: true,
        })}
        autoComplete="off"
        value={value}
        placeholder={error ?? placeholder}
        readOnly
        onClick={selectToggle}
        // focus 시 브라우저 기본 보더가 생기는 걸 방지 (outline-none은 이미 함수에 있음)
      />

      <button
        type="button"
        onClick={selectToggle}
        className={cn(
          'absolute top-2.5 right-2.5 transition-transform',
          isOpen ? 'rotate-180' : '',
        )}
      >
        <ChevronDown size={24} color="#5E5E5E" />
      </button>

      {isOpen && <CategoryList items={items} onSelect={handleSelect} selected={valueList} />}
    </div>
  );
}
