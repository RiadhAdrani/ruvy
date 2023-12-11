import path from 'path';

export default {
  plugins: [],
  test: {
    environment: 'jsdom',
  },
  alias: {
    '@': path.resolve(__dirname, './lib'),
  },
};
