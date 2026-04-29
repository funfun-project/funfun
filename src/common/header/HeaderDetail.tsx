'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export default function HeaderDetail({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between">
      <button type="button" onClick={() => router.push('/')} className="cursor-pointer">
        <IoIosArrowBack size={24} color="white" />
      </button>
      <h2 className="text-lg font-medium text-white">{title}</h2>
      <div className="w-[40px]" />
    </div>
  );
}
