import ItemCard, { Item } from '../card/ItemCard';

interface ContentListProps {
  items: Item[];
}

export default function ContentList({ items }: ContentListProps) {
  if (items.length === 0) {
    return (
      <div className="text-text-disabled px-5 py-20 text-center text-base">
        좋아요한 항목이 없습니다.
      </div>
    );
  }

  return (
    <div className="px-5">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
