import Link from 'next/link';
import { Link2 } from 'lucide-react';

export default function TicketLink({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <>
      <button>
        <Link href={url} target="_blank" rel="canonical">
          <div className="flex items-center gap-1.25 rounded-[3px] border border-[#5e5e5e] px-2.5 py-1.25">
            <span className="text-text-default text-body2">{children}</span>
            <Link2 size={16} color="#f6f6f6" />
          </div>
        </Link>
      </button>
    </>
  );
}
