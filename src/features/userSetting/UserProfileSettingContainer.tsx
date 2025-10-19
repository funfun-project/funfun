import { ChevronLeft, Settings } from 'lucide-react';
import Image from 'next/image';
import UserSettingHeader from './components/UserSettingHeader';

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
  return (
    <>
      <div className="min-h-screen text-white">
        <div className="mx-auto max-w-[750px]">
          <UserSettingHeader title="프로필 변경" />

          <main className="flex flex-col items-center p-4">
            {/* Profile Picture Section */}
            <div className="relative mt-2 mb-2">
              <div className="border-icon-default rounded-full border-2">
                <Image
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-[160px] w-[160px] rounded-full object-cover"
                />
              </div>
              <button className="bg-icon-default border-bg-main absolute top-2 right-2 rounded-full border-2 p-0.5">
                {/* FiSettings를 Settings로 변경 */}
                <Settings size={20} className="text-bg-board" />
              </button>
            </div>

            {/* User Info (변경 없음) */}
            <div className="mb-10 text-center">
              <h2 className="text-h2 font-semibold">홍길동</h2>
              <p className="text-text-default mt-2">
                <span>팔로워</span>
                <span className="text-text-default mx-2 font-semibold">201</span>

                <span>팔로잉</span>
                <span className="text-text-default mx-2 font-semibold">167</span>
              </p>
            </div>

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
