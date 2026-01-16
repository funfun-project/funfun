'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// 사용자 목록 목업 데이터
const followerData: User[] = [
  {
    id: 1,
    name: '우르르쾅쾅광',
    avatar:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: '본인 프로필',
    avatar:
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: '이름이긴유저에요',
    avatar:
      'https://images.pexels.com/photos/2896434/pexels-photo-2896434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: '아따맘마',
    avatar:
      'https://images.pexels.com/photos/2092474/pexels-photo-2092474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    name: '이름이긴유저에요',
    avatar:
      'https://images.pexels.com/photos/2896434/pexels-photo-2896434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 6,
    name: '아따맘마',
    avatar:
      'https://images.pexels.com/photos/2092474/pexels-photo-2092474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 7,
    name: '우르르쾅쾅광',
    avatar:
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 8,
    name: '우르르쾅쾅광',
    avatar:
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

interface User {
  id: number;
  name: string;
  avatar: string;
}

// 사용자 한 명을 표시하는 아이템 컴포넌트
const UserItem = ({ user }: { user: User }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <Image
        src={user.avatar}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-[10px] object-cover"
      />
      <span className="text-body2 ml-4">{user.name}</span>
    </div>
    <div className="flex items-center space-x-3">
      <button className="text-text-default text-body2 hover:bg-text-active rounded-[5px] bg-[#222222] px-4 py-1.5 transition">
        메시지
      </button>
      <button className="text-text-default text-body2 hover:bg-text-active rounded-[5px] bg-[#222222] px-4 py-1.5 transition">
        팔로우
      </button>
    </div>
  </div>
);

export default function FollowerContainer() {
  const [activeTab, setActiveTab] = useState('followers'); // 'followers' or 'following'
  return (
    <>
      <div className="mx-auto min-h-screen max-w-[750px] text-white">
        <div className="mx-auto max-w-[750px]">
          {/* 탭 네비게이션 */}
          <nav className="border-bg-board flex border-b-2">
            <button
              onClick={() => setActiveTab('followers')}
              className={`text-body2 flex-1 py-3 text-center transition ${
                activeTab === 'followers'
                  ? 'border-text-active border-b-2 text-white'
                  : 'text-text-disabled'
              }`}
            >
              팔로우
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`text-body2 flex-1 py-3 text-center transition ${
                activeTab === 'following'
                  ? 'border-text-active border-b-2 text-white'
                  : 'text-text-disabled'
              }`}
            >
              팔로잉
            </button>
          </nav>

          {/* 팔로워 목록 */}
          <main className="p-4">
            <header className="mt-4 mb-4 flex items-baseline">
              <h2 className="text-body2 text-text-default">팔로우 목록</h2>
              <p className="text-body3 text-icon-default ml-2">{followerData.length}명</p>
            </header>
            <div>
              {followerData.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
