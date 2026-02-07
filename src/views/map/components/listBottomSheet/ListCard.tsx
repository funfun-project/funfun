'use client';

import HeartButton from '@/common/HeartButton';
import { transitionDate } from '@/libs/utils/naverMap';
import Image from 'next/image';

type Props = {
  id: number;
  title: string;
  poster?: string;
  date?: {
    startDate: string | null;
    endDate: string | null;
  };
  address: string;
};

export default function ListCard({ id, title, poster, date, address }: Props) {
  const initialIsLiked = 'like를 했는지 안 했는지의 값';
  const dateValue = transitionDate(date?.startDate, date?.endDate);
  return (
    <>
      <li className="mb-[40px]">
        <div className="flex h-18.5 w-full gap-3.75">
          <div className="relative h-18.5 w-18.5 cursor-pointer overflow-hidden rounded-[10px] bg-amber-500">
            {poster && (
              <Image
                src={poster}
                alt={`${title} 이미지`}
                fill
                sizes="74px"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex grow justify-between">
            <div className="flex flex-col justify-between py-1.25 text-[#888]">
              <h2 className="text-body2 font-semibold text-[#f6f6f6]">{title}</h2>
              <p className="text-body4">{address}</p>
              <p className="text-body4">{dateValue}</p>
            </div>
            <div className="flex items-center">
              <HeartButton
                initialIsLiked={initialIsLiked ? true : false}
                goToUrl={''}
                itemId={id}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
