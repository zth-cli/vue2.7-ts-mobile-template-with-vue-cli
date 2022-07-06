<template>
  <div class="sc-mian">
    <appBar left-arrow></appBar>
    <div class="sc-sub-view">
      <suspense>
        <router-view></router-view>
      </suspense>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const onClickLeft = () => history.back()
</script>
<style></style>
