/*
 * @Author: 阮志雄
 * @Date: 2022-06-25 20:23:44
 * @LastEditTime: 2022-06-25 20:30:52
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \service-control-risk-app-vue2\src\utils\http\config.ts
 */
import { AxiosRequestConfig } from 'axios'

export type RequestConfig = AxiosRequestConfig & { parallel?: boolean }

export const defaultConfig: AxiosRequestConfig = {
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig
  }
  const { headers } = config
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers,
    }
  }
  return { ...defaultConfig }
}

export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch']
