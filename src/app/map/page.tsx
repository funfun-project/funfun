import Map from '@/views/map/Map';
// import MapClient from '@/views/map/components/MapClient';
import Script from 'next/script';
// import Test from '@/views/map/Test';

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
