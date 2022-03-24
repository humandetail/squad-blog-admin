export const postMsg = {
  title: {
    required: '请输入文章标题',
    min: '文章标题名称不能少于2个字符',
    max: '文章标题名称不能多于255个字符'
  },
  summary: {
    required: '请输入文章摘要',
    min: '文章摘要不能少于2个字符',
    max: '文章摘要不能多于500个字符'
  },
  content: {
    required: '请输入文章内容',
    min: '文章内容不能少于1个字符',
    max: '文章内容不能多于65535个字符'
  },
  author: {
    required: '请输入作者',
    min: '作者不能少于1个字符',
    max: '作者不能多于50个字符'
  },
  source: {
    required: '请输入文章来源 ',
    min: '文章来源 不能少于1个字符',
    max: '文章来源 不能多于255个字符'
  },
  recommendationIndex: {
    number: '推荐指数必须是个数值类型'
  },
  categoryId: {
    required: '请选择文章分类'
  },
  coverId: {
    required: '请选择文章封面图'
  },
  templateId: {
    required: '请选择文章内容解析模板'
  },
  tags: {
    required: '请选择文章标签',
    min: '至少要有一个标签',
    max: '标签不能超过5个'
  },
  seoTitle: {
    max: 'seo标题不能超过255个字符'
  },
  seoKeywords: {
    max: 'seo关键字不能超过255个字符'
  },
  seoDescription: {
    max: 'seo说明不能超过500个字符'
  }
}
