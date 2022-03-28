import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react'

import StoreRepository from '@/repositories/StoreRepository'

import _ from 'lodash'

import type { CartProduct, CartStore } from '@/@types/entities'

interface CartContextData {
  loading: boolean
  totalPrice: number
  totalItems: number
  products: CartProduct[]
  stores: CartStore[]
  selectAllProducts: () => void
  toggleSelectProduct: (id: string) => void
  addProduct: (product: CartProduct) => void
  removeProduct: (id: string, all?: boolean) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: React.ReactNode
}

const storeRepository = new StoreRepository()

export const CartContext = createContext<CartContextData>({
  loading: false,
  totalPrice: 0,
  totalItems: 0,
  products: [],
  stores: [],
  addProduct: () => undefined,
  removeProduct: () => undefined,
  selectAllProducts: () => undefined,
  toggleSelectProduct: () => undefined,
  clearCart: () => undefined
})

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [stores, setStores] = useState<CartStore[]>([])
  const [loading, setLoading] = useState(false)

  const { totalPrice, totalItems } = useMemo(() => {
    const totalPrice = products.reduce(
      (prev, curr) => prev + Number(curr.price) * Number(curr.amount),
      0
    )
    const totalItems = products.reduce(
      (acc, product) => acc + product.amount,
      0
    )

    return { totalPrice, totalItems }
  }, [products])

  const updateProducts = (newProducts: CartProduct[]) => {
    setProducts(newProducts)
    localStorage.setItem('bdv.cart.products', JSON.stringify(newProducts))
  }

  const selectAllProducts = () => {
    updateProducts(products.map((product) => ({ ...product, selected: true })))
  }

  const toggleSelectProduct = (id: string) => {
    updateProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    )
  }

  const removeProduct = (id: string, all = true) => {
    if (all) {
      updateProducts(products.filter((product) => product.id !== id))
    } else {
      updateProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, amount: product.amount - 1 }
            : product
        )
      )
    }
  }

  const addProductInStore = async (
    newProduct: CartProduct,
    { exist = false } = {}
  ) => {
    if (exist) {
      setStores(
        stores.map((store) => {
          if (store.id === newProduct.id) {
            store.products = store.products.map((product) => {
              if (product.id === newProduct.id) product.amount += 1
              return product
            })
          }

          return store
        })
      )
    } else {
      const store = await storeRepository.findById(newProduct.storeId)

      return {
        id: store.id,
        name: store.name,
        products: [newProduct],
        paymentMethods: store.paymentMethods
      }
    }
  }

  const addProduct = (newProduct: CartProduct) => {
    if (products.findIndex(({ id }) => id === newProduct.id) === -1) {
      newProduct.amount = 1
      newProduct.selected = false

      updateProducts([...products, newProduct])

      addProductInStore(newProduct, { exist: false })
    } else {
      updateProducts(
        products.map((product) => {
          if (product.id === newProduct.id) {
            product.amount += 1
          }

          return product
        })
      )

      addProductInStore(newProduct, { exist: true })
    }
  }

  const clearCart = () => {
    setProducts([])
    setStores([])
    localStorage.removeItem('bdv.cart.products')
  }

  const loadData = async () => {
    try {
      setLoading(true)

      const productsCache: CartProduct[] = JSON.parse(
        localStorage.getItem('bdv.cart.products') || '[]'
      )

      const storesCache: CartStore[] = JSON.parse(
        localStorage.getItem('bdv.cart.stores') || '[]'
      )

      if (products.length !== productsCache.length) {
        updateProducts(productsCache)
      }

      if (stores.length !== storesCache.length) {
        setStores(storesCache)
      }

      if (!storesCache.length && productsCache.length) {
        const newStores = await Promise.all(
          Object.entries(_.groupBy(productsCache, 'storeId')).map(
            async ([id, products]) => {
              const { name, paymentMethods } = await storeRepository.findById(
                id
              )

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
      }
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
        totalItems,
        products,
        stores,
        selectAllProducts,
        toggleSelectProduct,
        addProduct,
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
