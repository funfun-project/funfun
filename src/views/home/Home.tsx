'use client';

import PopularClubList from './components/PopularClubList';
import WriteFab from '@/common/WriteFab';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import PlaceRecommendations from '@/common/placeRecommendations/PlaceRecommendations';
import Tag from '@/common/Tag';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="relative max-w-187.5">
        <section className="mt-[86px] mb-[30px] px-[15px] md:mb-12.5">
          <h1 className="text-body1 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">
            미국 현대 리얼리즘 화가의 예술 여정
          </h1>
          <p className="text-text-support text-body3 md:text-body2 mb-[20px]">
            서울 타워 펠리스 3층 세미나관
          </p>
          <Tag className="text-text-default mb-5">공연</Tag>
          <div className="bg-bg-input relative h-[300px] w-full overflow-hidden rounded-[15px]">
            <Image
              src="/img/eventImg.png"
              alt="배경 블러"
              fill
              className="scale-110 object-cover"
            />
            <div className="z-10 h-full bg-[rgba(0,0,0,.4)] backdrop-blur-[8px]" />

            <div className="absolute inset-0 z-20 flex h-full items-center justify-center p-4">
              <div className="relative z-20 flex h-full items-center justify-center py-4">
                <Image
                  src="/img/eventImg.png"
                  alt="포스터"
                  width={500}
                  height={750}
                  priority
                  style={{ height: '100%', width: 'auto' }}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-[40px] px-[15px]">
          <h1 className="text-h2 text-text-default mb-[20px] font-semibold md:mb-[30px]">
            현재 주목 받고 있는 모임
          </h1>
          <div className="flex flex-col gap-[15px] md:gap-[20px]">
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
          </div>
        </section>
        <div className="bg-bg-board mb-[40px] h-[10px] w-full"></div>
        <section className="mb-[60px] px-[15px] md:mb-[70px]">
          <h1 className="text-h2 text-text-default mb-[30px] font-semibold">지금 주목 받는 행사</h1>
          {/* 공통 컴포넌트 */}
          <RecommendCardContainer />
        </section>
        <section className="mb-[120px] px-[15px]">
          {/* 케러셀 */}
          <PlaceRecommendations />
        </section>
        <WriteFab />
        <nav className="bg-bg-nav h-[64px] w-full"></nav>
      </main>
    </>
  );
}
