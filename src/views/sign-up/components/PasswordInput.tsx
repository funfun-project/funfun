'use client';

import { useState } from 'react';
import { PassWordInputProps } from '@/types/signUp-input-types';
import { Eye, EyeOff } from 'lucide-react'; // 또는 원하는 아이콘 라이브러리

export default function SignUpPasswordInput({
  value,
  onChange,
  error,
  placeholder,
}: PassWordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-5 w-full">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border bg-neutral-900 px-4 py-3 pr-12 text-white placeholder-gray-500 transition outline-none ${
            error ? 'border-[#FF5126]' : 'border-gray-600 focus:border-[#FF5126]'
          } `}
        />

        {/* 👁 아이콘 버튼 */}
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>}
    </div>
  );
}
