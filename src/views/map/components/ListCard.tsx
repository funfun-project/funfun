import HeartButton from '@/common/HeartButton';
export default function ListCard() {
  const initialIsLiked = 'like를 했는지 안 했는지의 값';
  return (
    <>
      <li>
        <div className="flex h-[74px] w-full gap-[15px]">
          <div className="h-[74px] w-[74px] cursor-pointer overflow-hidden rounded-[10px] bg-amber-500"></div>
          <div className="flex grow justify-between">
            <div className="flex flex-col justify-between py-[5px] text-[#888]">
              <h2 className="text-[16px] font-semibold text-[#f6f6f6]">아이돌 공연</h2>
              <p className="text-[12px]">서울 타워 펠리스 지하</p>
              <p className="text-[12px]">2025.07.29 - 2025.08.03</p>
            </div>
            <div className="flex items-center">
              <HeartButton
                initialIsLiked={initialIsLiked ? true : false}
                goToUrl={''}
                itemId={''}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
