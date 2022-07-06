<template>
  <header class="lt-appbar-main" style="border-bottom: 1px solid #f5f6f7">
    <span v-if="leftArrow" class="back-icon" @click="$router.go(-1)"
      ><van-icon name="arrow-left"
    /></span>
    <div v-if="!custom" class="appbar-content">
      <p class="appbar-title">{{ title ? title : $route.meta.title }}</p>
    </div>
    <slot v-else></slot>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'appBar',
  props: {
    custom: {
      type: Boolean,
      default: false,
    },
    leftArrow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      opacity: 0,
      color: '#000',
    }
  },
  mounted() {
    const dom: HTMLDivElement | null = document.querySelector('#app')
    dom?.addEventListener('scroll', (event: Event) => {
      const el = event.target as HTMLElement
      this.opacity = el.scrollTop <= 80 ? el.scrollTop * 0.0125 : 1
      this.color = el.scrollTop <= 30 ? '#000' : '#fff'
    })
  },
})
</script>
<style lang="scss">
.lt-appbar-main {
  user-select: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 98;
  box-sizing: border-box;
  // background-color: transparent;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(200%) blur(30px);
  transition: all ease-in-out 0.3s;
  .back-icon {
    position: absolute;
    top: 0;
    left: 18px;
    font-size: 20px;
    line-height: 49px;
    z-index: 100;
    width: 30px;
  }
  .appbar-content {
    box-sizing: border-box;
    color: #000;
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 998;
    .appbar-title {
      font-size: 18px;
      height: 36px;
      line-height: 36px;
      text-indent: 8px;
    }
  }
}
</style>
