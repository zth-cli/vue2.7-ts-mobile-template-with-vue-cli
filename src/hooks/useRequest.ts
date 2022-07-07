import { ref } from 'vue'

/**
 * 统一处理api返回结果.
 *
 * @param api
 * @rerurn Promise
 */
export function useRequest(api: (arg0: any) => Promise<any>) {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(null)

  const fetchResource = async (params?: any) => {
    loading.value = true
    try {
      try {
        const data = await api(params)
        // 按照约定，api返回的结果直接复制给result
        result.value = data
        return data
      } catch (e) {
        error.value = e
      }
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    error,
    result,
    fetchResource,
  }
}
