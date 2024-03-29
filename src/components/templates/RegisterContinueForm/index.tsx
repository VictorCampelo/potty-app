import React, { useEffect, useState } from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'

import toast from '@/utils/toast'
import findCep from 'cep-promise'

import AuthRepository from '@/repositories/AuthRepository'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Wrapper } from './styles'
import { useAuth } from '@/contexts/AuthContext'

import { FiUser } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FaHome } from 'react-icons/fa'
import { BiBuildings, BiMapAlt } from 'react-icons/bi'

import type { SignUpDTO } from '@/@types/requests'

const authRepository = new AuthRepository()

const RegisterForm = () => {
  const { signUpMeta, clearSignUpMeta } = useAuth()

  const signUpFormSchema = yup.object().shape({
    firstName: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    state: yup.string().required('Estado é obrigatório'),
    city: yup.string().required('Cidade obrigatória'),
    street: yup.string().required('Logradouro é obrigatório'),
    addressNumber: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    cep: yup
      .string()
      .required('CEP é obrigatório')
      .min(9, 'Mínimo 8 caracteres'),
    complement: yup.string().required('Complemento é obrigatório')
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  const handleSignUp = async (dto: any) => {
    try {
      if (!signUpMeta) return await Router.push('/cadastro')

      const data: SignUpDTO = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        city: dto.city,
        uf: dto.state,
        street: dto.street,
        addressNumber: Number(dto.addressNumber),
        neighborhood: dto.neighborhood,
        zipcode: dto.cep,
        complement: dto.complement,
        email: signUpMeta?.email,
        password: signUpMeta?.password,
        passwordConfirmation: signUpMeta?.password
      }

      await authRepository.singUp(data)

      clearSignUpMeta()

      await Router.push('/verificar-conta')
    } catch {
      toast({
        message: 'Algo deu errado!',
        type: 'error'
      })
    }
  }

  const autoCompleteWithCep = async (cep: string) => {
    try {
      if (cep.length < 9) return
      const { city, neighborhood, state, street } = await findCep(
        cep.replace(/\D/g, '')
      )
      setValue('city', city)
      setValue('neighborhood', neighborhood)
      setValue('state', state)
      setValue('street', street)
    } catch {}
  }

  useEffect(() => {
    if (!signUpMeta) Router.push('/cadastro')
  }, [])

  return (
    <Wrapper onSubmit={handleSubmit(handleSignUp)}>
      <div className='container'>
        <div className='column'>
          <Input
            label='Nome'
            name='firstName'
            placeholder='Seu nome'
            icon={<FiUser size={20} color='var(--black-800)' />}
            register={register}
            errors={errors}
          />

          <Input
            label='Sobrenome'
            name='lastName'
            placeholder='Seu sobrenome'
            icon={<FiUser size={20} color='var(--black-800)' />}
            register={register}
            errors={errors}
          />

          <div className='row'>
            <Input
              label='CEP'
              name='cep'
              mask='cep'
              placeholder='00000-000'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              onChange={(e) => autoCompleteWithCep(e.target.value)}
              register={register}
              errors={errors}
            />

            <Input
              label='Bairro'
              name='neighborhood'
              placeholder='Bairro'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div className='column'>
          <div className='row'>
            <Input
              label='Estado'
              name='state'
              placeholder='Estado'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              register={register}
              errors={errors}
            />

            <Input
              label='Cidade'
              name='city'
              placeholder='Cidade'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              register={register}
              errors={errors}
            />
          </div>

          <div className='row-flex'>
            <Input
              fullWidth={true}
              label='Logradouro'
              name='street'
              placeholder='Logradouro'
              icon={<FaHome size={20} color='var(--black-800)' />}
              register={register}
              errors={errors}
            />

            <div style={{ maxWidth: '130px' }}>
              <Input
                label='Número'
                type='number'
                name='addressNumber'
                mask='number'
                placeholder='Número'
                icon={<BiBuildings size={20} color='var(--black-800)' />}
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <Input
            label='Complemento'
            name='complement'
            placeholder='Complemento'
            icon={<BiBuildings size={20} color='var(--black-800)' />}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <Checkbox
          confirm={acceptPrivacy}
          toggleConfirm={() => setAcceptPrivacy(!acceptPrivacy)}
        >
          Li e concordo com os termos de uso e política de privacidade
        </Checkbox>

        <div className='row buttonsContainer'>
          <Button
            skin='secondary'
            type='button'
            onClick={() => Router.push('/cadastro')}
          >
            Voltar
          </Button>

          <Button
            disabled={!acceptPrivacy}
            isLoading={isSubmitting}
            type='submit'
          >
            Finalizar
          </Button>
        </div>
      </div>
    </Wrapper>
  )
}

export default RegisterForm
