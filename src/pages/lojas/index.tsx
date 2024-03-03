import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/molecules/Header'
import { Input } from '../../components/molecules/SearchInput'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaList } from 'react-icons/fa'
import { IoGridSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

import { CarouselStore } from '../../components/atoms/CarouselStore'
import { CardProductSearch } from '../../components/atoms/CardProductSearch'
import styled from 'styled-components'
import StoreRepository from '@/repositories/StoreRepository'

interface ISearchProps {
  productsFound: [
    {
      avgStars: number
      categories: [
        {
          enabled: boolean
          id: string
          name: string
          storeProductsId: string
          type: string
        }
      ]
      description: string
      discount: number
      files: [
        {
          filename: string
          id: string
          name: string
          url: string
        }
      ]
      id: string
      inventory: number
      lastSold: number | null
      parcelAmount: number
      price: number
      storeId: string
      sumFeedbacks: number
      sumOrders: number
      sumStars: number
      tags: string | null
      title: string
      name: string
    }
  ]
  storesFound: [
    {
      CNPJ: string
      addressNumber: number
      avatar: { id: string; name: string; filename: string; url: string }
      avgStars: number
      background: {
        id: string
        name: string
        filename: string
        url: string
      }
      categories: [
        {
          enabled: boolean
          id: string
          name: string
          storeProductsId: string | null
          type: string
        }
      ]
      city: string
      deliveryFee: number
      description: string
      enabled: boolean
      facebookLink: string
      formatedName: string
      id: string
      instagramLink: string | null
      likes: number
      name: string
      neighborhood: string
      phone: string
      productCategories: [
        {
          enabled: boolean
          id: string
          name: string
          storeProductsId: string
          type: string
        }
      ]
      schedules: {
        dom: []
        qua: []
        qui: []
        sab: []
        seg: []
        sex: []
        ter: []
      }
      state: string
      street: string
      sumFeedbacks: number
      sumOrders: number
      sumStars: number
      whatsappLink: string | null
      zipcode: string
    }
  ]
}

const Result = () => {
  const [search, setSearch] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [searchData, setSearchData] = useState<ISearchProps>({} as ISearchProps)
  const router = useRouter()

  const storeRepository = new StoreRepository()

  useEffect(() => {
    setSearch(router.query.search as string)
    getData()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearchTitle(search)
    getData()
    setSearch('')
  }

  async function getData() {
    const data = await storeRepository.findByParams(search)
    console.log(data)

    setSearchData(data)
  }

  return (
    <>
      <Head>
        <title>Search | Boa de Venda</title>
      </Head>
      <Header />
      <Container>
        <form className='wrap-search-content' onSubmit={handleSubmit}>
          <Input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Pesquise por produto, serviço, estabelecimento ou cidade'
            icon={<AiOutlineSearch size={25} />}
            search
          />
        </form>
        <div className='wrap-result-text'>
          <h3>{searchTitle && `Resultados para '${searchTitle}'`}</h3>
        </div>
        <WrapMainContent>
          <LeftSideContainer>
            <h3>Ordenar por:</h3>
            <div className='wrap-order'>
              <button>Menor resultado</button>
              <button>Mais pedidos</button>
              <button>Mais recente</button>
              <button>
                Preço <img src='/images/updown.svg' alt='updown' />
              </button>
            </div>

            <h3>Filtrar por:</h3>
            <div className='wrap-filter'>
              <div className='wrap-input'>
                <label>
                  <input type='checkbox' />
                  <span>
                    <img src='/images/Star.svg' alt='estrela' /> 4.0 ou mais
                  </span>
                </label>
              </div>

              <div className='wrap-input'>
                <label>
                  <input type='checkbox' />
                  <span>Desconto</span>
                </label>
              </div>
            </div>

            <h3>Listar como:</h3>
            <div className='wrap-order-icons'>
              <IoGridSharp />
              <FaList />
            </div>

            <button className='link'>Mostrar somente lojas</button>
          </LeftSideContainer>
          <MainContent>
            {searchData?.storesFound ? (
              <>
                <h3>Lojas</h3>
                <div className='wrap-cards-store'>
                  <CarouselStore stores={searchData.storesFound} />
                </div>
              </>
            ) : null}

            {searchData?.productsFound && <h3>Produtos</h3>}
            <div className='wrap-cards-products'>
              {searchData?.productsFound &&
                searchData?.productsFound?.map((product, i) => (
                  <>
                    <CardProductSearch
                      description={product?.title}
                      price={product.price}
                      stars={product.avgStars}
                      imgUrl={product.files[0]?.url}
                      key={i}
                      storeName={product?.name}
                    />
                  </>
                ))}
            </div>
          </MainContent>
        </WrapMainContent>
      </Container>
    </>
  )
}

export const Container = styled.body`
  background: var(--gray-100);
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
  box-sizing: border-box;

  button {
    border: none;
    background-color: transparent;
    font-size: 24px;
    font-weight: 400;
    text-align: left;
  }

  .wrap-search-content,
  .wrap-result-text {
    max-width: 1000px;
    margin: 0 auto;
  }
  .wrap-search-content {
    padding: 65px 20px 50px 20px;
    div {
      min-width: 100%;
      height: 60px;
    }
  }

  .wrap-result-text {
    padding: 0 20px 60px 20px;

    h3 {
      font-size: 32px;
      font-weight: 500;
    }
  }
`

export const WrapMainContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  padding: 0 20px;
`

export const LeftSideContainer = styled.div`
  padding: 0 40px;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    color: var(--color-secondary-darker);
  }

  .wrap-order,
  .wrap-filter {
    padding: 25px;
    width: 269px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
    border-radius: 30px;
  }

  .wrap-order-icons {
    width: 200px;
    padding: 25px;
    height: 73px;
    display: flex;
    background-color: var(--white);
    justify-content: space-around;
    margin-bottom: 30px;
    border-radius: 30px;

    svg {
      font-size: 2rem;
    }
  }

  .wrap-order {
    height: 286px;
    max-width: 270px;
    padding: 23px 32px;

    a {
      text-decoration: none;
      font-size: 24px;
      font-weight: 400;
    }

    button + button::before {
      content: '';
      display: block;
      width: 100%;
      background: linear-gradient(
        90deg,
        rgba(108, 112, 121, 0),
        rgba(108, 112, 121, 0.26),
        rgba(108, 112, 121, 0)
      );
      height: 1px;
      margin-bottom: 15px;
    }
  }

  .wrap-filter {
    height: 150px;
    padding: 23px 32px;
    font-size: 24px;
    font-weight: 400;
    position: relative;

    div + div::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin-bottom: 15px;
      background: linear-gradient(
        90deg,
        rgba(108, 112, 121, 0),
        rgba(108, 112, 121, 0.26),
        rgba(108, 112, 121, 0)
      );
    }

    .wrap-input {
      position: relative;

      label span {
        margin-left: 20px;
      }

      label::after {
        content: '';
        width: 16px;
        height: 16px;
        border: 1px solid black;
        display: block;
        border-radius: 4px;
        position: absolute;
        left: -10px;
        bottom: 9px;
      }

      input:checked:before {
        content: '';
        width: 14px;
        height: 14px;
        background-color: black;
        display: block;
        border-radius: 4px;
        position: absolute;
        left: -8px;
        bottom: 11px;
      }

      input {
        width: 0px;
        height: 0px;
      }
    }
  }
`

export const MainContent = styled.div`
  h3 {
    font-size: 32px;
    font-weight: 500;
  }
`

export default Result
