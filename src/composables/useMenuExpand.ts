import { getMenusByParentId } from '@/services'
import { type BasePageResponse } from '@/types/common'
import { type MenuItem } from '@/types/menus'
import useRequest from './useRequest'

const useExpand = () => {
  const { loading, fetch } = useRequest<BasePageResponse<MenuItem[]>, [number, any]>(getMenusByParentId)

  const handleExpand = async (expanded: boolean, record: MenuItem) => {
    if (expanded && record.children?.length === 0) {
      const res = await fetch(record.id, null)
      record.children = res.data.records.map((item: any) => {
        if (item.hasChildren && !item.children) {
          item.children = []
        }
        return item
      })
    }
  }

  return {
    loading,
    handleExpand
  }
}

export default useExpand
