import { qs } from '@/utils/qs'
import { http } from '@/utils/http'

// 登录
export async function login(params: { uid: string; pwd: string }) {
  const res = await http.get<{ content: any; message: string; result: number }>(
    '/api/login',
    params
  )
  return res
}
