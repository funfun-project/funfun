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
