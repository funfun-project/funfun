import Skeleton from '@/common/skeleton/Skeleton';

export default function HomeSkeleton() {
  return (
    <>
      <main className="max-w-187.5 px-3.75">
        <div className="mb-[10px] h-7.5 md:mb-[15px]">
          <Skeleton className="max-w-[65%]" />
        </div>
        <div className="mb-3.75 h-5">
          <Skeleton className="max-w-[50%]" />
        </div>
        <div className="mb-11.25 h-[300px] w-full rounded-[15px]">
          <Skeleton />
        </div>
        <div className="mb-[10px] h-7.5 md:mb-[15px]">
          <Skeleton className="max-w-[50%]" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="m:w-18 m:h-18 h-10 w-10" />
        </div>
      </main>
    </>
  );
}
