'use client';
import { useState } from 'react';
import Button from './Button';
import LocationList from './LocationList';

export default function LocationSelect() {
  const [show, setShow] = useState(true);
  const [location, setLocation] = useState('전체');
  return (
    <>
      <section className="relative h-screen w-full max-w-[375px] overflow-hidden">
        <div className="bg-bg-board absolute bottom-0 left-0 z-50 flex h-[calc(100%-82px)] w-full flex-col items-center rounded-t-[20px] px-[15px] pb-[18px]">
          <div className="flex h-[42px] w-full items-center justify-center">
            <div className="bg-input-active h-[4px] w-[40px] cursor-pointer rounded-[10px]"></div>
          </div>
          <LocationList location={location} setLocation={setLocation} />
          <Button location={location} />
        </div>
        <div className="z-40 h-full w-full bg-[rgb(12,12,12)] blur-[8px]"></div>
      </section>
    </>
  );
}
