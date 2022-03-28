import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react'

import StoreRepository from '@/repositories/StoreRepository'

import _ from 'lodash'

import type { Product, CartProduct, PaymentMethod } from '@/@types/entities'

interface Store {
  id: string
  name: string
  products: CartProduct[]
  paymentMethods: PaymentMethod[]
}

interface CartContextData {
  loading: boolean
  totalPrice: number
  totalItems: number
  products: CartProduct[]
  stores: Store[]
  selectAllProducts: () => void
  toggleSelectProduct: (id: string) => void
  addProduct: (product: Product | CartProduct) => void
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
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)

  const totalPrice = useMemo(
    () =>
      products.reduce(
        (prev, curr) => prev + Number(curr.price) * Number(curr.amount),
        0
      ),
    [products]
  )

  const totalItems = useMemo(
    () => products.reduce((acc, product) => acc + product.amount, 0),
    [products]
  )

  const updateProducts = (newProducts: CartProduct[]) => {
    setProducts(newProducts)
    localStorage.setItem('bdv.cart.products', JSON.stringify(products))
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

  const addProduct = (newProduct: Product | CartProduct) => {
    if (products.findIndex(({ id }) => id === newProduct.id) === -1) {
      const formatted = {
        storeId: newProduct.storeId,
        id: newProduct.id,
        amount: 1,
        title: newProduct.title,
        price: newProduct.price,
        priceWithDiscount: newProduct.priceWithDiscount,
        selected: false,
        image: newProduct.image || newProduct.files?.shift()?.url,
        discount: newProduct.discount
      }

      updateProducts([...products, formatted])
    } else {
      updateProducts(
        products.map((product) => {
          if (product.id === newProduct.id) {
            product.amount += 1
          }

          return product
        })
      )
    }
  }

  const clearCart = () => {
    updateProducts([])
  }

  const loadData = async () => {
    try {
      setLoading(true)

      const newProducts: CartProduct[] = JSON.parse(
        localStorage.getItem('bdv.cart.products') || '[]'
      )

      if (products.length === newProducts.length) return

      updateProducts(newProducts)

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
