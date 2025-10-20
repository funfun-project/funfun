import Map from '@/features/map/Map';
// import MapClient from '@/features/map/components/MapClient';
import Script from 'next/script';
// import Test from '@/features/map/Test';

export default function page() {
  return (
    <>
      <Script
        id="naver-maps-sdk"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
      />
      {/* <MapClient /> */}
      <Map />
      {/* <Test /> */}
    </>
  );
}
