import { cn } from '@/libs/utils/twMerge';

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function Tag({ children, className }: Props) {
  return (
    <>
      <div
        className={cn(
          'text-text-default text-body4 md:text-body2 inline-block rounded-full bg-[#313131] px-2.25 py-0.5 md:px-3',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
