<template>
  <div class="l-title-main">
    <svg-icon :icon="icon"></svg-icon>
    <span class="title">{{ title }}</span>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ title?: string; icon?: string }>(), {
  title: '这是标题',
  icon: 'qunti',
})
</script>
<style lang="scss">
.l-title-main {
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-left: 8px;
  }
}
</style>
