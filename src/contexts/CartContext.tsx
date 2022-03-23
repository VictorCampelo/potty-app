import React, { createContext, useContext, useState, useEffect } from 'react'

import StoreRepository from '@/repositories/StoreRepository'

import _ from 'lodash'

import type { Product, PaymentMethod } from '@/@types/entities'

interface Store {
  id: string
  name: string
  products: Product[]
  paymentMethods: PaymentMethod[]
}

interface CartContextData {
  loading: boolean
  totalPrice: number
  products: Product[]
  stores: Store[]
  setProducts: (products: Product[]) => void
}

interface CartProviderProps {
  children: React.ReactNode
}

const storeRepository = new StoreRepository()

export const CartContext = createContext<CartContextData>({
  loading: false,
  totalPrice: 0,
  products: [],
  stores: [],
  setProducts: () => undefined
})

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)

      const newProducts: Product[] = JSON.parse(
        localStorage.getItem('bdv.cart.products') || '[]'
      )

      if (products.length && products.length === newProducts.length) return

      setProducts(newProducts)

      const newPrice = newProducts.reduce((prev, curr) => {
        return prev + Number(curr.price) * Number(curr.amount)
      }, 0)

      setTotalPrice(newPrice)

      const newStores = await Promise.all(
        Object.entries(_.groupBy(newProducts, 'storeId')).map(
          async ([id, products]) => {
            const { name, paymentMethods } = await storeRepository.findById(id)

            return {
              id,
              name,
              products,
              paymentMethods
            }
          }
        )
      )

      setStores(newStores)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <CartContext.Provider
      value={{
        loading,
        totalPrice,
        products,
        stores,
        setProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  return context
}
