import { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import UserSettingHeader from './components/UserSettingHeader';
import { userInfosAPI } from '@/libs/api/userInfos/userInfosAPI';
import { UserInfo } from '@/libs/api/userInfos/types/userInfos';

// 취향 분석 데이터 (변경 없음)
const preferenceData = [
  { label: '문화', value: 50 },
  { label: '운동', value: 0 },
  { label: '푸드', value: 0 },
  { label: '게임', value: 15 },
  { label: '여행', value: 0 },
  { label: '예술', value: 15 },
  { label: '공부', value: 20 },
];
// 취향 분석 막대 그래프 컴포넌트 (변경 없음)
const PreferenceBar = ({ label, value }: { label: string; value: number }) => (
  <div className="w-full">
    <div className="mb-1 flex items-center gap-2">
      <span className="text-text-default text-body3">{label}</span>
      <span className="text-text-active text-body3">{value}%</span>
    </div>
    <div className="h-4 w-full rounded-full bg-[#323232]">
      <div className="bg-text-active h-4 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default function UserProfileSettingContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null); // Display URL
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const data = await userInfosAPI.getUserInfo();
      setUserInfo(data);
      setNickname(data.nickname);
      setProfileImage(data.profileImageUrl);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Upload immediately or wait for save?
      // User request implies "connecting api", usually settings pages save on action or have a save button.
      // Given the UI lacks a save button, I'll try to auto-save or add a save button.
      // Adding a save button is safer.
    }
  };

  const handleSave = async () => {
    if (!userInfo) return;

    try {
      // Update specific fields
      if (selectedImageFile) {
        await userInfosAPI.updateProfile({
          image: selectedImageFile,
          imageChanged: true,
        });
      }

      if (nickname !== userInfo.nickname) {
        await userInfosAPI.changeNickname(nickname);
      }

      // Refresh data
      await fetchUserInfo();
      alert('프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error('Update failed:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  if (!userInfo) return <div className="p-4 text-white">Loading...</div>;

  return (
    <>
      <div className="min-h-screen text-white">
        <div className="mx-auto max-w-[750px]">
          <UserSettingHeader title="프로필 변경" />

          <main className="flex flex-col items-center p-4">
            {/* Profile Picture Section */}
            <div className="relative mt-2 mb-2 cursor-pointer" onClick={handleImageClick}>
              <div className="border-icon-default h-[160px] w-[160px] overflow-hidden rounded-full border-2">
                <Image
                  src={
                    profileImage ||
                    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
                  }
                  alt="Profile"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="bg-icon-default border-bg-main absolute top-2 right-2 rounded-full border-2 p-1.5">
                <Camera size={20} className="text-bg-board" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* User Info */}
            <div className="mb-10 w-full max-w-xs text-center">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="text-h2 hover:border-text-default focus:border-text-active w-full border-b border-transparent bg-transparent text-center font-semibold outline-none"
              />
              <p className="text-text-default mt-2">
                <span>팔로워</span>
                <span className="text-text-default mx-2 font-semibold">
                  {userInfo.followerCount}
                </span>

                <span>팔로잉</span>
                <span className="text-text-default mx-2 font-semibold">
                  {userInfo.followingCount}
                </span>
              </p>
            </div>

            <button
              onClick={() => void handleSave()}
              className="bg-text-active text-bg-main mb-6 rounded-full px-6 py-2 font-bold transition-opacity hover:opacity-90"
            >
              저장하기
            </button>

            {/* Preference Analysis Section (변경 없음) */}
            <section className="bg-bg-board w-full rounded-[20px] p-5">
              <h3 className="text-body1 mb-6">취향 분석</h3>
              <div className="space-y-5">
                {preferenceData.map((item, index) => (
                  <PreferenceBar key={index} label={item.label} value={item.value} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
