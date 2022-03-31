import React, { useEffect, useState, useCallback } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FiPlus, FiSearch, FiArrowLeft, FiBox } from 'react-icons/fi'
import { IoIosClose, IoMdCamera } from 'react-icons/io'
import { FaMoneyBill, FaPercentage, FaCoins } from 'react-icons/fa'
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import { IoTrashBinOutline } from 'react-icons/io5'
import PulseLoader from 'react-spinners/PulseLoader'

import Dashboard from '@/components/templates/Dashboard'

import MultiSelect from '@/components/atoms/MultiSelect'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import CupomItem from '@/components/molecules/CupomItem'
import Checkbox from '@/components/atoms/Checkbox'
import CatalogTabs from '@/components/molecules/CatalogTabs'
import CategoryListCard from '@/components/molecules/CategoryListCard'
import Modal from '@/components/molecules/Modal'
import ProductListCard from '@/components/organisms/ProductListCard'
import Textarea from '@/components/atoms/Textarea'

import UserRepository from '@/repositories/UserRepository'
import ProductRepository from '@/repositories/ProductRepository'
import CouponRepository from '@/repositories/CouponRepository'
import CategoryRepository from '@/repositories/CategoryRepository'

import cropImage from '@/utils/cropImage'
import randomString from '@/utils/randomString'
import { getFileURL, dataURLtoFile } from '@/utils/file'
import formatToBrl from '@/utils/formatToBrl'
import formatToNumber from '@/utils/formatToNumber'
import toast from '@/utils/toast'

import Cropper from 'react-easy-crop'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'

import {
  Container,
  AddCategoryModalContainer,
  AddProductModalContainer,
  CropModalContainer,
  EditCategoryModalContainer,
  ExcludeModalContainer,
  EmptyContainer
} from '@/styles/pages/dashboard/catalogo'

import type { Point } from 'react-easy-crop/types'
import type { NextPage } from 'next/types'
import type { Store } from '@/@types/entities'
import type { Option } from '@/components/atoms/MultiSelect'

interface ServerProps {
  store: Store
}

const createProductFormSchema = yup.object().shape({
  title: yup.string(),
  price: yup.string(),
  description: yup.string(),
  inventory: yup.string(),
  discount: yup.string(),
  parcelAmount: yup.string()
})

const userRepository = new UserRepository()
const productRepository = new ProductRepository()
const couponRepository = new CouponRepository()
const categoryRepository = new CategoryRepository()

