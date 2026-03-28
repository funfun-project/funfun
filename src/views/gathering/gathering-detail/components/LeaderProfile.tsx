'use client';

import Image from 'next/image';
import FollowButton from './FollowButton';
import Tag from '@/common/Tag';

type Props = {
  name: string;
  explain: string;
  imgUrl: string;
  tags: string[];
};

export default function LeaderProfile({ name, explain, imgUrl, tags }: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-between rounded-[5px] border border-[#292929] px-3 py-6 md:px-5 md:py-5">
        <div className="flex gap-2.5 md:gap-3.75">
          {/* 이미지 영역 */}
          <div className="relative h-10 w-10 overflow-hidden rounded-[5px] bg-red-300 md:h-25 md:w-25 md:rounded-[10px]">
            <Image src={imgUrl} alt={`${name}의 프로필 이미지`} fill className="object-cover" />
          </div>
          {/* 리더 정보 */}
          <div className="flex flex-col justify-between font-light">
            <p className="text-text-default text-body3 md:text-body1">{name}</p>
            <p className="text-body4 md:text-body2 text-[#ababab]">{explain}</p>
            {/* 리더 취향 카테고리 태그 */}
            <div className="hidden md:flex md:gap-2.5">
              {tags.map((text, idx) => (
                <Tag key={idx} className="md:text-body3 text-text-default px-4.25 py-1">
                  {text}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <FollowButton />
      </div>
    </>
  );
}
