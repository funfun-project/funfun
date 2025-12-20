'use client';
import { useMapStore } from '@/stores/mapStore';
import { useShallow } from 'zustand/shallow';

export default function Tags() {
  const tags = useMapStore(
    useShallow((state) =>
      [state.location.location, state.eventType].filter((tag): tag is string => Boolean(tag)),
    ),
  );

  if (tags.length === 0) return null;
  return (
    <>
      <div className="flex gap-[10px]">
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="text-text-default text-body4 bg-main rounded-[20px] px-[10px] py-[2px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
