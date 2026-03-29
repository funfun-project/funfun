import { cn } from '@/libs/utils/twMerge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({ children, className }: Props) {
  return (
    <>
      <button
        className={cn(
          'text-text-default bg-main text-body1 w-full rounded-[3px] py-3.75 text-center font-semibold',
          className,
        )}
      >
        {children}
      </button>
    </>
  );
}
