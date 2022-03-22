import { IoTrashBinOutline } from 'react-icons/io5'
import { RiPencilFill } from 'react-icons/ri'

import { Container, CupomValue, CupomInfo } from './styles'

interface Props {
  code: string
  info: string
  editBtn?: () => void
  excludeBtn?: () => void
}

const CupomItem = ({ code, info, editBtn, excludeBtn }: Props) => {
  return (
    <Container>
      <CupomValue>{code}</CupomValue>

      <CupomInfo>{info}</CupomInfo>

      <div className='buttons-container'>
        <button onClick={editBtn} className='edit-btn'>
          <RiPencilFill size={20} />
        </button>
        <button onClick={excludeBtn} className='close-btn'>
          <IoTrashBinOutline size={20} />
        </button>
      </div>
    </Container>
  )
}

export default CupomItem
