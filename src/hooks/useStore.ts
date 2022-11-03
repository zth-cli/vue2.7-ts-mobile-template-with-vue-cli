import { getCurrentInstance } from 'vue'
export const useStore = () => {
  const store = getCurrentInstance()?.proxy.$store
  return { store }
}