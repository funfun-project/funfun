type ContentCategory =
  | 'THEATER'
  | 'DANCE'
  | 'POP_DANCE'
  | 'CLASSIC'
  | 'GUKAK'
  | 'POP_MUSIC'
  | 'MIX'
  | 'MAGIC'
  | 'MUSICAL'
  | 'TOUR'
  | 'CULTURE'
  | 'SPORTS';

interface BaseContent {
  id: number;
  contentTitle: string;
  address: string;
  poster?: string; // 데이터에 없을 수도 있으므로 선택적 속성 권장
  category: ContentCategory;
}

// 이벤트(공연) 타입: 날짜가 반드시 문자열로 존재
interface EventContent extends BaseContent {
  eventType: 'EVENT';
  startDate: string;
  endDate: string;
}

// 장소 타입: 날짜가 반드시 null
interface PlaceContent extends BaseContent {
  eventType: 'PLACE';
  startDate: null;
  endDate: null;
}

type ContentItem = EventContent | PlaceContent;
