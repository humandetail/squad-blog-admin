<template>
  <div class="page-login">
    <div
      class="login-container"
      :class="{
        submitting: !!commonFormRef?.confirmLoading
      }"
    >
      <div class="info-container">
        <div class="loading-wrapper">
          <div class="loading"></div>
        </div>
        <div class="info-wrapper">
          <div class="logo"></div>
          <h1 class="site-name">细节个人博客</h1>
          <h2 class="title">后台管理中心</h2>
        </div>
      </div>
      <div class="login-form-wrapper">
        <CommonForm
          ref="commonFormRef"
          :wrapper-col="{ span: 24 }"
          :form-items="formItems"
          :submitHandler="login"
          :colon="false"
          @success="handleLoginSuccess"
        >
          <template #username="{ item, modelRef }">
            <a-input
              v-bind="item"
              allow-clear
              :class="{
                empty: !modelRef.username
              }"
              :disabled="!!commonFormRef?.confirmLoading"
              v-model:value="modelRef.username"
              @keydown="handleInputKeydown"
            />
          </template>

          <template #password="{ item, modelRef }">
            <a-input-password
              v-bind="item"
              allow-clear
              :class="{
                empty: !modelRef.password
              }"
              :disabled="!!commonFormRef?.confirmLoading"
              v-model:value="modelRef.password"
              @keydown="handleInputKeydown"
            />
          </template>

          <template #footer="{ onSubmit, confirmLoading }">
            <a-button
              class="btn-submit"
              :disabled="confirmLoading"
              @click.prevent="onSubmit"
            >
              <LoginOutlined />
              登录
            </a-button>
          </template>
        </CommonForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormItem } from '@/types/common'
import { theme } from 'ant-design-vue'
import { login } from '@/services'
import { useUserStore } from '@/store/user'

const { token } = theme.useToken()
const commonFormRef = ref()

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleInputKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    document.querySelector<HTMLButtonElement>('.btn-submit')?.click()
  }
}

const formItems: FormItem[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    customRender: 'username',
    rules: [
      { required: true, message: '请输入用户名' }
    ]
  },
  {
    type: 'input-password',
    label: '密码',
    name: 'password',
    customRender: 'password',
    rules: [
      { required: true, message: '请输入密码' }
    ]
  }
]

const handleLoginSuccess = (data: string) => {
  userStore.setToken(data)

  router.push(route.query.redirect as string || '/')
}
</script>

<style lang="scss" scoped>
.page-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(232, 225, 207);

  .login-container {
    position: relative;
    width: 600px;
    height: 300px;

    .info-container {
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background-color: v-bind('token.colorBgContainer');

      .loading-wrapper,
      .info-wrapper {
        flex: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }

      .loading-wrapper {
        background: #fff;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
        filter: blur(3px) contrast(10);

        .loading {
          position: relative;
          width: 80px;
          height: 120px;
          background:
            radial-gradient(circle at 60px 40px, #fff, #fff 7px, transparent 7px),
            radial-gradient(circle at 40px 40px, #fff, #fff 7px, transparent 7px),
            radial-gradient(circle at 50px 50px, #333, #333);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: auto;
          border-radius: 40px 40px 60px 20px;
          transform: skewX(-10deg);
          animation: moveMain 2s infinite ease-out;

          &::before,
          &::after {
            content: "";
            position: absolute;
            background: #333;
            border-radius: 50%;
          }

          &::before {
            width: 20px;
            height: 20px;
            top: 50px;
            left: -10px;
            box-shadow: 0 0 0 1px #333;
            animation: move 2s infinite ease-in;
          }

          &::after {
            width: 30px;
            height: 25px;
            top: 95px;
            left: -10px;
            box-shadow: 0 0 0 1px #333;
            animation: move2 2s infinite ease-in;
          }
        }
      }

      .info-wrapper {
        background-color: #000;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
        .logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(0deg, #0088ff, #fff);
          mask-image: url(/logo.svg);
          mask-size: 64px 64px;
          animation: logo 8s linear infinite;
        }

        .site-name,
        .title {
          position: relative;
          font-family: 'Times New Roman', Times, serif;
          text-shadow:
            0 -1px #0088ff,
            1px -1px #0088ff,
            1px 0 #0088ff,
            1px 1px #0088ff,
            0 1px #0088ff,
            -1px 0 #0088ff,
            -1px -1px #0088ff
          ;
          overflow: hidden;

          &::before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(45deg, #ff269b, #2ab5f5, #ffbf00);
            mix-blend-mode: multiply;
          }

          &::after {
            content: "";
            position: absolute;
            top: -100%;
            left: -100%;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, #fff, #000 50%);
            background-size: 25% 25%;
            mix-blend-mode: color-dodge;
            animation: mix 8s linear infinite;
          }
        }
      }
    }

    .login-form-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 5%;
      top: -16px;
      z-index: 5;
      width: 50%;
      height: 332px;
      border-radius: 0 16px 16px;
      background-color: hsl(208, 100%, 50%);
      transition: transform .3s ease-in;

      &::before {
        content: '';
        position: absolute;
        left: -12px;
        top: 0;
        width: 24px;
        height: 16px;
        background-color: hsl(208, 100%, 50%);
        border-top-right-radius: 24px;
        border-top-left-radius: 24px;
      }

      &::after {
        content: '';
        position: absolute;
        left: -12px;
        top: 2px;
        width: 15px;
        height: 14px;
        background-color: hsl(208, 100%, 35%);
        border-top-right-radius: 24px;
        border-top-left-radius: 24px;
        transform-origin: left bottom;
        transform: scale(0.8);
      }

      :deep(.form-container) {
        .ant-form-row {
          position: relative;

          .ant-form-item-label {
            position: absolute;
            left: 16px;
            top: 2px;
            transition: transform .1s ease-in;

            label {
              opacity: 0;
              color: v-bind('token.colorTextPlaceholder');
            }
          }

          .ant-input-affix-wrapper {
            padding: 8px 16px;
            border-radius: 0;
            background-color: transparent;
            border: 0;
            border-bottom: 2px solid v-bind('token.colorBgContainer');

            input {
              color: v-bind('token.colorBgContainer');
              background-color: inherit;

              &::placeholder {
                background-color: hsl(208, 100%, 50%);
              }
            }
          }

          &:has(.empty) {
            .ant-form-item-label label {
              opacity: 1;
            }
          }

          &:has(:focus) {
            .ant-form-item-label {
              transform: translate(-16px, calc(-100% + 8px));

              label {
                color: v-bind('token.colorBgContainer');
              }
            }

            &:not(:has(.empty)) {
              .ant-form-item-label label {
                opacity: 1;
              }
            }
          }

          .btn-submit {
            width: 100%;

            &:disabled {
              border: 0;
            }
          }
        }
      }
    }

    &.submitting {
      .login-form-wrapper {
        transform: translateX(80%);
      }
    }
  }
}

@keyframes move {
  80%,
  100% {
    box-shadow: -60px 0 0 .5px rgba(255, 255, 255, .5);
  }
}

@keyframes move2 {
  80%,
  100% {
    box-shadow: -100px 0 0 .5px rgba(255, 255, 255, .2);
  }
}

@keyframes moveMain {
  42% {
    transform: skewX(-10deg) translate(40px, 0);
  }
}

@keyframes mix {
  to {
    transform: translate(50%, 50%);
  }
}

@keyframes logo {
  to {
    background-image: linear-gradient(360deg, #fff, #0088ff);
  }
}
</style>
