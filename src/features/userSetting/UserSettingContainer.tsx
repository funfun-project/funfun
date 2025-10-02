import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function UserSettingContainer() {
  const menuItems1 = [
    '프로필 변경',
    '내 캘린더',
    '마이 클럽',
    '내 게시물',
    '공지사항',
    '이용약관',
    '개인정보 처리 방침',
    '위치 정보 서비스 이용 약관',
  ];

  const menuItems2 = ['로그아웃', '문의 내역', '회원 탈퇴', '비밀번호 변경'];

  const NavItem = ({
    children,
    showChevron = true,
  }: {
    children: React.ReactNode;
    showChevron?: boolean;
  }) => (
    <li className="group hover:text-text-active flex cursor-pointer items-center justify-between px-5 py-2">
      <span>{children}</span>
      {showChevron && <ChevronRight className="text-text-disabled group-hover:text-text-active" />}
    </li>
  );

  return (
    <div className="text-text-default flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Menu Section 1 */}
        <section className="">
          <ul>
            {menuItems1.map((item, index) => (
              <NavItem key={index}>{item}</NavItem>
            ))}
          </ul>
        </section>

        {/* Separator */}
        <div className="h-10"></div>

        {/* Menu Section 2 */}
        <section className="">
          <ul>
            {menuItems2.map((item, index) => (
              <NavItem key={index} showChevron={false}>
                {item}
              </NavItem>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
