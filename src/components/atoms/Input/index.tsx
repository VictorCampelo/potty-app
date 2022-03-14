import React, { useState } from 'react'
import masks from '@/utils/masks'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { Container } from './styles'

import type { UseFormRegisterReturn, FieldErrors } from 'react-hook-form'
import type { MasksTypes } from '@/utils/masks'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: (name: string) => UseFormRegisterReturn
  errors?: FieldErrors
  label?: string
  password?: boolean
  forgetPassword?: boolean
  icon?: React.ReactElement
  mask?: MasksTypes
}

const Input = ({
  register,
  errors,
  name,
  label,
  type,
  password,
  icon,
  mask,
  disabled,
  ...props
}: Props) => {
  const [isInputVisible, setIsInputVisible] = useState(true)

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (mask) {
      const newValue = masks[mask](event.currentTarget.value)
      event.currentTarget.value = newValue
    }
  }

  if (mask && props.defaultValue) {
    props.defaultValue = masks[mask](props.defaultValue)
  }

  const errorMessage = errors && name ? errors[name]?.message : ''

  const registerProps = register && name ? register(name) : null

  return (
    <Container error={!!errorMessage} disabled={disabled}>
      {label && (
        <section className='labelContent'>
          <label>{label}</label>
        </section>
      )}

      <div className='inputContainer'>
        {!!icon && icon}

        <input
          name={name}
          disabled={disabled}
          type={password && isInputVisible ? 'password' : type}
          onKeyUp={(event) => handleOnChange(event)}
          {...registerProps}
          {...props}
        />

        {password &&
          (isInputVisible ? (
            <AiOutlineEye
              onClick={() => setIsInputVisible(false)}
              size={24}
              color='var(--black-800)'
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setIsInputVisible(true)}
              size={24}
              color='var(--black-800)'
            />
          ))}
      </div>

      {label && errorMessage ? (
        <section className='labelContent'>
          <span className='text-error'>{errorMessage}</span>
        </section>
      ) : null}
    </Container>
  )
}

export default Input
