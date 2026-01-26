'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function PlaceRecommendations() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };
  return (
    <>
      <div className="bg-bg-input slider-container relative mb-[15px] h-[140px] w-full overflow-hidden rounded-[10px] md:h-[285px]">
        <Slider {...settings}>
          <div className="relative h-[140px] w-full md:h-[285px]">
            <div className="absolute top-[10px] left-[15px] z-9999">
              <p className="text-body2 md:text-body1 text-text-default mb-[10px]">경운사</p>
              <p className="text-body3 md:text-body4 text-text-default">
                서울 특별시 강남구 24번길 32
              </p>
            </div>
            <Image fill src="/img/eventImg.png" alt="추천 이미지" className="object-cover" />
          </div>
          <div className="relative h-[140px] w-full md:h-[285px]">
            <div className="absolute top-[10px] left-[15px] z-9999">
              <p className="text-body2 md:text-body1 text-text-default mb-[10px]">경운사</p>
              <p className="text-body3 md:text-body4 text-text-default">
                서울 특별시 강남구 24번길 32
              </p>
            </div>
            <Image fill src="/img/eventImg.png" alt="추천 이미지" className="object-cover" />
          </div>
        </Slider>
      </div>
    </>
  );
}
