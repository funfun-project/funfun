import Link from 'next/link';
import { footerIcons } from './footerIcon/footerIcons';

export default function Footer() {
  return (
    <div className="fixed bottom-0 z-50 box-border flex h-[66px] w-full max-w-[750px] items-center justify-around bg-[#121212] px-2 max-[650px]:px-3">
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
