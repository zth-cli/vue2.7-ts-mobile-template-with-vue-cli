import { ref } from 'vue'

//  防抖

export function useDebounce(cb: Function, delay = 100) {
  const timer = ref<any>(null)

  const debHandler = (...args: any[]) => {
    clearInterval(timer)
    timer.value = setTimeout(() => {
       //@ts-ignore
      cb.apply(this, args)
    }, delay)
  }
  const debCancel = () => {
    clearInterval(timer)
    timer.value = null
  }
  return { debHandler, debCancel }
}
