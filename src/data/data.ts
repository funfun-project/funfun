import { Group, GroupMember } from '@/app/types/groupType';
import { Event, EventItem } from '../app/types/eventType';

import { PageLists } from '../app/types/pageList';
import { PlaceItem } from '../app/types/place';

export const gnb = [{ id: 1, icon: '' }];

export const pageList: PageLists[] = [
  { id: 'event1', type: 'event', title: '콘서트' },
  { id: 'group1', type: 'group', title: '러닝 모임' },
  { id: 'event2', type: 'event', title: '전시회' },
];

export const eventsPage: Event[] = [
  {
    id: 'event1',
    title: '미국 현대 리얼리즘 화가의 예술 여정',
    local: '서울 타워 펠리스 3층 세미나관',
    category: '공연',
    eventURL: '/img/eventImg.png',
    time: '2025.07.08 - 2025.08.30',
    date: ['월요일 - 목요일 10:30 - 20:00', '금요일 - 일요일 10:30 - 20:00'],
    age: '전체 연령가',
    tickets: ['멜론티켓', 'yes24 티켓팅'],
  },
];

export const groupPage: Group[] = [
  {
    id: 'group1',
    title: '모두 각자 코딩 7기 스터디원 모집!',
    local: '서울 타워 펠리스 3층 세미나관',
    category: '공부',
    eventURL: '/img/groupImg.png',
    time: '2025.07.08 - 2025.08.30',
    date: ['월요일 - 목요일 10:30 - 20:00', '금요일 - 일요일 10:30 - 20:00'],
    age: '전체 연령가',
    tickets: ['멜론티켓', 'yes24 티켓팅'],
  },
];

export const groupMember: GroupMember[] = [
  {
    id: 'groupMember01',
    memberProfileURL: '/img/groupMember.png',
    name: '홍길동',
    text: '안녕하세요.홍길동입니다.반가워요!',
    category: ['음식', '운동', '문화'],
    follow: true,
  },
];

export const eventItem: EventItem[] = [
  {
    id: 'event1',
    eventItemURL: '/img/eventItem01.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '공연',
  },
  {
    id: 'event2',
    eventItemURL: '/img/eventItem02.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '공연',
  },
  {
    id: 'event3',
    eventItemURL: '/img/eventItem03.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '교육',
  },
  {
    id: 'event4',
    eventItemURL: '/img/eventItem04.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '전시',
  },
  {
    id: 'event5',
    eventItemURL: '/img/eventItem05.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '공연',
  },
  {
    id: 'event6',
    eventItemURL: '/img/eventItem06.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '현대무용',
  },
  {
    id: 'event7',
    eventItemURL: '/img/eventItem07.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '공연',
  },
  {
    id: 'event8',
    eventItemURL: '/img/eventItem08.png',
    title: '아래에서 본 스카이 라인 도시 숲',
    start: '진행중',
    category: '현대무용',
  },
];

export const placeItem: PlaceItem[] = [
  {
    id: 'place01',
    placeURL: '/img/recommended_place01.png',
  },
  {
    id: 'place02',
    placeURL: '/img/recommended_place01.png',
  },
];
