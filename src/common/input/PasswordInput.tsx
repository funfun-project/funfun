'use client';

import React, { useState, useRef } from 'react';
import { getInputClassName } from './inputStyle';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  className?: string;
  value: string;
  placeholder: string;
  error?: string | null;
  onFocus?: () => void;
  onChange?: (v: string) => void;
  onBlur?: () => void;
};

export default function PasswordInput({
  className,
  value,
  placeholder,
  error = null,
  onChange,
  onFocus,
  onBlur,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

  return (
    <div className="relative">
      <input
        type={passwordView ? 'text' : 'password'}
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
      <span className="absolute top-2.75 right-2.5">
        {passwordView ? (
          <button
            onClick={(e) => {
              setPasswordView(false);
              e.preventDefault();
            }}
          >
            <EyeOff size={22} color={'#5E5E5E'} />
          </button>
        ) : (
          <button
            onClick={(e) => {
              setPasswordView(true);
              e.preventDefault();
            }}
          >
            <Eye size={22} color={'#5E5E5E'} />
          </button>
        )}
      </span>
    </div>
  );
}
