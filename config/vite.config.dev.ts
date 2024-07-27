import { mergeConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      port: '3000',
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.3.19',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''), // 不可以省略rewrite
      //   },
      // },
    },
    plugins: [
      // eslint({
      //   cache: false,
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   exclude: ['node_modules'],
      // }),
    ],
  },
  baseConfig
);
