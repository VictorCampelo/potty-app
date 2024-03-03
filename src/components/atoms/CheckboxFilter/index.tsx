import { Container } from './styles'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { ReactNode } from 'react'

interface CheckboxFilterProps {
  confirm: boolean
  toggleConfirm: () => void
  children?: ReactNode
}

export const CheckboxFilter = ({
  confirm,
  toggleConfirm,
  children
}: CheckboxFilterProps) => {
  return (
    <Container confirm={confirm}>
      <div className="check">
        <button
          type="button"
          id="btn"
          className="btn"
          onClick={() => toggleConfirm()}
        >
          {confirm && (
            <BsFillCheckSquareFill
              style={{ width: '100%', height: '100%' }}
              color="var(--color-primary)"
            />
          )}
        </button>
        {children}
      </div>
    </Container>
  )
}
