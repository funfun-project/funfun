'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PlaceListItem() {
  return (
    <>
      <article className="relative h-[140px] w-full cursor-pointer md:h-[285px]">
        <Link href="#javascript:void(0)">
          <div className="absolute top-[10px] left-[15px] z-9999">
            <p className="text-body2 md:text-body1 text-text-default mb-[10px]">경운사</p>
            <p className="text-body3 md:text-body4 text-text-default">
              서울 특별시 강남구 24번길 32
            </p>
          </div>
          <Image fill src="/img/eventImg.png" alt="추천 이미지" className="object-cover" />
        </Link>
      </article>
    </>
  );
}
