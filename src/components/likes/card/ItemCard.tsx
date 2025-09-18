import Image from 'next/image';
import { Heart } from 'lucide-react';

export interface Item {
  id: number;
  type: 'event' | 'gathering' | 'place';
  title: string;
  date?: string;
  location?: string;
  imageUrl: string;
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="flex items-center py-4 text-white">
      <div className="mr-3 h-14 w-14 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <p className="m-0 text-base font-semibold">{item.title}</p>
        {item.location && <p className="m-0 text-sm text-gray-400">{item.location}</p>}
        {item.date && <p className="m-0 text-sm text-gray-400">{item.date}</p>}
      </div>
      <div className="ml-4 flex-shrink-0">
        <Heart size={24} color="#FF432A" fill="#FF432A" />
      </div>
    </div>
  );
}
