import Header from '@/components/molecules/Header'
import Head from 'next/head'
import Link from 'next/link'
import { Wrapper, ContainerLojist } from '@/styles/pages/preLogin'

import { FiMail, FiUser } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'

import Input from '@/components/atoms/Input'
import Checkbox from '@/components/atoms/Checkbox'
import Button from '@/components/atoms/Button'

import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { BiBuildings, BiMapAlt } from 'react-icons/bi'
import Router from 'next/router'
import { ShopkeeperContext } from '@/contexts/ShopkeeperContext'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMedia } from 'use-media'
import router from 'next/router'
import cep from 'cep-promise'

type bussinesRegisterFormData = {
  firstName: string
  lastName: string
  businessName: string
  cpfCnpj: string
  businessState: string
  businessCity: string
  publicPlace: string
  number: string
  district: string
  cep: string
}

type CepProps = {
  cep: string
  city: string
  neighborhood: string
  service: string
  state: string
  street: string
}

const bussinesRegisterFormSchema = yup.object().shape({
  firstName: yup.string().required('Primeiro nome obrigatório'),
  lastName: yup.string().required('Último nome obrigatório'),
  businessName: yup.string().required('Nome do negócio obrigatório'),
  cpfCnpj: yup
    .string()
    .required('CPF ou CNPJ obrigatório')
    .min(14, 'Mínimo 14 caracteres [CPF]')
    .max(18),
  businessState: yup.string().required('Estado obrigatório'),
  businessCity: yup.string().required('Cidade obrigatória'),
  publicPlace: yup.string().required('Logradouro obrigatório'),
  number: yup.string().required('obrigatório'),
  district: yup.string().required('Bairro obrigatório'),
  cep: yup.string().required('CEP obrigatório').min(9, 'Mínimo 8 caracteres')
})

