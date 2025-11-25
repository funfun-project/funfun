'use client';
import Calendar from './components/Calendar';
import TimeWheel from './components/TimeWheel';

export default function Test() {
  return (
    <div className="bg-bg-main flex w-[375px] flex-col justify-center">
      <div className="bg-bg-input h-[56px]"></div>
      <div className="pt-[10px] pb-[30px]">
        <Calendar />
      </div>
      <div className="bg-bg-board rounded-tl-[20px] rounded-tr-[20px] px-[15px] pt-[30px] pb-[18px]">
        <div className="mb-[25px] flex">
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">시작 시간</h3>
            <TimeWheel />
          </div>
          <div className="w-[1px] bg-[#2D2D2D]"></div>
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">종료 시간</h3>
            <TimeWheel />
          </div>
        </div>
        <button className="text-text-default bg-main h-[52px] w-full rounded-[3px] text-center text-[18px] leading-[52px] font-semibold">
          완료
        </button>
      </div>
    </div>
  );
}
