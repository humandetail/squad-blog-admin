<template>
  <div class="list-operations">
    <a-tooltip
      :placement="placement"
      title="刷新"
    >
      <a-button
        :loading="loading"
        @click="$emit('refresh')"
      >
        <template #icon>
          <reload-outlined />
        </template>
      </a-button>
    </a-tooltip>

    <a-tooltip
      :placement="placement"
      :title="`${!searchVisible ? '显示' : '隐藏'}搜索区域`"
    >
      <a-button @click="$emit('update:search-visible', !searchVisible)">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>
    </a-tooltip>

    <a-tooltip
      v-if="isTable"
      :placement="placement"
      title="切换表格尺寸"
    >
      <a-dropdown
        v-model:open="sizeDropdownVisible"
        :trigger="['click']"
      >
        <a-button @click.prevent>
          <template #icon>
          <column-height-outlined />
          </template>
        </a-button>

        <template #overlay>
          <a-menu
            :selectedKeys="[size]"
            @click="handleSizeMenuClick"
          >
            <a-menu-item
              v-for="(item) of sizeOptions"
              :key="item.value"
            >
              <a-checkbox
                :checked="size === item.value"
                @change="handleSizeMenuClick({ key: item.value } as MenuInfo)"
                @click.stop
              />
              <span style="margin-left: 8px">{{ item.value }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-tooltip>

    <a-tooltip
      v-if="isTable"
      :placement="placement"
      title="列筛选"
    >
      <a-dropdown
        v-model:open="columnDropdownVisible"
        :trigger="['click']"
      >
        <a-button @click.prevent>
          <template #icon>
            <setting-outlined />
          </template>
        </a-button>

        <template #overlay>
          <a-menu
            multiple
            :selectedKeys="selectedColumnKeys"
            @click="handleOptionMenuClick"
          >
            <a-menu-item
              v-for="(item) of columns"
              :key="item.key || item.dataIndex"
            >
              <a-checkbox
                :checked="isColOptionChecked(item)"
                @change="() => handleOptionMenuClick({ key: item.key || item.dataIndex } as MenuInfo)"
                @click.stop
              />
              <span style="margin-left: 8px">{{ item.title || '-' }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Size } from '@/config/constants'
import { ref } from 'vue'
import { type MenuInfo } from 'ant-design-vue/lib/menu/src/interface'

const props = withDefaults(defineProps<{
  loading?: boolean
  searchVisible?: boolean
  size?: Size
  columns: Array<Record<string, any>>
  selectedColumnKeys: string[]
  isTable?: boolean
}>(), {
  loading: false,
  searchVisible: true,
  size: Size.default,
  isTable: true
})

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'update:search-visible', value: boolean): void
  (e: 'update:size', size: Size): void
  (e: 'update:selected-column-keys', columns: string[]): void
}>()

const sizeDropdownVisible = ref(false)

const handleSizeMenuClick = (e: MenuInfo) => {
  emit('update:size', e.key as Size)
}

const columnDropdownVisible = ref(false)

const handleOptionMenuClick = (e: MenuInfo) => {
  const keys = props.selectedColumnKeys
  const exists = keys.find(key => key === e.key as any)
  const results: string[] = exists
    ? keys.filter(key => key !== e.key as any)
    : [...keys, e.key as string]

  emit('update:selected-column-keys', results)
}

const placement = 'top'

const sizeOptions: Array<{
  label: string
  value: Size
}> = [
  { label: 'default', value: Size.default },
  { label: 'middle', value: Size.middle },
  { label: 'small', value: Size.small }
]

const isColOptionChecked = (col: Record<string, any>) => {
  return !!props.selectedColumnKeys.find(key => {
    return (
      (col.dataIndex && col.dataIndex === key) ||
      (col.key && col.key === key)
    )
  })
}

</script>

<style lang="scss" scoped>
.list-operations {
  display: flex;
  gap: 8px;
}
</style>
