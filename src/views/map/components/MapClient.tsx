'use client';
import { useEffect, useRef } from 'react';
import makePinHTML from '@/libs/utils/mapMarkers';
import { searchCoordinateToAddress, waitForNaverMaps } from '@/libs/utils/naverMap';
import { useMapStore } from '@/stores/mapStore';
import { extractDistrict } from '@/libs/utils/locationSelect';

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const updateCoordinate = useMapStore((state) => state.updateCoordinate);
  const updatePlaceName = useMapStore((state) => state.updatePlaceName);

  useEffect(() => {
    let map: naver.maps.Map | undefined;

    const init = async () => {
      await waitForNaverMaps(); // ← 전역 준비 보장
      if (!mapRef.current) return;

      const center = new naver.maps.LatLng(37.5665, 126.978);
      map = new naver.maps.Map(mapRef.current, { center, zoom: 14, scaleControl: false });

      const pos = new naver.maps.LatLng(37.5665, 126.978);

      const marker = new naver.maps.Marker({
        position: pos,
        map,
        icon: {
          content: makePinHTML('/images/place.jpg', '#FF5126'),

          anchor: new naver.maps.Point(30, 69),
          size: new naver.maps.Size(60, 69),
        } as naver.maps.HtmlIcon,
      });
      markerRef.current = marker;

      naver.maps.Event.addListener(map, 'dragend', async () => {
        //지도 드래그 해서 위치 이동시 x,y 값 가져오기
        const { x, y } = map!.getCenter();
        const address = await searchCoordinateToAddress(x, y);
        const district = extractDistrict(address);
        //전역 상태 업데이트
        updatePlaceName(district);
        updateCoordinate(x, y);
        //해당 위치의 event 가져오기

        // marker.setPosition(c);
      });
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
  }, [updatePlaceName, updateCoordinate]);

  return <div ref={mapRef} className="h-[100%] w-[100%]" />;
}
