'use client';
import { useMapStore } from '@/stores/useMapStore';
import { LocateFixed } from 'lucide-react';
import { searchCoordinateToAddress } from '@/libs/utils/naverMap';
import { extractDistrict } from '@/libs/utils/locationSelect';

export default function GpsButton() {
  const setCoordinate = useMapStore((state) => state.setCoordinate);
  const setPlaceName = useMapStore((state) => state.setPlaceName);

  function getCurrentLocation() {
    if (!('geolocation' in navigator)) {
      console.log('이 브라우저는 위치 정보를 지원하지 않습니다.');
      return;
    }

    if (!window.isSecureContext) {
      alert('HTTPS 환경에서만 현재 위치를 사용할 수 있습니다.');
      return;
    }

    async function handlePosition(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      const address = await searchCoordinateToAddress(longitude, latitude);
      const district = extractDistrict(address);
      setPlaceName(district);
      setCoordinate(longitude, latitude);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handlePosition(position).catch((e) => {
          console.error('[RG] failed', e);
          // 토스트
        });
      },
      (error) => {
        console.log('[GPS] error:', error.code);
        // 토스트 띄우기
        // 에러코드 1 : 사용자가 위치 권한 거부
        // 에러코드 2 : 위치를 계산할 수 없음
        // 에러코드 3 : 시간 초과
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  return (
    <>
      <button
        onClick={getCurrentLocation}
        className="bg-bg-white flex h-[46px] w-[46px] items-center justify-center rounded-full shadow-[0_0_2px_rgba(0,0,0,0.4)]"
        aria-label="현재 위치 가져오기"
      >
        <LocateFixed size={32} strokeWidth={2} color="#ff5126" />
      </button>
    </>
  );
}
