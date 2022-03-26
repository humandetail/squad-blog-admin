import { ref, onMounted } from 'vue';
import { getPictureCategoryInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPictureCategory } from '@/types/pictureCategory';

const useFetchPictureCategoryInfo = (id: number) => {
  const pictureCategoryInfo = ref<IPictureCategory>();
  const { loading, fetch } = useRequest<IBaseResponse<IPictureCategory>, [number]>(getPictureCategoryInfo);

  onMounted(async () => {
    const res = await fetch(id);
    pictureCategoryInfo.value = res.data;
  });

  return {
    loading,
    pictureCategoryInfo
  }
}

export default useFetchPictureCategoryInfo;
