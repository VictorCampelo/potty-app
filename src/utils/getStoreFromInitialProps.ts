import StoreRepository from '@/repositories/StoreRepository'

import type { NextPageContext } from 'next'

const storeRepository = new StoreRepository()

const getStoreFromInitialProps = async (ctx: NextPageContext) => {
  try {
    const storeName = ctx.req?.headers.host?.split('.')[0]

    return storeName ? await storeRepository.findByName(storeName) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default getStoreFromInitialProps
