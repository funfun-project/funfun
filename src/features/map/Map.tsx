import { Search } from 'lucide-react';
import { LocateFixed } from 'lucide-react';

export default function Map() {
  return (
    <>
      <main className="bg-bg-white relative h-screen w-[375px]">
        <div className="bg-bg-white relative h-[calc(100%-249px)]">
          {/* 지도 위 버튼 */}
          <div className="absolute z-10 flex w-full justify-around px-[5px] pt-[10px]">
            <button className="bg-bg-white flex h-[30px] w-[30px] items-center justify-center rounded-full shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              <Search size={16} strokeWidth={3} />
            </button>
            <button className="bg-bg-white text-body3 flex h-[30px] w-[30px] items-center justify-center rounded-full font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              Ai
            </button>
            <button className="bg-bg-white text-body3 rounded-[20px] px-[17px] py-[5px] font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              위치
            </button>
            <button className="bg-bg-white text-body3 rounded-[20px] px-[17px] py-[5px] font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              장소
            </button>
            <button className="bg-bg-white text-body3 rounded-[20px] px-[17px] py-[5px] font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              행사
            </button>
            <button className="bg-bg-white text-body3 rounded-[20px] px-[17px] py-[5px] font-semibold shadow-[0_0_2px_rgba(0,0,0,0.4)]">
              모임
            </button>
          </div>
          {/* 지도 */}
          <div className="bg-bg-white h-full w-full"></div>
          {/* GPS 버튼 */}
          <button className="bg-bg-white absolute h-[46px] w-[46px] rounded-full shadow-[0_0_2px_rgba(0,0,0,0.4)]">
            <LocateFixed size={32} strokeWidth={3} color="#ff5126" />
          </button>
        </div>
        {/* 보드 */}
        <div className="bg-bg-main absolute bottom-[64px] left-0 min-h-[210px] w-full rounded-t-[20px] px-[15px] pt-[17px]">
          {/* 꾸밈요소 */}
          <div className="bg-input-active absolute top-[17px] left-1/2 h-[4px] w-[40px] -translate-x-1/2 cursor-pointer rounded-[10px]"></div>
          {/* 선택 된 태그들 */}
          <div className="flex gap-[5px]">
            <span className="text-text-default text-body4 bg-main rounded-[20px] px-[10px] py-[2px]">
              행사
            </span>
            <span className="text-text-default text-body4 bg-main rounded-[20px] px-[10px] py-[2px]">
              강남구
            </span>
          </div>
          <div className="text-text-default text-body3 mt-[20px] mb-[30px] font-semibold">
            결과 3개
          </div>
          {/* 결과 리스트 */}
          <div className="bg-bg-input h-[74px] w-full"></div>
        </div>
        {/* 하단 나브바 */}
        <nav className="bg-bg-nav absolute bottom-0 left-0 h-[64px] w-full"></nav>
      </main>
    </>
  );
}
