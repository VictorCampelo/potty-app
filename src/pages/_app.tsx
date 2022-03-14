import Head from 'next/head'

import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'

import GlobalStyle from '@/styles/GlobalStyle'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <AuthProvider>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </>
  )
}

export default MyApp
