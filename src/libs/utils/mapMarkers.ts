import { getGeocode } from './naverMap';

interface ContentListProps {
  data: ContentItem[];
}

export default function makePinHTML(imgUrl: string, color = '#F25A2B') {
  return `
  <div class="relative w-11.25 h-12.75">
    <div class="relative grid place-items-center w-11.25 h-11.25 rounded-full z-50" style="background:${color}">
      <div class="w-8.25 h-8.25 rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)] bg-center bg-cover"
           style="background-image:url('${imgUrl}')"></div>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2 bottom-px rounded-lb-[32px] w-4.5 h-4.5 rotate-45 rounded-br-lg shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
         style="background:${color}"></div>
  </div>`;
}

export async function renderMarkers(map: naver.maps.Map, places: ContentListProps) {
  const markerPromises = places.data.map(async (p) => {
    const geocode = await getGeocode(p.address);
    const first = geocode.addresses?.[0];

    // 타입 가드
    if (!first?.x || !first?.y) return null;
    const x = Number(first.x);
    const y = Number(first.y);

    // poster가 없어도 마커는 찍을 수 있게 조정
    if (!p.poster) return null;

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(y, x),
      map,
      icon: {
        content: makePinHTML(p.poster, '#FF5126'),
        anchor: new naver.maps.Point(30, 69),
        size: new naver.maps.Size(60, 69),
      } as naver.maps.HtmlIcon,
    });

    // 클릭 이벤트
    // naver.maps.Event.addListener(marker, 'click', () => {
    //    console.log('clicked:', p.id);
    // });

    return marker;
  });

  const markers = await Promise.all(markerPromises);

  return markers.filter((m): m is naver.maps.Marker => m !== null);
}
