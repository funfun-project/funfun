import Image from 'next/image';
import styles from './ItemCard.module.css';
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
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={56}
          height={56}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        {item.location && <p className={styles.detail}>{item.location}</p>}
        {item.date && <p className={styles.detail}>{item.date}</p>}
      </div>
      <div className={styles.heartContainer}>
        <Heart size={24} color="#FF432A" fill="#FF432A" />
      </div>
    </div>
  );
}
