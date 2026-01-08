'use client';
import { useEffect, useRef } from 'react';
import { renderMarkers } from '@/libs/utils/mapMarkers';
import { searchCoordinateToAddress, waitForNaverMaps } from '@/libs/utils/naverMap';
import { useMapStore } from '@/stores/mapStore';
import { extractDistrict } from '@/libs/utils/locationSelect';

const markers: markerItem[] = [
  { id: 'group1-1', lat: 37.5665, lng: 126.978 },
  { id: 'group1-2', lat: 37.56655, lng: 126.9781 },
  { id: 'group1-3', lat: 37.56645, lng: 126.97805 },
  { id: 'group2-1', lat: 37.5658, lng: 126.9751 },
  { id: 'group2-2', lat: 37.56585, lng: 126.97515 },
  { id: 'group3-1', lat: 37.566, lng: 126.9772 },
  { id: 'group3-2', lat: 37.56605, lng: 126.97725 },
  { id: 'group3-3', lat: 37.56595, lng: 126.97715 },
];

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<naver.maps.Marker[] | null>([]);
  const updateCoordinate = useMapStore((state) => state.updateCoordinate);
  const updatePlaceName = useMapStore((state) => state.updatePlaceName);

  useEffect(() => {
    let map: naver.maps.Map | undefined;

    const init = async () => {
      await waitForNaverMaps(); // ← 전역 준비 보장
      if (!mapRef.current) return;

      const center = new naver.maps.LatLng(37.5665, 126.978);
      map = new naver.maps.Map(mapRef.current, { center, zoom: 14, scaleControl: false });

      const createdMarkers = renderMarkers(map, markers);

      markersRef.current = createdMarkers;

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
  }, [updatePlaceName, updateCoordinate]);

  return <div ref={mapRef} className="h-[100%] w-[100%]" />;
}
