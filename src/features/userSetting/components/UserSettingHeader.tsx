'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserSettingHeaderProps {
  title: string;
}

export default function UserSettingHeader({ title }: UserSettingHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center p-4 text-(--color-text-default)">
      <button className="absolute left-4" onClick={() => router.back()}>
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-body1">{title}</h1>
    </header>
  );
}
