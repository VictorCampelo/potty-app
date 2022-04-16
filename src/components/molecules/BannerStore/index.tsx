import React from 'react'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import { Image, IsOpen } from './styles'

interface Props {
  images: string[]
  isOpen?: boolean
}

const BannerStore = ({ images, isOpen = false }: Props) => {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{ position: 'relative', width: '100vw' }}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <Image src={image} alt={`Imagem-${i}`} />
        </SwiperSlide>
      ))}
      <IsOpen isOpen={isOpen}>
        <span>{isOpen ? 'Aberto' : 'Fechado'} agora</span>
      </IsOpen>
    </Swiper>
  )
}

export default BannerStore
