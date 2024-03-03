import React from 'react'
import { Container } from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CardStoreItem } from '../CardStoreItem'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/bundle'

interface IStoresFoundProps {
  CNPJ: string
  addressNumber: number
  avatar: { id: string; name: string; filename: string; url: string }
  avgStars: number
  background: {
    id: string
    name: string
    filename: string
    url: string
  }
  categories: [
    {
      enabled: boolean
      id: string
      name: string
      storeProductsId: string | null
      type: string
    }
  ]
  city: string
  deliveryFee: number
  description: string
  enabled: boolean
  facebookLink: string
  formatedName: string
  id: string
  instagramLink: string | null
  likes: number
  name: string
  neighborhood: string
  phone: string
  productCategories: [
    {
      enabled: boolean
      id: string
      name: string
      storeProductsId: string
      type: string
    }
  ]
  schedules: {
    dom: []
    qua: []
    qui: []
    sab: []
    seg: []
    sex: []
    ter: []
  }
  state: string
  street: string
  sumFeedbacks: number
  sumOrders: number
  sumStars: number
  whatsappLink: string | null
  zipcode: string
}

export const CarouselStore = ({ stores }: { stores: IStoresFoundProps[] }) => {
  return (
    <Container>
      <Swiper spaceBetween={30} slidesPerView={3}>
        {stores &&
          stores.map((store, i) => (
            <div key={i}>
              <SwiperSlide className="swiper-slide">
                <CardStoreItem data={store} />
              </SwiperSlide>
            </div>
          ))}
        <SwiperSlide>
          <div></div>
        </SwiperSlide>
        <SwiperSlide>
          <div></div>
        </SwiperSlide>
        <SwiperSlide>
          <div></div>
        </SwiperSlide>
      </Swiper>
    </Container>
  )
}
