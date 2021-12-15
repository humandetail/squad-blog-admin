import NProgress from 'nprogress';
import router from './index';
import { useUserStore } from '../store/user';

NProgress.configure({
  showSpinner: false
});

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  console.log(to, from);
  NProgress.start();
  if (whiteList.includes(to.path)) {
    // 白名单直接放行
    next();
  } else {
    const userStore = useUserStore();
    const token = userStore.token;
    if (!token) {
      // 无 token 直接跳回首页
      next({ path: 'login', query: { redirect: to.fullPath } })
    } else {
      // TODO: 需要确定用户可访问菜单
      userStore.setUserInfo()
        .then(() => {
          //
          next();
        });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
})
