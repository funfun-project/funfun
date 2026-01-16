'use client';

import React from 'react';
import UserSettingHeader from './components/UserSettingHeader';

interface Announcement {
  title: string;
  date: string;
  content: string;
}

const announcement: Announcement = {
  title: '악질 사용자 신고 했는데 제제 들어갔나요?',
  date: '2025.08.09',
  content:
    '대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 국가는 평생교육을 진흥하여야 한다. 사법권은 법관으로 구성된 법원에 속한다. 행정권은 대통령을 수반으로 하는 정부에 속한다. 전직대통령의 신분과 예우에 관하여는 법률로 정한다.감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다. 법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다.',
};

const AnnouncementDetailContainer = () => {
  return (
    <section className="bg-bg-main flex min-h-screen flex-col text-(--color-text-default)">
      <UserSettingHeader title="공지사항" />
      <main className="grow px-6 py-4">
        <div className="border-b border-(--color-border) pb-4">
          <h1 className="text-body2 font-medium">{announcement.title}</h1>
          <p className="text-body4 mt-2 text-(--color-text-support)">{announcement.date}</p>
        </div>
        <div className="text-body3 mt-6 leading-tight">
          <p>{announcement.content}</p>
        </div>
      </main>
    </section>
  );
};

export default AnnouncementDetailContainer;
