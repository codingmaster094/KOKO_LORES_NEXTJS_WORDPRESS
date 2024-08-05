'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SliderSection({ initialContent }) {
  const content = initialContent;
  return (
    <section className="slider-image">
      <div className="owl-carousel">
        <Swiper
          navigation
          pagination={{ type: "fraction" }}
          autoplay={{ delay: 2000 }} // Auto-swiping every 2 seconds
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => swiper}
          className=""
        >
          {content?.home_slider_images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                <div className="slide-box relative">
                {
                  <>
                  <img src={image.home_silder_image.url} alt={image.home_silder_image.alt} className='block h-full w-full object-cover' />
                  <p className="">{image.home_slider_title}</p>
                  </>
                }
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default SliderSection
