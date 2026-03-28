'use client';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import LocationList from './LocationList';
import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/bottomSheet.css';

export default function LocationSelect({ show, onClick }: { show: boolean; onClick: () => void }) {
  const [location, setLocation] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(show);
  // 메모리 참조용 ref
  const closingRef = useRef(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      closingRef.current = false;
    } else {
      closingRef.current = true;
    }
  }, [show]);

  const onAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName !== 'sheetOut') return;
    if (closingRef.current) setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <section className="sheetContainer max-w-[750px] overflow-hidden pb-3.75">
        <div
          className={cn(
            'bg-bg-board bottomSheetBase absolute bottom-0 left-0 z-50 flex h-[calc(100%-82px)] w-full flex-col items-center rounded-t-[20px] px-3.75 pb-4.5',
            show ? 'bottomSheetUp' : 'bottomSheetDown',
          )}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="flex h-10.5 w-full items-center justify-center">
            <div
              onClick={onClick}
              className="bg-input-active h-1 w-10 cursor-pointer rounded-[10px]"
            />
          </div>
          <LocationList location={location} setLocation={setLocation} />
          <Button location={location} onClick={onClick} />
        </div>

        <div
          className={cn(
            'absolute inset-0 z-40 bg-[rgba(12,12,12,.3)]',
            'backdrop',
            show ? 'backdropOpen' : '',
          )}
          onClick={onClick}
        />
      </section>
    </>
  );
}
