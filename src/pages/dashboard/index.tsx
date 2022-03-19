import React, { useState } from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'
import CardDashboard from '@/components/molecules/CardDashboard'
import ProductList from '@/components/organisms/ProductList'

const DashboardPage = () => {
  const [mostSoldProducts] = useState([
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    },
    {
      image: '/images/coffee.png',
      code: '123',
      name: 'Produto 1',
      quantity: 10
    }
  ])

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

  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>
      <Dashboard>
        <CardDashboard title='Produtos mais vendidos'>
          <ProductList products={mostSoldProducts} />
        </CardDashboard>

        <CardDashboard title='Últimos produtos vendidos'>
          <ProductList products={lastSoldProducts} />
        </CardDashboard>
      </Dashboard>
    </>
  )
}

export default DashboardPage
