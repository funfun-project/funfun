'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { SignUpMultiSelectProps } from '@/types/signUp-input-types';

export default function SignUpMultiSelect({
  value,
  options,
  onChange,
  max = 3,
}: SignUpMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    let updated: string[];

    if (value.includes(option)) {
      updated = value.filter((v) => v !== option);
    } else {
      if (value.length >= max) {
        toast.error(`최대 ${max}개까지만 선택 가능합니다.`);
        return;
      }
      updated = [...value, option];
    }

    onChange(updated);
  };

  return (
    <div className="relative w-full">
      {/* 선택 박스 */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[48px] w-full cursor-pointer items-center rounded-md border border-gray-600 bg-neutral-900 px-4 py-3 text-white"
      >
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {value.map((item) => (
              <span key={item} className="rounded bg-[#FF5126] px-2 py-1 text-xs text-white">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">카테고리를 선택하세요</span>
        )}
      </div>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-700 bg-[#292929] shadow-lg">
          {options.map((option) => {
            const selected = value.includes(option);

            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`cursor-pointer px-4 py-3 text-sm transition ${
                  selected ? 'bg-[#444] text-[#FF5126]' : 'text-gray-300 hover:bg-[#333]'
                }`}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
