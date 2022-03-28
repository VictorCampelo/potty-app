import { useState } from 'react'

const useToggleState = (initialState = false): [boolean, () => void] => {
  const [active, setActive] = useState(initialState)

  const toggle = () => setActive(!active)

  return [active, toggle]
}

export default useToggleState
