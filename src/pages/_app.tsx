import Head from 'next/head'
import Script from 'next/script'

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
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-PZVRKLPMDN'
        />
        <Script
          id='gtag-script'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-PZVRKLPMDN');
            `
          }}
        />
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
