import { App } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  DownOutlined,
  UnlockOutlined,
  PoweroffOutlined
} from '@ant-design/icons-vue';

const icons = [
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  DownOutlined,
  UnlockOutlined,
  PoweroffOutlined
];

export default {
  install: (app: App) => {
    icons.forEach((icon) => {
      app.component(icon.displayName, icon);
    });
  }
}
