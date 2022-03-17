import { setup } from 'axios-cache-adapter'
import { parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Http {
  protected http: AxiosInstance

  constructor() {
    this.http = setup({
      baseURL: 'https://api-dev.boadevenda.com.br',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })

    this.http.interceptors.request.use(
      (config: any) => {
        const { 'bdv.auth.token': token } = parseCookies()

        config.headers.common.Authorization = `Bearer ${token}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.http.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const { 'bdv.auth.token': token } = parseCookies()

        if (error.response?.status === 401 && token) {
          destroyCookie(null, 'bdv.auth.token')
          destroyCookie(null, 'bdv.auth.refreshToken')
          await Router.push('/')
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<R>(route: string, config?: AxiosRequestConfig): Promise<R> {
    return (await this.http.get(route, config)).data
  }

  public async post<T, R>(
    route: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return (await this.http.post(route, data, config)).data
  }

  public async put<T, R>(route: string, data: T): Promise<R> {
    return (await this.http.put(route, data)).data
  }

  public async patch<T, R>(route: string, data: T): Promise<R> {
    return (await this.http.patch(route, data)).data
  }

  public async delete<R>(route: string): Promise<R> {
    return (await this.http.delete(route)).data
  }
}

export default Http
