'use client';

import Button from '@/common/Button';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import Tag from '@/common/Tag';
import EventInfo from './components/EventInfo';
import Image from 'next/image';
import MoreViewButton from '@/common/MoreViewButton';
import { cn } from '@/libs/utils/twMerge';
import { useState } from 'react';

export default function EventDetail() {
  const [moreView, setMoreView] = useState(false);

  return (
    <>
      <main className="relative max-w-187.5">
        <section className="mt-[86px] mb-[30px] px-[15px] md:mb-12.5">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">title</h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">장소</p>
          <Tag className="mb-5">태그</Tag>
          <div
            className={cn(
              'transition-all duration-300',
              moreView ? 'h-auto' : 'h-[300px] overflow-hidden',
            )}
          >
            <div>
              <Image
                src={'/img/eventImg.png'}
                alt={`모임 대표 이미지`}
                width={345}
                height={300}
                className="h-auto w-full rounded-[15px]"
              />
              <p className="text-body3 md:text-body2 my-7.5 text-[#E9ECEF]">
                [스터디 모집] 파이썬 코테 준비반 1. 목표: 프로그래머스 레벨 2~3 완주 2. 대상: 기초
                문법 숙지 및 취준생 선호 3. 시간/장소: 매주 토요일 오후 2시 / 강남역 스터디룸 4.
                방식: 매주 5문제 풀이 후 효율적인 알고리즘 코드 리뷰 5. 규칙: 지각 2천 원, 결석 5천
                원 (벌금은 간식비 사용) 6. 신청: 아래 링크로 닉네임/주요언어/ 보내주세요. (오픈카톡
                링크)
              </p>
            </div>
          </div>
          <MoreViewButton onClick={() => setMoreView((v) => !v)}>
            {moreView ? '접기' : '더보기'}
          </MoreViewButton>
          <EventInfo />
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
