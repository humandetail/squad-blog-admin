export const blogrollMsg = {
  name: {
    required: '请输入友链名称',
    min: '友链名称不能少于2个字符',
    max: '友链名称不能多于32个字符'
  },
  link: {
    required: '请输入链接地址',
    type: '请输入正确的链接地址',
    max: '链接地址长度不能多于128个字符'
  },
  remarks: {
    required: '请输入备注信息',
    max: '备注信息长度不能多于255个字符'
  }
}

export const pictureMsg = {
  name: {
    required: '请输入图片名称',
    min: '图片名称不能少于2个字符',
    max: '图片名称不能多于32个字符'
  },
  categoryId: {
    required: '请选择图片分类'
  },
  file: {
    required: '请选择需要上传的图片'
  }
}

export const pictureCategoryMsg = {
  name: {
    required: '请输入图片分类名称',
    min: '图片分类名称不能少于2个字符',
    max: '图片分类名称不能多于32个字符'
  },
  displayName: {
    required: '请输入图片分类显示名称',
    min: '图片分类显示名称不能少于2个字符',
    max: '图片分类显示名称不能多于64个字符'
  }
}

export const templateMsg = {
  name: {
    required: '请输入文章模板名称',
    min: '文章模板名称不能少于2个字符',
    max: '文章模板名称不能多于32个字符'
  },
  coverId: {
    required: '请选择文章模板封面图'
  },
  file: {
    required: '请选择需要上传的模板文件'
  }
}