const BusinessRegister = () => {
  const { setStore, setUser, userDto, storeDto } = useContext(ShopkeeperContext)
  const [cpfCnpj, setCpfCnpj] = useState('')

  // Estados, funções e variáveis referentes a responsividade da tela
  const [show, setShow] = useState(0)
  const widthScreen = useMedia({ minWidth: '426px' })

  function showNext() {
    setShow(show + 1)
  }

  function showPrevious() {
    setShow(show - 1)
  }

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('data') || '{}')
    const user = JSON.parse(sessionStorage.getItem('user') || '{}')

    if (data) {
      setValue('businessName', data.name)
      setValue('cpfCnpj', data.CNPJ)
      setValue('publicPlace', data.publicPlace)
      setValue('cep', data.cep)
      setValue('district', data.district)
      setValue('number', data.number)
      setValue('businessCity', data.city)
      setValue('businessState', data.state)
    }

    if (user) {
      if (user['firstName'] && user['lastName']) {
        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)

        setUser({
          ...user,
          firstName: user.firstName,
          lastName: user.lastName
        })
      }
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: yupResolver(bussinesRegisterFormSchema)
  })

  const handleContinueRegister = async (values: any) => {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}')

    const store = {
      name: values.businessName,
      CNPJ: values.cpfCnpj,
      city: values.businessCity,
      state: values.businessState,
      publicPlace: values.publicPlace,
      number: values.number,
      district: values.district,
      cep: values.cep
    }

    sessionStorage.setItem('data', JSON.stringify(store))
    setStore(store)

    const user = {
      ...userData,
      firstName: values.firstName,
      lastName: values.lastName
    }
    setUser(user)

    sessionStorage.setItem('user', JSON.stringify(user))
    Router.push('/business-register/continue')
  }

  function formatCep(cep: string) {
    let formattedCep = ''
    let temporaryCep = ''

    if (cep.length > 8 && cep.length < 10) {
      for (let i = 0; i < cep.length; i++) {
        if (cep[i] != '-') {
          temporaryCep += cep[i]
        }
      }
      formattedCep = temporaryCep
      loadCep(formattedCep)
    }
  }

  async function loadCep(cepFind: string) {
    try {
      const res: CepProps = await cep(cepFind)

      setValue('businessCity', res?.city)
      setValue('businessState', res?.state)
      setValue('publicPlace', res?.street)
      setValue('district', res?.neighborhood)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <Head>
        <title> Registro de Negócio | Último</title>
      </Head>

      <Header />
      <ContainerLojist>
        <form onSubmit={handleSubmit(handleContinueRegister)}>
          <div className='title'>
            <h1> Registro de Negócio </h1>
          </div>
          {widthScreen ? (
            <div className='inputContainer'>
              <div>
                <div className='inputCol'>
                  <Input
                    label='Nome do negócio'
                    placeholder='Nome do negócio'
                    icon={<FiMail size={20} color='var(--black-800)' />}
                    {...register('businessName')}
                    errors={errors.businessName}
                    maxLength={45}
                  />
                </div>
                <div className='inputRow'>
                  <Input
                    label='Nome do lojista'
                    placeholder='Nome'
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('firstName')}
                    errors={errors.firstName}
                    maxLength={45}
                  />

                  <Input
                    label='Sobrenome do lojista'
                    placeholder='Sobrenome'
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('lastName')}
                    errors={errors.lastName}
                    maxLength={45}
                  />
                </div>
                <div className='inputCol'>
                  <Input
                    label='CPF/CNPJ'
                    placeholder='000.000.000-00'
                    mask={cpfCnpj.length <= 14 ? 'cpf' : 'cnpj'}
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('cpfCnpj')}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    errors={errors.cpfCnpj}
                    maxLength={45}
                  />
                </div>
              </div>
              <div>
                <div className='inputRow'>
                  <Input
                    label='CEP'
                    placeholder='00000-000'
                    mask='cep'
                    icon={<BiMapAlt size={20} color='var(--black-800)' />}
                    {...register('cep')}
                    errors={errors.cep}
                    maxLength={45}
                    onChange={(e) => formatCep(e.target.value)}
                  />

                  <Input
                    label='Bairro'
                    placeholder='Bairro'
                    icon={<BiMapAlt size={20} color='var(--black-800)' />}
                    {...register('district')}
                    errors={errors.district}
                    maxLength={45}
                  />
                </div>

                <div className='inputRow'>
                  <Input
                    label='Logradouro'
                    placeholder='Logradouro'
                    icon={<FaHome size={20} color='var(--black-800)' />}
                    {...register('publicPlace')}
                    errors={errors.publicPlace}
                    maxLength={45}
                  />

                  <Input
                    label='Número'
                    placeholder='0000'
                    mask='number'
                    type='numeric'
                    maxLength={6}
                    icon={<BiBuildings size={20} color='var(--black-800)' />}
                    {...register('number')}
                    errors={errors.number}
                  />
                </div>

                <div className='inputRow'>
                  <Input
                    label='Estado'
                    placeholder='Estado'
                    icon={
                      <HiOutlineLocationMarker
                        size={20}
                        color='var(--black-800)'
                      />
                    }
                    {...register('businessState')}
                    errors={errors.businessState}
                    maxLength={45}
                  />

                  <Input
                    label='Cidade'
                    placeholder='Cidade'
                    icon={
                      <HiOutlineLocationMarker
                        size={20}
                        color='var(--black-800)'
                      />
                    }
                    {...register('businessCity')}
                    errors={errors.businessCity}
                    maxLength={45}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='inputContainer'>
              <div style={show === 0 ? undefined : { display: 'none' }}>
                <div className='inputCol'>
                  <Input
                    label='Nome do negócio'
                    placeholder='Nome do negócio'
                    icon={<FiMail size={20} color='var(--black-800)' />}
                    {...register('businessName')}
                    errors={errors.businessName}
                    maxLength={45}
                  />
                </div>
                <div className='inputRow'>
                  <Input
                    label='Nome do Lojista'
                    placeholder='Nome'
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('firstName')}
                    errors={errors.firstName}
                    maxLength={45}
                  />

                  <Input
                    label='Sobrenome do Lojista'
                    placeholder='Sobrenome'
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('lastName')}
                    errors={errors.lastName}
                    maxLength={45}
                  />
                </div>
                <div className='inputCol'>
                  <Input
                    label='CPF/CNPJ'
                    placeholder='000.000.000-00'
                    mask={cpfCnpj.length <= 14 ? 'cpf' : 'cnpj'}
                    icon={<FiUser size={20} color='var(--black-800)' />}
                    {...register('cpfCnpj')}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    errors={errors.cpfCnpj}
                    maxLength={45}
                  />
                </div>
              </div>
              <div style={show === 1 ? undefined : { display: 'none' }}>
                <div className='inputRow'>
                  <Input
                    label='CEP'
                    placeholder='00000-000'
                    mask='cep'
                    icon={<BiMapAlt size={20} color='var(--black-800)' />}
                    {...register('cep')}
                    errors={errors.cep}
                    maxLength={45}
                    onChange={(e) => formatCep(e.target.value)}
                  />

                  <Input
                    label='Estado'
                    placeholder='Estado'
                    icon={
                      <HiOutlineLocationMarker
                        size={20}
                        color='var(--black-800)'
                      />
                    }
                    {...register('businessState')}
                    errors={errors.businessState}
                    maxLength={45}
                  />
                </div>

                <div className='inputRow'>
                  <Input
                    label='Cidade'
                    placeholder='Cidade'
                    icon={
                      <HiOutlineLocationMarker
                        size={20}
                        color='var(--black-800)'
                      />
                    }
                    {...register('businessCity')}
                    errors={errors.businessCity}
                    maxLength={45}
                  />

                  <Input
                    label='Número'
                    placeholder='0000'
                    mask='number'
                    type='numeric'
                    maxLength={6}
                    icon={<BiBuildings size={20} color='var(--black-800)' />}
                    {...register('number')}
                    errors={errors.number}
                  />
                </div>

                <div className='inputCol'>
                  <Input
                    label='Bairro'
                    placeholder='Bairro'
                    icon={<BiMapAlt size={20} color='var(--black-800)' />}
                    {...register('district')}
                    errors={errors.district}
                  />
                </div>
                <div>
                  <Input
                    label='Logradouro'
                    placeholder='Logradouro'
                    icon={<FaHome size={20} color='var(--black-800)' />}
                    {...register('publicPlace')}
                    errors={errors.publicPlace}
                  />
                </div>
              </div>
            </div>
          )}

          {widthScreen ? (
            <div className='buttonContainer'>
              <div>
                <Button
                  onClick={() => router.push('/cadastro/lojista')}
                  title='Voltar'
                  type='button'
                />
              </div>
              <div style={{ marginRight: '1rem' }}>
                <Button type='submit' title='CONTINUAR' />
              </div>
            </div>
          ) : (
            <div className='buttonContainer'>
              <div style={{ marginBottom: '1rem' }}>
                {show >= 2 ? (
                  <Button type='submit' title='CONTINUAR' />
                ) : (
                  <Button type='button' onClick={showNext} title='CONTINUAR' />
                )}
              </div>
              <div>
                <Button
                  onClick={
                    show != 0
                      ? showPrevious
                      : () => router.push('/cadastro/lojista')
                  }
                  title='VOLTAR'
                  type='button'
                />
              </div>
            </div>
          )}

          <Link href='/login'>
            <a style={{ marginTop: '1rem' }}>
              Já possui conta?{' '}
              <strong style={{ textDecoration: 'underline' }}>
                faça login!
              </strong>
            </a>
          </Link>
        </form>
      </ContainerLojist>
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
    </Wrapper>
  )
}

export default BusinessRegister
