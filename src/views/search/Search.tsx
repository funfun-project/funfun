'use client';

import { ChevronLeft } from 'lucide-react';
import { Search as SearchIcon } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import BottomSheet from './components/filterBottomSheet/BottomSheet';
import Tags from './components/Tags';

export default function Search() {
  const [filterAction, setFilterAction] = useState(false);
  const [filterTag, setFilterTag] = useState<string[]>([]);

  const buttomSheetToggle = () => {
    setFilterAction((prev) => !prev);
  };

  return (
    <>
      <main className="bg-bg-main relative h-screen max-w-[750px]">
        {/* 검색창 */}
        <section className="flex h-[66px] w-full items-center gap-[20px] border-b border-[#292929] px-[15px]">
          <button>
            <ChevronLeft className="text-text-default" />
          </button>
          <div className="relative h-[40px] grow">
            <input
              className="text-text-default placeholder-text-disabled caret-main focus:border-main h-full w-full rounded-[5px] border border-[#292929] bg-transparent pl-[10px] focus:outline-none"
              placeholder="주변의 키워드를 검색하세요."
            ></input>
            <div className="absolute top-[10px] right-[10px] flex gap-[10px]">
              <button onClick={() => setFilterAction((prev) => !prev)}>
                <SlidersHorizontal color={filterAction ? '#FF5126' : '#999999'} size={20} />
              </button>
              <button>
                <SearchIcon color="#f6f6f6" size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* 콘텐츠 */}
        <section className="relative flex h-[calc(100%-130px)] flex-col justify-center px-[15px] pt-[15px]">
          <div className="absolute top-2.5 left-3.75 flex gap-1.25">
            {filterTag.map((name) => {
              return <Tags key={name} name={name} setFilterTag={setFilterTag} />;
            })}
          </div>
          <p className="text-text-disabled text-body3 flex cursor-default justify-center">
            검색 된 키워드가 존재하지 않습니다.
          </p>
          {/* 공통 컴포넌트 사용 */}
          {/* <div className="bg-bg-button h-[50px] w-full rounded-[5px]"></div> */}
        </section>
        {/* 나브 */}
        <nav className="bg-bg-nav absolute bottom-0 left-0 h-[64px] w-full max-w-[750px]"></nav>
        <BottomSheet show={filterAction} onToggle={buttomSheetToggle} setFilterTag={setFilterTag} />
      </main>
    </>
  );
}
