import AnnouncementDetailContainer from '@/features/userSetting/AnnouncementDetailContainer';

const AnnouncementDetailPage = ({ params }: { params: { id: string } }) => {
  // We can use the id from params to fetch the specific announcement data
  // For now, the detail container uses mock data.
  return <AnnouncementDetailContainer />;
};

export default AnnouncementDetailPage;
