export const personalBaseMsg = {
  nickname: {
    required: '请输入昵称',
    min: '文章分类名称不能少于2个字符',
    max: '文章分类名称不能多于32个字符'
  },
  qq: {
    min: 'qq不能少于5个字符',
    max: 'qq不能多于11个字符'
  },
  blog: {
    type: '请输入正确的blog地址',
    max: 'blog地址不能超过128个字符'
  },
  github: {
    type: '请输入正确的GitHub地址',
    max: 'GitHub地址不能超过128个字符'
  },
  email: {
    type: '请输入正确的email地址',
    max: 'email地址不能超过128个字符'
  }
}
