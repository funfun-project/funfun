import { getGeocode } from '@/libs/utils/naverMap';
import { useMapStore } from '@/stores/mapStore';
import { seoulDistrictList } from '@/libs/utils/locationSelect';

type GeocodeType = {
  x: string;
  y: string;
};
export default function Button({ location }: { location: string }) {
  const locationUpdate = useMapStore((state) => state.locationUpdate);

  async function submitHandler(address: string) {
    try {
      const result = await getGeocode(address);

      if (!result.addresses?.length) {
        const district = seoulDistrictList.find((el) => el.name === location);

        if (!district) {
          //하드 코딩한 seoulDistrictList의 lon 값과 lat 값을 사용하기 위한 타입 가드
          throw new Error(`Invalid district name: ${location}`);
        }

        console.log(district.lon, district.lat);

        locationUpdate(location, district.lon, district.lat);
        return;
      }

      const { x, y } = result.addresses[0] as GeocodeType;
      console.log(x, y, result);
      locationUpdate(location, Number(x), Number(y));
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
        onClick={() => void submitHandler(location)}
        className="text-text-default bg-main mt-[18px] h-[52px] w-[calc(100%)] rounded-[3px] text-center text-[18px] leading-[52px] font-semibold"
      >
        완료
      </button>
    </>
  );
}
