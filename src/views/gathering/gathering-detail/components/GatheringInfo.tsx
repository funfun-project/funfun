type Props = { address: string; date: string; time: string; personnel: number };
export default function GatheringInfo({ address, date, time, personnel }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 pt-7.5 pb-7.5 font-light md:pt-10 md:pb-12.5">
        <div className="text-body3 md:text-body1 flex items-center gap-17.5">
          <h4 className="text-text-disabled">주소</h4>
          <div className="text-text-default md:text-body2">
            <p>{address}</p>
          </div>
        </div>
        <div className="text-body3 md:text-body1 flex items-center gap-17.5">
          <h4 className="text-text-disabled">기간</h4>
          <div className="text-text-default md:text-body2">
            <p>{date}</p>
          </div>
        </div>
        <div className="text-body3 md:text-body1 flex items-center gap-17.5">
          <h4 className="text-text-disabled">시간</h4>
          <div className="text-text-default md:text-body2">
            <p>{time}</p>
          </div>
        </div>
        <div className="text-body3 md:text-body1 flex items-center gap-17.5">
          <h4 className="text-text-disabled">인원</h4>
          <div className="text-text-default md:text-body2">
            <p>{`${personnel}명`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
