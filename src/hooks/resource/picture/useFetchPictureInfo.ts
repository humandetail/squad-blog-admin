import { ref, onMounted } from 'vue';
import { getPictureInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPictureItem } from '@/types/picture';

const useFetchPictureInfo = (id: number) => {
  const pictureInfo = ref<IPictureItem>();
  const { loading, fetch } = useRequest<IBaseResponse<IPictureItem>, [number]>(getPictureInfo);

  onMounted(async () => {
    const res = await fetch(id);
    pictureInfo.value = res.data;
  });

  return {
    loading,
    pictureInfo
  }
}

export default useFetchPictureInfo;
