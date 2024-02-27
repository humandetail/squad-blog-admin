import { showDashes } from '@/utils/tools'

type Key = 'isShow' | 'sort' | 'operator' | 'createdTime' | 'updatedTime'

enum titleMap {
  'isShow' = '是否显示',
  'sort' = '排序',
  'operator' = '操作员',
  'createdTime' = '创建时间',
  'updatedTime' = '最后更新时间'
}

const widthMap = {
  isShow: 100,
  sort: 70,
  operator: 100,
  createdTime: 180,
  updatedTime: 180
}

export default (keys: Key[] = ['isShow', 'sort', 'operator', 'createdTime', 'updatedTime']) => {
  return keys.map(key => {
    return {
      title: titleMap[key],
      dataIndex: key,
      width: widthMap[key],
      ellipsis: true,
      resizable: true,
      sorter: true,
      ...(key === 'isShow'
        ? null
        : {
            customRender: ({ text }: any) => showDashes(text)
          })
    }
  })
}
