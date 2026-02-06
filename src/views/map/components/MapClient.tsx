'use client';
import { useEffect, useRef } from 'react';
import { renderMarkers } from '@/libs/utils/mapMarkers';
import { searchCoordinateToAddress, waitForNaverMaps } from '@/libs/utils/naverMap';
import { useMapStore } from '@/stores/useMapStore';
import { extractDistrict } from '@/libs/utils/locationSelect';

interface ContentListProps {
  data: ContentItem[];
}

export default function MapClient(data: ContentListProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<naver.maps.Marker[] | null>([]);
  const coordinate = useMapStore((state) => state.coordinate);
  const setCoordinate = useMapStore((state) => state.setCoordinate);
  const setPlaceName = useMapStore((state) => state.setPlaceName);

  useEffect(() => {
    let map: naver.maps.Map;
    //37.5665, 126.978
    const { longitude, latitude } = coordinate;

    const init = async () => {
      await waitForNaverMaps(); // ← 전역 준비 보장
      if (!mapRef.current) return;

      const center = new naver.maps.LatLng(latitude, longitude);
      map = new naver.maps.Map(mapRef.current, { center, zoom: 14, scaleControl: false });

      const createdMarkers = renderMarkers(map, data);

      console.log(createdMarkers);

      markersRef.current = await createdMarkers;

      markersRef.current = await createdMarkers;

      naver.maps.Event.addListener(map, 'dragend', async () => {
        //지도 드래그 해서 위치 이동시 x,y 값 가져오기
        const { x, y } = map!.getCenter();
        const address = await searchCoordinateToAddress(x, y);
        const district = extractDistrict(address);
        //전역 상태 업데이트
        setPlaceName(district);
        setCoordinate(x, y);
        //해당 위치의 event 가져오기

        // marker.setPosition(c);
      });
    };

    void init();

    return () => {
      try {
        if (markersRef.current !== null && markersRef.current.length > 0) {
          markersRef.current.forEach((marker) => {
            naver.maps.Event.clearInstanceListeners(marker);
            marker.setMap(null);
          });
          markersRef.current = [];
        }
        if (map) {
          naver.maps.Event.clearInstanceListeners(map);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [setPlaceName, setCoordinate, coordinate, data]);

  return <div ref={mapRef} className="h-full w-full" />;
}
