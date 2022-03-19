import React from 'react'

import Router from 'next/router'

import { parseCookies } from 'nookies'

const withAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    if (typeof window !== 'undefined') {
      const { 'bdv.auth.token': token } = parseCookies()

      if (!token) {
        Router.replace('/entrar')
        return null
      }

      return <WrappedComponent {...props} />
    }

    return null
  }

  return Auth
}

export default withAuth
