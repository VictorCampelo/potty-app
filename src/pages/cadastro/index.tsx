import Link from 'next/link'

import AuthPage from '@/components/templates/AuthPage'
import RegisterForm from '@/components/templates/RegisterForm'

const Register = () => {
  return (
    <AuthPage
      title='Cadastro'
      footer={
        <>
          Já possui conta? <Link href='/entrar'>Entre agora!</Link>
        </>
      }
    >
      <RegisterForm />
    </AuthPage>
  )
}

export default Register
