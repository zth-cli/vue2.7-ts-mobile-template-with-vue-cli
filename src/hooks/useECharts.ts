import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'

import { useTimeoutFn, useEventListener } from '@/hooks'
import { tryOnUnmounted } from '@vueuse/core'
import { unref, nextTick, watch, computed, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import echarts from '@/utils/lib/echarts'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  // const { getDarkMode } = useRootSetting();
  // 主题颜色
  const getDarkMode = ref('light')
  let chartInstance: echarts.ECharts | null = null
  const cacheOptions = ref<EChartsOption>({})
  let removeResizeFn: Fn

  const getOptions = computed((): EChartsOption => {
    // if (getDarkMode !== 'dark') {
    //   return cacheOptions.value
    // }
    // @ts-ignore
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    }
  })

  // 初始化echarts实例，并添加resize侦听事件
  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, t)
    const { removeEvent } = useEventListener({
      el: window,
      eventName: 'resize',
      listener: resize,
    })
    removeResizeFn = removeEvent
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    // dom没有高度
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value as 'default')

          if (!chartInstance) {
            return
          }
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }
  const resize = useDebounceFn(() => {
    chartInstance?.resize()
  }, 200)

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(unref(cacheOptions) as EChartsOption)
      }
    }
  )

  tryOnUnmounted(() => {
    if (!chartInstance) {
      return
    }
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as 'default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
