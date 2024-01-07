import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { unmountApp, useState } from '../index.js';
import { wait } from '@/helpers/helpers.js';
import { __test__mount } from './utils.js';

describe('text', () => {
  let updateText: (t: string) => void;

  beforeAll(async () => {
    const App = () => {
      const [txt, setTxt] = useState('text');

      updateText = setTxt;

      return <>text value = {txt} .</>;
    };

    await __test__mount(<App />);

    await wait(10);
  });

  afterAll(async () => {
    unmountApp();

    await wait(10);
  });

  it('should render text nodes', () => {
    expect(document.body.innerHTML).toBe('text value = text .');
  });

  it('should update text node data', async () => {
    updateText('updated');

    await wait(10);

    expect(document.body.innerHTML).toBe('text value = updated .');
  });
});
