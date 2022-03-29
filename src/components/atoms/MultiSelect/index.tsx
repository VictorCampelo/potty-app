import React from 'react'
import Select from 'react-select'
import Creatable from 'react-select/creatable'

import { Container, SelectStylesMulti } from './styles'

export interface Option {
  value: string
  label: string
}

interface SelectInterface extends React.InputHTMLAttributes<HTMLSelectElement> {
  placeholder: string
  name: string
  selectedValue?: Option | null
  loading: boolean
  setSelectedValue: (option: any) => void
  options?: Option[]
  creatable?: boolean
  isMulti?: boolean
  formatCreateLabel?: (inputValue: string) => string
  onCreateOption?: (inputValue: string) => void
}

const MultiSelect = ({
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  loading,
  name,
  creatable = false,
  isMulti = true,
  formatCreateLabel,
  onCreateOption
}: SelectInterface) => {
  const props = {
    placeholderButtonLabel: placeholder,
    value: selectedValue,
    onChange: (values: any) => setSelectedValue(values),
    options: options,
    placeholder: placeholder,
    noOptionsMessage: () => 'Nenhum resultado encontrado',
    styles: SelectStylesMulti,
    isLoading: loading,
    isMulti: isMulti
  } as any

  return (
    <Container>
      <label> {name} </label>
      {creatable ? (
        <Creatable
          {...props}
          formatCreateLabel={formatCreateLabel}
          onCreateOption={onCreateOption}
        />
      ) : (
        <Select {...props} />
      )}
    </Container>
  )
}

export default MultiSelect
