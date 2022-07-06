<template>
  <div
    ref="bottomDrawer"
    class="bottom-drawer"
    @touchstart="touchstartHandler"
    @touchend="touchendHandler"
    @touchmove="touchmoveHandler"
  >
    <div class="handler_bar"></div>
    <div ref="content" class="bottom-drawer-content" @scroll="contentTouchHandeler">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from 'vue'

const props = withDefaults(defineProps<{ proportionvw: number }>(), {
  proportionvw: 0.3,
})

const initRatio = ref(props.proportionvw) // 初始化抽屉的比例
const MAX_RATIO = 100 - props.proportionvw * 100 // 最大抽屉比例
const MIN_RATIO = 5 // 最小抽屉比例
const MAX_THRESHOLD = 180 // 最大抽屉阈值
const MAX_TOUCHTIME = 300 // 最大抽屉按压时间

const bottomDrawer = ref<HTMLDivElement | null>(null) // 抽屉
const bottomDrawerHeight = ref(0) //
const translateY = ref('0%') // 抽屉位置

// 观察proportionvw变化
watch(
  () => props.proportionvw,
  (newVal) => {
    if (newVal >= 1) {
      initRatio.value = 0.95
    } else if (newVal <= 0) {
      initRatio.value = 0.06
    } else {
      initRatio.value = newVal
    }
    translateY.value = (1 - initRatio.value) * 100 + '%'
  },
  { immediate: true }
)

// 获取容器高度
onMounted(() => {
  if (bottomDrawer.value) {
    bottomDrawerHeight.value = bottomDrawer.value.clientHeight
  }
})

const content = ref<HTMLDivElement | null>(null) // 抽屉内容
const contentexHieght = MIN_RATIO + '%' //  抽屉内容高度
const contentScrollTop = ref<number | undefined>(0) // 抽屉内容滚动高度

const startPageX = ref(0)
const endPageX = ref(0)
let startTime = 0
let endTime = 0
// 获取触摸结束后的距离
const getDistanceRatio = () => {
  const distance = endPageX.value - startPageX.value
  const ratio = (distance / bottomDrawerHeight.value) * 100
  return ratio
}

const touchstartHandler = (event: TouchEvent) => {
  if (!contentScrollTop.value) {
    event.stopPropagation()
    startTime = new Date().getTime()
    startPageX.value = event.touches[0].pageY
  }
}

const touchmoveHandler = (event: TouchEvent) => {
  if (!contentScrollTop.value) {
    event.stopPropagation()
    endPageX.value = event.touches[0].pageY
    const ratio = getDistanceRatio()
    if ((1 - initRatio.value) * 100 + ratio < MIN_RATIO) {
      translateY.value = MIN_RATIO + '%'
    } else if ((1 - initRatio.value) * 100 + ratio > MAX_RATIO) {
      translateY.value = MAX_RATIO + '%'
    } else {
      translateY.value = (1 - initRatio.value) * 100 + ratio + '%'
    }
  }
}
// 抽屉的状态方向 0 上 1 下
const direction = ref('1')
const touchendHandler = (event: TouchEvent) => {
  if (!contentScrollTop.value) {
    // 滑动结束, 判断滑动时间小于设定阈值,直接铺平最大
    endTime = new Date().getTime()
    event.stopPropagation()
    // 滑动结束, 判断滑动距离大于设定阈值,直接铺平最大
    if (endPageX.value > 0 && startPageX.value > 0) {
      const distance = endPageX.value - startPageX.value
      // console.log(startPageX.value, endPageX.value, endTime - startTime)

      if (Math.abs(distance) >= MAX_THRESHOLD || endTime - startTime <= MAX_TOUCHTIME) {
        direction.value = distance > 0 ? '1' : '0'
        translateY.value = (distance < 0 ? MIN_RATIO : MAX_RATIO) + '%'
      } else {
        translateY.value = (direction.value === '0' ? MIN_RATIO : MAX_RATIO) + '%'
      }
      const translate = Number(translateY.value.split('%')[0])
      initRatio.value = (100 - translate) / 100
      endPageX.value = 0
      startPageX.value = 0
    }
    console.log('touchend')
  }
}

const contentHidden = computed(() => {
  return direction.value === '1' ? 'hidden' : 'auto'
})
const contentTouchHandeler = (e: Event) => {
  // console.log(content.value?.scrollTop)
  contentScrollTop.value = content.value?.scrollTop
  e.stopPropagation()
  e.preventDefault()
  if (direction.value === '0') {
    e.stopPropagation()
    e.preventDefault()
  }
}
// 设置默认高度
const setInitPosition = () => {
  if (bottomDrawer.value) {
    direction.value = '1'
    if (content.value) {
      content.value?.scrollTo(0, 0)
    }

    translateY.value = (1 - props.proportionvw) * 100 + '%'
  }
}

defineExpose({
  setInitPosition,
})
</script>
<style lang="scss">
.bottom-drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6f7f9;
  z-index: 99;
  transform: translateY(v-bind(translateY));
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all 0.1s linear;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  // overflow: hidden;
  .handler_bar {
    position: absolute;
    top: -10px;
    left: 50%;
    height: 3px;
    transform: translateX(-50%);
    width: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
  .bottom-drawer-content {
    padding: 8px;
    height: calc(100% - v-bind(contentexHieght));
    // overflow: auto;
    overflow: v-bind(contentHidden);
    .bottom-drawer-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
  }
}
</style>
