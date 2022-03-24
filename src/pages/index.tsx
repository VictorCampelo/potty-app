import StorePage from '@/components/templates/Store'
import LandingPage from '@/components/templates/Landing'

import StoreRepository from '@/repositories/StoreRepository'

import type { NextPage } from 'next'
import type { Store } from '@/@types/entities'

interface ServerProps {
  store: Store | null
}

const Home: NextPage<ServerProps> = ({ store }) => {
  if (store) return <StorePage store={store} />

  return <LandingPage />
}

const storeRepository = new StoreRepository()

Home.getInitialProps = async (ctx) => {
  try {
    const storeName = ctx.req?.headers.host?.split('.')[0]

    const store = storeName ? await storeRepository.findByName(storeName) : null

    return {
      store
    }
  } catch {
    return {
      store: null
    }
  }
}

export default Home
