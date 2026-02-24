'use client';

import { useEffect, useRef, useState } from 'react';
import AddImage from './AddImage';
import EditImage from './EditImage';
import { cn } from '@/libs/utils/twMerge';

type Props = {
  mode?: 'gathering' | 'inquiry';
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string | null;
  className?: string;
};

export default function SelectImage({ mode, value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openFileDialog = () => inputRef.current?.click();

  useEffect(() => {
    // 기존 URL 정리
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(value);
    setPreviewUrl(nextUrl);

    return () => {
      URL.revokeObjectURL(nextUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = '';

    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    onChange(file); // ✅ lint 에러 없음
  };

  const removeImage = () => {
    onChange(null); // ✅ void 함수라 이벤트 핸들러로 OK
  };

  return (
    <div className={cn('h-40', className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {value === null || previewUrl === null ? (
        <AddImage mode={mode} onClick={openFileDialog} className={className} />
      ) : (
        <EditImage
          previewUrl={previewUrl}
          onChangeClick={openFileDialog}
          onRemoveClick={removeImage} // ✅ Promise 아님
          className={className}
        />
      )}
    </div>
  );
}
