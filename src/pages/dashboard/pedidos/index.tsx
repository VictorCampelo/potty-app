import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import Button from '@/components/atoms/Button'
import MultiSelect from '@/components/atoms/MultiSelect'
import Pagination from '@/components/molecules/Pagination'
import Modal from '@/components/molecules/Modal'
import Dashboard from '@/components/templates/Dashboard'

import useToggleState from '@/hooks/useToggleState'

import OrderRepository from '@/repositories/OrderRepository'

import {
  Container,
  Content,
  EmptyContainer,
  MainArea,
  OrderBody,
  OrderHead,
  SearchButton,
  ModalContainer,
  Product
} from '@/styles/pages/dashboard/pedidos'

import ellipsis from '@/utils/ellipsis'
import formatToBrl from '@/utils/formatToBrl'
import formatTextEachPosition from '@/utils/formatTextEachPosition'
import toast from '@/utils/toast'
import moment from 'moment'

import { AiFillEye, AiOutlineSearch } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'
import { PulseLoader } from 'react-spinners'

const orderRepository = new OrderRepository()

const RequestsPage = () => {
  const [modalVisible, toggleModalVisible] = useToggleState(false)

  const [ordersList, setOrdersList] = useState<any[]>([])
  const [order, setOrder] = useState<any>(null)
  const [productStatusOption, setProductStatusOption] = useState<any>(null)
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [totalOrders, setTotalOrders] = useState(0)
  const [page, setPage] = useState(1)

  const productStatusOptions = [
    { label: 'Recebido', value: 'Recebido' },
    { label: 'Processando', value: 'Processando' },
    { label: 'Concluído', value: 'Concluído' },
    { label: 'Cancelado', value: 'Cancelado' }
  ]

  const toggleModalOrder = (order: any) => {
    setIsLoading(true)
    getOrder(order.id)
    toggleModalVisible()
  }

  const classDefine = (situation: string) => {
    const received = situation === 'Recebido' ? 'received' : ''
    const confirm = situation === 'Concluído' ? 'confirm' : ''
    const refused = situation === 'Cancelado' ? 'refused' : ''
    const processing = situation === 'Processando' ? 'processing' : ''
    const buttonClasses = `statusButton ${received} ${confirm} ${refused} ${processing}`

    return buttonClasses
  }

  const getQuantityAndPrice = (orders: any[]) => {
    let productQtd = 0
    let price = 0

    for (const order of orders) {
      productQtd += order.productQtd
      price += order.product.price * order.productQtd
    }

    return { productQtd, price }
  }

  const getOrder = async (id: string) => {
    try {
      setIsLoading(true)
      const data = await orderRepository.find({ id })
      setOrder(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const loadData = async (page: number) => {
    try {
      const data = await orderRepository.find({ confirmed: false, page })
      setOrdersList(data.results)
      setTotalOrders(data.totalOrders)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      const situation = productStatusOption.value

      if (situation !== order.situation) {
        await orderRepository.update({
          orderId: order.id,
          situation
        })
      }

      loadData(ordersList.length * (page - 1))

      toast({ message: 'Status atualizado com sucesso!', type: 'success' })

      toggleModalVisible()
    } catch {
      toast({ message: 'Não foi possível alterar status!', type: 'error' })
    }
  }

  useEffect(() => {
    loadData(0)
  }, [])

  useEffect(() => {
    loadData(ordersList.length * (page - 1))
  }, [page])

  return (
    <>
      <Head>
        <title>Dashboard | Boa de Venda</title>
      </Head>

      <Dashboard>
        <Container>
          <Content>
            <MainArea>
              <header>
                <h1>Pedidos</h1>

                {ordersList.length ? (
                  <>
                    <SearchButton placeholder='Pesquisar pedido' />
                    <AiOutlineSearch size={24} />
                  </>
                ) : null}
              </header>

              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                    alignItems: 'center'
                  }}
                >
                  <PulseLoader />
                </div>
              ) : (
                <>
                  {!ordersList.length ? (
                    <EmptyContainer>
                      <div>
                        <img
                          src='/images/emptyCategories.svg'
                          alt='Categoria vazia'
                        />
                        <p>Ainda não há pedidos para serem exibidos</p>
                      </div>
                    </EmptyContainer>
                  ) : (
                    <>
                      <OrderHead>
                        <section style={{ flex: 0.5 }}>
                          <span>Data</span>
                        </section>

                        <section style={{ flex: 0.75 }}>
                          <span>N° do pedido</span>
                        </section>

                        <section style={{ flex: 0.35 }}>
                          <span>Valor</span>
                        </section>

                        <section className='center' style={{ flex: 0.75 }}>
                          <span>Detalhes</span>
                        </section>

                        <section style={{ flex: 0.75 }}>
                          <span>Status</span>
                        </section>
                      </OrderHead>
                      {ordersList?.map((order) => {
                        const createdAt = moment(order.createdAt).format(
                          'DD/MM/YYYY'
                        )

                        const buttonClasses = classDefine(order?.situation)

                        return (
                          <OrderBody key={order.id}>
                            <section style={{ flex: 0.5 }}>
                              <span>{createdAt}</span>
                            </section>
                            <section style={{ flex: 0.75 }}>
                              <span>
                                {formatTextEachPosition(
                                  order.orderNumber,
                                  ' ',
                                  3
                                )}
                              </span>
                            </section>
                            <section style={{ flex: 0.35 }}>
                              <span>{formatToBrl(order.amount)}</span>
                            </section>
                            <section className='center' style={{ flex: 0.75 }}>
                              <AiFillEye
                                size={24}
                                onClick={() => {
                                  setProductStatusOption({
                                    label: order.situation,
                                    value: order.situation
                                  })
                                  toggleModalOrder(order)
                                  setDate(createdAt)
                                }}
                              />
                            </section>
                            <button
                              className={buttonClasses}
                              style={{ flex: 0.75 }}
                            >
                              {order.situation}
                            </button>
                          </OrderBody>
                        )
                      })}
                    </>
                  )}
                </>
              )}
              {ordersList.length ? (
                <footer>
                  <Pagination
                    onPageChange={setPage}
                    totalCountOfRegisters={totalOrders}
                    currentPage={page}
                    registersPerPage={8}
                  />
                </footer>
              ) : null}
            </MainArea>
          </Content>

          <Modal
            modalVisible={modalVisible && !isLoading}
            setModalOpen={toggleModalVisible}
          >
            {order?.orderHistorics ? (
              <ModalContainer>
                <div className='title'>
                  <div className='information'>
                    <h2>Dados do pedido</h2>
                    <span>
                      Nº do pedido:{' '}
                      {formatTextEachPosition(order.orderNumber, '-')}
                    </span>
                  </div>
                  <div className='close'>
                    <FiX size={30} onClick={toggleModalVisible} />
                  </div>
                </div>
                <div className='content'>
                  <div className='leftContainer'>
                    {order?.orderHistorics.map((item: any) => {
                      return (
                        <Product key={item.productId}>
                          <div className='productInformation'>
                            <div className='imageArea'>
                              <img
                                src={
                                  item?.product?.files[0]?.url ||
                                  '/images/capa.png'
                                }
                                alt='Imagem do produto'
                              />
                            </div>
                            <div className='description'>
                              <div>
                                <span>
                                  {ellipsis(item.product.description, 100)}
                                </span>
                              </div>
                              <div className='price'>
                                <span>{item.productQtd}x</span>
                                <span>{formatToBrl(item.product.price)}</span>
                              </div>
                            </div>
                          </div>
                          <div className='totalPrice'>
                            <span>
                              Subtotal:{' '}
                              {formatToBrl(
                                item.productQtd * item.product.price
                              )}
                            </span>
                          </div>
                        </Product>
                      )
                    })}
                  </div>
                  <div className='rightContainer'>
                    <div className='status'>
                      <MultiSelect
                        label='Status:'
                        options={productStatusOptions}
                        selectedValue={productStatusOption}
                        setSelectedValue={setProductStatusOption}
                        placeholder='Selecione um status'
                      />
                    </div>
                    <div className='gradient' />
                    <div className='informationOrder'>
                      <div className='resume'>
                        <span className='title'>
                          <strong>Resumo do pedido</strong>
                        </span>
                        <div>
                          <span>Data:</span>
                          <span>{date}</span>
                        </div>
                        <div>
                          <span>Quantidade:</span>
                          <span>
                            {
                              getQuantityAndPrice(order?.orderHistorics)
                                .productQtd
                            }
                          </span>
                        </div>
                        <div>
                          <span>Cupons:</span>
                          <span>- {formatToBrl(0)}</span>
                        </div>
                      </div>

                      <div className='payment'>
                        <span className='title'>
                          <strong>Informações de pagamento</strong>
                        </span>
                        <div>
                          <span>Método:</span>
                          <span>{order?.orderHistorics[0].paymentMethod}</span>
                        </div>
                        <div>
                          <span>Parcelamento:</span>
                          <span>Não</span>
                        </div>
                        <div>
                          <span>
                            <strong>Total geral:</strong>
                          </span>
                          <span>
                            <strong>
                              {formatToBrl(
                                getQuantityAndPrice(order?.orderHistorics).price
                              )}
                            </strong>
                          </span>
                        </div>
                      </div>

                      <div className='localization'>
                        <span className='title'>
                          <strong>Local e contato:</strong>
                        </span>
                        <span>{order.customerAddress}</span>
                        <span className='phone'>(89) 9 8100-0000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='buttonsContainer'>
                  <Button skin='secondary' onClick={toggleModalVisible}>
                    Voltar
                  </Button>
                  <Button onClick={handleSubmit}>Salvar</Button>
                </div>
              </ModalContainer>
            ) : null}
          </Modal>
        </Container>
      </Dashboard>
    </>
  )
}

export default RequestsPage
