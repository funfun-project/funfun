'use client';
import { useMapStore } from '@/stores/useMapStore';
import { useShallow } from 'zustand/shallow';

export default function Tags() {
  const tags = useMapStore(
    useShallow((state) =>
      [state.placeName, state.eventType, state.gatheringFilter].filter((tag): tag is string =>
        Boolean(tag),
      ),
    ),
  );

  if (tags.length === 0) return null;
  return (
    <>
      <div className="flex gap-2.5">
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="text-text-default text-body4 bg-main rounded-[20px] px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
