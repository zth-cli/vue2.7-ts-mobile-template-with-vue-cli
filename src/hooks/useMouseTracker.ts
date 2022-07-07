/*
 * @Author: 阮志雄
 * @Date: 2022-03-07 16:43:45
 * @LastEditTime: 2022-07-07 10:15:16
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue2.7-ts-template\src\hooks\useMouseTracker.ts
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseTracker() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  return { x, y }
}
