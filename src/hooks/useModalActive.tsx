import { useState } from 'react'

const useActiveModal = (initialState = false): [boolean, () => void] => {
  const [activeModal, setActiveModal] = useState(initialState)

  const toggle = () => setActiveModal(!activeModal)

  return [activeModal, toggle]
}

export default useActiveModal
