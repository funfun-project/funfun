'use client';

import Button from '@/common/Button';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import Tag from '@/common/Tag';
import GatheringInfo from './components/GatheringInfo';
import LeaderProfile from './components/LeaderProfile';
import { cn } from '@/libs/utils/twMerge';
import Image from 'next/image';
import { useState, useLayoutEffect, useRef } from 'react';
import MoreViewButton from '@/common/MoreViewButton';

const profileData = {
  name: '홍길동',
  explain: '안녕하세요. 홍길동 입니다',
  imgUrl: '/img/eventImg.png',
  tags: ['게임', '운동'],
};

const info = {
  address: '서울 타워 펠리스 3층 세미나관',
  date: '2026년 3월 2일',
  time: '10:00 ~ 15:00',
  personnel: 10,
};

export default function GatheringDetail() {
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
        <section className="mt-[86px] mb-7.5 px-[15px] md:mb-10">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">
            미국 현대 리얼리즘 화가의 예술 여정
          </h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">
            서울 타워 펠리스 3층 세미나관
          </p>
          <Tag className="text-text-default mb-5">장소</Tag>
          <div
            className={cn(!moreView && 'overflow-hidden')}
            style={!moreView ? { height: thumbnailHeight } : undefined}
          >
            <div ref={thumbnailRef}>
              <Image
                src={'/img/eventImg.png'}
                alt={`모임 대표 이미지`}
                width={345}
                height={300}
                className="h-auto w-full rounded-[15px]"
              />
            </div>
            <p className="text-body3 md:text-body2 my-7.5 text-[#E9ECEF]">
              [스터디 모집] 파이썬 코테 준비반 1. 목표: 프로그래머스 레벨 2~3 완주 2. 대상: 기초
              문법 숙지 및 취준생 선호 3. 시간/장소: 매주 토요일 오후 2시 / 강남역 스터디룸 4. 방식:
              매주 5문제 풀이 후 효율적인 알고리즘 코드 리뷰 5. 규칙: 지각 2천 원, 결석 5천 원
              (벌금은 간식비 사용) 6. 신청: 아래 링크로 닉네임/주요언어/ 보내주세요. (오픈카톡 링크)
            </p>
          </div>
          <MoreViewButton onClick={() => setMoreView((v) => !v)}>
            {moreView ? '접기' : '더보기'}
          </MoreViewButton>
          <GatheringInfo
            address={info.address}
            date={info.date}
            time={info.time}
            personnel={info.personnel}
          />
          <LeaderProfile
            name={profileData.name}
            explain={profileData.explain}
            imgUrl={profileData.imgUrl}
            tags={profileData.tags}
          />
        </section>
        <div className="bg-bg-board mb-[40px] h-[10px] w-full"></div>
        <section className="mb-[60px] px-[15px] md:mb-[70px]">
          <h1 className="text-h2 text-text-default mb-[30px] font-semibold">주변에 비슷한 모임</h1>
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
