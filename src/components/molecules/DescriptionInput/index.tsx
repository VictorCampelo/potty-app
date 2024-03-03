import { forwardRef, ForwardRefRenderFunction } from 'react'
import { Container } from './styles'

interface DescriptionInput
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  placeholder: string
  error?: boolean
  textError?: string
  flex?: number
}

const DescriptionInputBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  DescriptionInput
> = (
  {
    label,
    placeholder,
    error,
    textError = '',
    flex = 1,
    ...rest
  }: DescriptionInput,
  ref
) => {
  return (
    <Container flex={flex} error={error}>
      <section className="labelContent">
        <label>{label}</label>

        {error && textError && <span>{textError}</span>}
      </section>

      <label className="inputContainter">
        <textarea
          ref={ref}
          className="textArea"
          maxLength={300}
          placeholder={placeholder}
          {...rest}
        ></textarea>
      </label>
    </Container>
  )
}

export const DescriptionInput = forwardRef(DescriptionInputBase)
