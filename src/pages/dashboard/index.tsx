import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'
import CardDashboard from '@/components/molecules/CardDashboard'
import ProductList from '@/components/organisms/ProductList'
import NoneItems from '@/components/organisms/NoneItems'
import FeedbackList from '@/components/organisms/FeedbackList'
import StoreAccess from '@/components/organisms/StoreAccess'
import StoreProfit from '@/components/organisms/StoreProfit'

import toast from '@/utils/toast'

import DashboardRepository from '@/repositories/DashboardRepository'

import { List } from '@/styles/pages/dashboard'

const dashboardRepository = new DashboardRepository()

const DashboardPage = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([])

  // {
  //   image: '/images/coffee.png',
  //   code: '123',
  //   name: 'Produto 1',
  //   price: 10.5,
  //   quantity: 10
  // }
  const [lastSoldProducts, setLastSoldProducts] = useState([])

  // {
  //   name: 'Mikael',
  //   text: 'Adorei o café!',
  //   stars: 4,
  //   time: 'Há 1 hora'
  // }
  const [lastFeedback, setLastFeedback] = useState([])

  const [storeAccess, setStoreAccess] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    today: 0
  })

  const [storeProfit, setStoreProfit] = useState([
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

  const loadMostSoldProducts = async () => {
    try {
      const data = await dashboardRepository.mostSolds()
      setMostSoldProducts(data)
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar os produtos mais vendidos',
        type: 'error'
      })
    }
  }

  const loadLastSoldProducts = async () => {
    try {
      const data = await dashboardRepository.lastSolds()
      setLastSoldProducts(data)
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar os últimos produtos vendidos',
        type: 'error'
      })
    }
  }

  const loadLastFeedbacks = async () => {
    try {
      const data = await dashboardRepository.lastFeedbacks()
      setLastFeedback(data)
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar os últimos feedbacks',
        type: 'error'
      })
    }
  }

  const loadStoreAccess = async () => {
    try {
      const data = await dashboardRepository.getViewer()
      setStoreAccess(data)
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar os números de acessos',
        type: 'error'
      })
    }
  }

  const loadStoreProfit = async () => {
    try {
      const data = await dashboardRepository.income()
      setStoreProfit(data)
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar os rendimentos',
        type: 'error'
      })
    }
  }

  const loadData = () =>
    Promise.allSettled([
      loadMostSoldProducts(),
      loadLastSoldProducts(),
      loadLastFeedbacks(),
      loadStoreAccess(),
      loadStoreProfit()
    ])

  useEffect(() => {
    loadData()
  })

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
