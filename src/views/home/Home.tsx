'use client';

import { useEffect, useState } from 'react';
import PopularClubList from './components/PopularClubList';
import Splash from './components/Splash';
import { cn } from '@/libs/utils/twMerge';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // splash 동작 확인
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {showSplash && <Splash />}
      <main className={cn('max-w-187.5', showSplash ? 'hidden' : 'block')}>
        <header className="bg-bg-board mb-[20px] h-[66px] w-full"></header>
        <section className="mb-[30px] px-[15px] md:mb-[50px]">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">title</h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">장소</p>
          <div className="text-text-default text-body4 md:text-body2 mb-[20px] flex h-[20px] w-[40px] items-center justify-center rounded-[20px] bg-[#313131] md:h-[26px] md:w-[50px]">
            태그
          </div>
          <div className="bg-bg-input h-[300px] w-full rounded-[15px]"></div>
        </section>
        <section className="mb-[40px] px-[15px]">
          <h1 className="text-h2 text-text-default mb-[20px] font-semibold md:mb-[30px]">
            가장 인기있는 모임
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
          <div className="bg-bg-input h-[400px] w-full rounded-[15px]"></div>
        </section>
        <section className="mb-[40px] px-[15px]">
          {/* 케러셀 */}
          <div className="bg-bg-input mb-[15px] h-[140px] w-full rounded-[10px] px-[10px] py-[15px] md:h-[285px] md:p-[20px]">
            <p className="text-body2 md:text-body1 text-text-default mb-[10px]">경운사</p>
            <p className="text-body3 md:text-body4 text-text-default">
              서울 특별시 강남구 24번길 32
            </p>
          </div>
          {/* 페이지네이션 */}
          <div className="flex justify-center">
            <div className="flex gap-[10px]">
              <button>
                <div className="bg-main h-[10px] w-[10px] rounded-full"></div>
              </button>
              <button>
                <div className="h-[10px] w-[10px] rounded-full bg-[#313131]"></div>
              </button>
            </div>
          </div>
        </section>
        <nav className="bg-bg-nav h-[64px] w-full"></nav>
      </main>
    </>
  );
}
