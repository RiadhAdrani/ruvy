// uno.config.ts
import { defineConfig, presetUno } from 'unocss';
import { presetWebFonts } from 'unocss';

//  const join = (array: Array<string>): string => `@apply ${array.join(' ')}`;

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
        mono: 'Fira Code',
      },
    }),
    presetUno(),
  ],
  shortcuts: [
    {
      col: 'flex flex-col',
      row: 'flex flex-row',

      'col-center': 'col justify-center items-center',
      'row-center': 'row justify-center items-center',
    },
  ],
});
