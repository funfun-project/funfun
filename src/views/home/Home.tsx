'use client';

import { useEffect, useState } from 'react';
import PopularClubList from './components/PopularClubList';
import Splash from './components/Splash';
import { cn } from '@/libs/utils/twMerge';
import WriteFab from '@/common/WriteFab';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import PlaceRecommendations from '@/common/placeRecommendations/PlaceRecommendations';

export default function Home() {
  const [showSplash, setShowSplash] = useState<null | boolean>(null);

  // useEffect(() => {
  //   const hasVisited = sessionStorage.getItem('hasVisited');

  //   if (hasVisited) {
  //     setShowSplash(false);
  //   } else {
  //     const timer = setTimeout(() => {
  //       setShowSplash(false);
  //       sessionStorage.setItem('hasVisited', 'true');
  //     }, 1500);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // splash 동작 확인

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <Splash />}
      <main className={cn('relative max-w-187.5', showSplash ? 'hidden' : 'block')}>
        <section className="mt-[86px] mb-[30px] px-[15px] md:mb-12.5">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">title</h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">장소</p>
          <div className="text-text-default text-body4 md:text-body2 mb-5 inline-block rounded-full bg-[#313131] px-2.25 py-0.5 md:px-3">
            태그
          </div>
          <div className="bg-bg-input h-[300px] w-full rounded-[15px]"></div>
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
