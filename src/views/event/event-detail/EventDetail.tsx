'use client';

import Button from '@/common/Button';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import Tag from '@/common/Tag';
import EventInfo from './components/EventInfo';
import MoreViewButton from '@/common/MoreViewButton';
import Image from 'next/image';
import { useState, useLayoutEffect, useRef } from 'react';
import { cn } from '@/libs/utils/twMerge';

const info = {
  address: '서울 타워 펠리스 3층 세미나관',
  date: '2026년 3월 2일',
  time: '10:00 ~ 15:00',
  age: '15세 이용가',
  ticket: [
    {
      site_name: 'yse24 티켓',
      url: 'https://ticket.yes24.com/',
    },
    {
      site_name: '멜론 티켓',
      url: 'https://ticket.melon.com/main/index.htm',
    },
  ],
};

const imgData = [
  { src: '/img/eventImg.png', alt: '더미 이미지1' },
  { src: '/img/eventImg.png', alt: '더미 이미지2' },
  { src: '/img/eventImg.png', alt: '더미 이미지3' },
];

export default function EventDetail() {
  const [moreView, setMoreView] = useState(false);
  const [thumbnailHeight, setThumbnailHeight] = useState(300);
  const thumbnailRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = thumbnailRef.current;
    if (!el) return;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setThumbnailHeight((prev) => (Math.abs(prev - h) < 0.5 ? prev : h));
    };

    update();

    const ro = new ResizeObserver(() => {
      update();
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <>
      <main className="relative max-w-187.5">
        <section className="mt-[86px] px-[15px] pb-7.5 md:pb-12.5">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">
            미국 현대 리얼리즘 화가의 예술 여정
          </h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">
            서울 타워 펠리스 3층 세미나관
          </p>
          <Tag className="mb-5">현대 예술</Tag>
          <div
            className={cn(!moreView && 'overflow-hidden')}
            style={!moreView ? { height: thumbnailHeight } : undefined}
          >
            <div className="flex flex-col gap-2.5">
              {/* 이미지를 배열로 해서 뿌려야 함 */}
              {imgData.map((img, idx) => {
                if (idx === 0) {
                  return (
                    <div ref={thumbnailRef} key={img.alt}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={345}
                        height={300}
                        className="h-auto w-full rounded-[15px]"
                      />
                    </div>
                  );
                }

                return (
                  <Image
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    width={345}
                    height={300}
                    className="h-auto w-full rounded-[15px]"
                  />
                );
              })}
            </div>
          </div>
          <MoreViewButton onClick={() => setMoreView((v) => !v)}>
            {moreView ? '접기' : '더보기'}
          </MoreViewButton>
          <EventInfo
            address={info.address}
            date={info.date}
            time={info.time}
            age={info.age}
            ticket={info.ticket}
          />
        </section>
        <div className="bg-bg-board mb-[40px] h-[10px] w-full"></div>
        <section className="mb-[60px] px-[15px] md:mb-[70px]">
          <h1 className="text-h2 text-text-default mb-[30px] font-semibold">주변에 비슷한 행사</h1>
          {/* 공통 컴포넌트 */}
          <RecommendCardContainer />
        </section>
        <div className="px-3.75 pb-5">
          <Button className="text-text-default rounded-[10px]">좋아요</Button>
        </div>
      </main>
    </>
  );
}
