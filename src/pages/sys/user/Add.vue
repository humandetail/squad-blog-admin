<template>
  <div class="page-role-add">
    <common-form-card
      title="新增用户"
      :loading="commonFormRef?.confirmLoading"
      :reset="commonFormRef?.resetFields"
      :submit="commonFormRef?.submit"
    >
      <common-form
        ref="commonFormRef"
        :form-data="formData"
        :form-items="formItems"
        :submit-handler="handleSubmit"
        @success="handleSuccess"
      />
    </common-form-card>
  </div>
</template>

<script setup lang="ts">
import { registerUser } from '@/services'
import { userMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { RegisterUserType } from '@/types/user'
import { passwordReg, usernameReg } from '@/utils/regexp'
import { type RuleObject } from 'ant-design-vue/es/form'
import { encryptPassword } from '@/utils/tools'

type RegisterUserWithConfirmType = RegisterUserType & { password2: string }

const router = useRouter()

const commonFormRef = ref()

const formData = ref<RegisterUserWithConfirmType>({
  username: '',
  password: '',
  password2: ''
})

const handleSubmit = ({ password2: _1, username, password }: RegisterUserWithConfirmType) => registerUser({
  username,
  password: encryptPassword(password)
})

const validatePassword = (_rule: RuleObject, value: string) => {
  if (!passwordReg.test(value)) {
    return Promise.reject(userMsg.password.pattern)
  }
  if (commonFormRef.value.modelRef.password2) {
    commonFormRef.value.validate('password2')
  }
  return Promise.resolve()
}

const validatePassword2 = (_rule: RuleObject, value: string) => {
  if (value !== commonFormRef.value.modelRef.password) {
    return Promise.reject(userMsg.password2.inconformity)
  }
  return Promise.resolve()
}

const formItems: FormItem[] = [
  {
    label: '用户名',
    name: 'username',
    type: 'input',
    autoFocus: true,
    rules: [
      { required: true, message: userMsg.username.required, trigger: 'blur' },
      { pattern: usernameReg, message: userMsg.username.pattern, trigger: 'blur' }
    ]
  },
  {
    label: '密码',
    name: 'password',
    type: 'input-password',
    rules: [
      { required: true, message: userMsg.password.required, trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
    ]
  },
  {
    label: '确认密码',
    name: 'password2',
    type: 'input-password',
    rules: [
      { required: true, message: userMsg.password2.required, trigger: 'blur' },
      { validator: validatePassword2, trigger: 'blur' }
    ]
  }
]

const handleSuccess = () => {
  router.push({ name: '用户管理' })
}
</script>
