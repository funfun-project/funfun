'use client';

import Link from 'next/link';

export default function HeaderHome() {
  const imgWidth = 'absolute w-full h-full object-cover';

  return (
    <>
      <h1 className="relative h-[40px] w-full max-w-[54px]">
        <Link href="/">
          <img src="/img/logo.png" alt="funfun 로고" className={imgWidth} />
        </Link>
      </h1>

      <nav className="flex items-center justify-center gap-5">
        <Link
          href={'/chatbot'}
          className="relative flex h-[30px] w-[72px] items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#FF5126,#8B5CF6)] text-white"
        >
          챗봇
        </Link>
        <Link href="/events" className="relative h-[24px] w-[24px]">
          <img src="/img/sparkle.png" alt="이벤트" className={imgWidth} />
        </Link>

        <Link href="/notifications" className="relative h-[24px] w-[24px]">
          <img src="/img/bell.png" alt="알림" className={imgWidth} />
        </Link>
      </nav>
    </>
  );
}
