'use client';
import { useState } from 'react';
import Button from './Button';
import LocationList from './LocationList';
import { cn } from '@/libs/utils/twMerge';

export default function LocationSelect({ show, onClick }: { show: boolean; onClick: () => void }) {
  const [location, setLocation] = useState('전체');
  return (
    <>
      <section
        className={cn(
          'absolute top-0 left-0 z-[500] h-screen w-full max-w-[375px] overflow-hidden pb-[15px]',
          show ? 'block' : 'hidden',
        )}
      >
        <div
          className={cn(
            'bg-bg-board absolute bottom-0 left-0 z-50 flex h-[calc(100%-82px)] w-full flex-col items-center rounded-t-[20px] px-[15px] pb-[18px]',
            show ? 'bottomSheetUp' : 'bottomSheetDown',
          )}
        >
          <div className="flex h-[42px] w-full items-center justify-center">
            <div className="bg-input-active h-[4px] w-[40px] cursor-pointer rounded-[10px]"></div>
          </div>
          <LocationList location={location} setLocation={setLocation} />
          <Button location={location} onClick={onClick} />
        </div>
        <div className="z-40 h-full w-full bg-[rgba(12,12,12,.3)]" onClick={() => onClick()}></div>
      </section>
    </>
  );
}
