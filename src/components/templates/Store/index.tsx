import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Header from '@/components/molecules/Header'
import BannerStore from '@/components/molecules/BannerStore'
import FooterContact from '@/components/organisms/FooterContact'
import Pagination from '@/components/molecules/Pagination'
import Input from '@/components/atoms/Input'
import IconButton from '@/components/atoms/IconButton'
import Checkbox from '@/components/atoms/Checkbox'
import ProductCard from '@/components/organisms/ProductCard'
import ProductCardHorizon from '@/components/organisms/ProductCardHorizon'
import CartButton from '@/components/molecules/CartButton'

import useMedia from 'use-media'
import toast from '@/utils/toast'

import StoreRepository from '@/repositories/StoreRepository'
import ProductRepository from '@/repositories/ProductRepository'

import { Wrapper, Container } from '@/styles/GlobalStyle'
import {
  Card,
  StoreAvatar,
  Column,
  Row,
  Description,
  Line,
  Text,
  StoreInfo
} from '@/styles/pages/store'

import { VscSearch } from 'react-icons/vsc'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import PulseLoader from 'react-spinners/PulseLoader'
import ReactStars from 'react-stars'

import type { NextPage } from 'next'
import type {
  Product,
  Store,
  ScheduleDays,
  File,
  Schedules,
  ProductsOrder
} from '@/@types/entities'

interface Props {
  name: string
}

const storeRepository = new StoreRepository()
const productsRepository = new ProductRepository()

