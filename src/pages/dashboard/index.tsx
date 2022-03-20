import React, { useState } from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'
import CardDashboard from '@/components/molecules/CardDashboard'
import ProductList from '@/components/organisms/ProductList'
import NoneItems from '@/components/organisms/NoneItems'
import FeedbackList from '@/components/organisms/FeedbackList'

import { List } from './styles'

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

  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>
      <Dashboard>
        <CardDashboard title='Produtos mais vendidos'>
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

        <CardDashboard title='Últimos produtos vendidos'>
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

        <CardDashboard title='Últimos Feedbacks'>
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
      </Dashboard>
    </>
  )
}

export default DashboardPage
