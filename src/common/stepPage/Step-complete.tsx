'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StepComplete() {
  const router = useRouter();

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-black">
        <Image
          src="/img/success.png"
          alt="모임글 작성 완료 이미지"
          width={250}
          height={250}
          className="h-[250px] w-[250px]"
        />
      </div>
      <button
        className="flex w-full cursor-pointer justify-center rounded-[3px] bg-[#FF5126] py-4 text-white"
        onClick={() => router.push('/')}
      >
        모임글 확인하기
      </button>
    </>
  );
}
