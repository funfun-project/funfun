'use client';

import Image from 'next/image';
import Link from 'next/link';

type Items = {
  id: number;
  title: string;
  category: string;
  dday: string;
  imageUrl: string;
};
type Props = {
  items: Items;
};

export default function RecommendCard({ items }: Props) {
  return (
    <>
      <article className="cursor-pointer overflow-hidden rounded-xl bg-transparent">
        <Link href="#javascript:void(0)">
          <div className="relative flex flex-col">
            {/* 반응형 정사각 이미지 */}
            <div className="bg-main text-body4 text-text-default absolute top-2.5 left-2.5 z-10 flex items-center justify-center rounded-full px-2 py-0.5">
              {/* 남은 요일 태그 */}
              {items.dday}
            </div>
            <div className="relative mb-3.75 aspect-square w-full overflow-hidden rounded-[15px]">
              <Image
                src={items.imageUrl}
                alt={`${items.title} 이미지`}
                fill
                sizes="(max-width: 767px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <h3 className="text-body3 text-text-default mb-2.5">{items.title}</h3>

            <span className="text-text-default text-body4 self-start rounded-full bg-[#313131] px-2.75 py-0.5">
              {/* 카테고리 */}
              {items.category}
            </span>
          </div>
        </Link>
      </article>
    </>
  );
}
