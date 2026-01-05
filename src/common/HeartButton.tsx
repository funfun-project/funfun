'use client';
import { Heart } from 'lucide-react';
import { useOptimistic, useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/assets/styles/heartButton.css';

type Props = {
  initialIsLiked: boolean;
  //좋아요 안 된 상태에서 이동할 URL 날짜, 시간 선택 페이지
  goToUrl: string;
  //서버에 전달할 대상 ID
  itemId: string;
};

export default function HeartButton({ initialIsLiked, goToUrl, itemId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic<boolean, boolean>(
    initialIsLiked,
    (_current, next) => next,
  );

  //취소 애니메이션 트리거
  const [isUnlikingAnim, setIsUnlikingAnim] = useState(false);

  // async function onUnlikeAction() {
  function onUnlikeAction() {
    // 취소 순간 애니메이션 켜기 (짧게)
    setIsUnlikingAnim(true);

    // optimistic: 즉시 하트 끄기
    startTransition(() => {
      setOptimisticIsLiked(false);
    });

    try {
      // await unlikeAction(itemId);
      // 성공: 그대로
    } catch (e) {
      // 실패: 롤백
      startTransition(() => setOptimisticIsLiked(true));
    }
  }

  //좋아요 안 된 상태면: 이동만
  if (!optimisticIsLiked) {
    return (
      <button
        type="button"
        onClick={() => router.push(goToUrl)}
        className="action"
        aria-pressed={false}
      >
        <Heart fill="none" color="#888" size={25} />
      </button>
    );
  }

  //좋아요 된 상태면: 취소, 애니메이션
  return (
    <form action={onUnlikeAction}>
      <button
        type="submit"
        disabled={isPending}
        aria-pressed={true}
        className={isUnlikingAnim ? 'unlike' : ''}
        onAnimationEnd={() => setIsUnlikingAnim(false)}
      >
        <Heart fill="#ff5126" color="#ff5126" size={25} />
      </button>
    </form>
  );
}
