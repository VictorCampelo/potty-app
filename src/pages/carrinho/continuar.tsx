import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import MultiSelect from '@/components/atoms/MultiSelect'
import Header from '@/components/molecules/Header'
import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import ModalRegister from '@/components/templates/ModalRegister'
import ModalGuest from '@/components/templates/ModalGuest'
import ModalAddress from '@/components/templates/ModalAddress'
import IconButton from '@/components/atoms/IconButton'

import { BsArrowLeft, BsArrowRight, BsWhatsapp } from 'react-icons/bs'
import { FiChevronLeft, FiArrowLeft } from 'react-icons/fi'
import { IoPencilOutline } from 'react-icons/io5'
import { PulseLoader } from 'react-spinners'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

import OrderRepository from '@/repositories/OrderRepository'

import useMedia from 'use-media'
import { toast } from 'react-toastify'

import formatToBrl from '@/utils/formatToBrl'
import formatPhone from '@/utils/masks/formatPhone'
import getNumberArray from '@/utils/getNumberArray'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import _ from 'lodash'

import {
  Container,
  Content,
  CartContainerFooter as ContainerFooterMobile
} from '@/styles/pages/cart'

import {
  AddressCard,
  AddressInfo,
  CardsContainer,
  CartContainerFooter,
  DeliveryMethod,
  ModalContainer,
  ProductItem,
  ProductsContainer,
  UpdateAddressButton,
  ProductsMobileButtons
} from '@/styles/pages/cart/continue'

import type { Option } from '@/components/atoms/MultiSelect'
import type {
  CartProduct,
  OrderProduct,
  PaymentMethod
} from '@/@types/entities'

const orderRepository = new OrderRepository()

