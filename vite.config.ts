import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite.config.js
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  plugins: [vue(),viteCommonjs()],
})