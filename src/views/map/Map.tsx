'use client';

import MapClient from '@/views/map/components/MapClient';
import { useState, useEffect } from 'react';
import { useMapStore } from '@/stores/useMapStore';
import { useEventsQuery } from '@/libs/queries/useMapEventQuery';
import { useGroupsSearchQuery } from '@/libs/queries/useMapGroupsQuery';
import { useMapQueries } from '@/libs/queries/useMapQuerys';
import { Search } from 'lucide-react';
import { Button } from './components/Button';
import LocationSelect from './components/locationSelect/LocationSelect';
import ListBottomSheet from './components/listBottomSheet/ListBottomSheet';
import EventDatePicker from './components/EventDatePicker';
import '@/assets/styles/map.css';
import DatetimePicker from '@/common/datetimePicker/DatetimePicker';

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
const gatheringButtons: ButtonConfig[] = [
  //만약 filter를 url 파라미터로 보내야할 경우 value가 url에 들어갈 값
  { variant: 'filter', label: '문화' },
  { variant: 'filter', label: '운동' },
  { variant: 'filter', label: '음식' },
  { variant: 'filter', label: '게임' },
  { variant: 'filter', label: '여행' },
  { variant: 'filter', label: '예술' },
  { variant: 'filter', label: '자기개발' },
];

export default function Map() {
  const [pageNo, setPageNo] = useState(0);
  const [locationSelector, setLocationSelector] = useState(false);
  const [gatheringFilterShow, setGatheringFilterShow] = useState(false);
  const [sheet, setSheet] = useState(false);

  const [eventSheetShow, setEventSheetShow] = useState(false);

  const coordinate = useMapStore((state) => state.coordinate);
  const eventType = useMapStore((state) => state.eventType);
  const placeName = useMapStore((state) => state.placeName);
  const gatheringFilter = useMapStore((state) => state.gatheringFilter);
  const setEventType = useMapStore((state) => state.setEventType);
  const setGatheringFilter = useMapStore((state) => state.setGatheringFilter);
  const fetchAndSetAddress = useMapStore((state) => state.fetchAndSetAddress);

  useEffect(() => {
    const initAddress = async () => {
      try {
        await fetchAndSetAddress(coordinate.longitude, coordinate.latitude);
      } catch (error) {
        console.error('초기 주소 로드 실패:', error);
      }
    };
    void initAddress();
  }, [fetchAndSetAddress, coordinate]);

  const {
    data: page,
    isLoading,
    isError,
    error,
    isFetching,
  } = useEventsQuery({
    page: pageNo,
    size: 20,
    sortBy: 'endDate',
    guname: placeName,
  });

  // const { eventsPage, groupsPage, isLoading, isFetching, error } = useMapQueries({
  //   pageNo,
  //   placeName,
  //   groups: {
  //     category,
  //     keyword,
  //   },
  // });

  // const { data, isLoading, isError, error, isFetching } = useGroupsSearchQuery({
  //   sortBy: 'distance',
  //   page: pageNo,
  //   size: 20,
  //   // category: 'ART',
  //   // keyword: '모임',
  // });

  const locationSelectorToggle = () => {
    setLocationSelector((prev) => !prev);
  };

  const handleFilterClick = (btn: ButtonConfig) => {
    if (btn.bindTo === 'location') {
      locationSelectorToggle();
      return;
    }

    if (btn.bindTo === 'eventType' && btn.value) {
      setEventType(btn.value);
      setGatheringFilterShow(btn.value === '모임');
    }
  };

  // if (isLoading) return <div>스켈레톤(로딩중)…</div>;
  // if (isError) return console.log('에러 발생');
  // if (!page) return null;

  return (
    <>
      <main className="bg-bg-white relative h-screen overflow-hidden">
        <div className="h-full w-full">
          <section className="bg-bg-white relative h-[calc(100%-249px)]">
            {/* 지도 위 버튼 */}
            <div className="buttonParent absolute z-10 mt-2.5 flex flex-col gap-2.5 px-1.25 py-px md:px-3.5">
              <div className="flex w-full gap-2.5">
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
              <div className="flex w-max gap-2.5">
                {gatheringFilterShow &&
                  gatheringButtons.map((btn) => {
                    const isActive = gatheringFilter === btn.label;
                    return (
                      <Button
                        key={btn.label}
                        variant={btn.variant}
                        label={btn.label}
                        isActive={isActive}
                        className="filterButton shrink-0 whitespace-nowrap"
                        onClick={() => {
                          const nextValue = gatheringFilter === btn.label ? null : btn.label;
                          setGatheringFilter(nextValue as string | null);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
            {/* 지도 */}
            <div className="bg-bg-white h-full w-full">
              <MapClient data={page?.content ?? []} />
            </div>
          </section>
          {/* 보드 */}
          <ListBottomSheet sheetState={sheet} setSheet={setSheet} data={page?.content ?? []} />
          {/* 하단 나브바 */}
          <nav className="bg-bg-nav absolute bottom-0 left-0 h-16 w-full"></nav>
        </div>
        <LocationSelect show={locationSelector} onClick={locationSelectorToggle} />
        <EventDatePicker showValue={eventSheetShow} />
        <DatetimePicker />
      </main>
    </>
  );
}
