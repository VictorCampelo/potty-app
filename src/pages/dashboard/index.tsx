import React, { useState } from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'
import CardDashboard from '@/components/molecules/CardDashboard'
import ProductList from '@/components/organisms/ProductList'
import NoneItems from '@/components/organisms/NoneItems'
import FeedbackList from '@/components/organisms/FeedbackList'

import { List } from './styles'
import StoreAccess from '@/components/organisms/StoreAccess'
import StoreProfit from '@/components/organisms/StoreProfit'

const DashboardPage = () => {
  const [mostSoldProducts] = useState([])

  const [lastSoldProducts] = useState([
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      price: 10.5,
      quantity: 10
    }
  ])

  const [lastFeedback] = useState([
    {
      name: 'Mikael',
      text: 'Adorei o café!',
      stars: 4,
      time: 'Há 1 hora'
    }
  ])

  const [storeAccess] = useState({
    monday: 10,
    tuesday: 10,
    wednesday: 10,
    thursday: 10,
    friday: 10,
    saturday: 10,
    sunday: 10,
    today: 10
  })

  const [storeProfit] = useState([
    {
      name: 'Fev',
      value: 10360
    },
    {
      name: 'Mar',
      value: 13405
    },
    {
      name: 'Abr',
      value: 12580
    },
    {
      name: 'Mai',
      value: 12900
    },
    {
      name: 'Jun',
      value: 14562
    },
    {
      name: 'Jul',
      value: 16892
    }
  ])

  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>
      <Dashboard>
        <CardDashboard title='Produtos mais vendidos' width='30%'>
          {mostSoldProducts.length ? (
            <List>
              {mostSoldProducts.map((product, i) => (
                <ProductList key={i} {...product} />
              ))}
            </List>
          ) : (
            <NoneItems />
          )}
        </CardDashboard>

        <CardDashboard title='Últimos produtos vendidos' width='35%'>
          {lastSoldProducts.length ? (
            <List>
              {lastSoldProducts.map((product, i) => (
                <ProductList key={i} {...product} />
              ))}
            </List>
          ) : (
            <NoneItems />
          )}
        </CardDashboard>

        <CardDashboard title='Últimos Feedbacks' width='25%'>
          {lastFeedback.length ? (
            <List>
              {lastFeedback.map((feedback, i) => (
                <FeedbackList key={i} {...feedback} />
              ))}
            </List>
          ) : (
            <NoneItems />
          )}
        </CardDashboard>

        <CardDashboard title='Quantidade de acessos a loja' width='45%'>
          {storeAccess ? <StoreAccess {...storeAccess} /> : <NoneItems />}
        </CardDashboard>

        <CardDashboard title='Rendimentos' width='45%'>
          {storeProfit ? <StoreProfit months={storeProfit} /> : <NoneItems />}
        </CardDashboard>
      </Dashboard>
    </>
  )
}

export default DashboardPage
