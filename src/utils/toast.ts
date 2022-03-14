import { toast as ToastifyToast } from 'react-toastify'

interface Props {
  message: string
  type: 'success' | 'error'
}

const toast = ({ message, type }: Props) => {
  let toastFunc = null

  if (type === 'success') {
    toastFunc = ToastifyToast.success
  }
  if (type === 'error') {
    toastFunc = ToastifyToast.error
  }

  toastFunc && toastFunc(message)
}

export default toast
