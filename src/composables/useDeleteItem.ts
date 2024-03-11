// 删除列表项
import useRequest from './useRequest'
import { type Noop, type BaseResponse } from '@/types/common'
import { success } from '@/utils/http'

const useDeleteItem = (
  service: (id: number) => Promise<BaseResponse<null>>,
  callback?: Noop
) => {
  const { loading, fetch } = useRequest<BaseResponse<null>, [number]>(service)

  const handleDelete = async (idOrRecord: number | { id: number }) => {
    await fetch(typeof idOrRecord === 'number' ? idOrRecord : idOrRecord.id)
    success('操作成功')
    callback?.()
  }

  return {
    loading,
    handleDelete
  }
}

export default useDeleteItem
