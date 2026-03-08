import { cn } from '@/libs/utils/twMerge';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

export default function MoreViewButton({ children, className, onClick }: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          'text-text-default mt-2.5 flex w-full justify-center rounded-[5px] bg-[#272727] py-2.5 font-light md:py-3.5',
          className,
        )}
      >
        {children}
      </button>
    </>
  );
}
