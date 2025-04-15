import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver} from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    vue({
      template:{
        compilerOptions:{isCustomElement:(tag) => tag.startsWith('wc-') }
    }
    }),
    Components({
      resolvers: [
        VantResolver()
      ]
    }),
    
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
     css:{
      charset: false, // 解决css引入@import时，控制台报错的问题
     } 
    }
  }
})