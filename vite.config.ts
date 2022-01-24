import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // refTransform: true
    }),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
          importStyle: false
        })
      ]
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@router': resolve(__dirname, 'src/router'),
      '@store': resolve(__dirname, 'src/store'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@common': resolve(__dirname, 'src/common'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@views': resolve(__dirname, 'src/views'),
      '@config': resolve(__dirname, 'src/config'),
      '@types': resolve(__dirname, 'src/types')
    }
  },

  base: './',

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:7001', // dev
        changeOrigin: true
      }
    }
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#177ddc',
          'success-color': '#49aa19',
          'error-color': '#d32029',
          'warning-color': '#faad14',
          'body-background': '#141414',
          'primary-text': 'rgba(255,255,255,.85)',
          'secondary-text': 'rgba(255,255,255,.65)',
          'component-background': '#202020',
          'table-header-bg': '#292929',
          'select-item-selected-bg': '#177ddc',
          'card-background': '#1f1f1f',
          'margin-md': '16px'
        }
      }
    }
  }
});
