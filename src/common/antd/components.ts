import { App } from 'vue';
import {
  Button,
  Layout,
  Menu,
  Input,
  Space,
  Dropdown,
  Divider,
  Form,
  Modal,
  Tree,
  Row,
  Col,
  Select,
  DatePicker,
  Tooltip,
  Breadcrumb,
  InputNumber,
  Table,
  Pagination
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.dark.less';

export default {
  install: (app: App) => {
    app.use(Button)
      .use(Layout)
      .use(Menu)
      .use(Input)
      .use(Space)
      .use(Dropdown)
      .use(Divider)
      .use(Form)
      .use(Modal)
      .use(Tree)
      .use(Row)
      .use(Col)
      .use(Select)
      .use(DatePicker)
      .use(Tooltip)
      .use(Breadcrumb)
      .use(InputNumber)
      .use(Table)
      .use(Pagination);
  }
}
