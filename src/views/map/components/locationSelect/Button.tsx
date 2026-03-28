import { getGeocode } from '@/libs/utils/naverMap';
import { useMapStore } from '@/stores/useMapStore';
import { seoulDistrictList } from '@/libs/utils/locationSelect';
import { cn } from '@/libs/utils/twMerge';

type GeocodeType = {
  x: string;
  y: string;
};
export default function Button({
  location,
  onClick,
}: {
  location: string | null;
  onClick: () => void;
}) {
  const setCoordinate = useMapStore((state) => state.setCoordinate);
  const setPlaceName = useMapStore((state) => state.setPlaceName);

  async function submitHandler(address: string | null) {
    try {
      if (!address) throw new Error('선택한 지역이 없습니다.');
      const result = await getGeocode(address);

      if (!result.addresses?.length) {
        const district = seoulDistrictList.find((el) => el.name === location);

        if (!district) {
          //하드 코딩한 seoulDistrictList의 lon 값과 lat 값을 사용하기 위한 타입 가드
          throw new Error(`Invalid district name: ${location}`);
        }

        setPlaceName(location);
        setCoordinate(district.lon, district.lat);
        return;
      }

      const { x, y } = result.addresses[0] as GeocodeType;
      setPlaceName(location);
      setCoordinate(Number(x), Number(y));
      onClick();
    } catch (error) {
      if (error instanceof Error) {
        console.error('표준 에러:', error.message);
      } else {
        console.error('알 수 없는 에러:', error);
      }
    }
  }

  return (
    <>
      <button
        disabled={!location ? true : false}
        onClick={() => void submitHandler(location)}
        className={cn(
          'mt-[18px] h-[52px] w-[calc(100%)] rounded-[3px] text-center text-[18px] leading-[52px] font-semibold',
          location ? 'text-text-default bg-main' : 'text-text-disabled bg-bg-button',
        )}
      >
        완료
      </button>
    </>
  );
}
