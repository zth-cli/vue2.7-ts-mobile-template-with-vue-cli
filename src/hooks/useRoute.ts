import { getCurrentInstance } from 'vue'
import { Route } from 'vue-router'
export const useRoute = () => {
  const route: Route = getCurrentInstance()?.proxy.$route
  return { route }
}