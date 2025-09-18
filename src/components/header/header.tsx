'use client';

import { usePathname } from 'next/navigation';
import HeaderDetail from './HeaderDetail';
import HeaderHome from './HeaderHome';

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === '/';

  //각 페이지 title
  const getPageTitle = () => {
    if (pathname.startsWith('/notifications')) return '알림';
    if (pathname.startsWith('/gathering')) return '모임';
    if (pathname.startsWith('/event-place')) return '이벤트';
    if (pathname.startsWith('/login')) return '로그인';
    if (pathname.startsWith('/signup')) return '회원가입';
    return '';
  };

  return (
    <header className="fixed top-0 z-50 flex h-[66px] w-full max-w-[750px] items-center justify-between bg-[#121212] px-3 max-[375px]:h-12">
      {isHome ? <HeaderHome /> : <HeaderDetail title={getPageTitle()} />}
    </header>
  );
}
