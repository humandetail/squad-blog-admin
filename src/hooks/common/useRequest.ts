import { IBaseResponse } from '@/types/common';
import { error } from '@/utils/http';
import { reactive, toRefs } from 'vue';

export default function useRequest<T, A extends Array<any> = []> (apiFunc: (...args: A) => Promise<IBaseResponse<T>>) {
  const state = reactive({
    data: <T>{},
    loading: false
  });

  const fetch = async (...args: A) => {
    try {
      state.loading = true;

      const res = await apiFunc(...args);

      if (res.code !== 200) {
        throw res;
      }

      state.data = res.data as any;
      return Promise.resolve();
    } catch (err: any) {
      error(err.message)
      return Promise.reject(err);
    } finally {
      state.loading = false;
    }
  }

  return {
    ...toRefs(state),
    fetch
  }
}
