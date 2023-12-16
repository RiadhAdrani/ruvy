import path from 'path';

export default {
  plugins: [],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './lib'),
      '@component': path.resolve(__dirname, './lib/component'),
      '@scheduler': path.resolve(__dirname, './lib/scheduler'),
      '@composable': path.resolve(__dirname, './lib/composable'),
      '@context': path.resolve(__dirname, './lib/context'),
      '@core': path.resolve(__dirname, './lib/core'),
      '@helpers': path.resolve(__dirname, './lib/helpers'),
      '@router': path.resolve(__dirname, './lib/router'),
      '@utils': path.resolve(__dirname, './lib/utils'),
    },
  },
};
