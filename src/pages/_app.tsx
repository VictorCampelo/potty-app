import Head from 'next/head'

import { AuthProvider } from '@/contexts/AuthContext'

import GlobalStyle from '@/styles/GlobalStyle'

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
      </AuthProvider>
    </>
  )
}

export default MyApp
