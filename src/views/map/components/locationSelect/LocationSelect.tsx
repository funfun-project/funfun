'use client';
import { useState } from 'react';
import Button from './Button';
import LocationList from './LocationList';

export default function LocationSelect() {
  const [showBg, setShowBg] = useState(false);
  const [location, setLocation] = useState('전체');
  return (
    <>
      <section className="h-screen w-full">
        <div className="bg-bg-board w-full overflow-hidden rounded-t-[20px] px-[15px]">
          <div className="bg-input-active absolute top-[17px] left-1/2 h-[4px] w-[40px] -translate-x-1/2 cursor-pointer rounded-[10px]"></div>
          <LocationList location={location} setLocation={setLocation} />
          <Button location={location} />
        </div>
        {showBg && <div className="h-full w-full bg-[rgb(18,18,18)] blur-[8px]"></div>}
      </section>
    </>
  );
}
