import React from 'react'
import { Container } from './styles'

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
export const CardStoreItem = ({ data }: { data: IStoresFoundProps }) => {
  return (
    <Container>
      <img
        src={data.avatar?.url || '/images/storeFake.png'}
        alt=""
        className="img-profile"
      />
      <div className="wrap-texts">
        <h2>{data.name.split(' ')[0]}</h2>
        <div className="wrap-starts">
          <img src="/images/Estrelas.svg" alt="Estrelas" />
          <span>({data.avgStars})</span>
        </div>
      </div>
      <img src="/images/coracao.svg" alt="coracao" />
    </Container>
  )
}
