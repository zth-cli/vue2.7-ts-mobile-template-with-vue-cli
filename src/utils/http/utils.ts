import { RequestConfig } from './config'

// 处理一下post请求与其他请求(get等)传参不一样情况
export function transformConfigByMethod(params: any, config: RequestConfig): RequestConfig {
  const { method } = config
  const bool: boolean = ['delete', 'get', 'head', 'options'].includes(method!.toLocaleLowerCase())
  const props = bool ? 'params' : 'data'
  return {
    ...config,
    [props]: params,
  }
}
