import React, { useEffect, useState, useCallback } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FiPlus, FiSearch, FiArrowLeft, FiBox } from 'react-icons/fi'
import { IoMdCamera } from 'react-icons/io'
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
import Pagination from '@/components/molecules/Pagination'

import useToggleState from '@/hooks/useToggleState'

import { useAuth } from '@/contexts/AuthContext'

import ProductRepository from '@/repositories/ProductRepository'
import CouponRepository from '@/repositories/CouponRepository'
import CategoryRepository from '@/repositories/CategoryRepository'

import cropImage from '@/utils/cropImage'
import randomString from '@/utils/randomString'
import { getFileURL, dataURLtoFile } from '@/utils/file'
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
import type { Option } from '@/components/atoms/MultiSelect'
import type { Category, Product } from '@/@types/entities'

const createProductFormSchema = yup.object().shape({
  title: yup.string(),
  price: yup.string(),
  description: yup.string(),
  inventory: yup.string(),
  discount: yup.string(),
  parcelAmount: yup.string()
})

const productRepository = new ProductRepository()
const couponRepository = new CouponRepository()
const categoryRepository = new CategoryRepository()

const CatalogPage = () => {
  const { isLoading, store } = useAuth()
  const [excludeModal, toggleExcludeModal] = useToggleState(false)
  const [confirmExclude, handleContinueExcludeModal] = useToggleState(false)

  const [editCategoryModal, toggleEditCategoryModal] = useToggleState(false)
  const [excludeCategoryModal, toggleExcludeCategoryModal] =
    useToggleState(false)

  const [addModal, setAddModal] = useState(false)
  const [addCategoryModal, toggleAddCategoryModal] = useToggleState(false)
  const [enableDiscount, setEnableDiscount] = useState(false)

  const [addCupomModal, toggleAddCupomModal] = useToggleState(false)

  const [editModal, setEditModal] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [deleteCategoryId, setDeleteCategoryId] = useState('')

  const [category, setCategory] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [productsPagination, setProductsPagination] = useState({
    currentPage: 1,
    perPage: 10,
    count: 0
  })

  const [loadingProducts, setLoadingProducts] = useState(true)

  const [categories, setCategories] = useState<Category[]>([])
  const [installments, setInstallments] = useState<Option | null>({
    value: '1',
    label: '1x'
  })

  const [cupons, setCupons] = useState<any[]>([])

  const [cupomCode, setCupomCode] = useState('')
  const [discountPorcent, setDiscountPorcent] = useState('')
  const [discountCategory, setDiscountCategory] = useState('category')
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
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([])

  const productParcels = [...Array(12)].map((_, idx) => ({
    value: String(idx + 1),
    label: idx + 1 + 'x'
  }))

  const [activeCupom, setActiveCupom] = useState<any>(null)
  const [deleteCupomModal, toggleDeleteCupomModal] = useToggleState(false)
  const [editCupomModal, toggleEditCupomModal] = useToggleState(false)

  const [activeProduct, setActiveProduct] = useState<any>({})

  const [search, setSearch] = useState('')

  function toggleEditModal() {
    setEditModal(!editModal)
    if (!editModal) {
      setActiveProduct({})
      setPreviewImage('')
      setImageSrc('')
      setImageSrc1('')
      setImageSrc2('')
      setPrice('0')
      updateDiscount('0')
    }
  }

  function editProduct(product: any) {
    toggleEditModal()
    setActiveProduct(product)
    setEnableDiscount(!!product.discount)
    setPrice(product.price)
    setPriceWithDiscount(
      String(product.price - product.price * (product.discount / 100))
    )

    Object.entries(product).map(([key, value]) => setValue(key, value))

    if (product.files[0]) setImageSrc(product.files[0].url)
    if (product.files[1]) setImageSrc1(product.files[1].url)
    if (product.files[2]) setImageSrc2(product.files[2].url)

    setInstallments({
      value: String(product.parcelAmount || ''),
      label: `${product.parcelAmount}x`
    })

    setSelectedCategories(
      categories
        .filter((cat: any) =>
          product.categories.some((selected: any) => selected === cat.name)
        )
        .map((item: any) => ({ label: item.name, value: item.id }))
    )
  }

  const futureDate = moment().add(30, 'days').format('DD/MM/YY')

  function toggleAddModal() {
    setAddModal(!addModal)
    setPreviewImage('')
    setImageSrc('')
    setImageSrc1('')
    setImageSrc2('')
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
    } catch {
      toast({
        message: 'Erro interno favor tentar novamente mais tarde!',
        type: 'error'
      })
    }
  }

  async function handleCreateCategory(newCategory?: string) {
    try {
      await categoryRepository.createProductCategory(
        newCategory || category,
        store?.id || ''
      )

      toast({
        message: 'Categoria de produto criada com sucesso!',
        type: 'success'
      })

      setCategory('')
      await loadData()
    } catch {
      toast({ message: 'Erro ao criar categoria', type: 'error' })
    }
  }

  async function handleCreateCupom() {
    try {
      await couponRepository.createCoupon({
        code: activeCupom.code,
        discountPorcent: formatToNumber(activeCupom.discountPorcent),
        maxUsage: Number(activeCupom.maxUsage),
        validate: new Date(validate + '-3:00'),
        type: discountType,
        range: discountCategory,
        categoriesIds: selectedCategories.map(({ value }) => value),
        isPrivate: privateCupom
      })

      loadData()

      toggleAddCupomModal()

      toast({ message: 'Cupom criado com sucesso!', type: 'success' })
    } catch {
      toast({ message: 'Erro ao criar cupom', type: 'error' })
    }
  }

  async function handleUpdateCupom() {
    try {
      await couponRepository.editCoupon({
        code: activeCupom.code,
        discountPorcent: formatToNumber(activeCupom.discountPorcent),
        maxUsage: Number(activeCupom.maxUsage),
        validate: new Date(validate + '-3:00'),
        type: discountType,
        range: discountCategory,
        categoriesIds: selectedCategories.map(({ value }) => value),
        isPrivate: privateCupom
      })

      loadData()

      toggleEditCupomModal()

      toast({ message: 'Cupom editado com sucesso!', type: 'success' })
    } catch {
      toast({ message: 'Erro ao editar cupom', type: 'error' })
    }
  }

  const handleDeleteCategory = async () => {
    try {
      await categoryRepository.deleteProductCategory(
        deleteCategoryId,
        store?.id || ''
      )

      loadData()

      toast({ message: 'Categoria deletada com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao excluir categoria, tente novamente!',
        type: 'error'
      })
    }

    loadData()
    toggleExcludeCategoryModal()
  }

  const handleUpdateCategory = async () => {
    try {
      const body = {
        name: category,
        storeId: store?.id || ''
      }

      await categoryRepository.updateProductCategory(
        editCategoryId,
        store?.id || '',
        body
      )

      toast({ message: 'Categoria atualizada com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao editar categoria, tente novamente!',
        type: 'error'
      })
    } finally {
      setCategory('')
      loadData()
      toggleEditCategoryModal()
    }
  }

  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(createProductFormSchema)
  })

  const handleCreateProduct = async (values: any) => {
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append(
        'price',
        formatToNumber(String(values.price || price)).toString()
      )
      formData.append('description', values.description)
      formData.append('inventory', values.inventory)
      formData.append('discount', values.discount || '0')
      formData.append(
        'categoriesIds',
        JSON.stringify(selectedCategories.map(({ value }) => value))
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

      loadData()

      toast({ message: 'Produto criado com sucesso', type: 'success' })

      toggleAddModal()
      setSelectedCategories([])
    } catch {
      toast({
        message: 'Erro ao criar produto, tente novamente!',
        type: 'error'
      })
    }
  }

  const handleDeleteProduct = async () => {
    try {
      await productRepository.deleteProduct(deleteProductId)

      toast({ message: 'Produto deletado com sucesso!', type: 'success' })
      toggleExcludeModal()
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
    } finally {
      setActiveCupom(null)
      toggleDeleteCupomModal()
    }
  }

  const handleUpdateProduct = async (values: any) => {
    try {
      const body = {
        title: values.title,
        price: formatToNumber(values.price),
        description: values.description,
        inventory: Number(values.inventory || '0'),
        discount: Number(values.discount),
        categoriesIds: selectedCategories.map((cat: any) => cat.value),
        parcelAmount: installments?.value || '0'
      }

      await productRepository.updateProduct(activeProduct.id, body)

      toast({ message: 'Produto atualizado com sucesso!', type: 'success' })
    } catch {
      toast({
        message: 'Erro ao editar produto, tente novamente!',
        type: 'error'
      })
    }

    setSelectedCategories([])
    loadData()
    toggleAddModal()
  }

  const loadProducts = async () => {
    try {
      const pagination = await productRepository.findAllByStoreId(
        store?.id || '',
        {
          page: productsPagination.currentPage,
          perPage: productsPagination.perPage,
          search
        }
      )

      setProducts(pagination.data)
      setProductsPagination({
        currentPage: pagination.currentPage,
        perPage: 10,
        count: pagination.count
      })
    } catch {
      toast({ message: 'Erro ao buscar produtos', type: 'error' })
    } finally {
      setLoadingProducts(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await categoryRepository.getProductCategories(
        store?.id || ''
      )

      setCategories(data)
    } catch {
      toast({ message: 'Erro ao buscar categorias', type: 'error' })
    }
  }

  const loadData = async () => {
    loadProducts()

    loadCategories()

    try {
      const data = await couponRepository.getCoupon()

      setCupons(data)
    } catch {
      toast({ message: 'Erro ao buscar cupons', type: 'error' })
    }
  }

  const [privateCupom, togglePrivateCupom] = useToggleState(false)
  const [discountType, setDiscountType] = useState('money')
  const [ilimitedCupom, toggleIlimitedCupom] = useToggleState(false)

  const [price, setPrice] = useState('0')
  const [priceWithDiscount, setPriceWithDiscount] = useState('0')
  const [discount, setDiscount] = useState('0')

  function updateDiscount(discount: string) {
    const newPrice =
      formatToNumber(price) -
      formatToNumber(price) * (formatToNumber(discount) / 100)
    setDiscount(discount)
    setPriceWithDiscount(
      String(Number(discount) > 0 && Number(newPrice) > 0 ? newPrice : 0)
    )
  }

  useEffect(() => {
    if (enableDiscount) updateDiscount(discount)
  }, [price])

  useEffect(() => {
    if (store?.id) loadProducts()
  }, [productsPagination.currentPage])

  useEffect(() => {
    if (!activeCupom) return
    setDiscountType(activeCupom.type)
    setDiscountPorcent(activeCupom.discountPorcent)
    setValidate(activeCupom.validate)
    setMaxUsage(activeCupom.maxUsage)
    if (!activeCupom.maxUsage && !ilimitedCupom) toggleIlimitedCupom()
    setCupomCode(activeCupom.code)
    setDiscountCategory(activeCupom.range)
  }, [activeCupom])

  useEffect(() => {
    if (!isLoading) {
      if (store) loadData()
      else Router.push('/')
    }
  }, [isLoading])

  return (
    <>
      <Head>
        <title> Catálogo | Boa de Venda </title>
      </Head>

      <Modal
        setModalOpen={() => {
          toggleExcludeCategoryModal()
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
            <button onClick={toggleExcludeCategoryModal} className='cancel-btn'>
              Cancelar
            </button>
          </div>
        </ExcludeModalContainer>
      </Modal>

      <Modal
        setModalOpen={toggleDeleteCupomModal}
        modalVisible={deleteCupomModal}
      >
        <ExcludeModalContainer>
          <h1>
            Realmente deseja excluir definitivamente o cupom{' '}
            <strong>{activeCupom?.code}</strong>?
          </h1>

          <div className='btn-container'>
            <button
              onClick={() => {
                if (activeCupom.id) {
                  handleDeleteCupom(activeCupom.id)
                }
              }}
              className='exclude-btn'
            >
              Confirmar
            </button>
            <button onClick={toggleDeleteCupomModal} className='cancel-btn'>
              Cancelar
            </button>
          </div>
        </ExcludeModalContainer>
      </Modal>

      <Modal
        showCloseButton={true}
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
        title='Adicionar Categoria'
        showCloseButton={true}
        setModalOpen={toggleAddCategoryModal}
        modalVisible={addCategoryModal}
      >
        <AddCategoryModalContainer>
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
        title='Editar categoria'
        showCloseButton={true}
        setModalOpen={toggleEditCategoryModal}
        modalVisible={editCategoryModal}
      >
        <EditCategoryModalContainer>
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
        showCloseButton={true}
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
                name='title'
                register={register}
              />

              <Textarea
                label='Descrição do produto'
                maxLength={600}
                placeholder='Descrição'
                icon={<GiHamburgerMenu />}
                name='description'
                register={register}
              />

              <div className='row'>
                <Input
                  label='Preço'
                  icon={<FaMoneyBill />}
                  placeholder='R$ 0'
                  mask='monetaryBRL'
                  name='price'
                  register={register}
                  onValueChange={setPrice}
                />

                <MultiSelect
                  label='Parcelamento'
                  isMulti={false}
                  options={productParcels}
                  selectedValue={installments}
                  setSelectedValue={setInstallments}
                  placeholder='Selecione o número de parcelas'
                />
              </div>

              <div className='desconto'>
                <Input
                  label='Desconto'
                  disabled={!enableDiscount}
                  icon={<FaPercentage />}
                  placeholder='0.0%'
                  value={discount}
                  name='discount'
                  register={register}
                  onChange={(e) => updateDiscount(e.target.value)}
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
                  name='inventory'
                  register={register}
                />
              </div>

              <MultiSelect
                label='Categorias'
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name
                }))}
                placeholder='Suas categorias'
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
        showCloseButton={true}
        setModalOpen={toggleEditModal}
        modalVisible={editModal}
      >
        <AddProductModalContainer onSubmit={handleSubmit(handleUpdateProduct)}>
          <h1 className='titulo-cadastro'>Editar Produto</h1>
          <div className='input-infos'>
            <div className='left-area'>
              <Input
                label='Nome do produto'
                icon={<FiBox />}
                placeholder='Nome do produto'
                defaultValue={activeProduct.title}
                name='title'
                register={register}
              />

              <Textarea
                label='Descrição do produto'
                maxLength={600}
                placeholder='Descrição'
                icon={<GiHamburgerMenu />}
                defaultValue={activeProduct.description}
                name='description'
                register={register}
              />

              <div className='row-edit'>
                <Input
                  label='Preço'
                  icon={<FaMoneyBill />}
                  placeholder='R$ 0'
                  mask='monetaryBRL'
                  defaultValue={activeProduct.price}
                  name='price'
                  register={register}
                  onValueChange={setPrice}
                />

                <MultiSelect
                  label='Parcelamento'
                  isMulti={false}
                  options={productParcels}
                  selectedValue={installments}
                  setSelectedValue={setInstallments}
                  placeholder='Selecione o número de parcelas'
                />
              </div>

              <div className='desconto'>
                <Input
                  label='Desconto'
                  disabled={!enableDiscount}
                  icon={<FaPercentage />}
                  placeholder='0.0%'
                  defaultValue={activeProduct.discount}
                  name='discount'
                  register={register}
                  onChange={(e) => updateDiscount(e.target.value)}
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
                  defaultValue={activeProduct.inventory}
                  name='inventory'
                  register={register}
                />
              </div>

              <MultiSelect
                label='Categorias'
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories}
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
            <Button type='button' skin='secondary' onClick={toggleEditModal}>
              Voltar
            </Button>

            <Button type='submit'>Salvar</Button>
          </div>
        </AddProductModalContainer>
      </Modal>

      <Modal
        showCloseButton={true}
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
                    id='money'
                    value='money'
                    checked={discountType === 'money'}
                    onChange={(e) => setDiscountType(e.target.value)}
                  />
                  <label htmlFor='money'>Real</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='percentage'
                    value='percentage'
                    checked={discountType === 'percentage'}
                    onChange={(e) => setDiscountType(e.target.value)}
                  />
                  <label htmlFor='percentage'>Porcentagem</label>
                </div>
              </div>

              <Input
                label='Valor do desconto'
                icon={<FaMoneyBill />}
                placeholder={discountType === 'money' ? 'R$ 0' : '0 %'}
                mask={discountType === 'money' ? 'monetaryBRL' : 'percent'}
                value={discountPorcent}
                onValueChange={setDiscountPorcent}
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
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value)}
                />
              </div>

              <div className='radio-area'>
                <input
                  type='checkbox'
                  id='ilim'
                  onClick={toggleIlimitedCupom}
                />
                <label htmlFor='ilim'>Cupons ilimitados</label>
              </div>

              <div className='row'>
                <Input
                  label='Nome do cupom'
                  placeholder='Nome do cupom'
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
                  <input
                    type='radio'
                    id='discount-category'
                    value='category'
                    checked={discountCategory === 'category'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='discount-category'>Categoria</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='discount-all'
                    value='all'
                    checked={discountCategory === 'all'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='discount-all'>Toda a loja</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='discount-first'
                    value='first'
                    checked={discountCategory === 'first'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='discount-first'>Primeira compra</label>
                </div>
              </div>

              <MultiSelect
                label='Categorias'
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories}
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

              <div className='radio-area'>
                <input
                  type='checkbox'
                  id='priv'
                  checked={privateCupom}
                  onChange={() => togglePrivateCupom()}
                />
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
        showCloseButton={true}
        setModalOpen={toggleEditCupomModal}
        modalVisible={editCupomModal}
      >
        <AddProductModalContainer>
          <h1 className='titulo-cadastro'>
            Editar Cupom <strong>{activeCupom?.code}</strong>
          </h1>
          <div className='input-infos'>
            <div className='left-area'>
              <div className='radio-area'>
                <span>Valor do desconto</span>
                <div className='radio-container'>
                  <input
                    type='radio'
                    id='money'
                    value='money'
                    checked={discountType === 'money'}
                    onChange={(e) => setDiscountType(e.target.value)}
                  />
                  <label htmlFor='money'>Real</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='percentage'
                    value='percentage'
                    checked={discountType === 'percentage'}
                    onChange={(e) => setDiscountType(e.target.value)}
                  />
                  <label htmlFor='percentage'>Porcentagem</label>
                </div>
              </div>

              <Input
                label='Valor do desconto'
                icon={<FaMoneyBill />}
                placeholder={discountType === 'money' ? 'R$ 0' : '0 %'}
                mask={discountType === 'money' ? 'monetaryBRL' : 'percent'}
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
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value)}
                />
              </div>

              <div className='radio-area'>
                <input
                  type='checkbox'
                  id='ilim'
                  onClick={toggleIlimitedCupom}
                />
                <label htmlFor='ilim'>Cupons ilimitados</label>
              </div>

              <div className='row'>
                <Input
                  label='Nome do cupom'
                  placeholder='Nome do cupom'
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
                  <input
                    type='radio'
                    id='discount-category'
                    value='category'
                    checked={discountCategory === 'category'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='discount-category'>Categoria</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='store'
                    value='store'
                    checked={discountCategory === 'store'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='store'>Toda a loja</label>
                </div>

                <div className='radio-container'>
                  <input
                    type='radio'
                    id='discount-first'
                    value='first'
                    checked={discountCategory === 'first'}
                    onChange={(e) => setDiscountCategory(e.target.value)}
                  />
                  <label htmlFor='discount-first'>Primeira compra</label>
                </div>
              </div>

              <MultiSelect
                label='Categorias'
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name
                }))}
                placeholder='Suas categorias'
                selectedValue={selectedCategories}
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

              <div className='radio-area'>
                <input
                  type='checkbox'
                  id='priv'
                  checked={privateCupom}
                  onChange={() => togglePrivateCupom()}
                />
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
              onClick={toggleEditCupomModal}
              type='submit'
            >
              Voltar
            </Button>

            <Button type='button' onClick={handleUpdateCupom}>
              Atualizar
            </Button>
          </div>
        </AddProductModalContainer>
      </Modal>

      <Modal
        setModalOpen={() => setPreviewImage('')}
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
            <Button onClick={() => setPreviewImage('')}>Cancelar</Button>
            <Button onClick={() => startCrop(currentImage)}>Recortar</Button>
          </section>
        </CropModalContainer>
      </Modal>

      <Dashboard>
        {isLoading && !store ? (
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
                      setDiscount('0')
                      setPriceWithDiscount('0')
                      if (toggleState === 1) toggleAddModal()
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                          products
                            .filter(
                              ({ title }: any) =>
                                title &&
                                title
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                            )
                            .map((product: any) => (
                              <ProductListCard
                                key={product?.id}
                                icon={product?.files[0]?.url}
                                name={product?.title}
                                code={product?.id}
                                category={product?.categories?.join(', ')}
                                amount={product?.inventory}
                                price={product?.price}
                                excludeBtn={() => {
                                  toggleExcludeModal()
                                  setDeleteProductId(product.id)
                                }}
                                editBtn={() => {
                                  editProduct(product)
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
                                <Button onClick={toggleAddModal}>
                                  Cadastrar
                                </Button>
                              </div>
                            )}
                          </EmptyContainer>
                        )}

                        {!loadingProducts && (
                          <div style={{ margin: '0 auto' }}>
                            <Pagination
                              onPageChange={() =>
                                setProductsPagination({
                                  ...productsPagination,
                                  currentPage:
                                    productsPagination.currentPage + 1
                                })
                              }
                              currentPage={productsPagination.currentPage}
                              totalCountOfRegisters={productsPagination.count}
                              registersPerPage={productsPagination.perPage}
                            />
                          </div>
                        )}
                      </div>
                    }
                    content2={
                      <div className='categories-container'>
                        {categories.length ? (
                          categories
                            .filter(
                              ({ name }: any) =>
                                name &&
                                name
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                            )
                            .map((category) => (
                              <CategoryListCard
                                key={category.id}
                                date={products
                                  .filter((product) =>
                                    product.categories?.includes(category.name)
                                  )
                                  .map((data: any) => {
                                    return {
                                      name: data.title,
                                      amount: String(data.inventory)
                                    }
                                  })}
                                category={category.name}
                                excludeBtn={() => {
                                  setDeleteCategoryId(category.id)
                                  toggleExcludeCategoryModal()
                                }}
                                editBtn={() => {
                                  setEditCategoryId(category.id)
                                  toggleEditCategoryModal()
                                }}
                                isGreen={true}
                                isRed={true}
                              />
                            ))
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
                        {cupons.length ? (
                          cupons
                            .filter(
                              ({ code }: any) =>
                                code &&
                                code
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                            )
                            .map((it, i) => (
                              <CupomItem
                                key={i}
                                code={it.code}
                                info={`Desconto de ${it.discountPorcent} com o máximo de usos: ${it.maxUsage}`}
                                excludeBtn={() => {
                                  setActiveCupom(it)
                                  toggleDeleteCupomModal()
                                }}
                                editBtn={() => {
                                  setActiveCupom(it)
                                  toggleEditCupomModal()
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
        )}
      </Dashboard>
    </>
  )
}

export default CatalogPage
