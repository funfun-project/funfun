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
        className="bg-main fixed right-[max(15px,calc((100vw-800px)/2+15px))] bottom-20 z-9999 flex h-11 w-11 items-center justify-center rounded-full"
      >
        <Pencil size={22} color="#f6f6f6" />
      </button>
    </>
  );
}
