'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Spinner from '@/common/Spinner';
import '@/assets/styles/splash.css';

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export default function Splash() {
  const hydrated = useHydrated();

  return (
    <>
      <main
        className="bg-bg-main fixed inset-0 z-9999 flex h-screen w-full flex-col items-center justify-center"
        data-hydrated={hydrated ? '1' : '0'}
      >
        <div className="splash-out relative aspect-90/67 w-45">
          <Image src="/img/logo.png" alt="funfun logo" fill className="object-cover" />
        </div>
        {hydrated && (
          <div className="absolute bottom-12.5 left-1/2 -translate-x-1/2">
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
}

// App Router를 쓰고 있고 “초기 로딩/전환 로딩”에 Splash를 쓰는 목적이면,
// app/loading.tsx가 정석입니다.

// 다만 이건 “브랜드 스플래시를 고정 시간 보여주기” 같은 요구(첫 방문만 보여주기 등)와는 목적이 다를 수 있어요.
