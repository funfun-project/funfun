import SimilarEvents from '@/components/common/SimilarEvents';
import PopularClubList from '../ui/PopularClubList';
import { eventItem, placeItem } from '@/data/data';
import PlacesNearby from '@/components/common/PlacesNearby';

export default function HomeContainer() {
  return (
    <>
      <main className="max-w-[750px]">
        <header className="bg-bg-board mb-[20px] h-[66px] w-full"></header>
        <section className="mb-[30px] px-[15px] md:mb-[50px]">
          <h1 className="text-body2 text-text-default md:text-h2 mb-[10px] md:mb-[15px]">title</h1>
          <p className="text-text-support text-body4 md:text-body2 mb-[20px]">장소</p>
          <div className="text-text-default text-body4 md:text-body2 mb-[20px] flex h-[20px] w-[40px] items-center justify-center rounded-[20px] bg-[#313131] md:h-[26px] md:w-[50px]">
            태그
          </div>
          <div className="bg-bg-input h-[300px] w-full rounded-[15px]"></div>
        </section>
        <section className="mb-[40px] px-[15px]">
          <h1 className="text-h2 text-text-default mb-[20px] font-semibold md:mb-[30px]">
            가장 인기있는 모임
          </h1>
          <div className="flex flex-col gap-[15px] md:gap-[20px]">
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
            <PopularClubList />
          </div>
        </section>
        <div className="bg-bg-board mb-[40px] h-[10px] w-full"></div>
        <SimilarEvents items={eventItem} />
        <PlacesNearby items={placeItem} />
        <nav className="bg-bg-nav h-[64px] w-full"></nav>
      </main>
    </>
  );
}
