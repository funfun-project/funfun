'use client';
import { useEffect, useRef } from 'react';
import makePinHTML from '@/lib/utils/mapMarker';

const waitForNaverMaps = () =>
  new Promise<void>((resolve) => {
    const tick = () => {
      if (typeof naver !== 'undefined' && naver.maps) resolve();
      else requestAnimationFrame(tick); // 에러 대신 다음 프레임에 재시도
    };
    tick();
  });

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    let map: naver.maps.Map | undefined;

    const init = async () => {
      await waitForNaverMaps(); // ← 전역 준비 보장
      if (!mapRef.current) return;

      const center = new naver.maps.LatLng(37.5665, 126.978);
      map = new naver.maps.Map(mapRef.current, { center, zoom: 14 });

      const pos = new naver.maps.LatLng(37.5665, 126.978);

      const marker = new naver.maps.Marker({
        position: pos,
        map,
        icon: {
          content: makePinHTML('/images/place.jpg', '#FF5126'),
          // 기준점(anchor): 꼬리 끝이 좌표에 닿도록 설정
          anchor: new naver.maps.Point(30, 69), // x=가운데(60/2), y=헤드60 + 꼬리 약9
          size: new naver.maps.Size(60, 69), // 히트 영역(대략)
        } as naver.maps.HtmlIcon,
      });
      markerRef.current = marker;
    };

    void init();

    return () => {
      try {
        if (markerRef.current) {
          naver.maps.Event.clearInstanceListeners(markerRef.current);
          markerRef.current.setMap(null);
          markerRef.current = null;
        }
        if (map) {
          naver.maps.Event.clearInstanceListeners(map);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return <div ref={mapRef} className="h-[100%] w-[100%]" />;
}
