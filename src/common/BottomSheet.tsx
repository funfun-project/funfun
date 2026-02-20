'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/bottomSheet.css';

type Props = {
  //onClick으로 컨트롤 한 state의 값
  show: boolean;
  //onClick은 부모 컴포넌트로 받아오는 state를 컨트롤 할 함수
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function BottomSheet({ show, onClick, children, className }: Props) {
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
      <section className="sheetContainer max-w-[750px] overflow-hidden pb-[15px]">
        <div
          // 높이 값이 필요한 경우 className으로 높이 값 받아오기
          className={cn(
            'bg-bg-board bottomSheetBase absolute bottom-0 left-0 z-50 flex w-full flex-col items-center rounded-t-[20px] px-3.75 pb-4.5',
            className,
            show ? 'bottomSheetUp' : 'bottomSheetDown',
          )}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </div>
        {/* backdrop 쉐도우 */}
        <div
          className={cn(
            'absolute inset-0 z-40 bg-[rgba(12,12,12,.3)]',
            'backdrop',
            show ? 'backdropOpen' : '',
          )}
          onClick={() => setIsVisible(false)}
        />
      </section>
    </>
  );
}
