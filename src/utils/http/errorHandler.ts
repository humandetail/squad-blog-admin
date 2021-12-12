import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { error } from './message';

export default (err: any) => {
  // 状态码判断
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        error('错误的请求');
        break
      case 401:
        error('登录过期，请重新登录');
        useUserStore().logout().then(() => {
          useRouter().push('/login');
        })
        break
      case 403:
        error('服务拒绝访问');
        break
      case 404:
        error('请求错误,未找到该资源');
        break
      case 405:
        error('请求方法未允许');
        break
      case 408:
        error('请求超时');
        break
      case 500:
        error('服务器端出错');
        break
      case 501:
        error('网络未实现');
        break
      case 502:
        error('网络错误');
        break
      case 503:
        error('服务不可用');
        break
      case 504:
        error('网关超时（504 Gateway Time-out）');
        break
      case 505:
        error('http版本不支持该请求');
        break
      default:
        error('服务器出错，请稍候再试');
    }
  }
}
