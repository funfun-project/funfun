'use client';

import { PlaceProps } from '@/app/types/place';
import { useRef } from 'react';

export default function PlacesNearby({ items, likeButton = true }: PlaceProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <section className="box-border bg-[#121212] px-2 pb-10 text-white">
      <h2 className="py-6 text-2xl">주변에 가까운 추천 장소</h2>

      <div className="flex snap-x snap-mandatory overflow-x-scroll scroll-smooth rounded-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((place) => (
          <div
            key={place.id}
            className="relative h-[200px] min-w-full shrink-0 snap-center md:h-[260px]"
          >
            <img
              src={place.placeURL}
              alt="추천장소"
              className="absolute inset-0 h-full w-full rounded-md object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2.5 py-4">
        <div className="h-[10px] w-[10px] cursor-pointer rounded-2xl bg-amber-600"></div>
        <div className="h-[10px] w-[10px] cursor-pointer rounded-2xl bg-[#313131]"></div>
      </div>

      {likeButton && (
        <button className="mt-2.5 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md bg-[#272727] text-[#5E5E5E] hover:text-white">
          좋아요
        </button>
      )}
    </section>
  );
}
