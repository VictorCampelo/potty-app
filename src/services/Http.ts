import { setup } from 'axios-cache-adapter'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Http {
  protected http: AxiosInstance

  constructor() {
    this.http = setup({
      baseURL: 'https://79ba-2804-782c-300-d00-3ce4-8dbb-9106-7b89.ngrok.io/',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })

    this.http.interceptors.request.use(
      (config: any) => {
        if (typeof window !== 'undefined') {
          const token =
            localStorage.getItem('bdv.auth.token') ||
            sessionStorage.getItem('bdv.auth.token')
          config.headers.common.Authorization = `Bearer ${token}`
        }

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
        if (error.response?.status === 401) {
          localStorage.removeItem('bdv.auth.token')
          sessionStorage.removeItem('bdv.auth.token')
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

  public async patch<T, R>(
    route: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return (await this.http.patch(route, data, config)).data
  }

  public async delete<R>(route: string): Promise<R> {
    return (await this.http.delete(route)).data
  }
}

export default Http
