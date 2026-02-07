'use client';

import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { useMapStore } from '@/stores/useMapStore';
import Tags from '../Tags';
import ListCard from './ListCard';
import GpsButton from '../GpsButton';
import AiRecommendFloatingButton from '../AiRecommend/AiRecommendFloatingButton';
import '@/assets/styles/bottomSheet.css';
import { useBottomSheetResize } from '@/libs/hook/useBottomSheetResize';
import AiComment from '../AiRecommend/AiComment';
import { cn } from '@/libs/utils/twMerge';

type Props = {
  sheetState: boolean;
  setSheet: Dispatch<SetStateAction<boolean>>;
  data: ContentItem[];
};

export default function ListBottomSheet({ sheetState, setSheet, data }: Props) {
  const [initHeight, setInitHeight] = useState(205);
  const eventType = useMapStore((state) => state.eventType);

  // maxHeight를 안전하게 클라이언트에서만 계산
  const [maxH, setMaxH] = useState<number>(initHeight);

  useEffect(() => {
    if (sheetState === true) {
      setInitHeight(355);
    } else {
      setInitHeight(205);
    }
  }, [sheetState]);

  useEffect(() => {
    const update = () => setMaxH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const sheetChangeHandler = () => {
    setSheet((prev) => !prev);
  };

  const { sheetRef, handleRef, height } = useBottomSheetResize({
    initialHeight: initHeight,
    minHeight: initHeight,
    // maxH 화면 높이 리사이즈 대응
    maxHeight: maxH,
    expandedOffset: 150,
  });

  return (
    <div
      ref={sheetRef}
      className={`bg-bg-main absolute bottom-16 left-0 z-[400] w-full rounded-t-[20px]`}
      // 훅이 관리하는 현재 높이
      style={{ height }}
    >
      <div className="relative px-3.75 py-10">
        {/* 바텀 시트 위에 고정 된 버튼들 */}
        <div className="absolute -top-17 right-[20px] flex items-center gap-2.5">
          {eventType && <AiRecommendFloatingButton onClick={sheetChangeHandler} />}
          <GpsButton />
        </div>

        {/* 바텀 시트 핸들 */}
        <div
          ref={handleRef}
          className="bg-input-active absolute top-4.75 left-1/2 h-1 w-10 -translate-x-1/2 cursor-pointer rounded-[10px]"
          style={{ touchAction: 'none' }}
          aria-label="bottom sheet handle"
        />

        {/* 내용 영역 */}
        <div className="flex h-full min-h-0 flex-col">
          {!sheetState && <Tags />}
          <div
            className={cn(
              'text-body3 mb-7.5 font-semibold',
              'text-text-default',
              sheetState ? 'mt-none' : 'mt-5',
            )}
          >
            {`결과 ${data.length}개`}
          </div>

          {sheetState && <AiComment />}

          {/* 카드 리스트 */}
          <ul className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            {data.map((data) => {
              return (
                <ListCard
                  key={data.id}
                  id={data.id}
                  title={data.contentTitle}
                  poster={data.poster}
                  date={{ startDate: data.startDate, endDate: data.endDate }}
                  address={data.address}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
