import { Send } from 'lucide-react';

export default function input() {
  return (
    <>
      <section className="flex h-[54px] w-full items-center justify-between gap-[20px] bg-[#2d2d2d] px-[15px]">
        <input
          className="text-text-default placeholder-text-disabled caret-main grow bg-transparent outline-none"
          placeholder="질문을 입력하세요."
        />
        {/* 인풋에 포커스가 들어가면 버튼 색상 변경 */}
        <button className="flex h-[32px] w-[32px] rounded-full bg-[rgba(86,86,86,.3)] pt-[7px] pl-[5px]">
          <Send size={19} className="text-[16px] text-[#565656]" />
        </button>
      </section>
    </>
  );
}
