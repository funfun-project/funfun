'use client';

import { useRef } from 'react';

export default function FollowButton() {
  const followed = useRef(false);
  return (
    <>
      <button className="text-text-default text-body3 rounded-[5px] bg-[rgba(49,49,49,.5)] px-2.5 py-1.25 md:px-3.75 md:py-1.75">
        {followed ? '팔로우' : '언팔로우'}
      </button>
    </>
  );
}
