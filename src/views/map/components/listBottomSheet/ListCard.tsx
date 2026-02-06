import HeartButton from '@/common/HeartButton';

export default function ListCard() {
  const initialIsLiked = 'like를 했는지 안 했는지의 값';
  return (
    <>
      <li className="mb-[40px]">
        <div className="flex h-18.5 w-full gap-3.75">
          <div className="h-18.5 w-18.5 cursor-pointer overflow-hidden rounded-[10px] bg-amber-500"></div>
          <div className="flex grow justify-between">
            <div className="flex flex-col justify-between py-1.25 text-[#888]">
              <h2 className="text-body2 font-semibold text-[#f6f6f6]">아이돌 공연</h2>
              <p className="text-body4">서울 타워 펠리스 지하</p>
              <p className="text-body4">2025.07.29 - 2025.08.03</p>
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
