import { cn } from '@/libs/utils/twMerge';

export default function ListItem({ name, location, setLocation }: ListItemProps) {
  return (
    <>
      <li
        onClick={() => setLocation(name)}
        className={cn(
          'cursor-pointer py-[12px] pl-[35px] text-lg transition-all',
          location === name ? 'bg-[rgba(255,81,38,.3)] font-semibold text-white' : 'text-gray-400',
        )}
      >
        <button>{name}</button>
      </li>
    </>
  );
}
