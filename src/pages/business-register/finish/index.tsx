import Header from '@/components/molecules/Header'
import Head from 'next/head'
import {
  Container,
  TermsModalContainer,
  Wrapper
} from '@/styles/pages/preLogin'

import { DescriptionInput } from '@/components/molecules/DescriptionInput'
import ShopImage from '@/components/molecules/ShopImage'
import { useCallback, useContext, useEffect, useState } from 'react'
import Button from '@/components/atoms/Button'
import { AiFillShop, AiFillCamera } from 'react-icons/ai'
import Router from 'next/router'

import { ShopkeeperContext } from '@/contexts/ShopkeeperContext'
import { toast } from 'react-toastify'
import { Point } from 'react-easy-crop/types'
import getCroppedImg from '../../../functions/cropImage'
import Cropper from 'react-easy-crop'
import { CropModalContainer } from '@/styles/pages/Catalog'
import CustomModal from '@/components/molecules/CustomModal'
import useMedia from 'use-media'
import { CheckboxFilter } from '@/components/atoms/CheckboxFilter'
import { FiX } from 'react-icons/fi'
import TermsUse from '@/components/atoms/TermsUse'

import AuthRepository from '@/repositories/AuthRepository'

type ShopkeeperUser = {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  passwordConfirmation?: string
  chosenPlan?: string
}