const CatalogPage: NextPage<ServerProps> = ({ store }) => {
  const [excludeModal, setExcludeModal] = useState(false)
  const [confirmExclude, setConfirmExclude] = useState(false)

  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [excludeCategoryModal, setExcludeCategoryModal] = useState(false)

  const [addModal, setAddModal] = useState(false)
  const [addCategoryModal, setCategoryAddModal] = useState(false)
  const [enableDiscount, setEnableDiscount] = useState(false)

  const [addCupomModal, setAddCupomModal] = useState(false)

  const [editProduct, setEditProduct] = useState(false)
  const [editProductId, setEditProductId] = useState('')
  const [deleteProductId, setDeleteProductId] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [deleteCategoryId, setDeleteCategoryId] = useState('')

  const [category, setCategory] = useState('')
  const [products, setProducts] = useState<any>([])

  const [loadingProducts, setLoadingProducts] = useState(true)

  const [categories, setCategories] = useState<Option[]>([])
  const [installments, setInstallments] = useState<any>({
    value: '1',
    label: '1x'
  })

  const [cupons, setCupons] = useState<any[]>([])

  const [cupomCode, setCupomCode] = useState('')
  const [discountPorcent, setDiscountPorcent] = useState('')
  const [maxUsage, setMaxUsage] = useState('')
  const [validate, setValidate] = useState('')

  const [previewImage, setPreviewImage] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [imageSrc1, setImageSrc1] = useState('')
  const [imageSrc2, setImageSrc2] = useState('')
  const [currentImage, setCurrentImage] = useState(1)

  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(0)

  const [toggleState, setToggleState] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<any>([])

  const productParcels = [...Array(12)].map((_, idx) => ({
    value: String(idx + 1),
    label: idx + 1 + 'x'
  }))

  const [productEditValue, setProductEditValue] = useState('')

  function editProductSelected(product: any) {
    setEnableDiscount(false)
    setValue('title', product.title)
    setValue('price', product.price)
    setValue('inventory', product.inventory)
    setValue('discount', product.discount)
    if (Number(product.discount) > 0) setEnableDiscount(true)

    if (product.files[0]) setImageSrc(product.files[0].url)
    if (product.files[1]) setImageSrc1(product.files[1].url)
    if (product.files[2]) setImageSrc2(product.files[2].url)

    setProductEditValue(product.description)
    setInstallments({
      value: String(product.parcelAmount || ''),
      label: `${product.parcelAmount}x`
    })

    const catSelecteds = categories
      .filter((cat: any) =>
        product.categories.some((selected: any) => selected === cat.name)
      )
      .map((item: any) => ({ label: item.name, value: item.id }))

    setSelectedCategories(catSelecteds)
  }

  const futureDate = moment().add(30, 'days').format('DD/MM/YY')

  function toggleAddCategoryModal() {
    setCategoryAddModal(!addCategoryModal)
  }

  function handleOpenAddModal() {
    setAddModal(true)
  }

  function toggleAddModal() {
    setAddModal(!addModal)
    setPreviewImage('')
    setImageSrc('')
    setImageSrc1('')
    setImageSrc2('')
  }

  function toggleEditProduct() {
    setEditProduct(!editProduct)
    setPreviewImage('')
    setImageSrc('')
    setImageSrc1('')
    setImageSrc2('')
  }

  function handleOpenExcludeModal() {
    setExcludeModal(true)
  }

  function toggleExcludeModal() {
    setExcludeModal(!excludeModal)
  }

  function handleContinueExcludeModal() {
    setConfirmExclude(!confirmExclude)
  }

  function handleOpenEditCategoryModal() {
    setEditCategoryModal(true)
  }

  function handleToggleExcludeCategoryModal() {
    setExcludeCategoryModal(!excludeCategoryModal)
  }

  function toggleEditCategoryModal() {
    setCategory('')
    setEditCategoryModal(!editCategoryModal)
  }

  function toggleAddCupomModal() {
    setAddCupomModal(!addCupomModal)
  }

  function toggleImageModal() {
    setPreviewImage('')
  }

  function onZoomChange(newValue: number) {
    setZoom(newValue)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onFileChange = async (e: any) => {
    if (e.target.files?.length === 1) {
      const file = await getFileURL(e.target.files[0])
      setPreviewImage(file)
    } else {
      toast({ message: 'Selecione apenas uma imagem pro vez!', type: 'error' })
    }
  }

  async function startCrop(current: any) {
    const image = await cropImage(previewImage, croppedAreaPixels)

    try {
      if (current === 1) {
        setImageSrc(image)
      } else if (current === 2) {
        setImageSrc1(image)
      } else if (current === 3) {
        setImageSrc2(image)
      }
      toast({ message: 'Foto recortada com sucesso!', type: 'success' })
      setPreviewImage('')
      toggleImageModal()
    } catch {
      toast({
        message: 'Erro interno favor tentar novamente mais tarde!',
        type: 'error'
      })
    }
  }

  async function handleCreateCategory(newCategory?: string) {
    try {
      await categoryRepository.createCategory(newCategory || category, store.id)

      toast({ message: 'Categoria criada com sucesso!', type: 'success' })

      setCategory('')
      loadData()
      toggleAddCategoryModal()
    } catch {
      toast({ message: 'Erro ao criar categoria', type: 'error' })
    }
  }

  async function handleCreateCupom() {
    try {
      await couponRepository.createCoupon({
        code: cupomCode,
        discountPorcent: Number(discountPorcent),
        maxUsage: Number(maxUsage),
        validate: new Date(validate + '-3:00'),
        type: 'percentage',
        range: 'store',
        categoriesIds: selectedCategories.map((it: any) => it.value)
      })

      toast({ message: 'Cupom criado com sucesso!', type: 'success' })

      loadData()
      toggleAddCategoryModal()
    } catch {
      toast({ message: 'Erro ao criar cupom', type: 'error' })
    }
  }

  const handleDeleteCategory = async () => {
    try {
      await categoryRepository.deleteCategory(deleteCategoryId, store.id)

      toast({ message: 'Produto deletado com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao excluir produto, tente novamente!',
        type: 'error'
      })
    }

    setExcludeCategoryModal(false)
    loadData()
  }

  const handleUpdateCategory = async () => {
    try {
      const body = {
        name: category,
        storeId: store.id
      }

      await categoryRepository.updateCategory(editCategoryId, store.id, body)

      toast({ message: 'Produto atualizado com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao editar produto, tente novamente!',
        type: 'error'
      })
    } finally {
      setCategory('')
      loadData()
      setEditCategoryModal(false)
    }
  }

  const { register, handleSubmit, getValues, setValue, reset } = useForm({
    resolver: yupResolver(createProductFormSchema)
  })

  const handleCreateProduct = async (values: any) => {
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('price', String(formatToNumber(String(values.price))))
      formData.append('description', values.description)
      formData.append('inventory', values.inventory)
      formData.append('discount', values.discount || '0')
      formData.append(
        'categoriesIds',
        JSON.stringify(selectedCategories.map((cat: any) => cat.value))
      )
      formData.append('parcelAmount', String(installments?.value || 0))
      formData.append(
        'files',
        imageSrc ? dataURLtoFile(imageSrc, randomString()) : ''
      )
      formData.append(
        'files',
        imageSrc1 ? dataURLtoFile(imageSrc1, randomString()) : ''
      )
      formData.append(
        'files',
        imageSrc2 ? dataURLtoFile(imageSrc2, randomString()) : ''
      )

      await productRepository.createProduct(formData)

      toast({ message: 'Produto criado com sucesso', type: 'success' })

      setAddModal(false)
      setSelectedCategories([])
    } catch {
      toast({
        message: 'Erro ao criar produto, tente novamente!',
        type: 'error'
      })
    } finally {
      loadData()
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await productRepository.deleteProduct(deleteProductId)

      toast({ message: 'Produto deletado com sucesso!', type: 'success' })
      setExcludeModal(false)
      loadData()
    } catch {
      toast({
        message: 'Erro ao excluir produto, tente novamente!',
        type: 'error'
      })
    }
  }

  const handleDeleteCupom = async (code: string) => {
    try {
      await couponRepository.deleteCoupon(code)

      toast({ message: 'Cupom deletado com sucesso!', type: 'success' })
      loadData()
    } catch {
      toast({
        message: 'Erro ao excluir cupom, tente novamente!',
        type: 'error'
      })
    }
  }

  const handleUpdateProduct = async (values: any) => {
    try {
      const body = {
        title: values.title,
        price: formatToNumber(values.price),
        description: productEditValue,
        inventory: Number(values.inventory || '0'),
        discount: Number(values.discount),
        categoriesIds: selectedCategories.map((cat: any) => cat.value),
        parcelAmount: installments?.value || '0'
      }

      await productRepository.updateProduct(editProductId, body)

      toast({ message: 'Produto atualizado com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao editar produto, tente novamente!',
        type: 'error'
      })
    }

    setEditProductId('')
    setSelectedCategories([])
    loadData()
    setEditProduct(false)
  }

  const loadData = async () => {
    try {
      if (!store) Router.push('/')

      const data = await productRepository.findAllByStoreId(store.id)

      const formattedData = data.map((it: any) => ({
        ...it,
        categories: it.categories.map((cat: any) => cat.name)
      }))

      setProducts(formattedData)
    } catch {
      toast({ message: 'Erro ao buscar produtos', type: 'error' })
    } finally {
      setLoadingProducts(false)
    }

    try {
      const data = await categoryRepository.getCategories(store.id)

      setCategories(data)
    } catch {
      toast({ message: 'Erro ao buscar categorias', type: 'error' })
    }

    try {
      const data = await couponRepository.getCoupon()

      setCupons(data)
    } catch {
      toast({ message: 'Erro ao buscar cupons', type: 'error' })
    }
  }

  const [radioSelected, setRadioSelected] = useState(1)
  const [ilimitedCupom, setIlimitedCupom] = useState(false)

  const [priceWithDiscount, setPriceWithDiscount] = useState(formatToBrl(0))
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const price = formatToNumber(String(getValues(['price'])[0] || 0))
    const newPrice = price - price * (discount / 100)
    setPriceWithDiscount(formatToBrl(newPrice < 0 ? 0 : newPrice))
  }, [discount])

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Head>
        <title> Catálogo | Boa de Venda </title>
      </Head>

      <Modal
        buttons={false}
        setModalOpen={() => {
          handleToggleExcludeCategoryModal()
        }}
        modalVisible={excludeCategoryModal}
      >
        <ExcludeModalContainer>
          <h1>
            Realmente deseja excluir <strong>definitivamente</strong> esse
            produto?
          </h1>

          <div className='btn-container'>
            <button
              onClick={() => {
                handleDeleteCategory()
              }}
              className='exclude-btn'
            >
              Confirmar
            </button>
            <button
              onClick={handleToggleExcludeCategoryModal}
              className='cancel-btn'
            >
              Cancelar
            </button>
          </div>
        </ExcludeModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleExcludeModal}
        modalVisible={excludeModal}
      >
        <ExcludeModalContainer>
          {confirmExclude ? (
            <>
              <div className='icon'>
                <IoTrashBinOutline size={120} color='var(--red)' />
              </div>
              <h1 className='desc'>Categoria excluído com sucesso!</h1>
              <div className='btn'>
                <button
                  onClick={handleContinueExcludeModal}
                  className='continue-btn'
                >
                  Continuar
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>
                Realmente deseja excluir <strong>definitivamente</strong> essa
                categoria?
              </h1>

              <div className='btn-container'>
                <button onClick={handleDeleteProduct} className='exclude-btn'>
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    toggleExcludeModal()
                    setDeleteProductId('')
                  }}
                  className='cancel-btn'
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </ExcludeModalContainer>
      </Modal>

      <Modal
        buttons={false}
        showCloseButton={false}
        setModalOpen={toggleAddCategoryModal}
        modalVisible={addCategoryModal}
      >
        <AddCategoryModalContainer>
          <div className='exit-container'>
            <h1>Adicionar Categoria</h1>

            <IoIosClose
              onClick={toggleAddCategoryModal}
              size={36}
              color='black'
            />
          </div>

          <div className='inputContainer'>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label='Categoria'
            />
          </div>

          <div className='buttonContainer'>
            <Button skin='secondary' onClick={toggleAddCategoryModal}>
              Voltar
            </Button>

            <Button onClick={() => handleCreateCategory()}>Salvar</Button>
          </div>
        </AddCategoryModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleEditCategoryModal}
        modalVisible={editCategoryModal}
      >
        <EditCategoryModalContainer>
          <div className='exit-container'>
            <h1>Editar Categoria</h1>
            <IoIosClose
              onClick={toggleEditCategoryModal}
              size={36}
              color={'black'}
            />
          </div>

          <div className='category-container'>
            <Input
              label='Nome da categoria'
              placeholder='Categoria'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className='category-btn-container'>
            <button onClick={handleUpdateCategory}>Confirmar</button>
          </div>
        </EditCategoryModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleAddModal}
        modalVisible={addModal}
      >
        <AddProductModalContainer onSubmit={handleSubmit(handleCreateProduct)}>
          <h1 className='titulo-cadastro'>Cadastrar Produto</h1>
          <div className='input-infos'>
            <div className='left-area'>
              <Input
                label='Nome do produto'
                icon={<FiBox />}
                placeholder='Nome do produto'
                {...register('title')}
              />

              <Textarea
                label='Descrição do produto'
                maxLength={600}
                placeholder='Descrição'
                icon={<GiHamburgerMenu />}
                {...register('description')}
              />

              <div className='row'>
                <Input
                  label='Preço'
                  icon={<FaMoneyBill />}
                  placeholder='R$ 0'
                  mask='monetaryBRL'
                  {...register('price')}
                />

                <MultiSelect
                  name='Parcelamento'
                  options={productParcels}
                  selectedValue={installments?.value}
                  setSelectedValue={setInstallments}
                  loading={false}
                  placeholder='Selecione o número de parcelas'
                  style={{ width: '50%' }}
                />
              </div>

              <div className='desconto'>
                <Input
                  label='Desconto'
                  disabled={!enableDiscount}
                  icon={<FaPercentage />}
                  mask='number'
                  placeholder='0.0%'
                  value={discount}
                  {...register('discount')}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />

                <div className='arrows'>
                  <GoArrowRight size={20} />
                  <GoArrowLeft size={20} className='left-arrow' />
                </div>

                <Input
                  label='Preço com desconto'
                  mask='monetaryBRL'
                  disabled
                  icon={<FaMoneyBill />}
                  value={priceWithDiscount}
                  placeholder='R$ 0'
                />
              </div>

              <Checkbox
                confirm={enableDiscount}
                toggleConfirm={() => {
                  setEnableDiscount(!enableDiscount)
                }}
                label='Desconto'
              />
            </div>

            <div className='right-area'>
              <div className='input-container'>
                <Input
                  label='Quantidade atual'
                  icon={<FaCoins />}
                  placeholder='0'
                  mask='number'
                  {...register('inventory')}
                />
              </div>

              <MultiSelect
                loading={false}
                name='Categorias'
                options={categories.map((cat: any) => ({
                  value: String(cat.id),
                  label: cat.name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories.map(
                  ({ value }: any) => value
                )}
                setSelectedValue={setSelectedCategories}
                creatable={true}
                formatCreateLabel={(inputValue) =>
                  `➕ Criar categoria "${inputValue}"`
                }
                onCreateOption={handleCreateCategory}
              />
              <span className='text-categories-added'>
                Categorias adicionadas: {selectedCategories.length}
              </span>

              <div>
                <h2>Fotos do produto</h2>

                <div className='array-fotos'>
                  <input
                    id='image'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(1)}
                  />
                  <input
                    id='image1'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(2)}
                  />
                  <input
                    id='image2'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(3)}
                  />
                  <label htmlFor='image'>
                    <div className='card-image'>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                  <label htmlFor='image1'>
                    <div className='card-image'>
                      {imageSrc1 ? (
                        <img
                          src={imageSrc1}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                  <label htmlFor='image2'>
                    <div className='card-image'>
                      {imageSrc2 ? (
                        <img
                          src={imageSrc2}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='buttonContainer'>
            <Button type='button' skin='secondary' onClick={toggleAddModal}>
              Voltar
            </Button>

            <Button type='submit'>Salvar</Button>
          </div>
        </AddProductModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleEditProduct}
        modalVisible={editProduct}
      >
        <AddProductModalContainer onSubmit={handleSubmit(handleUpdateProduct)}>
          <h1 className='titulo-cadastro'>Editar Produto</h1>
          <div className='input-infos'>
            <div className='left-area'>
              <Input
                label='Nome do produto'
                icon={<FiBox />}
                placeholder='Nome do produto'
                {...register('title')}
              />

              <Textarea
                label='Descrição do produto'
                maxLength={600}
                placeholder='Descrição'
                icon={<GiHamburgerMenu />}
                {...register('description')}
                value={productEditValue}
                onChange={(e) => setProductEditValue(e.target.value)}
              />

              <div className='row-edit'>
                <Input
                  label='Preço'
                  icon={<FaMoneyBill />}
                  placeholder='R$ 0'
                  mask='monetaryBRL'
                  {...register('price')}
                />

                <MultiSelect
                  name='Parcelamento'
                  options={productParcels}
                  selectedValue={installments}
                  setSelectedValue={setInstallments}
                  loading={false}
                  placeholder='Selecione o número de parcelas'
                />
              </div>

              <div className='desconto'>
                <Input
                  label='Desconto'
                  disabled={!enableDiscount}
                  icon={<FaPercentage />}
                  mask='number'
                  placeholder='0.0%'
                  value={discount}
                  {...register('discount')}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />

                <div className='arrows'>
                  <GoArrowRight size={20} />
                  <GoArrowLeft size={20} className='left-arrow' />
                </div>

                <Input
                  label='Preço com desconto'
                  mask='monetaryBRL'
                  value={priceWithDiscount}
                  disabled
                  icon={<FaMoneyBill />}
                  placeholder='R$ 0'
                />
              </div>

              <Checkbox
                confirm={enableDiscount}
                toggleConfirm={() => {
                  setEnableDiscount(!enableDiscount)
                }}
                label='Desconto'
              />
            </div>

            <div className='right-area'>
              <div className='input-container'>
                <Input
                  label='Quantidade atual'
                  icon={<FaCoins />}
                  placeholder='0'
                  mask='number'
                  {...register('inventory')}
                />
              </div>

              <MultiSelect
                loading={false}
                name='Categorias'
                options={categories.map((cat: any) => ({
                  value: String(cat.id),
                  label: cat.name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories}
                setSelectedValue={setSelectedCategories}
              />
              <h3>{'Categorias adicionadas: ' + selectedCategories.length}</h3>

              <div>
                <h2>Fotos do produto</h2>

                <div className='array-fotos'>
                  <input
                    id='image'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(1)}
                  />
                  <input
                    id='image1'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(2)}
                  />
                  <input
                    id='image2'
                    type='file'
                    name='image'
                    accept='image/*'
                    multiple={false}
                    maxLength={1}
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    onClick={() => setCurrentImage(3)}
                  />
                  <label htmlFor='image'>
                    <div className='card-image'>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                  <label htmlFor='image1'>
                    <div className='card-image'>
                      {imageSrc1 ? (
                        <img
                          src={imageSrc1}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                  <label htmlFor='image2'>
                    <div className='card-image'>
                      {imageSrc2 ? (
                        <img
                          src={imageSrc2}
                          width='100%'
                          height='100%'
                          alt='Foto Produto'
                        />
                      ) : (
                        <IoMdCamera size={25} color='#6C7079' />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='buttonContainer'>
            <Button type='button' skin='secondary' onClick={toggleEditProduct}>
              Voltar
            </Button>

            <Button type='submit'>Salvar</Button>
          </div>
        </AddProductModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleAddCupomModal}
        modalVisible={addCupomModal}
      >
        <AddProductModalContainer>
          <h1 className='titulo-cadastro'>Cadastrar Cupom</h1>
          <div className='input-infos'>
            <div className='left-area'>
              <div className='radio-area'>
                <span>Valor do desconto</span>
                <div className='radio-container'>
                  <input
                    type='radio'
                    name='type'
                    value='1'
                    id='real'
                    checked={radioSelected === 1}
                    onClick={() => setRadioSelected(1)}
                  />
                  <label htmlFor='all'>Real</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    name='type'
                    value='2'
                    id='perc'
                    checked={radioSelected === 2}
                    onClick={() => setRadioSelected(2)}
                  />
                  <label htmlFor='cat'>Porcentagem</label>
                </div>
              </div>

              <Input
                label='Valor do desconto'
                icon={<FaMoneyBill />}
                placeholder={radioSelected === 1 ? 'R$ 0' : '0 %'}
                mask={radioSelected === 1 ? 'monetaryBRL' : 'number'}
                value={discountPorcent}
                onChange={(e) => setDiscountPorcent(e.target.value)}
              />

              <div className='row'>
                <Input
                  label='Validade'
                  placeholder={String(futureDate)}
                  mask='date'
                  value={validate}
                  onChange={(e) => setValidate(e.target.value)}
                />

                <Input
                  label='N° de cupons'
                  placeholder='0'
                  mask='number'
                  disabled={ilimitedCupom}
                  style={ilimitedCupom ? { cursor: 'default' } : undefined}
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value)}
                />
              </div>

              <div className='radio-area'>
                <input
                  type='checkbox'
                  name='type'
                  value='1'
                  id='ilim'
                  onClick={() => setIlimitedCupom(true)}
                />
                <label htmlFor='ilim'>Cupons ilimitados</label>
              </div>

              <div className='row'>
                <Input
                  label='Nome do cupom'
                  placeholder='Nome do cupom  '
                  value={cupomCode}
                  onChange={(e) => setCupomCode(e.target.value)}
                />
              </div>

              <small>
                Código que será digitado pelo cliente, deverá possuir apenas
                letras e número.
              </small>
            </div>

            <div className='right-area'>
              <div className='radio-area'>
                <span>Tipo de desconto</span>

                <div className='radio-container'>
                  <input type='radio' name='type_discount' value='1' id='cat' />
                  <label htmlFor='cat'>Categoria</label>
                </div>

                <div className='radio-container'>
                  <input type='radio' name='type_discount' value='2' id='all' />
                  <label htmlFor='all'>Toda a loja</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    name='type_discount'
                    value='3'
                    id='first'
                  />
                  <label htmlFor='first'>Primeira compra</label>
                </div>
              </div>

              <MultiSelect
                loading={false}
                name='Categorias'
                options={categories.map((cat: any) => ({
                  value: String(cat.id),
                  label: cat.name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories}
                setSelectedValue={setSelectedCategories}
              />
              <span className='text-categories-added'>
                Categorias adicionadas: {selectedCategories.length}
              </span>

              <div className='radio-area'>
                <input type='checkbox' name='type' value='1' id='priv' />
                <label htmlFor='priv'>Cupom privado</label>
                <br />
                <small>
                  Cupons privados só serão acessíveis para quem tiver o nome do
                  cupom.
                </small>
              </div>
            </div>
          </div>

          <div className='buttonContainer'>
            <Button
              skin='secondary'
              onClick={toggleAddCupomModal}
              type='submit'
            >
              Voltar
            </Button>

            <Button type='button' onClick={handleCreateCupom}>
              Salvar
            </Button>
          </div>
        </AddProductModalContainer>
      </Modal>

      <Modal
        buttons={false}
        setModalOpen={toggleImageModal}
        modalVisible={!!previewImage.length}
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
                  aspect={1 / 1}
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
                  onChange={(e) => onZoomChange(Number(e.target.value))}
                />
              </div>
            </div>
          </section>
          <section className='btns'>
            <Button onClick={toggleImageModal}>Cancelar</Button>
            <Button onClick={() => startCrop(currentImage)}>Recortar</Button>
          </section>
        </CropModalContainer>
      </Modal>

      <Dashboard>
        <Container>
          <div className='area'>
            <div className='list-container'>
              <header className='header'>
                <Link href='/' passHref>
                  <h1>
                    <FiArrowLeft size={32} color='var(--gray-700)' /> Produtos
                  </h1>
                </Link>

                <button
                  className='addBtn'
                  onClick={() => {
                    reset()
                    setSelectedCategories([])
                    setInstallments(null)
                    setDiscount(0)
                    setPriceWithDiscount(formatToBrl(0))
                    if (toggleState === 1) handleOpenAddModal()
                    else {
                      if (toggleState === 2) toggleAddCategoryModal()
                      else toggleAddCupomModal()
                    }
                  }}
                >
                  <FiPlus size={20} color='var(--white)' />
                  Adicionar
                </button>
                <div className='input-container'>
                  <Input
                    className='searchInput'
                    label=''
                    placeholder='Pesquisar'
                    icon={<FiSearch size={22} color='var(--black-800)' />}
                  />
                </div>
              </header>

              <main>
                <CatalogTabs
                  tab1='Produtos'
                  tab2='Categorias'
                  tab3='Cupons'
                  setToggleState={setToggleState}
                  toggleState={toggleState}
                  content1={
                    <div className='products-container'>
                      {products.length ? (
                        products.map((product: any) => (
                          <ProductListCard
                            key={product?.id}
                            icon={product?.files[0]?.url}
                            name={product?.title}
                            code={product?.id}
                            category={product?.categories?.join('')}
                            amount={product?.inventory}
                            price={product?.price}
                            excludeBtn={() => {
                              handleOpenExcludeModal()
                              setDeleteProductId(product.id)
                            }}
                            editBtn={() => {
                              editProductSelected(product)
                              setDiscount(product.discount)
                              setEditProductId(product.id)
                              setEditProduct(true)
                            }}
                            isRed={true}
                            isGreen={true}
                          />
                        ))
                      ) : (
                        <EmptyContainer>
                          {loadingProducts ? (
                            <div
                              style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <PulseLoader
                                size={14}
                                color='var(--color-primary)'
                              />
                            </div>
                          ) : (
                            <div>
                              <img
                                src='/images/emptyProducts.svg'
                                alt='Produto vazio'
                              />
                              <p>Nenhum produto cadastrado</p>
                              <Button onClick={handleOpenAddModal}>
                                Cadastrar
                              </Button>
                            </div>
                          )}
                        </EmptyContainer>
                      )}
                    </div>
                  }
                  content2={
                    <div className='categories-container'>
                      {categories.length ? (
                        categories.map((cat: any, index) => {
                          return (
                            <CategoryListCard
                              key={cat.id + '-' + index}
                              date={products
                                .filter((prd: any) =>
                                  prd.categories.includes(cat.name)
                                )
                                .map((data: any) => {
                                  return {
                                    name: data.title,
                                    amount: String(data.inventory)
                                  }
                                })}
                              category={cat.name}
                              excludeBtn={() => {
                                setDeleteCategoryId(cat.id)
                                handleToggleExcludeCategoryModal()
                              }}
                              editBtn={() => {
                                setEditCategoryId(cat.id)
                                handleOpenEditCategoryModal()
                              }}
                              isGreen={true}
                              isRed={true}
                            />
                          )
                        })
                      ) : (
                        <EmptyContainer>
                          <div>
                            <img
                              src='/images/emptyCategories.svg'
                              alt='Categoria vazia'
                            />
                            <p>Nenhuma categoria cadastrada</p>
                            <Button onClick={toggleAddCategoryModal}>
                              Cadastrar
                            </Button>
                          </div>
                        </EmptyContainer>
                      )}
                    </div>
                  }
                  content3={
                    <div className='cupons-container'>
                      {cupons.length !== 0 ? (
                        cupons.map((it) => (
                          <CupomItem
                            code={it.code}
                            info={`Desconto de ${it.discountPorcent} com o máximo de usos: ${it.maxUsage}`}
                            key={it.code}
                            excludeBtn={() => {
                              handleDeleteCupom(it.code)
                            }}
                          />
                        ))
                      ) : (
                        <EmptyContainer>
                          <div>
                            <img
                              src='/images/emptyCategories.svg'
                              alt='Categoria vazia'
                            />
                            <p>Nenhum cupom cadastrado</p>
                            <Button onClick={toggleAddCupomModal}>
                              Cadastrar
                            </Button>
                          </div>
                        </EmptyContainer>
                      )}
                    </div>
                  }
                />
              </main>
            </div>
          </div>
        </Container>
      </Dashboard>
    </>
  )
}

CatalogPage.getInitialProps = async () => {
  try {
    const { store } = await userRepository.getMe()

    return {
      store: store as Store
    }
  } catch {
    return {
      store: {} as Store
    }
  }
}

export default CatalogPage
