'use client';

import React from 'react';
import UserSettingHeader from './components/UserSettingHeader';

interface Inquiry {
  id: number;
  type: '문의' | '신고';
  title: string;
  date: string;
}

const inquiries: Inquiry[] = [
  { id: 1, type: '문의', title: '모임 신청은 무제한인가요?', date: '2025.08.01' },
  {
    id: 2,
    type: '신고',
    title: '모임에서 특정 유저한테 불쾌한 희롱을 들었습니다. 제제 부...',
    date: '2025.08.01',
  },
  { id: 3, type: '문의', title: '모임 신청은 무제한인가요?', date: '2025.08.01' },
  { id: 4, type: '문의', title: '모임 신청은 무제한인가요?', date: '2025.08.01' },
];

const InquiryItem = ({ inquiry }: { inquiry: Inquiry }) => (
  <div className="flex items-center justify-between border-b border-[var(--color-border)] py-4">
    <div className="flex items-center space-x-4">
      <span
        className={`text-body4 rounded-full px-3 py-1 text-[var(--color-text-default)] ${
          inquiry.type === '문의' ? 'bg-[var(--color-bg-button)]' : 'bg-[var(--color-main)]'
        }`}
      >
        {inquiry.type}
      </span>
      <p className="text-body1">{inquiry.title}</p>
    </div>
    <span className="text-body2 text-base text-[var(--color-text-support)]">{inquiry.date}</span>
  </div>
);

const InquiryContainer = () => {
  return (
    <section className="flex min-h-screen flex-col bg-[var(--color-bg-main)] text-[var(--color-text-default)]">
      <UserSettingHeader title="문의 내역" />
      <main className="flex-grow px-6">
        {inquiries.length > 0 ? (
          <div>
            {inquiries.map((inquiry) => (
              <InquiryItem key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p>문의내역이 없습니다.</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default InquiryContainer;
