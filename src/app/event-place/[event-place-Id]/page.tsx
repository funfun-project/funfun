import DetailInfo from '@/components/common/DetailInfo';
import { DetailInfo as DetailInfoType } from '@/app/types/detail';
import { eventsPage } from '@/data/data';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const eventData = eventsPage.find((event) => event.id === params.eventId);

  if (!eventData) return <p className="text-white">데이터 없음</p>;

  const eventsData: DetailInfoType = {
    title: eventData.title,
    local: eventData.local,
    category: eventData.category,
    imageURL: eventData.eventURL,
    time: eventData.time,
    date: eventData.date,
    age: eventData.age,
    tickets: eventData.tickets,
  };

  return <DetailInfo data={eventsData} />;
}
