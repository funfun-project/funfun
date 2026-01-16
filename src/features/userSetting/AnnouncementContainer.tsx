'use client';

import React, { useState } from 'react';
import UserSettingHeader from './components/UserSettingHeader';
import Link from 'next/link';

interface AnnouncementItem {
  id: number;
  title: string;
  date: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  date: string;
}

const announcements: AnnouncementItem[] = [
  { id: 1, title: '펀펀 서비스 정식 출시 안내', date: '2025.09.01' },
  { id: 2, title: '개인정보 처리 방침 변경 안내', date: '2025.08.20' },
  { id: 3, title: '시스템 점검 안내 (09/10 02:00 ~ 04:00)', date: '2025.08.15' },
];

const faqs: FaqItem[] = [
  {
    id: 1,
    question: '모임 신청은 무제한인가요?',
    answer:
      '네, 현재는 무제한으로 모임에 신청할 수 있습니다. 추후 정책이 변경될 경우 공지사항을 통해 안내해 드리겠습니다.',
    date: '2025.08.09',
  },
  {
    id: 2,
    question: '모임 신청 하면 알람 울리나요?',
    answer:
      '네, 모임 신청이 수락되면 앱 내 알림 및 푸시 알림을 통해 알려드립니다. 알림 설정은 마이페이지에서 변경할 수 있습니다.',
    date: '2025.08.09',
  },
  {
    id: 3,
    question: '악질 사용자 신고 했는데 제제 들어갔나요?',
    answer:
      '신고 접수 후 내부 검토를 거쳐 정책에 따라 조치됩니다. 처리 결과는 별도로 안내되지 않으나, 커뮤니티 가이드라인에 따라 엄격하게 처리하고 있습니다.',
    date: '2025.08.09',
  },
  {
    id: 4,
    question: '특정 상황에서 실행이 안 됩니다.',
    answer:
      '이용에 불편을 드려 죄송합니다. 문제 발생 시, 사용하고 계신 기기 정보와 함께 문의해주시면 더 빠른 문제 해결에 도움이 됩니다.',
    date: '2025.08.09',
  },
];

const AnnouncementListItem = ({ item }: { item: AnnouncementItem }) => (
  <Link href={`/user-setting/announcement/${item.id}`}>
    <div className="flex cursor-pointer justify-between border-b border-(--color-border) py-4">
      <p className="text-body1">{item.title}</p>
      <span className="text-base text-(--color-text-support)">{item.date}</span>
    </div>
  </Link>
);

const FaqListItem = ({
  item,
  isActive,
  onClick,
}: {
  item: FaqItem;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div className="cursor-pointer border-b border-(--color-border) py-4" onClick={onClick}>
    <div className="flex items-center justify-between">
      <p className={`text-lg ${isActive ? 'text-(--color-text-active)' : ''}`}>{item.question}</p>
      <span className="text-base text-(--color-text-support)">{item.date}</span>
    </div>
    {isActive && (
      <div className="bg-bg-board mt-4 rounded-md p-4 text-(--color-text-support)">
        {item.answer}
      </div>
    )}
  </div>
);

const AnnouncementContainer = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'faq'>('announcements');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFaqClick = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const renderList = () => {
    if (activeTab === 'announcements') {
      return (
        <div>
          {announcements.map((item) => (
            <AnnouncementListItem key={item.id} item={item} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {faqs.map((item) => (
            <FaqListItem
              key={item.id}
              item={item}
              isActive={activeFaq === item.id}
              onClick={() => handleFaqClick(item.id)}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <section className="bg-bg-main flex min-h-screen flex-col text-(--color-text-default)">
      <UserSettingHeader title="공지사항" />
      <div className="flex border-b border-(--color-border)">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-3 text-center ${
            activeTab === 'announcements'
              ? 'border-b-2 border-(--color-main) text-(--color-text-active)'
              : 'text-(--color-text-support)'
          }`}
        >
          공지사항
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-3 text-center ${
            activeTab === 'faq'
              ? 'border-b-2 border-(--color-main) text-(--color-text-active)'
              : 'text-(--color-text-support)'
          }`}
        >
          FAQ
        </button>
      </div>
      <main className="grow px-6">{renderList()}</main>
    </section>
  );
};

export default AnnouncementContainer;
