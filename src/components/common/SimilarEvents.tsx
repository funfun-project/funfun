import Link from 'next/link';
import React from 'react';

export default function SimilarEvents({ items }: { items: SimilarEvent[] }) {
  return (
    <div className="mt-2.5 box-border bg-[#121212] px-2 text-white">
      <h2 className="py-2.5 text-2xl">주변에 비슷한 행사</h2>
      <div className="grid grid-cols-2 justify-center gap-2.5 md:grid-cols-4">
        {items.map((item, index) => (
          <Link
            className="cursor-pointer text-white hover:underline"
            key={index}
            href={`/event-place/${item.id}`}
          >
            <div className="relative mx-auto h-[165px] w-full">
              <img
                src={item.eventItemURL}
                alt={item.title}
                className="absolute h-full w-full object-cover"
              />
              <p className="absolute top-2 left-2 z-10 rounded-2xl bg-orange-600 p-1 text-[9px] text-white">
                {item.start}
              </p>
            </div>
            <p className="pt-4 pb-2 text-[12px]">{item.title}</p>
            <p className="mb-7 inline-block rounded-3xl bg-[#313131] px-2 text-[12px]">
              {item.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
