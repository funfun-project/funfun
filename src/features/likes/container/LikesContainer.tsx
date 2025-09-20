'use client';

import React, { useState, useEffect } from 'react';
import Tab, { TabType } from '../tab/Tab';
import ContentList from '../list/ContentList';
import { Item } from '../card/ItemCard';
import SkeletonCard from '../skeleton/SkeletonCard';

// Mock data based on the provided images
const mockData: Record<TabType, Item[]> = {
  event: [
    {
      id: 1,
      type: 'event',
      title: 'K-POP 세상을 열다 (멜론)',
      location: '서울 타워 팰리스 지하',
      date: '2025.07.29 - 2025.08.31',
      imageUrl: '/file.svg',
    }, // Using placeholder images
    {
      id: 2,
      type: 'event',
      title: '행위 예술가의 예술',
      location: '서울 타워 팰리스 지하',
      date: '2025.07.29 - 2025.08.31',
      imageUrl: '/file.svg',
    },
    {
      id: 3,
      type: 'event',
      title: '2025년 정학사의 고전 무용',
      location: '서울 타워 팰리스 지하',
      date: '2025.07.29 - 2025.08.31',
      imageUrl: '/file.svg',
    },
  ],
  gathering: [
    {
      id: 4,
      type: 'gathering',
      title: '베이스 치는 사람들 정기 모집',
      location: '서울 타워 팰리스 지하',
      date: '2025.07.29',
      imageUrl: '/file.svg',
    },
    {
      id: 5,
      type: 'gathering',
      title: '쉽게 배워보는 마술 3기',
      location: '서울 타워 팰리스 지하',
      date: '2025.08.31',
      imageUrl: '/file.svg',
    },
    {
      id: 6,
      type: 'gathering',
      title: '무무농의 쿠킹 데이즈',
      location: '서울 타워 팰리스 지하',
      date: '2025.10.31',
      imageUrl: '/file.svg',
    },
  ],
  place: [
    {
      id: 7,
      type: 'place',
      title: '서울 타워 팰리스',
      location: '서울 강남구 서초동 2로 31',
      imageUrl: '/file.svg',
    },
    {
      id: 8,
      type: 'place',
      title: '서울 한옥사',
      location: '서울 강남구 지구동 21로 7',
      imageUrl: '/file.svg',
    },
  ],
};

export default function LikesContainer() {
  const [activeTab, setActiveTab] = useState<TabType>('event');
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      setItems(mockData[activeTab]);
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      );
    }
    return <ContentList items={items} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
