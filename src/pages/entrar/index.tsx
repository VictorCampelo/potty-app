import Link from 'next/link'

import AuthPage from '@/components/templates/AuthPage'
import LoginForm from '@/components/templates/LoginForm'

const Login = () => {
  return (
    <AuthPage
      title='Entrar'
      socialAuth={true}
      footer={
        <>
          Não possui conta? <Link href='/cadastro'>Cadastre-se!</Link>
        </>
      }
    >
      <LoginForm />
    </AuthPage>
  )
}

export default Login
