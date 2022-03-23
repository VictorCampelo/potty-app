import React, { createContext, useContext, useState, useEffect } from 'react'

import StoreRepository from '@/repositories/StoreRepository'

import _ from 'lodash'

import type { CartProduct, PaymentMethod } from '@/@types/entities'

interface Store {
  id: string
  name: string
  products: CartProduct[]
  paymentMethods: PaymentMethod[]
}

interface CartContextData {
  loading: boolean
  totalPrice: number
  products: CartProduct[]
  stores: Store[]
  setProducts: (products: CartProduct[]) => void
  selectAllProducts: () => void
  toggleSelectProduct: (id: string) => void
  removeProduct: (id: string) => void
  clearCart: () => void
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
  setProducts: () => undefined,
  removeProduct: () => undefined,
  selectAllProducts: () => undefined,
  toggleSelectProduct: () => undefined,
  clearCart: () => undefined
})

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)

      const newProducts: CartProduct[] = JSON.parse(
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

  const selectAllProducts = () => {
    setProducts(products.map((product) => ({ ...product, selected: true })))
  }

  const toggleSelectProduct = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    )
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const clearCart = () => {
    setProducts([])
  }

  useEffect(() => {
    localStorage.setItem('bdv.cart.products', JSON.stringify(products))
  }, [products])

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
        setProducts,
        selectAllProducts,
        toggleSelectProduct,
        removeProduct,
        clearCart
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
