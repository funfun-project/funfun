'use client';

import { Search } from 'lucide-react';
import MapClient from '@/views/map/components/MapClient';
import { Button } from './components/Button';
import GpsButton from './components/GpsButton';
import Tags from './components/Tags';
import LocationSelect from './components/locationSelect/LocationSelect';
import ListCard from './components/ListCard';
import { useState } from 'react';
import { useMapStore } from '@/stores/mapStore';

type ButtonType = 'icon' | 'filter';
type BindTarget = 'eventType' | 'location' | undefined;

interface ButtonConfig {
  variant: ButtonType;
  icon?: React.ReactNode;
  label?: string;
  value?: string; // eventType용 값
  bindTo?: BindTarget;
  className?: string;
}

const buttons: ButtonConfig[] = [
  { variant: 'icon', icon: <Search size={16} strokeWidth={3} /> },
  { variant: 'icon', label: 'Ai' },
  { variant: 'filter', label: '위치', bindTo: 'location' },
  { variant: 'filter', label: '행사', value: '행사', bindTo: 'eventType' },
  { variant: 'filter', label: '모임', value: '모임', bindTo: 'eventType' },
];

export default function Map() {
  const [locationSelector, setLocationSelector] = useState(false);

  const eventType = useMapStore((state) => state.eventType);
  const placeName = useMapStore((state) => state.placeName);
  const updateEventType = useMapStore((state) => state.updateEventType);

  const locationSelectorToggle = () => {
    setLocationSelector((prev) => !prev);
  };

  const handleFilterClick = (btn: ButtonConfig) => {
    if (btn.bindTo === 'location') {
      locationSelectorToggle();
      return;
    }

    if (btn.bindTo === 'eventType' && btn.value) {
      updateEventType(btn.value);
    }
  };

  return (
    <>
      <main className="bg-bg-white relative h-screen w-[375px] overflow-hidden">
        <div className="h-full w-full">
          <div className="bg-bg-white relative h-[calc(100%-249px)]">
            {/* 지도 위 버튼 */}
            <div className="absolute z-10 flex w-full gap-[10px] px-[5px] pt-[10px]">
              {buttons.map((btn, idx) => {
                const isActive =
                  btn.bindTo === 'location'
                    ? Boolean(placeName)
                    : btn.bindTo === 'eventType'
                      ? eventType === btn.value
                      : false;

                return (
                  <Button
                    key={idx}
                    variant={btn.variant}
                    icon={btn.icon}
                    label={btn.label}
                    isActive={isActive}
                    onClick={btn.variant === 'filter' ? () => handleFilterClick(btn) : undefined}
                  />
                );
              })}
            </div>
            {/* 지도 */}
            <div className="bg-bg-white h-full w-full">
              <MapClient />
            </div>
            {/* GPS 버튼 */}
            <GpsButton />
          </div>
          {/* 보드 */}
          <div className="bg-bg-main absolute bottom-[64px] left-0 z-20 min-h-[210px] w-full rounded-t-[20px] px-[15px] pt-[40px]">
            <div className="bg-input-active absolute top-[17px] left-1/2 h-[4px] w-[40px] -translate-x-1/2 cursor-pointer rounded-[10px]"></div>
            <Tags />
            <div className="text-text-default text-body3 mt-[20px] mb-[30px] font-semibold">
              결과 3개
            </div>

            <ListCard />
          </div>
          {/* 하단 나브바 */}
          <nav className="bg-bg-nav absolute bottom-0 left-0 h-[64px] w-full"></nav>
        </div>
        <LocationSelect show={locationSelector} onClick={locationSelectorToggle} />
      </main>
    </>
  );
}
