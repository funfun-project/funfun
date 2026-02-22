'use client';

// import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Step4Complete() {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  // const { form, reset } = useCreateGatheringStore();

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-black">
        <img
          src="/signup_check.svg"
          alt="회원가입 완료"
          className={`w-1xl transition-transform duration-1000 ${
            rotate ? 'rotate-y-[360deg]' : ''
          }`}
        />
      </div>
      <button
        className="w-full cursor-pointer rounded-md bg-[#FF5126] py-4 text-white"
        onClick={() => router.push('/')}
      >
        홈으로
      </button>
    </>
  );
}
