import Skeleton from '@/common/skeleton/Skeleton';

export default function DetailSkeleton() {
  return (
    <>
      <main className="max-w-187.5 px-3.75">
        <div className="mb-[10px] h-7.5 md:mb-[15px]">
          <Skeleton className="max-w-[65%]" />
        </div>
        <div className="mb-3.75 h-5">
          <Skeleton className="max-w-[50%]" />
        </div>
        <div className="mb-4 h-[300px] w-full rounded-[15px]">
          <Skeleton />
        </div>
        <div className="h-10.75">
          <Skeleton />
        </div>
      </main>
    </>
  );
}
