import DetailInfo from '@/components/common/DetailInfo';
import { groupPage } from '@/data/data';
import { DetailInfo as DetailInfoType } from '@/app/types/detail';

export default function GatheringDetailPage({ params }: { params: { gatheringId: string } }) {
  const groupData = groupPage.find((group) => group.id === params.gatheringId);

  if (!groupData) return <p className="text-white">데이터 없음</p>;

  const gartherData: DetailInfoType = {
    title: groupData.title,
    local: groupData.local,
    category: groupData.category,
    imageURL: groupData.eventURL,
    time: groupData.time,
    date: groupData.date,
  };

  return <DetailInfo data={gartherData} />;
}
