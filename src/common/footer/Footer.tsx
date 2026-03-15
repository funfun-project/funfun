'use client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { footerIcons } from './footer-icons/footer-icons';

export default function Footer() {
  const pathname = usePathname();

  const hiddenPaths = ['/signup', '/notifications', '/chatbot', '/test'];

  if (hiddenPaths.includes(pathname)) return null;
  return (
    <div className="fixed bottom-0 z-[500] box-border flex h-[66px] w-full max-w-[750px] items-center justify-around bg-[#121212] px-2 max-[650px]:px-3">
      {footerIcons.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="cursor-pointer px-2 text-white hover:text-orange-600"
        >
          <item.Icon className="h-8 w-8 max-[650px]:h-10 max-[650px]:w-10" />
        </Link>
      ))}
    </div>
  );
}
