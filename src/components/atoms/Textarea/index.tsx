import React from 'react'

import { Container } from './styles'

import type { UseFormRegisterReturn, FieldErrors } from 'react-hook-form'

interface TextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  errors?: FieldErrors
  icon?: React.ReactElement
  register?: (name: string) => UseFormRegisterReturn
}

const Textarea = ({
  name,
  label,
  icon,
  errors,
  register,
  ...rest
}: TextArea) => {
  const registerProps = register && name ? register(name) : null

  const errorMessage = errors && name ? errors[name]?.message : ''

  return (
    <Container error={!!errorMessage.length}>
      <section className='labelContent'>
        <label>{label}</label>

        {errorMessage && <span>{errorMessage}</span>}
      </section>

      <label className='inputContainter'>
        {!!icon && icon}

        <textarea placeholder={rest.placeholder} {...registerProps} {...rest} />
      </label>
    </Container>
  )
}

export default Textarea
