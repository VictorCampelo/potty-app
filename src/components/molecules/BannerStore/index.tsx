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
      style={{ width: '100%', height: '500px' }}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            src={image}
            alt={`Imagem-${i}`}
            style={{ height: '500px', margin: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BannerStore
