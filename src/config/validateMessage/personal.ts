export const personalBaseMsg = {
  nickname: {
    required: '请输入昵称',
    min: '昵称不能少于2个字符',
    max: '昵称不能多于32个字符'
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

export const personalSkillMsg = {
  name: {
    required: '请输入技能名称',
    min: '技能名称不能少于2个字符',
    max: '技能名称不能多于32个字符'
  },
  iconId: {
    required: '请选择图标'
  },
  baseId: {
    required: '请选择挂载点'
  },
  description: {
    required: '请输入技能说明',
    max: '技能说明不能多于255个字符'
  }
}

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
