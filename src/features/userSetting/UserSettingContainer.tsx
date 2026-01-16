import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function UserSettingContainer() {
  const menuItems1 = [
    { name: '프로필 변경', path: '/user-setting/user-profile-setting' },
    { name: '내 캘린더', path: '#' },
    { name: '마이 클럽', path: '/user-setting/my-club' },
    { name: '내 게시물', path: '#' },
    { name: '공지사항', path: '/user-setting/announcement' },
    { name: '이용약관', path: '#' },
    { name: '개인정보 처리 방침', path: '#' },
    { name: '위치 정보 서비스 이용 약관', path: '#' },
  ];

  const menuItems2 = [
    { name: '로그아웃', path: '#' },
    { name: '문의 내역', path: '/user-setting/inquiry' },
    { name: '회원 탈퇴', path: '#' },
    { name: '비밀번호 변경', path: '/login/password-change' },
  ];

  const NavItem = ({
    children,
    showChevron = true,
    path = '#',
  }: {
    children: React.ReactNode;
    showChevron?: boolean;
    path?: string;
  }) => (
    <Link href={path}>
      <li className="group hover:text-text-active flex cursor-pointer items-center justify-between px-5 py-2">
        <span>{children}</span>
        {showChevron && (
          <ChevronRight className="text-text-disabled group-hover:text-text-active" />
        )}
      </li>
    </Link>
  );

  return (
    <div className="text-text-default flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="grow">
        {/* Menu Section 1 */}
        <section className="">
          <ul>
            {menuItems1.map((item, index) => (
              <NavItem key={index} path={item.path}>
                {item.name}
              </NavItem>
            ))}
          </ul>
        </section>

        {/* Separator */}
        <div className="h-10"></div>

        {/* Menu Section 2 */}
        <section className="">
          <ul>
            {menuItems2.map((item, index) => (
              <NavItem
                key={index}
                showChevron={item.name !== '로그아웃' && item.name !== '회원 탈퇴'}
                path={item.path}
              >
                {item.name}
              </NavItem>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
