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
        reject(new Error('네이버 지도 api를 불러오는대 시간이 초과 됐습니다.'));
        return;
      }
      requestAnimationFrame(tick);
    };

    tick();
  });

  return naverReadyPromise;
};

export function getGeocode(address: string): Promise<naver.maps.Service.GeocodeResponse['v2']> {
  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      reject(new Error('Naver Maps API not loaded'));
      return;
    }
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        reject(new Error(`getGeocode의 정보를 불러오는데 실패 했습니다.: ${status}`));
        return;
      }
      resolve(response.v2);
    });
  });
}
