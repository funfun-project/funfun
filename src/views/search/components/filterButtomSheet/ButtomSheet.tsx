'use client';
import { useState, useEffect, useRef } from 'react';
import Button from './SubmitButton';
import FilterList from './FilterList';
import { cn } from '@/libs/utils/twMerge';
import '@/assets/styles/bottomSheet.css';
import { X } from 'lucide-react';

const filterType = ['행사', '모임'];
const getheringCategory = ['문화', '운동', '푸드', '게임', '여행', '예술', '자기 개발'];

export default function ButtomSheet({ show, onClick }: { show: boolean; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(show);
  const [filterToggle, setFilterToggle] = useState<string>('');
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
      <section className="sheetContainer max-w-187.5 overflow-hidden pb-3.75">
        <div
          className={cn(
            'bg-bg-board bottomSheetBase absolute bottom-0 left-0 z-50 flex h-[calc(100%-82px)] w-full flex-col items-center justify-between rounded-t-[20px] px-[15px] pb-[18px]',
            show ? 'bottomSheetUp' : 'bottomSheetDown',
          )}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="w-full">
            <div className="flex w-full items-center justify-between px-[9px] py-[25px]">
              <h2 className="text-body1 text-white">필터</h2>
              <button onClick={onClick}>
                <X className="text-text-support hover:text-main" />
              </button>
            </div>
            <FilterList items={filterType} toggle={filterToggle} setToggle={setFilterToggle} />
            {/* 모임 선택시 view */}
            {filterToggle === '모임' && (
              <div className="flex w-full flex-col">
                <h2 className="text-body1 px-[9px] py-[25px] text-white">카테고리</h2>
                <FilterList items={getheringCategory} />
              </div>
            )}
          </div>
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
