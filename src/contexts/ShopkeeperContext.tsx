import { createContext, ReactNode, useEffect, useState } from 'react'

type ShopkeeperStore = {
  name?: string
  CNPJ?: string
  phone?: string
  address?: string
  publicPlace?: string
  number?: string
  district?: string
  cep?: string
  city?: string
  state?: string
  image?: string
  description?: string
  facebook_link?: string
  instagram_link?: string
  whatsapp_link?: string
}

type ShopkeeperUser = {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  passwordConfirmation?: string
  chosenPlan?: string
}

type ShopkeepeerContextData = {
  userDto: ShopkeeperUser
  storeDto: ShopkeeperStore
  setUser: (user: ShopkeeperUser) => void
  setStore: (store: ShopkeeperStore) => void
}

export const ShopkeeperContext = createContext({} as ShopkeepeerContextData)

type ShopkeepeerContext = {
  children: ReactNode
}

export function ShopkeeperProvider({ children }: ShopkeepeerContext) {
  const [user, setUser] = useState<ShopkeeperUser>({})
  const [store, setStore] = useState<ShopkeeperStore>({})

  function changeUser(newUser: ShopkeeperUser) {
    setUser(newUser)
  }

  function changeStore(newStore: ShopkeeperStore) {
    setStore(newStore)
  }

  return (
    <ShopkeeperContext.Provider
      value={{
        userDto: user,
        storeDto: store,
        setUser: changeUser,
        setStore: changeStore
      }}
    >
      {children}
    </ShopkeeperContext.Provider>
  )
}
