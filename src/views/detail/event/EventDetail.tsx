import Button from '@/common/Button';
import RecommendCardContainer from '@/common/RecommendCardContainer';
import Tag from '@/common/Tag';

export default function EventDetail() {
  return (
    <>
      <main className="relative max-w-187.5">
        <section className="mt-[86px] mb-[30px] px-[15px] md:mb-12.5">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">title</h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">장소</p>
          <Tag className="mb-5">태그</Tag>

          <div className="bg-bg-input h-[300px] w-full rounded-[15px]"></div>
        </section>
        <div className="bg-bg-board mb-[40px] h-[10px] w-full"></div>
        <section className="mb-[60px] px-[15px] md:mb-[70px]">
          <h1 className="text-h2 text-text-default mb-[30px] font-semibold">지금 주목 받는 행사</h1>
          {/* 공통 컴포넌트 */}
          <RecommendCardContainer />
        </section>
        <Button>좋아요</Button>
      </main>
    </>
  );
}
