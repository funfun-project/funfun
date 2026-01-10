export default function makePinHTML(imgUrl: string, color = '#F25A2B') {
  return `
  <div class="relative w-[45px] h-[51px]">
    <div class="relative grid place-items-center w-[45px] h-[45px] rounded-full z-50" style="background:${color}">
      <div class="w-[33px] h-[33px] rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)] bg-center bg-cover"
           style="background-image:url('${imgUrl}')"></div>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2 bottom-[1px] rounded-lb-[32px] w-[18px] h-[18px] rotate-45 rounded-br-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
         style="background:${color}"></div>
  </div>`;
}

export function renderMarkers(map: naver.maps.Map, places: markerItem[]) {
  const markers = places.map((p) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(p.lat, p.lng),
      map,
      icon: {
        content: makePinHTML('/images/place.jpg', '#FF5126'),

        anchor: new naver.maps.Point(30, 69),
        size: new naver.maps.Size(60, 69),
      } as naver.maps.HtmlIcon,
    });

    // 클릭 이벤트로 card 아이템 바텀 시트에 뿌리기
    // naver.maps.Event.addListener(marker, 'click', () => {
    //   console.log('clicked:', p.id);
    // });

    return marker;
  });

  //나중에 지우거나 갱신하려면 꼭 저장
  return markers;
}
