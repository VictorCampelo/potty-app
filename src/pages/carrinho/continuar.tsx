import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import MultiSelect from '@/components/atoms/MultiSelect'
import Header from '@/components/molecules/Header'
import Modal from '@/components/molecules/Modal'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'

import { BsWhatsapp } from 'react-icons/bs'
import { FiChevronLeft, FiArrowLeft } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { BiBuildings, BiMapAlt } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FaHome } from 'react-icons/fa'
import { IoPencilOutline } from 'react-icons/io5'
import { PulseLoader } from 'react-spinners'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

import UserRepository from '@/repositories/UserRepository'
import OrderRepository from '@/repositories/OrderRepository'

import useMedia from 'use-media'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
  UpdateAddressButton
} from '@/styles/pages/cart/continue'

import type { Option } from '@/components/atoms/MultiSelect'
import type {
  CartProduct,
  OrderProduct,
  PaymentMethod
} from '@/@types/entities'
import ModalRegister from '@/components/templates/ModalRegister'
import ModalGuest from '@/components/templates/ModalGuest'

const userRepository = new UserRepository()
const orderRepository = new OrderRepository()

const addressRegisterFormSchema = yup.object().shape({
  uf: yup.string().required('Estado obrigatório'),
  city: yup.string().required('Cidade obrigatória'),
  street: yup.string().required('Logradouro obrigatório'),
  addressNumber: yup.string().required('obrigatório'),
  neighborhood: yup.string().required('Bairro obrigatório'),
  zipcode: yup
    .string()
    .required('CEP obrigatório')
    .min(9, 'Mínimo 8 caracteres')
})

const CartContinue = () => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(addressRegisterFormSchema)
  })

  const widthScreen = useMedia({ minWidth: '640px' })

  const { user, fetchUser, isLoading, isAuthenticated } = useAuth()

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

  const openAddressModal = () => {
    if (user) {
      const address = {
        uf: user.uf,
        city: user.city,
        zipcode: user.zipcode,
        addressNumber: user.addressNumber,
        complement: user.complement,
        neighborhood: user.neighborhood,
        street: user.street
      }

      Object.entries(address).forEach(([key, value]) => {
        setValue(key, value)
      })
    }

    setAddressModalActive(true)
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

    if (nextItem && paymentMethodOption?.value && parcelOption?.value) {
      setSelectedProduct(nextItem)

      updateProductPaymentMethod({
        productId: nextItem.id,
        methodName: paymentMethodOption.value,
        parcels: parcelOption.value
      })
    } else {
      toast({
        message: 'Não encontrei o próximo produto',
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

  const handleUpdateAddress = async (values: any) => {
    try {
      const address = {
        uf: values.uf,
        city: values.city,
        zipcode: values.zipcode,
        addressNumber: values.addressNumber,
        complement: values.complement,
        neighborhood: values.neighborhood,
        street: values.street
      }

      await userRepository.update(address)

      fetchUser()

      setAddressModalActive(false)

      toast.success('Endereço atualizado com sucesso!')
    } catch (e) {
      console.error(e)
      toast.error('Erro ao atualizar endereço, tente novamente mais tarde!')
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
        modalVisible={clearModalActive}
        setModalOpen={toggleClearModal}
      >
        <ModalContainer>
          <div className='title' style={{ textAlign: 'center' }}>
            <span>
              Realmente deseja <strong>esvaziar</strong> o carrinho?
            </span>
          </div>
          <div
            className='buttonsContainer'
            style={{ textAlign: 'center', marginTop: 'var(--spacing-xs)' }}
          >
            <Button
              onClick={() => {
                clearCart()
                toggleClearModal()
              }}
              style={{ marginBottom: 'var(--spacing-xxs)' }}
            >
              ESVAZIAR
            </Button>
            <span onClick={toggleClearModal}>CANCELAR</span>
          </div>
        </ModalContainer>
      </Modal>

      <Modal
        showCloseButton={false}
        setModalOpen={() => setAddressModalActive(!addressModalActive)}
        modalVisible={addressModalActive}
        under={!widthScreen}
      >
        <ModalContainer>
          <div className='exit-container'>
            <FiArrowLeft
              size={25}
              color='black'
              onClick={() => setAddressModalActive(false)}
              style={widthScreen ? { display: 'none' } : undefined}
            />
            <h1>Adicionar novo endereço</h1>

            <IoIosClose
              onClick={() => setAddressModalActive(false)}
              size={36}
              color='black'
              style={widthScreen ? undefined : { display: 'none' }}
            />
          </div>

          <form
            className='input-container'
            onSubmit={handleSubmit(handleUpdateAddress)}
          >
            <div className='row'>
              <Input
                label='CEP'
                placeholder='00000-000'
                mask='cep'
                icon={<BiMapAlt size={20} color='var(--black-800)' />}
                {...register('zipcode')}
                maxLength={9}
              />

              <Input
                label='Bairro'
                placeholder='Bairro'
                icon={<BiMapAlt size={20} color='var(--black-800)' />}
                {...register('neighborhood')}
              />
            </div>

            <div className='row mid'>
              <Input
                label='Logradouro'
                placeholder='Logradouro'
                icon={<FaHome size={20} color='var(--black-800)' />}
                {...register('street')}
              />

              <Input
                label='Número'
                placeholder='0000'
                mask='number'
                type='numeric'
                maxLength={6}
                icon={<BiBuildings size={20} color='var(--black-800)' />}
                {...register('addressNumber')}
              />
            </div>

            <div className='row'>
              <Input
                label='Cidade'
                placeholder='Cidade'
                icon={
                  <HiOutlineLocationMarker size={20} color='var(--black-800)' />
                }
                {...register('city')}
                maxLength={45}
              />

              <Input
                label='Estado'
                placeholder='Estado'
                icon={
                  <HiOutlineLocationMarker size={20} color='var(--black-800)' />
                }
                {...register('uf')}
                maxLength={45}
              />
            </div>

            <div className='row'>
              <Input
                label='Complemento'
                placeholder='Complemento'
                {...register('complement')}
                maxLength={30}
              />
            </div>

            <div className='buttons-container'>
              <Button
                type='button'
                style={widthScreen ? undefined : { display: 'none' }}
                onClick={() => setAddressModalActive(false)}
              >
                Voltar
              </Button>
              <Button type='submit'>Atualizar</Button>
            </div>
          </form>
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

                <UpdateAddressButton onClick={openAddressModal}>
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
                  >
                    {' '}
                    <BsWhatsapp size={24} color='white' />
                    <p>FINALIZAR</p>
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
