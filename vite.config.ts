import path from 'path';

export default {
  plugins: [],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './lib'),
    },
  },
};
