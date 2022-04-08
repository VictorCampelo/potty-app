import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Header from '@/components/molecules/Header'
import BannerStore from '@/components/molecules/BannerStore'
import FooterContact from '@/components/organisms/FooterContact'
import Pagination from '@/components/molecules/Pagination'
import Input from '@/components/atoms/Input'
import IconButton from '@/components/atoms/IconButton'
import ReactStars from 'react-stars'

import useMedia from 'use-media'

import ProductRepository from '@/repositories/ProductRepository'

import { Wrapper, Container } from '@/styles/GlobalStyle'
import {
  Card,
  StoreAvatar,
  Column,
  Row,
  Description,
  Line,
  Text
} from '@/styles/pages/store'

import { VscSearch } from 'react-icons/vsc'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import type { NextPage } from 'next'
import type { Product, Store } from '@/@types/entities'
import Checkbox from '@/components/atoms/Checkbox'
import ProductCard from '@/components/organisms/ProductCard'
import ProductCardHorizon from '@/components/organisms/ProductCardHorizon'
import PuffLoader from 'react-spinners/PuffLoader'
import { ScheduleDays } from '@/@types/entities'

interface Props {
  store: Store
}

const productsRepository = new ProductRepository()

const StorePage: NextPage<Props> = ({ store }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  const [favorite, setFavorite] = useState(false)

  const [filter, setFilter] = useState('')
  const [starFilter, setStarFilter] = useState('')

  const [categoryFilter, setCategoryFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const widthScreen = useMedia({ minWidth: '640px' })

  const storeCategories = [
    {
      value: 'all_categories',
      label: 'Todas as categorias'
    },
    {
      value: 'cozinha',
      label: 'Cozinha'
    },
    {
      value: 'quartos',
      label: 'Quartos'
    },
    {
      value: 'sala_de_estar',
      label: 'Sala de estar'
    },
    {
      value: 'escritorio',
      label: 'Escritório'
    }
  ]

  const storeOrders = [
    {
      value: 'best_result',
      label: 'Melhor resultado'
    },
    {
      value: 'most_request',
      label: 'Mais pedidos'
    },
    {
      value: 'most_recent',
      label: 'Mais recente'
    },
    {
      value: 'price',
      label: 'Preço'
    }
  ]

  const starsFilter = ['4.0 +']

  const handleFavorite = () => {
    setFavorite(!favorite)
  }

  const updateStarFilter = (newValue: string) => {
    setStarFilter(starFilter === newValue ? '' : newValue)
  }

  const updateCategoryFilter = (newValue: string) => {
    setCategoryFilter(categoryFilter === newValue ? '' : newValue)
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

  const getWeekDay = (date: Date): ScheduleDays => scheduleDays[date.getDay()]

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
    const openInMinutes = hourToMinutes(scheduleDay[0])
    const closeInMinutes = hourToMinutes(scheduleDay[1])

    return (
      currentHourInMinutes >= openInMinutes &&
      currentHourInMinutes <= closeInMinutes
    )
  }

  const loadProducts = async () => {
    try {
      setLoadingProducts(true)
      const products = await productsRepository.findAllByStoreId(store.id)

      setProducts(products)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>Loja {store.name}</title>
      </Head>

      <Container>
        <Header />

        <BannerStore images={[store.background.url]} />

        <Card
          style={{
            width: '90%',
            maxWidth: 'max-content'
          }}
        >
          <Input icon={<VscSearch />} placeholder='Pesquisar na loja' />

          <Row
            style={{
              width: '100%',
              flexWrap: 'wrap',
              gap: '20px',
              padding: '20px',
              justifyContent: 'center'
            }}
          >
            <Card>
              <Row>
                <StoreAvatar
                  width={138}
                  height={138}
                  src={store.avatar.url}
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

                  <ReactStars
                    edit={false}
                    count={5}
                    value={store.avgStars}
                    size={32}
                    color2='#ffd700'
                  />
                </Column>
              </Row>

              <Description>{store.description}</Description>
            </Card>

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
              <h1>{isOpened() ? 'Aberto agora' : 'Fechado agora'}</h1>

              <Row style={{ flexWrap: 'wrap' }}>
                {Object.entries(store.schedules).map(([day, schedule]) => {
                  return (
                    <div key={day}>
                      <Text>{day}</Text>
                      <Text>
                        {schedule[0]} às {schedule[1]}
                      </Text>
                    </div>
                  )
                })}
              </Row>
            </Card>
          </Row>
        </Card>

        <Row style={{ flexWrap: 'wrap' }}>
          <Card>
            <Row>
              <Text style={{ fontSize: '18px' }}>Ordenar por:</Text>
              {storeOrders.map(({ value, label }, i) => (
                <>
                  {i !== 0 && <span>|</span>}

                  <Text
                    style={{ fontSize: '18px' }}
                    pointer
                    active={value === filter}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </Text>
                </>
              ))}
            </Row>
          </Card>

          <Card>
            {starsFilter.map((star, i) => (
              <Checkbox
                key={i}
                confirm={starFilter === star}
                toggleConfirm={() => updateStarFilter(star)}
              >
                <Text onClick={() => updateStarFilter(star)}>
                  <img
                    src='/images/Star.svg'
                    alt='icone estrela'
                    style={{ margin: '0 5px -5px 0' }}
                  />
                  {star.replace('+', 'ou mais')}
                </Text>
              </Checkbox>
            ))}
          </Card>

          <Card>
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
            {storeCategories.map(({ value, label }, i) => (
              <Text
                key={i}
                style={{
                  fontSize: '18px',
                  margin: '0 auto 18px 20px'
                }}
                pointer
                active={value === categoryFilter}
                onClick={() => updateCategoryFilter(value)}
              >
                {label}
              </Text>
            ))}
          </Card>

          {loadingProducts ? (
            <PuffLoader size={28} color='#fff' />
          ) : (
            <>
              <Row
                style={{
                  display: viewMode === 'grid' ? '' : 'none',
                  flexWrap: 'wrap'
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
                  flexWrap: 'wrap'
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
          )}
        </Row>

        {widthScreen && (
          <Pagination
            onPageChange={() => undefined}
            currentPage={1}
            totalCountOfRegisters={100}
            registersPerPage={10}
          />
        )}

        <FooterContact
          title={store.name}
          cnpj={store.CNPJ}
          address={store.formattedAddress}
          phone={store.phone}
          whatsappLink={store.whatsappLink}
          instagramLink={store.instagramLink}
          facebookLink={store.facebookLink}
          lat={-23.565985644182255}
          lng={-46.65077920923577}
        />
      </Container>
    </Wrapper>
  )
}

export default StorePage
