import Input from './components/Input';

export default function Chatbot() {
  return (
    <>
      <main className="flex h-screen w-[375px] flex-col">
        {/* 뒤로 가기 상단 */}
        <div className="bg-bg-input h-[56px] w-full"></div>
        {/* 채팅 내역 */}
        <div className="relative flex-1 overflow-y-auto">
          <button className="text-text-default text-body3 from-main absolute bottom-[20px] left-[15px] h-[40px] w-[calc(100%-30px)] rounded-[5px] bg-linear-65 to-[#7F74FF] font-semibold">
            현재 대화 내용 기반으로 추천 받기
          </button>
        </div>
        <Input />
      </main>
    </>
  );
}
