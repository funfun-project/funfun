'use client';

import { usePathname } from 'next/navigation';
import HeaderHome from './HeaderHome';
import HeaderDetail from './HeaderDetail';

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === '/';

  const getPageTitle = () => {
    if (pathname.startsWith('/chatbot')) return 'AI 큐큐';
    if (pathname.startsWith('/notifications')) return '알림';
    if (pathname.startsWith('/gathering')) return '모임';
    if (pathname.startsWith('/event-place')) return '이벤트';
    if (pathname.startsWith('/login')) return '로그인';
    if (pathname.startsWith('/signup')) return '회원가입';
    if (pathname.startsWith('/test')) return '테스트';
    return '';
  };

  return (
    <header className="fixed top-0 z-50 flex h-[56px] w-full max-w-[750px] items-center justify-between bg-[#121212] px-3 max-[375px]:h-12">
      {isHome ? <HeaderHome /> : <HeaderDetail title={getPageTitle()} />}
    </header>
  );
}
