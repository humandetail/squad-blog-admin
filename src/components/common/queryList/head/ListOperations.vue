<template>
  <div class="list-operations">
    <a-tooltip
      :placement="placement"
      title="刷新">
      <a-button
        :loading="loading"
        @click="$emit('refresh')">
        <template #icon>
          <reload-outlined />
        </template>
      </a-button>
    </a-tooltip>

    <a-tooltip
      :placement="placement"
      :title="`${!searchVisible ? '显示' : '隐藏'}搜索区域`">
      <a-button @click="$emit('update:search-visible', !searchVisible)">
        <template #icon>
          <SearchIcon />
        </template>
      </a-button>
    </a-tooltip>

    <a-tooltip
      :placement="placement"
      title="切换表格尺寸">
      <a-dropdown
        v-model:visible="sizeDropdownVisible"
        :trigger="['click']">
        <a-button @click.prevent>
          <template #icon>
          <column-height-outlined />
          </template>
        </a-button>

        <template #overlay>
          <a-menu
            :selectedKeys="[size]"
            @click="handleSizeMenuClick">
            <a-menu-item
              v-for="(item) of sizeOptions"
              :key="item.value">
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
      :placement="placement"
      title="列筛选">
      <a-dropdown
        v-model:visible="columnDropdownVisible"
        :trigger="['click']">
        <a-button @click.prevent>
          <template #icon>
            <setting-outlined />
          </template>
        </a-button>

        <template #overlay>
          <a-menu
            multiple
            :selectedKeys="selectedColumnKeys"
            @click="handleOptionMenuClick">
            <a-menu-item
              v-for="(item) of columns"
              :key="item.key || item.dataIndex">
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
import { ESize } from '@/config/constants';
import SearchIcon from '@/components/common/icons/SearchIcon.vue';
import { ref } from 'vue';
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

const props = defineProps<{
  loading: boolean;
  searchVisible: boolean;
  size: ESize,
  columns: Record<string, any>[],
  selectedColumnKeys: string[]
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'update:search-visible', value: boolean): void;
  (e: 'update:size', size: ESize): void;
  (e: 'update:selected-column-keys', columns: string[]): void;
}>();

const sizeDropdownVisible = ref(false);

const handleSizeMenuClick = (e: MenuInfo) => {
  emit('update:size', e.key as ESize);
}

const columnDropdownVisible = ref(false);

const handleOptionMenuClick = (e: MenuInfo) => {
  const keys = props.selectedColumnKeys;
  const exists = keys.find(key => key === e.key as any);
  const results: string[] = exists
    ? keys.filter(key => key !== e.key as any)
    : [...keys, e.key as string]

  emit('update:selected-column-keys', results);
}

const placement = 'top';

const sizeOptions: Array<{
  label: string;
  value: ESize;
}> = [
  { label: 'default', value: ESize.default },
  { label: 'middle', value: ESize.middle },
  { label: 'small', value: ESize.small }
];

const isColOptionChecked = (col: Record<string, any>) => {
  return !!props.selectedColumnKeys.find(key => {
    return (
      (col.dataIndex && col.dataIndex === key) ||
      (col.key && col.key === key)
    );
  });
}

</script>

<style lang="less" scoped>
.list-operations {
  > :not(:first-of-type) {
    margin-left: @margin-md;
  }
}
</style>
