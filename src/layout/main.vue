<template>
  <div class="sc-mian">
    <div class="sc-view">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="/home" to="/home" icon="home-o">首页 {{ active }}</van-tabbar-item>
      <van-tabbar-item name="/workerbench" to="/workerbench" icon="todo-list-o"
        >工作台</van-tabbar-item
      >
      <van-tabbar-item name="/frame" to="/frame" icon="setting-o">页面</van-tabbar-item>
      <van-tabbar-item name="/profile" to="/profile" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from '@/hooks'

const { route } = useRoute()
const active = ref(route.path)

watch(
  () => route.path,
  (val) => {
    active.value = val
  }
)
</script>
<style></style>
