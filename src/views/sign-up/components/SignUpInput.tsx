'use client';

import { SignUpInputProps } from '@/types/signUp-input-types';

export default function SignUpInput({
  value,
  onChange,
  error,
  type = 'text',
  enterSubmit,
  placeholder,
}: SignUpInputProps) {
  return (
    <div className="mt-5 w-full">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && enterSubmit) {
            enterSubmit();
          }
        }}
        className={`w-full rounded-md border bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 transition outline-none ${
          error ? 'border-[#FF5126]' : 'border-gray-600 focus:border-[#FF5126]'
        } `}
      />

      {error && <p className="mt-1 text-sm text-[#FF5126]">{error}</p>}
    </div>
  );
}
