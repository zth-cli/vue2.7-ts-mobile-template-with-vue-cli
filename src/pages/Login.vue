<template>
  <div class="login-main">
    <div class="login-top">
      <img src="../assets/logo.png" alt="logo" />
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="uid"
          name="uid"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="pwd"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { setStorge } from '@/utils/auth'
import { login } from '@/api'
import { ref, getCurrentInstance } from 'vue'
import VueRouter from 'vue-router'
// import { useRouter } from 'vue-router'
console.log(getCurrentInstance()?.proxy.$router)

const router = getCurrentInstance()?.proxy.$router as VueRouter

const uid = ref('')
const pwd = ref('')
const onSubmit = (values: { uid: string; pwd: string }) => {
  console.log('submit', values)
  setStorge('token', 'tokenssss')
  setStorge('userName', uid.value)
  router.push('/')
}
</script>
<style lang="scss">
.login-main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .login-top {
    padding: 80px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
