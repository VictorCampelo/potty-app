import React, { useState } from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'
import CardDashboard from '@/components/molecules/CardDashboard'
import ProductList from '@/components/organisms/ProductList'
import NoneItems from '@/components/organisms/NoneItems'

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

  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>
      <Dashboard>
        <CardDashboard title='Produtos mais vendidos'>
          {mostSoldProducts.length ? (
            <ProductList products={mostSoldProducts} />
          ) : (
            <NoneItems />
          )}
        </CardDashboard>

        <CardDashboard title='Últimos produtos vendidos'>
          {lastSoldProducts.length ? (
            <ProductList products={lastSoldProducts} />
          ) : (
            <NoneItems />
          )}
        </CardDashboard>
      </Dashboard>
    </>
  )
}

export default DashboardPage
