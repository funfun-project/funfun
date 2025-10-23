import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

// Mock data for members
const members = [
  { name: '우르르쾅쾅쾅', avatar: 'https://placehold.co/32x32' },
  { name: '본인 프로필', avatar: 'https://placehold.co/32x32' },
  { name: '이름이긴유저에요', avatar: 'https://placehold.co/32x32' },
  { name: '아따맘마', avatar: 'https://placehold.co/32x32' },
  { name: '이름이긴유저에요', avatar: 'https://placehold.co/32x32' },
  { name: '아따맘마', avatar: 'https://placehold.co/32x32' },
  { name: '우르르쾅쾅쾅', avatar: 'https://placehold.co/32x32' },
  { name: '우르르쾅쾅쾅', avatar: 'https://placehold.co/32x32' },
];

export default function ToggleBarPage() {
  return (
    <div className="flex h-full w-full flex-col text-[var(--color-text-default)]">
      {/* Profile Section */}
      <section className="flex flex-col items-center gap-4 p-4">
        <Image
          src="https://placehold.co/162x162"
          alt="profile picture"
          width={160}
          height={160}
          className="rounded-full border border-[var(--color-border)]"
          unoptimized={true}
        />
        <div className="flex gap-2">
          <button className="rounded-[5px] bg-[var(--color-bg-button)] px-4 py-1 font-medium text-[var(--text-body2)]">
            완료
          </button>
          <button className="rounded-[5px] bg-[var(--color-bg-button)] px-4 py-1 font-medium text-[var(--text-body2)]">
            수정
          </button>
          <button className="rounded-[5px] bg-[var(--color-bg-button)] px-4 py-1 font-medium text-[var(--text-body2)]">
            삭제
          </button>
        </div>
      </section>

      {/* Member List Section */}
      <section className="flex-grow overflow-y-auto rounded-t-2xl bg-[var(--color-bg-board)] p-7">
        <div className="mb-4 flex items-center">
          <h2 className="mr-2 font-medium text-[var(--text-body2)]">회원 목록</h2>
          <span className="font-medium text-[var(--color-text-support)] text-[var(--text-body3)]">
            {members.length}명
          </span>
        </div>
        <ul className="space-y-4">
          {members.map((member, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={32}
                  height={32}
                  className="rounded-lg"
                  unoptimized={true}
                />
                <span className="font-medium text-[var(--text-body2)]">{member.name}</span>
              </div>
              {member.name !== '본인 프로필' && (
                <button>
                  <MoreVertical size={20} className="text-[var(--color-text-support)]" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
