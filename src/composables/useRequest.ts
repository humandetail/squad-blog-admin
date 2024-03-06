import { type BaseResponse } from '@/types/common'
import { error } from '@/utils/http'
import { ref } from 'vue'

export default function useRequest<T extends BaseResponse, A extends unknown[] = []> (
  apiFunc: (...args: A) => Promise<T>) {
  const loading = ref(false)

  const fetch = async (...args: A): Promise<T> => {
    try {
      loading.value = true

      const res = await apiFunc(...args)

      if (res.code !== 200) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw res
      }

      return await Promise.resolve(res)
    } catch (err) {
      error((err as Error).message)
      return await Promise.reject(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    fetch
  }
}
