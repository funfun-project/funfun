import AnnouncementDetailContainer from '@/features/userSetting/AnnouncementDetailContainer';

const AnnouncementDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await params;
  // We can use the id from params to fetch the specific announcement data
  // For now, the detail container uses mock data.
  return <AnnouncementDetailContainer />;
};

export default AnnouncementDetailPage;
