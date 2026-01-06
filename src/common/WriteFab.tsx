'use client';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WriteFab() {
  const WriteUrl = '';
  const router = useRouter();

  function goToWritePage() {
    router.push(WriteUrl);
  }
  return (
    <>
      <button
        onClick={goToWritePage}
        className="bg-main flex h-[44px] w-[44px] items-center justify-center rounded-full"
      >
        <Pencil size={22} color="#f6f6f6" />
      </button>
    </>
  );
}
