import StoreRepository from '@/repositories/StoreRepository'

import type { NextPageContext } from 'next'

const storeRepository = new StoreRepository()

const getStoreFromInitialProps = async (ctx: NextPageContext) => {
  try {
    const storeName = ctx.req?.headers.host?.split('.')[0]

    const store = storeName ? await storeRepository.findByName(storeName) : null

    return store
  } catch {
    return null
  }
}

export default getStoreFromInitialProps
