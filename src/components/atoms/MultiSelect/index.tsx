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
  selectedValue?: string[] | string | null
  loading: boolean
  setSelectedValue: (option: Option) => void
  options: Option[]
  colorTheme?: string
  creatable?: boolean
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
  colorTheme,
  creatable,
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
    theme: (theme: any) => {
      switch (colorTheme) {
        case 'red':
          return {
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: '#E66072',
              primary75: '#80363F',
              primary50: '#BF505F',
              primary25: '#FF6A7D',
              primary10: '#FF6A7D'
            }
          }
        case 'green':
          return {
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: '#41AB8F',
              primary75: '#59EBC5',
              primary50: '#4FD1AF',
              primary25: '#9EE0DC'
            }
          }
        default:
          return {
            ...theme
          }
      }
    },
    isLoading: loading,
    closeMenuOnSelect: false,
    isMulti: true
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
