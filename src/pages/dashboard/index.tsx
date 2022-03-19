import React from 'react'

import Head from 'next/head'

import Dashboard from '@/components/templates/Dashboard'

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>
      <Dashboard>Testing</Dashboard>
    </>
  )
}

export default DashboardPage
