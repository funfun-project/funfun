'use client';
import { useState, useEffect, useRef } from 'react';
import Button from './SubmitButton';
import FilterList from './FilterList';
import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/bottomSheet.css';

export default function LocationSelect({ show, onClick }: { show: boolean; onClick: () => void }) {
  const [location, setLocation] = useState('전체');

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
      <section className="sheetContainer max-w-[375px] overflow-hidden pb-[15px]">
        <div
          className={cn(
            'bg-bg-board bottomSheetBase absolute bottom-0 left-0 z-50 flex h-[calc(100%-82px)] w-full flex-col items-center rounded-t-[20px] px-[15px] pb-[18px]',
            show ? 'bottomSheetUp' : 'bottomSheetDown',
          )}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="flex h-[42px] w-full items-center justify-center">
            <div
              onClick={onClick}
              className="bg-input-active h-[4px] w-[40px] cursor-pointer rounded-[10px]"
            />
          </div>
          <FilterList location={location} setLocation={setLocation} />
          <Button />
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
