'use client';

import { Plus } from 'lucide-react';

export default function Step3InputInfo() {
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <div className="p-4 pb-12.5 font-light">
          <h2 className="text-h2 mb-7.5 font-semibold text-white">title</h2>
          <div className="flex flex-col gap-2.5">
            <div className="text-body2 flex gap-5">
              <h3 className="text-text-support">위치</h3>
              <p className="text-white">대처 텍스트 입니다</p>
            </div>
            <div className="text-body2 flex gap-5">
              <h3 className="text-text-support">날씨</h3>
              <p className="text-white">대처 텍스트 입니다</p>
            </div>
            <div className="text-body2 flex gap-5">
              <h3 className="text-text-support">시간</h3>
              <p className="text-white">대처 텍스트 입니다</p>
            </div>
            <div className="text-body2 flex gap-5">
              <h3 className="text-text-support">인원</h3>
              <p className="text-white">대처 텍스트 입니다</p>
            </div>
            <div className="text-body2 flex gap-5">
              <h3 className="text-text-support">분류</h3>
              <p className="text-white">대처 텍스트 입니다</p>
            </div>
          </div>
        </div>
        <div className="bg-bg-board flex grow-1 flex-col gap-7.5 px-4 pt-10 pb-5">
          <div className="bg-bg-input cursor-pointer rounded-[20px] border-1 border-[#4e4e4e] py-11.5">
            <div className="flex flex-col items-center justify-center gap-2.5">
              <p className="text-[#D6D6D6]">대표 사진을 추가해 주세요</p>
              <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
                <Plus color="#FF5126" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-bg-input cursor-pointer rounded-[20px] border-1 border-[#4e4e4e] py-11.5">
            <div className="flex flex-col items-center justify-center gap-2.5">
              <p className="text-[#D6D6D6]">대표 사진을 추가해 주세요</p>
              <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
                <Plus color="#FF5126" size={28} />
              </div>
            </div>
          </div>
          <button className="bg-main text-text-default mt-2.5 w-full rounded-[3px] py-3.5">
            다음
          </button>
        </div>
      </div>
    </>
  );
}
