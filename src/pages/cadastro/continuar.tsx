import Link from 'next/link'

import AuthPage from '@/components/templates/AuthPage'
import RegisterContinueForm from '@/components/templates/RegisterContinueForm'

const RegisterContinue = () => {
  return (
    <AuthPage
      size='xl'
      title='Continuar Cadastro'
      footer={
        <>
          Já possui conta? <Link href='/entrar'>Entre agora!</Link>
        </>
      }
    >
      <RegisterContinueForm />
    </AuthPage>
  )
}

export default RegisterContinue
