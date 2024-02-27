export const menuMsg = {
  parentId: {
    required: '请选择上级菜单'
  },
  name: {
    required: '请输入菜单名称',
    max: '菜单名称不能超过32个字符'
  },
  permission: {
    required: '请输入操作权限代码',
    pattern: '请检测权限代码的格式'
  }
}

export const roleMsg = {
  name: {
    required: '请输入角色名'
  }
}

export const userMsg = {
  username: {
    required: '请输入用户名',
    pattern: '用户名只能由字母或数字组成，长度为4-20'
  },
  password: {
    required: '请输入密码',
    pattern: '密码必须包含英文字母、数字和特殊符号（!@#$%^&*_），长度为6-20'
  },
  password2: {
    required: '请再次输入密码',
    inconformity: '两次密码不一致'
  }
}
