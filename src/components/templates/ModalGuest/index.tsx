import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import Modal from '@/components/molecules/Modal'
import { ModalContainer } from '@/styles/pages/cart/continue'
import Input from '@/components/atoms/Input'
import { BiBuildings, BiMapAlt } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Button from '@/components/atoms/Button'
import React from 'react'
import { FiUser } from 'react-icons/fi'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const ModalGuest = ({ isOpen, onClose, onSubmit }: Props) => {
  const schema = yup.object().shape({
    firstName: yup.string().required('Nome obrigatório'),
    lastName: yup.string(),
    uf: yup.string().required('Estado obrigatório'),
    city: yup.string().required('Cidade obrigatória'),
    street: yup.string().required('Logradouro obrigatório'),
    addressNumber: yup.string().required('Número obrigatório'),
    neighborhood: yup.string().required('Bairro obrigatório'),
    zipcode: yup
      .string()
      .required('CEP obrigatório')
      .min(9, 'Mínimo 8 caracteres'),
    complement: yup.string()
  })

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <Modal
      title='Finalização'
      modalVisible={isOpen}
      setModalOpen={onClose}
      showCloseButton={true}
    >
      <ModalContainer>
        <p style={{ margin: '10px 0' }}>
          Para continuar o processo de compra, precisamos de algumas
          informações. Preencha abaixo e já finalizar sua compra.
        </p>

        <form className='input-container' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <Input
              label='Nome'
              placeholder='Seu nome'
              icon={<FiUser size={20} color='var(--black-800)' />}
              name='firstName'
              register={register}
              errors={formState.errors}
            />

            <Input
              label='Sobrenome'
              placeholder='Seu sobrenome'
              icon={<FiUser size={20} color='var(--black-800)' />}
              name='lastName'
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className='row'>
            <Input
              label='CEP'
              placeholder='00000-000'
              mask='cep'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              name='zipcode'
              register={register}
              errors={formState.errors}
              maxLength={9}
            />

            <Input
              label='Bairro'
              placeholder='Bairro'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              name='neighborhood'
              register={register}
              errors={formState.errors}
            />
          </div>

          <div className='row mid'>
            <Input
              label='Logradouro'
              placeholder='Logradouro'
              icon={<FaHome size={20} color='var(--black-800)' />}
              name='street'
              register={register}
              errors={formState.errors}
            />

            <Input
              label='Número'
              placeholder='0000'
              mask='number'
              type='numeric'
              maxLength={6}
              icon={<BiBuildings size={20} color='var(--black-800)' />}
              name='addressNumber'
              register={register}
              errors={formState.errors}
            />
          </div>

          <div className='row'>
            <Input
              label='Cidade'
              placeholder='Cidade'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              name='city'
              register={register}
              errors={formState.errors}
              maxLength={45}
            />

            <Input
              label='Estado'
              placeholder='Estado'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              name='uf'
              register={register}
              errors={formState.errors}
              maxLength={45}
            />
          </div>

          <div className='row'>
            <Input
              label='Complemento'
              placeholder='Complemento'
              name='complement'
              register={register}
              errors={formState.errors}
              maxLength={30}
            />
          </div>

          <div className='buttons-container'>
            <Button type='button' skin='secondary' onClick={onClose}>
              Voltar
            </Button>
            <Button type='submit'>Finalizar</Button>
          </div>
        </form>
      </ModalContainer>
    </Modal>
  )
}

export default ModalGuest
