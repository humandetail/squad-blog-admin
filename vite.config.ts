import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()]
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
          'body-background': '#141414'
        }
      }
    }
  }
});
