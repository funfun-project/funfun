import Link from 'next/link';
import { Link2 } from 'lucide-react';

export default function TicketLink({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button>
        <Link href="#javascript:void(0)">
          <div className="flex items-center gap-1.25 border border-[#5e5e5e] px-2.5 py-1.25">
            <span className="text-text-default">{children}</span>
            <Link2 size={16} color="#f6f6f6" />
          </div>
        </Link>
      </button>
    </>
  );
}
