import { resolve } from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: env.VITE_APP_PATHNAME,
    test: {},
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        directoryAsNamespace: true,
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: false
          })
        ]
      })
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },

    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:7001', // dev
          changeOrigin: true
        }
      }
    }
  }
})
