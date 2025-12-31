'use client';

import { cn } from '@/libs/utils/twMerge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'icon' | 'filter';
  icon?: React.ReactNode;
  label?: string;
  isActive?: boolean;
}

export function Button({
  variant,
  icon,
  label,
  isActive = false,
  className,
  ...props
}: ButtonProps) {
  const isCircle = variant === 'icon';

  return (
    <button
      {...props}
      data-active={isActive}
      className={cn(
        'text-body3 flex items-center justify-center font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]',
        isCircle ? 'h-[30px] w-[30px] rounded-full' : 'rounded-[20px] px-[14px] py-[3px]',
        className,
      )}
    >
      {icon ?? label}
    </button>
  );
}