const CartContinue = () => {
  const { user, fetchUser, isLoading, isAuthenticated } = useAuth()

  const widthScreen = useMedia({ minWidth: '640px' })

  const { stores, products, loading, clearCart, totalPrice } = useCart()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[] | null>(
    null
  )
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(
    null
  )
  const [storesWithoutDelivery, setStoresWithoutDelivery] = useState<{
    [storeId: string]: boolean
  }>({})

  const [addressModalActive, setAddressModalActive] = useState(false)
  const [clearModalActive, setClearModalActive] = useState(false)

  const [deliveryMethod, setDeliveryMethod] = useState<'house' | 'store'>(
    'store'
  )
  const [storeDispatch, setStoreDispatch] = useState('withdrawal')
  const [parcelCheckbox, setParcelCheckbox] = useState(false)

  const [parcelsOptions, setParcelsOptions] = useState<Option[]>([])

  const [paymentMethodOption, setPaymentMethodOption] = useState<Option | null>(
    null
  )
  const [parcelOption, setParcelOption] = useState<Option | null>({
    value: '2',
    label: '2x'
  })
  const [allowParcels, setAllowParcels] = useState(false)

  const [productsPaymentMethod, setProductsPaymentMethod] = useState<{
    [productId: string]: { methodName: string; parcels?: string }
  }>({})

  const finallyPurchase =
    Object.keys(productsPaymentMethod).length === products.length

  const updateProductPaymentMethod = ({
    productId,
    methodName,
    parcels
  }: {
    productId: string
    methodName: string
    parcels: string
  }) => {
    const updated = {
      methodName,
      parcels
    }

    const paymentMethod = paymentMethods?.find(
      (methods) => methods.id === methodName
    )

    if (!paymentMethod?.allowParcels) {
      updated.parcels = ''

      setParcelOption({
        value: '1',
        label: '1x'
      })
    }

    setAllowParcels(!!paymentMethod?.allowParcels)

    setProductsPaymentMethod({
      ...productsPaymentMethod,
      [productId]: updated
    })
  }

  const onSelectPaymentMethod = (option: Option) => {
    setPaymentMethodOption(option)
    setParcelOption(null)
    updateProductPaymentMethod({
      productId: selectedProduct?.id || '',
      methodName: option.value || '',
      parcels: parcelOption?.value || ''
    })
  }

  const toggleParcelCheckbox = () => {
    setParcelCheckbox(!parcelCheckbox)
  }

  const toggleClearModal = () => {
    setClearModalActive(!clearModalActive)
  }

  const handleSelectProduct = (product: CartProduct) => {
    setSelectedProduct(product)

    updatePaymentMethods(product.id)

    const method = productsPaymentMethod[product.id]

    const store = stores.find(({ id }) => id === product.storeId)
    if (store) setStoreDispatch(store.dispatch)

    setParcelsOptions(
      getNumberArray({
        size: Number(product.parcelAmount - 1) || 0,
        startAt: 2
      }).map((parcel) => {
        return {
          value: `${parcel}`,
          label: `${parcel}x`
        }
      })
    )

    if (method) {
      setPaymentMethodOption({
        value: method.methodName,
        label: method.methodName
      })

      setAllowParcels(
        !!paymentMethods?.find(
          ({ methodName }) => methodName === method.methodName
        )?.allowParcels
      )

      if (method.parcels && Number(method.parcels) > 0) {
        setParcelOption({
          value: method.parcels,
          label: `${method.parcels}x`
        })
        setAllowParcels(true)
        setParcelCheckbox(true)
      } else {
        setParcelOption(null)
        setParcelCheckbox(false)
      }
    }
  }

  const updatePaymentMethods = (storeId: string) => {
    const store = stores.find(({ id }) => id === storeId)
    if (store) {
      setPaymentMethods(store.paymentMethods)
    }
  }

  const goToNextProduct = () => {
    const productsIds = products.map(({ id }) => id)
    const productsIdsWithPaymentMethod = Object.keys(productsPaymentMethod)
    const nextProductId = productsIds.find(
      (id) => !productsIdsWithPaymentMethod.includes(id)
    )
    const nextItem = products.find(({ id }) => id === nextProductId)

    if (nextItem && paymentMethodOption?.value) {
      setSelectedProduct(nextItem)

      updateProductPaymentMethod({
        productId: nextItem.id,
        methodName: paymentMethodOption.value,
        parcels: parcelOption?.value || '0'
      })
    } else {
      toast({
        message: 'Não encontrei o próximo produto',
        type: 'error'
      })
    }
  }

  const goToProduct = (to: 'previous' | 'next') => {
    const productIndex = products.findIndex(
      ({ id }) => id === selectedProduct?.id
    )
    let newIndex = productIndex

    if (to === 'previous') {
      if (productIndex === products.length - 1) {
        newIndex = 0
      } else {
        newIndex = productIndex + 1
      }
    } else {
      newIndex = productIndex - 1
      if (newIndex < 0) {
        newIndex = products.length - 1
      }
    }

    const newProduct = products[newIndex]

    if (newProduct) {
      setSelectedProduct(newProduct)

      if (paymentMethodOption?.value && parcelOption?.value) {
        updateProductPaymentMethod({
          productId: newProduct.id,
          methodName: paymentMethodOption.value,
          parcels: parcelOption.value
        })
      }
    } else {
      toast({
        message: 'Não encontrei nenhum produto!',
        type: 'error'
      })
    }
  }

  const handleFinishPurchase = async (user: any, isGuest = false) => {
    try {
      if (!finallyPurchase) return goToNextProduct()
      if (!user) return setShowModalGuest(true)

      const productsDTO = Object.entries(_.groupBy(products, 'storeId')).map(
        ([storeId, products]) => {
          const orderProducts = products.map((item) => {
            const order: OrderProduct = {
              productId: item.id,
              amount: Number(item.amount),
              paymentMethod: productsPaymentMethod[item.id].methodName
            }
            const parcels = Number(productsPaymentMethod[item.id].parcels)
            if (parcels) order.parcels = parcels
            return order
          })
          return {
            storeId,
            orderProducts,
            delivery: !storesWithoutDelivery[storeId]
          }
        }
      )

      let data: any
      if (isGuest) {
        data = await orderRepository.sendAsGuest({
          products: productsDTO,
          guestAddress: user
        })
      } else {
        data = await orderRepository.send({ products: productsDTO })
      }

      data.whatsapp.forEach((it: any) => window.open(it))

      clearCart()

      await Router.push('/carrinho/sucesso')
    } catch (e: any) {
      console.error(e)

      if (e.response.status === 401) {
        return toast.error(
          'Clique aqui para fazer o login e finalizar sua compra!',
          {
            onClick: () => Router.push('/entrar')
          }
        )
      }

      if (e.response.status === 500) {
        return toast.error(
          'Faça o login com uma conta de usuário para finalizar a compra!'
        )
      }

      toast.error('Erro ao finalizar compra, tente novamente mais tarde!')
    }
  }

  const [showModalRegister, setShowModalRegister] = useState(false)
  const [showModalGuest, setShowModalGuest] = useState(false)

  useEffect(() => {
    setShowModalRegister(!isLoading && !isAuthenticated)
  }, [isLoading, isAuthenticated])

  useEffect(() => {
    if (!loading && products.length && stores.length) {
      const firstItem = products[0]

      handleSelectProduct(firstItem)

      updatePaymentMethods(firstItem.storeId)
    }
  }, [loading])

  useEffect(() => {
    if (selectedProduct?.storeId) {
      setStoresWithoutDelivery({
        ...storesWithoutDelivery,
        [selectedProduct.storeId]: deliveryMethod === 'store'
      })
    }
  }, [deliveryMethod])

  return (
    <>
      <Head>
        <title>Carrinho | Boa de Venda</title>
      </Head>

      <Header />

      <ModalAddress
        user={user}
        isOpen={addressModalActive}
        onClose={() => setAddressModalActive(false)}
        onSubmit={fetchUser}
      />

      <ModalRegister
        isOpen={showModalRegister}
        onClose={() => setShowModalRegister(false)}
      />

      <ModalGuest
        isOpen={showModalGuest}
        onClose={() => setShowModalGuest(!showModalGuest)}
        onSubmit={(data) => handleFinishPurchase(data, true)}
      />

      <Modal
        showCloseButton={true}
        title='Esvaziar carrinho'
        modalVisible={clearModalActive}
        setModalOpen={toggleClearModal}
      >
        <ModalContainer>
          <p style={{ margin: '2rem 0' }}>
            {products.length > 1
              ? `Deseja realmente esvaziar o carrinho com ${products.length} produtos?`
              : 'Deseja realmente esvaziar o carrinho com 1 produto?'}
          </p>
          <div className='buttons-container'>
            <Button
              onClick={() => {
                clearCart()
                toggleClearModal()
              }}
            >
              ESVAZIAR
            </Button>
            <Button skin='secondary' onClick={toggleClearModal}>
              CANCELAR
            </Button>
          </div>
        </ModalContainer>
      </Modal>

      <Container>
        <Content>
          {!widthScreen && (
            <div className='header' onClick={() => Router.push('/')}>
              <FiArrowLeft size={25} color='var(--black-800)' />
              <h1>Meu carrinho</h1>
            </div>
          )}
          <h1 style={widthScreen ? undefined : { display: 'none' }}>
            Finalizar compra
          </h1>

          <CardsContainer>
            <div className='top-container'>
              <AddressCard>
                <h2> {selectedProduct?.title}</h2>

                <DeliveryMethod>
                  <span>Escolha a forma que deseja receber seus pedidos</span>

                  <Checkbox
                    disabled={!['all', 'delivery'].includes(storeDispatch)}
                    confirm={deliveryMethod === 'house'}
                    toggleConfirm={() => setDeliveryMethod('house')}
                    size='small'
                    label='Receber em domicílio'
                  />
                  <Checkbox
                    disabled={!['all', 'withdrawal'].includes(storeDispatch)}
                    confirm={deliveryMethod === 'store'}
                    toggleConfirm={() => setDeliveryMethod('store')}
                    size='small'
                    label='Retirar na loja'
                  />
                </DeliveryMethod>

                <AddressInfo>
                  {isLoading ? (
                    <>
                      <span>
                        <strong>Nome do usuário:</strong> Carregando...
                      </span>

                      <span>
                        <strong>Endereço: </strong> Carregando...
                      </span>

                      <span>
                        <strong>Telefone: </strong> Carregando...
                      </span>
                    </>
                  ) : user ? (
                    <>
                      <span>
                        <strong>Nome do usuário:</strong> {user.firstName}{' '}
                        {user.lastName}
                      </span>

                      <span>
                        <strong>Endereço: </strong>
                        {user.formattedAddress}
                      </span>

                      <span>
                        <strong>Telefone: </strong> {formatPhone('00000000000')}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <strong>Nome do usuário:</strong> Não cadastrado
                      </span>

                      <span>
                        <strong>Endereço: </strong> Não cadastrado
                      </span>

                      <span>
                        <strong>Telefone: </strong> Não cadastrado
                      </span>
                    </>
                  )}
                </AddressInfo>

                <UpdateAddressButton
                  onClick={() => setAddressModalActive(true)}
                >
                  <IoPencilOutline size={24} />
                  Atualizar endereço
                </UpdateAddressButton>

                <h3>Forma de pagamento</h3>

                <div className='paymentContainer'>
                  <MultiSelect
                    isMulti={false}
                    label='Forma de pagamento'
                    options={paymentMethods?.map(({ id, methodName }) => ({
                      value: id,
                      label: capitalizeFirstLetter(methodName)
                    }))}
                    selectedValue={paymentMethodOption}
                    setSelectedValue={(option) => {
                      onSelectPaymentMethod(option)
                    }}
                    placeholder='Selecione sua forma de pagamento'
                  />

                  {parcelCheckbox && (
                    <MultiSelect
                      isMulti={false}
                      label='Parcelamento'
                      options={parcelsOptions}
                      selectedValue={parcelOption}
                      setSelectedValue={(option) => {
                        setParcelOption(option)
                        updateProductPaymentMethod({
                          productId: selectedProduct?.id || '',
                          methodName: paymentMethodOption?.value || '',
                          parcels: option.value
                        })
                      }}
                      placeholder='Selecione o número de parcelas'
                    />
                  )}
                </div>

                <Checkbox
                  disabled={!allowParcels}
                  confirm={parcelCheckbox}
                  toggleConfirm={() => {
                    toggleParcelCheckbox()
                    updateProductPaymentMethod({
                      productId: selectedProduct?.id || '',
                      methodName: paymentMethodOption?.value || '',
                      parcels:
                        !parcelCheckbox && parcelOption?.value
                          ? parcelOption.value
                          : '0'
                    })
                  }}
                  label='Parcelar compra'
                />
              </AddressCard>

              <ProductsContainer>
                {loading ? (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <PulseLoader size={8} color='var(--color-primary)' />
                  </div>
                ) : (
                  <>
                    {widthScreen ? (
                      stores.map((store, i) => {
                        return (
                          <div key={i}>
                            <h1>{store.name}</h1>

                            <div className='products-container'>
                              {store.products.map((product) => (
                                <ProductItem
                                  key={product.id}
                                  active={selectedProduct?.id === product.id}
                                  onClick={() => handleSelectProduct(product)}
                                >
                                  <div className='img-container'>
                                    <img
                                      src={product?.files[0]?.url}
                                      alt='Foto do produto'
                                    />
                                  </div>

                                  <div className='info-container'>
                                    <h4>{product.title}</h4>

                                    <span>{product.amount}x</span>
                                  </div>
                                </ProductItem>
                              ))}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div>
                        <h1>
                          {
                            stores.find(
                              ({ id }) => id === selectedProduct?.storeId
                            )?.name
                          }
                        </h1>

                        <div className='products-container'>
                          <ProductItem active={true}>
                            <div className='img-container'>
                              <img
                                src={selectedProduct?.files[0]?.url}
                                alt='Foto do produto'
                              />
                            </div>

                            <div className='info-container'>
                              <h4>{selectedProduct?.title}</h4>

                              <span>{selectedProduct?.amount}x</span>
                            </div>
                          </ProductItem>
                        </div>
                      </div>
                    )}
                    <ProductsMobileButtons>
                      <IconButton onClick={() => goToProduct('previous')}>
                        <BsArrowLeft size={18} color='var(--color-primary)' />
                        <span>Item anterior</span>
                      </IconButton>

                      <IconButton onClick={() => goToProduct('next')}>
                        <span>Próximo item</span>
                        <BsArrowRight size={18} color='var(--color-primary)' />
                      </IconButton>
                    </ProductsMobileButtons>
                  </>
                )}
              </ProductsContainer>
            </div>

            {widthScreen ? (
              <CartContainerFooter>
                <div className='buttonContainer'>
                  <button
                    className='finish goback'
                    onClick={() => {
                      Router.push('/carrinho')
                    }}
                  >
                    <FiChevronLeft size={24} color='var(--color-primary)' />
                    Voltar para o carrinho
                  </button>
                </div>

                <div className='info'>
                  <div>
                    <span>Total: </span>
                    <strong>{formatToBrl(totalPrice)}</strong>
                  </div>
                  <span className='spanBottom'></span>
                </div>

                <div className='buttonContainer'>
                  <button
                    className='finish'
                    onClick={() => handleFinishPurchase(user)}
                    disabled={!paymentMethodOption?.value}
                  >
                    {finallyPurchase ? (
                      <>
                        <BsWhatsapp size={24} color='white' />
                        FINALIZAR COMPRAR
                      </>
                    ) : (
                      <>PRÓXIMO PRODUTO</>
                    )}
                  </button>
                </div>
              </CartContainerFooter>
            ) : (
              <ContainerFooterMobile
                disabled={products.filter((it) => it.selected).length === 0}
              >
                <div className='info'>
                  <div>
                    <span>Total: </span>
                    <strong>{formatToBrl(totalPrice)}</strong>
                  </div>
                  <span className='spanBottom'>
                    {products.filter((it) => it.selected).length <= 1
                      ? products.length + ' item'
                      : products.length + ' itens'}
                    {!widthScreen && (
                      <a onClick={toggleClearModal}>Esvaziar Carrinho</a>
                    )}
                  </span>
                </div>
                <div className='buttonContainerMob'>
                  <button
                    className='finish'
                    onClick={() => handleFinishPurchase(user)}
                    disabled={!paymentMethodOption?.value}
                  >
                    {finallyPurchase ? (
                      <>
                        <BsWhatsapp size={24} color='white' />
                        <p>FINALIZAR COMPRAR</p>
                      </>
                    ) : (
                      <p>PRÓXIMO PRODUTO</p>
                    )}
                  </button>
                </div>
              </ContainerFooterMobile>
            )}
          </CardsContainer>
        </Content>
      </Container>
    </>
  )
}

export default CartContinue
