'use client';

import TicketLink from '@/common/TicketLink';

// type Props = {};
export default function EventInfo() {
  return (
    <>
      <div className="flex flex-col gap-5 pt-7.5 pb-7.5 font-light md:pt-10 md:pb-12.5">
        <div className="text-body3 flex gap-17.5 md:text-[20px]">
          <h4 className="text-text-disabled">주소</h4>
          <div className="text-text-default md:text-body1">
            <p>대처 텍스트</p>
          </div>
        </div>
        <div className="text-body3 flex gap-17.5 md:text-[20px]">
          <h4 className="text-text-disabled">기간</h4>
          <div className="text-text-default md:text-body1">
            <p>대처 텍스트</p>
          </div>
        </div>
        <div className="text-body3 flex gap-17.5 md:text-[20px]">
          <h4 className="text-text-disabled">시간</h4>
          <div className="text-text-default md:text-body1">
            <p>대처 텍스트</p>
          </div>
        </div>
        <div className="text-body3 flex gap-17.5 md:text-[20px]">
          <h4 className="text-text-disabled">나이</h4>
          <div className="text-text-default md:text-body1">
            <p>대처 텍스트</p>
          </div>
        </div>
        <div className="text-body3 flex gap-17.5">
          <h4 className="text-text-disabled">예매</h4>
          <div className="text-text-default">
            <TicketLink>멜론 티켓</TicketLink>
            <TicketLink>yes24 티켓</TicketLink>
          </div>
        </div>
      </div>
    </>
  );
}
