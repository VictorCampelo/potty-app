import React from 'react'

import { Container } from './styles'

interface TextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: boolean
  textError?: string
  icon?: React.ReactElement
  flex?: number
}

const Textarea = ({
  label,
  icon,
  error,
  textError = '',
  flex = 1,
  ...rest
}: TextArea) => {
  return (
    <Container flex={flex} error={error}>
      <section className='labelContent'>
        <label>{label}</label>

        {error && textError && <span>{textError}</span>}
      </section>

      <label className='inputContainter'>
        {!!icon && icon}

        <textarea placeholder={rest.placeholder} {...rest} />
      </label>
    </Container>
  )
}

export default Textarea
