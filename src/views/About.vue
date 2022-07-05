<template>
  <div class="about">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const msg = ref("Hello World!");
</script>
