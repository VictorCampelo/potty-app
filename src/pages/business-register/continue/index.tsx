import Header from '@/components/molecules/Header'
import Head from 'next/head'
import { Container, ContainerLojist, Wrapper } from '@/styles/pages/preLogin'

import Input from '@/components/atoms/Input'
import { useContext, useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import Router from 'next/router'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiOutlineWhatsApp
} from 'react-icons/ai'
import { ShopkeeperContext } from '@/contexts/ShopkeeperContext'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import useMedia from 'use-media'

type bussinesRegisterFormData = {
  number: string
  facebookUrl: string
  instagramUrl: string
  whatsappUrl: string
}

const bussinesRegisterFormSchema = yup.object().shape({
  number: yup.string().required('Telefone obrigatório'),
  facebookUrl: yup.string(),
  instagramUrl: yup.string(),
  whatsappUrl: yup.string()
})

const BusinessRegister = () => {
  const { setStore, storeDto } = useContext(ShopkeeperContext)

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('data') || '{}')
    if (data) {
      if (data['number']) {
        setValue('number', data.phone)
        setValue('facebookUrl', data.facebook_link)
        setValue('instagramUrl', data.instagram_link)
        setValue('whatsappUrl', data.whatsapp_link)
      }
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(bussinesRegisterFormSchema)
  })

  const handleFinishRegister = async (values: any) => {
    const storeData = JSON.parse(sessionStorage.getItem('data') || '{}')

    const store = {
      ...storeData,
      phone: values.number,
      facebook_link: values.facebookUrl,
      instagram_link: values.instagramUrl,
      whatsapp_link: values.whatsappUrl
    }
    setStore(store)
    sessionStorage.setItem('data', JSON.stringify(store))

    Router.push('/business-register/finish')
  }

  const widthScreen = useMedia({ minWidth: '426px' })
  return (
    <Wrapper>
      <Head>
        <title> Registro de Negócio | Último</title>
      </Head>

      <Header />
      <Container>
        <form onSubmit={handleSubmit(handleFinishRegister)}>
          <div className='title'>
            <h1> Registro de Negócio </h1>
          </div>

          <div className='inputContainer'>
            <Input
              label='Telefone'
              placeholder='(00) 0000-0000'
              mask='phone'
              {...register('number')}
              errors={errors.number}
              maxLength={45}
            />

            <Input
              label='Facebook'
              placeholder='facebook.com/exemplo'
              {...register('facebookUrl')}
              errors={errors.facebookUrl}
              maxLength={45}
            />

            <Input
              label='Instagram'
              placeholder='instagram.com/exemplo'
              {...register('instagramUrl')}
              errors={errors.instagramUrl}
              maxLength={45}
            />

            <Input
              label='Whatsapp'
              placeholder='wa.me/550000000000'
              {...register('whatsappUrl')}
              errors={errors.whatsappUrl}
              maxLength={45}
            />
          </div>

          <div className='buttonContainer'>
            <div>
              <Button
                onClick={() => {
                  Router.back()
                }}
                title='VOLTAR'
                type='button'
              />
            </div>

            <div
              style={
                widthScreen ? { marginLeft: '1rem' } : { marginBottom: '1rem' }
              }
            >
              <Button type='submit' title='CONTINUAR' />
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
