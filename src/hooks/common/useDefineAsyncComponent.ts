import { defineAsyncComponent, defineComponent } from 'vue';
import GlobalLoadingComponent from '@/components/common/GlobalLoadingComponent.vue';
import { Modal } from 'ant-design-vue';

const resolveComponent = (path: string) => {
  const components = import.meta.glob('../../**/*.vue');

  return components[`../..${path}`]
}

/**
 * 定义异步组件
 * @param { string } filePath - 以`/src`目录为基准的绝对路径
 */
const useDefineAsyncComponent = (filePath: string) => {
  if (!/^\//.test(filePath)) {
    throw new Error('请使用以`/src`目录为基准的绝对路径');
  }

  return defineAsyncComponent({
    // 工厂函数
    loader: resolveComponent(filePath),
    // 加载异步组件时要使用的组件
    loadingComponent: GlobalLoadingComponent,
    // 加载失败时要使用的组件
    errorComponent: defineComponent({
      setup () {
        Modal.error({
          title: '提示',
          content: '组件加载失败，请刷新页面重试！'
        });
      }
    }),
    // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
    delay: 200,
    // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
    // 默认值：Infinity（即永不超时，单位 ms）
    timeout: 10000,
    // 定义组件是否可挂起 | 默认值：true
    suspensible: false,
    /**
     * @param {*} error 错误信息对象
     * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
     * @param {*} fail  一个函数，指示加载程序结束退出
     * @param {*} attempts 允许的最大重试次数
     */
    onError (error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // 请求发生错误时重试，最多可尝试 3 次
        retry()
      } else {
        // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
        // 必须调用其中一个才能继续错误处理。
        fail()
      }
    }
  });
}

export default useDefineAsyncComponent;
