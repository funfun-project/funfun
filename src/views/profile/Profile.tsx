'use client';

import { useUserInfo } from '@/libs/api/userInfos/hook/useUserInfo';
import ProfileForm from './components/ProfileForm';

export default function ProfileContainer() {
  const { data: userInfo, isLoading, error } = useUserInfo();

  if (isLoading) return <div className="p-5 text-white">Loading...</div>;
  if (error) return <div className="p-5 text-white">Error loading profile</div>;
  if (!userInfo) return <div className="p-5 text-white">No user info found</div>;

  return (
    <main className="bg-bg-main text-text-default min-h-screen p-5">
      <h1 className="text-h1 mb-6 font-bold">프로필 수정</h1>
      <ProfileForm userInfo={userInfo} />
    </main>
  );
}
