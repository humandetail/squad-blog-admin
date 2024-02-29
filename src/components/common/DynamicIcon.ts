import { h } from 'vue'
import * as Icon from '@ant-design/icons-vue'
import { str2UpperCamelCase } from '@/utils/tools'

const DynamicIcon = ({ icon, style }: { icon: string, style?: string }) => {
  return h((Icon as any)[str2UpperCamelCase(icon)], { style })
}

DynamicIcon.props = ['icon']

export default DynamicIcon
