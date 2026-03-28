'use client';

import SearchItem from './SearchItem';

type Props = {
  data: ContentItem[];
};

export default function SearchList({ data }: Props) {
  return (
    <>
      <ul className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        {data.map((data) => {
          return (
            <SearchItem
              key={data.id}
              id={data.id}
              title={data.contentTitle}
              poster={data.poster}
              date={{ startDate: data.startDate, endDate: data.endDate }}
              address={data.address}
            />
          );
        })}
      </ul>
    </>
  );
}
