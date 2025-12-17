import { cn } from '@/libs/utils/twMerge';

export default function ListItem({ name, location, setLocation }: ListItemProps) {
  return (
    <>
      <li
        onClick={() => setLocation(name)}
        className={cn(
          'cursor-pointer rounded-md px-4 py-3 text-lg transition-all',
          location === name ? 'bg-[#5c2114] font-semibold text-white' : 'text-gray-400',
        )}
      >
        <button>{name}</button>
      </li>
    </>
  );
}
