<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}菜单`"
    :loading="commonFormRef?.confirmLoading"
    :reset="commonFormRef?.resetFields"
    :submit="commonFormRef?.submit"
  >
    <a-spin :spinning="loading">
      <common-form
        ref="commonFormRef"
        :form-data="formData"
        :form-items="formItems"
        :submit-handler="handler"
        @success="emits('success')"
      >
        <template #parentId="{ modelRef, item }">
          <sys-menu-selector
            v-model:value="modelRef[item.name]"
          />
        </template>

        <template #router="{ modelRef, item }">
          <a-input-group compact>
            <a-input
              v-model:value="modelRef[item.name]"
              style="width: calc(100% - 200px)"
              prefix="/"
            />
            <a-button
              type="primary"
              @click="() => {
                modelRef[item.name] = `pages/${getNanoId()}`
              }"
            >
              <SettingOutlined />
              生成路由
            </a-button>
          </a-input-group>
        </template>
      </common-form>
    </a-spin>
  </common-form-card>
</template>

<script setup lang="ts">
import { menuMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { Menu, MenuItem } from '@/types/menus'
import { permissionReg } from '@/utils/regexp'
import { getNanoId } from '@/utils/tools'

const props = withDefaults(defineProps<{
  record?: MenuItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()

const formData = ref<Menu>({
  parentId: 0,
  name: '',
  type: 1,
  router: '',
  permission: '',
  path: '',
  icon: '',
  isCache: 0,
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems = computed<FormItem[]>(() => [
  {
    label: '上级菜单',
    name: 'parentId',
    type: 'custom',
    customRender: 'parentId',
    rules: [{ required: true, type: 'number', message: menuMsg.parentId.required, trigger: 'change' }]
  },
  {
    label: '菜单名称',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: menuMsg.name.required, trigger: 'blur' },
      { max: 32, message: menuMsg.name.max, trigger: 'blur' }
    ]
  },
  {
    label: '菜单类型',
    name: 'type',
    type: 'radio-group',
    options: [
      { label: '菜单', value: 1 },
      { label: '操作', value: 2 }
    ]
  },
  ...(commonFormRef.value?.modelRef.type === 2
    ? [
        {
          label: '权限代码',
          name: 'permission',
          type: 'input',
          rules: [
            { required: true, message: menuMsg.permission.required, trigger: 'blur' },
            { pattern: permissionReg, message: menuMsg.permission.pattern, trigger: 'blur' }
          ]
        } as FormItem
      ]
    : [
        {
          label: '页面路由',
          name: 'router',
          type: 'custom',
          customRender: 'router'
        }
      ]),
  {
    label: '组件路径',
    name: 'path',
    type: 'input',
    prefix: '/src/pages/'
  },
  {
    label: '菜单图标',
    name: 'icon',
    type: 'input'
  },
  {
    label: '是否缓存',
    name: 'isCache',
    type: 'switch'
  },
  {
    label: '是否显示',
    name: 'isShow',
    type: 'switch'
  },
  {
    label: '排序',
    name: 'sort',
    type: 'input-number',
    min: 0,
    precision: 0
  }
])

watch(() => props.record, record => {
  if (record) {
    const { parentId, name, type, router, permission, path, icon, isCache, isShow, sort } = record
    formData.value = { parentId, name, type, router, permission, path, icon, isCache, isShow, sort }
  }
}, { immediate: true, deep: true })
</script>
