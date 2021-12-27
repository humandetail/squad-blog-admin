import { IBaseResponse } from '@/types/common';
import { error } from '@/utils/http';
import { ref } from 'vue';

export default function useRequest<T extends IBaseResponse, A extends Array<unknown> = []> (
  apiFunc: (...args: A) => Promise<T>) {
  const loading = ref(false);

  const fetch = async (...args: A): Promise<T> => {
    try {
      loading.value = true;

      const res = await apiFunc(...args);

      if (res.code !== 200) {
        throw res;
      }

      return Promise.resolve(res);
    } catch (err: any) {
      error(err.message)
      return Promise.reject(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    fetch
  }
}
