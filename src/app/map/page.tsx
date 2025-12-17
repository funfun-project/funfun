// import Map from '@/views/map/Map';
// import MapClient from '@/views/map/components/MapClient';
import LocationSelect from '@/views/map/components/locationSelect/LocationSelect';
import Script from 'next/script';
// import DatetimePicker from '@/views/datetimePicker/DatetimePicker';

// 동적 라우트   세그먼트 가져오기
// export default async function Page({ params }: { params: Promise<{ gatheringId: string }> }) {
//   const { gatheringId } = await params;
export default function page() {
  return (
    <>
      <Script
        id="naver-maps-sdk"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
      />
      {/* <MapClient /> */}
      {/* <Map /> */}
      {/* <DatetimePicker /> */}
      <LocationSelect />
    </>
  );
}
