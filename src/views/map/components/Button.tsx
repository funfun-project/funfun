import { cn } from '@/libs/utils/twMerge';

interface ButtonProps {
  type: 'icon' | 'filter';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Button({ type, icon, children, className, ...props }: ButtonProps) {
  const isCircle = type === 'icon';

  return (
    <button
      {...props}
      className={cn(
        'bg-bg-white text-body3 flex items-center justify-center font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]',
        isCircle ? 'h-[30px] w-[30px] rounded-full' : 'rounded-[20px] px-[17px] py-[5px]',
        className,
      )}
    >
      {icon ?? children}
    </button>
  );
}
