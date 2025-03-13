import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      assetsInclude: ['assets/**/*.*'],
      rollupOptions: {
        input: {
          main: './src/renderer/index.html'
        },
        output: {
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  },
})
