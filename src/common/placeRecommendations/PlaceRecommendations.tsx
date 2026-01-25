'use client';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/assets/styles/reactSlick.css';
import PlaceListItem from './PlaceListItem';

export default function PlaceRecommendations() {
  const settings: Settings = {
    dots: true,
    arrows: false,
    lazyLoad: 'anticipated',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <>
      <div className="bg-bg-input slider-container relative mb-[15px] h-[140px] w-full rounded-[10px] md:h-[285px]">
        <Slider {...settings}>
          <PlaceListItem />
          <PlaceListItem />
        </Slider>
      </div>
    </>
  );
}
