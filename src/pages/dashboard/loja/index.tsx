/* eslint-disable indent */
import React, { useCallback, useEffect, useState } from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Checkbox from '@/components/atoms/Checkbox'
import Textarea from '@/components/atoms/Textarea'
import MultiSelect from '@/components/atoms/MultiSelect'
import Modal from '@/components/molecules/Modal'
import ShopImage from '@/components/molecules/ShopImage'
import CardDescription from '@/components/molecules/CardDescription'
import CardInfo from '@/components/molecules/CardInfo'
import Dashboard from '@/components/templates/Dashboard'

import toast from '@/utils/toast'
import getCroppedImg from '@/utils/cropImage'
import formatToNumber from '@/utils/formatToNumber'
import { dataURLtoBlob, getFileURL } from '@/utils/file'
import Cropper from 'react-easy-crop'

import useToggleState from '@/hooks/useToggleState'

import { useAuth } from '@/contexts/AuthContext'

import StoreRepository from '@/repositories/StoreRepository'
import CategoryRepository from '@/repositories/CategoryRepository'

import { Container, ModalContainer } from '@/styles/pages/dashboard/pedidos'
import { CropModalContainer } from '@/styles/pages/dashboard/catalogo'

import { AiFillCamera } from 'react-icons/ai'
import { FiInstagram } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { BiTimeFive, BiBuildings, BiMapAlt } from 'react-icons/bi'
import { FaRoad, FaFacebook, FaBuilding } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoMdCall, IoLogoWhatsapp } from 'react-icons/io'

import type { Option } from '@/components/atoms/MultiSelect'
import type { Store, Category, PaymentMethod } from '@/@types/entities'

const storeRepository = new StoreRepository()
const categoryRepository = new CategoryRepository()

