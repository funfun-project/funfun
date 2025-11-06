import { ChevronLeft } from 'lucide-react';
import { Search } from 'lucide-react';

export default function SearchContainer() {
  return (
    <>
      <main className="bg-bg-main relative h-screen max-w-[750px]">
        {/* 검색창 */}
        <section className="border-border flex h-[56px] w-full items-center gap-[20px] border-b px-[15px]">
          <button>
            <ChevronLeft className="text-text-default" />
          </button>
          <div className="relative h-[40px] grow">
            <input
              className="border-border placeholder-text-disabled focus:border-main text-text-default caret-main h-full w-full rounded-[5px] border bg-transparent pl-[10px] focus-visible:outline-none"
              placeholder="주변의 키워드를 검색하세요."
            ></input>
            <button>
              <Search className="text-text-default absolute top-[10px] right-[10px]" size={20} />
            </button>
          </div>
        </section>

        {/* 콘텐츠 */}
        <section className="flex justify-center px-[15px] pt-[30px]">
          <p className="text-text-disabled text-body3 mt-[50px] cursor-default">
            검색 된 키워드가 존재하지 않습니다.
          </p>
          {/* 공통 컴포넌트 사용 */}
          {/* <div className="bg-bg-button h-[50px] w-full rounded-[5px]"></div> */}
        </section>
        {/* 나브 */}
        <nav className="bg-bg-nav absolute bottom-0 left-0 h-[64px] w-full max-w-[750px]"></nav>
      </main>
    </>
  );
}