const BusinessRegister = () => {
  const authRepository = new AuthRepository()

  const [desc, setDesc] = useState('')
  const [image, setImage] = useState()
  const [previewImage, setPreviewImage] = useState<any>()

  const [zoom, setZoom] = useState<number>(1)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>()
  const rotation = 0

  const [terms, setTerms] = useState(false)
  const [termsModal, setTermsModal] = useState(false)

  const [termsIsAccept, setTermsIsAccept] = useState(false)

  function handleTerms() {
    setTerms(!terms)
    setTermsIsAccept(!termsIsAccept)
  }

  function handleTermsModal() {
    setTermsModal(!termsModal)
  }

  const { userDto, storeDto, setStore } = useContext(ShopkeeperContext)

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem('data') || '{}' || '{}')

    if (storeData) {
      setStore({
        name: storeData.businessName,
        CNPJ: storeData.cpfCnpj,
        city: storeData.businessCity,
        state: storeData.businessState,
        publicPlace: storeData.publicPlace,
        number: storeData.number,
        district: storeData.district,
        cep: storeData.cep,
        phone: storeData.number,
        facebook_link: storeData.facebookUrl,
        instagram_link: storeData.instagramUrl,
        whatsapp_link: storeData.whatsappUrl
      })
    }
  }, [])

  // Toasts
  function notifySuccess(message: string) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  function notify(message: string) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  async function handleFinishRegister() {
    const planData = sessionStorage.getItem('plan')
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}')
    const storeData = JSON.parse(sessionStorage.getItem('data') || '{}')

    const body = {
      avatar: image,
      userDto: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        passwordConfirmation: userData.passwordConfirmation,
        chosenPlan: planData?.toLowerCase()
      },
      storeDto: {
        name: storeData.name,
        CNPJ: storeData.CNPJ,
        phone: storeData.phone,
        city: storeData.city,
        state: storeData.state,
        facebookLink: storeData.facebook_link,
        instagramLink: storeData.instagram_link,
        whatsappLink: storeData.whatsapp_link,
        image: image,
        zipcode: storeData.cep,
        description: desc,
        addressNumber: storeData.number,
        neighborhood: storeData.district,
        street: storeData.publicPlace
      }
    }

    try {
      const formData = new FormData()
      formData.append('avatar', JSON.stringify(body.avatar))
      formData.append('userDto', JSON.stringify(body.userDto))
      formData.append('storeDto', JSON.stringify(body.storeDto))

      const data: any = await authRepository.singUpStore(formData)

      sessionStorage.setItem(
        'AuthTokens',
        JSON.stringify({
          token: data.user.confirmationToken,
          tokenDigits: data.user.confirmationTokenDigits
        })
      )

      if (data.user.planUrl === 'Plan not found') {
        Router.push(`/confirmacao-cadastro`)
      } else {
        window.open(data.user.planUrl, '_blank')
        Router.push(`/confirmacao-cadastro`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Image Crop Modal

  function toggleImageModal() {
    setPreviewImage(!previewImage)
  }

  function onZoomChange(newValue: string) {
    setZoom(Number(newValue))
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  function readFile(file: File) {
    const result = new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
    return result
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = await readFile(e.target.files[0])
      setPreviewImage(file)
    } else {
      toast.success('Selecione apenas 1 imagem pro vez', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  async function cropImage() {
    // Get cropped image file

    const ImageCropped: any = await getCroppedImg(
      previewImage,
      croppedAreaPixels,
      rotation
    )

    try {
      setImage(ImageCropped)
      notifySuccess('Foto recortada com sucesso!')
      setPreviewImage(null)
      toggleImageModal()
    } catch (e) {
      notify('Erro interno favor tentar novamente mais tarde!')
    }
  }

  const widthScreen = useMedia({ minWidth: '426px' })

  return (
    <Wrapper>
      <Head>
        <title> Registro de Negócio | Boa de venda </title>
      </Head>

      <Header />
      <Container>
        {/* Crop Image Modal */}
        <CustomModal
          buttons={false}
          setModalOpen={toggleImageModal}
          modalVisible={previewImage}
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
                    onChange={(e) => onZoomChange(e.target.value)}
                  />
                </div>
              </div>
            </section>
            <section className='btns'>
              <Button title='Cancelar' onClick={toggleImageModal} />
              <Button title='Recortar' onClick={() => cropImage()} />
            </section>
          </CropModalContainer>
        </CustomModal>

        <CustomModal
          buttons={false}
          modalVisible={termsModal}
          setModalOpen={handleTermsModal}
        >
          <TermsModalContainer>
            <div className='title'>
              <h2>Termos e condições</h2>
              <FiX
                size={25}
                onClick={handleTermsModal}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <TermsUse />
            <div className='buttonContainer'>
              <Button title='CONTINUAR' onClick={handleTermsModal} />
            </div>
          </TermsModalContainer>
        </CustomModal>
        <form onSubmit={() => {}}>
          <div className='title'>
            <h1> Registro de Negócio </h1>
          </div>

          <div className='imageContainer'>
            <ShopImage
              imageSrc={image} // Imagem para o perfil do Shop
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
                />
              }
            />
          </div>

          <div className='inputContainer'>
            <DescriptionInput
              label='Descrição do negócio'
              placeholder='Faça uma descrição rápida e útil do seu negócio para seus clientes.'
              value={desc}
              onChange={(text) => setDesc(text.target.value)}
              maxLength={255}
            />
          </div>
          <CheckboxFilter confirm={terms} toggleConfirm={handleTerms}>
            <span>
              Li e concordo com os{' '}
              <a onClick={handleTermsModal}>termos de uso</a> e{' '}
              <a href='#'>política de privacidade</a>
            </span>
          </CheckboxFilter>
          <div className='buttonContainer'>
            <div
              style={
                widthScreen ? { marginRight: '1rem' } : { marginBottom: '1rem' }
              }
            >
              <Button
                type='button'
                onClick={handleFinishRegister}
                title='FINALIZAR'
                disabled={!termsIsAccept}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div>
              <Button
                type='button'
                onClick={() => Router.back()}
                title='VOLTAR'
              />
            </div>
          </div>
        </form>
      </Container>
      <img
        style={{
          position: 'absolute',
          bottom: 0,
          height: '85%',
          left: 0,
          right: 0,
          zIndex: -1,
          width: '100%'
        }}
        src='/images/wave1.svg'
        alt='wave 1'
      />
      <img
        style={{
          position: 'absolute',
          bottom: 0,
          height: '65%',
          left: 0,
          right: 0,
          zIndex: -1,
          width: '100%'
        }}
        src='/images/wave2.svg'
        alt='wave 2'
      />
      <img
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: '55%',
          zIndex: -1
        }}
        src='/images/illustration1.svg'
        alt='illustration 1'
      />
      <img
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '50%',
          zIndex: -1
        }}
        src='/images/illustration2.svg'
        alt='illustration 2'
      />
    </Wrapper>
  )
}

export default BusinessRegister
