import Image from 'next/image';

export interface Item {
  id: number;
  type: 'event' | 'gathering' | 'place';
  title: string;
  date?: string;
  location?: string;
  imageUrl: string;
}

interface MyPostCardProps {
  item: Item;
}

export default function MyPostCard({ item }: MyPostCardProps) {
  return (
    <div className="flex items-center py-4 text-white">
      <div className="mr-3 h-14 w-14 shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex grow flex-col gap-1">
        <p className="m-0 text-base font-semibold">{item.title}</p>
        <div className="md:hidden">
          {item.location && <p className="text-body4 text-text-support m-0">{item.location}</p>}
          {item.date && <p className="text-body4 text-text-support m-0">{item.date}</p>}
        </div>
      </div>
      <div className="ml-4 hidden shrink-0 flex-col items-end md:flex">
        {item.location && <p className="text-body4 text-text-support m-0">{item.location}</p>}
        {item.date && <p className="text-body4 text-text-support m-0">{item.date}</p>}
      </div>
    </div>
  );
}
