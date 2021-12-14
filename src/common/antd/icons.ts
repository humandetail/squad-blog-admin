import { App } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined
} from '@ant-design/icons-vue';

export default {
  install: (app: App) => {
    app.component(UserOutlined.displayName, UserOutlined)
      .component(LockOutlined.displayName, LockOutlined)
      .component(LoginOutlined.displayName, LoginOutlined);
  }
}
