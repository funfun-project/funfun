let naverReadyPromise: Promise<void> | null = null;

export const waitForNaverMaps = (timeout = 5000) => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('브라우저에서 waitForNaverMaps가 실행 되지 않았습니다.'));
  }

  if (window.naver?.maps?.Service) return Promise.resolve();

  if (naverReadyPromise) return naverReadyPromise;

  naverReadyPromise = new Promise<void>((resolve, reject) => {
    const start = performance.now();

    const tick = () => {
      if (window.naver?.maps?.Service) {
        resolve();
        return;
      }
      if (performance.now() - start > timeout) {
        naverReadyPromise = null;
        reject(new Error('네이버 지도 SDK 로딩 타임아웃'));
        return;
      }
      requestAnimationFrame(tick);
    };

    tick();
  });

  return naverReadyPromise;
};

export async function getGeocode(
  address: string,
): Promise<naver.maps.Service.GeocodeResponse['v2']> {
  await waitForNaverMaps();

  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      reject(new Error('Naver Maps API not loaded'));
      return;
    }

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        reject(new Error(`getGeocode 실패: ${status} / ${JSON.stringify(response)}`));
        return;
      }

      resolve(response.v2);
    });
  });
}

export async function searchCoordinateToAddress(lng: number, lat: number): Promise<string> {
  await waitForNaverMaps();

  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      reject(new Error('Naver Maps API not loaded'));
      return;
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lng),
        orders: 'roadaddr,addr',
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          reject(new Error(`reverseGeocode 실패: ${status} / ${JSON.stringify(response)}`));
          return;
        }

        const address = response.v2.address;
        resolve(address.roadAddress || address.jibunAddress);
      },
    );
  });
}

export function transitionDate(startDate?: string | null, endDate?: string | null) {
  const start = startDate?.trim().replace(/-/g, '.');
  const end = endDate?.trim().replace(/-/g, '.');

  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (end) return end;
  return '';
}
