import { cn } from '@/libs/utils/twMerge';

export default function ListItem({ name, location, setLocation }: ListItemProps) {
  return (
    <>
      <li
        onClick={() => setLocation(name)}
        className={'box-border cursor-pointer py-[9px] pl-[15px] transition-all'}
      >
        <button
          className={cn(
            'text-h1 relative px-[2px] py-[4px] font-semibold text-gray-400 transition-colors',
            location === name && 'text-white',
          )}
        >
          {name}
          {/* span은 해당 list를 클릭 할 때 나오는 요소 */}
          <span
            className={cn(
              'bg-main absolute right-0 -bottom-[2px] left-0 h-[3px] rounded-full transition-opacity',
              location === name ? 'opacity-100' : 'opacity-0',
            )}
          />
        </button>
      </li>
    </>
  );
}
