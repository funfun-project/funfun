'use client';

import React from 'react';
import { getInputClassName } from './inputStyle';
import { dateToString } from '@/libs/utils/wheelDate';

type Props = {
  id?: string;
  className?: string;
  value: Date | null;
  placeholder: string;
  error?: string | null;
  onClick?: () => void;
  onBlur?: () => void;
};

export default function DateInput({
  id,
  className,
  value,
  placeholder,
  error = null,
  onClick,
  onBlur,
}: Props) {
  return (
    <input
      id={id}
      className={getInputClassName({
        clickable: true,
        error,
        className,
      })}
      autoComplete="off"
      value={dateToString(value)}
      placeholder={error ?? placeholder}
      readOnly
      onClick={onClick}
      onBlur={onBlur}
    />
  );
}