const ShopPage = () => {
  const auth = useAuth()
  const storeId = auth.user?.store?.id || ''

  const [store, setStore] = useState({} as Store)
  const [isLoading, setIsLoading] = useState(true)

  const [descModal, toggleDescModal] = useToggleState(false)
  const [timeModal, toggleTimeModal] = useToggleState(false)
  const [categoryModal, toggleCategoryModal] = useToggleState(false)
  const [locationModal, toggleLocationModal] = useToggleState(false)
  const [contactModal, toggleContactModal] = useToggleState(false)
  const [configModal, toggleConfigModal] = useToggleState(false)
  const [paymentModal, togglePaymentModal] = useToggleState(false)
  const [deliveryModal, toggleDeliveryModal] = useToggleState(false)

  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([])
  const [storeCategories, setStoreCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [previewImage, setPreviewImage] = useState('')
  const [previewBanner, setPreviewBanner] = useState('')
  const [previewIcon, setPreviewIcon] = useState('')
  const [currentImage, setCurrentImage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({})

  const [paymentsOptions, setPaymentOptions] = useState<any[]>([])

  const [currency, setCurrency] = useState('')
  const [description, setDescription] = useState('')
  const [storeDispatch, setStoreDispatch] = useState('all')
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  const { handleSubmit, register, setValue } = useForm()

  async function handleEditTimeTable(values: any) {
    try {
      const body = {
        schedules: {
          seg: [values.seg[0], values.seg[1]],
          ter: [values.ter[0], values.ter[1]],
          qua: [values.qua[0], values.qua[1]],
          qui: [values.qui[0], values.qui[1]],
          sex: [values.sex[0], values.sex[1]],
          sab: [values.sab[0], values.sab[1]],
          dom: [values.dom[0], values.dom[1]]
        }
      }

      setStore(await storeRepository.update(body))

      toast({ message: 'Horários editado(s) com sucesso!', type: 'success' })

      toggleTimeModal()
    } catch (e) {
      console.error(e)
      toast({ message: 'Erro ao editar horários', type: 'error' })
    }
  }

  async function handleEditBusinessDescription(values: any) {
    try {
      if (values.description?.length > 300) {
        return toast({
          message: 'A descrição não pode conter mais 300 caracteres!',
          type: 'error'
        })
      }

      const formData = new FormData()

      const body = {
        storeDto: {
          name: values.name,
          description: values.description
        }
      }

      formData.append('storeDto', JSON.stringify(body.storeDto))
      formData.append('avatar', previewIcon ? dataURLtoBlob(previewIcon) : '')
      formData.append(
        'background',
        previewBanner ? dataURLtoBlob(previewBanner) : ''
      )

      setStore(await storeRepository.updateUsingFormData(formData))

      toast({ message: 'Informações editada(s) com sucesso!', type: 'success' })

      toggleDescModal()
    } catch (e) {
      console.error(e)
      toast({ message: 'Erro ao editar informações', type: 'error' })
    }
  }

  async function handleEditContactInfo(values: any) {
    try {
      const formData = new FormData()

      const body = {
        storeDto: {
          phone: values.phone,
          facebookLink: values.facebook,
          instagramLink: values.instagram,
          whatsappLink: values.whatsapp
        }
      }

      formData.append('storeDto', JSON.stringify(body.storeDto))

      setStore(await storeRepository.updateUsingFormData(formData))

      toast({ message: 'Informações editada(s) com sucesso!', type: 'success' })

      toggleContactModal()
    } catch (e) {
      console.error(e)
      toast({ message: 'Erro ao editar informações', type: 'error' })
    }
  }

  async function handleEditLocalizationInfo(values: any) {
    try {
      const formData = new FormData()

      const body = {
        storeDto: {
          CNPJ: values.CNPJ,
          city: values.city,
          state: values.state,
          address: `${values.street}, n° ${values.number}, ${values.neighborhood}, CEP: ${values.cep}`
        }
      }

      formData.append('storeDto', JSON.stringify(body.storeDto))

      setStore(await storeRepository.updateUsingFormData(formData))

      toast({ message: 'Informações editada(s) com sucesso!', type: 'success' })

      toggleContactModal()
    } catch (e) {
      console.error(e)
      toast({ message: 'Erro ao editar informações', type: 'error' })
    }
  }

  async function handleSubmitDelivery() {
    try {
      const formData = new FormData()

      const body = {
        storeDto: {
          dispatch: storeDispatch,
          deliveryFee: formatToNumber(currency) || 0
        }
      }

      formData.append('storeDto', JSON.stringify(body.storeDto))

      setStore(await storeRepository.updateUsingFormData(formData))

      toast({ message: 'Informações salva(s) com sucesso!', type: 'success' })

      toggleDeliveryModal()
    } catch (error) {
      console.error(error)
      toast({
        message: 'Algo deu errado, tente novamente mais tarde!',
        type: 'error'
      })
    }
  }

  async function getPaymentOptions() {
    const data = await storeRepository.payments()
    setPaymentOptions(data)
  }

  async function handleSubmitPaymentMethods() {
    const formData = new FormData()

    const body = {
      storeDto: {
        paymentMethods: paymentMethods.map(({ methodName }) => methodName)
      }
    }

    formData.append('storeDto', JSON.stringify(body.storeDto))

    setStore(await storeRepository.updateUsingFormData(formData))

    toast({ message: 'Informações salva(s) com sucesso!', type: 'success' })

    togglePaymentModal()
  }

  async function onFileChange(e: any) {
    const newFileUrl = await getFileURL(e.target.files[0])
    if (newFileUrl) setPreviewImage(newFileUrl)
    else {
      toast({ message: 'Selecione apenas 1 imagem pro vez', type: 'error' })
    }
  }

  async function cropImage(current: any) {
    try {
      const image = await getCroppedImg(previewImage, croppedAreaPixels)

      switch (true) {
        case current === 1:
          setPreviewBanner(image)
          break

        case current === 2:
          setPreviewIcon(image)
          break
      }

      toast({ message: 'Foto recortada com sucesso!', type: 'success' })
      setPreviewImage('')
    } catch (e) {
      console.error(e)
      toast({
        message: 'Algo deu errado, tente novamente mais tarde!',
        type: 'success'
      })
    }
  }

  async function updateStoreCategories() {
    try {
      const formData = new FormData()

      const body = {
        storeDto: {
          categoriesIds: selectedCategories.map(({ value }) => value)
        }
      }

      formData.append('storeDto', JSON.stringify(body.storeDto))

      await storeRepository.updateUsingFormData(formData)

      toast({
        message: 'Categorias da loja foram atualizadas com sucesso!',
        type: 'success'
      })
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível atualizar as categorias da loja.',
        type: 'error'
      })
    }
  }

  async function handleCreateCategory(newCategory: string) {
    try {
      if (!newCategory) return

      await categoryRepository.createCategory(newCategory, store.id || '')

      toast({ message: 'Categoria criada com sucesso!', type: 'success' })

      await loadCategories()

      toggleCategoryModal()
    } catch {
      toast({ message: 'Erro ao criar categoria', type: 'error' })
    }
  }

  async function loadCategories() {
    try {
      const data = await categoryRepository.getCategories(storeId || '')
      const dataStore = await storeRepository.getCategories(storeId || '')

      setStoreCategories(dataStore)

      setCategoriesOptions(
        data.map(({ id, name }) => ({ value: id, label: name }))
      )
    } catch (e) {
      console.error(e)
      toast({
        message: 'Não foi possível carregar as categorias',
        type: 'error'
      })
    }
  }

  function fetchStore() {
    storeRepository
      .findById(storeId)
      .then((data) => {
        setStore(data)
        setDescription(data.description)
        setStoreDispatch(data.dispatch)
        setPaymentMethods(data.paymentMethods)
        loadCategories()
        getPaymentOptions()
      })
      .catch(() => {
        toast({ message: 'Erro ao carregar loja', type: 'error' })
        Router.push('/')
      })
      .finally(() => setIsLoading(false))
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) Router.push('/entrar')
      else if (!storeId) Router.push('/')
      else fetchStore()
    }
  }, [auth.isLoading])

  return (
    <>
      <Head>
        <title>Loja | Boa de Venda</title>
      </Head>

      <Dashboard>
        <Container>
          <Modal
            title='Horários de funcionamento'
            showCloseButton={true}
            setModalOpen={toggleTimeModal}
            modalVisible={timeModal}
          >
            <ModalContainer>
              <form onSubmit={handleSubmit(handleEditTimeTable)}>
                <div className='timeTables-container'>
                  <div className='left-container'>
                    <div className='dates'>
                      <p>Segunda:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.seg[0]}
                        {...register('seg[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.seg[1]}
                        {...register('seg[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Terça:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.ter[0]}
                        {...register('ter[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.ter[1]}
                        {...register('ter[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Quarta:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.qua[0]}
                        {...register('qua[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.qua[1]}
                        {...register('qua[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Quinta:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.qui[0]}
                        {...register('qui[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.qui[1]}
                        {...register('qui[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Sexta:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.sex[0]}
                        {...register('sex[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.sex[1]}
                        {...register('sex[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Sábado:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.sab[0]}
                        {...register('sab[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.sab[1]}
                        {...register('sab[1]')}
                      />
                    </div>
                    <div className='dates'>
                      <p>Domingo:</p>
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.dom[0]}
                        {...register('dom[0]')}
                      />
                      <Input
                        icon={<BiTimeFive />}
                        mask='time'
                        placeholder='00:00'
                        defaultValue={store.schedules?.dom[1]}
                        {...register('dom[1]')}
                      />
                    </div>
                  </div>
                </div>
                <div className='buttonsContainer'>
                  <Button
                    skin='secondary'
                    type='button'
                    onClick={toggleTimeModal}
                  >
                    Voltar
                  </Button>
                  <Button type='submit'>Confirmar</Button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <Modal
            title='Categorias'
            showCloseButton={true}
            setModalOpen={toggleCategoryModal}
            modalVisible={categoryModal}
          >
            <ModalContainer>
              <p style={{ margin: 'var(--spacing-xxs) 0' }}>
                Definindo as categorias que você trabalha, ajuda as pessoas a
                <br />
                encontrarem seus produtos.
              </p>

              <div className='categories-container'>
                <MultiSelect
                  creatable={true}
                  formatCreateLabel={(inputValue) =>
                    `➕ Criar categoria "${inputValue}"`
                  }
                  onCreateOption={handleCreateCategory}
                  options={categoriesOptions}
                  setSelectedValue={setSelectedCategories}
                  placeholder='Selecione as categorias'
                />
              </div>

              <div className='buttonsContainer'>
                <Button skin='secondary' onClick={toggleCategoryModal}>
                  Voltar
                </Button>
                <Button onClick={updateStoreCategories}>Salvar</Button>
              </div>
            </ModalContainer>
          </Modal>

          <Modal
            showCloseButton={true}
            title='Localização'
            setModalOpen={toggleLocationModal}
            modalVisible={locationModal}
          >
            <ModalContainer>
              <form
                className='content column'
                onSubmit={handleSubmit(handleEditLocalizationInfo)}
              >
                <Input
                  label='Estado'
                  placeholder='Estado'
                  defaultValue={store.state}
                  icon={
                    <HiOutlineLocationMarker
                      size={20}
                      color='var(--black-800)'
                    />
                  }
                  {...register('state')}
                />

                <Input
                  label='Cidade'
                  placeholder='Cidade'
                  defaultValue={store.city}
                  icon={
                    <HiOutlineLocationMarker
                      size={20}
                      color='var(--black-800)'
                    />
                  }
                  {...register('city')}
                />

                <Input
                  label='Logradouro'
                  placeholder='Logradouro'
                  defaultValue={store.street}
                  icon={<FaRoad size={20} color='var(--black-800)' />}
                  {...register('street')}
                />

                <Input
                  label='Número'
                  placeholder='0000'
                  defaultValue={store.addressNumber}
                  type='numeric'
                  maxLength={6}
                  icon={<BiBuildings size={20} color='var(--black-800)' />}
                  {...register('number')}
                />
                <Input
                  label='Bairro'
                  placeholder='Bairro'
                  defaultValue={store.neighborhood}
                  icon={<BiMapAlt size={20} color='var(--black-800)' />}
                  {...register('neighborhood')}
                />

                <Input
                  label='CEP'
                  placeholder='000.000.000-00'
                  mask='cep'
                  defaultValue={store.zipcode}
                  icon={<BiMapAlt size={20} color='var(--black-800)' />}
                  {...register('cep')}
                />

                <div className='buttonsContainer'>
                  <Button
                    skin='secondary'
                    type='button'
                    onClick={toggleLocationModal}
                  >
                    Voltar
                  </Button>
                  <Button type='submit'>Salvar</Button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <Modal
            title='Informações de Contato'
            showCloseButton={true}
            setModalOpen={toggleContactModal}
            modalVisible={contactModal}
          >
            <ModalContainer>
              <form onSubmit={handleSubmit(handleEditContactInfo)}>
                <div className='contact-container'>
                  <div className='top-inputs'>
                    <Input
                      label='Telefone'
                      placeholder='(00) 0000-0000'
                      mask='phone'
                      defaultValue={store.phone}
                      maxLength={14}
                      icon={<IoMdCall size={20} color='var(--black-800)' />}
                      {...register('phone')}
                    />

                    <Input
                      label='Instagram do negócio'
                      placeholder='instagram.com/exemplo'
                      defaultValue={store.instagramLink}
                      icon={<FiInstagram size={20} color='var(--black-800)' />}
                      {...register('instagram')}
                    />
                  </div>

                  <div className='bottom-inputs'>
                    <Input
                      label='Facebook do negócio'
                      placeholder='facebook.com/exemplo'
                      defaultValue={store.facebookLink}
                      icon={<FaFacebook size={20} color='var(--black-800)' />}
                      {...register('facebook')}
                    />
                    <Input
                      label='WhatsApp do negócio'
                      placeholder='whatsApp.com/exemplo'
                      defaultValue={store.whatsappLink}
                      icon={
                        <IoLogoWhatsapp size={20} color='var(--black-800)' />
                      }
                      {...register('whatsApp')}
                    />
                  </div>
                </div>

                <div className='buttonsContainer'>
                  <Button
                    skin='secondary'
                    type='button'
                    onClick={toggleLocationModal}
                  >
                    Voltar
                  </Button>
                  <Button type='submit'>Salvar</Button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <Modal
            title='Descrição'
            showCloseButton={true}
            setModalOpen={toggleDescModal}
            modalVisible={descModal}
          >
            <ModalContainer>
              <form onSubmit={handleSubmit(handleEditBusinessDescription)}>
                <div className='desc-container'>
                  <div className='top'>
                    <ShopImage
                      id='icon'
                      imageSrc={previewIcon || store.avatar?.url}
                      btnIcon={<AiFillCamera size={23} color='var(--white)' />}
                      btn={
                        <input
                          type='file'
                          id='icon[]'
                          name='icon'
                          accept='image/*'
                          multiple={false}
                          onChange={onFileChange}
                          style={{ display: 'none' }}
                          onClick={() => setCurrentImage(2)}
                        />
                      }
                    />
                  </div>
                  <div className='bottom'>
                    <Input
                      label='Nome do negócio'
                      defaultValue={store.name}
                      placeholder='Exemplo: Café da Maria'
                      icon={<FaBuilding size={21} color='var(--black-800)' />}
                      {...register('name')}
                    />
                    <Textarea
                      label='Descrição do negócio'
                      defaultValue={store.description}
                      placeholder='Faça uma descrição rápida e útil do seu negócio para seus clientes.'
                      {...register('description')}
                      onChange={(e) => {
                        e.target.value = e.target.value.slice(0, 301)
                        setDescription(e.target.value)
                        setValue('description', e.target.value)
                      }}
                    />
                    <span>{description.length}/300</span>
                  </div>
                </div>

                <div className='buttonsContainer'>
                  <Button
                    skin='secondary'
                    type='button'
                    onClick={toggleDescModal}
                  >
                    Voltar
                  </Button>
                  <Button type='submit'>Salvar</Button>
                </div>
              </form>
            </ModalContainer>
          </Modal>

          <Modal
            title='Configurações adicionais'
            showCloseButton={true}
            modalVisible={configModal}
            setModalOpen={toggleConfigModal}
          >
            <ModalContainer>
              <div className='options'>
                <div className='wrap-opts'>
                  <a onClick={togglePaymentModal}>Formas de pagamento</a>
                </div>
                <div className='wrap-opts'>
                  <a onClick={toggleDeliveryModal}>Opções de entrega</a>
                </div>
                <div className='wrap-opts'>
                  <a>Excluir loja</a>
                </div>
              </div>

              <div className='buttonsContainer'>
                <Button
                  skin='secondary'
                  type='button'
                  onClick={toggleConfigModal}
                >
                  Voltar
                </Button>
                <Button type='submit'>Confirmar</Button>
              </div>
            </ModalContainer>
          </Modal>

          <Modal
            title='Formas de pagamento'
            showCloseButton={true}
            modalVisible={paymentModal}
            setModalOpen={togglePaymentModal}
          >
            <ModalContainer>
              <p>
                Selecione pelo menos uma forma para seus clientes realizarem
                pagamentos
              </p>

              <div className='wrap-payments-and-buttons'>
                <div className='payment-options'>
                  {paymentsOptions.map((payment, i) => {
                    const exists =
                      paymentMethods.findIndex(
                        ({ id }) => id === payment.id
                      ) !== -1

                    return (
                      <Checkbox
                        key={i}
                        label={payment.methodName}
                        confirm={exists}
                        toggleConfirm={() =>
                          setPaymentMethods(
                            exists
                              ? paymentMethods.filter(
                                  ({ id }) => id !== payment.id
                                )
                              : [...paymentMethods, payment]
                          )
                        }
                      />
                    )
                  })}
                </div>
              </div>

              <div className='buttonsContainer'>
                <Button
                  skin='secondary'
                  type='button'
                  onClick={togglePaymentModal}
                >
                  Voltar
                </Button>
                <Button onClick={handleSubmitPaymentMethods} type='submit'>
                  Confirmar
                </Button>
              </div>
            </ModalContainer>
          </Modal>

          <Modal
            title='Opções de entrega'
            showCloseButton={true}
            modalVisible={deliveryModal}
            setModalOpen={toggleDeliveryModal}
          >
            <ModalContainer>
              <p>
                Selecione como você deseja que seus clientes recebam seus
                produtos
              </p>

              <div className='wrap-delivery-options'>
                <div>
                  <Checkbox
                    confirm={storeDispatch === 'all'}
                    toggleConfirm={() => setStoreDispatch('all')}
                    label='Todos'
                  />

                  <Checkbox
                    confirm={storeDispatch === 'withdrawal'}
                    toggleConfirm={() => setStoreDispatch('withdrawal')}
                    label='Retirada na loja'
                  />

                  <Checkbox
                    confirm={storeDispatch === 'delivery'}
                    toggleConfirm={() => setStoreDispatch('delivery')}
                    label='Envio de produto'
                  />
                </div>

                <label className='label-input-frete'>
                  <span>Taxa de frete fixa</span>
                  <Input
                    mask='monetaryBRL'
                    value={currency}
                    defaultValue={store.deliveryFee}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder='R$ 0,00'
                  />
                </label>
              </div>

              <div className='buttonsContainer'>
                <Button skin='secondary' onClick={toggleDeliveryModal}>
                  Voltar
                </Button>
                <Button onClick={handleSubmitDelivery}>Salvar</Button>
              </div>
            </ModalContainer>
          </Modal>

          <Modal
            showCloseButton={true}
            setModalOpen={() => setPreviewImage('')}
            modalVisible={!!previewImage}
          >
            <CropModalContainer>
              <section className='crops'>
                <div className='cropper-container'>
                  <div className='crop'>
                    <Cropper
                      style={{
                        containerStyle: {
                          background: 'rgba(255, 255, 255, 0.2)',
                          width: 400,
                          height: 400,
                          top: '20%',
                          left: '50%',
                          transform: 'translate(-50%, -20%)'
                        },
                        cropAreaStyle: {},
                        mediaStyle: {}
                      }}
                      image={previewImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={currentImage === 1 ? 96 / 35 : 1 / 1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <div className='controls-container'>
                    <input
                      type='range'
                      step='0.1'
                      min='1'
                      max='2'
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />
                  </div>
                </div>
              </section>
              <section className='btns'>
                <Button skin='secondary' onClick={() => setPreviewImage('')}>
                  Cancelar
                </Button>
                <Button onClick={() => cropImage(currentImage)}>
                  Recortar
                </Button>
              </section>
            </CropModalContainer>
          </Modal>

          <div className='cards-area'>
            <div className='left-area'>
              <CardDescription
                imgSrc={store.avatar?.url}
                coverSrc={store.background?.url}
                title={store.name}
                quantStar={store.avgStars}
                description={store.description}
                button={toggleDescModal}
                isLoading={isLoading}
                voidText='Nenhum descrição foi encontrada...'
              />

              <CardInfo
                title='Informações de contato'
                type='contact'
                cell={store.phone}
                facebook={store.facebookLink}
                instagram={store.instagramLink}
                whatsApp={store.whatsappLink}
                button={toggleContactModal}
                isLoading={isLoading}
                voidText='Nenhum contato foi encontrada...'
              />

              <CardInfo
                title='Localização'
                type='local'
                button={toggleLocationModal}
                local={store.formattedAddress}
                isLoading={isLoading}
                voidText='Nenhuma localização foi encontrada...'
              />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  margin: 'var(--spacing-xxs) auto',
                  gap: 'var(--spacing-nano)'
                }}
              >
                <Button
                  skin='secondary'
                  onClick={() =>
                    Router.push(
                      `http://${store.formatedName}.${window.location.host}`
                    )
                  }
                >
                  Pré-visualização
                </Button>
                <Button onClick={toggleConfigModal}>
                  CONFIGURAÇÕES ADICIONAIS
                </Button>
              </div>
            </div>

            <div className='right-area'>
              {!store.schedules ? (
                <CardInfo
                  title='Horário de funcionamento'
                  type='timetable'
                  button={toggleTimeModal}
                  isLoading={isLoading}
                  voidText='Nenhum horário foi encontrada...'
                />
              ) : (
                <CardInfo
                  title='Horário de funcionamento'
                  type='timetable'
                  button={toggleTimeModal}
                  seg={store.schedules?.seg}
                  ter={store.schedules?.ter}
                  qua={store.schedules?.qua}
                  qui={store.schedules?.qui}
                  sex={store.schedules?.sex}
                  sab={store.schedules?.sab}
                  dom={store.schedules?.dom}
                  isLoading={isLoading}
                />
              )}

              <CardInfo
                title='Categorias'
                type='category'
                button={toggleCategoryModal}
                isLoading={isLoading}
                categories={storeCategories.map(({ name }) => name)}
                voidText='Nenhuma categoria foi encontrada...'
              />
            </div>
          </div>
        </Container>
      </Dashboard>
    </>
  )
}

export default ShopPage