const StorePage: NextPage<Props> = ({ name }) => {
  const [store, setStore] = useState<Store>({
    id: '',
    name: '',
    formatedName: '',
    formattedAddress: '',
    CNPJ: '',
    phone: '',
    street: '',
    zipcode: '',
    addressNumber: 0,
    neighborhood: '',
    city: '',
    state: '',
    description: '',
    enabled: false,
    sumOrders: 0,
    sumFeedbacks: 0,
    sumStars: 0,
    avgStars: 0,
    facebookLink: '',
    instagramLink: '',
    whatsappLink: '',
    schedules: {} as Schedules,
    createdAt: '',
    updatedAt: '',
    likes: 0,
    deliveryFee: 0,
    dispatch: 'all',
    avatar: { url: '/images/icon.png' } as File,
    background: { url: '/images/capa.png' } as File,
    paymentMethods: []
  })

  const [products, setProducts] = useState<Product[]>([])
  const [productsPagination, setProductsPagination] = useState({
    currentPage: 1,
    perPage: 10,
    count: 0
  })
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [favorite, setFavorite] = useState(false)

  const [productsOrder, setProductsOrder] = useState<ProductsOrder>('')
  const [starsMinFilter, setStarsMinFilter] = useState(0)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [search, setSearch] = useState('')

  const widthScreen = useMedia({ minWidth: '640px' })

  const [categories, setCategories] = useState([
    {
      id: '',
      name: 'Todas as categorias'
    }
  ])

  const validProductsOrder = [
    {
      value: 'most_request',
      label: 'Mais pedidos'
    },
    {
      value: 'most_recent',
      label: 'Mais recente'
    },
    {
      value: 'lowest_price',
      label: 'Menor Preço'
    },
    {
      value: 'highest_price',
      label: 'Maior Preço'
    }
  ] as { value: ProductsOrder; label: string }[]

  const starsFilter = [4]

  const handleFavorite = async () => {
    try {
      setFavorite(!favorite)
      await storeRepository.toggleFavorite(store.formatedName)
    } catch (error: any) {
      if (error.response.status === 401) {
        toast({ message: 'Faça login para favorita esta loja', type: 'error' })
      }
    }
  }

  const updateStarsMinFilter = (newValue: number) => {
    setStarsMinFilter(starsMinFilter === newValue ? 0 : newValue)
  }

  const updateCategoryFilter = (newValue: string) => {
    setCategoryFilter(categoryFilter === newValue ? '' : newValue)
  }

  const updateProductsOrder = (newValue: ProductsOrder) => {
    setProductsOrder(productsOrder === newValue ? '' : newValue)
  }

  const scheduleDays: ScheduleDays[] = [
    'dom',
    'seg',
    'ter',
    'qua',
    'qui',
    'sex',
    'sab'
  ]

  const getWeekDay = (date: Date = new Date()): ScheduleDays =>
    scheduleDays[date.getDay()]

  const getHourInMinutes = (date: Date) =>
    date.getHours() * 60 + date.getMinutes()

  const hourToMinutes = (hour: string) => {
    const [hours, minutes] = hour.split(':')
    return Number(hours) * 60 + Number(minutes)
  }

  const isOpened = () => {
    const date = new Date()

    const weekDay = getWeekDay(date)
    const currentHourInMinutes = getHourInMinutes(date)

    const scheduleDay = store.schedules[weekDay] // ['10:00', '18:00']
    if (!scheduleDay) return false
    const openInMinutes = hourToMinutes(scheduleDay[0])
    const closeInMinutes = hourToMinutes(scheduleDay[1])

    return (
      currentHourInMinutes >= openInMinutes &&
      currentHourInMinutes <= closeInMinutes
    )
  }

  const loadProducts = async (storeId: string) => {
    try {
      setLoadingProducts(true)
      const pagination = await productsRepository.findAllByStoreId(storeId, {
        page: productsPagination.currentPage,
        perPage: productsPagination.perPage,
        categoryId: categoryFilter,
        starsMin: starsMinFilter,
        productsOrder,
        search
      })
      setProducts(pagination.data)
      setProductsPagination({
        currentPage: pagination.currentPage,
        perPage: 10,
        count: pagination.count
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingProducts(false)
    }
  }

  const loadData = async () => {
    try {
      const data = await storeRepository.findByName(name)
      setStore(data)
      setFavorite(!!data.isFavorite)
      return data.id
    } catch (e) {
      console.error(e)
      window.location.href = window.location.href.replace(`${name}.`, '')
    }
  }

  useEffect(() => {
    loadData().then((storeId) => {
      if (storeId) {
        productsRepository.getCategories(storeId).then((newCategories) =>
          setCategories([
            {
              id: '',
              name: 'Todas as categorias'
            },
            ...newCategories
          ])
        )
        loadProducts(storeId)
      }
    })
  }, [])

  useEffect(() => {
    if (store.id) {
      loadProducts(store.id)
    }
  }, [
    productsPagination.currentPage,
    categoryFilter,
    productsOrder,
    starsMinFilter,
    search
  ])

  return (
    <Wrapper>
      <Head>
        <title>Loja {store.name}</title>
      </Head>

      <Container>
        <Header />

        {!widthScreen && (
          <div style={{ margin: 'var(--spacing-xs) 0' }}>
            <Input
              icon={<VscSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Pesquisar na loja'
            />
          </div>
        )}

        <BannerStore
          isOpen={isOpened()}
          images={[store.background?.url || '/images/capa-small.png']}
        />

        <StoreInfo>
          {widthScreen && (
            <Input
              icon={<VscSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Pesquisar na loja'
            />
          )}

          <Row
            style={{
              width: '100%',
              flexWrap: 'wrap',
              gap: widthScreen ? '20px' : '',
              justifyContent: 'center'
            }}
          >
            <Card
              style={
                !widthScreen
                  ? { background: 'transparent', boxShadow: 'none' }
                  : undefined
              }
            >
              <Row style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                <StoreAvatar
                  width={138}
                  height={138}
                  src={store.avatar?.url || '/images/icon.png'}
                  alt='Foto da loja'
                />

                <Column>
                  <Row>
                    <h1>{store.name}</h1>
                    <IconButton onClick={handleFavorite}>
                      {favorite ? (
                        <AiFillHeart size={32} color='var(--color-primary)' />
                      ) : (
                        <AiOutlineHeart
                          size={32}
                          color='var(--color-primary)'
                        />
                      )}
                    </IconButton>
                  </Row>

                  <Row>
                    <ReactStars
                      edit={false}
                      count={5}
                      value={store.avgStars}
                      size={32}
                      color2='#ffd700'
                    />
                    {!widthScreen && (
                      <>
                        <span style={{ margin: 'auto 0' }}>
                          {store.sumFeedbacks}
                        </span>
                      </>
                    )}
                  </Row>
                </Column>
              </Row>

              <Description>{store.description}</Description>
            </Card>

            {widthScreen && (
              <>
                <Card>
                  <h1>Detalhes</h1>

                  <Line>
                    <img
                      width={24}
                      height={24}
                      src='/images/caixa.svg'
                      alt='icone de caixa'
                    />
                    <span>Quantidade de produtos:</span>
                    <span>{products.length}</span>
                  </Line>

                  <Line>
                    <img
                      width={24}
                      height={24}
                      src='/images/caixa.svg'
                      alt='icone de bolsa'
                    />

                    <span>Quantidade de vendas:</span>
                    <span>{store.sumOrders}</span>
                  </Line>

                  <Line>
                    <img
                      width={24}
                      height={24}
                      src='/images/loja.svg'
                      alt='icone de loja'
                    />
                    <span>Loja cadastrada no site em:</span>
                    <span>{new Date(store.createdAt).getFullYear()}</span>
                  </Line>

                  <Line>
                    <img
                      width={24}
                      height={24}
                      src='/images/estrela.svg'
                      alt='icone de estrela'
                    />
                    <span>Quantidade de avaliações:</span>
                    <span>{store.sumFeedbacks}</span>
                  </Line>
                </Card>

                <Card>
                  <h1>{isOpened() ? 'Aberto' : 'Fechado'} agora</h1>

                  <Row>
                    {store.schedules[getWeekDay()] ? (
                      <div>
                        <Text>{getWeekDay()}</Text>
                        <Text>
                          {store.schedules[getWeekDay()][0]} às{' '}
                          {store.schedules[getWeekDay()][1]}
                        </Text>
                      </div>
                    ) : null}
                  </Row>
                </Card>
              </>
            )}
          </Row>
        </StoreInfo>

        {widthScreen && (
          <>
            <Row style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <Card style={{ height: '96px' }}>
                <Row>
                  <Text style={{ fontSize: '18px' }}>Ordenar por:</Text>
                  {validProductsOrder.map(({ value, label }, i) => (
                    <>
                      {i !== 0 && <span key={i}>|</span>}

                      <Text
                        key={i + 1}
                        style={{ fontSize: '18px' }}
                        pointer
                        active={value === productsOrder}
                        onClick={() => updateProductsOrder(value)}
                      >
                        {label}
                      </Text>
                    </>
                  ))}
                </Row>
              </Card>

              <Card style={{ height: '96px' }}>
                {starsFilter.map((star, i) => (
                  <Checkbox
                    key={i}
                    confirm={starsMinFilter === star}
                    toggleConfirm={() => updateStarsMinFilter(star)}
                  >
                    <Text onClick={() => updateStarsMinFilter(star)}>
                      <img
                        src='/images/Star.svg'
                        alt='icone estrela'
                        style={{ margin: '0 5px -5px 0' }}
                      />
                      {star.toFixed(1)} ou mais
                    </Text>
                  </Checkbox>
                ))}
              </Card>

              <Card style={{ height: '96px' }}>
                <Row style={{ padding: '10px 4px' }}>
                  <IconButton onClick={() => setViewMode('grid')}>
                    {viewMode === 'grid' ? (
                      <img src='/images/quadro.svg' alt='icone de quadro' />
                    ) : (
                      <img src='/images/quadroOff.svg' alt='icone de lista' />
                    )}
                  </IconButton>

                  <IconButton onClick={() => setViewMode('list')}>
                    {viewMode === 'list' ? (
                      <img src='/images/stackOn.svg' alt='icone de lista' />
                    ) : (
                      <img src='/images/stack.svg' alt='icone de lista' />
                    )}
                  </IconButton>
                </Row>
              </Card>
            </Row>

            <Row style={{ padding: '0 50px' }}>
              <Card noPadding={true}>
                <h2>Categorias da loja:</h2>
                {categories.map(({ id, name }, i) => (
                  <Text
                    key={i}
                    style={{
                      fontSize: '18px',
                      margin: '0 auto 18px 20px'
                    }}
                    pointer
                    active={id === categoryFilter}
                    onClick={() => updateCategoryFilter(id)}
                  >
                    {name}
                  </Text>
                ))}
              </Card>

              {widthScreen ? (
                loadingProducts ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60vw',
                      height: '40vh'
                    }}
                  >
                    <PulseLoader size={32} color='var(--color-primary)' />
                  </div>
                ) : products.length ? (
                  <>
                    <Row
                      style={{
                        display: viewMode === 'grid' ? '' : 'none',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {products.map((product) => (
                        <ProductCard
                          product={product}
                          key={product.id}
                          onClick={() => Router.push(product.id)}
                        />
                      ))}
                    </Row>

                    <Row
                      style={{
                        display: viewMode === 'list' ? '' : 'none',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {products.map((product) => (
                        <ProductCardHorizon
                          product={product}
                          key={product.id}
                          onClick={() => Router.push(product.id)}
                        />
                      ))}
                    </Row>
                  </>
                ) : (
                  <Text>Nenhum produto encontrado.</Text>
                )
              ) : null}
            </Row>

            {products.length ? (
              <div style={{ margin: '2rem auto' }}>
                <Pagination
                  onPageChange={() =>
                    setProductsPagination({
                      ...productsPagination,
                      currentPage: productsPagination.currentPage + 1
                    })
                  }
                  currentPage={productsPagination.currentPage}
                  totalCountOfRegisters={productsPagination.count}
                  registersPerPage={productsPagination.perPage}
                />
              </div>
            ) : null}
          </>
        )}

        {!widthScreen ? (
          loadingProducts ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '150px'
              }}
            >
              <PulseLoader size={18} color='var(--color-primary)' />
            </div>
          ) : products.length ? (
            <>
              <Row
                style={{
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  margin: '0 8px 18px 8px'
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    onClick={() => Router.push(product.id)}
                  />
                ))}
              </Row>

              <div style={{ margin: '2rem auto' }}>
                <Pagination
                  onPageChange={() =>
                    setProductsPagination({
                      ...productsPagination,
                      currentPage: productsPagination.currentPage + 1
                    })
                  }
                  currentPage={productsPagination.currentPage}
                  totalCountOfRegisters={productsPagination.count}
                  registersPerPage={productsPagination.perPage}
                />
              </div>
            </>
          ) : (
            <Text>Nenhum produto encontrado.</Text>
          )
        ) : null}

        <FooterContact
          title={store.name}
          cnpj={store.CNPJ}
          address={store.formattedAddress}
          phone={store.phone}
          whatsappLink={store.whatsappLink}
          instagramLink={store.instagramLink}
          facebookLink={store.facebookLink}
          cep={store.zipcode}
        />
      </Container>

      <CartButton />
    </Wrapper>
  )
}

export default StorePage
