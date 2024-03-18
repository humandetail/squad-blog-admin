import { type PersonalSkill, type PersonalSkillItem, type PersonalBaseItem } from '@/types/personal'
import { editPersonalSkill } from '@/services'
import { type BaseResponse } from '@/types/common'
import useRequest from './useRequest'
import { success } from '@/utils/http'

const useChangePersonalBase = (callback: () => void) => {
  const baseSelectorVisible = ref(false)
  const currentRow = ref<PersonalSkillItem | null>(null)

  const { loading, fetch } = useRequest<BaseResponse<null>, [number, PersonalSkill]>(editPersonalSkill)

  const handleChangeBase = (row: PersonalSkillItem) => {
    currentRow.value = row
    baseSelectorVisible.value = true
  }

  const handleCloseBaseSelector = () => {
    baseSelectorVisible.value = false
    currentRow.value = null
  }

  const handleBaseSelect = async (item: PersonalBaseItem) => {
    if (!currentRow.value) {
      return
    }
    const { id, name, iconId, description, sort, isShow } = currentRow.value
    await fetch(id, {
      name,
      iconId,
      description,
      sort,
      isShow,
      baseId: item.id
    })

    handleCloseBaseSelector()
    success('操作成功')
    callback()
  }

  return {
    loading,
    baseSelectorVisible,
    currentRow,
    handleChangeBase,
    handleCloseBaseSelector,
    handleBaseSelect
  }
}

export default useChangePersonalBase
