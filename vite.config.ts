import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [tsconfigPaths({})],
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
};
