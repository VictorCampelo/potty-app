import StorePage from '@/components/templates/Store'
import LandingPage from '@/components/templates/Landing'

import getStoreFromInitialProps from '@/utils/getStoreFromInitialProps'

import type { NextPage } from 'next'
import type { Store } from '@/@types/entities'

interface ServerProps {
  store: Store | null
}

const Home: NextPage<ServerProps> = ({ store }) => {
  if (store) return <StorePage store={store} />

  return <LandingPage />
}

Home.getInitialProps = async (ctx) => {
  const store = await getStoreFromInitialProps(ctx)
  return { store }
}

export default Home
