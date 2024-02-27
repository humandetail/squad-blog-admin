import { useUserStore } from '@/store/user'
import axios, { type AxiosResponse, type AxiosError, type AxiosRequestConfig } from 'axios'
import errorHandler from './errorHandler'
import type { BaseResponse } from '@/types/common'

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL as string,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true // 允许携带cookie
})

instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const { token } = userStore
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status !== 200) {
      errorHandler({ response })
    }

    return await Promise.resolve(response.data)
  },
  async (err: AxiosError) => {
    // 422 响应让业务处理
    if (err.response?.status === 422) {
      return await Promise.resolve(err.response.data)
    }
    errorHandler(err)
    return await Promise.reject(err)
  }
)

export const axiosGet = <T = null, R = BaseResponse<T>>(url: string, config?: AxiosRequestConfig<any>): Promise<R> => {
  return instance.get<T, R>(url, config)
}

export const axiosPost = <T = null, R = BaseResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<any>): Promise<R> => {
  return instance.post<T, R, D>(url, data, config)
}

export const axiosPut = <T = null, R = BaseResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<any>): Promise<R> => {
  return instance.put<T, R, D>(url, data, config)
}

export const axiosDelete = <T = null, R = BaseResponse<T>>(url: string, config?: AxiosRequestConfig<any>): Promise<R> => {
  return instance.delete<T, R>(url, config)
}

export default instance
