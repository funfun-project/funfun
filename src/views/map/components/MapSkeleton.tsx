import Spinner from '@/common/Spinner';
import Skeleton from '@/common/skeleton/Skeleton';

export default function MapSkeleton() {
  return (
    <>
      <main className="relative h-screen overflow-hidden">
        <div className="h-full w-full">
          <section className="flex h-[calc(100%-249px)] items-center justify-center bg-[#292929]">
            <Spinner />
          </section>
          <div
            className={`bg-bg-main absolute bottom-16 left-0 z-[400] h-[205px] w-full rounded-t-[20px]`}
          >
            <div className="relative px-3.75 py-10">
              {/* 바텀 시트 핸들 */}
              <div
                className="absolute top-4.75 left-1/2 h-1 w-10 -translate-x-1/2 cursor-pointer rounded-[10px] bg-[#292929]"
                aria-label="bottom sheet handle"
              />

              {/* 내용 영역 */}
              <div className="flex h-full min-h-0 flex-col">
                <div className="mt-5 mb-7.5 h-5 w-15">
                  <Skeleton />
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <Skeleton className="h-[74px] w-[74px] rounded-[10px] md:h-[164px] md:w-[164px]" />
                  <div className="flex flex-1 flex-col gap-1.5 md:gap-5">
                    <Skeleton className="h-5 w-[50%] md:h-8" />
                    <Skeleton className="h-3.75 w-[30%] md:h-5" />
                    <Skeleton className="h-3.75 w-[30%] md:h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
