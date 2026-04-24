import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      types: path.resolve(__dirname, 'types/')
    }
  },
  server: {
    port: 80
  },
  plugins: [
    vue(),
    vueJsx({}),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/bpmn-icons')],
      symbolId: '[name]',
      customDomId: '__svg__icons__dom__'
    })
  ]
})
