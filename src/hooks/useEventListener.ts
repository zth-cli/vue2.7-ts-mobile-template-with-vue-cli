import type { Ref } from 'vue'

import { ref, watch, unref } from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  eventName: string // 事件名称
  listener: EventListener // 事件侦听执行的函数
  options?: boolean | AddEventListenerOptions // 指定事件是否在捕获或冒泡阶段执行。
  autoRemove?: boolean // 是否在Elment变化后自动清除侦听器
  isDebounce?: boolean // 是否添加防抖，否则节流
  wait?: number // 防抖或者节流时间(ms)
}

export function useEventListener({
  el = window,
  eventName,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): {
  removeEvent: RemoveEventFn
} {
  let removeEvent: RemoveEventFn
  const isAddRef = ref(false)

  if (el) {
    const element: Ref<Element> = ref(el as Element)

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(eventName, realHandler, options)
    }
    const addEventListener = (e: Element) => e.addEventListener(eventName, realHandler, options)

    const removeWatch = watch(
      element,
      (newEl, _ov, cleanUp) => {
        if (newEl) {
          !unref(isAddRef) && addEventListener(newEl)
          cleanUp(() => {
            // 清除副作用
            autoRemove && removeEventListener(newEl)
          })
        }
      },
      { immediate: true }
    )

    removeEvent = () => {
      removeEventListener(element.value)
      removeWatch()
    }
  }
  return { removeEvent }
}
