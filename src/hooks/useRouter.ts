import { getCurrentInstance } from 'vue'
import VueRouter from 'vue-router'
export const useRouter = () => {
  const router: VueRouter = getCurrentInstance()?.proxy.$router
  return { router }
}