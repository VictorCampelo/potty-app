import Link from 'next/link'

import AuthPage from '@/components/templates/AuthPage'
import VerifyAccountForm from '@/components/templates/VerifyAccountForm'

const VerifyAccount = () => {
  return (
    <AuthPage
      title='Verificar conta'
      footer={
        <>
          Não recebeu o código? <br /> <Link href='/'>Reenviar o código!</Link>
        </>
      }
    >
      <VerifyAccountForm />
    </AuthPage>
  )
}

export default VerifyAccount
