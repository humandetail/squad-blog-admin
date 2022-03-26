import { TablePaginationConfig } from 'ant-design-vue';
import { computed, ref } from 'vue';

const useColumns = (columns: Record<string, any>[], pagination?: TablePaginationConfig, isTreeData = false) => {
  const columnsWithSequenceNumber = isTreeData
    ? columns
    : [
        {
          dataIndex: 'sequenceNumber',
          align: 'center',
          title: '-',
          width: 60,
          fixed: 'left',
          customRender: ({ index }: any) => {
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            return pageSize * (current - 1) + index + 1;
          }
        },
        ...columns
      ];
  const nativeColumns = ref(columnsWithSequenceNumber);
  const selectedColumnKeys = ref<string[]>(columnsWithSequenceNumber.map(({ key, dataIndex }) => dataIndex || key));

  const currentColumns = computed(() => {
    return nativeColumns.value.filter(col => {
      return selectedColumnKeys.value.find(key => {
        return (
          (col.dataIndex && col.dataIndex === key) ||
          (col.key && col.key === key)
        )
      })
    })
  })

  const handleResizeColumn = (w: number, col: any) => {
    col.width = w;
  }

  return {
    nativeColumns,
    selectedColumnKeys,
    currentColumns,
    handleResizeColumn
  }
}

export default useColumns;
