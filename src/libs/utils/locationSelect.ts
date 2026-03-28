export const seoulDistrictList = [
  { name: '전체', lon: 126.978, lat: 37.5665 },
  { name: '강남구', lon: 127.0473, lat: 37.5184 },
  { name: '강동구', lon: 127.1465, lat: 37.5499 },
  { name: '강북구', lon: 127.0257, lat: 37.6396 },
  { name: '강서구', lon: 126.8497, lat: 37.5509 },
  { name: '관악구', lon: 126.9436, lat: 37.4654 },
  { name: '광진구', lon: 127.0827, lat: 37.5388 },
  { name: '구로구', lon: 126.8581, lat: 37.4954 },
  { name: '금천구', lon: 126.8956, lat: 37.4574 },
  { name: '노원구', lon: 127.0778, lat: 37.655 },
  { name: '도봉구', lon: 127.0471, lat: 37.6688 },
  { name: '동대문구', lon: 127.0395, lat: 37.5744 },
  { name: '동작구', lon: 126.9828, lat: 37.4979 },
  { name: '마포구', lon: 126.9018, lat: 37.5662 },
  { name: '서대문구', lon: 126.9368, lat: 37.5794 },
  { name: '서초구', lon: 127.0376, lat: 37.4761 },
  { name: '성동구', lon: 127.0407, lat: 37.5509 },
  { name: '성북구', lon: 127.0273, lat: 37.6109 },
  { name: '송파구', lon: 127.1147, lat: 37.5048 },
  { name: '양천구', lon: 126.8561, lat: 37.5271 },
  { name: '영등포구', lon: 126.8962, lat: 37.5265 },
  { name: '용산구', lon: 126.9814, lat: 37.5311 },
  { name: '은평구', lon: 126.9288, lat: 37.6027 },
  { name: '종로구', lon: 126.9794, lat: 37.5729 },
  { name: '중구', lon: 126.997, lat: 37.5641 },
  { name: '중랑구', lon: 127.0927, lat: 37.6065 },
];

export function extractDistrict(address: string) {
  return (address.match(/[가-힣]+구/)?.[0] ??
    address.match(/[가-힣]+군/)?.[0] ??
    address.match(/[가-힣]+시/)?.[0]) as string;
}
