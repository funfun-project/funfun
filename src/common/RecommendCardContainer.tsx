'use client';
import RecommendCard from './RecommendCard';

const dummyItems = [
  {
    id: 1,
    title: '제목 1',
    category: '공연',
    dday: 'D-19',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 2,
    title: '제목 2',
    category: '공연',
    dday: 'D-18',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 3,
    title: '제목 3',
    category: '공연',
    dday: 'D-17',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 4,
    title: '제목 4',
    category: '공연',
    dday: 'D-16',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 5,
    title: '제목 5',
    category: '공연',
    dday: 'D-15',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 6,
    title: '제목 6',
    category: '공연',
    dday: 'D-14',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 7,
    title: '제목 7',
    category: '공연',
    dday: 'D-13',
    imageUrl: '/img/eventImg.png',
  },
  {
    id: 8,
    title: '제목 8',
    category: '공연',
    dday: 'D-12',
    imageUrl: '/img/eventImg.png',
  },
];

export default function RecommendCardContainer() {
  return (
    <>
      <div className="grid [grid-template-columns:repeat(2,minmax(165px,1fr))] gap-x-3.75 gap-y-7.5 md:[grid-template-columns:repeat(4,minmax(165px,1fr))]">
        {dummyItems.map((item) => (
          <RecommendCard key={item.id} items={item} />
        ))}
      </div>
    </>
  );
}
