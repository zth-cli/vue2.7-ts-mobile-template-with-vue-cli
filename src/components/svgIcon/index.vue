<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="name" />
  </svg>
</template>

<script lang="ts">
import './iconfont.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: '#icon-' + this.icon,
    }
  },
})
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
