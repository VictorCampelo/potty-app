import React from 'react'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  images: string[]
}

const BannerStore = ({ images }: Props) => {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{ width: '100vw', height: '100vh' }}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={image}
            alt={`Imagem-${i}`}
            style={{ width: '100vw', height: '90vh', margin: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BannerStore
