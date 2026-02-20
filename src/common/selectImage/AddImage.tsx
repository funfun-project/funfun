'use client';

import { Plus } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export default function AddImage({ onClick }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      className="bg-bg-input flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border-1 border-[#4e4e4e]"
    >
      <p className="text-[#D6D6D6]">대표 사진을 추가해 주세요</p>
      <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
        <Plus color="#FF5126" size={28} />
      </div>
    </div>
  );
}
