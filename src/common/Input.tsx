// 'use client';

// import type React from 'react';
// import { validationInput } from '@/libs/utils/createGathering';
// import { cn } from '@/libs/utils/twMerge';
// import { useRef, useState, useCallback } from 'react';
// import useUpdateStore from '@/libs/hook/use-create-gathering/useUpdateStore';
// import { ChevronDown } from 'lucide-react';
// import SelectBox from './CategoryList';

// type Props = {
//   className?: string;
//   //외부에서 넘어오는 value 값
//   selectValue?: string | Date;
//   //selector에 넣을 아이템 리스트 값
//   category?: string[];
//   //input 태그의 type
//   inputType: string;
//   //store form 객체 안에서 핸들링 될 type
//   type: string;
//   placeholder: string;
// };

// export default function Input({
//   className,
//   inputType,
//   type,
//   selectValue,
//   placeholder,
//   category,
// }: Props) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [action, setAction] = useState(false);
//   const [error, setError] = useState<null | string>(null);
//   const [select, setSelect] = useState<null | string>(null);

//   const updateStore = useUpdateStore();

//   const commitValue = useCallback(
//     (fieldType: string, nextValue: string | Date) => {
//       const errorMessage = validationInput(fieldType, nextValue);

//       if (errorMessage) {
//         setError(errorMessage);
//         return;
//       }

//       setError(null);
//       updateStore(fieldType, nextValue);
//     },
//     [updateStore],
//   );

//   const handleBlur = (fieldType: string, e: React.FocusEvent<HTMLInputElement>) => {
//     setAction(false);

//     const nextValue = selectValue ?? e.target.value;
//     commitValue(fieldType, nextValue);
//   };

//   const handleSelect = (item: string) => {
//     setSelect(item);

//     if (inputRef.current) inputRef.current.value = item;

//     commitValue(type, item);
//     inputRef.current?.blur();
//   };

//   const handleToggle = () => {
//     if (action) {
//       inputRef.current?.focus();
//       return;
//     }
//     inputRef.current?.blur();
//   };

//   return (
//     <div className={cn('relative', className)}>
//       <input
//         className={cn(
//           'bg-bg-input placeholder:text-text-disabled caret-main text-text-default box-border flex h-11 w-full items-center rounded-[3px] pl-3.5 outline-none',
//           action ? 'border-main placeholder:text-text-disabled border-1' : '',
//           !action && error ? 'placeholder:text-[#FF5126] placeholder:opacity-50' : '',
//           type === 'category' && 'cursor-pointer',
//         )}
//         // <form autocomplete="off"></form> 으로 올려서 최상위 요소에서 끄기
//         autoComplete="off"
//         ref={inputRef}
//         type={inputType}
//         name={`form_${type}`}
//         defaultValue={select ? select : (selectValue as string)}
//         placeholder={!action && error ? error : placeholder}
//         readOnly={type === 'selector'}
//         onClick={handleToggle}
//         onFocus={() => setAction(true)}
//         onBlur={(e) => handleBlur(type, e)}
//       />

//       {type === 'category' && (
//         <button
//           type="button"
//           className={cn(
//             'absolute top-2.5 right-2.5 transition-transform',
//             action ? 'rotate-180' : '',
//           )}
//         >
//           <ChevronDown size={24} color="#5E5E5E" />
//         </button>
//       )}

//       {type === 'category' && action && <SelectBox items={category} onSelect={handleSelect} />}
//     </div>
//   );
// }

'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/libs/utils/twMerge';
import { ChevronDown } from 'lucide-react';
import SelectBox from './CategoryList';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggle = () => {
    if (mode !== 'select') return;
    setIsOpen((prev) => !prev);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsOpen(false);
    onBlur?.();
  };

  const handleSelect = (item: string) => {
    onSelect?.(item);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={cn('relative', className)}>
      <input
        id={id}
        ref={inputRef}
        className={cn(
          'bg-bg-input placeholder:text-text-disabled caret-main text-text-default box-border flex h-11 w-full items-center rounded-[3px] pl-3.5 outline-none',
          isFocused ? 'border-main border-1' : '',
          error ? 'border-1 border-[#FF5126]' : '',
          mode === 'select' && 'cursor-pointer',
        )}
        autoComplete="off"
        value={value}
        placeholder={error ?? placeholder}
        readOnly={mode === 'select'}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onClick={toggle}
        onChange={(e) => onChange?.(e.target.value)}
      />

      {mode === 'select' && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // blur 방지
          onClick={toggle}
          className={cn(
            'absolute top-2.5 right-2.5 transition-transform',
            isOpen ? 'rotate-180' : '',
          )}
        >
          <ChevronDown size={24} color="#5E5E5E" />
        </button>
      )}

      {mode === 'select' && isOpen && <SelectBox items={items} onSelect={handleSelect} />}

      {/* placeholder 에러 대신 아래 표기도 추천. 지금은 둘 다 가능 */}
      {/* {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>} */}
    </div>
  );
}
