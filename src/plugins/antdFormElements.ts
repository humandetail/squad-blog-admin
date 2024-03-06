import type { Plugin } from 'vue'
import {
  Input,
  InputNumber,
  InputGroup,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Rate,
  Radio,
  Mentions,
  DatePicker,
  Checkbox,
  Cascader,
  InputPassword,
  Textarea
} from 'ant-design-vue'

const elements = [
  Input,
  InputNumber,
  InputGroup,
  InputPassword,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Rate,
  Radio,
  Mentions,
  DatePicker,
  Checkbox,
  Cascader,
  Textarea
]

const registerAntdFormElements: Plugin = (app) => {
  elements.forEach(element => {
    app.component(element.name, element)
  })
}

export {
  registerAntdFormElements
}
