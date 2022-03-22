import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'

import { Container } from './styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string
  buttons: boolean
  showCloseButton?: boolean
  modalVisible: boolean
  setModalOpen: () => void
  under?: boolean
  zIndex?: number
}

const customStyles = {
  content: {
    maxWidth: '100%',
    maxHeight: '90vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    color: '#000000',
    borderRadius: '30px',
    border: 'none',
    boxShadow: '0px 0px 20px rgba(54, 63, 78, 0.2)',
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000
  }
}

const customStylesUnder = {
  content: {
    ...customStyles.content,
    bottom: '-50%',
    left: '50%',
    right: 0,
    top: '75%'
  },
  overlay: {
    ...customStyles.overlay
  }
}

const Modal = ({
  title,
  modalVisible,
  setModalOpen,
  under = false,
  zIndex = 1000,
  ...rest
}: Props) => {
  const [visible, setVisible] = useState(false)

  const style = under ? customStylesUnder : customStyles
  style.overlay.zIndex = zIndex

  useEffect(() => {
    setVisible(modalVisible)
  }, [modalVisible])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setModalOpen}
      isOpen={visible}
      ariaHideApp={false}
      style={style}
    >
      <Container under={under}>
        <div className='modal'>
          <h1>{title}</h1>

          {rest.children}
        </div>
      </Container>
    </ReactModal>
  )
}

export default Modal
