'use client';

import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/libs/utils/twMerge';

type Props = {
  previewUrl: string;
  onChangeClick: () => void;
  onRemoveClick?: () => void;
  className?: string;
};

export default function EditImage({ previewUrl, onChangeClick, onRemoveClick, className }: Props) {
  return (
    <div className="flex h-full w-full gap-2.5">
      <div
        className={cn(
          'bg-bg-input relative h-full w-full grow overflow-hidden rounded-[20px] border-1 border-[#4e4e4e]',
          className,
        )}
      >
        <Image
          src={previewUrl}
          alt="대표 이미지 미리보기"
          fill
          unoptimized
          className="object-cover"
        />

        {onRemoveClick && (
          <button
            type="button"
            onClick={onRemoveClick}
            className="absolute top-2 right-2 z-10 rounded-full bg-[rgba(255,81,38,.3)] p-2"
            aria-label="이미지 삭제"
          >
            <X size={18} color="#FF5126" />
          </button>
        )}
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onChangeClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onChangeClick();
        }}
        className={cn(
          'bg-bg-input flex h-full w-full grow cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] border-1 border-[#4e4e4e]',
          className,
        )}
      >
        <p className="text-[#D6D6D6]">이미지 변경하기</p>
        <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
          <ImagePlus color="#FF5126" size={24} />
        </div>
      </div>
    </div>
  );
}
