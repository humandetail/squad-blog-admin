export const personalWorkMsg = {
  name: {
    required: '请输入作品名称',
    min: '作品名称不能少于2个字符',
    max: '作品名称不能多于32个字符'
  },
  link: {
    required: '请输入作品链接',
    max: '链接长度不能超过500个字符'
  },
  pictures: {
    required: '请选择作品图片'
  },
  baseId: {
    required: '请选择挂载点'
  },
  description: {
    required: '请输入作品说明',
    max: '作品说明不能多于255个字符'
  }
}
