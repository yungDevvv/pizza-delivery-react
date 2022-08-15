import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "./slider.scss";


function Slider() {


   return (
      <div style={{ position: 'relative' }}>
         <Swiper
            
            navigation={{
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            }}
            
            breakpoints= {{
               1230: {
                  slidesPerView: 5
               },
               
               946: {
                  slidesPerView: 4,
                  spaceBetween: 8
               },
               538: {
                  slidesPerView: 4,
                  spaceBetween: 10
               },
               370: {
                  
                  slidesPerView: 3,
                  spaceBetween:5
               },
               320: {
                  spaceBetween:5,
                  slidesPerView: 2.7,
                  
               }

               
            }}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            style={{borderRadius: '20px'}}
            
         >


            <SwiperSlide>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-1.png') 0 0/auto 100% no-repeat` }}
               >
                  <h4>You need to test it</h4>
               </div>
            </SwiperSlide >
            <SwiperSlide>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-2.webp') -100px 0/auto 100% no-repeat` }}
               >
                  <h4>All credit cards allowed</h4>
               </div>
            </SwiperSlide >
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-3.png') 0 0/auto 100% no-repeat` }}
               >
                  <h4>Try it with your friends!</h4>
               </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-4.png') 0 0/auto 100% no-repeat` }}
               >
                  <h4>Pizzas for everyone</h4>
               </div>
            </SwiperSlide >
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-5.webp') 0 0/auto 100% no-repeat` }}
               >
                  <h4>You can pay with crypto, too</h4>
               </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-6.webp') 0 0/auto 100% no-repeat` }}
               >
                  <h4 style={{fontSize: '25px', maxWidth: '140px'}}>Pizza makes you happy :D</h4>
               </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url(img/slider/image-7.png) 0 0/auto 100% no-repeat` }}
               >
                  <h4>You should test a Dodster</h4>
               </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-8.png') 0 0/auto 100% no-repeat` }}
               >
                  <h4>REACT PIZZA around the world</h4>
               </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: '220px' }}>
               <div
                  className='slider-slide'
                  style={{ background: `url('img/slider/image-9.webp') 0 0/auto 100% no-repeat` }}
               >
                  <h4>Get you free Coca-Cola - FREECOLA</h4>
               </div>
            </SwiperSlide>
         </Swiper>
         <div className='swiper-button-next'></div>
         <div className='swiper-button-prev'></div>
      </div>
   )
}

export default Slider