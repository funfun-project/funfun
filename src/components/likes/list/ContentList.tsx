import ItemCard, { Item } from '../card/ItemCard';
import styles from './ContentList.module.css';

interface ContentListProps {
  items: Item[];
}

export default function ContentList({ items }: ContentListProps) {
  if (items.length === 0) {
    return <div className={styles.empty}>좋아요한 항목이 없습니다.</div>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
