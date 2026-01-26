import Image from 'next/image';
import Link from 'next/link';

export default function PopularClubList() {
  return (
    <>
      <article>
        <Link href="#javascript:void(0)" className="flex cursor-pointer items-center gap-3.75">
          <div className="text-body4 md:text-body2 bg-main text-text-default flex h-4.25 w-4.25 min-w-4.25 items-center justify-center rounded-full md:h-6.75 md:w-6.75 md:min-w-6.75">
            1
          </div>
          <p className="text-body3 md:text-body1 text-text-default grow truncate">모임 이름</p>
          <div className="bg-bg-input relative h-8.5 w-8.5 min-w-8.5 overflow-hidden rounded-[5px] md:h-18.5 md:w-18.5 md:min-w-18.5">
            <Image src="/img/eventImg.png" alt="이미지" fill className="object-cover" />
          </div>
        </Link>
      </article>
    </>
  );
}
