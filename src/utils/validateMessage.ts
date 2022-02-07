// 一些表单检验的提示语

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
