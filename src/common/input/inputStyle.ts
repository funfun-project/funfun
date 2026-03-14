import { cn } from '@/libs/utils/twMerge';

type GetInputClassNameArg = {
  isActive?: boolean;
  error?: string | null;
  clickable?: boolean;
  className?: string;
};

export function getInputClassName({
  isActive = false,
  error = null,
  clickable = false,
  className,
}: GetInputClassNameArg) {
  return cn(
    'bg-bg-input placeholder:text-text-disabled caret-main text-text-default box-border flex h-11 w-full items-center rounded-[3px] pl-3.5 outline-none',
    isActive ? 'border-main border-[2px]' : 'border-[2px] border-transparent',
    error ? 'border-[2px] border-[#FF5126]' : '',
    clickable ? 'cursor-pointer' : '',
    className,
  );
}
