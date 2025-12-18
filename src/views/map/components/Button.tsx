'use client';

import { cn } from '@/libs/utils/twMerge';
import { useMapStore } from '@/stores/mapStore';

interface ButtonProps {
  type: 'icon' | 'filter';
  icon?: React.ReactNode;
  label?: string;
  value?: string;
  bindTo?: 'eventType' | 'location';
  className?: string;
}

export function Button({ type, icon, label, value, bindTo, className, ...props }: ButtonProps) {
  const eventType = useMapStore((state) => state.eventType);
  const location = useMapStore((state) => state.location);
  const eventTypeUpdate = useMapStore((state) => state.eventTypeUpdate);

  const isCircle = type === 'icon';

  const isActive =
    bindTo === 'location'
      ? Boolean(location)
      : bindTo === 'eventType' && value
        ? eventType === value
        : false;

  function bgColorChangeHandler() {
    if (bindTo === 'eventType' && value) {
      eventTypeUpdate(value);
    }
  }

  return (
    <button
      onClick={bgColorChangeHandler}
      {...props}
      className={cn(
        'text-body3 flex items-center justify-center font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]',
        isCircle ? 'h-[30px] w-[30px] rounded-full' : 'rounded-[20px] px-[17px] py-[5px]',
        isActive ? 'bg-main' : 'bg-bg-white',
        className,
      )}
    >
      {icon ?? label}
    </button>
  );
}
