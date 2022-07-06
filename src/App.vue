<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  // background-color: #f6f7f9;
  background-image: linear-gradient(#ffffff, #e8e8e8);
}
.sc-mian {
  height: 100%;
  position: relative;
  .sc-view {
    height: calc(100% - 1.33334rem);
    width: 100%;
    overflow-y: auto;
  }
  .sc-sub-view {
    padding-top: 1.22667rem;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
