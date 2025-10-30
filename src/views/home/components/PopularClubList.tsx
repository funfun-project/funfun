export default function PopularClubList() {
  return (
    <>
      <div className="flex cursor-pointer items-center gap-[15px]">
        <div className="text-body4 md:text-body2 bg-main text-text-default flex h-[17px] w-[17px] min-w-[17px] items-center justify-center rounded-full md:h-[27px] md:w-[27px] md:min-w-[27px]">
          1
        </div>
        <p className="text-body3 md:text-body1 text-text-default grow truncate">모임 이름</p>
        <div className="bg-bg-input h-[34px] w-[34px] min-w-[34px] rounded-[5px] md:h-[74px] md:w-[74px] md:min-w-[74px]"></div>
      </div>
    </>
  );
}
