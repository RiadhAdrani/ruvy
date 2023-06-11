import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import path from 'path';

export default defineConfig({
  server: {
    open: 'index.html',
  },
  assetsInclude: ['**/*.md'],
  plugins: [UnoCSS({ configFile: path.resolve(__dirname, './docs/uno.config.ts') })],
  base: '/ruvy/',
});
