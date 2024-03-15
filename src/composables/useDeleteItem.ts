// 删除列表项
import useRequest from './useRequest'
import { type Noop, type BaseResponse } from '@/types/common'
import { success } from '@/utils/http'

const useDeleteItem = <T extends number | string = number>(
  service: (id: T) => Promise<BaseResponse<null>>,
  callback?: Noop
) => {
  const { loading, fetch } = useRequest<BaseResponse<null>, [T]>(service)

  const handleDelete = async (idOrRecord: T | { id: T }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await fetch((typeof idOrRecord === 'number' || typeof idOrRecord === 'string') ? idOrRecord : (idOrRecord as { id: T }).id)
    success('操作成功')
    callback?.()
  }

  return {
    loading,
    handleDelete
  }
}

export default useDeleteItem
