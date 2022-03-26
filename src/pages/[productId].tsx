import React, { useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Header from '@/components/molecules/Header'
import CatalogTabs from '@/components/molecules/CatalogTabs'
import CardFeedback from '@/components/molecules/CardFeedback'
import Modal from '@/components/molecules/Modal'
import Checkbox from '@/components/atoms/Checkbox'
import FooterContact from '@/components/organisms/FooterContact'

import {
  AiOutlineUp,
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlineArrowLeft
} from 'react-icons/ai'
import { VscSearch } from 'react-icons/vsc'
import { BsShareFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { IoIosClose } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import ReactStars from 'react-stars'

import getNumberArray from '@/utils/getNumberArray'
import formatToBrl from '@/utils/formatToBrl'
import getProductAndStoreFromInitialProps from '@/utils/getProductAndStoreFromInitialProps'
import useMedia from 'use-media'

import { useCart } from '@/contexts/CartContext'

import useActiveModal from '@/hooks/useModalActive'

import {
  Wrapper,
  Container,
  CardProduct,
  CardDesc,
  CardDescMobile,
  FilterCard,
  Installments,
  Divisor,
  MenuBottom
} from '@/styles/pages/product'

import type { NextPage, NextPageContext } from 'next'
import type { File, Store, Product } from '@/@types/entities'

export interface ServerProps {
  store: Store | null
  product: Product | null
}

const ProductPage: NextPage<ServerProps> = ({ store, product }) => {
  const { loading, addProduct } = useCart()

  const widthScreen = useMedia({ minWidth: '640px' })

  const [showInstallment, setShowInstallment] = useState(false)

  const [descModalVisible, toggleDescModalVisible] = useActiveModal(false)
  const [avalModalVisible, toggleAvalModalVisible] = useActiveModal(false)

  const handleAddToCart = () => {
    if (product) {
      addProduct(product)
    }

    toast({ message: 'Produto adicionado ao carrinho!', type: 'success' })
  }

  const handleDirectBuy = async () => {
    await Router.push('carrinho/continuar')
  }

  const [toggleState, setToggleState] = useState(1)

  const [actualFile, setActualFile] = useState<File | null | undefined>(null)
  const [actualFileDesc, setActualFileDesc] = useState<File | null | undefined>(
    null
  )

  const getPosition = (id?: string) => {
    const item = product?.files.findIndex((file) => file.id === id) || -1

    return item
  }
  const handleUpFile = () => {
    const index = getPosition(actualFile?.id)
    if (index > 0) {
      setActualFile(product?.files[index - 1])
    }
  }

  const handleDownFile = () => {
    const length = product?.files.length || 0
    const index = getPosition(actualFile?.id)
    if (index < length - 1) {
      setActualFile(product?.files[index + 1])
    }
  }

  const handleUpFileDesc = () => {
    const index = getPosition(actualFileDesc?.id)
    if (index > 0) {
      setActualFileDesc(product?.files[index - 1])
    }
  }

  const handleDownFileDesc = () => {
    const length = product?.files.length || 0
    const index = getPosition(actualFileDesc?.id)
    if (index < length - 1) {
      setActualFileDesc(product?.files[index + 1])
    }
  }

  return (
    <Wrapper>
      <Head>
        <title>Produto | Boa de Venda</title>
      </Head>
      <Header />
      {loading ? (
        <div
          style={{
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
        >
          <PulseLoader size={10} />
        </div>
      ) : (
        <Container>
          <header className='header'>
            <Input icon={<VscSearch />} placeholder='Pesquisar na loja' />
          </header>
          <CardProduct>
            <div className='image-container'>
              {!widthScreen && (
                <div className='actions'>
                  <div
                    className='btn'
                    style={{ marginTop: 'var(--spacing-xxxs)' }}
                  >
                    <Button style={{ width: 40, height: 40, margin: 'auto' }}>
                      <AiOutlineLeft size={20} />
                    </Button>
                  </div>
                </div>
              )}
              <div className='list-images'>
                <Button style={{ marginBottom: '1rem' }} onClick={handleUpFile}>
                  {' '}
                  <AiOutlineUp size={20} color='var(--gray-600)' />
                </Button>
                {product?.files.map((file) => {
                  return (
                    <img
                      key={file.url}
                      onClick={() => setActualFile(file)}
                      src={file?.url}
                      alt={file?.filename}
                    />
                  )
                })}
                <Button style={{ marginTop: '1rem' }} onClick={handleDownFile}>
                  {' '}
                  <AiOutlineDown size={20} color='var(--gray-600)' />
                </Button>
              </div>
              <img
                src={actualFile?.url || product?.files[0].url}
                alt='Foto do produto'
                className='product-image'
              />
              {!widthScreen && (
                <div className='actions'>
                  <div className='top'>
                    <div className='share'>
                      <Button style={{ width: 40, height: 40 }}>
                        <BsShareFill size={25} />
                      </Button>
                    </div>
                  </div>
                  <div className='mid'>
                    <div className='btn'>
                      <Button style={{ width: 40, height: 40 }}>
                        <AiOutlineRight size={20} />
                      </Button>
                    </div>
                  </div>
                  <div className='bot'>
                    <div className='progress'>
                      <p>1 de 4</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='description-container'>
              <h1 className='title'>{product?.title}</h1>
              <div className='desc'>
                <ReactStars count={1} size={23} value={1} edit={false} />
                <p>{product?.avgStars}</p>
                <p className='avaliations'>
                  {product?.sumFeedbacks} avaliações
                </p>
                <p className='separate'>|</p>
                <p>{product?.sumOrders} pedidos</p>
              </div>

              <div className='price-container'>
                {product?.priceWithDiscount ? (
                  <>
                    <div className='discount'>
                      <h4>De: {formatToBrl(product?.price)}</h4>
                      <div>-{product?.discount}%</div>
                    </div>
                    <div className='price'>
                      <div className='parcel'>{product?.parcelAmount}x</div>
                      <div className='values'>
                        <h1>{formatToBrl(product?.priceWithDiscount)}</h1>
                        <p
                          style={widthScreen ? { display: 'none' } : undefined}
                        >
                          {product?.parcelAmount}x de{' '}
                          <strong>
                            {formatToBrl(product?.priceWithDiscount)}
                          </strong>
                        </p>
                      </div>
                      {!widthScreen && <Button>Comprar agora</Button>}
                    </div>
                    <p style={!widthScreen ? { display: 'none' } : undefined}>
                      Em até {product?.parcelAmount}x sem juros ou{' '}
                      <strong>{formatToBrl(product?.priceWithDiscount)}</strong>{' '}
                      à vista
                    </p>
                  </>
                ) : (
                  <>
                    <div className='price'>
                      <div className='values'>
                        <h1>
                          {formatToBrl(product?.price)} <small>à prazo</small>
                        </h1>
                        <p>Ou {formatToBrl(product?.price)} à vista</p>
                      </div>
                    </div>
                  </>
                )}

                <div className='installments'>
                  {product?.parcelAmount > 1 && (
                    <a onClick={() => setShowInstallment(!showInstallment)}>
                      Ver parcelas
                    </a>
                  )}

                  {showInstallment && (
                    <Installments>
                      <div className='head'>
                        <div className=''></div>

                        <h1 className='title'>Formas de parcelamento</h1>

                        <IoIosClose
                          onClick={() => setShowInstallment(!showInstallment)}
                          size={30}
                          color={'#363F4E'}
                        />
                      </div>

                      <img src='/images/cards.png' alt='bandeiras aceitas' />

                      <div className='list'>
                        <p className='list1'>
                          <strong>
                            {formatToBrl(
                              product?.priceWithDiscount || product?.price
                            )}{' '}
                            à vista
                          </strong>{' '}
                          <br />
                          {getNumberArray({
                            size:
                              product?.parcelAmount > 6
                                ? 6
                                : product?.parcelAmount,
                            startAt: 2
                          }).map((month) => {
                            return (
                              <>
                                {month}x de{' '}
                                {formatToBrl(
                                  (product?.priceWithDiscount ||
                                    product?.price) / month
                                )}{' '}
                                sem juros.
                                <br />
                              </>
                            )
                          })}
                        </p>

                        {product?.parcelAmount > 6 && (
                          <p className='list2'>
                            {getNumberArray({
                              size: product?.parcelAmount - 6,
                              startAt: 7
                            }).map((month) => {
                              return (
                                <>
                                  {month}x de{' '}
                                  {formatToBrl(
                                    (product?.priceWithDiscount ||
                                      product?.price) / month
                                  )}{' '}
                                  sem juros.
                                  <br />
                                </>
                              )
                            })}
                          </p>
                        )}
                      </div>
                    </Installments>
                  )}
                </div>
              </div>
              <div className='button-container'>
                {!loading && (
                  <>
                    <Button onClick={handleDirectBuy}>Comprar agora</Button>
                    <Button onClick={handleAddToCart}>
                      Adicionar ao carrinho
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardProduct>

          {widthScreen ? (
            <CardDesc>
              <CatalogTabs
                tab1='Descrição'
                tab2='Avaliação'
                setToggleState={setToggleState}
                toggleState={toggleState}
                content1={
                  <>
                    <div className='description-container'>
                      <div className='left-container'>
                        <div className='image-container'>
                          <div className='list-images'>
                            <Button
                              style={{ marginBottom: '1rem' }}
                              onClick={handleUpFileDesc}
                            >
                              {' '}
                              <AiOutlineUp size={20} color='var(--gray-600)' />
                            </Button>
                            {product?.files.map((file) => {
                              return (
                                <img
                                  key={file.url}
                                  onClick={() => setActualFileDesc(file)}
                                  src={file.url}
                                  alt={file.filename}
                                />
                              )
                            })}
                            <Button
                              style={{ marginTop: '1rem' }}
                              onClick={handleDownFileDesc}
                            >
                              {' '}
                              <AiOutlineDown
                                size={20}
                                color='var(--gray-600)'
                              />
                            </Button>
                          </div>
                          <img
                            src={actualFileDesc?.url || product?.files[0].url}
                            alt='Foto do produto'
                          />
                        </div>
                      </div>
                      <div className='right-container'>
                        <h1>{product?.title}</h1>

                        <p>{product?.description || ''}</p>
                      </div>
                    </div>
                  </>
                }
                content2={
                  <>
                    <div className='rated-container'>
                      <header>
                        <h1 className='rate'>Avaliações de Clientes</h1>
                        <div>
                          <h1>{product?.avgStars}</h1>
                          <ReactStars
                            count={5}
                            size={50}
                            value={5}
                            edit={false}
                          />
                        </div>
                        <p>({product?.sumFeedbacks} avaliações)</p>
                      </header>
                      <div className='container'>
                        <div className='left-container'>
                          {[1, 2, 3].map((number) => {
                            return (
                              <CardFeedback
                                key={number}
                                name='Mikael'
                                quantStar={5}
                                text='Produto de excelente qualidade, comprem muito mais e mais muito mais, não deixe de comprar!'
                                time='25/03/2022'
                                width={850}
                              />
                            )
                          })}
                        </div>
                        <div className='right-container'>
                          <FilterCard>
                            <div className='filter'>
                              <h1>Ordenar</h1>
                              <h4>Recente</h4>
                              <h4>Melhor avaliação</h4>
                              <h4>Pior avaliação</h4>
                              <h1>Filtros</h1>
                              <div className='stars-container'>
                                <div style={{ marginBottom: 10 }}>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <p style={{ margin: 0 }}>
                                      Somente com foto
                                    </p>
                                  </Checkbox>
                                </div>
                                <div>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <ReactStars
                                      color1='#e9e9e9'
                                      count={5}
                                      size={32}
                                      value={5}
                                      edit={false}
                                    />
                                  </Checkbox>
                                  <div className='percentil'>
                                    <p>85%</p>
                                  </div>
                                </div>
                                <div>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <ReactStars
                                      color1='#e9e9e9'
                                      count={5}
                                      size={32}
                                      value={4}
                                      edit={false}
                                    />
                                  </Checkbox>
                                  <div className='percentil'>
                                    <p>10%</p>
                                  </div>
                                </div>
                                <div>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <ReactStars
                                      color1='#e9e9e9'
                                      count={5}
                                      size={32}
                                      value={3}
                                      edit={false}
                                    />
                                  </Checkbox>
                                  <div className='percentil'>
                                    <p>3%</p>
                                  </div>
                                </div>
                                <div>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <ReactStars
                                      color1='#e9e9e9'
                                      count={5}
                                      size={32}
                                      value={2}
                                      edit={false}
                                    />
                                  </Checkbox>
                                  <div className='percentil'>
                                    <p>0%</p>
                                  </div>
                                </div>
                                <div>
                                  <Checkbox
                                    confirm={false}
                                    toggleConfirm={() => undefined}
                                  >
                                    <ReactStars
                                      color1='#e9e9e9'
                                      count={5}
                                      size={32}
                                      value={1}
                                      edit={false}
                                    />
                                  </Checkbox>
                                  <div className='percentil'>
                                    <p>2%</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </FilterCard>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </CardDesc>
          ) : (
            <CardDescMobile>
              <div className='description-container'>
                <div className='title' onClick={toggleDescModalVisible}>
                  <h2>Descrição</h2>
                  <AiOutlineRight size={20} />
                </div>
                <div className='description'>
                  <h4>{product?.title}</h4>
                  <p>{product?.description || ''}</p>
                </div>
              </div>
              <div className='rated-container'>
                <div className='title' onClick={toggleAvalModalVisible}>
                  <h2>Avaliações</h2>
                  <AiOutlineRight size={20} />
                </div>
                <Divisor />
                <div className='star-container'>
                  <div className='left-container'>
                    <div className='star'>
                      <h1>{product?.avgStars}</h1>
                      <ReactStars count={1} size={50} value={1} edit={false} />
                    </div>
                    <p>{product?.sumFeedbacks} avaliações</p>
                  </div>
                  <div className='right-container'>
                    <div className='stars-container'>
                      <div>
                        <ReactStars
                          color1='#e9e9e9'
                          count={5}
                          size={24}
                          value={5}
                          edit={false}
                        />
                        <p>90%</p>
                      </div>
                      <div>
                        <ReactStars
                          color1='#e9e9e9'
                          count={5}
                          size={24}
                          value={4}
                          edit={false}
                        />
                        <p>4%</p>
                      </div>
                      <div>
                        <ReactStars
                          color1='#e9e9e9'
                          count={5}
                          size={24}
                          value={3}
                          edit={false}
                        />
                        <p>2%</p>
                      </div>
                      <div>
                        <ReactStars
                          color1='#e9e9e9'
                          count={5}
                          size={24}
                          value={2}
                          edit={false}
                        />
                        <p>3%</p>
                      </div>
                      <div>
                        <ReactStars
                          color1='#e9e9e9'
                          count={5}
                          size={24}
                          value={1}
                          edit={false}
                        />
                        <p>1%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardDescMobile>
          )}

          {/* <ProductWrapper>
            <h1 style={{ height: '40px' }}>Produtos relacionados</h1>
            <div className='carousel-container'>
              <div className='carousel-item'>
                <Carousel data={fakeProducts as any} isProduct />
              </div>
            </div>
          </ProductWrapper> */}

          {widthScreen && store && (
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
          )}
        </Container>
      )}
      <Modal
        buttons={false}
        setModalOpen={toggleDescModalVisible}
        modalVisible={descModalVisible}
        under
      >
        <div className='modalDescription'>
          <div className='title'>
            <AiOutlineArrowLeft
              size={25}
              className='arrow'
              onClick={toggleDescModalVisible}
            />
            <h2>Descrição</h2>
          </div>
          <Divisor />
          <h2>{product?.title}</h2>
          <p>{product?.description || ''}</p>
        </div>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleAvalModalVisible}
        modalVisible={avalModalVisible}
        under
      >
        <div className='modalAvaliations'>
          <div className='title'>
            <AiOutlineArrowLeft
              size={25}
              className='arrow'
              onClick={toggleAvalModalVisible}
            />
            <h2>Avaliações</h2>
          </div>
          <Divisor />
          <h2>{product?.title}</h2>
          <div className='star-container'>
            <div className='top-container'>
              <h1>{product?.avgStars.toFixed(1)}</h1>
              <div className='star'>
                <ReactStars count={5} size={32} value={5} edit={false} />
                <p>{product?.sumFeedbacks} avaliações</p>
              </div>
            </div>
            <div className='bot-container'>
              <div className='stars-container'>
                <div>
                  <ReactStars
                    color1='#e9e9e9'
                    count={5}
                    size={40}
                    value={5}
                    edit={false}
                  />
                  <p>90%</p>
                </div>
                <div>
                  <ReactStars
                    color1='#e9e9e9'
                    count={5}
                    size={40}
                    value={4}
                    edit={false}
                  />
                  <p>4%</p>
                </div>
                <div>
                  <ReactStars
                    color1='#e9e9e9'
                    count={5}
                    size={40}
                    value={3}
                    edit={false}
                  />
                  <p>2%</p>
                </div>
                <div>
                  <ReactStars
                    color1='#e9e9e9'
                    count={5}
                    size={40}
                    value={2}
                    edit={false}
                  />
                  <p>3%</p>
                </div>
                <div>
                  <ReactStars
                    color1='#e9e9e9'
                    count={5}
                    size={40}
                    value={1}
                    edit={false}
                  />
                  <p>1%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {!widthScreen && (
        <MenuBottom>
          <div className='price'>
            <div className='values'>
              <h1>{product?.priceWithDiscount || product?.price}</h1>
              <p style={widthScreen ? { display: 'none' } : undefined}>
                {product?.parcelAmount}x de <strong>{product?.price}</strong>{' '}
                sem juros.
              </p>
            </div>
            <Button>Comprar agora</Button>
            <Button>Adicionar ao carrinho</Button>
          </div>
        </MenuBottom>
      )}
    </Wrapper>
  )
}

const redirectToHome = (ctx: NextPageContext) => {
  ctx.res?.writeHead(307, { Location: '/' })
  ctx.res?.end()
}

ProductPage.getInitialProps = async (ctx) => {
  try {
    const { product, store } = await getProductAndStoreFromInitialProps(ctx)

    if (!product || !store) {
      redirectToHome(ctx)
    }

    return { store, product }
  } catch {
    redirectToHome(ctx)
    return { store: null, product: null }
  }
}

export default ProductPage
