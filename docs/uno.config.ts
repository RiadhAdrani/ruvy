// uno.config.ts
import { defineConfig } from 'unocss';

//  const join = (array: Array<string>): string => `@apply ${array.join(' ')}`;

export default defineConfig({
  shortcuts: [
    {
      col: 'flex flex-col',
      row: 'flex flex-row',

      'col-center': 'col justify-center items-center',
      'row-center': 'row justify-center items-center',
    },
  ],
});
