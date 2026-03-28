'use client';

import TicketLink from '@/common/TicketLink';

interface ticket {
  site_name: string;
  url: string;
}

type Props = { address: string; date: string; time: string; age?: string; ticket: ticket[] };

export default function EventInfo({ address, date, time, age, ticket }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 pt-7.5 font-light md:pt-10">
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
          <h4 className="text-text-disabled">나이</h4>
          <div className="text-text-default md:text-body2">
            <p>{age ? age : '전체 이용가'}</p>
          </div>
        </div>
        <div className="text-body3 md:text-body1 flex items-center gap-17.5">
          <h4 className="text-text-disabled">예매</h4>
          <div className="text-text-default flex gap-2.5">
            {ticket.map((ticket) => (
              <TicketLink key={ticket.url} url={ticket.url}>
                {ticket.site_name}
              </TicketLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
