'use client';

import { IoLinkOutline } from 'react-icons/io5';
import { DetailProps } from '@/app/types/detail';

export default function DetailInfo({ data, className }: DetailProps) {
  const { title, local, category, imageURL, time, date, age, tickets } = data;

  return (
    <section
      className={`mx-auto mb-2.5 box-border h-full w-full max-w-[750px] bg-[#121212] px-2 py-6 text-white ${
        className ?? ''
      }`}
    >
      <h2 className="mt-2 text-xl">{title}</h2>
      <p className="mt-2 text-gray-600">{local}</p>
      <p className="mt-2.5 mb-6 inline-block rounded-3xl bg-[#313131] px-2 font-normal">
        {category}
      </p>

      <div>
        {imageURL ? (
          <img src={imageURL} alt={title} className="h-full w-full object-cover" />
        ) : (
          <p className="text-gray-400">이미지 없음</p>
        )}
      </div>

      <button className="mt-2.5 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md bg-[#272727]">
        더보기
      </button>

      <div className="mt-5 flex flex-col gap-5">
        <div className="flex gap-20">
          <p className="text-[#5E5E5E]">주소</p>
          <p className="text-[#F6F6F6]">{local}</p>
        </div>

        <div className="flex gap-20">
          <p className="text-[#5E5E5E]">기간</p>
          <p className="text-[#F6F6F6]">{time}</p>
        </div>

        <div className="flex gap-20">
          <p className="text-[#5E5E5E]">시간</p>
          <div className="flex flex-col">
            {date?.map((date, index) => (
              <p key={index} className="text-white">
                {date}
              </p>
            ))}
          </div>
        </div>

        {age && (
          <div className="flex gap-20">
            <p className="text-[#5E5E5E]">나이</p>
            <p className="text-[#F6F6F6]">{age}</p>
          </div>
        )}

        {tickets && tickets.length > 0 && (
          <div className="flex gap-20">
            <p className="text-[#5E5E5E]">예매</p>
            <div className="flex gap-5 text-[#F6F6F6]">
              {tickets.map((item, index) => (
                <p
                  key={index}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-700 px-2 py-1"
                >
                  {item}
                  <IoLinkOutline />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
